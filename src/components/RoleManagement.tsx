import { useState } from 'react';
import { UserRole } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
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
import { Shield, ShieldCheck, ShieldAlert, User, Check, X } from 'lucide-react';

interface ModulePermission {
  module: string;
  moduleName: string;
  category: string;
  description: string;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

interface RolePermissions {
  role: UserRole;
  roleName: string;
  roleDescription: string;
  icon: typeof Shield;
  color: string;
  permissions: ModulePermission[];
}

export function RoleManagement() {
  const [rolePermissions, setRolePermissions] = useState<RolePermissions[]>([
    {
      role: 'super_admin',
      roleName: 'Super Admin',
      roleDescription: 'Akses penuh ke seluruh sistem termasuk manajemen user dan role',
      icon: ShieldCheck,
      color: 'text-red-600',
      permissions: [
        // Dashboard
        { module: 'dashboard', moduleName: 'Dashboard', category: 'Umum', description: 'Lihat dashboard dan statistik', canView: true, canCreate: true, canEdit: true, canDelete: true },
        
        // Penggajian
        { module: 'annual-payroll', moduleName: 'Penggajian Tahunan', category: 'Penggajian', description: 'Kelola penggajian tahunan', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'processing', moduleName: 'Proses Penggajian', category: 'Penggajian', description: 'Proses perhitungan payroll', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'employees', moduleName: 'Gaji Karyawan', category: 'Penggajian', description: 'Kelola payroll per karyawan', canView: true, canCreate: true, canEdit: true, canDelete: true },
        
        // Laporan
        { module: 'payroll-view', moduleName: 'Buku Gaji', category: 'Laporan', description: 'Lihat dan kelola slip gaji', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'tax-worksheet', moduleName: 'Tax Worksheet', category: 'Laporan', description: 'Perhitungan dan worksheet pajak', canView: true, canCreate: true, canEdit: true, canDelete: true },
        
        // Master Data
        { module: 'hrm', moduleName: 'Data Karyawan', category: 'Master Data', description: 'Kelola data karyawan', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'employee-transfer', moduleName: 'Mutasi Karyawan', category: 'Master Data', description: 'Kelola mutasi karyawan', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'division', moduleName: 'Divisi', category: 'Master Data', description: 'Kelola data divisi', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'position', moduleName: 'Jabatan', category: 'Master Data', description: 'Kelola data jabatan', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'wage-master', moduleName: 'Skala Upah', category: 'Master Data', description: 'Kelola skala upah', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'premium', moduleName: 'Premi & Tunjangan', category: 'Master Data', description: 'Kelola data premi', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'tax-master', moduleName: 'Pajak & BPJS', category: 'Master Data', description: 'Kelola PTKP, tarif pajak, BPJS', canView: true, canCreate: true, canEdit: true, canDelete: true },
        
        // Presensi
        { module: 'working-days', moduleName: 'Hari Kerja', category: 'Presensi', description: 'Kelola hari kerja', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'holidays', moduleName: 'Hari Libur', category: 'Presensi', description: 'Kelola hari libur', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'attendance', moduleName: 'Data Presensi', category: 'Presensi', description: 'Kelola data presensi', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'leave', moduleName: 'Cuti Karyawan', category: 'Presensi', description: 'Kelola cuti karyawan', canView: true, canCreate: true, canEdit: true, canDelete: true },
        
        // Administrasi
        { module: 'user-management', moduleName: 'Manajemen User', category: 'Administrasi', description: 'Kelola user sistem', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'role-management', moduleName: 'Role & Permission', category: 'Administrasi', description: 'Kelola role dan permission', canView: true, canCreate: true, canEdit: true, canDelete: true },
        
        // Lainnya
        { module: 'reports', moduleName: 'Analitik', category: 'Lainnya', description: 'Lihat dan export laporan', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'engagement', moduleName: 'Engagement Dashboard', category: 'Lainnya', description: 'Lihat engagement karyawan', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'settings', moduleName: 'Pengaturan', category: 'Lainnya', description: 'Konfigurasi sistem', canView: true, canCreate: true, canEdit: true, canDelete: true },
      ]
    },
    {
      role: 'admin',
      roleName: 'Admin',
      roleDescription: 'Akses penuh ke operasional payroll dan master data, tanpa manajemen user',
      icon: Shield,
      color: 'text-blue-600',
      permissions: [
        // Dashboard
        { module: 'dashboard', moduleName: 'Dashboard', category: 'Umum', description: 'Lihat dashboard dan statistik', canView: true, canCreate: true, canEdit: true, canDelete: true },
        
        // Penggajian
        { module: 'annual-payroll', moduleName: 'Penggajian Tahunan', category: 'Penggajian', description: 'Kelola penggajian tahunan', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'processing', moduleName: 'Proses Penggajian', category: 'Penggajian', description: 'Proses perhitungan payroll', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'employees', moduleName: 'Gaji Karyawan', category: 'Penggajian', description: 'Kelola payroll per karyawan', canView: true, canCreate: true, canEdit: true, canDelete: true },
        
        // Laporan
        { module: 'payroll-view', moduleName: 'Buku Gaji', category: 'Laporan', description: 'Lihat dan kelola slip gaji', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'tax-worksheet', moduleName: 'Tax Worksheet', category: 'Laporan', description: 'Perhitungan dan worksheet pajak', canView: true, canCreate: true, canEdit: true, canDelete: true },
        
        // Master Data
        { module: 'hrm', moduleName: 'Data Karyawan', category: 'Master Data', description: 'Kelola data karyawan', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'employee-transfer', moduleName: 'Mutasi Karyawan', category: 'Master Data', description: 'Kelola mutasi karyawan', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'division', moduleName: 'Divisi', category: 'Master Data', description: 'Kelola data divisi', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'position', moduleName: 'Jabatan', category: 'Master Data', description: 'Kelola data jabatan', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'wage-master', moduleName: 'Skala Upah', category: 'Master Data', description: 'Kelola skala upah', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'premium', moduleName: 'Premi & Tunjangan', category: 'Master Data', description: 'Kelola data premi', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'tax-master', moduleName: 'Pajak & BPJS', category: 'Master Data', description: 'Kelola PTKP, tarif pajak, BPJS', canView: true, canCreate: true, canEdit: true, canDelete: true },
        
        // Presensi
        { module: 'working-days', moduleName: 'Hari Kerja', category: 'Presensi', description: 'Kelola hari kerja', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'holidays', moduleName: 'Hari Libur', category: 'Presensi', description: 'Kelola hari libur', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'attendance', moduleName: 'Data Presensi', category: 'Presensi', description: 'Kelola data presensi', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'leave', moduleName: 'Cuti Karyawan', category: 'Presensi', description: 'Kelola cuti karyawan', canView: true, canCreate: true, canEdit: true, canDelete: true },
        
        // Administrasi
        { module: 'user-management', moduleName: 'Manajemen User', category: 'Administrasi', description: 'Kelola user sistem', canView: false, canCreate: false, canEdit: false, canDelete: false },
        { module: 'role-management', moduleName: 'Role & Permission', category: 'Administrasi', description: 'Kelola role dan permission', canView: false, canCreate: false, canEdit: false, canDelete: false },
        
        // Lainnya
        { module: 'reports', moduleName: 'Analitik', category: 'Lainnya', description: 'Lihat dan export laporan', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'engagement', moduleName: 'Engagement Dashboard', category: 'Lainnya', description: 'Lihat engagement karyawan', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'settings', moduleName: 'Pengaturan', category: 'Lainnya', description: 'Konfigurasi sistem', canView: true, canCreate: true, canEdit: true, canDelete: true },
      ]
    },
    {
      role: 'manager',
      roleName: 'Manager',
      roleDescription: 'Akses view untuk monitoring dan laporan, tanpa kemampuan edit',
      icon: ShieldAlert,
      color: 'text-orange-600',
      permissions: [
        // Dashboard
        { module: 'dashboard', moduleName: 'Dashboard', category: 'Umum', description: 'Lihat dashboard dan statistik', canView: true, canCreate: false, canEdit: false, canDelete: false },
        
        // Penggajian
        { module: 'annual-payroll', moduleName: 'Penggajian Tahunan', category: 'Penggajian', description: 'Kelola penggajian tahunan', canView: true, canCreate: false, canEdit: false, canDelete: false },
        { module: 'processing', moduleName: 'Proses Penggajian', category: 'Penggajian', description: 'Proses perhitungan payroll', canView: true, canCreate: false, canEdit: false, canDelete: false },
        { module: 'employees', moduleName: 'Gaji Karyawan', category: 'Penggajian', description: 'Kelola payroll per karyawan', canView: true, canCreate: false, canEdit: false, canDelete: false },
        
        // Laporan
        { module: 'payroll-view', moduleName: 'Buku Gaji', category: 'Laporan', description: 'Lihat dan kelola slip gaji', canView: true, canCreate: false, canEdit: false, canDelete: false },
        { module: 'tax-worksheet', moduleName: 'Tax Worksheet', category: 'Laporan', description: 'Perhitungan dan worksheet pajak', canView: true, canCreate: false, canEdit: false, canDelete: false },
        
        // Master Data
        { module: 'hrm', moduleName: 'Data Karyawan', category: 'Master Data', description: 'Kelola data karyawan', canView: true, canCreate: false, canEdit: false, canDelete: false },
        { module: 'employee-transfer', moduleName: 'Mutasi Karyawan', category: 'Master Data', description: 'Kelola mutasi karyawan', canView: true, canCreate: false, canEdit: false, canDelete: false },
        { module: 'division', moduleName: 'Divisi', category: 'Master Data', description: 'Kelola data divisi', canView: true, canCreate: false, canEdit: false, canDelete: false },
        { module: 'position', moduleName: 'Jabatan', category: 'Master Data', description: 'Kelola data jabatan', canView: true, canCreate: false, canEdit: false, canDelete: false },
        { module: 'wage-master', moduleName: 'Skala Upah', category: 'Master Data', description: 'Kelola skala upah', canView: true, canCreate: false, canEdit: false, canDelete: false },
        { module: 'premium', moduleName: 'Premi & Tunjangan', category: 'Master Data', description: 'Kelola data premi', canView: true, canCreate: false, canEdit: false, canDelete: false },
        { module: 'tax-master', moduleName: 'Pajak & BPJS', category: 'Master Data', description: 'Kelola PTKP, tarif pajak, BPJS', canView: true, canCreate: false, canEdit: false, canDelete: false },
        
        // Presensi
        { module: 'working-days', moduleName: 'Hari Kerja', category: 'Presensi', description: 'Kelola hari kerja', canView: true, canCreate: false, canEdit: false, canDelete: false },
        { module: 'holidays', moduleName: 'Hari Libur', category: 'Presensi', description: 'Kelola hari libur', canView: true, canCreate: false, canEdit: false, canDelete: false },
        { module: 'attendance', moduleName: 'Data Presensi', category: 'Presensi', description: 'Kelola data presensi', canView: true, canCreate: false, canEdit: false, canDelete: false },
        { module: 'leave', moduleName: 'Cuti Karyawan', category: 'Presensi', description: 'Kelola cuti karyawan', canView: true, canCreate: false, canEdit: false, canDelete: false },
        
        // Administrasi
        { module: 'user-management', moduleName: 'Manajemen User', category: 'Administrasi', description: 'Kelola user sistem', canView: false, canCreate: false, canEdit: false, canDelete: false },
        { module: 'role-management', moduleName: 'Role & Permission', category: 'Administrasi', description: 'Kelola role dan permission', canView: false, canCreate: false, canEdit: false, canDelete: false },
        
        // Lainnya
        { module: 'reports', moduleName: 'Analitik', category: 'Lainnya', description: 'Lihat dan export laporan', canView: true, canCreate: false, canEdit: false, canDelete: false },
        { module: 'engagement', moduleName: 'Engagement Dashboard', category: 'Lainnya', description: 'Lihat engagement karyawan', canView: true, canCreate: false, canEdit: false, canDelete: false },
        { module: 'settings', moduleName: 'Pengaturan', category: 'Lainnya', description: 'Konfigurasi sistem', canView: false, canCreate: false, canEdit: false, canDelete: false },
      ]
    },
    {
      role: 'karyawan',
      roleName: 'Karyawan',
      roleDescription: 'Akses terbatas hanya untuk melihat slip gaji sendiri',
      icon: User,
      color: 'text-gray-600',
      permissions: [
        // Dashboard
        { module: 'dashboard', moduleName: 'Dashboard', category: 'Umum', description: 'Lihat dashboard dan statistik', canView: true, canCreate: false, canEdit: false, canDelete: false },
        
        // Penggajian
        { module: 'annual-payroll', moduleName: 'Penggajian Tahunan', category: 'Penggajian', description: 'Kelola penggajian tahunan', canView: false, canCreate: false, canEdit: false, canDelete: false },
        { module: 'processing', moduleName: 'Proses Penggajian', category: 'Penggajian', description: 'Proses perhitungan payroll', canView: false, canCreate: false, canEdit: false, canDelete: false },
        { module: 'employees', moduleName: 'Gaji Karyawan', category: 'Penggajian', description: 'Kelola payroll per karyawan', canView: false, canCreate: false, canEdit: false, canDelete: false },
        
        // Laporan
        { module: 'payroll-view', moduleName: 'Buku Gaji', category: 'Laporan', description: 'Lihat dan kelola slip gaji', canView: true, canCreate: false, canEdit: false, canDelete: false },
        { module: 'tax-worksheet', moduleName: 'Tax Worksheet', category: 'Laporan', description: 'Perhitungan dan worksheet pajak', canView: false, canCreate: false, canEdit: false, canDelete: false },
        
        // Master Data
        { module: 'hrm', moduleName: 'Data Karyawan', category: 'Master Data', description: 'Kelola data karyawan', canView: false, canCreate: false, canEdit: false, canDelete: false },
        { module: 'employee-transfer', moduleName: 'Mutasi Karyawan', category: 'Master Data', description: 'Kelola mutasi karyawan', canView: false, canCreate: false, canEdit: false, canDelete: false },
        { module: 'division', moduleName: 'Divisi', category: 'Master Data', description: 'Kelola data divisi', canView: false, canCreate: false, canEdit: false, canDelete: false },
        { module: 'position', moduleName: 'Jabatan', category: 'Master Data', description: 'Kelola data jabatan', canView: false, canCreate: false, canEdit: false, canDelete: false },
        { module: 'wage-master', moduleName: 'Skala Upah', category: 'Master Data', description: 'Kelola skala upah', canView: false, canCreate: false, canEdit: false, canDelete: false },
        { module: 'premium', moduleName: 'Premi & Tunjangan', category: 'Master Data', description: 'Kelola data premi', canView: false, canCreate: false, canEdit: false, canDelete: false },
        { module: 'tax-master', moduleName: 'Pajak & BPJS', category: 'Master Data', description: 'Kelola PTKP, tarif pajak, BPJS', canView: false, canCreate: false, canEdit: false, canDelete: false },
        
        // Presensi
        { module: 'working-days', moduleName: 'Hari Kerja', category: 'Presensi', description: 'Kelola hari kerja', canView: false, canCreate: false, canEdit: false, canDelete: false },
        { module: 'holidays', moduleName: 'Hari Libur', category: 'Presensi', description: 'Kelola hari libur', canView: false, canCreate: false, canEdit: false, canDelete: false },
        { module: 'attendance', moduleName: 'Data Presensi', category: 'Presensi', description: 'Kelola data presensi', canView: false, canCreate: false, canEdit: false, canDelete: false },
        { module: 'leave', moduleName: 'Cuti Karyawan', category: 'Presensi', description: 'Kelola cuti karyawan', canView: false, canCreate: false, canEdit: false, canDelete: false },
        
        // Administrasi
        { module: 'user-management', moduleName: 'Manajemen User', category: 'Administrasi', description: 'Kelola user sistem', canView: false, canCreate: false, canEdit: false, canDelete: false },
        { module: 'role-management', moduleName: 'Role & Permission', category: 'Administrasi', description: 'Kelola role dan permission', canView: false, canCreate: false, canEdit: false, canDelete: false },
        
        // Lainnya
        { module: 'reports', moduleName: 'Analitik', category: 'Lainnya', description: 'Lihat dan export laporan', canView: false, canCreate: false, canEdit: false, canDelete: false },
        { module: 'engagement', moduleName: 'Engagement Dashboard', category: 'Lainnya', description: 'Lihat engagement karyawan', canView: false, canCreate: false, canEdit: false, canDelete: false },
        { module: 'settings', moduleName: 'Pengaturan', category: 'Lainnya', description: 'Konfigurasi sistem', canView: true, canCreate: false, canEdit: true, canDelete: false },
      ]
    }
  ]);

  const togglePermission = (
    roleIndex: number,
    moduleIndex: number,
    permission: 'canView' | 'canCreate' | 'canEdit' | 'canDelete'
  ) => {
    const updated = [...rolePermissions];
    updated[roleIndex].permissions[moduleIndex][permission] = !updated[roleIndex].permissions[moduleIndex][permission];
    setRolePermissions(updated);
  };

  // Group permissions by category
  const getGroupedPermissions = (permissions: ModulePermission[]) => {
    const grouped: { [key: string]: ModulePermission[] } = {};
    permissions.forEach(perm => {
      if (!grouped[perm.category]) {
        grouped[perm.category] = [];
      }
      grouped[perm.category].push(perm);
    });
    return grouped;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-foreground">Manajemen Role & Permission</h2>
        <p className="text-muted-foreground">
          Kelola hak akses untuk setiap role dalam sistem
        </p>
      </div>

      {/* Role Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {rolePermissions.map((roleData) => {
          const Icon = roleData.icon;
          const activePermissions = roleData.permissions.filter(p => p.canView).length;
          const totalPermissions = roleData.permissions.length;
          
          return (
            <Card key={roleData.role}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-lg bg-background flex items-center justify-center ${roleData.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge variant="secondary">
                    {activePermissions}/{totalPermissions}
                  </Badge>
                </div>
                <CardTitle className="text-foreground">{roleData.roleName}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {roleData.roleDescription}
                </CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      {/* Detailed Permissions */}
      <Card>
        <CardHeader>
          <CardTitle>Hak Akses Detail</CardTitle>
          <CardDescription>
            Atur permission untuk setiap modul berdasarkan role
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="super_admin" className="w-full">
            <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full">
              {rolePermissions.map((roleData) => {
                const Icon = roleData.icon;
                return (
                  <TabsTrigger key={roleData.role} value={roleData.role} className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{roleData.roleName}</span>
                    <span className="sm:hidden">{roleData.roleName.split(' ')[0]}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {rolePermissions.map((roleData, roleIndex) => {
              const groupedPermissions = getGroupedPermissions(roleData.permissions);
              
              return (
                <TabsContent key={roleData.role} value={roleData.role} className="space-y-4">
                  <div className="rounded-lg border border-border p-4 bg-muted/30">
                    <div className="flex items-start gap-3">
                      {(() => {
                        const Icon = roleData.icon;
                        return <Icon className={`w-5 h-5 mt-0.5 ${roleData.color}`} />;
                      })()}
                      <div>
                        <h3 className="text-foreground">{roleData.roleName}</h3>
                        <p className="text-muted-foreground">{roleData.roleDescription}</p>
                      </div>
                    </div>
                  </div>

                  {Object.entries(groupedPermissions).map(([category, permissions]) => (
                    <div key={category} className="space-y-2">
                      <div className="px-2 py-1 bg-muted/50 rounded">
                        <h4 className="text-foreground">{category}</h4>
                      </div>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="min-w-[200px]">Modul</TableHead>
                              <TableHead>Lihat</TableHead>
                              <TableHead>Buat</TableHead>
                              <TableHead>Edit</TableHead>
                              <TableHead>Hapus</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {permissions.map((permission) => {
                              const moduleIndex = roleData.permissions.findIndex(p => p.module === permission.module);
                              return (
                                <TableRow key={permission.module}>
                                  <TableCell>
                                    <div>
                                      <div>{permission.moduleName}</div>
                                      <div className="text-muted-foreground">
                                        {permission.description}
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <Switch
                                        checked={permission.canView}
                                        onCheckedChange={() => togglePermission(roleIndex, moduleIndex, 'canView')}
                                      />
                                      {permission.canView ? (
                                        <Check className="w-4 h-4 text-green-600" />
                                      ) : (
                                        <X className="w-4 h-4 text-muted-foreground" />
                                      )}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <Switch
                                        checked={permission.canCreate}
                                        onCheckedChange={() => togglePermission(roleIndex, moduleIndex, 'canCreate')}
                                        disabled={!permission.canView}
                                      />
                                      {permission.canCreate ? (
                                        <Check className="w-4 h-4 text-green-600" />
                                      ) : (
                                        <X className="w-4 h-4 text-muted-foreground" />
                                      )}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <Switch
                                        checked={permission.canEdit}
                                        onCheckedChange={() => togglePermission(roleIndex, moduleIndex, 'canEdit')}
                                        disabled={!permission.canView}
                                      />
                                      {permission.canEdit ? (
                                        <Check className="w-4 h-4 text-green-600" />
                                      ) : (
                                        <X className="w-4 h-4 text-muted-foreground" />
                                      )}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <Switch
                                        checked={permission.canDelete}
                                        onCheckedChange={() => togglePermission(roleIndex, moduleIndex, 'canDelete')}
                                        disabled={!permission.canView}
                                      />
                                      {permission.canDelete ? (
                                        <Check className="w-4 h-4 text-green-600" />
                                      ) : (
                                        <X className="w-4 h-4 text-muted-foreground" />
                                      )}
                                    </div>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              );
            })}
          </Tabs>
        </CardContent>
      </Card>

      {/* Permission Matrix Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Matriks Permission</CardTitle>
          <CardDescription>
            Ringkasan hak akses semua role
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Modul</TableHead>
                  {rolePermissions.map((roleData) => (
                    <TableHead key={roleData.role} className="text-center">
                      {roleData.roleName}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {rolePermissions[0].permissions.map((permission, idx) => (
                  <TableRow key={permission.module}>
                    <TableCell>
                      <div>
                        <div>{permission.moduleName}</div>
                        <div className="text-xs text-muted-foreground">{permission.category}</div>
                      </div>
                    </TableCell>
                    {rolePermissions.map((roleData) => {
                      const perm = roleData.permissions[idx];
                      const hasFullAccess = perm.canView && perm.canCreate && perm.canEdit && perm.canDelete;
                      const hasViewOnly = perm.canView && !perm.canCreate && !perm.canEdit && !perm.canDelete;
                      const hasPartialAccess = perm.canView && (perm.canCreate || perm.canEdit || perm.canDelete);
                      
                      return (
                        <TableCell key={roleData.role} className="text-center">
                          {!perm.canView ? (
                            <Badge variant="secondary">Tidak Ada Akses</Badge>
                          ) : hasFullAccess ? (
                            <Badge variant="default">Full Access</Badge>
                          ) : hasViewOnly ? (
                            <Badge variant="outline">View Only</Badge>
                          ) : hasPartialAccess ? (
                            <Badge variant="secondary">Partial Access</Badge>
                          ) : null}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
