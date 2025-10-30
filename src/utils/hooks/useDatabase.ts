/**
 * useDatabase hook
 * Hook untuk mengecek status database dan menyediakan fungsi-fungsi untuk berinteraksi dengan database
 */

import { useState, useEffect } from 'react';
import { getAllEmployees } from '../api';

export function useDatabase() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDatabaseSeeded, setIsDatabaseSeeded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkDatabaseStatus();
  }, []);

  async function checkDatabaseStatus() {
    setIsLoading(true);
    setError(null);

    try {
      // Cek apakah sudah ada data karyawan
      const response = await getAllEmployees();
      
      if (response.success && response.data) {
        setIsDatabaseSeeded(response.data.length > 0);
      } else {
        setIsDatabaseSeeded(false);
      }
    } catch (err) {
      console.error('Error checking database status:', err);
      setError(String(err));
      setIsDatabaseSeeded(false);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    isDatabaseSeeded,
    error,
    recheckDatabase: checkDatabaseStatus,
  };
}
