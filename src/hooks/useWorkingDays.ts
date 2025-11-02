import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase/client'
import type { Database } from '../utils/supabase/types'

type WorkingDay = Database['public']['Tables']['working_days']['Row']
type WorkingDayInsert = Database['public']['Tables']['working_days']['Insert']
type WorkingDayUpdate = Database['public']['Tables']['working_days']['Update']

export function useWorkingDays() {
  const [workingDays, setWorkingDays] = useState<WorkingDay[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchWorkingDays = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('working_days')
        .select('*')
        .order('year', { ascending: false })
        .order('month', { ascending: false })

      if (fetchError) throw fetchError
      setWorkingDays(data || [])
    } catch (err: any) {
      setError(err.message)
      console.error('Error fetching working days:', err)
    } finally {
      setLoading(false)
    }
  }

  const addWorkingDay = async (workingDay: WorkingDayInsert) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: insertError } = await supabase
        .from('working_days')
        .insert(workingDay)
        .select()
        .single()

      if (insertError) throw insertError

      setWorkingDays(prev => [...prev, data])
      return { data, error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error adding working day:', err)
      return { data: null, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const updateWorkingDay = async (id: string, updates: WorkingDayUpdate) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: updateError } = await supabase
        .from('working_days')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      setWorkingDays(prev => prev.map(w => w.id === id ? data : w))
      return { data, error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error updating working day:', err)
      return { data: null, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const deleteWorkingDay = async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const { error: deleteError } = await supabase
        .from('working_days')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      setWorkingDays(prev => prev.filter(w => w.id !== id))
      return { error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error deleting working day:', err)
      return { error: err.message }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWorkingDays()
  }, [])

  return {
    workingDays,
    loading,
    error,
    fetchWorkingDays,
    addWorkingDay,
    updateWorkingDay,
    deleteWorkingDay,
  }
}
