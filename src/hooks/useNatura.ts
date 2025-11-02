import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase/client'
import type { Database } from '../utils/supabase/types'

type Natura = Database['public']['Tables']['natura']['Row']
type NaturaInsert = Database['public']['Tables']['natura']['Insert']
type NaturaUpdate = Database['public']['Tables']['natura']['Update']

export function useNatura() {
  const [natura, setNatura] = useState<Natura[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchNatura = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('natura')
        .select('*')
        .order('type', { ascending: true })

      if (fetchError) throw fetchError
      setNatura(data || [])
    } catch (err: any) {
      setError(err.message)
      console.error('Error fetching natura:', err)
    } finally {
      setLoading(false)
    }
  }

  const addNatura = async (naturaData: NaturaInsert) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: insertError } = await supabase
        .from('natura')
        .insert(naturaData)
        .select()
        .single()

      if (insertError) throw insertError

      setNatura(prev => [...prev, data])
      return { data, error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error adding natura:', err)
      return { data: null, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const updateNatura = async (id: string, updates: NaturaUpdate) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: updateError } = await supabase
        .from('natura')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      setNatura(prev => prev.map(n => n.id === id ? data : n))
      return { data, error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error updating natura:', err)
      return { data: null, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const deleteNatura = async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const { error: deleteError } = await supabase
        .from('natura')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      setNatura(prev => prev.filter(n => n.id !== id))
      return { error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error deleting natura:', err)
      return { error: err.message }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNatura()
  }, [])

  return {
    natura,
    loading,
    error,
    fetchNatura,
    addNatura,
    updateNatura,
    deleteNatura,
  }
}
