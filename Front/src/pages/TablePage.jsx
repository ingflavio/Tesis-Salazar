import { useState, useEffect } from "react";
import { useModalForm } from "../hooks/useModalForm";
import { useScreen } from "../hooks/useScreen";
import classes from "../styles/userTable.module.scss";
import { configArray, fieldsConfig } from "../utils/fieldsConfig";
import useFilter from '../hooks/useFilter';
import SortingButton from "../components/SortingButtons";
import useSorter from "../hooks/useSorter";
import FormField from "../components/FormField";
import useUsers from "../hooks/useUsers";
import ProfileCard from "../components/ProfileCard";

function ProfileForm({ onSubmit, fieldsToRender = [], title, sumbitText, initialValues }) {

  const SubmitFunc = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const entries = formData.entries()
    const parsedEntries = entries.map(([name, value]) => {
      const parseValue = fieldsConfig[name].parseValue
      const newValue = parseValue ? parseValue(value) : value
      return [name, newValue]
    })
    const data = Object.fromEntries(parsedEntries)
    if (initialValues){
      data['solvency'] = initialValues['solvency']
    }
    onSubmit(data)
  }

  return <form className={classes.profileForm} onSubmit={(event) => SubmitFunc(event)}>
    <h2>{title}</h2>
    <div className={classes.fieldWrapper}>
      {
        fieldsToRender.map((config) => <FormField key={config.name} config={config} />)
      }
    </div>
    <button type="submit">
      {sumbitText}
    </button>
  </form>
}

function ProfileTable({ fieldsToShow, profileColumns, profiles, filterFunc, changeFilterParams, openCallback,tfooterCallback, first = 0, amount = null }) {
  const [sortParams, setSortParams] = useState({ field: null, direction: null })  
  const { sorter } = useSorter(sortParams)

  if (!profiles){
    return <h3>Cargando perfiles</h3>
  }

  const reducedProfiles = profiles.filter(filterFunc).map((profile) => {
    const reducedProfile = {}
    for (const field of fieldsToShow){

      reducedProfile[field] = profile[field]
    }
    return reducedProfile
  })
  const reducedFields = profileColumns.filter((item) => fieldsToShow.includes(item.name))
  const sortedProfiles = sorter(reducedProfiles)

  const reduce = (array, first = 0, length = null) => {
    const lastIndex = !length ? 
      array.length - 1 : 
      first ? 
        first + length:
        length
    
    return [...array].slice(first, lastIndex)
  }

  
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
          <th>n°</th>
          {reducedFields.map((value) => <th key={value.name}>
            {value.label}
            <SortingButton 
              onClick={(direction) => handleClick(value.name, direction)}
              isActiveDirection={getActiveDirection(value.name)}
            />
            </th>
          )}
        </tr>
        <tr>
          <th></th>
          {reducedFields.map((config) => {
            const noLabelConfig = {...config} 
            noLabelConfig['placeholder'] = config['label']
            delete noLabelConfig['label']
            return <th key={config.name}>
              <FormField config={noLabelConfig} 
                id={`filter-input-${config.name}`}
                onChange={(value) => changeFilterParams(value, config.name)}  
              />
            </th>
        })}
        </tr>
      </thead>
      <tbody>
        {reduce(sortedProfiles, first, amount).map((profile, index) => {
          const profileToShow = {...profile}
          delete profileToShow['password']
          return <tr key={index} onClick={() => openCallback(profile)}>
            <td>{index + 1 + first}</td>
            {
            Object.entries(profileToShow).map(([key, value]) => {
              let content 
              let className = ''
              if (key == 'email') {
                className = classes.email
              }
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
  const {width} = useScreen()
  const { filters, filterFunc, changeFilterParams } = useFilter()
  const {formInfo, formValues, modalOpen, modal, showModalForm, closeModalForm} = useModalForm()
  const [filterShow, setFilterShow] = useState(false)
  const [formFields, setFormFields] = useState([])
  const [page, setPage] = useState(0)
  const fieldsToShow = ['id', 'name', 'lastName', 'solvency']
  if (width >= 1150){
    fieldsToShow.splice(3, 0, 'email')
  }
  if (width >= 1400){
    fieldsToShow.splice(3, 0, 'phone')
  }
  if (width >= 1600){
    fieldsToShow.splice(5, 0, 'sex')
  }

  const boleanFields = ['solvency']
  const {
    users,
    registerUser,
    addProfile,
    fetchUsers,
    refetchUsers,
    adminEditUserProfile
  } = useUsers();
  
  useEffect(() => {
    fetchUsers();
  }, []);

  const formatProfiles = (profiles) => profiles.filter((profile) => profile.rol === 'user').map((profile) => {
    const formatedEntries = Object.entries(profile).filter(([name, ]) =>  name !== 'rol')
    .map(([name, value]) => {
      const formatValue = fieldsConfig[name].formatValue
      const newValue = formatValue ? formatValue(value) : value
      return [name, newValue]
    })
    return Object.fromEntries(formatedEntries)

  })

  const profiles = users ? formatProfiles(users) : []

  const length = Math.ceil(profiles.length / 20)
  const pages = [...Array(length).keys()]

  const getFullProfile = (id) => profiles.find((profile) => profile.id === id)

  const handleRegisterUser = async ({id, username, password}) => {
    try {
      await registerUser({
        id: id,
        username: username,
        password: password,
        rol: 'user'
      });
      return true
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return false
    }
  }

  const handleAddProfile = async (data) => {
    try {
      await addProfile(data);
      return true
    } catch (error) {
      console.error('Error al agregar perfil:', error);
      return false
    }
  };

  const registerClient = async (data) => {
    const newUser = await handleRegisterUser({
      id: data.id,
      username: `${data.name} ${data.lastName}`,
      password: data.password
    })
    if(!newUser) {
      console.log('fallo con usuario')
      return 
    }
    const newProfile = await handleAddProfile({
      ...data,
      rol: 'user'
    })
    if(!newProfile) {
      console.log('fallo con perfil')
      return 
    }
    await refetchUsers();
  }

  const editProfile = async (data) => {
    const user = await adminEditUserProfile(data)
    console.log(user)
    showModalForm({text:'Perfil completo del cliente', mode: 'open', profile: user})
  }

  const OpenModal = (mode, profile = null) => {
    const FieldsToExclude = []
    if (mode === 'register'){
      FieldsToExclude.push('solvency')
      showModalForm({text:'Registrar Cliente',submit:'Registrar', mode, profile})
    }else if (mode === 'open'){
      showModalForm({text:'Perfil completo del cliente', mode, profile: getFullProfile(profile.id)})
    }
    setFormFields(configArray.filter((config) =>  !FieldsToExclude.includes(config.name)))
  }

  const handleSubmit = async (profile) => {
    if (formInfo.mode === 'register'){
      await registerClient(profile)
    }else if (formInfo.mode === 'edit'){
      addProfile(profile)
    }
    closeModalForm()
  }

  const handleChangeFilter = (query, field) => {
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
                return <FormField config={config} key={config.name}/>
              })}</div>
              <button type="submit">Aplicar filtro</button>
            </form>
          </div> 
          <ProfileTable 
            fieldsToShow = {fieldsToShow}
            profileColumns= {configArray}
            profiles = {profiles} 
            filterFunc = { filterFunc }
            first={page * 20}
            amount={20}
            changeFilterParams = { handleChangeFilter }  
            openCallback = {(profile) => OpenModal('open', profile)}
            tfooterCallback = {() => OpenModal('register')}
          />
          <div className={classes.paginationButton}>
            <button className={classes.pageButton} 
              onClick={() => setPage(0)}
            >{"<"}</button>
            {pages.map((pageNumber) =>{
              return <button key={pageNumber} className={`${classes.pageButton} ${page === pageNumber ? classes.selectedPage : ''}`}
                onClick={() => setPage(pageNumber)}
              >{pageNumber+1}</button>
            })}
            <button className={classes.pageButton} 
              onClick={() => setPage(pages[pages.length-1])}
            >{">"}</button>
          </div>
        </div>
      </main>
      <dialog ref={modal} onClose={() => closeModalForm()}>
        <button className="closeBtn" onClick={() => modal.current.close()}>X</button>
        {modalOpen && formInfo.mode === 'open' 
          ? <ProfileCard profile={formValues} rol={"admin"}
              editCallback={editProfile}
            />
          : formInfo.mode === 'register' 
          ? <div className={classes.dialogWraper}>  
              <ProfileForm 
                title={formInfo.title} 
                sumbitText={formInfo.submit}
                fieldsToRender={formFields} 
                onSubmit={handleSubmit}
              />
            </div>
          : <></>
        }
      </dialog>       
    </>
  );
}