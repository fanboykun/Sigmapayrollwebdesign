import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DatePicker } from './ui/date-picker';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';
import { DollarSign, Users, CheckCircle2, AlertCircle, Play } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export function PayrollProcessing() {
  const [selectedMonth, setSelectedMonth] = useState('october-2025');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [processingStatus, setProcessingStatus] = useState<'idle' | 'processing' | 'completed'>('idle');
  const [progress, setProgress] = useState(0);
  const [paymentDate, setPaymentDate] = useState<Date | undefined>(new Date());

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

  const payrollSummary = [
    { department: 'Teknik', employees: 45, amount: 1890000000 },
    { department: 'Pemasaran', employees: 22, amount: 836000000 },
    { department: 'Penjualan', employees: 38, amount: 1368000000 },
    { department: 'Operasional', employees: 28, amount: 896000000 },
    { department: 'SDM', employees: 15, amount: 442500000 },
    { department: 'Keuangan', employees: 8, amount: 288000000 },
  ];

  const totalEmployees = payrollSummary.reduce((sum, dept) => sum + dept.employees, 0);
  const totalAmount = payrollSummary.reduce((sum, dept) => sum + dept.amount, 0);

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">Periode Penggajian</label>
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="october-2025">Oktober 2025</SelectItem>
                        <SelectItem value="september-2025">September 2025</SelectItem>
                        <SelectItem value="august-2025">Agustus 2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">Departemen</label>
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Departemen</SelectItem>
                        <SelectItem value="engineering">Teknik</SelectItem>
                        <SelectItem value="marketing">Pemasaran</SelectItem>
                        <SelectItem value="sales">Penjualan</SelectItem>
                        <SelectItem value="operations">Operasional</SelectItem>
                        <SelectItem value="hr">SDM</SelectItem>
                        <SelectItem value="finance">Keuangan</SelectItem>
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
              <h3>Rincian Departemen</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {payrollSummary.map((dept) => (
                  <div
                    key={dept.department}
                    className="flex items-center justify-between p-4 border border-border rounded hover:border-primary/50 transition-colors"
                  >
                    <div>
                      <p className="mb-1">{dept.department}</p>
                      <p className="text-sm text-muted-foreground">{dept.employees} karyawan</p>
                    </div>
                    <p className="text-primary">{formatCurrency(dept.amount)}</p>
                  </div>
                ))}
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
