import { useState } from 'react';
import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Download, Printer, FileSpreadsheet, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from './ui/badge';
import { MASTER_EMPLOYEES } from '../shared/employeeData';

interface PayrollEmployee {
  nik: string;
  name: string;
  division: string;
  position: string;
  // Attendance
  present: number;
  absent: number;
  sick: number;
  leave: number;
  late: number;
  // Salary Components
  baseSalary: number;
  allowanceJabatan: number;
  allowanceSkill: number;
  allowanceTransport: number;
  allowanceMeal: number;
  // Production
  tbs: number; // Tonase TBS
  pricePerTon: number;
  premiumProduction: number;
  overtime: number;
  premiumOvertime: number;
  // Other Income
  otherIncome: number;
  // Deductions
  bpjsKesehatan: number;
  bpjsKetenagakerjaan: number;
  pph21: number;
  loan: number;
  other: number;
  // Totals
  grossPay: number;
  totalDeductions: number;
  netPay: number;
}

export function PayrollView() {
  const [selectedPeriod, setSelectedPeriod] = useState('2025-10');
  const [selectedDivision, setSelectedDivision] = useState('all');
  const [expandedDivisions, setExpandedDivisions] = useState<string[]>(['Divisi 1', 'Divisi 2', 'Divisi 3']);

  const payrollData: PayrollEmployee[] = [
    // Divisi 1 - Ahmad Hidayat (Mandor Panen)
    {
      nik: MASTER_EMPLOYEES[0].employeeId,
      name: MASTER_EMPLOYEES[0].fullName,
      division: MASTER_EMPLOYEES[0].division,
      position: MASTER_EMPLOYEES[0].position,
      present: 27,
      absent: 0,
      sick: 0,
      leave: 0,
      late: 0,
      baseSalary: MASTER_EMPLOYEES[0].baseSalary,
      allowanceJabatan: 800000,
      allowanceSkill: 500000,
      allowanceTransport: 300000,
      allowanceMeal: 200000,
      tbs: 0, // Mandor tidak panen
      pricePerTon: 50000,
      premiumProduction: 0,
      overtime: 4,
      premiumOvertime: 200000,
      otherIncome: 150000,
      bpjsKesehatan: 55000,
      bpjsKetenagakerjaan: 110000,
      pph21: 150000,
      loan: 500000,
      other: 0,
      grossPay: 7650000,
      totalDeductions: 815000,
      netPay: 6835000,
    },
    // Divisi 1 - Budi Santoso (Pemanen)
    {
      nik: MASTER_EMPLOYEES[2].employeeId,
      name: MASTER_EMPLOYEES[2].fullName,
      division: MASTER_EMPLOYEES[2].division,
      position: MASTER_EMPLOYEES[2].position,
      present: 27,
      absent: 0,
      sick: 0,
      leave: 0,
      late: 0,
      baseSalary: MASTER_EMPLOYEES[2].baseSalary,
      allowanceJabatan: 500000,
      allowanceSkill: 300000,
      allowanceTransport: 200000,
      allowanceMeal: 150000,
      tbs: 18.77,
      pricePerTon: 50000,
      premiumProduction: 938500,
      overtime: 0,
      premiumOvertime: 0,
      otherIncome: 123850,
      bpjsKesehatan: 42000,
      bpjsKetenagakerjaan: 84000,
      pph21: 120000,
      loan: 250000,
      other: 0,
      grossPay: 6414350,
      totalDeductions: 496000,
      netPay: 5918350,
    },
    // Divisi 1 - Sukarman (Pemanen)
    {
      nik: MASTER_EMPLOYEES[6].employeeId,
      name: MASTER_EMPLOYEES[6].fullName,
      division: MASTER_EMPLOYEES[6].division,
      position: MASTER_EMPLOYEES[6].position,
      present: 27,
      absent: 0,
      sick: 0,
      leave: 0,
      late: 0,
      baseSalary: MASTER_EMPLOYEES[6].baseSalary,
      allowanceJabatan: 500000,
      allowanceSkill: 300000,
      allowanceTransport: 200000,
      allowanceMeal: 150000,
      tbs: 23.29,
      pricePerTon: 50000,
      premiumProduction: 1164500,
      overtime: 0,
      premiumOvertime: 0,
      otherIncome: 123850,
      bpjsKesehatan: 45000,
      bpjsKetenagakerjaan: 90000,
      pph21: 135000,
      loan: 0,
      other: 0,
      grossPay: 6938350,
      totalDeductions: 270000,
      netPay: 6668350,
    },
    // Divisi 2 - Rudi Hermawan (Pemanen)
    {
      nik: MASTER_EMPLOYEES[4].employeeId,
      name: MASTER_EMPLOYEES[4].fullName,
      division: MASTER_EMPLOYEES[4].division,
      position: MASTER_EMPLOYEES[4].position,
      present: 25,
      absent: 2,
      sick: 0,
      leave: 0,
      late: 0,
      baseSalary: MASTER_EMPLOYEES[4].baseSalary,
      allowanceJabatan: 500000,
      allowanceSkill: 300000,
      allowanceTransport: 200000,
      allowanceMeal: 150000,
      tbs: 16.52,
      pricePerTon: 50000,
      premiumProduction: 826000,
      overtime: 0,
      premiumOvertime: 0,
      otherIncome: 123850,
      bpjsKesehatan: 43000,
      bpjsKetenagakerjaan: 86000,
      pph21: 110000,
      loan: 0,
      other: 0,
      grossPay: 6399850,
      totalDeductions: 239000,
      netPay: 6160850,
    },
    // Divisi 2 - Agus Setiawan (Kepala Operasional)
    {
      nik: MASTER_EMPLOYEES[8].employeeId,
      name: MASTER_EMPLOYEES[8].fullName,
      division: MASTER_EMPLOYEES[8].division,
      position: MASTER_EMPLOYEES[8].position,
      present: 27,
      absent: 0,
      sick: 0,
      leave: 0,
      late: 0,
      baseSalary: MASTER_EMPLOYEES[8].baseSalary,
      allowanceJabatan: 1500000,
      allowanceSkill: 1000000,
      allowanceTransport: 400000,
      allowanceMeal: 250000,
      tbs: 0,
      pricePerTon: 50000,
      premiumProduction: 0,
      overtime: 8,
      premiumOvertime: 600000,
      otherIncome: 200000,
      bpjsKesehatan: 90000,
      bpjsKetenagakerjaan: 180000,
      pph21: 250000,
      loan: 1000000,
      other: 0,
      grossPay: 12950000,
      totalDeductions: 1520000,
      netPay: 11430000,
    },
    // Divisi 2 - Fitri Handayani (Pemanen)
    {
      nik: MASTER_EMPLOYEES[9].employeeId,
      name: MASTER_EMPLOYEES[9].fullName,
      division: MASTER_EMPLOYEES[9].division,
      position: MASTER_EMPLOYEES[9].position,
      present: 27,
      absent: 0,
      sick: 0,
      leave: 0,
      late: 0,
      baseSalary: MASTER_EMPLOYEES[9].baseSalary,
      allowanceJabatan: 450000,
      allowanceSkill: 250000,
      allowanceTransport: 200000,
      allowanceMeal: 150000,
      tbs: 15.23,
      pricePerTon: 50000,
      premiumProduction: 761500,
      overtime: 0,
      premiumOvertime: 0,
      otherIncome: 100000,
      bpjsKesehatan: 40000,
      bpjsKetenagakerjaan: 80000,
      pph21: 95000,
      loan: 0,
      other: 0,
      grossPay: 5911500,
      totalDeductions: 215000,
      netPay: 5696500,
    },
    // Kantor Pusat - Siti Nurhaliza (Manajer Administrasi)
    {
      nik: MASTER_EMPLOYEES[1].employeeId,
      name: MASTER_EMPLOYEES[1].fullName,
      division: MASTER_EMPLOYEES[1].division,
      position: MASTER_EMPLOYEES[1].position,
      present: 27,
      absent: 0,
      sick: 0,
      leave: 0,
      late: 0,
      baseSalary: MASTER_EMPLOYEES[1].baseSalary,
      allowanceJabatan: 1200000,
      allowanceSkill: 800000,
      allowanceTransport: 300000,
      allowanceMeal: 200000,
      tbs: 0,
      pricePerTon: 0,
      premiumProduction: 0,
      overtime: 0,
      premiumOvertime: 0,
      otherIncome: 150000,
      bpjsKesehatan: 85000,
      bpjsKetenagakerjaan: 170000,
      pph21: 220000,
      loan: 500000,
      other: 0,
      grossPay: 11150000,
      totalDeductions: 975000,
      netPay: 10175000,
    },
    // Kantor Pusat - Dewi Lestari (Spesialis SDM)
    {
      nik: MASTER_EMPLOYEES[3].employeeId,
      name: MASTER_EMPLOYEES[3].fullName,
      division: MASTER_EMPLOYEES[3].division,
      position: MASTER_EMPLOYEES[3].position,
      present: 27,
      absent: 0,
      sick: 0,
      leave: 0,
      late: 0,
      baseSalary: MASTER_EMPLOYEES[3].baseSalary,
      allowanceJabatan: 900000,
      allowanceSkill: 600000,
      allowanceTransport: 250000,
      allowanceMeal: 150000,
      tbs: 0,
      pricePerTon: 0,
      premiumProduction: 0,
      overtime: 0,
      premiumOvertime: 0,
      otherIncome: 100000,
      bpjsKesehatan: 65000,
      bpjsKetenagakerjaan: 130000,
      pph21: 165000,
      loan: 300000,
      other: 0,
      grossPay: 8400000,
      totalDeductions: 660000,
      netPay: 7740000,
    },
    // Kantor Pusat - Hendra Gunawan (Teknisi Mesin)
    {
      nik: MASTER_EMPLOYEES[10].employeeId,
      name: MASTER_EMPLOYEES[10].fullName,
      division: MASTER_EMPLOYEES[10].division,
      position: MASTER_EMPLOYEES[10].position,
      present: 27,
      absent: 0,
      sick: 0,
      leave: 0,
      late: 0,
      baseSalary: MASTER_EMPLOYEES[10].baseSalary,
      allowanceJabatan: 1000000,
      allowanceSkill: 700000,
      allowanceTransport: 250000,
      allowanceMeal: 150000,
      tbs: 0,
      pricePerTon: 0,
      premiumProduction: 0,
      overtime: 5,
      premiumOvertime: 300000,
      otherIncome: 120000,
      bpjsKesehatan: 68000,
      bpjsKetenagakerjaan: 136000,
      pph21: 180000,
      loan: 400000,
      other: 0,
      grossPay: 9370000,
      totalDeductions: 784000,
      netPay: 8586000,
    },
    // Kantor Pusat - Yuni Astuti (Manajer Keuangan)
    {
      nik: MASTER_EMPLOYEES[11].employeeId,
      name: MASTER_EMPLOYEES[11].fullName,
      division: MASTER_EMPLOYEES[11].division,
      position: MASTER_EMPLOYEES[11].position,
      present: 27,
      absent: 0,
      sick: 0,
      leave: 0,
      late: 0,
      baseSalary: MASTER_EMPLOYEES[11].baseSalary,
      allowanceJabatan: 1500000,
      allowanceSkill: 1000000,
      allowanceTransport: 400000,
      allowanceMeal: 250000,
      tbs: 0,
      pricePerTon: 0,
      premiumProduction: 0,
      overtime: 0,
      premiumOvertime: 0,
      otherIncome: 200000,
      bpjsKesehatan: 100000,
      bpjsKetenagakerjaan: 200000,
      pph21: 260000,
      loan: 800000,
      other: 0,
      grossPay: 13350000,
      totalDeductions: 1360000,
      netPay: 11990000,
    },
    // Kantor Pusat - Andi Wijaya (Staff Keuangan)
    {
      nik: MASTER_EMPLOYEES[5].employeeId,
      name: MASTER_EMPLOYEES[5].fullName,
      division: MASTER_EMPLOYEES[5].division,
      position: MASTER_EMPLOYEES[5].position,
      present: 27,
      absent: 0,
      sick: 0,
      leave: 0,
      late: 0,
      baseSalary: MASTER_EMPLOYEES[5].baseSalary,
      allowanceJabatan: 1000000,
      allowanceSkill: 600000,
      allowanceTransport: 300000,
      allowanceMeal: 200000,
      tbs: 0,
      pricePerTon: 0,
      premiumProduction: 0,
      overtime: 0,
      premiumOvertime: 0,
      otherIncome: 150000,
      bpjsKesehatan: 70000,
      bpjsKetenagakerjaan: 140000,
      pph21: 185000,
      loan: 0,
      other: 0,
      grossPay: 9250000,
      totalDeductions: 395000,
      netPay: 8855000,
    },
    // Kantor Pusat - Rina Susanti (Marketing Executive)
    {
      nik: MASTER_EMPLOYEES[7].employeeId,
      name: MASTER_EMPLOYEES[7].fullName,
      division: MASTER_EMPLOYEES[7].division,
      position: MASTER_EMPLOYEES[7].position,
      present: 27,
      absent: 0,
      sick: 0,
      leave: 0,
      late: 0,
      baseSalary: MASTER_EMPLOYEES[7].baseSalary,
      allowanceJabatan: 1100000,
      allowanceSkill: 700000,
      allowanceTransport: 300000,
      allowanceMeal: 200000,
      tbs: 0,
      pricePerTon: 0,
      premiumProduction: 0,
      overtime: 0,
      premiumOvertime: 0,
      otherIncome: 180000,
      bpjsKesehatan: 75000,
      bpjsKetenagakerjaan: 150000,
      pph21: 200000,
      loan: 500000,
      other: 0,
      grossPay: 9980000,
      totalDeductions: 925000,
      netPay: 9055000,
    },
  ];

  const filteredData = selectedDivision === 'all' 
    ? payrollData 
    : payrollData.filter(emp => emp.division === selectedDivision);

  const divisions = selectedDivision === 'all'
    ? Array.from(new Set(payrollData.map(emp => emp.division)))
    : [selectedDivision];

  const toggleDivision = (division: string) => {
    setExpandedDivisions(prev =>
      prev.includes(division)
        ? prev.filter(d => d !== division)
        : [...prev, division]
    );
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('id-ID');
  };

  const calculateDivisionTotal = (division: string, field: keyof PayrollEmployee) => {
    return filteredData
      .filter(emp => emp.division === division)
      .reduce((sum, emp) => sum + (Number(emp[field]) || 0), 0);
  };

  const calculateGrandTotal = (field: keyof PayrollEmployee) => {
    return filteredData.reduce((sum, emp) => sum + (Number(emp[field]) || 0), 0);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-4 md:mb-6">
        <h1 className="mb-1">Buku Gaji - Wise Pay Analysis</h1>
        <p className="text-muted-foreground">PT. Socfin Indonesia - Bangun Bandar</p>
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
                  {divisions.map(div => (
                    <SelectItem key={div} value={div}>{div}</SelectItem>
                  ))}
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
          <div className="min-w-[2400px]">
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-muted/50 border-b-2 border-border">
                <tr>
                  <th rowSpan={2} className="px-2 py-3 text-left border-r border-border sticky left-0 bg-muted/50 z-10">NIK</th>
                  <th rowSpan={2} className="px-2 py-3 text-left border-r border-border sticky left-[60px] bg-muted/50 z-10 min-w-[150px]">Nama</th>
                  <th colSpan={4} className="px-2 py-2 border-r border-border bg-[#e3f2fd]">Kehadiran</th>
                  <th colSpan={2} className="px-2 py-2 border-r border-border bg-[#e8f5e9]">Lembur</th>
                  <th rowSpan={2} className="px-2 py-3 border-r border-border bg-[#fff3e0]">Gaji Pokok</th>
                  <th rowSpan={2} className="px-2 py-3 border-r border-border bg-[#fff3e0]">Natura</th>
                  <th rowSpan={2} className="px-2 py-3 border-r border-border bg-[#fff3e0]">Lain-lain</th>
                  <th rowSpan={2} className="px-2 py-3 border-r border-border bg-[#fffde7]">Gaji Kotor</th>
                  <th colSpan={4} className="px-2 py-2 border-r border-border bg-[#ffebee]">Potongan</th>
                  <th colSpan={2} className="px-2 py-2 bg-[#fffde7]">Total</th>
                </tr>
                <tr>
                  {/* Kehadiran */}
                  <th className="px-2 py-2 text-center border-r border-border bg-[#e3f2fd]">Hadir</th>
                  <th className="px-2 py-2 text-center border-r border-border bg-[#e3f2fd]">Absen</th>
                  <th className="px-2 py-2 text-center border-r border-border bg-[#e3f2fd]">Sakit</th>
                  <th className="px-2 py-2 text-center border-r border-border bg-[#e3f2fd]">Cuti</th>
                  {/* Lembur */}
                  <th className="px-2 py-2 text-center border-r border-border bg-[#e8f5e9]">Jam</th>
                  <th className="px-2 py-2 text-right border-r border-border bg-[#e8f5e9]">Nilai</th>
                  {/* Potongan */}
                  <th className="px-2 py-2 text-right border-r border-border bg-[#ffebee]">BPJS</th>
                  <th className="px-2 py-2 text-right border-r border-border bg-[#ffebee]">PPh 21</th>
                  <th className="px-2 py-2 text-right border-r border-border bg-[#ffebee]">Pinjaman</th>
                  <th className="px-2 py-2 text-right border-r border-border bg-[#ffebee]">Lainnya</th>
                  {/* Total */}
                  <th className="px-2 py-2 text-right border-r border-border bg-[#fffde7]">Total Potongan</th>
                  <th className="px-2 py-2 text-right bg-[#fff9c4]">Gaji Bersih</th>
                </tr>
              </thead>
              <tbody>
                {divisions.map((division) => {
                  const divisionData = filteredData.filter(emp => emp.division === division);
                  const isExpanded = expandedDivisions.includes(division);
                  
                  return (
                    <React.Fragment key={division}>
                      <tr 
                        className="bg-primary/5 hover:bg-primary/10 cursor-pointer border-t-2 border-border"
                        onClick={() => toggleDivision(division)}
                      >
                        <td colSpan={2} className="px-2 py-3 sticky left-0 bg-primary/5 z-10">
                          <div className="flex items-center gap-2">
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            <span className="font-semibold">{division}</span>
                          </div>
                        </td>
                        <td className="px-2 py-3 text-center">{calculateDivisionTotal(division, 'present')}</td>
                        <td className="px-2 py-3 text-center">{calculateDivisionTotal(division, 'absent')}</td>
                        <td className="px-2 py-3 text-center">{calculateDivisionTotal(division, 'sick')}</td>
                        <td className="px-2 py-3 text-center border-r border-border">{calculateDivisionTotal(division, 'leave')}</td>
                        <td className="px-2 py-3 text-center">{calculateDivisionTotal(division, 'overtime')}</td>
                        <td className="px-2 py-3 text-right border-r border-border">{formatCurrency(calculateDivisionTotal(division, 'premiumOvertime'))}</td>
                        <td className="px-2 py-3 text-right border-r border-border">{formatCurrency(calculateDivisionTotal(division, 'baseSalary'))}</td>
                        <td className="px-2 py-3 text-right border-r border-border">{formatCurrency(calculateDivisionTotal(division, 'allowanceMeal'))}</td>
                        <td className="px-2 py-3 text-right border-r border-border">{formatCurrency(calculateDivisionTotal(division, 'otherIncome'))}</td>
                        <td className="px-2 py-3 text-right font-semibold border-r border-border">{formatCurrency(calculateDivisionTotal(division, 'grossPay'))}</td>
                        <td className="px-2 py-3 text-right">{formatCurrency(calculateDivisionTotal(division, 'bpjsKesehatan') + calculateDivisionTotal(division, 'bpjsKetenagakerjaan'))}</td>
                        <td className="px-2 py-3 text-right">{formatCurrency(calculateDivisionTotal(division, 'pph21'))}</td>
                        <td className="px-2 py-3 text-right">{formatCurrency(calculateDivisionTotal(division, 'loan'))}</td>
                        <td className="px-2 py-3 text-right border-r border-border">{formatCurrency(calculateDivisionTotal(division, 'other'))}</td>
                        <td className="px-2 py-3 text-right font-semibold">{formatCurrency(calculateDivisionTotal(division, 'totalDeductions'))}</td>
                        <td className="px-2 py-3 text-right font-semibold bg-[#fff9c4]">{formatCurrency(calculateDivisionTotal(division, 'netPay'))}</td>
                      </tr>
                      {isExpanded && divisionData.map((emp) => (
                        <tr key={emp.nik} className="border-b border-border hover:bg-muted/20">
                          <td className="px-2 py-2 sticky left-0 bg-background z-10 border-r border-border">{emp.nik}</td>
                          <td className="px-2 py-2 sticky left-[60px] bg-background z-10 border-r border-border">{emp.name}</td>
                          <td className="px-2 py-2 text-center">{emp.present}</td>
                          <td className="px-2 py-2 text-center">{emp.absent}</td>
                          <td className="px-2 py-2 text-center">{emp.sick}</td>
                          <td className="px-2 py-2 text-center border-r border-border">{emp.leave}</td>
                          <td className="px-2 py-2 text-center">{emp.overtime > 0 ? emp.overtime : '-'}</td>
                          <td className="px-2 py-2 text-right border-r border-border">{emp.premiumOvertime > 0 ? formatCurrency(emp.premiumOvertime) : '-'}</td>
                          <td className="px-2 py-2 text-right border-r border-border">{formatCurrency(emp.baseSalary)}</td>
                          <td className="px-2 py-2 text-right border-r border-border">{formatCurrency(emp.allowanceMeal)}</td>
                          <td className="px-2 py-2 text-right border-r border-border">{emp.otherIncome > 0 ? formatCurrency(emp.otherIncome) : '-'}</td>
                          <td className="px-2 py-2 text-right font-medium border-r border-border">{formatCurrency(emp.grossPay)}</td>
                          <td className="px-2 py-2 text-right">{formatCurrency(emp.bpjsKesehatan + emp.bpjsKetenagakerjaan)}</td>
                          <td className="px-2 py-2 text-right">{emp.pph21 > 0 ? formatCurrency(emp.pph21) : '-'}</td>
                          <td className="px-2 py-2 text-right">{emp.loan > 0 ? formatCurrency(emp.loan) : '-'}</td>
                          <td className="px-2 py-2 text-right border-r border-border">{emp.other > 0 ? formatCurrency(emp.other) : '-'}</td>
                          <td className="px-2 py-2 text-right font-medium">{formatCurrency(emp.totalDeductions)}</td>
                          <td className="px-2 py-2 text-right font-medium bg-[#fff9c4]">{formatCurrency(emp.netPay)}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })}
                {/* Grand Total */}
                <tr className="bg-primary/10 border-t-2 border-primary">
                  <td colSpan={2} className="px-2 py-3 sticky left-0 bg-primary/10 z-10">
                    <span className="font-bold">GRAND TOTAL</span>
                  </td>
                  <td className="px-2 py-3 text-center font-bold">{calculateGrandTotal('present')}</td>
                  <td className="px-2 py-3 text-center font-bold">{calculateGrandTotal('absent')}</td>
                  <td className="px-2 py-3 text-center font-bold">{calculateGrandTotal('sick')}</td>
                  <td className="px-2 py-3 text-center font-bold border-r border-border">{calculateGrandTotal('leave')}</td>
                  <td className="px-2 py-3 text-center font-bold">{calculateGrandTotal('overtime')}</td>
                  <td className="px-2 py-3 text-right font-bold border-r border-border">{formatCurrency(calculateGrandTotal('premiumOvertime'))}</td>
                  <td className="px-2 py-3 text-right font-bold border-r border-border">{formatCurrency(calculateGrandTotal('baseSalary'))}</td>
                  <td className="px-2 py-3 text-right font-bold border-r border-border">{formatCurrency(calculateGrandTotal('allowanceMeal'))}</td>
                  <td className="px-2 py-3 text-right font-bold border-r border-border">{formatCurrency(calculateGrandTotal('otherIncome'))}</td>
                  <td className="px-2 py-3 text-right font-bold text-lg border-r border-border">{formatCurrency(calculateGrandTotal('grossPay'))}</td>
                  <td className="px-2 py-3 text-right font-bold">{formatCurrency(calculateGrandTotal('bpjsKesehatan') + calculateGrandTotal('bpjsKetenagakerjaan'))}</td>
                  <td className="px-2 py-3 text-right font-bold">{formatCurrency(calculateGrandTotal('pph21'))}</td>
                  <td className="px-2 py-3 text-right font-bold">{formatCurrency(calculateGrandTotal('loan'))}</td>
                  <td className="px-2 py-3 text-right font-bold border-r border-border">{formatCurrency(calculateGrandTotal('other'))}</td>
                  <td className="px-2 py-3 text-right font-bold text-lg">{formatCurrency(calculateGrandTotal('totalDeductions'))}</td>
                  <td className="px-2 py-3 text-right font-bold text-lg bg-[#ffeb3b]">{formatCurrency(calculateGrandTotal('netPay'))}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Gaji Kotor</p>
          <h3 className="text-2xl text-primary">Rp {formatCurrency(calculateGrandTotal('grossPay'))}</h3>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Potongan</p>
          <h3 className="text-2xl text-destructive">Rp {formatCurrency(calculateGrandTotal('totalDeductions'))}</h3>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Gaji Bersih</p>
          <h3 className="text-2xl text-[#00d27a]">Rp {formatCurrency(calculateGrandTotal('netPay'))}</h3>
        </Card>
      </div>
    </div>
  );
}
