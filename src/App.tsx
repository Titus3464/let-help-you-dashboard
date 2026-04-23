import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { 
  Users, 
  Search as SearchIcon, 
  Image as ImageIcon, 
  Info, 
  Phone, 
  LogIn, 
  LayoutDashboard, 
  Menu, 
  X,
  LogOut,
  Mail,
  MapPin,
  ShieldCheck,
  Zap,
  Award,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Search from "./pages/Search";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import PODashboard from "./pages/PODashboard";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<{ role: 'admin' | 'po', name: string, officerNo?: string } | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    setUser(null);
    toast.info("Session Terminated: Logged out successfully");
  };

  const LOGO_URL = "https://storage.googleapis.com/dala-prod-public-storage/attachments/5d0ddfbb-0eba-41f3-bc89-3499dc26abd1/1776935167124_WhatsApp_Image_2026-04-23_at_10.38.12.jpeg";

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-red-700 selection:text-white">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b-4 border-red-700 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-24 items-center">
              <Link to="/" className="flex items-center gap-4 group">
                <div className="bg-white p-2 rounded-2xl border-2 border-slate-100 shadow-lg overflow-hidden flex items-center justify-center transform group-hover:scale-105 transition-all">
                  <img 
                    src={LOGO_URL} 
                    alt="Jamii Moja Logo" 
                    className="h-14 w-auto object-contain"
                  />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-2xl font-black text-slate-950 tracking-tighter leading-none uppercase">JAMII <span className="text-red-700">MOJA</span></h1>
                  <p className="text-[9px] text-green-700 font-black uppercase tracking-[0.4em] mt-1">Women Empowerment Org</p>
                </div>
              </Link>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center space-x-10">
                <Link to="/" className="text-[10px] font-black uppercase text-slate-500 hover:text-red-700 transition-colors tracking-widest border-b-2 border-transparent hover:border-red-700 pb-1">Home</Link>
                <Link to="/about" className="text-[10px] font-black uppercase text-slate-500 hover:text-red-700 transition-colors tracking-widest border-b-2 border-transparent hover:border-red-700 pb-1">Our Story</Link>
                <Link to="/gallery" className="text-[10px] font-black uppercase text-slate-500 hover:text-red-700 transition-colors tracking-widest border-b-2 border-transparent hover:border-red-700 pb-1">Archives</Link>
                <Link to="/contact" className="text-[10px] font-black uppercase text-slate-500 hover:text-red-700 transition-colors tracking-widest border-b-2 border-transparent hover:border-red-700 pb-1">Connect</Link>
                <Link to="/search" className="flex items-center gap-3 text-[10px] font-black uppercase text-white bg-green-700 px-6 py-3 rounded-xl hover:bg-slate-950 transition-all shadow-xl shadow-green-900/20 tracking-widest">
                  <SearchIcon size={14} className="animate-pulse" /> Verify Member
                </Link>
                
                {user ? (
                  <div className="flex items-center gap-5 pl-8 border-l-2 border-slate-100">
                    <Link to={user.role === 'admin' ? '/admin' : '/po'}>
                      <Button variant="default" size="sm" className="gap-2 bg-slate-950 hover:bg-red-700 shadow-2xl font-black uppercase text-[10px] tracking-widest rounded-xl h-12 px-6">
                        {user.role === 'admin' ? <ShieldCheck size={16} /> : <Zap size={16} />} Dashboard
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-300 hover:text-red-600 hover:bg-red-50 h-12 w-12 rounded-xl p-0 border border-slate-100">
                      <LogOut size={18} />
                    </Button>
                  </div>
                ) : (
                  <Link to="/login">
                    <Button size="sm" className="gap-2 bg-red-700 hover:bg-slate-950 shadow-2xl px-8 font-black uppercase text-[10px] tracking-widest rounded-xl h-12 border-b-4 border-red-900 active:border-b-0 transition-all">
                      <LogIn size={16} /> Staff Login
                    </Button>
                  </Link>
                )}
              </div>

              {/* Mobile Toggle */}
              <button className="md:hidden p-3 text-slate-950 bg-slate-100 rounded-2xl shadow-inner active:scale-95 transition-all" onClick={toggleMenu}>
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t-2 border-red-50 bg-white p-8 space-y-6 animate-in slide-in-from-top duration-500 shadow-2xl relative z-50">
              <Link to="/" onClick={toggleMenu} className="block text-sm font-black text-slate-950 uppercase tracking-widest hover:text-red-700 transition-colors">Home</Link>
              <Link to="/about" onClick={toggleMenu} className="block text-sm font-black text-slate-950 uppercase tracking-widest hover:text-red-700 transition-colors">Our Identity</Link>
              <Link to="/gallery" onClick={toggleMenu} className="block text-sm font-black text-slate-950 uppercase tracking-widest hover:text-red-700 transition-colors">Public Archive</Link>
              <Link to="/contact" onClick={toggleMenu} className="block text-sm font-black text-slate-950 uppercase tracking-widest hover:text-red-700 transition-colors">Contact Support</Link>
              <Link to="/search" onClick={toggleMenu} className="block text-sm font-black text-green-700 uppercase tracking-widest border-l-4 border-green-700 pl-4">Member Search</Link>
              <div className="pt-8 border-t-2 border-slate-50">
                {user ? (
                  <div className="space-y-4">
                    <Link to={user.role === 'admin' ? '/admin' : '/po'} onClick={toggleMenu} className="block">
                      <Button className="w-full justify-center gap-3 bg-slate-950 h-14 uppercase font-black text-xs tracking-widest rounded-2xl">
                        {user.role === 'admin' ? <ShieldCheck size={20} /> : <Zap size={20} />} Access Dashboard
                      </Button>
                    </Link>
                    <Button variant="outline" onClick={() => { handleLogout(); toggleMenu(); }} className="w-full justify-center gap-3 border-red-200 text-red-700 h-14 uppercase font-black text-xs tracking-widest rounded-2xl">
                      <LogOut size={20} /> Terminate Session
                    </Button>
                  </div>
                ) : (
                  <Link to="/login" onClick={toggleMenu}>
                    <Button className="w-full gap-3 bg-red-700 h-16 text-sm font-black uppercase tracking-widest rounded-2xl shadow-xl">
                      <LogIn size={20} /> Secure Staff Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          )}
        </nav>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login onLogin={(role, name, officerNo) => setUser({ role, name, officerNo })} />} />
            <Route 
              path="/admin/*" 
              element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/po/*" 
              element={user?.role === 'po' ? <PODashboard /> : <Navigate to="/login" />} 
            />
          </Routes>
        </main>

        <footer className="bg-slate-950 text-white pt-24 pb-12 px-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-red-700" />
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
            <div className="col-span-1 md:col-span-2 space-y-8">
              <div className="flex items-center gap-5">
                <div className="bg-white p-2 rounded-2xl shadow-xl">
                  <img 
                    src={LOGO_URL} 
                    alt="Jamii Moja Logo" 
                    className="h-16 w-auto"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tighter uppercase leading-none">JAMII <span className="text-red-700">MOJA</span></h2>
                  <p className="text-[10px] text-green-500 font-black uppercase tracking-[0.4em] mt-1 italic">Women Empowerment</p>
                </div>
              </div>
              <p className="text-slate-400 text-lg max-w-lg leading-relaxed font-medium italic border-l-4 border-slate-800 pl-8">
                Empowering the community through structured solidarity and digital innovation. Together, we are building a foundation for economic independence across generations.
              </p>
              <div className="flex gap-4">
                 {[Globe, Mail, Phone].map((Icon, i) => (
                   <div key={i} className="h-12 w-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-red-700 transition-all cursor-pointer">
                      <Icon size={20} />
                   </div>
                 ))}
              </div>
            </div>
            
            <div className="space-y-8">
              <h3 className="font-black text-yellow-500 text-xs uppercase tracking-[0.4em] mb-4">Core Sections</h3>
              <ul className="space-y-4 text-xs text-slate-400 font-black uppercase tracking-[0.2em]">
                <li><Link to="/about" className="hover:text-red-500 transition-colors flex items-center gap-3"><Award size={14} /> Our Mission</Link></li>
                <li><Link to="/gallery" className="hover:text-red-500 transition-colors flex items-center gap-3"><ImageIcon size={14} /> Public Archive</Link></li>
                <li><Link to="/search" className="hover:text-red-500 transition-colors flex items-center gap-3"><SearchIcon size={14} /> Member Verification</Link></li>
                <li><Link to="/login" className="hover:text-red-500 transition-colors flex items-center gap-3"><LogIn size={14} /> Secure Staff Access</Link></li>
              </ul>
            </div>

            <div className="space-y-8">
              <h3 className="font-black text-yellow-500 text-xs uppercase tracking-[0.4em] mb-4">Communication</h3>
              <ul className="space-y-6 text-xs text-slate-400 font-black uppercase tracking-[0.2em]">
                <li className="flex items-start gap-4"><Mail size={18} className="text-red-700" /> info@jamiimoja.org</li>
                <li className="flex items-start gap-4"><Phone size={18} className="text-red-700" /> +254 700 000 000</li>
                <li className="flex items-start gap-4"><MapPin size={18} className="text-red-700" /> Nairobi, Kenya <br/><span className="text-[10px] text-slate-600 mt-1 block tracking-normal normal-case italic">Empowerment Plaza, 4th Floor</span></li>
              </ul>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto border-t-2 border-slate-900 mt-20 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-slate-500 uppercase tracking-[0.4em] font-black">
            <p>© {new Date().getFullYear()} Jamii Moja Organization. All Rights Reserved.</p>
            <div className="flex gap-10">
              <a href="#" className="hover:text-white transition-colors">Privacy Charter</a>
              <a href="#" className="hover:text-white transition-colors">Legal Framework</a>
            </div>
          </div>
        </footer>
        <Toaster position="top-center" richColors />
      </div>
    </Router>
  );
};

export default App;