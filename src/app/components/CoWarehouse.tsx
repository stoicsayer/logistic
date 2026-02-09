import Layout from '@/app/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import { Warehouse, MapPin, Calendar, Truck, Package } from 'lucide-react';

export default function CoWarehouse() {
  const warehouseInfo = {
    location: 'Gudang Bersama Inventra - Bandung',
    address: 'Jl. Industri No. 123, Cengkareng',
    capacity: 68,
    totalSpace: '2',
    usedSpace: '1',
    monthlyFee: 'Rp 500.000'
  };

  const schedule = [
    { type: 'Pengiriman', date: '2026-01-28', time: '09:00', items: 'Kaos Polos (50 pcs)', status: 'Terjadwal' },
    { type: 'Penjemputan', date: '2026-01-29', time: '14:00', items: 'Pesanan #INV-1234 (20 pcs)', status: 'Terjadwal' },
    { type: 'Pengiriman', date: '2026-01-30', time: '10:00', items: 'Kemeja Batik (30 pcs)', status: 'Terjadwal' },
  ];

  const storageDetail = [
    { category: 'Kaos', qty: 245, percentage: 40 },
    { category: 'Kemeja', qty: 120, percentage: 20 },
    { category: 'Jaket', qty: 90, percentage: 15 },
    { category: 'Celana', qty: 150, percentage: 25 },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold dark:text-gray-100">Gudang Bersama</h1>
          <p className="text-gray-600 mt-1 dark:text-gray-400">Informasi lokasi dan jadwal pengiriman gudang</p>
        </div>

        {/* Warehouse Info */}
        <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 dark:border-emerald-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Warehouse className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              {warehouseInfo.location}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 mt-2">
              <MapPin className="h-4 w-4" />
              {warehouseInfo.address}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg dark:bg-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-400">Kapasitas Terpakai</p>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{warehouseInfo.capacity}%</p>
              </div>
              <div className="bg-white p-4 rounded-lg dark:bg-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-400">Rak Terpakai</p>
                <p className="text-2xl font-bold dark:text-gray-200">{warehouseInfo.totalSpace}</p>
              </div>
              <div className="bg-white p-4 rounded-lg dark:bg-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-400">Biaya Bulanan</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{warehouseInfo.monthlyFee}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Jadwal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Jadwal Pengiriman & Penjemputan
              </CardTitle>
              <CardDescription>Jadwal aktivitas gudang yang akan datang</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {schedule.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
                  <div className={`p-2 rounded-lg ${item.type === 'Pengiriman' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-emerald-100 dark:bg-emerald-900/30'}`}>
                    {item.type === 'Pengiriman' ? (
                      <Truck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <Package className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold dark:text-gray-200">{item.type}</h3>
                        <p className="text-sm text-gray-600 mt-1 dark:text-gray-400">{item.items}</p>
                      </div>
                      <Badge>{item.status}</Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      {new Date(item.date).toLocaleDateString('id-ID')} • {item.time}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Storage Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Detail Penyimpanan
              </CardTitle>
              <CardDescription>Distribusi produk di gudang</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {storageDetail.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-medium dark:text-gray-200">{item.category}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.qty} pcs</p>
                    </div>
                    <span className="text-sm font-semibold dark:text-gray-200">{item.percentage}%</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
              <div className="pt-4 border-t dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <p className="font-semibold dark:text-gray-200">Total Produk</p>
                  <p className="text-lg font-bold dark:text-gray-100">
                    {storageDetail.reduce((acc, item) => acc + item.qty, 0)} pcs
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
