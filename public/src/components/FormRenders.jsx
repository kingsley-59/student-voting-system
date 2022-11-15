
export const Input = ({ height, boxStyle, inputType, value, name, onChange, handleSuffixFunction, placeholder, prefixIcon, suffixIcon, prefixBgColor, suffixBgColor }) => {
    return (
        <div className="form-field" style={{ height:height, ...boxStyle }}>
            {prefixIcon && <div className="prefix-icon" style={{ backgroundColor: prefixBgColor }}>{prefixIcon}</div>}
            
            <input type={inputType} value={value} name={name} onChange={onChange} placeholder={placeholder} className="form-input" style={{ borderRadius: prefixIcon && !suffixIcon ? '0 0.375rem 0.375rem 0' : suffixIcon && !prefixIcon ? '0.375rem 0 0 0.375rem' : prefixIcon && suffixIcon ? '0' : '' }} />
           
            {suffixIcon && <div onClick={handleSuffixFunction} className="suffix-icon" style={{ backgroundColor: suffixBgColor }}>{suffixIcon}</div>}
        </div>
    )
}