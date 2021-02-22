import React, {useState, useEffect} from 'react';
import './modal.scss'
import {Card} from "../card/Card";
import {BuyButton} from "../BuyButton/BuyButton";


const useValidation = (value, validations) => {

    const [isEmpty, setEmpty] = useState(true)
    const [minLengthError, setMinLengthError] = useState(false)
    const [onlyLetters, setOnlyLetters] = useState(false)
    const [onlyNumbers, setOnlyNumbers] = useState(false)
    const [inputValid, setInputValid] = useState(false)

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
                    break;
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
                    break;
                case 'onlyNumbers':
                    const regNumbers = /^[0-9]+$/
                    regNumbers.test(String(value).toLowerCase()) ? setOnlyNumbers(false) : setOnlyNumbers(true)
                    break;
                case 'onlyLetters':
                    const regLetters = /^[a-zA-Z]+$/
                    regLetters.test(String(value).toLowerCase()) ? setOnlyLetters(false) : setOnlyLetters(true)
                    break;
            }
        }
    }, [value])

    useEffect(() => {
        if (isEmpty || minLengthError || onlyLetters || onlyNumbers) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }
    }, [isEmpty, minLengthError, onlyLetters, onlyNumbers])

    return {
        isEmpty,
        minLengthError,
        onlyLetters,
        onlyNumbers,
        inputValid
    }
}

const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setDirty] = useState(false)
    const valid = useValidation(value, validations)

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onBlur = (e) => {
        setDirty(true)
    }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}

export const Modal = ({active, setActive, children}) => {
    const name = useInput('', {isEmpty: true, onlyLetters: true})
    const number = useInput('', {isEmpty: true, minLength: 12, onlyNumbers: true})

    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
            <div className={active ? 'modal_content active' : 'modal_content'} onClick={e => e.stopPropagation()}>
                {children}
                <input
                    onChange={e => name.onChange(e)}
                    onBlur={e => name.onBlur(e)}
                    value={name.value}
                    className='input_name'
                    name='name' type="text"
                    placeholder='Name'/>
                {(name.isDirty && name.isEmpty) && <div className='error'>This field in required</div>}
                {(name.isDirty && name.onlyLetters) && <div className='error'>Only letters allowed</div>}
                <input
                    onChange={e => number.onChange(e)}
                    onBlur={e => number.onBlur(e)}
                    value={number.value}
                    className='input_number'
                    name='number' type='phone'
                    placeholder='Number'/>
                {(number.isDirty && number.isEmpty) && <div className='error'>This field in required</div>}
                {(number.isDirty && number.minLengthError) && <div className='error'>Should contain 12 characters</div>}
                {(name.isDirty && name.onlyNumbers) && <div className='error'>Only numbers allowed</div>}
                <button
                    disabled={!name.inputValid || !number.inputValid}
                    className="modal_btn"
                    type='submit'>
                    ORDER
                </button>
            </div>
        </div>
    )
}