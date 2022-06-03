import { writable } from "svelte/store";

export const newMarketToggle = writable(false)
export const newShopToggle = writable(false)


export const marketState = writable("list")
export const shopState = writable("list")
export const itemState = writable("list")

export const marketDeleteControl = writable(true)
export const shopDeleteControl = writable(true)
export const itemDeleteControl = writable(true)

export const currentItem = writable({item_name: "", id: 0, ownerid: '00000000-0000-0000-0000-000000000000', market_id: 0, shop_id: 0, item_cost: 0})
export const currentShop = writable({shop_name: "", id: 0, ownerid: '00000000-0000-0000-0000-000000000000', market_id: 0})
export const currentMarket = writable({ market_name: "", id: 0, ownerid: '00000000-0000-0000-0000-000000000000'})
export const currentUser = writable({id: "00000000-0000-0000-0000-000000000000", display_name: "null user"})

export const marketList = writable([{'market_name': '', 'id': 0, 'ownerid': '00000000-0000-0000-0000-000000000000'}])
export const shopList = writable([{'shop_name': '', 'market_id': 0, 'ownerid': '00000000-0000-0000-0000-000000000000', 'id': 0}])
export const itemList = writable([{'item_name': '', 'market_id': 0, 'shop_id': 0, 'ownerid': '00000000-0000-0000-0000-000000000000', 'id': 0, 'item_cost': 0}])
