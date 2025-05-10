import "../assets/css/ComboBox.css";
import { useState } from "react";
import SelectArrowDown from "./svgComponents/SelectArrowDown";

export default function ComboBox({ setValueState, optionsArray, inputId }) {
    const [internalValue, setInternalValue] = useState("");
    const [options, setOptions] = useState(optionsArray);
    const [display, setDisplay] = useState(false);

    function normalizeString(str) {
        return str.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    const handleFocus = () => {
        setOptions(optionsArray);
        setDisplay(true);
    }

    const handleChange = (event) => {
      setInternalValue(event.target.value);
      const filteredOptions = optionsArray.filter(value => {
        const normalizedValue = normalizeString(value);
        const normalizedInputValue = normalizeString(event.target.value);
        return normalizedValue.includes(normalizedInputValue);
      });
      setOptions(filteredOptions);
    };

    const handleBlur = (event) => {
        setTimeout(() => {
            const inputValue = normalizeString(event.target.value);
            const option = options.find(value => normalizeString(value) === inputValue);
            if (option) {
                setInternalValue(option);
                setValueState(option);
            } else {
                setInternalValue(event.target.value);
                setValueState(event.target.value);
            }
            setDisplay(false);
        }, 150);
    };

    const handleArrowClick = () => {
      setOptions(optionsArray);
      setDisplay(prev => !prev);
    }

    return (
        <div className={`combo-box combo-box--${inputId}`}>
          <div className="combo-box__input-wrapper">
            <input
              className={`combo-box__input combo-box__input--${inputId}`}
              type="text"
              name={inputId}
              id={inputId}
              onFocus={handleFocus}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Seleccionar"
              value={internalValue}
              required={true}
            />
            <SelectArrowDown onClick={handleArrowClick} className={`combo-box__arrow combo-box__arrow--${inputId}`} />
          </div>
          <ul className={`combo-box__list combo-box__list--${inputId} ${display ? "combo-box__list--visible" : "combo-box__list--hidden"}`}>
            {options.map((option, index) => (
              <li
                key={index}
                className={`combo-box__list-item combo-box__list-item--${inputId}`}
                onClick={() => {
                  setInternalValue(option);
                  setValueState(option);
                  setOptions([]);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      );
}