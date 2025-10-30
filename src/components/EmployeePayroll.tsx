import { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Filter, Download, Eye, UserPlus } from 'lucide-react';
import { MASTER_EMPLOYEES } from '../shared/employeeData';

interface Employee {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  position: string;
  baseSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'Active' | 'On Leave' | 'Inactive';
}

export function EmployeePayroll() {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const employees: Employee[] = MASTER_EMPLOYEES.map(emp => ({
    id: emp.id,
    name: emp.fullName,
    employeeId: emp.employeeId,
    department: emp.department,
    position: emp.position,
    baseSalary: emp.baseSalary,
    allowances: emp.baseSalary * 0.3, // 30% dari gaji pokok
    deductions: emp.baseSalary * 0.1, // 10% dari gaji pokok
    netSalary: emp.baseSalary * 1.2, // gaji pokok + allowances - deductions
    status: emp.status === 'active' ? 'Active' : emp.status === 'on-leave' ? 'On Leave' : 'Inactive',
  }));

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || emp.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-4 md:mb-6">
        <h1 className="mb-1">Gaji Karyawan</h1>
        <p className="text-muted-foreground">Kelola informasi gaji dan kompensasi karyawan</p>
      </div>

      <Card className="shadow-sm">
        <div className="p-4 md:p-6 border-b border-border">
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Cari berdasarkan nama atau ID karyawan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter size={16} className="mr-2" />
                  <SelectValue placeholder="Departemen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Departemen</SelectItem>
                  <SelectItem value="Produksi">Produksi</SelectItem>
                  <SelectItem value="Administrasi">Administrasi</SelectItem>
                  <SelectItem value="SDM">SDM</SelectItem>
                  <SelectItem value="Keuangan">Keuangan</SelectItem>
                  <SelectItem value="Pemasaran">Pemasaran</SelectItem>
                  <SelectItem value="Operasional">Operasional</SelectItem>
                  <SelectItem value="Teknik">Teknik</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Download size={16} />
                Ekspor
              </Button>
              <Button className="gap-2 flex-1 sm:flex-none">
                <UserPlus size={16} />
                Tambah Karyawan
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto -mx-4 md:mx-0">
          <table className="w-full min-w-[800px]">
            <thead className="bg-muted/30 border-b border-border">
              <tr>
                <th className="text-left px-4 md:px-6 py-3 text-sm text-muted-foreground">Karyawan</th>
                <th className="text-left px-4 md:px-6 py-3 text-sm text-muted-foreground">Departemen</th>
                <th className="text-left px-4 md:px-6 py-3 text-sm text-muted-foreground">Jabatan</th>
                <th className="text-right px-4 md:px-6 py-3 text-sm text-muted-foreground">Gaji Pokok</th>
                <th className="text-right px-4 md:px-6 py-3 text-sm text-muted-foreground">Tunjangan</th>
                <th className="text-right px-4 md:px-6 py-3 text-sm text-muted-foreground">Potongan</th>
                <th className="text-right px-4 md:px-6 py-3 text-sm text-muted-foreground">Gaji Bersih</th>
                <th className="text-left px-4 md:px-6 py-3 text-sm text-muted-foreground">Status</th>
                <th className="text-left px-4 md:px-6 py-3 text-sm text-muted-foreground">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="mb-0">{employee.name}</p>
                        <p className="text-xs text-muted-foreground">{employee.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4">{employee.department}</td>
                  <td className="px-4 md:px-6 py-4 text-muted-foreground">{employee.position}</td>
                  <td className="px-4 md:px-6 py-4 text-right">{formatCurrency(employee.baseSalary)}</td>
                  <td className="px-4 md:px-6 py-4 text-right text-[#00d27a]">+{formatCurrency(employee.allowances)}</td>
                  <td className="px-4 md:px-6 py-4 text-right text-[#e63757]">-{formatCurrency(employee.deductions)}</td>
                  <td className="px-4 md:px-6 py-4 text-right">{formatCurrency(employee.netSalary)}</td>
                  <td className="px-4 md:px-6 py-4">
                    <Badge
                      variant="secondary"
                      className={
                        employee.status === 'Active'
                          ? 'bg-[#00d27a]/10 text-[#00d27a] hover:bg-[#00d27a]/10'
                          : employee.status === 'On Leave'
                          ? 'bg-[#f5803e]/10 text-[#f5803e] hover:bg-[#f5803e]/10'
                          : 'bg-muted text-muted-foreground hover:bg-muted'
                      }
                    >
                      {employee.status === 'Active' ? 'Aktif' : employee.status === 'On Leave' ? 'Cuti' : 'Tidak Aktif'}
                    </Badge>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-2"
                          onClick={() => setSelectedEmployee(employee)}
                        >
                          <Eye size={16} />
                          Lihat
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Detail Gaji Karyawan</DialogTitle>
                          <DialogDescription>
                            Informasi lengkap mengenai gaji dan komponen pembayaran karyawan
                          </DialogDescription>
                        </DialogHeader>
                        {selectedEmployee && (
                          <div className="space-y-6">
                            <div className="flex items-center gap-4 pb-4 border-b">
                              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl">
                                {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <h3>{selectedEmployee.name}</h3>
                                <p className="text-sm text-muted-foreground">{selectedEmployee.employeeId} • {selectedEmployee.position}</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 bg-muted/30 rounded">
                                <p className="text-sm text-muted-foreground mb-1">Departemen</p>
                                <p>{selectedEmployee.department}</p>
                              </div>
                              <div className="p-4 bg-muted/30 rounded">
                                <p className="text-sm text-muted-foreground mb-1">Status</p>
                                <Badge
                                  variant="secondary"
                                  className={
                                    selectedEmployee.status === 'Active'
                                      ? 'bg-[#00d27a]/10 text-[#00d27a] hover:bg-[#00d27a]/10'
                                      : 'bg-[#f5803e]/10 text-[#f5803e] hover:bg-[#f5803e]/10'
                                  }
                                >
                                  {selectedEmployee.status === 'Active' ? 'Aktif' : 'Cuti'}
                                </Badge>
                              </div>
                            </div>

                            <div>
                              <h4 className="mb-4">Rincian Gaji</h4>
                              <div className="space-y-3">
                                <div className="flex justify-between py-3 border-b border-border">
                                  <span className="text-muted-foreground">Gaji Pokok</span>
                                  <span className="font-medium">{formatCurrency(selectedEmployee.baseSalary)}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-border">
                                  <span className="text-muted-foreground">Tunjangan</span>
                                  <span className="text-[#00d27a]">+{formatCurrency(selectedEmployee.allowances)}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-border">
                                  <span className="text-muted-foreground">Potongan</span>
                                  <span className="text-[#e63757]">-{formatCurrency(selectedEmployee.deductions)}</span>
                                </div>
                                <div className="flex justify-between py-4 bg-primary/5 px-4 rounded">
                                  <span>Gaji Bersih</span>
                                  <span className="text-primary text-lg">{formatCurrency(selectedEmployee.netSalary)}</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="mb-4">Riwayat Pembayaran</h4>
                              <div className="space-y-2">
                                {['Oktober 2025', 'September 2025', 'Agustus 2025'].map((month) => (
                                  <div key={month} className="flex justify-between py-2 text-sm">
                                    <span className="text-muted-foreground">{month}</span>
                                    <span className="text-[#00d27a]">Dibayar - {formatCurrency(selectedEmployee.netSalary)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-4 md:px-6 py-3 md:py-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs md:text-sm text-muted-foreground">Menampilkan {filteredEmployees.length} dari {employees.length} karyawan</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Sebelumnya</Button>
            <Button variant="outline" size="sm">Berikutnya</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
