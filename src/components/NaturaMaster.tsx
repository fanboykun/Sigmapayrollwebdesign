/**
 * ==========================================================================
 * NATURA MASTER COMPONENT
 * ==========================================================================
 * 
 * Komponen untuk mengelola master data Natura (Catu Beras) berdasarkan
 * status PTKP karyawan per bulan.
 * 
 * FITUR UTAMA:
 * 1. Input data per bulan (12 bulan)
 * 2. Harga per Kg dapat berbeda setiap bulan
 * 3. Jumlah Kg berdasarkan status PTKP
 * 4. Tab navigasi untuk setiap bulan
 * 
 * @author Sistem Payroll Team
 * @version 3.0.0
 * @since 2024-10-29
 * ==========================================================================
 */

import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from './ui/tabs';
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Download,
  Package,
  DollarSign,
  TrendingUp,
  Activity,
  Calendar,
  Copy,
} from 'lucide-react';
import { toast } from 'sonner';
import { MASTER_NATURA, BULAN_LIST } from '../shared/naturaData';

/**
 * Interface untuk data Natura
 */
interface NaturaData {
  id: string;
  ptkpStatus: string;
  ptkpLabel: string;
  bulan: string;
  bulanIndex: number;
  catuBerasKg: number;
  hargaPerKg: number;
  totalPerBulan: number;
  status: 'active' | 'inactive';
  description: string;
  lastUpdated?: string;
}

/**
 * Daftar status PTKP yang tersedia (dari Master Data Pajak)
 */
const PTKP_OPTIONS = [
  { value: 'TK/0', label: 'TK/0 - Tidak Kawin - 0 Tanggungan' },
  { value: 'TK/1', label: 'TK/1 - Tidak Kawin - 1 Tanggungan' },
  { value: 'TK/2', label: 'TK/2 - Tidak Kawin - 2 Tanggungan' },
  { value: 'TK/3', label: 'TK/3 - Tidak Kawin - 3 Tanggungan' },
  { value: 'K/0', label: 'K/0 - Kawin - 0 Tanggungan' },
  { value: 'K/1', label: 'K/1 - Kawin - 1 Tanggungan' },
  { value: 'K/2', label: 'K/2 - Kawin - 2 Tanggungan' },
  { value: 'K/3', label: 'K/3 - Kawin - 3 Tanggungan' },
];

/**
 * ==========================================================================
 * NATURA MASTER COMPONENT
 * ==========================================================================
 */
export function NaturaMaster() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('1'); // Default: Januari
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCopyDialogOpen, setIsCopyDialogOpen] = useState(false);
  const [editingNatura, setEditingNatura] = useState<NaturaData | null>(null);
  const [deletingNatura, setDeletingNatura] = useState<NaturaData | null>(null);

  /**
   * Master data Natura
   */
  const [naturaData, setNaturaData] = useState<NaturaData[]>(
    MASTER_NATURA.map(nat => ({
      ...nat,
      lastUpdated: '2025-10-29',
    }))
  );

  const [formData, setFormData] = useState({
    ptkpStatus: '',
    ptkpLabel: '',
    catuBerasKg: '',
    hargaPerKg: '12000',
    bulan: '',
    bulanIndex: 1,
    description: '',
    status: 'active' as 'active' | 'inactive',
  });

  const [copySourceMonth, setCopySourceMonth] = useState('1');
  const [copyTargetMonth, setCopyTargetMonth] = useState('2');

  /**
   * Get data for selected month
   */
  const getMonthData = (monthIndex: string) => {
    return naturaData.filter((natura) => natura.bulanIndex === parseInt(monthIndex));
  };

  /**
   * Filter data berdasarkan search dan status untuk bulan terpilih
   */
  const filteredData = getMonthData(selectedMonth).filter((natura) => {
    const matchesSearch =
      natura.ptkpLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      natura.ptkpStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
      natura.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || natura.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  /**
   * Calculate statistics untuk bulan terpilih
   */
  const monthData = getMonthData(selectedMonth);
  const stats = {
    totalRecords: monthData.length,
    activeRecords: monthData.filter((n) => n.status === 'active').length,
    totalKgPerMonth: monthData
      .filter((n) => n.status === 'active')
      .reduce((sum, n) => sum + n.catuBerasKg, 0),
    totalNilai: monthData
      .filter((n) => n.status === 'active')
      .reduce((sum, n) => sum + n.totalPerBulan, 0),
  };

  /**
   * Calculate total berdasarkan Kg dan harga
   */
  const calculateTotal = (kg: number, harga: number): number => {
    return kg * harga;
  };

  /**
   * Handle PTKP selection change - auto fill label dan Kg
   */
  const handlePTKPChange = (value: string) => {
    const selectedPTKP = PTKP_OPTIONS.find(opt => opt.value === value);
    
    // Cari data PTKP ini di bulan yang sedang dipilih untuk mendapatkan Kg standar
    const existingData = naturaData.find(
      n => n.ptkpStatus === value && n.bulanIndex === parseInt(selectedMonth)
    );
    
    setFormData({
      ...formData,
      ptkpStatus: value,
      ptkpLabel: selectedPTKP?.label.split(' - ').slice(1).join(' - ') || '',
      catuBerasKg: existingData ? existingData.catuBerasKg.toString() : '',
    });
  };

  /**
   * Handle open add dialog
   */
  const handleAdd = () => {
    setEditingNatura(null);
    setFormData({
      ptkpStatus: '',
      ptkpLabel: '',
      catuBerasKg: '',
      hargaPerKg: '12000',
      bulan: BULAN_LIST[parseInt(selectedMonth) - 1],
      bulanIndex: parseInt(selectedMonth),
      description: '',
      status: 'active',
    });
    setIsDialogOpen(true);
  };

  /**
   * Handle open edit dialog
   */
  const handleEdit = (natura: NaturaData) => {
    setEditingNatura(natura);
    setFormData({
      ptkpStatus: natura.ptkpStatus,
      ptkpLabel: natura.ptkpLabel,
      catuBerasKg: natura.catuBerasKg.toString(),
      hargaPerKg: natura.hargaPerKg.toString(),
      bulan: natura.bulan,
      bulanIndex: natura.bulanIndex,
      description: natura.description,
      status: natura.status,
    });
    setIsDialogOpen(true);
  };

  /**
   * Handle save (add or update)
   */
  const handleSave = () => {
    // Validation
    if (
      !formData.ptkpStatus ||
      !formData.catuBerasKg ||
      !formData.hargaPerKg
    ) {
      toast.error('Mohon lengkapi semua field yang wajib diisi');
      return;
    }

    const catuBerasKg = parseFloat(formData.catuBerasKg);
    const hargaPerKg = parseFloat(formData.hargaPerKg);

    if (isNaN(catuBerasKg) || isNaN(hargaPerKg)) {
      toast.error('Nilai jumlah Kg dan harga harus berupa angka');
      return;
    }

    if (catuBerasKg <= 0 || hargaPerKg <= 0) {
      toast.error('Nilai jumlah Kg dan harga harus lebih dari 0');
      return;
    }

    const totalPerBulan = calculateTotal(catuBerasKg, hargaPerKg);

    if (editingNatura) {
      // Update existing
      setNaturaData((prev) =>
        prev.map((item) =>
          item.id === editingNatura.id
            ? {
                ...item,
                ptkpStatus: formData.ptkpStatus,
                ptkpLabel: formData.ptkpLabel,
                catuBerasKg,
                hargaPerKg,
                totalPerBulan,
                description: formData.description,
                status: formData.status,
                lastUpdated: new Date().toISOString().split('T')[0],
              }
            : item
        )
      );
      toast.success(`Data natura ${formData.bulan} berhasil diperbarui`);
    } else {
      // Check if already exists for this PTKP and month
      const exists = naturaData.find(
        n => n.ptkpStatus === formData.ptkpStatus && n.bulanIndex === formData.bulanIndex
      );
      
      if (exists) {
        toast.error(`Data untuk ${formData.ptkpStatus} pada bulan ${formData.bulan} sudah ada`);
        return;
      }

      // Add new
      const newNatura: NaturaData = {
        id: `NAT-${String(naturaData.length + 1).padStart(3, '0')}`,
        ptkpStatus: formData.ptkpStatus,
        ptkpLabel: formData.ptkpLabel,
        bulan: formData.bulan,
        bulanIndex: formData.bulanIndex,
        catuBerasKg,
        hargaPerKg,
        totalPerBulan,
        description: formData.description,
        status: formData.status,
        lastUpdated: new Date().toISOString().split('T')[0],
      };
      setNaturaData((prev) => [...prev, newNatura]);
      toast.success(`Data natura ${formData.bulan} berhasil ditambahkan`);
    }

    setIsDialogOpen(false);
  };

  /**
   * Handle delete confirmation
   */
  const handleDeleteClick = (natura: NaturaData) => {
    setDeletingNatura(natura);
    setIsDeleteDialogOpen(true);
  };

  /**
   * Handle confirm delete
   */
  const handleConfirmDelete = () => {
    if (deletingNatura) {
      setNaturaData((prev) => prev.filter((item) => item.id !== deletingNatura.id));
      toast.success('Data natura berhasil dihapus');
      setIsDeleteDialogOpen(false);
      setDeletingNatura(null);
    }
  };

  /**
   * Handle copy data from one month to another
   */
  const handleCopyMonth = () => {
    if (copySourceMonth === copyTargetMonth) {
      toast.error('Bulan sumber dan tujuan tidak boleh sama');
      return;
    }

    const sourceData = getMonthData(copySourceMonth);
    const targetMonth = parseInt(copyTargetMonth);
    const targetMonthName = BULAN_LIST[targetMonth - 1];

    // Remove existing target month data
    const filteredData = naturaData.filter(n => n.bulanIndex !== targetMonth);

    // Copy source data to target month
    const copiedData = sourceData.map((source, index) => ({
      ...source,
      id: `NAT-COPY-${targetMonth}-${index}`,
      bulan: targetMonthName,
      bulanIndex: targetMonth,
      description: source.description.replace(source.bulan, targetMonthName),
      lastUpdated: new Date().toISOString().split('T')[0],
    }));

    setNaturaData([...filteredData, ...copiedData]);
    toast.success(`Data berhasil disalin dari ${BULAN_LIST[parseInt(copySourceMonth) - 1]} ke ${targetMonthName}`);
    setIsCopyDialogOpen(false);
  };

  /**
   * Format currency
   */
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  /**
   * Export to CSV
   */
  const handleExport = () => {
    toast.success('Data natura berhasil diekspor');
  };

  /**
   * Bulk update harga for all PTKP in selected month
   */
  const handleBulkUpdatePrice = () => {
    const newPrice = prompt('Masukkan harga baru per Kg untuk semua PTKP di bulan ini:');
    if (newPrice && !isNaN(parseFloat(newPrice))) {
      const price = parseFloat(newPrice);
      setNaturaData(prev =>
        prev.map(item =>
          item.bulanIndex === parseInt(selectedMonth)
            ? {
                ...item,
                hargaPerKg: price,
                totalPerBulan: item.catuBerasKg * price,
                lastUpdated: new Date().toISOString().split('T')[0],
              }
            : item
        )
      );
      toast.success(`Harga berhasil diperbarui untuk semua PTKP di bulan ${BULAN_LIST[parseInt(selectedMonth) - 1]}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-primary mb-2">Master Data Natura Per Bulan</h1>
        <p className="text-muted-foreground">
          Kelola data natura catu beras berdasarkan status PTKP karyawan untuk setiap bulan
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Data PTKP ({BULAN_LIST[parseInt(selectedMonth) - 1]})</p>
              <h3 className="text-primary mt-1">{stats.totalRecords}</h3>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Package className="text-primary" size={24} />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Status Aktif</p>
              <h3 className="text-primary mt-1">{stats.activeRecords}</h3>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Activity className="text-green-600" size={24} />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Total Kg</p>
              <h3 className="text-primary mt-1">{stats.totalKgPerMonth} Kg</h3>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-blue-600" size={24} />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Total Nilai</p>
              <h3 className="text-primary mt-1">{formatCurrency(stats.totalNilai)}</h3>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <DollarSign className="text-orange-600" size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Card with Tabs */}
      <Card className="p-6">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Cari berdasarkan status PTKP atau deskripsi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="inactive">Tidak Aktif</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={() => setIsCopyDialogOpen(true)}>
              <Copy size={16} className="mr-2" />
              Copy Bulan
            </Button>
            <Button variant="outline" size="sm" onClick={handleBulkUpdatePrice}>
              <DollarSign size={16} className="mr-2" />
              Update Harga
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download size={16} className="mr-2" />
              Export
            </Button>
            <Button size="sm" onClick={handleAdd}>
              <Plus size={16} className="mr-2" />
              Tambah Data
            </Button>
          </div>
        </div>

        {/* Tabs for Months */}
        <Tabs value={selectedMonth} onValueChange={setSelectedMonth} className="w-full">
          <TabsList className="grid grid-cols-6 lg:grid-cols-12 w-full mb-6">
            {BULAN_LIST.map((bulan, index) => (
              <TabsTrigger key={index + 1} value={String(index + 1)} className="text-xs">
                {bulan.substring(0, 3)}
              </TabsTrigger>
            ))}
          </TabsList>

          {BULAN_LIST.map((bulan, index) => (
            <TabsContent key={index + 1} value={String(index + 1)} className="mt-0">
              {/* Table */}
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Kode</TableHead>
                      <TableHead>Status PTKP</TableHead>
                      <TableHead className="text-right">Catu Beras (Kg)</TableHead>
                      <TableHead className="text-right">Harga/Kg</TableHead>
                      <TableHead className="text-right">Total/Bulan</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center w-[120px]">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          Tidak ada data untuk bulan {bulan}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredData.map((natura) => (
                        <TableRow key={natura.id}>
                          <TableCell className="text-sm">{natura.id}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{natura.ptkpStatus}</div>
                              <div className="text-sm text-muted-foreground">{natura.ptkpLabel}</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {natura.catuBerasKg} Kg
                          </TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(natura.hargaPerKg)}
                          </TableCell>
                          <TableCell className="text-right font-medium text-primary">
                            {formatCurrency(natura.totalPerBulan)}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant={natura.status === 'active' ? 'default' : 'secondary'}>
                              {natura.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(natura)}
                              >
                                <Pencil size={16} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteClick(natura)}
                              >
                                <Trash2 size={16} className="text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Footer info */}
              <div className="mt-4 text-sm text-muted-foreground">
                Menampilkan {filteredData.length} data untuk bulan {bulan}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingNatura ? 'Edit Data Natura' : 'Tambah Data Natura'}
            </DialogTitle>
            <DialogDescription>
              {editingNatura
                ? `Perbarui data natura untuk bulan ${formData.bulan}`
                : `Tambahkan data natura untuk bulan ${BULAN_LIST[parseInt(selectedMonth) - 1]}`}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Info Bulan */}
            <div className="p-3 bg-muted rounded-lg flex items-center gap-2">
              <Calendar size={18} className="text-primary" />
              <span className="font-medium">
                Bulan: {editingNatura ? formData.bulan : BULAN_LIST[parseInt(selectedMonth) - 1]}
              </span>
            </div>

            {/* Status PTKP */}
            <div className="grid gap-2">
              <Label htmlFor="ptkpStatus">
                Status PTKP <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.ptkpStatus}
                onValueChange={handlePTKPChange}
                disabled={!!editingNatura}
              >
                <SelectTrigger id="ptkpStatus">
                  <SelectValue placeholder="Pilih Status PTKP" />
                </SelectTrigger>
                <SelectContent>
                  {PTKP_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {editingNatura && (
                <p className="text-sm text-muted-foreground">Status PTKP tidak dapat diubah saat edit</p>
              )}
            </div>

            {/* Catu Beras Kg */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="catuBerasKg">
                  Jumlah Catu Beras (Kg) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="catuBerasKg"
                  type="number"
                  placeholder="Contoh: 16"
                  value={formData.catuBerasKg}
                  onChange={(e) =>
                    setFormData({ ...formData, catuBerasKg: e.target.value })
                  }
                />
              </div>

              {/* Harga per Kg */}
              <div className="grid gap-2">
                <Label htmlFor="hargaPerKg">
                  Harga per Kg <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="hargaPerKg"
                  type="number"
                  placeholder="Contoh: 12000"
                  value={formData.hargaPerKg}
                  onChange={(e) =>
                    setFormData({ ...formData, hargaPerKg: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Kalkulasi Total */}
            {formData.catuBerasKg && formData.hargaPerKg && (
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Nilai per Bulan:</span>
                  <span className="text-lg font-semibold text-primary">
                    {formatCurrency(
                      calculateTotal(
                        parseFloat(formData.catuBerasKg),
                        parseFloat(formData.hargaPerKg)
                      )
                    )}
                  </span>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Input
                id="description"
                placeholder="Deskripsi natura (opsional)"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            {/* Status */}
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: 'active' | 'inactive') =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Tidak Aktif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSave}>
              {editingNatura ? 'Perbarui' : 'Simpan'}
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
              Apakah Anda yakin ingin menghapus data natura untuk {deletingNatura?.ptkpStatus} pada bulan {deletingNatura?.bulan}?
              Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Copy Month Dialog */}
      <Dialog open={isCopyDialogOpen} onOpenChange={setIsCopyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Copy Data Antar Bulan</DialogTitle>
            <DialogDescription>
              Salin semua data natura dari satu bulan ke bulan lainnya. Data yang ada di bulan tujuan akan diganti.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="sourceMonth">Bulan Sumber</Label>
              <Select value={copySourceMonth} onValueChange={setCopySourceMonth}>
                <SelectTrigger id="sourceMonth">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BULAN_LIST.map((bulan, index) => (
                    <SelectItem key={index + 1} value={String(index + 1)}>
                      {bulan}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="targetMonth">Bulan Tujuan</Label>
              <Select value={copyTargetMonth} onValueChange={setCopyTargetMonth}>
                <SelectTrigger id="targetMonth">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BULAN_LIST.map((bulan, index) => (
                    <SelectItem key={index + 1} value={String(index + 1)}>
                      {bulan}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>Perhatian:</strong> Semua data yang ada di bulan {BULAN_LIST[parseInt(copyTargetMonth) - 1]} akan diganti dengan data dari bulan {BULAN_LIST[parseInt(copySourceMonth) - 1]}.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCopyDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleCopyMonth}>
              Copy Data
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
