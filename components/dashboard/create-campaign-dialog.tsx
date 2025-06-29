'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, MousePointer, ShoppingCart, Calendar, Check } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface CreateCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateCampaignDialog({ open, onOpenChange }: CreateCampaignDialogProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    pricingModel: '',
    budget: '',
    targetViews: '',
    targetClicks: '',
    targetConversions: '',
    rate: '',
    startDate: '',
    endDate: '',
    niche: '',
    minFollowers: '',
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    // Handle campaign creation
    console.log('Creating campaign:', formData);
    toast.success('Campaign berhasil dibuat!');
    onOpenChange(false);
    setStep(1);
    setFormData({
      title: '',
      description: '',
      pricingModel: '',
      budget: '',
      targetViews: '',
      targetClicks: '',
      targetConversions: '',
      rate: '',
      startDate: '',
      endDate: '',
      niche: '',
      minFollowers: '',
    });
  };

  const handlePricingModelSelect = (model: string) => {
    setFormData({ ...formData, pricingModel: model });
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Judul Campaign</Label>
        <Input
          id="title"
          placeholder="Masukkan judul campaign"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea
          id="description"
          placeholder="Deskripsikan campaign Anda..."
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="niche">Kategori/Niche</Label>
        <Select value={formData.niche} onValueChange={(value) => setFormData({ ...formData, niche: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beauty">Beauty & Skincare</SelectItem>
            <SelectItem value="fashion">Fashion</SelectItem>
            <SelectItem value="food">Food & Beverage</SelectItem>
            <SelectItem value="tech">Technology</SelectItem>
            <SelectItem value="lifestyle">Lifestyle</SelectItem>
            <SelectItem value="fitness">Health & Fitness</SelectItem>
            <SelectItem value="travel">Travel</SelectItem>
            <SelectItem value="gaming">Gaming</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium">Pilih Model Pricing</Label>
        <div className="mt-3 space-y-3">
          {/* PPV Option */}
          <Card 
            className={cn(
              "cursor-pointer transition-all duration-200 hover:shadow-md border-2",
              formData.pricingModel === 'PPV' 
                ? "border-purple-500 bg-purple-50" 
                : "border-gray-200 hover:border-purple-300"
            )}
            onClick={() => handlePricingModelSelect('PPV')}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    formData.pricingModel === 'PPV' 
                      ? "bg-purple-500" 
                      : "bg-purple-100"
                  )}>
                    <Eye className={cn(
                      "h-5 w-5",
                      formData.pricingModel === 'PPV' ? "text-white" : "text-purple-600"
                    )} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Pay Per View (PPV)</CardTitle>
                    <CardDescription className="text-sm">
                      Bayar berdasarkan jumlah views yang didapat
                    </CardDescription>
                  </div>
                </div>
                {formData.pricingModel === 'PPV' && (
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-sm text-muted-foreground">
                Cocok untuk brand awareness dan reach maksimal
              </div>
            </CardContent>
          </Card>

          {/* PPC Option */}
          <Card 
            className={cn(
              "cursor-pointer transition-all duration-200 hover:shadow-md border-2",
              formData.pricingModel === 'PPC' 
                ? "border-teal-500 bg-teal-50" 
                : "border-gray-200 hover:border-teal-300"
            )}
            onClick={() => handlePricingModelSelect('PPC')}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    formData.pricingModel === 'PPC' 
                      ? "bg-teal-500" 
                      : "bg-teal-100"
                  )}>
                    <MousePointer className={cn(
                      "h-5 w-5",
                      formData.pricingModel === 'PPC' ? "text-white" : "text-teal-600"
                    )} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Pay Per Click (PPC)</CardTitle>
                    <CardDescription className="text-sm">
                      Bayar berdasarkan klik ke website/landing page
                    </CardDescription>
                  </div>
                </div>
                {formData.pricingModel === 'PPC' && (
                  <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-sm text-muted-foreground">
                Fokus pada traffic berkualitas dan engagement
              </div>
            </CardContent>
          </Card>

          {/* PPS Option */}
          <Card 
            className={cn(
              "cursor-pointer transition-all duration-200 hover:shadow-md border-2",
              formData.pricingModel === 'PPS' 
                ? "border-amber-500 bg-amber-50" 
                : "border-gray-200 hover:border-amber-300"
            )}
            onClick={() => handlePricingModelSelect('PPS')}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    formData.pricingModel === 'PPS' 
                      ? "bg-amber-500" 
                      : "bg-amber-100"
                  )}>
                    <ShoppingCart className={cn(
                      "h-5 w-5",
                      formData.pricingModel === 'PPS' ? "text-white" : "text-amber-600"
                    )} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Pay Per Sale (PPS)</CardTitle>
                    <CardDescription className="text-sm">
                      Bayar berdasarkan penjualan yang terjadi
                    </CardDescription>
                  </div>
                </div>
                {formData.pricingModel === 'PPS' && (
                  <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-sm text-muted-foreground">
                Risk-free untuk bisnis, bayar hanya saat ada penjualan
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {formData.pricingModel && (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
          <h4 className="font-medium text-gray-900">Budget & Rate Settings</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Total Budget (Rp)</Label>
              <Input
                id="budget"
                type="number"
                placeholder="5000000"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">
                Rate per {formData.pricingModel === 'PPV' ? '1K Views' : formData.pricingModel === 'PPC' ? 'Click' : 'Sale'} (Rp)
              </Label>
              <Input
                id="rate"
                type="number"
                placeholder={formData.pricingModel === 'PPV' ? '100' : formData.pricingModel === 'PPC' ? '1500' : '50000'}
                value={formData.rate}
                onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
              />
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {formData.pricingModel === 'PPV' && "Recommended rate: Rp 50-500 per 1K views"}
            {formData.pricingModel === 'PPC' && "Recommended rate: Rp 500-2,000 per click"}
            {formData.pricingModel === 'PPS' && "Recommended rate: 5-20% commission per sale"}
          </div>
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="targetViews">Target Views</Label>
        <Input
          id="targetViews"
          type="number"
          placeholder="100000"
          value={formData.targetViews}
          onChange={(e) => setFormData({ ...formData, targetViews: e.target.value })}
        />
      </div>

      {(formData.pricingModel === 'PPC' || formData.pricingModel === 'PPS') && (
        <div className="space-y-2">
          <Label htmlFor="targetClicks">Target Clicks</Label>
          <Input
            id="targetClicks"
            type="number"
            placeholder="5000"
            value={formData.targetClicks}
            onChange={(e) => setFormData({ ...formData, targetClicks: e.target.value })}
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Tanggal Mulai</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">Tanggal Selesai</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="minFollowers">Minimum Followers</Label>
        <Select value={formData.minFollowers} onValueChange={(value) => setFormData({ ...formData, minFollowers: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih minimum followers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1000">1K - 10K (Nano)</SelectItem>
            <SelectItem value="10000">10K - 100K (Micro)</SelectItem>
            <SelectItem value="100000">100K+ (Macro)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Campaign Summary */}
      {formData.pricingModel && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2">Campaign Summary</h4>
          <div className="space-y-1 text-sm text-blue-800">
            <div>Model: {formData.pricingModel}</div>
            <div>Budget: Rp {formData.budget ? parseInt(formData.budget).toLocaleString('id-ID') : '0'}</div>
            <div>Target Views: {formData.targetViews ? parseInt(formData.targetViews).toLocaleString('id-ID') : '0'}</div>
            {formData.rate && (
              <div>
                Rate: Rp {parseInt(formData.rate).toLocaleString('id-ID')} per {
                  formData.pricingModel === 'PPV' ? '1K views' : 
                  formData.pricingModel === 'PPC' ? 'click' : 'sale'
                }
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const canProceed = () => {
    if (step === 1) {
      return formData.title && formData.description && formData.niche;
    }
    if (step === 2) {
      return formData.pricingModel && formData.budget && formData.rate;
    }
    if (step === 3) {
      return formData.targetViews && formData.startDate && formData.endDate && formData.minFollowers;
    }
    return false;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Buat Campaign Baru</DialogTitle>
          <DialogDescription>
            Step {step} dari 3: {step === 1 ? 'Informasi Dasar' : step === 2 ? 'Model Pricing' : 'Target & Timeline'}
          </DialogDescription>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-2 py-4">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                step >= stepNumber 
                  ? "bg-primary text-white" 
                  : "bg-gray-200 text-gray-600"
              )}>
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={cn(
                  "w-12 h-0.5 mx-2",
                  step > stepNumber ? "bg-primary" : "bg-gray-200"
                )} />
              )}
            </div>
          ))}
        </div>

        <div className="py-4">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>

        <div className="flex justify-between pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={step === 1}
          >
            Sebelumnya
          </Button>
          
          {step < 3 ? (
            <Button 
              onClick={handleNext} 
              className="gradient-purple text-white"
              disabled={!canProceed()}
            >
              Selanjutnya
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              className="gradient-purple text-white"
              disabled={!canProceed()}
            >
              Buat Campaign
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}