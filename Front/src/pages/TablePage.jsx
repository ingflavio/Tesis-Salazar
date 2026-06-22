import { useState } from "react";
import { useModalForm } from "../hooks/useModalForm";
import Icons from "../components/Icons";
import RoundField from '../components/RoundField'
import classes from "../styles/userTable.module.scss";
import useProfile from "../hooks/useProfile";
import CheckGroup from "../components/CheckGroup";
import { configArray } from "../fieldsConfig";
import { SearchBar } from "../components/SearchBar";
import useFilter from '../hooks/useFilter';
import SortingButton from "../components/SortingButtons";
import useSorter from "../hooks/useSorter";
import FormField from "../components/FormField";

function ProfileForm({ onSubmit, fieldsToRender = [], title, sumbitText, initialValues }) {
  const fields = fieldsToRender.map((config) => {
    console.log(initialValues[config.name])
    return initialValues
      ? <FormField config={config} initialValue={initialValues[config.name]} />
      : <FormField config={config} />
  })



  const SubmitFunc = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData.entries())
    console.log(data)
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

function ProfileTable({ fieldsToShow, profileColumns, profiles, filterFunc, changeFilterParams, editCallback, deleteCallback, showCallback,tfooterCallback }) {
  const reducedProfiles = profiles.filter(filterFunc).map((profile) => {
    const reducedProfile = {}
    for (const field of fieldsToShow){

      reducedProfile[field] = profile[field]
    }
    return reducedProfile
  })
  const reducedFields = profileColumns.filter((item) => fieldsToShow.includes(item.name))
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

  return (
    <table className={classes.userTable}>
      <thead>
        <tr>
          {reducedFields.map((value) => <th key={value.name}>
            {value.label}
            <SortingButton 
              onClick={(direction) => handleClick(value.name, direction)}
              isActiveDirection={getActiveDirection(value.name)}
            />
            </th>
          )}
          <th>Acciones</th>
        </tr>
        <tr>
          {reducedFields.map((config) => {
            const noLabelConfig = {...config} 
            noLabelConfig['placeholder'] = config['label']
            delete noLabelConfig['label']
            return <th>
              <FormField config={noLabelConfig} 
                id={`filter-input-${config.name}`}
                onChange={(value) => changeFilterParams(value, config.name)}  
              />
            </th>
        })}
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
  const { filters, filterFunc, changeFilterParams } = useFilter()
  const {formInfo, formValues, modalOpen, modal, showModalForm, closeModalForm} = useModalForm()
  const {getProfiles} = useProfile()
  const fieldsToShow = ['id', 'name', 'lastName', 'solvency']
  const boleanFields = ['solvency']
  const [profiles, setProfiles] = useState(getProfiles())
  const [filterShow, setFilterShow] = useState(false)

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

  const handleChangeFilter = (query, field) => {
    console.log(field)
    if (boleanFields.includes(field)) {
      if (query === null || query === undefined || query === '') {
        changeFilterParams(null, field);
      } else {
        const parseQuery = query === 'true';
        changeFilterParams(parseQuery, field);
      }
    } else {
      changeFilterParams(query, field);
    }
  }

  const aplyFilter = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    fieldsToShow.forEach(field => {
      if (!formData.has(field)) {
        formData.append(field, ''); 
      }
    });
    const data = Object.fromEntries(formData.entries());

    for (const [field, query] of Object.entries(data)) {
      const index = filters.findIndex((object) => object.field === field) 
      if (index === -1 && query === '') continue;
      if (index !== -1 && fieldsToShow.includes(field)) {
        if (field !== 'solvency'){
          const input = document.getElementById(`filter-input-${field}`)
          if (input) input.value = query
        } else {
          if (query === ""){
            const input = document.getElementById(`filter-input-${field}-${filters[index].query}`)
            input.checked = false
          } else {
            console.log('o')
            const input = document.getElementById(`filter-input-${field}-${query}`)
            input.checked = true
          }
        }
      }
      handleChangeFilter(query, field)
    }  
  }

  return (
    <>
      <main className={classes.adminPage}>
        <div className={classes.userTable_container}>
          <div>
            <button onClick={() => setFilterShow(!filterShow)}>{
              filterShow ? 'Ocultar filro avanzado': 'Mostrar Filtro avanzado'
            }</button>
            <form onSubmit={(event) => aplyFilter(event)}
              className={classes.filterForm} style={{display: filterShow ? '' :'none'}}>
              <div>{ configArray.map((config) => {
                return <FormField config={config} />
              })}</div>
              <button type="submit">Aplicar filtro</button>
            </form>
          </div>
          <ProfileTable 
            fieldsToShow = {fieldsToShow}
            profileColumns= {configArray}
            profiles = {profiles} 
            filterFunc = { filterFunc }
            changeFilterParams = { handleChangeFilter }  
            editCallback = {(profile)=> OpenModal('editar', profile)}
            deleteCallback = {(profile) => deleteProfile(profile)}
            showCallback = {(profile) => OpenModal('mostrar', profile)}
            tfooterCallback = {() => OpenModal('registrar')}
          />
        </div>
      </main>
      <dialog ref={modal} onClose={() => closeModalForm()}>
        <div className={classes.dialogWraper}>  
          <button onClick={() => modal.current.close()}>X</button>
          {
            modalOpen &&
            <ProfileForm 
              title={formInfo.title} 
              sumbitText={formInfo.submit}
              fieldsToRender={configArray.filter((config) => config.name !== 'solvency')} 
              initialValues={formValues} 
              onSubmit={handleSubmit}
            />
          }
        </div>
      </dialog>       
    </>
  );
}