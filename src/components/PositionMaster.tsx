import { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Edit2, Trash2, Plus, Briefcase } from 'lucide-react';
import { Switch } from './ui/switch';

interface Position {
  id: string;
  code: string;
  name: string;
  level: 'karyawan' | 'pegawai' | 'pkwt' | 'staff';
  description: string;
  baseSalary: number;
  allowanceJabatan: number;
  allowanceSkill: number;
  isActive: boolean;
  employeeCount: number;
}

export function PositionMaster() {
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    level: 'karyawan',
    description: '',
    baseSalary: '',
    allowanceJabatan: '',
    allowanceSkill: '',
    isActive: true,
  });

  const [positions, setPositions] = useState<Position[]>([
    {
      id: '1',
      code: 'PMN',
      name: 'Pemanen',
      level: 'karyawan',
      description: 'Karyawan lapangan pemanen TBS',
      baseSalary: 3000000,
      allowanceJabatan: 500000,
      allowanceSkill: 300000,
      isActive: true,
      employeeCount: 85,
    },
    {
      id: '2',
      code: 'SPR-PMN',
      name: 'Supervisor Pemanen',
      level: 'staff',
      description: 'Supervisor tim pemanen',
      baseSalary: 5500000,
      allowanceJabatan: 1500000,
      allowanceSkill: 800000,
      isActive: true,
      employeeCount: 8,
    },
    {
      id: '3',
      code: 'DRV',
      name: 'Supir',
      level: 'karyawan',
      description: 'Supir angkutan TBS',
      baseSalary: 3500000,
      allowanceJabatan: 600000,
      allowanceSkill: 400000,
      isActive: true,
      employeeCount: 15,
    },
    {
      id: '4',
      code: 'MKN',
      name: 'Mekanik',
      level: 'pegawai',
      description: 'Mekanik perawatan alat berat',
      baseSalary: 4500000,
      allowanceJabatan: 1000000,
      allowanceSkill: 700000,
      isActive: true,
      employeeCount: 12,
    },
    {
      id: '5',
      code: 'SPR-MNT',
      name: 'Supervisor Maintenance',
      level: 'staff',
      description: 'Supervisor tim maintenance',
      baseSalary: 6000000,
      allowanceJabatan: 1800000,
      allowanceSkill: 1000000,
      isActive: true,
      employeeCount: 3,
    },
    {
      id: '6',
      code: 'ADM',
      name: 'Admin',
      level: 'pegawai',
      description: 'Staff administrasi',
      baseSalary: 4000000,
      allowanceJabatan: 800000,
      allowanceSkill: 500000,
      isActive: true,
      employeeCount: 8,
    },
    {
      id: '7',
      code: 'ASST-MGR',
      name: 'Asisten Manajer',
      level: 'staff',
      description: 'Asisten manajer operasional kebun',
      baseSalary: 8000000,
      allowanceJabatan: 3000000,
      allowanceSkill: 1500000,
      isActive: true,
      employeeCount: 5,
    },
    {
      id: '8',
      code: 'PRWT',
      name: 'Perawatan',
      level: 'karyawan',
      description: 'Perawatan tanaman dan pemupukan',
      baseSalary: 2800000,
      allowanceJabatan: 450000,
      allowanceSkill: 250000,
      isActive: true,
      employeeCount: 22,
    },
    {
      id: '9',
      code: 'PKWT-PMN',
      name: 'PKWT Pemanen',
      level: 'pkwt',
      description: 'Karyawan kontrak pemanen musiman',
      baseSalary: 2500000,
      allowanceJabatan: 350000,
      allowanceSkill: 200000,
      isActive: true,
      employeeCount: 45,
    },
    {
      id: '10',
      code: 'PKWT-PRWT',
      name: 'PKWT Perawatan',
      level: 'pkwt',
      description: 'Karyawan kontrak perawatan',
      baseSalary: 2400000,
      allowanceJabatan: 300000,
      allowanceSkill: 150000,
      isActive: true,
      employeeCount: 32,
    },
  ]);

  const filteredPositions = positions.filter((pos) => {
    const matchesSearch =
      pos.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pos.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === 'all' || pos.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      level: 'karyawan',
      description: '',
      baseSalary: '',
      allowanceJabatan: '',
      allowanceSkill: '',
      isActive: true,
    });
  };

  const handleAddPosition = () => {
    const newPosition: Position = {
      id: String(positions.length + 1),
      code: formData.code,
      name: formData.name,
      level: formData.level as Position['level'],
      description: formData.description,
      baseSalary: parseFloat(formData.baseSalary) || 0,
      allowanceJabatan: parseFloat(formData.allowanceJabatan) || 0,
      allowanceSkill: parseFloat(formData.allowanceSkill) || 0,
      isActive: formData.isActive,
      employeeCount: 0,
    };

    setPositions([...positions, newPosition]);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditPosition = (position: Position) => {
    setSelectedPosition(position);
    setFormData({
      code: position.code,
      name: position.name,
      level: position.level,
      description: position.description,
      baseSalary: String(position.baseSalary),
      allowanceJabatan: String(position.allowanceJabatan),
      allowanceSkill: String(position.allowanceSkill),
      isActive: position.isActive,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdatePosition = () => {
    if (!selectedPosition) return;

    const updatedPositions = positions.map(pos =>
      pos.id === selectedPosition.id
        ? {
            ...pos,
            code: formData.code,
            name: formData.name,
            level: formData.level as Position['level'],
            description: formData.description,
            baseSalary: parseFloat(formData.baseSalary) || 0,
            allowanceJabatan: parseFloat(formData.allowanceJabatan) || 0,
            allowanceSkill: parseFloat(formData.allowanceSkill) || 0,
            isActive: formData.isActive,
          }
        : pos
    );

    setPositions(updatedPositions);
    setIsEditDialogOpen(false);
    resetForm();
    setSelectedPosition(null);
  };

  const handleDeletePosition = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus jabatan ini?')) {
      setPositions(positions.filter(pos => pos.id !== id));
    }
  };

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  };

  const getLevelLabel = (level: string) => {
    const levels: Record<string, string> = {
      karyawan: 'Karyawan',
      pegawai: 'Pegawai',
      pkwt: 'PKWT',
      staff: 'Staff',
    };
    return levels[level] || level;
  };

  const getLevelBadge = (level: string) => {
    const levelConfig: Record<string, { className: string }> = {
      karyawan: { className: 'bg-[#95aac9]/10 text-[#95aac9]' },
      pegawai: { className: 'bg-[#27bcfd]/10 text-[#27bcfd]' },
      pkwt: { className: 'bg-[#f5803e]/10 text-[#f5803e]' },
      staff: { className: 'bg-[#2c7be5]/10 text-[#2c7be5]' },
    };

    const config = levelConfig[level] || levelConfig.karyawan;
    return <Badge variant="secondary" className={`${config.className} hover:${config.className}`}>{getLevelLabel(level)}</Badge>;
  };

  const PositionFormFields = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="code">Kode Jabatan *</Label>
          <Input
            id="code"
            value={formData.code}
            onChange={(e) => handleInputChange('code', e.target.value)}
            placeholder="PMN"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Nama Jabatan *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Pemanen"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="level">Level Jabatan *</Label>
        <Select value={formData.level} onValueChange={(value) => handleInputChange('level', value)}>
          <SelectTrigger id="level">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="karyawan">Karyawan</SelectItem>
            <SelectItem value="pegawai">Pegawai</SelectItem>
            <SelectItem value="pkwt">PKWT</SelectItem>
            <SelectItem value="staff">Staff</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Deskripsi jabatan..."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="baseSalary">Gaji Pokok (Rp) *</Label>
          <Input
            id="baseSalary"
            type="number"
            value={formData.baseSalary}
            onChange={(e) => handleInputChange('baseSalary', e.target.value)}
            placeholder="3000000"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="allowanceJabatan">Tunj. Jabatan (Rp) *</Label>
          <Input
            id="allowanceJabatan"
            type="number"
            value={formData.allowanceJabatan}
            onChange={(e) => handleInputChange('allowanceJabatan', e.target.value)}
            placeholder="500000"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="allowanceSkill">Tunj. Skill (Rp) *</Label>
          <Input
            id="allowanceSkill"
            type="number"
            value={formData.allowanceSkill}
            onChange={(e) => handleInputChange('allowanceSkill', e.target.value)}
            placeholder="300000"
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
        <div>
          <Label htmlFor="isActive" className="cursor-pointer">Status Aktif</Label>
          <p className="text-sm text-muted-foreground">Jabatan dapat digunakan</p>
        </div>
        <Switch
          id="isActive"
          checked={formData.isActive}
          onCheckedChange={(checked) => handleInputChange('isActive', checked)}
        />
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-6">
      <div className="mb-4 md:mb-6">
        <h1 className="mb-1">Master Jabatan</h1>
        <p className="text-muted-foreground">Kelola data jabatan dan struktur kompensasi</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
        <Card className="p-4 md:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Jabatan</p>
              <h3 className="text-2xl">{positions.length}</h3>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
              <Briefcase size={24} className="text-primary" />
            </div>
          </div>
        </Card>
        <Card className="p-4 md:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Jabatan Aktif</p>
              <h3 className="text-2xl">{positions.filter(p => p.isActive).length}</h3>
            </div>
            <div className="w-12 h-12 bg-[#00d27a]/10 rounded flex items-center justify-center">
              <Briefcase size={24} className="text-[#00d27a]" />
            </div>
          </div>
        </Card>
        <Card className="p-4 md:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Karyawan</p>
              <h3 className="text-2xl">{positions.reduce((sum, p) => sum + p.employeeCount, 0)}</h3>
            </div>
            <div className="w-12 h-12 bg-[#2c7be5]/10 rounded flex items-center justify-center">
              <Briefcase size={24} className="text-[#2c7be5]" />
            </div>
          </div>
        </Card>
        <Card className="p-4 md:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Gaji Tertinggi</p>
              <h3 className="text-xl">{formatCurrency(Math.max(...positions.map(p => p.baseSalary)))}</h3>
            </div>
            <div className="w-12 h-12 bg-[#f5803e]/10 rounded flex items-center justify-center">
              <Briefcase size={24} className="text-[#f5803e]" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="shadow-sm">
        <div className="p-4 md:p-6 border-b border-border">
          <div className="flex flex-col gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Cari jabatan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Semua Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Level</SelectItem>
                  <SelectItem value="karyawan">Karyawan</SelectItem>
                  <SelectItem value="pegawai">Pegawai</SelectItem>
                  <SelectItem value="pkwt">PKWT</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2 flex-1 sm:flex-none" onClick={resetForm}>
                    <Plus size={16} />
                    Tambah Jabatan
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Tambah Jabatan Baru</DialogTitle>
                    <DialogDescription>
                      Tambahkan jabatan baru ke dalam sistem
                    </DialogDescription>
                  </DialogHeader>
                  <PositionFormFields />
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Batal</Button>
                    <Button onClick={handleAddPosition}>Simpan Data</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto -mx-4 md:mx-0">
          <table className="w-full min-w-[900px]">
            <thead className="bg-muted/30 border-b border-border">
              <tr>
                <th className="text-left px-4 md:px-6 py-3 text-sm text-muted-foreground">Kode</th>
                <th className="text-left px-4 md:px-6 py-3 text-sm text-muted-foreground">Nama Jabatan</th>
                <th className="text-left px-4 md:px-6 py-3 text-sm text-muted-foreground">Level</th>
                <th className="text-right px-4 md:px-6 py-3 text-sm text-muted-foreground">Gaji Pokok</th>
                <th className="text-right px-4 md:px-6 py-3 text-sm text-muted-foreground">Tunj. Jabatan</th>
                <th className="text-right px-4 md:px-6 py-3 text-sm text-muted-foreground">Tunj. Skill</th>
                <th className="text-center px-4 md:px-6 py-3 text-sm text-muted-foreground">Karyawan</th>
                <th className="text-center px-4 md:px-6 py-3 text-sm text-muted-foreground">Status</th>
                <th className="text-center px-4 md:px-6 py-3 text-sm text-muted-foreground">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredPositions.map((position) => (
                <tr key={position.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                  <td className="px-4 md:px-6 py-4">
                    <span className="font-medium">{position.code}</span>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <div>
                      <p className="mb-0">{position.name}</p>
                      {position.description && (
                        <p className="text-xs text-muted-foreground line-clamp-1">{position.description}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4">{getLevelBadge(position.level)}</td>
                  <td className="px-4 md:px-6 py-4 text-right">{formatCurrency(position.baseSalary)}</td>
                  <td className="px-4 md:px-6 py-4 text-right">{formatCurrency(position.allowanceJabatan)}</td>
                  <td className="px-4 md:px-6 py-4 text-right">{formatCurrency(position.allowanceSkill)}</td>
                  <td className="px-4 md:px-6 py-4 text-center">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {position.employeeCount}
                    </Badge>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-center">
                    {position.isActive ? (
                      <Badge variant="secondary" className="bg-[#00d27a]/10 text-[#00d27a]">Aktif</Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-muted text-muted-foreground">Tidak Aktif</Badge>
                    )}
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditPosition(position)}
                      >
                        <Edit2 size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeletePosition(position.id)}
                      >
                        <Trash2 size={16} />
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
            Menampilkan {filteredPositions.length} dari {positions.length} jabatan
          </p>
        </div>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Jabatan</DialogTitle>
            <DialogDescription>
              Perbarui informasi jabatan yang dipilih
            </DialogDescription>
          </DialogHeader>
          <PositionFormFields />
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsEditDialogOpen(false); resetForm(); }}>Batal</Button>
            <Button onClick={handleUpdatePosition}>Update Data</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
