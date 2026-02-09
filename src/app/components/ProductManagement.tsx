import { useState } from 'react';
import Layout from '@/app/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/app/components/ui/badge';

interface Product {
  id: string;
  name: string;
  category: string;
  sizes: string[];
  colors: string[];
  stock: number;
}

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Kaos Polos Basic', category: 'Kaos', sizes: ['M', 'L', 'XL'], colors: ['Putih', 'Hitam'], stock: 120 },
    { id: '2', name: 'Kemeja Batik Premium', category: 'Kemeja', sizes: ['L', 'XL'], colors: ['Coklat', 'Navy'], stock: 45 },
    { id: '3', name: 'Jaket Hoodie', category: 'Jaket', sizes: ['M', 'L', 'XL'], colors: ['Hitam', 'Abu'], stock: 32 },
    { id: '4', name: 'Celana Jeans Slim', category: 'Celana', sizes: ['M', 'L', 'XL'], colors: ['Biru', 'Hitam'], stock: 58 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    sizes: '',
    colors: '',
    stock: ''
  });

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.category && newProduct.sizes && newProduct.colors && newProduct.stock) {
      const product: Product = {
        id: Date.now().toString(),
        name: newProduct.name,
        category: newProduct.category,
        sizes: newProduct.sizes.split(',').map(s => s.trim()),
        colors: newProduct.colors.split(',').map(c => c.trim()),
        stock: parseInt(newProduct.stock)
      };
      setProducts([...products, product]);
      setNewProduct({ name: '', category: '', sizes: '', colors: '', stock: '' });
      setIsDialogOpen(false);
      toast.success('Produk berhasil ditambahkan!');
    } else {
      toast.error('Mohon lengkapi semua field');
    }
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success('Produk berhasil dihapus');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Manajemen Produk</h1>
            <p className="text-gray-600 mt-1">Kelola produk baju usaha Anda</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-emerald-500 to-blue-600">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Produk
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Tambah Produk Baru</DialogTitle>
                <DialogDescription>Masukkan detail produk baju</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nama Produk</Label>
                  <Input
                    id="name"
                    placeholder="Contoh: Kaos Polos"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Kategori</Label>
                  <Select value={newProduct.category} onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kaos">Kaos</SelectItem>
                      <SelectItem value="Kemeja">Kemeja</SelectItem>
                      <SelectItem value="Jaket">Jaket</SelectItem>
                      <SelectItem value="Celana">Celana</SelectItem>
                      <SelectItem value="Lainnya">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="sizes">Ukuran (pisahkan dengan koma)</Label>
                  <Input
                    id="sizes"
                    placeholder="M, L, XL"
                    value={newProduct.sizes}
                    onChange={(e) => setNewProduct({ ...newProduct, sizes: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="colors">Warna (pisahkan dengan koma)</Label>
                  <Input
                    id="colors"
                    placeholder="Putih, Hitam"
                    value={newProduct.colors}
                    onChange={(e) => setNewProduct({ ...newProduct, colors: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="stock">Jumlah Stok</Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="100"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  />
                </div>
                <Button onClick={handleAddProduct} className="w-full">Tambah Produk</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Daftar Produk</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Cari produk..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold">{product.name}</h3>
                    <div className="flex gap-4 mt-2">
                      <div>
                        <p className="text-xs text-gray-500">Kategori</p>
                        <Badge variant="outline">{product.category}</Badge>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Ukuran</p>
                        <p className="text-sm">{product.sizes.join(', ')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Warna</p>
                        <p className="text-sm">{product.colors.join(', ')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Stok</p>
                        <p className="text-sm font-bold">{product.stock} pcs</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => toast.info('Fitur edit segera hadir!')}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteProduct(product.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
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
