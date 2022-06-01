
import { createClient } from '@supabase/supabase-js'
import { readable } from 'svelte/store'

import { marketList, shopList, currentUser, currentMarket } from '$lib/sessionStore'

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
    .select('shop_name, market_id')
    .eq('market_id', market_id)

  // POSSIBLE ERROR THROW
  if (error) throw new Error(error.message)

  // UPDATE STORE SHOPLIST
  shopList.set(data)

  // RETURN DATA
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
  getMarkets()
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
  shopList.update(n => [...n, newShop])
  // RETURN DATA
  return data
}


// user sign in with magic link


