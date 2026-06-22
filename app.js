const { useState, useMemo, useEffect, useRef } = React;

// ─────────────────────────────────────────────
// NAV
// ─────────────────────────────────────────────
const NAV = [
  { id:"dashboard",    label:"Dashboard",          icon:"📊" },
  { id:"emis",         label:"EMIS Database",      icon:"🗃️" },
  { id:"schools",      label:"Audit Schools",      icon:"🏫" },
  { id:"capture",      label:"School Capture",     icon:"📝" },
  { id:"audits",       label:"Audits",             icon:"📋" },
  { id:"classrooms",   label:"Classrooms & Furniture", icon:"🚪" },
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
  { id:"kpa5",         label:"  Admin & Payments", icon:"🗂️" },
];


// ─────────────────────────────────────────────
// DBE FURNITURE (full list from v77)
// ─────────────────────────────────────────────
const DBE_FURNITURE = [
  "Single Learner Desk – Size 1 (Grade R, seat 260mm) – Supawood Top","Single Learner Desk – Size 1 (Grade R, seat 260mm) – Saligna Top","Single Learner Desk – Size 1 (Grade R, seat 260mm) – Melamine Top",
  "Single Learner Desk – Size 2 (Grade 1–3, seat 310mm) – Supawood Top","Single Learner Desk – Size 2 (Grade 1–3, seat 310mm) – Saligna Top","Single Learner Desk – Size 2 (Grade 1–3, seat 310mm) – Melamine Top",
  "Single Learner Desk – Size 3 (Grade 4–6, seat 350mm) – Supawood Top","Single Learner Desk – Size 3 (Grade 4–6, seat 350mm) – Saligna Top","Single Learner Desk – Size 3 (Grade 4–6, seat 350mm) – Melamine Top",
  "Single Learner Desk – Size 4 (Grade 7–9 Senior Phase, seat 380mm) – Supawood Top","Single Learner Desk – Size 4 (Grade 7–9 Senior Phase, seat 380mm) – Saligna Top","Single Learner Desk – Size 4 (Grade 7–9 Senior Phase, seat 380mm) – Melamine Top",
  "Single Learner Desk – Size 5 (Grade 10–12 FET Phase, seat 430mm) – Supawood Top","Single Learner Desk – Size 5 (Grade 10–12 FET Phase, seat 430mm) – Saligna Top","Single Learner Desk – Size 5 (Grade 10–12 FET Phase, seat 430mm) – Melamine Top",
  "Double Learner Desk – Size 2 (Grade 1–3, seat 310mm) – Supawood Top","Double Learner Desk – Size 2 (Grade 1–3, seat 310mm) – Saligna Top","Double Learner Desk – Size 2 (Grade 1–3, seat 310mm) – Melamine Top",
  "Double Learner Desk – Size 3 (Grade 4–6, seat 350mm) – Supawood Top","Double Learner Desk – Size 3 (Grade 4–6, seat 350mm) – Saligna Top","Double Learner Desk – Size 3 (Grade 4–6, seat 350mm) – Melamine Top",
  "Single Combination Desk & Chair – Size 3 (Grade 4–6) – Supawood Top","Single Combination Desk & Chair – Size 3 (Grade 4–6) – Saligna Top","Single Combination Desk & Chair – Size 3 (Grade 4–6) – Melamine Top",
  "Single Combination Desk & Chair – Size 4 (Grade 7–9) – Supawood Top","Single Combination Desk & Chair – Size 4 (Grade 7–9) – Saligna Top","Single Combination Desk & Chair – Size 4 (Grade 7–9) – Melamine Top",
  "Single Combination Desk & Chair – Size 5 (Grade 10–12 FET) – Supawood Top","Single Combination Desk & Chair – Size 5 (Grade 10–12 FET) – Saligna Top","Single Combination Desk & Chair – Size 5 (Grade 10–12 FET) – Melamine Top",
  "Penny 1 Wooden Chair – Size 1 (Grade R, seat height 260mm)","Penny 1 Wooden Chair – Size 2 (Grade 1–3, seat height 310mm)","Penny 1 Wooden Chair – Size 3 (Grade 4–6, seat height 350mm)",
  "Penny 1 Plastic Chair – Size 1 (Grade R, seat height 260mm)","Penny 1 Plastic Chair – Size 2 (Grade 1–3, seat height 310mm)","Penny 1 Plastic Chair – Size 3 (Grade 4–6, seat height 350mm)",
  "Penny 4 Wooden Chair – Size 4 (Grade 7–9, seat height 380mm)","Penny 4 Wooden Chair – Size 5 (Grade 10–12 FET, seat height 430mm)",
  "Penny 4 Plastic Chair – Size 4 (Grade 7–9, seat height 380mm)","Penny 4 Plastic Chair – Size 5 (Grade 10–12 FET, seat height 430mm)",
  "Utility Chair – Size 3 (Grade 4–6, steel frame)","Utility Chair – Size 4 (Grade 7–9, steel frame)","Utility Chair – Size 5 (Grade 10–12, steel frame)",
  "ECD Activity Table – Grade R (Height 460mm)","ECD Stackable Chair – Grade R (Seat height 260mm)",
  "Teacher's Desk (Single Pedestal)","Teacher's Desk (Double Pedestal)","Teacher's Chair (Typist)","Teacher's Chair (Visitor)",
  "Teacher's Cupboard – Steel (Double Door)","Teacher's Cupboard – Steel (Single Door)","Teacher's Bookcase (Open Shelf)","Teacher's Bookcase (Glazed Door)","Teacher's Table (Rectangular)",
  "Teacher's Locker (Single Door)","Teacher's Locker (Double Door)","Stationery Cupboard","Map/Chart Cabinet",
  "Principal's Desk (Double Pedestal)","Principal's Chair (High Back)","Principal's Visitor Chair","Principal's Credenza","Principal's Bookcase",
  "Deputy Principal's Desk","Deputy Principal's Chair","HOD Desk","HOD Chair",
  "Admin Clerk Desk","Admin Clerk Chair (Typist)","Reception Desk","Reception Chair",
  "Boardroom Table","Boardroom Chair","Filing Cabinet – Steel (2-Drawer)","Filing Cabinet – Steel (4-Drawer)","Lateral Filing Cabinet",
  "Safe (Small – Cash Box)","Safe (Medium – Fireproof)","Steel Stationery Cupboard (Admin)","Compactus / Mobile Shelving",
  "Waiting Area Bench (2-Seater)","Waiting Area Bench (3-Seater)","Staff Room Table","Staff Room Chair","Staff Room Couch / Sofa",
  "Staff Locker (Single Door)","Staff Locker (Double Door)","Science Lab Table","Lab Stool","Computer Lab Table","Library Table","Library Chair",
  "ECD Activity Table (Grade R)","ECD Chair (Grade R)","Multipurpose Table","Steel Shelf Unit","Storeroom Shelf","Display Cabinet","Notice Board","Whiteboard (Mobile)",
];


// ─────────────────────────────────────────────
// EMIS SAMPLE
// ─────────────────────────────────────────────
const EMIS_SAMPLE = [
  { emis:"300010701", name:"BOITUMELO SPECIALSCHOOL",        district:"FRANCES BAARD",       phase:"Primary",   sector:"Public",      city:"Kimberley", province:"NC", lat:-28.716032, lng:24.702023, email:"boitumeloss@ncdoe.school.za",    tel:"0783955182", circuit:"F8",  landOwnership:"Govt",    examCentre:"",        emailAlt:"", telCode:"078", type:"Special Needs Education", status:"Operational" },
  { emis:"300022301", name:"HOPETOWN GEKOMBINEERDE SKOOL",   district:"PIXLEY-KA-SEME",     phase:"Combined",  sector:"Public",      city:"HOPETOWN",  province:"NC", lat:-29.623935, lng:24.087122, email:"admin@hshopetown.co.za",          tel:"2030053",    circuit:"P2",  landOwnership:"Govt",    examCentre:"",        emailAlt:"", telCode:"053", type:"Ordinary School",         status:"Operational" },
  { emis:"300011305", name:"HOËRSKOOL DOUGLAS GEKOMBINEERD", district:"PIXLEY-KA-SEME",     phase:"Combined",  sector:"Public",      city:"DOUGLAS",   province:"NC", lat:-29.055940, lng:23.769850, email:"hsd@douglas.co.za",               tel:"2981041",    circuit:"P5",  landOwnership:"Govt",    examCentre:"2011305", emailAlt:"", telCode:"053", type:"Ordinary School",         status:"Operational" },
  { emis:"300015401", name:"HOËRSKOOL DIAMANTVELD",          district:"FRANCES BAARD",       phase:"Secondary", sector:"Public",      city:"Kimberley", province:"NC", lat:-28.750580, lng:24.772060, email:"admin@diamantveld.co.za",          tel:"8331528",    circuit:"F3",  landOwnership:"Govt",    examCentre:"2015401", emailAlt:"", telCode:"053", type:"Ordinary School",         status:"Operational" },
  { emis:"300015403", name:"KIMBERLEY BOYS' HIGH SCHOOL",    district:"FRANCES BAARD",       phase:"Secondary", sector:"Public",      city:"Kimberley", province:"NC", lat:-28.749380, lng:24.768600, email:"headmaster@kbhs.co.za",           tel:"8332684",    circuit:"F8",  landOwnership:"Govt",    examCentre:"2015403", emailAlt:"", telCode:"053", type:"Ordinary School",         status:"Operational" },
  { emis:"300011403", name:"KIMBERLEY GIRLS HIGH SCHOOL",    district:"FRANCES BAARD",       phase:"Secondary", sector:"Public",      city:"Kimberley", province:"NC", lat:-28.747840, lng:24.778210, email:"admin@kimberleygirlshigh.org.za", tel:"8321275",    circuit:"F7",  landOwnership:"Govt",    examCentre:"2011403", emailAlt:"", telCode:"053", type:"Ordinary School",         status:"Operational" },
  { emis:"300041403", name:"HOËRSKOOL UPINGTON",             district:"ZF MGCAWU",           phase:"Secondary", sector:"Public",      city:"UPINGTON",  province:"NC", lat:-28.456870, lng:21.243610, email:"skoolhoof@uppies1.co.za",          tel:"3321491",    circuit:"S1",  landOwnership:"Govt",    examCentre:"2041403", emailAlt:"", telCode:"054", type:"Ordinary School",         status:"Operational" },
  { emis:"300044402", name:"HOËRSKOOL KATHU",                district:"JOHN TAOLO GAETSEWE", phase:"Secondary", sector:"Public",      city:"KATHU",     province:"NC", lat:-27.693660, lng:23.047700, email:"hskathunc@gmail.com",             tel:"7231561",    circuit:"K1",  landOwnership:"Govt",    examCentre:"2044402", emailAlt:"", telCode:"053", type:"Ordinary School",         status:"Operational" },
  { emis:"300053201", name:"CURRO KATHU",                    district:"JOHN TAOLO GAETSEWE", phase:"Combined",  sector:"Independent", city:"KATHU",     province:"NC", lat:-27.706974, lng:23.044356, email:"antoinette.v1@curro.co.za",       tel:"2854755",    circuit:"K3",  landOwnership:"Private", examCentre:"",        emailAlt:"", telCode:"087", type:"Ordinary School",         status:"Operational" },
  { emis:"300033401", name:"HANTAM SEKONDERE SKOOL",         district:"NAMAKWA",             phase:"Secondary", sector:"Public",      city:"Calvinia",  province:"NC", lat:-31.464160, lng:19.759684, email:"hantamhigh@gmail.com",             tel:"3411295",    circuit:"N4",  landOwnership:"Govt",    examCentre:"2033401", emailAlt:"", telCode:"027", type:"Ordinary School",         status:"Operational" },
];

// ─────────────────────────────────────────────
// SEED DATA
// ─────────────────────────────────────────────
const S = (id,name,emis,province,district,capacity,mobiles,mobileCap,enrolment,teachers,risk) =>
  ({id,name,emis,province,district,circuit:"",capacity,mobiles,mobileCap,enrolment,teachers,risk});
const initSchools      = [S(1,"Soweto Primary School","700112345","Gauteng","Johannesburg South",980,4,35,1200,32,"High"),S(2,"Pretoria North High","700223456","Gauteng","Tshwane North",900,2,35,850,28,"Low"),S(3,"Alexandra Combined","700334567","Gauteng","Johannesburg East",950,3,35,1050,30,"Medium")];
const initAudits       = [{id:1,schoolId:1,year:2024,date:"2024-03-15",risk:"High",capWith:1120,capWithout:980,overcapacity:"Yes",recommendations:"Urgent furniture replacement needed",comments:"",hallAvailable:"No",hallCondition:"Good",hallCapacity:"",hallUsage:"",hallFloor:"Good",hallRoof:"Good",hallElectricity:"Yes",hallToilets:"No",hallIssues:"",hallNotes:""},{id:2,schoolId:2,year:2024,date:"2024-04-02",risk:"Low",capWith:970,capWithout:900,overcapacity:"No",recommendations:"Minor repairs to lab furniture",comments:"",hallAvailable:"Yes",hallCondition:"Good",hallCapacity:"300",hallUsage:"Assemblies",hallFloor:"Good",hallRoof:"Good",hallElectricity:"Yes",hallToilets:"Yes",hallIssues:"",hallNotes:""},{id:3,schoolId:3,year:2024,date:"2024-05-10",risk:"Medium",capWith:1055,capWithout:950,overcapacity:"Yes",recommendations:"Mobile classroom upgrade required",comments:"",hallAvailable:"No",hallCondition:"Good",hallCapacity:"",hallUsage:"",hallFloor:"Good",hallRoof:"Good",hallElectricity:"Yes",hallToilets:"No",hallIssues:"",hallNotes:""}];
const initClassrooms   = [{id:1,schoolId:1,room:"1A",type:"Classroom",grade:"4",spec:"4E1",learners:42,isMobile:"No"},{id:2,schoolId:2,room:"Lab 1",type:"Lab",grade:"11",spec:"Science",learners:30,isMobile:"No"}];
const initFurniture    = [{id:1,classroomId:1,schoolId:1,category:"Learner",ftype:"Single Learner Desk – Size 3 (Grade 4–6, seat 350mm) – Melamine Top",spec:"Grade 4–6",chairType:"Penny 1 Plastic Chair – Size 3 (Grade 4–6, seat height 350mm)",available:30,damaged:8,repairable:5,otherType:"",otherQty:0,condition:"Fair",photoName:"",photoData:""},{id:2,classroomId:2,schoolId:2,category:"Specialised",ftype:"Science Lab Table",spec:"Science Lab",chairType:"Lab Stool",available:20,damaged:3,repairable:3,otherType:"",otherQty:0,condition:"Good",photoName:"",photoData:""}];
const initRepairs      = [{id:1,furnitureId:1,ftype:"Single Learner Desk – Size 3 (Grade 4–6, seat 350mm) – Melamine Top",repairType:"Minor",destination:"Warehouse",qty:5,status:"Completed",allocated:"2024-03-20",completed:"2024-04-01"},{id:2,furnitureId:2,ftype:"Science Lab Table",repairType:"Major",destination:"Labour Dept",qty:3,status:"In Progress",allocated:"2024-04-10",completed:""}];
const initStorage      = [{id:1,schoolId:1,room:"Store 1",condition:"Fair",secure:"Yes",storedType:"Old Desks",qty:20,usable:"No",desc:"Old damaged desks"}];
const initDistribution = [{id:1,schoolId:1,destination:"Warehouse",desc:"Double Desks",qty:10,source:"School",official:"T. Mokoena",position:"Principal",receiver:"S. Dlamini",role:"Store Manager",date:"2024-04-05",purpose:"Repair",ref:"REF-001",sigOfficial:"",sigReceiver:"",proofName:"",proofData:""}];
const initConditions   = [{id:1,classroomId:1,flooring:"Fair",flooringIssues:"Cracks",windows:"Poor",windowIssues:"Broken",locks:"Good",electricity:"Yes",mobile:"N/A",comments:"",photos:[]}];
const initWarehouse    = [{id:1,date:"2024-03-01",supplier:"Edu Furniture Co.",ftype:"Double Learner Desk – Size 3 (Grade 4–6, seat 350mm) – Melamine Top",spec:"Grade 4–6",qty:50,condition:"Good",receivedBy:"S. Dlamini",ref:"WH-001",status:"In Stock",notes:"New batch"},{id:2,date:"2024-04-15",supplier:"SA School Supplies",ftype:"Penny 1 Plastic Chair – Size 2 (Grade 1–3, seat height 310mm)",spec:"Grade 1–3",qty:80,condition:"Good",receivedBy:"S. Dlamini",ref:"WH-002",status:"Dispatched",notes:"Dispatched to Alexandra"}];
const initUploads      = [{id:1,system:"NEIMS",date:"2026-04-01",status:"Completed",records:342,verifiedBy:"PY Tshabangu",notes:"Aligned with EFMS data"},{id:2,system:"EFMS",date:"2026-04-03",status:"Completed",records:298,verifiedBy:"PY Tshabangu",notes:"Cross-checked against GOVERP"},{id:3,system:"GOVERP",date:"2026-04-05",status:"In Progress",records:180,verifiedBy:"PY Tshabangu",notes:"Pending district confirmation"}];
const initLearnerData  = [{id:1,school:"Soweto Primary",district:"Johannesburg South",source:"10th Day Snap Survey",date:"2026-04-10",enrolment:1200,verified:1180,variance:20,status:"Validated"},{id:2,school:"Pretoria North",district:"Tshwane North",source:"GOVERP",date:"2026-04-12",enrolment:850,verified:850,variance:0,status:"Validated"},{id:3,school:"Alexandra Comb.",district:"Johannesburg East",source:"Google Forms",date:"2026-04-15",enrolment:1050,verified:1010,variance:40,status:"Queried"}];
const initMobileAudit  = [{id:1,schoolId:1,mobileCount:4,condition:"Fair",structuralIssues:"Roof leaks",electricityAvail:"Yes",ablutions:"No",recommendation:"Repair roof",auditDate:"2026-04-20",auditedBy:"PY Tshabangu"},{id:2,schoolId:3,mobileCount:3,condition:"Poor",structuralIssues:"Floor damage",electricityAvail:"No",ablutions:"No",recommendation:"Replace unit",auditDate:"2026-04-22",auditedBy:"PY Tshabangu"}];
const initSchoolRequests=[{id:1,schoolId:1,district:"Johannesburg South",requestType:"Furniture",priority:"High",dateReceived:"2026-04-05",status:"In Progress",assignedTo:"PY Tshabangu",dueDate:"2026-06-30",notes:"220 desks needed urgently"},{id:2,schoolId:2,district:"Tshwane North",requestType:"Mobile Unit",priority:"Medium",dateReceived:"2026-04-10",status:"Pending",assignedTo:"PY Tshabangu",dueDate:"2026-07-31",notes:"Request for 2 additional mobiles"},{id:3,schoolId:3,district:"Johannesburg East",requestType:"Repairs",priority:"Low",dateReceived:"2026-04-15",status:"Completed",assignedTo:"PY Tshabangu",dueDate:"2026-05-31",notes:"Classroom door repairs done"}];
const initAdminTasks   = [{id:1,type:"Payment Verification",ref:"PAY-2026-001",date:"2026-04-08",amount:"R 45,000",supplier:"Edu Furniture Co.",status:"Verified",notes:"All docs checked and signed"},{id:2,type:"Stakeholder Enquiry",ref:"ENQ-2026-012",date:"2026-04-10",amount:"—",supplier:"—",status:"Resolved",notes:"Principal query re: delivery date"},{id:3,type:"Filing / Scanning",ref:"FILE-2026-003",date:"2026-04-12",amount:"—",supplier:"—",status:"Completed",notes:"Q1 project docs scanned and filed"},{id:4,type:"Payment Verification",ref:"PAY-2026-002",date:"2026-04-18",amount:"R 12,500",supplier:"SA School Supplies",status:"Pending",notes:"Awaiting supporting documents"}];


// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
const uid = () => Date.now() + Math.random();
const loadFromLS = (key, fallback) => { try { const r=localStorage.getItem(key); return r?JSON.parse(r):fallback; } catch(e){ return fallback; } };

const BADGE_STYLES = {
  High:["linear-gradient(135deg,#FEE2E2,#FECACA)","#991B1B"],Medium:["linear-gradient(135deg,#FEF3C7,#FDE68A)","#92400E"],Low:["linear-gradient(135deg,#D1FAE5,#A7F3D0)","#065F46"],
  Good:["linear-gradient(135deg,#D1FAE5,#A7F3D0)","#065F46"],Fair:["linear-gradient(135deg,#FEF3C7,#FDE68A)","#92400E"],Poor:["linear-gradient(135deg,#FEE2E2,#FECACA)","#991B1B"],
  Completed:["linear-gradient(135deg,#D1FAE5,#A7F3D0)","#065F46"],Verified:["linear-gradient(135deg,#D1FAE5,#A7F3D0)","#065F46"],Resolved:["linear-gradient(135deg,#D1FAE5,#A7F3D0)","#065F46"],Validated:["linear-gradient(135deg,#D1FAE5,#A7F3D0)","#065F46"],
  "In Progress":["linear-gradient(135deg,#DBEAFE,#BFDBFE)","#1E40AF"],Pending:["linear-gradient(135deg,#F3F4F6,#E5E7EB)","#374151"],
  Queried:["linear-gradient(135deg,#FEE2E2,#FECACA)","#991B1B"],Declined:["linear-gradient(135deg,#FEE2E2,#FECACA)","#991B1B"],Failed:["linear-gradient(135deg,#FEE2E2,#FECACA)","#991B1B"],
  Yes:["linear-gradient(135deg,#FEE2E2,#FECACA)","#991B1B"],No:["linear-gradient(135deg,#D1FAE5,#A7F3D0)","#065F46"],
  "In Stock":["linear-gradient(135deg,#D1FAE5,#A7F3D0)","#065F46"],Dispatched:["linear-gradient(135deg,#DBEAFE,#BFDBFE)","#1E40AF"],Reserved:["linear-gradient(135deg,#FEF3C7,#FDE68A)","#92400E"],
  Public:["linear-gradient(135deg,#EFF6FF,#DBEAFE)","#1E40AF"],Independent:["linear-gradient(135deg,#F5F3FF,#EDE9FE)","#5B21B6"],
  Primary:["linear-gradient(135deg,#D1FAE5,#A7F3D0)","#065F46"],Secondary:["linear-gradient(135deg,#FEF3C7,#FDE68A)","#92400E"],Combined:["linear-gradient(135deg,#DBEAFE,#BFDBFE)","#1E40AF"],
};
const Badge = ({val}) => { const [bg,color]=BADGE_STYLES[val]||["linear-gradient(135deg,#F3F4F6,#E5E7EB)","#374151"]; return <span style={{background:bg,color,padding:"2px 10px",borderRadius:999,fontSize:12,fontWeight:500,whiteSpace:"nowrap",display:"inline-block"}}>{val}</span>; };

const toCSV = (cols,rows) => { const esc=v=>`"${String(v??'').replace(/"/g,'""')}"`; return [cols.join(","),...rows.map(r=>r.map(esc).join(","))].join("\n"); };
const downloadCSV = (filename,csv) => { const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"})); a.download=filename; a.click(); };
const STAT_GRADS = {"#2563EB":"linear-gradient(135deg,#EFF6FF,#DBEAFE)","#7C3AED":"linear-gradient(135deg,#F5F3FF,#EDE9FE)","#059669":"linear-gradient(135deg,#ECFDF5,#D1FAE5)","#DC2626":"linear-gradient(135deg,#FFF5F5,#FEE2E2)","#D97706":"linear-gradient(135deg,#FFFBEB,#FEF3C7)"};

// ─────────────────────────────────────────────
// UI PRIMITIVES
// ─────────────────────────────────────────────
const Card = ({children,style={}}) => <div style={{background:"linear-gradient(145deg,#ffffff,#f3f6fb)",border:"0.5px solid #E0E7EF",borderRadius:14,padding:"1.25rem",boxShadow:"0 2px 8px rgba(37,99,235,0.06)",...style}}>{children}</div>;
const StatCard = ({label,value,sub,color="#2563EB"}) => <div style={{background:STAT_GRADS[color]||"#F9FAFB",borderRadius:12,padding:"1rem 1.25rem",border:`0.5px solid ${color}22`,boxShadow:`0 2px 8px ${color}14`}}><p style={{fontSize:12,color:"#6B7280",margin:"0 0 6px"}}>{label}</p><p style={{fontSize:24,fontWeight:600,color,margin:"0 0 2px"}}>{value}</p>{sub&&<p style={{fontSize:12,color:"#9CA3AF",margin:0}}>{sub}</p>}</div>;
const SectionHeader = ({title,onAdd,extra}) => <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1rem"}}><h2 style={{fontSize:18,fontWeight:500,margin:0,color:"#111827"}}>{title}</h2><div style={{display:"flex",gap:8,alignItems:"center"}}>{extra}{onAdd&&<button onClick={onAdd} style={{fontSize:13,color:"#2563EB",background:"none",border:"0.5px solid #BFDBFE",borderRadius:8,padding:"5px 14px",cursor:"pointer"}}>+ Add record</button>}</div></div>;
const DataTable = ({cols,rows,renderRow}) => <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}><thead><tr style={{borderBottom:"0.5px solid #E5E7EB"}}>{cols.map(c=><th key={c} style={{textAlign:"left",padding:"8px 12px",color:"#6B7280",fontWeight:500,whiteSpace:"nowrap"}}>{c}</th>)}</tr></thead><tbody>{rows.length===0?<tr><td colSpan={cols.length} style={{padding:"2rem",textAlign:"center",color:"#9CA3AF"}}>No records yet</td></tr>:rows.map((r,i)=><tr key={i} style={{borderBottom:"0.5px solid #F3F4F6"}}>{renderRow(r).map((cell,j)=><td key={j} style={{padding:"9px 12px",color:"#374151"}}>{cell}</td>)}</tr>)}</tbody></table></div>;
const ExportBtn = ({label,cols,rows,filename}) => <button onClick={()=>downloadCSV(filename,toCSV(cols,rows))} style={{fontSize:12,color:"#059669",background:"#F0FDF4",border:"0.5px solid #A7F3D0",borderRadius:8,padding:"5px 12px",cursor:"pointer"}}>⬇ {label}</button>;
const KpaNote = ({weight,target,description}) => <div style={{background:"linear-gradient(135deg,#EFF6FF,#DBEAFE)",border:"0.5px solid #BFDBFE",borderRadius:10,padding:"10px 14px",marginBottom:"1.25rem",fontSize:13,color:"#1E40AF"}}><strong>Weight: {weight}</strong> · Target: {target} · {description}</div>;

const inp  = {width:"100%",padding:"7px 10px",border:"0.5px solid #D1D5DB",borderRadius:8,fontSize:13,boxSizing:"border-box",background:"#fff",color:"#111827"};
const sel  = {...inp};
const flbl = {fontSize:12,color:"#6B7280",marginBottom:4,display:"block"};
const Field = ({label,children}) => <div style={{marginBottom:12}}><label style={flbl}>{label}</label>{children}</div>;
const Row2  = ({children}) => <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>{children}</div>;
const Row3  = ({children}) => <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>{children}</div>;

const Modal = ({title,onClose,onSave,errors={},children}) => {
  const errList=Object.values(errors).filter(Boolean);
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{background:"#fff",borderRadius:14,padding:"1.5rem",width:600,maxHeight:"90vh",overflowY:"auto",boxSizing:"border-box",boxShadow:"0 20px 60px rgba(0,0,0,0.2)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.25rem"}}>
          <h3 style={{margin:0,fontSize:16,fontWeight:600,color:"#111827"}}>{title}</h3>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#9CA3AF",lineHeight:1}}>✕</button>
        </div>
        {errList.length>0&&<div style={{background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:8,padding:"10px 14px",marginBottom:"1rem"}}><p style={{fontWeight:600,fontSize:12,color:"#DC2626",margin:"0 0 4px"}}>Please fix the following:</p><ul style={{margin:0,paddingLeft:"1.1rem"}}>{errList.map((e,i)=><li key={i} style={{fontSize:12,color:"#DC2626"}}>{e}</li>)}</ul></div>}
        {children}
        <div style={{display:"flex",gap:8,marginTop:"1.5rem",justifyContent:"flex-end"}}>
          <button onClick={onClose} style={{padding:"8px 18px",borderRadius:8,border:"0.5px solid #D1D5DB",background:"#fff",fontSize:13,cursor:"pointer",color:"#374151"}}>Cancel</button>
          <button onClick={onSave}  style={{padding:"8px 18px",borderRadius:8,border:"none",background:"#2563EB",color:"#fff",fontSize:13,cursor:"pointer",fontWeight:600}}>Save record</button>
        </div>
      </div>
    </div>
  );
};


// ─────────────────────────────────────────────
// SIGNATURE PAD
// ─────────────────────────────────────────────
function SignaturePad({value,onChange}) {
  const canvasRef=useRef(null); const drawing=useRef(false); const lastPos=useRef(null); const hasMark=useRef(false);
  useEffect(()=>{ if(value&&canvasRef.current){const img=new Image();img.onload=()=>{const ctx=canvasRef.current.getContext('2d');ctx.clearRect(0,0,canvasRef.current.width,canvasRef.current.height);ctx.drawImage(img,0,0);};img.src=value;} },[]);
  const pos=(e,canvas)=>{const r=canvas.getBoundingClientRect();const src=e.touches?e.touches[0]:e;return{x:(src.clientX-r.left)*(canvas.width/r.width),y:(src.clientY-r.top)*(canvas.height/r.height)};};
  const start=e=>{e.preventDefault();drawing.current=true;lastPos.current=pos(e,canvasRef.current);};
  const move=e=>{e.preventDefault();if(!drawing.current)return;const canvas=canvasRef.current;const ctx=canvas.getContext('2d');const p=pos(e,canvas);ctx.beginPath();ctx.moveTo(lastPos.current.x,lastPos.current.y);ctx.lineTo(p.x,p.y);ctx.strokeStyle='#1e3a5f';ctx.lineWidth=2.5;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke();lastPos.current=p;hasMark.current=true;};
  const end=e=>{e.preventDefault();if(!drawing.current)return;drawing.current=false;if(hasMark.current)onChange(canvasRef.current.toDataURL('image/png'));};
  const clear=()=>{canvasRef.current.getContext('2d').clearRect(0,0,canvasRef.current.width,canvasRef.current.height);hasMark.current=false;onChange('');};
  return (
    <div>
      <div style={{position:'relative',border:'1.5px solid #D1D5DB',borderRadius:8,background:'#F9FAFB',overflow:'hidden',touchAction:'none'}}>
        <canvas ref={canvasRef} width={480} height={130} style={{display:'block',width:'100%',height:130,cursor:'crosshair'}} onMouseDown={start} onMouseMove={move} onMouseUp={end} onMouseLeave={end} onTouchStart={start} onTouchMove={move} onTouchEnd={end}/>
        {!value&&<div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',pointerEvents:'none'}}><span style={{fontSize:12,color:'#D1D5DB'}}>Sign here with finger or stylus</span></div>}
      </div>
      <div style={{display:'flex',justifyContent:'space-between',marginTop:4}}>
        <span style={{fontSize:11,color:value?'#059669':'#9CA3AF'}}>{value?'✓ Signature captured':'No signature yet'}</span>
        {value&&<button type="button" onClick={clear} style={{fontSize:11,color:'#EF4444',background:'none',border:'none',cursor:'pointer',padding:0}}>✕ Clear & redo</button>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// CANVAS CHARTS
// ─────────────────────────────────────────────
function PieChart({slices,size=160}) {
  const ref=useRef(null); const total=slices.reduce((s,x)=>s+x.value,0);
  useEffect(()=>{const canvas=ref.current;if(!canvas)return;const ctx=canvas.getContext('2d');const cx=size/2,cy=size/2,r=size/2-6;ctx.clearRect(0,0,size,size);if(total===0){ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fillStyle='#F3F4F6';ctx.fill();ctx.fillStyle='#9CA3AF';ctx.font='11px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('No data',cx,cy);return;}let angle=-Math.PI/2;slices.forEach(s=>{if(!s.value)return;const sweep=(s.value/total)*Math.PI*2;ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,angle,angle+sweep);ctx.closePath();ctx.fillStyle=s.color;ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.stroke();angle+=sweep;});ctx.beginPath();ctx.arc(cx,cy,r*0.46,0,Math.PI*2);ctx.fillStyle='#fff';ctx.fill();ctx.fillStyle='#111827';ctx.font=`bold ${Math.round(size*0.14)}px sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(total.toLocaleString(),cx,cy);},[slices,size,total]);
  return <div style={{display:'flex',alignItems:'center',gap:16}}><canvas ref={ref} width={size} height={size} style={{flexShrink:0}}/><div style={{display:'flex',flexDirection:'column',gap:6}}>{slices.map(s=><div key={s.label} style={{display:'flex',alignItems:'center',gap:7}}><div style={{width:10,height:10,borderRadius:2,background:s.color,flexShrink:0}}/><span style={{fontSize:12,color:'#374151'}}>{s.label}</span><span style={{fontSize:12,fontWeight:600,color:'#111827',marginLeft:'auto',paddingLeft:12}}>{s.value}</span></div>)}</div></div>;
}
function HorizBar({label,value,max,color,total}) {
  const pct=max>0?Math.round((value/max)*100):0; const display=total>0?`${Math.round((value/total)*100)}%`:'—';
  return <div style={{marginBottom:10}}><div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}><span style={{fontSize:12,color:'#374151'}}>{label}</span><span style={{fontSize:12,fontWeight:600,color:'#111827'}}>{value} <span style={{color:'#9CA3AF',fontWeight:400}}>({display})</span></span></div><div style={{background:'#F3F4F6',borderRadius:999,height:7,overflow:'hidden'}}><div style={{width:`${pct}%`,height:'100%',background:color,borderRadius:999}}/></div></div>;
}


// ─────────────────────────────────────────────
// FORMS — CORE (with validation + photos)
// ─────────────────────────────────────────────
function SchoolForm({initial,onSave,onClose}) {
  const [f,setF]=useState(initial||{name:"",emis:"",province:"NC",district:"",circuit:"",capacity:"",mobiles:"",mobileCap:"35",enrolment:"",teachers:"",risk:"Low"});
  const [touched,setTouched]=useState(false);
  const s=k=>e=>setF(p=>({...p,[k]:e.target.value}));
  const validate=d=>({name:!d.name?.trim()?"School name is required":"",emis:!d.emis?.trim()?"EMIS number is required":"",district:!d.district?.trim()?"District is required":""});
  const errors=touched?validate(f):{};
  const eI=k=>touched&&errors[k]?{...inp,borderColor:"#EF4444",background:"#FFF5F5"}:inp;
  const handleSave=()=>{setTouched(true);if(Object.values(validate(f)).some(Boolean))return;onSave(f);};
  return (
    <Modal title={initial?"Edit school":"Add school"} onClose={onClose} onSave={handleSave} errors={errors}>
      <Row2><Field label="School name *"><input style={eI("name")} value={f.name} onChange={s("name")}/></Field><Field label="EMIS number *"><input style={eI("emis")} value={f.emis} onChange={s("emis")}/></Field></Row2>
      <Row2><Field label="Province"><input style={inp} value={f.province} onChange={s("province")}/></Field><Field label="District *"><input style={eI("district")} value={f.district} onChange={s("district")}/></Field></Row2>
      <Field label="Circuit"><input style={inp} value={f.circuit} onChange={s("circuit")} placeholder="e.g. F8"/></Field>
      <Row3><Field label="Capacity"><input style={inp} type="number" value={f.capacity} onChange={s("capacity")}/></Field><Field label="Mobiles"><input style={inp} type="number" value={f.mobiles} onChange={s("mobiles")}/></Field><Field label="Per mobile"><input style={inp} type="number" value={f.mobileCap} onChange={s("mobileCap")}/></Field></Row3>
      <Row3><Field label="Enrolment"><input style={inp} type="number" value={f.enrolment} onChange={s("enrolment")}/></Field><Field label="Teachers"><input style={inp} type="number" value={f.teachers} onChange={s("teachers")}/></Field><Field label="Risk level"><select style={sel} value={f.risk} onChange={s("risk")}>{["Low","Medium","High"].map(v=><option key={v}>{v}</option>)}</select></Field></Row3>
    </Modal>
  );
}

function AuditForm({schools,onSave,onClose}) {
  const [f,setF]=useState({schoolId:"",year:new Date().getFullYear(),date:"",risk:"Low",capWith:"",capWithout:"",overcapacity:"No",recommendations:"",comments:"",hallAvailable:"No",hallCondition:"Good",hallCapacity:"",hallUsage:"",hallFloor:"Good",hallRoof:"Good",hallElectricity:"Yes",hallToilets:"No",hallIssues:"",hallNotes:""});
  const [touched,setTouched]=useState(false);
  const s=k=>e=>setF(p=>({...p,[k]:e.target.value}));
  const validate=d=>({schoolId:!d.schoolId?"School is required":"",date:!d.date?"Audit date is required":""});
  const errors=touched?validate(f):{};
  const eS=k=>touched&&errors[k]?{...sel,borderColor:"#EF4444",background:"#FFF5F5"}:sel;
  const eI=k=>touched&&errors[k]?{...inp,borderColor:"#EF4444",background:"#FFF5F5"}:inp;
  const handleSave=()=>{setTouched(true);if(Object.values(validate(f)).some(Boolean))return;onSave(f);};
  return (
    <Modal title="New audit" onClose={onClose} onSave={handleSave} errors={errors}>
      <Row2><Field label="School *"><select style={eS("schoolId")} value={f.schoolId} onChange={s("schoolId")}><option value="">Select school</option>{schools.map(sc=><option key={sc.id} value={sc.id}>{sc.name}</option>)}</select></Field><Field label="Year"><input style={inp} type="number" value={f.year} onChange={s("year")}/></Field></Row2>
      <Row2><Field label="Date *"><input style={eI("date")} type="date" value={f.date} onChange={s("date")}/></Field><Field label="Risk level"><select style={sel} value={f.risk} onChange={s("risk")}>{["Low","Medium","High"].map(v=><option key={v}>{v}</option>)}</select></Field></Row2>
      <Row3><Field label="Cap. with mobiles"><input style={inp} type="number" value={f.capWith} onChange={s("capWith")}/></Field><Field label="Cap. without mobiles"><input style={inp} type="number" value={f.capWithout} onChange={s("capWithout")}/></Field><Field label="Overcapacity"><select style={sel} value={f.overcapacity} onChange={s("overcapacity")}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field></Row3>
      <Field label="Recommendations"><textarea style={{...inp,minHeight:60,resize:"vertical"}} value={f.recommendations} onChange={s("recommendations")}/></Field>
      <Field label="Comments"><textarea style={{...inp,minHeight:40,resize:"vertical"}} value={f.comments} onChange={s("comments")}/></Field>
      <div style={{borderTop:"1.5px solid #E5E7EB",margin:"1.25rem 0 1rem",paddingTop:"1rem"}}>
        <p style={{fontSize:12,fontWeight:600,color:"#374151",margin:"0 0 0.875rem",textTransform:"uppercase",letterSpacing:"0.05em"}}>🏛 School Hall</p>
        <Row2><Field label="Hall available?"><select style={sel} value={f.hallAvailable} onChange={s("hallAvailable")}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Overall condition"><select style={sel} value={f.hallCondition} onChange={s("hallCondition")} disabled={f.hallAvailable==="No"}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field></Row2>
        {f.hallAvailable==="Yes"&&<><Row3><Field label="Seating capacity"><input style={inp} type="number" value={f.hallCapacity} onChange={s("hallCapacity")}/></Field><Field label="Electricity"><select style={sel} value={f.hallElectricity} onChange={s("hallElectricity")}>{["Yes","No","Partial"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Toilets adjacent?"><select style={sel} value={f.hallToilets} onChange={s("hallToilets")}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field></Row3><Row3><Field label="Floor condition"><select style={sel} value={f.hallFloor} onChange={s("hallFloor")}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Roof condition"><select style={sel} value={f.hallRoof} onChange={s("hallRoof")}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Current usage"><input style={inp} value={f.hallUsage} onChange={s("hallUsage")} placeholder="e.g. Assemblies, Exams"/></Field></Row3><Field label="Known issues"><input style={inp} value={f.hallIssues} onChange={s("hallIssues")} placeholder="e.g. Leaking roof"/></Field><Field label="Hall notes"><textarea style={{...inp,minHeight:44,resize:"vertical"}} value={f.hallNotes} onChange={s("hallNotes")}/></Field></>}
      </div>
    </Modal>
  );
}

function ClassroomForm({schools,onSave,onClose}) {
  const [f,setF]=useState({schoolId:"",room:"",type:"Classroom",grade:"",spec:"",learners:"",isMobile:"No"});
  const [touched,setTouched]=useState(false);
  const s=k=>e=>setF(p=>({...p,[k]:e.target.value}));
  const validate=d=>({schoolId:!d.schoolId?"School is required":"",room:!d.room?.trim()?"Room number is required":""});
  const errors=touched?validate(f):{};
  const eS=k=>touched&&errors[k]?{...sel,borderColor:"#EF4444",background:"#FFF5F5"}:sel;
  const eI=k=>touched&&errors[k]?{...inp,borderColor:"#EF4444",background:"#FFF5F5"}:inp;
  const handleSave=()=>{setTouched(true);if(Object.values(validate(f)).some(Boolean))return;onSave(f);};
  return (
    <Modal title="Add classroom" onClose={onClose} onSave={handleSave} errors={errors}>
      <Row2><Field label="School *"><select style={eS("schoolId")} value={f.schoolId} onChange={s("schoolId")}><option value="">Select</option>{schools.map(sc=><option key={sc.id} value={sc.id}>{sc.name}</option>)}</select></Field><Field label="Room number *"><input style={eI("room")} value={f.room} onChange={s("room")}/></Field></Row2>
      <Row2><Field label="Room type"><select style={sel} value={f.type} onChange={s("type")}>{["Classroom","Lab","Office","Storage"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Is mobile?"><select style={sel} value={f.isMobile} onChange={s("isMobile")}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field></Row2>
      <Row3><Field label="Grade (R–12)"><input style={inp} value={f.grade} onChange={s("grade")}/></Field><Field label="Spec (e.g. 4E1)"><input style={inp} value={f.spec} onChange={s("spec")}/></Field><Field label="Learner count"><input style={inp} type="number" value={f.learners} onChange={s("learners")}/></Field></Row3>
    </Modal>
  );
}

function FurnitureForm({classrooms,schools,onSave,onClose}) {
  const [f,setF]=useState({schoolId:"",classroomId:"",category:"Learner",ftype:"",spec:"",chairType:"Penny 1 Plastic Chair – Size 2 (Grade 1–3, seat height 310mm)",available:"",damaged:"",repairable:"",otherType:"",otherQty:"",condition:"Good",auditDate:new Date().toISOString().slice(0,10),photoName:"",photoData:""});
  const [touched,setTouched]=useState(false);
  const s=k=>e=>setF(p=>({...p,[k]:e.target.value}));
  const filteredClassrooms=classrooms.filter(c=>!f.schoolId||c.schoolId.toString()===f.schoolId);
  useEffect(()=>{if(!f.schoolId)return;const cl=classrooms.find(c=>c.id.toString()===f.classroomId);if(cl&&cl.schoolId.toString()!==f.schoolId)setF(p=>({...p,classroomId:""}));},[f.schoolId]);
  const roomLabel=c=>{const sc=schools.find(x=>x.id===c.schoolId);return `${sc?.name||"?"} — Room ${c.room}`;};
  const handlePhoto=e=>{const file=e.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=()=>setF(p=>({...p,photoName:file.name,photoData:reader.result}));reader.readAsDataURL(file);};
  const validate=d=>({schoolId:!d.schoolId?"School is required":"",classroomId:!d.classroomId?"Classroom is required":"",ftype:!d.ftype?"Furniture type is required":"",available:d.available===""?"Available quantity is required":""});
  const errors=touched?validate(f):{};
  const eS=k=>touched&&errors[k]?{...sel,borderColor:"#EF4444",background:"#FFF5F5"}:sel;
  const eI=k=>touched&&errors[k]?{...inp,borderColor:"#EF4444",background:"#FFF5F5"}:inp;
  const handleSave=()=>{setTouched(true);if(Object.values(validate(f)).some(Boolean))return;onSave(f);};
  return (
    <Modal title="Add furniture" onClose={onClose} onSave={handleSave} errors={errors}>
      <Row2><Field label="School *"><select style={eS("schoolId")} value={f.schoolId} onChange={s("schoolId")}><option value="">Select</option>{schools.map(sc=><option key={sc.id} value={sc.id}>{sc.name}</option>)}</select></Field><Field label="Classroom *"><select style={eS("classroomId")} value={f.classroomId} onChange={s("classroomId")}><option value="">Select</option>{filteredClassrooms.map(c=><option key={c.id} value={c.id}>{roomLabel(c)}</option>)}</select></Field></Row2>
      <Row2><Field label="Category"><select style={sel} value={f.category} onChange={s("category")}>{["Learner","Teacher","Admin","Specialised"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="DBE Furniture type *"><select style={eS("ftype")} value={f.ftype} onChange={s("ftype")}><option value="">Select...</option>{DBE_FURNITURE.map(v=><option key={v} value={v}>{v}</option>)}<option value="Other">Other (specify below)</option></select></Field></Row2>
      {f.ftype==="Other"&&<Field label="Specify type"><input style={inp} value={f.otherType} onChange={s("otherType")} placeholder="Describe item"/></Field>}
      <Row2><Field label="Audit date"><input style={inp} type="date" value={f.auditDate} onChange={s("auditDate")}/></Field><Field label="Specification"><input style={inp} value={f.spec} onChange={s("spec")} placeholder="e.g. Grade 4–6"/></Field></Row2>
      <Row2><Field label="Chair type"><select style={sel} value={f.chairType} onChange={s("chairType")}>{["Penny 1 Wooden","Penny 1 Plastic","Penny 4 Wooden","Penny 4 Plastic","Utility (Steel Frame)","Lab Stool","Upholstered"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Available *"><input style={eI("available")} type="number" value={f.available} onChange={s("available")}/></Field></Row2>
      <Row3><Field label="Damaged"><input style={inp} type="number" value={f.damaged} onChange={s("damaged")}/></Field><Field label="Repairable"><input style={inp} type="number" value={f.repairable} onChange={s("repairable")}/></Field><Field label="Condition"><select style={sel} value={f.condition} onChange={s("condition")}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field></Row3>
      <Field label="Other qty"><input style={inp} type="number" value={f.otherQty} onChange={s("otherQty")}/></Field>
      <Field label="Photo evidence">{f.photoData?<div style={{display:"flex",alignItems:"flex-start",gap:12,marginTop:4}}><a href={f.photoData} target="_blank" rel="noreferrer"><img src={f.photoData} alt="preview" style={{width:80,height:80,objectFit:"cover",borderRadius:8,border:"1px solid #D1D5DB",cursor:"pointer"}}/></a><div><p style={{fontSize:12,color:"#4B5563",margin:"0 0 6px"}}>{f.photoName}</p><button type="button" onClick={()=>setF(p=>({...p,photoName:"",photoData:""}))} style={{fontSize:11,color:"#EF4444",background:"none",border:"none",cursor:"pointer",padding:0}}>✕ Remove</button></div></div>:<label style={{display:"inline-flex",alignItems:"center",gap:6,marginTop:4,padding:"7px 14px",borderRadius:8,border:"1.5px dashed #9CA3AF",background:"#F9FAFB",color:"#374151",fontSize:12,cursor:"pointer"}}>📷 Take / choose photo<input type="file" accept="image/*" capture="environment" onChange={handlePhoto} style={{display:"none"}}/></label>}</Field>
    </Modal>
  );
}

function ConditionForm({classrooms,schools,onSave,onClose}) {
  const [f,setF]=useState({classroomId:"",flooring:"Good",flooringIssues:"",windows:"Good",windowIssues:"",locks:"Good",electricity:"Yes",mobile:"N/A",comments:"",photos:[]});
  const [touched,setTouched]=useState(false);
  const s=k=>e=>setF(p=>({...p,[k]:e.target.value}));
  const roomLabel=c=>{const sc=schools.find(x=>x.id===c.schoolId);return `${sc?.name||"?"} — Room ${c.room}`;};
  const handlePhotos=e=>{const files=Array.from(e.target.files).slice(0,3-f.photos.length);files.forEach(file=>{const reader=new FileReader();reader.onload=()=>setF(p=>({...p,photos:p.photos.length<3?[...p.photos,{name:file.name,data:reader.result}]:p.photos}));reader.readAsDataURL(file);});e.target.value="";};
  const validate=d=>({classroomId:!d.classroomId?"Classroom is required":""});
  const errors=touched?validate(f):{};
  const eS=k=>touched&&errors[k]?{...sel,borderColor:"#EF4444",background:"#FFF5F5"}:sel;
  const handleSave=()=>{setTouched(true);if(Object.values(validate(f)).some(Boolean))return;onSave(f);};
  return (
    <Modal title="Condition assessment" onClose={onClose} onSave={handleSave} errors={errors}>
      <Field label="Classroom *"><select style={eS("classroomId")} value={f.classroomId} onChange={s("classroomId")}><option value="">Select</option>{classrooms.map(c=><option key={c.id} value={c.id}>{roomLabel(c)}</option>)}</select></Field>
      <Row2><Field label="Flooring condition"><select style={sel} value={f.flooring} onChange={s("flooring")}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Flooring issues"><input style={inp} value={f.flooringIssues} onChange={s("flooringIssues")} placeholder="e.g. Cracks, Holes"/></Field></Row2>
      <Row2><Field label="Windows condition"><select style={sel} value={f.windows} onChange={s("windows")}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Window issues"><input style={inp} value={f.windowIssues} onChange={s("windowIssues")} placeholder="e.g. Broken, Missing"/></Field></Row2>
      <Row3><Field label="Lock condition"><select style={sel} value={f.locks} onChange={s("locks")}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Electricity?"><select style={sel} value={f.electricity} onChange={s("electricity")}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Mobile condition"><input style={inp} value={f.mobile} onChange={s("mobile")} placeholder="N/A or condition"/></Field></Row3>
      <Field label="Comments"><textarea style={{...inp,minHeight:50,resize:"vertical"}} value={f.comments} onChange={s("comments")}/></Field>
      <Field label={`Photos (${f.photos.length}/3)`}><div style={{display:"flex",gap:10,flexWrap:"wrap",marginTop:4}}>{f.photos.map((ph,i)=><div key={i} style={{position:"relative"}}><a href={ph.data} target="_blank" rel="noreferrer"><img src={ph.data} alt={ph.name} style={{width:72,height:72,objectFit:"cover",borderRadius:8,border:"1px solid #D1D5DB",display:"block",cursor:"pointer"}}/></a><button type="button" onClick={()=>setF(p=>({...p,photos:p.photos.filter((_,x)=>x!==i)}))} style={{position:"absolute",top:-6,right:-6,width:18,height:18,borderRadius:"50%",background:"#EF4444",color:"#fff",border:"none",fontSize:10,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button></div>)}{f.photos.length<3&&<label style={{width:72,height:72,borderRadius:8,border:"1.5px dashed #9CA3AF",background:"#F9FAFB",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:20,color:"#9CA3AF"}}>📷<span style={{fontSize:10,color:"#6B7280",marginTop:2}}>Add</span><input type="file" accept="image/*" capture="environment" multiple onChange={handlePhotos} style={{display:"none"}}/></label>}</div></Field>
    </Modal>
  );
}

function RepairForm({furniture,classrooms,schools,onSave,onClose}) {
  const [f,setF]=useState({furnitureId:"",ftype:"",repairType:"Minor",destination:"Warehouse",qty:"",status:"Pending",allocated:"",completed:""});
  const [touched,setTouched]=useState(false);
  const s=k=>e=>setF(p=>({...p,[k]:e.target.value}));
  const selectedFu=furniture.find(fu=>fu.id==f.furnitureId);
  const selectedCl=selectedFu?classrooms.find(c=>c.id==selectedFu.classroomId):null;
  const selectedSc=selectedCl?schools.find(sc=>sc.id==selectedCl.schoolId):schools.find(sc=>sc.id==selectedFu?.schoolId);
  const validate=d=>({furnitureId:!d.furnitureId?"Furniture item is required":"",qty:d.qty===""?"Quantity is required":"",allocated:!d.allocated?"Date allocated is required":""});
  const errors=touched?validate(f):{};
  const eS=k=>touched&&errors[k]?{...sel,borderColor:"#EF4444",background:"#FFF5F5"}:sel;
  const eI=k=>touched&&errors[k]?{...inp,borderColor:"#EF4444",background:"#FFF5F5"}:inp;
  const handleSave=()=>{setTouched(true);if(Object.values(validate(f)).some(Boolean))return;onSave(f);};
  return (
    <Modal title="Log repair" onClose={onClose} onSave={handleSave} errors={errors}>
      <Field label="Furniture item *">
        <select style={eS("furnitureId")} value={f.furnitureId} onChange={s("furnitureId")}>
          <option value="">Select furniture item</option>
          {schools.map(sc=>{const scCls=classrooms.filter(c=>c.schoolId==sc.id);const scFu=furniture.filter(fu=>scCls.some(c=>c.id==fu.classroomId)||fu.schoolId==sc.id);if(!scFu.length)return null;return <optgroup key={sc.id} label={sc.name}>{scFu.map(fu=>{const cl=classrooms.find(c=>c.id==fu.classroomId);return <option key={fu.id} value={fu.id}>{fu.ftype}{fu.spec?` (${fu.spec})`:""}{cl?.room?` — Room ${cl.room}`:""}</option>;})}</optgroup>;})}
          {furniture.filter(fu=>!classrooms.find(c=>c.id==fu.classroomId)&&!fu.schoolId).map(fu=><option key={fu.id} value={fu.id}>{fu.ftype}{fu.spec?` (${fu.spec})`:""}</option>)}
        </select>
      </Field>
      {selectedFu&&<div style={{background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:8,padding:"8px 12px",marginBottom:8}}><p style={{margin:0,fontSize:12,color:"#1E40AF"}}><strong>Collected from:</strong> {selectedSc?.name||"Unknown school"}{selectedCl?.room?` — Room ${selectedCl.room}`:""}{selectedFu.condition?` · Condition: ${selectedFu.condition}`:""}</p></div>}
      <Field label="DBE furniture type"><select style={sel} value={f.ftype} onChange={s("ftype")}><option value="">Select DBE type...</option>{DBE_FURNITURE.map(v=><option key={v} value={v}>{v}</option>)}<option value="Other">Other</option></select></Field>
      <Row2><Field label="Repair type"><select style={sel} value={f.repairType} onChange={s("repairType")}>{["Minor","Major"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Destination"><select style={sel} value={f.destination} onChange={s("destination")}>{["Warehouse","Labour Dept"].map(v=><option key={v}>{v}</option>)}</select></Field></Row2>
      <Row2><Field label="Quantity *"><input style={eI("qty")} type="number" value={f.qty} onChange={s("qty")}/></Field><Field label="Status"><select style={sel} value={f.status} onChange={s("status")}>{["Pending","In Progress","Completed"].map(v=><option key={v}>{v}</option>)}</select></Field></Row2>
      <Row2><Field label="Date allocated *"><input style={eI("allocated")} type="date" value={f.allocated} onChange={s("allocated")}/></Field><Field label="Date completed"><input style={inp} type="date" value={f.completed} onChange={s("completed")}/></Field></Row2>
    </Modal>
  );
}

function StorageForm({schools,onSave,onClose}) {
  const [f,setF]=useState({schoolId:"",room:"",condition:"Good",secure:"Yes",storedType:"",qty:"",usable:"No",desc:""});
  const [touched,setTouched]=useState(false);
  const s=k=>e=>setF(p=>({...p,[k]:e.target.value}));
  const validate=d=>({schoolId:!d.schoolId?"School is required":"",room:!d.room?.trim()?"Room number is required":"",storedType:!d.storedType?.trim()?"Stored type is required":""});
  const errors=touched?validate(f):{};
  const eS=k=>touched&&errors[k]?{...sel,borderColor:"#EF4444",background:"#FFF5F5"}:sel;
  const eI=k=>touched&&errors[k]?{...inp,borderColor:"#EF4444",background:"#FFF5F5"}:inp;
  const handleSave=()=>{setTouched(true);if(Object.values(validate(f)).some(Boolean))return;onSave(f);};
  return (
    <Modal title="Add storage record" onClose={onClose} onSave={handleSave} errors={errors}>
      <Row2><Field label="School *"><select style={eS("schoolId")} value={f.schoolId} onChange={s("schoolId")}><option value="">Select</option>{schools.map(sc=><option key={sc.id} value={sc.id}>{sc.name}</option>)}</select></Field><Field label="Room number *"><input style={eI("room")} value={f.room} onChange={s("room")}/></Field></Row2>
      <Row3><Field label="Condition"><select style={sel} value={f.condition} onChange={s("condition")}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Secure?"><select style={sel} value={f.secure} onChange={s("secure")}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Usable?"><select style={sel} value={f.usable} onChange={s("usable")}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field></Row3>
      <Row2><Field label="Stored type *"><input style={eI("storedType")} value={f.storedType} onChange={s("storedType")}/></Field><Field label="Quantity"><input style={inp} type="number" value={f.qty} onChange={s("qty")}/></Field></Row2>
      <Field label="Description"><textarea style={{...inp,minHeight:50,resize:"vertical"}} value={f.desc} onChange={s("desc")}/></Field>
    </Modal>
  );
}

function DistributionForm({schools,onSave,onClose}) {
  const [f,setF]=useState({schoolId:"",destination:"",desc:"",qty:"",source:"",official:"",position:"",receiver:"",role:"",date:"",purpose:"Delivery",ref:"",proofName:"",proofData:"",sigOfficial:"",sigReceiver:""});
  const [touched,setTouched]=useState(false);
  const s=k=>e=>setF(p=>({...p,[k]:e.target.value}));
  const validate=d=>({schoolId:!d.schoolId?"School is required":"",desc:!d.desc?.trim()?"Description is required":"",qty:d.qty===""?"Quantity is required":"",official:!d.official?.trim()?"Official name is required":"",date:!d.date?"Date is required":""});
  const errors=touched?validate(f):{};
  const eS=k=>touched&&errors[k]?{...sel,borderColor:"#EF4444",background:"#FFF5F5"}:sel;
  const eI=k=>touched&&errors[k]?{...inp,borderColor:"#EF4444",background:"#FFF5F5"}:inp;
  const handleSave=()=>{setTouched(true);if(Object.values(validate(f)).some(Boolean))return;onSave(f);};
  const handleProof=e=>{const file=e.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=()=>setF(p=>({...p,proofName:file.name,proofData:reader.result}));reader.readAsDataURL(file);};
  return (
    <Modal title="Add distribution record" onClose={onClose} onSave={handleSave} errors={errors}>
      <Row2><Field label="School *"><select style={eS("schoolId")} value={f.schoolId} onChange={s("schoolId")}><option value="">Select</option>{schools.map(sc=><option key={sc.id} value={sc.id}>{sc.name}</option>)}</select></Field><Field label="Purpose"><select style={sel} value={f.purpose} onChange={s("purpose")}>{["Delivery","Collection","Repair"].map(v=><option key={v}>{v}</option>)}</select></Field></Row2>
      <Row2><Field label="Destination"><input style={inp} value={f.destination} onChange={s("destination")}/></Field><Field label="Source location"><input style={inp} value={f.source} onChange={s("source")}/></Field></Row2>
      <Row2><Field label="Description *"><input style={eI("desc")} value={f.desc} onChange={s("desc")}/></Field><Field label="Quantity *"><input style={eI("qty")} type="number" value={f.qty} onChange={s("qty")}/></Field></Row2>
      <Row2><Field label="Official name *"><input style={eI("official")} value={f.official} onChange={s("official")}/></Field><Field label="Position"><input style={inp} value={f.position} onChange={s("position")}/></Field></Row2>
      <Row2><Field label="Receiving person"><input style={inp} value={f.receiver} onChange={s("receiver")}/></Field><Field label="Receiving role"><input style={inp} value={f.role} onChange={s("role")}/></Field></Row2>
      <Row2><Field label="Date *"><input style={eI("date")} type="date" value={f.date} onChange={s("date")}/></Field><Field label="Reference number"><input style={inp} value={f.ref} onChange={s("ref")}/></Field></Row2>
      <Field label="Proof of delivery"><input type="file" accept="application/pdf,image/*" onChange={handleProof} style={inp}/>{f.proofName&&<div style={{marginTop:6,fontSize:12,color:"#4B5563"}}>Selected: {f.proofName}</div>}</Field>
      <div style={{borderTop:"1px solid #F3F4F6",margin:"1rem 0 0.75rem",paddingTop:"0.75rem"}}><p style={{fontSize:12,fontWeight:600,color:"#374151",margin:"0 0 0.75rem",textTransform:"uppercase",letterSpacing:"0.05em"}}>Signatures</p><Field label={`Dispatching official${f.official?" — "+f.official:""}`}><SignaturePad value={f.sigOfficial} onChange={v=>setF(p=>({...p,sigOfficial:v}))}/></Field><Field label={`Receiving person${f.receiver?" — "+f.receiver:""}`}><SignaturePad value={f.sigReceiver} onChange={v=>setF(p=>({...p,sigReceiver:v}))}/></Field></div>
    </Modal>
  );
}

function WarehouseForm({onSave,onClose}) {
  const [f,setF]=useState({date:"",supplier:"",ftype:"",spec:"",qty:"",condition:"Good",receivedBy:"",ref:"",status:"In Stock",notes:""});
  const [touched,setTouched]=useState(false);
  const s=k=>e=>setF(p=>({...p,[k]:e.target.value}));
  const validate=d=>({date:!d.date?"Date received is required":"",ftype:!d.ftype?"Furniture type is required":"",qty:d.qty===""?"Quantity is required":"",receivedBy:!d.receivedBy?.trim()?"Received by is required":""});
  const errors=touched?validate(f):{};
  const eS=k=>touched&&errors[k]?{...sel,borderColor:"#EF4444",background:"#FFF5F5"}:sel;
  const eI=k=>touched&&errors[k]?{...inp,borderColor:"#EF4444",background:"#FFF5F5"}:inp;
  const handleSave=()=>{setTouched(true);if(Object.values(validate(f)).some(Boolean))return;onSave(f);};
  return (
    <Modal title="Log warehouse delivery" onClose={onClose} onSave={handleSave} errors={errors}>
      <Row2><Field label="Date received *"><input style={eI("date")} type="date" value={f.date} onChange={s("date")}/></Field><Field label="Supplier"><input style={inp} value={f.supplier} onChange={s("supplier")}/></Field></Row2>
      <Field label="DBE Furniture type *"><select style={eS("ftype")} value={f.ftype} onChange={s("ftype")}><option value="">Select...</option>{DBE_FURNITURE.map(v=><option key={v} value={v}>{v}</option>)}<option value="Other">Other</option></select></Field>
      <Row3><Field label="Quantity *"><input style={eI("qty")} type="number" value={f.qty} onChange={s("qty")}/></Field><Field label="Condition"><select style={sel} value={f.condition} onChange={s("condition")}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Status"><select style={sel} value={f.status} onChange={s("status")}>{["In Stock","Reserved","Dispatched"].map(v=><option key={v}>{v}</option>)}</select></Field></Row3>
      <Row2><Field label="Received by *"><input style={eI("receivedBy")} value={f.receivedBy} onChange={s("receivedBy")}/></Field><Field label="Reference number"><input style={inp} value={f.ref} onChange={s("ref")}/></Field></Row2>
      <Field label="Notes"><textarea style={{...inp,minHeight:50,resize:"vertical"}} value={f.notes} onChange={s("notes")}/></Field>
    </Modal>
  );
}


// ─────────────────────────────────────────────
// SCHOOL CAPTURE — tabbed single-school form
// ─────────────────────────────────────────────
function SchoolCapturePage({schools,classrooms,furniture,conditions,repairs,onSaveAll,showToast}) {
  const [tab,setTab]=useState(0);
  const [selectedSchoolId,setSelectedSchoolId]=useState("");
  const [newSchool,setNewSchool]=useState({name:"",emis:"",province:"NC",district:"",circuit:"",capacity:"",mobiles:"",mobileCap:"35",enrolment:"",teachers:"",risk:"Low"});
  const [audit,setAudit]=useState({year:new Date().getFullYear(),date:new Date().toISOString().slice(0,10),risk:"Low",capWith:"",capWithout:"",overcapacity:"No",recommendations:"",comments:"",hallAvailable:"No",hallCondition:"Good",hallCapacity:"",hallUsage:"",hallFloor:"Good",hallRoof:"Good",hallElectricity:"Yes",hallToilets:"No",hallIssues:"",hallNotes:""});
  const [clsRows,setClsRows]=useState([{room:"",type:"Classroom",grade:"",spec:"",learners:"",isMobile:"No",ftype:"",category:"Learner",available:"",damaged:"",repairable:"",condition:"Good"}]);
  const [condRow,setCondRow]=useState({flooring:"Good",flooringIssues:"",windows:"Good",windowIssues:"",locks:"Good",electricity:"Yes",mobile:"N/A",comments:"",photos:[]});
  const [repairRows,setRepairRows]=useState([{furnitureId:"",ftype:"",repairType:"Minor",destination:"Warehouse",qty:"",status:"Pending",allocated:"",completed:""}]);

  const sa=k=>e=>setAudit(p=>({...p,[k]:e.target.value}));
  const sc=k=>e=>setNewSchool(p=>({...p,[k]:e.target.value}));
  const tabs=["1. School","2. Audit","3. Classrooms & Furniture","4. Conditions","5. Repairs"];

  const handleSaveAll=()=>{
    const schoolId=selectedSchoolId||uid();
    const school=selectedSchoolId?null:{...newSchool,id:schoolId};
    const auditRecord={...audit,schoolId,id:uid()};
    const classroomRecords=clsRows.filter(r=>r.room).map(r=>({id:uid(),schoolId,room:r.room,type:r.type,grade:r.grade,spec:r.spec,learners:r.learners,isMobile:r.isMobile}));
    const furnitureRecords=clsRows.filter(r=>r.room&&r.ftype).map((r,i)=>({id:uid(),schoolId,classroomId:classroomRecords[i]?.id||"",ftype:r.ftype,category:r.category,available:r.available,damaged:r.damaged,repairable:r.repairable,condition:r.condition,spec:r.spec,auditDate:audit.date,photoName:"",photoData:""}));
    const condRecord=condRow.flooring?{...condRow,id:uid(),classroomId:classroomRecords[0]?.id||""}:null;
    const repairRecords=repairRows.filter(r=>r.furnitureId&&r.qty).map(r=>({...r,id:uid()}));
    onSaveAll({school,audit:auditRecord,classrooms:classroomRecords,furniture:furnitureRecords,condition:condRecord,repairs:repairRecords});
    showToast("✓ School capture saved successfully.");
  };

  const tabStyle=i=>({padding:"10px 20px",borderRadius:"10px 10px 0 0",border:"0.5px solid #E0E7EF",borderBottom:tab===i?"none":"0.5px solid #E0E7EF",background:tab===i?"#fff":"#F3F6FB",color:tab===i?"#1e40af":"#6B7280",fontWeight:tab===i?600:400,cursor:"pointer",fontSize:13});

  return (
    <div>
      <div style={{background:"linear-gradient(135deg,#1e3a5f,#1e40af)",borderRadius:14,padding:"1.5rem",marginBottom:"1.5rem",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><p style={{fontSize:11,color:"rgba(255,255,255,0.6)",margin:"0 0 2px",textTransform:"uppercase",letterSpacing:"0.08em"}}>School Capture</p><h2 style={{fontSize:20,fontWeight:700,margin:"0 0 4px",color:"#fff"}}>Capture all school data in one place</h2><p style={{fontSize:13,color:"rgba(255,255,255,0.7)",margin:0}}>Select an existing school or add a new one, then fill in all sections.</p></div>
        <button onClick={handleSaveAll} style={{padding:"12px 28px",borderRadius:10,border:"none",background:"#fff",color:"#1e40af",fontSize:14,fontWeight:700,cursor:"pointer"}}>Save all</button>
      </div>

      <Card style={{marginBottom:"1rem"}}>
        <p style={{fontSize:11,color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.05em",margin:"0 0 8px"}}>Select or add a school</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:12,alignItems:"center"}}>
          <select style={sel} value={selectedSchoolId} onChange={e=>setSelectedSchoolId(e.target.value)}>
            <option value="">Select school...</option>
            {schools.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <span style={{fontSize:13,color:"#6B7280"}}>or fill in tab 1</span>
        </div>
      </Card>

      <div style={{display:"flex",gap:0,marginBottom:0,overflowX:"auto"}}>
        {tabs.map((t,i)=><button key={i} onClick={()=>setTab(i)} style={tabStyle(i)}>{t}</button>)}
      </div>
      <div style={{background:"#fff",border:"0.5px solid #E0E7EF",borderRadius:"0 14px 14px 14px",padding:"1.5rem"}}>

        {tab===0&&<div>
          <h3 style={{fontSize:15,fontWeight:600,margin:"0 0 1rem"}}>School details</h3>
          {selectedSchoolId?<p style={{color:"#059669",fontSize:13}}>✓ Using existing school: <strong>{schools.find(s=>s.id==selectedSchoolId)?.name}</strong></p>:<>
            <Row2><Field label="School name"><input style={inp} value={newSchool.name} onChange={sc("name")} placeholder="Full school name"/></Field><Field label="EMIS number"><input style={inp} value={newSchool.emis} onChange={sc("emis")}/></Field></Row2>
            <Row2><Field label="Province"><input style={inp} value={newSchool.province} onChange={sc("province")}/></Field><Field label="District"><input style={inp} value={newSchool.district} onChange={sc("district")}/></Field></Row2>
            <Field label="Circuit"><input style={inp} value={newSchool.circuit} onChange={sc("circuit")} placeholder="e.g. F8"/></Field>
            <Row3><Field label="Capacity"><input style={inp} type="number" value={newSchool.capacity} onChange={sc("capacity")}/></Field><Field label="Mobile classrooms"><input style={inp} type="number" value={newSchool.mobiles} onChange={sc("mobiles")}/></Field><Field label="Learners per mobile"><input style={inp} type="number" value={newSchool.mobileCap} onChange={sc("mobileCap")}/></Field></Row3>
            <Row3><Field label="Enrolment"><input style={inp} type="number" value={newSchool.enrolment} onChange={sc("enrolment")}/></Field><Field label="Teachers"><input style={inp} type="number" value={newSchool.teachers} onChange={sc("teachers")}/></Field><Field label="Risk level"><select style={sel} value={newSchool.risk} onChange={sc("risk")}>{["Low","Medium","High"].map(v=><option key={v}>{v}</option>)}</select></Field></Row3>
          </>}
        </div>}

        {tab===1&&<div>
          <h3 style={{fontSize:15,fontWeight:600,margin:"0 0 1rem"}}>Audit details</h3>
          <Row2><Field label="Year"><input style={inp} type="number" value={audit.year} onChange={sa("year")}/></Field><Field label="Date"><input style={inp} type="date" value={audit.date} onChange={sa("date")}/></Field></Row2>
          <Row3><Field label="Risk level"><select style={sel} value={audit.risk} onChange={sa("risk")}>{["Low","Medium","High"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Cap. with mobiles"><input style={inp} type="number" value={audit.capWith} onChange={sa("capWith")}/></Field><Field label="Cap. without mobiles"><input style={inp} type="number" value={audit.capWithout} onChange={sa("capWithout")}/></Field></Row3>
          <Field label="Overcapacity"><select style={sel} value={audit.overcapacity} onChange={sa("overcapacity")}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field>
          <Field label="Recommendations"><textarea style={{...inp,minHeight:60,resize:"vertical"}} value={audit.recommendations} onChange={sa("recommendations")}/></Field>
          <Field label="Comments"><textarea style={{...inp,minHeight:40,resize:"vertical"}} value={audit.comments} onChange={sa("comments")}/></Field>
          <div style={{borderTop:"1.5px solid #E5E7EB",margin:"1.25rem 0 1rem",paddingTop:"1rem"}}>
            <p style={{fontSize:12,fontWeight:600,color:"#374151",margin:"0 0 0.875rem",textTransform:"uppercase"}}>🏛 School Hall</p>
            <Row2><Field label="Hall available?"><select style={sel} value={audit.hallAvailable} onChange={sa("hallAvailable")}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Overall condition"><select style={sel} value={audit.hallCondition} onChange={sa("hallCondition")} disabled={audit.hallAvailable==="No"}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field></Row2>
            {audit.hallAvailable==="Yes"&&<><Row3><Field label="Seating capacity"><input style={inp} type="number" value={audit.hallCapacity} onChange={sa("hallCapacity")}/></Field><Field label="Electricity"><select style={sel} value={audit.hallElectricity} onChange={sa("hallElectricity")}>{["Yes","No","Partial"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Toilets adjacent?"><select style={sel} value={audit.hallToilets} onChange={sa("hallToilets")}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field></Row3><Row3><Field label="Floor condition"><select style={sel} value={audit.hallFloor} onChange={sa("hallFloor")}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Roof condition"><select style={sel} value={audit.hallRoof} onChange={sa("hallRoof")}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Current usage"><input style={inp} value={audit.hallUsage} onChange={sa("hallUsage")} placeholder="e.g. Assemblies, Exams"/></Field></Row3><Field label="Known issues"><input style={inp} value={audit.hallIssues} onChange={sa("hallIssues")}/></Field></>}
          </div>
        </div>}

        {tab===2&&<div>
          <h3 style={{fontSize:15,fontWeight:600,margin:"0 0 1rem"}}>Classrooms & Furniture</h3>
          {clsRows.map((row,i)=>(
            <div key={i} style={{background:"#F9FAFB",borderRadius:10,padding:"1rem",marginBottom:"0.75rem",border:"0.5px solid #E5E7EB"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><p style={{fontWeight:500,fontSize:13,margin:0,color:"#374151"}}>Room {i+1}</p>{clsRows.length>1&&<button onClick={()=>setClsRows(p=>p.filter((_,x)=>x!==i))} style={{fontSize:11,color:"#EF4444",background:"none",border:"none",cursor:"pointer"}}>Remove</button>}</div>
              <Row3>
                <Field label="Room number"><input style={inp} value={row.room} onChange={e=>setClsRows(p=>p.map((r,x)=>x===i?{...r,room:e.target.value}:r))}/></Field>
                <Field label="Type"><select style={sel} value={row.type} onChange={e=>setClsRows(p=>p.map((r,x)=>x===i?{...r,type:e.target.value}:r))}>{["Classroom","Lab","Office","Storage"].map(v=><option key={v}>{v}</option>)}</select></Field>
                <Field label="Grade"><input style={inp} value={row.grade} onChange={e=>setClsRows(p=>p.map((r,x)=>x===i?{...r,grade:e.target.value}:r))}/></Field>
              </Row3>
              <Row3>
                <Field label="Learners"><input style={inp} type="number" value={row.learners} onChange={e=>setClsRows(p=>p.map((r,x)=>x===i?{...r,learners:e.target.value}:r))}/></Field>
                <Field label="DBE Furniture type"><select style={sel} value={row.ftype} onChange={e=>setClsRows(p=>p.map((r,x)=>x===i?{...r,ftype:e.target.value}:r))}><option value="">Select...</option>{DBE_FURNITURE.map(v=><option key={v} value={v}>{v}</option>)}</select></Field>
                <Field label="Available"><input style={inp} type="number" value={row.available} onChange={e=>setClsRows(p=>p.map((r,x)=>x===i?{...r,available:e.target.value}:r))}/></Field>
              </Row3>
              <Row3>
                <Field label="Damaged"><input style={inp} type="number" value={row.damaged} onChange={e=>setClsRows(p=>p.map((r,x)=>x===i?{...r,damaged:e.target.value}:r))}/></Field>
                <Field label="Repairable"><input style={inp} type="number" value={row.repairable} onChange={e=>setClsRows(p=>p.map((r,x)=>x===i?{...r,repairable:e.target.value}:r))}/></Field>
                <Field label="Condition"><select style={sel} value={row.condition} onChange={e=>setClsRows(p=>p.map((r,x)=>x===i?{...r,condition:e.target.value}:r))}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field>
              </Row3>
            </div>
          ))}
          <button onClick={()=>setClsRows(p=>[...p,{room:"",type:"Classroom",grade:"",spec:"",learners:"",isMobile:"No",ftype:"",category:"Learner",available:"",damaged:"",repairable:"",condition:"Good"}])} style={{fontSize:13,color:"#2563EB",background:"none",border:"0.5px solid #BFDBFE",borderRadius:8,padding:"6px 16px",cursor:"pointer"}}>+ Add another room</button>
        </div>}

        {tab===3&&<div>
          <h3 style={{fontSize:15,fontWeight:600,margin:"0 0 1rem"}}>Condition assessment</h3>
          <Row2><Field label="Flooring"><select style={sel} value={condRow.flooring} onChange={e=>setCondRow(p=>({...p,flooring:e.target.value}))}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Flooring issues"><input style={inp} value={condRow.flooringIssues} onChange={e=>setCondRow(p=>({...p,flooringIssues:e.target.value}))}/></Field></Row2>
          <Row2><Field label="Windows"><select style={sel} value={condRow.windows} onChange={e=>setCondRow(p=>({...p,windows:e.target.value}))}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Window issues"><input style={inp} value={condRow.windowIssues} onChange={e=>setCondRow(p=>({...p,windowIssues:e.target.value}))}/></Field></Row2>
          <Row3><Field label="Locks"><select style={sel} value={condRow.locks} onChange={e=>setCondRow(p=>({...p,locks:e.target.value}))}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Electricity"><select style={sel} value={condRow.electricity} onChange={e=>setCondRow(p=>({...p,electricity:e.target.value}))}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Mobile condition"><input style={inp} value={condRow.mobile} onChange={e=>setCondRow(p=>({...p,mobile:e.target.value}))}/></Field></Row3>
          <Field label="Comments"><textarea style={{...inp,minHeight:50,resize:"vertical"}} value={condRow.comments} onChange={e=>setCondRow(p=>({...p,comments:e.target.value}))}/></Field>
        </div>}

        {tab===4&&<div>
          <h3 style={{fontSize:15,fontWeight:600,margin:"0 0 1rem"}}>Repairs</h3>
          {repairRows.map((row,i)=>(
            <div key={i} style={{background:"#F9FAFB",borderRadius:10,padding:"1rem",marginBottom:"0.75rem",border:"0.5px solid #E5E7EB"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><p style={{fontWeight:500,fontSize:13,margin:0}}>Repair {i+1}</p>{repairRows.length>1&&<button onClick={()=>setRepairRows(p=>p.filter((_,x)=>x!==i))} style={{fontSize:11,color:"#EF4444",background:"none",border:"none",cursor:"pointer"}}>Remove</button>}</div>
              <Field label="DBE Furniture type"><select style={sel} value={row.ftype} onChange={e=>setRepairRows(p=>p.map((r,x)=>x===i?{...r,ftype:e.target.value}:r))}><option value="">Select...</option>{DBE_FURNITURE.map(v=><option key={v} value={v}>{v}</option>)}</select></Field>
              <Row3><Field label="Repair type"><select style={sel} value={row.repairType} onChange={e=>setRepairRows(p=>p.map((r,x)=>x===i?{...r,repairType:e.target.value}:r))}>{["Minor","Major"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Quantity"><input style={inp} type="number" value={row.qty} onChange={e=>setRepairRows(p=>p.map((r,x)=>x===i?{...r,qty:e.target.value}:r))}/></Field><Field label="Status"><select style={sel} value={row.status} onChange={e=>setRepairRows(p=>p.map((r,x)=>x===i?{...r,status:e.target.value}:r))}>{["Pending","In Progress","Completed"].map(v=><option key={v}>{v}</option>)}</select></Field></Row3>
              <Row2><Field label="Date allocated"><input style={inp} type="date" value={row.allocated} onChange={e=>setRepairRows(p=>p.map((r,x)=>x===i?{...r,allocated:e.target.value}:r))}/></Field><Field label="Destination"><select style={sel} value={row.destination} onChange={e=>setRepairRows(p=>p.map((r,x)=>x===i?{...r,destination:e.target.value}:r))}>{["Warehouse","Labour Dept"].map(v=><option key={v}>{v}</option>)}</select></Field></Row2>
            </div>
          ))}
          <button onClick={()=>setRepairRows(p=>[...p,{furnitureId:"",ftype:"",repairType:"Minor",destination:"Warehouse",qty:"",status:"Pending",allocated:"",completed:""}])} style={{fontSize:13,color:"#2563EB",background:"none",border:"0.5px solid #BFDBFE",borderRadius:8,padding:"6px 16px",cursor:"pointer"}}>+ Add repair</button>
        </div>}

        <div style={{display:"flex",justifyContent:"space-between",marginTop:"1.5rem",paddingTop:"1rem",borderTop:"0.5px solid #E5E7EB"}}>
          <button onClick={()=>setTab(t=>Math.max(0,t-1))} disabled={tab===0} style={{padding:"8px 20px",borderRadius:8,border:"0.5px solid #D1D5DB",background:"#fff",fontSize:13,cursor:tab===0?"not-allowed":"pointer",color:tab===0?"#9CA3AF":"#374151"}}>← Back</button>
          {tab<4?<button onClick={()=>setTab(t=>t+1)} style={{padding:"8px 20px",borderRadius:8,border:"none",background:"#2563EB",color:"#fff",fontSize:13,cursor:"pointer",fontWeight:600}}>Next →</button>:<button onClick={handleSaveAll} style={{padding:"8px 24px",borderRadius:8,border:"none",background:"#059669",color:"#fff",fontSize:13,cursor:"pointer",fontWeight:600}}>✓ Save all</button>}
        </div>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────
// KPA FORMS (from v77, unchanged)
// ─────────────────────────────────────────────
function UploadForm({onSave,onClose}){const [f,setF]=useState({system:"NEIMS",date:"",status:"Completed",records:"",verifiedBy:"PY Tshabangu",notes:""});const s=k=>e=>setF(p=>({...p,[k]:e.target.value}));return(<Modal title="Log data upload" onClose={onClose} onSave={()=>onSave(f)}><Row2><Field label="System"><select style={sel} value={f.system} onChange={s("system")}>{["NEIMS","EFMS","GOVERP","HRMS","Google Forms","Other"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Date uploaded"><input style={inp} type="date" value={f.date} onChange={s("date")}/></Field></Row2><Row2><Field label="Records uploaded"><input style={inp} type="number" value={f.records} onChange={s("records")}/></Field><Field label="Status"><select style={sel} value={f.status} onChange={s("status")}>{["Completed","In Progress","Pending","Failed"].map(v=><option key={v}>{v}</option>)}</select></Field></Row2><Field label="Verified by"><input style={inp} value={f.verifiedBy} onChange={s("verifiedBy")}/></Field><Field label="Notes / evidence"><textarea style={{...inp,minHeight:60,resize:"vertical"}} value={f.notes} onChange={s("notes")}/></Field></Modal>);}
function LearnerDataForm({onSave,onClose}){const [f,setF]=useState({school:"",district:"",source:"10th Day Snap Survey",date:"",enrolment:"",verified:"",variance:"",status:"Pending"});const s=k=>e=>setF(p=>({...p,[k]:e.target.value}));const calcVar=()=>setF(p=>({...p,variance:Math.abs(Number(p.enrolment||0)-Number(p.verified||0))}));return(<Modal title="Log learner data verification" onClose={onClose} onSave={()=>onSave(f)}><Row2><Field label="School name"><input style={inp} value={f.school} onChange={s("school")}/></Field><Field label="District"><input style={inp} value={f.district} onChange={s("district")}/></Field></Row2><Row2><Field label="Data source"><select style={sel} value={f.source} onChange={s("source")}>{["10th Day Snap Survey","GOVERP","HRMS","Google Forms","NEIMS","Other"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Date collected"><input style={inp} type="date" value={f.date} onChange={s("date")}/></Field></Row2><Row3><Field label="Reported enrolment"><input style={inp} type="number" value={f.enrolment} onChange={s("enrolment")} onBlur={calcVar}/></Field><Field label="Verified figure"><input style={inp} type="number" value={f.verified} onChange={s("verified")} onBlur={calcVar}/></Field><Field label="Variance (auto)"><input style={{...inp,background:"#F9FAFB",color:"#6B7280"}} value={f.variance} readOnly/></Field></Row3><Field label="Status"><select style={sel} value={f.status} onChange={s("status")}>{["Validated","Queried","Pending","Rejected"].map(v=><option key={v}>{v}</option>)}</select></Field></Modal>);}
function MobileAuditForm({schools,onSave,onClose}){const [f,setF]=useState({schoolId:"",mobileCount:"",condition:"Good",structuralIssues:"",electricityAvail:"Yes",ablutions:"Yes",recommendation:"",auditDate:"",auditedBy:"PY Tshabangu"});const s=k=>e=>setF(p=>({...p,[k]:e.target.value}));return(<Modal title="Mobile classroom audit" onClose={onClose} onSave={()=>onSave(f)}><Row2><Field label="School"><select style={sel} value={f.schoolId} onChange={s("schoolId")}><option value="">Select</option>{schools.map(sc=><option key={sc.id} value={sc.id}>{sc.name}</option>)}</select></Field><Field label="Number of mobiles"><input style={inp} type="number" value={f.mobileCount} onChange={s("mobileCount")}/></Field></Row2><Row3><Field label="Overall condition"><select style={sel} value={f.condition} onChange={s("condition")}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Electricity?"><select style={sel} value={f.electricityAvail} onChange={s("electricityAvail")}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Ablutions?"><select style={sel} value={f.ablutions} onChange={s("ablutions")}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field></Row3><Field label="Structural issues"><input style={inp} value={f.structuralIssues} onChange={s("structuralIssues")} placeholder="e.g. Roof leaks, floor damage"/></Field><Field label="Recommendation"><input style={inp} value={f.recommendation} onChange={s("recommendation")} placeholder="e.g. Repair, Replace, Monitor"/></Field><Row2><Field label="Audit date"><input style={inp} type="date" value={f.auditDate} onChange={s("auditDate")}/></Field><Field label="Audited by"><input style={inp} value={f.auditedBy} onChange={s("auditedBy")}/></Field></Row2></Modal>);}
function SchoolRequestForm({schools,onSave,onClose}){const [f,setF]=useState({schoolId:"",district:"",requestType:"Furniture",priority:"Medium",dateReceived:"",status:"Pending",assignedTo:"PY Tshabangu",dueDate:"",notes:""});const s=k=>e=>setF(p=>({...p,[k]:e.target.value}));return(<Modal title="Log school request" onClose={onClose} onSave={()=>onSave(f)}><Row2><Field label="School"><select style={sel} value={f.schoolId} onChange={s("schoolId")}><option value="">Select</option>{schools.map(sc=><option key={sc.id} value={sc.id}>{sc.name}</option>)}</select></Field><Field label="District"><input style={inp} value={f.district} onChange={s("district")}/></Field></Row2><Row3><Field label="Request type"><select style={sel} value={f.requestType} onChange={s("requestType")}>{["Furniture","Mobile Unit","Repairs","Infrastructure","Other"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Priority"><select style={sel} value={f.priority} onChange={s("priority")}>{["High","Medium","Low"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Status"><select style={sel} value={f.status} onChange={s("status")}>{["Pending","In Progress","Completed","Declined"].map(v=><option key={v}>{v}</option>)}</select></Field></Row3><Row2><Field label="Date received"><input style={inp} type="date" value={f.dateReceived} onChange={s("dateReceived")}/></Field><Field label="Due date"><input style={inp} type="date" value={f.dueDate} onChange={s("dueDate")}/></Field></Row2><Field label="Assigned to"><input style={inp} value={f.assignedTo} onChange={s("assignedTo")}/></Field><Field label="Notes"><textarea style={{...inp,minHeight:50,resize:"vertical"}} value={f.notes} onChange={s("notes")}/></Field></Modal>);}
function AdminTaskForm({onSave,onClose}){const [f,setF]=useState({type:"Payment Verification",ref:"",date:"",amount:"",supplier:"",status:"Pending",notes:""});const s=k=>e=>setF(p=>({...p,[k]:e.target.value}));return(<Modal title="Log admin task" onClose={onClose} onSave={()=>onSave(f)}><Row2><Field label="Task type"><select style={sel} value={f.type} onChange={s("type")}>{["Payment Verification","Stakeholder Enquiry","Filing / Scanning","Training","Correspondence","Other"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Reference number"><input style={inp} value={f.ref} onChange={s("ref")} placeholder="e.g. PAY-2026-001"/></Field></Row2><Row2><Field label="Date"><input style={inp} type="date" value={f.date} onChange={s("date")}/></Field><Field label="Status"><select style={sel} value={f.status} onChange={s("status")}>{["Pending","In Progress","Verified","Completed","Resolved"].map(v=><option key={v}>{v}</option>)}</select></Field></Row2><Row2><Field label="Amount (if payment)"><input style={inp} value={f.amount} onChange={s("amount")} placeholder="e.g. R 45,000"/></Field><Field label="Supplier / party"><input style={inp} value={f.supplier} onChange={s("supplier")}/></Field></Row2><Field label="Notes / evidence"><textarea style={{...inp,minHeight:50,resize:"vertical"}} value={f.notes} onChange={s("notes")}/></Field></Modal>);}


// ─────────────────────────────────────────────
// EMIS PAGE (from v77)
// ─────────────────────────────────────────────
function EmisPage({onImport}){const [search,setSearch]=useState("");const [distFilter,setDistFilter]=useState("All");const [phaseFilter,setPhaseFilter]=useState("All");const [sectorFilter,setSectorFilter]=useState("All");const [selected,setSelected]=useState(null);const [uploadedData,setUploadedData]=useState([]);const [uploadMsg,setUploadMsg]=useState("");const allData=uploadedData.length>0?uploadedData:EMIS_SAMPLE;const districts=["All",...new Set(allData.map(s=>s.district))].sort();const handleUpload=e=>{const file=e.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=ev=>{const text=ev.target.result;const sep=text.indexOf("\t")>-1?"\t":",";const lines=text.split(/\r?\n/).filter(Boolean);const hdrs=lines[0].split(sep).map(h=>h.trim().toLowerCase().replace(/['"]/g,""));const get=(row,...keys)=>{for(const k of keys){const i=hdrs.indexOf(k.toLowerCase());if(i>=0&&row[i]!==undefined)return row[i].toString().trim().replace(/^"|"$/g,"");}return "";};const phMap={primary:"Primary",secondary:"Secondary",combined:"Combined",intermediate:"Intermediate","special needs education":"Special Needs Education"};const parsed=lines.slice(1).map(line=>{const row=sep==="\t"?line.split("\t"):(line.match(/(".*?"|[^,]+)(?=,|$)/g)||line.split(","));const emis=get(row,"emiscode","emis code","emis");const name=get(row,"institution name","name","school name");if(!emis&&!name)return null;const phRaw=get(row,"institution phase","phase");return{emis,name,district:get(row,"district"),phase:phMap[phRaw.toLowerCase()]||phRaw,type:get(row,"institution type","type"),sector:get(row,"sector","legal status").toLowerCase().includes("public")?"Public":"Independent",status:get(row,"practical status of the institution","status"),city:get(row,"city/town","city","town"),province:get(row,"province")||"NC",lat:parseFloat(get(row,"latitude","lat"))||0,lng:parseFloat(get(row,"longitude","lng"))||0,email:get(row,"email"),emailAlt:get(row,"emailalt","email alt"),tel:get(row,"telephone1","tel1","telephone"),telCode:get(row,"telcode1","telcode"),circuit:get(row,"circuit"),landOwnership:get(row,"landownership","land ownership"),examCentre:get(row,"examcentre","exam centre")};}).filter(r=>{if(!r||(!r.emis&&!r.name))return false;const prov=(r.province||"").trim().toUpperCase().replace(/[^A-Z]/g,"");return prov==="NC"||prov==="NORTHERNCAPE"||prov==="NORTHERN";});setUploadedData(parsed);setUploadMsg(`✓ Loaded ${parsed.length} NC schools from ${file.name}`);};reader.readAsText(file);};const filtered=useMemo(()=>allData.filter(s=>{const q=search.toLowerCase();return(!q||s.name.toLowerCase().includes(q)||s.emis.includes(q)||(s.city||"").toLowerCase().includes(q))&&(distFilter==="All"||s.district===distFilter)&&(phaseFilter==="All"||s.phase===phaseFilter)&&(sectorFilter==="All"||s.sector===sectorFilter);}),[search,distFilter,phaseFilter,sectorFilter,allData]);
return(<div><SectionHeader title="EMIS School Database" extra={<ExportBtn label="CSV" filename="emis_schools.csv" cols={["EMIS","Name","District","Phase","Sector","City","Province","Email","Tel"]} rows={allData.map(s=>[s.emis,s.name,s.district,s.phase,s.sector,s.city,s.province,s.email,s.tel])}/>}/><Card style={{marginBottom:"1.25rem",background:"linear-gradient(135deg,#EFF6FF,#DBEAFE)",borderColor:"#BFDBFE"}}><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}><div><p style={{fontWeight:600,fontSize:14,color:"#1E40AF",margin:"0 0 2px"}}>📂 Upload full EMIS dataset</p><p style={{fontSize:12,color:"#3B82F6",margin:0}}>Upload your NC EMIS master list (.txt or .csv). Currently showing {allData.length} schools.</p>{uploadMsg&&<p style={{fontSize:12,color:"#065F46",fontWeight:600,margin:"4px 0 0"}}>{uploadMsg}</p>}</div><label style={{padding:"8px 18px",borderRadius:8,background:"#2563EB",color:"#fff",fontSize:13,cursor:"pointer",fontWeight:600,whiteSpace:"nowrap"}}>Choose file<input type="file" accept=".txt,.csv,.tsv" onChange={handleUpload} style={{display:"none"}}/></label></div></Card><div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:"1.25rem"}}><StatCard label="Total records" value={allData.length} sub="Northern Cape" color="#2563EB"/><StatCard label="Public" value={allData.filter(s=>s.sector==="Public").length} color="#059669"/><StatCard label="Independent" value={allData.filter(s=>s.sector==="Independent").length} color="#7C3AED"/><StatCard label="Districts" value={new Set(allData.map(s=>s.district)).size} color="#D97706"/></div><Card style={{marginBottom:"1rem"}}><div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:10}}><div><label style={flbl}>Search name / EMIS / town</label><input style={inp} placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div><div><label style={flbl}>District</label><select style={sel} value={distFilter} onChange={e=>setDistFilter(e.target.value)}>{districts.map(d=><option key={d}>{d}</option>)}</select></div><div><label style={flbl}>Phase</label><select style={sel} value={phaseFilter} onChange={e=>setPhaseFilter(e.target.value)}>{["All","Primary","Secondary","Combined","Intermediate"].map(p=><option key={p}>{p}</option>)}</select></div><div><label style={flbl}>Sector</label><select style={sel} value={sectorFilter} onChange={e=>setSectorFilter(e.target.value)}>{["All","Public","Independent"].map(x=><option key={x}>{x}</option>)}</select></div></div></Card><Card><p style={{fontSize:12,color:"#6B7280",margin:"0 0 10px"}}>Showing {filtered.length} of {allData.length} schools</p><DataTable cols={["EMIS","School Name","District","Phase","Sector","City","Action"]} rows={filtered} renderRow={s=>[<span style={{fontSize:12,color:"#6B7280"}}>{s.emis}</span>,<span style={{fontWeight:500}}>{s.name}</span>,s.district,<Badge val={s.phase}/>,<Badge val={s.sector}/>,s.city,<button onClick={()=>setSelected(s)} style={{fontSize:12,color:"#2563EB",background:"#EFF6FF",border:"0.5px solid #BFDBFE",borderRadius:6,padding:"3px 10px",cursor:"pointer"}}>View</button>]}/></Card>{selected&&(<Card style={{marginTop:"1rem",borderColor:"#BFDBFE"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><div><p style={{fontWeight:600,fontSize:15,margin:"0 0 2px"}}>{selected.name}</p><p style={{fontSize:12,color:"#6B7280",margin:0}}>EMIS: {selected.emis} · {selected.district}</p></div><button onClick={()=>setSelected(null)} style={{background:"none",border:"none",color:"#9CA3AF",cursor:"pointer",fontSize:18}}>✕</button></div><div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>{[["Phase",selected.phase],["Sector",selected.sector],["City/Town",selected.city],["Circuit",selected.circuit||"—"],["Land Ownership",selected.landOwnership||"—"],["Status",selected.status||"—"],["Email",selected.email||"—"],["Alt Email",selected.emailAlt||"—"],["Tel",selected.telCode&&selected.tel?`(${selected.telCode}) ${selected.tel}`:selected.tel||"—"],["Exam Centre",selected.examCentre||"—"],["Latitude",selected.lat||"—"],["Longitude",selected.lng||"—"]].map(([l,v])=><div key={l} style={{background:"#F9FAFB",borderRadius:8,padding:"8px 10px"}}><p style={{fontSize:11,color:"#6B7280",margin:"0 0 2px"}}>{l}</p><p style={{fontSize:13,fontWeight:500,margin:0,wordBreak:"break-all"}}>{v}</p></div>)}</div><button onClick={()=>{onImport(selected);setSelected(null);}} style={{padding:"8px 20px",borderRadius:8,border:"none",background:"#2563EB",color:"#fff",fontSize:13,cursor:"pointer",fontWeight:600}}>Import into Audit Schools →</button></Card>)}</div>);}


// ─────────────────────────────────────────────
// EXPORT PAGE (with backup + merge)
// ─────────────────────────────────────────────
function ExportPage({schools,audits,classrooms,furniture,conditions,repairs,warehouse,storage,distribution,onRestore,onMerge}){
  const [restoreMsg,setRestoreMsg]=useState("");const [restoreError,setRestoreError]=useState("");const [confirmRestore,setConfirmRestore]=useState(null);
  const [mergeFile,setMergeFile]=useState(null);const [mergePreview,setMergePreview]=useState(null);const [mergeMsg,setMergeMsg]=useState("");const [mergeError,setMergeError]=useState("");
  const saveBackup=()=>{const ts=new Date().toISOString().slice(0,16).replace("T","_").replace(/:/g,"-");const payload={_version:1,_saved:new Date().toISOString(),schools,audits,classrooms,furniture,conditions,repairs,warehouse,storage,distribution};const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:"application/json"}));a.download=`schoolaudit-backup-${ts}.json`;a.click();};
  const handleRestoreFile=e=>{setRestoreMsg("");setRestoreError("");setConfirmRestore(null);const file=e.target.files[0];if(!file)return;e.target.value="";const reader=new FileReader();reader.onload=ev=>{try{const data=JSON.parse(ev.target.result);if(!data._version||!data.schools)throw new Error("Not a valid SchoolAudit backup.");setConfirmRestore(data);}catch(err){setRestoreError("❌ Could not read backup: "+err.message);}};reader.readAsText(file);};
  const doRestore=()=>{if(!confirmRestore)return;onRestore(confirmRestore);setConfirmRestore(null);setRestoreMsg(`✓ Restored — ${confirmRestore.schools?.length||0} schools, ${confirmRestore.audits?.length||0} audits.`);};
  const computeMergePreview=incoming=>{const sections=[{key:"schools",local:schools},{key:"audits",local:audits},{key:"classrooms",local:classrooms},{key:"furniture",local:furniture},{key:"conditions",local:conditions},{key:"repairs",local:repairs},{key:"warehouse",local:warehouse},{key:"storage",local:storage},{key:"distribution",local:distribution}];return sections.map(({key,local})=>{const inc=incoming[key]||[];const localIds=new Set(local.map(r=>r.id));const localEmis=key==="schools"?new Set(local.map(r=>r.emis).filter(Boolean)):new Set();const added=inc.filter(r=>!localIds.has(r.id)&&!(key==="schools"&&r.emis&&localEmis.has(r.emis)));return{key,added:added.length,skipped:inc.length-added.length,newRecs:added};});};
  const handleMergeFile=e=>{setMergeMsg("");setMergeError("");setMergeFile(null);setMergePreview(null);const file=e.target.files[0];if(!file)return;e.target.value="";const reader=new FileReader();reader.onload=ev=>{try{const data=JSON.parse(ev.target.result);if(!data._version||!data.schools)throw new Error("Not a valid SchoolAudit backup.");setMergeFile({data,filename:file.name});setMergePreview(computeMergePreview(data));}catch(err){setMergeError("❌ Could not read file: "+err.message);}};reader.readAsText(file);};
  const doMerge=()=>{if(!mergeFile||!mergePreview)return;onMerge(mergePreview);const total=mergePreview.reduce((s,r)=>s+r.added,0);setMergeMsg(`✓ Merged ${total} new records from ${mergeFile.filename}.`);setMergeFile(null);setMergePreview(null);};
  const SLABELS={schools:"Schools",audits:"Audits",classrooms:"Classrooms",furniture:"Furniture",conditions:"Conditions",repairs:"Repairs",warehouse:"Warehouse",storage:"Storage",distribution:"Distribution"};
  const totalRecords=schools.length+audits.length+classrooms.length+furniture.length+conditions.length+repairs.length+warehouse.length+storage.length+distribution.length;
  const exports=[
    {label:"Schools",desc:"All audit school records",icon:"🏫",file:"schools.csv",cols:["Name","EMIS","Province","District","Capacity","Enrolment","Teachers","Risk"],rows:schools.map(s=>[s.name,s.emis,s.province,s.district,s.capacity,s.enrolment,s.teachers,s.risk])},
    {label:"Audits",desc:"All school audit records",icon:"📋",file:"audits.csv",cols:["School","Year","Date","Risk","Overcapacity","Hall Available","Hall Condition","Hall Capacity","Recommendations"],rows:audits.map(a=>{const sc=schools.find(s=>s.id==a.schoolId);return[sc?.name||"",a.year,a.date,a.risk,a.overcapacity,a.hallAvailable||"No",a.hallCondition||"",a.hallCapacity||"",a.recommendations];})},
    {label:"Classrooms",desc:"All classroom records",icon:"🚪",file:"classrooms.csv",cols:["School","Room","Type","Grade","Spec","Learners","Mobile"],rows:classrooms.map(c=>{const sc=schools.find(s=>s.id==c.schoolId);return[sc?.name||"",c.room,c.type,c.grade,c.spec,c.learners,c.isMobile];})},
    {label:"Furniture",desc:"All furniture items",icon:"🪑",file:"furniture.csv",cols:["School","Room","Category","Type","Available","Damaged","Repairable","Condition"],rows:furniture.map(f=>{const cl=classrooms.find(c=>c.id==f.classroomId);const sc=schools.find(s=>s.id==cl?.schoolId)||schools.find(s=>s.id==f.schoolId);return[sc?.name||"",cl?.room||"",f.category,f.ftype,f.available,f.damaged,f.repairable,f.condition];})},
    {label:"Conditions",desc:"Infrastructure assessments",icon:"🔍",file:"conditions.csv",cols:["School","Room","Flooring","Issues","Windows","Electricity","Locks"],rows:conditions.map(c=>{const cl=classrooms.find(r=>r.id==c.classroomId);const sc=schools.find(s=>s.id==cl?.schoolId);return[sc?.name||"",cl?.room||"",c.flooring,c.flooringIssues,c.windows,c.electricity,c.locks];})},
    {label:"Repairs",desc:"All repair jobs",icon:"🔧",file:"repairs.csv",cols:["School","Room","Furniture","Spec","DBE Type","Condition","Repair Type","Destination","Qty","Status","Allocated","Completed"],rows:repairs.map(r=>{const fu=furniture.find(f=>f.id==r.furnitureId);const cl=classrooms.find(c=>c.id==fu?.classroomId);const sc=schools.find(s=>s.id==cl?.schoolId)||schools.find(s=>s.id==fu?.schoolId);return[sc?.name||"",cl?.room?`Room ${cl.room}`:"",fu?.ftype||"",fu?.spec||"",r.ftype||"",fu?.condition||"",r.repairType,r.destination,r.qty,r.status,r.allocated,r.completed||""];})},
    {label:"Warehouse",desc:"New furniture deliveries",icon:"🏭",file:"warehouse.csv",cols:["Date","Supplier","Type","Qty","Condition","Ref","Status","Notes"],rows:warehouse.map(w=>[w.date,w.supplier,w.ftype,w.qty,w.condition,w.ref,w.status,w.notes])},
    {label:"Storage",desc:"Storage room records",icon:"📦",file:"storage.csv",cols:["School","Room","Condition","Secure","Stored Type","Qty","Usable"],rows:storage.map(r=>{const sc=schools.find(s=>s.id==r.schoolId);return[sc?.name||"",r.room,r.condition,r.secure,r.storedType,r.qty,r.usable];})},
    {label:"Distribution",desc:"Delivery and collection",icon:"🚚",file:"distribution.csv",cols:["School","Purpose","Description","Qty","Destination","Official","Date","Ref","Official Signed","Receiver Signed"],rows:distribution.map(r=>{const sc=schools.find(s=>s.id==r.schoolId);return[sc?.name||"",r.purpose,r.desc,r.qty,r.destination,r.official,r.date,r.ref,r.sigOfficial?"Yes":"No",r.sigReceiver?"Yes":"No"];})},
    {label:"Capacity Analysis",desc:"Capacity vs enrolment",icon:"📐",file:"capacity.csv",cols:["School","EMIS","Enrolment","Capacity","With Mobiles","Utilisation %","Overcapacity"],rows:schools.filter(s=>s.capacity).map(s=>{const mob=Number(s.capacity)+Number(s.mobiles)*Number(s.mobileCap);const pct=Math.round((Number(s.enrolment)/Number(s.capacity))*100);return[s.name,s.emis,s.enrolment,s.capacity,mob,pct,Number(s.enrolment)>Number(s.capacity)?"Yes":"No"];})},
    {label:"Ratio Analysis",desc:"Teacher/learner ratios",icon:"👩‍🏫",file:"ratio.csv",cols:["School","EMIS","Enrolment","Teachers","Ratio","Status"],rows:schools.map(s=>{const r=s.teachers&&s.enrolment?Math.round(Number(s.enrolment)/Number(s.teachers)):null;return[s.name,s.emis,s.enrolment,s.teachers,r?`1:${r}`:"",!r?"No data":r<=30?"Good":r<=40?"Acceptable":"Overcrowded"];})},
  ];
  return (
    <div>
      <SectionHeader title="Export / Reports"/>
      {/* Backup panel */}
      <div style={{background:"linear-gradient(135deg,#1e3a5f,#1e40af)",borderRadius:14,padding:"1.25rem 1.5rem",marginBottom:"1.5rem",color:"#fff"}}>
        <p style={{fontWeight:600,fontSize:15,margin:"0 0 4px"}}>💾 Full Data Backup & Restore</p>
        <p style={{fontSize:12,color:"rgba(255,255,255,0.7)",margin:"0 0 1rem"}}>Database: <strong style={{color:"#93C5FD"}}>{totalRecords} records</strong> across all sections.</p>
        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          <button onClick={saveBackup} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 18px",borderRadius:9,border:"none",background:"#10B981",color:"#fff",fontWeight:600,fontSize:13,cursor:"pointer"}}>⬇ Save Full Backup</button>
          <label style={{display:"flex",alignItems:"center",gap:8,padding:"10px 18px",borderRadius:9,border:"2px solid rgba(255,255,255,0.35)",background:"rgba(255,255,255,0.1)",color:"#fff",fontWeight:600,fontSize:13,cursor:"pointer"}}>⬆ Load Backup File<input type="file" accept=".json" onChange={handleRestoreFile} style={{display:"none"}}/></label>
        </div>
        {restoreMsg&&<p style={{marginTop:10,fontSize:12,color:"#6EE7B7",fontWeight:500}}>{restoreMsg}</p>}
        {restoreError&&<p style={{marginTop:10,fontSize:12,color:"#FCA5A5",fontWeight:500}}>{restoreError}</p>}
        {confirmRestore&&<div style={{marginTop:14,background:"rgba(0,0,0,0.35)",borderRadius:10,padding:"1rem 1.25rem"}}><p style={{fontWeight:600,fontSize:13,margin:"0 0 4px",color:"#FDE68A"}}>⚠ Confirm restore</p><p style={{fontSize:12,color:"rgba(255,255,255,0.8)",margin:"0 0 12px"}}>This will <strong>replace all current data</strong> with the backup saved on <strong>{confirmRestore._saved?.slice(0,10)}</strong> ({confirmRestore.schools?.length||0} schools, {confirmRestore.audits?.length||0} audits).</p><div style={{display:"flex",gap:10}}><button onClick={doRestore} style={{padding:"8px 18px",borderRadius:8,border:"none",background:"#EF4444",color:"#fff",fontWeight:600,fontSize:13,cursor:"pointer"}}>Yes, restore now</button><button onClick={()=>setConfirmRestore(null)} style={{padding:"8px 18px",borderRadius:8,border:"2px solid rgba(255,255,255,0.4)",background:"transparent",color:"#fff",fontWeight:600,fontSize:13,cursor:"pointer"}}>Cancel</button></div></div>}
      </div>
      {/* Merge panel */}
      <div style={{background:"linear-gradient(135deg,#064e3b,#065f46)",borderRadius:14,padding:"1.25rem 1.5rem",marginBottom:"1.5rem",color:"#fff"}}>
        <p style={{fontWeight:600,fontSize:15,margin:"0 0 4px"}}>🔀 Merge Another Auditor's Data</p>
        <p style={{fontSize:12,color:"rgba(255,255,255,0.7)",margin:"0 0 1rem"}}>Additive and safe — only new records are added; existing records are never overwritten.</p>
        <label style={{display:"inline-flex",alignItems:"center",gap:8,padding:"10px 18px",borderRadius:9,border:"2px solid rgba(255,255,255,0.35)",background:"rgba(255,255,255,0.1)",color:"#fff",fontWeight:600,fontSize:13,cursor:"pointer"}}>📂 Select Backup to Merge<input type="file" accept=".json" onChange={handleMergeFile} style={{display:"none"}}/></label>
        {mergeMsg&&<p style={{marginTop:10,fontSize:12,color:"#6EE7B7",fontWeight:500}}>{mergeMsg}</p>}
        {mergeError&&<p style={{marginTop:10,fontSize:12,color:"#FCA5A5",fontWeight:500}}>{mergeError}</p>}
        {mergePreview&&<div style={{marginTop:14,background:"rgba(0,0,0,0.3)",borderRadius:10,padding:"1rem 1.25rem"}}><p style={{fontWeight:600,fontSize:13,margin:"0 0 10px",color:"#FDE68A"}}>Preview — {mergeFile?.filename}</p><div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>{mergePreview.map(r=><div key={r.key} style={{background:r.added>0?"rgba(16,185,129,0.2)":"rgba(255,255,255,0.05)",borderRadius:8,padding:"8px 12px",border:r.added>0?"1px solid rgba(16,185,129,0.4)":"1px solid rgba(255,255,255,0.1)"}}><p style={{fontSize:11,color:"rgba(255,255,255,0.55)",margin:"0 0 2px",textTransform:"uppercase"}}>{SLABELS[r.key]}</p><p style={{fontSize:18,fontWeight:600,margin:0,color:r.added>0?"#6EE7B7":"rgba(255,255,255,0.35)"}}>+{r.added}</p>{r.skipped>0&&<p style={{fontSize:10,color:"rgba(255,255,255,0.4)",margin:"2px 0 0"}}>{r.skipped} already present</p>}</div>)}</div><div style={{display:"flex",gap:10}}><button onClick={doMerge} disabled={mergePreview.reduce((s,r)=>s+r.added,0)===0} style={{padding:"8px 18px",borderRadius:8,border:"none",background:mergePreview.reduce((s,r)=>s+r.added,0)>0?"#10B981":"#374151",color:"#fff",fontWeight:600,fontSize:13,cursor:mergePreview.reduce((s,r)=>s+r.added,0)>0?"pointer":"not-allowed"}}>Merge Now</button><button onClick={()=>{setMergeFile(null);setMergePreview(null);}} style={{padding:"8px 18px",borderRadius:8,border:"2px solid rgba(255,255,255,0.4)",background:"transparent",color:"#fff",fontWeight:600,fontSize:13,cursor:"pointer"}}>Cancel</button></div></div>}
      </div>
      {/* CSV exports */}
      <p style={{fontSize:13,color:"#6B7280",margin:"0 0 1rem"}}>Download individual sections as CSV files.</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
        {exports.map(e=><Card key={e.label} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:12}}><span style={{fontSize:22}}>{e.icon}</span><div><p style={{fontWeight:500,fontSize:14,margin:"0 0 2px",color:"#111827"}}>{e.label}</p><p style={{fontSize:12,color:"#6B7280",margin:0}}>{e.desc}</p></div></div><ExportBtn label="CSV" filename={e.file} cols={e.cols} rows={e.rows}/></Card>)}
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────
// DASHBOARD (with charts + audit completion)
// ─────────────────────────────────────────────
function Dashboard({schools,audits,furniture,repairs,warehouse}){
  const totalShortage=schools.reduce((a,s)=>{const sh=Number(s.enrolment||0)-Number(s.capacity||0);return a+(sh>0?sh:0);},0);
  const riskCounts={High:schools.filter(s=>s.risk==="High").length,Medium:schools.filter(s=>s.risk==="Medium").length,Low:schools.filter(s=>s.risk==="Low").length};
  const dominantRisk=riskCounts.High>0?"High":riskCounts.Medium>0?"Medium":"Low";
  const totalFurn=furniture.reduce((a,f)=>a+Number(f.available||0),0);
  const inStock=warehouse.filter(w=>w.status==="In Stock").reduce((a,w)=>a+Number(w.qty||0),0);
  const dispatched=warehouse.filter(w=>w.status==="Dispatched").reduce((a,w)=>a+Number(w.qty||0),0);
  const reserved=warehouse.filter(w=>w.status==="Reserved").reduce((a,w)=>a+Number(w.qty||0),0);
  const whIn=repairs.filter(r=>r.destination==="Warehouse").reduce((a,r)=>a+Number(r.qty||0),0);
  const whDone=repairs.filter(r=>r.destination==="Warehouse"&&r.status==="Completed").reduce((a,r)=>a+Number(r.qty||0),0);
  const whProg=repairs.filter(r=>r.destination==="Warehouse"&&r.status==="In Progress").reduce((a,r)=>a+Number(r.qty||0),0);
  const condGood=furniture.filter(f=>f.condition==="Good").reduce((a,f)=>a+Number(f.available||0),0);
  const condFair=furniture.filter(f=>f.condition==="Fair").reduce((a,f)=>a+Number(f.available||0),0);
  const condPoor=furniture.filter(f=>f.condition==="Poor").reduce((a,f)=>a+Number(f.available||0),0);
  const condTotal=condGood+condFair+condPoor;
  const auditedIds=new Set(audits.map(a=>a.schoolId?.toString()));
  return (
    <div>
      <SectionHeader title="Dashboard overview"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:"1.25rem"}}>
        <StatCard label="Total schools"          value={schools.length}                    sub="Registered"             color="#2563EB"/>
        <StatCard label="Total learner shortage" value={totalShortage.toLocaleString()}    sub="Over capacity"          color="#DC2626"/>
        <StatCard label="Total audits"           value={audits.length}                     sub="All years"              color="#7C3AED"/>
        <StatCard label="Overall risk level"     value={dominantRisk} sub={`H:${riskCounts.High} M:${riskCounts.Medium} L:${riskCounts.Low}`} color={dominantRisk==="High"?"#DC2626":dominantRisk==="Medium"?"#D97706":"#059669"}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:"1.25rem"}}>
        <StatCard label="Furniture available" value={totalFurn}       sub="Tracked items"        color="#059669"/>
        <StatCard label="High risk schools"   value={riskCounts.High} sub="Urgent action needed" color="#DC2626"/>
        <StatCard label="Warehouse in stock"  value={inStock}         sub="Ready to dispatch"    color="#2563EB"/>
        <StatCard label="Repairs in progress" value={whProg}          sub="At warehouse"         color="#D97706"/>
      </div>

      {/* Charts row 1 */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1rem"}}>
        <Card>
          <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 1rem",color:"#111827"}}>Furniture condition</h3>
          <PieChart size={140} slices={[{label:"Good",value:condGood,color:"#059669"},{label:"Fair",value:condFair,color:"#D97706"},{label:"Poor",value:condPoor,color:"#DC2626"}]}/>
          {condTotal>0&&<div style={{marginTop:12}}><HorizBar label="Good" value={condGood} max={condTotal} total={condTotal} color="#059669"/><HorizBar label="Fair" value={condFair} max={condTotal} total={condTotal} color="#D97706"/><HorizBar label="Poor" value={condPoor} max={condTotal} total={condTotal} color="#DC2626"/></div>}
        </Card>
        <Card>
          <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 1rem",color:"#111827"}}>School risk levels</h3>
          <PieChart size={140} slices={[{label:"High",value:riskCounts.High,color:"#DC2626"},{label:"Medium",value:riskCounts.Medium,color:"#D97706"},{label:"Low",value:riskCounts.Low,color:"#059669"}]}/>
          {schools.length>0&&<div style={{marginTop:12}}><HorizBar label="High" value={riskCounts.High} max={schools.length} total={schools.length} color="#DC2626"/><HorizBar label="Medium" value={riskCounts.Medium} max={schools.length} total={schools.length} color="#D97706"/><HorizBar label="Low" value={riskCounts.Low} max={schools.length} total={schools.length} color="#059669"/></div>}
        </Card>
      </div>

      {/* Charts row 2 */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1rem"}}>
        <Card>
          <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 1rem",color:"#111827"}}>Warehouse — new furniture</h3>
          <PieChart size={140} slices={[{label:"In Stock",value:inStock,color:"#059669"},{label:"Reserved",value:reserved,color:"#D97706"},{label:"Dispatched",value:dispatched,color:"#2563EB"}]}/>
        </Card>
        <Card>
          <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 1rem",color:"#111827"}}>Warehouse — repair throughput</h3>
          <PieChart size={140} slices={[{label:"Sent for repair",value:whIn,color:"#7C3AED"},{label:"Completed",value:whDone,color:"#059669"},{label:"In progress",value:whProg,color:"#D97706"}]}/>
        </Card>
      </div>

      {/* Audit completion tracker */}
      <Card style={{marginBottom:"1rem"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"1rem"}}>
          <div>
            <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 2px",color:"#111827"}}>Audit completion — all schools</h3>
            <p style={{fontSize:11,color:"#9CA3AF",margin:0}}>{auditedIds.size} of {schools.length} school{schools.length!==1?"s":""} audited{schools.length>0&&<span style={{marginLeft:8,color:"#6B7280"}}>({Math.round((auditedIds.size/schools.length)*100)}% complete)</span>}</p>
          </div>
          <span style={{fontSize:22,fontWeight:700,color:auditedIds.size===schools.length&&schools.length>0?"#059669":auditedIds.size===0?"#DC2626":"#D97706"}}>{auditedIds.size}/{schools.length}</span>
        </div>
        <div style={{background:"#F3F4F6",borderRadius:999,height:8,marginBottom:"1.25rem",overflow:"hidden"}}>
          <div style={{width:schools.length>0?`${Math.round((auditedIds.size/schools.length)*100)}%`:"0%",height:"100%",background:"#059669",borderRadius:999}}/>
        </div>
        {schools.length===0&&<p style={{fontSize:13,color:"#9CA3AF",textAlign:"center"}}>No schools registered yet.</p>}
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {schools.map(school=>{
            const schoolAudits=audits.filter(a=>a.schoolId?.toString()===school.id?.toString());
            const latest=schoolAudits.sort((a,b)=>(b.date||"").localeCompare(a.date||""))[0];
            const audited=schoolAudits.length>0;
            const statusColor=!audited?"#DC2626":latest?.risk==="High"?"#D97706":"#059669";
            const statusBg=!audited?"#FEF2F2":latest?.risk==="High"?"#FFFBEB":"#F0FDF4";
            return(
              <div key={school.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:10,background:statusBg,border:`1px solid ${statusColor}22`}}>
                <div style={{width:10,height:10,borderRadius:"50%",background:statusColor,flexShrink:0}}/>
                <div style={{flex:1,minWidth:0}}>
                  <p style={{fontSize:13,fontWeight:500,color:"#111827",margin:"0 0 1px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{school.name}</p>
                  <p style={{fontSize:11,color:"#6B7280",margin:0}}>{school.district||"—"}</p>
                </div>
                {audited&&<div style={{textAlign:"center",flexShrink:0}}><p style={{fontSize:15,fontWeight:700,color:"#374151",margin:0}}>{schoolAudits.length}</p><p style={{fontSize:9,color:"#9CA3AF",margin:0,textTransform:"uppercase"}}>audit{schoolAudits.length!==1?"s":""}</p></div>}
                <div style={{textAlign:"right",flexShrink:0,minWidth:80}}>
                  {audited?<><p style={{fontSize:12,color:"#374151",margin:"0 0 1px",fontWeight:500}}>{latest?.date||"—"}</p><p style={{fontSize:10,color:"#9CA3AF",margin:0}}>last audit</p></>:<p style={{fontSize:11,color:"#9CA3AF",margin:0}}>No audit yet</p>}
                </div>
                <span style={{display:"inline-block",padding:"3px 10px",borderRadius:999,fontSize:11,fontWeight:600,background:statusColor+"22",color:statusColor,flexShrink:0}}>
                  {!audited?"Not audited":`Audited${latest?.risk?` · ${latest.risk}`:""}`}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <h3 style={{fontSize:15,fontWeight:500,margin:"0 0 1rem",color:"#111827"}}>Recent audits</h3>
        <DataTable cols={["School","Year","Date","Risk","Overcapacity"]} rows={audits.slice(-5).reverse()}
          renderRow={r=>{const sc=schools.find(s=>s.id==r.schoolId);return[sc?.name||"—",r.year,r.date,<Badge val={r.risk}/>,<Badge val={r.overcapacity}/>];}}/>
      </Card>
    </div>
  );
}


// ─────────────────────────────────────────────
// KPA DASHBOARD
// ─────────────────────────────────────────────
function KpaDashboard({uploads,learnerData,mobileAudit,schoolRequests,adminTasks,setActive}){
  const kpas=[
    {id:"kpa1",icon:"🖥️",label:"KPA 1 — Data Uploads",weight:"30%",color:"#2563EB",done:uploads.filter(u=>u.status==="Completed").length,total:uploads.length},
    {id:"kpa2",icon:"📈",label:"KPA 2 — Learner Data",weight:"20%",color:"#7C3AED",done:learnerData.filter(u=>u.status==="Validated").length,total:learnerData.length},
    {id:"kpa3",icon:"🚌",label:"KPA 3 — Mobile Audit",weight:"20%",color:"#059669",done:mobileAudit.filter(u=>u.condition==="Good").length,total:mobileAudit.length},
    {id:"kpa4",icon:"🏗️",label:"KPA 4 — School Requests",weight:"15%",color:"#D97706",done:schoolRequests.filter(u=>u.status==="Completed").length,total:schoolRequests.length},
    {id:"kpa5",icon:"🗂️",label:"KPA 5 — Admin & Payments",weight:"15%",color:"#DC2626",done:adminTasks.filter(u=>["Verified","Completed","Resolved"].includes(u.status)).length,total:adminTasks.length},
  ];
  return(
    <div>
      <div style={{background:"linear-gradient(135deg,#1e3a5f,#1e40af)",borderRadius:14,padding:"1.5rem",marginBottom:"1.5rem",color:"#fff"}}>
        <p style={{fontSize:12,color:"rgba(255,255,255,0.6)",margin:"0 0 4px",textTransform:"uppercase",letterSpacing:"0.08em"}}>Northern Cape Department of Education</p>
        <h2 style={{fontSize:20,fontWeight:700,margin:"0 0 4px"}}>EPMDS Performance Dashboard</h2>
        <p style={{fontSize:13,color:"rgba(255,255,255,0.7)",margin:"0 0 1rem"}}>PY Tshabangu · Senior Administration Officer · Physical Resources Planning · 2026/2027</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10}}>
          {[["Total Weight","100%"],["KPAs","5"],["Cycle","2026/2027"],["Supervisor","A Ralph"],["Own Rating","3 — Fully Effective"]].map(([l,v])=>(
            <div key={l} style={{background:"rgba(255,255,255,0.12)",borderRadius:10,padding:"10px 12px"}}><p style={{fontSize:11,color:"rgba(255,255,255,0.6)",margin:"0 0 2px"}}>{l}</p><p style={{fontSize:14,fontWeight:600,margin:0}}>{v}</p></div>
          ))}
        </div>
      </div>
      <div style={{display:"grid",gap:"1rem"}}>
        {kpas.map(k=>{const pct=k.total>0?Math.round((k.done/k.total)*100):0;return(
          <Card key={k.id} style={{cursor:"pointer"}} onClick={()=>setActive(k.id)}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:22}}>{k.icon}</span><div><p style={{fontWeight:500,fontSize:14,margin:"0 0 2px",color:"#111827"}}>{k.label}</p><p style={{fontSize:12,color:"#6B7280",margin:0}}>Weight: {k.weight} · {k.done}/{k.total} tasks complete · Click to view</p></div></div>
              <div style={{textAlign:"right"}}><p style={{fontSize:22,fontWeight:700,color:k.color,margin:"0 0 2px"}}>{pct}%</p><p style={{fontSize:11,color:"#9CA3AF",margin:0}}>completed</p></div>
            </div>
            <div style={{background:"#F3F4F6",borderRadius:999,height:8,overflow:"hidden"}}><div style={{width:`${pct}%`,height:"100%",background:k.color,borderRadius:999}}/></div>
          </Card>
        );})}
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────
function App(){
  const [active,         setActive]         = useState("dashboard");
  const [modal,          setModal]          = useState(null);
  const [schools,        setSchools]        = useState(()=>loadFromLS("schools",initSchools));
  const [audits,         setAudits]         = useState(()=>loadFromLS("audits",initAudits));
  const [classrooms,     setClassrooms]     = useState(()=>loadFromLS("classrooms",initClassrooms));
  const [furniture,      setFurniture]      = useState(()=>loadFromLS("furniture",initFurniture));
  const [repairs,        setRepairs]        = useState(()=>loadFromLS("repairs",initRepairs));
  const [storage,        setStorage]        = useState(()=>loadFromLS("storage",initStorage));
  const [distribution,   setDistribution]   = useState(()=>loadFromLS("distribution",initDistribution));
  const [conditions,     setConditions]     = useState(()=>loadFromLS("conditions",initConditions));
  const [warehouse,      setWarehouse]      = useState(()=>loadFromLS("warehouse",initWarehouse));
  const [uploads,        setUploads]        = useState(()=>loadFromLS("uploads",initUploads));
  const [learnerData,    setLearnerData]    = useState(()=>loadFromLS("learnerData",initLearnerData));
  const [mobileAudit,    setMobileAudit]    = useState(()=>loadFromLS("mobileAudit",initMobileAudit));
  const [schoolRequests, setSchoolRequests] = useState(()=>loadFromLS("schoolRequests",initSchoolRequests));
  const [adminTasks,     setAdminTasks]     = useState(()=>loadFromLS("adminTasks",initAdminTasks));
  const [toast,          setToast]          = useState(null);

  // Persist to localStorage
  useEffect(()=>localStorage.setItem("schools",       JSON.stringify(schools)),        [schools]);
  useEffect(()=>localStorage.setItem("audits",        JSON.stringify(audits)),         [audits]);
  useEffect(()=>localStorage.setItem("classrooms",    JSON.stringify(classrooms)),     [classrooms]);
  useEffect(()=>localStorage.setItem("furniture",     JSON.stringify(furniture)),      [furniture]);
  useEffect(()=>localStorage.setItem("repairs",       JSON.stringify(repairs)),        [repairs]);
  useEffect(()=>localStorage.setItem("storage",       JSON.stringify(storage)),        [storage]);
  useEffect(()=>localStorage.setItem("distribution",  JSON.stringify(distribution)),   [distribution]);
  useEffect(()=>localStorage.setItem("conditions",    JSON.stringify(conditions)),     [conditions]);
  useEffect(()=>localStorage.setItem("warehouse",     JSON.stringify(warehouse)),      [warehouse]);
  useEffect(()=>localStorage.setItem("uploads",       JSON.stringify(uploads)),        [uploads]);
  useEffect(()=>localStorage.setItem("learnerData",   JSON.stringify(learnerData)),    [learnerData]);
  useEffect(()=>localStorage.setItem("mobileAudit",   JSON.stringify(mobileAudit)),    [mobileAudit]);
  useEffect(()=>localStorage.setItem("schoolRequests",JSON.stringify(schoolRequests)), [schoolRequests]);
  useEffect(()=>localStorage.setItem("adminTasks",    JSON.stringify(adminTasks)),     [adminTasks]);

  const add = setter => data => { setter(p=>[...p,{...data,id:uid()}]); setModal(null); };
  const showToast = msg => { setToast(msg); setTimeout(()=>setToast(null),3000); };

  const restoreAll = data => {
    if(data.schools)      setSchools(data.schools);
    if(data.audits)       setAudits(data.audits);
    if(data.classrooms)   setClassrooms(data.classrooms);
    if(data.furniture)    setFurniture(data.furniture);
    if(data.conditions)   setConditions(data.conditions);
    if(data.repairs)      setRepairs(data.repairs);
    if(data.warehouse)    setWarehouse(data.warehouse);
    if(data.storage)      setStorage(data.storage);
    if(data.distribution) setDistribution(data.distribution);
    showToast("✓ Backup restored successfully.");
  };

  const mergeAll = preview => {
    preview.forEach(({key,newRecs})=>{
      if(!newRecs||!newRecs.length) return;
      if(key==="schools")      setSchools(p=>[...p,...newRecs]);
      if(key==="audits")       setAudits(p=>[...p,...newRecs]);
      if(key==="classrooms")   setClassrooms(p=>[...p,...newRecs]);
      if(key==="furniture")    setFurniture(p=>[...p,...newRecs]);
      if(key==="conditions")   setConditions(p=>[...p,...newRecs]);
      if(key==="repairs")      setRepairs(p=>[...p,...newRecs]);
      if(key==="warehouse")    setWarehouse(p=>[...p,...newRecs]);
      if(key==="storage")      setStorage(p=>[...p,...newRecs]);
      if(key==="distribution") setDistribution(p=>[...p,...newRecs]);
    });
    showToast(`✓ Merged ${preview.reduce((s,r)=>s+r.added,0)} new records.`);
  };

  const importSchool = emis => {
    if(schools.find(s=>s.emis===emis.emis)){showToast(`"${emis.name}" already exists.`);return;}
    setSchools(p=>[...p,{id:uid(),name:emis.name,emis:emis.emis,province:emis.province,district:emis.district,circuit:emis.circuit||"",capacity:"",mobiles:"",mobileCap:35,enrolment:"",teachers:"",risk:"Low"}]);
    showToast(`✓ "${emis.name}" imported.`);
    setActive("schools");
  };

  const saveCaptureAll = ({school,audit,classrooms:cls,furniture:fu,condition,repairs:reps})=>{
    if(school) setSchools(p=>[...p,school]);
    if(audit)  setAudits(p=>[...p,audit]);
    if(cls?.length)  setClassrooms(p=>[...p,...cls]);
    if(fu?.length)   setFurniture(p=>[...p,...fu]);
    if(condition)    setConditions(p=>[...p,condition]);
    if(reps?.length) setRepairs(p=>[...p,...reps]);
  };

  const scName = id => schools.find(s=>s.id==id)?.name||"—";

  const renderPage = () => { switch(active){

    case "dashboard": return <Dashboard schools={schools} audits={audits} furniture={furniture} repairs={repairs} warehouse={warehouse}/>;
    case "emis":      return <EmisPage onImport={importSchool}/>;
    case "capture":   return <SchoolCapturePage schools={schools} classrooms={classrooms} furniture={furniture} conditions={conditions} repairs={repairs} onSaveAll={saveCaptureAll} showToast={showToast}/>;
    case "export":    return <ExportPage schools={schools} audits={audits} classrooms={classrooms} furniture={furniture} conditions={conditions} repairs={repairs} warehouse={warehouse} storage={storage} distribution={distribution} onRestore={restoreAll} onMerge={mergeAll}/>;

    case "schools": return (
      <div>
        <SectionHeader title="Audit Schools" onAdd={()=>setModal("school")} extra={<ExportBtn label="CSV" filename="schools.csv" cols={["Name","EMIS","Province","District","Capacity","Enrolment","Teachers","Risk"]} rows={schools.map(s=>[s.name,s.emis,s.province,s.district,s.capacity,s.enrolment,s.teachers,s.risk])}/>}/>
        <div style={{display:"grid",gap:"1rem"}}>
          {schools.length===0&&<Card><p style={{color:"#9CA3AF",textAlign:"center"}}>No schools yet. Use + Add record or import from EMIS Database.</p></Card>}
          {schools.map(s=>{const over=Number(s.enrolment)>Number(s.capacity);const shortage=over?Number(s.enrolment)-Number(s.capacity):0;return(
            <Card key={s.id}>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <div>
                  <p style={{fontWeight:600,fontSize:15,margin:"0 0 4px",color:"#111827"}}>{s.name}</p>
                  <p style={{fontSize:12,color:"#6B7280",margin:"0 0 10px"}}>EMIS: {s.emis} · {s.district}, {s.province}{s.circuit?` · Circuit: ${s.circuit}`:""}</p>
                  <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
                    {[["Enrolment",s.enrolment],["Teachers",s.teachers],["Capacity",s.capacity],["Mobiles",s.mobiles]].map(([l,v])=><span key={l} style={{fontSize:12,color:"#6B7280"}}>{l}: <strong style={{color:"#111827"}}>{v||"—"}</strong></span>)}
                    {shortage>0&&<span style={{fontSize:12,color:"#DC2626",fontWeight:500}}>Shortage: {shortage}</span>}
                  </div>
                </div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8}}>
                  <Badge val={s.risk}/>
                  {s.enrolment&&s.capacity&&<span style={{fontSize:12,color:over?"#DC2626":"#059669"}}>{over?"⚠ Overcapacity":"✓ Within capacity"}</span>}
                </div>
              </div>
            </Card>
          );})}
        </div>
      </div>
    );

    case "audits": return (
      <div>
        <SectionHeader title="Audits" onAdd={()=>setModal("audit")} extra={<ExportBtn label="CSV" filename="audits.csv" cols={["School","Year","Date","Risk","Overcapacity","Hall Available","Hall Condition","Recommendations"]} rows={audits.map(a=>[scName(a.schoolId),a.year,a.date,a.risk,a.overcapacity,a.hallAvailable||"No",a.hallCondition||"",a.recommendations])}/>}/>
        <Card>
          <DataTable cols={["School","Year","Date","Risk","Overcapacity","Hall","Recommendations"]} rows={audits}
            renderRow={r=>[scName(r.schoolId),r.year,r.date,<Badge val={r.risk}/>,<Badge val={r.overcapacity}/>,r.hallAvailable==="Yes"?<Badge val={r.hallCondition}/>:<span style={{fontSize:11,color:"#9CA3AF"}}>No hall</span>,<span style={{color:"#6B7280",fontSize:12}}>{r.recommendations}</span>]}/>
        </Card>
      </div>
    );

    case "classrooms": return (
      <div>
        <SectionHeader title="Classrooms & Furniture" onAdd={()=>setModal("classroom")} extra={<ExportBtn label="CSV" filename="classrooms.csv" cols={["School","Room","Type","Grade","Spec","Learners","Mobile"]} rows={classrooms.map(c=>[scName(c.schoolId),c.room,c.type,c.grade,c.spec,c.learners,c.isMobile])}/>}/>
        <Card style={{marginBottom:"1rem"}}>
          <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 0.75rem"}}>Classrooms</h3>
          <DataTable cols={["School","Room","Type","Grade","Spec","Learners","Mobile"]} rows={classrooms}
            renderRow={r=>[scName(r.schoolId),r.room,r.type,r.grade,r.spec,r.learners,<Badge val={r.isMobile}/>]}/>
        </Card>
        <SectionHeader title="Furniture" onAdd={()=>setModal("furniture")} extra={<ExportBtn label="CSV" filename="furniture.csv" cols={["School","Room","Category","Type","Available","Damaged","Repairable","Condition"]} rows={furniture.map(f=>{const cl=classrooms.find(c=>c.id==f.classroomId);const sc=schools.find(s=>s.id==cl?.schoolId)||schools.find(s=>s.id==f.schoolId);return[sc?.name||"",cl?.room||"",f.category,f.ftype,f.available,f.damaged,f.repairable,f.condition];})}/>}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:"1rem"}}>
          <StatCard label="Total available" value={furniture.reduce((a,f)=>a+Number(f.available||0),0)} color="#2563EB"/>
          <StatCard label="Damaged"         value={furniture.reduce((a,f)=>a+Number(f.damaged||0),0)}   color="#DC2626"/>
          <StatCard label="Repairable"      value={furniture.reduce((a,f)=>a+Number(f.repairable||0),0)}color="#D97706"/>
        </div>
        <Card>
          <DataTable cols={["School","Room","Category","Type","Available","Damaged","Repairable","Condition","Photo"]} rows={furniture}
            renderRow={r=>{const cl=classrooms.find(c=>c.id==r.classroomId);const sc=schools.find(s=>s.id==cl?.schoolId)||schools.find(s=>s.id==r.schoolId);return[sc?.name||"—",cl?.room||"—",r.category,r.ftype,r.available,r.damaged,r.repairable,<Badge val={r.condition}/>,r.photoData?<a href={r.photoData} target="_blank" rel="noreferrer"><img src={r.photoData} alt="photo" style={{width:36,height:36,objectFit:"cover",borderRadius:4,border:"1px solid #E5E7EB",cursor:"pointer"}}/></a>:<span style={{color:"#D1D5DB",fontSize:11}}>—</span>];}}/>
        </Card>
      </div>
    );

    case "conditions": return (
      <div>
        <SectionHeader title="Condition assessments" onAdd={()=>setModal("condition")} extra={<ExportBtn label="CSV" filename="conditions.csv" cols={["School","Room","Flooring","Issues","Windows","Electricity","Locks"]} rows={conditions.map(c=>{const cl=classrooms.find(r=>r.id==c.classroomId);return[scName(cl?.schoolId),cl?.room||"",c.flooring,c.flooringIssues,c.windows,c.electricity,c.locks];})}/>}/>
        <Card>
          <DataTable cols={["School","Room","Flooring","Issues","Windows","Electricity","Locks","Photos"]} rows={conditions}
            renderRow={c=>{const cl=classrooms.find(r=>r.id==c.classroomId);const photos=c.photos||[];return[scName(cl?.schoolId),cl?.room||"?",<Badge val={c.flooring}/>,c.flooringIssues||"—",<Badge val={c.windows}/>,<Badge val={c.electricity}/>,<Badge val={c.locks}/>,photos.length>0?<div style={{display:"flex",gap:4}}>{photos.map((ph,i)=><a key={i} href={ph.data} target="_blank" rel="noreferrer"><img src={ph.data} alt="" style={{width:36,height:36,objectFit:"cover",borderRadius:4,border:"1px solid #E5E7EB",cursor:"pointer"}}/></a>)}</div>:<span style={{color:"#D1D5DB",fontSize:11}}>—</span>];}}/>
        </Card>
      </div>
    );

    case "repairs": return (
      <div>
        <SectionHeader title="Repairs & refurbishment" onAdd={()=>setModal("repair")} extra={<ExportBtn label="CSV" filename="repairs.csv" cols={["School","Room","Furniture","Spec","DBE Type","Condition","Repair Type","Destination","Qty","Status","Allocated","Completed"]} rows={repairs.map(r=>{const fu=furniture.find(f=>f.id==r.furnitureId);const cl=classrooms.find(c=>c.id==fu?.classroomId);const sc=schools.find(s=>s.id==cl?.schoolId)||schools.find(s=>s.id==fu?.schoolId);return[sc?.name||"",cl?.room?`Room ${cl.room}`:"",fu?.ftype||"",fu?.spec||"",r.ftype||"",fu?.condition||"",r.repairType,r.destination,r.qty,r.status,r.allocated,r.completed||""];})}/>}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:"1.5rem"}}>
          {["Completed","In Progress","Pending"].map(st=><StatCard key={st} label={st} value={repairs.filter(r=>r.status===st).length} color={st==="Completed"?"#059669":st==="In Progress"?"#2563EB":"#D97706"}/>)}
        </div>
        <Card>
          <DataTable cols={["School Collected From","Room","Furniture","DBE Type","Condition","Repair Type","Destination","Qty","Status","Allocated","Completed"]} rows={repairs}
            renderRow={r=>{const fu=furniture.find(f=>f.id==r.furnitureId);const cl=classrooms.find(c=>c.id==fu?.classroomId);const sc=schools.find(s=>s.id==cl?.schoolId)||schools.find(s=>s.id==fu?.schoolId);return[sc?<span style={{fontWeight:500,color:"#1e3a5f"}}>{sc.name}</span>:<span style={{color:"#9CA3AF",fontSize:11}}>—</span>,cl?.room?`Room ${cl.room}`:<span style={{color:"#9CA3AF",fontSize:11}}>—</span>,fu?<span>{fu.ftype}{fu.spec?<span style={{fontSize:11,color:"#6B7280"}}> ({fu.spec})</span>:""}</span>:"—",r.ftype||<span style={{color:"#9CA3AF",fontSize:11}}>—</span>,fu?.condition?<Badge val={fu.condition}/>:<span style={{color:"#9CA3AF",fontSize:11}}>—</span>,r.repairType,r.destination,r.qty,<Badge val={r.status}/>,r.allocated,r.completed||"—"];}}/>
        </Card>
      </div>
    );

    case "warehouse": return (
      <div>
        <SectionHeader title="Warehouse — new furniture" onAdd={()=>setModal("warehouse")} extra={<ExportBtn label="CSV" filename="warehouse.csv" cols={["Date","Supplier","Type","Qty","Condition","Ref","Status","Notes"]} rows={warehouse.map(w=>[w.date,w.supplier,w.ftype,w.qty,w.condition,w.ref,w.status,w.notes])}/>}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:"1.5rem"}}>
          <StatCard label="In stock"   value={warehouse.filter(w=>w.status==="In Stock").reduce((a,w)=>a+Number(w.qty||0),0)}   color="#059669"/>
          <StatCard label="Reserved"   value={warehouse.filter(w=>w.status==="Reserved").reduce((a,w)=>a+Number(w.qty||0),0)}   color="#D97706"/>
          <StatCard label="Dispatched" value={warehouse.filter(w=>w.status==="Dispatched").reduce((a,w)=>a+Number(w.qty||0),0)} color="#2563EB"/>
        </div>
        <Card>
          <DataTable cols={["Date","Supplier","Furniture type","Qty","Condition","Received by","Ref","Status","Notes"]} rows={warehouse}
            renderRow={w=>[w.date,w.supplier,w.ftype,w.qty,<Badge val={w.condition}/>,w.receivedBy,w.ref,<Badge val={w.status}/>,<span style={{fontSize:12,color:"#6B7280"}}>{w.notes}</span>]}/>
        </Card>
      </div>
    );

    case "storage": return (
      <div>
        <SectionHeader title="Storage" onAdd={()=>setModal("storage")} extra={<ExportBtn label="CSV" filename="storage.csv" cols={["School","Room","Condition","Secure","Stored Type","Qty","Usable"]} rows={storage.map(r=>[scName(r.schoolId),r.room,r.condition,r.secure,r.storedType,r.qty,r.usable])}/>}/>
        <Card>
          <DataTable cols={["School","Room","Condition","Secure","Stored items","Qty","Usable"]} rows={storage}
            renderRow={r=>[scName(r.schoolId),r.room,<Badge val={r.condition}/>,<Badge val={r.secure}/>,r.storedType,r.qty,<Badge val={r.usable}/>]}/>
        </Card>
      </div>
    );

    case "distribution": return (
      <div>
        <SectionHeader title="Distribution" onAdd={()=>setModal("distribution")} extra={<ExportBtn label="CSV" filename="distribution.csv" cols={["School","Purpose","Description","Qty","Destination","Official","Date","Ref","Official Signed","Receiver Signed"]} rows={distribution.map(r=>[scName(r.schoolId),r.purpose,r.desc,r.qty,r.destination,r.official,r.date,r.ref,r.sigOfficial?"Yes":"No",r.sigReceiver?"Yes":"No"])}/>}/>
        <Card>
          <DataTable cols={["School","Purpose","Description","Qty","Official","Date","Ref","Proof","Signatures"]} rows={distribution}
            renderRow={r=>{const sigs=[r.sigOfficial,r.sigReceiver].filter(Boolean);return[scName(r.schoolId),r.purpose,r.desc,r.qty,r.official,r.date,r.ref,r.proofData?<a href={r.proofData} target="_blank" rel="noreferrer" style={{color:"#2563EB",textDecoration:"underline",fontSize:12}}>{r.proofName||"View proof"}</a>:<span style={{color:"#9CA3AF",fontSize:12}}>—</span>,sigs.length>0?<div style={{display:"flex",gap:4}}>{sigs.map((sig,i)=><a key={i} href={sig} target="_blank" rel="noreferrer"><img src={sig} alt="" style={{height:32,width:80,objectFit:"contain",border:"1px solid #E5E7EB",borderRadius:4,background:"#F9FAFB",cursor:"pointer"}}/></a>)}</div>:<span style={{color:"#9CA3AF",fontSize:12}}>—</span>];}}/>
        </Card>
      </div>
    );

    case "capacity": return (
      <div>
        <SectionHeader title="Capacity analysis" extra={<ExportBtn label="CSV" filename="capacity.csv" cols={["School","Enrolment","Capacity","With Mobiles","Utilisation","Overcapacity"]} rows={schools.filter(s=>s.capacity).map(s=>{const mob=Number(s.capacity)+Number(s.mobiles)*Number(s.mobileCap);const pct=Math.round((Number(s.enrolment)/Number(s.capacity))*100);return[s.name,s.enrolment,s.capacity,mob,pct+"%",Number(s.enrolment)>Number(s.capacity)?"Yes":"No"];})}/>}/>
        {!schools.some(s=>s.capacity)&&<Card><p style={{textAlign:"center",color:"#9CA3AF",fontSize:13}}>No capacity data yet.</p></Card>}
        <div style={{display:"grid",gap:"1rem"}}>
          {schools.filter(s=>s.capacity).map(s=>{const mobCap=Number(s.capacity)+Number(s.mobiles)*Number(s.mobileCap);const pct=Math.round((Number(s.enrolment)/Number(s.capacity))*100);const over=Number(s.enrolment)>Number(s.capacity);return(
            <Card key={s.id}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><p style={{fontWeight:500,fontSize:15,margin:0}}>{s.name}</p><Badge val={over?"Yes":"No"}/></div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:14}}>
                {[["Enrolment",s.enrolment,"#111827"],["Cap. no mobiles",s.capacity,"#111827"],["Cap. with mobiles",mobCap,"#111827"],["Utilisation",`${pct}%`,over?"#DC2626":"#059669"]].map(([l,v,c])=><div key={l} style={{background:"#F9FAFB",borderRadius:8,padding:"10px 14px"}}><p style={{fontSize:11,color:"#6B7280",margin:"0 0 4px"}}>{l}</p><p style={{fontSize:20,fontWeight:600,margin:0,color:c}}>{v}</p></div>)}
              </div>
              <div style={{background:"#F3F4F6",borderRadius:999,height:8,overflow:"hidden"}}><div style={{width:`${Math.min(pct,100)}%`,height:"100%",background:over?"#DC2626":"#2563EB",borderRadius:999}}/></div>
            </Card>
          );})}
        </div>
      </div>
    );

    case "ratio": return (
      <div>
        <SectionHeader title="Teacher / Learner ratio analysis" extra={<ExportBtn label="CSV" filename="ratio.csv" cols={["School","Enrolment","Teachers","Ratio","Status"]} rows={schools.map(s=>{const r=s.teachers&&s.enrolment?Math.round(Number(s.enrolment)/Number(s.teachers)):null;return[s.name,s.enrolment,s.teachers,r?`1:${r}`:"",!r?"No data":r<=30?"Good":r<=40?"Acceptable":"Overcrowded"];})}/>}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:"1.5rem"}}>
          <StatCard label="Total learners" value={schools.reduce((a,s)=>a+Number(s.enrolment||0),0)} color="#2563EB"/>
          <StatCard label="Total teachers" value={schools.reduce((a,s)=>a+Number(s.teachers||0),0)}  color="#7C3AED"/>
          <StatCard label="Avg. ratio" value={()=>{const t=schools.reduce((a,s)=>a+Number(s.teachers||0),0);const l=schools.reduce((a,s)=>a+Number(s.enrolment||0),0);return t>0?`1:${Math.round(l/t)}`:"—";}()} color="#059669"/>
        </div>
        <div style={{display:"grid",gap:"1rem"}}>
          {schools.filter(s=>s.teachers&&s.enrolment).map(s=>{const ratio=Math.round(Number(s.enrolment)/Number(s.teachers));const pct=Math.min(Math.round((ratio/50)*100),150);const color=ratio<=30?"#059669":ratio<=40?"#D97706":"#DC2626";const status=ratio<=30?"Good":ratio<=40?"Acceptable":"Overcrowded";return(
            <Card key={s.id}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><div><p style={{fontWeight:500,fontSize:15,margin:"0 0 2px"}}>{s.name}</p><p style={{fontSize:12,color:"#6B7280",margin:0}}>{s.district}</p></div><span style={{background:color+"22",color,padding:"3px 12px",borderRadius:999,fontSize:12,fontWeight:600}}>{status}</span></div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:14}}>
                {[["Learners",s.enrolment,"#111827"],["Teachers",s.teachers,"#111827"],["Ratio",`1:${ratio}`,color],["Ideal","1:35","#6B7280"]].map(([l,v,c])=><div key={l} style={{background:"#F9FAFB",borderRadius:8,padding:"10px 14px"}}><p style={{fontSize:11,color:"#6B7280",margin:"0 0 4px"}}>{l}</p><p style={{fontSize:20,fontWeight:600,margin:0,color:c}}>{v}</p></div>)}
              </div>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:11,color:"#9CA3AF",width:30}}>0</span>
                <div style={{flex:1,background:"#F3F4F6",borderRadius:999,height:8,overflow:"hidden",position:"relative"}}><div style={{width:`${pct}%`,height:"100%",background:color,borderRadius:999}}/><div style={{position:"absolute",left:`${(35/50)*100}%`,top:0,width:2,height:"100%",background:"#9CA3AF"}}/></div>
                <span style={{fontSize:11,color:"#9CA3AF",width:30,textAlign:"right"}}>50+</span>
              </div>
            </Card>
          );})}
        </div>
      </div>
    );

    case "kpa":  return <KpaDashboard uploads={uploads} learnerData={learnerData} mobileAudit={mobileAudit} schoolRequests={schoolRequests} adminTasks={adminTasks} setActive={setActive}/>;
    case "kpa1": return (
      <div><SectionHeader title="KPA 1 — Data Uploads (NEIMS / EFMS / GOVERP)" onAdd={()=>setModal("upload")} extra={<ExportBtn label="CSV" filename="kpa1_uploads.csv" cols={["System","Date","Status","Records","Verified By","Notes"]} rows={uploads.map(u=>[u.system,u.date,u.status,u.records,u.verifiedBy,u.notes])}/>}/>
      <KpaNote weight="30%" target="Daily" description="Verify and monitor captured data across NEIMS, EFMS and GOVERP."/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:"1.5rem"}}><StatCard label="Total uploads" value={uploads.length} color="#2563EB"/><StatCard label="Completed" value={uploads.filter(u=>u.status==="Completed").length} color="#059669"/><StatCard label="In progress" value={uploads.filter(u=>u.status==="In Progress").length} color="#D97706"/><StatCard label="Total records" value={uploads.reduce((a,u)=>a+Number(u.records||0),0).toLocaleString()} color="#7C3AED"/></div>
      <Card><DataTable cols={["System","Date","Records","Status","Verified By","Notes"]} rows={uploads} renderRow={u=>[u.system,u.date,Number(u.records||0).toLocaleString(),<Badge val={u.status}/>,u.verifiedBy,<span style={{fontSize:12,color:"#6B7280"}}>{u.notes}</span>]}/></Card></div>
    );
    case "kpa2": return (
      <div><SectionHeader title="KPA 2 — Learner Data Verification" onAdd={()=>setModal("learner")} extra={<ExportBtn label="CSV" filename="kpa2_learner.csv" cols={["School","District","Source","Date","Enrolment","Verified","Variance","Status"]} rows={learnerData.map(l=>[l.school,l.district,l.source,l.date,l.enrolment,l.verified,l.variance,l.status])}/>}/>
      <KpaNote weight="20%" target="Daily" description="Access GOVERP, HRMS, Google Forms and 10th Day Snap Survey to verify learner numbers."/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:"1.5rem"}}><StatCard label="Records" value={learnerData.length} color="#7C3AED"/><StatCard label="Validated" value={learnerData.filter(l=>l.status==="Validated").length} color="#059669"/><StatCard label="Queried" value={learnerData.filter(l=>l.status==="Queried").length} color="#DC2626"/><StatCard label="Total variance" value={learnerData.reduce((a,l)=>a+Number(l.variance||0),0)} color="#D97706"/></div>
      <Card><DataTable cols={["School","District","Source","Date","Reported","Verified","Variance","Status"]} rows={learnerData} renderRow={l=>[l.school,l.district,l.source,l.date,l.enrolment,l.verified,<span style={{color:Number(l.variance)>0?"#DC2626":"#059669",fontWeight:600}}>{l.variance}</span>,<Badge val={l.status}/>]}/></Card></div>
    );
    case "kpa3": return (
      <div><SectionHeader title="KPA 3 — Mobile Classroom Audit" onAdd={()=>setModal("mobile")} extra={<ExportBtn label="CSV" filename="kpa3_mobile.csv" cols={["School","Mobiles","Condition","Electricity","Ablutions","Issues","Recommendation","Date","Audited By"]} rows={mobileAudit.map(m=>[scName(m.schoolId),m.mobileCount,m.condition,m.electricityAvail,m.ablutions,m.structuralIssues,m.recommendation,m.auditDate,m.auditedBy])}/>}/>
      <KpaNote weight="20%" target="Weekly" description="Conduct furniture and mobile audit. Report on conditional assessment of mobile classrooms."/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:"1.5rem"}}><StatCard label="Schools audited" value={mobileAudit.length} color="#059669"/><StatCard label="Good condition" value={mobileAudit.filter(m=>m.condition==="Good").length} color="#059669"/><StatCard label="Fair condition" value={mobileAudit.filter(m=>m.condition==="Fair").length} color="#D97706"/><StatCard label="Poor condition" value={mobileAudit.filter(m=>m.condition==="Poor").length} color="#DC2626"/></div>
      <Card><DataTable cols={["School","Mobiles","Condition","Electricity","Ablutions","Issues","Recommendation","Date"]} rows={mobileAudit} renderRow={m=>[scName(m.schoolId),m.mobileCount,<Badge val={m.condition}/>,<Badge val={m.electricityAvail}/>,<Badge val={m.ablutions}/>,m.structuralIssues||"—",m.recommendation,m.auditDate]}/></Card></div>
    );
    case "kpa4": return (
      <div><SectionHeader title="KPA 4 — School Infrastructure Requests" onAdd={()=>setModal("request")} extra={<ExportBtn label="CSV" filename="kpa4_requests.csv" cols={["School","District","Type","Priority","Date Received","Due Date","Status","Assigned To","Notes"]} rows={schoolRequests.map(r=>[scName(r.schoolId),r.district,r.requestType,r.priority,r.dateReceived,r.dueDate,r.status,r.assignedTo,r.notes])}/>}/>
      <KpaNote weight="15%" target="Quarterly" description="Maintain accurate tracking of all school requests per district."/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:"1.5rem"}}><StatCard label="Total requests" value={schoolRequests.length} color="#D97706"/><StatCard label="Completed" value={schoolRequests.filter(r=>r.status==="Completed").length} color="#059669"/><StatCard label="In progress" value={schoolRequests.filter(r=>r.status==="In Progress").length} color="#2563EB"/><StatCard label="Pending" value={schoolRequests.filter(r=>r.status==="Pending").length} color="#DC2626"/></div>
      <Card><DataTable cols={["School","District","Type","Priority","Received","Due","Status","Notes"]} rows={schoolRequests} renderRow={r=>[scName(r.schoolId),r.district,r.requestType,<Badge val={r.priority}/>,r.dateReceived,r.dueDate,<Badge val={r.status}/>,<span style={{fontSize:12,color:"#6B7280"}}>{r.notes}</span>]}/></Card></div>
    );
    case "kpa5": return (
      <div><SectionHeader title="KPA 5 — Admin Duties & Payment Verification" onAdd={()=>setModal("admin")} extra={<ExportBtn label="CSV" filename="kpa5_admin.csv" cols={["Type","Reference","Date","Amount","Supplier","Status","Notes"]} rows={adminTasks.map(t=>[t.type,t.ref,t.date,t.amount,t.supplier,t.status,t.notes])}/>}/>
      <KpaNote weight="15%" target="Daily" description="Assist stakeholders, verify payments, assist with filing, copying and scanning."/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:"1.5rem"}}><StatCard label="Total tasks" value={adminTasks.length} color="#DC2626"/><StatCard label="Payment verifications" value={adminTasks.filter(t=>t.type==="Payment Verification").length} color="#2563EB"/><StatCard label="Completed" value={adminTasks.filter(t=>["Verified","Completed","Resolved"].includes(t.status)).length} color="#059669"/><StatCard label="Pending" value={adminTasks.filter(t=>t.status==="Pending").length} color="#D97706"/></div>
      <Card><DataTable cols={["Type","Reference","Date","Amount","Supplier / Party","Status","Notes"]} rows={adminTasks} renderRow={t=>[t.type,t.ref,t.date,t.amount||"—",t.supplier||"—",<Badge val={t.status}/>,<span style={{fontSize:12,color:"#6B7280"}}>{t.notes}</span>]}/></Card></div>
    );

    default: return null;
  }};

  return (
    <div style={{display:"flex",minHeight:"100vh",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",background:"#F3F6FB"}}>
      {toast&&<div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:"#111827",color:"#fff",padding:"10px 20px",borderRadius:10,fontSize:13,zIndex:200,whiteSpace:"nowrap",boxShadow:"0 4px 12px rgba(0,0,0,0.2)"}}>{toast}</div>}

      {modal==="school"       && <SchoolForm        onClose={()=>setModal(null)} onSave={add(setSchools)}/>}
      {modal==="audit"        && <AuditForm         schools={schools}            onClose={()=>setModal(null)} onSave={add(setAudits)}/>}
      {modal==="classroom"    && <ClassroomForm     schools={schools}            onClose={()=>setModal(null)} onSave={add(setClassrooms)}/>}
      {modal==="furniture"    && <FurnitureForm     classrooms={classrooms} schools={schools} onClose={()=>setModal(null)} onSave={add(setFurniture)}/>}
      {modal==="condition"    && <ConditionForm     classrooms={classrooms} schools={schools} onClose={()=>setModal(null)} onSave={add(setConditions)}/>}
      {modal==="repair"       && <RepairForm        furniture={furniture} classrooms={classrooms} schools={schools} onClose={()=>setModal(null)} onSave={add(setRepairs)}/>}
      {modal==="warehouse"    && <WarehouseForm                               onClose={()=>setModal(null)} onSave={add(setWarehouse)}/>}
      {modal==="storage"      && <StorageForm       schools={schools}          onClose={()=>setModal(null)} onSave={add(setStorage)}/>}
      {modal==="distribution" && <DistributionForm  schools={schools}          onClose={()=>setModal(null)} onSave={add(setDistribution)}/>}
      {modal==="upload"       && <UploadForm                                   onClose={()=>setModal(null)} onSave={add(setUploads)}/>}
      {modal==="learner"      && <LearnerDataForm                              onClose={()=>setModal(null)} onSave={add(setLearnerData)}/>}
      {modal==="mobile"       && <MobileAuditForm   schools={schools}          onClose={()=>setModal(null)} onSave={add(setMobileAudit)}/>}
      {modal==="request"      && <SchoolRequestForm schools={schools}          onClose={()=>setModal(null)} onSave={add(setSchoolRequests)}/>}
      {modal==="admin"        && <AdminTaskForm                                onClose={()=>setModal(null)} onSave={add(setAdminTasks)}/>}

      <aside style={{width:220,background:"linear-gradient(180deg,#1e3a5f,#1e40af)",padding:"1.5rem 0",flexShrink:0,overflowY:"auto"}}>
        <div style={{padding:"0 1.25rem 1.5rem",borderBottom:"0.5px solid rgba(255,255,255,0.1)",marginBottom:"1rem"}}>
          <p style={{fontWeight:700,fontSize:14,color:"#fff",margin:"0 0 2px"}}>SchoolAudit</p>
          <p style={{fontSize:11,color:"rgba(255,255,255,0.5)",margin:0}}>Northern Cape DoE</p>
        </div>
        {NAV.map(n=>(
          <button key={n.id} onClick={()=>setActive(n.id)} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"7px 1.25rem",background:active===n.id?"rgba(255,255,255,0.15)":"none",color:active===n.id?"#fff":"rgba(255,255,255,0.65)",border:"none",borderLeft:active===n.id?"2px solid #60A5FA":"2px solid transparent",cursor:"pointer",fontSize:13,fontWeight:active===n.id?600:400,textAlign:"left",transition:"background 0.15s"}}>
            <span style={{fontSize:14}}>{n.icon}</span>{n.label}
          </button>
        ))}
      </aside>

      <main style={{flex:1,padding:"2rem",maxWidth:1100,overflowY:"auto"}}>
        {renderPage()}
      </main>
    </div>
  );
}

const root=document.getElementById("root");
if(root) ReactDOM.createRoot(root).render(<App/>);
