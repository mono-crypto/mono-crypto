import React from 'react'

interface WalletItemGroupProps {
    children: React.ReactNode
}

function WalletItemGroup({children}: WalletItemGroupProps) {
    return (
        <>
            <div>
                {children}
            </div>
            
        </>
    )
}

export default WalletItemGroup