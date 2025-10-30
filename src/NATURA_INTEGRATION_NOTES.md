# Natura Integration Notes

## Perubahan yang Diperlukan di AuthContext.tsx

Tambahkan module `natura_master` ke dalam permission mapping untuk setiap role:

### 1. Super Admin (Baris ~242-248)
Setelah `position_master`, tambahkan:
```typescript
natura_master: {
  module: "natura_master",
  canView: true,
  canCreate: true,
  canEdit: true,
  canDelete: true,
},
```

### 2. Admin (Baris ~377-383)
Setelah `position_master`, tambahkan:
```typescript
natura_master: {
  module: "natura_master",
  canView: true,
  canCreate: true,
  canEdit: true,
  canDelete: true,
},
```

### 3. Manager (Baris ~512-518)
Setelah `position_master`, tambahkan:
```typescript
natura_master: {
  module: "natura_master",
  canView: true,
  canCreate: false,
  canEdit: false,
  canDelete: false,
},
```

### 4. Karyawan (Baris ~647-653)
Setelah `position_master`, tambahkan:
```typescript
natura_master: {
  module: "natura_master",
  canView: false,
  canCreate: false,
  canEdit: false,
  canDelete: false,
},
```

### 5. MODULE_MAP (Baris ~761)
Setelah `position: "position_master",`, tambahkan:
```typescript
natura: "natura_master",
```

## Perubahan yang Diperlukan di RoleManagement.tsx

Tambahkan entry natura_master ke dalam default permissions untuk setiap role:

### Super Admin (Baris ~56-57)
Setelah position_master, tambahkan:
```typescript
{ module: 'natura_master', moduleName: 'Master Natura', description: 'Kelola data natura karyawan', canView: true, canCreate: true, canEdit: true, canDelete: true },
```

### Admin (Baris ~79-80)
Setelah position_master, tambahkan:
```typescript
{ module: 'natura_master', moduleName: 'Master Natura', description: 'Kelola data natura karyawan', canView: true, canCreate: true, canEdit: true, canDelete: true },
```

### Manager (Baris ~102-103)
Setelah position_master, tambahkan:
```typescript
{ module: 'natura_master', moduleName: 'Master Natura', description: 'Kelola data natura karyawan', canView: true, canCreate: false, canEdit: false, canDelete: false },
```

### Karyawan (Baris ~125-126)
Setelah position_master, tambahkan:
```typescript
{ module: 'natura_master', moduleName: 'Master Natura', description: 'Kelola data natura karyawan', canView: false, canCreate: false, canEdit: false, canDelete: false },
```

## Status Integrasi

✅ NaturaMaster.tsx - Component created
✅ Sidebar.tsx - Menu natura ditambahkan
✅ CommandPalette.tsx - Search natura ditambahkan  
✅ App.tsx - Route natura ditambahkan
⏳ AuthContext.tsx - Perlu manual update (lihat instruksi di atas)
⏳ RoleManagement.tsx - Perlu manual update (lihat instruksi di atas)

## Cara Manual Update

1. Buka file AuthContext.tsx
2. Cari text `position_master` (akan ada 4 occurences untuk 4 roles)
3. Setelah setiap block position_master, tambahkan block natura_master sesuai permission role
4. Cari text `MODULE_MAP` dan tambahkan mapping natura
5. Buka file RoleManagement.tsx
6. Cari text `position_master` dalam default permissions (ada 4 occurences)
7. Setelah setiap entry position_master, tambahkan entry natura_master
8. Save kedua file dan test aplikasi
