import { useState } from "react";
import { Users, UserPlus, Grid, Search, FileText, CheckCircle, Clock, Info, ShieldAlert, BadgeCheck, MapPin, ClipboardList, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const PODashboard = () => {
  // Mock data for the PO
  const [assignedGroup, setAssignedGroup] = useState("Tumaini Women Group");
  const [members, setMembers] = useState([
    { id: 1, name: "Margaret Wanjiku", idNo: "12345678", dob: "1985-06-12", status: "Verified", dateAdded: "2024-03-10" },
    { id: 2, name: "Alice Wambui", idNo: "33221100", dob: "1988-04-12", status: "Verified", dateAdded: "2024-03-10" },
    { id: 3, name: "Fatuma Ali", idNo: "44556677", dob: "1992-11-20", status: "Pending", dateAdded: "2024-04-21" },
    { id: 4, name: "Zainab Hassan", idNo: "44332211", dob: "1995-01-15", status: "Pending", dateAdded: "2024-04-20" },
  ]);

  const [newMember, setNewMember] = useState({ name: "", idNo: "", dob: "" });
  const [isAdding, setIsAdding] = useState(false);

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name || !newMember.idNo || !newMember.dob) {
      toast.error("All registration fields are mandatory.");
      return;
    }

    const member = {
      id: Date.now(),
      name: newMember.name,
      idNo: newMember.idNo,
      dob: newMember.dob,
      status: "Pending",
      dateAdded: new Date().toISOString().split('T')[0]
    };
    
    setMembers([member, ...members]);
    toast.success("MEMBER REGISTRATION SUBMITTED FOR ADMINISTRATIVE REVIEW");
    setNewMember({ name: "", idNo: "", dob: "" });
    setIsAdding(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Officer Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Zap className="text-red-700 fill-red-700" size={20} />
              <span className="text-xs font-black uppercase tracking-[0.4em] text-red-800">Operational Officer Portal</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-950 tracking-tighter uppercase leading-none mb-6">FIELD <br/><span className="text-red-700">DASHBOARD</span></h1>
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 inline-flex">
              <div className="h-12 w-12 rounded-xl bg-green-700 flex items-center justify-center text-white">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Jurisdiction In Charge</p>
                <p className="text-xl font-black text-slate-900 uppercase tracking-tight">{assignedGroup}</p>
              </div>
            </div>
          </div>
          
          <Dialog open={isAdding} onOpenChange={setIsAdding}>
            <DialogTrigger asChild>
              <Button className="gap-4 h-20 px-10 text-xl font-black bg-red-700 hover:bg-red-800 shadow-2xl shadow-red-900/40 rounded-2xl uppercase tracking-widest transition-all hover:scale-105">
                <UserPlus size={28} /> Enroll New Member
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl rounded-[3rem] p-0 overflow-hidden border-none shadow-3xl">
              <div className="bg-red-800 p-12 text-white">
                <DialogTitle className="text-3xl font-black uppercase tracking-tight mb-2">Member Enrollment</DialogTitle>
                <DialogDescription className="text-red-100 font-medium italic">Accuracy is critical. Field officers cannot edit data after submission.</DialogDescription>
              </div>
              <form onSubmit={handleAddMember} className="p-12 space-y-8 bg-white">
                <div className="space-y-3">
                  <Label className="font-black uppercase text-[10px] tracking-widest text-slate-400">Full Legal Name (ID Format)</Label>
                  <Input 
                    className="h-16 text-xl font-black uppercase rounded-2xl bg-slate-50 border-2 focus:border-red-700 border-slate-100 transition-all"
                    value={newMember.name}
                    onChange={e => setNewMember({...newMember, name: e.target.value})}
                    placeholder="Surname Firstname Middlename" 
                    required 
                  />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="font-black uppercase text-[10px] tracking-widest text-slate-400">National ID</Label>
                    <Input 
                      className="h-16 text-2xl font-mono font-black rounded-2xl bg-slate-50 border-2 focus:border-red-700 border-slate-100"
                      value={newMember.idNo}
                      onChange={e => setNewMember({...newMember, idNo: e.target.value})}
                      placeholder="8 digits" 
                      required 
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="font-black uppercase text-[10px] tracking-widest text-slate-400">Birth Date</Label>
                    <Input 
                      type="date"
                      className="h-16 text-lg font-bold rounded-2xl bg-slate-50 border-2 focus:border-red-700 border-slate-100"
                      value={newMember.dob}
                      onChange={e => setNewMember({...newMember, dob: e.target.value})}
                      required 
                    />
                  </div>
                </div>
                
                <div className="bg-slate-50 border-2 border-slate-100 p-6 rounded-3xl flex gap-5 items-start">
                  <ShieldAlert className="text-red-700 shrink-0" size={28} />
                  <p className="text-xs text-slate-600 font-bold leading-relaxed uppercase tracking-tight">
                    <strong className="text-red-800 block mb-1 tracking-widest">IRREVERSIBLE SUBMISSION:</strong> 
                    By clicking finalize, you certify that you have physically verified the applicant's ID. You will NOT be able to edit this record once submitted.
                  </p>
                </div>

                <DialogFooter>
                  <Button type="submit" className="w-full h-16 text-xl font-black uppercase bg-slate-950 hover:bg-slate-900 shadow-2xl rounded-2xl tracking-widest">
                    Finalize Registration
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-10 mb-16">
          <Card className="border-none shadow-xl bg-white rounded-[2.5rem] overflow-hidden group">
            <CardHeader className="pb-2 p-8">
              <div className="flex justify-between items-center mb-4">
                <div className="h-12 w-12 rounded-xl bg-red-50 flex items-center justify-center text-red-700 group-hover:bg-red-700 group-hover:text-white transition-all">
                  <Users size={24} />
                </div>
                <Badge variant="outline" className="border-slate-100 text-slate-400 text-[8px] font-black uppercase tracking-widest">Enrollment</Badge>
              </div>
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Active Roster Size</CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="text-5xl font-black text-slate-950 tracking-tighter">{members.length} <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-300 ml-2">Verified + Pending</span></div>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-xl bg-white rounded-[2.5rem] overflow-hidden group">
            <CardHeader className="pb-2 p-8">
               <div className="flex justify-between items-center mb-4">
                <div className="h-12 w-12 rounded-xl bg-green-50 flex items-center justify-center text-green-700 group-hover:bg-green-700 group-hover:text-white transition-all">
                  <BadgeCheck size={24} />
                </div>
                <Badge variant="outline" className="border-slate-100 text-slate-400 text-[8px] font-black uppercase tracking-widest">Status</Badge>
              </div>
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Verified by Admin</CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="text-5xl font-black text-green-600 tracking-tighter">{members.filter(m => m.status === 'Verified').length} <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-300 ml-2">Records OK</span></div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl bg-white rounded-[2.5rem] overflow-hidden border-b-8 border-yellow-500 group">
            <CardHeader className="pb-2 p-8">
               <div className="flex justify-between items-center mb-4">
                <div className="h-12 w-12 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-600 group-hover:bg-yellow-600 group-hover:text-red-950 transition-all">
                  <Clock size={24} />
                </div>
                <Badge variant="outline" className="border-slate-100 text-slate-400 text-[8px] font-black uppercase tracking-widest">Review</Badge>
              </div>
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Awaiting HQ Verification</CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="text-5xl font-black text-red-800 tracking-tighter">{members.filter(m => m.status === 'Pending').length} <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-300 ml-2">In Queue</span></div>
            </CardContent>
          </Card>
        </div>

        {/* Member Table */}
        <Card className="border-none shadow-3xl bg-white rounded-[3rem] overflow-hidden">
          <div className="bg-slate-950 p-12 text-white flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-black uppercase tracking-tight">Active Jurisdiction Roster</h2>
              <p className="text-slate-400 font-medium italic">Read-only view of members registered under your supervision.</p>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <Input placeholder="Filter group members..." className="pl-14 h-14 w-full md:w-80 bg-white/5 border-white/10 text-white rounded-2xl focus:bg-white focus:text-slate-900 transition-all font-bold uppercase" />
            </div>
          </div>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="py-8 pl-12 font-black uppercase text-[10px] tracking-widest">Member Legal Identity</TableHead>
                  <TableHead className="py-8 font-black uppercase text-[10px] tracking-widest">National ID</TableHead>
                  <TableHead className="py-8 font-black uppercase text-[10px] tracking-widest">Date of Birth</TableHead>
                  <TableHead className="py-8 font-black uppercase text-[10px] tracking-widest">HQ Verification</TableHead>
                  <TableHead className="py-8 font-black uppercase text-[10px] tracking-widest text-right pr-12">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map(member => (
                  <TableRow key={member.id} className="group hover:bg-slate-50 transition-colors">
                    <TableCell className="py-10 pl-12 font-black text-slate-950 uppercase tracking-tight text-lg">{member.name}</TableCell>
                    <TableCell className="font-mono font-black text-slate-600 text-lg italic">{member.idNo}</TableCell>
                    <TableCell className="text-slate-500 font-bold uppercase text-sm tracking-tight">{member.dob}</TableCell>
                    <TableCell>
                      <Badge variant={member.status === 'Verified' ? 'default' : 'secondary'} className={`uppercase text-[10px] font-black px-4 py-1.5 rounded-full border-none shadow-sm ${member.status === 'Verified' ? 'bg-green-600 text-white' : 'bg-yellow-400 text-red-900'}`}>
                        {member.status === 'Verified' ? 'CERTIFIED' : 'UNDER REVIEW'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-12">
                      <Button variant="ghost" size="sm" className="font-black text-red-700 uppercase text-[10px] tracking-widest hover:text-white hover:bg-red-700 rounded-xl h-12 px-6 transition-all">
                        View Dossier
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Support Banner */}
        <div className="mt-16 bg-red-800 rounded-[3rem] p-12 md:p-16 text-white relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
           <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="h-24 w-24 rounded-[2rem] bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
                <Info size={48} className="text-yellow-400" />
              </div>
              <div className="space-y-4 text-center md:text-left">
                <h3 className="text-3xl font-black uppercase tracking-tight leading-none">Need to correct a record?</h3>
                <p className="text-red-100 text-lg font-medium italic opacity-80 leading-relaxed max-w-2xl">
                  As per Jamii Moja bylaws, Programme Officers cannot modify records once submitted. If an error was made during enrollment, please submit a <strong>Record Amendment Request</strong> to the Head Office Administrator via the internal memo system.
                </p>
                <div className="pt-4">
                  <Button variant="outline" className="border-2 border-white/30 text-white hover:bg-white hover:text-red-900 font-black uppercase tracking-widest h-14 px-10 rounded-xl">
                    Open Internal Memo System
                  </Button>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PODashboard;