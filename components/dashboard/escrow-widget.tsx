'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Wallet, Plus, ArrowUpRight, ArrowDownRight, Shield, AlertTriangle } from 'lucide-react';
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

interface EscrowWidgetProps {
  balance: number;
}

export function EscrowWidget({ balance }: EscrowWidgetProps) {
  const [topUpOpen, setTopUpOpen] = useState(false);
  const [amount, setAmount] = useState('');

  const allocatedFunds = 8500000; // Mock allocated funds
  const availableFunds = balance - allocatedFunds;

  const handleTopUp = () => {
    // Handle top-up logic
    console.log('Top up:', amount);
    setTopUpOpen(false);
    setAmount('');
  };

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-teal-50 border-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 gradient-purple rounded-lg flex items-center justify-center">
                <Wallet className="h-4 w-4 text-white" />
              </div>
              Escrow Wallet
            </CardTitle>
            <CardDescription>
              Dana aman dengan verifikasi KYC dan sistem escrow
            </CardDescription>
          </div>
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <Shield className="h-3 w-3 mr-1" />
            KYC Verified
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Balance Overview */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-primary">
                Rp {(balance / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-muted-foreground">Total Balance</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-amber-600">
                Rp {(allocatedFunds / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-muted-foreground">Allocated</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-green-600">
                Rp {(availableFunds / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-muted-foreground">Available</div>
            </div>
          </div>

          {/* Fund Allocation Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Fund Allocation</span>
              <span>{((allocatedFunds / balance) * 100).toFixed(0)}% allocated</span>
            </div>
            <Progress value={(allocatedFunds / balance) * 100} className="h-2" />
          </div>

          {/* Recent Transactions */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Recent Transactions</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <ArrowDownRight className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Top-up via Xendit</div>
                    <div className="text-xs text-muted-foreground">2 jam yang lalu</div>
                  </div>
                </div>
                <div className="text-sm font-medium text-green-600">
                  +Rp 5,000,000
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <ArrowUpRight className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Campaign: Beauty Herbal</div>
                    <div className="text-xs text-muted-foreground">1 hari yang lalu</div>
                  </div>
                </div>
                <div className="text-sm font-medium text-purple-600">
                  -Rp 2,500,000
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Dialog open={topUpOpen} onOpenChange={setTopUpOpen}>
              <DialogTrigger asChild>
                <Button className="flex-1 gradient-purple text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Top Up
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Top Up Escrow Wallet</DialogTitle>
                  <DialogDescription>
                    Tambahkan dana ke wallet escrow Anda dengan pembayaran aman via Xendit
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Jumlah Top Up</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="1000000"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                      <div className="text-sm">
                        <div className="font-medium text-amber-800">Minimum top-up: Rp 100,000</div>
                        <div className="text-amber-700">Biaya admin: Rp 2,500 per transaksi</div>
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleTopUp} className="w-full gradient-purple text-white">
                    Lanjutkan ke Pembayaran
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" className="flex-1">
              Riwayat Transaksi
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}