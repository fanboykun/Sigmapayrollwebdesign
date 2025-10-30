/**
 * DatabaseSeeder.tsx
 * 
 * Komponen untuk melakukan migrasi data dummy ke Supabase database
 * Komponen ini akan muncul jika database masih kosong
 */

import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Database, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { MASTER_EMPLOYEES } from '../shared/employeeData';
import { MASTER_DIVISIONS } from '../shared/divisionData';
import { MASTER_NATURA } from '../shared/naturaData';
import { TAX_BRACKETS, BPJS_RATES } from '../shared/taxBpjsData';
import { seedDatabase, healthCheck } from '../utils/api';

interface DatabaseSeederProps {
  onBack?: () => void;
}

export default function DatabaseSeeder({ onBack }: DatabaseSeederProps) {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<{
    success: boolean;
    message?: string;
    counts?: Record<string, number>;
    error?: string;
  } | null>(null);

  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    setSeedResult(null);

    try {
      // Pertama, cek health server
      console.log('Checking server health...');
      const health = await healthCheck();
      
      if (!health.success) {
        throw new Error('Server tidak dapat dijangkau');
      }

      console.log('Server healthy, starting seed process...');

      // Konversi Date objects ke ISO strings untuk serialisasi JSON
      const employeesData = MASTER_EMPLOYEES.map(emp => ({
        ...emp,
        birthDate: emp.birthDate.toISOString(),
        joinDate: emp.joinDate.toISOString(),
      }));

      // Seed database
      const result = await seedDatabase({
        employees: employeesData,
        divisions: MASTER_DIVISIONS,
        natura: MASTER_NATURA,
        taxBrackets: TAX_BRACKETS,
        bpjsRates: BPJS_RATES,
      });

      if (result.success) {
        console.log('Seed successful:', result);
        setSeedResult({
          success: true,
          message: result.message,
          counts: result.counts,
        });
      } else {
        throw new Error(result.error || 'Gagal melakukan seeding');
      }
    } catch (error) {
      console.error('Seed error:', error);
      setSeedResult({
        success: false,
        error: String(error),
      });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Database className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Inisialisasi Database</CardTitle>
              <CardDescription>
                Database Anda masih kosong. Lakukan migrasi data dummy untuk memulai.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Data yang akan dimigrasi */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
            <div>
              <div className="text-sm text-muted-foreground">Karyawan</div>
              <div className="mt-1">{MASTER_EMPLOYEES.length} records</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Divisi</div>
              <div className="mt-1">{MASTER_DIVISIONS.length} records</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Natura</div>
              <div className="mt-1">{MASTER_NATURA.length} records</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Tax Brackets</div>
              <div className="mt-1">{TAX_BRACKETS.length} records</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">BPJS Rates</div>
              <div className="mt-1">{BPJS_RATES.length} records</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Total</div>
              <div className="mt-1">
                {MASTER_EMPLOYEES.length + 
                  MASTER_DIVISIONS.length + 
                  MASTER_NATURA.length + 
                  TAX_BRACKETS.length + 
                  BPJS_RATES.length} records
              </div>
            </div>
          </div>

          {/* Hasil seeding */}
          {seedResult && (
            <Alert variant={seedResult.success ? 'default' : 'destructive'}>
              {seedResult.success ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertDescription>
                {seedResult.success ? (
                  <div>
                    <div>{seedResult.message}</div>
                    {seedResult.counts && (
                      <div className="mt-2 text-sm space-y-1">
                        <div>• Karyawan: {seedResult.counts.employees}</div>
                        <div>• Divisi: {seedResult.counts.divisions}</div>
                        <div>• Natura: {seedResult.counts.natura}</div>
                        <div>• Tax Brackets: {seedResult.counts.taxBrackets}</div>
                        <div>• BPJS Rates: {seedResult.counts.bpjsRates}</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div>Gagal melakukan migrasi data</div>
                    <div className="mt-1 text-sm">{seedResult.error}</div>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}

          {/* Action buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleSeedDatabase}
              disabled={isSeeding || seedResult?.success}
              className="flex-1"
            >
              {isSeeding ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Memigrasikan Data...
                </>
              ) : seedResult?.success ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Migrasi Berhasil
                </>
              ) : (
                <>
                  <Database className="mr-2 h-4 w-4" />
                  Mulai Migrasi
                </>
              )}
            </Button>
            
            {seedResult?.success && (
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Lanjutkan ke Aplikasi
              </Button>
            )}
          </div>

          {/* Info tambahan */}
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              Proses ini akan memigrasikan semua data dummy dari file lokal ke database Supabase.
              Data akan disimpan menggunakan key-value store.
            </p>
            <p className="text-xs">
              Note: Pastikan koneksi internet Anda stabil selama proses migrasi.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}