import { writable } from "svelte/store";

export const newMarketToggle = writable(false)
export const newShopToggle = writable(false)

export const marketState = writable("list")

export const currentMarket = writable({ market_name: "", id: "00000000-0000-0000-0000-000000000000", ownerid: '00000000-0000-0000-0000-000000000000'})
export const currentUser = writable({id: "00000000-0000-0000-0000-000000000000", display_name: "null user"})

export const marketList = writable([{'market_name': '', 'id': '00000000-0000-0000-0000-000000000000', 'ownerid': '00000000-0000-0000-0000-000000000000'}])
export const shopList = writable([{'shop_name': '', 'market_id': '00000000-0000-0000-0000-000000000000'}])
