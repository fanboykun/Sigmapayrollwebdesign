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
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination';

interface Position {
  id: string;
  code: string;
  name: string;
  level: 'karyawan' | 'pegawai' | 'pkwt' | 'pkwtp';
  description: string;
  isActive: boolean;
  employeeCount: number;
}

export function PositionMaster() {
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    level: 'karyawan',
    description: '',
    isActive: true,
  });

  const [positions, setPositions] = useState<Position[]>([
    { id: '1', code: 'AST-DIV', name: 'Asisten Division', level: 'pkwtp', description: '', isActive: true, employeeCount: 0 },
    { id: '2', code: 'AST-DIVISI', name: 'Asisten Divisi', level: 'pkwtp', description: '', isActive: true, employeeCount: 0 },
    { id: '3', code: 'AST-KPL', name: 'Asisten Kepala', level: 'pkwtp', description: '', isActive: true, employeeCount: 0 },
    { id: '4', code: 'BBU-ANK', name: 'Babu Anak', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '5', code: 'BGL-LIST', name: 'Bengkel Listrik', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '6', code: 'BGL-TRNS', name: 'Bengkel Transport', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '7', code: 'BGL-UMM', name: 'Bengkel Umum', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '8', code: 'BILAL', name: 'Bilal/Pelayan Gereja', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '9', code: 'GILING-BJI', name: 'Giling Biji', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '10', code: 'GRP-MGR', name: 'Group Manager', level: 'pkwtp', description: '', isActive: true, employeeCount: 0 },
    { id: '11', code: 'JGA-BIBTN', name: 'Jaga Bibitan', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '12', code: 'JGA-KLM-LMB', name: 'Jaga kolam Limbah', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '13', code: 'JGA-MLM-STF', name: 'Jaga Malam Rumah Staff', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '14', code: 'JGA-MLM-TKN', name: 'Jaga Malam Rumah Tekniker', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '15', code: 'KPLA-OPR-KTL', name: 'Kapala Operator Ketel', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '16', code: 'KRY-ABLS', name: 'Karyawan Ablasi', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '17', code: 'KRY-PMPK', name: 'Karyawan Pemupukan', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '18', code: 'KRY-PNGLH', name: 'Karyawan Pengolahan', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '19', code: 'KRY-PTG-BH', name: 'Karyawan Potong Buah', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '20', code: 'KRY-SPRT-KN-HM', name: 'Karyawan Semprot Knapsack Hama', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '21', code: 'KRY-SPRT-KN-HR', name: 'Karyawan Semprot Knapsack Herbisida', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '22', code: 'KRY-SPRT-MC-HB', name: 'Karyawan Semprot Micron Herby', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '23', code: 'KRY-UMM', name: 'Karyawan Umum', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '24', code: 'KENEK', name: 'Kenek', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '25', code: 'KNEK-TRCK', name: 'Kenek Truck', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '26', code: 'KPL-TKG', name: 'Kepala Tukang', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '27', code: 'KPL-KMNN', name: 'Kepala Keamanan', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '28', code: 'KPL-PLKLNK', name: 'Kepala Poliklinik', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '29', code: 'KPL-BGL-SPL', name: 'Kepala Bengkel Sipil', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '30', code: 'KPL-BGL', name: 'Kepala Bengkel', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '31', code: 'KPL-BGL-TRP', name: 'Kepala Bengkel Transport', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '32', code: 'KPL-BGL-UMM', name: 'Kepala Bengkel Umum', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '33', code: 'KPL-BOILER', name: 'Kepala Boiler', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '34', code: 'KPL-GDG', name: 'Kepala Gudang', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '35', code: 'KPL-KMR-MSN', name: 'Kepala Kamar Mesin', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '36', code: 'KPL-KRAN-LAB', name: 'Kepala Krani Laboratorium', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '37', code: 'KPL-SATPAM', name: 'Kepala Satpam/Centeng', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '38', code: 'KPL-TATA-USA', name: 'Kepala Tata Usaha', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '39', code: 'KPL-WTP', name: 'Kepala Water Treatment', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '40', code: 'KRN-AGRO', name: 'Kerani Agronomi', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '41', code: 'KRN-ARSIP', name: 'Kerani Arsip', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '42', code: 'KRN-BUAH', name: 'Kerani Buah', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '43', code: 'KRN-DIST', name: 'Kerani Distribusi', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '44', code: 'KRN-EKSP', name: 'Kerani Ekspedisi', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '45', code: 'KRN-GRMGR', name: 'Kerani Group Manager', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '46', code: 'KRN-KLG', name: 'Kerani Keliling', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '47', code: 'KRN-KLGPYR', name: 'Kerani Keliling/Payroll', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '48', code: 'KRAN-GDG', name: 'Krani Gudang', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '49', code: 'KRAN-III', name: 'Krani III', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '50', code: 'KRAN-KLAR', name: 'Krani Klarifikasi', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '51', code: 'KRAN-LAB', name: 'Krani Laboratorium', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '52', code: 'KRAN-LABRM', name: 'Krani laboaratorium', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '53', code: 'KRN-PBK', name: 'Kerani Pabrik', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '54', code: 'KRAN-PBK', name: 'Krani Pabrik', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '55', code: 'KRN-PBKN', name: 'Kerani Pembukuan', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '56', code: 'KRAN-PRMH', name: 'Krani Perumahan', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '57', code: 'KRN-TIMBANG', name: 'Kerani Timbang', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '58', code: 'KRAN-TIK', name: 'Krani Tik Tata Buku', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '59', code: 'KRN-TRSP', name: 'Kerani Transpor', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '60', code: 'KRNT-ALB', name: 'Kernet Alat Berat', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '61', code: 'KRNT-TRSP', name: 'Kernet Transpor', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '62', code: 'LOAD-RAMP', name: 'Loading Ramp', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '63', code: 'MANAGER', name: 'Manager', level: 'pkwtp', description: '', isActive: true, employeeCount: 0 },
    { id: '64', code: 'MANDOR', name: 'Mandor', level: 'pkwt', description: '', isActive: true, employeeCount: 0 },
    { id: '65', code: 'MDR-1', name: 'Mandor - 1', level: 'pkwt', description: '', isActive: true, employeeCount: 0 },
    { id: '66', code: 'MDR-I', name: 'Mandor 1', level: 'pkwt', description: '', isActive: true, employeeCount: 0 },
    { id: '67', code: 'MDR-TRSP', name: 'Mandor Transport', level: 'pkwt', description: '', isActive: true, employeeCount: 0 },
    { id: '68', code: 'MDR-HRN', name: 'Mandor Harian/Upkeep', level: 'pkwt', description: '', isActive: true, employeeCount: 0 },
    { id: '69', code: 'MDR-I-HRN', name: 'Mandor I Harian/Upkeep', level: 'pkwt', description: '', isActive: true, employeeCount: 0 },
    { id: '70', code: 'MDR-I-PTG', name: 'Mandor I Potong Buah', level: 'pkwt', description: '', isActive: true, employeeCount: 0 },
    { id: '71', code: 'MDR-IKS', name: 'Mandor Mengolah IKS', level: 'pkwt', description: '', isActive: true, employeeCount: 0 },
    { id: '72', code: 'MDR-PBK', name: 'Mandor Pabrik', level: 'pkwt', description: '', isActive: true, employeeCount: 0 },
    { id: '73', code: 'MDR-PMPK', name: 'Mandor Pemupukan', level: 'pkwt', description: '', isActive: true, employeeCount: 0 },
    { id: '74', code: 'MDR-PNGLH', name: 'Mandor Pengolahan', level: 'pkwt', description: '', isActive: true, employeeCount: 0 },
    { id: '75', code: 'MDR-PTG', name: 'Mandor Potong Buah', level: 'pkwt', description: '', isActive: true, employeeCount: 0 },
    { id: '76', code: 'MDR-SPRT-HM', name: 'Mandor Semprot Knapsack Hama', level: 'pkwt', description: '', isActive: true, employeeCount: 0 },
    { id: '77', code: 'MDR-SPRT-HB', name: 'Mandor Semprot Knapsack Herbisida', level: 'pkwt', description: '', isActive: true, employeeCount: 0 },
    { id: '78', code: 'MDR-SPRT-MC', name: 'Mandor Semprot Micron Herby', level: 'pkwt', description: '', isActive: true, employeeCount: 0 },
    { id: '79', code: 'MDR-TNS', name: 'Mandor Tunas', level: 'pkwt', description: '', isActive: true, employeeCount: 0 },
    { id: '80', code: 'MANTRI', name: 'Mantri', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '81', code: 'MNTR-HM', name: 'Mantri Hama', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '82', code: 'MNTR-RCLT', name: 'Mantri Recolte', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '83', code: 'MNTR-SENS', name: 'Mantri Sensus dan Hama Penyakit', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '84', code: 'MNTR-TNM', name: 'Mantri Tanaman', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '85', code: 'MGLH-IKS', name: 'Mengolah IKS', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '86', code: 'OPAS-DIV', name: 'Opas Divisi', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '87', code: 'OPAS-KTR', name: 'Opas Kantor', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '88', code: 'OPAS-ADM', name: 'Opas Kantor ADM', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '89', code: 'OPAS-PBK', name: 'Opas Kantor Pabrik', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '90', code: 'OPR-ALB', name: 'Operator Alat Berat', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '91', code: 'OPR-BCK', name: 'Operator Backhoe Loader', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '92', code: 'OPR-BOILER', name: 'Operator Boiler', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '93', code: 'OPR-BUNCH', name: 'Operator Bunch Press', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '94', code: 'OPR-CAPSTAN', name: 'Operator Capstan', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '95', code: 'OPR-CLAY', name: 'Operator Claybath Seperator', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '96', code: 'OPR-COMPOST', name: 'Operator Composting', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '97', code: 'OPR-DECANTER', name: 'Operator Decanter', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '98', code: 'OPR-DEKANTER', name: 'Operator Dekanter', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '99', code: 'OPR-EBC', name: 'Operator Empty Bunch Conveyor', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '100', code: 'OPR-EBH', name: 'Operator Empty Bunch Hopper', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '101', code: 'OPR-HOIST', name: 'Operator Hoist Crane', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '102', code: 'OPR-KMR', name: 'Operator Kamar Mesin', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '103', code: 'OPR-KVIB', name: 'Operator Kernel Vib Screen', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '104', code: 'OPR-KETEL', name: 'Operator Ketel', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '105', code: 'OPR-KLMBH', name: 'Operator Kolam Limbah', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '106', code: 'OPR-KOMP', name: 'Operator Komputer', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '107', code: 'OPR-MSN-BBT', name: 'Operator Mesin Babat Rumput', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '108', code: 'OPR-PBK', name: 'Operator Pabrik', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '109', code: 'OPR-PRESS', name: 'Operator Pressan', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '110', code: 'OPR-RIPPLE', name: 'Operator Ripple Mill / Nut Grad', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '111', code: 'OPR-ROAD', name: 'Operator Road Greader', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '112', code: 'OPR-SCHOVEL', name: 'Operator Schovel Loader', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '113', code: 'OPR-SLUDGE', name: 'Operator Sludge Pit', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '114', code: 'OPR-STERIL', name: 'Operator Sterilizer', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '115', code: 'OPR-TRSP', name: 'Operator Transport', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '116', code: 'OPR-TRAY', name: 'Operator Tray Master', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '117', code: 'OPR-WTP', name: 'Operator Water Treatment', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '118', code: 'OPR-KMRMSN', name: 'Opr Kamar Mesin', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '119', code: 'PAM-SWK', name: 'Pam Swakarsa', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '120', code: 'PARAMEDIS', name: 'Paramedis', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '121', code: 'PEKERJA', name: 'Pekerja', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '122', code: 'PKJ-BGL', name: 'Pekerja Bengkel', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '123', code: 'PKJ-PMLH', name: 'Pekerja Pemeliharaan', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '124', code: 'PKJ-UMM', name: 'Pekerja Umum', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '125', code: 'PLY-RMH-TKN1', name: 'Pelayan Rumah Tekniker I', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '126', code: 'PLY-RMH-TKN2', name: 'Pelayan Rumah Tekniker II', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '127', code: 'PLY-RMH-STF', name: 'Pelayan Rumah Staf', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '128', code: 'PMB-GDG', name: 'Pembantu Gudang', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '129', code: 'PMB-KRAN', name: 'Pembantu Kerani', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '130', code: 'PMB-KRAN-LAB', name: 'Pembantu Krani Laboran', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '131', code: 'PENGURUS', name: 'Pengurus', level: 'pkwtp', description: '', isActive: true, employeeCount: 0 },
    { id: '132', code: 'PERAWAT', name: 'Perawat', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '133', code: 'PRWT-BUNKR', name: 'Perawatan Bunker', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '134', code: 'PRWT-HLM-PBK', name: 'Perawatan Halaman Pabrik', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '135', code: 'PTG-KMNN', name: 'Petugas Keamanan', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '136', code: 'PTG-BUAH', name: 'Potong Buah', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '137', code: 'SATPAM', name: 'Satpam', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '138', code: 'SATPAM-CNT', name: 'Satpam/Centeng', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '139', code: 'SUPIR', name: 'Supir', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '140', code: 'SPR-ASK', name: 'Supir Mobil Askep', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '141', code: 'SPR-KNTRL', name: 'Supir Mobil Kontrol', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '142', code: 'SPR-PNGRS', name: 'Supir Mobil Pengurus', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '143', code: 'SPR-PNMPG', name: 'Supir Mobil Penumpang', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '144', code: 'SPR-TKN1', name: 'Supir Mobil Tekniker I', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '145', code: 'SPR-TRK-RD', name: 'Supir Traktor Roda', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '146', code: 'SPR-TRUCK', name: 'Supir Truck', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '147', code: 'TAP-CTRL', name: 'Tap Control', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '148', code: 'TKNKR-1', name: 'Tekniker 1', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '149', code: 'TKNKR-2', name: 'Tekniker 2', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '150', code: 'TKNKR-I', name: 'Tekniker I', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '151', code: 'TKNKR-II', name: 'Tekniker II', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '152', code: 'TKNKR-2A', name: 'Tekniker  -2', level: 'pegawai', description: '', isActive: true, employeeCount: 0 },
    { id: '153', code: 'TKG-BGL-SPL', name: 'Tukang Bengkel Sipil', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '154', code: 'TKG-BGL-TRP', name: 'Tukang Bengkel Transport', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '155', code: 'TKG-BGL-UMM', name: 'Tukang Bengkel Umum', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '156', code: 'TKG-BUBUT', name: 'Tukang Bubut', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '157', code: 'TKG-JGA-PNL', name: 'Tukang Jaga Panel Pengolahan', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '158', code: 'TKG-JGA-PNGLH', name: 'Tukang Jaga Pengolahan', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '159', code: 'TKG-KYU', name: 'Tukang Kayu', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '160', code: 'TKG-KBN-STF', name: 'Tukang Kebun Rumah Staf', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '161', code: 'TKG-LAS', name: 'Tukang Las', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '162', code: 'TKG-OLIE', name: 'Tukang Olieman', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '163', code: 'TKG-RPR-LR', name: 'Tukang Reparasi Lori', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '164', code: 'TKG-RPR-MTR', name: 'Tukang Reparasi Motor', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '165', code: 'TNS-PKK', name: 'Tunas Pokok', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
    { id: '166', code: 'WGHBRDG', name: 'Weighbridge', level: 'karyawan', description: '', isActive: true, employeeCount: 0 },
  ]);

  const filteredPositions = positions.filter((pos) => {
    const matchesSearch =
      pos.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pos.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === 'all' || pos.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredPositions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPositions = filteredPositions.slice(startIndex, endIndex);

  // Reset to page 1 when search or filter changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleLevelFilterChange = (value: string) => {
    setLevelFilter(value);
    setCurrentPage(1);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      level: 'karyawan',
      description: '',
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
      pkwtp: 'PKWT (P)',
    };
    return levels[level] || level;
  };

  const getLevelBadge = (level: string) => {
    const levelConfig: Record<string, { className: string }> = {
      karyawan: { className: 'bg-[#95aac9]/10 text-[#95aac9]' },
      pegawai: { className: 'bg-[#27bcfd]/10 text-[#27bcfd]' },
      pkwt: { className: 'bg-[#f5803e]/10 text-[#f5803e]' },
      pkwtp: { className: 'bg-[#2c7be5]/10 text-[#2c7be5]' },
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
            <SelectItem value="pkwtp">PKWT (P)</SelectItem>
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
              <p className="text-sm text-muted-foreground mb-1">Rata-rata/Jabatan</p>
              <h3 className="text-2xl">{Math.round(positions.reduce((sum, p) => sum + p.employeeCount, 0) / positions.length)}</h3>
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
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={levelFilter} onValueChange={handleLevelFilterChange}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Semua Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Level</SelectItem>
                  <SelectItem value="karyawan">Karyawan</SelectItem>
                  <SelectItem value="pegawai">Pegawai</SelectItem>
                  <SelectItem value="pkwt">PKWT</SelectItem>
                  <SelectItem value="pkwtp">PKWT (P)</SelectItem>
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
          <table className="w-full min-w-[600px]">
            <thead className="bg-muted/30 border-b border-border">
              <tr>
                <th className="text-left px-4 md:px-6 py-3 text-sm text-muted-foreground">Kode</th>
                <th className="text-left px-4 md:px-6 py-3 text-sm text-muted-foreground">Nama Jabatan</th>
                <th className="text-left px-4 md:px-6 py-3 text-sm text-muted-foreground">Level</th>
                <th className="text-center px-4 md:px-6 py-3 text-sm text-muted-foreground">Karyawan</th>
                <th className="text-center px-4 md:px-6 py-3 text-sm text-muted-foreground">Status</th>
                <th className="text-center px-4 md:px-6 py-3 text-sm text-muted-foreground">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPositions.map((position) => (
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs md:text-sm text-muted-foreground">
              Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredPositions.length)} dari {filteredPositions.length} jabatan
            </p>
            
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <PaginationItem key={page}>
                          <span className="px-4">...</span>
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
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
