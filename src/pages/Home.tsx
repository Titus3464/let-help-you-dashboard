import { motion } from "framer-motion";
import { Users, ShieldCheck, Heart, ArrowRight, CheckCircle, Globe, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const groupNames = [
  "Tumaini Women Group",
  "Umoja ni Nguvu",
  "Neema Community Circle",
  "Amani Empowerment Hub",
  "Upendo Sisters Network",
  "Juhudi Development Group",
  "Mwangaza Women's Unity",
  "Kujitolea Community Link",
  "Zinduka Sacco",
  "Bahati Sisters",
  "Pamoja Women Development",
  "Kazi na Bidii Group",
  "Wema Charity Network",
  "Imara Women Solidarity"
];

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/6bbaac56-f85b-4646-afd6-a335792e81b8/women-community-meeting-583df1bd-1776936311285.webp" 
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-950/95 via-red-900/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="text-yellow-400" size={20} />
              <Badge variant="outline" className="border-yellow-400 text-yellow-400 bg-yellow-500/10 backdrop-blur-sm px-4 py-1.5 uppercase tracking-widest text-[10px] font-black">
                Unity • Strength • Empowerment
              </Badge>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[1] uppercase tracking-tighter">
              JAMII <span className="text-yellow-400">MOJA</span>
            </h1>
            <p className="text-xl md:text-2xl font-black mb-8 text-slate-100 uppercase tracking-widest border-l-4 border-green-600 pl-6">
              Women Empowerment Organization
            </p>
            <p className="text-lg md:text-xl text-slate-200 mb-10 leading-relaxed font-medium max-w-xl">
              Building a future where every woman is economically independent through structured community solidarity and digital inclusion.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/login">
                <Button size="lg" className="px-10 h-16 text-lg bg-green-700 hover:bg-green-800 text-white border-none shadow-2xl shadow-green-900/40 font-black uppercase tracking-widest rounded-xl">
                  Get Started
                </Button>
              </Link>
              <Link to="/search">
                <Button size="lg" variant="outline" className="px-10 h-16 text-lg bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white hover:text-red-950 transition-all font-black uppercase tracking-widest rounded-xl">
                  Member Search
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Animated Group Names Marquee - As requested by user */}
      <section className="bg-red-800 py-14 overflow-hidden relative border-y-8 border-yellow-500 shadow-2xl z-20">
        <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-red-800 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-red-800 to-transparent z-10" />
        
        <div className="flex whitespace-nowrap">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
            className="flex items-center gap-24 text-2xl md:text-4xl font-black text-white uppercase tracking-[0.3em] py-2"
          >
            {[...groupNames, ...groupNames].map((name, i) => (
              <span key={i} className="flex items-center gap-10">
                <Zap className="text-yellow-400 fill-yellow-400" size={24} />
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-50 rounded-full blur-[100px] -mr-48 -mt-48 opacity-60" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-yellow-50 rounded-[3rem] -rotate-3 border-2 border-yellow-100 shadow-inner" />
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/6bbaac56-f85b-4646-afd6-a335792e81b8/unity-and-strength-26910eae-1776936310932.webp" 
                alt="Empowerment"
                className="relative z-10 rounded-[3rem] shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-red-700 text-white p-8 rounded-3xl z-20 shadow-xl hidden lg:block">
                <p className="text-4xl font-black">100%</p>
                <p className="text-[10px] font-bold uppercase tracking-widest mt-1">Community Focused</p>
              </div>
            </motion.div>
            
            <div className="space-y-10">
              <div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest mb-6">Our Impact</Badge>
                <h2 className="text-5xl font-black text-slate-900 leading-tight uppercase tracking-tight">
                  Bridging the Gap through <span className="text-green-700 underline decoration-yellow-500 decoration-8 underline-offset-8">Group Solidarity</span>
                </h2>
              </div>
              <p className="text-lg text-slate-600 leading-relaxed font-medium italic border-l-4 border-red-200 pl-6">
                Jamii Moja (One Community) organizes women into structured groups, providing digital registration and assigning dedicated Programme Officers for direct field support.
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="bg-slate-50 p-8 rounded-[2rem] border-b-4 border-red-700 hover:bg-white hover:shadow-xl transition-all">
                  <p className="text-4xl font-black text-slate-900">150+</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Active Groups</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-[2rem] border-b-4 border-green-700 hover:bg-white hover:shadow-xl transition-all">
                  <p className="text-4xl font-black text-slate-900">12k+</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Members Enrolled</p>
                </div>
              </div>
              <Button asChild variant="outline" className="h-14 px-8 border-2 border-red-700 text-red-700 hover:bg-red-700 hover:text-white font-black uppercase tracking-widest rounded-xl">
                <Link to="/about">Our Journey <ArrowRight size={20} className="ml-2" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 bg-slate-50 relative border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
             <h3 className="text-yellow-600 font-black uppercase tracking-[0.3em] text-xs">The Ecosystem</h3>
            <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tight">How the System Works</h2>
            <div className="h-2 w-32 bg-red-700 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                icon: <Users size={40} />, 
                title: "1. Admin Oversight", 
                desc: "High-level management of groups, officers, and verification of all field data." 
              },
              { 
                icon: <Zap size={40} />, 
                title: "2. Field Operations", 
                desc: "Programme Officers manage enrollment and guidance within their assigned community jurisdictions." 
              },
              { 
                icon: <ShieldCheck size={40} />, 
                title: "3. Public Verification", 
                desc: "Members can securely access their status and records via the public verification portal." 
              }
            ].map((feat, i) => (
              <div key={i} className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100 hover:border-green-200 hover:shadow-2xl transition-all group relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-24 h-24 bg-slate-50 rounded-full group-hover:bg-green-50 transition-colors" />
                <div className="h-20 w-20 rounded-2xl bg-red-50 flex items-center justify-center text-red-700 mb-10 group-hover:bg-red-700 group-hover:text-white transition-all duration-500 shadow-inner">
                  {feat.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight leading-none">{feat.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Search Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-950 rounded-[4rem] overflow-hidden relative shadow-3xl">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/6bbaac56-f85b-4646-afd6-a335792e81b8/leadership-workshop-70190899-1776936310639.webp" 
                className="w-full h-full object-cover opacity-15"
                alt="Impact"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-950 via-transparent to-transparent" />
            </div>
            <div className="p-16 md:p-32 max-w-4xl text-white relative z-10">
              <h2 className="text-5xl md:text-7xl font-black mb-10 leading-[1] uppercase tracking-tighter">Ready to check <br/><span className="text-yellow-400">your records?</span></h2>
              <p className="text-slate-300 text-xl md:text-2xl mb-12 leading-relaxed font-medium italic opacity-80">
                Our secure public search portal is open for all members. Enter your National ID and Date of Birth to view your registration status instantly.
              </p>
              <Link to="/search">
                <Button size="lg" className="gap-4 h-20 px-12 text-2xl font-black bg-yellow-500 hover:bg-yellow-600 text-red-950 shadow-2xl shadow-black/60 rounded-2xl uppercase tracking-widest transform hover:scale-105 transition-all">
                  Search Your Status <ArrowRight size={28} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;