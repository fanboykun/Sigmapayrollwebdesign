import { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Search, Edit2, Trash2, Plus, Receipt } from 'lucide-react';
import { Switch } from './ui/switch';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from './ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';

interface PTKP {
  id: string;
  code: string;
  status: string;
  description: string;
  amount: number;
  isActive: boolean;
}

interface TaxBracket {
  id: string;
  minIncome: number;
  maxIncome: number | null;
  rate: number;
  description: string;
  isActive: boolean;
}

interface BPJSRate {
  id: string;
  type: 'kesehatan' | 'ketenagakerjaan-jkk' | 'ketenagakerjaan-jkm' | 'ketenagakerjaan-jp';
  name: string;
  employeeRate: number;
  employerRate: number;
  maxSalary: number | null;
  isActive: boolean;
}

export function TaxMaster() {
  const [activeTab, setActiveTab] = useState('ptkp');

  // PTKP State
  const [ptkpData, setPtkpData] = useState<PTKP[]>([
    { id: '1', code: 'TK/0', status: 'Tidak Kawin - 0 Tanggungan', description: 'Belum menikah tanpa tanggungan', amount: 54000000, isActive: true },
    { id: '2', code: 'TK/1', status: 'Tidak Kawin - 1 Tanggungan', description: 'Belum menikah dengan 1 tanggungan', amount: 58500000, isActive: true },
    { id: '3', code: 'TK/2', status: 'Tidak Kawin - 2 Tanggungan', description: 'Belum menikah dengan 2 tanggungan', amount: 63000000, isActive: true },
    { id: '4', code: 'TK/3', status: 'Tidak Kawin - 3 Tanggungan', description: 'Belum menikah dengan 3 tanggungan', amount: 67500000, isActive: true },
    { id: '5', code: 'K/0', status: 'Kawin - 0 Tanggungan', description: 'Menikah tanpa tanggungan', amount: 58500000, isActive: true },
    { id: '6', code: 'K/1', status: 'Kawin - 1 Tanggungan', description: 'Menikah dengan 1 tanggungan', amount: 63000000, isActive: true },
    { id: '7', code: 'K/2', status: 'Kawin - 2 Tanggungan', description: 'Menikah dengan 2 tanggungan', amount: 67500000, isActive: true },
    { id: '8', code: 'K/3', status: 'Kawin - 3 Tanggungan', description: 'Menikah dengan 3 tanggungan', amount: 72000000, isActive: true },
    { id: '9', code: 'K/I/0', status: 'Kawin Istri Bekerja - 0 Tanggungan', description: 'Menikah, istri bekerja, tanpa tanggungan', amount: 112500000, isActive: true },
    { id: '10', code: 'K/I/1', status: 'Kawin Istri Bekerja - 1 Tanggungan', description: 'Menikah, istri bekerja, 1 tanggungan', amount: 117000000, isActive: true },
    { id: '11', code: 'K/I/2', status: 'Kawin Istri Bekerja - 2 Tanggungan', description: 'Menikah, istri bekerja, 2 tanggungan', amount: 121500000, isActive: true },
    { id: '12', code: 'K/I/3', status: 'Kawin Istri Bekerja - 3 Tanggungan', description: 'Menikah, istri bekerja, 3 tanggungan', amount: 126000000, isActive: true },
  ]);

  // Tax Bracket State
  const [taxBrackets, setTaxBrackets] = useState<TaxBracket[]>([
    { id: '1', minIncome: 0, maxIncome: 60000000, rate: 5, description: 'Penghasilan sampai dengan Rp 60.000.000', isActive: true },
    { id: '2', minIncome: 60000000, maxIncome: 250000000, rate: 15, description: 'Penghasilan di atas Rp 60.000.000 sampai dengan Rp 250.000.000', isActive: true },
    { id: '3', minIncome: 250000000, maxIncome: 500000000, rate: 25, description: 'Penghasilan di atas Rp 250.000.000 sampai dengan Rp 500.000.000', isActive: true },
    { id: '4', minIncome: 500000000, maxIncome: 5000000000, rate: 30, description: 'Penghasilan di atas Rp 500.000.000 sampai dengan Rp 5.000.000.000', isActive: true },
    { id: '5', minIncome: 5000000000, maxIncome: null, rate: 35, description: 'Penghasilan di atas Rp 5.000.000.000', isActive: true },
  ]);

  // BPJS Rates State
  const [bpjsRates, setBpjsRates] = useState<BPJSRate[]>([
    { id: '1', type: 'kesehatan', name: 'BPJS Kesehatan - Karyawan', employeeRate: 1, employerRate: 4, maxSalary: 12000000, isActive: true },
    { id: '2', type: 'ketenagakerjaan-jkk', name: 'BPJS Ketenagakerjaan - JKK (Jaminan Kecelakaan Kerja)', employeeRate: 0, employerRate: 0.24, maxSalary: null, isActive: true },
    { id: '3', type: 'ketenagakerjaan-jkm', name: 'BPJS Ketenagakerjaan - JKM (Jaminan Kematian)', employeeRate: 0, employerRate: 0.3, maxSalary: null, isActive: true },
    { id: '4', type: 'ketenagakerjaan-jp', name: 'BPJS Ketenagakerjaan - JP (Jaminan Pensiun)', employeeRate: 1, employerRate: 2, maxSalary: 9559600, isActive: true },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  
  // Dialog states
  const [isAddPtkpDialogOpen, setIsAddPtkpDialogOpen] = useState(false);
  const [isAddTaxBracketDialogOpen, setIsAddTaxBracketDialogOpen] = useState(false);
  const [isAddBpjsDialogOpen, setIsAddBpjsDialogOpen] = useState(false);
  
  // Edit states
  const [editingPtkp, setEditingPtkp] = useState<PTKP | null>(null);
  const [editingTaxBracket, setEditingTaxBracket] = useState<TaxBracket | null>(null);
  const [editingBpjs, setEditingBpjs] = useState<BPJSRate | null>(null);
  
  // Delete confirmation states
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteType, setDeleteType] = useState<'ptkp' | 'tax' | 'bpjs'>('ptkp');
  const [deleteId, setDeleteId] = useState<string>('');
  
  // Form states for PTKP
  const [ptkpForm, setPtkpForm] = useState({
    code: '',
    status: '',
    description: '',
    amount: 0,
    isActive: true,
  });
  
  // Form states for Tax Bracket
  const [taxBracketForm, setTaxBracketForm] = useState({
    minIncome: 0,
    maxIncome: null as number | null,
    rate: 0,
    description: '',
    isActive: true,
  });
  
  // Form states for BPJS
  const [bpjsForm, setBpjsForm] = useState({
    type: 'kesehatan' as 'kesehatan' | 'ketenagakerjaan-jkk' | 'ketenagakerjaan-jkm' | 'ketenagakerjaan-jp',
    name: '',
    employeeRate: 0,
    employerRate: 0,
    maxSalary: null as number | null,
    isActive: true,
  });

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  };
  
  // PTKP Handlers
  const handleAddPtkp = () => {
    setPtkpForm({
      code: '',
      status: '',
      description: '',
      amount: 0,
      isActive: true,
    });
    setEditingPtkp(null);
    setIsAddPtkpDialogOpen(true);
  };
  
  const handleEditPtkp = (ptkp: PTKP) => {
    setEditingPtkp(ptkp);
    setPtkpForm({
      code: ptkp.code,
      status: ptkp.status,
      description: ptkp.description,
      amount: ptkp.amount,
      isActive: ptkp.isActive,
    });
    setIsAddPtkpDialogOpen(true);
  };
  
  const handleSavePtkp = () => {
    if (!ptkpForm.code || !ptkpForm.status || !ptkpForm.amount) {
      toast.error('Mohon lengkapi semua field yang diperlukan');
      return;
    }
    
    if (editingPtkp) {
      setPtkpData(ptkpData.map(p => 
        p.id === editingPtkp.id 
          ? { ...p, ...ptkpForm }
          : p
      ));
      toast.success('Data PTKP berhasil diperbarui');
    } else {
      const newPtkp: PTKP = {
        id: (ptkpData.length + 1).toString(),
        ...ptkpForm,
      };
      setPtkpData([...ptkpData, newPtkp]);
      toast.success('Data PTKP berhasil ditambahkan');
    }
    setIsAddPtkpDialogOpen(false);
  };
  
  const handleDeletePtkp = (id: string) => {
    setDeleteType('ptkp');
    setDeleteId(id);
    setDeleteConfirmOpen(true);
  };
  
  // Tax Bracket Handlers
  const handleAddTaxBracket = () => {
    setTaxBracketForm({
      minIncome: 0,
      maxIncome: null,
      rate: 0,
      description: '',
      isActive: true,
    });
    setEditingTaxBracket(null);
    setIsAddTaxBracketDialogOpen(true);
  };
  
  const handleEditTaxBracket = (bracket: TaxBracket) => {
    setEditingTaxBracket(bracket);
    setTaxBracketForm({
      minIncome: bracket.minIncome,
      maxIncome: bracket.maxIncome,
      rate: bracket.rate,
      description: bracket.description,
      isActive: bracket.isActive,
    });
    setIsAddTaxBracketDialogOpen(true);
  };
  
  const handleSaveTaxBracket = () => {
    if (!taxBracketForm.description || taxBracketForm.rate === 0) {
      toast.error('Mohon lengkapi semua field yang diperlukan');
      return;
    }
    
    if (editingTaxBracket) {
      setTaxBrackets(taxBrackets.map(t => 
        t.id === editingTaxBracket.id 
          ? { ...t, ...taxBracketForm }
          : t
      ));
      toast.success('Data tarif pajak berhasil diperbarui');
    } else {
      const newBracket: TaxBracket = {
        id: (taxBrackets.length + 1).toString(),
        ...taxBracketForm,
      };
      setTaxBrackets([...taxBrackets, newBracket]);
      toast.success('Data tarif pajak berhasil ditambahkan');
    }
    setIsAddTaxBracketDialogOpen(false);
  };
  
  const handleDeleteTaxBracket = (id: string) => {
    setDeleteType('tax');
    setDeleteId(id);
    setDeleteConfirmOpen(true);
  };
  
  // BPJS Handlers
  const handleAddBpjs = () => {
    setBpjsForm({
      type: 'kesehatan',
      name: '',
      employeeRate: 0,
      employerRate: 0,
      maxSalary: null,
      isActive: true,
    });
    setEditingBpjs(null);
    setIsAddBpjsDialogOpen(true);
  };
  
  const handleEditBpjs = (bpjs: BPJSRate) => {
    setEditingBpjs(bpjs);
    setBpjsForm({
      type: bpjs.type,
      name: bpjs.name,
      employeeRate: bpjs.employeeRate,
      employerRate: bpjs.employerRate,
      maxSalary: bpjs.maxSalary,
      isActive: bpjs.isActive,
    });
    setIsAddBpjsDialogOpen(true);
  };
  
  const handleSaveBpjs = () => {
    if (!bpjsForm.name || bpjsForm.employeeRate === 0 || bpjsForm.employerRate === 0) {
      toast.error('Mohon lengkapi semua field yang diperlukan');
      return;
    }
    
    if (editingBpjs) {
      setBpjsRates(bpjsRates.map(b => 
        b.id === editingBpjs.id 
          ? { ...b, ...bpjsForm }
          : b
      ));
      toast.success('Data BPJS berhasil diperbarui');
    } else {
      const newBpjs: BPJSRate = {
        id: (bpjsRates.length + 1).toString(),
        ...bpjsForm,
      };
      setBpjsRates([...bpjsRates, newBpjs]);
      toast.success('Data BPJS berhasil ditambahkan');
    }
    setIsAddBpjsDialogOpen(false);
  };
  
  const handleDeleteBpjs = (id: string) => {
    setDeleteType('bpjs');
    setDeleteId(id);
    setDeleteConfirmOpen(true);
  };
  
  // Confirm Delete Handler
  const confirmDelete = () => {
    if (deleteType === 'ptkp') {
      setPtkpData(ptkpData.filter(p => p.id !== deleteId));
      toast.success('Data PTKP berhasil dihapus');
    } else if (deleteType === 'tax') {
      setTaxBrackets(taxBrackets.filter(t => t.id !== deleteId));
      toast.success('Data tarif pajak berhasil dihapus');
    } else if (deleteType === 'bpjs') {
      setBpjsRates(bpjsRates.filter(b => b.id !== deleteId));
      toast.success('Data BPJS berhasil dihapus');
    }
    setDeleteConfirmOpen(false);
  };

  const PTKPTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Cari PTKP..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background"
          />
        </div>
        <Button className="gap-2" onClick={handleAddPtkp}>
          <Plus size={16} />
          Tambah PTKP
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ptkpData.map((ptkp) => (
          <Card key={ptkp.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {ptkp.code}
                  </Badge>
                  {ptkp.isActive ? (
                    <Badge variant="secondary" className="bg-[#00d27a]/10 text-[#00d27a]">Aktif</Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-muted text-muted-foreground">Tidak Aktif</Badge>
                  )}
                </div>
                <h3 className="text-sm mb-1">{ptkp.status}</h3>
                <p className="text-xs text-muted-foreground mb-2">{ptkp.description}</p>
              </div>
            </div>
            <div className="border-t pt-3">
              <p className="text-xs text-muted-foreground mb-1">Nilai PTKP per Tahun</p>
              <p className="text-lg text-primary">{formatCurrency(ptkp.amount)}</p>
            </div>
            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditPtkp(ptkp)}>
                <Edit2 size={14} />
              </Button>
              <Button variant="outline" size="sm" className="flex-1 text-destructive hover:text-destructive" onClick={() => handleDeletePtkp(ptkp.id)}>
                <Trash2 size={14} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const TaxBracketTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3>Tarif Pajak Progresif PPh 21</h3>
        <Button className="gap-2" onClick={handleAddTaxBracket}>
          <Plus size={16} />
          Tambah Bracket
        </Button>
      </div>

      <Card className="overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              <th className="text-left px-4 md:px-6 py-3 text-sm text-muted-foreground">Penghasilan Kena Pajak (PKP)</th>
              <th className="text-center px-4 md:px-6 py-3 text-sm text-muted-foreground">Tarif</th>
              <th className="text-left px-4 md:px-6 py-3 text-sm text-muted-foreground">Deskripsi</th>
              <th className="text-center px-4 md:px-6 py-3 text-sm text-muted-foreground">Status</th>
              <th className="text-center px-4 md:px-6 py-3 text-sm text-muted-foreground">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {taxBrackets.map((bracket) => (
              <tr key={bracket.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                <td className="px-4 md:px-6 py-4">
                  <div>
                    <p className="mb-0">{formatCurrency(bracket.minIncome)}</p>
                    <p className="text-sm text-muted-foreground">
                      s/d {bracket.maxIncome ? formatCurrency(bracket.maxIncome) : 'Tidak Terbatas'}
                    </p>
                  </div>
                </td>
                <td className="px-4 md:px-6 py-4 text-center">
                  <Badge variant="secondary" className="bg-[#2c7be5]/10 text-[#2c7be5] text-lg">
                    {bracket.rate}%
                  </Badge>
                </td>
                <td className="px-4 md:px-6 py-4 text-muted-foreground">{bracket.description}</td>
                <td className="px-4 md:px-6 py-4 text-center">
                  {bracket.isActive ? (
                    <Badge variant="secondary" className="bg-[#00d27a]/10 text-[#00d27a]">Aktif</Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-muted text-muted-foreground">Tidak Aktif</Badge>
                  )}
                </td>
                <td className="px-4 md:px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEditTaxBracket(bracket)}>
                      <Edit2 size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleDeleteTaxBracket(bracket.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );

  const BPJSTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3>Tarif BPJS</h3>
        <Button className="gap-2" onClick={handleAddBpjs}>
          <Plus size={16} />
          Tambah BPJS
        </Button>
      </div>

      <div className="grid gap-4">
        {bpjsRates.map((bpjs) => (
          <Card key={bpjs.id} className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-sm">{bpjs.name}</h3>
                  {bpjs.isActive ? (
                    <Badge variant="secondary" className="bg-[#00d27a]/10 text-[#00d27a]">Aktif</Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-muted text-muted-foreground">Tidak Aktif</Badge>
                  )}
                </div>
                {bpjs.maxSalary && (
                  <p className="text-sm text-muted-foreground">
                    Maksimal gaji: {formatCurrency(bpjs.maxSalary)}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 min-w-[300px]">
                <div className="text-center p-3 bg-[#2c7be5]/5 rounded">
                  <p className="text-xs text-muted-foreground mb-1">Iuran Karyawan</p>
                  <p className="text-xl text-[#2c7be5]">{bpjs.employeeRate}%</p>
                </div>
                <div className="text-center p-3 bg-[#f5803e]/5 rounded">
                  <p className="text-xs text-muted-foreground mb-1">Iuran Perusahaan</p>
                  <p className="text-xl text-[#f5803e]">{bpjs.employerRate}%</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEditBpjs(bpjs)}>
                  <Edit2 size={14} />
                </Button>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleDeleteBpjs(bpjs.id)}>
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-6">
      <div className="mb-4 md:mb-6">
        <h1 className="mb-1">Master Data Pajak & BPJS</h1>
        <p className="text-muted-foreground">Kelola data PTKP, tarif pajak progresif, dan iuran BPJS</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
        <Card className="p-4 md:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total PTKP</p>
              <h3 className="text-2xl">{ptkpData.length}</h3>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
              <Receipt size={24} className="text-primary" />
            </div>
          </div>
        </Card>
        <Card className="p-4 md:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Tarif Pajak</p>
              <h3 className="text-2xl">{taxBrackets.length}</h3>
            </div>
            <div className="w-12 h-12 bg-[#2c7be5]/10 rounded flex items-center justify-center">
              <Receipt size={24} className="text-[#2c7be5]" />
            </div>
          </div>
        </Card>
        <Card className="p-4 md:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Tarif BPJS</p>
              <h3 className="text-2xl">{bpjsRates.length}</h3>
            </div>
            <div className="w-12 h-12 bg-[#00d27a]/10 rounded flex items-center justify-center">
              <Receipt size={24} className="text-[#00d27a]" />
            </div>
          </div>
        </Card>
        <Card className="p-4 md:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Tarif Tertinggi</p>
              <h3 className="text-2xl">35%</h3>
            </div>
            <div className="w-12 h-12 bg-[#f5803e]/10 rounded flex items-center justify-center">
              <Receipt size={24} className="text-[#f5803e]" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="shadow-sm">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="border-b border-border px-6 pt-6">
            <TabsList className="bg-muted/30">
              <TabsTrigger value="ptkp">PTKP</TabsTrigger>
              <TabsTrigger value="tax-bracket">Tarif Pajak</TabsTrigger>
              <TabsTrigger value="bpjs">BPJS</TabsTrigger>
            </TabsList>
          </div>
          <div className="p-6">
            <TabsContent value="ptkp" className="mt-0">
              <PTKPTab />
            </TabsContent>
            <TabsContent value="tax-bracket" className="mt-0">
              <TaxBracketTab />
            </TabsContent>
            <TabsContent value="bpjs" className="mt-0">
              <BPJSTab />
            </TabsContent>
          </div>
        </Tabs>
      </Card>
      
      {/* PTKP Dialog */}
      <Dialog open={isAddPtkpDialogOpen} onOpenChange={setIsAddPtkpDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingPtkp ? 'Edit Data PTKP' : 'Tambah Data PTKP'}</DialogTitle>
            <DialogDescription>
              {editingPtkp ? 'Perbarui informasi PTKP yang dipilih' : 'Tambahkan data PTKP baru ke dalam sistem'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Kode PTKP</Label>
                <Input
                  placeholder="Contoh: TK/0, K/1"
                  value={ptkpForm.code}
                  onChange={(e) => setPtkpForm({ ...ptkpForm, code: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Nilai PTKP (Rp)</Label>
                <Input
                  type="number"
                  placeholder="54000000"
                  value={ptkpForm.amount || ''}
                  onChange={(e) => setPtkpForm({ ...ptkpForm, amount: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Status PTKP</Label>
              <Input
                placeholder="Contoh: Tidak Kawin - 0 Tanggungan"
                value={ptkpForm.status}
                onChange={(e) => setPtkpForm({ ...ptkpForm, status: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Deskripsi</Label>
              <Textarea
                placeholder="Deskripsi lengkap"
                value={ptkpForm.description}
                onChange={(e) => setPtkpForm({ ...ptkpForm, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={ptkpForm.isActive}
                onCheckedChange={(checked) => setPtkpForm({ ...ptkpForm, isActive: checked })}
              />
              <Label>Status Aktif</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddPtkpDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSavePtkp}>
              {editingPtkp ? 'Simpan Perubahan' : 'Tambah Data'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tax Bracket Dialog */}
      <Dialog open={isAddTaxBracketDialogOpen} onOpenChange={setIsAddTaxBracketDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingTaxBracket ? 'Edit Tarif Pajak' : 'Tambah Tarif Pajak'}</DialogTitle>
            <DialogDescription>
              {editingTaxBracket ? 'Perbarui tarif pajak penghasilan PPh 21' : 'Tambahkan tarif pajak penghasilan baru'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Penghasilan Minimum (Rp)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={taxBracketForm.minIncome || ''}
                  onChange={(e) => setTaxBracketForm({ ...taxBracketForm, minIncome: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Penghasilan Maksimum (Rp)</Label>
                <Input
                  type="number"
                  placeholder="Kosongkan untuk tidak terbatas"
                  value={taxBracketForm.maxIncome || ''}
                  onChange={(e) => setTaxBracketForm({ ...taxBracketForm, maxIncome: e.target.value ? Number(e.target.value) : null })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Tarif Pajak (%)</Label>
              <Input
                type="number"
                placeholder="5"
                value={taxBracketForm.rate || ''}
                onChange={(e) => setTaxBracketForm({ ...taxBracketForm, rate: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label>Deskripsi</Label>
              <Textarea
                placeholder="Deskripsi bracket pajak"
                value={taxBracketForm.description}
                onChange={(e) => setTaxBracketForm({ ...taxBracketForm, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={taxBracketForm.isActive}
                onCheckedChange={(checked) => setTaxBracketForm({ ...taxBracketForm, isActive: checked })}
              />
              <Label>Status Aktif</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTaxBracketDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSaveTaxBracket}>
              {editingTaxBracket ? 'Simpan Perubahan' : 'Tambah Data'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* BPJS Dialog */}
      <Dialog open={isAddBpjsDialogOpen} onOpenChange={setIsAddBpjsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingBpjs ? 'Edit Data BPJS' : 'Tambah Data BPJS'}</DialogTitle>
            <DialogDescription>
              {editingBpjs ? 'Perbarui tarif iuran BPJS yang dipilih' : 'Tambahkan tarif iuran BPJS baru'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Tipe BPJS</Label>
              <Select
                value={bpjsForm.type}
                onValueChange={(value: any) => setBpjsForm({ ...bpjsForm, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tipe BPJS" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kesehatan">BPJS Kesehatan</SelectItem>
                  <SelectItem value="ketenagakerjaan-jkk">BPJS Ketenagakerjaan - JKK</SelectItem>
                  <SelectItem value="ketenagakerjaan-jkm">BPJS Ketenagakerjaan - JKM</SelectItem>
                  <SelectItem value="ketenagakerjaan-jp">BPJS Ketenagakerjaan - JP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Nama BPJS</Label>
              <Input
                placeholder="Nama lengkap BPJS"
                value={bpjsForm.name}
                onChange={(e) => setBpjsForm({ ...bpjsForm, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Iuran Karyawan (%)</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="1"
                  value={bpjsForm.employeeRate || ''}
                  onChange={(e) => setBpjsForm({ ...bpjsForm, employeeRate: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Iuran Perusahaan (%)</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="4"
                  value={bpjsForm.employerRate || ''}
                  onChange={(e) => setBpjsForm({ ...bpjsForm, employerRate: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Maksimal Gaji (Rp)</Label>
              <Input
                type="number"
                placeholder="Kosongkan jika tidak ada batas"
                value={bpjsForm.maxSalary || ''}
                onChange={(e) => setBpjsForm({ ...bpjsForm, maxSalary: e.target.value ? Number(e.target.value) : null })}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={bpjsForm.isActive}
                onCheckedChange={(checked) => setBpjsForm({ ...bpjsForm, isActive: checked })}
              />
              <Label>Status Aktif</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddBpjsDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSaveBpjs}>
              {editingBpjs ? 'Simpan Perubahan' : 'Tambah Data'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Hapus Data</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
