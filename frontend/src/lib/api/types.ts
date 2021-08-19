export type CoinListItem = {
    name: string
    markets: Markets[]
}

export type Markets = {
    name: string
    quotes: string[]
};

export type WalletItem = {
    ticker: string
    avgPrice: number
    ea: number
    // - (추가적 - 내부로직) 해당 시점의 마켓 to USDT ( 환산가격 )
}

export type addWalletItem = {
    ticker?: string
    market: string
    price: number
    date: string
    convertPrice: number,
    loading?: boolean,
}