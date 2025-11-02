import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase/client'
import type { Database } from '../utils/supabase/types'

type LeaveRequest = Database['public']['Tables']['leave_requests']['Row']
type LeaveRequestInsert = Database['public']['Tables']['leave_requests']['Insert']
type LeaveRequestUpdate = Database['public']['Tables']['leave_requests']['Update']

export function useLeaveRequests() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchLeaveRequests = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('leave_requests')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      setLeaveRequests(data || [])
    } catch (err: any) {
      setError(err.message)
      console.error('Error fetching leave requests:', err)
    } finally {
      setLoading(false)
    }
  }

  const addLeaveRequest = async (request: LeaveRequestInsert) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: insertError } = await supabase
        .from('leave_requests')
        .insert(request)
        .select()
        .single()

      if (insertError) throw insertError

      setLeaveRequests(prev => [data, ...prev])
      return { data, error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error adding leave request:', err)
      return { data: null, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const updateLeaveRequest = async (id: string, updates: LeaveRequestUpdate) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: updateError } = await supabase
        .from('leave_requests')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      setLeaveRequests(prev => prev.map(l => l.id === id ? data : l))
      return { data, error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error updating leave request:', err)
      return { data: null, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const approveLeaveRequest = async (id: string, approvedBy: string) => {
    return updateLeaveRequest(id, {
      status: 'approved',
      approved_by: approvedBy,
      approved_at: new Date().toISOString(),
    })
  }

  const rejectLeaveRequest = async (id: string, approvedBy: string, reason: string) => {
    return updateLeaveRequest(id, {
      status: 'rejected',
      approved_by: approvedBy,
      approved_at: new Date().toISOString(),
      rejection_reason: reason,
    })
  }

  const deleteLeaveRequest = async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const { error: deleteError } = await supabase
        .from('leave_requests')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      setLeaveRequests(prev => prev.filter(l => l.id !== id))
      return { error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error deleting leave request:', err)
      return { error: err.message }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeaveRequests()
  }, [])

  return {
    leaveRequests,
    loading,
    error,
    fetchLeaveRequests,
    addLeaveRequest,
    updateLeaveRequest,
    approveLeaveRequest,
    rejectLeaveRequest,
    deleteLeaveRequest,
  }
}
