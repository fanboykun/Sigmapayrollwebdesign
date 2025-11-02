import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase/client'
import type { Database } from '../utils/supabase/types'

type BpjsRate = Database['public']['Tables']['bpjs_rates']['Row']
type BpjsRateInsert = Database['public']['Tables']['bpjs_rates']['Insert']
type BpjsRateUpdate = Database['public']['Tables']['bpjs_rates']['Update']

export function useBpjsRates() {
  const [bpjsRates, setBpjsRates] = useState<BpjsRate[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchBpjsRates = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('bpjs_rates')
        .select('*')
        .order('type', { ascending: true })

      if (fetchError) throw fetchError
      setBpjsRates(data || [])
    } catch (err: any) {
      setError(err.message)
      console.error('Error fetching BPJS rates:', err)
    } finally {
      setLoading(false)
    }
  }

  const addBpjsRate = async (rate: BpjsRateInsert) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: insertError } = await supabase
        .from('bpjs_rates')
        .insert(rate)
        .select()
        .single()

      if (insertError) throw insertError

      setBpjsRates(prev => [...prev, data])
      return { data, error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error adding BPJS rate:', err)
      return { data: null, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const updateBpjsRate = async (id: string, updates: BpjsRateUpdate) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: updateError } = await supabase
        .from('bpjs_rates')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      setBpjsRates(prev => prev.map(r => r.id === id ? data : r))
      return { data, error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error updating BPJS rate:', err)
      return { data: null, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const deleteBpjsRate = async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const { error: deleteError } = await supabase
        .from('bpjs_rates')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      setBpjsRates(prev => prev.filter(r => r.id !== id))
      return { error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error deleting BPJS rate:', err)
      return { error: err.message }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBpjsRates()
  }, [])

  return {
    bpjsRates,
    loading,
    error,
    fetchBpjsRates,
    addBpjsRate,
    updateBpjsRate,
    deleteBpjsRate,
  }
}
