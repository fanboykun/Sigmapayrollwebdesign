import { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Filter, Download, Eye, UserCheck, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { format, differenceInDays, addMonths } from 'date-fns';
import { id } from 'date-fns/locale';

interface ProbationEmployee {
  id: string;
  employeeId: string;
  fullName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  joinDate: Date;
  probationEndDate: Date;
  probationStatus: 'ongoing' | 'passed' | 'extended' | 'failed';
  supervisor: string;
  performanceScore?: number;
  notes?: string;
}

// Data dummy karyawan probasi
const PROBATION_EMPLOYEES: ProbationEmployee[] = [
  {
    id: '1',
    employeeId: 'EMP2024001',
    fullName: 'Ahmad Riski Pratama',
    email: 'ahmad.riski@company.com',
    phone: '081234567890',
    department: 'IT',
    position: 'Software Engineer',
    joinDate: new Date(2024, 7, 1), // 1 Agustus 2024
    probationEndDate: new Date(2024, 10, 1), // 1 November 2024
    probationStatus: 'ongoing',
    supervisor: 'Budi Santoso',
    performanceScore: 85,
    notes: 'Performa baik, cepat belajar'
  },
  {
    id: '2',
    employeeId: 'EMP2024002',
    fullName: 'Siti Nurhaliza',
    email: 'siti.nur@company.com',
    phone: '081234567891',
    department: 'Finance',
    position: 'Junior Accountant',
    joinDate: new Date(2024, 6, 15), // 15 Juli 2024
    probationEndDate: new Date(2024, 9, 15), // 15 Oktober 2024
    probationStatus: 'passed',
    supervisor: 'Ani Wijaya',
    performanceScore: 92,
    notes: 'Lulus probasi dengan nilai sangat baik'
  },
  {
    id: '3',
    employeeId: 'EMP2024003',
    fullName: 'Dedy Kurniawan',
    email: 'dedy.k@company.com',
    phone: '081234567892',
    department: 'Marketing',
    position: 'Marketing Staff',
    joinDate: new Date(2024, 8, 1), // 1 September 2024
    probationEndDate: new Date(2024, 11, 1), // 1 Desember 2024
    probationStatus: 'ongoing',
    supervisor: 'Indra Gunawan',
    performanceScore: 78,
    notes: 'Perlu peningkatan komunikasi dengan klien'
  },
  {
    id: '4',
    employeeId: 'EMP2024004',
    fullName: 'Maya Puspitasari',
    email: 'maya.p@company.com',
    phone: '081234567893',
    department: 'HR',
    position: 'HR Staff',
    joinDate: new Date(2024, 5, 1), // 1 Juni 2024
    probationEndDate: new Date(2024, 8, 1), // 1 September 2024
    probationStatus: 'passed',
    supervisor: 'Rina Susanti',
    performanceScore: 88,
    notes: 'Lulus probasi, karyawan teladan'
  },
  {
    id: '5',
    employeeId: 'EMP2024005',
    fullName: 'Roni Setiawan',
    email: 'roni.s@company.com',
    phone: '081234567894',
    department: 'Operations',
    position: 'Operations Staff',
    joinDate: new Date(2024, 7, 15), // 15 Agustus 2024
    probationEndDate: new Date(2024, 10, 15), // 15 November 2024
    probationStatus: 'extended',
    supervisor: 'Joko Widodo',
    performanceScore: 65,
    notes: 'Probasi diperpanjang 1 bulan untuk evaluasi lebih lanjut'
  },
  {
    id: '6',
    employeeId: 'EMP2024006',
    fullName: 'Linda Kartika',
    email: 'linda.k@company.com',
    phone: '081234567895',
    department: 'IT',
    position: 'UI/UX Designer',
    joinDate: new Date(2024, 8, 10), // 10 September 2024
    probationEndDate: new Date(2024, 11, 10), // 10 Desember 2024
    probationStatus: 'ongoing',
    supervisor: 'Budi Santoso',
    performanceScore: 90,
    notes: 'Sangat kreatif dan inovatif'
  }
];

export function Probasi() {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<ProbationEmployee | null>(null);

  const [employees] = useState<ProbationEmployee[]>(PROBATION_EMPLOYEES);

  // Filter karyawan
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = 
      emp.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || emp.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || emp.probationStatus === statusFilter;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Get unique departments
  const departments = Array.from(new Set(employees.map(e => e.department)));

  // Hitung statistik
  const stats = {
    total: employees.length,
    ongoing: employees.filter(e => e.probationStatus === 'ongoing').length,
    passed: employees.filter(e => e.probationStatus === 'passed').length,
    extended: employees.filter(e => e.probationStatus === 'extended').length,
    failed: employees.filter(e => e.probationStatus === 'failed').length,
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      ongoing: { label: 'Berlangsung', variant: 'default' as const, icon: Clock },
      passed: { label: 'Lulus', variant: 'default' as const, icon: CheckCircle2, className: 'bg-green-100 text-green-800 hover:bg-green-100' },
      extended: { label: 'Diperpanjang', variant: 'secondary' as const, icon: AlertCircle },
      failed: { label: 'Tidak Lulus', variant: 'destructive' as const, icon: XCircle },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config?.icon;
    
    return (
      <Badge variant={config?.variant || 'default'} className={config?.className || ''}>
        {Icon && <Icon size={12} className="mr-1" />}
        {config?.label || status}
      </Badge>
    );
  };

  // Hitung sisa hari probasi
  const getRemainingDays = (endDate: Date) => {
    const today = new Date();
    const remaining = differenceInDays(endDate, today);
    return remaining;
  };

  // Get performance badge
  const getPerformanceBadge = (score?: number) => {
    if (!score) return null;
    
    if (score >= 85) {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Sangat Baik ({score})</Badge>;
    } else if (score >= 70) {
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Baik ({score})</Badge>;
    } else if (score >= 60) {
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Cukup ({score})</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Kurang ({score})</Badge>;
    }
  };

  const handleViewDetails = (employee: ProbationEmployee) => {
    setSelectedEmployee(employee);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
        <Card className="p-4 md:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Probasi</p>
              <h3 className="text-2xl">{stats.total}</h3>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
              <UserCheck size={24} className="text-primary" />
            </div>
          </div>
        </Card>
        
        <Card className="p-4 md:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Berlangsung</p>
              <h3 className="text-2xl">{stats.ongoing}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 rounded flex items-center justify-center">
              <Clock size={24} className="text-blue-500" />
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Lulus</p>
              <h3 className="text-2xl">{stats.passed}</h3>
            </div>
            <div className="w-12 h-12 bg-green-500/10 rounded flex items-center justify-center">
              <CheckCircle2 size={24} className="text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Diperpanjang</p>
              <h3 className="text-2xl">{stats.extended}</h3>
            </div>
            <div className="w-12 h-12 bg-yellow-500/10 rounded flex items-center justify-center">
              <AlertCircle size={24} className="text-yellow-500" />
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Tidak Lulus</p>
              <h3 className="text-2xl">{stats.failed}</h3>
            </div>
            <div className="w-12 h-12 bg-red-500/10 rounded flex items-center justify-center">
              <XCircle size={24} className="text-red-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Table */}
      <Card className="shadow-sm">
        <div className="px-4 md:px-6 py-4 md:py-5 border-b border-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
            <div>
              <h2 className="mb-1">Daftar Karyawan Probasi</h2>
              <p className="text-sm text-muted-foreground">Kelola dan monitor karyawan dalam masa probasi</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download size={16} className="mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        <div className="px-4 md:px-6 py-4 border-b border-border">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Cari karyawan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter size={16} className="mr-2" />
                <SelectValue placeholder="Semua Divisi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Divisi</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter size={16} className="mr-2" />
                <SelectValue placeholder="Semua Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="ongoing">Berlangsung</SelectItem>
                <SelectItem value="passed">Lulus</SelectItem>
                <SelectItem value="extended">Diperpanjang</SelectItem>
                <SelectItem value="failed">Tidak Lulus</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">Karyawan</th>
                <th className="px-4 md:px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">Divisi</th>
                <th className="px-4 md:px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">Tanggal Masuk</th>
                <th className="px-4 md:px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">Akhir Probasi</th>
                <th className="px-4 md:px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">Sisa Hari</th>
                <th className="px-4 md:px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">Performa</th>
                <th className="px-4 md:px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="px-4 md:px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-background divide-y divide-border">
              {filteredEmployees.map((employee) => {
                const remainingDays = getRemainingDays(employee.probationEndDate);
                return (
                  <tr key={employee.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 md:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                          {employee.fullName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <p className="mb-0 truncate">{employee.fullName}</p>
                          <p className="text-xs text-muted-foreground truncate">{employee.employeeId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <div>
                        <p className="mb-0">{employee.department}</p>
                        <p className="text-xs text-muted-foreground">{employee.position}</p>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm">
                      {format(employee.joinDate, 'dd MMM yyyy', { locale: id })}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm">
                      {format(employee.probationEndDate, 'dd MMM yyyy', { locale: id })}
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      {employee.probationStatus === 'ongoing' ? (
                        <div className="flex items-center gap-1">
                          <Clock size={14} className="text-muted-foreground" />
                          <span className={`text-sm ${remainingDays <= 7 ? 'text-red-500 font-semibold' : remainingDays <= 14 ? 'text-yellow-500 font-semibold' : ''}`}>
                            {remainingDays > 0 ? `${remainingDays} hari` : 'Berakhir'}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      {getPerformanceBadge(employee.performanceScore)}
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      {getStatusBadge(employee.probationStatus)}
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(employee)}
                      >
                        <Eye size={16} />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="px-4 md:px-6 py-3 md:py-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs md:text-sm text-muted-foreground">
            Menampilkan {filteredEmployees.length} dari {employees.length} karyawan probasi
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Sebelumnya</Button>
            <Button variant="outline" size="sm">Berikutnya</Button>
          </div>
        </div>
      </Card>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detail Karyawan Probasi</DialogTitle>
            <DialogDescription>
              Informasi lengkap karyawan dalam masa probasi
            </DialogDescription>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 pb-4 border-b">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl">
                  {selectedEmployee.fullName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
                <div>
                  <h3>{selectedEmployee.fullName}</h3>
                  <p className="text-sm text-muted-foreground">{selectedEmployee.employeeId} • {selectedEmployee.position}</p>
                  <div className="flex gap-2 mt-2">
                    {getStatusBadge(selectedEmployee.probationStatus)}
                    {getPerformanceBadge(selectedEmployee.performanceScore)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded">
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="mb-0">{selectedEmployee.email}</p>
                </div>
                <div className="p-4 bg-muted/30 rounded">
                  <p className="text-sm text-muted-foreground mb-1">Telepon</p>
                  <p className="mb-0">{selectedEmployee.phone}</p>
                </div>
                <div className="p-4 bg-muted/30 rounded">
                  <p className="text-sm text-muted-foreground mb-1">Divisi</p>
                  <p className="mb-0">{selectedEmployee.department}</p>
                </div>
                <div className="p-4 bg-muted/30 rounded">
                  <p className="text-sm text-muted-foreground mb-1">Jabatan</p>
                  <p className="mb-0">{selectedEmployee.position}</p>
                </div>
                <div className="p-4 bg-muted/30 rounded">
                  <p className="text-sm text-muted-foreground mb-1">Tanggal Masuk</p>
                  <p className="mb-0">{format(selectedEmployee.joinDate, 'dd MMMM yyyy', { locale: id })}</p>
                </div>
                <div className="p-4 bg-muted/30 rounded">
                  <p className="text-sm text-muted-foreground mb-1">Akhir Probasi</p>
                  <p className="mb-0">{format(selectedEmployee.probationEndDate, 'dd MMMM yyyy', { locale: id })}</p>
                </div>
                <div className="p-4 bg-muted/30 rounded">
                  <p className="text-sm text-muted-foreground mb-1">Supervisor</p>
                  <p className="mb-0">{selectedEmployee.supervisor}</p>
                </div>
                <div className="p-4 bg-muted/30 rounded">
                  <p className="text-sm text-muted-foreground mb-1">Skor Performa</p>
                  <p className="mb-0">{selectedEmployee.performanceScore || '-'}</p>
                </div>
              </div>

              {selectedEmployee.probationStatus === 'ongoing' && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                  <div className="flex items-start gap-3">
                    <Clock size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="mb-1 text-blue-900">Masa Probasi Berlangsung</p>
                      <p className="text-sm text-blue-700 mb-0">
                        Sisa waktu: {getRemainingDays(selectedEmployee.probationEndDate)} hari lagi
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedEmployee.notes && (
                <div className="p-4 bg-muted/30 rounded">
                  <p className="text-sm text-muted-foreground mb-2">Catatan</p>
                  <p className="mb-0">{selectedEmployee.notes}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>Tutup</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
