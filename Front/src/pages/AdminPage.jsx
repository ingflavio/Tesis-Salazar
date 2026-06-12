import { useState } from "react";
import { useModalForm } from "../hooks/useModalForm";
import Icons from "../components/Icons";
import FormField from '../components/FormField'
import classes from "../styles/admin.module.scss";
import useProfile from "../hooks/useProfile";
import { useUser } from "../hooks/useUser";
import { SearchBar } from "../components/SearchBar";
import { useSearch } from '../hooks/useSearch';
import SortingButton from "../components/SortingButtons";
import useSorter from "../hooks/useSorter";

function ProfileForm({ onSubmit, fieldsToRender = [], title, sumbitText, initialValues }) {
  const fields = initialValues
  ? fieldsToRender.map((field) => {
    const initialValue = typeof initialValues[field.name] !== 'boolean' ? 
      initialValues[field.name] : 
      initialValues[field.name] ? 'Solvente' : 'Insolvente'
    return <FormField name={field.name} label={field.label} key={field.name} initialValue={initialValue} />
  })
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
      { sumbitText &&
        <button type="submit">
          {sumbitText}
        </button>
      }
    </form>
  );
}

function ProfileTable({ fieldsToShow, profileData, profiles, filter, editCallback, deleteCallback, showCallback,tfooterCallback }) {
  const reducedProfiles = profiles.map((profile) => {
    const reducedProfile = {}
    for (const field of fieldsToShow){
      reducedProfile[field] = profile[field]
    }
    return reducedProfile
  })
  const reducedFields = profileData.filter((item) => fieldsToShow.includes(item.name))

  const [sortParams, setSortParams] = useState({ field: null, direction: null })  
  const { sorter } = useSorter(sortParams)
  const filteredProfiles = filter(reducedProfiles)
  const sortedProfiles = sorter(filteredProfiles)

  const getFullPofile = (reducedProfile) => profiles.find((profile) => profile.id === reducedProfile.id)
  
  const handleClick = (field, direction) => {
    setSortParams({ field: direction !== null ? field : null, direction: direction })
  }

  const getActiveDirection = (field) => {
    if (sortParams.field === field) {
      return sortParams.direction 
    }
    return null
  }

  return (
    <table className={classes.userTable}>
      <thead>
        <tr>
          {Object.values(reducedFields).map((value) => {
            return <th key={value.name}>
              {value.label}
              <SortingButton 
                onClick={(direction) => handleClick(value.name, direction)}
                isActiveDirection={getActiveDirection(value.name)}
              />
              </th>
          })}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {sortedProfiles.map((profile, index) => {
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
              <button onClick={() => editCallback(getFullPofile(profile))}>
                <Icons icon="edit" />
              </button>
              <button onClick={() => deleteCallback(getFullPofile(profile))}>
                <Icons icon="delete" />
              </button>
              <button onClick={() => showCallback(getFullPofile(profile))}>
                <Icons icon="eye"/>
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
  const {formInfo, formValues, modalOpen, modal, showModalForm, closeModalForm} = useModalForm()
  const {getProfiles, getProfileColumns} = useProfile()

  const fieldsToShow = ['id', 'name', 'lastName', 'solvency']

  const [profiles, setProfiles] = useState(getProfiles())

  const profileColumns = getProfileColumns()
  const { filterFunc, filter, changeFilterParams } = useSearch()

  const deleteProfile = (profile) => {
    const newProfiles = [...profiles].filter((item) => item.id !== profile.id)
    setProfiles(newProfiles)
  }
  
  const editProfile = (profile) => {
    const newProfiles = [...profiles]
    const index = newProfiles.findIndex((item) => item.id === profile.id)
    newProfiles[index] = profile
    setProfiles(newProfiles)
  }

  const addProfile = (profile) => {
    const newProfiles = [...profiles]
    profile['solvency'] = true
    newProfiles.push(profile)
    setProfiles(newProfiles)
  }

  const OpenModal = (mode, profile = null) => {
    if (mode === 'registrar'){
      showModalForm('Registrar cliente','Registrar', mode)
    }else if (mode === 'editar'){
      showModalForm('Editar datos de un cliente','Guardar cambios', mode, profile)
    }else if (mode === 'mostrar'){
      showModalForm('Perfil completo del cliente',false, mode, profile)
    }
  }

  const handleSubmit = (profile) => {
    if (formInfo.mode === 'registrar'){
      addProfile(profile)
    }else if (formInfo.mode === 'editar'){
      editProfile(profile)
    }
    closeModalForm()
  }

  let fields = Object.entries(profileColumns).map(([key, value]) => { return { name: key, label: value }})
  if (formInfo.mode !== 'mostrar'){
    fields = fields.filter((field) => field.name !== 'solvency')
  }
  if (formInfo.mode !== 'registrar'){
    fields = fields.filter((field) => field.name !== 'password')
  }

  return (
    <>
      <main className={classes.adminPage}>
        <h1>Admin</h1>
        <SearchBar filter={filter} changeFilter={changeFilterParams}/>
        <div className={classes.userTable_container}>
          <ProfileTable 
            fieldsToShow = {fieldsToShow}
            profiles = {profiles} 
            profileData = {fields} 
            filter = {filterFunc}
            editCallback = {(profile)=> OpenModal('editar', profile)}
            deleteCallback = {(profile) => deleteProfile(profile)}
            showCallback = {(profile) => OpenModal('mostrar', profile)}
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
              title={formInfo.title} 
              sumbitText={formInfo.submit}
              fieldsToRender={fields} 
              initialValues={formValues} 
              onSubmit={handleSubmit}
            />
          }
        </div>
      </dialog>       
    </>
  );
}
