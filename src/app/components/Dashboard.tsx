import Layout from '@/app/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Package, AlertTriangle, ShoppingCart, Warehouse, TrendingUp, TrendingDown } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';

export default function Dashboard() {
  const stats = [
    { label: 'Total Stok', value: '652', icon: Package, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { label: 'Stok Menipis', value: '12', icon: AlertTriangle, color: 'text-orange-600', bgColor: 'bg-orange-100' },
    { label: 'Kapasitas Gudang', value: '68%', icon: Warehouse, color: 'text-purple-600', bgColor: 'bg-purple-100' },
  ];

  const notifications = [
    { message: 'Stok Kaos Polos Size M menipis (tersisa 5 pcs)', type: 'warning', time: '5 menit lalu' },
    { message: 'Tagihan gudang bulan depan: Rp 500.000', type: 'info', time: '2 jam lalu' },
  ];

  const recentProducts = [
    { name: 'Kaos Polos Putih', size: 'M, L, XL', stock: 45, movement: '+12' },
    { name: 'Kemeja Batik Premium', size: 'L, XL', stock: 28, movement: '-5' },
    { name: 'Jaket Hoodie Hitam', size: 'M, L', stock: 18, movement: '+8' },
    { name: 'Celana Jeans Slim Fit', size: 'M, L, XL', stock: 32, movement: '-3' },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold dark:text-gray-100">Dashboard</h1>
          <p className="text-gray-600 mt-1 dark:text-gray-400">Selamat datang di Inventra - Gudang Pintar Anda</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                      <p className="text-3xl font-bold mt-2 dark:text-gray-100">{stat.value}</p>
                    </div>
                    <div className={`${stat.bgColor} p-3 rounded-lg`}>
                      <Icon className={`${stat.color} h-6 w-6`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notifikasi Terbaru */}
          <Card>
            <CardHeader>
              <CardTitle>Notifikasi Terbaru</CardTitle>
              <CardDescription>Update penting untuk usaha Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.map((notif, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className={`mt-0.5 ${notif.type === 'warning' ? 'text-orange-500' :
                    notif.type === 'success' ? 'text-emerald-500' :
                      'text-blue-500'
                    }`}>
                    {notif.type === 'warning' && <AlertTriangle className="h-5 w-5" />}
                    {notif.type === 'success' && <Package className="h-5 w-5" />}
                    {notif.type === 'info' && <Warehouse className="h-5 w-5" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm dark:text-gray-200">{notif.message}</p>
                    <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">{notif.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Produk Terbaru */}
          <Card>
            <CardHeader>
              <CardTitle>Pergerakan Stok Terkini</CardTitle>
              <CardDescription>Produk dengan aktivitas terbaru</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProducts.map((product, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium dark:text-gray-200">{product.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Size: {product.size}</p>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <div>
                        <p className="font-bold dark:text-gray-200">{product.stock}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">pcs</p>
                      </div>
                      <Badge variant={product.movement.startsWith('+') ? 'default' : 'secondary'} className={
                        product.movement.startsWith('+') ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }>
                        {product.movement.startsWith('+') ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                        {product.movement}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
