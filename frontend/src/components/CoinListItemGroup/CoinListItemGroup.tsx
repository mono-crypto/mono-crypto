import React, { useCallback, useState } from 'react'

import Input from '@/components/common/Input'

import { useRecoilState, useRecoilValue } from 'recoil'

import { coinListFilterInput, coinListFilter } from '@/atoms/coinListState'

import { CoinListItem as TCoinListItem } from '@/lib/api/types'

import * as S from './styles'

import CoinListItem from '../CoinListItem'
import CoinListModal from '../CoinListModal'

function CoinListItemGroup() {
    console.log('CoinListItemGroup')
    const [, setListItemFilterInput] = useRecoilState(coinListFilterInput)
    const filteringList = useRecoilValue(coinListFilter)

    let timer:null | NodeJS.Timeout = null;

    const mapToCoinListItem = (data:TCoinListItem[]) => {
        return (
            <S.CoinListGroupWrap>
                { data.map((item,index) => (<CoinListItem key={index} data={item} />))}
            </S.CoinListGroupWrap>
        )
    }

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
        <S.Wrap>
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
            {mapToCoinListItem(filteringList)}
            <CoinListModal />
        </S.Wrap>
        
    )
}

export default CoinListItemGroup