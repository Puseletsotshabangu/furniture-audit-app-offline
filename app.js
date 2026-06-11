const { useState, useMemo } = React;

const NAV = [
  { id:"dashboard",    label:"Dashboard",          icon:"📊" },
  { id:"emis",         label:"EMIS Database",      icon:"🗃️" },
  { id:"schools",      label:"Audit Schools",      icon:"🏫" },
  { id:"audits",       label:"Audits",             icon:"📋" },
  { id:"classrooms",   label:"Classrooms",         icon:"🚪" },
  { id:"furniture",    label:"Furniture",          icon:"🪑" },
  { id:"conditions",   label:"Conditions",         icon:"🔍" },
  { id:"repairs",      label:"Repairs",            icon:"🔧" },
  { id:"warehouse",    label:"Warehouse",          icon:"🏭" },
  { id:"distribution", label:"Distribution",       icon:"🚚" },
  { id:"storage",      label:"Storage",            icon:"📦" },
  { id:"capacity",     label:"Capacity",           icon:"📐" },
  { id:"ratio",        label:"Ratio Analysis",     icon:"👩‍🏫" },
  { id:"export",       label:"Export / Reports",   icon:"📤" },
  { id:"kpa",          label:"EPMDS / KPAs",       icon:"📝" },
  { id:"kpa1",         label:"  Data Uploads",     icon:"🖥️" },
  { id:"kpa2",         label:"  Learner Data",     icon:"📈" },
  { id:"kpa3",         label:"  Mobile Audit",     icon:"🚌" },
  { id:"kpa4",         label:"  School Requests",  icon:"🏗️" },
  { id:"kpa5",         label:"  Admin Payments",   icon:"🗂️" },
];

const DBE_FURNITURE = [
  "Single Learner Desk Size 1 Grade R seat 260mm Supawood Top",
  "Single Learner Desk Size 1 Grade R seat 260mm Saligna Top",
  "Single Learner Desk Size 1 Grade R seat 260mm Melamine Top",
  "Single Learner Desk Size 2 Grade 1-3 seat 310mm Supawood Top",
  "Single Learner Desk Size 2 Grade 1-3 seat 310mm Saligna Top",
  "Single Learner Desk Size 2 Grade 1-3 seat 310mm Melamine Top",
  "Single Learner Desk Size 3 Grade 4-6 seat 350mm Supawood Top",
  "Single Learner Desk Size 3 Grade 4-6 seat 350mm Saligna Top",
  "Single Learner Desk Size 3 Grade 4-6 seat 350mm Melamine Top",
  "Single Learner Desk Size 4 Grade 7-9 Senior seat 380mm Supawood Top",
  "Single Learner Desk Size 4 Grade 7-9 Senior seat 380mm Saligna Top",
  "Single Learner Desk Size 4 Grade 7-9 Senior seat 380mm Melamine Top",
  "Single Learner Desk Size 5 Grade 10-12 FET seat 430mm Supawood Top",
  "Single Learner Desk Size 5 Grade 10-12 FET seat 430mm Saligna Top",
  "Single Learner Desk Size 5 Grade 10-12 FET seat 430mm Melamine Top",
  "Double Learner Desk Size 2 Grade 1-3 seat 310mm Supawood Top",
  "Double Learner Desk Size 2 Grade 1-3 seat 310mm Saligna Top",
  "Double Learner Desk Size 2 Grade 1-3 seat 310mm Melamine Top",
  "Double Learner Desk Size 3 Grade 4-6 seat 350mm Supawood Top",
  "Double Learner Desk Size 3 Grade 4-6 seat 350mm Saligna Top",
  "Double Learner Desk Size 3 Grade 4-6 seat 350mm Melamine Top",
  "Combination Desk and Chair Size 3 Grade 4-6 Supawood Top",
  "Combination Desk and Chair Size 3 Grade 4-6 Saligna Top",
  "Combination Desk and Chair Size 3 Grade 4-6 Melamine Top",
  "Combination Desk and Chair Size 4 Grade 7-9 Supawood Top",
  "Combination Desk and Chair Size 4 Grade 7-9 Saligna Top",
  "Combination Desk and Chair Size 4 Grade 7-9 Melamine Top",
  "Combination Desk and Chair Size 5 Grade 10-12 FET Supawood Top",
  "Combination Desk and Chair Size 5 Grade 10-12 FET Saligna Top",
  "Combination Desk and Chair Size 5 Grade 10-12 FET Melamine Top",
  "Penny 1 Wooden Chair Size 1 Grade R seat 260mm",
  "Penny 1 Wooden Chair Size 2 Grade 1-3 seat 310mm",
  "Penny 1 Wooden Chair Size 3 Grade 4-6 seat 350mm",
  "Penny 1 Plastic Chair Size 1 Grade R seat 260mm",
  "Penny 1 Plastic Chair Size 2 Grade 1-3 seat 310mm",
  "Penny 1 Plastic Chair Size 3 Grade 4-6 seat 350mm",
  "Penny 4 Wooden Chair Size 4 Grade 7-9 seat 380mm",
  "Penny 4 Wooden Chair Size 5 Grade 10-12 FET seat 430mm",
  "Penny 4 Plastic Chair Size 4 Grade 7-9 seat 380mm",
  "Penny 4 Plastic Chair Size 5 Grade 10-12 FET seat 430mm",
  "Utility Chair Size 3 Grade 4-6 steel frame",
  "Utility Chair Size 4 Grade 7-9 steel frame",
  "Utility Chair Size 5 Grade 10-12 steel frame",
  "ECD Activity Table Grade R Height 460mm",
  "ECD Stackable Chair Grade R Seat height 260mm",
  "Teachers Desk Single Pedestal",
  "Teachers Desk Double Pedestal",
  "Teachers Chair Typist",
  "Teachers Chair Visitor",
  "Teachers Cupboard Steel Double Door",
  "Teachers Cupboard Steel Single Door",
  "Teachers Bookcase Open Shelf",
  "Teachers Bookcase Glazed Door",
  "Teachers Table Rectangular",
  "Teachers Locker Single Door",
  "Teachers Locker Double Door",
  "Stationery Cupboard",
  "Map Chart Cabinet",
  "Principals Desk Double Pedestal",
  "Principals Chair High Back",
  "Principals Visitor Chair",
  "Principals Credenza",
  "Principals Bookcase",
  "Deputy Principals Desk",
  "Deputy Principals Chair",
  "HOD Desk",
  "HOD Chair",
  "Admin Clerk Desk",
  "Admin Clerk Chair Typist",
  "Reception Desk",
  "Reception Chair",
  "Boardroom Table",
  "Boardroom Chair",
  "Filing Cabinet Steel 2-Drawer",
  "Filing Cabinet Steel 4-Drawer",
  "Lateral Filing Cabinet",
  "Safe Small Cash Box",
  "Safe Medium Fireproof",
  "Steel Stationery Cupboard Admin",
  "Compactus Mobile Shelving",
  "Waiting Area Bench 2-Seater",
  "Waiting Area Bench 3-Seater",
  "Staff Room Table",
  "Staff Room Chair",
  "Staff Room Couch",
  "Staff Locker Single Door",
  "Staff Locker Double Door",
  "Science Lab Table",
  "Lab Stool",
  "Computer Lab Table",
  "Library Table",
  "Library Chair",
  "Multipurpose Table",
  "Steel Shelf Unit",
  "Storeroom Shelf",
  "Display Cabinet",
  "Notice Board",
  "Whiteboard Mobile",
];

const EMIS_SAMPLE = [
  { emis:"300010701", name:"BOITUMELO SPECIALSCHOOL",       district:"FRANCES BAARD",       phase:"Primary",   sector:"Public",      city:"Kimberley", province:"NC", lat:-28.716, lng:24.702, email:"boitumeloss@ncdoe.school.za", tel:"0783955182", circuit:"F8",  landOwnership:"Govt",    examCentre:"",       emailAlt:"", telCode:"078", status:"Operational" },
  { emis:"300022301", name:"HOPETOWN GEKOMBINEERDE SKOOL",   district:"PIXLEY-KA-SEME",     phase:"Combined",  sector:"Public",      city:"HOPETOWN",  province:"NC", lat:-29.623, lng:24.087, email:"admin@hshopetown.co.za",          tel:"2030053",   circuit:"P2",  landOwnership:"Govt",    examCentre:"",       emailAlt:"", telCode:"053", status:"Operational" },
  { emis:"300015401", name:"HOERSKOOL DIAMANTVELD",          district:"FRANCES BAARD",       phase:"Secondary", sector:"Public",      city:"Kimberley", province:"NC", lat:-28.750, lng:24.772, email:"admin@diamantveld.co.za",          tel:"8331528",   circuit:"F3",  landOwnership:"Govt",    examCentre:"2015401",emailAlt:"", telCode:"053", status:"Operational" },
  { emis:"300015403", name:"KIMBERLEY BOYS HIGH SCHOOL",     district:"FRANCES BAARD",       phase:"Secondary", sector:"Public",      city:"Kimberley", province:"NC", lat:-28.749, lng:24.768, email:"headmaster@kbhs.co.za",           tel:"8332684",   circuit:"F8",  landOwnership:"Govt",    examCentre:"2015403",emailAlt:"", telCode:"053", status:"Operational" },
  { emis:"300011403", name:"KIMBERLEY GIRLS HIGH SCHOOL",    district:"FRANCES BAARD",       phase:"Secondary", sector:"Public",      city:"Kimberley", province:"NC", lat:-28.747, lng:24.778, email:"admin@kimberleygirlshigh.org.za", tel:"8321275",   circuit:"F7",  landOwnership:"Govt",    examCentre:"2011403",emailAlt:"", telCode:"053", status:"Operational" },
  { emis:"300041403", name:"HOERSKOOL UPINGTON",             district:"ZF MGCAWU",           phase:"Secondary", sector:"Public",      city:"UPINGTON",  province:"NC", lat:-28.456, lng:21.243, email:"skoolhoof@uppies1.co.za",          tel:"3321491",   circuit:"S1",  landOwnership:"Govt",    examCentre:"2041403",emailAlt:"", telCode:"054", status:"Operational" },
  { emis:"300044402", name:"HOERSKOOL KATHU",                district:"JOHN TAOLO GAETSEWE", phase:"Secondary", sector:"Public",      city:"KATHU",     province:"NC", lat:-27.693, lng:23.047, email:"hskathunc@gmail.com",             tel:"7231561",   circuit:"K1",  landOwnership:"Govt",    examCentre:"2044402",emailAlt:"", telCode:"053", status:"Operational" },
  { emis:"300053201", name:"CURRO KATHU",                    district:"JOHN TAOLO GAETSEWE", phase:"Combined",  sector:"Independent", city:"KATHU",     province:"NC", lat:-27.706, lng:23.044, email:"antoinette.v1@curro.co.za",       tel:"2854755",   circuit:"K3",  landOwnership:"Private", examCentre:"",       emailAlt:"", telCode:"087", status:"Operational" },
  { emis:"300033401", name:"HANTAM SEKONDERE SKOOL",         district:"NAMAKWA",             phase:"Secondary", sector:"Public",      city:"Calvinia",  province:"NC", lat:-31.464, lng:19.759, email:"hantamhigh@gmail.com",             tel:"3411295",   circuit:"N4",  landOwnership:"Govt",    examCentre:"2033401",emailAlt:"", telCode:"027", status:"Operational" },
  { emis:"300044209", name:"LAERSKOOL KATHU PRIMARY",        district:"JOHN TAOLO GAETSEWE", phase:"Primary",   sector:"Public",      city:"KATHU",     province:"NC", lat:-27.704, lng:23.045, email:"hoof@kathulaerskool.co.za",        tel:"7231121",   circuit:"K4",  landOwnership:"Govt",    examCentre:"244209", emailAlt:"", telCode:"053", status:"Operational" },
];

const initSchools = [
  { id:1, name:"Soweto Primary School",  emis:"700112345", province:"Gauteng", district:"Johannesburg South", circuit:"", capacity:980,  mobiles:4, mobileCap:35, enrolment:1200, teachers:32, risk:"High"   },
  { id:2, name:"Pretoria North High",    emis:"700223456", province:"Gauteng", district:"Tshwane North",      circuit:"", capacity:900,  mobiles:2, mobileCap:35, enrolment:850,  teachers:28, risk:"Low"    },
  { id:3, name:"Alexandra Combined",     emis:"700334567", province:"Gauteng", district:"Johannesburg East",  circuit:"", capacity:950,  mobiles:3, mobileCap:35, enrolment:1050, teachers:30, risk:"Medium" },
];
const initAudits = [
  { id:1, schoolId:1, year:2024, date:"2024-03-15", risk:"High",   capWith:1120, capWithout:980,  overcapacity:"Yes", recommendations:"Urgent furniture replacement needed", comments:"" },
  { id:2, schoolId:2, year:2024, date:"2024-04-02", risk:"Low",    capWith:970,  capWithout:900,  overcapacity:"No",  recommendations:"Minor repairs to lab furniture",       comments:"" },
  { id:3, schoolId:3, year:2024, date:"2024-05-10", risk:"Medium", capWith:1055, capWithout:950,  overcapacity:"Yes", recommendations:"Mobile classroom upgrade required",    comments:"" },
];
const initClassrooms = [
  { id:1, schoolId:1, room:"1A",    type:"Classroom", grade:"4",  spec:"4E1",     learners:42, isMobile:"No" },
  { id:2, schoolId:2, room:"Lab 1", type:"Lab",       grade:"11", spec:"Science", learners:30, isMobile:"No" },
];
const initFurniture = [
  { id:1, classroomId:1, category:"Learner",     ftype:"Single Learner Desk Size 3 Grade 4-6 seat 350mm Supawood Top", spec:"Grade 4-6",   chairType:"Penny 1 Wooden", available:30, damaged:8, repairable:5, otherType:"", otherQty:0, condition:"Fair" },
  { id:2, classroomId:2, category:"Specialised", ftype:"Science Lab Table",                                            spec:"Science Lab", chairType:"Lab Stool",      available:20, damaged:3, repairable:3, otherType:"", otherQty:0, condition:"Good" },
];
const initRepairs      = [
  { id:1, furnitureId:1, repairType:"Minor", destination:"Warehouse",   qty:5, status:"Completed",  allocated:"2024-03-20", completed:"2024-04-01" },
  { id:2, furnitureId:2, repairType:"Major", destination:"Labour Dept", qty:3, status:"In Progress", allocated:"2024-04-10", completed:"" },
];
const initStorage      = [{ id:1, schoolId:1, room:"Store 1", condition:"Fair", secure:"Yes", storedType:"Old Desks", qty:20, usable:"No", desc:"Old damaged desks" }];
const initDistribution = [{ id:1, schoolId:1, destination:"Warehouse", desc:"Double Desks", qty:10, source:"School", official:"T. Mokoena", position:"Principal", receiver:"S. Dlamini", role:"Store Manager", date:"2024-04-05", purpose:"Repair", ref:"REF-001" }];
const initConditions   = [{ id:1, classroomId:1, flooring:"Fair", flooringIssues:"Cracks", windows:"Poor", windowIssues:"Broken", locks:"Good", electricity:"Yes", mobile:"N/A", comments:"" }];
const initWarehouse    = [
  { id:1, date:"2024-03-01", supplier:"Edu Furniture Co.",  ftype:"Double Learner Desk Size 3 Grade 4-6 Supawood Top", spec:"Grade 4-6", qty:50, condition:"Good", receivedBy:"S. Dlamini", ref:"WH-001", status:"In Stock",   notes:"New batch" },
  { id:2, date:"2024-04-15", supplier:"SA School Supplies", ftype:"Penny 1 Wooden Chair Size 2 Grade 1-3 seat 310mm",  spec:"Grade 1-3", qty:80, condition:"Good", receivedBy:"S. Dlamini", ref:"WH-002", status:"Dispatched", notes:"Dispatched to Alexandra" },
];
const initUploads = [
  { id:1, system:"NEIMS",  date:"2026-04-01", status:"Completed",   records:342, verifiedBy:"PY Tshabangu", notes:"Aligned with EFMS data" },
  { id:2, system:"EFMS",   date:"2026-04-03", status:"Completed",   records:298, verifiedBy:"PY Tshabangu", notes:"Cross-checked against GOVERP" },
  { id:3, system:"GOVERP", date:"2026-04-05", status:"In Progress", records:180, verifiedBy:"PY Tshabangu", notes:"Pending district confirmation" },
];
const initLearnerData = [
  { id:1, school:"Soweto Primary",  district:"Johannesburg South", source:"10th Day Snap Survey", date:"2026-04-10", enrolment:1200, verified:1180, variance:20, status:"Validated" },
  { id:2, school:"Pretoria North",  district:"Tshwane North",      source:"GOVERP",               date:"2026-04-12", enrolment:850,  verified:850,  variance:0,  status:"Validated" },
  { id:3, school:"Alexandra Comb.", district:"Johannesburg East",  source:"Google Forms",         date:"2026-04-15", enrolment:1050, verified:1010, variance:40, status:"Queried"   },
];
const initMobileAudit = [
  { id:1, schoolId:1, mobileCount:4, condition:"Fair", structuralIssues:"Roof leaks",   electricityAvail:"Yes", ablutions:"No", recommendation:"Repair roof",  auditDate:"2026-04-20", auditedBy:"PY Tshabangu", receivedDate:"2022-01-15" },
  { id:2, schoolId:3, mobileCount:3, condition:"Poor", structuralIssues:"Floor damage", electricityAvail:"No",  ablutions:"No", recommendation:"Replace unit", auditDate:"2026-04-22", auditedBy:"PY Tshabangu", receivedDate:"2021-07-10" },
];
const initSchoolRequests = [
  { id:1, schoolId:1, district:"Johannesburg South", requestType:"Furniture",   priority:"High",   dateReceived:"2026-04-05", status:"In Progress", assignedTo:"PY Tshabangu", dueDate:"2026-06-30", notes:"220 desks needed urgently" },
  { id:2, schoolId:2, district:"Tshwane North",      requestType:"Mobile Unit", priority:"Medium", dateReceived:"2026-04-10", status:"Pending",     assignedTo:"PY Tshabangu", dueDate:"2026-07-31", notes:"2 additional mobiles requested" },
  { id:3, schoolId:3, district:"Johannesburg East",  requestType:"Repairs",     priority:"Low",    dateReceived:"2026-04-15", status:"Completed",   assignedTo:"PY Tshabangu", dueDate:"2026-05-31", notes:"Classroom door repairs done" },
];
const initAdminTasks = [
  { id:1, type:"Payment Verification", ref:"PAY-2026-001", date:"2026-04-08", amount:"R 45000", supplier:"Edu Furniture Co.",  status:"Verified",  notes:"All docs checked and signed" },
  { id:2, type:"Stakeholder Enquiry",  ref:"ENQ-2026-012", date:"2026-04-10", amount:"",        supplier:"",                   status:"Resolved",  notes:"Principal query re delivery date" },
  { id:3, type:"Filing Scanning",      ref:"FILE-2026-003",date:"2026-04-12", amount:"",        supplier:"",                   status:"Completed", notes:"Q1 project docs scanned and filed" },
  { id:4, type:"Payment Verification", ref:"PAY-2026-002", date:"2026-04-18", amount:"R 12500", supplier:"SA School Supplies", status:"Pending",   notes:"Awaiting supporting documents" },
];

const uid = () => Date.now() + Math.random();

const BADGE_STYLES = {
  High:["linear-gradient(135deg,#FEE2E2,#FECACA)","#991B1B"],
  Medium:["linear-gradient(135deg,#FEF3C7,#FDE68A)","#92400E"],
  Low:["linear-gradient(135deg,#D1FAE5,#A7F3D0)","#065F46"],
  Good:["linear-gradient(135deg,#D1FAE5,#A7F3D0)","#065F46"],
  Fair:["linear-gradient(135deg,#FEF3C7,#FDE68A)","#92400E"],
  Poor:["linear-gradient(135deg,#FEE2E2,#FECACA)","#991B1B"],
  Completed:["linear-gradient(135deg,#D1FAE5,#A7F3D0)","#065F46"],
  Verified:["linear-gradient(135deg,#D1FAE5,#A7F3D0)","#065F46"],
  Resolved:["linear-gradient(135deg,#D1FAE5,#A7F3D0)","#065F46"],
  Validated:["linear-gradient(135deg,#D1FAE5,#A7F3D0)","#065F46"],
  "In Progress":["linear-gradient(135deg,#DBEAFE,#BFDBFE)","#1E40AF"],
  Pending:["linear-gradient(135deg,#F3F4F6,#E5E7EB)","#374151"],
  Queried:["linear-gradient(135deg,#FEE2E2,#FECACA)","#991B1B"],
  Declined:["linear-gradient(135deg,#FEE2E2,#FECACA)","#991B1B"],
  Yes:["linear-gradient(135deg,#FEE2E2,#FECACA)","#991B1B"],
  No:["linear-gradient(135deg,#D1FAE5,#A7F3D0)","#065F46"],
  "In Stock":["linear-gradient(135deg,#D1FAE5,#A7F3D0)","#065F46"],
  Dispatched:["linear-gradient(135deg,#DBEAFE,#BFDBFE)","#1E40AF"],
  Reserved:["linear-gradient(135deg,#FEF3C7,#FDE68A)","#92400E"],
  Public:["linear-gradient(135deg,#EFF6FF,#DBEAFE)","#1E40AF"],
  Independent:["linear-gradient(135deg,#F5F3FF,#EDE9FE)","#5B21B6"],
  Primary:["linear-gradient(135deg,#D1FAE5,#A7F3D0)","#065F46"],
  Secondary:["linear-gradient(135deg,#FEF3C7,#FDE68A)","#92400E"],
  Combined:["linear-gradient(135deg,#DBEAFE,#BFDBFE)","#1E40AF"],
  Intermediate:["linear-gradient(135deg,#FDF2F8,#FCE7F3)","#831843"],
};

const Badge = ({ val }) => {
  const [bg, color] = BADGE_STYLES[val] || ["linear-gradient(135deg,#F3F4F6,#E5E7EB)","#374151"];
  return <span style={{ background:bg, color, padding:"2px 10px", borderRadius:999, fontSize:12, fontWeight:500, boxShadow:"0 1px 3px rgba(0,0,0,0.08)", whiteSpace:"nowrap", display:"inline-block" }}>{val}</span>;
};

const toCSV = (cols, rows) => {
  const esc = v => '"' + String(v == null ? "" : v).replace(/"/g, '""') + '"';
  return [cols.join(","), ...rows.map(r => r.map(esc).join(","))].join("\n");
};
const downloadCSV = (filename, csv) => {
  const blob = new Blob([csv], { type:"text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
};

const STAT_GRADS = {
  "#2563EB":"linear-gradient(135deg,#EFF6FF,#DBEAFE)",
  "#7C3AED":"linear-gradient(135deg,#F5F3FF,#EDE9FE)",
  "#059669":"linear-gradient(135deg,#ECFDF5,#D1FAE5)",
  "#DC2626":"linear-gradient(135deg,#FFF5F5,#FEE2E2)",
  "#D97706":"linear-gradient(135deg,#FFFBEB,#FEF3C7)",
};

const Card = ({ children, style={} }) => (
  <div style={{ background:"linear-gradient(145deg,#ffffff,#f3f6fb)", border:"0.5px solid #E0E7EF", borderRadius:14, padding:"1.25rem", boxShadow:"0 2px 8px rgba(37,99,235,0.06)", ...style }}>
    {children}
  </div>
);

const StatCard = ({ label, value, sub, color="#2563EB" }) => (
  <div style={{ background:STAT_GRADS[color]||"#F9FAFB", borderRadius:12, padding:"1rem 1.25rem", border:"0.5px solid " + color + "22", boxShadow:"0 2px 8px " + color + "14" }}>
    <p style={{ fontSize:12, color:"#6B7280", margin:"0 0 6px" }}>{label}</p>
    <p style={{ fontSize:24, fontWeight:600, color, margin:"0 0 2px" }}>{value}</p>
    {sub && <p style={{ fontSize:12, color:"#9CA3AF", margin:0 }}>{sub}</p>}
  </div>
);

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
              {renderRow(r).map((cell, j) => <td key={j} style={{ padding:"9px 12px", color:"#374151" }}>{cell}</td>)}
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);

const ExportBtn = ({ label, cols, rows, filename }) => (
  <button onClick={() => downloadCSV(filename, toCSV(cols, rows))}
    style={{ fontSize:12, color:"#059669", background:"#F0FDF4", border:"0.5px solid #A7F3D0", borderRadius:8, padding:"5px 12px", cursor:"pointer" }}>
    Download {label}
  </button>
);

const KpaNote = ({ weight, target, description }) => (
  <div style={{ background:"linear-gradient(135deg,#EFF6FF,#DBEAFE)", border:"0.5px solid #BFDBFE", borderRadius:10, padding:"10px 14px", marginBottom:"1.25rem", fontSize:13, color:"#1E40AF" }}>
    <strong>Weight: {weight}</strong> - Target: {target} - {description}
  </div>
);

const inp  = { width:"100%", padding:"7px 10px", border:"0.5px solid #D1D5DB", borderRadius:8, fontSize:13, boxSizing:"border-box", background:"#fff", color:"#111827" };
const sel  = { ...inp };
const flbl = { fontSize:12, color:"#6B7280", marginBottom:4, display:"block" };

const Field = ({ label, children }) => <div style={{ marginBottom:12 }}><label style={flbl}>{label}</label>{children}</div>;
const Row2  = ({ children }) => <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr",     gap:12 }}>{children}</div>;
const Row3  = ({ children }) => <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>{children}</div>;

const Modal = ({ title, onClose, onSave, children }) => (
  <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center" }}>
    <div style={{ background:"#fff", borderRadius:14, padding:"1.5rem", width:580, maxHeight:"90vh", overflowY:"auto", boxSizing:"border-box", boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.25rem" }}>
        <h3 style={{ margin:0, fontSize:16, fontWeight:600, color:"#111827" }}>{title}</h3>
        <button onClick={onClose} style={{ background:"none", border:"none", fontSize:20, cursor:"pointer", color:"#9CA3AF", lineHeight:1 }}>x</button>
      </div>
      {children}
      <div style={{ display:"flex", gap:8, marginTop:"1.5rem", justifyContent:"flex-end" }}>
        <button onClick={onClose} style={{ padding:"8px 18px", borderRadius:8, border:"0.5px solid #D1D5DB", background:"#fff", fontSize:13, cursor:"pointer", color:"#374151" }}>Cancel</button>
        <button onClick={onSave}  style={{ padding:"8px 18px", borderRadius:8, border:"none", background:"#2563EB", color:"#fff", fontSize:13, cursor:"pointer", fontWeight:600 }}>Save record</button>
      </div>
    </div>
  </div>
);

function SchoolForm({ initial, onSave, onClose }) {
  const [f,setF] = useState(initial || { name:"", emis:"", province:"NC", district:"", circuit:"", capacity:"", mobiles:"", mobileCap:"35", enrolment:"", teachers:"", risk:"Low" });
  const s = k => e => setF(p => ({ ...p,[k]:e.target.value }));
  return (
    <Modal title={initial ? "Edit school" : "Add school"} onClose={onClose} onSave={() => onSave(f)}>
      <Row2><Field label="School name"><input style={inp} value={f.name} onChange={s("name")}/></Field><Field label="EMIS number"><input style={inp} value={f.emis} onChange={s("emis")}/></Field></Row2>
      <Row2><Field label="Province"><input style={inp} value={f.province} onChange={s("province")}/></Field><Field label="District"><input style={inp} value={f.district} onChange={s("district")}/></Field></Row2>
      <Field label="Circuit"><input style={inp} value={f.circuit} onChange={s("circuit")} placeholder="e.g. F8"/></Field>
      <Row3><Field label="Capacity"><input style={inp} type="number" value={f.capacity} onChange={s("capacity")}/></Field><Field label="Mobiles"><input style={inp} type="number" value={f.mobiles} onChange={s("mobiles")}/></Field><Field label="Per mobile"><input style={inp} type="number" value={f.mobileCap} onChange={s("mobileCap")}/></Field></Row3>
      <Row3><Field label="Enrolment"><input style={inp} type="number" value={f.enrolment} onChange={s("enrolment")}/></Field><Field label="Teachers"><input style={inp} type="number" value={f.teachers} onChange={s("teachers")}/></Field><Field label="Risk level"><select style={sel} value={f.risk} onChange={s("risk")}>{["Low","Medium","High"].map(v=><option key={v}>{v}</option>)}</select></Field></Row3>
    </Modal>
  );
}

function AuditForm({ schools, onSave, onClose }) {
  const [f,setF] = useState({ schoolId:"", year:new Date().getFullYear(), date:"", risk:"Low", capWith:"", capWithout:"", overcapacity:"No", recommendations:"", comments:"" });
  const s = k => e => setF(p => ({ ...p,[k]:e.target.value }));
  return (
    <Modal title="New audit" onClose={onClose} onSave={() => onSave(f)}>
      <Row2><Field label="School"><select style={sel} value={f.schoolId} onChange={s("schoolId")}><option value="">Select school</option>{schools.map(sc=><option key={sc.id} value={sc.id}>{sc.name}</option>)}</select></Field><Field label="Year"><input style={inp} type="number" value={f.year} onChange={s("year")}/></Field></Row2>
      <Row2><Field label="Date"><input style={inp} type="date" value={f.date} onChange={s("date")}/></Field><Field label="Risk level"><select style={sel} value={f.risk} onChange={s("risk")}>{["Low","Medium","High"].map(v=><option key={v}>{v}</option>)}</select></Field></Row2>
      <Row3><Field label="Cap with mobiles"><input style={inp} type="number" value={f.capWith} onChange={s("capWith")}/></Field><Field label="Cap without mobiles"><input style={inp} type="number" value={f.capWithout} onChange={s("capWithout")}/></Field><Field label="Overcapacity"><select style={sel} value={f.overcapacity} onChange={s("overcapacity")}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field></Row3>
      <Field label="Recommendations"><textarea style={{...inp,minHeight:60,resize:"vertical"}} value={f.recommendations} onChange={s("recommendations")}/></Field>
      <Field label="Comments"><textarea style={{...inp,minHeight:40,resize:"vertical"}} value={f.comments} onChange={s("comments")}/></Field>
    </Modal>
  );
}

function ClassroomForm({ schools, onSave, onClose }) {
  const [f,setF] = useState({ schoolId:"", room:"", type:"Classroom", grade:"", spec:"", learners:"", isMobile:"No" });
  const s = k => e => setF(p => ({ ...p,[k]:e.target.value }));
  return (
    <Modal title="Add classroom" onClose={onClose} onSave={() => onSave(f)}>
      <Row2><Field label="School"><select style={sel} value={f.schoolId} onChange={s("schoolId")}><option value="">Select</option>{schools.map(sc=><option key={sc.id} value={sc.id}>{sc.name}</option>)}</select></Field><Field label="Room number"><input style={inp} value={f.room} onChange={s("room")}/></Field></Row2>
      <Row2><Field label="Room type"><select style={sel} value={f.type} onChange={s("type")}>{["Classroom","Lab","Office","Storage"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Is mobile?"><select style={sel} value={f.isMobile} onChange={s("isMobile")}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field></Row2>
      <Row3><Field label="Grade R-12"><input style={inp} value={f.grade} onChange={s("grade")}/></Field><Field label="Spec e.g. 4E1"><input style={inp} value={f.spec} onChange={s("spec")}/></Field><Field label="Learner count"><input style={inp} type="number" value={f.learners} onChange={s("learners")}/></Field></Row3>
    </Modal>
  );
}

function FurnitureForm({ classrooms, schools, onSave, onClose }) {
  const [f,setF] = useState({ classroomId:"", category:"Learner", ftype:"", spec:"", chairType:"Penny 1 Wooden", available:"", damaged:"", repairable:"", otherType:"", otherQty:"", condition:"Good" });
  const s = k => e => setF(p => ({ ...p,[k]:e.target.value }));
  const roomLabel = c => { const sc = schools.find(x => x.id === c.schoolId); return (sc ? sc.name : "?") + " Room " + c.room; };
  return (
    <Modal title="Add furniture" onClose={onClose} onSave={() => onSave(f)}>
      <Field label="Classroom"><select style={sel} value={f.classroomId} onChange={s("classroomId")}><option value="">Select classroom</option>{classrooms.map(c=><option key={c.id} value={c.id}>{roomLabel(c)}</option>)}</select></Field>
      <Row2><Field label="Category"><select style={sel} value={f.category} onChange={s("category")}>{["Learner","Admin","Specialised"].map(v=><option key={v}>{v}</option>)}</select></Field>
      <Field label="DBE Furniture type"><select style={sel} value={f.ftype} onChange={s("ftype")}><option value="">Select...</option>{DBE_FURNITURE.map(v=><option key={v} value={v}>{v}</option>)}<option value="Other">Other specify below</option></select></Field></Row2>
      {f.ftype === "Other" && <Field label="Specify type"><input style={inp} value={f.otherType} onChange={s("otherType")} placeholder="Describe furniture item"/></Field>}
      <Row2><Field label="Specification"><input style={inp} value={f.spec} onChange={s("spec")} placeholder="e.g. Grade 4-6"/></Field><Field label="Chair type"><select style={sel} value={f.chairType} onChange={s("chairType")}>{["Penny 1 Wooden","Penny 1 Plastic","Penny 4 Wooden","Penny 4 Plastic","Utility Steel Frame","Lab Stool","Upholstered"].map(v=><option key={v}>{v}</option>)}</select></Field></Row2>
      <Row3><Field label="Available"><input style={inp} type="number" value={f.available} onChange={s("available")}/></Field><Field label="Damaged"><input style={inp} type="number" value={f.damaged} onChange={s("damaged")}/></Field><Field label="Repairable"><input style={inp} type="number" value={f.repairable} onChange={s("repairable")}/></Field></Row3>
      <Row2><Field label="Other qty"><input style={inp} type="number" value={f.otherQty} onChange={s("otherQty")}/></Field><Field label="Condition"><select style={sel} value={f.condition} onChange={s("condition")}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field></Row2>
    </Modal>
  );
}

function ConditionForm({ classrooms, schools, onSave, onClose }) {
  const [f,setF] = useState({ classroomId:"", flooring:"Good", flooringIssues:"", windows:"Good", windowIssues:"", locks:"Good", electricity:"Yes", mobile:"N/A", comments:"" });
  const s = k => e => setF(p => ({ ...p,[k]:e.target.value }));
  const roomLabel = c => { const sc = schools.find(x => x.id === c.schoolId); return (sc ? sc.name : "?") + " Room " + c.room; };
  return (
    <Modal title="Condition assessment" onClose={onClose} onSave={() => onSave(f)}>
      <Field label="Classroom"><select style={sel} value={f.classroomId} onChange={s("classroomId")}><option value="">Select</option>{classrooms.map(c=><option key={c.id} value={c.id}>{roomLabel(c)}</option>)}</select></Field>
      <Row2><Field label="Flooring condition"><select style={sel} value={f.flooring} onChange={s("flooring")}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Flooring issues"><input style={inp} value={f.flooringIssues} onChange={s("flooringIssues")} placeholder="e.g. Cracks Holes"/></Field></Row2>
      <Row2><Field label="Windows condition"><select style={sel} value={f.windows} onChange={s("windows")}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Window issues"><input style={inp} value={f.windowIssues} onChange={s("windowIssues")} placeholder="e.g. Broken Missing"/></Field></Row2>
      <Row3><Field label="Lock condition"><select style={sel} value={f.locks} onChange={s("locks")}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Electricity?"><select style={sel} value={f.electricity} onChange={s("electricity")}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Mobile condition"><input style={inp} value={f.mobile} onChange={s("mobile")} placeholder="N/A or condition"/></Field></Row3>
      <Field label="Comments"><textarea style={{...inp,minHeight:50,resize:"vertical"}} value={f.comments} onChange={s("comments")}/></Field>
    </Modal>
  );
}

function RepairForm({ furniture, onSave, onClose }) {
  const [f,setF] = useState({ furnitureId:"", repairType:"Minor", destination:"Warehouse", qty:"", status:"Pending", allocated:"", completed:"" });
  const s = k => e => setF(p => ({ ...p,[k]:e.target.value }));
  return (
    <Modal title="Log repair" onClose={onClose} onSave={() => onSave(f)}>
      <Field label="Furniture item"><select style={sel} value={f.furnitureId} onChange={s("furnitureId")}><option value="">Select</option>{furniture.map(fu=><option key={fu.id} value={fu.id}>{fu.ftype} {fu.spec}</option>)}</select></Field>
      <Row2><Field label="Repair type"><select style={sel} value={f.repairType} onChange={s("repairType")}>{["Minor","Major"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Destination"><select style={sel} value={f.destination} onChange={s("destination")}>{["Warehouse","Labour Dept"].map(v=><option key={v}>{v}</option>)}</select></Field></Row2>
      <Row2><Field label="Quantity"><input style={inp} type="number" value={f.qty} onChange={s("qty")}/></Field><Field label="Status"><select style={sel} value={f.status} onChange={s("status")}>{["Pending","In Progress","Completed"].map(v=><option key={v}>{v}</option>)}</select></Field></Row2>
      <Row2><Field label="Date allocated"><input style={inp} type="date" value={f.allocated} onChange={s("allocated")}/></Field><Field label="Date completed"><input style={inp} type="date" value={f.completed} onChange={s("completed")}/></Field></Row2>
    </Modal>
  );
}

function StorageForm({ schools, onSave, onClose }) {
  const [f,setF] = useState({ schoolId:"", room:"", condition:"Good", secure:"Yes", storedType:"", qty:"", usable:"No", desc:"" });
  const s = k => e => setF(p => ({ ...p,[k]:e.target.value }));
  return (
    <Modal title="Add storage record" onClose={onClose} onSave={() => onSave(f)}>
      <Row2><Field label="School"><select style={sel} value={f.schoolId} onChange={s("schoolId")}><option value="">Select</option>{schools.map(sc=><option key={sc.id} value={sc.id}>{sc.name}</option>)}</select></Field><Field label="Room number"><input style={inp} value={f.room} onChange={s("room")}/></Field></Row2>
      <Row3><Field label="Condition"><select style={sel} value={f.condition} onChange={s("condition")}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Secure?"><select style={sel} value={f.secure} onChange={s("secure")}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Usable?"><select style={sel} value={f.usable} onChange={s("usable")}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field></Row3>
      <Row2><Field label="Stored type"><input style={inp} value={f.storedType} onChange={s("storedType")}/></Field><Field label="Quantity"><input style={inp} type="number" value={f.qty} onChange={s("qty")}/></Field></Row2>
      <Field label="Description"><textarea style={{...inp,minHeight:50,resize:"vertical"}} value={f.desc} onChange={s("desc")}/></Field>
    </Modal>
  );
}

function DistributionForm({ schools, onSave, onClose }) {
  const [f,setF] = useState({ schoolId:"", destination:"", desc:"", qty:"", source:"", official:"", position:"", receiver:"", role:"", date:"", purpose:"Delivery", ref:"" });
  const s = k => e => setF(p => ({ ...p,[k]:e.target.value }));
  return (
    <Modal title="Add distribution record" onClose={onClose} onSave={() => onSave(f)}>
      <Row2><Field label="School"><select style={sel} value={f.schoolId} onChange={s("schoolId")}><option value="">Select</option>{schools.map(sc=><option key={sc.id} value={sc.id}>{sc.name}</option>)}</select></Field><Field label="Purpose"><select style={sel} value={f.purpose} onChange={s("purpose")}>{["Delivery","Collection","Repair"].map(v=><option key={v}>{v}</option>)}</select></Field></Row2>
      <Row2><Field label="Destination"><input style={inp} value={f.destination} onChange={s("destination")}/></Field><Field label="Source location"><input style={inp} value={f.source} onChange={s("source")}/></Field></Row2>
      <Row2><Field label="Description"><input style={inp} value={f.desc} onChange={s("desc")}/></Field><Field label="Quantity"><input style={inp} type="number" value={f.qty} onChange={s("qty")}/></Field></Row2>
      <Row2><Field label="Official name"><input style={inp} value={f.official} onChange={s("official")}/></Field><Field label="Position"><input style={inp} value={f.position} onChange={s("position")}/></Field></Row2>
      <Row2><Field label="Receiving person"><input style={inp} value={f.receiver} onChange={s("receiver")}/></Field><Field label="Receiving role"><input style={inp} value={f.role} onChange={s("role")}/></Field></Row2>
      <Row2><Field label="Date"><input style={inp} type="date" value={f.date} onChange={s("date")}/></Field><Field label="Reference number"><input style={inp} value={f.ref} onChange={s("ref")}/></Field></Row2>
    </Modal>
  );
}

function WarehouseForm({ onSave, onClose }) {
  const [f,setF] = useState({ date:"", supplier:"", ftype:"", spec:"", qty:"", condition:"Good", receivedBy:"", ref:"", status:"In Stock", notes:"" });
  const s = k => e => setF(p => ({ ...p,[k]:e.target.value }));
  return (
    <Modal title="Log warehouse delivery" onClose={onClose} onSave={() => onSave(f)}>
      <Row2><Field label="Date received"><input style={inp} type="date" value={f.date} onChange={s("date")}/></Field><Field label="Supplier"><input style={inp} value={f.supplier} onChange={s("supplier")}/></Field></Row2>
      <Field label="DBE Furniture type"><select style={sel} value={f.ftype} onChange={s("ftype")}><option value="">Select...</option>{DBE_FURNITURE.map(v=><option key={v} value={v}>{v}</option>)}<option value="Other">Other</option></select></Field>
      <Row3><Field label="Quantity"><input style={inp} type="number" value={f.qty} onChange={s("qty")}/></Field><Field label="Condition"><select style={sel} value={f.condition} onChange={s("condition")}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Status"><select style={sel} value={f.status} onChange={s("status")}>{["In Stock","Reserved","Dispatched"].map(v=><option key={v}>{v}</option>)}</select></Field></Row3>
      <Row2><Field label="Received by"><input style={inp} value={f.receivedBy} onChange={s("receivedBy")}/></Field><Field label="Reference number"><input style={inp} value={f.ref} onChange={s("ref")}/></Field></Row2>
      <Field label="Notes"><textarea style={{...inp,minHeight:50,resize:"vertical"}} value={f.notes} onChange={s("notes")}/></Field>
    </Modal>
  );
}

function UploadForm({ onSave, onClose }) {
  const [f,setF] = useState({ system:"NEIMS", date:"", status:"Completed", records:"", verifiedBy:"PY Tshabangu", notes:"" });
  const s = k => e => setF(p => ({ ...p,[k]:e.target.value }));
  return (
    <Modal title="Log data upload" onClose={onClose} onSave={() => onSave(f)}>
      <Row2><Field label="System"><select style={sel} value={f.system} onChange={s("system")}>{["NEIMS","EFMS","GOVERP","HRMS","Google Forms","Other"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Date uploaded"><input style={inp} type="date" value={f.date} onChange={s("date")}/></Field></Row2>
      <Row2><Field label="Records uploaded"><input style={inp} type="number" value={f.records} onChange={s("records")}/></Field><Field label="Status"><select style={sel} value={f.status} onChange={s("status")}>{["Completed","In Progress","Pending","Failed"].map(v=><option key={v}>{v}</option>)}</select></Field></Row2>
      <Field label="Verified by"><input style={inp} value={f.verifiedBy} onChange={s("verifiedBy")}/></Field>
      <Field label="Notes evidence"><textarea style={{...inp,minHeight:60,resize:"vertical"}} value={f.notes} onChange={s("notes")}/></Field>
    </Modal>
  );
}

function LearnerDataForm({ onSave, onClose }) {
  const [f,setF] = useState({ school:"", district:"", source:"10th Day Snap Survey", date:"", enrolment:"", verified:"", variance:"", status:"Pending" });
  const s = k => e => setF(p => ({ ...p,[k]:e.target.value }));
  const calcVar = () => setF(p => ({ ...p, variance:Math.abs(Number(p.enrolment||0)-Number(p.verified||0)) }));
  return (
    <Modal title="Log learner data verification" onClose={onClose} onSave={() => onSave(f)}>
      <Row2><Field label="School name"><input style={inp} value={f.school} onChange={s("school")}/></Field><Field label="District"><input style={inp} value={f.district} onChange={s("district")}/></Field></Row2>
      <Row2><Field label="Data source"><select style={sel} value={f.source} onChange={s("source")}>{["10th Day Snap Survey","GOVERP","HRMS","Google Forms","NEIMS","Other"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Date collected"><input style={inp} type="date" value={f.date} onChange={s("date")}/></Field></Row2>
      <Row3><Field label="Reported enrolment"><input style={inp} type="number" value={f.enrolment} onChange={s("enrolment")} onBlur={calcVar}/></Field><Field label="Verified figure"><input style={inp} type="number" value={f.verified} onChange={s("verified")} onBlur={calcVar}/></Field><Field label="Variance auto"><input style={{...inp,background:"#F9FAFB",color:"#6B7280"}} value={f.variance} readOnly/></Field></Row3>
      <Field label="Status"><select style={sel} value={f.status} onChange={s("status")}>{["Validated","Queried","Pending","Rejected"].map(v=><option key={v}>{v}</option>)}</select></Field>
    </Modal>
  );
}

function MobileAuditForm({ schools, onSave, onClose }) {
  const [f,setF] = useState({ schoolId:"", mobileCount:"", condition:"Good", structuralIssues:"", electricityAvail:"Yes", ablutions:"Yes", recommendation:"", auditDate:"", auditedBy:"PY Tshabangu", receivedDate:"" });
  const s = k => e => setF(p => ({ ...p,[k]:e.target.value }));
  return (
    <Modal title="Mobile classroom audit" onClose={onClose} onSave={() => onSave(f)}>
      <Row2><Field label="School"><select style={sel} value={f.schoolId} onChange={s("schoolId")}><option value="">Select</option>{schools.map(sc=><option key={sc.id} value={sc.id}>{sc.name}</option>)}</select></Field><Field label="Number of mobiles"><input style={inp} type="number" value={f.mobileCount} onChange={s("mobileCount")}/></Field></Row2>
      <Row3><Field label="Overall condition"><select style={sel} value={f.condition} onChange={s("condition")}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Electricity?"><select style={sel} value={f.electricityAvail} onChange={s("electricityAvail")}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Ablutions?"><select style={sel} value={f.ablutions} onChange={s("ablutions")}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field></Row3>
      <Field label="Structural issues"><input style={inp} value={f.structuralIssues} onChange={s("structuralIssues")} placeholder="e.g. Roof leaks floor damage"/></Field>
      <Field label="Recommendation"><input style={inp} value={f.recommendation} onChange={s("recommendation")} placeholder="e.g. Repair Replace Monitor"/></Field>
      <Row2><Field label="Audit date"><input style={inp} type="date" value={f.auditDate} onChange={s("auditDate")}/></Field><Field label="Audited by"><input style={inp} value={f.auditedBy} onChange={s("auditedBy")}/></Field></Row2>
      <Field label="Date mobile received at school"><input style={inp} type="date" value={f.receivedDate} onChange={s("receivedDate")}/></Field>
    </Modal>
  );
}

function SchoolRequestForm({ schools, onSave, onClose }) {
  const [f,setF] = useState({ schoolId:"", district:"", requestType:"Furniture", priority:"Medium", dateReceived:"", status:"Pending", assignedTo:"PY Tshabangu", dueDate:"", notes:"" });
  const s = k => e => setF(p => ({ ...p,[k]:e.target.value }));
  return (
    <Modal title="Log school request" onClose={onClose} onSave={() => onSave(f)}>
      <Row2><Field label="School"><select style={sel} value={f.schoolId} onChange={s("schoolId")}><option value="">Select</option>{schools.map(sc=><option key={sc.id} value={sc.id}>{sc.name}</option>)}</select></Field><Field label="District"><input style={inp} value={f.district} onChange={s("district")}/></Field></Row2>
      <Row3><Field label="Request type"><select style={sel} value={f.requestType} onChange={s("requestType")}>{["Furniture","Mobile Unit","Repairs","Infrastructure","Other"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Priority"><select style={sel} value={f.priority} onChange={s("priority")}>{["High","Medium","Low"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Status"><select style={sel} value={f.status} onChange={s("status")}>{["Pending","In Progress","Completed","Declined"].map(v=><option key={v}>{v}</option>)}</select></Field></Row3>
      <Row2><Field label="Date received"><input style={inp} type="date" value={f.dateReceived} onChange={s("dateReceived")}/></Field><Field label="Due date"><input style={inp} type="date" value={f.dueDate} onChange={s("dueDate")}/></Field></Row2>
      <Field label="Assigned to"><input style={inp} value={f.assignedTo} onChange={s("assignedTo")}/></Field>
      <Field label="Notes"><textarea style={{...inp,minHeight:50,resize:"vertical"}} value={f.notes} onChange={s("notes")}/></Field>
    </Modal>
  );
}

function AdminTaskForm({ onSave, onClose }) {
  const [f,setF] = useState({ type:"Payment Verification", ref:"", date:"", amount:"", supplier:"", status:"Pending", notes:"" });
  const s = k => e => setF(p => ({ ...p,[k]:e.target.value }));
  return (
    <Modal title="Log admin task" onClose={onClose} onSave={() => onSave(f)}>
      <Row2><Field label="Task type"><select style={sel} value={f.type} onChange={s("type")}>{["Payment Verification","Stakeholder Enquiry","Filing Scanning","Training","Correspondence","Other"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Reference number"><input style={inp} value={f.ref} onChange={s("ref")} placeholder="e.g. PAY-2026-001"/></Field></Row2>
      <Row2><Field label="Date"><input style={inp} type="date" value={f.date} onChange={s("date")}/></Field><Field label="Status"><select style={sel} value={f.status} onChange={s("status")}>{["Pending","In Progress","Verified","Completed","Resolved"].map(v=><option key={v}>{v}</option>)}</select></Field></Row2>
      <Row2><Field label="Amount if payment"><input style={inp} value={f.amount} onChange={s("amount")} placeholder="e.g. R 45000"/></Field><Field label="Supplier party"><input style={inp} value={f.supplier} onChange={s("supplier")}/></Field></Row2>
      <Field label="Notes evidence"><textarea style={{...inp,minHeight:50,resize:"vertical"}} value={f.notes} onChange={s("notes")}/></Field>
    </Modal>
  );
}

function EmisPage({ onImport }) {
  const [search,setSearch] = useState("");
  const [distFilter,setDistFilter] = useState("All");
  const [phaseFilter,setPhaseFilter] = useState("All");
  const [sectorFilter,setSectorFilter] = useState("All");
  const [selected,setSelected] = useState(null);
  const [uploadedData,setUploadedData] = useState([]);
  const [uploadMsg,setUploadMsg] = useState("");

  const allData = uploadedData.length > 0 ? uploadedData : EMIS_SAMPLE;
  const districts = ["All", ...Array.from(new Set(allData.map(s => s.district))).sort()];

  const handleUpload = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const text = ev.target.result;
      const sep = text.indexOf("\t") > -1 ? "\t" : ",";
      const lines = text.split(/\r?\n/).filter(Boolean);
      const hdrs = lines[0].split(sep).map(h => h.trim().toLowerCase().replace(/['"]/g,""));
      const get = (row, ...keys) => {
        for (let i = 0; i < keys.length; i++) {
          const idx = hdrs.indexOf(keys[i].toLowerCase());
          if (idx >= 0 && row[idx] !== undefined) return row[idx].toString().trim().replace(/^"|"$/g,"");
        }
        return "";
      };
      const phMap = { primary:"Primary", secondary:"Secondary", combined:"Combined", intermediate:"Intermediate" };
      const parsed = lines.slice(1).map(line => {
        const row = sep === "\t" ? line.split("\t") : line.split(",");
        const emis = get(row,"emiscode","emis code","emis");
        const name = get(row,"institution name","name","school name");
        if (!emis && !name) return null;
        const phRaw = get(row,"institution phase","phase");
        return {
          emis, name,
          district: get(row,"district"),
          phase: phMap[phRaw.toLowerCase()] || phRaw,
          sector: get(row,"sector","legal status").toLowerCase().includes("public") ? "Public" : "Independent",
          status: get(row,"practical status of the institution","status"),
          city: get(row,"city/town","city","town"),
          province: get(row,"province") || "NC",
          lat: parseFloat(get(row,"latitude","lat")) || 0,
          lng: parseFloat(get(row,"longitude","lng")) || 0,
          email: get(row,"email"),
          emailAlt: get(row,"emailalt"),
          tel: get(row,"telephone1","tel1"),
          telCode: get(row,"telcode1","telcode"),
          circuit: get(row,"circuit"),
          landOwnership: get(row,"landownership"),
          examCentre: get(row,"examcentre"),
        };
      }).filter(r => {
        if (!r || (!r.emis && !r.name)) return false;
        const prov = (r.province||"").trim().toUpperCase().replace(/[^A-Z]/g,"");
        return prov === "NC" || prov === "NORTHERNCAPE" || prov === "NORTHERN";
      });
      setUploadedData(parsed);
      setUploadMsg("Loaded " + parsed.length + " NC schools from " + file.name);
    };
    reader.readAsText(file);
  };

  const filtered = useMemo(() => allData.filter(s => {
    const q = search.toLowerCase();
    return (!q || s.name.toLowerCase().includes(q) || s.emis.includes(q) || (s.city||"").toLowerCase().includes(q))
      && (distFilter === "All" || s.district === distFilter)
      && (phaseFilter === "All" || s.phase === phaseFilter)
      && (sectorFilter === "All" || s.sector === sectorFilter);
  }), [search, distFilter, phaseFilter, sectorFilter, allData]);

  return (
    <div>
      <SectionHeader title="EMIS School Database" extra={<ExportBtn label="CSV" filename="emis_schools.csv" cols={["EMIS","Name","District","Phase","Sector","City","Province","Email","Tel"]} rows={allData.map(s=>[s.emis,s.name,s.district,s.phase,s.sector,s.city,s.province,s.email,s.tel])}/>}/>
      <Card style={{ marginBottom:"1.25rem", background:"linear-gradient(135deg,#EFF6FF,#DBEAFE)", borderColor:"#BFDBFE" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <div>
            <p style={{ fontWeight:600, fontSize:14, color:"#1E40AF", margin:"0 0 2px" }}>Upload full EMIS dataset</p>
            <p style={{ fontSize:12, color:"#3B82F6", margin:0 }}>Upload your NC EMIS master list. Currently showing {allData.length} schools.</p>
            {uploadMsg && <p style={{ fontSize:12, color:"#065F46", fontWeight:600, margin:"4px 0 0" }}>{uploadMsg}</p>}
          </div>
          <label style={{ padding:"8px 18px", borderRadius:8, background:"#2563EB", color:"#fff", fontSize:13, cursor:"pointer", fontWeight:600, whiteSpace:"nowrap" }}>
            Choose file <input type="file" accept=".txt,.csv,.tsv" onChange={handleUpload} style={{ display:"none" }}/>
          </label>
        </div>
      </Card>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:"1.25rem" }}>
        <StatCard label="Total records"  value={allData.length} sub="Northern Cape" color="#2563EB"/>
        <StatCard label="Public"         value={allData.filter(s=>s.sector==="Public").length}      color="#059669"/>
        <StatCard label="Independent"    value={allData.filter(s=>s.sector==="Independent").length} color="#7C3AED"/>
        <StatCard label="Districts"      value={new Set(allData.map(s=>s.district)).size}           color="#D97706"/>
      </div>
      <Card style={{ marginBottom:"1rem" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:10 }}>
          <div><label style={flbl}>Search name EMIS town</label><input style={inp} placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
          <div><label style={flbl}>District</label><select style={sel} value={distFilter} onChange={e=>setDistFilter(e.target.value)}>{districts.map(d=><option key={d}>{d}</option>)}</select></div>
          <div><label style={flbl}>Phase</label><select style={sel} value={phaseFilter} onChange={e=>setPhaseFilter(e.target.value)}>{["All","Primary","Secondary","Combined","Intermediate"].map(p=><option key={p}>{p}</option>)}</select></div>
          <div><label style={flbl}>Sector</label><select style={sel} value={sectorFilter} onChange={e=>setSectorFilter(e.target.value)}>{["All","Public","Independent"].map(x=><option key={x}>{x}</option>)}</select></div>
        </div>
      </Card>
      <Card>
        <p style={{ fontSize:12, color:"#6B7280", margin:"0 0 10px" }}>Showing {filtered.length} of {allData.length} schools</p>
        <DataTable cols={["EMIS","School Name","District","Phase","Sector","City","Action"]} rows={filtered}
          renderRow={s => [
            <span style={{fontSize:12,color:"#6B7280"}}>{s.emis}</span>,
            <span style={{fontWeight:500}}>{s.name}</span>,
            s.district, <Badge val={s.phase}/>, <Badge val={s.sector}/>, s.city,
            <button onClick={()=>setSelected(s)} style={{fontSize:12,color:"#2563EB",background:"#EFF6FF",border:"0.5px solid #BFDBFE",borderRadius:6,padding:"3px 10px",cursor:"pointer"}}>View</button>
          ]}/>
      </Card>
      {selected && (
        <Card style={{ marginTop:"1rem", borderColor:"#BFDBFE" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
            <div><p style={{fontWeight:600,fontSize:15,margin:"0 0 2px"}}>{selected.name}</p><p style={{fontSize:12,color:"#6B7280",margin:0}}>EMIS: {selected.emis} - {selected.district}</p></div>
            <button onClick={()=>setSelected(null)} style={{background:"none",border:"none",color:"#9CA3AF",cursor:"pointer",fontSize:18}}>x</button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:14 }}>
            {[["Phase",selected.phase],["Sector",selected.sector],["City",selected.city],["Circuit",selected.circuit||"-"],["Land Ownership",selected.landOwnership||"-"],["Status",selected.status||"-"],["Email",selected.email||"-"],["Alt Email",selected.emailAlt||"-"],["Tel",selected.telCode&&selected.tel?(selected.telCode+" "+selected.tel):selected.tel||"-"],["Exam Centre",selected.examCentre||"-"],["Latitude",selected.lat||"-"],["Longitude",selected.lng||"-"]].map(([l,v])=>(
              <div key={l} style={{background:"#F9FAFB",borderRadius:8,padding:"8px 10px"}}><p style={{fontSize:11,color:"#6B7280",margin:"0 0 2px"}}>{l}</p><p style={{fontSize:13,fontWeight:500,margin:0,wordBreak:"break-all"}}>{v}</p></div>
            ))}
          </div>
          <button onClick={()=>{onImport(selected);setSelected(null);}} style={{padding:"8px 20px",borderRadius:8,border:"none",background:"#2563EB",color:"#fff",fontSize:13,cursor:"pointer",fontWeight:600}}>Import into Audit Schools</button>
        </Card>
      )}
    </div>
  );
}

function ExportPage({ schools, audits, classrooms, furniture, conditions, repairs, warehouse, storage, distribution }) {
  const scName = id => { const sc = schools.find(s => s.id == id); return sc ? sc.name : ""; };
  const exports = [
    { label:"Schools",          desc:"All audit school records",   icon:"🏫", file:"schools.csv",     cols:["Name","EMIS","Province","District","Capacity","Enrolment","Teachers","Risk"],                   rows:schools.map(s=>[s.name,s.emis,s.province,s.district,s.capacity,s.enrolment,s.teachers,s.risk]) },
    { label:"Audits",           desc:"All school audit records",   icon:"📋", file:"audits.csv",      cols:["School","Year","Date","Risk","Overcapacity","Recommendations"],                                  rows:audits.map(a=>[scName(a.schoolId),a.year,a.date,a.risk,a.overcapacity,a.recommendations]) },
    { label:"Classrooms",       desc:"All classroom records",      icon:"🚪", file:"classrooms.csv",  cols:["School","Room","Type","Grade","Spec","Learners","Mobile"],                                       rows:classrooms.map(c=>[scName(c.schoolId),c.room,c.type,c.grade,c.spec,c.learners,c.isMobile]) },
    { label:"Furniture",        desc:"All furniture items",        icon:"🪑", file:"furniture.csv",   cols:["School","Room","Category","Type","Available","Damaged","Repairable","Condition"],                rows:furniture.map(f=>{const cl=classrooms.find(c=>c.id==f.classroomId);return[scName(cl&&cl.schoolId),cl?cl.room:"",f.category,f.ftype,f.available,f.damaged,f.repairable,f.condition];}) },
    { label:"Conditions",       desc:"Infrastructure assessments", icon:"🔍", file:"conditions.csv",  cols:["School","Room","Flooring","Issues","Windows","Electricity","Locks"],                             rows:conditions.map(c=>{const cl=classrooms.find(r=>r.id==c.classroomId);return[scName(cl&&cl.schoolId),cl?cl.room:"",c.flooring,c.flooringIssues,c.windows,c.electricity,c.locks];}) },
    { label:"Repairs",          desc:"All repair jobs",            icon:"🔧", file:"repairs.csv",     cols:["Furniture","Repair Type","Destination","Qty","Status","Allocated","Completed"],                  rows:repairs.map(r=>{const fu=furniture.find(f=>f.id==r.furnitureId);return[fu?fu.ftype:"",r.repairType,r.destination,r.qty,r.status,r.allocated,r.completed||""];}) },
    { label:"Warehouse",        desc:"New furniture deliveries",   icon:"🏭", file:"warehouse.csv",   cols:["Date","Supplier","Type","Qty","Condition","Ref","Status"],                                       rows:warehouse.map(w=>[w.date,w.supplier,w.ftype,w.qty,w.condition,w.ref,w.status]) },
    { label:"Storage",          desc:"Storage room records",       icon:"📦", file:"storage.csv",     cols:["School","Room","Condition","Secure","Stored Type","Qty","Usable"],                               rows:storage.map(r=>[scName(r.schoolId),r.room,r.condition,r.secure,r.storedType,r.qty,r.usable]) },
    { label:"Distribution",     desc:"Delivery and collection",    icon:"🚚", file:"distribution.csv",cols:["School","Purpose","Description","Qty","Destination","Official","Date","Ref"],                    rows:distribution.map(r=>[scName(r.schoolId),r.purpose,r.desc,r.qty,r.destination,r.official,r.date,r.ref]) },
    { label:"Capacity Analysis",desc:"Capacity vs enrolment",      icon:"📐", file:"capacity.csv",    cols:["School","EMIS","Enrolment","Capacity","With Mobiles","Utilisation","Overcapacity"],              rows:schools.filter(s=>s.capacity).map(s=>{const mob=Number(s.capacity)+Number(s.mobiles)*Number(s.mobileCap);const pct=Math.round((Number(s.enrolment)/Number(s.capacity))*100);return[s.name,s.emis,s.enrolment,s.capacity,mob,pct+"%",Number(s.enrolment)>Number(s.capacity)?"Yes":"No"];}) },
    { label:"Ratio Analysis",   desc:"Teacher learner ratios",     icon:"👩‍🏫",file:"ratio.csv",       cols:["School","EMIS","Enrolment","Teachers","Ratio","Status"],                                        rows:schools.map(s=>{const r=s.teachers&&s.enrolment?Math.round(Number(s.enrolment)/Number(s.teachers)):null;return[s.name,s.emis,s.enrolment,s.teachers,r?"1:"+r:"",!r?"No data":r<=30?"Good":r<=40?"Acceptable":"Overcrowded"];}) },
  ];
  return (
    <div>
      <SectionHeader title="Export / Reports"/>
      <p style={{fontSize:13,color:"#6B7280",margin:"0 0 1.5rem"}}>Download any section as a CSV. All exports reflect current live data.</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
        {exports.map(e => (
          <Card key={e.label} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:22}}>{e.icon}</span>
              <div><p style={{fontWeight:500,fontSize:14,margin:"0 0 2px",color:"#111827"}}>{e.label}</p><p style={{fontSize:12,color:"#6B7280",margin:0}}>{e.desc}</p></div>
            </div>
            <ExportBtn label="CSV" filename={e.file} cols={e.cols} rows={e.rows}/>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Dashboard({ schools, audits, furniture, repairs, warehouse }) {
  const totalShortage = schools.reduce((a,s) => { const sh=Number(s.enrolment||0)-Number(s.capacity||0); return a+(sh>0?sh:0); },0);
  const riskCounts = { High:schools.filter(s=>s.risk==="High").length, Medium:schools.filter(s=>s.risk==="Medium").length, Low:schools.filter(s=>s.risk==="Low").length };
  const dominantRisk = riskCounts.High>0?"High":riskCounts.Medium>0?"Medium":"Low";
  const totalFurn = furniture.reduce((a,f)=>a+Number(f.available||0),0);
  const inStock   = warehouse.filter(w=>w.status==="In Stock").reduce((a,w)=>a+Number(w.qty||0),0);
  const dispatched= warehouse.filter(w=>w.status==="Dispatched").reduce((a,w)=>a+Number(w.qty||0),0);
  const reserved  = warehouse.filter(w=>w.status==="Reserved").reduce((a,w)=>a+Number(w.qty||0),0);
  const whIn      = repairs.filter(r=>r.destination==="Warehouse").reduce((a,r)=>a+Number(r.qty||0),0);
  const whDone    = repairs.filter(r=>r.destination==="Warehouse"&&r.status==="Completed").reduce((a,r)=>a+Number(r.qty||0),0);
  const whProg    = repairs.filter(r=>r.destination==="Warehouse"&&r.status==="In Progress").reduce((a,r)=>a+Number(r.qty||0),0);
  return (
    <div>
      <SectionHeader title="Dashboard overview"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:"1.25rem"}}>
        <StatCard label="Total schools"          value={schools.length}               sub="Registered"       color="#2563EB"/>
        <StatCard label="Total learner shortage" value={totalShortage.toLocaleString()} sub="Over capacity"  color="#DC2626"/>
        <StatCard label="Total audits"           value={audits.length}                sub="All years"        color="#7C3AED"/>
        <StatCard label="Overall risk level"     value={dominantRisk} sub={"H:"+riskCounts.High+" M:"+riskCounts.Medium+" L:"+riskCounts.Low} color={dominantRisk==="High"?"#DC2626":dominantRisk==="Medium"?"#D97706":"#059669"}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:"1.25rem"}}>
        <StatCard label="Furniture available" value={totalFurn}       sub="Tracked items"      color="#059669"/>
        <StatCard label="High risk schools"   value={riskCounts.High} sub="Urgent action"      color="#DC2626"/>
        <StatCard label="Warehouse in stock"  value={inStock}         sub="Ready to dispatch"  color="#2563EB"/>
        <StatCard label="Repairs in progress" value={whProg}          sub="At warehouse"       color="#D97706"/>
      </div>
      <p style={{fontSize:12,color:"#6B7280",fontWeight:500,margin:"0 0 8px",textTransform:"uppercase",letterSpacing:"0.05em"}}>Warehouse new furniture</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:"1.25rem"}}>
        <StatCard label="In stock"   value={inStock}    color="#059669"/>
        <StatCard label="Reserved"   value={reserved}   color="#D97706"/>
        <StatCard label="Dispatched" value={dispatched} color="#2563EB"/>
      </div>
      <p style={{fontSize:12,color:"#6B7280",fontWeight:500,margin:"0 0 8px",textTransform:"uppercase",letterSpacing:"0.05em"}}>Warehouse repairs</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:"1.5rem"}}>
        <StatCard label="Sent for repair" value={whIn}   color="#7C3AED"/>
        <StatCard label="Completed"       value={whDone} color="#059669"/>
        <StatCard label="In progress"     value={whProg} color="#D97706"/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1rem"}}>
        <Card>
          <h3 style={{fontSize:15,fontWeight:500,margin:"0 0 1rem",color:"#111827"}}>Risk overview</h3>
          {schools.length===0 && <p style={{fontSize:13,color:"#9CA3AF"}}>No schools yet</p>}
          {schools.map(s=>(
            <div key={s.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"0.5px solid #F3F4F6"}}>
              <span style={{fontSize:13,color:"#374151"}}>{s.name}</span><Badge val={s.risk}/>
            </div>
          ))}
        </Card>
        <Card>
          <h3 style={{fontSize:15,fontWeight:500,margin:"0 0 1rem",color:"#111827"}}>EMIS by district</h3>
          {["FRANCES BAARD","PIXLEY-KA-SEME","JOHN TAOLO GAETSEWE","NAMAKWA","ZF MGCAWU"].map(d=>(
            <div key={d} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:"0.5px solid #F3F4F6"}}>
              <span style={{fontSize:12,color:"#374151"}}>{d}</span>
              <span style={{fontSize:13,fontWeight:500,color:"#111827"}}>{EMIS_SAMPLE.filter(s=>s.district===d).length}</span>
            </div>
          ))}
        </Card>
      </div>
      <Card>
        <h3 style={{fontSize:15,fontWeight:500,margin:"0 0 1rem",color:"#111827"}}>Recent audits</h3>
        <DataTable cols={["School","Year","Date","Risk","Overcapacity"]} rows={audits.slice(-4).reverse()}
          renderRow={r=>{const sc=schools.find(s=>s.id==r.schoolId);return[sc?sc.name:"--",r.year,r.date,<Badge val={r.risk}/>,<Badge val={r.overcapacity}/>];}}/>
      </Card>
    </div>
  );
}

function KpaDashboard({ uploads, learnerData, mobileAudit, schoolRequests, adminTasks, setActive }) {
  const kpas = [
    { id:"kpa1", icon:"🖥️", label:"KPA 1 Data Uploads",      weight:"30%", color:"#2563EB", done:uploads.filter(u=>u.status==="Completed").length,                                              total:uploads.length },
    { id:"kpa2", icon:"📈", label:"KPA 2 Learner Data",       weight:"20%", color:"#7C3AED", done:learnerData.filter(u=>u.status==="Validated").length,                                          total:learnerData.length },
    { id:"kpa3", icon:"🚌", label:"KPA 3 Mobile Audit",       weight:"20%", color:"#059669", done:mobileAudit.filter(u=>u.condition==="Good").length,                                            total:mobileAudit.length },
    { id:"kpa4", icon:"🏗️", label:"KPA 4 School Requests",    weight:"15%", color:"#D97706", done:schoolRequests.filter(u=>u.status==="Completed").length,                                       total:schoolRequests.length },
    { id:"kpa5", icon:"🗂️", label:"KPA 5 Admin Payments",     weight:"15%", color:"#DC2626", done:adminTasks.filter(u=>["Verified","Completed","Resolved"].includes(u.status)).length,           total:adminTasks.length },
  ];
  return (
    <div>
      <div style={{background:"linear-gradient(135deg,#1e3a5f,#1e40af)",borderRadius:14,padding:"1.5rem",marginBottom:"1.5rem",color:"#fff"}}>
        <p style={{fontSize:12,color:"rgba(255,255,255,0.6)",margin:"0 0 4px",textTransform:"uppercase",letterSpacing:"0.08em"}}>Northern Cape Department of Education</p>
        <h2 style={{fontSize:20,fontWeight:700,margin:"0 0 4px"}}>EPMDS Performance Dashboard</h2>
        <p style={{fontSize:13,color:"rgba(255,255,255,0.7)",margin:"0 0 1rem"}}>PY Tshabangu - Senior Administration Officer - Physical Resources Planning - 2026/2027</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10}}>
          {[["Total Weight","100%"],["KPAs","5"],["Cycle","2026/2027"],["Supervisor","A Ralph"],["Own Rating","3 Fully Effective"]].map(([l,v])=>(
            <div key={l} style={{background:"rgba(255,255,255,0.12)",borderRadius:10,padding:"10px 12px"}}>
              <p style={{fontSize:11,color:"rgba(255,255,255,0.6)",margin:"0 0 2px"}}>{l}</p>
              <p style={{fontSize:14,fontWeight:600,margin:0}}>{v}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{display:"grid",gap:"1rem"}}>
        {kpas.map(k => {
          const pct = k.total > 0 ? Math.round((k.done/k.total)*100) : 0;
          return (
            <Card key={k.id} style={{cursor:"pointer"}} onClick={()=>setActive(k.id)}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <span style={{fontSize:22}}>{k.icon}</span>
                  <div>
                    <p style={{fontWeight:500,fontSize:14,margin:"0 0 2px",color:"#111827"}}>{k.label}</p>
                    <p style={{fontSize:12,color:"#6B7280",margin:0}}>Weight: {k.weight} - {k.done}/{k.total} tasks complete - Click to view</p>
                  </div>
                </div>
                <div style={{textAlign:"right"}}>
                  <p style={{fontSize:22,fontWeight:700,color:k.color,margin:"0 0 2px"}}>{pct}%</p>
                  <p style={{fontSize:11,color:"#9CA3AF",margin:0}}>completed</p>
                </div>
              </div>
              <div style={{background:"#F3F4F6",borderRadius:999,height:8,overflow:"hidden"}}>
                <div style={{width:pct+"%",height:"100%",background:k.color,borderRadius:999,transition:"width 0.4s"}}/>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function App() {
  const [active,         setActive]         = useState("dashboard");
  const [modal,          setModal]          = useState(null);
  const [schools,        setSchools]        = useState(initSchools);
  const [audits,         setAudits]         = useState(initAudits);
  const [classrooms,     setClassrooms]     = useState(initClassrooms);
  const [furniture,      setFurniture]      = useState(initFurniture);
  const [repairs,        setRepairs]        = useState(initRepairs);
  const [storage,        setStorage]        = useState(initStorage);
  const [distribution,   setDistribution]   = useState(initDistribution);
  const [conditions,     setConditions]     = useState(initConditions);
  const [warehouse,      setWarehouse]      = useState(initWarehouse);
  const [uploads,        setUploads]        = useState(initUploads);
  const [learnerData,    setLearnerData]    = useState(initLearnerData);
  const [mobileAudit,    setMobileAudit]    = useState(initMobileAudit);
  const [schoolRequests, setSchoolRequests] = useState(initSchoolRequests);
  const [adminTasks,     setAdminTasks]     = useState(initAdminTasks);
  const [toast,          setToast]          = useState(null);

  const add = setter => data => { setter(p => [...p, { ...data, id:uid() }]); setModal(null); };
  const showToast = msg => { setToast(msg); setTimeout(()=>setToast(null), 3000); };
  const scName = id => { const sc = schools.find(s => s.id == id); return sc ? sc.name : "--"; };

  const importSchool = emis => {
    if (schools.find(s=>s.emis===emis.emis)) { showToast(emis.name + " already exists."); return; }
    setSchools(p=>[...p,{ id:uid(), name:emis.name, emis:emis.emis, province:emis.province, district:emis.district, circuit:emis.circuit||"", capacity:"", mobiles:"", mobileCap:35, enrolment:"", teachers:"", risk:"Low" }]);
    showToast(emis.name + " imported.");
    setActive("schools");
  };

  const renderPage = () => {
    switch (active) {
      case "dashboard": return <Dashboard schools={schools} audits={audits} furniture={furniture} repairs={repairs} warehouse={warehouse}/>;
      case "emis":      return <EmisPage onImport={importSchool}/>;
      case "export":    return <ExportPage schools={schools} audits={audits} classrooms={classrooms} furniture={furniture} conditions={conditions} repairs={repairs} warehouse={warehouse} storage={storage} distribution={distribution}/>;
      case "kpa":       return <KpaDashboard uploads={uploads} learnerData={learnerData} mobileAudit={mobileAudit} schoolRequests={schoolRequests} adminTasks={adminTasks} setActive={setActive}/>;

      case "schools": return (
        <div>
      <SectionHeader title="Audit Schools" onAdd={()=>setModal("school")} extra={
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <label style={{fontSize:12,color:"#7C3AED",background:"#F5F3FF",border:"0.5px solid #DDD6FE",borderRadius:8,padding:"5px 12px",cursor:"pointer",fontWeight:600,whiteSpace:"nowrap"}}>
              📂 Import CSV
              <input type="file" accept=".csv,.txt,.tsv"               onChange={e=>{
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = ev => {
                  try {
                    const text = ev.target.result;
                    // Auto-detect separator: tab, pipe, semicolon, comma
                    const firstLine = text.split(/\r?\n/)[0] || "";
                    const sep = firstLine.indexOf("\t")>-1 ? "\t"
                              : firstLine.indexOf("|")>-1  ? "|"
                              : firstLine.indexOf(";")>-1  ? ";"
                              : ",";

                    const lines = text.split(/\r?\n/).filter(l=>l.trim());
                    if (lines.length < 2) { showToast("File appears empty or has only 1 row."); return; }

                    // Clean and normalise headers
                    const hdrs = lines[0].split(sep).map(h=>
                      h.trim().toLowerCase()
                       .replace(/['"]/g,"")
                       .replace(/\s+/g," ")
                    );

                    const get = (row,...keys) => {
                      for (let i=0;i<keys.length;i++){
                        const idx = hdrs.indexOf(keys[i].toLowerCase().trim());
                        if (idx>=0 && row[idx]!==undefined){
                          return row[idx].toString().trim().replace(/^["']|["']$/g,"");
                        }
                      }
                      return "";
                    };

                    const imported = lines.slice(1).map(line=>{
                      if (!line.trim()) return null;
                      const row = line.split(sep);
                      const name = get(row,
                        "institution name","name","school name",
                        "schoolname","institutionname","institution_name");
                      if (!name || name.length < 2) return null;
                      return {
                        id:           uid(),
                        name,
                        emis:         get(row,"emiscode","emis code","emis","emis_code"),
                        province:     get(row,"province") || "NC",
                        district:     get(row,"district"),
                        circuit:      get(row,"circuit"),
                        sector:       get(row,"sector","legal status"),
                        phase:        get(row,"institution phase","phase","institutionphase"),
                        type:         get(row,"institution type","type","institutiontype"),
                        status:       get(row,"practical status of the institution","status","practical status"),
                        city:         get(row,"city/town","city","town"),
                        postalCode:   get(row,"postal code","postalcode"),
                        poBox:        get(row,"p o box","po box","pobox","p.o.box"),
                        privateBag:   get(row,"private bag","privatebag"),
                        postOffice:   get(row,"post office","postoffice"),
                        telCode1:     get(row,"telcode1","tel code 1","telcode 1"),
                        telephone1:   get(row,"telephone1","telephone 1","tel1"),
                        telCode2:     get(row,"telcode2","tel code 2","telcode 2"),
                        telephone2:   get(row,"telephone2","telephone 2","tel2"),
                        email:        get(row,"email"),
                        emailAlt:     get(row,"emailalt","email alt","alternative email"),
                        longitude:    get(row,"longitude","long"),
                        latitude:     get(row,"latitude","lat"),
                        examCentreNo: get(row,"examcentrenumber","exam centre number","examcentreno","examcentre number"),
                        examCentre:   get(row,"examcentre","exam centre"),
                        landOwnership:get(row,"landownership","land ownership","land_ownership"),
                        capacity:     "",
                        mobiles:      "",
                        mobileCap:    "35",
                        enrolment:    "",
                        teachers:     "",
                        risk:         "Low",
                      };
                    }).filter(Boolean);

                    if (imported.length > 0) {
                      setSchools(p => {
                        const existing = new Set(p.map(s=>s.emis+s.name));
                        const newOnes = imported.filter(s=>!existing.has(s.emis+s.name));
                        return [...p, ...newOnes];
                      });
                      showToast(imported.length + " schools imported from " + file.name);
                    } else {
                      // Debug: show detected headers to help diagnose
                      showToast("No schools found. Headers detected: " + hdrs.slice(0,5).join(" | "));
                    }
                  } catch(err) {
                    showToast("Error reading file: " + err.message);
                  }
                  e.target.value = "";
                };
                reader.readAsText(file, "windows-1252");
              }}
                  const imported = lines.slice(1).map(line=>{
                    const row = sep==="\t" ? line.split("\t") : sep==="|" ? line.split("|") : line.split(",");
                    const name = get(row,"institution name","name","school name","schoolname","institutionname");
                    if (!name) return null;
                    return {
                      id: uid(),
                      name,
                      emis:         get(row,"emiscode","emis","emis code","emis number"),
                      province:     get(row,"province") || "NC",
                      district:     get(row,"district"),
                      circuit:      get(row,"circuit"),
                      sector:       get(row,"sector","legal status"),
                      phase:        get(row,"institution phase","phase"),
                      type:         get(row,"institution type","type"),
                      status:       get(row,"practical status of the institution","status"),
                      city:         get(row,"city/town","city","town"),
                      postalCode:   get(row,"postal code"),
                      poBox:        get(row,"p o box","po box"),
                      privateBag:   get(row,"private bag"),
                      postOffice:   get(row,"post office"),
                      telCode1:     get(row,"telcode1","tel code 1"),
                      telephone1:   get(row,"telephone1","telephone 1"),
                      telCode2:     get(row,"telcode2","tel code 2"),
                      telephone2:   get(row,"telephone2","telephone 2"),
                      email:        get(row,"email"),
                      emailAlt:     get(row,"emailalt","email alt"),
                      longitude:    get(row,"longitude","long"),
                      latitude:     get(row,"latitude","lat"),
                      examCentreNo: get(row,"examcentrenumber","exam centre number","examcentreno"),
                      examCentre:   get(row,"examcentre","exam centre"),
                      landOwnership:get(row,"landownership","land ownership"),
                      capacity:     "",
                      mobiles:      "",
                      mobileCap:    "35",
                      enrolment:    "",
                      teachers:     "",
                      risk:         "Low",
                    };
                  }).filter(Boolean);
                  if (imported.length > 0) {
                    setSchools(p => {
                      const existing = new Set(p.map(s=>s.emis+s.name));
                      const newOnes = imported.filter(s=>!existing.has(s.emis+s.name));
                      return [...p, ...newOnes];
                    });
                    showToast(imported.length + " schools imported from " + file.name);
                  } else {
                    showToast("No schools found. Check your CSV column headers.");
                  }
                  e.target.value = "";
                };
                reader.readAsText(file, "windows-1252");
              }} style={{display:"none"}}/>
            </label>
            <ExportBtn label="CSV" filename="schools.csv" cols={["Name","EMIS","Province","District","Circuit","Sector","Phase","Status","City","Postal Code","Tel","Email","Latitude","Longitude","Exam Centre No","Exam Centre","Capacity","Mobiles","Enrolment","Teachers","Risk"]} rows={schools.map(s=>[s.name,s.emis,s.province,s.district,s.circuit,s.sector||"",s.phase||"",s.status||"",s.city||"",s.postalCode||"",(s.telCode1||"")+" "+(s.telephone1||""),s.email||"",s.latitude||"",s.longitude||"",s.examCentreNo||"",s.examCentre||"",s.capacity,s.mobiles,s.enrolment,s.teachers,s.risk])}/>
          </div>
        }/>
          <div style={{display:"grid",gap:"1rem"}}>
            {schools.length===0 && <Card><p style={{color:"#9CA3AF",textAlign:"center"}}>No schools yet. Use Add record or import from EMIS Database.</p></Card>}
            {schools.map(s=>{
              const over=Number(s.enrolment)>Number(s.capacity);
              const shortage=over?Number(s.enrolment)-Number(s.capacity):0;
              return (
                <Card key={s.id}>
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                    <div>
                      <p style={{fontWeight:600,fontSize:15,margin:"0 0 4px",color:"#111827"}}>{s.name}</p>
                      <p style={{fontSize:12,color:"#6B7280",margin:"0 0 4px"}}>EMIS: {s.emis} - {s.district}, {s.province}{s.circuit?" - Circuit: "+s.circuit:""}</p>
                      {(s.city||s.postalCode) && <p style={{fontSize:12,color:"#6B7280",margin:"0 0 4px"}}>{[s.city,s.postalCode].filter(Boolean).join(" ")}</p>}
                      {(s.email||s.telephone1) && <p style={{fontSize:12,color:"#6B7280",margin:"0 0 4px"}}>{s.telephone1?("Tel: "+(s.telCode1||"")+" "+s.telephone1):""}{s.email?" | "+s.email:""}</p>}
                      {(s.latitude||s.examCentre) && <p style={{fontSize:12,color:"#6B7280",margin:"0 0 6px"}}>{s.latitude&&s.longitude?"GPS: "+s.latitude+", "+s.longitude:""}{s.examCentre?" | Exam Centre: "+s.examCentre:""}</p>}
                      <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
                        {[["Enrolment",s.enrolment],["Teachers",s.teachers],["Capacity",s.capacity],["Mobiles",s.mobiles]].map(([l,v])=>(
                          <span key={l} style={{fontSize:12,color:"#6B7280"}}>{l}: <strong style={{color:"#111827"}}>{v||"--"}</strong></span>
                        ))}
                        {shortage>0&&<span style={{fontSize:12,color:"#DC2626",fontWeight:500}}>Shortage: {shortage}</span>}
                      </div>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8}}>
                      <Badge val={s.risk}/>
                      {s.enrolment&&s.capacity&&<span style={{fontSize:12,color:over?"#DC2626":"#059669"}}>{over?"Overcapacity":"Within capacity"}</span>}
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
          <SectionHeader title="Audits" onAdd={()=>setModal("audit")} extra={<ExportBtn label="CSV" filename="audits.csv" cols={["School","Year","Date","Risk","Overcapacity","Recommendations"]} rows={audits.map(a=>[scName(a.schoolId),a.year,a.date,a.risk,a.overcapacity,a.recommendations])}/>}/>
          <Card><DataTable cols={["School","Year","Date","Risk","Overcapacity","Recommendations"]} rows={audits}
            renderRow={r=>[scName(r.schoolId),r.year,r.date,<Badge val={r.risk}/>,<Badge val={r.overcapacity}/>,<span style={{color:"#6B7280",fontSize:12}}>{r.recommendations}</span>]}/>
          </Card>
        </div>
      );

      case "classrooms": return (
        <div>
          <SectionHeader title="Classrooms" onAdd={()=>setModal("classroom")} extra={<ExportBtn label="CSV" filename="classrooms.csv" cols={["School","Room","Type","Grade","Spec","Learners","Mobile"]} rows={classrooms.map(c=>[scName(c.schoolId),c.room,c.type,c.grade,c.spec,c.learners,c.isMobile])}/>}/>
          <Card><DataTable cols={["School","Room","Type","Grade","Spec","Learners","Mobile"]} rows={classrooms}
            renderRow={r=>[scName(r.schoolId),r.room,r.type,r.grade,r.spec,r.learners,<Badge val={r.isMobile}/>]}/>
          </Card>
        </div>
      );

      case "furniture": return (
        <div>
          <SectionHeader title="Furniture inventory" onAdd={()=>setModal("furniture")} extra={<ExportBtn label="CSV" filename="furniture.csv" cols={["School","Room","Category","Type","Available","Damaged","Repairable","Condition"]} rows={furniture.map(f=>{const cl=classrooms.find(c=>c.id==f.classroomId);return[scName(cl&&cl.schoolId),cl?cl.room:"",f.category,f.ftype,f.available,f.damaged,f.repairable,f.condition];})}/>}/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:"1.5rem"}}>
            <StatCard label="Total available" value={furniture.reduce((a,f)=>a+Number(f.available||0),0)} color="#2563EB"/>
            <StatCard label="Damaged"         value={furniture.reduce((a,f)=>a+Number(f.damaged||0),0)}   color="#DC2626"/>
            <StatCard label="Repairable"      value={furniture.reduce((a,f)=>a+Number(f.repairable||0),0)}color="#D97706"/>
          </div>
          <Card><DataTable cols={["School","Room","Category","Type","Available","Damaged","Repairable","Condition"]} rows={furniture}
            renderRow={r=>{const cl=classrooms.find(c=>c.id==r.classroomId);return[scName(cl&&cl.schoolId),cl?cl.room:"?",r.category,r.ftype,r.available,r.damaged,r.repairable,<Badge val={r.condition}/>];}}/>
          </Card>
        </div>
      );

      case "conditions": return (
        <div>
          <SectionHeader title="Condition assessments" onAdd={()=>setModal("condition")} extra={<ExportBtn label="CSV" filename="conditions.csv" cols={["School","Room","Flooring","Issues","Windows","Electricity","Locks"]} rows={conditions.map(c=>{const cl=classrooms.find(r=>r.id==c.classroomId);return[scName(cl&&cl.schoolId),cl?cl.room:"",c.flooring,c.flooringIssues,c.windows,c.electricity,c.locks];})}/>}/>
          <Card><DataTable cols={["School","Room","Flooring","Issues","Windows","Electricity","Locks"]} rows={conditions}
            renderRow={c=>{const cl=classrooms.find(r=>r.id==c.classroomId);return[scName(cl&&cl.schoolId),cl?cl.room:"?",<Badge val={c.flooring}/>,c.flooringIssues||"--",<Badge val={c.windows}/>,<Badge val={c.electricity}/>,<Badge val={c.locks}/>];}}/>
          </Card>
        </div>
      );

      case "repairs": return (
        <div>
          <SectionHeader title="Repairs and refurbishment" onAdd={()=>setModal("repair")} extra={<ExportBtn label="CSV" filename="repairs.csv" cols={["Furniture","Repair Type","Destination","Qty","Status","Allocated","Completed"]} rows={repairs.map(r=>{const fu=furniture.find(f=>f.id==r.furnitureId);return[fu?fu.ftype:"",r.repairType,r.destination,r.qty,r.status,r.allocated,r.completed||""];})}/>}/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:"1.5rem"}}>
            {["Completed","In Progress","Pending"].map(st=><StatCard key={st} label={st} value={repairs.filter(r=>r.status===st).length} color={st==="Completed"?"#059669":st==="In Progress"?"#2563EB":"#D97706"}/>)}
          </div>
          <Card><DataTable cols={["Furniture","Type","Destination","Qty","Status","Allocated","Completed"]} rows={repairs}
            renderRow={r=>{const fu=furniture.find(f=>f.id==r.furnitureId);return[fu?fu.ftype:"--",r.repairType,r.destination,r.qty,<Badge val={r.status}/>,r.allocated,r.completed||"--"];}}/>
          </Card>
        </div>
      );

      case "warehouse": return (
        <div>
          <SectionHeader title="Warehouse new furniture" onAdd={()=>setModal("warehouse")} extra={<ExportBtn label="CSV" filename="warehouse.csv" cols={["Date","Supplier","Type","Qty","Condition","Ref","Status","Notes"]} rows={warehouse.map(w=>[w.date,w.supplier,w.ftype,w.qty,w.condition,w.ref,w.status,w.notes])}/>}/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:"1.5rem"}}>
            <StatCard label="In stock"   value={warehouse.filter(w=>w.status==="In Stock").reduce((a,w)=>a+Number(w.qty||0),0)}   color="#059669"/>
            <StatCard label="Reserved"   value={warehouse.filter(w=>w.status==="Reserved").reduce((a,w)=>a+Number(w.qty||0),0)}   color="#D97706"/>
            <StatCard label="Dispatched" value={warehouse.filter(w=>w.status==="Dispatched").reduce((a,w)=>a+Number(w.qty||0),0)} color="#2563EB"/>
          </div>
          <Card><DataTable cols={["Date","Supplier","Furniture type","Qty","Condition","Received by","Ref","Status","Notes"]} rows={warehouse}
            renderRow={w=>[w.date,w.supplier,w.ftype,w.qty,<Badge val={w.condition}/>,w.receivedBy,w.ref,<Badge val={w.status}/>,<span style={{fontSize:12,color:"#6B7280"}}>{w.notes}</span>]}/>
          </Card>
        </div>
      );

      case "storage": return (
        <div>
          <SectionHeader title="Storage" onAdd={()=>setModal("storage")} extra={<ExportBtn label="CSV" filename="storage.csv" cols={["School","Room","Condition","Secure","Stored Type","Qty","Usable"]} rows={storage.map(r=>[scName(r.schoolId),r.room,r.condition,r.secure,r.storedType,r.qty,r.usable])}/>}/>
          <Card><DataTable cols={["School","Room","Condition","Secure","Stored items","Qty","Usable"]} rows={storage}
            renderRow={r=>[scName(r.schoolId),r.room,<Badge val={r.condition}/>,<Badge val={r.secure}/>,r.storedType,r.qty,<Badge val={r.usable}/>]}/>
          </Card>
        </div>
      );

      case "distribution": return (
        <div>
          <SectionHeader title="Distribution" onAdd={()=>setModal("distribution")} extra={<ExportBtn label="CSV" filename="distribution.csv" cols={["School","Purpose","Description","Qty","Destination","Official","Date","Ref"]} rows={distribution.map(r=>[scName(r.schoolId),r.purpose,r.desc,r.qty,r.destination,r.official,r.date,r.ref])}/>}/>
          <Card><DataTable cols={["School","Purpose","Description","Qty","Official","Date","Ref"]} rows={distribution}
            renderRow={r=>[scName(r.schoolId),r.purpose,r.desc,r.qty,r.official,r.date,r.ref]}/>
          </Card>
        </div>
      );

      case "capacity": return (
        <div>
          <SectionHeader title="Capacity analysis" extra={<ExportBtn label="CSV" filename="capacity.csv" cols={["School","Enrolment","Capacity","With Mobiles","Utilisation","Overcapacity"]} rows={schools.filter(s=>s.capacity).map(s=>{const mob=Number(s.capacity)+Number(s.mobiles)*Number(s.mobileCap);const pct=Math.round((Number(s.enrolment)/Number(s.capacity))*100);return[s.name,s.enrolment,s.capacity,mob,pct+"%",Number(s.enrolment)>Number(s.capacity)?"Yes":"No"];})}/>}/>
          {!schools.some(s=>s.capacity)&&<Card><p style={{textAlign:"center",color:"#9CA3AF",fontSize:13}}>No capacity data yet. Add schools with capacity figures.</p></Card>}
          <div style={{display:"grid",gap:"1rem"}}>
            {schools.filter(s=>s.capacity).map(s=>{
              const mobCap=Number(s.capacity)+Number(s.mobiles)*Number(s.mobileCap);
              const pct=Math.round((Number(s.enrolment)/Number(s.capacity))*100);
              const over=Number(s.enrolment)>Number(s.capacity);
              return (
                <Card key={s.id}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                    <p style={{fontWeight:500,fontSize:15,margin:0}}>{s.name}</p><Badge val={over?"Yes":"No"}/>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:14}}>
                    {[["Enrolment",s.enrolment,"#111827"],["Cap no mobiles",s.capacity,"#111827"],["Cap with mobiles",mobCap,"#111827"],["Utilisation",pct+"%",over?"#DC2626":"#059669"]].map(([l,v,c])=>(
                      <div key={l} style={{background:"#F9FAFB",borderRadius:8,padding:"10px 14px"}}><p style={{fontSize:11,color:"#6B7280",margin:"0 0 4px"}}>{l}</p><p style={{fontSize:20,fontWeight:600,margin:0,color:c}}>{v}</p></div>
                    ))}
                  </div>
                  <div style={{background:"#F3F4F6",borderRadius:999,height:8,overflow:"hidden"}}>
                    <div style={{width:Math.min(pct,100)+"%",height:"100%",background:over?"#DC2626":"#2563EB",borderRadius:999}}/>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      );

      case "ratio": return (
        <div>
          <SectionHeader title="Teacher Learner ratio analysis" extra={<ExportBtn label="CSV" filename="ratio.csv" cols={["School","Enrolment","Teachers","Ratio","Status"]} rows={schools.map(s=>{const r=s.teachers&&s.enrolment?Math.round(Number(s.enrolment)/Number(s.teachers)):null;return[s.name,s.enrolment,s.teachers,r?"1:"+r:"",!r?"No data":r<=30?"Good":r<=40?"Acceptable":"Overcrowded"];})}/>}/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:"1.5rem"}}>
            <StatCard label="Total learners" value={schools.reduce((a,s)=>a+Number(s.enrolment||0),0)} color="#2563EB"/>
            <StatCard label="Total teachers" value={schools.reduce((a,s)=>a+Number(s.teachers||0),0)}  color="#7C3AED"/>
            <StatCard label="Avg ratio" value={(() => { const t=schools.reduce((a,s)=>a+Number(s.teachers||0),0); const l=schools.reduce((a,s)=>a+Number(s.enrolment||0),0); return t>0?"1:"+Math.round(l/t):"--"; })()} color="#059669"/>
          </div>
          {!schools.some(s=>s.teachers&&s.enrolment)&&<Card><p style={{textAlign:"center",color:"#9CA3AF",fontSize:13}}>No ratio data yet.</p></Card>}
          <div style={{display:"grid",gap:"1rem"}}>
            {schools.filter(s=>s.teachers&&s.enrolment).map(s=>{
              const ratio=Math.round(Number(s.enrolment)/Number(s.teachers));
              const pct=Math.min(Math.round((ratio/50)*100),150);
              const color=ratio<=30?"#059669":ratio<=40?"#D97706":"#DC2626";
              const status=ratio<=30?"Good":ratio<=40?"Acceptable":"Overcrowded";
              return (
                <Card key={s.id}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                    <div><p style={{fontWeight:500,fontSize:15,margin:"0 0 2px"}}>{s.name}</p><p style={{fontSize:12,color:"#6B7280",margin:0}}>{s.district}</p></div>
                    <span style={{background:color+"22",color,padding:"3px 12px",borderRadius:999,fontSize:12,fontWeight:600}}>{status}</span>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:14}}>
                    {[["Learners",s.enrolment,"#111827"],["Teachers",s.teachers,"#111827"],["Ratio","1:"+ratio,color],["Ideal","1:35","#6B7280"]].map(([l,v,c])=>(
                      <div key={l} style={{background:"#F9FAFB",borderRadius:8,padding:"10px 14px"}}><p style={{fontSize:11,color:"#6B7280",margin:"0 0 4px"}}>{l}</p><p style={{fontSize:20,fontWeight:600,margin:0,color:c}}>{v}</p></div>
                    ))}
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <span style={{fontSize:11,color:"#9CA3AF",width:30}}>0</span>
                    <div style={{flex:1,background:"#F3F4F6",borderRadius:999,height:8,overflow:"hidden",position:"relative"}}>
                      <div style={{width:pct+"%",height:"100%",background:color,borderRadius:999}}/>
                      <div style={{position:"absolute",left:(35/50)*100+"%",top:0,width:2,height:"100%",background:"#9CA3AF"}}/>
                    </div>
                    <span style={{fontSize:11,color:"#9CA3AF",width:30,textAlign:"right"}}>50+</span>
                  </div>
                  <p style={{fontSize:11,color:"#9CA3AF",margin:"4px 0 0",textAlign:"center"}}>Grey line = 1:35 benchmark</p>
                </Card>
              );
            })}
          </div>
        </div>
      );

      case "kpa1": return (
        <div>
          <SectionHeader title="KPA 1 Data Uploads NEIMS EFMS GOVERP" onAdd={()=>setModal("upload")} extra={<ExportBtn label="CSV" filename="kpa1_uploads.csv" cols={["System","Date","Status","Records","Verified By","Notes"]} rows={uploads.map(u=>[u.system,u.date,u.status,u.records,u.verifiedBy,u.notes])}/>}/>
          <KpaNote weight="30%" target="Daily" description="Verify and monitor captured data to ensure alignment and accuracy across NEIMS, EFMS and GOVERP."/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:"1.5rem"}}>
            <StatCard label="Total uploads"  value={uploads.length} color="#2563EB"/>
            <StatCard label="Completed"      value={uploads.filter(u=>u.status==="Completed").length} color="#059669"/>
            <StatCard label="In progress"    value={uploads.filter(u=>u.status==="In Progress").length} color="#D97706"/>
            <StatCard label="Total records"  value={uploads.reduce((a,u)=>a+Number(u.records||0),0).toLocaleString()} color="#7C3AED"/>
          </div>
          <Card><DataTable cols={["System","Date","Records","Status","Verified By","Notes"]} rows={uploads}
            renderRow={u=>[u.system,u.date,Number(u.records||0).toLocaleString(),<Badge val={u.status}/>,u.verifiedBy,<span style={{fontSize:12,color:"#6B7280"}}>{u.notes}</span>]}/>
          </Card>
        </div>
      );

      case "kpa2": return (
        <div>
          <SectionHeader title="KPA 2 Learner Data Verification" onAdd={()=>setModal("learner")} extra={<ExportBtn label="CSV" filename="kpa2_learner.csv" cols={["School","District","Source","Date","Enrolment","Verified","Variance","Status"]} rows={learnerData.map(l=>[l.school,l.district,l.source,l.date,l.enrolment,l.verified,l.variance,l.status])}/>}/>
          <KpaNote weight="20%" target="Daily" description="Access GOVERP, HRMS, Google Forms and 10th Day Snap Survey to verify learner numbers for planning."/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:"1.5rem"}}>
            <StatCard label="Records"        value={learnerData.length} color="#7C3AED"/>
            <StatCard label="Validated"      value={learnerData.filter(l=>l.status==="Validated").length} color="#059669"/>
            <StatCard label="Queried"        value={learnerData.filter(l=>l.status==="Queried").length} color="#DC2626"/>
            <StatCard label="Total variance" value={learnerData.reduce((a,l)=>a+Number(l.variance||0),0)} sub="Discrepancy" color="#D97706"/>
          </div>
          <Card><DataTable cols={["School","District","Source","Date","Reported","Verified","Variance","Status"]} rows={learnerData}
            renderRow={l=>[l.school,l.district,l.source,l.date,l.enrolment,l.verified,
              <span style={{color:Number(l.variance)>0?"#DC2626":"#059669",fontWeight:600}}>{l.variance}</span>,
              <Badge val={l.status}/>]}/>
          </Card>
        </div>
      );

      case "kpa3": return (
        <div>
          <SectionHeader title="KPA 3 Mobile Classroom Audit" onAdd={()=>setModal("mobile")}           extra={<ExportBtn label="CSV" filename="kpa3_mobile.csv" cols={["School","Mobiles","Condition","Electricity","Ablutions","Issues","Recommendation","Audit Date","Received Date","Audited By"]} rows={mobileAudit.map(m=>[scName(m.schoolId),m.mobileCount,m.condition,m.electricityAvail,m.ablutions,m.structuralIssues,m.recommendation,m.auditDate,m.receivedDate||"",m.auditedBy])}/>}/>
          <KpaNote weight="20%" target="Weekly" description="Conduct furniture and mobile audit. Report on conditional assessment of mobile classrooms and track refurbishment."/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:"1.5rem"}}>
            <StatCard label="Schools audited" value={mobileAudit.length} color="#059669"/>
            <StatCard label="Good condition"  value={mobileAudit.filter(m=>m.condition==="Good").length} color="#059669"/>
            <StatCard label="Fair condition"  value={mobileAudit.filter(m=>m.condition==="Fair").length} color="#D97706"/>
            <StatCard label="Poor condition"  value={mobileAudit.filter(m=>m.condition==="Poor").length} color="#DC2626"/>
          </div>
          <Card><DataTable cols={["School","Mobiles","Condition","Electricity","Ablutions","Issues","Recommendation","Audit Date","Received Date"]} rows={mobileAudit}
            renderRow={m=>[scName(m.schoolId),m.mobileCount,<Badge val={m.condition}/>,<Badge val={m.electricityAvail}/>,<Badge val={m.ablutions}/>,m.structuralIssues||"--",m.recommendation,m.auditDate,m.receivedDate||"--"]}/>
          </Card>
        </div>
      );

      case "kpa4": return (
        <div>
          <SectionHeader title="KPA 4 School Infrastructure Requests" onAdd={()=>setModal("request")} extra={<ExportBtn label="CSV" filename="kpa4_requests.csv" cols={["School","District","Type","Priority","Date Received","Due Date","Status","Assigned To","Notes"]} rows={schoolRequests.map(r=>[scName(r.schoolId),r.district,r.requestType,r.priority,r.dateReceived,r.dueDate,r.status,r.assignedTo,r.notes])}/>}/>
          <KpaNote weight="15%" target="Quarterly" description="Maintain accurate tracking of all school requests per district. Monitor and report on progress."/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:"1.5rem"}}>
            <StatCard label="Total requests" value={schoolRequests.length} color="#D97706"/>
            <StatCard label="Completed"      value={schoolRequests.filter(r=>r.status==="Completed").length} color="#059669"/>
            <StatCard label="In progress"    value={schoolRequests.filter(r=>r.status==="In Progress").length} color="#2563EB"/>
            <StatCard label="Pending"        value={schoolRequests.filter(r=>r.status==="Pending").length} color="#DC2626"/>
          </div>
          <Card><DataTable cols={["School","District","Type","Priority","Received","Due","Status","Notes"]} rows={schoolRequests}
            renderRow={r=>[scName(r.schoolId),r.district,r.requestType,<Badge val={r.priority}/>,r.dateReceived,r.dueDate,<Badge val={r.status}/>,<span style={{fontSize:12,color:"#6B7280"}}>{r.notes}</span>]}/>
          </Card>
        </div>
      );

      case "kpa5": return (
        <div>
          <SectionHeader title="KPA 5 Admin Duties and Payment Verification" onAdd={()=>setModal("admin")} extra={<ExportBtn label="CSV" filename="kpa5_admin.csv" cols={["Type","Reference","Date","Amount","Supplier","Status","Notes"]} rows={adminTasks.map(t=>[t.type,t.ref,t.date,t.amount,t.supplier,t.status,t.notes])}/>}/>
          <KpaNote weight="15%" target="Daily" description="Assist stakeholders, verify payments and documents, assist with filing, copying and scanning of project documentation."/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:"1.5rem"}}>
            <StatCard label="Total tasks"           value={adminTasks.length} color="#DC2626"/>
            <StatCard label="Payment verifications" value={adminTasks.filter(t=>t.type==="Payment Verification").length} color="#2563EB"/>
            <StatCard label="Completed"             value={adminTasks.filter(t=>["Verified","Completed","Resolved"].includes(t.status)).length} color="#059669"/>
            <StatCard label="Pending"               value={adminTasks.filter(t=>t.status==="Pending").length} color="#D97706"/>
          </div>
          <Card><DataTable cols={["Type","Reference","Date","Amount","Supplier","Status","Notes"]} rows={adminTasks}
            renderRow={t=>[t.type,t.ref,t.date,t.amount||"--",t.supplier||"--",<Badge val={t.status}/>,<span style={{fontSize:12,color:"#6B7280"}}>{t.notes}</span>]}/>
          </Card>
        </div>
      );

      default: return null;
    }
  };

  return (
    <div style={{ display:"flex", minHeight:"100vh", fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif", background:"#F3F6FB" }}>
      {toast && (
        <div style={{ position:"fixed", bottom:24, left:"50%", transform:"translateX(-50%)", background:"#111827", color:"#fff", padding:"10px 20px", borderRadius:10, fontSize:13, zIndex:200, whiteSpace:"nowrap", boxShadow:"0 4px 12px rgba(0,0,0,0.2)" }}>
          {toast}
        </div>
      )}

      {modal==="school"       && <SchoolForm       onClose={()=>setModal(null)} onSave={add(setSchools)}/>}
      {modal==="audit"        && <AuditForm        schools={schools}            onClose={()=>setModal(null)} onSave={add(setAudits)}/>}
      {modal==="classroom"    && <ClassroomForm    schools={schools}            onClose={()=>setModal(null)} onSave={add(setClassrooms)}/>}
      {modal==="furniture"    && <FurnitureForm    classrooms={classrooms} schools={schools} onClose={()=>setModal(null)} onSave={add(setFurniture)}/>}
      {modal==="condition"    && <ConditionForm    classrooms={classrooms} schools={schools} onClose={()=>setModal(null)} onSave={add(setConditions)}/>}
      {modal==="repair"       && <RepairForm       furniture={furniture}        onClose={()=>setModal(null)} onSave={add(setRepairs)}/>}
      {modal==="warehouse"    && <WarehouseForm                                 onClose={()=>setModal(null)} onSave={add(setWarehouse)}/>}
      {modal==="storage"      && <StorageForm      schools={schools}            onClose={()=>setModal(null)} onSave={add(setStorage)}/>}
      {modal==="distribution" && <DistributionForm schools={schools}            onClose={()=>setModal(null)} onSave={add(setDistribution)}/>}
      {modal==="upload"       && <UploadForm                                    onClose={()=>setModal(null)} onSave={add(setUploads)}/>}
      {modal==="learner"      && <LearnerDataForm                               onClose={()=>setModal(null)} onSave={add(setLearnerData)}/>}
      {modal==="mobile"       && <MobileAuditForm  schools={schools}            onClose={()=>setModal(null)} onSave={add(setMobileAudit)}/>}
      {modal==="request"      && <SchoolRequestForm schools={schools}           onClose={()=>setModal(null)} onSave={add(setSchoolRequests)}/>}
      {modal==="admin"        && <AdminTaskForm                                 onClose={()=>setModal(null)} onSave={add(setAdminTasks)}/>}

      <aside style={{ width:220, background:"linear-gradient(180deg,#1e3a5f,#1e40af)", padding:"1.5rem 0", flexShrink:0, overflowY:"auto" }}>
        <div style={{ padding:"0 1.25rem 1.5rem", borderBottom:"0.5px solid rgba(255,255,255,0.1)", marginBottom:"1rem" }}>
          <p style={{ fontWeight:700, fontSize:14, color:"#fff", margin:"0 0 2px" }}>SchoolAudit</p>
          <p style={{ fontSize:11, color:"rgba(255,255,255,0.5)", margin:0 }}>Northern Cape Dept.</p>
        </div>
        {NAV.map(n => (
          <button key={n.id} onClick={()=>setActive(n.id)} style={{
            display:"flex", alignItems:"center", gap:10, width:"100%", padding:"7px 1.25rem",
            background: active===n.id ? "rgba(255,255,255,0.15)" : "none",
            color:      active===n.id ? "#fff" : "rgba(255,255,255,0.65)",
            border:"none", borderLeft: active===n.id ? "2px solid #60A5FA" : "2px solid transparent",
            cursor:"pointer", fontSize:13, fontWeight: active===n.id ? 600 : 400, textAlign:"left",
          }}>
            <span style={{fontSize:14}}>{n.icon}</span>{n.label}
          </button>
        ))}
      </aside>

      <main style={{ flex:1, padding:"2rem", maxWidth:980, overflowY:"auto" }}>
        {renderPage()}
      </main>
    </div>
  );
}

(function mount() {
  var container = document.getElementById("root");
  if (!container) { setTimeout(mount, 100); return; }
  try {
    ReactDOM.createRoot(container).render(React.createElement(App));
  } catch(e) {
    container.innerHTML = '<div style="padding:2rem;font-family:sans-serif;color:#DC2626"><h2>App failed to start</h2><p style="margin-top:8px">Error: ' + e.message + '</p></div>';
  }
})();
