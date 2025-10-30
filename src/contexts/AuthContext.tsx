/**
 * ==========================================================================
 * AUTH CONTEXT - AUTHENTICATION & AUTHORIZATION MANAGEMENT
 * ==========================================================================
 *
 * Context untuk manajemen autentikasi dan otorisasi user dalam aplikasi.
 * Mengimplementasikan Role-Based Access Control (RBAC) dengan 4 level akses.
 *
 * #Authentication #Authorization #RBAC #ContextAPI
 * #UserManagement #PermissionSystem #SecurityLayer
 *
 * FITUR UTAMA:
 * - Login/Logout functionality
 * - User session management dengan localStorage
 * - Role-based permissions (4 levels: Super Admin, Admin, Manager, Karyawan)
 * - Module-level access control
 * - Menu visibility based on permissions
 *
 * ROLE HIERARCHY:
 * 1. Super Admin - Full access ke semua fitur
 * 2. Admin - Access ke semua fitur kecuali user & role management
 * 3. Manager - View-only access ke sebagian besar fitur
 * 4. Karyawan - Limited access (dashboard & payroll view only)
 *
 * @author Sistem Payroll Team
 * @version 1.0.0
 * @since 2024-10-26
 * ==========================================================================
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

/**
 * User role types yang tersedia dalam sistem
 * #UserRoles #AccessLevels
 */
export type UserRole =
  | "super_admin"
  | "admin"
  | "manager"
  | "karyawan";

/**
 * Interface untuk data user
 * #UserInterface #UserData
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  employeeId?: string; // Link ke data karyawan untuk role 'karyawan'
  avatar?: string;
  status: "active" | "inactive";
  createdAt: string;
  lastLogin?: string;
}

/**
 * Interface untuk permission module
 * Setiap module memiliki 4 tipe aksi: view, create, edit, delete
 * #PermissionInterface #ModulePermission
 */
export interface Permission {
  module: string;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

/**
 * Interface untuk Auth Context
 * #ContextInterface #AuthType
 */
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (
    module: string,
    action?: "view" | "create" | "edit" | "delete",
  ) => boolean;
  canAccessMenu: (menuId: string) => boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

/**
 * ==========================================================================
 * MOCK DATA - DEMO USERS & PASSWORDS
 * ==========================================================================
 *
 * Data mock untuk demo aplikasi. Dalam production, data ini akan
 * digantikan dengan API backend yang aman.
 *
 * #MockData #DemoAccounts #Testing
 *
 * DEMO ACCOUNTS:
 * 1. Super Admin - Full access
 * 2. Admin Payroll - Admin level access
 * 3. Manager HRD - Manager level access
 * 4. Budi Santoso - Karyawan level access
 *
 * ⚠️ WARNING: Jangan gunakan sistem password hardcoded ini di production!
 * ==========================================================================
 */

const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Super Admin",
    email: "superadmin@sawit.com",
    role: "super_admin",
    status: "active",
    createdAt: "2024-01-01",
    lastLogin: "2024-10-26",
  },
  {
    id: "2",
    name: "Admin Payroll",
    email: "admin@sawit.com",
    role: "admin",
    status: "active",
    createdAt: "2024-01-01",
    lastLogin: "2024-10-26",
  },
  {
    id: "3",
    name: "Manager HRD",
    email: "manager@sawit.com",
    role: "manager",
    status: "active",
    createdAt: "2024-01-01",
    lastLogin: "2024-10-25",
  },
  {
    id: "4",
    name: "Budi Santoso",
    email: "budi@sawit.com",
    role: "karyawan",
    employeeId: "EMP001",
    status: "active",
    createdAt: "2024-01-01",
    lastLogin: "2024-10-26",
  },
];

/**
 * Mock passwords untuk demo
 * ⚠️ Production: Implementasikan proper authentication dengan backend
 * #MockPasswords #DemoCredentials
 */
const MOCK_PASSWORDS: Record<string, string> = {
  "superadmin@sawit.com": "super123",
  "admin@sawit.com": "admin123",
  "manager@sawit.com": "manager123",
  "budi@sawit.com": "karyawan123",
};

/**
 * ==========================================================================
 * ROLE-BASED PERMISSIONS CONFIGURATION
 * ==========================================================================
 *
 * Konfigurasi lengkap permission untuk setiap role dalam sistem.
 * Setiap module memiliki 4 level akses: view, create, edit, delete
 *
 * #PermissionConfig #RBAC #AccessControl
 *
 * PERMISSION MATRIX:
 * - super_admin: Full access (CRUD) ke semua module
 * - admin: Full access kecuali user & role management
 * - manager: View-only access ke sebagian besar module
 * - karyawan: Limited access (dashboard & payroll view only)
 *
 * MODULE LIST:
 * - dashboard, payroll_view, tax_worksheet
 * - employee_management, division_master, position_master
 * - premium_master, tax_master, employee_payroll
 * - payroll_processing, payroll_reports
 * - settings, user_management, role_management
 * ==========================================================================
 */
const ROLE_PERMISSIONS: Record<
  UserRole,
  Record<string, Permission>
> = {
  super_admin: {
    dashboard: {
      module: "dashboard",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    payroll_view: {
      module: "payroll_view",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    tax_worksheet: {
      module: "tax_worksheet",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    annual_payroll: {
      module: "annual_payroll",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    employee_management: {
      module: "employee_management",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    employee_transfer: {
      module: "employee_transfer",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    division_master: {
      module: "division_master",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    position_master: {
      module: "position_master",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    wage_master: {
      module: "wage_master",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    natura_master: {
      module: "natura_master",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    premium_master: {
      module: "premium_master",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    tax_master: {
      module: "tax_master",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    working_days_master: {
      module: "working_days_master",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    holiday_master: {
      module: "holiday_master",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    attendance_master: {
      module: "attendance_master",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    leave_management: {
      module: "leave_management",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    recruitment: {
      module: "recruitment",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    termination: {
      module: "termination",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    employee_payroll: {
      module: "employee_payroll",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    payroll_processing: {
      module: "payroll_processing",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    payroll_reports: {
      module: "payroll_reports",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    engagement: {
      module: "engagement",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    settings: {
      module: "settings",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    user_management: {
      module: "user_management",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    role_management: {
      module: "role_management",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
  },
  admin: {
    dashboard: {
      module: "dashboard",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    payroll_view: {
      module: "payroll_view",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    tax_worksheet: {
      module: "tax_worksheet",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    annual_payroll: {
      module: "annual_payroll",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    employee_management: {
      module: "employee_management",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    employee_transfer: {
      module: "employee_transfer",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    division_master: {
      module: "division_master",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    position_master: {
      module: "position_master",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    wage_master: {
      module: "wage_master",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    natura_master: {
      module: "natura_master",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    premium_master: {
      module: "premium_master",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    tax_master: {
      module: "tax_master",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    working_days_master: {
      module: "working_days_master",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    holiday_master: {
      module: "holiday_master",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    attendance_master: {
      module: "attendance_master",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    leave_management: {
      module: "leave_management",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    recruitment: {
      module: "recruitment",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    termination: {
      module: "termination",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    employee_payroll: {
      module: "employee_payroll",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    payroll_processing: {
      module: "payroll_processing",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    payroll_reports: {
      module: "payroll_reports",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    engagement: {
      module: "engagement",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    settings: {
      module: "settings",
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    user_management: {
      module: "user_management",
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    role_management: {
      module: "role_management",
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
  },
  manager: {
    dashboard: {
      module: "dashboard",
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    payroll_view: {
      module: "payroll_view",
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    tax_worksheet: {
      module: "tax_worksheet",
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    annual_payroll: {
      module: "annual_payroll",
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    employee_management: {
      module: "employee_management",
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    employee_transfer: {
      module: "employee_transfer",
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    division_master: {
      module: "division_master",
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    position_master: {
      module: "position_master",
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    wage_master: {
      module: "wage_master",
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    natura_master: {
      module: "natura_master",
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    premium_master: {
      module: "premium_master",
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    tax_master: {
      module: "tax_master",
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    working_days_master: {
      module: "working_days_master",
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    holiday_master: {
      module: "holiday_master",
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    attendance_master: {
      module: "attendance_master",
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    leave_management: {
      module: "leave_management",
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    recruitment: {
      module: "recruitment",
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    termination: {
      module: "termination",
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    employee_payroll: {
      module: "employee_payroll",
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    payroll_processing: {
      module: "payroll_processing",
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    payroll_reports: {
      module: "payroll_reports",
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    engagement: {
      module: "engagement",
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    settings: {
      module: "settings",
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    user_management: {
      module: "user_management",
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    role_management: {
      module: "role_management",
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
  },
  karyawan: {
    dashboard: {
      module: "dashboard",
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    payroll_view: {
      module: "payroll_view",
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    tax_worksheet: {
      module: "tax_worksheet",
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    annual_payroll: {
      module: "annual_payroll",
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    employee_management: {
      module: "employee_management",
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    employee_transfer: {
      module: "employee_transfer",
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    division_master: {
      module: "division_master",
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    position_master: {
      module: "position_master",
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    wage_master: {
      module: "wage_master",
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    natura_master: {
      module: "natura_master",
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    premium_master: {
      module: "premium_master",
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    tax_master: {
      module: "tax_master",
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    employee_payroll: {
      module: "employee_payroll",
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    payroll_processing: {
      module: "payroll_processing",
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    payroll_reports: {
      module: "payroll_reports",
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    working_days_master: {
      module: "working_days_master",
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    holiday_master: {
      module: "holiday_master",
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    attendance_master: {
      module: "attendance_master",
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    leave_management: {
      module: "leave_management",
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    recruitment: {
      module: "recruitment",
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    termination: {
      module: "termination",
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    engagement: {
      module: "engagement",
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    settings: {
      module: "settings",
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    user_management: {
      module: "user_management",
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    role_management: {
      module: "role_management",
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
  },
};

/**
 * ==========================================================================
 * MENU TO MODULE MAPPING
 * ==========================================================================
 *
 * Mapping antara menu ID (yang digunakan dalam routing) dengan
 * module name (yang digunakan dalam permission system).
 *
 * #MenuMapping #RoutingConfig
 *
 * Digunakan oleh canAccessMenu() untuk mengecek permission berdasarkan menu ID
 * ==========================================================================
 */
const MENU_MODULE_MAP: Record<string, string> = {
  dashboard: "dashboard",
  "payroll-view": "payroll_view",
  "tax-worksheet": "tax_worksheet",
  "annual-payroll": "annual_payroll",
  hrm: "employee_management",
  "employee-transfer": "employee_transfer",
  division: "division_master",
  position: "position_master",
  "wage-master": "wage_master",
  premium: "premium_master",
  "tax-master": "tax_master",
  "working-days": "working_days_master",
  holidays: "holiday_master",
  attendance: "attendance_master",
  leave: "leave_management",
  "leave-division": "leave_management", // Menggunakan permission yang sama dengan leave
  employees: "employee_payroll",
  processing: "payroll_processing",
  reports: "payroll_reports",
  engagement: "engagement",
  settings: "settings",
  "user-management": "user_management",
  "role-management": "role_management",
};

/**
 * ==========================================================================
 * AUTH PROVIDER COMPONENT
 * ==========================================================================
 *
 * Provider component yang menyediakan auth context ke seluruh aplikasi.
 * Menangani state management untuk user session dan permissions.
 *
 * #AuthProvider #ContextProvider #SessionManagement
 *
 * @param children - Child components yang akan dibungkus provider
 * ==========================================================================
 */
export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Effect untuk restore user session dari localStorage saat app load
   * #SessionRestore #LocalStorage
   */
  useEffect(() => {
    // Cek apakah user sudah login sebelumnya (dari localStorage)
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        // Jika data corrupt, hapus dari localStorage
        localStorage.removeItem("auth_user");
      }
    }
    setIsLoading(false);
  }, []);

  /**
   * Fungsi login untuk autentikasi user
   * #LoginFunction #Authentication
   *
   * @param email - Email user
   * @param password - Password user
   * @returns Promise<boolean> - true jika login berhasil
   */
  const login = async (
    email: string,
    password: string,
  ): Promise<boolean> => {
    setIsLoading(true);

    // Simulasi API call delay (akan diganti dengan real API)
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Validasi credentials
    const foundUser = MOCK_USERS.find(
      (u) => u.email === email && u.status === "active",
    );
    const validPassword = MOCK_PASSWORDS[email] === password;

    if (foundUser && validPassword) {
      // Update last login time
      const updatedUser = {
        ...foundUser,
        lastLogin: new Date().toISOString(),
      };
      setUser(updatedUser);
      // Simpan ke localStorage untuk persistent session
      localStorage.setItem(
        "auth_user",
        JSON.stringify(updatedUser),
      );
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  /**
   * Fungsi logout untuk menghapus session user
   * #LogoutFunction #SessionClear
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  /**
   * Fungsi untuk cek permission user pada module tertentu
   * #PermissionCheck #AccessControl
   *
   * @param module - Nama module yang ingin dicek
   * @param action - Jenis aksi (view/create/edit/delete), default 'view'
   * @returns boolean - true jika user memiliki permission
   */
  const hasPermission = (
    module: string,
    action: "view" | "create" | "edit" | "delete" = "view",
  ): boolean => {
    if (!user) return false;

    const permissions = ROLE_PERMISSIONS[user.role];
    const modulePermission = permissions[module];

    if (!modulePermission) return false;

    // Check permission berdasarkan action type
    switch (action) {
      case "view":
        return modulePermission.canView;
      case "create":
        return modulePermission.canCreate;
      case "edit":
        return modulePermission.canEdit;
      case "delete":
        return modulePermission.canDelete;
      default:
        return false;
    }
  };

  /**
   * Fungsi untuk cek apakah user bisa mengakses menu tertentu
   * #MenuAccess #NavigationControl
   *
   * @param menuId - ID menu yang ingin dicek
   * @returns boolean - true jika user bisa mengakses menu
   */
  const canAccessMenu = (menuId: string): boolean => {
    if (!user) return false;

    // Convert menu ID ke module key
    const moduleKey = MENU_MODULE_MAP[menuId];
    if (!moduleKey) return false;

    // Cek view permission untuk module tersebut
    return hasPermission(moduleKey, "view");
  };

  // Provide auth context value ke seluruh child components
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        hasPermission,
        canAccessMenu,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * ==========================================================================
 * USE AUTH HOOK
 * ==========================================================================
 *
 * Custom hook untuk mengakses auth context dari komponen manapun.
 *
 * #CustomHook #AuthHook #ContextConsumer
 *
 * @returns AuthContextType - Object berisi user, methods, dan states
 * @throws Error jika digunakan di luar AuthProvider
 *
 * USAGE EXAMPLE:
 * ```tsx
 * const { user, login, logout, hasPermission } = useAuth();
 * ```
 * ==========================================================================
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuth must be used within an AuthProvider",
    );
  }
  return context;
}

/**
 * Export mock data untuk digunakan oleh user management component
 * #ExportData #MockData
 */
export { MOCK_USERS, MOCK_PASSWORDS };