import { Card } from './ui/card';
import { DollarSign, Users, TrendingUp, Clock, ArrowUp, ArrowDown, FileText } from 'lucide-react';
import { Button } from './ui/button';

export function PayrollDashboard() {
  const stats = [
    {
      title: 'Total Penggajian',
      value: 'Rp 2.845.000.000',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-primary',
      lightColor: 'bg-primary/10',
      textColor: 'text-primary',
    },
    {
      title: 'Karyawan Aktif',
      value: '156',
      change: '+3 bulan ini',
      trend: 'up',
      icon: Users,
      color: 'bg-[#00d27a]',
      lightColor: 'bg-[#00d27a]/10',
      textColor: 'text-[#00d27a]',
    },
    {
      title: 'Rata-rata Gaji',
      value: 'Rp 18.240.000',
      change: '+5.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-[#f5803e]',
      lightColor: 'bg-[#f5803e]/10',
      textColor: 'text-[#f5803e]',
    },
    {
      title: 'Menunggu Persetujuan',
      value: '8',
      change: '-2 dari kemarin',
      trend: 'down',
      icon: Clock,
      color: 'bg-[#e63757]',
      lightColor: 'bg-[#e63757]/10',
      textColor: 'text-[#e63757]',
    },
  ];

  const recentPayrolls = [
    { id: 1, period: 'Oktober 2025', amount: 'Rp 2.845.000.000', status: 'Selesai', date: '15 Okt 2025', employees: 156 },
    { id: 2, period: 'September 2025', amount: 'Rp 2.783.000.000', status: 'Selesai', date: '15 Sep 2025', employees: 154 },
    { id: 3, period: 'Agustus 2025', amount: 'Rp 2.812.000.000', status: 'Selesai', date: '15 Agu 2025', employees: 153 },
    { id: 4, period: 'Juli 2025', amount: 'Rp 2.758.000.000', status: 'Selesai', date: '15 Jul 2025', employees: 151 },
  ];

  const upcomingPayments = [
    { employee: 'Sarah Johnson', department: 'Teknik', amount: 'Rp 42.000.000', date: '25 Okt', status: 'pending' },
    { employee: 'Michael Chen', department: 'Pemasaran', amount: 'Rp 38.000.000', date: '25 Okt', status: 'pending' },
    { employee: 'Emma Wilson', department: 'Penjualan', amount: 'Rp 36.000.000', date: '26 Okt', status: 'scheduled' },
    { employee: 'David Brown', department: 'Operasional', amount: 'Rp 32.000.000', date: '26 Okt', status: 'scheduled' },
    { employee: 'Lisa Anderson', department: 'Teknik', amount: 'Rp 36.000.000', date: '27 Okt', status: 'scheduled' },
  ];

  return (
    <div className="p-4 md:p-6">
      <div className="mb-4 md:mb-6">
        <h1 className="mb-1">Dasbor Payroll</h1>
        <p className="text-muted-foreground">Pantau operasi dan analitik payroll Anda</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className={`${stat.lightColor} w-12 h-12 rounded flex items-center justify-center`}>
                  <Icon size={20} className={stat.textColor} />
                </div>
              </div>
              <div className="mb-2">
                <h3 className="text-2xl">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
              <div className="flex items-center gap-1 text-xs">
                {stat.trend === 'up' ? (
                  <ArrowUp size={14} className="text-[#00d27a]" />
                ) : (
                  <ArrowDown size={14} className="text-[#e63757]" />
                )}
                <span className={stat.trend === 'up' ? 'text-[#00d27a]' : 'text-[#e63757]'}>
                  {stat.change}
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
        <Card className="lg:col-span-2 shadow-sm">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h3>Proses Penggajian Terbaru</h3>
              <Button variant="ghost" size="sm">Lihat Semua</Button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentPayrolls.map((payroll) => (
                <div key={payroll.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                      <DollarSign size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="mb-0.5">{payroll.period}</p>
                      <p className="text-sm text-muted-foreground">{payroll.employees} karyawan • {payroll.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="mb-0.5">{payroll.amount}</p>
                    <span className="inline-block px-2.5 py-0.5 bg-[#00d27a]/10 text-[#00d27a] rounded-full text-xs">
                      {payroll.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="shadow-sm">
          <div className="p-6 border-b border-border">
            <h3>Tindakan Cepat</h3>
          </div>
          <div className="p-4 md:p-6">
            <div className="space-y-2 md:space-y-3">
              <Button className="w-full justify-start gap-2 text-sm md:text-base" variant="default">
                <DollarSign size={18} />
                Proses Penggajian
              </Button>
              <Button className="w-full justify-start gap-2 text-sm md:text-base" variant="outline">
                <Users size={18} />
                Kelola Karyawan
              </Button>
              <Button className="w-full justify-start gap-2 text-sm md:text-base" variant="outline">
                <FileText size={18} />
                Buat Laporan
              </Button>
              <Button className="w-full justify-start gap-2 text-sm md:text-base" variant="outline">
                <Clock size={18} />
                Tinjau Persetujuan
              </Button>
            </div>
          </div>
          <div className="p-6 border-t border-border bg-muted/30">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Penggajian Berikutnya</p>
              <span className="text-sm">15 Nov 2025</span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">15 hari tersisa</p>
          </div>
        </Card>
      </div>

      <Card className="shadow-sm">
        <div className="p-6 border-b border-border">
          <h3>Pembayaran Mendatang</h3>
        </div>
        <div className="overflow-x-auto -mx-4 md:mx-0">
          <table className="w-full min-w-[600px]">
            <thead className="bg-muted/30 border-b border-border">
              <tr>
                <th className="text-left px-4 md:px-6 py-3 text-sm text-muted-foreground">Karyawan</th>
                <th className="text-left px-4 md:px-6 py-3 text-sm text-muted-foreground">Departemen</th>
                <th className="text-left px-4 md:px-6 py-3 text-sm text-muted-foreground">Jumlah</th>
                <th className="text-left px-4 md:px-6 py-3 text-sm text-muted-foreground">Tanggal Bayar</th>
                <th className="text-left px-4 md:px-6 py-3 text-sm text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {upcomingPayments.map((payment, index) => (
                <tr key={index} className="border-b border-border last:border-0 hover:bg-muted/20">
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">
                        {payment.employee.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span>{payment.employee}</span>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-muted-foreground">{payment.department}</td>
                  <td className="px-4 md:px-6 py-4">{payment.amount}</td>
                  <td className="px-4 md:px-6 py-4 text-muted-foreground">{payment.date}</td>
                  <td className="px-4 md:px-6 py-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs ${
                      payment.status === 'pending'
                        ? 'bg-[#f5803e]/10 text-[#f5803e]'
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {payment.status === 'pending' ? 'Tertunda' : 'Terjadwal'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
