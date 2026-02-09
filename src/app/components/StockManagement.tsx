import Layout from '@/app/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Badge } from '@/app/components/ui/badge';
import { ArrowDown, ArrowUp, MapPin, Calendar } from 'lucide-react';

export default function StockManagement() {
  const stockIn = [
    { product: 'Kaos Polos Putih', qty: 50, size: 'L', date: '2026-01-25', supplier: '' },
    { product: 'Kemeja Batik', qty: 30, size: 'XL', date: '2026-01-24', supplier: '' },
    { product: 'Jaket Hoodie', qty: 25, size: 'M', date: '2026-01-23', supplier: '' },
  ];

  const stockOut = [
    { product: 'Kaos Polos Hitam', qty: 20, size: 'M', date: '2026-01-27', destination: '' },
    { product: 'Celana Jeans', qty: 15, size: 'L', date: '2026-01-26', destination: '' },
    { product: 'Kemeja Flannel', qty: 10, size: 'XL', date: '2026-01-25', destination: '' },
  ];

  const warehouseLocations = [
    { product: 'Kaos Polos', location: 'Rak A1', qty: 120, status: 'Tersedia' },
    { product: 'Kemeja Batik', location: 'Rak A2', qty: 45, status: 'Tersedia' },
    { product: 'Jaket Hoodie', location: 'Rak B1', qty: 32, status: 'Terbatas' },
    { product: 'Celana Jeans', location: 'Rak B2', qty: 58, status: 'Tersedia' },
    { product: 'Sweater Rajut', location: 'Rak C1', qty: 12, status: 'Menipis' },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold dark:text-gray-100">Manajemen Stok Gudang</h1>
          <p className="text-gray-600 mt-1 dark:text-gray-400">Pantau pergerakan stok masuk, keluar, dan lokasi gudang</p>
        </div>

        <Tabs defaultValue="in" className="space-y-4">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="in">Stok Masuk</TabsTrigger>
            <TabsTrigger value="out">Stok Keluar</TabsTrigger>
            <TabsTrigger value="location">Lokasi Rak</TabsTrigger>
          </TabsList>

          <TabsContent value="in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-emerald-100 p-2 rounded-lg dark:bg-emerald-900/30">
                    <ArrowDown className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  Stok Masuk
                </CardTitle>
                <CardDescription>Riwayat barang yang masuk ke gudang</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stockIn.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
                      <div>
                        <h3 className="font-semibold dark:text-gray-200">{item.product}</h3>
                        <div className="flex gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                          <span>Size: {item.size}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {new Date(item.date).toLocaleDateString('id-ID')}
                        </div>
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-700">+{item.qty} pcs</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="out">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-red-100 p-2 rounded-lg dark:bg-red-900/30">
                    <ArrowUp className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  Stok Keluar
                </CardTitle>
                <CardDescription>Riwayat barang yang keluar dari gudang</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stockOut.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
                      <div>
                        <h3 className="font-semibold dark:text-gray-200">{item.product}</h3>
                        <div className="flex gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                          <span>Size: {item.size}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {new Date(item.date).toLocaleDateString('id-ID')}
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-red-100 text-red-700">-{item.qty} pcs</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="location">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-purple-100 p-2 rounded-lg dark:bg-purple-900/30">
                    <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  Lokasi Rak Gudang
                </CardTitle>
                <CardDescription>Pemetaan lokasi produk di gudang</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {warehouseLocations.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
                      <div className="flex items-center gap-4">
                        <div className="bg-white p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600">
                          <MapPin className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                        </div>
                        <div>
                          <h3 className="font-semibold dark:text-gray-200">{item.product}</h3>
                          <p className="text-sm text-gray-600 mt-1 dark:text-gray-400">Lokasi: {item.location}</p>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <div>
                          <p className="font-bold dark:text-gray-200">{item.qty} pcs</p>
                        </div>
                        <Badge variant={
                          item.status === 'Tersedia' ? 'default' :
                            item.status === 'Terbatas' ? 'secondary' :
                              'destructive'
                        }>
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
