import { useState } from "react";
import { Search as SearchIcon, User, Calendar, FileText, CheckCircle, AlertCircle, ShieldCheck, MapPin, BadgeCheck, Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

const Search = () => {
  const [idNumber, setIdNumber] = useState("");
  const [dob, setDob] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idNumber || !dob) return;

    setIsSearching(true);
    setError("");
    setResult(null);

    // Simulated search logic based on user business requirements
    setTimeout(() => {
      // Mock data for demonstration
      if (idNumber === "12345678" || idNumber === "87654321") {
        setResult({
          name: idNumber === "12345678" ? "MARGARET WANJIKU" : "FATUMA IBRAHIM",
          id: idNumber,
          dob: dob,
          group: idNumber === "12345678" ? "TUMAINI WOMEN GROUP" : "UMOJA NI NGUVU",
          status: "VERIFIED",
          officer: "PO-4421 (Sarah Field Officer)",
          joinedDate: "FEBRUARY 15, 2024",
          location: idNumber === "12345678" ? "Nairobi Central" : "Mombasa East",
          memberId: `JM-${idNumber}-OK`
        });
      } else {
        setError("NO RECORDS FOUND. PLEASE ENSURE THE ID AND DATE OF BIRTH MATCH YOUR REGISTRATION DETAILS AS ENTERED BY THE PROGRAMME OFFICER.");
      }
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      <section className="bg-slate-950 text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/6bbaac56-f85b-4646-afd6-a335792e81b8/unity-and-strength-26910eae-1776936310932.webp" 
            alt="Bg" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <Badge className="mb-6 bg-yellow-500 text-red-950 border-none uppercase text-xs font-black tracking-widest px-8 py-2 rounded-full">Secure Verification</Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tighter leading-none">MEMBER <span className="text-yellow-400">SEARCH</span></h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-xl font-medium leading-relaxed italic border-l-4 border-red-700 pl-6">
            Enter your National ID Number and Date of Birth as registered in the system to retrieve your official membership status.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 -mt-20 relative z-20">
        <Card className="shadow-3xl border-none rounded-[3rem] overflow-hidden">
          <CardContent className="p-10 md:p-16 bg-white">
            <form onSubmit={handleSearch} className="space-y-10">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <Label htmlFor="idNumber" className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <Fingerprint size={14} className="text-red-700" /> National ID Number
                  </Label>
                  <Input 
                    id="idNumber" 
                    placeholder="e.g. 12345678" 
                    className="h-16 text-2xl font-mono font-black border-2 focus:border-red-700 focus:ring-0 rounded-2xl bg-slate-50"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="dob" className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <Calendar size={14} className="text-red-700" /> Date of Birth
                  </Label>
                  <Input 
                    id="dob" 
                    type="date" 
                    className="h-16 text-xl font-bold border-2 focus:border-red-700 focus:ring-0 rounded-2xl bg-slate-50"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full h-20 text-xl font-black uppercase tracking-widest bg-red-700 hover:bg-red-800 shadow-2xl shadow-red-900/40 gap-4 rounded-2xl transition-all hover:scale-[1.02]" disabled={isSearching}>
                {isSearching ? "ACCESSING SECURE SERVER..." : <><SearchIcon size={28} /> VERIFY MY RECORDS</>}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-20 min-h-[400px]">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-red-50 border-4 border-red-100 text-red-900 p-12 rounded-[3rem] flex flex-col items-center text-center gap-8 shadow-xl"
              >
                <div className="h-24 w-24 rounded-full bg-red-100 flex items-center justify-center text-red-700 shadow-inner">
                  <AlertCircle size={48} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-black uppercase tracking-tight">Record Not Found</h3>
                  <p className="font-bold text-lg leading-relaxed max-w-md uppercase tracking-tight text-red-800 italic">{error}</p>
                </div>
                <div className="pt-6 border-t border-red-200 w-full text-xs font-black uppercase tracking-widest text-red-400">
                  Please visit your local branch office for manual verification.
                </div>
              </motion.div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="space-y-10"
              >
                <div className="bg-green-600 text-white p-8 rounded-[2rem] flex items-center justify-center gap-6 shadow-2xl border-b-8 border-green-800">
                  <BadgeCheck size={40} className="fill-white text-green-600" />
                  <span className="text-2xl font-black uppercase tracking-[0.2em]">VERIFIED ORGANIZATION MEMBER</span>
                </div>

                <Card className="border-none shadow-3xl rounded-[3rem] overflow-hidden bg-white">
                  <CardContent className="grid md:grid-cols-2 gap-0 p-0">
                    <div className="p-12 md:p-16 space-y-12 border-b md:border-b-0 md:border-r border-slate-100">
                      <div className="space-y-3">
                        <p className="text-xs text-slate-400 font-black uppercase tracking-[0.3em]">Full Legal Name</p>
                        <p className="font-black text-4xl text-slate-900 uppercase tracking-tighter leading-none border-l-8 border-red-700 pl-6">{result.name}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-12">
                        <div className="space-y-2">
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">National ID</p>
                          <p className="font-black text-2xl text-slate-800 font-mono italic">{result.id}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Birth Date</p>
                          <p className="font-black text-2xl text-slate-800">{result.dob}</p>
                        </div>
                      </div>

                      <div className="pt-10 border-t-2 border-slate-50">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mb-6">Assigned Jurisdiction</p>
                        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl">
                          <div className="h-12 w-12 rounded-xl bg-red-700 flex items-center justify-center text-white shadow-lg">
                            <MapPin size={24} />
                          </div>
                          <div>
                            <p className="font-black text-slate-900 uppercase tracking-tight">{result.location}</p>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Regional Office</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-950 text-white p-12 md:p-16 flex flex-col justify-between relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-red-700/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                      
                      <div className="space-y-10 relative z-10">
                        <div>
                          <p className="text-xs text-yellow-500 font-black uppercase tracking-[0.3em] mb-4">Organizational Unit</p>
                          <h4 className="text-3xl font-black uppercase tracking-tight leading-tight underline decoration-red-700 decoration-4 underline-offset-8">{result.group}</h4>
                        </div>
                        
                        <div className="space-y-6 pt-6">
                          <div className="flex justify-between items-center py-4 border-b border-white/5">
                            <span className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Enrollment Status</span>
                            <Badge className="bg-green-600 text-white border-none font-black px-4 py-1.5 text-xs rounded-full">ACTIVE</Badge>
                          </div>
                          <div className="flex justify-between items-center py-4 border-b border-white/5">
                            <span className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Officer in Charge</span>
                            <span className="font-black uppercase tracking-tight text-sm text-slate-200">{result.officer}</span>
                          </div>
                          <div className="flex justify-between items-center py-4">
                            <span className="text-slate-400 font-black uppercase text-[10px] tracking-widest">System Digital ID</span>
                            <span className="font-mono font-black text-yellow-500 text-lg tracking-widest">{result.memberId}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="mt-16 border-white/20 text-white hover:bg-white hover:text-slate-950 font-black uppercase tracking-widest h-16 rounded-2xl shadow-xl transition-all relative z-10">
                        Download Digital Certificate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {!result && !error && !isSearching && (
              <div className="text-center py-32 text-slate-400">
                <div className="h-48 w-48 rounded-full bg-white shadow-2xl flex items-center justify-center mx-auto mb-10 border border-slate-50 relative">
                   <div className="absolute inset-4 border-2 border-dashed border-slate-100 rounded-full animate-[spin_20s_linear_infinite]" />
                  <SearchIcon size={64} className="opacity-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-300 uppercase tracking-[0.4em]">Ready to Verify</h3>
                <p className="font-bold mt-4 uppercase text-xs tracking-widest opacity-60">Your private data is encrypted and secure</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Search;