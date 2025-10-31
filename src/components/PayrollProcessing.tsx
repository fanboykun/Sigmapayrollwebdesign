import { useState, useMemo } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DatePicker } from './ui/date-picker';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';
import { DollarSign, Users, CheckCircle2, AlertCircle, Play, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { MASTER_DIVISIONS } from '../shared/divisionData';
import { MASTER_EMPLOYEES, getEmployeesByDivision } from '../shared/employeeData';

export function PayrollProcessing() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  
  const [selectedMonth, setSelectedMonth] = useState(`october-${currentYear}`);
  const [selectedYear, setSelectedYear] = useState(String(currentYear));
  const [selectedDivision, setSelectedDivision] = useState('all');
  const [processingStatus, setProcessingStatus] = useState<'idle' | 'processing' | 'completed'>('idle');
  const [progress, setProgress] = useState(0);
  const [paymentDate, setPaymentDate] = useState<Date | undefined>(new Date());

  // Generate year options (current year - 2 to current year + 1)
  const yearOptions = Array.from({ length: 4 }, (_, i) => currentYear - 2 + i);

  // Calculate payroll summary based on actual employee data
  const payrollSummary = useMemo(() => {
    const activeDivisions = MASTER_DIVISIONS.filter(d => d.isActive);
    
    return activeDivisions.map(division => {
      const divisionEmployees = MASTER_EMPLOYEES.filter(
        emp => emp.division === division.name && emp.status === 'active'
      );
      
      const totalSalary = divisionEmployees.reduce((sum, emp) => {
        // Calculate total compensation (base salary for monthly)
        return sum + emp.baseSalary;
      }, 0);
      
      return {
        divisionId: division.id,
        divisionCode: division.shortname,
        divisionName: division.name,
        employees: divisionEmployees.length,
        amount: totalSalary,
      };
    }).filter(d => d.employees > 0); // Only show divisions with employees
  }, []);

  // Filter summary by selected division
  const filteredSummary = useMemo(() => {
    if (selectedDivision === 'all') {
      return payrollSummary;
    }
    return payrollSummary.filter(d => d.divisionId === selectedDivision);
  }, [payrollSummary, selectedDivision]);

  const totalEmployees = filteredSummary.reduce((sum, div) => sum + div.employees, 0);
  const totalAmount = filteredSummary.reduce((sum, div) => sum + div.amount, 0);

  const handleProcessPayroll = () => {
    setProcessingStatus('processing');
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setProcessingStatus('completed');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-4 md:mb-6">
        <h1 className="mb-1">Proses Penggajian</h1>
        <p className="text-muted-foreground">Konfigurasi dan jalankan penggajian untuk karyawan Anda</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          <Card className="shadow-sm">
            <div className="p-6 border-b border-border">
              <h3>Konfigurasi Penggajian</h3>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">Tahun</label>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {yearOptions.map((year) => (
                          <SelectItem key={year} value={String(year)}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">Periode Penggajian</label>
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={`january-${selectedYear}`}>Januari {selectedYear}</SelectItem>
                        <SelectItem value={`february-${selectedYear}`}>Februari {selectedYear}</SelectItem>
                        <SelectItem value={`march-${selectedYear}`}>Maret {selectedYear}</SelectItem>
                        <SelectItem value={`april-${selectedYear}`}>April {selectedYear}</SelectItem>
                        <SelectItem value={`may-${selectedYear}`}>Mei {selectedYear}</SelectItem>
                        <SelectItem value={`june-${selectedYear}`}>Juni {selectedYear}</SelectItem>
                        <SelectItem value={`july-${selectedYear}`}>Juli {selectedYear}</SelectItem>
                        <SelectItem value={`august-${selectedYear}`}>Agustus {selectedYear}</SelectItem>
                        <SelectItem value={`september-${selectedYear}`}>September {selectedYear}</SelectItem>
                        <SelectItem value={`october-${selectedYear}`}>Oktober {selectedYear}</SelectItem>
                        <SelectItem value={`november-${selectedYear}`}>November {selectedYear}</SelectItem>
                        <SelectItem value={`december-${selectedYear}`}>Desember {selectedYear}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">Divisi</label>
                    <Select value={selectedDivision} onValueChange={setSelectedDivision}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Divisi</SelectItem>
                        {MASTER_DIVISIONS.filter(d => d.isActive).map((division) => (
                          <SelectItem key={division.id} value={division.id}>
                            {division.shortname} - {division.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">Tanggal Pembayaran</label>
                  <DatePicker
                    date={paymentDate}
                    onDateChange={setPaymentDate}
                    placeholder="Pilih tanggal pembayaran"
                    fromYear={2020}
                    toYear={new Date().getFullYear() + 2}
                  />
                </div>

                <div className="space-y-3 p-4 bg-muted/30 rounded">
                  <p className="text-sm">Opsi Pemrosesan</p>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox defaultChecked />
                      <span className="text-sm">Sertakan bonus dan insentif</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox defaultChecked />
                      <span className="text-sm">Terapkan potongan pajak</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox defaultChecked />
                      <span className="text-sm">Kirim notifikasi pembayaran via email</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox defaultChecked />
                      <span className="text-sm">Generate dan distribusikan slip gaji</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {processingStatus !== 'idle' && (
            <Card className="shadow-sm">
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3>
                      {processingStatus === 'processing' ? 'Memproses Penggajian...' : 'Penggajian Berhasil Diselesaikan'}
                    </h3>
                    {processingStatus === 'completed' && (
                      <CheckCircle2 className="text-[#00d27a]" size={24} />
                    )}
                  </div>
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    {processingStatus === 'processing'
                      ? `Memproses pembayaran untuk ${totalEmployees} karyawan...`
                      : `Berhasil memproses ${totalEmployees} pembayaran dengan total ${formatCurrency(totalAmount)}`}
                  </p>
                  {processingStatus === 'completed' && (
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline">Unduh Laporan</Button>
                      <Button size="sm" variant="outline">Lihat Detail</Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}

          <Card className="shadow-sm">
            <div className="p-6 border-b border-border">
              <h3>Rincian Per Divisi</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {filteredSummary.map((div) => (
                  <div
                    key={div.divisionId}
                    className="flex items-center justify-between p-4 border border-border rounded hover:border-primary/50 transition-colors"
                  >
                    <div>
                      <p className="mb-1">{div.divisionCode} - {div.divisionName}</p>
                      <p className="text-sm text-muted-foreground">{div.employees} karyawan</p>
                    </div>
                    <p className="text-primary">{formatCurrency(div.amount)}</p>
                  </div>
                ))}
                {filteredSummary.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Tidak ada data karyawan untuk divisi yang dipilih</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4 md:space-y-6">
          <Card className="shadow-sm">
            <div className="p-4 md:p-6 border-b border-border">
              <h3>Ringkasan</h3>
            </div>
            <div className="p-4 md:p-6 space-y-4">
              <div className="flex items-center gap-3 p-4 bg-primary/5 rounded">
                <div className="w-12 h-12 bg-primary rounded flex items-center justify-center text-white">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Karyawan</p>
                  <p className="text-2xl">{totalEmployees}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-[#00d27a]/5 rounded">
                <div className="w-12 h-12 bg-[#00d27a] rounded flex items-center justify-center text-white">
                  <DollarSign size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Jumlah</p>
                  <p className="text-2xl">{formatCurrency(totalAmount)}</p>
                </div>
              </div>

              <div className="pt-4 border-t space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Gaji Pokok</span>
                  <span>{formatCurrency(Math.floor(totalAmount * 0.85))}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tunjangan</span>
                  <span className="text-[#00d27a]">+{formatCurrency(Math.floor(totalAmount * 0.20))}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Potongan</span>
                  <span className="text-[#e63757]">-{formatCurrency(Math.floor(totalAmount * 0.05))}</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="shadow-sm">
            <div className="p-6 border-b border-border">
              <h3>Pemeriksaan Pra-Pemrosesan</h3>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="text-[#00d27a]" size={18} />
                <span>Semua absensi terverifikasi</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="text-[#00d27a]" size={18} />
                <span>Perhitungan pajak selesai</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="text-[#00d27a]" size={18} />
                <span>Rekening bank tervalidasi</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <AlertCircle className="text-[#f5803e]" size={18} />
                <span>3 karyawan perlu persetujuan</span>
              </div>
            </div>
          </Card>

          <Button
            className="w-full gap-2"
            size="lg"
            onClick={handleProcessPayroll}
            disabled={processingStatus === 'processing'}
          >
            {processingStatus === 'idle' ? (
              <>
                <Play size={18} />
                Proses Penggajian
              </>
            ) : processingStatus === 'processing' ? (
              'Memproses...'
            ) : (
              <>
                <Play size={18} />
                Proses Lagi
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
