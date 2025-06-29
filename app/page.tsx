'use client';

import { useSession, signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Wallet, Shield, Youtube, Instagram } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (session) {
    // Redirect based on user role
    if (session.user?.role === 'business') {
      window.location.href = '/dashboard/business';
    } else if (session.user?.role === 'influencer') {
      window.location.href = '/dashboard/influencer';
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-teal-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-purple rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">InfluencerHub</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => signIn()}>
                Masuk
              </Button>
              <Button className="gradient-purple text-white" onClick={() => signIn()}>
                Daftar Sekarang
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 gradient-teal text-white">
            Platform Influencer Marketing #1 Indonesia
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Kolaborasi yang 
            <span className="bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent"> Menguntungkan</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Platform performance-based yang menghubungkan UMKM Indonesia dengan content creator. 
            Bayar berdasarkan hasil nyata dengan sistem escrow yang aman.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="gradient-purple text-white px-8 py-6 text-lg"
              onClick={() => signIn()}
            >
              Mulai Kampanye
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-6 text-lg border-2 border-primary"
              onClick={() => signIn()}
            >
              Jadi Influencer
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Kenapa Memilih InfluencerHub?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Platform lengkap dengan fitur-fitur canggih untuk memaksimalkan hasil kampanye marketing Anda
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 gradient-purple rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Sistem Escrow Aman</CardTitle>
                <CardDescription>
                  Dana kampanye disimpan aman dengan verifikasi KYC terintegrasi Xendit
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 gradient-teal rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Analytics Real-time</CardTitle>
                <CardDescription>
                  Monitor performa kampanye dari YouTube dan TikTok secara real-time
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Tier Influencer</CardTitle>
                <CardDescription>
                  Sistem tier nano/micro/macro dengan pricing dinamis sesuai engagement
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-4">
                  <Youtube className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Multi Platform</CardTitle>
                <CardDescription>
                  Integrasi dengan YouTube, TikTok, dan Instagram untuk jangkauan maksimal
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 gradient-purple rounded-lg flex items-center justify-center mb-4">
                  <Wallet className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Payout Otomatis</CardTitle>
                <CardDescription>
                  Sistem pembayaran otomatis dengan partial payout berdasarkan milestone
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 gradient-teal rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Fraud Detection</CardTitle>
                <CardDescription>
                  AI-powered fraud detection untuk memastikan engagement yang authentic
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Models */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Model Pricing Fleksibel
            </h2>
            <p className="text-lg text-gray-600">
              Pilih model pembayaran yang sesuai dengan goals kampanye Anda
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">PPV</CardTitle>
                <CardDescription>Pay Per View</CardDescription>
                <div className="text-3xl font-bold text-purple-600 mt-4">
                  Rp 50 - 500
                  <span className="text-sm font-normal text-gray-500">/1K views</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Bayar per 1.000 views
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Cocok untuk brand awareness
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Min. 10K target views
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 border-teal-500">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-teal-600"></div>
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 gradient-teal text-white">
                Populer
              </Badge>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">PPC</CardTitle>
                <CardDescription>Pay Per Click</CardDescription>
                <div className="text-3xl font-bold text-teal-600 mt-4">
                  Rp 500 - 2K
                  <span className="text-sm font-normal text-gray-500">/click</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                    Bayar per klik ke website
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                    Fokus traffic berkualitas
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                    ROI tracking real-time
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-amber-600"></div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">PPS</CardTitle>
                <CardDescription>Pay Per Sale</CardDescription>
                <div className="text-3xl font-bold text-amber-600 mt-4">
                  5% - 20%
                  <span className="text-sm font-normal text-gray-500">/komisi</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                    Bayar per penjualan
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                    Risk-free untuk bisnis
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                    Komisi kompetitif
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-purple">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Siap Memulai Kampanye Pertama Anda?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Bergabung dengan ribuan UMKM dan content creator yang sudah merasakan keuntungannya
          </p>
          <Button 
            size="lg" 
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold"
            onClick={() => signIn()}
          >
            Mulai Gratis Hari Ini
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-purple rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">InfluencerHub</span>
            </div>
            <p className="text-gray-400">
              © 2025 InfluencerHub. Platform influencer marketing untuk UMKM Indonesia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}