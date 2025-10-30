/**
 * LeaveManagement.tsx
 * Komponen untuk mengelola cuti karyawan dengan filter divisi
 * dan search karyawan berdasarkan divisi yang dipilih
 */

import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { DatePicker } from './ui/date-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Eye, CheckCircle, XCircle, Clock, Calendar as CalendarIcon, FileText, Users, User, ChevronsUpDown, Check, Building2, Plus } from 'lucide-react';
import { cn } from './ui/utils';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { MASTER_EMPLOYEES } from '../shared/employeeData';
import { MASTER_DIVISIONS } from '../shared/divisionData';

interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeCode: string;
  division: string;
  position: string;
  leaveType: 'annual' | 'sick' | 'maternity' | 'marriage' | 'bereavement' | 'unpaid' | 'other';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  rejectionReason?: string;
}

export function LeaveManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [divisionFilter, setDivisionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [leaveTypeFilter, setLeaveTypeFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<LeaveRequest | null>(null);

  // Form state
  const [openDivisionCombobox, setOpenDivisionCombobox] = useState(false);
  const [selectedDivisionId, setSelectedDivisionId] = useState('');
  const [openEmployeeCombobox, setOpenEmployeeCombobox] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [formData, setFormData] = useState({
    leaveType: 'annual',
    reason: '',
  });

  // Mock data cuti
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: '1',
      employeeId: '1782829',
      employeeName: 'Ahmad Hidayat',
      employeeCode: '1782829',
      division: 'Bangun Bandar',
      position: 'Mandor Panen',
      leaveType: 'annual',
      startDate: '2025-11-15',
      endDate: '2025-11-17',
      days: 3,
      reason: 'Liburan keluarga',
      status: 'approved',
      submittedDate: '2025-11-01',
      approvedBy: 'Manager HR',
      approvedDate: '2025-11-02',
    },
    {
      id: '2',
      employeeId: '1745623',
      employeeName: 'Budi Santoso',
      employeeCode: '1745623',
      division: 'Bangun Bandar',
      position: 'Pemanen',
      leaveType: 'sick',
      startDate: '2025-10-25',
      endDate: '2025-10-26',
      days: 2,
      reason: 'Sakit demam, ada surat dokter',
      status: 'approved',
      submittedDate: '2025-10-25',
      approvedBy: 'Manager HR',
      approvedDate: '2025-10-25',
    },
    {
      id: '3',
      employeeId: '1793012',
      employeeName: 'Susanto Wijaya',
      employeeCode: '1793012',
      division: 'PT Socfindo Kebun TG',
      position: 'Mandor Panen',
      leaveType: 'annual',
      startDate: '2025-11-20',
      endDate: '2025-11-23',
      days: 4,
      reason: 'Mudik ke kampung halaman',
      status: 'pending',
      submittedDate: '2025-10-28',
    },
    {
      id: '4',
      employeeId: '1782634',
      employeeName: 'Siti Nurhaliza',
      employeeCode: '1782634',
      division: 'Head Office/Kantor Besar Medan',
      position: 'Manajer Administrasi',
      leaveType: 'annual',
      startDate: '2025-12-01',
      endDate: '2025-12-05',
      days: 5,
      reason: 'Liburan akhir tahun',
      status: 'pending',
      submittedDate: '2025-10-29',
    },
  ]);

  // Get selected division and employee
  const selectedDivision = MASTER_DIVISIONS.find(div => div.id === selectedDivisionId);
  const selectedEmployee = MASTER_EMPLOYEES.find(emp => emp.id === selectedEmployeeId);

  // Filter employees by selected division
  const filteredEmployeesByDivision = selectedDivisionId
    ? MASTER_EMPLOYEES.filter(emp => emp.division === selectedDivision?.name)
    : [];

  // Filter leave requests
  const filteredRequests = leaveRequests.filter((req) => {
    const matchesSearch =
      req.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.employeeCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.division.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDivision = divisionFilter === 'all' || req.division === divisionFilter;
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    const matchesLeaveType = leaveTypeFilter === 'all' || req.leaveType === leaveTypeFilter;
    return matchesSearch && matchesDivision && matchesStatus && matchesLeaveType;
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setSelectedDivisionId('');
    setSelectedEmployeeId('');
    setStartDate(undefined);
    setEndDate(undefined);
    setFormData({
      leaveType: 'annual',
      reason: '',
    });
  };

  const calculateDays = (start: Date, end: Date) => {
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const handleAddLeaveRequest = () => {
    if (!selectedEmployee || !startDate || !endDate || !formData.reason) {
      alert('Mohon lengkapi semua data yang diperlukan');
      return;
    }

    const days = calculateDays(startDate, endDate);

    const newRequest: LeaveRequest = {
      id: String(leaveRequests.length + 1),
      employeeId: selectedEmployee.employeeId,
      employeeName: selectedEmployee.fullName,
      employeeCode: selectedEmployee.employeeId,
      division: selectedEmployee.division,
      position: selectedEmployee.position,
      leaveType: formData.leaveType as LeaveRequest['leaveType'],
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd'),
      days,
      reason: formData.reason,
      status: 'pending',
      submittedDate: format(new Date(), 'yyyy-MM-dd'),
    };

    setLeaveRequests([newRequest, ...leaveRequests]);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleApprove = (id: string) => {
    setLeaveRequests(leaveRequests.map(req =>
      req.id === id
        ? {
            ...req,
            status: 'approved',
            approvedBy: 'Manager HR',
            approvedDate: format(new Date(), 'yyyy-MM-dd'),
          }
        : req
    ));
    setIsDetailDialogOpen(false);
  };

  const handleReject = (id: string, reason: string) => {
    setLeaveRequests(leaveRequests.map(req =>
      req.id === id
        ? {
            ...req,
            status: 'rejected',
            approvedBy: 'Manager HR',
            approvedDate: format(new Date(), 'yyyy-MM-dd'),
            rejectionReason: reason,
          }
        : req
    ));
    setIsDetailDialogOpen(false);
  };

  const getLeaveTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      annual: 'Cuti Tahunan',
      sick: 'Cuti Sakit',
      maternity: 'Cuti Hamil/Melahirkan',
      marriage: 'Cuti Menikah',
      bereavement: 'Cuti Duka',
      unpaid: 'Cuti Tanpa Gaji',
      other: 'Lainnya',
    };
    return types[type] || type;
  };

  const getLeaveTypeBadge = (type: string) => {
    const typeConfig: Record<string, { className: string }> = {
      annual: { className: 'bg-[#2c7be5]/10 text-[#2c7be5]' },
      sick: { className: 'bg-[#e63757]/10 text-[#e63757]' },
      maternity: { className: 'bg-[#d946ef]/10 text-[#d946ef]' },
      marriage: { className: 'bg-[#ec4899]/10 text-[#ec4899]' },
      bereavement: { className: 'bg-[#6b7280]/10 text-[#6b7280]' },
      unpaid: { className: 'bg-[#f59e0b]/10 text-[#f59e0b]' },
      other: { className: 'bg-[#95aac9]/10 text-[#95aac9]' },
    };

    const config = typeConfig[type] || typeConfig.other;
    return <Badge variant="secondary" className={config.className}>{getLeaveTypeLabel(type)}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { className: string; icon: any; label: string }> = {
      pending: { className: 'bg-[#f5803e]/10 text-[#f5803e]', icon: Clock, label: 'Menunggu' },
      approved: { className: 'bg-[#00d27a]/10 text-[#00d27a]', icon: CheckCircle, label: 'Disetujui' },
      rejected: { className: 'bg-[#e63757]/10 text-[#e63757]', icon: XCircle, label: 'Ditolak' },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    return (
      <Badge variant="secondary" className={`${config.className} gap-1`}>
        <Icon size={12} />
        {config.label}
      </Badge>
    );
  };

  // Calculate statistics
  const totalRequests = leaveRequests.length;
  const pendingRequests = leaveRequests.filter(r => r.status === 'pending').length;
  const approvedRequests = leaveRequests.filter(r => r.status === 'approved').length;
  const totalDaysUsed = leaveRequests
    .filter(r => r.status === 'approved' && r.leaveType === 'annual')
    .reduce((sum, r) => sum + r.days, 0);

  return (
    <div className="p-4 md:p-6">
      <div className="mb-4 md:mb-6">
        <h1 className="mb-1">Manajemen Cuti Karyawan</h1>
        <p className="text-muted-foreground">Kelola pengajuan cuti karyawan</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
        <Card className="p-4 md:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Pengajuan</p>
              <h3 className="text-2xl">{totalRequests}</h3>
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
              <h3 className="text-2xl">{pendingRequests}</h3>
            </div>
            <div className="w-12 h-12 bg-[#f5803e]/10 rounded flex items-center justify-center">
              <Clock size={24} className="text-[#f5803e]" />
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Disetujui</p>
              <h3 className="text-2xl">{approvedRequests}</h3>
            </div>
            <div className="w-12 h-12 bg-[#00d27a]/10 rounded flex items-center justify-center">
              <CheckCircle size={24} className="text-[#00d27a]" />
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Hari Cuti Digunakan</p>
              <h3 className="text-2xl">{totalDaysUsed}</h3>
              <p className="text-xs text-muted-foreground">Cuti tahunan</p>
            </div>
            <div className="w-12 h-12 bg-[#2c7be5]/10 rounded flex items-center justify-center">
              <CalendarIcon size={24} className="text-[#2c7be5]" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Card */}
      <Card className="shadow-sm mb-6">
        <div className="p-4 md:p-6 border-b border-border">
          <div className="flex flex-col gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Cari karyawan, kode, atau divisi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={divisionFilter} onValueChange={setDivisionFilter}>
                <SelectTrigger className="w-full sm:w-56">
                  <SelectValue placeholder="Semua Divisi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Divisi</SelectItem>
                  {MASTER_DIVISIONS.filter(d => d.isActive).map(div => (
                    <SelectItem key={div.id} value={div.name}>{div.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Semua Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="pending">Menunggu</SelectItem>
                  <SelectItem value="approved">Disetujui</SelectItem>
                  <SelectItem value="rejected">Ditolak</SelectItem>
                </SelectContent>
              </Select>

              <Select value={leaveTypeFilter} onValueChange={setLeaveTypeFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Semua Jenis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Jenis</SelectItem>
                  <SelectItem value="annual">Cuti Tahunan</SelectItem>
                  <SelectItem value="sick">Cuti Sakit</SelectItem>
                  <SelectItem value="maternity">Cuti Hamil/Melahirkan</SelectItem>
                  <SelectItem value="marriage">Cuti Menikah</SelectItem>
                  <SelectItem value="bereavement">Cuti Duka</SelectItem>
                  <SelectItem value="unpaid">Cuti Tanpa Gaji</SelectItem>
                  <SelectItem value="other">Lainnya</SelectItem>
                </SelectContent>
              </Select>

              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2 flex-1 sm:flex-none" onClick={resetForm}>
                    <Plus size={16} />
                    Ajukan Cuti
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Ajukan Cuti Baru</DialogTitle>
                    <DialogDescription>
                      Pilih divisi terlebih dahulu, kemudian pilih karyawan dari divisi tersebut
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    {/* Info Banner */}
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong>Info:</strong> Filter divisi terlebih dahulu untuk melihat daftar karyawan. Data divisi dan jabatan akan otomatis terisi dari karyawan yang dipilih.
                      </p>
                    </div>

                    {/* Division Selection */}
                    <div className="space-y-2">
                      <Label>Pilih Divisi *</Label>
                      <Popover open={openDivisionCombobox} onOpenChange={setOpenDivisionCombobox}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openDivisionCombobox}
                            className="w-full justify-between"
                          >
                            {selectedDivision ? (
                              <div className="flex items-center gap-2">
                                <Building2 size={16} />
                                <span>{selectedDivision.name} ({selectedDivision.code})</span>
                              </div>
                            ) : (
                              "Pilih divisi..."
                            )}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                          <Command>
                            <CommandInput placeholder="Cari divisi..." />
                            <CommandList>
                              <CommandEmpty>Divisi tidak ditemukan.</CommandEmpty>
                              <CommandGroup>
                                {MASTER_DIVISIONS.filter(d => d.isActive).map((division) => (
                                  <CommandItem
                                    key={division.id}
                                    value={`${division.name} ${division.code}`}
                                    onSelect={() => {
                                      setSelectedDivisionId(division.id);
                                      setSelectedEmployeeId(''); // Reset employee selection
                                      setOpenDivisionCombobox(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        selectedDivisionId === division.id ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                    <div className="flex flex-col">
                                      <span>{division.name}</span>
                                      <span className="text-xs text-muted-foreground">
                                        {division.code} • {division.shortname}
                                      </span>
                                    </div>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Employee Selection (only shows when division is selected) */}
                    {selectedDivisionId && (
                      <div className="space-y-2">
                        <Label>Pilih Karyawan *</Label>
                        <Popover open={openEmployeeCombobox} onOpenChange={setOpenEmployeeCombobox}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openEmployeeCombobox}
                              className="w-full justify-between"
                            >
                              {selectedEmployee ? (
                                <div className="flex items-center gap-2">
                                  <User size={16} />
                                  <span>{selectedEmployee.fullName} ({selectedEmployee.employeeId})</span>
                                </div>
                              ) : (
                                "Cari dan pilih karyawan..."
                              )}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0" align="start">
                            <Command>
                              <CommandInput placeholder="Cari nama atau NIK karyawan..." />
                              <CommandList>
                                <CommandEmpty>Karyawan tidak ditemukan.</CommandEmpty>
                                <CommandGroup>
                                  {filteredEmployeesByDivision.map((employee) => (
                                    <CommandItem
                                      key={employee.id}
                                      value={`${employee.fullName} ${employee.employeeId}`}
                                      onSelect={() => {
                                        setSelectedEmployeeId(employee.id);
                                        setOpenEmployeeCombobox(false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          selectedEmployeeId === employee.id ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                      <div className="flex flex-col">
                                        <span>{employee.fullName}</span>
                                        <span className="text-xs text-muted-foreground">
                                          {employee.employeeId} • {employee.position}
                                        </span>
                                      </div>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <p className="text-xs text-muted-foreground">
                          Menampilkan {filteredEmployeesByDivision.length} karyawan dari divisi {selectedDivision?.name}
                        </p>
                      </div>
                    )}

                    {/* Display Selected Employee Info */}
                    {selectedEmployee && (
                      <div className="border-t pt-4">
                        <h4 className="mb-3 text-sm">Data Karyawan Terpilih</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-blue-50 border border-blue-200 rounded">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">NIK</p>
                            <p className="mb-0">{selectedEmployee.employeeId}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Nama Lengkap</p>
                            <p className="mb-0">{selectedEmployee.fullName}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Divisi</p>
                            <p className="mb-0">{selectedEmployee.division}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Jabatan</p>
                            <p className="mb-0">{selectedEmployee.position}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Departemen</p>
                            <p className="mb-0">{selectedEmployee.department}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Status</p>
                            <p className="mb-0 capitalize">{selectedEmployee.status === 'active' ? 'Aktif' : selectedEmployee.status}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Leave Details (only shows when employee is selected) */}
                    {selectedEmployee && (
                      <>
                        <div className="border-t pt-4">
                          <h4 className="mb-3 text-sm">Detail Cuti</h4>
                          
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="leaveType">Jenis Cuti *</Label>
                              <Select value={formData.leaveType} onValueChange={(value) => handleInputChange('leaveType', value)}>
                                <SelectTrigger id="leaveType">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="annual">Cuti Tahunan</SelectItem>
                                  <SelectItem value="sick">Cuti Sakit</SelectItem>
                                  <SelectItem value="maternity">Cuti Hamil/Melahirkan</SelectItem>
                                  <SelectItem value="marriage">Cuti Menikah</SelectItem>
                                  <SelectItem value="bereavement">Cuti Duka</SelectItem>
                                  <SelectItem value="unpaid">Cuti Tanpa Gaji</SelectItem>
                                  <SelectItem value="other">Lainnya</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Tanggal Mulai *</Label>
                                <DatePicker date={startDate} onDateChange={setStartDate} />
                              </div>

                              <div className="space-y-2">
                                <Label>Tanggal Selesai *</Label>
                                <DatePicker date={endDate} onDateChange={setEndDate} />
                              </div>
                            </div>

                            {startDate && endDate && (
                              <div className="p-3 bg-muted/30 rounded">
                                <p className="text-sm">
                                  Durasi: <span className="font-medium">{calculateDays(startDate, endDate)} hari</span>
                                </p>
                              </div>
                            )}

                            <div className="space-y-2">
                              <Label htmlFor="reason">Alasan/Keterangan *</Label>
                              <Textarea
                                id="reason"
                                value={formData.reason}
                                onChange={(e) => handleInputChange('reason', e.target.value)}
                                placeholder="Jelaskan alasan pengajuan cuti..."
                                rows={3}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Batal</Button>
                    <Button onClick={handleAddLeaveRequest} disabled={!selectedEmployee}>
                      Ajukan Cuti
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto -mx-4 md:mx-0">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-muted/30 border-b border-border">
              <tr>
                <th className="text-left px-4 md:px-6 py-3 text-sm text-muted-foreground">Karyawan</th>
                <th className="text-left px-4 md:px-6 py-3 text-sm text-muted-foreground">Divisi</th>
                <th className="text-left px-4 md:px-6 py-3 text-sm text-muted-foreground">Jenis Cuti</th>
                <th className="text-left px-4 md:px-6 py-3 text-sm text-muted-foreground">Periode</th>
                <th className="text-center px-4 md:px-6 py-3 text-sm text-muted-foreground">Durasi</th>
                <th className="text-center px-4 md:px-6 py-3 text-sm text-muted-foreground">Status</th>
                <th className="text-center px-4 md:px-6 py-3 text-sm text-muted-foreground">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                  <td className="px-4 md:px-6 py-4">
                    <div>
                      <p className="mb-0">{request.employeeName}</p>
                      <p className="text-xs text-muted-foreground">{request.employeeCode} • {request.position}</p>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <p className="text-sm">{request.division}</p>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    {getLeaveTypeBadge(request.leaveType)}
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <div className="text-sm">
                      <p className="mb-0">{format(new Date(request.startDate), 'dd MMM yyyy', { locale: idLocale })}</p>
                      <p className="text-xs text-muted-foreground">s/d {format(new Date(request.endDate), 'dd MMM yyyy', { locale: idLocale })}</p>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-center">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {request.days} hari
                    </Badge>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-center">
                    {getStatusBadge(request.status)}
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedLeave(request);
                          setIsDetailDialogOpen(true);
                        }}
                      >
                        <Eye size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-4 md:px-6 py-3 md:py-4 border-t border-border">
          <p className="text-xs md:text-sm text-muted-foreground">
            Menampilkan {filteredRequests.length} dari {leaveRequests.length} pengajuan
          </p>
        </div>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Pengajuan Cuti</DialogTitle>
            <DialogDescription>
              Informasi lengkap pengajuan cuti karyawan
            </DialogDescription>
          </DialogHeader>
          {selectedLeave && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Nama Karyawan</p>
                  <p className="mb-0">{selectedLeave.employeeName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">NIK</p>
                  <p className="mb-0">{selectedLeave.employeeCode}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Divisi</p>
                  <p className="mb-0">{selectedLeave.division}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Jabatan</p>
                  <p className="mb-0">{selectedLeave.position}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Jenis Cuti</p>
                  {getLeaveTypeBadge(selectedLeave.leaveType)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  {getStatusBadge(selectedLeave.status)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tanggal Mulai</p>
                  <p className="mb-0">{format(new Date(selectedLeave.startDate), 'dd MMMM yyyy', { locale: idLocale })}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tanggal Selesai</p>
                  <p className="mb-0">{format(new Date(selectedLeave.endDate), 'dd MMMM yyyy', { locale: idLocale })}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Durasi</p>
                  <p className="mb-0">{selectedLeave.days} hari</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tanggal Pengajuan</p>
                  <p className="mb-0">{format(new Date(selectedLeave.submittedDate), 'dd MMMM yyyy', { locale: idLocale })}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Alasan</p>
                <p className="mb-0">{selectedLeave.reason}</p>
              </div>
              {selectedLeave.status === 'approved' && (
                <div className="p-3 bg-green-50 border border-green-200 rounded">
                  <p className="text-sm mb-1">
                    <strong>Disetujui oleh:</strong> {selectedLeave.approvedBy}
                  </p>
                  <p className="text-sm mb-0">
                    <strong>Tanggal Approval:</strong> {selectedLeave.approvedDate && format(new Date(selectedLeave.approvedDate), 'dd MMMM yyyy', { locale: idLocale })}
                  </p>
                </div>
              )}
              {selectedLeave.status === 'rejected' && (
                <div className="p-3 bg-red-50 border border-red-200 rounded">
                  <p className="text-sm mb-1">
                    <strong>Ditolak oleh:</strong> {selectedLeave.approvedBy}
                  </p>
                  <p className="text-sm mb-1">
                    <strong>Tanggal:</strong> {selectedLeave.approvedDate && format(new Date(selectedLeave.approvedDate), 'dd MMMM yyyy', { locale: idLocale })}
                  </p>
                  <p className="text-sm mb-0">
                    <strong>Alasan Penolakan:</strong> {selectedLeave.rejectionReason}
                  </p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            {selectedLeave?.status === 'pending' && (
              <>
                <Button 
                  variant="outline" 
                  className="bg-red-50 text-red-600 hover:bg-red-100"
                  onClick={() => {
                    const reason = prompt('Masukkan alasan penolakan:');
                    if (reason) handleReject(selectedLeave.id, reason);
                  }}
                >
                  <XCircle size={16} className="mr-2" />
                  Tolak
                </Button>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleApprove(selectedLeave.id)}
                >
                  <CheckCircle size={16} className="mr-2" />
                  Setujui
                </Button>
              </>
            )}
            <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
