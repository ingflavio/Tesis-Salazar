import { useState, useEffect, useRef } from "react";

export default function DobleSlider({ min = 0, max = 100, step = 1 }) {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const fromSlider = useRef(null);
  const toSlider = useRef(null);

  // Función para pintar el rango entre los dos thumbs
  const fillSlider = () => {
    const from = fromSlider.current;
    const to = toSlider.current;
    if (!from || !to) return;

    const minVal = Number(from.value);
    const maxVal = Number(to.value);

    // Calculamos el porcentaje de cada extremo respecto al rango total
    const percentMin = ((minVal - min) / (max - min)) * 100;
    const percentMax = ((maxVal - min) / (max - min)) * 100;

    // Aplicamos el degradado al track del slider "from"
    from.style.background = `linear-gradient(to right, #ddd 0%, #ddd ${percentMin}%, #2b6c9e ${percentMin}%, #2b6c9e ${percentMax}%, #ddd ${percentMax}%, #ddd 100%)`;
    // El slider "to" lo dejamos transparente para que se vea el de abajo
    to.style.background = 'transparent';
  };

  // Control de z-index: el slider que se está moviendo va al frente
  const setToggleAccessible = (activeSlider) => {
    const from = fromSlider.current;
    const to = toSlider.current;
    if (!from || !to) return;

    if (activeSlider === 'to') {
      to.style.zIndex = 3;
      from.style.zIndex = 1;
    } else {
      from.style.zIndex = 3;
      to.style.zIndex = 1;
    }
  };

  // Manejadores de cambios
  const handleFromChange = (e) => {
    const newMin = Number(e.target.value);
    if (newMin <= maxValue) {
      setMinValue(newMin);
      fillSlider();
    }
  };

  const handleToChange = (e) => {
    const newMax = Number(e.target.value);
    if (newMax >= minValue) {
      setMaxValue(newMax);
      fillSlider();
    }
  };

  // Al iniciar, pintamos el slider
  useEffect(() => {
    fillSlider();
    // Por defecto, el slider "from" tiene prioridad
    setToggleAccessible('from');
  }, []);

  // Actualizamos el pintado cada vez que cambian los valores
  useEffect(() => {
    fillSlider();
  }, [minValue, maxValue]);

  return (
    <fieldset className="range_container">
      <div className="sliders_control">
        <input
          id="fromSlider"
          type="range"
          ref={fromSlider}
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={handleFromChange}
          onMouseDown={() => setToggleAccessible('from')}
          onTouchStart={() => setToggleAccessible('from')}
          className="from_slider"
        />
        <input
          id="toSlider"
          type="range"
          ref={toSlider}
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={handleToChange}
          onMouseDown={() => setToggleAccessible('to')}
          onTouchStart={() => setToggleAccessible('to')}
          className="to_slider"
        />
      </div>
      <div className="form_control">
        <div className="form_control_container">
          <span>Min</span>
          <input
            id="fromInput"
            type="number"
            value={minValue}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val >= min && val <= maxValue) {
                setMinValue(val);
              }
            }}
          />
        </div>
        <div className="form_control_container">
          <span>Max</span>
          <input
            id="toInput"
            type="number"
            value={maxValue}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val >= minValue && val <= max) {
                setMaxValue(val);
              }
            }}
          />
        </div>
      </div>
    </fieldset>
  );
};