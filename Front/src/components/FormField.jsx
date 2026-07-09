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

function SelectField({ id, name, label, options, initialValue, onChange, readOnly = false }){
  return <div className={classes.fieldWrapper}>
    <label htmlFor={name}>{label}</label>
    <select name={name} id={id} defaultValue={initialValue} 
      disabled={readOnly} onChange={(e) => onChange? onChange(e.target.value) : ''}
    >
      {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
    { readOnly && <label>{options.find((option) => option.value === initialValue).label}</label> }
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

export default function FormField({ config, initialValue, onChange = null, id='', readOnly = false, className = '', errorMsg = '' }) {
  if (!config) return null;
  
  const { type, name, label, options, ...rest } = config;

  const componentMap = {
    text: TextField,
    round: RoundField,
    number: NumberField, 
    slider: DobleSlider,
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