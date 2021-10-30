import React from 'react'

import Input from '@/components/common/Input'

import { useRecoilState } from 'recoil'

import { coinListFilterInput } from '@/atoms/coinListState'

function CoinListFilterInput() {
    console.log('CoinListFilterInput')
    const [, setListItemFilterInput] = useRecoilState(coinListFilterInput)

    let timer:null | NodeJS.Timeout = null;

    const changeListItemFilterInput = (e: React.FormEvent<HTMLInputElement>) => {
        let eventTarget = e;

        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function() {
            setListItemFilterInput(eventTarget.target.value);
        }, 300);
    }

    return (
        <>
            <Input
                type="text"
                onChange={changeListItemFilterInput}
                placeholder="INSERT TICKER"
                css={
                    {
                        'padding': '10px',
                        'margin-bottom': '1.5rem',
                        'border': '1px solid rgb(236, 239, 241)',
                        'font-size': '1rem',
                        'background': '#fff'
                    }
                }
            />
        </>
    )
}

export default CoinListFilterInput