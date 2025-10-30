/**
 * ==========================================================================
 * TERMINATION MANAGEMENT - MANAJEMEN TERMINASI KARYAWAN
 * ==========================================================================
 * 
 * Komponen untuk mengelola proses terminasi/pemberhentian karyawan:
 * - Pengajuan terminasi (resign, retirement, layoff, termination)
 * - Approval workflow
 * - Exit interview
 * - Perhitungan pesangon dan benefit
 * - Clearance process
 * 
 * #Termination #HR #ExitProcess #Resignation
 * 
 * @author Sistem Payroll Team
 * @version 1.0.0
 * @since 2024-10-28
 * ==========================================================================
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Search,
  Plus,
  Eye,
  Edit2,
  Trash2,
  UserMinus,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  FileText,
  DollarSign,
} from 'lucide-react';
import { DatePicker } from './ui/date-picker';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { toast } from 'sonner@2.0.3';
import { MASTER_EMPLOYEES } from '../shared/employeeData';

interface TerminationRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeNIP: string;
  division: string;
  position: string;
  type: 'resignation' | 'retirement' | 'layoff' | 'termination' | 'contract-end';
  reason: string;
  submittedDate: string;
  effectiveDate: string;
  lastWorkingDay: string;
  status: 'pending' | 'approved' | 'rejected' | 'processing' | 'completed';
  approvedBy?: string;
  approvedDate?: string;
  severancePay: number;
  notes: string;
  clearanceStatus: {
    hr: boolean;
    finance: boolean;
    it: boolean;
    supervisor: boolean;
  };
}

export function Termination() {
  const [activeTab, setActiveTab] = useState('requests');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedTermination, setSelectedTermination] = useState<TerminationRequest | null>(null);

  // Form states
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [terminationType, setTerminationType] = useState<TerminationRequest['type']>('resignation');
  const [effectiveDate, setEffectiveDate] = useState<Date | undefined>();
  const [lastWorkingDay, setLastWorkingDay] = useState<Date | undefined>();
  const [reason, setReason] = useState('');
  const [severancePay, setSeverancePay] = useState('0');
  const [notes, setNotes] = useState('');

  // Sample data
  const [terminationRequests, setTerminationRequests] = useState<TerminationRequest[]>([
    {
      id: '1',
      employeeId: 'EMP001',
      employeeName: 'Ahmad Hidayat',
      employeeNIP: 'NIP001',
      division: 'Teknik',
      position: 'Senior Developer',
      type: 'resignation',
      reason: 'Mengundurkan diri untuk melanjutkan pendidikan S2',
      submittedDate: '2024-10-15',
      effectiveDate: '2024-11-15',
      lastWorkingDay: '2024-11-14',
      status: 'pending',
      severancePay: 0,
      notes: 'Karyawan berprestasi, sayang kehilangan',
      clearanceStatus: {
        hr: false,
        finance: false,
        it: false,
        supervisor: false,
      },
    },
    {
      id: '2',
      employeeId: 'EMP045',
      employeeName: 'Siti Aminah',
      employeeNIP: 'NIP045',
      division: 'Keuangan',
      position: 'Finance Manager',
      type: 'retirement',
      reason: 'Pensiun normal (usia 58 tahun)',
      submittedDate: '2024-09-01',
      effectiveDate: '2024-12-31',
      lastWorkingDay: '2024-12-30',
      status: 'approved',
      approvedBy: 'HR Manager',
      approvedDate: '2024-09-05',
      severancePay: 150000000,
      notes: 'Telah mengabdi 30 tahun',
      clearanceStatus: {
        hr: true,
        finance: true,
        it: false,
        supervisor: true,
      },
    },
    {
      id: '3',
      employeeId: 'EMP078',
      employeeName: 'Budi Prasetyo',
      employeeNIP: 'NIP078',
      division: 'Operasional',
      position: 'Operator',
      type: 'termination',
      reason: 'Pelanggaran serius terhadap peraturan perusahaan',
      submittedDate: '2024-10-20',
      effectiveDate: '2024-10-25',
      lastWorkingDay: '2024-10-24',
      status: 'processing',
      approvedBy: 'Direktur Operasional',
      approvedDate: '2024-10-21',
      severancePay: 25000000,
      notes: 'Proses sesuai UU Ketenagakerjaan',
      clearanceStatus: {
        hr: true,
        finance: false,
        it: true,
        supervisor: true,
      },
    },
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string }> = {
      pending: { label: 'Menunggu', className: 'bg-[#f59e0b]/10 text-[#f59e0b]' },
      approved: { label: 'Disetujui', className: 'bg-[#10b981]/10 text-[#10b981]' },
      rejected: { label: 'Ditolak', className: 'bg-[#ef4444]/10 text-[#ef4444]' },
      processing: { label: 'Diproses', className: 'bg-[#3b82f6]/10 text-[#3b82f6]' },
      completed: { label: 'Selesai', className: 'bg-[#6b7280]/10 text-[#6b7280]' },
    };

    const config = statusConfig[status] || { label: status, className: '' };
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getTypeBadge = (type: string) => {
    const typeConfig: Record<string, { label: string; className: string }> = {
      resignation: { label: 'Resign', className: 'bg-blue-100 text-blue-700' },
      retirement: { label: 'Pensiun', className: 'bg-purple-100 text-purple-700' },
      layoff: { label: 'PHK', className: 'bg-red-100 text-red-700' },
      termination: { label: 'Terminasi', className: 'bg-orange-100 text-orange-700' },
      'contract-end': { label: 'Akhir Kontrak', className: 'bg-gray-100 text-gray-700' },
    };

    const config = typeConfig[type] || { label: type, className: '' };
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const handleViewDetail = (termination: TerminationRequest) => {
    setSelectedTermination(termination);
    setIsDetailDialogOpen(true);
  };

  const handleAddTermination = () => {
    if (!selectedEmployee || !effectiveDate || !lastWorkingDay || !reason) {
      toast.error('Mohon lengkapi semua field yang diperlukan');
      return;
    }

    const employee = MASTER_EMPLOYEES.find(emp => emp.id === selectedEmployee);
    if (!employee) return;

    const newTermination: TerminationRequest = {
      id: (terminationRequests.length + 1).toString(),
      employeeId: employee.employeeId,
      employeeName: employee.fullName,
      employeeNIP: employee.employeeId,
      division: employee.division,
      position: employee.position,
      type: terminationType,
      reason,
      submittedDate: format(new Date(), 'yyyy-MM-dd'),
      effectiveDate: format(effectiveDate, 'yyyy-MM-dd'),
      lastWorkingDay: format(lastWorkingDay, 'yyyy-MM-dd'),
      status: 'pending',
      severancePay: Number(severancePay),
      notes,
      clearanceStatus: {
        hr: false,
        finance: false,
        it: false,
        supervisor: false,
      },
    };

    setTerminationRequests([...terminationRequests, newTermination]);
    setIsAddDialogOpen(false);
    toast.success('Pengajuan terminasi berhasil ditambahkan');
    
    // Reset form
    setSelectedEmployee('');
    setReason('');
    setSeverancePay('0');
    setNotes('');
    setEffectiveDate(undefined);
    setLastWorkingDay(undefined);
  };

  const handleUpdateStatus = (id: string, newStatus: TerminationRequest['status']) => {
    setTerminationRequests(terminationRequests.map(req =>
      req.id === id ? { ...req, status: newStatus } : req
    ));
    toast.success('Status terminasi berhasil diperbarui');
  };

  const statistics = {
    totalRequests: terminationRequests.length,
    pending: terminationRequests.filter(r => r.status === 'pending').length,
    processing: terminationRequests.filter(r => r.status === 'processing').length,
    completed: terminationRequests.filter(r => r.status === 'completed').length,
  };

  const filteredRequests = terminationRequests.filter(req => {
    const matchesSearch = req.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         req.employeeNIP.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    const matchesType = typeFilter === 'all' || req.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div>
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
        <Card className="p-4 md:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Pengajuan</p>
              <h3 className="text-2xl">{statistics.totalRequests}</h3>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
              <FileText size={24} className="text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Menunggu Approval</p>
              <h3 className="text-2xl">{statistics.pending}</h3>
            </div>
            <div className="w-12 h-12 bg-[#f59e0b]/10 rounded flex items-center justify-center">
              <Clock size={24} className="text-[#f59e0b]" />
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Sedang Diproses</p>
              <h3 className="text-2xl">{statistics.processing}</h3>
            </div>
            <div className="w-12 h-12 bg-[#3b82f6]/10 rounded flex items-center justify-center">
              <AlertTriangle size={24} className="text-[#3b82f6]" />
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Selesai</p>
              <h3 className="text-2xl">{statistics.completed}</h3>
            </div>
            <div className="w-12 h-12 bg-[#10b981]/10 rounded flex items-center justify-center">
              <CheckCircle size={24} className="text-[#10b981]" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="shadow-sm">
        <CardHeader className="border-b">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <CardTitle>Daftar Terminasi</CardTitle>
            <Button className="gap-2" onClick={() => setIsAddDialogOpen(true)}>
              <Plus size={16} />
              Ajukan Terminasi
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Cari karyawan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tipe</SelectItem>
                  <SelectItem value="resignation">Resign</SelectItem>
                  <SelectItem value="retirement">Pensiun</SelectItem>
                  <SelectItem value="layoff">PHK</SelectItem>
                  <SelectItem value="termination">Terminasi</SelectItem>
                  <SelectItem value="contract-end">Akhir Kontrak</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="pending">Menunggu</SelectItem>
                  <SelectItem value="approved">Disetujui</SelectItem>
                  <SelectItem value="rejected">Ditolak</SelectItem>
                  <SelectItem value="processing">Diproses</SelectItem>
                  <SelectItem value="completed">Selesai</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Karyawan</TableHead>
                    <TableHead>Divisi/Posisi</TableHead>
                    <TableHead>Tipe</TableHead>
                    <TableHead>Tanggal Efektif</TableHead>
                    <TableHead>Hari Kerja Terakhir</TableHead>
                    <TableHead className="text-right">Pesangon</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        Tidak ada data terminasi ditemukan
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRequests.map((req) => (
                      <TableRow key={req.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{req.employeeName}</p>
                            <p className="text-sm text-muted-foreground">{req.employeeNIP}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p>{req.division}</p>
                            <p className="text-sm text-muted-foreground">{req.position}</p>
                          </div>
                        </TableCell>
                        <TableCell>{getTypeBadge(req.type)}</TableCell>
                        <TableCell>
                          {format(new Date(req.effectiveDate), 'dd MMM yyyy', { locale: id })}
                        </TableCell>
                        <TableCell>
                          {format(new Date(req.lastWorkingDay), 'dd MMM yyyy', { locale: id })}
                        </TableCell>
                        <TableCell className="text-right font-mono text-sm">
                          {formatCurrency(req.severancePay)}
                        </TableCell>
                        <TableCell className="text-center">
                          {getStatusBadge(req.status)}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Button variant="ghost" size="sm" onClick={() => handleViewDetail(req)}>
                              <Eye size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Termination Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Ajukan Terminasi Karyawan</DialogTitle>
            <DialogDescription>
              Isi formulir pengajuan terminasi karyawan
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Pilih Karyawan *</Label>
                <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih karyawan" />
                  </SelectTrigger>
                  <SelectContent>
                    {MASTER_EMPLOYEES.filter(emp => emp.status === 'active').map((emp) => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.fullName} - {emp.employeeId}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tipe Terminasi *</Label>
                <Select value={terminationType} onValueChange={(value) => setTerminationType(value as TerminationRequest['type'])}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="resignation">Pengunduran Diri (Resign)</SelectItem>
                    <SelectItem value="retirement">Pensiun</SelectItem>
                    <SelectItem value="layoff">PHK (Pemutusan Hubungan Kerja)</SelectItem>
                    <SelectItem value="termination">Terminasi</SelectItem>
                    <SelectItem value="contract-end">Akhir Kontrak</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tanggal Efektif *</Label>
                  <DatePicker
                    date={effectiveDate}
                    onDateChange={setEffectiveDate}
                    placeholder="Pilih tanggal efektif"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hari Kerja Terakhir *</Label>
                  <DatePicker
                    date={lastWorkingDay}
                    onDateChange={setLastWorkingDay}
                    placeholder="Pilih hari kerja terakhir"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Alasan *</Label>
                <Textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Jelaskan alasan terminasi..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Pesangon (Rp)</Label>
                <Input
                  type="number"
                  value={severancePay}
                  onChange={(e) => setSeverancePay(e.target.value)}
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <Label>Catatan</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Catatan tambahan..."
                  rows={2}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleAddTermination}>
              Ajukan Terminasi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detail Terminasi</DialogTitle>
            <DialogDescription>Informasi lengkap terminasi karyawan</DialogDescription>
          </DialogHeader>
          {selectedTermination && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Nama Karyawan</Label>
                  <p className="font-medium">{selectedTermination.employeeName}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">NIP</Label>
                  <p>{selectedTermination.employeeNIP}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Divisi</Label>
                  <p>{selectedTermination.division}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Posisi</Label>
                  <p>{selectedTermination.position}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Tipe Terminasi</Label>
                  <div>{getTypeBadge(selectedTermination.type)}</div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Status</Label>
                  <div>{getStatusBadge(selectedTermination.status)}</div>
                </div>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Alasan</Label>
                <p className="text-sm">{selectedTermination.reason}</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Tanggal Pengajuan</Label>
                  <p>{format(new Date(selectedTermination.submittedDate), 'dd MMMM yyyy', { locale: id })}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Tanggal Efektif</Label>
                  <p>{format(new Date(selectedTermination.effectiveDate), 'dd MMMM yyyy', { locale: id })}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Hari Kerja Terakhir</Label>
                  <p>{format(new Date(selectedTermination.lastWorkingDay), 'dd MMMM yyyy', { locale: id })}</p>
                </div>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Pesangon</Label>
                <p className="font-medium text-lg">{formatCurrency(selectedTermination.severancePay)}</p>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">Status Clearance</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">HR Department</span>
                    {selectedTermination.clearanceStatus.hr ? (
                      <CheckCircle size={16} className="text-green-600" />
                    ) : (
                      <Clock size={16} className="text-gray-400" />
                    )}
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">Finance</span>
                    {selectedTermination.clearanceStatus.finance ? (
                      <CheckCircle size={16} className="text-green-600" />
                    ) : (
                      <Clock size={16} className="text-gray-400" />
                    )}
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">IT Department</span>
                    {selectedTermination.clearanceStatus.it ? (
                      <CheckCircle size={16} className="text-green-600" />
                    ) : (
                      <Clock size={16} className="text-gray-400" />
                    )}
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">Supervisor</span>
                    {selectedTermination.clearanceStatus.supervisor ? (
                      <CheckCircle size={16} className="text-green-600" />
                    ) : (
                      <Clock size={16} className="text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {selectedTermination.notes && (
                <div>
                  <Label className="text-xs text-muted-foreground">Catatan</Label>
                  <p className="text-sm">{selectedTermination.notes}</p>
                </div>
              )}

              {selectedTermination.status === 'pending' && (
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Update Status</Label>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        handleUpdateStatus(selectedTermination.id, 'approved');
                        setIsDetailDialogOpen(false);
                      }}
                    >
                      <CheckCircle size={16} className="mr-2" />
                      Setujui
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => {
                        handleUpdateStatus(selectedTermination.id, 'rejected');
                        setIsDetailDialogOpen(false);
                      }}
                    >
                      <XCircle size={16} className="mr-2" />
                      Tolak
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
