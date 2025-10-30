/**
 * ==========================================================================
 * COMMAND PALETTE COMPONENT - QUICK SEARCH MENU
 * ==========================================================================
 * 
 * Command palette untuk quick search dan navigasi menu menggunakan keyboard.
 * Terinspirasi dari command palettes di aplikasi modern (VS Code, Spotlight, dll).
 * 
 * #CommandPalette #QuickSearch #KeyboardNavigation
 * #SearchMenu #CommandK #ProductivityTool
 * 
 * FITUR UTAMA:
 * - Keyboard shortcut: Ctrl+K atau Cmd+K
 * - Fuzzy search berdasarkan nama menu & keywords
 * - Permission-based menu filtering
 * - Grouped menu items
 * - Icon untuk setiap menu
 * 
 * SHORTCUTS:
 * - Ctrl/Cmd + K: Buka/tutup command palette
 * - ESC: Tutup command palette
 * - Arrow Up/Down: Navigate menu items
 * - Enter: Select menu item
 * 
 * MENU GROUPS:
 * - Navigasi Utama
 * - Penggajian
 * - Master Data
 * - Administrasi
 * - Lainnya
 * 
 * @author Sistem Payroll Team
 * @version 1.0.0
 * @since 2024-10-26
 * ==========================================================================
 */

import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './ui/command';
import {
  LayoutDashboard,
  Receipt,
  Calculator,
  DollarSign,
  Users,
  UserCog,
  Layers,
  Briefcase,
  Award,
  FileText,
  Settings,
  Shield,
  User,
  Search,
  Calendar,
  CalendarDays,
  ClipboardCheck,
  Gift,
  Umbrella,
  TrendingUp,
  ArrowRightLeft,
  BarChart3,
} from 'lucide-react';

/**
 * Props interface untuk CommandPalette
 * #CommandPaletteProps #ComponentProps
 */
interface CommandPaletteProps {
  onNavigate: (view: string) => void;
}

/**
 * ==========================================================================
 * COMMAND PALETTE COMPONENT IMPLEMENTATION
 * ==========================================================================
 */
export function CommandPalette({ onNavigate }: CommandPaletteProps) {
  const { canAccessMenu, user } = useAuth();
  const [open, setOpen] = useState(false);

  /**
   * Effect untuk register keyboard shortcut (Ctrl+K / Cmd+K)
   * #KeyboardShortcut #EventListener
   */
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Check untuk Ctrl+K (Windows/Linux) atau Cmd+K (Mac)
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    // Register event listener
    document.addEventListener('keydown', down);
    // Cleanup on unmount
    return () => document.removeEventListener('keydown', down);
  }, []);

  /**
   * Menu configuration dengan grouping dan keywords untuk search
   * #MenuConfig #SearchableMenu
   * 
   * Setiap item memiliki:
   * - id: untuk navigation
   * - label: nama menu yang ditampilkan
   * - icon: icon component
   * - keywords: kata kunci tambahan untuk search
   */
  const menuItems = [
    {
      group: 'Navigasi Utama',
      items: [
        { id: 'dashboard', label: 'Dasbor', icon: LayoutDashboard, keywords: 'dashboard home beranda' },
      ]
    },
    {
      group: 'Penggajian',
      items: [
        { id: 'payroll-view', label: 'Buku Gaji', icon: Receipt, keywords: 'buku gaji payroll salary' },
        { id: 'tax-worksheet', label: 'Tax Worksheet', icon: Calculator, keywords: 'tax pajak worksheet perhitungan' },
        { id: 'annual-payroll', label: 'Penggajian Tahunan', icon: Gift, keywords: 'penggajian tahunan thr bonus annual' },
        { id: 'processing', label: 'Proses Penggajian', icon: DollarSign, keywords: 'proses penggajian payroll processing' },
        { id: 'employees', label: 'Gaji Karyawan', icon: Users, keywords: 'gaji karyawan employee payroll' },
      ]
    },
    {
      group: 'Master Data',
      items: [
        { id: 'hrm', label: 'Data Karyawan', icon: UserCog, keywords: 'karyawan employee data hrm' },
        { id: 'employee-transfer', label: 'Mutasi Karyawan', icon: ArrowRightLeft, keywords: 'mutasi transfer karyawan employee' },
        { id: 'division', label: 'Divisi', icon: Layers, keywords: 'divisi division departemen' },
        { id: 'position', label: 'Jabatan', icon: Briefcase, keywords: 'jabatan position title' },
        { id: 'wage-master', label: 'Skala Upah', icon: TrendingUp, keywords: 'skala upah wage salary gaji pokok' },
        { id: 'premium', label: 'Premi & Tunjangan', icon: Award, keywords: 'premi tunjangan premium allowance natura catu beras' },
        { id: 'tax-master', label: 'Pajak & BPJS', icon: Receipt, keywords: 'pajak bpjs tax ptkp' },
      ]
    },
    {
      group: 'Presensi',
      items: [
        { id: 'working-days', label: 'Hari Kerja', icon: Calendar, keywords: 'hari kerja working days kalender' },
        { id: 'holidays', label: 'Hari Libur', icon: CalendarDays, keywords: 'hari libur holidays cuti bersama' },
        { id: 'attendance', label: 'Presensi', icon: ClipboardCheck, keywords: 'presensi attendance kehadiran absensi' },
        { id: 'leave', label: 'Cuti Karyawan', icon: Umbrella, keywords: 'cuti leave karyawan annual sick divisi departemen filter' },
      ]
    },
    {
      group: 'Administrasi',
      items: [
        { id: 'user-management', label: 'Manajemen User', icon: Users, keywords: 'user manajemen pengguna' },
        { id: 'role-management', label: 'Role & Permission', icon: Shield, keywords: 'role permission hak akses' },
      ]
    },
    {
      group: 'Lainnya',
      items: [
        { id: 'reports', label: 'Analitik', icon: FileText, keywords: 'analitik analytics laporan report' },
        { id: 'engagement', label: 'Engagement Dashboard', icon: BarChart3, keywords: 'engagement dashboard kemitraan petani' },
        { id: 'settings', label: 'Pengaturan', icon: Settings, keywords: 'pengaturan settings konfigurasi' },
        { id: 'profile', label: 'Profil Saya', icon: User, keywords: 'profil profile akun account' },
        { id: 'account-settings', label: 'Pengaturan Akun', icon: Settings, keywords: 'pengaturan akun account settings' },
      ]
    }
  ];

  const handleSelect = (id: string) => {
    onNavigate(id);
    setOpen(false);
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="relative w-full flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground bg-background border border-border rounded-md hover:bg-accent transition-colors"
      >
        <Search className="w-4 h-4" />
        <span className="flex-1 text-left">Cari menu...</span>
        <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-xs text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Command Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Ketik untuk mencari menu..." />
        <CommandList>
          <CommandEmpty>Tidak ada hasil ditemukan.</CommandEmpty>
          
          {menuItems.map((group, idx) => {
            const accessibleItems = group.items.filter(item => 
              item.id === 'profile' || item.id === 'account-settings' || canAccessMenu(item.id)
            );

            if (accessibleItems.length === 0) return null;

            return (
              <div key={group.group}>
                {idx > 0 && <CommandSeparator />}
                <CommandGroup heading={group.group}>
                  {accessibleItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <CommandItem
                        key={item.id}
                        value={`${item.label} ${item.keywords}`}
                        onSelect={() => handleSelect(item.id)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </div>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
}
