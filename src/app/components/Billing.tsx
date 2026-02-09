import Layout from '@/app/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { CreditCard, Warehouse, Package, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Billing() {
  const navigate = useNavigate();

  const currentBill = {
    period: 'Januari 2026',
    dueDate: '2026-02-05',
    storage: 500,
    services: 0,
    total: 500000,
    status: 'unpaid'
  };

  const billHistory = [
    { month: 'Desember 2025', amount: 500000, status: 'paid', paidDate: '2026-01-03' },
    { month: 'November 2025', amount: 500000, status: 'paid', paidDate: '2025-12-05' },
    { month: 'Oktober 2025', amount: 500000, status: 'paid', paidDate: '2025-11-04' },
  ];

  const costBreakdown = [
    { label: 'Biaya Sewa', amount: 500000, icon: Warehouse },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold dark:text-gray-100">Tagihan & Pembayaran</h1>
          <p className="text-gray-600 mt-1 dark:text-gray-400">Kelola tagihan dan biaya layanan gudang</p>
        </div>

        {/* Current Bill */}
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 dark:border-blue-800">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">Tagihan Bulan Ini</CardTitle>
                <CardDescription className="text-base mt-2">
                  Periode: {currentBill.period}
                </CardDescription>
              </div>
              <Badge variant="destructive" className="text-lg px-4 py-2">
                Belum Dibayar
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg space-y-4 dark:bg-gray-800">
                {costBreakdown.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg dark:bg-blue-900/30">
                          <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-200">{item.label}</span>
                      </div>
                      <span className="font-semibold">
                        Rp {item.amount.toLocaleString('id-ID')}
                      </span>
                    </div>
                  );
                })}
                <div className="border-t pt-4 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold dark:text-gray-200">Total Tagihan</span>
                    <span className="text-3xl font-bold text-blue-600">
                      Rp {currentBill.total.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 bg-white p-4 rounded-lg dark:bg-gray-800 dark:text-gray-300">
                <Calendar className="h-4 w-4" />
                Jatuh tempo: {new Date(currentBill.dueDate).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-600"
                  onClick={() => navigate('/payment')}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Bayar Sekarang
                </Button>
                <Button variant="outline" onClick={() => navigate('/invoice')}>
                  Lihat Invoice
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card>
          <CardHeader>
            <CardTitle>Riwayat Pembayaran</CardTitle>
            <CardDescription>Tagihan bulan-bulan sebelumnya</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {billHistory.map((bill, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg dark:bg-gray-800"
                >
                  <div>
                    <p className="font-semibold dark:text-gray-200">{bill.month}</p>
                    <p className="text-sm text-gray-600 mt-1 dark:text-gray-400">
                      Dibayar: {new Date(bill.paidDate).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <div>
                      <p className="font-bold dark:text-gray-200">Rp {bill.amount.toLocaleString('id-ID')}</p>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700">Lunas</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}