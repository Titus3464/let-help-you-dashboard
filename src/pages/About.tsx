import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Target, Eye, Heart, Users, ShieldCheck, Award } from "lucide-react";

const About = () => {
  return (
    <div className="pb-24 bg-white font-sans overflow-hidden">
      {/* Hero */}
      <section className="bg-red-900 text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/6bbaac56-f85b-4646-afd6-a335792e81b8/women-community-meeting-583df1bd-1776936311285.webp" 
            alt="About Bg" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <Badge className="mb-8 bg-yellow-500 text-red-950 border-none uppercase text-xs font-black tracking-[0.4em] px-8 py-2.5 rounded-full shadow-lg">Our DNA</Badge>
          <h1 className="text-6xl md:text-9xl font-black mb-10 uppercase tracking-tighter leading-none">UNITY IS <span className="text-yellow-400">STRENGTH</span></h1>
          <p className="text-red-100 max-w-4xl mx-auto text-xl md:text-2xl font-medium leading-relaxed italic border-x-4 border-yellow-500/30 px-10">
            JAMII MOJA is a transformative grassroots movement dedicated to empowering women through digital inclusion, financial solidarity, and professional management of community clusters.
          </p>
        </div>
      </section>

      {/* Mission/Vision - Overlapping Grid */}
      <section className="py-24 -mt-20 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-14 rounded-[4rem] shadow-2xl border border-red-50 flex flex-col gap-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-[4rem] -mr-16 -mt-16" />
              <div className="h-20 w-20 bg-red-700 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-red-900/20">
                <Target size={40} />
              </div>
              <h2 className="text-4xl font-black uppercase tracking-tight text-slate-900">Our Mission</h2>
              <p className="text-slate-600 text-xl font-medium leading-relaxed">
                To build a sustainable digital framework that formalizes women's groups, secures their collective assets, and provides a platform for accelerated economic independence.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-green-800 p-14 rounded-[4rem] shadow-2xl text-white flex flex-col gap-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[4rem] -mr-16 -mt-16" />
              <div className="h-20 w-20 bg-yellow-400 rounded-3xl flex items-center justify-center text-red-950 shadow-xl shadow-yellow-400/20">
                <Eye size={40} />
              </div>
              <h2 className="text-4xl font-black uppercase tracking-tight">Our Vision</h2>
              <p className="text-green-50 text-xl font-medium leading-relaxed">
                A nation where every woman is part of a verified, empowered group, enjoying full access to economic opportunities and digital organizational tools.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values - Modern Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge variant="outline" className="mb-4 border-red-700 text-red-700 font-black uppercase tracking-widest px-4 py-1">The Jamii Moja Way</Badge>
            <h2 className="text-5xl font-black text-slate-900 mb-6 uppercase tracking-tight">Fundamental Values</h2>
            <div className="h-2 w-24 bg-yellow-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "Transparency", desc: "Digital records accessible to all members via our search portal.", icon: <ShieldCheck size={32} />, color: "text-red-700", bg: "bg-red-50" },
              { title: "Solidarity", desc: "Strength through numbers. We believe in the power of the group.", icon: <Users size={32} />, color: "text-green-700", bg: "bg-green-50" },
              { title: "Empowerment", desc: "Providing the capital and knowledge for women to lead.", icon: <Award size={32} />, color: "text-yellow-600", bg: "bg-yellow-50" },
              { title: "Excellence", desc: "Professional field officers and rigorous admin verification.", icon: <Target size={32} />, color: "text-red-800", bg: "bg-red-50" }
            ].map((v, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:border-red-200 transition-all duration-500 group">
                <div className={`mb-8 h-16 w-16 ${v.bg} ${v.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  {v.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 text-slate-900 uppercase tracking-tight">{v.title}</h3>
                <p className="text-slate-500 text-sm font-bold leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 bg-slate-950 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <h2 className="text-5xl font-black leading-tight uppercase tracking-tight">
                Empowering the <br/><span className="text-yellow-400 italic">Grassroots Economy</span>
              </h2>
              <p className="text-slate-400 text-xl leading-relaxed font-medium">
                Our organization was founded on the belief that traditional community groups (Chamas) are the backbone of our economy. By providing them with a formal digital identity, we unlock their full potential.
              </p>
              <div className="space-y-6">
                <div className="flex gap-6 items-start">
                   <div className="mt-1 h-8 w-8 bg-green-700 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle2 size={18} />
                   </div>
                   <div>
                    <h4 className="text-xl font-black uppercase tracking-tight mb-1">Group Registration</h4>
                    <p className="text-slate-500">Transforming informal clusters into registered legal entities with managed rosters.</p>
                   </div>
                </div>
                <div className="flex gap-6 items-start">
                   <div className="mt-1 h-8 w-8 bg-green-700 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle2 size={18} />
                   </div>
                   <div>
                    <h4 className="text-xl font-black uppercase tracking-tight mb-1">Officer Mentorship</h4>
                    <p className="text-slate-500">Trained Programme Officers provide guidance, training, and operational support.</p>
                   </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-10 bg-red-700/20 blur-[100px] rounded-full" />
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/6bbaac56-f85b-4646-afd6-a335792e81b8/leadership-workshop-70190899-1776936310639.webp" 
                alt="Leadership" 
                className="relative z-10 rounded-[4rem] shadow-3xl border-4 border-slate-900"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;