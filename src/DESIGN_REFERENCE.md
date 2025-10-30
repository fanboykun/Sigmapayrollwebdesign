# Design Reference - Table Documentation Template

## Deskripsi
Implementasi template desain website yang mengikuti screenshot template Falcon untuk dokumentasi tabel. Template ini menampilkan:

- **Layout Sidebar**: Navigasi hierarkis dengan collapsible menu
- **Top Navbar**: Header dengan branding, menu navigasi, dan user menu
- **Table Examples**: Contoh tabel light dan dark theme
- **Code Syntax Highlighting**: Blok kode dengan syntax highlighting

## Cara Mengakses

### Melalui Settings Page
1. Login ke sistem payroll
2. Navigasi ke menu **Settings** (Pengaturan) di sidebar
3. Pilih tab **Developer**
4. Klik tombol **"Buka Design Reference"**

### Screenshot Template
Template mengikuti desain dari Falcon admin template dengan fitur:
- Sidebar dengan menu hierarkis (Components > Accordion, Alerts, Avatar, dll)
- Navbar dengan Bootstrap 5 link, notifications, dan user menu
- Halaman "Tables" dengan contoh tabel light dan dark
- Code blocks dengan syntax highlighting untuk HTML

## Komponen

### TableDocumentation.tsx
Komponen utama yang menampilkan:
- Collapsible sidebar navigation
- Top navbar dengan branding dan user menu
- Two-column layout untuk contoh tabel
- Code syntax highlighting

### DesignReference.tsx
Wrapper component yang:
- Menyediakan tabs untuk berbagai template
- Menyediakan back button untuk kembali ke dashboard
- Dapat diperluas untuk template lainnya

## Penggunaan
Template ini dapat digunakan sebagai referensi untuk:
- Implementasi tabel dengan berbagai style
- Layout dengan sidebar collapsible
- Navbar dengan user menu dan notifications
- Code documentation pages
- Component library documentation

## Teknologi
- React + TypeScript
- Tailwind CSS
- Shadcn/ui components
- Lucide icons

## Catatan
Halaman ini adalah standalone dan tidak mempengaruhi sistem payroll utama. Digunakan sebagai referensi desain dan template untuk pengembangan UI.
