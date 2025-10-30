# Contoh Integrasi dengan Supabase

## Contoh: Menggunakan API di Komponen

Berikut adalah contoh bagaimana mengintegrasikan API calls ke komponen yang sudah ada:

### Sebelum (menggunakan data dummy lokal):

```typescript
import { MASTER_EMPLOYEES } from '../shared/employeeData';

function EmployeeList() {
  const [employees, setEmployees] = useState(MASTER_EMPLOYEES);
  
  // Data langsung dari file
  return (
    <div>
      {employees.map(emp => (
        <div key={emp.id}>{emp.fullName}</div>
      ))}
    </div>
  );
}
```

### Sesudah (menggunakan Supabase API):

```typescript
import { useEffect, useState } from 'react';
import { getAllEmployees } from '../utils/api';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  async function loadEmployees() {
    setLoading(true);
    const response = await getAllEmployees();
    
    if (response.success && response.data) {
      // Konversi ISO string kembali ke Date object jika perlu
      const employeesWithDates = response.data.map(emp => ({
        ...emp,
        birthDate: new Date(emp.birthDate),
        joinDate: new Date(emp.joinDate),
      }));
      setEmployees(employeesWithDates);
    } else {
      setError(response.error);
    }
    
    setLoading(false);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {employees.map(emp => (
        <div key={emp.id}>{emp.fullName}</div>
      ))}
    </div>
  );
}
```

## Contoh CRUD Operations

### Create (Menambah Data Baru):

```typescript
import { createEmployee } from '../utils/api';
import { toast } from 'sonner@2.0.3';

async function handleAddEmployee(newEmployee) {
  const response = await createEmployee({
    ...newEmployee,
    birthDate: newEmployee.birthDate.toISOString(),
    joinDate: newEmployee.joinDate.toISOString(),
  });
  
  if (response.success) {
    toast.success('Karyawan berhasil ditambahkan');
    loadEmployees(); // Reload data
  } else {
    toast.error(`Gagal menambah karyawan: ${response.error}`);
  }
}
```

### Update (Mengubah Data):

```typescript
import { updateEmployee } from '../utils/api';
import { toast } from 'sonner@2.0.3';

async function handleUpdateEmployee(id, updatedData) {
  const response = await updateEmployee(id, {
    ...updatedData,
    birthDate: updatedData.birthDate.toISOString(),
    joinDate: updatedData.joinDate.toISOString(),
  });
  
  if (response.success) {
    toast.success('Data karyawan berhasil diperbarui');
    loadEmployees(); // Reload data
  } else {
    toast.error(`Gagal memperbarui data: ${response.error}`);
  }
}
```

### Delete (Menghapus Data):

```typescript
import { deleteEmployee } from '../utils/api';
import { toast } from 'sonner@2.0.3';

async function handleDeleteEmployee(id) {
  if (!confirm('Yakin ingin menghapus karyawan ini?')) return;
  
  const response = await deleteEmployee(id);
  
  if (response.success) {
    toast.success('Karyawan berhasil dihapus');
    loadEmployees(); // Reload data
  } else {
    toast.error(`Gagal menghapus karyawan: ${response.error}`);
  }
}
```

## Contoh dengan Loading State dan Error Handling

```typescript
import { useEffect, useState } from 'react';
import { getAllEmployees, createEmployee } from '../utils/api';
import { toast } from 'sonner@2.0.3';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';

function EmployeeManagementComponent() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    loadEmployees();
  }, []);

  async function loadEmployees() {
    setLoading(true);
    setError(null);
    
    const response = await getAllEmployees();
    
    if (response.success && response.data) {
      const employeesWithDates = response.data.map(emp => ({
        ...emp,
        birthDate: new Date(emp.birthDate),
        joinDate: new Date(emp.joinDate),
      }));
      setEmployees(employeesWithDates);
    } else {
      setError(response.error || 'Gagal memuat data karyawan');
    }
    
    setLoading(false);
  }

  async function handleAddEmployee(newEmployee) {
    setIsAdding(true);
    
    const response = await createEmployee({
      ...newEmployee,
      birthDate: newEmployee.birthDate.toISOString(),
      joinDate: newEmployee.joinDate.toISOString(),
    });
    
    if (response.success) {
      toast.success('Karyawan berhasil ditambahkan');
      await loadEmployees(); // Reload data
    } else {
      toast.error(`Gagal menambah karyawan: ${response.error}`);
    }
    
    setIsAdding(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-4"
              onClick={loadEmployees}
            >
              Coba Lagi
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1>Manajemen Karyawan</h1>
      <p>Total: {employees.length} karyawan</p>
      
      {/* Render employees */}
      <div className="mt-4 space-y-2">
        {employees.map(emp => (
          <div key={emp.id} className="p-4 border rounded">
            <p className="font-medium">{emp.fullName}</p>
            <p className="text-sm text-muted-foreground">{emp.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Contoh dengan Custom Hook

Membuat custom hook untuk reusability:

```typescript
// hooks/useEmployees.ts
import { useEffect, useState } from 'react';
import { getAllEmployees, createEmployee, updateEmployee, deleteEmployee } from '../utils/api';
import { toast } from 'sonner@2.0.3';

export function useEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  async function loadEmployees() {
    setLoading(true);
    setError(null);
    
    const response = await getAllEmployees();
    
    if (response.success && response.data) {
      const employeesWithDates = response.data.map(emp => ({
        ...emp,
        birthDate: new Date(emp.birthDate),
        joinDate: new Date(emp.joinDate),
      }));
      setEmployees(employeesWithDates);
    } else {
      setError(response.error || 'Gagal memuat data');
    }
    
    setLoading(false);
  }

  async function addEmployee(employee) {
    const response = await createEmployee({
      ...employee,
      birthDate: employee.birthDate.toISOString(),
      joinDate: employee.joinDate.toISOString(),
    });
    
    if (response.success) {
      toast.success('Karyawan berhasil ditambahkan');
      await loadEmployees();
      return true;
    } else {
      toast.error(`Gagal: ${response.error}`);
      return false;
    }
  }

  async function updateEmployeeData(id, employee) {
    const response = await updateEmployee(id, {
      ...employee,
      birthDate: employee.birthDate.toISOString(),
      joinDate: employee.joinDate.toISOString(),
    });
    
    if (response.success) {
      toast.success('Data berhasil diperbarui');
      await loadEmployees();
      return true;
    } else {
      toast.error(`Gagal: ${response.error}`);
      return false;
    }
  }

  async function removeEmployee(id) {
    const response = await deleteEmployee(id);
    
    if (response.success) {
      toast.success('Karyawan berhasil dihapus');
      await loadEmployees();
      return true;
    } else {
      toast.error(`Gagal: ${response.error}`);
      return false;
    }
  }

  return {
    employees,
    loading,
    error,
    refresh: loadEmployees,
    addEmployee,
    updateEmployee: updateEmployeeData,
    removeEmployee,
  };
}

// Penggunaan di komponen:
function EmployeeComponent() {
  const { 
    employees, 
    loading, 
    error, 
    addEmployee, 
    updateEmployee, 
    removeEmployee 
  } = useEmployees();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {employees.map(emp => (
        <div key={emp.id}>{emp.fullName}</div>
      ))}
    </div>
  );
}
```

## Best Practices

1. **Selalu handle error dengan baik**
   ```typescript
   if (!response.success) {
     console.error('API Error:', response.error);
     toast.error(`Operasi gagal: ${response.error}`);
     return;
   }
   ```

2. **Gunakan loading states**
   ```typescript
   const [loading, setLoading] = useState(false);
   // Show spinner atau skeleton saat loading
   ```

3. **Konversi Date objects dengan benar**
   ```typescript
   // Saat mengirim ke server
   birthDate: date.toISOString()
   
   // Saat menerima dari server
   birthDate: new Date(isoString)
   ```

4. **Implement optimistic updates** (opsional)
   ```typescript
   // Update UI dulu, rollback jika gagal
   setEmployees([...employees, newEmployee]);
   const response = await createEmployee(newEmployee);
   if (!response.success) {
     setEmployees(employees); // Rollback
   }
   ```

5. **Cache data jika perlu**
   ```typescript
   // Simpan di localStorage atau session storage
   localStorage.setItem('employees', JSON.stringify(employees));
   ```
