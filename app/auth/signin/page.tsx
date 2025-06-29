'use client';

import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Building2, Users } from 'lucide-react';
import { toast } from 'sonner';

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, role: string) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const result = await signIn('credentials', {
        email,
        password,
        role,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Login failed. Please check your credentials.');
      } else {
        toast.success('Login successful!');
        // Redirect based on role
        if (role === 'business') {
          router.push('/dashboard/business');
        } else {
          router.push('/dashboard/influencer');
        }
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-12 h-12 gradient-purple rounded-lg flex items-center justify-center mr-3">
            <TrendingUp className="h-7 w-7 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900">InfluencerHub</span>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Masuk ke Akun Anda</CardTitle>
            <CardDescription>
              Pilih jenis akun dan masuk untuk mengakses dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="business" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="business" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Bisnis
                </TabsTrigger>
                <TabsTrigger value="influencer" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Influencer
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="business">
                <form onSubmit={(e) => handleSubmit(e, 'business')} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="business-email">Email</Label>
                    <Input
                      id="business-email"
                      name="email"
                      type="email"
                      placeholder="business@example.com"
                      required
                      defaultValue="demo@business.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-password">Password</Label>
                    <Input
                      id="business-password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      defaultValue="password"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full gradient-purple text-white" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Masuk...' : 'Masuk sebagai Bisnis'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="influencer">
                <form onSubmit={(e) => handleSubmit(e, 'influencer')} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="influencer-email">Email</Label>
                    <Input
                      id="influencer-email"
                      name="email"
                      type="email"
                      placeholder="influencer@example.com"
                      required
                      defaultValue="demo@influencer.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="influencer-password">Password</Label>
                    <Input
                      id="influencer-password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      defaultValue="password"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full gradient-teal text-white" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Masuk...' : 'Masuk sebagai Influencer'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>Demo credentials:</p>
              <p>Email: demo@business.com atau demo@influencer.com</p>
              <p>Password: password</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}