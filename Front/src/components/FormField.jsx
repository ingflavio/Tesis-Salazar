import CheckGroup from './CheckGroup';
import DobleSlider from './DobleSlider';
import RoundField from "./RoundField";
import classes from '../styles/FormFields.module.scss'

function TextField({name, label, placeholder, initialValue}) {
  return <fieldset className={classes.textField}  id={name}> 
    {label &&<label>{label}</label>}
    <input type="text" placeholder={placeholder} name={name} defaultValue={initialValue}/>
  </fieldset>
}

function NumberField({name, label, placeholder, initialValue, max, min}) {
  return <fieldset className={classes.textField} id={name}> 
    {label &&<label>{label}</label>}
    <input 
      type="text" placeholder={placeholder} name={name}
      min={min} max={max} step={0.01} defaultValue={initialValue}
    />
  </fieldset>
}

export default function FormField({ config, initialValue, onChange }) {

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
    ...rest,
  };

  if (type === 'boolean') {
    return (
      <CheckGroup
        name={name}
        label={label}
        options={options || [{ label: 'Sí', value: true }, { label: 'No', value: false }]}
      />
    );
  }

  return (
    <Component
      {...commonProps}
      initialValue={initialValue}
      onChange={(e) => onChange(name, e.target.value)}
    />
  );

}