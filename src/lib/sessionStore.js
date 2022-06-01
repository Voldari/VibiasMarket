import { writable } from "svelte/store";

export const newMarketToggle = writable(false)
export const newShopToggle = writable(false)

export const currentMarket = writable({ market_name: "", id: 0, ownerid: ""})
export const currentUser = writable({id: "", display_name: "null user"})

export const marketList = writable([{'market_name': 'FAKE MARKET', 'id': 0}])
export const shopList = writable([{'shop_name': 'FAKE SHOP', 'market_id': 0}])
