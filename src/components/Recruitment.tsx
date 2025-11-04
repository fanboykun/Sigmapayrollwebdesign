/**
 * ==========================================================================
 * RECRUITMENT MANAGEMENT - MANAJEMEN REKRUTMEN
 * ==========================================================================
 * 
 * Komponen untuk mengelola proses rekrutmen karyawan baru:
 * - Posting lowongan pekerjaan
 * - Manajemen pelamar (applicants)
 * - Proses interview dan seleksi
 * - Status tracking aplikasi
 * - Approval hiring
 * 
 * #Recruitment #HR #HiringProcess #JobPosting
 * 
 * @author Sistem Payroll Team
 * @version 1.0.0
 * @since 2024-10-28
 * ==========================================================================
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Search,
  Plus,
  Eye,
  Edit2,
  Trash2,
  Briefcase,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  UserPlus,
  FileText,
  Calendar,
} from 'lucide-react';
import { DatePicker } from './ui/date-picker';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { toast } from 'sonner';

interface JobPosting {
  id: string;
  title: string;
  division: string;
  position: string;
  type: 'permanent' | 'contract' | 'internship';
  location: string;
  salary: {
    min: number;
    max: number;
  };
  requirements: string;
  description: string;
  status: 'open' | 'closed' | 'draft';
  postedDate: string;
  closingDate: string;
  applicantsCount: number;
}

interface Applicant {
  id: string;
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  education: string;
  experience: string;
  appliedDate: string;
  status: 'new' | 'reviewed' | 'interview' | 'offered' | 'rejected' | 'hired';
  notes: string;
  cv: string;
}

export function Recruitment() {
  const [activeTab, setActiveTab] = useState('job-postings');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Dialog states
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);
  const [isApplicantDialogOpen, setIsApplicantDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  
  // Date states
  const [postedDate, setPostedDate] = useState<Date | undefined>(new Date());
  const [closingDate, setClosingDate] = useState<Date | undefined>();

  // Sample data - Job Postings
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([
    {
      id: '1',
      title: 'Senior Software Engineer',
      division: 'Teknik',
      position: 'Senior Developer',
      type: 'permanent',
      location: 'Jakarta',
      salary: { min: 15000000, max: 25000000 },
      requirements: 'Minimal 5 tahun pengalaman, Menguasai React, Node.js',
      description: 'Mencari Software Engineer berpengalaman untuk membangun sistem internal',
      status: 'open',
      postedDate: '2024-10-01',
      closingDate: '2024-11-30',
      applicantsCount: 24,
    },
    {
      id: '2',
      title: 'Marketing Manager',
      division: 'Pemasaran',
      position: 'Manager Pemasaran',
      type: 'permanent',
      location: 'Jakarta',
      salary: { min: 12000000, max: 18000000 },
      requirements: 'Pengalaman 3-5 tahun di bidang marketing',
      description: 'Mengelola strategi pemasaran perusahaan',
      status: 'open',
      postedDate: '2024-10-10',
      closingDate: '2024-11-15',
      applicantsCount: 18,
    },
    {
      id: '3',
      title: 'HR Intern',
      division: 'SDM',
      position: 'Intern HR',
      type: 'internship',
      location: 'Jakarta',
      salary: { min: 3000000, max: 4000000 },
      requirements: 'Mahasiswa aktif semester akhir',
      description: 'Program magang di departemen HR',
      status: 'closed',
      postedDate: '2024-09-01',
      closingDate: '2024-10-15',
      applicantsCount: 45,
    },
  ]);

  // Sample data - Applicants
  const [applicants, setApplicants] = useState<Applicant[]>([
    {
      id: '1',
      jobId: '1',
      jobTitle: 'Senior Software Engineer',
      fullName: 'Ahmad Rizki',
      email: 'ahmad.rizki@email.com',
      phone: '08123456789',
      education: 'S1 Informatika',
      experience: '6 tahun',
      appliedDate: '2024-10-05',
      status: 'interview',
      notes: 'Kandidat potensial, background bagus',
      cv: 'cv_ahmad_rizki.pdf',
    },
    {
      id: '2',
      jobId: '1',
      jobTitle: 'Senior Software Engineer',
      fullName: 'Siti Nurhaliza',
      email: 'siti.nur@email.com',
      phone: '08198765432',
      education: 'S1 Teknik Komputer',
      experience: '5 tahun',
      appliedDate: '2024-10-08',
      status: 'reviewed',
      notes: 'Perlu interview lebih lanjut',
      cv: 'cv_siti_nurhaliza.pdf',
    },
    {
      id: '3',
      jobId: '2',
      jobTitle: 'Marketing Manager',
      fullName: 'Budi Santoso',
      email: 'budi.santoso@email.com',
      phone: '08156781234',
      education: 'S1 Marketing',
      experience: '4 tahun',
      appliedDate: '2024-10-12',
      status: 'offered',
      notes: 'Offer letter dikirim',
      cv: 'cv_budi_santoso.pdf',
    },
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string }> = {
      open: { label: 'Buka', className: 'bg-[#10b981]/10 text-[#10b981]' },
      closed: { label: 'Tutup', className: 'bg-[#6b7280]/10 text-[#6b7280]' },
      draft: { label: 'Draft', className: 'bg-[#f59e0b]/10 text-[#f59e0b]' },
      new: { label: 'Baru', className: 'bg-[#3b82f6]/10 text-[#3b82f6]' },
      reviewed: { label: 'Direview', className: 'bg-[#8b5cf6]/10 text-[#8b5cf6]' },
      interview: { label: 'Interview', className: 'bg-[#f59e0b]/10 text-[#f59e0b]' },
      offered: { label: 'Ditawari', className: 'bg-[#10b981]/10 text-[#10b981]' },
      rejected: { label: 'Ditolak', className: 'bg-[#ef4444]/10 text-[#ef4444]' },
      hired: { label: 'Diterima', className: 'bg-[#10b981]/10 text-[#10b981]' },
    };

    const config = statusConfig[status] || { label: status, className: '' };
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const handleViewJob = (job: JobPosting) => {
    setSelectedJob(job);
    setIsJobDialogOpen(true);
  };

  const handleViewApplicant = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setIsApplicantDialogOpen(true);
  };

  const handleUpdateApplicantStatus = (applicantId: string, newStatus: Applicant['status']) => {
    setApplicants(applicants.map(app => 
      app.id === applicantId ? { ...app, status: newStatus } : app
    ));
    toast.success('Status pelamar berhasil diperbarui');
  };

  const statistics = {
    totalJobs: jobPostings.length,
    openJobs: jobPostings.filter(j => j.status === 'open').length,
    totalApplicants: applicants.length,
    pendingReview: applicants.filter(a => a.status === 'new').length,
  };

  return (
    <div>
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
        <Card className="p-4 md:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Lowongan</p>
              <h3 className="text-2xl">{statistics.totalJobs}</h3>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
              <Briefcase size={24} className="text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Lowongan Aktif</p>
              <h3 className="text-2xl">{statistics.openJobs}</h3>
            </div>
            <div className="w-12 h-12 bg-[#10b981]/10 rounded flex items-center justify-center">
              <CheckCircle size={24} className="text-[#10b981]" />
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Pelamar</p>
              <h3 className="text-2xl">{statistics.totalApplicants}</h3>
            </div>
            <div className="w-12 h-12 bg-[#3b82f6]/10 rounded flex items-center justify-center">
              <Users size={24} className="text-[#3b82f6]" />
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Perlu Review</p>
              <h3 className="text-2xl">{statistics.pendingReview}</h3>
            </div>
            <div className="w-12 h-12 bg-[#f59e0b]/10 rounded flex items-center justify-center">
              <Clock size={24} className="text-[#f59e0b]" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="shadow-sm">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="border-b border-border px-6 pt-6">
            <TabsList className="bg-muted/30">
              <TabsTrigger value="job-postings">Lowongan Pekerjaan</TabsTrigger>
              <TabsTrigger value="applicants">Daftar Pelamar</TabsTrigger>
            </TabsList>
          </div>

          {/* Tab: Job Postings */}
          <TabsContent value="job-postings" className="p-6 mt-0">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    placeholder="Cari lowongan..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button className="gap-2">
                  <Plus size={16} />
                  Tambah Lowongan
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Posisi</TableHead>
                      <TableHead>Divisi</TableHead>
                      <TableHead>Tipe</TableHead>
                      <TableHead>Lokasi</TableHead>
                      <TableHead>Range Gaji</TableHead>
                      <TableHead className="text-center">Pelamar</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobPostings.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{job.title}</p>
                            <p className="text-sm text-muted-foreground">
                              Ditutup: {format(new Date(job.closingDate), 'dd MMM yyyy', { locale: id })}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{job.division}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {job.type === 'permanent' ? 'Tetap' : job.type === 'contract' ? 'Kontrak' : 'Magang'}
                          </Badge>
                        </TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell className="font-mono text-sm">
                          {formatCurrency(job.salary.min)} - {formatCurrency(job.salary.max)}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="secondary">{job.applicantsCount}</Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          {getStatusBadge(job.status)}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Button variant="ghost" size="sm" onClick={() => handleViewJob(job)}>
                              <Eye size={16} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit2 size={16} />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive">
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          {/* Tab: Applicants */}
          <TabsContent value="applicants" className="p-6 mt-0">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    placeholder="Cari pelamar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="new">Baru</SelectItem>
                    <SelectItem value="reviewed">Direview</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="offered">Ditawari</SelectItem>
                    <SelectItem value="rejected">Ditolak</SelectItem>
                    <SelectItem value="hired">Diterima</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Pelamar</TableHead>
                      <TableHead>Posisi</TableHead>
                      <TableHead>Kontak</TableHead>
                      <TableHead>Pendidikan</TableHead>
                      <TableHead>Pengalaman</TableHead>
                      <TableHead>Tanggal Melamar</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applicants.map((applicant) => (
                      <TableRow key={applicant.id}>
                        <TableCell>
                          <div className="font-medium">{applicant.fullName}</div>
                        </TableCell>
                        <TableCell>{applicant.jobTitle}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{applicant.email}</div>
                            <div className="text-muted-foreground">{applicant.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>{applicant.education}</TableCell>
                        <TableCell>{applicant.experience}</TableCell>
                        <TableCell>
                          {format(new Date(applicant.appliedDate), 'dd MMM yyyy', { locale: id })}
                        </TableCell>
                        <TableCell className="text-center">
                          {getStatusBadge(applicant.status)}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Button variant="ghost" size="sm" onClick={() => handleViewApplicant(applicant)}>
                              <Eye size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Job Detail Dialog */}
      <Dialog open={isJobDialogOpen} onOpenChange={setIsJobDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Lowongan Pekerjaan</DialogTitle>
            <DialogDescription>Informasi lengkap lowongan pekerjaan</DialogDescription>
          </DialogHeader>
          {selectedJob && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Posisi</Label>
                  <p className="font-medium">{selectedJob.title}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Divisi</Label>
                  <p>{selectedJob.division}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Tipe Kepegawaian</Label>
                  <p>{selectedJob.type === 'permanent' ? 'Tetap' : selectedJob.type === 'contract' ? 'Kontrak' : 'Magang'}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Lokasi</Label>
                  <p>{selectedJob.location}</p>
                </div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Range Gaji</Label>
                <p className="font-medium">
                  {formatCurrency(selectedJob.salary.min)} - {formatCurrency(selectedJob.salary.max)}
                </p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Deskripsi</Label>
                <p className="text-sm">{selectedJob.description}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Persyaratan</Label>
                <p className="text-sm">{selectedJob.requirements}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Tanggal Posting</Label>
                  <p>{format(new Date(selectedJob.postedDate), 'dd MMMM yyyy', { locale: id })}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Tanggal Penutupan</Label>
                  <p>{format(new Date(selectedJob.closingDate), 'dd MMMM yyyy', { locale: id })}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsJobDialogOpen(false)}>
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Applicant Detail Dialog */}
      <Dialog open={isApplicantDialogOpen} onOpenChange={setIsApplicantDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Pelamar</DialogTitle>
            <DialogDescription>Informasi lengkap pelamar</DialogDescription>
          </DialogHeader>
          {selectedApplicant && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Nama Lengkap</Label>
                  <p className="font-medium">{selectedApplicant.fullName}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Melamar Untuk</Label>
                  <p>{selectedApplicant.jobTitle}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Email</Label>
                  <p>{selectedApplicant.email}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Telepon</Label>
                  <p>{selectedApplicant.phone}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Pendidikan</Label>
                  <p>{selectedApplicant.education}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Pengalaman</Label>
                  <p>{selectedApplicant.experience}</p>
                </div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Catatan</Label>
                <p className="text-sm">{selectedApplicant.notes || 'Tidak ada catatan'}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">Update Status</Label>
                <Select
                  value={selectedApplicant.status}
                  onValueChange={(value) => handleUpdateApplicantStatus(selectedApplicant.id, value as Applicant['status'])}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">Baru</SelectItem>
                    <SelectItem value="reviewed">Direview</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="offered">Ditawari</SelectItem>
                    <SelectItem value="rejected">Ditolak</SelectItem>
                    <SelectItem value="hired">Diterima</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApplicantDialogOpen(false)}>
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
