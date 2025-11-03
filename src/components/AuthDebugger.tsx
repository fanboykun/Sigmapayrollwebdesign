/**
 * AuthDebugger Component
 *
 * Komponen untuk debugging dan troubleshooting auth issues
 * Berguna terutama untuk mengatasi masalah di Chrome
 */

import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { clearAuthStorage, getAuthStorageDebugInfo } from '../utils/auth-cleanup';
import { supabase } from '../utils/supabase/client';
import { AlertCircle, Trash2, RefreshCw, Info } from 'lucide-react';

export function AuthDebugger() {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [message, setMessage] = useState<string>('');

  const handleGetDebugInfo = () => {
    const info = getAuthStorageDebugInfo();
    setDebugInfo(info);
    setMessage('Debug info retrieved');
  };

  const handleClearStorage = async () => {
    try {
      // Sign out first
      await supabase.auth.signOut();

      // Clear storage
      clearAuthStorage();

      setMessage('✅ Auth storage cleared successfully. Please refresh the page.');
      setDebugInfo(null);
    } catch (error) {
      setMessage(`❌ Error: ${error}`);
    }
  };

  const handleRefreshSession = async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();

      if (error) {
        setMessage(`❌ Refresh failed: ${error.message}`);
      } else {
        setMessage('✅ Session refreshed successfully');
      }
    } catch (error) {
      setMessage(`❌ Error: ${error}`);
    }
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-amber-600">
          <AlertCircle size={20} />
          <h3 className="font-semibold">Authentication Debugger</h3>
        </div>

        <p className="text-sm text-muted-foreground">
          Jika Anda mengalami masalah login di Chrome (harus clear cookies setiap kali refresh),
          gunakan tool ini untuk membersihkan auth storage yang corrupt.
        </p>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleGetDebugInfo}
            className="gap-2"
          >
            <Info size={16} />
            Get Debug Info
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleRefreshSession}
            className="gap-2"
          >
            <RefreshCw size={16} />
            Refresh Session
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={handleClearStorage}
            className="gap-2"
          >
            <Trash2 size={16} />
            Clear Auth Storage
          </Button>
        </div>

        {message && (
          <div className="p-3 bg-muted rounded-md text-sm font-mono">
            {message}
          </div>
        )}

        {debugInfo && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Debug Information:</h4>
            <pre className="p-3 bg-muted rounded-md text-xs overflow-auto max-h-96">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </div>
        )}

        <div className="pt-4 border-t border-border">
          <h4 className="font-medium text-sm mb-2">Troubleshooting Steps:</h4>
          <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
            <li>Klik "Clear Auth Storage" untuk membersihkan data auth yang corrupt</li>
            <li>Refresh halaman (F5 atau Ctrl+R)</li>
            <li>Login kembali dengan credentials Anda</li>
            <li>Jika masih bermasalah, clear cache browser (Ctrl+Shift+Delete)</li>
          </ol>
        </div>

        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">
            <strong>Note:</strong> Masalah ini biasanya terjadi karena Chrome memiliki
            kebijakan cookie yang lebih ketat dibanding browser lain. Solusi di atas
            sudah menangani sebagian besar kasus.
          </p>
        </div>
      </div>
    </Card>
  );
}
