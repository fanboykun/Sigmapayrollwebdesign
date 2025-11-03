/**
 * PresensiReport.tsx
 *
 * Komponen untuk menampilkan laporan presensi bulanan karyawan.
 * Menampilkan data kehadiran karyawan dalam format kalender bulanan
 * dengan status HK (Hari Kerja), A (Alpa), C (Cuti), S (Sakit), P (Permit).
 *
 * Fitur utama:
 * - Filter berdasarkan bulan dan tahun
 * - Filter berdasarkan divisi
 * - Tampilan kalender dengan kolom tanggal dalam satu bulan
 * - Status kehadiran per karyawan per hari
 * - Integrasi dengan data divisi, karyawan, dan hari libur
 * - Sabtu tidak dihitung sebagai hari libur
 * - Export ke Excel dan PDF
 *
 * @module PresensiReport
 * @author Sistem ERP Perkebunan Sawit
 */

import React, { useState, useMemo } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Download, Printer, FileSpreadsheet, ChevronDown, ChevronUp } from 'lucide-react';
import { MASTER_EMPLOYEES } from '../shared/employeeData';
import { MASTER_DIVISIONS } from '../shared/divisionData';
import { format, getDaysInMonth, getDay, startOfMonth } from 'date-fns';
import { id } from 'date-fns/locale';

/**
 * Interface untuk data presensi karyawan
 */
interface EmployeeAttendance {
  nik: string;
  name: string;
  division: string;
  position: string;
  attendance: Record<number, AttendanceStatus>; // key: tanggal (1-31), value: status
  summary: {
    hk: number; // Hari Kerja
    a: number;  // Alpa
    c: number;  // Cuti
    s: number;  // Sakit
    p: number;  // Permit
    libur: number; // Hari Libur
  };
}

/**
 * Status kehadiran
 */
type AttendanceStatus = 'HK' | 'A' | 'C' | 'S' | 'P' | 'L'; // L = Libur (Minggu)

/**
 * Data hari libur nasional 2025 (contoh)
 * Dalam implementasi sebenarnya, ini akan diambil dari database
 */
const HOLIDAYS_2025: Record<string, string> = {
  '2025-01-01': 'Tahun Baru 2025',
  '2025-03-29': 'Hari Raya Nyepi',
  '2025-03-30': 'Cuti Bersama Nyepi',
  '2025-03-31': 'Wafat Isa Almasih',
  '2025-04-01': 'Cuti Bersama Idul Fitri',
  '2025-04-02': 'Cuti Bersama Idul Fitri',
  '2025-04-03': 'Idul Fitri 1446 H',
  '2025-04-04': 'Idul Fitri 1446 H',
  '2025-04-05': 'Cuti Bersama Idul Fitri',
  '2025-05-01': 'Hari Buruh Internasional',
  '2025-05-29': 'Kenaikan Yesus Kristus',
  '2025-06-01': 'Hari Lahir Pancasila',
  '2025-06-07': 'Idul Adha 1446 H',
  '2025-06-28': 'Tahun Baru Islam 1447 H',
  '2025-08-17': 'Hari Kemerdekaan RI',
  '2025-09-06': 'Maulid Nabi Muhammad SAW',
  '2025-12-25': 'Hari Raya Natal',
};

/**
 * Generate data presensi dummy untuk demo
 * Dalam implementasi sebenarnya, ini akan diambil dari database
 */
const generateDummyAttendance = (
  nik: string,
  year: number,
  month: number,
  holidays: Set<number>,
  sundays: Set<number>
): Record<number, AttendanceStatus> => {
  const daysInMonth = getDaysInMonth(new Date(year, month - 1));
  const attendance: Record<number, AttendanceStatus> = {};

  for (let day = 1; day <= daysInMonth; day++) {
    // Minggu = Libur
    if (sundays.has(day)) {
      attendance[day] = 'L';
    }
    // Hari libur nasional = Libur
    else if (holidays.has(day)) {
      attendance[day] = 'L';
    }
    // Hari kerja - generate random status dengan probabilitas
    else {
      const rand = Math.random();
      if (rand < 0.85) {
        attendance[day] = 'HK'; // 85% hadir
      } else if (rand < 0.90) {
        attendance[day] = 'C'; // 5% cuti
      } else if (rand < 0.95) {
        attendance[day] = 'S'; // 5% sakit
      } else if (rand < 0.98) {
        attendance[day] = 'P'; // 3% permit
      } else {
        attendance[day] = 'A'; // 2% alpa
      }
    }
  }

  return attendance;
};

/**
 * Komponen utama PresensiReport
 */
export function PresensiReport() {
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState((currentDate.getMonth() + 1).toString());
  const [selectedDivision, setSelectedDivision] = useState('all');
  const [expandedDivisions, setExpandedDivisions] = useState<string[]>([]);

  // Generate list tahun (3 tahun ke belakang dan 1 tahun ke depan)
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 5 }, (_, i) => (currentYear - 3 + i).toString());
  }, []);

  // List bulan
  const months = [
    { value: '1', label: 'Januari' },
    { value: '2', label: 'Februari' },
    { value: '3', label: 'Maret' },
    { value: '4', label: 'April' },
    { value: '5', label: 'Mei' },
    { value: '6', label: 'Juni' },
    { value: '7', label: 'Juli' },
    { value: '8', label: 'Agustus' },
    { value: '9', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' },
  ];

  // Calculate days in selected month and identify Sundays and holidays
  const { daysInMonth, sundays, holidays } = useMemo(() => {
    const year = parseInt(selectedYear);
    const month = parseInt(selectedMonth);
    const days = getDaysInMonth(new Date(year, month - 1));
    const firstDay = startOfMonth(new Date(year, month - 1));

    const sundaySet = new Set<number>();
    const holidaySet = new Set<number>();

    // Find all Sundays in the month
    for (let day = 1; day <= days; day++) {
      const date = new Date(year, month - 1, day);
      const dayOfWeek = getDay(date);

      // 0 = Sunday
      if (dayOfWeek === 0) {
        sundaySet.add(day);
      }

      // Check if it's a holiday
      const dateStr = format(date, 'yyyy-MM-dd');
      if (HOLIDAYS_2025[dateStr]) {
        holidaySet.add(day);
      }
    }

    return {
      daysInMonth: days,
      sundays: sundaySet,
      holidays: holidaySet,
    };
  }, [selectedYear, selectedMonth]);

  // Generate attendance data for all employees
  const attendanceData: EmployeeAttendance[] = useMemo(() => {
    const year = parseInt(selectedYear);
    const month = parseInt(selectedMonth);

    return MASTER_EMPLOYEES.map(emp => {
      const attendance = generateDummyAttendance(emp.employeeId, year, month, holidays, sundays);

      // Calculate summary
      const summary = {
        hk: 0,
        a: 0,
        c: 0,
        s: 0,
        p: 0,
        libur: 0,
      };

      Object.values(attendance).forEach(status => {
        if (status === 'HK') summary.hk++;
        else if (status === 'A') summary.a++;
        else if (status === 'C') summary.c++;
        else if (status === 'S') summary.s++;
        else if (status === 'P') summary.p++;
        else if (status === 'L') summary.libur++;
      });

      return {
        nik: emp.employeeId,
        name: emp.fullName,
        division: emp.division,
        position: emp.position,
        attendance,
        summary,
      };
    });
  }, [selectedYear, selectedMonth, holidays, sundays]);

  // Filter by division
  const filteredData = useMemo(() => {
    if (selectedDivision === 'all') {
      return attendanceData;
    }
    return attendanceData.filter(emp => emp.division === selectedDivision);
  }, [attendanceData, selectedDivision]);

  // Get unique divisions from filtered data
  const divisions = useMemo(() => {
    if (selectedDivision === 'all') {
      return Array.from(new Set(attendanceData.map(emp => emp.division)));
    }
    return [selectedDivision];
  }, [attendanceData, selectedDivision]);

  // Toggle division expansion
  const toggleDivision = (division: string) => {
    setExpandedDivisions(prev =>
      prev.includes(division)
        ? prev.filter(d => d !== division)
        : [...prev, division]
    );
  };

  // Get day name
  const getDayName = (day: number) => {
    const date = new Date(parseInt(selectedYear), parseInt(selectedMonth) - 1, day);
    const dayOfWeek = getDay(date);
    const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    return dayNames[dayOfWeek];
  };

  // Get status color with inline style
  const getStatusStyle = (status: AttendanceStatus) => {
    switch (status) {
      case 'HK': return { backgroundColor: '#00d27a', color: 'white' };
      case 'A': return { backgroundColor: '#e63757', color: 'white' };
      case 'C': return { backgroundColor: '#f5803e', color: 'white' };
      case 'S': return { backgroundColor: '#ffc107', color: 'white' };
      case 'P': return { backgroundColor: '#2196f3', color: 'white' };
      case 'L': return { backgroundColor: '#e5e7eb', color: '#6b7280' }; // muted colors
      default: return { backgroundColor: 'transparent', color: 'inherit' };
    }
  };

  // Calculate division totals
  const calculateDivisionSummary = (division: string) => {
    const divisionEmployees = filteredData.filter(emp => emp.division === division);
    return divisionEmployees.reduce((acc, emp) => ({
      hk: acc.hk + emp.summary.hk,
      a: acc.a + emp.summary.a,
      c: acc.c + emp.summary.c,
      s: acc.s + emp.summary.s,
      p: acc.p + emp.summary.p,
      libur: acc.libur + emp.summary.libur,
    }), { hk: 0, a: 0, c: 0, s: 0, p: 0, libur: 0 });
  };

  // Calculate grand totals
  const grandTotals = useMemo(() => {
    return filteredData.reduce((acc, emp) => ({
      hk: acc.hk + emp.summary.hk,
      a: acc.a + emp.summary.a,
      c: acc.c + emp.summary.c,
      s: acc.s + emp.summary.s,
      p: acc.p + emp.summary.p,
      libur: acc.libur + emp.summary.libur,
    }), { hk: 0, a: 0, c: 0, s: 0, p: 0, libur: 0 });
  }, [filteredData]);

  return (
    <div className="p-4 md:p-6">
      <div className="mb-4 md:mb-6">
        <h1 className="mb-1">Laporan Presensi</h1>
        <p className="text-muted-foreground">Laporan kehadiran karyawan per bulan</p>
      </div>

      <Card className="shadow-sm mb-4">
        <div className="p-4 md:p-6 border-b border-border">
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
            <div className="flex flex-wrap gap-2">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Tahun" />
                </SelectTrigger>
                <SelectContent>
                  {years.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Bulan" />
                </SelectTrigger>
                <SelectContent>
                  {months.map(month => (
                    <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedDivision} onValueChange={setSelectedDivision}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Divisi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Divisi</SelectItem>
                  {MASTER_DIVISIONS.map(div => (
                    <SelectItem key={div.code} value={div.name}>{div.name}</SelectItem>
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

        {/* Legend */}
        <div className="p-4 bg-muted/30 border-b border-border">
          <div className="flex flex-wrap gap-3 items-center text-sm">
            <span className="font-medium">Keterangan:</span>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded text-white flex items-center justify-center text-xs font-medium" style={{ backgroundColor: '#00d27a' }}>HK</div>
              <span>Hari Kerja</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded text-white flex items-center justify-center text-xs font-medium" style={{ backgroundColor: '#e63757' }}>A</div>
              <span>Alpa</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded text-white flex items-center justify-center text-xs font-medium" style={{ backgroundColor: '#f5803e' }}>C</div>
              <span>Cuti</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded text-white flex items-center justify-center text-xs font-medium" style={{ backgroundColor: '#ffc107' }}>S</div>
              <span>Sakit</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded text-white flex items-center justify-center text-xs font-medium" style={{ backgroundColor: '#2196f3' }}>P</div>
              <span>Permit</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded bg-muted text-muted-foreground flex items-center justify-center text-xs font-medium">L</div>
              <span>Libur</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[1800px]">
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-muted/50 border-b-2 border-border">
                <tr>
                  <th rowSpan={2} className="px-2 py-3 text-left border-r border-border sticky left-0 bg-muted/50 z-10 min-w-[60px]">NIK</th>
                  <th rowSpan={2} className="px-2 py-3 text-left border-r border-border sticky left-[60px] bg-muted/50 z-10 min-w-[150px]">Nama</th>
                  <th colSpan={daysInMonth} className="px-2 py-2 border-r border-border bg-[#e3f2fd]">
                    Tanggal - {months.find(m => m.value === selectedMonth)?.label} {selectedYear}
                  </th>
                  <th colSpan={6} className="px-2 py-2 bg-[#fff3e0]">Ringkasan</th>
                </tr>
                <tr>
                  {/* Kolom tanggal */}
                  {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                    const dayName = getDayName(day);
                    const isSunday = sundays.has(day);
                    const isHoliday = holidays.has(day);
                    const isWeekend = isSunday;

                    return (
                      <th
                        key={day}
                        className={`px-1 py-2 text-center text-[10px] border-r border-border ${
                          isWeekend ? 'bg-[#ffebee]' : isHoliday ? 'bg-[#fff9c4]' : 'bg-[#e3f2fd]'
                        }`}
                      >
                        <div>{day}</div>
                        <div className="text-[9px] text-muted-foreground">{dayName}</div>
                      </th>
                    );
                  })}
                  {/* Kolom ringkasan */}
                  <th className="px-2 py-2 text-center bg-[#e8f5e9]">HK</th>
                  <th className="px-2 py-2 text-center bg-[#ffebee]">A</th>
                  <th className="px-2 py-2 text-center bg-[#fff3e0]">C</th>
                  <th className="px-2 py-2 text-center bg-[#fffde7]">S</th>
                  <th className="px-2 py-2 text-center bg-[#e1f5fe]">P</th>
                  <th className="px-2 py-2 text-center bg-muted/30">L</th>
                </tr>
              </thead>
              <tbody>
                {divisions.map(division => {
                  const divisionData = filteredData.filter(emp => emp.division === division);
                  const isExpanded = expandedDivisions.includes(division);
                  const divisionSummary = calculateDivisionSummary(division);

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
                            <span className="text-muted-foreground text-xs">({divisionData.length} karyawan)</span>
                          </div>
                        </td>
                        {/* Empty cells for dates */}
                        {Array.from({ length: daysInMonth }, (_, i) => (
                          <td key={i} className="border-r border-border"></td>
                        ))}
                        {/* Division summary */}
                        <td className="px-2 py-3 text-center font-semibold">{divisionSummary.hk}</td>
                        <td className="px-2 py-3 text-center font-semibold">{divisionSummary.a}</td>
                        <td className="px-2 py-3 text-center font-semibold">{divisionSummary.c}</td>
                        <td className="px-2 py-3 text-center font-semibold">{divisionSummary.s}</td>
                        <td className="px-2 py-3 text-center font-semibold">{divisionSummary.p}</td>
                        <td className="px-2 py-3 text-center font-semibold">{divisionSummary.libur}</td>
                      </tr>
                      {isExpanded && divisionData.map(emp => (
                        <tr key={emp.nik} className="border-b border-border hover:bg-muted/20">
                          <td className="px-2 py-2 sticky left-0 bg-background z-10 border-r border-border">{emp.nik}</td>
                          <td className="px-2 py-2 sticky left-[60px] bg-background z-10 border-r border-border">{emp.name}</td>
                          {/* Attendance cells */}
                          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                            const status = emp.attendance[day];
                            return (
                              <td key={day} className="px-1 py-2 text-center border-r border-border">
                                <div
                                  className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-medium mx-auto"
                                  style={getStatusStyle(status)}
                                >
                                  {status}
                                </div>
                              </td>
                            );
                          })}
                          {/* Summary cells */}
                          <td className="px-2 py-2 text-center">{emp.summary.hk}</td>
                          <td className="px-2 py-2 text-center">{emp.summary.a}</td>
                          <td className="px-2 py-2 text-center">{emp.summary.c}</td>
                          <td className="px-2 py-2 text-center">{emp.summary.s}</td>
                          <td className="px-2 py-2 text-center">{emp.summary.p}</td>
                          <td className="px-2 py-2 text-center">{emp.summary.libur}</td>
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
                  {/* Empty cells for dates */}
                  {Array.from({ length: daysInMonth }, (_, i) => (
                    <td key={i} className="border-r border-border"></td>
                  ))}
                  {/* Grand totals */}
                  <td className="px-2 py-3 text-center font-bold">{grandTotals.hk}</td>
                  <td className="px-2 py-3 text-center font-bold">{grandTotals.a}</td>
                  <td className="px-2 py-3 text-center font-bold">{grandTotals.c}</td>
                  <td className="px-2 py-3 text-center font-bold">{grandTotals.s}</td>
                  <td className="px-2 py-3 text-center font-bold">{grandTotals.p}</td>
                  <td className="px-2 py-3 text-center font-bold">{grandTotals.libur}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Hadir</p>
          <h3 className="text-2xl text-[#00d27a]">{grandTotals.hk}</h3>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Alpa</p>
          <h3 className="text-2xl text-[#e63757]">{grandTotals.a}</h3>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Cuti</p>
          <h3 className="text-2xl text-[#f5803e]">{grandTotals.c}</h3>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Sakit</p>
          <h3 className="text-2xl text-[#ffc107]">{grandTotals.s}</h3>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Permit</p>
          <h3 className="text-2xl text-[#2196f3]">{grandTotals.p}</h3>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Hari Libur</p>
          <h3 className="text-2xl text-muted-foreground">{grandTotals.libur}</h3>
        </Card>
      </div>
    </div>
  );
}
