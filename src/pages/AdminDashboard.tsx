import { useState } from "react";
import { 
  Users, 
  UserPlus, 
  Grid, 
  FileCheck, 
  Image as ImageIcon, 
  Trash2, 
  Edit, 
  Plus, 
  Settings,
  MoreVertical,
  Check,
  X,
  Upload,
  UserCheck,
  MapPin,
  Calendar,
  FileText,
  Search,
  ExternalLink,
  PlusCircle,
  Briefcase,
  ShieldAlert
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const AdminDashboard = () => {
  // Groups State
  const [groups, setGroups] = useState([
    { id: 1, name: "Tumaini Women Group", members: 45, officer: "Mary J.", location: "Nairobi Central" },
    { id: 2, name: "Umoja ni Nguvu", members: 32, officer: "John D.", location: "Mombasa" },
    { id: 3, name: "Neema Community Circle", members: 28, officer: "Sarah P.", location: "Kisumu" },
  ]);

  // All Members State (Admin can view all)
  const [allMembers, setAllMembers] = useState([
    { id: 1, name: "Alice Wambui", group: "Tumaini Women Group", idNo: "33221100", status: "Verified" },
    { id: 2, name: "Lydia Kariuki", group: "Neema Community Circle", idNo: "22114433", status: "Verified" },
    { id: 3, name: "Mercy Mwangi", group: "Tumaini Women Group", idNo: "55443322", status: "Verified" },
  ]);

  // Pending Member Registrations from POs
  const [pendingMembers, setPendingMembers] = useState([
    { id: 101, name: "Zainab Hassan", group: "Umoja ni Nguvu", officer: "Sarah P.", date: "2024-04-20", idNo: "44332211" },
    { id: 102, name: "Faith Mutua", group: "Tumaini Women Group", officer: "Mary J.", date: "2024-04-21", idNo: "88776655" },
  ]);

  // Programme Officers State
  const [pos, setPOs] = useState([
    { id: 1, name: "Mary J.", number: "PO-4421", idNo: "87654321", groups: ["Tumaini Women Group"] },
    { id: 2, name: "John D.", number: "PO-5512", idNo: "76543210", groups: ["Umoja ni Nguvu"] },
    { id: 3, name: "Sarah P.", number: "PO-6633", idNo: "11223344", groups: ["Neema Community Circle"] },
  ]);

  // Gallery State
  const [galleryItems, setGalleryItems] = useState([
    { id: 1, title: "Official Launch - Nairobi", type: "photo", date: "2024-01-15", url: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/6bbaac56-f85b-4646-afd6-a335792e81b8/women-community-meeting-583df1bd-1776936311285.webp" },
    { id: 2, title: "Organization Constitution V2", type: "document", date: "2023-12-01", url: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/6bbaac56-f85b-4646-afd6-a335792e81b8/official-documents-782b5063-1776936310767.webp" },
  ]);

  // Member Search State
  const [memberSearchTerm, setMemberSearchTerm] = useState("");

  // Handlers
  const handleVerify = (id: number, name: string) => {
    const member = pendingMembers.find(m => m.id === id);
    if (member) {
      setAllMembers([...allMembers, { id: Date.now(), name: member.name, group: member.group, idNo: member.idNo, status: "Verified" }]);
    }
    setPendingMembers(pendingMembers.filter(m => m.id !== id));
    toast.success(`Verified registration for ${name}`);
  };

  const handleDecline = (id: number, name: string) => {
    setPendingMembers(pendingMembers.filter(m => m.id !== id));
    toast.error(`Declined registration for ${name}`);
  };

  const handleDeleteGroup = (id: number, name: string) => {
    if (confirm(`Deregister group ${name}? This action is permanent.`)) {
      setGroups(groups.filter(g => g.id !== id));
      toast.success(`${name} deregistered successfully`);
    }
  };

  const [directMember, setDirectMember] = useState({ name: "", idNo: "", group: "" });
  const handleDirectAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!directMember.name || !directMember.idNo || !directMember.group) return;
    setAllMembers([{ id: Date.now(), ...directMember, status: "Verified" }, ...allMembers]);
    toast.success("Member registered directly with administrative override");
    setDirectMember({ name: "", idNo: "", group: "" });
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-10 bg-red-700 rounded-full" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-800">System Admin</span>
            </div>
            <h1 className="text-5xl font-black text-slate-950 tracking-tighter uppercase leading-none">COMMAND <br/><span className="text-red-700">CENTER</span></h1>
          </div>
          <div className="flex flex-wrap gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-3 bg-slate-950 hover:bg-slate-900 h-16 px-8 shadow-2xl rounded-2xl font-black uppercase tracking-widest text-sm">
                  <PlusCircle size={20} /> New Group
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-[2.5rem] p-0 overflow-hidden border-none max-w-lg">
                <div className="bg-red-800 p-10 text-white">
                  <DialogTitle className="text-3xl font-black uppercase tracking-tight">Group Registration</DialogTitle>
                  <DialogDescription className="text-red-100 font-medium">Formalize a new community cluster.</DialogDescription>
                </div>
                <div className="p-10 space-y-6">
                  <div className="space-y-2">
                    <Label className="font-black text-[10px] uppercase tracking-widest text-slate-400">Organization Name</Label>
                    <Input placeholder="e.g. Hope Women Unity" className="h-14 rounded-xl font-bold uppercase" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-black text-[10px] uppercase tracking-widest text-slate-400">Jurisdiction / Location</Label>
                    <Input placeholder="e.g. Machakos North" className="h-14 rounded-xl font-bold uppercase" />
                  </div>
                  <Button onClick={() => toast.success("New Group Created")} className="w-full bg-red-800 h-14 rounded-xl font-black uppercase tracking-widest shadow-xl">Complete Setup</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-3 h-16 px-8 border-4 border-slate-900 text-slate-900 bg-white hover:bg-slate-50 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl">
                  <Briefcase size={20} /> Register PO
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-[2.5rem] p-0 overflow-hidden border-none max-w-lg">
                <div className="bg-slate-950 p-10 text-white">
                  <DialogTitle className="text-3xl font-black uppercase tracking-tight">Officer Enrollment</DialogTitle>
                  <DialogDescription className="text-slate-400 font-medium">Assign a new field supervisor to a group.</DialogDescription>
                </div>
                <div className="p-10 space-y-6">
                  <div className="space-y-2">
                    <Label className="font-black text-[10px] uppercase tracking-widest text-slate-400">Full Name</Label>
                    <Input className="h-14 rounded-xl font-bold uppercase" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-black text-[10px] uppercase tracking-widest text-slate-400">Officer No.</Label>
                      <Input placeholder="PO-XXXX" className="h-14 rounded-xl font-black font-mono text-red-700" />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-black text-[10px] uppercase tracking-widest text-slate-400">National ID</Label>
                      <Input className="h-14 rounded-xl font-bold font-mono" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-black text-[10px] uppercase tracking-widest text-slate-400">Assign to Group</Label>
                    <select className="flex h-14 w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-4 py-2 text-sm font-bold uppercase ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700">
                      <option value="">Select jurisdiction...</option>
                      {groups.map(g => <option key={g.id} value={g.name}>{g.name}</option>)}
                    </select>
                  </div>
                  <Button onClick={() => toast.success("Programme Officer Registered")} className="w-full bg-slate-950 h-14 rounded-xl font-black uppercase tracking-widest shadow-xl">Authorize Access</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="verifications" className="space-y-12">
          <TabsList className="bg-white border-2 border-slate-100 p-2 h-auto rounded-[2.5rem] shadow-xl flex-wrap gap-2">
            <TabsTrigger value="verifications" className="rounded-[1.8rem] px-10 py-4 data-[state=active]:bg-red-800 data-[state=active]:text-white uppercase font-black text-xs tracking-widest flex items-center gap-3">
              Verifications <Badge className="bg-yellow-400 text-red-950 border-none px-2 h-5 font-black">{pendingMembers.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="roster" className="rounded-[1.8rem] px-10 py-4 data-[state=active]:bg-red-800 data-[state=active]:text-white uppercase font-black text-xs tracking-widest">Master Roster</TabsTrigger>
            <TabsTrigger value="groups" className="rounded-[1.8rem] px-10 py-4 data-[state=active]:bg-red-800 data-[state=active]:text-white uppercase font-black text-xs tracking-widest">Group Management</TabsTrigger>
            <TabsTrigger value="staff" className="rounded-[1.8rem] px-10 py-4 data-[state=active]:bg-red-800 data-[state=active]:text-white uppercase font-black text-xs tracking-widest">Staff Directory</TabsTrigger>
            <TabsTrigger value="gallery" className="rounded-[1.8rem] px-10 py-4 data-[state=active]:bg-red-800 data-[state=active]:text-white uppercase font-black text-xs tracking-widest">Public Gallery</TabsTrigger>
          </TabsList>

          <TabsContent value="verifications">
             <Card className="border-none shadow-3xl bg-white rounded-[3rem] overflow-hidden">
                <div className="bg-yellow-500 p-12 text-red-950 flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="space-y-2 text-center md:text-left">
                    <h2 className="text-4xl font-black uppercase tracking-tight">Awaiting Approval</h2>
                    <p className="font-bold opacity-80 uppercase text-xs tracking-widest italic">All member registrations from field officers must be verified here.</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl border border-white/30 text-center min-w-[150px]">
                    <p className="text-5xl font-black">{pendingMembers.length}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest mt-1">Pending Actions</p>
                  </div>
                </div>
                <CardContent className="p-0">
                  {pendingMembers.length > 0 ? (
                    <Table>
                      <TableHeader className="bg-slate-50">
                        <TableRow>
                          <TableHead className="py-8 pl-12">MEMBER IDENTITY</TableHead>
                          <TableHead className="py-8">ID NUMBER</TableHead>
                          <TableHead className="py-8">TARGET GROUP</TableHead>
                          <TableHead className="py-8">OFFICER</TableHead>
                          <TableHead className="py-8 text-right pr-12">VERDICT</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingMembers.map(member => (
                          <TableRow key={member.id} className="group hover:bg-slate-50 transition-colors">
                            <TableCell className="py-10 pl-12">
                              <div className="flex flex-col">
                                <span className="font-black text-xl text-slate-950 uppercase tracking-tight">{member.name}</span>
                                <span className="text-[10px] text-slate-400 font-bold uppercase mt-2 flex items-center gap-2">
                                  <Calendar size={12} className="text-red-700" /> Submitted: {member.date}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="font-mono font-black text-lg text-slate-700">{member.idNo}</TableCell>
                            <TableCell><Badge className="bg-red-50 text-red-700 border-none px-4 py-1 uppercase text-[10px] font-black">{member.group}</Badge></TableCell>
                            <TableCell className="font-black text-slate-800 uppercase tracking-tight text-sm">{member.officer}</TableCell>
                            <TableCell className="text-right pr-12 space-x-4">
                              <Button 
                                size="lg" 
                                className="bg-green-600 hover:bg-green-700 rounded-2xl h-14 w-14 p-0 shadow-xl shadow-green-600/30" 
                                onClick={() => handleVerify(member.id, member.name)}
                              >
                                <Check size={28} />
                              </Button>
                              <Button 
                                size="lg" 
                                variant="destructive" 
                                className="rounded-2xl h-14 w-14 p-0 shadow-xl shadow-red-600/30"
                                onClick={() => handleDecline(member.id, member.name)}
                              >
                                <X size={28} />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="py-32 text-center text-slate-300">
                      <FileCheck size={80} className="mx-auto mb-6 opacity-20" />
                      <p className="font-black uppercase tracking-[0.3em] text-xl">All records are current</p>
                    </div>
                  )}
                </CardContent>
             </Card>
          </TabsContent>

          <TabsContent value="roster">
            <Card className="border-none shadow-3xl bg-white rounded-[3rem] overflow-hidden">
              <div className="bg-slate-950 p-12 text-white flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="space-y-3">
                  <h2 className="text-4xl font-black uppercase tracking-tight">Master Member Directory</h2>
                  <p className="text-slate-400 font-medium italic">Complete roster of all verified organization members across all jurisdictions.</p>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-red-700 hover:bg-red-800 gap-3 h-16 px-10 rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl">
                        <UserPlus size={20} /> Administrative Registration
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-[3rem] p-0 overflow-hidden border-none max-w-xl">
                      <div className="bg-red-800 p-10 text-white">
                        <DialogTitle className="text-3xl font-black uppercase tracking-tight">Direct Enrollment</DialogTitle>
                        <DialogDescription className="text-red-100 font-medium">Bypass field verification for immediate administrative enrollment.</DialogDescription>
                      </div>
                      <form onSubmit={handleDirectAdd} className="p-10 space-y-8">
                        <div className="space-y-2">
                          <Label className="font-black text-[10px] uppercase tracking-widest text-slate-400">Full Legal Name</Label>
                          <Input value={directMember.name} onChange={e => setDirectMember({...directMember, name: e.target.value})} className="h-14 rounded-xl font-bold uppercase bg-slate-50" required />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                           <div className="space-y-2">
                            <Label className="font-black text-[10px] uppercase tracking-widest text-slate-400">National ID</Label>
                            <Input value={directMember.idNo} onChange={e => setDirectMember({...directMember, idNo: e.target.value})} className="h-14 rounded-xl font-black font-mono bg-slate-50" required />
                          </div>
                          <div className="space-y-2">
                            <Label className="font-black text-[10px] uppercase tracking-widest text-slate-400">Target Group</Label>
                            <select 
                              value={directMember.group} 
                              onChange={e => setDirectMember({...directMember, group: e.target.value})}
                              className="flex h-14 w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-4 py-2 text-sm font-bold uppercase focus:ring-2 focus:ring-red-700 outline-none"
                              required
                            >
                              <option value="">Choose Jurisdiction...</option>
                              {groups.map(g => <option key={g.id} value={g.name}>{g.name}</option>)}
                            </select>
                          </div>
                        </div>
                        <Button type="submit" className="w-full bg-red-700 h-16 rounded-2xl font-black uppercase tracking-widest shadow-2xl">Execute Enrollment</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                    <Input 
                      placeholder="Search Master Records..." 
                      className="pl-14 h-16 w-full md:w-80 bg-white/10 border-white/20 text-white placeholder:text-slate-500 rounded-2xl focus:bg-white focus:text-slate-900 transition-all font-bold"
                      value={memberSearchTerm}
                      onChange={e => setMemberSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="py-8 pl-12 font-black uppercase text-[10px] tracking-widest">Legal Identity</TableHead>
                      <TableHead className="py-8 font-black uppercase text-[10px] tracking-widest">National ID</TableHead>
                      <TableHead className="py-8 font-black uppercase text-[10px] tracking-widest">Affiliation</TableHead>
                      <TableHead className="py-8 font-black uppercase text-[10px] tracking-widest">System Status</TableHead>
                      <TableHead className="py-8 text-right pr-12 font-black uppercase text-[10px] tracking-widest">Management</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allMembers
                      .filter(m => m.name.toLowerCase().includes(memberSearchTerm.toLowerCase()) || m.idNo.includes(memberSearchTerm))
                      .map(member => (
                        <TableRow key={member.id} className="hover:bg-slate-50 transition-colors">
                          <TableCell className="py-8 pl-12 font-black text-slate-950 uppercase tracking-tight text-lg">{member.name}</TableCell>
                          <TableCell className="font-mono font-black text-slate-600 text-lg italic">{member.idNo}</TableCell>
                          <TableCell><Badge variant="outline" className="border-red-100 text-red-800 font-black uppercase text-[10px] px-3 py-1 bg-red-50/30">{member.group}</Badge></TableCell>
                          <TableCell><Badge className="bg-green-600 text-white border-none font-black text-[10px] px-4 py-1.5 rounded-full shadow-sm">{member.status}</Badge></TableCell>
                          <TableCell className="text-right pr-12">
                            <Button variant="ghost" size="icon" onClick={() => { if(confirm("Deregister member?")) setAllMembers(allMembers.filter(m => m.id !== member.id)); toast.success("Member deregistered"); }} className="text-red-500 hover:bg-red-50 h-12 w-12 rounded-xl">
                              <Trash2 size={20} />
                            </Button>
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="groups">
             <div className="grid md:grid-cols-3 gap-8">
               {groups.map(group => (
                 <Card key={group.id} className="border-none shadow-xl rounded-[2.5rem] overflow-hidden group">
                   <div className="bg-slate-950 p-8 text-white group-hover:bg-red-800 transition-colors duration-500 relative overflow-hidden">
                      <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full" />
                      <h3 className="text-2xl font-black uppercase tracking-tight mb-2 relative z-10">{group.name}</h3>
                      <div className="flex items-center gap-2 text-slate-400 font-bold uppercase text-[10px] tracking-widest relative z-10 group-hover:text-red-100">
                        <MapPin size={12} /> {group.location}
                      </div>
                   </div>
                   <CardContent className="p-8 space-y-6 bg-white">
                      <div className="flex justify-between items-center py-4 border-b border-slate-50">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Supervisor</span>
                        <span className="font-black text-slate-900 uppercase text-sm">{group.officer}</span>
                      </div>
                      <div className="flex justify-between items-center py-4 border-b border-slate-50">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Enrollment</span>
                        <Badge className="bg-green-100 text-green-700 font-black px-3 py-1 rounded-full border-none shadow-sm">{group.members} Members</Badge>
                      </div>
                      <div className="pt-4 flex gap-3">
                         <Button variant="outline" className="flex-grow h-12 rounded-xl font-black uppercase text-[10px] tracking-widest border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-all">Jurisdiction Docs</Button>
                         <Button onClick={() => handleDeleteGroup(group.id, group.name)} variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-red-500 hover:bg-red-50"><Trash2 size={20} /></Button>
                      </div>
                   </CardContent>
                 </Card>
               ))}
               <div className="border-4 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-slate-300 hover:border-red-700 hover:text-red-700 transition-all cursor-pointer group">
                  <PlusCircle size={64} className="mb-4 group-hover:scale-110 transition-transform" />
                  <p className="font-black uppercase tracking-[0.2em] text-lg">Add New Group</p>
               </div>
             </div>
          </TabsContent>

          <TabsContent value="gallery">
            <Card className="border-none shadow-3xl bg-white rounded-[3rem] overflow-hidden">
              <div className="bg-red-800 p-12 text-white flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="space-y-3">
                  <h2 className="text-4xl font-black uppercase tracking-tight">Public Media Hub</h2>
                  <p className="text-red-100 font-medium italic">Manage all photos and documents visible on the public organization gallery.</p>
                </div>
                <div className="flex gap-4">
                  <Button onClick={() => toast.success("Photo upload interface initialized")} className="h-16 px-8 bg-white text-red-800 hover:bg-yellow-500 hover:text-red-950 gap-3 rounded-2xl font-black uppercase tracking-widest shadow-2xl">
                    <ImageIcon size={20} /> Post Photo
                  </Button>
                  <Button onClick={() => toast.success("Document upload interface initialized")} variant="outline" className="h-16 px-8 border-2 border-white/30 text-white hover:bg-red-900 gap-3 rounded-2xl font-black uppercase tracking-widest shadow-2xl">
                    <FileText size={20} /> Publish Doc
                  </Button>
                </div>
              </div>
              <CardContent className="p-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                  {galleryItems.map(item => (
                    <div key={item.id} className="group relative rounded-[2rem] overflow-hidden shadow-xl bg-slate-50 border border-slate-100">
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                           <p className="text-white font-black uppercase tracking-tight text-xl mb-4">{item.title}</p>
                           <Button variant="destructive" size="sm" onClick={() => { setGalleryItems(galleryItems.filter(i => i.id !== item.id)); toast.success("Asset deleted from gallery"); }} className="w-full gap-2 rounded-xl uppercase font-black tracking-widest h-12">
                              <Trash2 size={16} /> Purge Asset
                           </Button>
                        </div>
                      </div>
                      <div className="p-6 flex justify-between items-center">
                         <Badge className="bg-red-100 text-red-700 border-none px-3 py-1 font-black text-[9px] uppercase tracking-widest">{item.type}</Badge>
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;