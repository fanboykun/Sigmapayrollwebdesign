/**
 * HolidayMaster.tsx
 * 
 * Komponen untuk mengelola Master Hari Libur dalam sistem payroll.
 * Digunakan untuk mendefinisikan hari libur nasional, cuti bersama,
 * dan hari libur perusahaan yang akan mempengaruhi perhitungan gaji.
 * 
 * Fitur utama:
 * - CRUD master hari libur
 * - Kalender untuk memilih tanggal
 * - Kategori hari libur (Nasional, Cuti Bersama, Perusahaan)
 * - Role-based access control
 * - Validasi data input
 * 
 * @module HolidayMaster
 * @author Sistem ERP Perkebunan Sawit
 */

import { useState } from "react";
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Pencil, 
  Trash2, 
  Search,
  Save,
  X,
  AlertCircle
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
import { DatePicker } from "./ui/date-picker";
import { format } from "date-fns";
import { id } from "date-fns/locale";

/**
 * Tipe kategori hari libur
 */
type HolidayCategory = "Nasional" | "Cuti Bersama" | "Perusahaan";

/**
 * Interface untuk data Hari Libur
 */
interface Holiday {
  id: string;
  date: string;
  name: string;
  category: HolidayCategory;
  description: string;
  isPaid: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Komponen utama HolidayMaster
 * Mengelola master hari libur untuk sistem payroll
 */
export function HolidayMaster() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Holiday | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();

  // State untuk form input
  const [formData, setFormData] = useState({
    date: "",
    name: "",
    category: "Nasional" as HolidayCategory,
    description: "",
    isPaid: true,
  });

  // Data dummy untuk demonstrasi
  const [holidays, setHolidays] = useState<Holiday[]>([
    {
      id: "1",
      date: "2025-01-01",
      name: "Tahun Baru 2025",
      category: "Nasional",
      description: "Hari libur nasional tahun baru masehi",
      isPaid: true,
      createdBy: "Admin",
      createdAt: "2024-12-01",
      updatedAt: "2024-12-01",
    },
    {
      id: "2",
      date: "2025-03-31",
      name: "Hari Raya Idul Fitri",
      category: "Nasional",
      description: "Hari libur nasional Idul Fitri 1446 H",
      isPaid: true,
      createdBy: "Admin",
      createdAt: "2024-12-01",
      updatedAt: "2024-12-01",
    },
    {
      id: "3",
      date: "2025-04-01",
      name: "Cuti Bersama Idul Fitri",
      category: "Cuti Bersama",
      description: "Cuti bersama pasca Idul Fitri",
      isPaid: true,
      createdBy: "Admin",
      createdAt: "2024-12-01",
      updatedAt: "2024-12-01",
    },
    {
      id: "4",
      date: "2025-05-01",
      name: "Hari Buruh Internasional",
      category: "Nasional",
      description: "Hari libur buruh/May Day",
      isPaid: true,
      createdBy: "Admin",
      createdAt: "2024-12-01",
      updatedAt: "2024-12-01",
    },
    {
      id: "5",
      date: "2025-08-17",
      name: "Hari Kemerdekaan RI",
      category: "Nasional",
      description: "Hari libur nasional kemerdekaan Indonesia",
      isPaid: true,
      createdBy: "Admin",
      createdAt: "2024-12-01",
      updatedAt: "2024-12-01",
    },
  ]);

  /**
   * Filter data berdasarkan pencarian
   */
  const filteredData = holidays.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.date.includes(searchTerm)
  );

  /**
   * Sorting data berdasarkan tanggal
   */
  const sortedData = [...filteredData].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  /**
   * Handle perubahan input form
   */
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  /**
   * Buka dialog untuk tambah data baru
   */
  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      date: "",
      name: "",
      category: "Nasional",
      description: "",
      isPaid: true,
    });
    setSelectedDate(undefined);
    setIsDialogOpen(true);
  };

  /**
   * Buka dialog untuk edit data
   */
  const handleEdit = (item: Holiday) => {
    setEditingItem(item);
    setFormData({
      date: item.date,
      name: item.name,
      category: item.category,
      description: item.description,
      isPaid: item.isPaid,
    });
    setSelectedDate(new Date(item.date));
    setIsDialogOpen(true);
  };

  /**
   * Simpan data (create/update)
   */
  const handleSave = () => {
    // Validasi
    if (!formData.date || !formData.name) {
      alert("Tanggal dan nama hari libur wajib diisi!");
      return;
    }

    if (editingItem) {
      // Update existing
      setHolidays(holidays.map(item =>
        item.id === editingItem.id
          ? {
              ...item,
              ...formData,
              updatedAt: new Date().toISOString().split('T')[0],
            }
          : item
      ));
    } else {
      // Create new
      const newItem: Holiday = {
        id: (holidays.length + 1).toString(),
        ...formData,
        createdBy: user?.name || "Admin",
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };
      setHolidays([...holidays, newItem]);
    }
    setIsDialogOpen(false);
  };

  /**
   * Handle delete confirmation
   */
  const handleDelete = () => {
    if (editingItem) {
      setHolidays(holidays.filter(item => item.id !== editingItem.id));
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
   * Get badge variant berdasarkan kategori
   */
  const getCategoryBadgeVariant = (category: HolidayCategory) => {
    switch (category) {
      case "Nasional":
        return "default";
      case "Cuti Bersama":
        return "secondary";
      case "Perusahaan":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <PermissionGuard module="holiday_master" action="view">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="flex items-center gap-2">
            <CalendarIcon className="h-8 w-8" />
            Master Hari Libur
          </h1>
          <p className="text-muted-foreground mt-2">
            Kelola data hari libur nasional, cuti bersama, dan hari libur perusahaan
          </p>
        </div>

        {/* Card dengan Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Data Hari Libur</CardTitle>
                <CardDescription>
                  Daftar hari libur yang mempengaruhi perhitungan gaji
                </CardDescription>
              </div>
              <PermissionGuard module="holiday_master" action="create">
                <Button onClick={handleAdd}>
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Hari Libur
                </Button>
              </PermissionGuard>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search Bar */}
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari nama hari libur, kategori, atau tanggal..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Nama Hari Libur</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Keterangan</TableHead>
                    <TableHead className="text-center">Dibayar</TableHead>
                    <TableHead>Dibuat Oleh</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        Tidak ada data ditemukan
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <div>{format(new Date(item.date), "dd MMMM yyyy", { locale: id })}</div>
                            <div className="text-muted-foreground text-sm">
                              {format(new Date(item.date), "EEEE", { locale: id })}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          <Badge variant={getCategoryBadgeVariant(item.category)}>
                            {item.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs truncate" title={item.description}>
                            {item.description || "-"}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {item.isPaid ? (
                            <Badge variant="default" className="bg-green-600">Ya</Badge>
                          ) : (
                            <Badge variant="secondary">Tidak</Badge>
                          )}
                        </TableCell>
                        <TableCell>{item.createdBy}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <PermissionGuard module="holiday_master" action="edit">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(item)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </PermissionGuard>
                            <PermissionGuard module="holiday_master" action="delete">
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
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Dialog Form */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Hari Libur" : "Tambah Hari Libur"}
              </DialogTitle>
              <DialogDescription>
                {editingItem
                  ? "Perbarui informasi hari libur"
                  : "Tambahkan data hari libur baru"}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              {/* Pilih Tanggal dengan Calendar */}
              <div className="grid gap-2">
                <Label>Tanggal Hari Libur *</Label>
                <DatePicker
                  date={selectedDate}
                  onDateChange={handleDateSelect}
                  placeholder="Pilih tanggal hari libur"
                  fromYear={2020}
                  toYear={new Date().getFullYear() + 5}
                />
              </div>

              {/* Nama Hari Libur */}
              <div className="grid gap-2">
                <Label htmlFor="name">Nama Hari Libur *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Contoh: Hari Kemerdekaan RI"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Kategori */}
                <div className="grid gap-2">
                  <Label htmlFor="category">Kategori *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleInputChange("category", value)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nasional">Nasional</SelectItem>
                      <SelectItem value="Cuti Bersama">Cuti Bersama</SelectItem>
                      <SelectItem value="Perusahaan">Perusahaan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status Dibayar */}
                <div className="grid gap-2">
                  <Label htmlFor="isPaid">Status Pembayaran *</Label>
                  <Select
                    value={formData.isPaid ? "true" : "false"}
                    onValueChange={(value) => handleInputChange("isPaid", value === "true")}
                  >
                    <SelectTrigger id="isPaid">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Dibayar</SelectItem>
                      <SelectItem value="false">Tidak Dibayar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Keterangan */}
              <div className="grid gap-2">
                <Label htmlFor="description">Keterangan</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Tambahkan keterangan mengenai hari libur ini..."
                  rows={3}
                />
              </div>

              {/* Info */}
              <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p>
                    Hari libur akan mempengaruhi perhitungan hari efektif kerja dalam sistem payroll.
                  </p>
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
                Apakah Anda yakin ingin menghapus data hari libur ini? 
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
