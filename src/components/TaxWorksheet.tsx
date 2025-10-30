import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Download, Printer, FileSpreadsheet } from 'lucide-react';
import { MASTER_EMPLOYEES } from '../shared/employeeData';

interface TaxEmployee {
  no: number;
  nik: string;
  name: string;
  npwpStatus: string; // Status NPWP: NPWP/TK/K
  // Penghasilan Tetap
  basicSalary: number; // Gaji Pokok
  positionAllowance: number; // Tunjangan Jabatan
  housingAllowance: number; // Tunjangan Perumahan
  transportAllowance: number; // Tunjangan Transportasi
  mealAllowance: number; // Tunjangan Makan
  otherAllowance: number; // Tunjangan Lainnya
  // Penghasilan Tidak Tetap
  overtime: number; // Lembur
  incentive: number; // Insentif
  bonus: number; // Bonus
  thr: number; // THR (Tunjangan Hari Raya)
  // Total Penghasilan Bruto
  grossIncome: number;
  // Potongan
  deduction1: number; // Potongan 1
  deduction2: number; // Potongan 2  
  deduction3: number; // Potongan 3
  deduction4: number; // Potongan 4
  totalDeduction: number;
  // Pengurang (BPJS dibayar Karyawan)
  bpjsEmployeeJKK: number; // JKK dibayar karyawan
  bpjsEmployeeJKM: number; // JKM dibayar karyawan
  bpjsEmployeeJHT: number; // JHT dibayar karyawan  
  bpjsEmployeeJP: number; // JP dibayar karyawan
  bpjsEmployeeHealth: number; // BPJS Kesehatan dibayar karyawan
  totalBpjsEmployee: number;
  // Iuran yang dibayar Pemberi Kerja
  bpjsCompanyJKK: number; // JKK dibayar perusahaan
  bpjsCompanyJKM: number; // JKM dibayar perusahaan
  bpjsCompanyJHT: number; // JHT dibayar perusahaan
  bpjsCompanyJP: number; // JP dibayar perusahaan  
  bpjsCompanyHealth: number; // BPJS Kesehatan dibayar perusahaan
  totalBpjsCompany: number;
  // Penghasilan Bruto (setelah ditambah BPJS Perusahaan)
  totalBruto: number;
  // Biaya Jabatan
  positionCost: number; // 5% dari penghasilan bruto, max 500rb/bulan
  // Penghasilan Netto Setahun
  yearlyNetto: number;
  // PTKP
  ptkp: number;
  // PKP (Penghasilan Kena Pajak)
  pkp: number;
  // PPh 21 Setahun
  pph21Yearly: number;
  // PPh 21 Sebulan
  pph21Monthly: number;
  // PPh 21 yang sudah dipotong
  pph21Paid: number;
  // PPh 21 Terutang
  pph21Payable: number;
}

export function TaxWorksheet() {
  const [selectedPeriod, setSelectedPeriod] = useState('2025-10');
  const [selectedDivision, setSelectedDivision] = useState('all');

  const taxData: TaxEmployee[] = [
    {
      no: 1,
      nik: MASTER_EMPLOYEES[2].employeeId, // Budi Santoso
      name: MASTER_EMPLOYEES[2].fullName,
      npwpStatus: MASTER_EMPLOYEES[2].npwpStatus,
      basicSalary: MASTER_EMPLOYEES[2].baseSalary,
      positionAllowance: 500000,
      housingAllowance: 300000,
      transportAllowance: 200000,
      mealAllowance: 150000,
      otherAllowance: 100000,
      overtime: 0,
      incentive: 0,
      bonus: 0,
      thr: 18000,
      grossIncome: 5468000,
      deduction1: 0,
      deduction2: 0,
      deduction3: 0,
      deduction4: 0,
      totalDeduction: 0,
      bpjsEmployeeJKK: 0,
      bpjsEmployeeJKM: 0,
      bpjsEmployeeJHT: 84000, // 2% dari gaji pokok
      bpjsEmployeeJP: 42000, // 1% dari gaji pokok
      bpjsEmployeeHealth: 50000,
      totalBpjsEmployee: 176000,
      bpjsCompanyJKK: 21000,
      bpjsCompanyJKM: 1260,
      bpjsCompanyJHT: 155400, // 3.7% dari gaji pokok
      bpjsCompanyJP: 84000, // 2% dari gaji pokok
      bpjsCompanyHealth: 150000,
      totalBpjsCompany: 411660,
      totalBruto: 5879660,
      positionCost: 293983,
      yearlyNetto: 67031124,
      ptkp: 63000000, // K/2
      pkp: 4031124,
      pph21Yearly: 201556,
      pph21Monthly: 16796,
      pph21Paid: 0,
      pph21Payable: 16796,
    },
    {
      no: 2,
      nik: MASTER_EMPLOYEES[6].employeeId, // Sukarman
      name: MASTER_EMPLOYEES[6].fullName,
      npwpStatus: MASTER_EMPLOYEES[6].npwpStatus,
      basicSalary: MASTER_EMPLOYEES[6].baseSalary,
      positionAllowance: 500000,
      housingAllowance: 300000,
      transportAllowance: 200000,
      mealAllowance: 150000,
      otherAllowance: 100000,
      overtime: 0,
      incentive: 0,
      bonus: 0,
      thr: 20000,
      grossIncome: 5770000,
      deduction1: 0,
      deduction2: 0,
      deduction3: 0,
      deduction4: 0,
      totalDeduction: 0,
      bpjsEmployeeJKK: 0,
      bpjsEmployeeJKM: 0,
      bpjsEmployeeJHT: 90000,
      bpjsEmployeeJP: 45000,
      bpjsEmployeeHealth: 50000,
      totalBpjsEmployee: 185000,
      bpjsCompanyJKK: 22500,
      bpjsCompanyJKM: 1350,
      bpjsCompanyJHT: 166500,
      bpjsCompanyJP: 90000,
      bpjsCompanyHealth: 150000,
      totalBpjsCompany: 430350,
      totalBruto: 6200350,
      positionCost: 310018,
      yearlyNetto: 70683984,
      ptkp: 63000000, // K/2
      pkp: 7683984,
      pph21Yearly: 384199,
      pph21Monthly: 32017,
      pph21Paid: 0,
      pph21Payable: 32017,
    },
    {
      no: 3,
      nik: MASTER_EMPLOYEES[0].employeeId, // Ahmad Hidayat
      name: MASTER_EMPLOYEES[0].fullName,
      npwpStatus: MASTER_EMPLOYEES[0].npwpStatus,
      basicSalary: MASTER_EMPLOYEES[0].baseSalary,
      positionAllowance: 800000,
      housingAllowance: 500000,
      transportAllowance: 300000,
      mealAllowance: 200000,
      otherAllowance: 150000,
      overtime: 200000,
      incentive: 150000,
      bonus: 0,
      thr: 50000,
      grossIncome: 7850000,
      deduction1: 0,
      deduction2: 0,
      deduction3: 0,
      deduction4: 0,
      totalDeduction: 0,
      bpjsEmployeeJKK: 0,
      bpjsEmployeeJKM: 0,
      bpjsEmployeeJHT: 110000,
      bpjsEmployeeJP: 55000,
      bpjsEmployeeHealth: 60000,
      totalBpjsEmployee: 225000,
      bpjsCompanyJKK: 27500,
      bpjsCompanyJKM: 1650,
      bpjsCompanyJHT: 203500,
      bpjsCompanyJP: 110000,
      bpjsCompanyHealth: 180000,
      totalBpjsCompany: 522650,
      totalBruto: 8372650,
      positionCost: 418633,
      yearlyNetto: 95448204,
      ptkp: 58500000, // K/1
      pkp: 36948204,
      pph21Yearly: 1847410,
      pph21Monthly: 153951,
      pph21Paid: 0,
      pph21Payable: 153951,
    },
    {
      no: 4,
      nik: MASTER_EMPLOYEES[1].employeeId, // Siti Nurhaliza
      name: MASTER_EMPLOYEES[1].fullName,
      npwpStatus: MASTER_EMPLOYEES[1].npwpStatus,
      basicSalary: MASTER_EMPLOYEES[1].baseSalary,
      positionAllowance: 1200000,
      housingAllowance: 800000,
      transportAllowance: 300000,
      mealAllowance: 200000,
      otherAllowance: 150000,
      overtime: 0,
      incentive: 0,
      bonus: 0,
      thr: 50000,
      grossIncome: 11200000,
      deduction1: 0,
      deduction2: 0,
      deduction3: 0,
      deduction4: 0,
      totalDeduction: 0,
      bpjsEmployeeJKK: 0,
      bpjsEmployeeJKM: 0,
      bpjsEmployeeJHT: 170000,
      bpjsEmployeeJP: 85000,
      bpjsEmployeeHealth: 85000,
      totalBpjsEmployee: 340000,
      bpjsCompanyJKK: 42500,
      bpjsCompanyJKM: 2550,
      bpjsCompanyJHT: 314500,
      bpjsCompanyJP: 170000,
      bpjsCompanyHealth: 255000,
      totalBpjsCompany: 784550,
      totalBruto: 11984550,
      positionCost: 500000,
      yearlyNetto: 137814600,
      ptkp: 54000000, // TK
      pkp: 83814600,
      pph21Yearly: 10557190,
      pph21Monthly: 879766,
      pph21Paid: 0,
      pph21Payable: 879766,
    },
    {
      no: 5,
      nik: MASTER_EMPLOYEES[11].employeeId, // Yuni Astuti
      name: MASTER_EMPLOYEES[11].fullName,
      npwpStatus: MASTER_EMPLOYEES[11].npwpStatus,
      basicSalary: MASTER_EMPLOYEES[11].baseSalary,
      positionAllowance: 1500000,
      housingAllowance: 1000000,
      transportAllowance: 400000,
      mealAllowance: 250000,
      otherAllowance: 200000,
      overtime: 0,
      incentive: 0,
      bonus: 0,
      thr: 100000,
      grossIncome: 13450000,
      deduction1: 0,
      deduction2: 0,
      deduction3: 0,
      deduction4: 0,
      totalDeduction: 0,
      bpjsEmployeeJKK: 0,
      bpjsEmployeeJKM: 0,
      bpjsEmployeeJHT: 200000,
      bpjsEmployeeJP: 100000,
      bpjsEmployeeHealth: 100000,
      totalBpjsEmployee: 400000,
      bpjsCompanyJKK: 50000,
      bpjsCompanyJKM: 3000,
      bpjsCompanyJHT: 370000,
      bpjsCompanyJP: 200000,
      bpjsCompanyHealth: 300000,
      totalBpjsCompany: 923000,
      totalBruto: 14373000,
      positionCost: 500000,
      yearlyNetto: 167076000,
      ptkp: 58500000, // K/1
      pkp: 108576000,
      pph21Yearly: 15428800,
      pph21Monthly: 1285733,
      pph21Paid: 0,
      pph21Payable: 1285733,
    },
    {
      no: 6,
      nik: MASTER_EMPLOYEES[8].employeeId, // Agus Setiawan
      name: MASTER_EMPLOYEES[8].fullName,
      npwpStatus: MASTER_EMPLOYEES[8].npwpStatus,
      basicSalary: MASTER_EMPLOYEES[8].baseSalary,
      positionAllowance: 1500000,
      housingAllowance: 1000000,
      transportAllowance: 400000,
      mealAllowance: 250000,
      otherAllowance: 200000,
      overtime: 600000,
      incentive: 400000,
      bonus: 500000,
      thr: 100000,
      grossIncome: 13950000,
      deduction1: 0,
      deduction2: 0,
      deduction3: 0,
      deduction4: 0,
      totalDeduction: 0,
      bpjsEmployeeJKK: 0,
      bpjsEmployeeJKM: 0,
      bpjsEmployeeJHT: 180000,
      bpjsEmployeeJP: 90000,
      bpjsEmployeeHealth: 90000,
      totalBpjsEmployee: 360000,
      bpjsCompanyJKK: 45000,
      bpjsCompanyJKM: 2700,
      bpjsCompanyJHT: 333000,
      bpjsCompanyJP: 180000,
      bpjsCompanyHealth: 270000,
      totalBpjsCompany: 830700,
      totalBruto: 14780700,
      positionCost: 500000,
      yearlyNetto: 170768400,
      ptkp: 58500000, // K/1
      pkp: 112268400,
      pph21Yearly: 16340260,
      pph21Monthly: 1361688,
      pph21Paid: 0,
      pph21Payable: 1361688,
    },
  ];

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('id-ID', { minimumFractionDigits: 0 });
  };

  const calculateTotal = (field: keyof TaxEmployee) => {
    return taxData.reduce((sum, emp) => sum + (Number(emp[field]) || 0), 0);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-4 md:mb-6">
        <h1 className="mb-1">Tax Worksheet</h1>
        <p className="text-muted-foreground">PT. Socfin Indonesia - Bangun Bandar</p>
        <p className="text-xs text-muted-foreground mt-1">PTKP 1 Bulan</p>
      </div>

      <Card className="shadow-sm mb-4">
        <div className="p-4 md:p-6 border-b border-border">
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
            <div className="flex flex-wrap gap-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025-10">Oktober 2025</SelectItem>
                  <SelectItem value="2025-09">September 2025</SelectItem>
                  <SelectItem value="2025-08">Agustus 2025</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedDivision} onValueChange={setSelectedDivision}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Divisi</SelectItem>
                  <SelectItem value="div1">Divisi 1</SelectItem>
                  <SelectItem value="div2">Divisi 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Printer size={16} />
                <span className="hidden sm:inline">Print</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <FileSpreadsheet size={16} />
                <span className="hidden sm:inline">Excel</span>
              </Button>
              <Button size="sm" className="gap-2">
                <Download size={16} />
                <span className="hidden sm:inline">Download</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[4500px]">
            <table className="w-full text-xs border-collapse">
              <thead className="sticky top-0 bg-muted/50">
                <tr>
                  {/* Identitas */}
                  <th rowSpan={2} className="px-2 py-3 text-center border border-border bg-muted min-w-[40px]">No</th>
                  <th rowSpan={2} className="px-2 py-3 text-left border border-border bg-muted min-w-[100px]">NIK</th>
                  <th rowSpan={2} className="px-2 py-3 text-left border border-border bg-muted min-w-[180px]">Nama Lengkap</th>
                  <th rowSpan={2} className="px-2 py-3 text-center border border-border bg-muted min-w-[80px]">Status<br/>NPWP</th>
                  
                  {/* Penghasilan Tetap */}
                  <th colSpan={6} className="px-2 py-2 text-center border border-border bg-[#e3f2fd]">Penghasilan Tetap</th>
                  
                  {/* Penghasilan Tidak Tetap */}
                  <th colSpan={4} className="px-2 py-2 text-center border border-border bg-[#fff3e0]">Penghasilan Tidak Tetap</th>
                  
                  {/* Total Penghasilan Bruto */}
                  <th rowSpan={2} className="px-2 py-3 text-right border border-border bg-[#ffeb3b]/30 min-w-[120px]">Total<br/>Penghasilan<br/>Bruto</th>
                  
                  {/* Potongan */}
                  <th colSpan={5} className="px-2 py-2 text-center border border-border bg-[#f3e5f5]">Potongan</th>
                  
                  {/* Iuran Pensiun (dibayar Karyawan) */}
                  <th colSpan={6} className="px-2 py-2 text-center border border-border bg-[#fce4ec]">Iuran Pensiun/JHT/THT (Dibayar Karyawan)</th>
                  
                  {/* Iuran Pensiun (dibayar Pemberi Kerja) */}
                  <th colSpan={6} className="px-2 py-2 text-center border border-border bg-[#e8f5e9]">Iuran yang Dibayar Pemberi Kerja</th>
                  
                  {/* Penghasilan Bruto */}
                  <th rowSpan={2} className="px-2 py-3 text-right border border-border bg-[#ffeb3b]/50 min-w-[120px]">Penghasilan<br/>Bruto</th>
                  
                  {/* Biaya Jabatan */}
                  <th rowSpan={2} className="px-2 py-3 text-right border border-border bg-[#ffebee] min-w-[100px]">Biaya<br/>Jabatan</th>
                  
                  {/* Penghasilan Netto Setahun */}
                  <th rowSpan={2} className="px-2 py-3 text-right border border-border bg-[#e0f2f1] min-w-[120px]">Penghasilan<br/>Netto<br/>Setahun</th>
                  
                  {/* PTKP */}
                  <th rowSpan={2} className="px-2 py-3 text-right border border-border bg-[#f1f8e9] min-w-[120px]">PTKP</th>
                  
                  {/* PKP */}
                  <th rowSpan={2} className="px-2 py-3 text-right border border-border bg-[#fff3e0] min-w-[120px]">PKP<br/>(Penghasilan<br/>Kena Pajak)</th>
                  
                  {/* PPh 21 */}
                  <th colSpan={4} className="px-2 py-2 text-center border border-border bg-[#ffcdd2]">PPh 21</th>
                </tr>
                <tr>
                  {/* Penghasilan Tetap - Row 2 */}
                  <th className="px-2 py-2 text-right border border-border bg-[#e3f2fd] min-w-[100px]">Gaji Pokok</th>
                  <th className="px-2 py-2 text-right border border-border bg-[#e3f2fd] min-w-[100px]">Tunj. Jabatan</th>
                  <th className="px-2 py-2 text-right border border-border bg-[#e3f2fd] min-w-[100px]">Tunj. Perumahan</th>
                  <th className="px-2 py-2 text-right border border-border bg-[#e3f2fd] min-w-[100px]">Tunj. Transport</th>
                  <th className="px-2 py-2 text-right border border-border bg-[#e3f2fd] min-w-[100px]">Tunj. Makan</th>
                  <th className="px-2 py-2 text-right border border-border bg-[#e3f2fd] min-w-[100px]">Tunj. Lainnya</th>
                  
                  {/* Penghasilan Tidak Tetap - Row 2 */}
                  <th className="px-2 py-2 text-right border border-border bg-[#fff3e0] min-w-[100px]">Lembur</th>
                  <th className="px-2 py-2 text-right border border-border bg-[#fff3e0] min-w-[100px]">Insentif</th>
                  <th className="px-2 py-2 text-right border border-border bg-[#fff3e0] min-w-[100px]">Bonus</th>
                  <th className="px-2 py-2 text-right border border-border bg-[#fff3e0] min-w-[100px]">THR</th>
                  
                  {/* Potongan - Row 2 */}
                  <th className="px-2 py-2 text-right border border-border bg-[#f3e5f5] min-w-[90px]">Potongan 1</th>
                  <th className="px-2 py-2 text-right border border-border bg-[#f3e5f5] min-w-[90px]">Potongan 2</th>
                  <th className="px-2 py-2 text-right border border-border bg-[#f3e5f5] min-w-[90px]">Potongan 3</th>
                  <th className="px-2 py-2 text-right border border-border bg-[#f3e5f5] min-w-[90px]">Potongan 4</th>
                  <th className="px-2 py-2 text-right border border-border bg-[#f3e5f5] min-w-[110px]">Total<br/>Potongan</th>
                  
                  {/* BPJS Karyawan - Row 2 */}
                  <th className="px-2 py-2 text-right border border-border bg-[#fce4ec] min-w-[80px]">JKK</th>
                  <th className="px-2 py-2 text-right border border-border bg-[#fce4ec] min-w-[80px]">JKM</th>
                  <th className="px-2 py-2 text-right border border-border bg-[#fce4ec] min-w-[80px]">JHT</th>
                  <th className="px-2 py-2 text-right border border-border bg-[#fce4ec] min-w-[80px]">JP</th>
                  <th className="px-2 py-2 text-right border border-border bg-[#fce4ec] min-w-[100px]">BPJS Kes</th>
                  <th className="px-2 py-2 text-right border border-border bg-[#fce4ec] min-w-[100px]">Total</th>
                  
                  {/* BPJS Perusahaan - Row 2 */}
                  <th className="px-2 py-2 text-right border border-border bg-[#e8f5e9] min-w-[80px]">JKK</th>
                  <th className="px-2 py-2 text-right border border-border bg-[#e8f5e9] min-w-[80px]">JKM</th>
                  <th className="px-2 py-2 text-right border border-border bg-[#e8f5e9] min-w-[80px]">JHT</th>
                  <th className="px-2 py-2 text-right border border-border bg-[#e8f5e9] min-w-[80px]">JP</th>
                  <th className="px-2 py-2 text-right border border-border bg-[#e8f5e9] min-w-[100px]">BPJS Kes</th>
                  <th className="px-2 py-2 text-right border border-border bg-[#e8f5e9] min-w-[100px]">Total</th>
                  
                  {/* PPh 21 - Row 2 */}
                  <th className="px-2 py-2 text-right border border-border bg-[#ffcdd2] min-w-[120px]">PPh 21<br/>Setahun</th>
                  <th className="px-2 py-2 text-right border border-border bg-[#ffcdd2] min-w-[120px]">PPh 21<br/>Sebulan</th>
                  <th className="px-2 py-2 text-right border border-border bg-[#ffcdd2] min-w-[120px]">PPh 21<br/>Dipotong</th>
                  <th className="px-2 py-2 text-right border border-border bg-[#ffcdd2] min-w-[120px]">PPh 21<br/>Terutang</th>
                </tr>
              </thead>
              <tbody>
                {taxData.map((emp) => (
                  <tr 
                    key={emp.no} 
                    className={`border-b border-border hover:bg-muted/30 ${emp.name === 'Bambang' ? 'bg-yellow-100/50' : ''}`}
                  >
                    {/* Identitas */}
                    <td className="px-2 py-2 text-center border border-border">{emp.no}</td>
                    <td className="px-2 py-2 border border-border">{emp.nik}</td>
                    <td className="px-2 py-2 border border-border">{emp.name}</td>
                    <td className="px-2 py-2 text-center border border-border">{emp.npwpStatus}</td>
                    
                    {/* Penghasilan Tetap */}
                    <td className="px-2 py-2 text-right border border-border bg-[#e3f2fd]/20">{formatCurrency(emp.basicSalary)}</td>
                    <td className="px-2 py-2 text-right border border-border bg-[#e3f2fd]/20">{formatCurrency(emp.positionAllowance)}</td>
                    <td className="px-2 py-2 text-right border border-border bg-[#e3f2fd]/20">{formatCurrency(emp.housingAllowance)}</td>
                    <td className="px-2 py-2 text-right border border-border bg-[#e3f2fd]/20">{formatCurrency(emp.transportAllowance)}</td>
                    <td className="px-2 py-2 text-right border border-border bg-[#e3f2fd]/20">{formatCurrency(emp.mealAllowance)}</td>
                    <td className="px-2 py-2 text-right border border-border bg-[#e3f2fd]/20">{formatCurrency(emp.otherAllowance)}</td>
                    
                    {/* Penghasilan Tidak Tetap */}
                    <td className="px-2 py-2 text-right border border-border bg-[#fff3e0]/20">{emp.overtime ? formatCurrency(emp.overtime) : '0'}</td>
                    <td className="px-2 py-2 text-right border border-border bg-[#fff3e0]/20">{emp.incentive ? formatCurrency(emp.incentive) : '0'}</td>
                    <td className="px-2 py-2 text-right border border-border bg-[#fff3e0]/20">{emp.bonus ? formatCurrency(emp.bonus) : '0'}</td>
                    <td className="px-2 py-2 text-right border border-border bg-[#fff3e0]/20">{formatCurrency(emp.thr)}</td>
                    
                    {/* Total Penghasilan Bruto */}
                    <td className="px-2 py-2 text-right border border-border bg-[#ffeb3b]/30 font-medium">{formatCurrency(emp.grossIncome)}</td>
                    
                    {/* Potongan */}
                    <td className="px-2 py-2 text-right border border-border bg-[#f3e5f5]/20">{emp.deduction1 ? formatCurrency(emp.deduction1) : '0'}</td>
                    <td className="px-2 py-2 text-right border border-border bg-[#f3e5f5]/20">{emp.deduction2 ? formatCurrency(emp.deduction2) : '0'}</td>
                    <td className="px-2 py-2 text-right border border-border bg-[#f3e5f5]/20">{emp.deduction3 ? formatCurrency(emp.deduction3) : '0'}</td>
                    <td className="px-2 py-2 text-right border border-border bg-[#f3e5f5]/20">{emp.deduction4 ? formatCurrency(emp.deduction4) : '0'}</td>
                    <td className="px-2 py-2 text-right border border-border bg-[#f3e5f5]/30 font-medium">{formatCurrency(emp.totalDeduction)}</td>
                    
                    {/* BPJS Karyawan */}
                    <td className="px-2 py-2 text-right border border-border bg-[#fce4ec]/20">{emp.bpjsEmployeeJKK ? formatCurrency(emp.bpjsEmployeeJKK) : '0'}</td>
                    <td className="px-2 py-2 text-right border border-border bg-[#fce4ec]/20">{emp.bpjsEmployeeJKM ? formatCurrency(emp.bpjsEmployeeJKM) : '0'}</td>
                    <td className="px-2 py-2 text-right border border-border bg-[#fce4ec]/20">{formatCurrency(emp.bpjsEmployeeJHT)}</td>
                    <td className="px-2 py-2 text-right border border-border bg-[#fce4ec]/20">{formatCurrency(emp.bpjsEmployeeJP)}</td>
                    <td className="px-2 py-2 text-right border border-border bg-[#fce4ec]/20">{formatCurrency(emp.bpjsEmployeeHealth)}</td>
                    <td className="px-2 py-2 text-right border border-border bg-[#fce4ec]/30 font-medium">{formatCurrency(emp.totalBpjsEmployee)}</td>
                    
                    {/* BPJS Perusahaan */}
                    <td className="px-2 py-2 text-right border border-border bg-[#e8f5e9]/20">{formatCurrency(emp.bpjsCompanyJKK)}</td>
                    <td className="px-2 py-2 text-right border border-border bg-[#e8f5e9]/20">{formatCurrency(emp.bpjsCompanyJKM)}</td>
                    <td className="px-2 py-2 text-right border border-border bg-[#e8f5e9]/20">{formatCurrency(emp.bpjsCompanyJHT)}</td>
                    <td className="px-2 py-2 text-right border border-border bg-[#e8f5e9]/20">{formatCurrency(emp.bpjsCompanyJP)}</td>
                    <td className="px-2 py-2 text-right border border-border bg-[#e8f5e9]/20">{formatCurrency(emp.bpjsCompanyHealth)}</td>
                    <td className="px-2 py-2 text-right border border-border bg-[#e8f5e9]/30 font-medium">{formatCurrency(emp.totalBpjsCompany)}</td>
                    
                    {/* Penghasilan Bruto */}
                    <td className="px-2 py-2 text-right border border-border bg-[#ffeb3b]/50 font-semibold">{formatCurrency(emp.totalBruto)}</td>
                    
                    {/* Biaya Jabatan */}
                    <td className="px-2 py-2 text-right border border-border bg-[#ffebee]/20">{formatCurrency(emp.positionCost)}</td>
                    
                    {/* Penghasilan Netto Setahun */}
                    <td className="px-2 py-2 text-right border border-border bg-[#e0f2f1]/30 font-medium">{formatCurrency(emp.yearlyNetto)}</td>
                    
                    {/* PTKP */}
                    <td className="px-2 py-2 text-right border border-border bg-[#f1f8e9]/20">{formatCurrency(emp.ptkp)}</td>
                    
                    {/* PKP */}
                    <td className="px-2 py-2 text-right border border-border bg-[#fff3e0]/30 font-medium">{emp.pkp ? formatCurrency(emp.pkp) : '0'}</td>
                    
                    {/* PPh 21 */}
                    <td className="px-2 py-2 text-right border border-border bg-[#ffcdd2]/20">{emp.pph21Yearly ? formatCurrency(emp.pph21Yearly) : '0'}</td>
                    <td className="px-2 py-2 text-right border border-border bg-[#ffcdd2]/20">{emp.pph21Monthly ? formatCurrency(emp.pph21Monthly) : '0'}</td>
                    <td className="px-2 py-2 text-right border border-border bg-[#ffcdd2]/20">{emp.pph21Paid ? formatCurrency(emp.pph21Paid) : '0'}</td>
                    <td className="px-2 py-2 text-right border border-border bg-[#ffcdd2]/40 font-semibold">{emp.pph21Payable ? formatCurrency(emp.pph21Payable) : '0'}</td>
                  </tr>
                ))}
                
                {/* Total Row */}
                <tr className="bg-primary/10 border-t-2 border-primary">
                  <td colSpan={4} className="px-2 py-3 border border-border font-semibold">TOTAL</td>
                  
                  {/* Penghasilan Tetap Totals */}
                  <td className="px-2 py-3 text-right border border-border bg-[#e3f2fd]/30 font-semibold">{formatCurrency(calculateTotal('basicSalary'))}</td>
                  <td className="px-2 py-3 text-right border border-border bg-[#e3f2fd]/30 font-semibold">{formatCurrency(calculateTotal('positionAllowance'))}</td>
                  <td className="px-2 py-3 text-right border border-border bg-[#e3f2fd]/30 font-semibold">{formatCurrency(calculateTotal('housingAllowance'))}</td>
                  <td className="px-2 py-3 text-right border border-border bg-[#e3f2fd]/30 font-semibold">{formatCurrency(calculateTotal('transportAllowance'))}</td>
                  <td className="px-2 py-3 text-right border border-border bg-[#e3f2fd]/30 font-semibold">{formatCurrency(calculateTotal('mealAllowance'))}</td>
                  <td className="px-2 py-3 text-right border border-border bg-[#e3f2fd]/30 font-semibold">{formatCurrency(calculateTotal('otherAllowance'))}</td>
                  
                  {/* Penghasilan Tidak Tetap Totals */}
                  <td className="px-2 py-3 text-right border border-border bg-[#fff3e0]/30 font-semibold">{formatCurrency(calculateTotal('overtime'))}</td>
                  <td className="px-2 py-3 text-right border border-border bg-[#fff3e0]/30 font-semibold">{formatCurrency(calculateTotal('incentive'))}</td>
                  <td className="px-2 py-3 text-right border border-border bg-[#fff3e0]/30 font-semibold">{formatCurrency(calculateTotal('bonus'))}</td>
                  <td className="px-2 py-3 text-right border border-border bg-[#fff3e0]/30 font-semibold">{formatCurrency(calculateTotal('thr'))}</td>
                  
                  {/* Total Penghasilan Bruto */}
                  <td className="px-2 py-3 text-right border border-border bg-[#ffeb3b]/50 font-bold text-base">{formatCurrency(calculateTotal('grossIncome'))}</td>
                  
                  {/* Potongan Totals */}
                  <td className="px-2 py-3 text-right border border-border bg-[#f3e5f5]/30 font-semibold">{formatCurrency(calculateTotal('deduction1'))}</td>
                  <td className="px-2 py-3 text-right border border-border bg-[#f3e5f5]/30 font-semibold">{formatCurrency(calculateTotal('deduction2'))}</td>
                  <td className="px-2 py-3 text-right border border-border bg-[#f3e5f5]/30 font-semibold">{formatCurrency(calculateTotal('deduction3'))}</td>
                  <td className="px-2 py-3 text-right border border-border bg-[#f3e5f5]/30 font-semibold">{formatCurrency(calculateTotal('deduction4'))}</td>
                  <td className="px-2 py-3 text-right border border-border bg-[#f3e5f5]/50 font-bold">{formatCurrency(calculateTotal('totalDeduction'))}</td>
                  
                  {/* BPJS Karyawan Totals */}
                  <td className="px-2 py-3 text-right border border-border bg-[#fce4ec]/30 font-semibold">{formatCurrency(calculateTotal('bpjsEmployeeJKK'))}</td>
                  <td className="px-2 py-3 text-right border border-border bg-[#fce4ec]/30 font-semibold">{formatCurrency(calculateTotal('bpjsEmployeeJKM'))}</td>
                  <td className="px-2 py-3 text-right border border-border bg-[#fce4ec]/30 font-semibold">{formatCurrency(calculateTotal('bpjsEmployeeJHT'))}</td>
                  <td className="px-2 py-3 text-right border border-border bg-[#fce4ec]/30 font-semibold">{formatCurrency(calculateTotal('bpjsEmployeeJP'))}</td>
                  <td className="px-2 py-3 text-right border border-border bg-[#fce4ec]/30 font-semibold">{formatCurrency(calculateTotal('bpjsEmployeeHealth'))}</td>
                  <td className="px-2 py-3 text-right border border-border bg-[#fce4ec]/50 font-bold">{formatCurrency(calculateTotal('totalBpjsEmployee'))}</td>
                  
                  {/* BPJS Perusahaan Totals */}
                  <td className="px-2 py-3 text-right border border-border bg-[#e8f5e9]/30 font-semibold">{formatCurrency(calculateTotal('bpjsCompanyJKK'))}</td>
                  <td className="px-2 py-3 text-right border border-border bg-[#e8f5e9]/30 font-semibold">{formatCurrency(calculateTotal('bpjsCompanyJKM'))}</td>
                  <td className="px-2 py-3 text-right border border-border bg-[#e8f5e9]/30 font-semibold">{formatCurrency(calculateTotal('bpjsCompanyJHT'))}</td>
                  <td className="px-2 py-3 text-right border border-border bg-[#e8f5e9]/30 font-semibold">{formatCurrency(calculateTotal('bpjsCompanyJP'))}</td>
                  <td className="px-2 py-3 text-right border border-border bg-[#e8f5e9]/30 font-semibold">{formatCurrency(calculateTotal('bpjsCompanyHealth'))}</td>
                  <td className="px-2 py-3 text-right border border-border bg-[#e8f5e9]/50 font-bold">{formatCurrency(calculateTotal('totalBpjsCompany'))}</td>
                  
                  {/* Penghasilan Bruto Total */}
                  <td className="px-2 py-3 text-right border border-border bg-[#ffeb3b]/60 font-bold text-base">{formatCurrency(calculateTotal('totalBruto'))}</td>
                  
                  {/* Biaya Jabatan Total */}
                  <td className="px-2 py-3 text-right border border-border bg-[#ffebee]/30 font-semibold">{formatCurrency(calculateTotal('positionCost'))}</td>
                  
                  {/* Penghasilan Netto Setahun Total */}
                  <td className="px-2 py-3 text-right border border-border bg-[#e0f2f1]/50 font-bold text-base">{formatCurrency(calculateTotal('yearlyNetto'))}</td>
                  
                  {/* PTKP Total */}
                  <td className="px-2 py-3 text-right border border-border bg-[#f1f8e9]/30 font-semibold">{formatCurrency(calculateTotal('ptkp'))}</td>
                  
                  {/* PKP Total */}
                  <td className="px-2 py-3 text-right border border-border bg-[#fff3e0]/50 font-bold text-base">{formatCurrency(calculateTotal('pkp'))}</td>
                  
                  {/* PPh 21 Totals */}
                  <td className="px-2 py-3 text-right border border-border bg-[#ffcdd2]/30 font-semibold">{formatCurrency(calculateTotal('pph21Yearly'))}</td>
                  <td className="px-2 py-3 text-right border border-border bg-[#ffcdd2]/30 font-semibold">{formatCurrency(calculateTotal('pph21Monthly'))}</td>
                  <td className="px-2 py-3 text-right border border-border bg-[#ffcdd2]/30 font-semibold">{formatCurrency(calculateTotal('pph21Paid'))}</td>
                  <td className="px-2 py-3 text-right border border-border bg-[#ffcdd2]/60 font-bold text-base">{formatCurrency(calculateTotal('pph21Payable'))}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Penghasilan Bruto</p>
          <h3 className="text-xl text-primary">Rp {formatCurrency(calculateTotal('totalBruto'))}</h3>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Penghasilan Netto</p>
          <h3 className="text-xl text-[#00d27a]">Rp {formatCurrency(calculateTotal('yearlyNetto'))}</h3>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total PKP</p>
          <h3 className="text-xl text-[#f5803e]">Rp {formatCurrency(calculateTotal('pkp'))}</h3>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total PPh 21 Terutang</p>
          <h3 className="text-xl text-destructive">Rp {formatCurrency(calculateTotal('pph21Payable'))}</h3>
        </Card>
      </div>
    </div>
  );
}
