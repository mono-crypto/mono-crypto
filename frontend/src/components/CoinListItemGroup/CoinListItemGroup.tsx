import React from 'react'

interface CoinListItemGroupProps {
    children: React.ReactNode
}

function CoinListItemGroup({children}: CoinListItemGroupProps) {
    return (
        <div>
            {children}
        </div>
    )
}

export default CoinListItemGroup