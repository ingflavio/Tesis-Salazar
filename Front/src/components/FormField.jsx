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
    id: id || name,
    ...rest,
  };

  if (type === 'boolean') {
    return (
      <CheckGroup
        {...commonProps}
        onChange={onChange}
        defaultChecked={initialValue || null}
        options={options || [{ label: 'Sí', value: true }, { label: 'No', value: false }]}
      />
    );
  }

  return (
    <Component
      {...commonProps}
      initialValue={initialValue}
      readOnly={readOnly}
      onChange={onChange}
      className={className}

    />
  );
}