'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, 
  TrendingUp, 
  Calendar, 
  ArrowUpRight, 
  Download,
  Eye,
  MousePointer
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface EarningsTrackerProps {
  totalEarnings: number;
  pendingPayouts: number;
}

// Mock earnings data
const mockEarningsHistory = [
  {
    id: '1',
    campaignTitle: 'Review Produk Kecantikan Korea',
    businessName: 'K-Beauty Store',
    amount: 3500000,
    status: 'completed' as const,
    paidDate: '2025-01-15',
    pricingModel: 'PPC' as const,
    performance: {
      views: 45000,
      clicks: 1750,
    }
  },
  {
    id: '2',
    campaignTitle: 'Promosi Aplikasi E-Commerce',
    businessName: 'ShopTech Indonesia',
    amount: 2800000,
    status: 'pending' as const,
    dueDate: '2025-01-30',
    pricingModel: 'PPV' as const,
    performance: {
      views: 85000,
    }
  },
  {
    id: '3',
    campaignTitle: 'Campaign Fashion Sustainable',
    businessName: 'EcoFashion Brand',
    amount: 4200000,
    status: 'in_progress' as const,
    progress: 65,
    pricingModel: 'PPS' as const,
    performance: {
      views: 32000,
      clicks: 1200,
      sales: 56,
    }
  },
];

export function EarningsTracker({ totalEarnings, pendingPayouts }: EarningsTrackerProps) {
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const handleWithdraw = () => {
    toast.success('Permintaan withdraw berhasil disubmit!');
    setWithdrawOpen(false);
    setWithdrawAmount('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPricingIcon = (model: string) => {
    switch (model) {
      case 'PPV': return Eye;
      case 'PPC': return MousePointer;
      case 'PPS': return ArrowUpRight;
      default: return Eye;
    }
  };

  return (
    <div className="space-y-6">
      {/* Earnings Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <TrendingUp className="h-5 w-5" />
              Total Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700">
              Rp {(totalEarnings / 1000000).toFixed(1)}M
            </div>
            <p className="text-sm text-green-600 mt-1">
              +18% dari bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Wallet className="h-5 w-5" />
              Pending Payouts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">
              Rp {(pendingPayouts / 1000000).toFixed(1)}M
            </div>
            <p className="text-sm text-blue-600 mt-1">
              Siap untuk withdraw
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Withdraw</CardTitle>
            <CardDescription>
              Tarik earnings Anda ke rekening bank
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog open={withdrawOpen} onOpenChange={setWithdrawOpen}>
              <DialogTrigger asChild>
                <Button className="w-full gradient-teal text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Withdraw
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Withdraw Earnings</DialogTitle>
                  <DialogDescription>
                    Tarik earnings Anda ke rekening bank yang terdaftar
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="withdraw-amount">Jumlah Withdraw</Label>
                    <Input
                      id="withdraw-amount"
                      type="number"
                      placeholder="5000000"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      max={pendingPayouts}
                    />
                    <p className="text-xs text-muted-foreground">
                      Maximum: Rp {pendingPayouts.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-sm">
                      <div className="font-medium text-blue-900">Bank Terdaftar:</div>
                      <div className="text-blue-800">BCA - 1234567890 (John Doe)</div>
                      <div className="text-blue-700 text-xs mt-1">Processing time: 1-2 hari kerja</div>
                    </div>
                  </div>
                  <Button onClick={handleWithdraw} className="w-full gradient-teal text-white">
                    Proses Withdraw
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      {/* Earnings History */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Earnings</CardTitle>
          <CardDescription>
            Daftar earnings dari campaign yang telah Anda kerjakan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockEarningsHistory.map((earning) => {
              const PricingIcon = getPricingIcon(earning.pricingModel);
              
              return (
                <Card key={earning.id} className="border-l-4 border-l-primary">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{earning.campaignTitle}</h4>
                          <Badge className={getStatusColor(earning.status)}>
                            {earning.status === 'completed' ? 'Selesai' : 
                             earning.status ===   'pending' ? 'Pending' : 'In Progress'}
                          </Badge>
                          <Badge variant="outline">
                            <PricingIcon className="h-3 w-3 mr-1" />
                            {earning.pricingModel}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {earning.businessName}
                        </p>
                        
                        {/* Performance Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Views</div>
                            <div className="font-medium">{earning.performance.views?.toLocaleString('id-ID') || '-'}</div>
                          </div>
                          {earning.performance.clicks && (
                            <div>
                              <div className="text-muted-foreground">Clicks</div>
                              <div className="font-medium">{earning.performance.clicks.toLocaleString('id-ID')}</div>
                            </div>
                          )}
                          {earning.performance.sales && (
                            <div>
                              <div className="text-muted-foreground">Sales</div>
                              <div className="font-medium">{earning.performance.sales}</div>
                            </div>
                          )}
                          <div>
                            <div className="text-muted-foreground">
                              {earning.status === 'completed' ? 'Paid Date' : 
                               earning.status === 'pending' ? 'Due Date' : 'Progress'}
                            </div>
                            <div className="font-medium">
                              {earning.status === 'completed' && earning.paidDate && 
                                new Date(earning.paidDate).toLocaleDateString('id-ID')
                              }
                              {earning.status === 'pending' && earning.dueDate && 
                                new Date(earning.dueDate).toLocaleDateString('id-ID')
                              }
                              {earning.status === 'in_progress' && earning.progress && 
                                `${earning.progress}%`
                              }
                            </div>
                          </div>
                        </div>

                        {earning.status === 'in_progress' && earning.progress && (
                          <div className="mt-3">
                            <Progress value={earning.progress} className="h-2" />
                          </div>
                        )}
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          Rp {earning.amount.toLocaleString('id-ID')}
                        </div>
                        {earning.status === 'in_progress' && (
                          <div className="text-sm text-muted-foreground">
                            Estimated
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}