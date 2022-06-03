import { createClient } from '@supabase/supabase-js'
import { readable } from 'svelte/store'

import { marketList, shopList, currentUser, currentMarket, currentShop, itemList, currentItem } from '$lib/control/sessionStore'

export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
)

export let user = readable(supabase.auth.user(), set => {
  supabase.auth.onAuthStateChange((event, session) => {
    if (event == 'SIGNED_OUT') {
      set(null)
    } 
    if (session != null) {
      set(session.user)
    }
  })
})
export const auth = supabase.auth

/**
 * @param {string} table
 */
 async function getAll(table) {
  const { data, error } = await supabase
    .from(table)
    .select()  

  if (error) throw new Error(error.message)
  
  return data
}
export async function getMarkets() {
  let data = await getAll('Markets')
  marketList.set(data)
  return data
}
export async function getShops() {
  let data = await getAll('Shops')
  shopList.set(data)
  return data
}

 /**
 * @param {string} table
 * @param {string} col
 * @param {any} eq
 */
 async function getEq(table, col, eq) {
  const { data, error } = await supabase
    .from(table)
    .select()
    .eq( col, eq)  

  if (error) throw new Error(error.message)
  
  return data
}
/**
 * @param {any} ownerid
 */
export async function getMarketsFromUser(ownerid) {
  let data = await getEq('Markets', 'ownerid', ownerid)
  marketList.set(data)
  return data
}
/**
 * Gets a object of shops within a given market
 * @param {number} market_id - The id of the market to get shops from
 */
export async function getShopsWithMarketID(market_id) {
  let data = await getEq('Shops', 'market_id', market_id)
  shopList.set(data)
  return data
}
/**
 * Gets a object of shops within a given market
 * @param {number} shop_id - The id of the market to get shops from
 */
export async function getItemsWithShopID(shop_id) {
  let data = await getEq('Items', 'shop_id', shop_id)
  itemList.set(data)
  return data
}


export async function getCurrentUser() {
  const { data, error } = await supabase
    .from('profile')
    .select('id, display_name')

  // POSSIBLE ERROR THROW
  if (error) throw new Error(error.message)

  // UPDATE CURRENT USER
  currentUser.set(data[0])

  // RETURN DATA
  return data[0]
}



/**
 * @param {number} id
 */
export async function deleteMarket(id) {
  const { data, error } = await supabase
    .from('Markets')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)

  return data
}


 /**
 * @param {number} id
 */
export async function deleteShop(id) {
  const { data, error } = await supabase
    .from('Shops')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)

  return data
}

 /**
 * @param {number} market_id
 */
export async function deleteShopWithMarketID(market_id) {
  const { data, error } = await supabase
    .from('Shops')
    .delete()
    .eq('market_id', market_id)

  if (error) throw new Error(error.message)

  return data
}

 /**
 * @param {number} id
 */
export async function deleteItem(id) {
  const { data, error } = await supabase
    .from('Items')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)

  return data
}

/**
 * @param {string} marketName
 * @param {string} ownerID
 */
export async function createNewMarket(marketName, ownerID) {
  // DEFINE DATA
  let newMarket = {
    market_name: marketName,
    ownerid: ownerID
  }
  // INSERT DATA TO SUPABASE
  const { data, error } = await supabase
    .from('Markets')
    .insert( newMarket )
  // POSSIBLE ERROR THROW
  if (error) throw new Error(error.message)
  // UPDATE STORE LIST
  currentMarket.set(data[0])

  // RETURN DAATA
  return data
}

/**
 * @param {string} shopName
 * @param {number} marketID
 * @param {string} ownerid
 */
export async function createNewShop (shopName, marketID, ownerid) {
  // DEFINE DATA
  let newShop = {
    shop_name: shopName,
    market_id: marketID,
    ownerid: ownerid
  }
  // INSERT DATA TO SUPABASE

  const { data, error } = await supabase
    .from('Shops')
    .insert ( newShop )
  // POSSIBLE ERROR THROW
  if (error) throw new Error(error.message)
  // UPDATE STORE LIST
  currentShop.set(data[0])

  // RETURN DATA
  return data
}

/**
 * @param {string} itemName
 * @param {number} shopID
 * @param {number} marketID
 * @param {string} ownerid
 */
export async function createNewItem (itemName, shopID, marketID, ownerid) {
  // DEFINE DATA
  let newItem = {
    item_name: itemName,
    shop_id: shopID,
    market_id: marketID,
    ownerid: ownerid,
    item_cost: 100
  }
  // INSERT DATA TO SUPABASE

  const { data, error } = await supabase
    .from('Items')
    .insert ( newItem )
  // POSSIBLE ERROR THROW
  if (error) throw new Error(error.message)
  // UPDATE STORE LIST
  currentItem.set(data[0])

  // RETURN DATA
  return data
}