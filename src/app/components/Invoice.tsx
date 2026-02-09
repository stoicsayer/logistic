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
          <h1 className="text-3xl font-bold">Invoice & Riwayat</h1>
          <p className="text-gray-600 mt-1">Invoice otomatis dan riwayat transaksi</p>
        </div>

        {/* Current Invoice Detail */}
        <Card className="border-2 border-emerald-200">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">Invoice Terbaru</CardTitle>
                <CardDescription className="text-base mt-2">
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
            <div className="bg-white border rounded-lg p-6 space-y-6">
              {/* Header */}
              <div className="flex justify-between items-start border-b pb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Warehouse className="h-6 w-6 text-emerald-600" />
                    <h2 className="text-2xl font-bold text-emerald-600">Inventra</h2>
                  </div>
                  <p className="text-sm text-gray-600">Gudang Pintar untuk UMKM</p>
                  <p className="text-sm text-gray-600">Jl. Raya Industri No. 123</p>
                  <p className="text-sm text-gray-600">Jakarta Barat, 11730</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Tanggal Invoice</p>
                  <p className="font-semibold">{new Date(currentInvoice.date).toLocaleDateString('id-ID')}</p>
                  <p className="text-sm text-gray-600 mt-2">Periode</p>
                  <p className="font-semibold">{currentInvoice.period}</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Biaya Penyimpanan Gudang</span>
                  <span className="font-medium">Rp 500.000</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-3xl font-bold text-emerald-600">
                      Rp {currentInvoice.amount.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Metode Pembayaran</p>
                    <p className="font-semibold">{currentInvoice.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tanggal Pembayaran</p>
                    <p className="font-semibold">
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
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-semibold">{invoice.number}</p>
                    <p className="text-sm text-gray-600 mt-1">{invoice.period}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Dibayar: {new Date(invoice.paidDate).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-bold">Rp {invoice.amount.toLocaleString('id-ID')}</p>
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
    </Layout>
  );
}
