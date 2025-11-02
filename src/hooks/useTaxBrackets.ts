import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase/client'
import type { Database } from '../utils/supabase/types'

type TaxBracket = Database['public']['Tables']['tax_brackets']['Row']
type TaxBracketInsert = Database['public']['Tables']['tax_brackets']['Insert']
type TaxBracketUpdate = Database['public']['Tables']['tax_brackets']['Update']

export function useTaxBrackets(year?: number) {
  const [taxBrackets, setTaxBrackets] = useState<TaxBracket[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTaxBrackets = async (filterYear?: number) => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('tax_brackets')
        .select('*')
        .order('layer', { ascending: true })

      if (filterYear) {
        query = query.eq('year', filterYear)
      }

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError
      setTaxBrackets(data || [])
    } catch (err: any) {
      setError(err.message)
      console.error('Error fetching tax brackets:', err)
    } finally {
      setLoading(false)
    }
  }

  const addTaxBracket = async (bracket: TaxBracketInsert) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: insertError } = await supabase
        .from('tax_brackets')
        .insert(bracket)
        .select()
        .single()

      if (insertError) throw insertError

      setTaxBrackets(prev => [...prev, data])
      return { data, error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error adding tax bracket:', err)
      return { data: null, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const updateTaxBracket = async (id: string, updates: TaxBracketUpdate) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: updateError } = await supabase
        .from('tax_brackets')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      setTaxBrackets(prev => prev.map(t => t.id === id ? data : t))
      return { data, error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error updating tax bracket:', err)
      return { data: null, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const deleteTaxBracket = async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const { error: deleteError } = await supabase
        .from('tax_brackets')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      setTaxBrackets(prev => prev.filter(t => t.id !== id))
      return { error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error deleting tax bracket:', err)
      return { error: err.message }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTaxBrackets(year)
  }, [year])

  return {
    taxBrackets,
    loading,
    error,
    fetchTaxBrackets,
    addTaxBracket,
    updateTaxBracket,
    deleteTaxBracket,
  }
}
