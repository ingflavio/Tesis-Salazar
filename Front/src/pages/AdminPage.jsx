import { useRef, useState } from "react";
import { useModalForm } from "../hooks/useModalForm";
import Icons from "../components/Icons";
import FormField from '../components/FormField'
import classes from "../styles/admin.module.scss";
import useProfile from "../hooks/useProfile";
import { useUser } from "../hooks/useUser";
import { SearchBar } from "../components/SearchBar";
import { useSearch } from '../hooks/useSearch';

function ProfileForm({ onSubmit, fieldsToRender = [], title, sumbitText, initialValues }) {
  const fields = initialValues
  ? fieldsToRender.map((field) => <FormField name={field.name} label={field.label} key={field.name} initialValue={initialValues[field.name]} />)
  : fieldsToRender.map((field) => <FormField name={field.name} label={field.label} key={field.name} />)

  const SubmitFunc = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData.entries())
    if (initialValues){
      data['solvency'] = initialValues['solvency']
    }
    onSubmit(data)
  }

  return (
    <form className={classes.profileForm} onSubmit={(event) => SubmitFunc(event)}>
      <h2>{title}</h2>
      <div className={classes.fieldWrapper}>
        {
          fields
        }
      </div>
      <button type="submit">
        {sumbitText}
      </button>
    </form>
  );
}

function ProfileTable({ profileData, profiles, filter, editCallback, deleteCallback,tfooterCallback }) {
  const filteredProfiles = filter(profiles)
  return (
    <table className={classes.userTable}>
      <thead>
        <tr>
          {Object.values(profileData).map((value) => {
            return <th key={value.name}>{value.label}</th>
          })}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {filteredProfiles.map((profile, index) => {
          const profileToShow = {...profile}
          delete profileToShow['password']
          return <tr key={index}>{
            Object.entries(profileToShow).map(([key, value]) => {

              let content 
              let className = ''
              if(typeof value === 'boolean'){
                [content, className] = value 
                ? ['Solvente', classes.greenText] 
                : ['No solvente', classes.redText]
                 
              } else if(value === 'm' || value === 'f'){
                content = value === 'f' ? 'Femenino' : 'Masculino'
              } else {
                content = value
              }

              return <td className={className} key={key}>{content}</td>
              })
            }
            <td>
              <button onClick={() => editCallback(profile)}>
                <Icons icon="edit" />
              </button>
              <button onClick={() => deleteCallback(profile)}>
                <Icons icon="delete" />
              </button>
            </td>
          </tr>
        })}
      </tbody>
      <tfoot>
        <tr>
          <td>
            <button onClick={tfooterCallback} className={classes.footerButton}>
              Registrar cliente
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export function AdminPage() { 
  const { logOut } = useUser()
  const {formText, formValues, modalOpen, modal, showModalForm, closeModalForm} = useModalForm()
  const {getProfiles, getProfileColumns} = useProfile()
  const [profiles, setProfiles] = useState(getProfiles())

  const profileColumns = getProfileColumns()
  const { filterFunc, filter, changeFilterParams } = useSearch()

  const modeRef = useRef(null)

  const deleteProfile = (profile) => {
    const newProfiles = [...profiles].filter((item) => item.id !== profile.id)
    setProfiles(newProfiles)
  }
  
  const editProfile = (profile) => {
    const newProfiles = [...profiles]
    const index = newProfiles.findIndex((item) => item.id === profile.id)
    newProfiles[index] = profile
    setProfiles(newProfiles)
    closeModalForm()
  }

  const addProfile = (profile) => {
    const newProfiles = [...profiles]
    profile['solvency'] = true
    newProfiles.push(profile)
    setProfiles(newProfiles)
    closeModalForm()
  }

  const OpenModal = (mode, profile = null) => {
    modeRef.current = mode
    if (mode === 'registrar'){
      showModalForm('Registrar cliente','Registrar')
    }else if (mode === 'editar'){
      showModalForm('Editar datos de un cliente','Guardar cambios', profile)
    }
    console.log(modeRef.current)
  }

  const handleSubmit = (profile) => {
    console.log(modeRef.current)
    if (modeRef.current === 'registrar'){
      addProfile(profile)
    }else if (modeRef.current === 'editar'){
      editProfile(profile)
    }
    modeRef.value = null
  }

  const fields = Object.entries(profileColumns).map(([key, value]) => { return { name: key, label: value }})

  return (
    <>
      <main className={classes.adminPage}>
        <h1>Admin</h1>
        <SearchBar filter={filter} changeFilter={changeFilterParams}/>
        <div className={classes.userTable_container}>
          <ProfileTable 
            profiles = {profiles} 
            profileData = {fields.filter((field) => field.name !== 'password')} 
            filter = {filterFunc}
            editCallback = {(profile)=> OpenModal('editar', profile)}
            deleteCallback = {(profile) => deleteProfile(profile)}
            tfooterCallback = {() => OpenModal('registrar')}
          />
        </div>
        <button onClick={logOut} >Cerrar sesion</button>
      </main>
      <dialog ref={modal} onClose={() => closeModalForm()}>
        <div className={classes.dialogWraper}>  
          <button onClick={() => modal.current.close()}>X</button>
          {
            modalOpen &&
            <ProfileForm 
              title={formText.title} 
              sumbitText={formText.submit}
              fieldsToRender={fields.filter((field) => field.name !== 'solvency')} 
              initialValues={formValues} 
              onSubmit={handleSubmit}
            />
          }
        </div>
      </dialog>       
    </>
  );
}
