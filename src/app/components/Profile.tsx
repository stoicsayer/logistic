import Layout from "@/app/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Badge } from "@/app/components/ui/badge";
import {
  Building2,
  Package,
  CreditCard,
  Calendar,
  Edit,
} from "lucide-react";
import { toast } from "sonner";

export default function Profile() {
  const businessInfo = {
    name: "CV Konveksi Radit Uhuy",
    owner: "Radit Santoso",
    email: "konveksi.Radit@email.com",
    phone: "+62 812-3456-7890",
    address: "Jl. Industri Raya No. 45, Tangerang",
    type: "UMKM Konveksi & Garmen",
    registrationDate: "2025-06-15",
  };

  const subscription = {
    plan: "Business Plan",
    storage: "60%",
    status: "active",
    nextBilling: "2026-02-05",
    price: "Rp 500.000/bulan",
  };

  const usageStats = [
    { label: "Total Produk", value: "24", icon: Package },
    { label: "Stok Tersimpan", value: "653", icon: Package },
    { label: "Ruang Terpakai", value: "60", icon: Building2 },
    {
      label: "Lama Bergabung",
      value: "7 bulan",
      icon: Calendar,
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold dark:text-gray-100">Profil Usaha</h1>
          <p className="text-gray-600 mt-1 dark:text-gray-400">
            Data UMKM dan pengaturan akun
          </p>
        </div>

        {/* Business Info */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Informasi Usaha</CardTitle>
                <CardDescription>
                  Data lengkap UMKM Anda
                </CardDescription>
              </div>
              <Button
                variant="outline"
                onClick={() =>
                  toast.info("Fitur edit segera hadir!")
                }
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Nama Usaha</Label>
                <Input
                  value={businessInfo.name}
                  disabled
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Pemilik</Label>
                <Input
                  value={businessInfo.owner}
                  disabled
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  value={businessInfo.email}
                  disabled
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Nomor Telepon</Label>
                <Input
                  value={businessInfo.phone}
                  disabled
                  className="mt-2"
                />
              </div>
              <div className="md:col-span-2">
                <Label>Alamat</Label>
                <Input
                  value={businessInfo.address}
                  disabled
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Jenis Usaha</Label>
                <Input
                  value={businessInfo.type}
                  disabled
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Tanggal Registrasi</Label>
                <Input
                  value={new Date(
                    businessInfo.registrationDate,
                  ).toLocaleDateString("id-ID")}
                  disabled
                  className="mt-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>





        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Pengaturan Akun</CardTitle>
            <CardDescription>
              Kelola preferensi dan keamanan akun
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() =>
                toast.info("Fitur ganti password segera hadir!")
              }
            >
              Ganti Password
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() =>
                toast.info("Fitur notifikasi segera hadir!")
              }
            >
              Pengaturan Notifikasi
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-red-600"
              onClick={() =>
                toast.error("Fitur hapus akun segera hadir!")
              }
            >
              Hapus Akun
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}