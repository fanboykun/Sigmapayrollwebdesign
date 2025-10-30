/**
 * API utilities untuk berkomunikasi dengan Supabase backend
 * Semua fungsi menggunakan kv_store untuk menyimpan data
 */

import { projectId, publicAnonKey } from './supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-b23f9a7d`;

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  counts?: Record<string, number>;
}

// ==========================================================================
// GENERIC API CALL
// ==========================================================================

async function apiCall<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
        ...options?.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`API Error (${endpoint}):`, data);
      return { success: false, error: data.error || 'Unknown error' };
    }

    return data;
  } catch (error) {
    console.error(`Network error calling ${endpoint}:`, error);
    return { success: false, error: String(error) };
  }
}

// ==========================================================================
// EMPLOYEES API
// ==========================================================================

export async function getAllEmployees() {
  return apiCall<any[]>('/employees', { method: 'GET' });
}

export async function getEmployeeById(id: string) {
  return apiCall<any>(`/employees/${id}`, { method: 'GET' });
}

export async function createEmployee(employee: any) {
  return apiCall<any>('/employees', {
    method: 'POST',
    body: JSON.stringify(employee),
  });
}

export async function updateEmployee(id: string, employee: any) {
  return apiCall<any>(`/employees/${id}`, {
    method: 'PUT',
    body: JSON.stringify(employee),
  });
}

export async function deleteEmployee(id: string) {
  return apiCall<void>(`/employees/${id}`, { method: 'DELETE' });
}

// ==========================================================================
// DIVISIONS API
// ==========================================================================

export async function getAllDivisions() {
  return apiCall<any[]>('/divisions', { method: 'GET' });
}

export async function createDivision(division: any) {
  return apiCall<any>('/divisions', {
    method: 'POST',
    body: JSON.stringify(division),
  });
}

export async function updateDivision(id: string, division: any) {
  return apiCall<any>(`/divisions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(division),
  });
}

export async function deleteDivision(id: string) {
  return apiCall<void>(`/divisions/${id}`, { method: 'DELETE' });
}

// ==========================================================================
// NATURA API
// ==========================================================================

export async function getAllNatura() {
  return apiCall<any[]>('/natura', { method: 'GET' });
}

export async function createNatura(natura: any) {
  return apiCall<any>('/natura', {
    method: 'POST',
    body: JSON.stringify(natura),
  });
}

export async function updateNatura(id: string, natura: any) {
  return apiCall<any>(`/natura/${id}`, {
    method: 'PUT',
    body: JSON.stringify(natura),
  });
}

// ==========================================================================
// TAX BRACKETS API
// ==========================================================================

export async function getAllTaxBrackets() {
  return apiCall<any[]>('/tax-brackets', { method: 'GET' });
}

export async function createTaxBracket(taxBracket: any) {
  return apiCall<any>('/tax-brackets', {
    method: 'POST',
    body: JSON.stringify(taxBracket),
  });
}

// ==========================================================================
// BPJS RATES API
// ==========================================================================

export async function getAllBPJSRates() {
  return apiCall<any[]>('/bpjs-rates', { method: 'GET' });
}

export async function createBPJSRate(bpjsRate: any) {
  return apiCall<any>('/bpjs-rates', {
    method: 'POST',
    body: JSON.stringify(bpjsRate),
  });
}

// ==========================================================================
// SEED DATA
// ==========================================================================

export async function seedDatabase(data: {
  employees?: any[];
  divisions?: any[];
  natura?: any[];
  taxBrackets?: any[];
  bpjsRates?: any[];
}) {
  return apiCall<{ message: string; counts: Record<string, number> }>('/seed-data', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ==========================================================================
// HEALTH CHECK
// ==========================================================================

export async function healthCheck() {
  return apiCall<{ status: string }>('/health', { method: 'GET' });
}
