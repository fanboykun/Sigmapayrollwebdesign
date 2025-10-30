/**
 * EmployeeTransferForm.tsx
 * Form untuk menambah mutasi karyawan baru dengan employee search combobox
 */

import { useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { DatePicker } from './ui/date-picker';
import { ChevronsUpDown, Check, User } from 'lucide-react';
import { cn } from './ui/utils';
import { MASTER_EMPLOYEES } from '../shared/employeeData';
import { MASTER_DIVISIONS } from '../shared/divisionData';

interface EmployeeTransferFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function EmployeeTransferForm({ onSubmit, onCancel }: EmployeeTransferFormProps) {
  // State untuk employee combobox
  const [openEmployeeCombobox, setOpenEmployeeCombobox] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  
  // State untuk division combobox
  const [openDivisionCombobox, setOpenDivisionCombobox] = useState(false);
  const [selectedDivisionId, setSelectedDivisionId] = useState('');

  // Form state
  const [transferDate, setTransferDate] = useState<Date | undefined>();
  const [effectiveDate, setEffectiveDate] = useState<Date | undefined>();
  const [formData, setFormData] = useState({
    toDepartment: '',
    toPosition: '',
    reason: '',
    notes: ''
  });

  // Get selected employee data
  const selectedEmployee = MASTER_EMPLOYEES.find(emp => emp.id === selectedEmployeeId);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!selectedEmployee) {
      alert('Pilih karyawan terlebih dahulu');
      return;
    }

    const submitData = {
      employeeId: selectedEmployee.employeeId,
      employeeName: selectedEmployee.fullName,
      fromDepartment: selectedEmployee.division,
      fromPosition: selectedEmployee.position,
      toDepartment: formData.toDepartment,
      toPosition: formData.toPosition,
      transferDate,
      effectiveDate,
      reason: formData.reason,
      notes: formData.notes,
    };

    onSubmit(submitData);
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Info:</strong> Pilih karyawan dari database, kemudian isi data divisi/jabatan baru untuk mutasi. Anda dapat melakukan mutasi jabatan saja, mutasi divisi saja, atau keduanya secara bersamaan.
        </p>
      </div>

      {/* Employee Search Combobox */}
      <div className="space-y-2">
        <Label>Pilih Karyawan *</Label>
        <Popover open={openEmployeeCombobox} onOpenChange={setOpenEmployeeCombobox}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openEmployeeCombobox}
              className="w-full justify-between"
            >
              {selectedEmployee ? (
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{selectedEmployee.fullName} ({selectedEmployee.employeeId})</span>
                </div>
              ) : (
                "Cari dan pilih karyawan..."
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput placeholder="Cari nama atau NIK karyawan..." />
              <CommandList>
                <CommandEmpty>Karyawan tidak ditemukan.</CommandEmpty>
                <CommandGroup>
                  {MASTER_EMPLOYEES.map((employee) => (
                    <CommandItem
                      key={employee.id}
                      value={`${employee.fullName} ${employee.employeeId}`}
                      onSelect={() => {
                        setSelectedEmployeeId(employee.id);
                        setOpenEmployeeCombobox(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedEmployeeId === employee.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <div className="flex flex-col">
                        <span>{employee.fullName}</span>
                        <span className="text-xs text-muted-foreground">
                          {employee.employeeId} • {employee.division} • {employee.position}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Display Current Employee Info */}
      {selectedEmployee && (
        <div className="border-t pt-4">
          <h4 className="mb-3 text-sm">Data Karyawan Saat Ini</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-blue-50 border border-blue-200 rounded">
            <div>
              <p className="text-xs text-muted-foreground mb-1">NIK</p>
              <p className="mb-0">{selectedEmployee.employeeId}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Nama Lengkap</p>
              <p className="mb-0">{selectedEmployee.fullName}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Divisi Saat Ini</p>
              <p className="mb-0">{selectedEmployee.division}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Jabatan Saat Ini</p>
              <p className="mb-0">{selectedEmployee.position}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Jenis Kepegawaian</p>
              <p className="mb-0">
                {selectedEmployee.employmentType === 'permanent' ? 'Tetap' : 
                 selectedEmployee.employmentType === 'contract' ? 'Kontrak' : 'Magang'}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <p className="mb-0 capitalize">{selectedEmployee.status}</p>
            </div>
          </div>
        </div>
      )}

      {/* Divisi dan Jabatan Baru */}
      {selectedEmployee && (
        <>
          <div className="border-t pt-4">
            <h4 className="mb-3 text-sm">Posisi Baru</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Divisi Baru *</Label>
                <Popover open={openDivisionCombobox} onOpenChange={setOpenDivisionCombobox}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openDivisionCombobox}
                      className="w-full justify-between"
                    >
                      {formData.toDepartment || "Pilih divisi baru..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Cari divisi..." />
                      <CommandList>
                        <CommandEmpty>Divisi tidak ditemukan.</CommandEmpty>
                        <CommandGroup>
                          {MASTER_DIVISIONS.filter(div => div.isActive).map((division) => (
                            <CommandItem
                              key={division.id}
                              value={division.name}
                              onSelect={() => {
                                handleInputChange('toDepartment', division.name);
                                setOpenDivisionCombobox(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  formData.toDepartment === division.name ? "opacity-100" : "opacity-0"
                                )}
                              />
                              <div className="flex flex-col">
                                <span>{division.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {division.code} • {division.shortname}
                                </span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <p className="text-xs text-muted-foreground">
                  {selectedEmployee.division === formData.toDepartment && formData.toDepartment && '✓ Divisi tetap sama'}
                  {selectedEmployee.division !== formData.toDepartment && formData.toDepartment && '⚠️ Mutasi divisi'}
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="toPosition">Jabatan Baru *</Label>
                <Input
                  id="toPosition"
                  value={formData.toPosition}
                  onChange={(e) => handleInputChange('toPosition', e.target.value)}
                  placeholder="Jabatan baru"
                />
                <p className="text-xs text-muted-foreground">
                  {selectedEmployee.position === formData.toPosition && formData.toPosition && '✓ Jabatan tetap sama'}
                  {selectedEmployee.position !== formData.toPosition && formData.toPosition && '⚠️ Mutasi jabatan'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tanggal Pengajuan *</Label>
              <DatePicker date={transferDate} onDateChange={setTransferDate} />
            </div>
            <div className="space-y-2">
              <Label>Tanggal Efektif *</Label>
              <DatePicker date={effectiveDate} onDateChange={setEffectiveDate} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Alasan Mutasi *</Label>
            <Textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => handleInputChange('reason', e.target.value)}
              placeholder="Jelaskan alasan mutasi (promosi, rotasi, permintaan pribadi, dll)"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Catatan Tambahan</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Catatan tambahan (opsional)"
              rows={2}
            />
          </div>
        </>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Batal
        </Button>
        <Button onClick={handleSubmit} disabled={!selectedEmployee}>
          Simpan Mutasi
        </Button>
      </div>
    </div>
  );
}
