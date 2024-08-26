import React, { useState, useEffect } from 'react'
import useDebounce from './useDebounce'

export interface IInputInstance<T> {
    value: T
    rawValue: T
    setValue: (value: T) => void
    isDirty: boolean
    checkValue: (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => void
    allValid: boolean
    clear: () => void
}

interface IValidations {
    isEmpty: boolean
    minLength: number
    maxLength: number
    isEmail: boolean
    isPassword: boolean
    isMatch: string
    isInt: boolean
    isFloat: boolean
}

const useInput = <T extends string>(
    initialValue: T,
    validations: Partial<IValidations> = {},
    debounce: number = 0
): IInputInstance<T> => {
    const [rawValue, setValue] = useState<T>(initialValue)
    const value = useDebounce<T>(rawValue, debounce)
    const [isDirty, setIsDirty] = useState<boolean>(false)
    const valid = useValidation(value, validations)
    const allValid: boolean = Object.values(valid).every((item) => !item)

    const checkValue = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ): void => {
        setValue(e.target.value as T)
        setIsDirty(true)
    }

    const clear = (): void => {
        setValue('' as T)
        setIsDirty(false)
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

const useValidation = (value: string, validations: Partial<IValidations>) => {
    const [isEmpty, setEmpty] = useState(false)
    const [minLengthError, setMinLengthError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [pwdError, setPwdError] = useState(false)
    const [matchError, setMatchError] = useState(false)
    const [intError, setIntError] = useState(false)
    const [floatError, setFloatError] = useState(false)
    const [maxLengthError, setMaxLengthError] = useState(false)

    useEffect(() => {
        let re: RegExp
        for (const validation in validations) {
            if (validation !== 'isEmpty' && value?.length === 0) break
            switch (validation) {
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
                    break
                case 'minLength':
                    setMinLengthError(value.length < validations.minLength!)
                    break
                case 'maxLength':
                    setMaxLengthError(value.length > validations.maxLength!)
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
                            !isNaN(parseFloat(value)) &&
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
