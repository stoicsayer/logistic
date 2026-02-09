import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { toast } from 'sonner';
import { Package, Warehouse } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      toast.success('Login berhasil!');
      navigate('/dashboard');
    } else {
      toast.error('Mohon lengkapi semua field');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-emerald-500 to-blue-600 p-3 rounded-2xl">
              <Warehouse className="w-12 h-12 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl">Inventra</CardTitle>
          <CardDescription>Gudang Pintar untuk UMKM Baju</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@usaha.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-blue-600">
              Masuk
            </Button>
            <Button type="button" variant="outline" className="w-full" onClick={() => toast.info('Fitur registrasi segera hadir!')}>
              Daftar Akun UMKM
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
