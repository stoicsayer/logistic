import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/app/components/ThemeProvider';
import Login from '@/app/components/Login';
import Dashboard from '@/app/components/Dashboard';
import ProductManagement from '@/app/components/ProductManagement';
import StockManagement from '@/app/components/StockManagement';
import CoWarehouse from '@/app/components/CoWarehouse';
import Notifications from '@/app/components/Notifications';
import Orders from '@/app/components/Orders';
import Billing from '@/app/components/Billing';
import PaymentMethod from '@/app/components/PaymentMethod';
import Invoice from '@/app/components/Invoice';
import Profile from '@/app/components/Profile';

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <BrowserRouter>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/stock" element={<StockManagement />} />
          <Route path="/warehouse" element={<CoWarehouse />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/payment" element={<PaymentMethod />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
