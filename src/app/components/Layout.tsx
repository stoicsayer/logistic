import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/app/components/ui/button';
import {
  LayoutDashboard,
  Package,
  BoxIcon,
  Warehouse,
  Bell,
  CreditCard,
  FileText,
  User,
  LogOut,
  Menu,
  Moon,
  Sun
} from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/app/components/ui/sheet';
import { useTheme } from 'next-themes';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/products', label: 'Produk', icon: Package },
    { path: '/stock', label: 'Stok Gudang', icon: BoxIcon },
    { path: '/warehouse', label: 'Gudang Bersama', icon: Warehouse },
    { path: '/notifications', label: 'Notifikasi', icon: Bell },
    { path: '/billing', label: 'Tagihan', icon: CreditCard },
    { path: '/invoice', label: 'Invoice', icon: FileText },
    { path: '/profile', label: 'Profil Usaha', icon: User },
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const NavContent = () => (
    <nav className="flex-1 space-y-1 p-4">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Button
            key={item.path}
            variant={isActive ? 'secondary' : 'ghost'}
            className={`w-full justify-start ${isActive ? 'bg-emerald-100 text-emerald-700' : ''}`}
            onClick={() => {
              navigate(item.path);
              setMobileMenuOpen(false);
            }}
          >
            <Icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        );
      })}
      <Button variant="ghost" className="w-full justify-start" onClick={toggleTheme}>
        {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
        {theme === 'dark' ? 'Mode Terang' : 'Mode Gelap'}
      </Button>
      <Button variant="ghost" className="w-full justify-start text-red-600" onClick={handleLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        Keluar
      </Button>
    </nav>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Inventra
          </h1>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Menu</h2>
              </div>
              <NavContent />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:flex-col w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 h-screen sticky top-0 overflow-y-auto">
          <div className="p-6 border-b flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Inventra
            </h1>
            <p className="text-sm text-gray-500 mt-1">Gudang Pintar UMKM</p>
          </div>
          <NavContent />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
