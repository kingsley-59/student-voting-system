import { TYPES } from "./types"

export const handleAPIRequestErrors = ({ err, dispatch }) => {
    console.log(err);
    dispatch({type:TYPES.LOADING, payload: {}})
    return dispatch({type:TYPES.ALERT, payload: { info: err} })
}

export const validate = {
    checkPasswordStrength: {
        validate: ({ password }) => {
            let strengthBadge = document.getElementById('password-strength-badge');
            const printResult = (bgColor, text) => {
                strengthBadge.style.display = 'flex';
                strengthBadge.style.backgroundColor = bgColor;
                strengthBadge.textContent = text+' password'
            }
            let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
            let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
            if (strongPassword.test(password)) {
                printResult('#53d916', 'Strong')
            } else if (mediumPassword.test(password)) {
                printResult('#ffb700ad', 'Medium')
            } else {
                printResult('#b50000', 'Weak')
            }
            return false;
        },
        msg: 'Password must contain at least a capital and lowercase letter, a number, and a special characters and must be 8 characters long.'
    }
}