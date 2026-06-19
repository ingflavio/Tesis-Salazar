import CheckGroup from './CheckGroup';
import DobleSlider from './DobleSlider';
import RoundField from "./RoundField";
import classes from '../styles/FormFields.module.scss'

function TextField({name, label}) {
  return <fieldset className={classes.textField}  id={name}> 
    <label>{label}</label>
    <input type="text" placeholder={label} name={name}/>
  </fieldset>
}

function NumberField({name, label, max, min}) {
  return <fieldset className={classes.textField} id={name}> 
    <label>{label}</label>
    <input 
      type="number" placeholder={label} name={name}
      min={min} max={max}
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
        label={label}
        options={options || [{ label: 'Sí', value: true }, { label: 'No', value: false }]}
        onChange={(newValue) => onChange(name, newValue)}
        {...commonProps}
      />
    );
  }

  return (
    <Component
      {...commonProps}
      value={initialValue}
      onChange={(e) => onChange(name, e.target.value)}
    />
  );

}