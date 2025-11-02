import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase/client'
import type { Database } from '../utils/supabase/types'

type PayrollRecord = Database['public']['Tables']['payroll_records']['Row']
type PayrollInsert = Database['public']['Tables']['payroll_records']['Insert']
type PayrollUpdate = Database['public']['Tables']['payroll_records']['Update']
type PayrollPeriod = Database['public']['Tables']['payroll_periods']['Row']
type PayrollPeriodInsert = Database['public']['Tables']['payroll_periods']['Insert']

export function usePayroll() {
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>([])
  const [payrollPeriods, setPayrollPeriods] = useState<PayrollPeriod[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPayrollPeriods = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('payroll_periods')
        .select('*')
        .order('year', { ascending: false })
        .order('month', { ascending: false })

      if (fetchError) throw fetchError
      setPayrollPeriods(data || [])
    } catch (err: any) {
      setError(err.message)
      console.error('Error fetching payroll periods:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchPayrollRecords = async (periodId?: string) => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('payroll_records')
        .select('*')
        .order('created_at', { ascending: false })

      if (periodId) {
        query = query.eq('period_id', periodId)
      }

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError
      setPayrollRecords(data || [])
    } catch (err: any) {
      setError(err.message)
      console.error('Error fetching payroll records:', err)
    } finally {
      setLoading(false)
    }
  }

  const createPayrollPeriod = async (period: PayrollPeriodInsert) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: insertError } = await supabase
        .from('payroll_periods')
        .insert(period)
        .select()
        .single()

      if (insertError) throw insertError

      setPayrollPeriods(prev => [data, ...prev])
      return { data, error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error creating payroll period:', err)
      return { data: null, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const addPayrollRecord = async (record: PayrollInsert) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: insertError } = await supabase
        .from('payroll_records')
        .insert(record)
        .select()
        .single()

      if (insertError) throw insertError

      setPayrollRecords(prev => [data, ...prev])
      return { data, error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error adding payroll record:', err)
      return { data: null, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const updatePayrollRecord = async (id: string, updates: PayrollUpdate) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: updateError } = await supabase
        .from('payroll_records')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      setPayrollRecords(prev => prev.map(p => p.id === id ? data : p))
      return { data, error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error updating payroll record:', err)
      return { data: null, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const processPayroll = async (periodId: string, employeeIds: string[]) => {
    try {
      setLoading(true)
      setError(null)

      // This would typically call a Supabase Edge Function to calculate payroll
      // For now, we'll just return a success message
      // TODO: Implement Edge Function for payroll calculation

      return { data: { message: 'Payroll processing initiated' }, error: null }
    } catch (err: any) {
      setError(err.message)
      console.error('Error processing payroll:', err)
      return { data: null, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPayrollPeriods()
  }, [])

  return {
    payrollRecords,
    payrollPeriods,
    loading,
    error,
    fetchPayrollPeriods,
    fetchPayrollRecords,
    createPayrollPeriod,
    addPayrollRecord,
    updatePayrollRecord,
    processPayroll,
  }
}
