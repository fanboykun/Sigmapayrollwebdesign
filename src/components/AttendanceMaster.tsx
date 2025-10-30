/**
 * AttendanceMaster.tsx
 * 
 * Komponen untuk mengelola Master Presensi/Kehadiran Karyawan.
 * Digunakan untuk mencatat kehadiran karyawan dengan status HK (Hari Kerja),
 * P (Permisi), dan S (Sakit) yang akan mempengaruhi perhitungan upah pokok.
 * 
 * Fitur utama:
 * - CRUD data presensi karyawan per periode
 * - Status kehadiran: HK, P (Permisi), S (Sakit), A (Alfa)
 * - Kalender untuk memilih tanggal
 * - Perhitungan otomatis total hari kerja efektif
 * - Bulk import presensi
 * - Role-based access control
 * 
 * @module AttendanceMaster
 * @author Sistem ERP Perkebunan Sawit
 */

import { useState } from "react";
import { 
  ClipboardCheck, 
  Plus, 
  Pencil, 
  Trash2, 
  Search,
  Save,
  X,
  Calendar as CalendarIcon,
  Users,
  Download,
  Upload,
  FileText
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useAuth } from "../contexts/AuthContext";
import { PermissionGuard } from "./PermissionGuard";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { MASTER_EMPLOYEES } from "../shared/employeeData";

/**
 * Tipe status kehadiran
 */
type AttendanceStatus = "HK" | "P" | "S" | "A" | "C";

/**
 * Interface untuk data Presensi
 */
interface Attendance {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeNIP: string;
  date: string;
  status: AttendanceStatus;
  notes: string;
  month: string;
  year: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Interface untuk ringkasan kehadiran karyawan
 */
interface AttendanceSummary {
  employeeId: string;
  employeeName: string;
  employeeNIP: string;
  totalHK: number;
  totalP: number;
  totalS: number;
  totalA: number;
  totalC: number;
  effectiveDays: number;
  month: string;
  year: number;
}

/**
 * Komponen utama AttendanceMaster
 * Mengelola master presensi karyawan untuk perhitungan upah
 */
export function AttendanceMaster() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Attendance | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedMonth, setSelectedMonth] = useState<string>(
    format(new Date(), "MMMM", { locale: id })
  );
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  // State untuk form input
  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    employeeNIP: "",
    date: "",
    status: "HK" as AttendanceStatus,
    notes: "",
  });

  // Data karyawan untuk dropdown dari master data
  const employees = MASTER_EMPLOYEES.map(emp => ({
    id: emp.id,
    name: emp.fullName,
    nip: emp.employeeId,
  }));

  // Data dummy untuk demonstrasi - menggunakan data master
  const [attendances, setAttendances] = useState<Attendance[]>([
    {
      id: "1",
      employeeId: "1",
      employeeName: "Ahmad Hidayat",
      employeeNIP: "1782829",
      date: "2025-10-02",
      status: "HK",
      notes: "",
      month: "Oktober",
      year: 2025,
      createdBy: "Admin",
      createdAt: "2025-10-02",
      updatedAt: "2025-10-02",
    },
    {
      id: "2",
      employeeId: "1",
      employeeName: "Ahmad Hidayat",
      employeeNIP: "1782829",
      date: "2025-10-03",
      status: "HK",
      notes: "",
      month: "Oktober",
      year: 2025,
      createdBy: "Admin",
      createdAt: "2025-10-03",
      updatedAt: "2025-10-03",
    },
    {
      id: "3",
      employeeId: "3",
      employeeName: "Budi Santoso",
      employeeNIP: "1745623",
      date: "2025-10-02",
      status: "HK",
      notes: "",
      month: "Oktober",
      year: 2025,
      createdBy: "Admin",
      createdAt: "2025-10-02",
      updatedAt: "2025-10-02",
    },
    {
      id: "4",
      employeeId: "3",
      employeeName: "Budi Santoso",
      employeeNIP: "1745623",
      date: "2025-10-06",
      status: "P",
      notes: "Permisi urusan keluarga",
      month: "Oktober",
      year: 2025,
      createdBy: "Admin",
      createdAt: "2025-10-06",
      updatedAt: "2025-10-06",
    },
    {
      id: "5",
      employeeId: "2",
      employeeName: "Siti Nurhaliza",
      employeeNIP: "1782634",
      date: "2025-10-03",
      status: "S",
      notes: "Sakit demam",
      month: "Oktober",
      year: 2025,
      createdBy: "Admin",
      createdAt: "2025-01-03",
      updatedAt: "2025-01-03",
    },
  ]);

  /**
   * Filter data berdasarkan pencarian dan periode
   */
  const filteredData = attendances.filter(item =>
    (item.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.employeeNIP.toLowerCase().includes(searchTerm.toLowerCase())) &&
    item.month === selectedMonth &&
    item.year === selectedYear
  );

  /**
   * Sorting data berdasarkan tanggal
   */
  const sortedData = [...filteredData].sort((a, b) => {
    if (a.employeeName !== b.employeeName) {
      return a.employeeName.localeCompare(b.employeeName);
    }
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  /**
   * Hitung ringkasan kehadiran per karyawan
   */
  const getAttendanceSummary = (): AttendanceSummary[] => {
    const summary: { [key: string]: AttendanceSummary } = {};

    filteredData.forEach(item => {
      if (!summary[item.employeeId]) {
        summary[item.employeeId] = {
          employeeId: item.employeeId,
          employeeName: item.employeeName,
          employeeNIP: item.employeeNIP,
          totalHK: 0,
          totalP: 0,
          totalS: 0,
          totalA: 0,
          totalC: 0,
          effectiveDays: 0,
          month: item.month,
          year: item.year,
        };
      }

      switch (item.status) {
        case "HK":
          summary[item.employeeId].totalHK++;
          break;
        case "P":
          summary[item.employeeId].totalP++;
          break;
        case "S":
          summary[item.employeeId].totalS++;
          break;
        case "A":
          summary[item.employeeId].totalA++;
          break;
        case "C":
          summary[item.employeeId].totalC++;
          break;
      }
    });

    // Hitung hari efektif (HK + P + S + C)
    Object.values(summary).forEach(item => {
      item.effectiveDays = item.totalHK + item.totalP + item.totalS + item.totalC;
    });

    return Object.values(summary);
  };

  /**
   * Handle perubahan input form
   */
  const handleInputChange = (field: string, value: string) => {
    const newFormData = { ...formData, [field]: value };
    
    // Auto-fill employee data when selecting employee
    if (field === "employeeId") {
      const employee = employees.find(e => e.id === value);
      if (employee) {
        newFormData.employeeName = employee.name;
        newFormData.employeeNIP = employee.nip;
      }
    }
    
    setFormData(newFormData);
  };

  /**
   * Buka dialog untuk tambah data baru
   */
  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      employeeId: "",
      employeeName: "",
      employeeNIP: "",
      date: "",
      status: "HK",
      notes: "",
    });
    setSelectedDate(undefined);
    setIsDialogOpen(true);
  };

  /**
   * Buka dialog untuk edit data
   */
  const handleEdit = (item: Attendance) => {
    setEditingItem(item);
    setFormData({
      employeeId: item.employeeId,
      employeeName: item.employeeName,
      employeeNIP: item.employeeNIP,
      date: item.date,
      status: item.status,
      notes: item.notes,
    });
    setSelectedDate(new Date(item.date));
    setIsDialogOpen(true);
  };

  /**
   * Simpan data (create/update)
   */
  const handleSave = () => {
    // Validasi
    if (!formData.employeeId || !formData.date) {
      alert("Karyawan dan tanggal wajib diisi!");
      return;
    }

    const dateObj = new Date(formData.date);
    const month = format(dateObj, "MMMM", { locale: id });
    const year = dateObj.getFullYear();

    if (editingItem) {
      // Update existing
      setAttendances(attendances.map(item =>
        item.id === editingItem.id
          ? {
              ...item,
              ...formData,
              month,
              year,
              updatedAt: new Date().toISOString().split('T')[0],
            }
          : item
      ));
    } else {
      // Create new
      const newItem: Attendance = {
        id: (attendances.length + 1).toString(),
        ...formData,
        month,
        year,
        createdBy: user?.name || "Admin",
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };
      setAttendances([...attendances, newItem]);
    }
    setIsDialogOpen(false);
  };

  /**
   * Handle delete confirmation
   */
  const handleDelete = () => {
    if (editingItem) {
      setAttendances(attendances.filter(item => item.id !== editingItem.id));
      setIsDeleteDialogOpen(false);
      setEditingItem(null);
    }
  };

  /**
   * Handle pemilihan tanggal dari kalender
   */
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setFormData({
        ...formData,
        date: format(date, "yyyy-MM-dd"),
      });
    }
  };

  /**
   * Get badge variant dan label berdasarkan status
   */
  const getStatusBadge = (status: AttendanceStatus) => {
    switch (status) {
      case "HK":
        return { variant: "default" as const, label: "Hadir", className: "bg-green-600" };
      case "P":
        return { variant: "secondary" as const, label: "Permisi", className: "" };
      case "S":
        return { variant: "outline" as const, label: "Sakit", className: "border-yellow-500 text-yellow-700" };
      case "A":
        return { variant: "destructive" as const, label: "Alfa", className: "" };
      case "C":
        return { variant: "outline" as const, label: "Cuti", className: "border-blue-500 text-blue-700" };
      default:
        return { variant: "default" as const, label: status, className: "" };
    }
  };

  return (
    <PermissionGuard module="attendance_master" action="view">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="flex items-center gap-2">
            <ClipboardCheck className="h-8 w-8" />
            Master Presensi Karyawan
          </h1>
          <p className="text-muted-foreground mt-2">
            Kelola data kehadiran karyawan untuk perhitungan upah pokok berdasarkan hari kerja efektif
          </p>
        </div>

        {/* Tabs untuk Data Presensi dan Ringkasan */}
        <Tabs defaultValue="attendance" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="attendance">Data Presensi</TabsTrigger>
            <TabsTrigger value="summary">Ringkasan</TabsTrigger>
          </TabsList>

          {/* Tab Data Presensi */}
          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Data Presensi Detail</CardTitle>
                    <CardDescription>
                      Daftar presensi harian karyawan dengan status kehadiran
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <PermissionGuard module="attendance_master" action="create">
                      <Button onClick={handleAdd}>
                        <Plus className="h-4 w-4 mr-2" />
                        Tambah Presensi
                      </Button>
                    </PermissionGuard>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filter & Search */}
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Cari nama atau NIP karyawan..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                          "Juli", "Agustus", "September", "Oktober", "November", "Desember"
                        ].map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={selectedYear.toString()}
                      onValueChange={(value) => setSelectedYear(parseInt(value))}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[2023, 2024, 2025, 2026].map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Table */}
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>NIP</TableHead>
                        <TableHead>Nama Karyawan</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead>Keterangan</TableHead>
                        <TableHead>Dibuat Oleh</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedData.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                            Tidak ada data presensi untuk periode yang dipilih
                          </TableCell>
                        </TableRow>
                      ) : (
                        sortedData.map((item) => {
                          const statusBadge = getStatusBadge(item.status);
                          return (
                            <TableRow key={item.id}>
                              <TableCell>
                                <div>
                                  <div>{format(new Date(item.date), "dd MMM yyyy", { locale: id })}</div>
                                  <div className="text-muted-foreground text-sm">
                                    {format(new Date(item.date), "EEEE", { locale: id })}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{item.employeeNIP}</TableCell>
                              <TableCell>{item.employeeName}</TableCell>
                              <TableCell className="text-center">
                                <Badge 
                                  variant={statusBadge.variant}
                                  className={statusBadge.className}
                                >
                                  {statusBadge.label}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="max-w-xs truncate" title={item.notes}>
                                  {item.notes || "-"}
                                </div>
                              </TableCell>
                              <TableCell>{item.createdBy}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <PermissionGuard module="attendance_master" action="edit">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleEdit(item)}
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                  </PermissionGuard>
                                  <PermissionGuard module="attendance_master" action="delete">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => {
                                        setEditingItem(item);
                                        setIsDeleteDialogOpen(true);
                                      }}
                                    >
                                      <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                  </PermissionGuard>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Ringkasan */}
          <TabsContent value="summary" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Ringkasan Kehadiran Karyawan</CardTitle>
                    <CardDescription>
                      Rekapitulasi kehadiran per karyawan periode {selectedMonth} {selectedYear}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export Excel
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filter */}
                <div className="flex gap-2 mb-4">
                  <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
                      ].map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={selectedYear.toString()}
                    onValueChange={(value) => setSelectedYear(parseInt(value))}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[2023, 2024, 2025, 2026].map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Table Ringkasan */}
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>NIP</TableHead>
                        <TableHead>Nama Karyawan</TableHead>
                        <TableHead className="text-center">Hadir (HK)</TableHead>
                        <TableHead className="text-center">Permisi (P)</TableHead>
                        <TableHead className="text-center">Sakit (S)</TableHead>
                        <TableHead className="text-center">Alfa (A)</TableHead>
                        <TableHead className="text-center">Cuti (C)</TableHead>
                        <TableHead className="text-center">Total Hari Efektif</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getAttendanceSummary().length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                            Tidak ada data ringkasan untuk periode yang dipilih
                          </TableCell>
                        </TableRow>
                      ) : (
                        getAttendanceSummary().map((summary) => (
                          <TableRow key={summary.employeeId}>
                            <TableCell>{summary.employeeNIP}</TableCell>
                            <TableCell>{summary.employeeName}</TableCell>
                            <TableCell className="text-center">
                              <Badge variant="default" className="bg-green-600">
                                {summary.totalHK}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge variant="secondary">
                                {summary.totalP}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge variant="outline" className="border-yellow-500 text-yellow-700">
                                {summary.totalS}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge variant="destructive">
                                {summary.totalA}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge variant="outline" className="border-blue-500 text-blue-700">
                                {summary.totalC}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge variant="default" className="bg-blue-600">
                                {summary.effectiveDays} Hari
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dialog Form */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Presensi" : "Tambah Presensi"}
              </DialogTitle>
              <DialogDescription>
                {editingItem
                  ? "Perbarui informasi presensi karyawan"
                  : "Tambahkan data presensi karyawan baru"}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              {/* Pilih Karyawan */}
              <div className="grid gap-2">
                <Label htmlFor="employeeId">Karyawan *</Label>
                <Select
                  value={formData.employeeId}
                  onValueChange={(value) => handleInputChange("employeeId", value)}
                  disabled={!!editingItem}
                >
                  <SelectTrigger id="employeeId">
                    <SelectValue placeholder="Pilih karyawan" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((emp) => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.nip} - {emp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Pilih Tanggal */}
                <div className="grid gap-2">
                  <Label>Tanggal *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? (
                          format(selectedDate, "dd MMM yyyy", { locale: id })
                        ) : (
                          "Pilih tanggal"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Status */}
                <div className="grid gap-2">
                  <Label htmlFor="status">Status Kehadiran *</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleInputChange("status", value)}
                  >
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HK">HK - Hadir</SelectItem>
                      <SelectItem value="P">P - Permisi</SelectItem>
                      <SelectItem value="S">S - Sakit</SelectItem>
                      <SelectItem value="A">A - Alfa</SelectItem>
                      <SelectItem value="C">C - Cuti</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Keterangan */}
              <div className="grid gap-2">
                <Label htmlFor="notes">Keterangan</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Tambahkan keterangan jika diperlukan..."
                  rows={3}
                />
              </div>

              {/* Info Legend */}
              <div className="p-3 bg-muted rounded-md">
                <div className="text-sm space-y-1">
                  <p><strong>Keterangan Status:</strong></p>
                  <p>• HK (Hari Kerja): Karyawan hadir dan bekerja normal</p>
                  <p>• P (Permisi): Karyawan tidak hadir dengan izin</p>
                  <p>• S (Sakit): Karyawan tidak hadir karena sakit</p>
                  <p>• A (Alfa): Karyawan tidak hadir tanpa keterangan</p>
                  <p>• C (Cuti): Karyawan mengambil cuti</p>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                <X className="h-4 w-4 mr-2" />
                Batal
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Simpan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Konfirmasi Hapus</DialogTitle>
              <DialogDescription>
                Apakah Anda yakin ingin menghapus data presensi ini? 
                Tindakan ini tidak dapat dibatalkan.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Batal
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Hapus
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PermissionGuard>
  );
}
