import Layout from '@/app/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { AlertTriangle, Package, Truck, Bell, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Notifications() {
  const stockAlerts = [
    { product: 'Kaos Polos Size M', stock: 5, minStock: 20, severity: 'urgent', time: '5 menit lalu' },
    { product: 'Sweater Rajut Size L', stock: 12, minStock: 30, severity: 'warning', time: '2 jam lalu' },
    { product: 'Celana Chino Size XL', stock: 18, minStock: 25, severity: 'warning', time: '5 jam lalu' },
  ];

  const restockSuggestions = [
    { product: 'Kaos Polos Putih', suggested: 50, reason: 'Produk best seller', priority: 'High' },
    { product: 'Kemeja Batik Premium', suggested: 30, reason: 'Permintaan tinggi', priority: 'Medium' },
    { product: 'Jaket Hoodie Hitam', suggested: 25, reason: 'Stok menipis', priority: 'High' },
  ];

  const deliveryAlerts = [
    { message: 'Pengiriman #SHIP-1234 dalam perjalanan', eta: '2 jam', status: 'on-way' },
    { message: 'Penjemputan pesanan #INV-5678 terjadwal', eta: 'Besok, 14:00', status: 'scheduled' },
    { message: 'Pengiriman #SHIP-1230 telah tiba di gudang', eta: 'Selesai', status: 'completed' },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold dark:text-gray-100">Notifikasi & Restock</h1>
          <p className="text-gray-600 mt-1 dark:text-gray-400">Pantau stok menipis dan rekomendasi restock</p>
        </div>

        <Tabs defaultValue="stock" className="space-y-4">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="stock">Stok Menipis</TabsTrigger>
            <TabsTrigger value="restock">Rekomendasi</TabsTrigger>
            <TabsTrigger value="delivery">Pengiriman</TabsTrigger>
          </TabsList>

          <TabsContent value="stock">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-orange-100 p-2 rounded-lg dark:bg-orange-900/30">
                    <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  Notifikasi Stok Menipis
                </CardTitle>
                <CardDescription>Produk yang memerlukan perhatian segera</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stockAlerts.map((alert, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border-l-4 ${alert.severity === 'urgent'
                          ? 'bg-red-50 border-red-500 dark:bg-red-900/20'
                          : 'bg-orange-50 border-orange-500 dark:bg-orange-900/20'
                        }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <AlertTriangle
                              className={`h-5 w-5 ${alert.severity === 'urgent' ? 'text-red-600 dark:text-red-400' : 'text-orange-600 dark:text-orange-400'
                                }`}
                            />
                            <h3 className="font-semibold dark:text-gray-200">{alert.product}</h3>
                          </div>
                          <p className="text-sm text-gray-600 mt-2 dark:text-gray-400">
                            Tersisa <span className="font-bold dark:text-gray-200">{alert.stock} pcs</span> (min: {alert.minStock} pcs)
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => toast.success('Pesanan restock telah dibuat!')}
                        >
                          Restock Sekarang
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="restock">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-lg dark:bg-blue-900/30">
                    <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  Rekomendasi Restock Otomatis
                </CardTitle>
                <CardDescription>Saran restock berdasarkan data penjualan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {restockSuggestions.map((suggestion, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold dark:text-gray-200">{suggestion.product}</h3>
                            <Badge
                              variant={suggestion.priority === 'High' ? 'destructive' : 'default'}
                            >
                              {suggestion.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-2 dark:text-gray-400">
                            Disarankan: <span className="font-bold dark:text-gray-200">{suggestion.suggested} pcs</span>
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{suggestion.reason}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toast.success('Ditambahkan ke daftar restock!')}
                        >
                          Tambahkan
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="delivery">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-emerald-100 p-2 rounded-lg dark:bg-emerald-900/30">
                    <Truck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  Pengingat Pengiriman
                </CardTitle>
                <CardDescription>Status pengiriman dan penjemputan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deliveryAlerts.map((alert, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${alert.status === 'on-way'
                              ? 'bg-blue-100 dark:bg-blue-900/30'
                              : alert.status === 'scheduled'
                                ? 'bg-yellow-100 dark:bg-yellow-900/30'
                                : 'bg-emerald-100 dark:bg-emerald-900/30'
                            }`}
                        >
                          {alert.status === 'completed' ? (
                            <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <Truck
                              className={`h-5 w-5 ${alert.status === 'on-way' ? 'text-blue-600 dark:text-blue-400' : 'text-yellow-600 dark:text-yellow-400'
                                }`}
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium dark:text-gray-200">{alert.message}</p>
                          <p className="text-sm text-gray-600 mt-1 dark:text-gray-400">ETA: {alert.eta}</p>
                        </div>
                        <Badge
                          variant={
                            alert.status === 'completed' ? 'default' : 'secondary'
                          }
                        >
                          {alert.status === 'on-way'
                            ? 'Dalam Perjalanan'
                            : alert.status === 'scheduled'
                              ? 'Terjadwal'
                              : 'Selesai'}
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
