import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Shield,
  Building2,
  Edit,
  Camera,
  Clock,
  Award,
  TrendingUp,
} from 'lucide-react';
import { toast } from 'sonner';

export function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+62 812-3456-7890',
    address: 'Jl. Sawit Raya No. 123, Jakarta Selatan',
    bio: 'Profesional di bidang HR dengan pengalaman lebih dari 5 tahun dalam manajemen payroll dan administrasi karyawan.',
    birthDate: '1990-05-15',
    joinDate: '2020-01-15',
    department: 'Human Resources',
    position: 'HR Manager',
  });

  const handleSave = () => {
    // Simulate save
    toast.success('Profil berhasil diperbarui');
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      super_admin: 'Super Admin',
      admin: 'Admin',
      manager: 'Manager',
      karyawan: 'Karyawan'
    };
    return labels[role] || role;
  };

  const getRoleBadgeVariant = (role: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (role) {
      case 'super_admin':
        return 'destructive';
      case 'admin':
        return 'default';
      case 'manager':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const activityLog = [
    { action: 'Login ke sistem', time: '2 jam yang lalu', icon: Clock },
    { action: 'Memproses payroll bulan Oktober', time: '5 jam yang lalu', icon: TrendingUp },
    { action: 'Menambah karyawan baru', time: '1 hari yang lalu', icon: User },
    { action: 'Export analitik penggajian', time: '2 hari yang lalu', icon: Award },
    { action: 'Update master data divisi', time: '3 hari yang lalu', icon: Building2 },
  ];

  const achievements = [
    { title: 'Payroll Master', description: 'Memproses 100+ payroll', icon: Award, color: 'text-yellow-600' },
    { title: 'Data Guru', description: 'Kelola 500+ karyawan', icon: User, color: 'text-blue-600' },
    { title: 'Tepat Waktu', description: '12 bulan tanpa keterlambatan', icon: Clock, color: 'text-green-600' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-foreground">Profil Saya</h2>
        <p className="text-muted-foreground">
          Kelola informasi profil dan preferensi akun Anda
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <Avatar className="w-32 h-32">
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      {user ? getInitials(user.name) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2 w-full">
                  <h3 className="text-foreground">{user?.name}</h3>
                  <p className="text-muted-foreground">{user?.email}</p>
                  {user && (
                    <Badge variant={getRoleBadgeVariant(user.role)}>
                      {getRoleLabel(user.role)}
                    </Badge>
                  )}
                  {user?.employeeId && (
                    <p className="text-muted-foreground">ID: {user.employeeId}</p>
                  )}
                </div>

                <div className="w-full pt-4 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{formData.department}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{formData.position}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Bergabung {new Date(formData.joinDate).toLocaleDateString('id-ID', { 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements Card */}
          <Card>
            <CardHeader>
              <CardTitle>Pencapaian</CardTitle>
              <CardDescription>Badge dan prestasi Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement, idx) => {
                const Icon = achievement.icon;
                return (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <div className={`w-10 h-10 rounded-full bg-background flex items-center justify-center ${achievement.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-foreground">{achievement.title}</h4>
                      <p className="text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Detailed Info */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="info" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">Informasi Pribadi</TabsTrigger>
              <TabsTrigger value="activity">Aktivitas</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Informasi Pribadi</CardTitle>
                    <CardDescription>
                      Kelola informasi pribadi Anda
                    </CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)} variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profil
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={handleSave}>
                        Simpan
                      </Button>
                      <Button onClick={() => setIsEditing(false)} variant="outline">
                        Batal
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        <User className="w-4 h-4 inline mr-2" />
                        Nama Lengkap
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Nomor Telepon
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="birthDate">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Tanggal Lahir
                      </Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="department">
                        <Building2 className="w-4 h-4 inline mr-2" />
                        Departemen
                      </Label>
                      <Input
                        id="department"
                        value={formData.department}
                        disabled
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position">
                        <Briefcase className="w-4 h-4 inline mr-2" />
                        Jabatan
                      </Label>
                      <Input
                        id="position"
                        value={formData.position}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Alamat
                    </Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      disabled={!isEditing}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      disabled={!isEditing}
                      rows={4}
                      placeholder="Ceritakan sedikit tentang diri Anda..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Stats Card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Total Payroll Diproses</CardDescription>
                    <CardTitle className="text-foreground">156</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Karyawan Dikelola</CardDescription>
                    <CardTitle className="text-foreground">523</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Laporan Dibuat</CardDescription>
                    <CardTitle className="text-foreground">89</CardTitle>
                  </CardHeader>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Aktivitas Terakhir</CardTitle>
                  <CardDescription>
                    Riwayat aktivitas Anda dalam sistem
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activityLog.map((activity, idx) => {
                      const Icon = activity.icon;
                      return (
                        <div key={idx} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className="text-foreground">{activity.action}</p>
                            <p className="text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
