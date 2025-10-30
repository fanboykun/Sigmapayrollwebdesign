import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Separator } from './ui/separator';
import {
  Lock,
  Bell,
  Shield,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  Globe,
  Moon,
  Sun,
  Monitor,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

export function AccountSettings() {
  const { user } = useAuth();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('id');

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    payrollProcessed: true,
    employeeAdded: true,
    reportGenerated: false,
    systemUpdates: true,
    securityAlerts: true,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: '30',
  });

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Password baru tidak cocok');
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      toast.error('Password minimal 8 karakter');
      return;
    }
    toast.success('Password berhasil diubah');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleSaveNotifications = () => {
    toast.success('Pengaturan notifikasi berhasil disimpan');
  };

  const handleSaveSecurity = () => {
    toast.success('Pengaturan keamanan berhasil disimpan');
  };

  const handleSavePreferences = () => {
    toast.success('Preferensi berhasil disimpan');
  };

  const securityStatus = [
    {
      label: 'Autentikasi Dua Faktor',
      status: securitySettings.twoFactorAuth ? 'Aktif' : 'Tidak Aktif',
      icon: Shield,
      color: securitySettings.twoFactorAuth ? 'text-green-600' : 'text-yellow-600',
    },
    {
      label: 'Notifikasi Login',
      status: securitySettings.loginAlerts ? 'Aktif' : 'Tidak Aktif',
      icon: Bell,
      color: securitySettings.loginAlerts ? 'text-green-600' : 'text-yellow-600',
    },
    {
      label: 'Sesi Login Terakhir',
      status: user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString('id-ID') : '-',
      icon: CheckCircle2,
      color: 'text-blue-600',
    },
  ];

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-foreground">Pengaturan Akun</h2>
        <p className="text-muted-foreground">
          Kelola pengaturan keamanan, notifikasi, dan preferensi akun Anda
        </p>
      </div>

      <Tabs defaultValue="security" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="security">Keamanan</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
          <TabsTrigger value="preferences">Preferensi</TabsTrigger>
        </TabsList>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Status Keamanan</CardTitle>
              <CardDescription>
                Ringkasan pengaturan keamanan akun Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {securityStatus.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-background flex items-center justify-center ${item.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-foreground">{item.label}</p>
                        <p className="text-muted-foreground">{item.status}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Keamanan</CardTitle>
              <CardDescription>
                Konfigurasikan fitur keamanan untuk melindungi akun Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 flex-1">
                  <Label htmlFor="2fa">Autentikasi Dua Faktor (2FA)</Label>
                  <p className="text-muted-foreground">
                    Tambahkan lapisan keamanan ekstra dengan kode verifikasi
                  </p>
                </div>
                <Switch
                  id="2fa"
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={(checked) =>
                    setSecuritySettings({ ...securitySettings, twoFactorAuth: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5 flex-1">
                  <Label htmlFor="login-alerts">Notifikasi Login</Label>
                  <p className="text-muted-foreground">
                    Dapatkan notifikasi email saat ada login baru ke akun Anda
                  </p>
                </div>
                <Switch
                  id="login-alerts"
                  checked={securitySettings.loginAlerts}
                  onCheckedChange={(checked) =>
                    setSecuritySettings({ ...securitySettings, loginAlerts: checked })
                  }
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Timeout Sesi (menit)</Label>
                <Select
                  value={securitySettings.sessionTimeout}
                  onValueChange={(value) =>
                    setSecuritySettings({ ...securitySettings, sessionTimeout: value })
                  }
                >
                  <SelectTrigger id="session-timeout">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 menit</SelectItem>
                    <SelectItem value="30">30 menit</SelectItem>
                    <SelectItem value="60">1 jam</SelectItem>
                    <SelectItem value="120">2 jam</SelectItem>
                    <SelectItem value="0">Tidak ada timeout</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-muted-foreground">
                  Otomatis logout setelah tidak ada aktivitas
                </p>
              </div>

              <div className="pt-4">
                <Button onClick={handleSaveSecurity}>
                  Simpan Pengaturan Keamanan
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Zona Berbahaya</CardTitle>
              <CardDescription>
                Tindakan yang tidak dapat dibatalkan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full sm:w-auto">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Nonaktifkan Akun
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Menonaktifkan akun akan mencegah Anda login ke sistem.
                      Hubungi administrator untuk mengaktifkan kembali akun Anda.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive hover:bg-destructive/90">
                      Ya, Nonaktifkan
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Password Tab */}
        <TabsContent value="password" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ubah Password</CardTitle>
              <CardDescription>
                Pastikan password Anda kuat dan unik untuk keamanan akun
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Password Saat Ini</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="current-password"
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                    }
                    className="pl-10 pr-10"
                    placeholder="Masukkan password saat ini"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">Password Baru</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="new-password"
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                    }
                    className="pl-10 pr-10"
                    placeholder="Masukkan password baru"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <p className="text-muted-foreground">
                  Minimal 8 karakter dengan kombinasi huruf, angka, dan simbol
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Konfirmasi Password Baru</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirm-password"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                    }
                    className="pl-10"
                    placeholder="Konfirmasi password baru"
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button onClick={handlePasswordChange}>
                  Ubah Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferensi Notifikasi</CardTitle>
              <CardDescription>
                Pilih notifikasi yang ingin Anda terima
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 flex-1">
                  <Label htmlFor="email-notif">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Notifikasi Email
                  </Label>
                  <p className="text-muted-foreground">
                    Terima notifikasi melalui email
                  </p>
                </div>
                <Switch
                  id="email-notif"
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5 flex-1">
                  <Label htmlFor="push-notif">
                    <Smartphone className="w-4 h-4 inline mr-2" />
                    Notifikasi Push
                  </Label>
                  <p className="text-muted-foreground">
                    Terima notifikasi push di browser
                  </p>
                </div>
                <Switch
                  id="push-notif"
                  checked={notificationSettings.pushNotifications}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, pushNotifications: checked })
                  }
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Notifikasi Aktivitas</Label>
                
                <div className="flex items-center justify-between pl-6">
                  <div className="space-y-0.5 flex-1">
                    <Label htmlFor="payroll-notif">Payroll Diproses</Label>
                    <p className="text-muted-foreground">
                      Saat proses penggajian selesai
                    </p>
                  </div>
                  <Switch
                    id="payroll-notif"
                    checked={notificationSettings.payrollProcessed}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, payrollProcessed: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between pl-6">
                  <div className="space-y-0.5 flex-1">
                    <Label htmlFor="employee-notif">Karyawan Baru</Label>
                    <p className="text-muted-foreground">
                      Saat karyawan baru ditambahkan
                    </p>
                  </div>
                  <Switch
                    id="employee-notif"
                    checked={notificationSettings.employeeAdded}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, employeeAdded: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between pl-6">
                  <div className="space-y-0.5 flex-1">
                    <Label htmlFor="report-notif">Analitik Dibuat</Label>
                    <p className="text-muted-foreground">
                      Saat analitik baru di-generate
                    </p>
                  </div>
                  <Switch
                    id="report-notif"
                    checked={notificationSettings.reportGenerated}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, reportGenerated: checked })
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5 flex-1">
                  <Label htmlFor="system-notif">Update Sistem</Label>
                  <p className="text-muted-foreground">
                    Informasi tentang pembaruan sistem
                  </p>
                </div>
                <Switch
                  id="system-notif"
                  checked={notificationSettings.systemUpdates}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, systemUpdates: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5 flex-1">
                  <Label htmlFor="security-notif">Peringatan Keamanan</Label>
                  <p className="text-muted-foreground">
                    Notifikasi penting tentang keamanan akun
                  </p>
                </div>
                <Switch
                  id="security-notif"
                  checked={notificationSettings.securityAlerts}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, securityAlerts: checked })
                  }
                />
              </div>

              <div className="pt-4">
                <Button onClick={handleSaveNotifications}>
                  Simpan Preferensi Notifikasi
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferensi Tampilan</CardTitle>
              <CardDescription>
                Sesuaikan tampilan aplikasi sesuai preferensi Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme">Tema</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger id="theme">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center gap-2">
                        <Sun className="w-4 h-4" />
                        <span>Terang</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center gap-2">
                        <Moon className="w-4 h-4" />
                        <span>Gelap</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div className="flex items-center gap-2">
                        <Monitor className="w-4 h-4" />
                        <span>Ikuti Sistem</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="language">
                  <Globe className="w-4 h-4 inline mr-2" />
                  Bahasa
                </Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id">Bahasa Indonesia</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                <Button onClick={handleSavePreferences}>
                  Simpan Preferensi
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
