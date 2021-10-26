import { useCallback, useState } from 'react'

export default function useInputChangeHook(deafaultValue: any) {
    const [value, setValue] = useState(deafaultValue)
    const onChangeEvent = useCallback((e:React.FormEvent<HTMLInputElement>) => {
        const value = parseInt(e.currentTarget.value.replace(/[^\d]+/g, ''), 10)

        if(isNaN(value)) {
            setValue(0)
            return
        }

        setValue(value)
    }, [])

    return {
        inputValue: value,
        setInputValue: setValue,
        onChangeEvent: onChangeEvent
    } 
}