import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase/client'
import type { Database } from '../utils/supabase/types'

type WageScale = Database['public']['Tables']['wage_scales']['Row']
type WageScaleInsert = Database['public']['Tables']['wage_scales']['Insert']
type WageScaleUpdate = Database['public']['Tables']['wage_scales']['Update']

export function useWageScales() {
  const [wageScales, setWageScales] = useState<WageScale[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchWageScales = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('wage_scales')
        .select('*')
        .order('code', { ascending: true })

      if (fetchError) throw fetchError
      setWageScales(data || [])
    } catch (err: any) {
      setError(err.message)
      console.error('Error fetching wage scales:', err)
    } finally {
      setLoading(false)
    }
  }

  const addWageScale = async (wageScale: WageScaleInsert) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: insertError } = await supabase
        .from('wage_scales')
        .insert(wageScale)
        .select()
        .single()

      if (insertError) throw insertError

      setWageScales(prev => [...prev, data])
      return { data, error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error adding wage scale:', err)
      return { data: null, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const updateWageScale = async (id: string, updates: WageScaleUpdate) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: updateError } = await supabase
        .from('wage_scales')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      setWageScales(prev => prev.map(w => w.id === id ? data : w))
      return { data, error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error updating wage scale:', err)
      return { data: null, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const deleteWageScale = async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const { error: deleteError } = await supabase
        .from('wage_scales')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      setWageScales(prev => prev.filter(w => w.id !== id))
      return { error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error deleting wage scale:', err)
      return { error: err.message }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWageScales()
  }, [])

  return {
    wageScales,
    loading,
    error,
    fetchWageScales,
    addWageScale,
    updateWageScale,
    deleteWageScale,
  }
}
