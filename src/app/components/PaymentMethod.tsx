import { useState } from 'react';
import Layout from '@/app/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Label } from '@/app/components/ui/label';
import { CreditCard, Smartphone, QrCode } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function PaymentMethod() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('');

  const paymentMethods = [
    {
      id: 'va',
      name: 'Virtual Account',
      icon: CreditCard,
      options: [
        { bank: 'BCA', logo: '🏦' },
        { bank: 'Mandiri', logo: '🏦' },
        { bank: 'BNI', logo: '🏦' },
        { bank: 'BRI', logo: '🏦' },
      ]
    },
    {
      id: 'ewallet',
      name: 'E-Wallet',
      icon: Smartphone,
      options: [
        { name: 'OVO', logo: '💰' },
        { name: 'GoPay', logo: '💰' },
        { name: 'DANA', logo: '💰' },
        { name: 'ShopeePay', logo: '💰' },
      ]
    },
    {
      id: 'qris',
      name: 'QRIS',
      icon: QrCode,
      description: 'Scan QR Code untuk pembayaran instant'
    }
  ];

  const handlePayment = () => {
    if (!selectedMethod) {
      toast.error('Pilih metode pembayaran terlebih dahulu');
      return;
    }
    toast.success('Pembayaran berhasil diproses!');
    setTimeout(() => {
      navigate('/invoice');
    }, 1500);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Metode Pembayaran</h1>
          <p className="text-gray-600 mt-1">Pilih metode pembayaran yang Anda inginkan</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <Card
                  key={method.id}
                  className={`cursor-pointer transition-all ${
                    selectedMethod === method.id ? 'border-2 border-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${
                        selectedMethod === method.id ? 'bg-blue-600' : 'bg-gray-100'
                      }`}>
                        <Icon className={`h-6 w-6 ${
                          selectedMethod === method.id ? 'text-white' : 'text-gray-600'
                        }`} />
                      </div>
                      <div>
                        <CardTitle>{method.name}</CardTitle>
                        {method.description && (
                          <CardDescription className="mt-1">{method.description}</CardDescription>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  {method.options && selectedMethod === method.id && (
                    <CardContent>
                      {method.id === 'va' ? (
                        <RadioGroup className="grid grid-cols-2 gap-3">
                          {method.options.map((option, idx) => (
                            <div key={idx} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                              <RadioGroupItem value={option.bank} id={option.bank} />
                              <Label htmlFor={option.bank} className="flex items-center gap-2 cursor-pointer flex-1">
                                <span className="text-2xl">{option.logo}</span>
                                <span>{option.bank}</span>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      ) : (
                        <div className="grid grid-cols-2 gap-3">
                          {method.options.map((option, idx) => (
                            <Button key={idx} variant="outline" className="h-16 text-left justify-start">
                              <span className="text-2xl mr-2">{option.logo}</span>
                              {option.name}
                            </Button>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  )}
                  {method.id === 'qris' && selectedMethod === 'qris' && (
                    <CardContent>
                      <div className="bg-white p-6 rounded-lg border-2 border-dashed flex flex-col items-center">
                        <QrCode className="h-32 w-32 text-gray-400" />
                        <p className="text-sm text-gray-500 mt-4">QR Code akan ditampilkan setelah konfirmasi</p>
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Summary */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Ringkasan Pembayaran</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Biaya Penyimpanan</span>
                    <span className="font-medium">Rp 450.000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Biaya Layanan</span>
                    <span className="font-medium">Rp 125.000</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="text-2xl font-bold text-blue-600">Rp 575.000</span>
                    </div>
                  </div>
                </div>

                {selectedMethod && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      Metode: <span className="font-semibold">
                        {paymentMethods.find(m => m.id === selectedMethod)?.name}
                      </span>
                    </p>
                  </div>
                )}

                <Button
                  className="w-full bg-gradient-to-r from-emerald-500 to-blue-600"
                  onClick={handlePayment}
                  disabled={!selectedMethod}
                >
                  Bayar Sekarang
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
