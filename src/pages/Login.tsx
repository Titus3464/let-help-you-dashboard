import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, Shield, Users, Lock, ChevronRight, Fingerprint, Zap, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface LoginProps {
  onLogin: (role: 'admin' | 'po', name: string, officerNo?: string) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin('admin', 'Head Office Administrator');
      toast.success("Welcome back to HQ, Administrator");
      navigate('/admin');
      setIsLoading(false);
    }, 1200);
  };

  const handlePOLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const poNumber = formData.get('poNumber') as string;
    
    setIsLoading(true);
    setTimeout(() => {
      onLogin('po', 'Sarah Field Officer', poNumber);
      toast.success(`Access Granted: Welcome back, Officer ${poNumber}`);
      navigate('/po');
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* High-Impact Background */}
      <div className="absolute top-0 left-0 w-full h-4 bg-red-700 shadow-2xl z-20" />
      <div className="absolute -left-40 -bottom-40 w-[600px] h-[600px] bg-red-100 rounded-full blur-[150px] opacity-40 animate-pulse" />
      <div className="absolute -right-40 -top-40 w-[600px] h-[600px] bg-green-100 rounded-full blur-[150px] opacity-40 animate-pulse" />

      <div className="w-full max-w-2xl relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block bg-white p-4 rounded-[2rem] shadow-2xl border border-slate-100 mb-6 transform hover:rotate-6 transition-transform">
            <img 
              src="https://storage.googleapis.com/dala-prod-public-storage/attachments/5d0ddfbb-0eba-41f3-bc89-3499dc26abd1/1776935167124_WhatsApp_Image_2026-04-23_at_10.38.12.jpeg" 
              alt="Logo" 
              className="h-24 w-auto object-contain"
            />
          </div>
          <h1 className="text-5xl font-black text-slate-950 uppercase tracking-tighter leading-none">SECURE <br/><span className="text-red-700">PORTAL ACCESS</span></h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Authorized Jamii Moja Personnel Only</p>
        </div>

        <Tabs defaultValue="admin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-10 h-20 bg-slate-200/50 p-2 rounded-3xl backdrop-blur-md">
            <TabsTrigger value="admin" className="rounded-2xl data-[state=active]:bg-white data-[state=active]:shadow-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 transition-all">
              <Shield size={18} className="text-red-700" /> Administrative
            </TabsTrigger>
            <TabsTrigger value="po" className="rounded-2xl data-[state=active]:bg-white data-[state=active]:shadow-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 transition-all">
              <Zap size={18} className="text-green-700" /> Field Officer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="admin">
            <Card className="border-none shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] rounded-[3rem] overflow-hidden">
              <div className="bg-slate-950 text-white p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Shield size={120} />
                </div>
                <CardTitle className="text-3xl font-black uppercase tracking-tight mb-2">HQ Systems Access</CardTitle>
                <CardDescription className="text-slate-400 font-medium italic">Full administrative override and oversight privileges.</CardDescription>
              </div>
              <CardContent className="p-12 bg-white">
                <form onSubmit={handleAdminLogin} className="space-y-8">
                  <div className="space-y-3">
                    <Label className="font-black uppercase text-[10px] tracking-widest text-slate-500 ml-1">Official Email Address</Label>
                    <Input type="email" placeholder="admin@jamiimoja.org" className="h-16 border-2 focus:border-red-700 rounded-2xl font-bold bg-slate-50 px-6 text-lg" required />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center px-1">
                      <Label className="font-black uppercase text-[10px] tracking-widest text-slate-500">Access Password</Label>
                      <button type="button" className="text-[10px] font-black text-red-700 uppercase tracking-widest hover:underline">Forgot Key?</button>
                    </div>
                    <div className="relative">
                      <Input type="password" placeholder="••••••••" className="h-16 border-2 focus:border-red-700 rounded-2xl px-6 font-black tracking-widest bg-slate-50" required />
                      <Lock className="absolute right-6 top-5 text-slate-300" size={24} />
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-20 text-xl font-black uppercase tracking-widest bg-slate-950 hover:bg-red-800 shadow-2xl rounded-2xl mt-4 transition-all" disabled={isLoading}>
                    {isLoading ? "AUTHENTICATING..." : <span className="flex items-center gap-3">ENTER HQ SYSTEM <ChevronRight size={24} /></span>}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="po">
            <Card className="border-none shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] rounded-[3rem] overflow-hidden">
              <div className="bg-red-800 text-white p-12 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Fingerprint size={120} />
                </div>
                <CardTitle className="text-3xl font-black uppercase tracking-tight mb-2">Field Portal Access</CardTitle>
                <CardDescription className="text-red-100 font-medium italic">Programme Officer login for jurisdiction management.</CardDescription>
              </div>
              <CardContent className="p-12 bg-white">
                <form onSubmit={handlePOLogin} className="space-y-8">
                  <div className="space-y-3">
                    <Label className="font-black uppercase text-[10px] tracking-widest text-slate-500 ml-1">Assigned Officer Number</Label>
                    <Input name="poNumber" placeholder="PO-XXXX" className="h-16 border-2 focus:border-red-700 rounded-2xl font-black text-2xl uppercase tracking-widest bg-slate-50 px-6 text-red-700" required />
                  </div>
                  <div className="space-y-3">
                    <Label className="font-black uppercase text-[10px] tracking-widest text-slate-500 ml-1">National ID (Registered)</Label>
                    <div className="relative">
                      <Input name="poID" placeholder="National ID Number" className="h-16 border-2 focus:border-red-700 rounded-2xl px-6 font-black font-mono text-2xl bg-slate-50" required />
                      <Users className="absolute right-6 top-5 text-slate-300" size={24} />
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-20 text-xl font-black uppercase tracking-widest bg-red-700 hover:bg-slate-950 shadow-2xl rounded-2xl mt-4 transition-all" disabled={isLoading}>
                    {isLoading ? "VERIFYING CREDENTIALS..." : <span className="flex items-center gap-3">OPEN FIELD PORTAL <ChevronRight size={24} /></span>}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-16 flex flex-col items-center space-y-6">
          <div className="flex items-center gap-3 bg-red-50 px-6 py-2 rounded-full border border-red-100">
            <ShieldAlert size={14} className="text-red-700" />
            <span className="text-[10px] font-black uppercase tracking-widest text-red-900">End-to-End Encrypted Session</span>
          </div>
          <p className="text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
            Unauthorized Access is a Criminal Offense • © {new Date().getFullYear()} Jamii Moja Organization
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;