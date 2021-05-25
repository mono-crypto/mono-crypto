import React from 'react';

import Input from '@/components/common/Input'
import Label from '@/components/common/Label'

import Modal from '@/components/common/Modal'
function ModalTest() {
    return(
        <Modal maxWidth="70%" modalWidth="100%">
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
    )
}

export default ModalTest;