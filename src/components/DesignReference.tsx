/**
 * ==========================================================================
 * DESIGN REFERENCE COMPONENT
 * ==========================================================================
 * 
 * Halaman referensi desain yang menampilkan berbagai template dan komponen
 * yang bisa digunakan sebagai panduan untuk pengembangan UI.
 * 
 * Halaman ini standalone dan bisa diakses untuk melihat contoh implementasi
 * desain tabel dan komponen lainnya.
 * 
 * #DesignReference #UIComponents #TemplateLibrary
 * ==========================================================================
 */

import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { TableDocumentation } from './TableDocumentation';
import { ArrowLeft, Code2 } from 'lucide-react';

interface DesignReferenceProps {
  onBack?: () => void;
}

export function DesignReference({ onBack }: DesignReferenceProps) {
  const [selectedTab, setSelectedTab] = useState('table-docs');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {onBack && (
        <div className="border-b border-border bg-card p-4">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft size={20} />
            </Button>
            <div>
              <h1 className="mb-0">Design Reference</h1>
              <p className="text-sm text-muted-foreground">
                Template dan referensi desain untuk sistem
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="table-docs" className="gap-2">
              <Code2 size={16} />
              Table Documentation
            </TabsTrigger>
            {/* Bisa ditambahkan tab lain untuk komponen/template lainnya */}
          </TabsList>

          <TabsContent value="table-docs" className="mt-0">
            <TableDocumentation />
          </TabsContent>

          {/* Placeholder untuk tab lainnya */}
        </Tabs>
      </div>
    </div>
  );
}
