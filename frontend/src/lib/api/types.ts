export type CoinListItem = {
    name: string
    markets: Markets[]
}

export type Markets = {
    name: string
    quotes: string[]
};

export type WalletItem = {
    _id: string
    ticker: string
    ea: number
    price: number
    market: string
    date: string
}

export type addWalletItem = {
    ticker: string
    market: string
    price: number | string
    ea: number | string
    date: Date
    convertPrice?: number
    access_token?: User['access_token'] 
    loading?: boolean
}

export type deleteWalletItem = {
    id: string
}

export type updateWalletItem = addWalletItem & {
    _id: string
}

export type User = {
    google_id: number
    email: string
    name: string
    picture: string,
    access_token: string
  }