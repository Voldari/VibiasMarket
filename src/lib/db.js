
import { createClient } from '@supabase/supabase-js'
import { readable } from 'svelte/store'

import { marketList } from '$lib/sessionStore'

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

export async function getShops() {
  const { data, error } = await supabase
    .from('Shops')
    .select('shop_name, market_id')
  if (error) throw new Error(error.message)

  return data
}


export async function getMarkets() {
  // QUERY SUPABASE FOR DATA
  const { data, error } = await supabase
    .from('Markets')
    .select('id, market_name')  

  // POSSIBLE ERROR THROW
  if (error) throw new Error(error.message)

  // UPDATE STORE MARKET DATA
  marketList.set(data)

  console.log(data)

  // RETURN DATA
  return data
}

/**
 * Gets a object of shops within a given market
 * @param {number} market_id - The id of the market to get shops from
 */
export async function getShopsWithMarketID(market_id) {
  const { data, error } = await supabase
    .from('Shops')
    .select('shop_name, market_id')
    .eq('market_id', market_id)
  
  if (error) throw new Error(error.message)


  return data
}

/**
 * @param {string} marketName
 */
export async function createNewMarket(marketName) {
  const { data, error } = await supabase
    .from('Markets')
    .insert([
      { market_name: marketName, owner_id: 1 },
    ])
  if (error) throw new Error(error.message)

  let newMarket = {
    market_name: marketName,
    id: 1
  }

  marketList.update(n => [...n, newMarket])

  return data

  
}


// user sign in with magic link


