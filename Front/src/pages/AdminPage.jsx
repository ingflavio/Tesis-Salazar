import { useModalForm } from "../hooks/useModalForm";
import Icons from "../components/Icons";
import FormField from '../components/FormField'
import classes from "../styles/admin.module.scss";
import useProfile from "../hooks/useProfile";
import { SearchBar } from "../components/SearchBar";

function ProfileForm({ fieldsToRender = [], title, sumbitText, initialValues }) {
  const fields = initialValues
  ? fieldsToRender.map((field) => <FormField name={field.name} label={field.label} key={field.name} initialValue={initialValues[field.name]} />)
  : fieldsToRender.map((field) => <FormField name={field.name} label={field.label} key={field.name} />)

  return (
    <form className={classes.profileForm}>
      <h2>{title}</h2>
      {
        fields
      }
      <button type="submit">
        {sumbitText}
      </button>
    </form>
  );
}

function ProfileTable({ profileData, profiles, editCallback, deleteCallback,tfooterCallback }) {
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
        {profiles.map((profile, index) => {
          return <tr key={index}>{
            Object.entries(profile).map(([key, value]) => {

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
  const {formText, formValues, modalOpen, modal, showModalForm, closeModalForm} = useModalForm()
  const {getProfiles, getProfileColumns} = useProfile()
  const profiles = getProfiles()
  const profileColumns = getProfileColumns()

  const deleteProfile = (profile) => {
    console.log(profile)
  }

  const fields = Object.entries(profileColumns).map(([key, value]) => { return { name: key, label: value }})

  return (
    <>
      <main className={classes.adminPage}>
        <h1>Admin</h1>
        <SearchBar />
        <div className={classes.userTable_container}>
          <ProfileTable 
            profiles = {profiles} 
            profileData = {fields} 
            editCallback = {(profile)=> showModalForm('Editar datos de un cliente','Guardar cambios', profile)}
            deleteCallback = {(profile) => deleteProfile(profile)}
            tfooterCallback = {() => showModalForm('Registrar cliente','Registrar')}
          />
        </div>
      </main>
      <dialog ref={modal} onClose={() => closeModalForm()}>
        <div className={classes.dialogWraper}>  
          <button onClick={() => modal.current.close()}>X</button>
          {
            modalOpen &&
            <ProfileForm 
              title={formText.title} 
              sumbitText={formText.submit}
              fieldsToRender={fields} 
              initialValues={formValues} 
            />
          }
        </div>
      </dialog>       
    </>
  );
}
