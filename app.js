const { useState, useMemo, useEffect } = React;
// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────
const NAV = [
  { id:"dashboard",    label:"Dashboard",       icon:"📊" },
  { id:"emis",         label:"EMIS Database",   icon:"🗃️" },
  { id:"schools",      label:"Audit Schools",   icon:"🏫" },
  { id:"audits",       label:"Audits",          icon:"📋" },
  { id:"classrooms",   label:"Classrooms",      icon:"🚪" },
  { id:"furniture",    label:"Furniture",       icon:"🪑" },
  { id:"conditions",   label:"Conditions",      icon:"🔍" },
  { id:"repairs",      label:"Repairs",         icon:"🔧" },
  { id:"warehouse",    label:"Warehouse",       icon:"🏭" },
  { id:"distribution", label:"Distribution",    icon:"🚚" },
  { id:"storage",      label:"Storage",         icon:"📦" },
  { id:"capacity",     label:"Capacity",        icon:"📐" },
  { id:"ratio",        label:"Ratio Analysis",  icon:"👩‍🏫" },
  { id:"export",       label:"Export / Reports",icon:"📤" },
];

const DBE_FURNITURE = [
  "Single Combined Desk – Size 4 (Grade 7–12)",
  "Penny 1 Plastic Chair – Size 2 (Grade 1–3)",
  "Penny 1 Wood Chair – Size 2 (Grade 1–3)",
  "Penny 4 Plastic Chair – Size 3 (Grade 4–6)",
  "Penny 4 Wood Chair – Size 3 (Grade 4–6)",
  "Utility Plastic Chair – Size 4 (Grade 7–12)",
  "Double Combined Desk – Size 2 (Grade 1–3)",
  "Double Combined Desk – Size 3 (Grade 4–6)",
  "Double Combined Desk – Size 4 (Grade 7–9)",
  "Single Stackable Table – Size 2 (Grade 1–3)",
  "Single Stackable Table – Size 3 (Grade 4–6)",
  "Single Stackable Table – Size 4 (Grade 7–12)",
  "Double Stackable Table – Size 2 (Grade 1–3)",
  "Double Stackable Table – Size 3 (Grade 4–6)",
  "Double Stackable Table – Size 4 (Grade 7–12)",
  "Teacher's Desk (Single Pedestal)",
  "Teacher's Desk (Double Pedestal)",
  "Teacher's Chair (Typist)",
  "Teacher's Chair (Visitor)",
  "Teacher's Cupboard – Steel (Double Door)",
  "Teacher's Cupboard – Steel (Single Door)",
  "Teacher's Bookcase (Open Shelf)",
  "Teacher's Bookcase (Glazed Door)",
  "Teacher's Table (Rectangular)",
  "Teacher's Locker (Single Door)",
  "Teacher's Locker (Double Door)",
  "Stationery Cupboard",
  "Map/Chart Cabinet",
  "Principal's Desk (Double Pedestal)",
  "Principal's Chair (High Back)",
  "Principal's Visitor Chair",
  "Principal's Credenza",
  "Principal's Bookcase",
  "Deputy Principal's Desk",
  "Deputy Principal's Chair",
  "HOD Desk",
  "HOD Chair",
  "Admin Clerk Desk",
  "Admin Clerk Chair (Typist)",
  "Reception Desk",
  "Reception Chair",
  "Boardroom Table",
  "Boardroom Chair",
  "Filing Cabinet – Steel (2-Drawer)",
  "Filing Cabinet – Steel (4-Drawer)",
  "Lateral Filing Cabinet",
  "Safe (Small – Cash Box)",
  "Safe (Medium – Fireproof)",
  "Steel Stationery Cupboard (Admin)",
  "Compactus / Mobile Shelving",
  "Waiting Area Bench (2-Seater)",
  "Waiting Area Bench (3-Seater)",
  "Staff Room Table",
  "Staff Room Chair",
  "Staff Room Couch / Sofa",
  "Staff Locker (Single Door)",
  "Staff Locker (Double Door)",
  "Science Lab Table",
  "Lab Stool",
  "Computer Lab Table",
  "Library Table",
  "Library Chair",
  "ECD Activity Table (Grade R)",
  "ECD Chair (Grade R)",
  "Multipurpose Table",
  "Steel Shelf Unit",
  "Storeroom Shelf",
  "Display Cabinet",
  "Notice Board",
  "Whiteboard (Mobile)",
];

// Built-in sample EMIS data (fallback if no file uploaded)
const NC_PROVINCES = new Set(["NC","NORTHERN CAPE","NORTHERNCAPE","NORTHERN"]);
const isNorthernCape = prov => {
  if (!prov) return false;
  const normalized = prov.toString().trim().toUpperCase().replace(/[^A-Z]/g, "");
  return normalized === "NC" || normalized === "NORTHERNCAPE" || normalized === "NORTHERN";
};

const EMIS_SAMPLE = [
  { emis:"300010701", name:"BOITUMELO SPECIALSCHOOL",        district:"FRANCES BAARD",      phase:"Primary",   type:"Special Needs Education", sector:"Public",      city:"Kimberley",  province:"NC", lat:-28.716032, lng:24.702023, email:"boitumeloss@ncdoe.school.za",    tel:"0783955182", circuit:"", landOwnership:"Govt", examCentre:"", emailAlt:"", telCode:"078" },
  { emis:"300022301", name:"HOPETOWN GEKOMBINEERDE SKOOL",    district:"PIXLEY-KA-SEME",     phase:"Combined",  type:"Ordinary School",         sector:"Public",      city:"HOPETOWN",   province:"NC", lat:-29.623935, lng:24.087122, email:"admin@hshopetown.co.za",          tel:"2030053",    circuit:"P2", landOwnership:"Govt", examCentre:"", emailAlt:"", telCode:"053" },
  { emis:"300011305", name:"HOËRSKOOL DOUGLAS GEKOMBINEERD",  district:"PIXLEY-KA-SEME",     phase:"Combined",  type:"Ordinary School",         sector:"Public",      city:"DOUGLAS",    province:"NC", lat:-29.055940, lng:23.769850, email:"hsd@douglas.co.za",               tel:"2981041",    circuit:"P5", landOwnership:"Govt", examCentre:"2011305", emailAlt:"", telCode:"053" },
  { emis:"300015401", name:"HOËRSKOOL DIAMANTVELD",           district:"FRANCES BAARD",      phase:"Secondary", type:"Ordinary School",         sector:"Public",      city:"Kimberley",  province:"NC", lat:-28.750580, lng:24.772060, email:"admin@diamantveld.co.za",          tel:"8331528",    circuit:"F3", landOwnership:"Govt", examCentre:"2015401", emailAlt:"", telCode:"053" },
  { emis:"300015403", name:"KIMBERLEY BOYS' HIGH SCHOOL",     district:"FRANCES BAARD",      phase:"Secondary", type:"Ordinary School",         sector:"Public",      city:"Kimberley",  province:"NC", lat:-28.749380, lng:24.768600, email:"headmaster@kbhs.co.za",           tel:"8332684",    circuit:"F8", landOwnership:"Govt", examCentre:"2015403", emailAlt:"", telCode:"053" },
  { emis:"300011403", name:"KIMBERLEY GIRLS HIGH SCHOOL",     district:"FRANCES BAARD",      phase:"Secondary", type:"Ordinary School",         sector:"Public",      city:"Kimberley",  province:"NC", lat:-28.747840, lng:24.778210, email:"admin@kimberleygirlshigh.org.za", tel:"8321275",    circuit:"F7", landOwnership:"Govt", examCentre:"2011403", emailAlt:"", telCode:"053" },
  { emis:"300041403", name:"HOËRSKOOL UPINGTON",              district:"ZF MGCAWU",          phase:"Secondary", type:"Ordinary School",         sector:"Public",      city:"UPINGTON",   province:"NC", lat:-28.456870, lng:21.243610, email:"skoolhoof@uppies1.co.za",          tel:"3321491",    circuit:"S1", landOwnership:"Govt", examCentre:"2041403", emailAlt:"", telCode:"054" },
  { emis:"300044402", name:"HOËRSKOOL KATHU",                 district:"JOHN TAOLO GAETSEWE",phase:"Secondary", type:"Ordinary School",         sector:"Public",      city:"KATHU",      province:"NC", lat:-27.693660, lng:23.047700, email:"hskathunc@gmail.com",             tel:"7231561",    circuit:"K1", landOwnership:"Govt", examCentre:"2044402", emailAlt:"", telCode:"053" },
  { emis:"300053201", name:"CURRO KATHU",                     district:"JOHN TAOLO GAETSEWE",phase:"Combined",  type:"Ordinary School",         sector:"Independent", city:"KATHU",      province:"NC", lat:-27.706974, lng:23.044356, email:"antoinette.v1@curro.co.za",       tel:"2854755",    circuit:"K3", landOwnership:"Private", examCentre:"", emailAlt:"", telCode:"087" },
  { emis:"300033401", name:"HANTAM SEKONDERE SKOOL",          district:"NAMAKWA",            phase:"Secondary", type:"Ordinary School",         sector:"Public",      city:"Calvinia",   province:"NC", lat:-31.464160, lng:19.759684, email:"hantamhigh@gmail.com",             tel:"3411295",    circuit:"Hantam", landOwnership:"Govt", examCentre:"2033401", emailAlt:"", telCode:"027" },
];

// ─────────────────────────────────────────────
// SEED DATA
// ─────────────────────────────────────────────
const initSchools = [
  { id:1, name:"BOITUMELO SPECIALSCHOOL",        emis:"300010701", province:"NC", district:"FRANCES BAARD",      circuit:"", capacity:980,  mobiles:4, mobileCap:35, enrolment:1200, teachers:32, risk:"High" },
  { id:2, name:"HOPETOWN GEKOMBINEERDE SKOOL",    emis:"300022301", province:"NC", district:"PIXLEY-KA-SEME",     circuit:"", capacity:900,  mobiles:2, mobileCap:35, enrolment:850,  teachers:28, risk:"Low" },
  { id:3, name:"HOËRSKOOL DOUGLAS GEKOMBINEERD",  emis:"300011305", province:"NC", district:"PIXLEY-KA-SEME",     circuit:"", capacity:950,  mobiles:3, mobileCap:35, enrolment:1050, teachers:30, risk:"Medium" },
];
const initAudits = [
  { id:1, schoolId:1, year:2024, date:"2024-03-15", risk:"High",   capWith:1120, capWithout:980,  overcapacity:"Yes", recommendations:"Urgent furniture replacement needed",  comments:"" },
  { id:2, schoolId:2, year:2024, date:"2024-04-02", risk:"Low",    capWith:970,  capWithout:900,  overcapacity:"No",  recommendations:"Minor repairs to lab furniture",        comments:"" },
  { id:3, schoolId:3, year:2024, date:"2024-05-10", risk:"Medium", capWith:1055, capWithout:950,  overcapacity:"Yes", recommendations:"Mobile classroom upgrade required",     comments:"" },
];
const initClassrooms = [
  { id:1, schoolId:1, room:"1A",    type:"Classroom", grade:"4",  spec:"4E1",     learners:42, isMobile:"No" },
  { id:2, schoolId:2, room:"Lab 1", type:"Lab",       grade:"11", spec:"Science", learners:30, isMobile:"No" },
];
const initFurniture = [
  { id:1, classroomId:1, category:"Learner",     ftype:"Learner Desk – Size 3 (Grade 4–6)", spec:"Grade 4–6",  chairType:"Plastic",  available:30, damaged:8, repairable:5, otherType:"", otherQty:0, condition:"Fair", auditDate:"2024-03-15" },
  { id:2, classroomId:2, category:"Specialised", ftype:"Science Lab Table",                  spec:"Science Lab",chairType:"Lab Stool",available:20, damaged:3, repairable:3, otherType:"", otherQty:0, condition:"Good", auditDate:"2024-05-10" },
];
const initRepairs = [
  { id:1, furnitureId:1, repairType:"Minor", destination:"Warehouse",   qty:5, status:"Completed",  allocated:"2024-03-20", completed:"2024-04-01" },
  { id:2, furnitureId:2, repairType:"Major", destination:"Labour Dept", qty:3, status:"In Progress", allocated:"2024-04-10", completed:"" },
];
const initStorage      = [{ id:1, schoolId:1, room:"Store 1", condition:"Fair", secure:"Yes", storedType:"Old Desks", qty:20, usable:"No", desc:"Old damaged desks" }];
const initDistribution = [{ id:1, schoolId:1, destination:"Warehouse", desc:"Double Desks", qty:10, source:"School", official:"T. Mokoena", position:"Principal", receiver:"S. Dlamini", role:"Store Manager", date:"2024-04-05", purpose:"Repair", ref:"REF-001", proofName:"", proofData:"" }];
const initConditions   = [{ id:1, classroomId:1, flooring:"Fair", flooringIssues:"Cracks", windows:"Poor", windowIssues:"Broken", locks:"Good", electricity:"Yes", mobile:"N/A", comments:"" }];
const initWarehouse    = [
  { id:1, date:"2024-03-01", supplier:"Edu Furniture Co.",   ftype:"Double Learner Desk – Size 3 (Grade 4–6)", spec:"Grade 4–6",  qty:50, condition:"Good", receivedBy:"S. Dlamini", ref:"WH-001", status:"In Stock",   notes:"New batch" },
  { id:2, date:"2024-04-15", supplier:"SA School Supplies",  ftype:"Learner Chair – Size 2 (Grade 1–3)",       spec:"Grade 1–3",  qty:80, condition:"Good", receivedBy:"S. Dlamini", ref:"WH-002", status:"Dispatched", notes:"Dispatched to Alexandra" },
];

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
const uid    = () => Date.now() + Math.random();
const fmtR   = n => "R " + Number(n||0).toLocaleString("en-ZA");

const BADGE_MAP = {
  High:       ["linear-gradient(135deg,#FEE2E2,#FECACA)","#991B1B"],
  Medium:     ["linear-gradient(135deg,#FEF3C7,#FDE68A)","#92400E"],
  Low:        ["linear-gradient(135deg,#D1FAE5,#A7F3D0)","#065F46"],
  Good:       ["linear-gradient(135deg,#D1FAE5,#A7F3D0)","#065F46"],
  Fair:       ["linear-gradient(135deg,#FEF3C7,#FDE68A)","#92400E"],
  Poor:       ["linear-gradient(135deg,#FEE2E2,#FECACA)","#991B1B"],
  Completed:  ["linear-gradient(135deg,#D1FAE5,#A7F3D0)","#065F46"],
  "In Progress":["linear-gradient(135deg,#DBEAFE,#BFDBFE)","#1E40AF"],
  Pending:    ["linear-gradient(135deg,#F3F4F6,#E5E7EB)","#374151"],
  Yes:        ["linear-gradient(135deg,#FEE2E2,#FECACA)","#991B1B"],
  No:         ["linear-gradient(135deg,#D1FAE5,#A7F3D0)","#065F46"],
  "In Stock": ["linear-gradient(135deg,#D1FAE5,#A7F3D0)","#065F46"],
  Dispatched: ["linear-gradient(135deg,#DBEAFE,#BFDBFE)","#1E40AF"],
  Reserved:   ["linear-gradient(135deg,#FEF3C7,#FDE68A)","#92400E"],
  Public:     ["linear-gradient(135deg,#EFF6FF,#DBEAFE)","#1E40AF"],
  Independent:["linear-gradient(135deg,#F5F3FF,#EDE9FE)","#5B21B6"],
  Primary:    ["linear-gradient(135deg,#D1FAE5,#A7F3D0)","#065F46"],
  Secondary:  ["linear-gradient(135deg,#FEF3C7,#FDE68A)","#92400E"],
  Combined:   ["linear-gradient(135deg,#DBEAFE,#BFDBFE)","#1E40AF"],
  Intermediate:["linear-gradient(135deg,#FDF2F8,#FCE7F3)","#831843"],
};

const Badge = ({ val }) => {
  const [bg, color] = BADGE_MAP[val] || ["linear-gradient(135deg,#F3F4F6,#E5E7EB)","#374151"];
  return <span style={{ background:bg, color, padding:"2px 10px", borderRadius:999, fontSize:12, fontWeight:500, boxShadow:"0 1px 3px rgba(0,0,0,0.08)", whiteSpace:"nowrap" }}>{val}</span>;
};

const toCSV = (cols, rows) => {
  const esc = v => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return [cols.join(","), ...rows.map(r => r.map(esc).join(","))].join("\n");
};

const downloadCSV = (filename, csv) => {
  const blob = new Blob([csv], { type:"text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
};

// ─────────────────────────────────────────────
// UI PRIMITIVES
// ─────────────────────────────────────────────
const Card = ({ children, style = {} }) => (
  <div style={{ background:"linear-gradient(145deg,#ffffff,#f3f6fb)", border:"0.5px solid #E0E7EF", borderRadius:14, padding:"1.25rem", boxShadow:"0 2px 8px rgba(37,99,235,0.06)", ...style }}>
    {children}
  </div>
);

const StatCard = ({ label, value, sub, color = "#2563EB" }) => {
  const gradMap = {
    "#2563EB":"linear-gradient(135deg,#EFF6FF,#DBEAFE)",
    "#7C3AED":"linear-gradient(135deg,#F5F3FF,#EDE9FE)",
    "#059669":"linear-gradient(135deg,#ECFDF5,#D1FAE5)",
    "#DC2626":"linear-gradient(135deg,#FFF5F5,#FEE2E2)",
    "#D97706":"linear-gradient(135deg,#FFFBEB,#FEF3C7)",
  };
  return (
    <div style={{ background: gradMap[color] || "#F9FAFB", borderRadius:12, padding:"1rem 1.25rem", border:`0.5px solid ${color}22`, boxShadow:`0 2px 8px ${color}14` }}>
      <p style={{ fontSize:12, color:"#6B7280", margin:"0 0 6px" }}>{label}</p>
      <p style={{ fontSize:24, fontWeight:600, color, margin:"0 0 2px" }}>{value}</p>
      {sub && <p style={{ fontSize:12, color:"#9CA3AF", margin:0 }}>{sub}</p>}
    </div>
  );
};

const SectionHeader = ({ title, onAdd, extra }) => (
  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1rem" }}>
    <h2 style={{ fontSize:18, fontWeight:500, margin:0, color:"#111827" }}>{title}</h2>
    <div style={{ display:"flex", gap:8, alignItems:"center" }}>
      {extra}
      {onAdd && <button onClick={onAdd} style={{ fontSize:13, color:"#2563EB", background:"none", border:"0.5px solid #BFDBFE", borderRadius:8, padding:"5px 14px", cursor:"pointer" }}>+ Add record</button>}
    </div>
  </div>
);

const DataTable = ({ cols, rows, renderRow }) => (
  <div style={{ overflowX:"auto" }}>
    <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
      <thead>
        <tr style={{ borderBottom:"0.5px solid #E5E7EB" }}>
          {cols.map(c => <th key={c} style={{ textAlign:"left", padding:"8px 12px", color:"#6B7280", fontWeight:500, whiteSpace:"nowrap" }}>{c}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0
          ? <tr><td colSpan={cols.length} style={{ padding:"2rem", textAlign:"center", color:"#9CA3AF" }}>No records yet</td></tr>
          : rows.map((r, i) => (
            <tr key={i} style={{ borderBottom:"0.5px solid #F3F4F6" }}>
              {renderRow(r).map((cell, j) => <td key={j} style={{ padding:"10px 12px", color:"#374151" }}>{cell}</td>)}
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);

const ExportBtn = ({ label, cols, rows, filename }) => (
  <button onClick={() => downloadCSV(filename, toCSV(cols, rows))}
    style={{ fontSize:12, color:"#059669", background:"#F0FDF4", border:"0.5px solid #A7F3D0", borderRadius:8, padding:"5px 12px", cursor:"pointer" }}>
    ⬇ {label}
  </button>
);

// ─────────────────────────────────────────────
// FORM HELPERS
// ─────────────────────────────────────────────
const inp = { width:"100%", padding:"7px 10px", border:"0.5px solid #D1D5DB", borderRadius:8, fontSize:13, boxSizing:"border-box", background:"#fff", color:"#111827" };
const sel = { ...inp };
const flbl = { fontSize:12, color:"#6B7280", marginBottom:4, display:"block" };
const Field  = ({ label, children }) => <div style={{ marginBottom:12 }}><label style={flbl}>{label}</label>{children}</div>;
const Row2   = ({ children }) => <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr",       gap:12 }}>{children}</div>;
const Row3   = ({ children }) => <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr",   gap:12 }}>{children}</div>;

const Modal = ({ title, onClose, onSave, children }) => (
  <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.35)", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center" }}>
    <div style={{ background:"#fff", borderRadius:14, padding:"1.5rem", width:580, maxHeight:"88vh", overflowY:"auto", boxSizing:"border-box" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.25rem" }}>
        <h3 style={{ margin:0, fontSize:16, fontWeight:500, color:"#111827" }}>{title}</h3>
        <button onClick={onClose} style={{ background:"none", border:"none", fontSize:18, cursor:"pointer", color:"#6B7280" }}>✕</button>
      </div>
      {children}
      <div style={{ display:"flex", gap:8, marginTop:"1.25rem", justifyContent:"flex-end" }}>
        <button onClick={onClose} style={{ padding:"7px 16px", borderRadius:8, border:"0.5px solid #D1D5DB", background:"#fff", fontSize:13, cursor:"pointer" }}>Cancel</button>
        <button onClick={onSave}  style={{ padding:"7px 16px", borderRadius:8, border:"none", background:"#2563EB", color:"#fff", fontSize:13, cursor:"pointer", fontWeight:500 }}>Save record</button>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// FORMS
// ─────────────────────────────────────────────
function SchoolForm({ initial, onSave, onClose }) {
  const [f, setF] = useState(initial || { name:"", emis:"", province:"NC", district:"", circuit:"", capacity:"", mobiles:"", mobileCap:"35", enrolment:"", teachers:"", risk:"Low" });
  const s = k => e => setF(p => ({ ...p, [k]:e.target.value }));
  return (
    <Modal title={initial ? "Edit school" : "Add school"} onClose={onClose} onSave={() => onSave(f)}>
      <Row2><Field label="School name"><input style={inp} value={f.name} onChange={s("name")}/></Field><Field label="EMIS number"><input style={inp} value={f.emis} onChange={s("emis")}/></Field></Row2>
      <Row2><Field label="Province"><input style={inp} value={f.province || "NC"} readOnly/></Field><Field label="District"><input style={inp} value={f.district} onChange={s("district")}/></Field></Row2>
      <Row3><Field label="Capacity"><input style={inp} type="number" value={f.capacity} onChange={s("capacity")}/></Field><Field label="Mobiles"><input style={inp} type="number" value={f.mobiles} onChange={s("mobiles")}/></Field><Field label="Per mobile"><input style={inp} type="number" value={f.mobileCap} onChange={s("mobileCap")}/></Field></Row3>
      <Row3><Field label="Enrolment"><input style={inp} type="number" value={f.enrolment} onChange={s("enrolment")}/></Field><Field label="Teachers"><input style={inp} type="number" value={f.teachers} onChange={s("teachers")}/></Field><Field label="Risk level"><select style={sel} value={f.risk} onChange={s("risk")}>{["Low","Medium","High"].map(v=><option key={v}>{v}</option>)}</select></Field></Row3>
    </Modal>
  );
}

function AuditForm({ initial, schools, onSave, onClose }) {
  const [f, setF] = useState(initial || { schoolId:"", year:new Date().getFullYear(), date:"", risk:"Low", capWith:"", capWithout:"", overcapacity:"No", recommendations:"", comments:"" });
  const s = k => e => setF(p => ({ ...p, [k]:e.target.value }));
  return (
    <Modal title="New audit" onClose={onClose} onSave={() => onSave(f)}>
      <Row2><Field label="School"><select style={sel} value={f.schoolId} onChange={s("schoolId")}><option value="">Select</option>{schools.map(sc=><option key={sc.id} value={sc.id}>{sc.name}</option>)}</select></Field><Field label="Year"><input style={inp} type="number" value={f.year} onChange={s("year")}/></Field></Row2>
      <Row2><Field label="Date"><input style={inp} type="date" value={f.date} onChange={s("date")}/></Field><Field label="Risk"><select style={sel} value={f.risk} onChange={s("risk")}>{["Low","Medium","High"].map(v=><option key={v}>{v}</option>)}</select></Field></Row2>
      <Row3><Field label="Cap. with mobiles"><input style={inp} type="number" value={f.capWith} onChange={s("capWith")}/></Field><Field label="Cap. without mobiles"><input style={inp} type="number" value={f.capWithout} onChange={s("capWithout")}/></Field><Field label="Overcapacity"><select style={sel} value={f.overcapacity} onChange={s("overcapacity")}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field></Row3>
      <Field label="Recommendations"><textarea style={{ ...inp, minHeight:60, resize:"vertical" }} value={f.recommendations} onChange={s("recommendations")}/></Field>
      <Field label="Comments"><textarea style={{ ...inp, minHeight:40, resize:"vertical" }} value={f.comments} onChange={s("comments")}/></Field>
    </Modal>
  );
}

function CombinedCaptureForm({ initial, schools, onSave, onClose }) {
  const [f, setF] = useState(initial || {
    schoolId:"", year:new Date().getFullYear(), date:new Date().toISOString().slice(0,10), risk:"Low", capWith:"", capWithout:"", overcapacity:"No", recommendations:"", comments:"",
    room:"", type:"Classroom", grade:"", spec:"", learners:"", isMobile:"No",
    category:"Learner", ftype:"", chairType:"Penny 1 Plastic Chair – Size 2 (Grade 1–3)", available:"", damaged:"", repairable:"", otherType:"", otherQty:"", condition:"Good", auditDate:new Date().toISOString().slice(0,10)
  });
  const s = k => e => setF(p => ({ ...p, [k]:e.target.value }));
  return (
    <Modal title="Capture audit, classroom & furniture" onClose={onClose} onSave={() => onSave({
      audit: {
        schoolId: f.schoolId,
        year: f.year,
        date: f.date,
        risk: f.risk,
        capWith: f.capWith,
        capWithout: f.capWithout,
        overcapacity: f.overcapacity,
        recommendations: f.recommendations,
        comments: f.comments,
      },
      classroom: {
        schoolId: f.schoolId,
        room: f.room,
        type: f.type,
        grade: f.grade,
        spec: f.spec,
        learners: f.learners,
        isMobile: f.isMobile,
      },
      furniture: {
        category: f.category,
        ftype: f.ftype,
        spec: f.spec,
        chairType: f.chairType,
        available: f.available,
        damaged: f.damaged,
        repairable: f.repairable,
        otherType: f.otherType,
        otherQty: f.otherQty,
        condition: f.condition,
        auditDate: f.auditDate,
      }
    })}>
      <h4 style={{ margin:"0 0 12px", fontSize:14, color:"#111827" }}>Audit details</h4>
      <Row2><Field label="School"><select style={sel} value={f.schoolId} onChange={s("schoolId")}><option value="">Select</option>{schools.map(sc=><option key={sc.id} value={sc.id}>{sc.name}</option>)}</select></Field><Field label="Year"><input style={inp} type="number" value={f.year} onChange={s("year")}/></Field></Row2>
      <Row2><Field label="Date"><input style={inp} type="date" value={f.date} onChange={s("date")}/></Field><Field label="Risk"><select style={sel} value={f.risk} onChange={s("risk")}>{["Low","Medium","High"].map(v=><option key={v}>{v}</option>)}</select></Field></Row2>
      <Row3><Field label="Cap. with mobiles"><input style={inp} type="number" value={f.capWith} onChange={s("capWith")}/></Field><Field label="Cap. without mobiles"><input style={inp} type="number" value={f.capWithout} onChange={s("capWithout")}/></Field><Field label="Overcapacity"><select style={sel} value={f.overcapacity} onChange={s("overcapacity")}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field></Row3>
      <Field label="Recommendations"><textarea style={{ ...inp, minHeight:60, resize:"vertical" }} value={f.recommendations} onChange={s("recommendations")}/></Field>
      <Field label="Comments"><textarea style={{ ...inp, minHeight:40, resize:"vertical" }} value={f.comments} onChange={s("comments")}/></Field>
      <h4 style={{ margin:"1.25rem 0 12px", fontSize:14, color:"#111827" }}>Classroom details</h4>
      <Row2><Field label="Room"><input style={inp} value={f.room} onChange={s("room")}/></Field><Field label="Type"><select style={sel} value={f.type} onChange={s("type")}>{["Classroom","Lab","Office","Storage"].map(v=><option key={v}>{v}</option>)}</select></Field></Row2>
      <Row3><Field label="Grade"><input style={inp} value={f.grade} onChange={s("grade")}/></Field><Field label="Spec"><input style={inp} value={f.spec} onChange={s("spec")}/></Field><Field label="Learners"><input style={inp} type="number" value={f.learners} onChange={s("learners")}/></Field></Row3>
      <Field label="Mobile?"><select style={sel} value={f.isMobile} onChange={s("isMobile")}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field>
      <h4 style={{ margin:"1.25rem 0 12px", fontSize:14, color:"#111827" }}>Furniture details</h4>
      <Row2><Field label="Category"><select style={sel} value={f.category} onChange={s("category")}>{["Learner","Teacher","Admin","Specialised"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Furniture type"><input style={inp} value={f.ftype} onChange={s("ftype")}/></Field></Row2>
      <Row2><Field label="Chair type"><select style={sel} value={f.chairType} onChange={s("chairType")}>{["Penny 1 Plastic Chair – Size 2 (Grade 1–3)","Penny 1 Wood Chair – Size 2 (Grade 1–3)","Penny 4 Plastic Chair – Size 3 (Grade 4–6)","Utility Plastic Chair – Size 4 (Grade 7–12)"].map(v=> <option key={v}>{v}</option>)}</select></Field><Field label="Available"><input style={inp} type="number" value={f.available} onChange={s("available")}/></Field></Row2>
      <Row3><Field label="Damaged"><input style={inp} type="number" value={f.damaged} onChange={s("damaged")}/></Field><Field label="Repairable"><input style={inp} type="number" value={f.repairable} onChange={s("repairable")}/></Field><Field label="Condition"><select style={sel} value={f.condition} onChange={s("condition")}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field></Row3>
      <Field label="Other furniture details"><input style={inp} value={f.otherType} onChange={s("otherType")}/></Field>
      <Row2><Field label="Other quantity"><input style={inp} type="number" value={f.otherQty} onChange={s("otherQty")}/></Field><Field label="Audit date"><input style={inp} type="date" value={f.auditDate} onChange={s("auditDate")}/></Field></Row2>
    </Modal>
  );
}

function ClassroomForm({ schools, onSave, onClose }) {
  const [f, setF] = useState({ schoolId:"", room:"", type:"Classroom", grade:"", spec:"", learners:"", isMobile:"No" });
  const s = k => e => setF(p => ({ ...p, [k]:e.target.value }));
  return (
    <Modal title="Add classroom" onClose={onClose} onSave={() => onSave(f)}>
      <Row2><Field label="School"><select style={sel} value={f.schoolId} onChange={s("schoolId")}><option value="">Select</option>{schools.map(sc=><option key={sc.id} value={sc.id}>{sc.name}</option>)}</select></Field><Field label="Room number"><input style={inp} value={f.room} onChange={s("room")}/></Field></Row2>
      <Row2><Field label="Room type"><select style={sel} value={f.type} onChange={s("type")}>{["Classroom","Lab","Office","Storage"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Is mobile?"><select style={sel} value={f.isMobile} onChange={s("isMobile")}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field></Row2>
      <Row3><Field label="Grade (R–12)"><input style={inp} value={f.grade} onChange={s("grade")}/></Field><Field label="Spec (e.g. 4E1)"><input style={inp} value={f.spec} onChange={s("spec")}/></Field><Field label="Learner count"><input style={inp} type="number" value={f.learners} onChange={s("learners")}/></Field></Row3>
    </Modal>
  );
}

function FurnitureForm({ classrooms, schools, onSave, onClose }) {
  const [f, setF] = useState({ schoolId:"", classroomId:"", category:"Learner", ftype:"", spec:"", chairType:"", available:"", damaged:"", repairable:"", otherType:"", otherQty:"", condition:"Good", auditDate:new Date().toISOString().slice(0,10) });
  const s = k => e => setF(p => ({ ...p, [k]:e.target.value }));
  const filteredClassrooms = classrooms.filter(c => !f.schoolId || c.schoolId.toString() === f.schoolId);
  useEffect(() => {
    if (!f.schoolId) return;
    const selectedClassroom = classrooms.find(c => c.id.toString() === f.classroomId);
    if (selectedClassroom && selectedClassroom.schoolId.toString() !== f.schoolId) {
      setF(p => ({ ...p, classroomId: "" }));
    }
  }, [f.schoolId, f.classroomId, classrooms]);
  const roomLabel = c => { const sc = schools.find(x => x.id === c.schoolId); return `${sc?.name || "?"} — Room ${c.room}`; };
  return (
    <Modal title="Add furniture" onClose={onClose} onSave={() => onSave(f)}>
      <Row2>
        <Field label="School"><select style={sel} value={f.schoolId} onChange={s("schoolId")}><option value="">Select</option>{schools.map(sc=><option key={sc.id} value={sc.id}>{sc.name}</option>)}</select></Field>
        <Field label="Classroom"><select style={sel} value={f.classroomId} onChange={s("classroomId")}><option value="">Select</option>{filteredClassrooms.map(c=><option key={c.id} value={c.id}>{roomLabel(c)}</option>)}</select></Field>
      </Row2>
      <Row2>
        <Field label="Category"><select style={sel} value={f.category} onChange={s("category")}>{["Learner","Teacher","Admin","Specialised"].map(v=><option key={v}>{v}</option>)}</select></Field>
        <Field label="DBE Furniture type"><select style={sel} value={f.ftype} onChange={s("ftype")}><option value="">Select...</option>{DBE_FURNITURE.map(v=><option key={v} value={v}>{v}</option>)}<option value="Other">Other (specify below)</option></select></Field>
      </Row2>
      {f.ftype === "Other" && <Field label="Specify type"><input style={inp} value={f.otherType} onChange={s("otherType")} placeholder="Describe item"/></Field>}
      <Row2>
        <Field label="Audit date"><input style={inp} type="date" value={f.auditDate} onChange={s("auditDate")}/></Field>
        <Field label="Specification"><input style={inp} value={f.spec} onChange={s("spec")} placeholder="e.g. Grade 4–6"/></Field>
      </Row2>
      <Row2>
        <Field label="Chair type"><select style={sel} value={f.chairType} onChange={s("chairType")}>{["Lab Stool","Penny 1 Wood","Penny 1 Plastic","Penny 4 Wood","Penny 4 Plastic","Utility Plastic"].map(v=><option key={v}>{v}</option>)}</select></Field>
        <Field label="Available"><input style={inp} type="number" value={f.available} onChange={s("available")}/></Field>
      </Row2>
      <Row3>
        <Field label="Damaged"><input style={inp} type="number" value={f.damaged} onChange={s("damaged")}/></Field>
        <Field label="Repairable"><input style={inp} type="number" value={f.repairable} onChange={s("repairable")}/></Field>
        <Field label="Condition"><select style={sel} value={f.condition} onChange={s("condition")}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field>
      </Row3>
      <Row2>
        <Field label="Other qty"><input style={inp} type="number" value={f.otherQty} onChange={s("otherQty")}/></Field>
      </Row2>
    </Modal>
  );
}

function ConditionForm({ classrooms, schools, onSave, onClose }) {
  const [f, setF] = useState({ classroomId:"", flooring:"Good", flooringIssues:"", windows:"Good", windowIssues:"", locks:"Good", electricity:"Yes", mobile:"N/A", comments:"" });
  const s = k => e => setF(p => ({ ...p, [k]:e.target.value }));
  const roomLabel = c => { const sc = schools.find(x => x.id === c.schoolId); return `${sc?.name || "?"} — Room ${c.room}`; };
  return (
    <Modal title="Condition assessment" onClose={onClose} onSave={() => onSave(f)}>
      <Field label="Classroom"><select style={sel} value={f.classroomId} onChange={s("classroomId")}><option value="">Select</option>{classrooms.map(c=><option key={c.id} value={c.id}>{roomLabel(c)}</option>)}</select></Field>
      <Row2><Field label="Flooring condition"><select style={sel} value={f.flooring} onChange={s("flooring")}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Flooring issues"><input style={inp} value={f.flooringIssues} onChange={s("flooringIssues")} placeholder="e.g. Cracks, Holes"/></Field></Row2>
      <Row2><Field label="Windows condition"><select style={sel} value={f.windows} onChange={s("windows")}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Window issues"><input style={inp} value={f.windowIssues} onChange={s("windowIssues")} placeholder="e.g. Broken, Missing"/></Field></Row2>
      <Row3><Field label="Lock condition"><select style={sel} value={f.locks} onChange={s("locks")}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Electricity?"><select style={sel} value={f.electricity} onChange={s("electricity")}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Mobile condition"><input style={inp} value={f.mobile} onChange={s("mobile")} placeholder="N/A or condition"/></Field></Row3>
      <Field label="Comments"><textarea style={{ ...inp, minHeight:50, resize:"vertical" }} value={f.comments} onChange={s("comments")}/></Field>
    </Modal>
  );
}

function RepairForm({ furniture, onSave, onClose }) {
  const [f, setF] = useState({ furnitureId:"", repairType:"Minor", destination:"Warehouse", qty:"", status:"Pending", allocated:"", completed:"" });
  const s = k => e => setF(p => ({ ...p, [k]:e.target.value }));
  return (
    <Modal title="Log repair" onClose={onClose} onSave={() => onSave(f)}>
      <Field label="Furniture item"><select style={sel} value={f.furnitureId} onChange={s("furnitureId")}><option value="">Select</option>{furniture.map(fu=><option key={fu.id} value={fu.id}>{fu.ftype} — {fu.spec}</option>)}</select></Field>
      <Row2><Field label="Repair type"><select style={sel} value={f.repairType} onChange={s("repairType")}>{["Minor","Major"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Destination"><select style={sel} value={f.destination} onChange={s("destination")}>{["Warehouse","Labour Dept"].map(v=><option key={v}>{v}</option>)}</select></Field></Row2>
      <Row2><Field label="Quantity"><input style={inp} type="number" value={f.qty} onChange={s("qty")}/></Field><Field label="Status"><select style={sel} value={f.status} onChange={s("status")}>{["Pending","In Progress","Completed"].map(v=><option key={v}>{v}</option>)}</select></Field></Row2>
      <Row2><Field label="Date allocated"><input style={inp} type="date" value={f.allocated} onChange={s("allocated")}/></Field><Field label="Date completed"><input style={inp} type="date" value={f.completed} onChange={s("completed")}/></Field></Row2>
    </Modal>
  );
}

function StorageForm({ schools, onSave, onClose }) {
  const [f, setF] = useState({ schoolId:"", room:"", condition:"Good", secure:"Yes", storedType:"", qty:"", usable:"No", desc:"" });
  const s = k => e => setF(p => ({ ...p, [k]:e.target.value }));
  return (
    <Modal title="Add storage record" onClose={onClose} onSave={() => onSave(f)}>
      <Row2><Field label="School"><select style={sel} value={f.schoolId} onChange={s("schoolId")}><option value="">Select</option>{schools.map(sc=><option key={sc.id} value={sc.id}>{sc.name}</option>)}</select></Field><Field label="Room number"><input style={inp} value={f.room} onChange={s("room")}/></Field></Row2>
      <Row3><Field label="Condition"><select style={sel} value={f.condition} onChange={s("condition")}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Secure?"><select style={sel} value={f.secure} onChange={s("secure")}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Usable?"><select style={sel} value={f.usable} onChange={s("usable")}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field></Row3>
      <Row2><Field label="Stored type"><input style={inp} value={f.storedType} onChange={s("storedType")}/></Field><Field label="Quantity"><input style={inp} type="number" value={f.qty} onChange={s("qty")}/></Field></Row2>
      <Field label="Description"><textarea style={{ ...inp, minHeight:50, resize:"vertical" }} value={f.desc} onChange={s("desc")}/></Field>
    </Modal>
  );
}

function DistributionForm({ schools, onSave, onClose }) {
  const [f, setF] = useState({ schoolId:"", destination:"", desc:"", qty:"", source:"", official:"", position:"", receiver:"", role:"", date:"", purpose:"Delivery", ref:"", proofName:"", proofData:"" });
  const s = k => e => setF(p => ({ ...p, [k]:e.target.value }));
  const handleProofUpload = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setF(p => ({ ...p, proofName: file.name, proofData: reader.result }));
    reader.readAsDataURL(file);
  };
  return (
    <Modal title="Add distribution record" onClose={onClose} onSave={() => onSave(f)}>
      <Row2><Field label="School"><select style={sel} value={f.schoolId} onChange={s("schoolId")}><option value="">Select</option>{schools.map(sc=><option key={sc.id} value={sc.id}>{sc.name}</option>)}</select></Field><Field label="Purpose"><select style={sel} value={f.purpose} onChange={s("purpose")}>{["Delivery","Collection","Repair"].map(v=><option key={v}>{v}</option>)}</select></Field></Row2>
      <Row2><Field label="Destination"><input style={inp} value={f.destination} onChange={s("destination")}/></Field><Field label="Source location"><input style={inp} value={f.source} onChange={s("source")}/></Field></Row2>
      <Row2><Field label="Description"><input style={inp} value={f.desc} onChange={s("desc")}/></Field><Field label="Quantity"><input style={inp} type="number" value={f.qty} onChange={s("qty")}/></Field></Row2>
      <Row2><Field label="Official name"><input style={inp} value={f.official} onChange={s("official")}/></Field><Field label="Position"><input style={inp} value={f.position} onChange={s("position")}/></Field></Row2>
      <Row2><Field label="Receiving person"><input style={inp} value={f.receiver} onChange={s("receiver")}/></Field><Field label="Receiving role"><input style={inp} value={f.role} onChange={s("role")}/></Field></Row2>
      <Row2><Field label="Date"><input style={inp} type="date" value={f.date} onChange={s("date")}/></Field><Field label="Reference number"><input style={inp} value={f.ref} onChange={s("ref")}/></Field></Row2>
      <Field label="Proof of delivery"><input type="file" accept="application/pdf,image/*" onChange={handleProofUpload} style={inp} />{f.proofName && <div style={{ marginTop:6, fontSize:12, color:"#4B5563" }}>Selected: {f.proofName}</div>}</Field>
    </Modal>
  );
}

function WarehouseForm({ onSave, onClose }) {
  const [f, setF] = useState({ date:"", supplier:"", ftype:"", spec:"", qty:"", condition:"Good", receivedBy:"", ref:"", status:"In Stock", notes:"" });
  const s = k => e => setF(p => ({ ...p, [k]:e.target.value }));
  return (
    <Modal title="Log warehouse delivery" onClose={onClose} onSave={() => onSave(f)}>
      <Row2><Field label="Date received"><input style={inp} type="date" value={f.date} onChange={s("date")}/></Field><Field label="Supplier"><input style={inp} value={f.supplier} onChange={s("supplier")}/></Field></Row2>
      <Field label="DBE Furniture type"><select style={sel} value={f.ftype} onChange={s("ftype")}><option value="">Select...</option>{DBE_FURNITURE.map(v=><option key={v} value={v}>{v}</option>)}<option value="Other">Other</option></select></Field>
      <Row3><Field label="Quantity"><input style={inp} type="number" value={f.qty} onChange={s("qty")}/></Field><Field label="Condition"><select style={sel} value={f.condition} onChange={s("condition")}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Status"><select style={sel} value={f.status} onChange={s("status")}>{["In Stock","Reserved","Dispatched"].map(v=><option key={v}>{v}</option>)}</select></Field></Row3>
      <Row2><Field label="Received by"><input style={inp} value={f.receivedBy} onChange={s("receivedBy")}/></Field><Field label="Reference number"><input style={inp} value={f.ref} onChange={s("ref")}/></Field></Row2>
      <Field label="Notes"><textarea style={{ ...inp, minHeight:50, resize:"vertical" }} value={f.notes} onChange={s("notes")}/></Field>
    </Modal>
  );
}

// ─────────────────────────────────────────────
// EMIS PAGE
// ─────────────────────────────────────────────
function EmisPage({ onImport, onCreateAudit }) {
  const [search,       setSearch]       = useState("");
  const [distFilter,   setDistFilter]   = useState("All");
  const [phaseFilter,  setPhaseFilter]  = useState("All");
  const [sectorFilter, setSectorFilter] = useState("All");
  const [selected,     setSelected]     = useState(null);
  const [uploadedData, setUploadedData] = useState([]);
  const [uploadMsg,    setUploadMsg]    = useState("");

  const allData  = uploadedData.length > 0 ? uploadedData : EMIS_SAMPLE;
  const districts = ["All", ...new Set(allData.map(s => s.district))].sort();
  const exportCols = useMemo(() => {
    const keys = new Set(allData.flatMap(s => Object.keys(s)));
    const order = ["emis","name","province","district","phase","type","sector","status","city","circuit","landOwnership","examCentre","email","emailAlt","telCode","tel","lat","lng"];
    return [
      ...order.filter(k => keys.has(k)),
      ...[...keys].filter(k => !order.includes(k)).sort()
    ];
  }, [allData]);

  const handleUpload = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const text = ev.target.result;
      const sep   = text.indexOf("\t") > -1 ? "\t" : text.indexOf(";") > -1 ? ";" : ",";
      const lines = text.split(/\r?\n/).filter(Boolean);
      const normalizeHeader = h => h.toLowerCase().trim().replace(/['"]/g, "").replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
      const rawHeaders = lines[0].split(sep).map(h => normalizeHeader(h));
      const get = (row, ...keys) => {
        for (const k of keys) {
          if (row[k] !== undefined && row[k] !== "") return row[k].toString().trim().replace(/^"|"$/g, "");
        }
        return "";
      };
      const phaseMap = { primary:"Primary", secondary:"Secondary", combined:"Combined", intermediate:"Intermediate", "special needs education":"Special Needs Education" };
      const parsed = lines.slice(1).map(line => {
        const row = line.split(sep).map(cell => cell.toString().trim().replace(/^"|"$/g, ""));
        const rawRow = Object.fromEntries(rawHeaders.map((h, i) => [h, row[i] || ""]));
        const emisRaw = get(rawRow, "emiscode", "emis_code", "emis");
        const nameRaw = get(rawRow, "institution_name", "name", "school_name");
        if (!emisRaw && !nameRaw) return null;
        const phaseRaw = get(rawRow, "institution_phase", "phase");
        return {
          ...rawRow,
          emis:  emisRaw,
          name:  nameRaw,
          district:      get(rawRow, "district"),
          phase:         phaseMap[phaseRaw.toLowerCase()] || phaseRaw,
          type:          get(rawRow, "institution_type", "type"),
          sector:        get(rawRow, "sector", "legal_status").toLowerCase().includes("public") ? "Public" : "Independent",
          status:        get(rawRow, "practical_status_of_the_institution", "status"),
          city:          get(rawRow, "city_town", "city", "town"),
          province:      rawRow.province || "NC",
          lat:           parseFloat(get(rawRow, "latitude",  "lat"))  || 0,
          lng:           parseFloat(get(rawRow, "longitude", "lng")) || 0,
          email:         get(rawRow, "email"),
          emailAlt:      get(rawRow, "emailalt", "email_alt"),
          tel:           get(rawRow, "telephone1", "tel1", "telephone"),
          telCode:       get(rawRow, "telcode1", "telcode"),
          circuit:       get(rawRow, "circuit"),
          landOwnership: get(rawRow, "landownership", "land_ownership"),
          examCentre:    get(rawRow, "examcentre", "exam_centre"),
        };
      }).filter(r => {
        if (!r || (!r.emis && !r.name)) return false;
        const prov = (r.province || "").trim().toUpperCase().replace(/[^A-Z]/g, "");
        return prov === "NC" || prov === "NORTHERNCAPE" || prov === "NORTHERN";
      });
      setUploadedData(parsed);
      setUploadMsg(`✓ Loaded ${parsed.length} NC schools from ${file.name}`);
    };
    reader.readAsText(file);
  };

  const filtered = useMemo(() => allData.filter(s => {
    const q = search.toLowerCase();
    return (!q || s.name.toLowerCase().includes(q) || s.emis.includes(q) || (s.city || "").toLowerCase().includes(q))
      && (distFilter  === "All" || s.district === distFilter)
      && (phaseFilter  === "All" || s.phase    === phaseFilter)
      && (sectorFilter === "All" || s.sector   === sectorFilter);
  }), [search, distFilter, phaseFilter, sectorFilter, allData]);

  return (
    <div>
      <SectionHeader title="EMIS School Database" extra={
        <ExportBtn label="CSV" filename="emis_schools.csv"
          cols={exportCols.map(c => c.replace(/([A-Z])/g, " $1").replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()))}
          rows={allData.map(s => exportCols.map(c => s[c] || ""))}/>
      }/>

      {/* Upload panel */}
      <Card style={{ marginBottom:"1.25rem", borderColor:"#BFDBFE", background:"linear-gradient(135deg,#EFF6FF,#DBEAFE)" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <div>
            <p style={{ fontWeight:500, fontSize:14, margin:"0 0 2px", color:"#1E40AF" }}>📂 Upload full EMIS dataset</p>
            <p style={{ fontSize:12, color:"#3B82F6", margin:0 }}>Upload the NC EMIS .txt or tab-separated CSV to load all schools. Currently showing {allData.length} schools.</p>
            {uploadMsg && <p style={{ fontSize:12, color:"#065F46", margin:"4px 0 0", fontWeight:500 }}>{uploadMsg}</p>}
          </div>
          <label style={{ padding:"7px 16px", borderRadius:8, background:"#2563EB", color:"#fff", fontSize:13, cursor:"pointer", fontWeight:500, whiteSpace:"nowrap" }}>
            Choose file
            <input type="file" accept=".txt,.csv,.tsv" onChange={handleUpload} style={{ display:"none" }}/>
          </label>
        </div>
      </Card>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:"1.25rem" }}>
        <StatCard label="Total records" value={allData.length} sub="Northern Cape" color="#2563EB"/>
        <StatCard label="Public"        value={allData.filter(s=>s.sector==="Public").length} color="#059669"/>
        <StatCard label="Independent"   value={allData.filter(s=>s.sector==="Independent").length} color="#7C3AED"/>
        <StatCard label="Districts"     value={new Set(allData.map(s=>s.district)).size} color="#D97706"/>
      </div>

      <Card style={{ marginBottom:"1rem" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:10 }}>
          <div><label style={flbl}>Search</label><input style={inp} placeholder="Name / EMIS / town..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
          <div><label style={flbl}>District</label><select style={sel} value={distFilter} onChange={e=>setDistFilter(e.target.value)}>{districts.map(d=><option key={d}>{d}</option>)}</select></div>
          <div><label style={flbl}>Phase</label><select style={sel} value={phaseFilter} onChange={e=>setPhaseFilter(e.target.value)}>{["All","Primary","Secondary","Combined","Intermediate"].map(p=><option key={p}>{p}</option>)}</select></div>
          <div><label style={flbl}>Sector</label><select style={sel} value={sectorFilter} onChange={e=>setSectorFilter(e.target.value)}>{["All","Public","Independent"].map(x=><option key={x}>{x}</option>)}</select></div>
        </div>
      </Card>

      <Card>
        <p style={{ fontSize:12, color:"#6B7280", margin:"0 0 10px" }}>Showing {filtered.length} of {allData.length} schools</p>
        <DataTable cols={["EMIS","School Name","District","Phase","Sector","City","Action"]} rows={filtered}
          renderRow={s => [
            <span style={{ fontSize:12, color:"#6B7280" }}>{s.emis}</span>,
            <span style={{ fontWeight:500 }}>{s.name}</span>,
            s.district, <Badge val={s.phase}/>, <Badge val={s.sector}/>, s.city,
            <button onClick={() => setSelected(s)} style={{ fontSize:12, color:"#2563EB", background:"#EFF6FF", border:"0.5px solid #BFDBFE", borderRadius:6, padding:"3px 10px", cursor:"pointer" }}>View</button>
          ]}/>
      </Card>

      {selected && (
        <Card style={{ marginTop:"1rem", borderColor:"#BFDBFE" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
            <div>
              <p style={{ fontWeight:500, fontSize:15, margin:"0 0 2px" }}>{selected.name}</p>
              <p style={{ fontSize:12, color:"#6B7280", margin:0 }}>EMIS: {selected.emis} · {selected.district}</p>
            </div>
            <button onClick={() => setSelected(null)} style={{ background:"none", border:"none", color:"#9CA3AF", cursor:"pointer", fontSize:16 }}>✕</button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:14 }}>
            {[
              ["Phase",         selected.phase],
              ["Sector",        selected.sector],
              ["City/Town",     selected.city],
              ["Circuit",       selected.circuit    || "—"],
              ["Land Ownership",selected.landOwnership || "—"],
              ["Status",        selected.status     || "—"],
              ["Email",         selected.email      || "—"],
              ["Alt Email",     selected.emailAlt   || "—"],
              ["Tel",           selected.telCode && selected.tel ? `(${selected.telCode}) ${selected.tel}` : selected.tel || "—"],
              ["Exam Centre",   selected.examCentre || "—"],
              ["Latitude",      selected.lat        || "—"],
              ["Longitude",     selected.lng        || "—"],
            ].map(([l, v]) => (
              <div key={l} style={{ background:"#F9FAFB", borderRadius:8, padding:"8px 10px" }}>
                <p style={{ fontSize:11, color:"#6B7280", margin:"0 0 2px" }}>{l}</p>
                <p style={{ fontSize:13, fontWeight:500, margin:0, wordBreak:"break-all" }}>{v}</p>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            <button onClick={() => { onImport(selected); setSelected(null); }}
              style={{ padding:"8px 18px", borderRadius:8, border:"none", background:"#2563EB", color:"#fff", fontSize:13, cursor:"pointer", fontWeight:500 }}>
              Import into Audit Schools →
            </button>
            <button onClick={() => { onCreateAudit(selected); setSelected(null); }}
              style={{ padding:"8px 18px", borderRadius:8, border:"none", background:"#059669", color:"#fff", fontSize:13, cursor:"pointer", fontWeight:500 }}>
              Create audit record →
            </button>
          </div>
        </Card>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// EXPORT PAGE
// ─────────────────────────────────────────────
function ExportPage({ schools, audits, classrooms, furniture, conditions, repairs, warehouse, storage, distribution }) {
  const schoolExportCols = useMemo(() => {
    const keys = new Set(schools.flatMap(s => Object.keys(s)));
    const order = ["name","emis","province","district","phase","type","sector","status","city","circuit","landOwnership","examCentre","email","emailAlt","telCode","tel","lat","lng","capacity","mobiles","mobileCap","enrolment","teachers","risk"];
    return [
      ...order.filter(k => keys.has(k)),
      ...[...keys].filter(k => !order.includes(k)).sort()
    ];
  }, [schools]);
  const formatHeader = key => key.replace(/([A-Z])/g, " $1").replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());

  const exports = [
    { label:"Schools",           desc:"All audit school records",      icon:"🏫", file:"schools.csv",      cols:schoolExportCols.map(formatHeader), rows:schools.map(s=>schoolExportCols.map(c=>s[c]||"")) },
    { label:"Audits",            desc:"All school audit records",      icon:"📋", file:"audits.csv",       cols:["School","Year","Date","Risk","Overcapacity","Recommendations"],                                                                  rows:audits.map(a=>{const sc=schools.find(s=>s.id==a.schoolId);return[sc?.name||"",a.year,a.date,a.risk,a.overcapacity,a.recommendations];}) },
    { label:"Classrooms",        desc:"All classroom records",         icon:"🚪", file:"classrooms.csv",   cols:["School","Room","Type","Grade","Spec","Learners","Mobile"],                                                                       rows:classrooms.map(c=>{const sc=schools.find(s=>s.id==c.schoolId);return[sc?.name||"",c.room,c.type,c.grade,c.spec,c.learners,c.isMobile];}) },
    { label:"Furniture",         desc:"All furniture items",           icon:"🪑", file:"furniture.csv",    cols:["School","Room","Category","Type","Available","Damaged","Repairable","Condition"],                                               rows:furniture.map(f=>{const cl=classrooms.find(c=>c.id==f.classroomId);const sc=schools.find(s=>s.id==cl?.schoolId);return[sc?.name||"",cl?.room||"",f.category,f.ftype,f.available,f.damaged,f.repairable,f.condition];}) },
    { label:"Conditions",        desc:"Infrastructure assessments",    icon:"🔍", file:"conditions.csv",   cols:["School","Room","Flooring","Flooring Issues","Windows","Electricity","Locks"],                                                   rows:conditions.map(c=>{const cl=classrooms.find(r=>r.id==c.classroomId);const sc=schools.find(s=>s.id==cl?.schoolId);return[sc?.name||"",cl?.room||"",c.flooring,c.flooringIssues,c.windows,c.electricity,c.locks];}) },
    { label:"Repairs",           desc:"All repair jobs",               icon:"🔧", file:"repairs.csv",      cols:["Furniture","Repair Type","Destination","Qty","Status","Allocated","Completed"],                                                 rows:repairs.map(r=>{const fu=furniture.find(f=>f.id==r.furnitureId);return[fu?.ftype||"",r.repairType,r.destination,r.qty,r.status,r.allocated,r.completed||""];}) },
    { label:"Warehouse",         desc:"New furniture deliveries",      icon:"🏭", file:"warehouse.csv",    cols:["Date","Supplier","Type","Qty","Condition","Ref","Status"],                                                                       rows:warehouse.map(w=>[w.date,w.supplier,w.ftype,w.qty,w.condition,w.ref,w.status]) },
    { label:"Storage",           desc:"Storage room records",          icon:"📦", file:"storage.csv",      cols:["School","Room","Condition","Secure","Stored Type","Qty","Usable"],                                                               rows:storage.map(r=>{const sc=schools.find(s=>s.id==r.schoolId);return[sc?.name||"",r.room,r.condition,r.secure,r.storedType,r.qty,r.usable];}) },
    { label:"Distribution",      desc:"Delivery and collection",       icon:"🚚", file:"distribution.csv", cols:["School","Purpose","Description","Qty","Destination","Official","Date","Ref"],                                                   rows:distribution.map(r=>{const sc=schools.find(s=>s.id==r.schoolId);return[sc?.name||"",r.purpose,r.desc,r.qty,r.destination,r.official,r.date,r.ref];}) },
    { label:"Capacity Analysis", desc:"Capacity vs enrolment",         icon:"📐", file:"capacity.csv",     cols:["School","EMIS","Enrolment","Capacity","With Mobiles","Utilisation %","Overcapacity"],                                           rows:schools.filter(s=>s.capacity).map(s=>{const mob=Number(s.capacity)+Number(s.mobiles)*Number(s.mobileCap);const pct=Math.round((Number(s.enrolment)/Number(s.capacity))*100);return[s.name,s.emis,s.enrolment,s.capacity,mob,pct,Number(s.enrolment)>Number(s.capacity)?"Yes":"No"];}) },
    { label:"Ratio Analysis",    desc:"Teacher/learner ratios",        icon:"👩‍🏫", file:"ratio.csv",        cols:["School","EMIS","Enrolment","Teachers","Ratio","Status"],                                                                        rows:schools.map(s=>{const r=s.teachers&&s.enrolment?Math.round(Number(s.enrolment)/Number(s.teachers)):null;return[s.name,s.emis,s.enrolment,s.teachers,r?`1:${r}`:"",!r?"No data":r<=30?"Good":r<=40?"Acceptable":"Overcrowded"];}) },
  ];
  return (
    <div>
      <SectionHeader title="Export / Reports"/>
      <p style={{ fontSize:13, color:"#6B7280", margin:"0 0 1.5rem" }}>Download any section as a CSV file. All exports reflect current live data.</p>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
        {exports.map(e => (
          <Card key={e.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <span style={{ fontSize:24 }}>{e.icon}</span>
              <div>
                <p style={{ fontWeight:500, fontSize:14, margin:"0 0 2px", color:"#111827" }}>{e.label}</p>
                <p style={{ fontSize:12, color:"#6B7280", margin:0 }}>{e.desc}</p>
              </div>
            </div>
            <ExportBtn label="CSV" filename={e.file} cols={e.cols} rows={e.rows}/>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// DASHBOARD
// ─────────────────────────────────────────────
function Dashboard({ schools, audits, furniture, repairs, warehouse }) {
  const totalShortage = schools.reduce((a, s) => { const sh = Number(s.enrolment||0) - Number(s.capacity||0); return a + (sh > 0 ? sh : 0); }, 0);
  const riskCounts    = { High:schools.filter(s=>s.risk==="High").length, Medium:schools.filter(s=>s.risk==="Medium").length, Low:schools.filter(s=>s.risk==="Low").length };
  const dominantRisk  = riskCounts.High > 0 ? "High" : riskCounts.Medium > 0 ? "Medium" : "Low";
  const totalFurn     = furniture.reduce((a, f) => a + Number(f.available||0), 0);
  const inStock       = warehouse.filter(w=>w.status==="In Stock").reduce((a,w)=>a+Number(w.qty||0),0);
  const dispatched    = warehouse.filter(w=>w.status==="Dispatched").reduce((a,w)=>a+Number(w.qty||0),0);
  const reserved      = warehouse.filter(w=>w.status==="Reserved").reduce((a,w)=>a+Number(w.qty||0),0);
  const whIn          = repairs.filter(r=>r.destination==="Warehouse").reduce((a,r)=>a+Number(r.qty||0),0);
  const whDone        = repairs.filter(r=>r.destination==="Warehouse"&&r.status==="Completed").reduce((a,r)=>a+Number(r.qty||0),0);
  const whProg        = repairs.filter(r=>r.destination==="Warehouse"&&r.status==="In Progress").reduce((a,r)=>a+Number(r.qty||0),0);
  return (
    <div>
      <SectionHeader title="Dashboard overview"/>
      {testMode && <Card style={{ background:"#FEF3C7", borderColor:"#FDE68A", marginBottom:"1rem" }}><p style={{ margin:0, fontSize:13, color:"#92400E" }}>Test mode is active. Use the Test mode page for quick validation and sample workflow checks.</p></Card>}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:"1.25rem" }}>
        <StatCard label="Total schools"          value={schools.length}                     sub="Registered"            color="#2563EB"/>
        <StatCard label="Total learner shortage" value={totalShortage.toLocaleString()}     sub="Learners over capacity" color="#DC2626"/>
        <StatCard label="Overall risk level"     value={dominantRisk} sub={`H:${riskCounts.High} M:${riskCounts.Medium} L:${riskCounts.Low}`} color={dominantRisk==="High"?"#DC2626":dominantRisk==="Medium"?"#D97706":"#059669"}/>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:"1.25rem" }}>
        <StatCard label="Total audits"       value={audits.length}  sub="All years"          color="#7C3AED"/>
        <StatCard label="Furniture available"value={totalFurn}      sub="Tracked items"       color="#059669"/>
        <StatCard label="High risk schools"  value={riskCounts.High}sub="Needs urgent action" color="#DC2626"/>
        <StatCard label="Warehouse in stock" value={inStock}         sub="Ready to dispatch"  color="#2563EB"/>
      </div>
      <p style={{ fontSize:12, color:"#6B7280", fontWeight:500, margin:"0 0 8px", textTransform:"uppercase", letterSpacing:"0.05em" }}>Warehouse — new furniture</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:"1.25rem" }}>
        <StatCard label="In stock"   value={inStock}    color="#059669"/>
        <StatCard label="Reserved"   value={reserved}   color="#D97706"/>
        <StatCard label="Dispatched" value={dispatched} color="#2563EB"/>
      </div>
      <p style={{ fontSize:12, color:"#6B7280", fontWeight:500, margin:"0 0 8px", textTransform:"uppercase", letterSpacing:"0.05em" }}>Warehouse — repairs</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:"1.5rem" }}>
        <StatCard label="Sent for repair" value={whIn}   color="#7C3AED"/>
        <StatCard label="Completed"       value={whDone} color="#059669"/>
        <StatCard label="In progress"     value={whProg} color="#D97706"/>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", marginBottom:"1rem" }}>
        <Card>
          <h3 style={{ fontSize:15, fontWeight:500, margin:"0 0 1rem", color:"#111827" }}>Risk overview</h3>
          {schools.length === 0 && <p style={{ fontSize:13, color:"#9CA3AF" }}>No schools yet</p>}
          {schools.map(s => (
            <div key={s.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:"0.5px solid #F3F4F6" }}>
              <span style={{ fontSize:13, color:"#374151" }}>{s.name}</span><Badge val={s.risk}/>
            </div>
          ))}
        </Card>
        <Card>
          <h3 style={{ fontSize:15, fontWeight:500, margin:"0 0 1rem", color:"#111827" }}>EMIS by district</h3>
          {["FRANCES BAARD","PIXLEY-KA-SEME","JOHN TAOLO GAETSEWE","NAMAKWA","ZF MGCAWU"].map(d => (
            <div key={d} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"6px 0", borderBottom:"0.5px solid #F3F4F6" }}>
              <span style={{ fontSize:12, color:"#374151" }}>{d}</span>
              <span style={{ fontSize:13, fontWeight:500, color:"#111827" }}>{EMIS_SAMPLE.filter(s=>s.district===d).length}</span>
            </div>
          ))}
        </Card>
      </div>
      <Card>
        <h3 style={{ fontSize:15, fontWeight:500, margin:"0 0 1rem", color:"#111827" }}>Recent audits</h3>
        <DataTable cols={["School","Year","Date","Risk","Overcapacity"]} rows={audits.slice(-4).reverse()}
          renderRow={r => { const sc=schools.find(s=>s.id==r.schoolId); return [sc?.name||"—",r.year,r.date,<Badge val={r.risk}/>,<Badge val={r.overcapacity}/>]; }}/>
      </Card>
    </div>
  );
}

function TestPage({ onExit }) {
  return (
    <div>
      <SectionHeader title="Test mode" extra={<button onClick={onExit} style={{ fontSize:12, color:"#fff", background:"#EF4444", border:"none", borderRadius:8, padding:"7px 14px", cursor:"pointer" }}>Exit test</button>} />
      <Card>
        <p style={{ margin:"0 0 8px", color:"#111827", fontWeight:500 }}>Quick validation tools</p>
        <p style={{ margin:"0 0 12px", color:"#4B5563", fontSize:13 }}>Use this page to check the tablet flow, then exit test mode when ready.</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.75rem" }}>
          <button onClick={() => window.location.reload()} style={{ padding:"10px 14px", borderRadius:8, border:"1px solid #D1D5DB", background:"#fff", cursor:"pointer" }}>Reload app</button>
          <button onClick={() => document.location.href = document.location.href} style={{ padding:"10px 14px", borderRadius:8, border:"1px solid #D1D5DB", background:"#fff", cursor:"pointer" }}>Open current view</button>
        </div>
      </Card>
      <Card style={{ marginTop:"1rem" }}>
        <p style={{ margin:"0 0 8px", color:"#111827", fontWeight:500 }}>Tablet test instructions</p>
        <ol style={{ margin:"0", paddingLeft:"1.25rem", color:"#4B5563", fontSize:13 }}>
          <li>Copy the folder to the tablet.</li>
          <li>Open `index.html` in the tablet browser.</li>
          <li>Ensure internet is available for React/Babel CDN scripts.</li>
          <li>Use the sidebar and Test mode button to verify the flow.</li>
        </ol>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────
// Local storage helpers
const loadFromLS = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
};

function App() {
  const [active,       setActive]       = useState("dashboard");
  const [modal,        setModal]        = useState(null);
  const [schools,      setSchools]      = useState(() => loadFromLS('schools', initSchools).filter(s => isNorthernCape(s.province)));
  const [audits,       setAudits]       = useState(() => loadFromLS('audits', initAudits));
  const [classrooms,   setClassrooms]   = useState(() => loadFromLS('classrooms', initClassrooms));
  const [furniture,    setFurniture]    = useState(() => loadFromLS('furniture', initFurniture));
  const [furnitureDate, setFurnitureDate] = useState(new Date().toISOString().slice(0,10));
  const [repairs,      setRepairs]      = useState(() => loadFromLS('repairs', initRepairs));
  const [storage,      setStorage]      = useState(() => loadFromLS('storage', initStorage));
  const [distribution, setDistribution] = useState(() => loadFromLS('distribution', initDistribution));
  const [conditions,   setConditions]   = useState(() => loadFromLS('conditions', initConditions));
  const [warehouse,    setWarehouse]    = useState(() => loadFromLS('warehouse', initWarehouse));
  const [toast,        setToast]        = useState(null);
  const [auditInitial, setAuditInitial] = useState(null);
  const [testMode,     setTestMode]     = useState(false);

  const add = setter => data => { setter(p => [...p, { ...data, id:uid() }]); setModal(null); };
  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 3000); };
  const enterTestMode = () => { setTestMode(true); setActive("test"); showToast("Test mode enabled"); };
  const exitTestMode  = () => { setTestMode(false); setActive("dashboard"); showToast("Test mode disabled"); };

  const saveCapture = ({ audit, classroom, furniture: furnitureItem }) => {
    const classroomId = uid();
    const auditId = uid();
    const furnitureId = uid();
    setClassrooms(p => [...p, { ...classroom, id:classroomId }]);
    setFurniture(p => [...p, { ...furnitureItem, id:furnitureId, classroomId }]);
    setAudits(p => [...p, { ...audit, id:auditId }]);
    showToast(`✓ Audit, classroom and furniture saved.`);
    setModal(null);
  };

  const importSchool = emis => {
    if (!isNorthernCape(emis.province)) { showToast(`Only Northern Cape schools can be imported.`); return; }
    if (schools.find(s => s.emis === emis.emis)) { showToast(`"${emis.name}" already exists.`); return; }
    setSchools(p => [...p, { id:uid(), ...emis, capacity:"", mobiles:"", mobileCap:35, enrolment:"", teachers:"", risk:"Low" }]);
    showToast(`✓ "${emis.name}" imported.`);
    setActive("schools");
  };

  const openAuditForSchool = emis => {
    if (!isNorthernCape(emis.province)) { showToast(`Only Northern Cape schools can be audited.`); return; }
    const existing = schools.find(s => s.emis === emis.emis);
    let schoolRecord = existing;
    if (!existing) {
      schoolRecord = { id:uid(), ...emis, capacity:"", mobiles:"", mobileCap:35, enrolment:"", teachers:"", risk:"Low" };
      setSchools(p => [...p, schoolRecord]);
      showToast(`✓ "${emis.name}" imported into audit schools.`);
    }
    setAuditInitial({ schoolId: schoolRecord.id, year:new Date().getFullYear(), date:new Date().toISOString().slice(0,10), risk:"Low", capWith:"", capWithout:"", overcapacity:"No", recommendations:"", comments:"" });
    setModal("audit");
  };

  // Persist datasets to localStorage
  useEffect(() => localStorage.setItem('schools', JSON.stringify(schools)), [schools]);
  useEffect(() => localStorage.setItem('audits', JSON.stringify(audits)), [audits]);
  useEffect(() => localStorage.setItem('classrooms', JSON.stringify(classrooms)), [classrooms]);
  useEffect(() => localStorage.setItem('furniture', JSON.stringify(furniture)), [furniture]);
  useEffect(() => localStorage.setItem('repairs', JSON.stringify(repairs)), [repairs]);
  useEffect(() => localStorage.setItem('storage', JSON.stringify(storage)), [storage]);
  useEffect(() => localStorage.setItem('distribution', JSON.stringify(distribution)), [distribution]);
  useEffect(() => localStorage.setItem('conditions', JSON.stringify(conditions)), [conditions]);
  useEffect(() => localStorage.setItem('warehouse', JSON.stringify(warehouse)), [warehouse]);

  const renderPage = () => {
    switch (active) {
      case "dashboard": return <Dashboard schools={schools} audits={audits} furniture={furniture} repairs={repairs} warehouse={warehouse} testMode={testMode}/>;
      case "test":      return <TestPage onExit={exitTestMode}/>;
      case "emis":      return <EmisPage onImport={importSchool} onCreateAudit={openAuditForSchool}/>;
      case "export":    return <ExportPage schools={schools} audits={audits} classrooms={classrooms} furniture={furniture} conditions={conditions} repairs={repairs} warehouse={warehouse} storage={storage} distribution={distribution}/>;

      case "schools": return (
        <div>
          <SectionHeader title="Audit Schools" onAdd={() => setModal("school")}
            extra={<ExportBtn label="CSV" filename="schools.csv" cols={["Name","EMIS","Province","District","Phase","Type","Sector","City","Capacity","Enrolment","Teachers","Risk"]} rows={schools.map(s=>[s.name,s.emis,s.province,s.district,s.phase||"",s.type||"",s.sector||"",s.city||"",s.capacity,s.enrolment,s.teachers,s.risk])}/>}/>
          <div style={{ display:"grid", gap:"1rem" }}>
            {schools.map(s => {
              const over     = Number(s.enrolment) > Number(s.capacity);
              const shortage = over ? Number(s.enrolment) - Number(s.capacity) : 0;
              return (
                <Card key={s.id}>
                  <div style={{ display:"flex", justifyContent:"space-between" }}>
                    <div>
                      <p style={{ fontWeight:500, fontSize:15, margin:"0 0 4px", color:"#111827" }}>{s.name}</p>
                      <p style={{ fontSize:12, color:"#6B7280", margin:"0 0 10px" }}>EMIS: {s.emis} · {s.city||s.district}, {s.province}</p>
                      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:10 }}>
                        {[s.phase, s.sector, s.type].filter(Boolean).map(val => <Badge key={val} val={val}/>)}
                      </div>
                      <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
                        {[["Enrolment",s.enrolment],["Teachers",s.teachers],["Capacity",s.capacity],["Mobiles",s.mobiles]].map(([l,v])=>(
                          <span key={l} style={{ fontSize:12, color:"#6B7280" }}>{l}: <strong style={{ color:"#111827" }}>{v||"—"}</strong></span>
                        ))}
                        {shortage > 0 && <span style={{ fontSize:12, color:"#DC2626" }}>Shortage: <strong>{shortage}</strong></span>}
                      </div>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:8 }}>
                      <Badge val={s.risk}/>
                      {s.enrolment && s.capacity && <span style={{ fontSize:12, color:over?"#DC2626":"#059669" }}>{over ? "⚠ Overcapacity" : "✓ Within capacity"}</span>}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      );

      case "audits": return (
        <div>
          <SectionHeader title="Audits" onAdd={() => setModal("audit")}
            extra={<div style={{ display:"flex", gap:8, alignItems:"center" }}><button onClick={() => setModal("capture")} style={{ fontSize:12, color:"#fff", background:"#16A34A", border:"none", borderRadius:8, padding:"7px 14px", cursor:"pointer" }}>Capture visit</button><ExportBtn label="CSV" filename="audits.csv" cols={["School","Year","Date","Risk","Overcapacity","Recommendations"]} rows={audits.map(a=>{const sc=schools.find(s=>s.id==a.schoolId);return[sc?.name||"",a.year,a.date,a.risk,a.overcapacity,a.recommendations];})}/> </div>}/>
          <Card><DataTable cols={["School","Year","Date","Risk","Overcapacity","Recommendations"]} rows={audits}
            renderRow={r => { const sc=schools.find(s=>s.id==r.schoolId); return [sc?.name||"—",r.year,r.date,<Badge val={r.risk}/>,<Badge val={r.overcapacity}/>,<span style={{color:"#6B7280",fontSize:12}}>{r.recommendations}</span>]; }}/>
          </Card>
        </div>
      );

      case "classrooms": return (
        <div>
          <SectionHeader title="Classrooms" onAdd={() => setModal("classroom")}
            extra={<ExportBtn label="CSV" filename="classrooms.csv" cols={["School","Room","Type","Grade","Spec","Learners","Mobile"]} rows={classrooms.map(c=>{const sc=schools.find(s=>s.id==c.schoolId);return[sc?.name||"",c.room,c.type,c.grade,c.spec,c.learners,c.isMobile];})}/>}/>
          <Card><DataTable cols={["School","Room","Type","Grade","Spec","Learners","Mobile"]} rows={classrooms}
            renderRow={r => { const sc=schools.find(s=>s.id==r.schoolId); return [sc?.name||"—",r.room,r.type,r.grade,r.spec,r.learners,<Badge val={r.isMobile}/>]; }}/>
          </Card>
        </div>
      );

      case "furniture": {
        const filteredFurniture = furniture.filter(f => !furnitureDate || f.auditDate === furnitureDate);
        return (
          <div>
            <SectionHeader title="Furniture inventory" onAdd={() => setModal("furniture")}
              extra={<ExportBtn label="CSV" filename="furniture.csv" cols={["School","Room","Category","Type","Audit date","Available","Damaged","Repairable","Condition"]} rows={furniture.map(f=>{const cl=classrooms.find(c=>c.id==f.classroomId);const sc=schools.find(s=>s.id==cl?.schoolId);return[sc?.name||"",cl?.room||"",f.category,f.ftype,f.auditDate||"",f.available,f.damaged,f.repairable,f.condition];})}/>}/>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:"1.5rem" }}>
              <StatCard label="Total available" value={furniture.reduce((a,f)=>a+Number(f.available||0),0)} color="#2563EB"/>
              <StatCard label="Damaged"         value={furniture.reduce((a,f)=>a+Number(f.damaged||0),0)}   color="#DC2626"/>
              <StatCard label="Repairable"      value={furniture.reduce((a,f)=>a+Number(f.repairable||0),0)}color="#D97706"/>
            </div>
            <Card style={{ marginBottom:"1rem" }}>
              <Row2>
                <Field label="Audit date filter"><input style={inp} type="date" value={furnitureDate} onChange={e => setFurnitureDate(e.target.value)} /></Field>
                <Field label="Records on selected date"><input style={{ ...inp, background: "#F9FAFB" }} value={filteredFurniture.length} readOnly /></Field>
              </Row2>
            </Card>
            <Card><DataTable cols={["School","Room","Category","Type","Audit date","Available","Damaged","Repairable","Condition"]} rows={filteredFurniture}
              renderRow={r => { const cl=classrooms.find(c=>c.id==r.classroomId); const sc=schools.find(s=>s.id==cl?.schoolId); return [sc?.name||"?",cl?.room||"?",r.category,r.ftype,r.auditDate||"",r.available,r.damaged,r.repairable,<Badge val={r.condition}/>]; }}/>
            </Card>
          </div>
        );
      }

      case "conditions": return (
        <div>
          <SectionHeader title="Condition assessments" onAdd={() => setModal("condition")}
            extra={<ExportBtn label="CSV" filename="conditions.csv" cols={["School","Room","Flooring","Issues","Windows","Electricity","Locks"]} rows={conditions.map(c=>{const cl=classrooms.find(r=>r.id==c.classroomId);const sc=schools.find(s=>s.id==cl?.schoolId);return[sc?.name||"",cl?.room||"",c.flooring,c.flooringIssues,c.windows,c.electricity,c.locks];})}/>}/>
          <Card><DataTable cols={["School","Room","Flooring","Issues","Windows","Electricity","Locks"]} rows={conditions}
            renderRow={c => { const cl=classrooms.find(r=>r.id==c.classroomId); const sc=schools.find(s=>s.id==cl?.schoolId); return [sc?.name||"?",cl?.room||"?",<Badge val={c.flooring}/>,c.flooringIssues||"—",<Badge val={c.windows}/>,<Badge val={c.electricity}/>,<Badge val={c.locks}/>]; }}/>
          </Card>
        </div>
      );

      case "repairs": return (
        <div>
          <SectionHeader title="Repairs & refurbishment" onAdd={() => setModal("repair")}
            extra={<ExportBtn label="CSV" filename="repairs.csv" cols={["Furniture","Repair Type","Destination","Qty","Status","Allocated","Completed"]} rows={repairs.map(r=>{const fu=furniture.find(f=>f.id==r.furnitureId);return[fu?.ftype||"",r.repairType,r.destination,r.qty,r.status,r.allocated,r.completed||""];})}/>}/>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:"1.5rem" }}>
            {["Completed","In Progress","Pending"].map(st => <StatCard key={st} label={st} value={repairs.filter(r=>r.status===st).length} color={st==="Completed"?"#059669":st==="In Progress"?"#2563EB":"#D97706"}/>)}
          </div>
          <Card><DataTable cols={["Furniture","Type","Destination","Qty","Status","Allocated","Completed"]} rows={repairs}
            renderRow={r => { const fu=furniture.find(f=>f.id==r.furnitureId); return [fu?.ftype||"—",r.repairType,r.destination,r.qty,<Badge val={r.status}/>,r.allocated,r.completed||"—"]; }}/>
          </Card>
        </div>
      );

      case "warehouse": return (
        <div>
          <SectionHeader title="Warehouse — new furniture" onAdd={() => setModal("warehouse")}
            extra={<ExportBtn label="CSV" filename="warehouse.csv" cols={["Date","Supplier","Type","Qty","Condition","Ref","Status"]} rows={warehouse.map(w=>[w.date,w.supplier,w.ftype,w.qty,w.condition,w.ref,w.status])}/>}/>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:"1.5rem" }}>
            <StatCard label="In stock"   value={warehouse.filter(w=>w.status==="In Stock").reduce((a,w)=>a+Number(w.qty||0),0)}   color="#059669"/>
            <StatCard label="Reserved"   value={warehouse.filter(w=>w.status==="Reserved").reduce((a,w)=>a+Number(w.qty||0),0)}   color="#D97706"/>
            <StatCard label="Dispatched" value={warehouse.filter(w=>w.status==="Dispatched").reduce((a,w)=>a+Number(w.qty||0),0)} color="#2563EB"/>
          </div>
          <Card><DataTable cols={["Date","Supplier","Furniture type","Qty","Condition","Received by","Ref","Status","Notes"]} rows={warehouse}
            renderRow={w => [w.date,w.supplier,w.ftype,w.qty,<Badge val={w.condition}/>,w.receivedBy,w.ref,<Badge val={w.status}/>,<span style={{fontSize:12,color:"#6B7280"}}>{w.notes}</span>]}/>
          </Card>
        </div>
      );

      case "storage": return (
        <div>
          <SectionHeader title="Storage" onAdd={() => setModal("storage")}
            extra={<ExportBtn label="CSV" filename="storage.csv" cols={["School","Room","Condition","Secure","Stored Type","Qty","Usable"]} rows={storage.map(r=>{const sc=schools.find(s=>s.id==r.schoolId);return[sc?.name||"",r.room,r.condition,r.secure,r.storedType,r.qty,r.usable];})}/>}/>
          <Card><DataTable cols={["School","Room","Condition","Secure","Stored items","Qty","Usable"]} rows={storage}
            renderRow={r => { const sc=schools.find(s=>s.id==r.schoolId); return [sc?.name||"—",r.room,<Badge val={r.condition}/>,<Badge val={r.secure}/>,r.storedType,r.qty,<Badge val={r.usable}/>]; }}/>
          </Card>
        </div>
      );

      case "distribution": return (
        <div>
          <SectionHeader title="Distribution" onAdd={() => setModal("distribution")}
            extra={<ExportBtn label="CSV" filename="distribution.csv" cols={["School","Purpose","Description","Qty","Destination","Official","Date","Ref","Proof"]} rows={distribution.map(r=>{const sc=schools.find(s=>s.id==r.schoolId);return[sc?.name||"",r.purpose,r.desc,r.qty,r.destination,r.official,r.date,r.ref,r.proofName||""];})}/>}/>
          <Card><DataTable cols={["School","Purpose","Description","Qty","Official","Date","Ref","Proof"]} rows={distribution}
            renderRow={r => { const sc=schools.find(s=>s.id==r.schoolId); return [sc?.name||"—",r.purpose,r.desc,r.qty,r.official,r.date,r.ref, r.proofData ? <a href={r.proofData} target="_blank" rel="noreferrer" style={{ color:"#2563EB", textDecoration:"underline", fontSize:12 }}>{r.proofName || "View proof"}</a> : <span style={{ color:"#6B7280", fontSize:12 }}>No proof</span>]; }}/>
          </Card>
        </div>
      );

      case "capacity": return (
        <div>
          <SectionHeader title="Capacity analysis"
            extra={<ExportBtn label="CSV" filename="capacity.csv" cols={["School","Enrolment","Capacity","With Mobiles","Utilisation","Overcapacity"]} rows={schools.filter(s=>s.capacity).map(s=>{const mob=Number(s.capacity)+Number(s.mobiles)*Number(s.mobileCap);const pct=Math.round((Number(s.enrolment)/Number(s.capacity))*100);return[s.name,s.enrolment,s.capacity,mob,pct+"%",Number(s.enrolment)>Number(s.capacity)?"Yes":"No"];})}/>}/>
          <div style={{ display:"grid", gap:"1rem" }}>
            {schools.filter(s => s.capacity).map(s => {
              const mobCap = Number(s.capacity) + Number(s.mobiles) * Number(s.mobileCap);
              const pct    = Math.round((Number(s.enrolment) / Number(s.capacity)) * 100);
              const over   = Number(s.enrolment) > Number(s.capacity);
              return (
                <Card key={s.id}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                    <p style={{ fontWeight:500, fontSize:15, margin:0 }}>{s.name}</p><Badge val={over?"Yes":"No"}/>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:14 }}>
                    {[["Enrolment",s.enrolment,"#111827"],["Cap. no mobiles",s.capacity,"#111827"],["Cap. with mobiles",mobCap,"#111827"],["Utilisation",`${pct}%`,over?"#DC2626":"#059669"]].map(([l,v,c])=>(
                      <div key={l} style={{ background:"#F9FAFB", borderRadius:8, padding:"10px 14px" }}><p style={{ fontSize:11, color:"#6B7280", margin:"0 0 4px" }}>{l}</p><p style={{ fontSize:20, fontWeight:500, margin:0, color:c }}>{v}</p></div>
                    ))}
                  </div>
                  <div style={{ background:"#F3F4F6", borderRadius:999, height:8, overflow:"hidden" }}>
                    <div style={{ width:`${Math.min(pct,100)}%`, height:"100%", background:over?"#DC2626":"#2563EB", borderRadius:999 }}/>
                  </div>
                </Card>
              );
            })}
            {!schools.some(s => s.capacity) && <p style={{ textAlign:"center", color:"#9CA3AF", fontSize:13 }}>No capacity data yet.</p>}
          </div>
        </div>
      );

      case "ratio": return (
        <div>
          <SectionHeader title="Teacher / Learner ratio analysis"
            extra={<ExportBtn label="CSV" filename="ratio.csv" cols={["School","Enrolment","Teachers","Ratio","Status"]} rows={schools.map(s=>{const r=s.teachers&&s.enrolment?Math.round(Number(s.enrolment)/Number(s.teachers)):null;return[s.name,s.enrolment,s.teachers,r?`1:${r}`:"",!r?"No data":r<=30?"Good":r<=40?"Acceptable":"Overcrowded"];})}/>}/>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:"1.5rem" }}>
            <StatCard label="Total learners" value={schools.reduce((a,s)=>a+Number(s.enrolment||0),0)} color="#2563EB"/>
            <StatCard label="Total teachers" value={schools.reduce((a,s)=>a+Number(s.teachers||0),0)} color="#7C3AED"/>
            <StatCard label="Avg. ratio" value={(() => { const t=schools.reduce((a,s)=>a+Number(s.teachers||0),0); const l=schools.reduce((a,s)=>a+Number(s.enrolment||0),0); return t>0?`1:${Math.round(l/t)}`:"—"; })()} color="#059669"/>
          </div>
          <div style={{ display:"grid", gap:"1rem" }}>
            {schools.filter(s => s.teachers && s.enrolment).map(s => {
              const ratio  = Math.round(Number(s.enrolment) / Number(s.teachers));
              const pct    = Math.min(Math.round((ratio / 50) * 100), 150);
              const color  = ratio <= 30 ? "#059669" : ratio <= 40 ? "#D97706" : "#DC2626";
              const status = ratio <= 30 ? "Good"    : ratio <= 40 ? "Acceptable" : "Overcrowded";
              return (
                <Card key={s.id}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                    <div><p style={{ fontWeight:500, fontSize:15, margin:"0 0 2px" }}>{s.name}</p><p style={{ fontSize:12, color:"#6B7280", margin:0 }}>{s.district}</p></div>
                    <span style={{ background:color+"22", color, padding:"3px 12px", borderRadius:999, fontSize:12, fontWeight:500 }}>{status}</span>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:14 }}>
                    {[["Learners",s.enrolment,"#111827"],["Teachers",s.teachers,"#111827"],["Ratio",`1:${ratio}`,color],["Ideal","1:35","#6B7280"]].map(([l,v,c])=>(
                      <div key={l} style={{ background:"#F9FAFB", borderRadius:8, padding:"10px 14px" }}><p style={{ fontSize:11, color:"#6B7280", margin:"0 0 4px" }}>{l}</p><p style={{ fontSize:20, fontWeight:500, margin:0, color:c }}>{v}</p></div>
                    ))}
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ fontSize:11, color:"#9CA3AF", width:30 }}>0</span>
                    <div style={{ flex:1, background:"#F3F4F6", borderRadius:999, height:8, overflow:"hidden", position:"relative" }}>
                      <div style={{ width:`${pct}%`, height:"100%", background:color, borderRadius:999 }}/>
                      <div style={{ position:"absolute", left:`${(35/50)*100}%`, top:0, width:2, height:"100%", background:"#9CA3AF" }}/>
                    </div>
                    <span style={{ fontSize:11, color:"#9CA3AF", width:30, textAlign:"right" }}>50+</span>
                  </div>
                </Card>
              );
            })}
            {!schools.some(s => s.teachers && s.enrolment) && <p style={{ textAlign:"center", color:"#9CA3AF", fontSize:13 }}>No ratio data yet.</p>}
          </div>
        </div>
      );

      default: return null;
    }
  };

  return (
    <div style={{ display:"flex", minHeight:"100vh", fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background:"#F3F6FB" }}>
      {toast && (
        <div style={{ position:"fixed", bottom:24, left:"50%", transform:"translateX(-50%)", background:"#111827", color:"#fff", padding:"10px 20px", borderRadius:10, fontSize:13, zIndex:200, whiteSpace:"nowrap", boxShadow:"0 4px 12px rgba(0,0,0,0.2)" }}>
          {toast}
        </div>
      )}

      {/* Modals */}
      {modal === "school"       && <SchoolForm       onClose={() => setModal(null)} onSave={add(setSchools)}/>}
      {modal === "audit"        && <AuditForm        initial={auditInitial} schools={schools}        onClose={() => { setModal(null); setAuditInitial(null); }} onSave={addAudit} />}
      {modal === "capture"      && <CombinedCaptureForm schools={schools} onClose={() => setModal(null)} onSave={saveCapture} />}
      {modal === "classroom"    && <ClassroomForm    schools={schools}                                    onClose={() => setModal(null)} onSave={add(setClassrooms)}/>}
      {modal === "furniture"    && <FurnitureForm    classrooms={classrooms} schools={schools}            onClose={() => setModal(null)} onSave={add(setFurniture)}/>}
      {modal === "condition"    && <ConditionForm    classrooms={classrooms} schools={schools}            onClose={() => setModal(null)} onSave={add(setConditions)}/>}
      {modal === "repair"       && <RepairForm       furniture={furniture}                                onClose={() => setModal(null)} onSave={add(setRepairs)}/>}
      {modal === "warehouse"    && <WarehouseForm                                                         onClose={() => setModal(null)} onSave={add(setWarehouse)}/>}
      {modal === "storage"      && <StorageForm      schools={schools}                                    onClose={() => setModal(null)} onSave={add(setStorage)}/>}
      {modal === "distribution" && <DistributionForm schools={schools}                                    onClose={() => setModal(null)} onSave={add(setDistribution)}/>}

      {/* Sidebar */}
      <aside style={{ width:220, background:"linear-gradient(180deg,#1e3a5f,#1e40af)", padding:"1.5rem 0", flexShrink:0 }}>
        <div style={{ padding:"0 1.25rem 1.5rem", borderBottom:"0.5px solid rgba(255,255,255,0.1)", marginBottom:"1rem" }}>
          <p style={{ fontWeight:600, fontSize:14, color:"#fff", margin:"0 0 2px" }}>SchoolAudit</p>
          <p style={{ fontSize:11, color:"rgba(255,255,255,0.5)", margin:0 }}>Northern Cape Dept.</p>
        </div>
        {NAV.map(n => (
          <button key={n.id} onClick={() => setActive(n.id)} style={{
            display:"flex", alignItems:"center", gap:10, width:"100%", padding:"8px 1.25rem",
            background: active === n.id ? "rgba(255,255,255,0.15)" : "none",
            color:      active === n.id ? "#fff" : "rgba(255,255,255,0.65)",
            border:"none", borderLeft: active === n.id ? "2px solid #60A5FA" : "2px solid transparent",
            cursor:"pointer", fontSize:13, fontWeight: active === n.id ? 500 : 400, textAlign:"left",
          }}>
            <span style={{ fontSize:15 }}>{n.icon}</span>{n.label}
          </button>
        ))}
        <button onClick={enterTestMode} style={{ marginTop:16, width:"calc(100% - 32px)", marginLeft:16, padding:"10px 14px", borderRadius:10, border:"none", background:testMode?"#F59E0B":"#10B981", color:"#fff", fontSize:13, cursor:"pointer" }}>
          {testMode ? "Test mode active" : "Launch Test mode"}
        </button>
      </aside>

      {/* Main */}
      <main style={{ flex:1, padding:"2rem", maxWidth:980, overflowY:"auto" }}>
        {renderPage()}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);