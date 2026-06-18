import { useState } from "react";
import { useModalForm } from "../hooks/useModalForm";
import Icons from "../components/Icons";
import TextField from '../components/TextField'
import classes from "../styles/userTable.module.scss";
import useProfile from "../hooks/useProfile";
import CheckGroup from "../components/CheckGroup";
// import { useUser } from "../hooks/useUser";
import { SearchBar } from "../components/SearchBar";
import useFilter from '../hooks/useFilter';
import SortingButton from "../components/SortingButtons";
import useSorter from "../hooks/useSorter";

function ProfileForm({ onSubmit, fieldsToRender = [], title, sumbitText, initialValues }) {
  const fields = initialValues
  ? fieldsToRender.map((field) => {
    const rawValue = initialValues[field.name]
    let initialValue
    if (field.name === 'solvency'){
      initialValue = rawValue ? 'Solvente' : 'No solvente'
    } else if (field.name === 'sex'){
      initialValue = rawValue === 'm' ? 'Masculino' : 'Femenino'
    } else {
      initialValue = rawValue
    }

    return <TextField name={field.name} label={field.label} key={field.name} initialValue={initialValue} />
  })
  : fieldsToRender.map((field) => <TextField name={field.name} label={field.label} key={field.name} />)

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

function ProfileTable({ fieldsToShow, profileData, profiles, filterFunc, changeFilterParams, editCallback, deleteCallback, showCallback,tfooterCallback }) {
  const reducedProfiles = profiles.filter(filterFunc).map((profile) => {
    const reducedProfile = {}
    for (const field of fieldsToShow){

      reducedProfile[field] = profile[field]
    }
    return reducedProfile
  })
  const reducedFields = profileData.filter((item) => fieldsToShow.includes(item.name))

  const [sortParams, setSortParams] = useState({ field: null, direction: null })  
  const { sorter } = useSorter(sortParams)
  const sortedProfiles = sorter(reducedProfiles)

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

  const handleCheck = (event, value) => {
    if (event.target.checked){ 
      const otherCheckbox = document.getElementById(`input-checkbox-${!value}`)
      otherCheckbox.checked = false
    }
    changeFilterParams(event.target.checked ? value : '' , 'solvency')
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
        <tr>
          {Object.values(reducedFields).map((value) => <th key={value.name}> {
            value.name !== 'solvency' ?
            <input type="text" placeholder="buscar" name={value.name} id={`filter-input-${value.name}`} onChange={(event) => changeFilterParams(event.target.value, value.name)}/> : 
            <CheckGroup 
              options={[{label: 'solvente', value: true}, {label: 'insolvente', value: false}]} 
              onClickCallback={(value) => changeFilterParams(value === null ? '' :value, 'solvency')}
            />
          }</th>)}
          <th></th>
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

export default function TablePage() { 
  // const { logOut } = useUser()
  const { filters, filterFunc, changeFilterParams, } = useFilter()
  const {formInfo, formValues, modalOpen, modal, showModalForm, closeModalForm} = useModalForm()
  const {getProfiles, getProfileColumns} = useProfile()
  const fieldsToShow = ['id', 'name', 'lastName', 'solvency']
  const [profiles, setProfiles] = useState(getProfiles())
  const profileColumns = getProfileColumns()
  const [filterShow, setFilterShow] = useState(true)

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

  const aplyFilter = (event) => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.target).entries())
    for (const [field, query] of Object.entries(data)) {
      const index = filters.findIndex((object) => object.field === field) 
      if (index !== -1) {
        const input = document.getElementById(`filter-input-${field}`)
        input.value = query
      } else if (query === '') {
        continue;
      }
      changeFilterParams(query, field)
    }  
  }

  const fields = Object.entries(profileColumns).map(([key, value]) => { return { name: key, label: value }})

  const getFormFields = () => {
    let FormFields = fields
    if (formInfo.mode !== 'mostrar'){
      FormFields = FormFields.filter((field) => field.name !== 'solvency')
    }
    if (formInfo.mode !== 'registrar'){
      FormFields = FormFields.filter((field) => field.name !== 'password')
    }
    return FormFields
  }

  return (
    <>
      <main className={classes.adminPage}>
        <div className={classes.userTable_container}>
          <div>
            <button onClick={() => setFilterShow(!filterShow)}>Filtro avanzado</button>
            <form onSubmit={(event) => aplyFilter(event)}
              className={classes.filterForm} style={{display: filterShow ? '' :'none'}}>
              <div>{ fields.map((field) => {
                return <label key={field.name}> 
                  <span>{field.label}</span>
                  <input type="text" placeholder={field.label} name={field.name}/>
                </label>
              })}</div>
              <button type="submit">Aplicar filtro</button>
            </form>
          </div>
          <ProfileTable 
            fieldsToShow = {fieldsToShow}
            profiles = {profiles} 
            profileData = {fields} 
            filterFunc = { filterFunc }
            changeFilterParams = { changeFilterParams }  
            editCallback = {(profile)=> OpenModal('editar', profile)}
            deleteCallback = {(profile) => deleteProfile(profile)}
            showCallback = {(profile) => OpenModal('mostrar', profile)}
            tfooterCallback = {() => OpenModal('registrar')}
          />
        </div>
        {/* <button onClick={logOut} >Cerrar sesion</button> */}
      </main>
      <dialog ref={modal} onClose={() => closeModalForm()}>
        <div className={classes.dialogWraper}>  
          <button onClick={() => modal.current.close()}>X</button>
          {
            modalOpen &&
            <ProfileForm 
              title={formInfo.title} 
              sumbitText={formInfo.submit}
              fieldsToRender={getFormFields()} 
              initialValues={formValues} 
              onSubmit={handleSubmit}
            />
          }
        </div>
      </dialog>       
    </>
  );
}
