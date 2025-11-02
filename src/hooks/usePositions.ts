import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase/client'
import type { Database } from '../utils/supabase/types'

type Position = Database['public']['Tables']['positions']['Row']
type PositionInsert = Database['public']['Tables']['positions']['Insert']
type PositionUpdate = Database['public']['Tables']['positions']['Update']

export function usePositions() {
  const [positions, setPositions] = useState<Position[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPositions = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('positions')
        .select('*')
        .order('code', { ascending: true })

      if (fetchError) throw fetchError
      setPositions(data || [])
    } catch (err: any) {
      setError(err.message)
      console.error('Error fetching positions:', err)
    } finally {
      setLoading(false)
    }
  }

  const addPosition = async (position: PositionInsert) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: insertError } = await supabase
        .from('positions')
        .insert(position)
        .select()
        .single()

      if (insertError) throw insertError

      setPositions(prev => [...prev, data])
      return { data, error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error adding position:', err)
      return { data: null, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const updatePosition = async (id: string, updates: PositionUpdate) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: updateError } = await supabase
        .from('positions')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      setPositions(prev => prev.map(p => p.id === id ? data : p))
      return { data, error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error updating position:', err)
      return { data: null, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const deletePosition = async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const { error: deleteError } = await supabase
        .from('positions')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      setPositions(prev => prev.filter(p => p.id !== id))
      return { error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error deleting position:', err)
      return { error: err.message }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPositions()
  }, [])

  return {
    positions,
    loading,
    error,
    fetchPositions,
    addPosition,
    updatePosition,
    deletePosition,
  }
}
