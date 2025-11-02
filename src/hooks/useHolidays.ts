import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase/client'
import type { Database } from '../utils/supabase/types'

type Holiday = Database['public']['Tables']['holidays']['Row']
type HolidayInsert = Database['public']['Tables']['holidays']['Insert']
type HolidayUpdate = Database['public']['Tables']['holidays']['Update']

export function useHolidays() {
  const [holidays, setHolidays] = useState<Holiday[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchHolidays = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('holidays')
        .select('*')
        .order('date', { ascending: true })

      if (fetchError) throw fetchError
      setHolidays(data || [])
    } catch (err: any) {
      setError(err.message)
      console.error('Error fetching holidays:', err)
    } finally {
      setLoading(false)
    }
  }

  const addHoliday = async (holiday: HolidayInsert) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: insertError } = await supabase
        .from('holidays')
        .insert(holiday)
        .select()
        .single()

      if (insertError) throw insertError

      setHolidays(prev => [...prev, data])
      return { data, error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error adding holiday:', err)
      return { data: null, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const updateHoliday = async (id: string, updates: HolidayUpdate) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: updateError } = await supabase
        .from('holidays')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      setHolidays(prev => prev.map(h => h.id === id ? data : h))
      return { data, error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error updating holiday:', err)
      return { data: null, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const deleteHoliday = async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const { error: deleteError } = await supabase
        .from('holidays')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      setHolidays(prev => prev.filter(h => h.id !== id))
      return { error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error deleting holiday:', err)
      return { error: err.message }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHolidays()
  }, [])

  return {
    holidays,
    loading,
    error,
    fetchHolidays,
    addHoliday,
    updateHoliday,
    deleteHoliday,
  }
}
