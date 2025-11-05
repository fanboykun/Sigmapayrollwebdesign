import { useState, useMemo } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog';
import { Search, Edit2, Trash2, Plus, Layers } from 'lucide-react';
import { Switch } from './ui/switch';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MASTER_DIVISIONS } from '../shared/divisionData';
import { MASTER_EMPLOYEES } from '../shared/employeeData';

interface AdministrativeUnit {
  divisi1: { name: string; isFactory: boolean };
  divisi2: { name: string; isFactory: boolean };
  divisi3: { name: string; isFactory: boolean };
  divisi4: { name: string; isFactory: boolean };
  divisi5: { name: string; isFactory: boolean };
  divisi6: { name: string; isFactory: boolean };
  divisi7: { name: string; isFactory: boolean };
}

interface Division {
  id: string;
  code: string;
  shortname: string;
  name: string;
  isFactory: boolean;
  administrativeUnit: AdministrativeUnit;
  group: string;
  isActive: boolean;
  employeeCount: number;
}

export function DivisionMaster() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState<Division | null>(null);

  const [formData, setFormData] = useState({
    code: '',
    shortname: '',
    name: '',
    administrativeUnit: {
      divisi1: { name: '', isFactory: false },
      divisi2: { name: '', isFactory: false },
      divisi3: { name: '', isFactory: false },
      divisi4: { name: '', isFactory: false },
      divisi5: { name: '', isFactory: false },
      divisi6: { name: '', isFactory: false },
      divisi7: { name: '', isFactory: false },
    },
    isActive: true,
  });

  // Initialize divisions with employee count from MASTER_EMPLOYEES
  const initialDivisions: Division[] = useMemo(() => {
    return MASTER_DIVISIONS.map(div => ({
      ...div,
      employeeCount: MASTER_EMPLOYEES.filter(emp => emp.division === div.name).length,
    }));
  }, []);

  const [divisions, setDivisions] = useState<Division[]>(initialDivisions);

  const getAdminUnitDisplay = (adminUnit: Division['administrativeUnit']): string => {
    const values: string[] = [];
    if (adminUnit.divisi1?.name) values.push(`${adminUnit.divisi1.name}${adminUnit.divisi1.isFactory ? ' (Pabrik)' : ''}`);
    if (adminUnit.divisi2?.name) values.push(`${adminUnit.divisi2.name}${adminUnit.divisi2.isFactory ? ' (Pabrik)' : ''}`);
    if (adminUnit.divisi3?.name) values.push(`${adminUnit.divisi3.name}${adminUnit.divisi3.isFactory ? ' (Pabrik)' : ''}`);
    if (adminUnit.divisi4?.name) values.push(`${adminUnit.divisi4.name}${adminUnit.divisi4.isFactory ? ' (Pabrik)' : ''}`);
    if (adminUnit.divisi5?.name) values.push(`${adminUnit.divisi5.name}${adminUnit.divisi5.isFactory ? ' (Pabrik)' : ''}`);
    if (adminUnit.divisi6?.name) values.push(`${adminUnit.divisi6.name}${adminUnit.divisi6.isFactory ? ' (Pabrik)' : ''}`);
    if (adminUnit.divisi7?.name) values.push(`${adminUnit.divisi7.name}${adminUnit.divisi7.isFactory ? ' (Pabrik)' : ''}`);
    return values.join(', ');
  };

  const filteredDivisions = divisions.filter((div) =>
    div.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    div.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    div.shortname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    getAdminUnitDisplay(div.administrativeUnit).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAdminUnitChange = (divisi: keyof AdministrativeUnit, field: 'name' | 'isFactory', value: string | boolean) => {
    setFormData({
      ...formData,
      administrativeUnit: {
        ...formData.administrativeUnit,
        [divisi]: {
          ...formData.administrativeUnit[divisi],
          [field]: value,
        },
      },
    });
  };

  const resetForm = () => {
    setFormData({
      code: '',
      shortname: '',
      name: '',
      administrativeUnit: {
        divisi1: { name: '', isFactory: false },
        divisi2: { name: '', isFactory: false },
        divisi3: { name: '', isFactory: false },
        divisi4: { name: '', isFactory: false },
        divisi5: { name: '', isFactory: false },
        divisi6: { name: '', isFactory: false },
        divisi7: { name: '', isFactory: false },
      },
      isActive: true,
    });
  };

  const handleAddDivision = () => {
    const newDivision: Division = {
      id: String(Math.max(...divisions.map(d => parseInt(d.id))) + 1),
      code: formData.code,
      shortname: formData.shortname,
      name: formData.name,
      isFactory: false, // Keep for compatibility but not used
      administrativeUnit: formData.administrativeUnit,
      group: '', // Keep for compatibility but not used
      isActive: formData.isActive,
      employeeCount: 0,
    };

    setDivisions([...divisions, newDivision]);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditDivision = (division: Division) => {
    setSelectedDivision(division);
    setFormData({
      code: division.code,
      shortname: division.shortname,
      name: division.name,
      administrativeUnit: division.administrativeUnit,
      isActive: division.isActive,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateDivision = () => {
    if (!selectedDivision) return;

    const updatedDivisions = divisions.map(div =>
      div.id === selectedDivision.id
        ? {
            ...div,
            code: formData.code,
            shortname: formData.shortname,
            name: formData.name,
            isFactory: false, // Keep for compatibility
            administrativeUnit: formData.administrativeUnit,
            group: '', // Keep for compatibility
            isActive: formData.isActive,
          }
        : div
    );

    setDivisions(updatedDivisions);
    setIsEditDialogOpen(false);
    resetForm();
    setSelectedDivision(null);
  };

  const handleDeleteDivision = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus unit ini?')) {
      setDivisions(divisions.filter(div => div.id !== id));
    }
  };

  // Render form fields directly in JSX to prevent lost focus issue
  const renderFormFields = () => {
    if (!formData?.administrativeUnit) return null;
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="code">Kode *</Label>
            <Input
              id="code"
              value={formData.code || ''}
              onChange={(e) => handleInputChange('code', e.target.value)}
              placeholder="7"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shortname">Shortname *</Label>
            <Input
              id="shortname"
              value={formData.shortname || ''}
              onChange={(e) => handleInputChange('shortname', e.target.value)}
              placeholder="BB"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Nama Unit *</Label>
          <Input
            id="name"
            value={formData.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Bangun Bandar"
          />
        </div>

        <div className="space-y-3">
          <Label>Administrative Unit *</Label>
          <p className="text-sm text-muted-foreground mb-3">Isi divisi yang terkait dengan unit ini</p>
          <div className="border rounded-md p-3 bg-muted/10">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex gap-3 items-center">
                <Input
                  id="divisi1"
                  value={formData.administrativeUnit.divisi1?.name || ''}
                  onChange={(e) => handleAdminUnitChange('divisi1', 'name', e.target.value)}
                  placeholder="Divisi I"
                  className="flex-1"
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="divisi1-factory"
                    checked={formData.administrativeUnit.divisi1?.isFactory || false}
                    onCheckedChange={(checked) => handleAdminUnitChange('divisi1', 'isFactory', checked as boolean)}
                  />
                  <Label htmlFor="divisi1-factory" className="cursor-pointer text-sm whitespace-nowrap">
                    Pabrik
                  </Label>
                </div>
              </div>
              
              <div className="flex gap-3 items-center">
                <Input
                  id="divisi2"
                  value={formData.administrativeUnit.divisi2?.name || ''}
                  onChange={(e) => handleAdminUnitChange('divisi2', 'name', e.target.value)}
                  placeholder="Divisi II"
                  className="flex-1"
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="divisi2-factory"
                    checked={formData.administrativeUnit.divisi2?.isFactory || false}
                    onCheckedChange={(checked) => handleAdminUnitChange('divisi2', 'isFactory', checked as boolean)}
                  />
                  <Label htmlFor="divisi2-factory" className="cursor-pointer text-sm whitespace-nowrap">
                    Pabrik
                  </Label>
                </div>
              </div>
              
              <div className="flex gap-3 items-center">
                <Input
                  id="divisi3"
                  value={formData.administrativeUnit.divisi3?.name || ''}
                  onChange={(e) => handleAdminUnitChange('divisi3', 'name', e.target.value)}
                  placeholder="Divisi III"
                  className="flex-1"
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="divisi3-factory"
                    checked={formData.administrativeUnit.divisi3?.isFactory || false}
                    onCheckedChange={(checked) => handleAdminUnitChange('divisi3', 'isFactory', checked as boolean)}
                  />
                  <Label htmlFor="divisi3-factory" className="cursor-pointer text-sm whitespace-nowrap">
                    Pabrik
                  </Label>
                </div>
              </div>
              
              <div className="flex gap-3 items-center">
                <Input
                  id="divisi4"
                  value={formData.administrativeUnit.divisi4?.name || ''}
                  onChange={(e) => handleAdminUnitChange('divisi4', 'name', e.target.value)}
                  placeholder="Divisi IV"
                  className="flex-1"
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="divisi4-factory"
                    checked={formData.administrativeUnit.divisi4?.isFactory || false}
                    onCheckedChange={(checked) => handleAdminUnitChange('divisi4', 'isFactory', checked as boolean)}
                  />
                  <Label htmlFor="divisi4-factory" className="cursor-pointer text-sm whitespace-nowrap">
                    Pabrik
                  </Label>
                </div>
              </div>
              
              <div className="flex gap-3 items-center">
                <Input
                  id="divisi5"
                  value={formData.administrativeUnit.divisi5?.name || ''}
                  onChange={(e) => handleAdminUnitChange('divisi5', 'name', e.target.value)}
                  placeholder="Divisi Kebun"
                  className="flex-1"
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="divisi5-factory"
                    checked={formData.administrativeUnit.divisi5?.isFactory || false}
                    onCheckedChange={(checked) => handleAdminUnitChange('divisi5', 'isFactory', checked as boolean)}
                  />
                  <Label htmlFor="divisi5-factory" className="cursor-pointer text-sm whitespace-nowrap">
                    Pabrik
                  </Label>
                </div>
              </div>
              
              <div className="flex gap-3 items-center">
                <Input
                  id="divisi6"
                  value={formData.administrativeUnit.divisi6?.name || ''}
                  onChange={(e) => handleAdminUnitChange('divisi6', 'name', e.target.value)}
                  placeholder="Divisi Pabrik"
                  className="flex-1"
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="divisi6-factory"
                    checked={formData.administrativeUnit.divisi6?.isFactory || false}
                    onCheckedChange={(checked) => handleAdminUnitChange('divisi6', 'isFactory', checked as boolean)}
                  />
                  <Label htmlFor="divisi6-factory" className="cursor-pointer text-sm whitespace-nowrap">
                    Pabrik
                  </Label>
                </div>
              </div>
              
              <div className="flex gap-3 items-center">
                <Input
                  id="divisi7"
                  value={formData.administrativeUnit.divisi7?.name || ''}
                  onChange={(e) => handleAdminUnitChange('divisi7', 'name', e.target.value)}
                  placeholder="Divisi VII"
                  className="flex-1"
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="divisi7-factory"
                    checked={formData.administrativeUnit.divisi7?.isFactory || false}
                    onCheckedChange={(checked) => handleAdminUnitChange('divisi7', 'isFactory', checked as boolean)}
                  />
                  <Label htmlFor="divisi7-factory" className="cursor-pointer text-sm whitespace-nowrap">
                    Pabrik
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
          <div>
            <Label htmlFor="isActive" className="cursor-pointer">Status Aktif</Label>
            <p className="text-sm text-muted-foreground">Unit dapat digunakan</p>
          </div>
          <Switch
            id="isActive"
            checked={formData.isActive}
            onCheckedChange={(checked) => handleInputChange('isActive', checked)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-4 md:mb-6">
        <h1 className="mb-1">Master Administrative Unit</h1>
        <p className="text-muted-foreground">Kelola data unit administratif perusahaan perkebunan</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
        <Card className="p-4 md:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Unit</p>
              <h3 className="text-2xl">{divisions.length}</h3>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
              <Layers size={24} className="text-primary" />
            </div>
          </div>
        </Card>
        <Card className="p-4 md:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Unit Aktif</p>
              <h3 className="text-2xl">{divisions.filter(d => d.isActive).length}</h3>
            </div>
            <div className="w-12 h-12 bg-[#00d27a]/10 rounded flex items-center justify-center">
              <Layers size={24} className="text-[#00d27a]" />
            </div>
          </div>
        </Card>
        <Card className="p-4 md:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Karyawan</p>
              <h3 className="text-2xl">{divisions.reduce((sum, d) => sum + d.employeeCount, 0)}</h3>
            </div>
            <div className="w-12 h-12 bg-[#2c7be5]/10 rounded flex items-center justify-center">
              <Layers size={24} className="text-[#2c7be5]" />
            </div>
          </div>
        </Card>
        <Card className="p-4 md:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Rata-rata/Unit</p>
              <h3 className="text-2xl">{Math.round(divisions.reduce((sum, d) => sum + d.employeeCount, 0) / divisions.length)}</h3>
            </div>
            <div className="w-12 h-12 bg-[#f5803e]/10 rounded flex items-center justify-center">
              <Layers size={24} className="text-[#f5803e]" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="shadow-sm">
        <div className="p-4 md:p-6 border-b border-border">
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Cari unit administratif..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2" onClick={resetForm}>
                  <Plus size={16} />
                  Tambah Unit
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
                <DialogHeader>
                  <DialogTitle>Tambah Unit Baru</DialogTitle>
                  <DialogDescription>
                    Tambahkan unit atau divisi baru ke dalam sistem
                  </DialogDescription>
                </DialogHeader>
                <div className="overflow-y-auto flex-1 pr-2">
                  {renderFormFields()}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Batal</Button>
                  <Button onClick={handleAddDivision}>Simpan Data</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="overflow-x-auto -mx-4 md:mx-0">
          <table className="w-full min-w-[800px]">
            <thead className="bg-muted/30 border-b border-border">
              <tr>
                <th className="text-left px-4 md:px-6 py-3 text-sm text-muted-foreground">Shortname</th>
                <th className="text-left px-4 md:px-6 py-3 text-sm text-muted-foreground">Estate</th>
                <th className="text-left px-4 md:px-6 py-3 text-sm text-muted-foreground">Administrative Unit</th>
                <th className="text-center px-4 md:px-6 py-3 text-sm text-muted-foreground">Karyawan</th>
                <th className="text-center px-4 md:px-6 py-3 text-sm text-muted-foreground">Status</th>
                <th className="text-center px-4 md:px-6 py-3 text-sm text-muted-foreground">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredDivisions.map((division) => (
                <tr key={division.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                  <td className="px-4 md:px-6 py-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {division.shortname}
                    </Badge>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <p className="mb-0">{division.name}</p>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-muted-foreground">{getAdminUnitDisplay(division.administrativeUnit)}</td>
                  <td className="px-4 md:px-6 py-4 text-center">
                    <Badge variant="secondary" className="bg-[#2c7be5]/10 text-[#2c7be5]">
                      {division.employeeCount}
                    </Badge>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-center">
                    {division.isActive ? (
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
                        onClick={() => handleEditDivision(division)}
                      >
                        <Edit2 size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteDivision(division.id)}
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
            Menampilkan {filteredDivisions.length} dari {divisions.length} unit administratif
          </p>
        </div>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Edit Unit</DialogTitle>
            <DialogDescription>
              Perbarui informasi unit atau divisi yang dipilih
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto flex-1 pr-2">
            {renderFormFields()}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsEditDialogOpen(false); resetForm(); }}>Batal</Button>
            <Button onClick={handleUpdateDivision}>Update Data</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
