import React from 'react'

import Input from '@/components/common/Input'
import Label from '@/components/common/Label'

import Modal from '@/components/common/Modal'

import { useRecoilState } from 'recoil'
import { addCoinDialogState } from '@/atoms/addCoinDialog'

interface CoinListItemGroupProps {
    children: React.ReactNode
}

function CoinListItemGroup({children}: CoinListItemGroupProps) {
    const [coinDialogState, setCoinDialogState] = useRecoilState(addCoinDialogState);

    const changeDialogState = () => {
        setCoinDialogState(!coinDialogState)
    }

    return (
        <>
            <div>
                {children}
            </div>
            <Modal changeDialogState={changeDialogState} visible={coinDialogState} hasBottomBtn={true}>
                <div>
                    <Label>
                        <span>Market</span>
                        <div>
                            <Input type="text"/>
                            <Input type="text"/>
                        </div>
                    </Label>
                </div>
                <div>
                    <Label>
                        <span>Price</span>
                        <Input type="number"/>
                    </Label>
                </div>
                <div>
                    <Label>
                        <span>Date</span>
                        <Input type="text"/>
                    </Label>
                </div>
                <div>
                    <Label>
                        <span>Time</span>
                        <Input type="text"/>
                    </Label>
                </div>
            </Modal>
        </>
        
    )
}

export default CoinListItemGroup