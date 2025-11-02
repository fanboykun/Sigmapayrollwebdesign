import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase/client'
import type { Database } from '../utils/supabase/types'

type AttendanceRecord = Database['public']['Tables']['attendance_records']['Row']
type AttendanceInsert = Database['public']['Tables']['attendance_records']['Insert']
type AttendanceUpdate = Database['public']['Tables']['attendance_records']['Update']

export function useAttendance() {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAttendance = async (startDate?: string, endDate?: string) => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('attendance_records')
        .select('*')
        .order('date', { ascending: false })

      if (startDate) {
        query = query.gte('date', startDate)
      }
      if (endDate) {
        query = query.lte('date', endDate)
      }

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError
      setAttendance(data || [])
    } catch (err: any) {
      setError(err.message)
      console.error('Error fetching attendance:', err)
    } finally {
      setLoading(false)
    }
  }

  const addAttendance = async (record: AttendanceInsert) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: insertError } = await supabase
        .from('attendance_records')
        .insert(record)
        .select()
        .single()

      if (insertError) throw insertError

      setAttendance(prev => [data, ...prev])
      return { data, error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error adding attendance:', err)
      return { data: null, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const updateAttendance = async (id: string, updates: AttendanceUpdate) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: updateError } = await supabase
        .from('attendance_records')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      setAttendance(prev => prev.map(a => a.id === id ? data : a))
      return { data, error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error updating attendance:', err)
      return { data: null, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const deleteAttendance = async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const { error: deleteError } = await supabase
        .from('attendance_records')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      setAttendance(prev => prev.filter(a => a.id !== id))
      return { error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error deleting attendance:', err)
      return { error: err.message }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAttendance()
  }, [])

  return {
    attendance,
    loading,
    error,
    fetchAttendance,
    addAttendance,
    updateAttendance,
    deleteAttendance,
  }
}
