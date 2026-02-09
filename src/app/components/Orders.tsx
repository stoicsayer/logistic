import Layout from '@/app/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Package, Truck, CheckCircle2, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function Orders() {
  const orders = [
    {
      id: 'INV-1234',
      date: '2026-01-27',
      customer: 'Toko Busana Sejahtera',
      items: [
        { name: 'Kaos Polos Putih', qty: 20, size: 'M' },
        { name: 'Kaos Polos Hitam', qty: 15, size: 'L' }
      ],
      status: 'processing',
      total: 'Rp 500.000',
      tracking: '-'
    },
    {
      id: 'INV-1235',
      date: '2026-01-26',
      customer: 'UD Garmen Makmur',
      items: [
        { name: 'Kemeja Batik Premium', qty: 10, size: 'L' },
        { name: 'Celana Jeans', qty: 15, size: 'M' }
      ],
      status: 'shipped',
      total: 'Rp 500.000',
      tracking: 'SHIP-2026-0126'
    },
    {
      id: 'INV-1236',
      date: '2026-01-25',
      customer: 'Butik Fashion Cantik',
      items: [
        { name: 'Jaket Hoodie', qty: 12, size: 'L' },
        { name: 'Sweater Rajut', qty: 8, size: 'M' }
      ],
      status: 'completed',
      total: 'Rp 500.000',
      tracking: 'SHIP-2026-0125'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return { variant: 'secondary' as const, icon: Clock, text: 'Diproses', color: 'text-yellow-600 bg-yellow-100' };
      case 'shipped':
        return { variant: 'default' as const, icon: Truck, text: 'Dikirim', color: 'text-blue-600 bg-blue-100' };
      case 'completed':
        return { variant: 'default' as const, icon: CheckCircle2, text: 'Selesai', color: 'text-emerald-600 bg-emerald-100' };
      default:
        return { variant: 'default' as const, icon: Package, text: 'Unknown', color: 'text-gray-600 bg-gray-100' };
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Pesanan & Pengiriman</h1>
          <p className="text-gray-600 mt-1">Kelola pesanan dan tracking pengiriman</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Diproses</p>
                  <p className="text-2xl font-bold mt-1">
                    {orders.filter(o => o.status === 'processing').length}
                  </p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Dikirim</p>
                  <p className="text-2xl font-bold mt-1">
                    {orders.filter(o => o.status === 'shipped').length}
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Truck className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Selesai</p>
                  <p className="text-2xl font-bold mt-1">
                    {orders.filter(o => o.status === 'completed').length}
                  </p>
                </div>
                <div className="bg-emerald-100 p-3 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Pesanan</CardTitle>
            <CardDescription>Semua pesanan dari pelanggan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.map((order) => {
                const statusInfo = getStatusBadge(order.status);
                const StatusIcon = statusInfo.icon;

                return (
                  <div key={order.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{order.id}</h3>
                          <Badge className={statusInfo.color}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusInfo.text}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{order.customer}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(order.date).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-emerald-600">{order.total}</p>
                        {order.tracking !== '-' && (
                          <p className="text-xs text-gray-500 mt-1">
                            Tracking: {order.tracking}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {item.name} (Size {item.size})
                          </span>
                          <span className="font-medium">{item.qty} pcs</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      {order.status === 'processing' && (
                        <Button size="sm" onClick={() => toast.success('Pesanan siap dikirim!')}>
                          Siapkan Pengiriman
                        </Button>
                      )}
                      {order.status === 'shipped' && (
                        <Button size="sm" variant="outline" onClick={() => toast.info(`Tracking: ${order.tracking}`)}>
                          Lihat Tracking
                        </Button>
                      )}
                      <Button size="sm" variant="outline" onClick={() => toast.info('Detail pesanan dibuka')}>
                        Lihat Detail
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
