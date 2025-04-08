import "../assets/css/ComboBox.css";

export default function ComboBox({ valueState, setValueState, optionsArray, label, inputId }) {
    const handleChange = (event) => {
        setValueState(event.target.value);
    }
    return (
        <div>
            <label htmlFor={inputId}>{label}</label>
            <input type="text" name={inputId} id={inputId} onChange={handleChange} />
            <ul>
                {optionsArray.map((value, i) => {
                    return (
                        <li key={i} onClick={() => setValueState(value)}>{value}</li>
                    )
                })}
            </ul>
        </div>

    )
}
