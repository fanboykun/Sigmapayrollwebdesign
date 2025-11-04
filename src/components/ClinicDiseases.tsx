/**
 * ==========================================================================
 * CLINIC MODULE - MASTER DATA PENYAKIT (ICD-10)
 * ==========================================================================
 *
 * Komponen untuk mengelola master data penyakit/diagnosa menggunakan kode ICD-10.
 * Fitur: CRUD, search, filter by category, common diseases marking
 *
 * #ClinicModule #MasterData #Diseases #ICD10
 *
 * @author Sigma Development Team
 * @version 1.0.0
 * @since 2025-11-03
 * ==========================================================================
 */

import { useState, useEffect } from 'react';
import { Card } from './ui/card';
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
  DialogFooter
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Switch } from './ui/switch';
import {
  Search,
  Edit2,
  Trash2,
  Plus,
  FileText,
  Activity,
  Star
} from 'lucide-react';
import { supabase } from '../utils/supabase/client';
import { toast } from 'sonner';

// TypeScript interfaces
interface Disease {
  id: string;
  icd10_code: string;
  name: string;
  category: string;
  description: string | null;
  is_common: boolean;
  is_active: boolean;
  created_at?: string;
}

interface DiseaseFormData {
  icd10_code: string;
  name: string;
  category: string;
  description: string;
  is_common: boolean;
  is_active: boolean;
}

const DISEASE_CATEGORIES = [
  'General', 'Respiratory', 'Digestive', 'Cardiovascular', 'Endocrine',
  'Musculoskeletal', 'Skin', 'Eye', 'ENT', 'Infections', 'Neurological',
  'Psychiatric', 'Reproductive', 'Urinary', 'Other'
];

export function ClinicDiseases() {
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCommonOnly, setShowCommonOnly] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState<DiseaseFormData>({
    icd10_code: '',
    name: '',
    category: 'General',
    description: '',
    is_common: false,
    is_active: true,
  });

  // Load diseases
  useEffect(() => {
    loadDiseases();
  }, []);

  const loadDiseases = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('clinic_diseases')
        .select('*')
        .order('icd10_code');

      if (error) throw error;
      setDiseases(data || []);
    } catch (error: any) {
      console.error('Error loading diseases:', error);
      toast.error('Gagal memuat data penyakit');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter diseases
  const filteredDiseases = diseases.filter((disease) => {
    const matchesSearch =
      disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disease.icd10_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disease.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || disease.category === selectedCategory;

    const matchesCommon = !showCommonOnly || disease.is_common;

    return matchesSearch && matchesCategory && matchesCommon;
  });

  const handleInputChange = (field: keyof DiseaseFormData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const resetForm = () => {
    setFormData({
      icd10_code: '',
      name: '',
      category: 'General',
      description: '',
      is_common: false,
      is_active: true,
    });
  };

  const handleAddDisease = async () => {
    try {
      // Validation
      if (!formData.icd10_code || !formData.name) {
        toast.error('Mohon lengkapi field yang wajib diisi');
        return;
      }

      const { data, error } = await supabase
        .from('clinic_diseases')
        .insert([formData])
        .select()
        .single();

      if (error) throw error;

      toast.success('Penyakit berhasil ditambahkan');
      setIsAddDialogOpen(false);
      resetForm();
      loadDiseases();
    } catch (error: any) {
      console.error('Error adding disease:', error);
      if (error.code === '23505') {
        toast.error('Kode ICD-10 sudah digunakan');
      } else {
        toast.error('Gagal menambahkan penyakit');
      }
    }
  };

  const handleEditDisease = (disease: Disease) => {
    setSelectedDisease(disease);
    setFormData({
      icd10_code: disease.icd10_code,
      name: disease.name,
      category: disease.category,
      description: disease.description || '',
      is_common: disease.is_common,
      is_active: disease.is_active,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateDisease = async () => {
    try {
      if (!selectedDisease) return;

      const { error } = await supabase
        .from('clinic_diseases')
        .update(formData)
        .eq('id', selectedDisease.id);

      if (error) throw error;

      toast.success('Penyakit berhasil diupdate');
      setIsEditDialogOpen(false);
      resetForm();
      setSelectedDisease(null);
      loadDiseases();
    } catch (error: any) {
      console.error('Error updating disease:', error);
      toast.error('Gagal mengupdate penyakit');
    }
  };

  const handleDeleteDisease = async (disease: Disease) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus penyakit "${disease.name}"?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('clinic_diseases')
        .delete()
        .eq('id', disease.id);

      if (error) throw error;

      toast.success('Penyakit berhasil dihapus');
      loadDiseases();
    } catch (error: any) {
      console.error('Error deleting disease:', error);
      if (error.code === '23503') {
        toast.error('Penyakit tidak dapat dihapus karena masih digunakan dalam rekam medis');
      } else {
        toast.error('Gagal menghapus penyakit');
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Master Data Penyakit</h1>
              <p className="text-xs sm:text-sm text-gray-500">Kelola data penyakit dan diagnosa (ICD-10)</p>
            </div>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="!bg-purple-600 hover:!bg-purple-700 !text-white w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden xs:inline">Tambah Penyakit</span>
              <span className="xs:hidden">Tambah Penyakit Baru</span>
            </Button>
            <DialogContent className="max-w-2xl w-[95vw] sm:w-full max-h-[85vh] flex flex-col overflow-hidden">
              <DialogHeader>
                <DialogTitle className="text-lg sm:text-xl">Tambah Penyakit Baru</DialogTitle>
                <DialogDescription className="text-xs sm:text-sm">
                  Lengkapi form di bawah untuk menambahkan data penyakit baru
                </DialogDescription>
              </DialogHeader>

              {/* Form Fields - Scrollable */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-3 sm:space-y-4 max-h-[calc(85vh-200px)]">
                {/* Row 1: ICD-10 Code & Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="icd10_code" className="text-sm">Kode ICD-10 *</Label>
                    <Input
                      id="icd10_code"
                      value={formData.icd10_code}
                      onChange={(e) => handleInputChange('icd10_code', e.target.value.toUpperCase())}
                      placeholder="J00"
                      className="text-sm"
                    />
                    <p className="text-xs text-gray-500">
                      Gunakan kode ICD-10 standar internasional
                    </p>
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="category" className="text-sm">Kategori *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleInputChange('category', value)}
                    >
                      <SelectTrigger className="text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DISEASE_CATEGORIES.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Row 2: Name */}
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="name" className="text-sm">Nama Penyakit *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Nasofaringitis akut (Common cold)"
                    className="text-sm"
                  />
                </div>

                {/* Row 3: Description */}
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="description" className="text-sm">Deskripsi / Catatan</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Deskripsi singkat tentang penyakit ini..."
                    rows={3}
                    className="text-sm resize-none"
                  />
                </div>

                {/* Row 4: Switches */}
                <div className="space-y-3 pt-2 border-t">
                  <div className="flex items-start sm:items-center justify-between gap-3">
                    <div className="space-y-0.5 flex-1">
                      <Label className="text-sm">Penyakit Umum</Label>
                      <p className="text-xs text-muted-foreground">
                        Tandai jika penyakit ini sering terjadi
                      </p>
                    </div>
                    <Switch
                      checked={formData.is_common}
                      onCheckedChange={(checked) => handleInputChange('is_common', checked)}
                      className="flex-shrink-0"
                    />
                  </div>
                  <div className="flex items-start sm:items-center justify-between gap-3">
                    <div className="space-y-0.5 flex-1">
                      <Label className="text-sm">Status Aktif</Label>
                      <p className="text-xs text-muted-foreground">
                        Penyakit dapat digunakan dalam sistem
                      </p>
                    </div>
                    <Switch
                      checked={formData.is_active}
                      onCheckedChange={(checked) => handleInputChange('is_active', checked)}
                      className="flex-shrink-0"
                    />
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-4 shrink-0 pt-4 pb-2 border-t bg-white sticky bottom-0 flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddDialogOpen(false);
                    resetForm();
                  }}
                  className="w-full sm:w-auto border-gray-300"
                >
                  Batal
                </Button>
                <Button
                  onClick={handleAddDisease}
                  className="!bg-purple-600 hover:!bg-purple-700 !text-white w-full sm:w-auto"
                >
                  Simpan Penyakit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-gray-50 p-4 sm:p-6">
        <Card className="mb-4 sm:mb-6 shadow-sm">
          <div className="p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Cari penyakit (nama, kode ICD-10, kategori)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 text-sm"
                />
              </div>

              {/* Filters Row */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:flex-1 lg:w-52">
                    <SelectValue placeholder="Semua Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    {DISEASE_CATEGORIES.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Common Filter */}
                <Button
                  variant={showCommonOnly ? 'default' : 'outline'}
                  onClick={() => setShowCommonOnly(!showCommonOnly)}
                  className={`transition-all duration-200 w-full sm:w-auto sm:min-w-[140px] ${
                    showCommonOnly
                      ? '!bg-amber-500 hover:!bg-amber-600 !text-white !border-amber-500 shadow-md hover:shadow-lg'
                      : '!border-amber-300 !text-amber-700 hover:!bg-amber-50 hover:!border-amber-400'
                  }`}
                >
                  <Star className={`w-4 h-4 mr-2 transition-all duration-200 ${
                    showCommonOnly ? 'fill-amber-200' : 'fill-none'
                  }`} />
                  <span className="font-medium">Umum Saja</span>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {isLoading ? (
            // Loading skeleton
            <>
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="p-5 shadow-sm">
                  <div className="flex items-center justify-between animate-pulse">
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                      <div className="h-8 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                  </div>
                </Card>
              ))}
            </>
          ) : (
            <>
              <Card className="p-5 shadow-sm hover:shadow-md transition-all duration-200 border-l-4 border-l-purple-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Penyakit</p>
                    <p className="text-3xl font-bold text-gray-900">{diseases.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </Card>
              
              <Card className="p-5 shadow-sm hover:shadow-md transition-all duration-200 border-l-4 border-l-amber-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Penyakit Umum</p>
                    <p className="text-3xl font-bold text-amber-600">
                      {diseases.filter(d => d.is_common).length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-amber-600 fill-current" />
                  </div>
                </div>
              </Card>
              
              <Card className="p-5 shadow-sm hover:shadow-md transition-all duration-200 border-l-4 border-l-green-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Penyakit Aktif</p>
                    <p className="text-3xl font-bold text-green-600">
                      {diseases.filter(d => d.is_active).length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Activity className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </Card>
              
              <Card className="p-5 shadow-sm hover:shadow-md transition-all duration-200 border-l-4 border-l-blue-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Kategori</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {new Set(diseases.map(d => d.category)).size}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>

        {/* Table */}
        <Card className="shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ICD-10
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Penyakit
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Kategori
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mb-3"></div>
                        <p className="text-sm text-gray-500">Memuat data penyakit...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredDiseases.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <FileText className="w-12 h-12 text-gray-300 mb-3" />
                        <p className="text-sm text-gray-500 font-medium">Tidak ada data penyakit</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {searchQuery || selectedCategory !== 'all' || showCommonOnly
                            ? 'Coba ubah filter pencarian'
                            : 'Tambahkan penyakit baru untuk memulai'}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredDiseases.map((disease) => (
                    <tr key={disease.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-xs sm:text-sm font-mono font-medium text-purple-700 bg-purple-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                            {disease.icd10_code}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="text-xs sm:text-sm font-medium text-gray-900">
                          {disease.name}
                        </div>
                        {disease.description && (
                          <div className="text-xs text-gray-500 mt-1 max-w-md line-clamp-2 sm:line-clamp-1">
                            {disease.description.slice(0, 80)}
                            {disease.description.length > 80 && '...'}
                          </div>
                        )}
                        {/* Show category badge on mobile (hidden on desktop) */}
                        <div className="md:hidden mt-2">
                          <Badge variant="outline" className="font-normal text-xs">
                            {disease.category}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap hidden md:table-cell">
                        <Badge variant="outline" className="font-normal text-xs">
                          {disease.category}
                        </Badge>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1 sm:gap-1.5">
                          {disease.is_active ? (
                            <Badge variant="default" className="bg-green-100 text-green-700 border-green-200 text-xs">
                              Aktif
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                              Nonaktif
                            </Badge>
                          )}
                          {disease.is_common && (
                            <Badge variant="default" className="bg-amber-100 text-amber-700 border-amber-200 text-xs">
                              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1 fill-current" />
                              <span className="hidden sm:inline">Umum</span>
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-0.5 sm:gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditDisease(disease)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-8 w-8 p-0 sm:h-9 sm:w-9"
                            title="Edit penyakit"
                          >
                            <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteDisease(disease)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0 sm:h-9 sm:w-9"
                            title="Hapus penyakit"
                          >
                            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer - Result count */}
          {!isLoading && filteredDiseases.length > 0 && (
            <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-200">
              <p className="text-xs sm:text-sm text-gray-600">
                Menampilkan <span className="font-medium">{filteredDiseases.length}</span> dari{' '}
                <span className="font-medium">{diseases.length}</span> penyakit
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl w-[95vw] sm:w-full max-h-[85vh] flex flex-col overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Edit Penyakit</DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              Update informasi penyakit {selectedDisease?.name}
            </DialogDescription>
          </DialogHeader>

          {/* Form Fields - Scrollable */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-3 sm:space-y-4 max-h-[calc(85vh-200px)]">
            {/* Row 1: ICD-10 Code & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="edit_icd10_code" className="text-sm">Kode ICD-10 *</Label>
                <Input
                  id="edit_icd10_code"
                  value={formData.icd10_code}
                  onChange={(e) => handleInputChange('icd10_code', e.target.value.toUpperCase())}
                  placeholder="J00"
                  className="text-sm"
                />
                <p className="text-xs text-gray-500">
                  Gunakan kode ICD-10 standar internasional
                </p>
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="edit_category" className="text-sm">Kategori *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleInputChange('category', value)}
                >
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DISEASE_CATEGORIES.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 2: Name */}
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="edit_name" className="text-sm">Nama Penyakit *</Label>
              <Input
                id="edit_name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Nasofaringitis akut (Common cold)"
                className="text-sm"
              />
            </div>

            {/* Row 3: Description */}
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="edit_description" className="text-sm">Deskripsi / Catatan</Label>
              <Textarea
                id="edit_description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Deskripsi singkat tentang penyakit ini..."
                rows={3}
                className="text-sm resize-none"
              />
            </div>

            {/* Row 4: Switches */}
            <div className="space-y-3 pt-2 border-t">
              <div className="flex items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5 flex-1">
                  <Label className="text-sm">Penyakit Umum</Label>
                  <p className="text-xs text-muted-foreground">
                    Tandai jika penyakit ini sering terjadi
                  </p>
                </div>
                <Switch
                  checked={formData.is_common}
                  onCheckedChange={(checked) => handleInputChange('is_common', checked)}
                  className="flex-shrink-0"
                />
              </div>
              <div className="flex items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5 flex-1">
                  <Label className="text-sm">Status Aktif</Label>
                  <p className="text-xs text-muted-foreground">
                    Penyakit dapat digunakan dalam sistem
                  </p>
                </div>
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) => handleInputChange('is_active', checked)}
                  className="flex-shrink-0"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="mt-4 shrink-0 pt-4 pb-2 border-t bg-white sticky bottom-0 flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                resetForm();
                setSelectedDisease(null);
              }}
              className="w-full sm:w-auto border-gray-300"
            >
              Batal
            </Button>
            <Button
              onClick={handleUpdateDisease}
              className="!bg-purple-600 hover:!bg-purple-700 !text-white w-full sm:w-auto"
            >
              Update Penyakit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
