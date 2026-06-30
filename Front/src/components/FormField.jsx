import CheckGroup from './CheckGroup';
import DobleSlider from './DobleSlider';
import RoundField from "./RoundField";
import classes from '../styles/FormFields.module.scss'

function TextField({name, label, placeholder, initialValue, onChange, id}) {
  return (
    <div className={classes.fieldWrapper}> 
      {label && <label htmlFor={id}>{label}</label>}
      <input 
        type="text" 
        placeholder={placeholder} 
        name={name}
        id={id}
        defaultValue={initialValue} 
        onChange={(e) => onChange? onChange(e.target.value) : ''}
      />
    </div>
  )
}

function NumberField({name, label, placeholder, initialValue, max, min, id}) {
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

export default function FormField({ config, initialValue, onChange = null, id='' }) {
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
      onChange={onChange}
    />
  );
}