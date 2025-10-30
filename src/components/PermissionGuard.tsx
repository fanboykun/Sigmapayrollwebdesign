import { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { ShieldX } from 'lucide-react';

interface PermissionGuardProps {
  module: string;
  action?: 'view' | 'create' | 'edit' | 'delete';
  children: ReactNode;
  fallback?: ReactNode;
}

export function PermissionGuard({ 
  module, 
  action = 'view', 
  children, 
  fallback 
}: PermissionGuardProps) {
  const { hasPermission } = useAuth();

  if (!hasPermission(module, action)) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="p-6">
        <Alert variant="destructive">
          <ShieldX className="h-4 w-4" />
          <AlertTitle>Akses Ditolak</AlertTitle>
          <AlertDescription>
            Anda tidak memiliki izin untuk mengakses fitur ini.
            Silakan hubungi administrator untuk mendapatkan akses.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <>{children}</>;
}

interface ActionGuardProps {
  module: string;
  action: 'create' | 'edit' | 'delete';
  children: ReactNode;
}

export function ActionGuard({ module, action, children }: ActionGuardProps) {
  const { hasPermission } = useAuth();

  if (!hasPermission(module, action)) {
    return null;
  }

  return <>{children}</>;
}
