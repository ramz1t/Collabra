import { useState, useEffect } from 'react'
import useDebounce from './useDebounce.js'

const useInput = (initialValue, validations, debounce = 0) => {
    const [rawValue, setValue] = useState(initialValue)
    const value = useDebounce(rawValue, debounce)
    const [isDirty, setIsDirty] = useState(false)
    const valid = useValidation(initialValue, validations)
    const allValid = Object.values(valid).every((item) => !item)

    const checkValue = (e) => {
        setValue(e.target.value)
        setIsDirty(true)
    }

    const clear = () => {
        setValue('')
    }

    return {
        value,
        rawValue,
        setValue,
        isDirty,
        checkValue,
        allValid,
        clear,
        ...valid,
    }
}

const useValidation = (value, validations) => {
    const [isEmpty, setEmpty] = useState(false)
    const [minLengthError, setMinLengthError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [pwdError, setPwdError] = useState(false)
    const [matchError, setMatchError] = useState(false)
    const [intError, setIntError] = useState(false)
    const [floatError, setFloatError] = useState(false)
    const [maxLengthError, setMaxLengthError] = useState(false)

    useEffect(() => {
        let re = ''
        for (const validation in validations) {
            if (validation !== 'isEmpty' && value?.length === 0) break
            switch (validation) {
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
                    break
                case 'minLength':
                    setMinLengthError(value.length < validations[validation])
                    break
                case 'maxLength':
                    setMaxLengthError(value.length > validations[validation])
                    break
                case 'isEmail':
                    re =
                        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                    setEmailError(!re.test(value))
                    break
                case 'isPassword':
                    re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
                    setPwdError(!re.test(value))
                    break
                case 'isMatch':
                    setMatchError(value !== validations[validation])
                    break
                case 'isInt':
                    setIntError(
                        !(
                            !isNaN(value) &&
                            (function (x) {
                                return (x | 0) === x
                            })(parseFloat(value))
                        )
                    )
                    break
                case 'isFloat':
                    re = /^[+-]?\d+(\.\d+)?$/
                    setFloatError(!re.test(String(value)))
                    break
                default:
                    break
            }
        }
    }, [value, validations])

    return {
        isEmpty,
        minLengthError,
        matchError,
        pwdError,
        emailError,
        intError,
        floatError,
        maxLengthError,
    }
}

export default useInput
