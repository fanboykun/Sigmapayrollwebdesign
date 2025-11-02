import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase/client'
import type { Database } from '../utils/supabase/types'

type Premium = Database['public']['Tables']['premiums']['Row']
type PremiumInsert = Database['public']['Tables']['premiums']['Insert']
type PremiumUpdate = Database['public']['Tables']['premiums']['Update']

export function usePremiums() {
  const [premiums, setPremiums] = useState<Premium[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPremiums = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('premiums')
        .select('*')
        .order('code', { ascending: true })

      if (fetchError) throw fetchError
      setPremiums(data || [])
    } catch (err: any) {
      setError(err.message)
      console.error('Error fetching premiums:', err)
    } finally {
      setLoading(false)
    }
  }

  const addPremium = async (premium: PremiumInsert) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: insertError } = await supabase
        .from('premiums')
        .insert(premium)
        .select()
        .single()

      if (insertError) throw insertError

      setPremiums(prev => [...prev, data])
      return { data, error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error adding premium:', err)
      return { data: null, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const updatePremium = async (id: string, updates: PremiumUpdate) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: updateError } = await supabase
        .from('premiums')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      setPremiums(prev => prev.map(p => p.id === id ? data : p))
      return { data, error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error updating premium:', err)
      return { data: null, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const deletePremium = async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const { error: deleteError } = await supabase
        .from('premiums')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      setPremiums(prev => prev.filter(p => p.id !== id))
      return { error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error deleting premium:', err)
      return { error: err.message }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPremiums()
  }, [])

  return {
    premiums,
    loading,
    error,
    fetchPremiums,
    addPremium,
    updatePremium,
    deletePremium,
  }
}
