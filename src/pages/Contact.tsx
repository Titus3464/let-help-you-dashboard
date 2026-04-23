import { Phone, Mail, MapPin, Send, MessageSquare, Clock, Globe, ShieldQuestion, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("COMMUNICATION RECEIVED: Our team will respond via email within 24 working hours.");
  };

  return (
    <div className="pb-32 bg-slate-50 font-sans overflow-hidden">
      {/* Dynamic Header */}
      <section className="bg-green-900 text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/6bbaac56-f85b-4646-afd6-a335792e81b8/women-community-meeting-583df1bd-1776936311285.webp" 
            alt="Contact Bg" 
            className="w-full h-full object-cover opacity-10 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-950 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Sparkles className="text-yellow-400" size={24} />
            <Badge className="bg-yellow-500 text-green-950 border-none uppercase text-[10px] font-black tracking-[0.4em] px-8 py-2 rounded-full shadow-lg">Global Reach</Badge>
          </div>
          <h1 className="text-6xl md:text-9xl font-black mb-8 uppercase tracking-tighter leading-none">LET'S <br/><span className="text-yellow-400">CONNECT</span></h1>
          <p className="text-green-50 max-w-3xl mx-auto text-xl md:text-2xl font-medium leading-relaxed italic border-x-4 border-yellow-500/30 px-10">
            Have a question about group registration, membership status, or regional outreach? Our support team is standing by to assist you.
          </p>
        </div>
      </section>

      <section className="py-24 -mt-20 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Contact Info - High Impact Cards */}
            <div className="lg:col-span-1 space-y-10">
              <div className="bg-white p-12 rounded-[4rem] shadow-3xl border border-slate-100 space-y-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[4rem]" />
                <h3 className="text-3xl font-black uppercase tracking-tight text-slate-950 relative z-10">Direct Support</h3>
                
                <div className="space-y-10 relative z-10">
                  <div className="flex items-start gap-8 group">
                    <div className="h-16 w-16 rounded-3xl bg-red-50 flex items-center justify-center text-red-700 group-hover:bg-red-700 group-hover:text-white transition-all shadow-inner">
                      <MapPin size={28} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Regional HQ</p>
                      <p className="font-black text-slate-900 uppercase tracking-tight text-lg">Empowerment Plaza</p>
                      <p className="text-slate-500 font-bold italic">Kilimani, Nairobi, Kenya</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-8 group">
                    <div className="h-16 w-16 rounded-3xl bg-green-50 flex items-center justify-center text-green-700 group-hover:bg-green-700 group-hover:text-white transition-all shadow-inner">
                      <Mail size={28} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Email Desk</p>
                      <p className="font-black text-slate-900 uppercase tracking-tight text-lg">info@jamiimoja.org</p>
                      <p className="text-slate-500 font-bold italic">24/7 Monitoring</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-8 group">
                    <div className="h-16 w-16 rounded-3xl bg-yellow-50 flex items-center justify-center text-yellow-600 group-hover:bg-yellow-500 group-hover:text-red-950 transition-all shadow-inner">
                      <Phone size={28} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Hotline</p>
                      <p className="font-black text-slate-900 uppercase tracking-tight text-lg">+254 700 000 000</p>
                      <p className="text-slate-500 font-bold italic">Mon-Fri: 8am - 5pm</p>
                    </div>
                  </div>
                </div>

                <div className="pt-10 border-t border-slate-50 flex justify-between items-center relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Social Connect</span>
                  <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-xl bg-slate-900 flex items-center justify-center text-white hover:bg-red-700 transition-colors cursor-pointer shadow-lg">
                      <Globe size={20} />
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-slate-900 flex items-center justify-center text-white hover:bg-red-700 transition-colors cursor-pointer shadow-lg">
                      <MessageSquare size={20} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Card */}
              <div className="bg-red-950 text-white p-12 rounded-[4rem] shadow-3xl space-y-8 relative overflow-hidden group">
                <div className="absolute -right-16 -top-16 w-48 h-48 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
                <div className="flex items-center gap-5">
                  <div className="h-12 w-12 rounded-2xl bg-yellow-500 flex items-center justify-center text-red-950">
                    <Clock size={28} />
                  </div>
                  <h4 className="text-2xl font-black uppercase tracking-tight">Active Hours</h4>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-red-300 font-black uppercase text-[10px] tracking-widest">Weekday Operations</span>
                    <span className="font-black uppercase tracking-tight">08:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-red-300 font-black uppercase text-[10px] tracking-widest">Saturday Service</span>
                    <span className="font-black uppercase tracking-tight">09:00 - 13:00</span>
                  </div>
                  <div className="flex justify-between items-center text-yellow-500 italic">
                    <span className="font-black uppercase text-[10px] tracking-widest">Public Holidays</span>
                    <span className="font-black uppercase tracking-tight underline">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form - Massive Impact */}
            <Card className="lg:col-span-2 shadow-3xl border-none rounded-[4rem] overflow-hidden">
              <CardContent className="p-12 md:p-20 bg-white">
                <div className="mb-16 space-y-4">
                  <Badge className="bg-slate-100 text-slate-500 border-none font-black text-[10px] px-4 py-1.5 uppercase tracking-widest">Digital Dispatch</Badge>
                  <h3 className="text-5xl font-black uppercase tracking-tighter text-slate-950">Send an Official Inquiry</h3>
                  <p className="text-slate-400 text-xl font-medium italic border-l-4 border-red-700 pl-6">Please use this channel for formal organizational correspondence.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12">
                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Official Name</Label>
                      <Input placeholder="Enter your full name" className="h-16 border-2 border-slate-50 bg-slate-50 rounded-2xl focus:border-red-700 focus:bg-white font-bold text-lg px-6 transition-all" required />
                    </div>
                    <div className="space-y-4">
                      <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Communication Email</Label>
                      <Input type="email" placeholder="email@example.com" className="h-16 border-2 border-slate-50 bg-slate-50 rounded-2xl focus:border-red-700 focus:bg-white font-bold text-lg px-6 transition-all" required />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Inquiry Category</Label>
                    <select className="flex h-16 w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-6 py-2 text-lg font-bold uppercase focus:border-red-700 focus:bg-white outline-none transition-all">
                      <option>Group Registration Inquiry</option>
                      <option>Member Status Dispute</option>
                      <option>Field Officer Support</option>
                      <option>Partnership Proposal</option>
                      <option>Other / General</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Detailed Message Brief</Label>
                    <Textarea placeholder="How can we empower you today?" className="min-h-[250px] border-2 border-slate-50 bg-slate-50 rounded-[3rem] focus:border-red-700 focus:bg-white font-medium text-lg p-10 transition-all" required />
                  </div>
                  <div className="pt-6">
                    <Button type="submit" className="w-full h-24 gap-4 text-2xl font-black uppercase tracking-widest bg-red-700 hover:bg-slate-950 shadow-3xl rounded-3xl transition-all transform hover:scale-[1.01]">
                      <Send size={32} /> Dispatch Communications
                    </Button>
                    <p className="mt-8 text-center text-slate-300 text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3">
                      <ShieldQuestion size={14} /> Encrypted and Secure Channel
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;