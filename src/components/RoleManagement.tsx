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
        { module: 'dashboard', moduleName: 'Dashboard', description: 'Lihat dashboard dan statistik', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'payroll_view', moduleName: 'Slip Gaji', description: 'Lihat dan kelola slip gaji', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'tax_worksheet', moduleName: 'Worksheet Pajak', description: 'Perhitungan dan worksheet pajak', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'employee_management', moduleName: 'Manajemen Karyawan', description: 'Kelola data karyawan', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'division_master', moduleName: 'Master Divisi', description: 'Kelola data divisi', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'position_master', moduleName: 'Master Jabatan', description: 'Kelola data jabatan', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'premium_master', moduleName: 'Master Premi', description: 'Kelola data premi', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'tax_master', moduleName: 'Master Pajak', description: 'Kelola PTKP, tarif pajak, BPJS', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'employee_payroll', moduleName: 'Payroll Karyawan', description: 'Kelola payroll per karyawan', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'payroll_processing', moduleName: 'Proses Payroll', description: 'Proses perhitungan payroll', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'payroll_reports', moduleName: 'Laporan Payroll', description: 'Lihat dan export laporan', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'settings', moduleName: 'Pengaturan', description: 'Konfigurasi sistem', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'user_management', moduleName: 'Manajemen User', description: 'Kelola user sistem', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'role_management', moduleName: 'Manajemen Role', description: 'Kelola role dan permission', canView: true, canCreate: true, canEdit: true, canDelete: true },
      ]
    },
    {
      role: 'admin',
      roleName: 'Admin',
      roleDescription: 'Akses penuh ke operasional payroll dan master data, tanpa manajemen user',
      icon: Shield,
      color: 'text-blue-600',
      permissions: [
        { module: 'dashboard', moduleName: 'Dashboard', description: 'Lihat dashboard dan statistik', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'payroll_view', moduleName: 'Slip Gaji', description: 'Lihat dan kelola slip gaji', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'tax_worksheet', moduleName: 'Worksheet Pajak', description: 'Perhitungan dan worksheet pajak', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'employee_management', moduleName: 'Manajemen Karyawan', description: 'Kelola data karyawan', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'division_master', moduleName: 'Master Divisi', description: 'Kelola data divisi', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'position_master', moduleName: 'Master Jabatan', description: 'Kelola data jabatan', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'premium_master', moduleName: 'Master Premi', description: 'Kelola data premi', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'tax_master', moduleName: 'Master Pajak', description: 'Kelola PTKP, tarif pajak, BPJS', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'employee_payroll', moduleName: 'Payroll Karyawan', description: 'Kelola payroll per karyawan', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'payroll_processing', moduleName: 'Proses Payroll', description: 'Proses perhitungan payroll', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'payroll_reports', moduleName: 'Laporan Payroll', description: 'Lihat dan export laporan', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'settings', moduleName: 'Pengaturan', description: 'Konfigurasi sistem', canView: true, canCreate: true, canEdit: true, canDelete: true },
        { module: 'user_management', moduleName: 'Manajemen User', description: 'Kelola user sistem', canView: false, canCreate: false, canEdit: false, canDelete: false },
        { module: 'role_management', moduleName: 'Manajemen Role', description: 'Kelola role dan permission', canView: false, canCreate: false, canEdit: false, canDelete: false },
      ]
    },
    {
      role: 'manager',
      roleName: 'Manager',
      roleDescription: 'Akses view untuk monitoring dan laporan, tanpa kemampuan edit',
      icon: ShieldAlert,
      color: 'text-orange-600',
      permissions: [
        { module: 'dashboard', moduleName: 'Dashboard', description: 'Lihat dashboard dan statistik', canView: true, canCreate: false, canEdit: false, canDelete: false },
        { module: 'payroll_view', moduleName: 'Slip Gaji', description: 'Lihat dan kelola slip gaji', canView: true, canCreate: false, canEdit: false, canDelete: false },
        { module: 'tax_worksheet', moduleName: 'Worksheet Pajak', description: 'Perhitungan dan worksheet pajak', canView: true, canCreate: false, canEdit: false, canDelete: false },
        { module: 'employee_management', moduleName: 'Manajemen Karyawan', description: 'Kelola data karyawan', canView: true, canCreate: false, canEdit: false, canDelete: false },
        { module: 'division_master', moduleName: 'Master Divisi', description: 'Kelola data divisi', canView: true, canCreate: false, canEdit: false, canDelete: false },
        { module: 'position_master', moduleName: 'Master Jabatan', description: 'Kelola data jabatan', canView: true, canCreate: false, canEdit: false, canDelete: false },
        { module: 'premium_master', moduleName: 'Master Premi', description: 'Kelola data premi', canView: true, canCreate: false, canEdit: false, canDelete: false },
        { module: 'tax_master', moduleName: 'Master Pajak', description: 'Kelola PTKP, tarif pajak, BPJS', canView: true, canCreate: false, canEdit: false, canDelete: false },
        { module: 'employee_payroll', moduleName: 'Payroll Karyawan', description: 'Kelola payroll per karyawan', canView: true, canCreate: false, canEdit: false, canDelete: false },
        { module: 'payroll_processing', moduleName: 'Proses Payroll', description: 'Proses perhitungan payroll', canView: true, canCreate: false, canEdit: false, canDelete: false },
        { module: 'payroll_reports', moduleName: 'Laporan Payroll', description: 'Lihat dan export laporan', canView: true, canCreate: false, canEdit: false, canDelete: false },
        { module: 'settings', moduleName: 'Pengaturan', description: 'Konfigurasi sistem', canView: false, canCreate: false, canEdit: false, canDelete: false },
        { module: 'user_management', moduleName: 'Manajemen User', description: 'Kelola user sistem', canView: false, canCreate: false, canEdit: false, canDelete: false },
        { module: 'role_management', moduleName: 'Manajemen Role', description: 'Kelola role dan permission', canView: false, canCreate: false, canEdit: false, canDelete: false },
      ]
    },
    {
      role: 'karyawan',
      roleName: 'Karyawan',
      roleDescription: 'Akses terbatas hanya untuk melihat slip gaji sendiri',
      icon: User,
      color: 'text-gray-600',
      permissions: [
        { module: 'dashboard', moduleName: 'Dashboard', description: 'Lihat dashboard dan statistik', canView: true, canCreate: false, canEdit: false, canDelete: false },
        { module: 'payroll_view', moduleName: 'Slip Gaji', description: 'Lihat dan kelola slip gaji', canView: true, canCreate: false, canEdit: false, canDelete: false },
        { module: 'tax_worksheet', moduleName: 'Worksheet Pajak', description: 'Perhitungan dan worksheet pajak', canView: false, canCreate: false, canEdit: false, canDelete: false },
        { module: 'employee_management', moduleName: 'Manajemen Karyawan', description: 'Kelola data karyawan', canView: false, canCreate: false, canEdit: false, canDelete: false },
        { module: 'division_master', moduleName: 'Master Divisi', description: 'Kelola data divisi', canView: false, canCreate: false, canEdit: false, canDelete: false },
        { module: 'position_master', moduleName: 'Master Jabatan', description: 'Kelola data jabatan', canView: false, canCreate: false, canEdit: false, canDelete: false },
        { module: 'premium_master', moduleName: 'Master Premi', description: 'Kelola data premi', canView: false, canCreate: false, canEdit: false, canDelete: false },
        { module: 'tax_master', moduleName: 'Master Pajak', description: 'Kelola PTKP, tarif pajak, BPJS', canView: false, canCreate: false, canEdit: false, canDelete: false },
        { module: 'employee_payroll', moduleName: 'Payroll Karyawan', description: 'Kelola payroll per karyawan', canView: false, canCreate: false, canEdit: false, canDelete: false },
        { module: 'payroll_processing', moduleName: 'Proses Payroll', description: 'Proses perhitungan payroll', canView: false, canCreate: false, canEdit: false, canDelete: false },
        { module: 'payroll_reports', moduleName: 'Laporan Payroll', description: 'Lihat dan export laporan', canView: false, canCreate: false, canEdit: false, canDelete: false },
        { module: 'settings', moduleName: 'Pengaturan', description: 'Konfigurasi sistem', canView: false, canCreate: false, canEdit: false, canDelete: false },
        { module: 'user_management', moduleName: 'Manajemen User', description: 'Kelola user sistem', canView: false, canCreate: false, canEdit: false, canDelete: false },
        { module: 'role_management', moduleName: 'Manajemen Role', description: 'Kelola role dan permission', canView: false, canCreate: false, canEdit: false, canDelete: false },
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

            {rolePermissions.map((roleData, roleIndex) => (
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
                      {roleData.permissions.map((permission, moduleIndex) => (
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
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            ))}
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
                      <div>{permission.moduleName}</div>
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
