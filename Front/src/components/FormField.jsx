import { useState, useRef } from 'react';
import CheckGroup from './CheckGroup';
import DobleSlider from './DobleSlider';
import RoundField from "./RoundField";
import classes from '../styles/FormFields.module.scss'

function TextField({id, name, label, placeholder, initialValue, onChange, readOnly = false, className = '', errorMsg = ''}) {
  return (
    <div className={classes.fieldWrapper}> 
      {label && <label htmlFor={id}>{label}</label>}
      <input 
        className={className}
        type="text" 
        placeholder={placeholder} 
        name={name}
        id={id}
        readOnly={readOnly}
        defaultValue={initialValue} 
        onChange={(e) => onChange? onChange(e.target.value) : ''}
      />
      {errorMsg !== '' && <span>{errorMsg}</span>}
    </div>
  )
}

function SelectField({ id, name, label, options, initialValue, onChange, readOnly = false, errorMsg}){
  return <div className={classes.fieldWrapper}>
    <label htmlFor={name}>{label}</label>
    <select name={name || id} id={id} defaultValue={initialValue} 
      disabled={readOnly} onChange={(e) => onChange? onChange(e.target.value) : ''}
    >
      {options && options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
    { readOnly && <label>{options.find((option) => option.value === initialValue).label}</label> }
    {errorMsg !== '' && <span>{errorMsg}</span>}
  </div>
}

function NumberField({id, name, label, placeholder, initialValue, max, min }) {
  return (
    <div className={classes.fieldWrapper}> 
      {label && <label htmlFor={id}>{label}</label>}
      <input 
        type="number" 
        placeholder={placeholder} 
        name={name}
        id={id}
        min={min} 
        max={max} 
        step={0.01} 
        defaultValue={initialValue}
      />
    </div>
  )
}

// En FormField.jsx - Modificar FileField
function FileField({id, name, label, onChange, errorMsg, changeAlert}) {
  const [fileName, setFileName] = useState('Seleccionar archvo');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!['jpg', 'jpeg', 'png'].includes(file.type.split('/')[1])) {
        changeAlert('El archivo debe ser una imagen')
        return
      }
      if (errorMsg !== ''){
        changeAlert('')
      }
      setFileName(file.name);
      if (errorMsg !== '') changeAlert('')
      onChange?.(file);
    } else {
      setFileName('Seleccionar archvo');
      onChange?.(null);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={classes.fieldWrapper}>
      {label && <label htmlFor={id}>{label}</label>}
      <div className={classes.fileInputContainer}>
        <button 
          type="button" 
          className={classes.fileButton}
          onClick={handleButtonClick}
        >
          {fileName}
        </button>
        <input 
          ref={fileInputRef}
          type="file" 
          name={name}
          id={id}
          accept='image/png, image/jpeg, image/jpg'
          className={classes.hiddenInput}
          onChange={handleFileChange}
        />
      </div>
      {errorMsg && <span className={classes.errorMsg}>{errorMsg}</span>}
    </div>
  );
}
export default function FormField({ config, initialValue, onChange = null, id='', readOnly = false, className = '', errorMsg = '', changeAlert= null }) {
  if (!config) return null;
  
  const { type, name, label, options, ...rest } = config;

  const componentMap = {
    text: TextField,
    round: RoundField,
    number: NumberField, 
    slider: DobleSlider,
    file: FileField,
  };

  const Component = componentMap[type] || TextField; 

  const commonProps = {
    name,
    label,
    errorMsg,
    readOnly,
    id: id || name,
    ...rest,
  };

  if (changeAlert) {
    commonProps['changeAlert'] = changeAlert
  }

  if (type === 'boolean') {
    return (
      <CheckGroup
        {...commonProps}
        onChange={onChange}
        defaultChecked={initialValue || null}
        options={options || [{ label: 'Si', value: true }, { label: 'No', value: false }]}
      />
    );
  }

  if (type === 'enum') {
    return (
      <SelectField
        {...commonProps}
        onChange={onChange}
        initialValue={initialValue || null}
        options={options}
      />
    );
  }

  return (
    <Component
      {...commonProps}
      initialValue={initialValue}
      onChange={onChange}
      className={className}
    />
  );
}