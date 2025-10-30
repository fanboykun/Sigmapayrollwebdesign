import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CheckCircle2, XCircle, Code2, Palette, Database } from 'lucide-react';

interface SettingsProps {
  onNavigate?: (view: string) => void;
}

export function Settings({ onNavigate }: SettingsProps) {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-4 md:mb-6">
        <h1 className="mb-1">Pengaturan</h1>
        <p className="text-muted-foreground">Konfigurasi pengaturan dan preferensi penggajian</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4 md:space-y-6">
        <TabsList>
          <TabsTrigger value="general">Umum</TabsTrigger>
          <TabsTrigger value="payroll">Aturan Penggajian</TabsTrigger>
          <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
          <TabsTrigger value="integrations">Integrasi</TabsTrigger>
          <TabsTrigger value="developer">Developer</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="shadow-sm">
            <div className="p-6 border-b border-border">
              <h3>Pengaturan Umum</h3>
            </div>
            <div className="p-6">
              <div className="space-y-6 max-w-2xl">
                <div className="space-y-2">
                  <Label htmlFor="company">Nama Perusahaan</Label>
                  <Input id="company" defaultValue="PT Socfindo" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Mata Uang Default</Label>
                  <Select defaultValue="idr">
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="idr">IDR - Rupiah Indonesia</SelectItem>
                      <SelectItem value="usd">USD - Dolar Amerika</SelectItem>
                      <SelectItem value="sgd">SGD - Dolar Singapura</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payroll-cycle">Siklus Penggajian</Label>
                  <Select defaultValue="monthly">
                    <SelectTrigger id="payroll-cycle">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Mingguan</SelectItem>
                      <SelectItem value="biweekly">Dua Mingguan</SelectItem>
                      <SelectItem value="monthly">Bulanan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment-day">Hari Pembayaran Default</Label>
                  <Select defaultValue="15">
                    <SelectTrigger id="payment-day">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Tanggal 1 setiap bulan</SelectItem>
                      <SelectItem value="15">Tanggal 15 setiap bulan</SelectItem>
                      <SelectItem value="30">Hari terakhir setiap bulan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-6">
                  <Button>Simpan Perubahan</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="payroll">
          <Card className="shadow-sm">
            <div className="p-6 border-b border-border">
              <h3>Aturan Penggajian</h3>
            </div>
            <div className="p-6">
              <div className="space-y-6 max-w-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded">
                    <div>
                      <p className="mb-1">Perhitungan Pajak Otomatis</p>
                      <p className="text-sm text-muted-foreground">Hitung pajak secara otomatis berdasarkan detail karyawan</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded">
                    <div>
                      <p className="mb-1">Sertakan Lembur</p>
                      <p className="text-sm text-muted-foreground">Faktor jam lembur dalam perhitungan penggajian</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded">
                    <div>
                      <p className="mb-1">Bonus Kinerja</p>
                      <p className="text-sm text-muted-foreground">Izinkan penambahan bonus berbasis kinerja</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded">
                    <div>
                      <p className="mb-1">Integrasi Kehadiran</p>
                      <p className="text-sm text-muted-foreground">Hubungkan penggajian dengan pelacakan kehadiran</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="pt-4 border-t space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tax-rate">Tarif Pajak Default (%)</Label>
                    <Input id="tax-rate" type="number" defaultValue="15" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="overtime-multiplier">Pengali Lembur</Label>
                    <Input id="overtime-multiplier" type="number" step="0.1" defaultValue="1.5" />
                  </div>
                </div>

                <div className="pt-6">
                  <Button>Simpan Aturan</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="shadow-sm">
            <div className="p-6 border-b border-border">
              <h3>Pengaturan Notifikasi</h3>
            </div>
            <div className="p-6">
              <div className="space-y-6 max-w-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded">
                    <div>
                      <p className="mb-1">Penyelesaian Penggajian</p>
                      <p className="text-sm text-muted-foreground">Beri tahu saat pemrosesan penggajian selesai</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded">
                    <div>
                      <p className="mb-1">Konfirmasi Pembayaran Karyawan</p>
                      <p className="text-sm text-muted-foreground">Kirim konfirmasi pembayaran ke karyawan</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded">
                    <div>
                      <p className="mb-1">Pembuatan Slip Gaji</p>
                      <p className="text-sm text-muted-foreground">Buat dan kirim slip gaji secara otomatis</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded">
                    <div>
                      <p className="mb-1">Pengingat Penggajian Mendatang</p>
                      <p className="text-sm text-muted-foreground">Ingatkan sebelum tanggal penggajian yang dijadwalkan</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded">
                    <div>
                      <p className="mb-1">Peringatan Error</p>
                      <p className="text-sm text-muted-foreground">Beri tahu tentang error pemrosesan penggajian</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="pt-4 border-t space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="notification-email">Email Notifikasi</Label>
                    <Input id="notification-email" type="email" defaultValue="hr@acmeindonesia.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reminder-days">Hari Pengingat Sebelumnya</Label>
                    <Select defaultValue="3">
                      <SelectTrigger id="reminder-days">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hari</SelectItem>
                        <SelectItem value="3">3 hari</SelectItem>
                        <SelectItem value="7">7 hari</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="pt-6">
                  <Button>Simpan Preferensi</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card className="shadow-sm">
            <div className="p-6 border-b border-border">
              <h3>Integrasi</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4 max-w-2xl">
                <div className="p-5 border border-border rounded hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p>Integrasi API Bank</p>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#00d27a]/10 text-[#00d27a] rounded-full text-xs">
                          <CheckCircle2 size={12} />
                          Terhubung
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">Hubungkan dengan bank untuk pembayaran langsung</p>
                    </div>
                    <Button variant="outline" size="sm">Konfigurasi</Button>
                  </div>
                </div>

                <div className="p-5 border border-border rounded hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p>Software Akuntansi</p>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-muted text-muted-foreground rounded-full text-xs">
                          <XCircle size={12} />
                          Tidak Terhubung
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">Sinkronkan data penggajian dengan sistem akuntansi</p>
                    </div>
                    <Button variant="outline" size="sm">Hubungkan</Button>
                  </div>
                </div>

                <div className="p-5 border border-border rounded hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p>Sistem Pelacakan Waktu</p>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#00d27a]/10 text-[#00d27a] rounded-full text-xs">
                          <CheckCircle2 size={12} />
                          Terhubung
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">Impor data waktu dan kehadiran karyawan</p>
                    </div>
                    <Button variant="outline" size="sm">Konfigurasi</Button>
                  </div>
                </div>

                <div className="p-5 border border-border rounded hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p>Layanan Pelaporan Pajak</p>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-muted text-muted-foreground rounded-full text-xs">
                          <XCircle size={12} />
                          Tidak Terhubung
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">Otomatisasi perhitungan dan pelaporan pajak</p>
                    </div>
                    <Button variant="outline" size="sm">Hubungkan</Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="developer">
          <Card className="shadow-sm">
            <div className="p-6 border-b border-border">
              <h3>Developer Tools</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Akses ke dokumentasi dan referensi desain untuk pengembangan
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-4 max-w-2xl">
                <div className="p-5 border border-border rounded hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Palette size={18} className="text-primary" />
                        <p>Design Reference</p>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Template dan contoh implementasi komponen UI untuk referensi desain
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                        <li>• Template tabel dengan dark mode</li>
                        <li>• Code syntax highlighting</li>
                        <li>• Layout sidebar dengan navigasi hierarkis</li>
                        <li>• Top navbar dengan user menu</li>
                      </ul>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-2"
                        onClick={() => onNavigate?.('design-reference')}
                      >
                        <Code2 size={16} />
                        Buka Design Reference
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-5 border border-border rounded bg-muted/30">
                  <div className="flex items-start gap-3">
                    <div className="text-muted-foreground mt-1">
                      <Code2 size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="mb-1">API Documentation</p>
                      <p className="text-sm text-muted-foreground">
                        Coming soon - Dokumentasi API endpoint dan integrasi sistem
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 border border-border rounded bg-muted/30">
                  <div className="flex items-start gap-3">
                    <div className="text-muted-foreground mt-1">
                      <Code2 size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="mb-1">Component Library</p>
                      <p className="text-sm text-muted-foreground">
                        Coming soon - Library komponen UI yang dapat digunakan kembali
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 border border-border rounded bg-muted/30">
                  <div className="flex items-start gap-3">
                    <div className="text-muted-foreground mt-1">
                      <Database size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="mb-1">Database Schema</p>
                      <p className="text-sm text-muted-foreground">
                        Coming soon - Skema database untuk integrasi sistem
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}