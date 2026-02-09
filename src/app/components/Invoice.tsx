import Layout from '@/app/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Download, Printer, CheckCircle2, Warehouse } from 'lucide-react';
import { toast } from 'sonner';

export default function Invoice() {
  const invoices = [
    {
      number: 'INV-2026-001',
      date: '2026-01-27',
      period: 'Januari 2026',
      amount: 500000,
      status: 'paid',
      paidDate: '2026-01-27',
      paymentMethod: 'Virtual Account BCA'
    },
    {
      number: 'INV-2025-012',
      date: '2025-12-27',
      period: 'Desember 2025',
      amount: 500000,
      status: 'paid',
      paidDate: '2026-01-03',
      paymentMethod: 'OVO'
    },
    {
      number: 'INV-2025-011',
      date: '2025-11-27',
      period: 'November 2025',
      amount: 500000,
      status: 'paid',
      paidDate: '2025-12-05',
      paymentMethod: 'GoPay'
    },
  ];

  const currentInvoice = invoices[0];

  const handleDownload = (invoiceNumber: string) => {
    toast.success(`Invoice ${invoiceNumber} sedang diunduh...`);
  };

  const handlePrint = (invoiceNumber: string) => {
    toast.success(`Invoice ${invoiceNumber} sedang disiapkan untuk dicetak...`);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold dark:text-gray-100">Invoice & Riwayat</h1>
          <p className="text-gray-600 mt-1 dark:text-gray-400">Invoice otomatis dan riwayat transaksi</p>
        </div>

        {/* Current Invoice Detail */}
        <Card className="border-2 border-emerald-200 dark:border-emerald-800">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">Invoice Terbaru</CardTitle>
                <CardDescription className="text-base mt-2 dark:text-gray-400">
                  {currentInvoice.number}
                </CardDescription>
              </div>
              <Badge className="bg-emerald-100 text-emerald-700 text-lg px-4 py-2">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Lunas
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="bg-white border rounded-lg p-6 space-y-6 dark:bg-gray-800 dark:border-gray-700">
              {/* Header */}
              <div className="flex justify-between items-start border-b pb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Warehouse className="h-6 w-6 text-emerald-600" />
                    <h2 className="text-2xl font-bold text-emerald-600">Inventra</h2>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Gudang Pintar untuk UMKM</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Jl. Raya Industri No. 123</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Jakarta Barat, 11730</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tanggal Invoice</p>
                  <p className="font-semibold dark:text-gray-200">{new Date(currentInvoice.date).toLocaleDateString('id-ID')}</p>
                  <p className="text-sm text-gray-600 mt-2 dark:text-gray-400">Periode</p>
                  <p className="font-semibold dark:text-gray-200">{currentInvoice.period}</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600 dark:text-gray-300">Biaya Penyimpanan Gudang</span>
                  <span className="font-medium dark:text-gray-200">Rp 500.000</span>
                </div>
                <div className="border-t pt-3 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold dark:text-gray-200">Total</span>
                    <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                      Rp {currentInvoice.amount.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Metode Pembayaran</p>
                    <p className="font-semibold dark:text-gray-200">{currentInvoice.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Tanggal Pembayaran</p>
                    <p className="font-semibold dark:text-gray-200">
                      {new Date(currentInvoice.paidDate).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  className="flex-1"
                  onClick={() => handleDownload(currentInvoice.number)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Unduh PDF
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handlePrint(currentInvoice.number)}
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Cetak
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invoice History */}
        <Card>
          <CardHeader>
            <CardTitle>Riwayat Invoice</CardTitle>
            <CardDescription>Semua invoice sebelumnya</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {invoices.slice(1).map((invoice) => (
                <div
                  key={invoice.number}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg dark:bg-gray-800"
                >
                  <div>
                    <p className="font-semibold dark:text-gray-200">{invoice.number}</p>
                    <p className="text-sm text-gray-600 mt-1 dark:text-gray-400">{invoice.period}</p>
                    <p className="text-xs text-gray-500 mt-1 dark:text-gray-500">
                      Dibayar: {new Date(invoice.paidDate).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-bold dark:text-gray-200">Rp {invoice.amount.toLocaleString('id-ID')}</p>
                      <Badge className="bg-emerald-100 text-emerald-700 mt-1">Lunas</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDownload(invoice.number)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handlePrint(invoice.number)}
                      >
                        <Printer className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout >
  );
}
