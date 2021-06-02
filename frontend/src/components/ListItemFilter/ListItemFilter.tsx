import React from 'react'

import Input from '@/components/common/Input'

import { useRecoilValue, useSetRecoilState } from 'recoil'
import { coinListFilterInput, coinListState } from '@/atoms/coinListState'

function ListItemFilter() {
    const setListItemFilterInput = useSetRecoilState(coinListFilterInput)
    const { state } = useRecoilValue(coinListState)

    const changeListItemFilterInput = ({ target: { value } }) => {
        console.log(value)
        setListItemFilterInput(value);
    }
    return(
        <>
            <div>
                {state}
            </div>
            <Input type="text" onChange={changeListItemFilterInput}/>
        </>
    )
}

export default ListItemFilter