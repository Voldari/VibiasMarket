import { writable } from "svelte/store";

export const marketToggle = writable(true)
export const marketList = writable([{'market_name': 'Fake Shop', 'id': 0}])
