import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ImageIcon, FileText, ExternalLink, Search, Plus, Download, Filter, Eye, Share2, Sparkles, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const Gallery = () => {
  const [activeType, setActiveType] = useState("all");

  const items = [
    { id: 1, type: "photo", title: "Women Empowerment Summit 2024", url: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/6bbaac56-f85b-4646-afd6-a335792e81b8/women-community-meeting-583df1bd-1776936311285.webp", date: "Jan 2024", tags: ["Unity", "Nairobi"] },
    { id: 2, type: "photo", title: "Leadership Workshop Series", url: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/6bbaac56-f85b-4646-afd6-a335792e81b8/leadership-workshop-70190899-1776936310639.webp", date: "Feb 2024", tags: ["Training", "HQ"] },
    { id: 3, type: "doc", title: "Jamii Moja Constitution V2", url: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/6bbaac56-f85b-4646-afd6-a335792e81b8/official-documents-782b5063-1776936310767.webp", date: "Dec 2023", size: "1.2 MB", tags: ["Legal", "Admin"] },
    { id: 4, type: "photo", title: "Community Savings Launch", url: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/6bbaac56-f85b-4646-afd6-a335792e81b8/unity-and-strength-26910eae-1776936310932.webp", date: "Mar 2024", tags: ["Finance", "Rural"] },
    { id: 5, type: "doc", title: "Member Enrollment Guide", url: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/6bbaac56-f85b-4646-afd6-a335792e81b8/official-documents-782b5063-1776936310767.webp", date: "Jan 2024", size: "850 KB", tags: ["Training", "PO"] },
    { id: 6, type: "photo", title: "Rural Outreach Program", url: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/6bbaac56-f85b-4646-afd6-a335792e81b8/women-community-meeting-583df1bd-1776936311285.webp", date: "Apr 2024", tags: ["Impact", "Coast"] },
  ];

  const filteredItems = activeType === "all" ? items : items.filter(i => i.type === activeType);

  return (
    <div className="pb-32 bg-slate-50 min-h-screen font-sans overflow-hidden">
      {/* Dynamic Header */}
      <section className="bg-red-950 text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/6bbaac56-f85b-4646-afd6-a335792e81b8/women-community-meeting-583df1bd-1776936311285.webp" 
            alt="Hero Bg" 
            className="w-full h-full object-cover opacity-15 grayscale brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-red-950 via-red-950/40 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Sparkles className="text-yellow-400" size={24} />
            <Badge className="bg-yellow-500 text-red-950 border-none uppercase text-[10px] font-black tracking-[0.4em] px-8 py-2 rounded-full shadow-lg">Documentation & Impact</Badge>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 uppercase tracking-tighter leading-none">ARCHIVE <br/><span className="text-yellow-400">& GALLERY</span></h1>
          <p className="text-red-100 max-w-3xl mx-auto text-xl md:text-2xl font-medium leading-relaxed italic border-x-4 border-yellow-500/30 px-10">
            A verified repository of Jamii Moja initiatives, legal documentation, and community empowerment milestones recorded across Kenya.
          </p>
        </div>
      </section>

      <section className="py-16 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="all" onValueChange={setActiveType} className="space-y-16">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-10 bg-white p-8 rounded-[3rem] shadow-3xl border border-slate-100">
              <TabsList className="h-16 p-2 bg-slate-100 rounded-2xl gap-2">
                <TabsTrigger value="all" className="px-10 rounded-xl font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-red-800 data-[state=active]:text-white transition-all">All Archive</TabsTrigger>
                <TabsTrigger value="photo" className="px-10 rounded-xl font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-red-800 data-[state=active]:text-white flex items-center gap-2 transition-all"><ImageIcon size={16} /> Imagery</TabsTrigger>
                <TabsTrigger value="doc" className="px-10 rounded-xl font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-red-800 data-[state=active]:text-white flex items-center gap-2 transition-all"><FileText size={16} /> Documenta</TabsTrigger>
              </TabsList>
              
              <div className="flex w-full lg:w-auto gap-4">
                <div className="relative flex-grow lg:w-96">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <Input className="pl-14 h-16 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-red-700 transition-all font-bold uppercase tracking-tight text-sm" placeholder="Search organization files..." />
                </div>
              </div>
            </div>

            <TabsContent value={activeType} className="focus-visible:outline-none focus-visible:ring-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="group border-none rounded-[3rem] overflow-hidden bg-white shadow-xl hover:shadow-3xl transition-all duration-700 flex flex-col relative"
                  >
                    {item.type === 'photo' ? (
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <img 
                          src={item.url} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-red-950/90 via-red-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-10">
                           <div className="flex gap-2 mb-4 flex-wrap">
                             {item.tags?.map((t, i) => <Badge key={i} className="bg-yellow-500 text-red-950 border-none font-black text-[8px] uppercase">{t}</Badge>)}
                           </div>
                           <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-none mb-6">{item.title}</h3>
                           <div className="flex gap-3">
                              <Button className="flex-grow bg-white text-red-900 hover:bg-yellow-500 hover:text-red-950 font-black uppercase tracking-widest rounded-xl h-12">
                                <Eye size={18} className="mr-2" /> View Full
                              </Button>
                              <Button variant="outline" size="icon" className="w-12 h-12 rounded-xl border-white/30 text-white hover:bg-white/10">
                                <Share2 size={18} />
                              </Button>
                           </div>
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-[4/5] flex flex-col p-12 bg-red-50 relative group-hover:bg-green-50 transition-colors duration-700 overflow-hidden">
                        <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/40 rounded-full blur-3xl group-hover:bg-green-100/40 transition-colors" />
                        <div className="flex justify-between items-start mb-12 relative z-10">
                           <div className="h-14 w-14 bg-red-700 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:bg-green-700 transition-colors">
                              <FolderOpen size={28} />
                           </div>
                           <Badge className="bg-white/80 backdrop-blur-md text-red-800 border-none font-black text-[10px] tracking-widest px-4 py-1.5 rounded-full">{item.size}</Badge>
                        </div>
                        <div className="space-y-6 flex-grow relative z-10">
                           <p className="text-[10px] font-black text-red-400 uppercase tracking-[0.4em] group-hover:text-green-600 transition-colors">Official Document</p>
                           <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight leading-[1.1] group-hover:text-green-800 transition-colors">{item.title}</h3>
                           <div className="flex gap-2 flex-wrap">
                             {item.tags?.map((t, i) => <span key={i} className="text-[10px] font-bold uppercase text-slate-400">#{t}</span>)}
                           </div>
                        </div>
                        <div className="pt-8 border-t border-slate-200/50 mt-auto relative z-10">
                           <Button className="w-full h-16 bg-slate-950 hover:bg-red-800 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl transition-all gap-3">
                             <Download size={20} /> Access Publication
                           </Button>
                        </div>
                      </div>
                    )}
                    <div className="p-8 hidden">
                      <p className="text-xs font-black uppercase text-slate-400 tracking-widest">{item.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-32 p-16 md:p-24 bg-red-900 rounded-[4rem] text-center relative overflow-hidden shadow-3xl">
             <div className="absolute inset-0 z-0 opacity-20">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/6bbaac56-f85b-4646-afd6-a335792e81b8/leadership-workshop-70190899-1776936310639.webp" 
                alt="Bg" 
                className="w-full h-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-red-950/80" />
            </div>
            <div className="relative z-10 max-w-3xl mx-auto space-y-10">
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">Access <br/><span className="text-yellow-400">Internal Files</span></h2>
              <p className="text-red-100 text-xl md:text-2xl font-medium leading-relaxed italic opacity-80 border-l-4 border-yellow-500 pl-8 text-left mx-auto max-w-2xl">
                Restricted records including member ledger summaries, jurisdiction reports, and internal memos are available only to authorized personnel via their respective portals.
              </p>
              <div className="flex flex-wrap justify-center gap-6 pt-6">
                <Button asChild className="h-20 px-12 bg-yellow-500 hover:bg-yellow-600 text-red-950 font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-black/60 transform hover:scale-105 transition-all text-xl">
                  <Link to="/login">Staff Access</Link>
                </Button>
                <Button variant="outline" className="h-20 px-12 border-4 border-white/20 text-white hover:bg-white hover:text-red-950 font-black uppercase tracking-widest rounded-2xl transition-all text-xl">
                  Contact HQ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;