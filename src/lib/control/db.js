
import { createClient } from '@supabase/supabase-js'
import { readable } from 'svelte/store'

import { marketList, shopList, currentUser, currentMarket, currentShop } from '$lib/control/sessionStore'

export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
)

/**
 * @param {string} table
 */
async function getAll(table) {
  // QUERY SUPABASE FOR DATA
  const { data, error } = await supabase
    .from(table)
    .select()  

  // POSSIBLE ERROR THROW
  if (error) throw new Error(error.message)

  // RETURN DATA
  return data
}

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

export async function getMarkets() {
  // QUERY SUPABASE FOR DATA
  const { data, error } = await supabase
    .from('Markets')
    .select('id, market_name, ownerid')  

  // POSSIBLE ERROR THROW
  if (error) throw new Error(error.message)

  // UPDATE STORE MARKET DATA
  marketList.set(data)

  // RETURN DATA
  return data
}

/**
 * @param {any} ownerid
 */
export async function getMarketsFromUser(ownerid) {
  // QUERY SUPABASE FOR DATA
  const { data, error } = await supabase
    .from('Markets')
    .select('id, market_name, ownerid')  
    .eq('ownerid', ownerid)

  // POSSIBLE ERROR THROW
  if (error) throw new Error(error.message)

  // UPDATE STORE MARKET DATA
  marketList.set(data)

  // RETURN DATA
  return data
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

export async function getShops() {
  // QUERY SUPABASE FOR DATA
  const { data, error } = await supabase
    .from('Shops')
    .select('shop_name, market_id')  

  // POSSIBLE ERROR THROW
  if (error) throw new Error(error.message)

  // UPDATE STORE MARKET DATA
  shopList.set(data)

  // RETURN DATA
  return data
}

/**
 * Gets a object of shops within a given market
 * @param {number} market_id - The id of the market to get shops from
 */
export async function getShopsWithMarketID(market_id) {
  // QUERT SUPABASE FOR DATA
  const { data, error } = await supabase
    .from('Shops')
    .select()
    .eq('market_id', market_id)

  // POSSIBLE ERROR THROW
  if (error) throw new Error(error.message)

  // UPDATE STORE SHOPLIST
  shopList.set(data)

  // RETURN DATA
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


// user sign in with magic link


