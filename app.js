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
  { id:"furnsummary",  label:"Furniture Summary",  icon:"🪑" },
  { id:"conditions",   label:"Mobile Conditional Assessment", icon:"🔍" },
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
  { id:"kpa6",         label:"  School Transfers", icon:"🔄" },
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
  "Double Learner Desk – Size 4 (Grade 7–9 Senior Phase, seat 380mm) – Supawood Top","Double Learner Desk – Size 4 (Grade 7–9 Senior Phase, seat 380mm) – Saligna Top","Double Learner Desk – Size 4 (Grade 7–9 Senior Phase, seat 380mm) – Melamine Top",
  "Double Learner Desk – Size 5 (Grade 10–12 FET Phase, seat 430mm) – Supawood Top","Double Learner Desk – Size 5 (Grade 10–12 FET Phase, seat 430mm) – Saligna Top","Double Learner Desk – Size 5 (Grade 10–12 FET Phase, seat 430mm) – Melamine Top",
  "Single Combination Desk & Chair – Size 3 (Grade 4–6) – Supawood Top","Single Combination Desk & Chair – Size 3 (Grade 4–6) – Saligna Top","Single Combination Desk & Chair – Size 3 (Grade 4–6) – Melamine Top",
  "Single Combination Desk & Chair – Size 4 (Grade 7–9) – Supawood Top","Single Combination Desk & Chair – Size 4 (Grade 7–9) – Saligna Top","Single Combination Desk & Chair – Size 4 (Grade 7–9) – Melamine Top",
  "Single Combination Desk & Chair – Size 5 (Grade 10–12 FET) – Supawood Top","Single Combination Desk & Chair – Size 5 (Grade 10–12 FET) – Saligna Top","Single Combination Desk & Chair – Size 5 (Grade 10–12 FET) – Melamine Top",
  "Double Combination Desk & Chair – Size 3 (Grade 4–6) – Supawood Top","Double Combination Desk & Chair – Size 3 (Grade 4–6) – Saligna Top","Double Combination Desk & Chair – Size 3 (Grade 4–6) – Melamine Top",
  "Double Combination Desk & Chair – Size 4 (Grade 7–9) – Supawood Top","Double Combination Desk & Chair – Size 4 (Grade 7–9) – Saligna Top","Double Combination Desk & Chair – Size 4 (Grade 7–9) – Melamine Top",
  "Double Combination Desk & Chair – Size 5 (Grade 10–12 FET) – Supawood Top","Double Combination Desk & Chair – Size 5 (Grade 10–12 FET) – Saligna Top","Double Combination Desk & Chair – Size 5 (Grade 10–12 FET) – Melamine Top",
  "Penny 1 Wooden Chair – Size 1 (Grade R, seat height 260mm)","Penny 1 Wooden Chair – Size 2 (Grade 1–3, seat height 310mm)","Penny 1 Wooden Chair – Size 3 (Grade 4–6, seat height 350mm)",
  "Penny 1 Plastic Chair – Size 1 (Grade R, seat height 260mm)","Penny 1 Plastic Chair – Size 2 (Grade 1–3, seat height 310mm)","Penny 1 Plastic Chair – Size 3 (Grade 4–6, seat height 350mm)",
  "Penny 4 Wooden Chair – Size 4 (Grade 7–9, seat height 380mm)","Penny 4 Wooden Chair – Size 5 (Grade 10–12 FET, seat height 430mm)",
  "Penny 4 Plastic Chair – Size 4 (Grade 7–9, seat height 380mm)","Penny 4 Plastic Chair – Size 5 (Grade 10–12 FET, seat height 430mm)",
  "Utility Chair – Size 3 (Grade 4–6, steel frame)","Utility Chair – Size 4 (Grade 7–9, steel frame)","Utility Chair – Size 5 (Grade 10–12, steel frame)",
  "ECD Activity Table – Grade R (Height 460mm)","ECD Stackable Chair – Grade R (Seat height 260mm)",
  "Teacher's Desk (Single Pedestal)","Teacher's Desk (Double Pedestal)","Teacher's Chair (Typist)","Teacher's Chair (Visitor)","Teacher's Chair (Wood)",
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
  // Science Laboratory (Science Lab Table & Lab Stool already listed above)
  "Science Lab Bench (with Sink)","Lab Demonstration Table (Teacher's)","Fume Cupboard","Chemical Storage Cabinet","Gas Bench Unit","Specimen/Apparatus Cabinet","Lab Safety Equipment Cabinet",
  // Library (Library Table & Library Chair already listed above)
  "Library Bookshelf – Single Sided","Library Bookshelf – Double Sided","Librarian's Desk","Study Carrel","Periodical/Newspaper Rack","Library Catalogue Cabinet","Library Book Return Trolley","Library Reading Couch",
  // Hospitality Room
  "Hospitality Kitchen Workstation – Stainless Steel","Hospitality Demonstration Stove/Oven Unit","Hospitality Kitchen Sink Unit","Hospitality Kitchen Cupboard – Steel","Hospitality Refrigerator (Demonstration)","Hospitality Kitchen Stool","Hospitality Dining Table","Hospitality Dining Chair",
  // Computer Lab (Computer Lab Table already listed above)
  "Computer Lab Chair","Computer Workstation Desk (with Cable Grommet)","Server/Network Cabinet","Printer Table",
  // Tuck Shop
  "Tuck Shop Serving Counter","Tuck Shop Display Shelf","Tuck Shop Till Table","Tuck Shop Storage Cupboard","Tuck Shop Cooler/Refrigerator Unit","Tuck Shop Stool",
  // Consumer Room (Consumer Studies)
  "Consumer Studies Sewing Table","Consumer Studies Sewing Machine Cabinet","Consumer Studies Cutting Table","Consumer Studies Ironing Station","Consumer Studies Ironing Board","Consumer Studies Storage Cupboard","Consumer Studies Display Cabinet",
  // Printing Room
  "Printing Room Worktable","Printing Room Storage Cabinet","Paper Storage Rack","Photocopier Stand","Printing Room Stool",
  // Strongroom
  "Strongroom Steel Shelving","Strongroom Security Cabinet","Strongroom Safe (Heavy Duty)","Strongroom Steel Cage Shelf Unit","Exam Paper Storage Cabinet",
  // Admin Kitchen
  "Admin Kitchen Cupboard","Admin Kitchen Counter/Prep Table","Admin Kitchen Sink Unit","Admin Kitchen Table","Admin Kitchen Chair","Admin Kitchen Refrigerator",
  // Bookstore
  "Bookstore Steel Shelving","Bookstore Storage Bin/Crate","Bookstore Issue Counter","Bookstore Stock Table","Bookstore Mobile Ladder",
  // School Kitchen (feeding scheme / nutrition programme)
  "School Kitchen Prep Table – Stainless Steel","School Kitchen Industrial Stove/Oven","School Kitchen Sink Unit – Double Basin","School Kitchen Storage Cupboard","School Kitchen Pot Rack","School Kitchen Serving Trolley","School Kitchen Chest Freezer",
];
// ─────────────────────────────────────────────
// NC DoE DISTRICTS (for District / Circuit Office delivery capture)
// ─────────────────────────────────────────────
const NC_DISTRICTS = ["FRANCES BAARD","JOHN TAOLO GAETSEWE","NAMAKWA","PIXLEY-KA-SEME","ZF MGCAWU"];
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
const initFurniture    = [{id:1,classroomId:1,schoolId:1,category:"Learner",ftype:"Single Learner Desk – Size 3 (Grade 4–6, seat 350mm) – Melamine Top",spec:"Grade 4–6",chairType:"Penny 1 Plastic Chair – Size 3 (Grade 4–6, seat height 350mm)",available:30,damaged:8,repairable:5,shortage:6,otherType:"",otherQty:0,condition:"Fair",photoName:"",photoData:""},{id:2,classroomId:2,schoolId:2,category:"Specialised",ftype:"Science Lab Table",spec:"Science Lab",chairType:"Lab Stool",available:20,damaged:3,repairable:3,shortage:0,otherType:"",otherQty:0,condition:"Good",photoName:"",photoData:""}];
const initRepairs      = [
  {id:1,schoolId:1,emis:"700112345",items:[{ftype:"Single Learner Desk – Size 3 (Grade 4–6, seat 350mm) – Melamine Top",otherType:"",qty:5},{ftype:"Penny 1 Plastic Chair – Size 3 (Grade 4–6, seat height 350mm)",otherType:"",qty:8}],repairType:"Minor",destination:"Warehouse",status:"Completed",dateCollected:"2024-03-18",allocated:"2024-03-20",completed:"2024-04-01",comments:"Cracked tops and broken chair frames, collected for refurbishment"},
  {id:2,schoolId:2,emis:"700223456",items:[{ftype:"Science Lab Table",otherType:"",qty:3}],repairType:"Major",destination:"Labour Dept",status:"In Progress",dateCollected:"2024-04-08",allocated:"2024-04-10",completed:"",comments:"Broken legs, sent to Labour Dept for structural repair"},
];
const initStorage      = [{id:1,schoolId:1,room:"Store 1",condition:"Fair",secure:"Yes",storedType:"Old Desks",qty:20,usable:"No",desc:"Old damaged desks"}];
const initDistribution = [
  {id:1,recipientType:"School",schoolId:1,district:"",circuit:"",destination:"Warehouse",source:"School",items:[{ftype:"Double Learner Desk – Size 3 (Grade 4–6, seat 350mm) – Melamine Top",otherType:"",qty:10}],official:"T. Mokoena",position:"Principal",receiver:"S. Dlamini",role:"Store Manager",date:"2024-04-05",purpose:"Repair",ref:"REF-001",comments:"",sigOfficial:"",sigReceiver:"",proofName:"",proofData:""},
  {id:2,recipientType:"District Office",schoolId:"",district:"FRANCES BAARD",circuit:"",destination:"Frances Baard District Office storeroom",source:"Warehouse",items:[{ftype:"Teacher's Desk (Single Pedestal)",otherType:"",qty:15},{ftype:"Teacher's Chair (Typist)",otherType:"",qty:15}],official:"S. Dlamini",position:"Store Manager",receiver:"M. Kok",role:"District Asset Officer",date:"2026-05-02",purpose:"Delivery",ref:"REF-002",comments:"",sigOfficial:"",sigReceiver:"",proofName:"",proofData:""},
  {id:3,recipientType:"School",schoolId:1,district:"",circuit:"",destination:"Soweto Primary School",source:"Warehouse",items:[{ftype:"Other",otherType:"Donated school shoes",qty:150}],official:"S. Dlamini",position:"Store Manager",receiver:"T. Mokoena",role:"Principal",date:"2026-05-20",purpose:"Delivery",ref:"REF-003",comments:"Donated by Hope for Schools Foundation — 150 pairs handed over to the principal, sizes 1–7 assorted",sigOfficial:"",sigReceiver:"",proofName:"",proofData:""},
];
const initConditions   = [{id:1,classroomId:1,flooring:"Fair",flooringIssues:"Cracks",windows:"Poor",windowIssues:"Broken",locks:"Good",electricity:"Yes",mobile:"N/A",comments:"",photos:[]}];
const initWarehouse    = [
  {id:1,date:"2024-03-01",supplier:"Edu Furniture Co.",category:"Furniture",ftype:"Double Learner Desk – Size 3 (Grade 4–6, seat 350mm) – Melamine Top",itemName:"",spec:"Grade 4–6",qty:50,condition:"Good",receivedBy:"S. Dlamini",ref:"WH-001",status:"In Stock",comments:"New batch"},
  {id:2,date:"2024-04-15",supplier:"SA School Supplies",category:"Furniture",ftype:"Penny 1 Plastic Chair – Size 2 (Grade 1–3, seat height 310mm)",itemName:"",spec:"Grade 1–3",qty:80,condition:"Good",receivedBy:"S. Dlamini",ref:"WH-002",status:"Dispatched",comments:"Dispatched to Alexandra"},
  {id:3,date:"2026-05-12",supplier:"Hope for Schools Foundation (Donation)",category:"Other / Donated Item",ftype:"",itemName:"Donated school shoes",spec:"",qty:150,condition:"Good",receivedBy:"S. Dlamini",ref:"WH-003",status:"In Stock",comments:"Donated by Hope for Schools Foundation — held at warehouse, to be delivered to Soweto Primary once transport is arranged"},
];
const initUploads      = [{id:1,system:"NEIMS",date:"2026-04-01",status:"Completed",records:342,verifiedBy:"PY Tshabangu",notes:"Aligned with EFMS data"},{id:2,system:"EFMS",date:"2026-04-03",status:"Completed",records:298,verifiedBy:"PY Tshabangu",notes:"Cross-checked against GOVERP"},{id:3,system:"GOVERP",date:"2026-04-05",status:"In Progress",records:180,verifiedBy:"PY Tshabangu",notes:"Pending district confirmation"}];
const initLearnerData  = [{id:1,school:"Soweto Primary",district:"Johannesburg South",source:"10th Day Snap Survey",date:"2026-04-10",enrolment:1200,verified:1180,variance:20,status:"Validated"},{id:2,school:"Pretoria North",district:"Tshwane North",source:"GOVERP",date:"2026-04-12",enrolment:850,verified:850,variance:0,status:"Validated"},{id:3,school:"Alexandra Comb.",district:"Johannesburg East",source:"Google Forms",date:"2026-04-15",enrolment:1050,verified:1010,variance:40,status:"Queried"}];
const initMobileAudit  = [{id:1,schoolId:1,mobileCount:4,condition:"Fair",structuralIssues:"Roof leaks",electricityAvail:"Yes",ablutions:"No",recommendation:"Repair roof",auditDate:"2026-04-20",auditedBy:"PY Tshabangu"},{id:2,schoolId:3,mobileCount:3,condition:"Poor",structuralIssues:"Floor damage",electricityAvail:"No",ablutions:"No",recommendation:"Replace unit",auditDate:"2026-04-22",auditedBy:"PY Tshabangu"}];
// ─────────────────────────────────────────────
// SCHOOL REQUESTS = FURNITURE & INFRASTRUCTURE REQUEST MANAGEMENT
// ─────────────────────────────────────────────
const REQUEST_CATEGORIES = ["Furniture","Infrastructure"];
const REQUEST_TYPES_BY_CATEGORY = {
  Furniture:      ["Furniture Shortage","Damaged Furniture Replacement","Refurbishment Needed","Other"],
  Infrastructure: ["Additional Classrooms","Administration Buildings","Sanitation Facilities","Water Supply Infrastructure","Electrical Upgrades","Fencing & Security Infrastructure","Hostels","Maintenance","Other"],
};
const REQUEST_PRIORITY_BASIS = ["Need","Safety Requirements","Budget Availability","Learner Numbers","Infrastructure Condition"];
const initSchoolRequests=[
  {id:1,refNumber:"GOVERP-2026-0341",schoolId:1,district:"Johannesburg South",category:"Furniture",requestType:"Furniture Shortage",priority:"High",priorityBasis:"Learner Numbers",dateReceived:"2026-04-05",govErpCaptured:"Yes",verified:"Yes",verificationDate:"2026-04-08",status:"In Progress",dueDate:"2026-06-30",completedDate:"",assignedTo:"PY Tshabangu",proofOfDelivery:"No",closedWithDocs:"No",notes:"220 desks needed urgently — enrolment growth of 8% this year"},
  {id:2,refNumber:"GOVERP-2026-0355",schoolId:2,district:"Tshwane North",category:"Infrastructure",requestType:"Additional Classrooms",priority:"Medium",priorityBasis:"Infrastructure Condition",dateReceived:"2026-04-10",govErpCaptured:"Yes",verified:"Pending",verificationDate:"",status:"Pending",dueDate:"2026-07-31",completedDate:"",assignedTo:"PY Tshabangu",proofOfDelivery:"No",closedWithDocs:"No",notes:"Request for 2 additional mobile classrooms — pending site verification"},
  {id:3,refNumber:"GOVERP-2026-0298",schoolId:3,district:"Johannesburg East",category:"Furniture",requestType:"Refurbishment Needed",priority:"Low",priorityBasis:"Budget Availability",dateReceived:"2026-04-15",govErpCaptured:"Yes",verified:"Yes",verificationDate:"2026-04-18",status:"Completed",dueDate:"2026-05-31",completedDate:"2026-05-20",assignedTo:"PY Tshabangu",proofOfDelivery:"Yes",closedWithDocs:"Yes",notes:"Classroom door repairs completed — proof of delivery signed by principal"},
];
const initAdminTasks   = [{id:1,type:"Payment Verification",ref:"PAY-2026-001",date:"2026-04-08",amount:"R 45,000",supplier:"Edu Furniture Co.",status:"Verified",notes:"All docs checked and signed"},{id:2,type:"Stakeholder Enquiry",ref:"ENQ-2026-012",date:"2026-04-10",amount:"—",supplier:"—",status:"Resolved",notes:"Principal query re: delivery date"},{id:3,type:"Filing / Scanning",ref:"FILE-2026-003",date:"2026-04-12",amount:"—",supplier:"—",status:"Completed",notes:"Q1 project docs scanned and filed"},{id:4,type:"Payment Verification",ref:"PAY-2026-002",date:"2026-04-18",amount:"R 12,500",supplier:"SA School Supplies",status:"Pending",notes:"Awaiting supporting documents"}];
// ─────────────────────────────────────────────
// SCHOOL TRANSFERS = INFRASTRUCTURE PROJECT HANDOVER
// ─────────────────────────────────────────────
const TRANSFER_PHASES = ["Practical Completion","Defects Rectification","Pre-Handover Inspection","School Handover","Final Transfer"];
const TRANSFER_CHECKLIST = [
  {key:"practicalCompletion",label:"Practical completion certificate received"},
  {key:"occupancyCert",       label:"Occupancy certificate received"},
  {key:"electricalCompliance",label:"Electrical compliance certificate available"},
  {key:"plumbingCert",        label:"Plumbing certificate available"},
  {key:"fireCompliance",      label:"Fire compliance certificate available"},
  {key:"defectsRectified",    label:"Defects rectified"},
  {key:"furnitureInstalled",  label:"Furniture installed"},
  {key:"assetRegister",       label:"Asset register completed"},
  {key:"staffOrientation",    label:"School staff orientation conducted"},
  {key:"keysHandedOver",      label:"Building keys handed over"},
];
const TRANSFER_ASSET_CATEGORIES = [
  {key:"classrooms",           label:"Classrooms"},
  {key:"adminOffices",         label:"Administration Offices"},
  {key:"toilets",              label:"Toilets"},
  {key:"furniture",            label:"Furniture"},
  {key:"ictEquipment",         label:"ICT Equipment"},
  {key:"waterInfrastructure",  label:"Water Infrastructure"},
  {key:"securityFencing",      label:"Security Fencing"},
];
const emptyChecklist = () => Object.fromEntries(TRANSFER_CHECKLIST.map(c=>[c.key,{value:"",remarks:""}]));
const emptyAssets    = () => Object.fromEntries(TRANSFER_ASSET_CATEGORIES.map(c=>[c.key,{qty:"",condition:"Good"}]));
const initSchoolTransfers=[
  {id:1,projectName:"Kimberley North Primary — New Admin Block",emisNumber:"300010701",schoolId:1,district:"Frances Baard",projectBudget:"R 3,200,000",finalCost:"R 3,150,000",contractor:"Kalahari Construction (Pty) Ltd",implementingAgent:"Dept. of Infrastructure — NC DoE",completionDate:"2026-05-20",handoverDate:"2026-06-10",phase:"Final Transfer",
    checklist:{practicalCompletion:{value:"Yes",remarks:"Certificate issued 2026-05-20"},occupancyCert:{value:"Yes",remarks:""},electricalCompliance:{value:"Yes",remarks:"COC on file"},plumbingCert:{value:"Yes",remarks:""},fireCompliance:{value:"Yes",remarks:""},defectsRectified:{value:"Yes",remarks:"2 minor defects closed out"},furnitureInstalled:{value:"Yes",remarks:""},assetRegister:{value:"Yes",remarks:"Captured on asset register 2026-06-08"},staffOrientation:{value:"Yes",remarks:"Conducted 2026-06-09"},keysHandedOver:{value:"Yes",remarks:""}},
    assets:{classrooms:{qty:"4",condition:"Good"},adminOffices:{qty:"2",condition:"Good"},toilets:{qty:"6",condition:"Good"},furniture:{qty:"120",condition:"Good"},ictEquipment:{qty:"8",condition:"Good"},waterInfrastructure:{qty:"1",condition:"Good"},securityFencing:{qty:"1",condition:"Fair"}},
    onTime:"Yes",handoverWithin30Days:"Yes",defectsIdentified:2,defectsResolved:2,satisfactionRating:5,assetRegCompliant:"Yes",
    principalName:"N. Molefe",principalSig:"",principalDate:"2026-06-10",districtOfficialName:"T. van Wyk",districtOfficialSig:"",districtOfficialDate:"2026-06-10",infraDirName:"PY Tshabangu",infraDirSig:"",infraDirDate:"2026-06-10",contractorName:"J. Adams (Kalahari Construction)",contractorSig:"",contractorDate:"2026-06-10",
    notes:"Handover completed within SLA. All snag items closed before certificate issued."},
  {id:2,projectName:"Alexandra Combined — Sanitation Upgrade",emisNumber:"700334567",schoolId:3,district:"Johannesburg East",projectBudget:"R 850,000",finalCost:"",contractor:"Vaal Civils CC",implementingAgent:"Dept. of Infrastructure — NC DoE",completionDate:"2026-07-15",handoverDate:"",phase:"Defects Rectification",
    checklist:{practicalCompletion:{value:"Yes",remarks:""},occupancyCert:{value:"No",remarks:"Awaiting municipal inspection"},electricalCompliance:{value:"Yes",remarks:""},plumbingCert:{value:"Yes",remarks:""},fireCompliance:{value:"No",remarks:""},defectsRectified:{value:"No",remarks:"3 outstanding — waterproofing"},furnitureInstalled:{value:"N/A",remarks:""},assetRegister:{value:"No",remarks:""},staffOrientation:{value:"No",remarks:""},keysHandedOver:{value:"No",remarks:""}},
    assets:{classrooms:{qty:"0",condition:"Good"},adminOffices:{qty:"0",condition:"Good"},toilets:{qty:"10",condition:"Fair"},furniture:{qty:"0",condition:"Good"},ictEquipment:{qty:"0",condition:"Good"},waterInfrastructure:{qty:"1",condition:"Fair"},securityFencing:{qty:"0",condition:"Good"}},
    onTime:"No",handoverWithin30Days:"No",defectsIdentified:3,defectsResolved:0,satisfactionRating:"",assetRegCompliant:"No",
    principalName:"",principalSig:"",principalDate:"",districtOfficialName:"",districtOfficialSig:"",districtOfficialDate:"",infraDirName:"",infraDirSig:"",infraDirDate:"",contractorName:"",contractorSig:"",contractorDate:"",
    notes:"Defects liability period in progress; handover pending waterproofing rectification."},
];
// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
const uid = () => Date.now() + Math.random();
const loadFromLS = (key, fallback) => { try { const r=localStorage.getItem(key); return r?JSON.parse(r):fallback; } catch(e){ return fallback; } };
// ─────────────────────────────────────────────
// CLOUD SYNC (Firebase Firestore) — optional
// ─────────────────────────────────────────────
// To turn on cross-device sync for tablets/laptops:
//   1. Go to https://console.firebase.google.com → Create project (free Spark plan is enough)
//   2. In the project, click "Build → Firestore Database" → Create database → Start in production mode
//      (any region is fine) — this is a free tier, no credit card required for Spark.
//   3. Firestore → Rules tab → paste this (locks writes to signed-in users is overkill for a small
//      team tool, so this simply allows read/write — you can tighten it later):
//        rules_version = '2';
//        service cloud.firestore {
//          match /databases/{database}/documents {
//            match /{document=**} { allow read, write: if true; }
//          }
//        }
//   4. Project settings (gear icon) → General → "Your apps" → Add app → Web (</>) → register app
//      (no hosting needed) → copy the firebaseConfig object it shows you.
//   5. Paste those 6 values into FIREBASE_CONFIG below, replacing the placeholders.
//   6. Reload the app on every device — they'll now share the same live data.
// Until FIREBASE_CONFIG is filled in, the app works exactly as before: each browser keeps its
// own local copy only (no sync between devices).
const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
const FIREBASE_ENABLED = !!(FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.apiKey !== "YOUR_API_KEY" && typeof window!=="undefined" && window.firebase);
let firestoreDb = null;
if (FIREBASE_ENABLED) {
  try {
    const fbApp = window.firebase.initializeApp(FIREBASE_CONFIG);
    firestoreDb = window.firebase.firestore(fbApp);
    try { firestoreDb.enablePersistence({synchronizeTabs:true}).catch(()=>{}); } catch(e){}
  } catch(e) { console.warn("Firebase init failed, falling back to local-only mode:", e); }
}
// useSyncedCollection(name, initialData) behaves like useState(()=>loadFromLS(...)) but, when
// FIREBASE_CONFIG is filled in, keeps the array live-synced with a Firestore collection across
// every device that has the app open. Falls back to plain localStorage when not configured.
function useSyncedCollection(name, initialData) {
  const [items, setItems] = useState(() => loadFromLS(name, initialData));
  useEffect(() => {
    if (!firestoreDb) return;
    const unsub = firestoreDb.collection(name).onSnapshot(
      snap => {
        const list = snap.docs.map(d => d.data());
        setItems(list);
        try { localStorage.setItem(name, JSON.stringify(list)); } catch(e){}
      },
      err => console.warn(`Sync error (${name}):`, err)
    );
    return unsub;
  }, [name]);
  useEffect(() => {
    if (firestoreDb) return; // Firestore mode: local cache is written by the listener above instead
    try { localStorage.setItem(name, JSON.stringify(items)); } catch(e){}
  }, [items, name]);
  const mutate = useMemo(() => ({
    addOne: (record) => {
      const withId = { ...record, id: record.id ?? uid() };
      if (firestoreDb) firestoreDb.collection(name).doc(String(withId.id)).set(withId).catch(e=>console.error(`Sync write failed (${name}):`,e));
      else setItems(p => [...p, withId]);
      return withId;
    },
    addMany: (records) => {
      if (!records || !records.length) return;
      const withIds = records.map(r => ({ ...r, id: r.id ?? uid() }));
      if (firestoreDb) {
        const batch = firestoreDb.batch();
        withIds.forEach(r => batch.set(firestoreDb.collection(name).doc(String(r.id)), r));
        batch.commit().catch(e=>console.error(`Sync batch write failed (${name}):`,e));
      } else {
        setItems(p => [...p, ...withIds]);
      }
    },
    replaceAll: (records) => {
      if (firestoreDb) {
        firestoreDb.collection(name).get().then(snap => {
          const batch = firestoreDb.batch();
          snap.docs.forEach(d => batch.delete(d.ref));
          records.forEach(r => batch.set(firestoreDb.collection(name).doc(String(r.id)), r));
          return batch.commit();
        }).catch(e=>console.error(`Sync restore failed (${name}):`,e));
      } else {
        setItems(records);
      }
    },
    updateOne: (id, patch) => {
      if (firestoreDb) {
        firestoreDb.collection(name).doc(String(id)).set(patch, {merge:true}).catch(e=>console.error(`Sync update failed (${name}):`,e));
      } else {
        setItems(p => p.map(it => it.id===id ? {...it, ...patch} : it));
      }
    },
    deleteOne: (id) => {
      if (firestoreDb) {
        firestoreDb.collection(name).doc(String(id)).delete().catch(e=>console.error(`Sync delete failed (${name}):`,e));
      } else {
        setItems(p => p.filter(it => it.id !== id));
      }
    },
    deleteMany: (ids) => {
      if (!ids || !ids.length) return;
      if (firestoreDb) {
        const batch = firestoreDb.batch();
        ids.forEach(id => batch.delete(firestoreDb.collection(name).doc(String(id))));
        batch.commit().catch(e=>console.error(`Sync batch delete failed (${name}):`,e));
      } else {
        const idSet = new Set(ids.map(String));
        setItems(p => p.filter(it => !idSet.has(String(it.id))));
      }
    },
  }), [name]);
  return [items, mutate];
}
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
function ClassroomForm({schools,initial,onSave,onClose}) {
  const emptyItem=()=>({room:"",type:"Classroom",grade:"",spec:"",learners:"",isMobile:"No",inUse:"Yes",comments:""});
  const normInitial = initial ? {
    id:initial.id,
    schoolId:initial.schoolId!=null?String(initial.schoolId):"",
    items:[{room:initial.room||"",type:initial.type||"Classroom",grade:initial.grade||"",spec:initial.spec||"",learners:initial.learners??"",isMobile:initial.isMobile||"No",inUse:initial.inUse||"Yes",comments:initial.comments||""}],
  } : null;
  const [f,setF]=useState(normInitial||{schoolId:"",items:[emptyItem()]});
  const [touched,setTouched]=useState(false);
  const s=k=>e=>setF(p=>({...p,[k]:e.target.value}));
  const setItem=(i,field)=>e=>setF(p=>({...p,items:p.items.map((it,x)=>x===i?{...it,[field]:e.target.value}:it)}));
  const addItem=()=>setF(p=>({...p,items:[...p.items,emptyItem()]}));
  const removeItem=i=>setF(p=>({...p,items:p.items.filter((_,x)=>x!==i)}));
  const validate=d=>({
    schoolId:!d.schoolId?"School is required":"",
    items:(!d.items||!d.items.length||!d.items.some(it=>it.room&&it.room.trim()))?"At least one room number is required":"",
  });
  const errors=touched?validate(f):{};
  const eS=k=>touched&&errors[k]?{...sel,borderColor:"#EF4444",background:"#FFF5F5"}:sel;
  const eI=k=>touched&&errors[k]?{...inp,borderColor:"#EF4444",background:"#FFF5F5"}:inp;
  const handleSave=()=>{
    setTouched(true);
    if(Object.values(validate(f)).some(Boolean))return;
    const validItems=f.items.filter(it=>it.room&&it.room.trim());
    if(initial){
      const it=validItems[0]||f.items[0];
      onSave({id:f.id,schoolId:f.schoolId,...it,comments:it.inUse==="No"?it.comments:""});
    } else {
      onSave(validItems.map(it=>({id:uid(),schoolId:f.schoolId,...it,comments:it.inUse==="No"?it.comments:""})));
    }
  };
  return (
    <Modal title={initial?"Edit classroom":"Add classroom"} onClose={onClose} onSave={handleSave} errors={errors}>
      <Field label="School *"><select style={eS("schoolId")} value={f.schoolId} onChange={s("schoolId")}><option value="">Select</option>{schools.map(sc=><option key={sc.id} value={sc.id}>{sc.name}</option>)}</select></Field>
      <div style={{borderTop:"1px solid #E5E7EB",margin:"1rem 0 0.75rem",paddingTop:"0.75rem"}}>
        <p style={{fontSize:11,fontWeight:600,color:"#6B7280",margin:"0 0 0.5rem",textTransform:"uppercase",letterSpacing:"0.05em"}}>Rooms</p>
        {f.items.map((item,i)=>(
          <div key={i} style={{background:"#F9FAFB",borderRadius:8,padding:"0.75rem",marginBottom:"0.5rem",border:"0.5px solid #E5E7EB"}}>
            {!initial&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <p style={{fontSize:12,fontWeight:500,margin:0,color:"#6B7280"}}>Room {i+1}</p>
              {f.items.length>1&&<button onClick={()=>removeItem(i)} style={{fontSize:11,color:"#EF4444",background:"none",border:"none",cursor:"pointer"}}>Remove</button>}
            </div>}
            <Row2><Field label="Room number *"><input style={touched&&errors.items&&!(item.room&&item.room.trim())?{...inp,borderColor:"#EF4444",background:"#FFF5F5"}:inp} value={item.room} onChange={setItem(i,"room")}/></Field><Field label="Room type"><select style={sel} value={item.type} onChange={setItem(i,"type")}>{["Classroom","Lab","Office","Storage","Science Laboratory","Library","Hospitality Room","Computer Lab","Tuck Shop","Consumer Room"].map(v=><option key={v}>{v}</option>)}</select></Field></Row2>
            <Row3><Field label="Grade (R–12)"><input style={inp} value={item.grade} onChange={setItem(i,"grade")}/></Field><Field label="Spec (e.g. 4E1)"><input style={inp} value={item.spec} onChange={setItem(i,"spec")}/></Field><Field label="Learner count"><input style={inp} type="number" value={item.learners} onChange={setItem(i,"learners")}/></Field></Row3>
            <Row2><Field label="Is mobile?"><select style={sel} value={item.isMobile} onChange={setItem(i,"isMobile")}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="In use?"><select style={sel} value={item.inUse} onChange={setItem(i,"inUse")}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field></Row2>
            {item.inUse==="No"&&<Field label="Comments (reason not in use)"><input style={inp} value={item.comments} onChange={setItem(i,"comments")} placeholder="e.g. Roof damage, being used for storage, awaiting repairs"/></Field>}
          </div>
        ))}
        {!initial&&<button onClick={addItem} style={{fontSize:12,color:"#2563EB",background:"none",border:"0.5px solid #BFDBFE",borderRadius:8,padding:"5px 14px",cursor:"pointer"}}>+ Add another room</button>}
      </div>
    </Modal>
  );
}
function FurnitureForm({classrooms,schools,initial,onSave,onClose}) {
  const emptyItem=()=>({category:"Learner",ftype:"",otherType:"",available:"",damaged:"",repairable:"",shortage:"",condition:"Good"});
  const normInitial = initial ? {
    id:initial.id,
    schoolId:initial.schoolId!=null?String(initial.schoolId):"",
    classroomId:initial.classroomId!=null?String(initial.classroomId):"",
    spec:initial.spec||"",
    chairType:initial.chairType||"Penny 1 Plastic Chair – Size 2 (Grade 1–3, seat height 310mm)",
    auditDate:initial.auditDate||new Date().toISOString().slice(0,10),
    otherQty:initial.otherQty??"",
    photoName:initial.photoName||"",
    photoData:initial.photoData||"",
    items:[{category:initial.category||"Learner",ftype:initial.ftype||"",otherType:initial.otherType||"",available:initial.available??"",damaged:initial.damaged??"",repairable:initial.repairable??"",shortage:initial.shortage??"",condition:initial.condition||"Good"}],
  } : null;
  const [f,setF]=useState(normInitial||{schoolId:"",classroomId:"",spec:"",chairType:"Penny 1 Plastic Chair – Size 2 (Grade 1–3, seat height 310mm)",auditDate:new Date().toISOString().slice(0,10),otherQty:"",photoName:"",photoData:"",items:[emptyItem()]});
  const [touched,setTouched]=useState(false);
  const s=k=>e=>setF(p=>({...p,[k]:e.target.value}));
  const setItem=(i,field)=>e=>setF(p=>({...p,items:p.items.map((it,x)=>x===i?{...it,[field]:e.target.value}:it)}));
  const addItem=()=>setF(p=>({...p,items:[...p.items,emptyItem()]}));
  const removeItem=i=>setF(p=>({...p,items:p.items.filter((_,x)=>x!==i)}));
  const filteredClassrooms=classrooms.filter(c=>!f.schoolId||c.schoolId.toString()===f.schoolId);
  useEffect(()=>{if(!f.schoolId)return;const cl=classrooms.find(c=>c.id.toString()===f.classroomId);if(cl&&cl.schoolId.toString()!==f.schoolId)setF(p=>({...p,classroomId:""}));},[f.schoolId]);
  const roomLabel=c=>{const sc=schools.find(x=>x.id===c.schoolId);return `${sc?.name||"?"} — Room ${c.room}`;};
  const handlePhoto=e=>{const file=e.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=()=>setF(p=>({...p,photoName:file.name,photoData:reader.result}));reader.readAsDataURL(file);};
  const validate=d=>({
    schoolId:!d.schoolId?"School is required":"",
    classroomId:!d.classroomId?"Classroom is required":"",
    items:(!d.items||!d.items.length||!d.items.some(it=>it.ftype&&it.available!==""))?"At least one furniture type with an available quantity is required":"",
  });
  const errors=touched?validate(f):{};
  const eS=k=>touched&&errors[k]?{...sel,borderColor:"#EF4444",background:"#FFF5F5"}:sel;
  const eI=k=>touched&&errors[k]?{...inp,borderColor:"#EF4444",background:"#FFF5F5"}:inp;
  const handleSave=()=>{
    setTouched(true);
    if(Object.values(validate(f)).some(Boolean))return;
    const shared={schoolId:f.schoolId,classroomId:f.classroomId,spec:f.spec,chairType:f.chairType,auditDate:f.auditDate,otherQty:f.otherQty,photoName:f.photoName,photoData:f.photoData};
    const validItems=f.items.filter(it=>it.ftype);
    if(initial){
      onSave({id:f.id,...shared,...(validItems[0]||f.items[0])});
    } else {
      onSave(validItems.map(it=>({id:uid(),...shared,...it})));
    }
  };
  return (
    <Modal title={initial?"Edit furniture":"Add furniture"} onClose={onClose} onSave={handleSave} errors={errors}>
      <Row2><Field label="School *"><select style={eS("schoolId")} value={f.schoolId} onChange={s("schoolId")}><option value="">Select</option>{schools.map(sc=><option key={sc.id} value={sc.id}>{sc.name}</option>)}</select></Field><Field label="Classroom *"><select style={eS("classroomId")} value={f.classroomId} onChange={s("classroomId")}><option value="">Select</option>{filteredClassrooms.map(c=><option key={c.id} value={c.id}>{roomLabel(c)}</option>)}</select></Field></Row2>
      <Row2><Field label="Audit date"><input style={inp} type="date" value={f.auditDate} onChange={s("auditDate")}/></Field><Field label="Specification"><input style={inp} value={f.spec} onChange={s("spec")} placeholder="e.g. Grade 4–6"/></Field></Row2>
      <Row2><Field label="Chair type"><select style={sel} value={f.chairType} onChange={s("chairType")}>{["Penny 1 Wooden","Penny 1 Plastic","Penny 4 Wooden","Penny 4 Plastic","Utility (Steel Frame)","Lab Stool","Upholstered"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Other qty"><input style={inp} type="number" value={f.otherQty} onChange={s("otherQty")}/></Field></Row2>
      <div style={{borderTop:"1px solid #E5E7EB",margin:"1rem 0 0.75rem",paddingTop:"0.75rem"}}>
        <p style={{fontSize:11,fontWeight:600,color:"#6B7280",margin:"0 0 0.5rem",textTransform:"uppercase",letterSpacing:"0.05em"}}>Furniture types</p>
        {f.items.map((item,i)=>(
          <div key={i} style={{background:"#F9FAFB",borderRadius:8,padding:"0.75rem",marginBottom:"0.5rem",border:"0.5px solid #E5E7EB"}}>
            {!initial&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <p style={{fontSize:12,fontWeight:500,margin:0,color:"#6B7280"}}>Furniture type {i+1}</p>
              {f.items.length>1&&<button onClick={()=>removeItem(i)} style={{fontSize:11,color:"#EF4444",background:"none",border:"none",cursor:"pointer"}}>Remove</button>}
            </div>}
            <Row3>
              <Field label="Category"><select style={sel} value={item.category} onChange={setItem(i,"category")}>{["Learner","Teacher","Admin","Specialised","Principal","Deputy Principal"].map(v=><option key={v}>{v}</option>)}</select></Field>
              <Field label="DBE Furniture type *"><input style={inp} list="dbe-furniture-datalist-form" value={item.ftype} onChange={setItem(i,"ftype")} placeholder="Type to search DBE furniture types..."/></Field>
              <Field label="Available *"><input style={inp} type="number" value={item.available} onChange={setItem(i,"available")}/></Field>
            </Row3>
            {item.ftype==="Other"&&<Field label="Specify type"><input style={inp} value={item.otherType} onChange={setItem(i,"otherType")} placeholder="Describe item"/></Field>}
            <Row3>
              <Field label="Damaged"><input style={inp} type="number" value={item.damaged} onChange={setItem(i,"damaged")}/></Field>
              <Field label="Repairable"><input style={inp} type="number" value={item.repairable} onChange={setItem(i,"repairable")}/></Field>
              <Field label="Condition"><select style={sel} value={item.condition} onChange={setItem(i,"condition")}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field>
            </Row3>
            <Field label="Shortage (additional units needed)"><input style={inp} type="number" value={item.shortage} onChange={setItem(i,"shortage")}/></Field>
          </div>
        ))}
        {!initial&&<button onClick={addItem} style={{fontSize:12,color:"#2563EB",background:"none",border:"0.5px solid #BFDBFE",borderRadius:8,padding:"5px 14px",cursor:"pointer"}}>+ Add another furniture type</button>}
      </div>
      <datalist id="dbe-furniture-datalist-form">{DBE_FURNITURE.map(v=><option key={v} value={v}/>)}<option value="Other"/></datalist>
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
    <Modal title="Mobile Conditional Assessment" onClose={onClose} onSave={handleSave} errors={errors}>
      <Field label="Classroom *"><select style={eS("classroomId")} value={f.classroomId} onChange={s("classroomId")}><option value="">Select</option>{classrooms.map(c=><option key={c.id} value={c.id}>{roomLabel(c)}</option>)}</select></Field>
      <Row2><Field label="Flooring condition"><select style={sel} value={f.flooring} onChange={s("flooring")}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Flooring issues"><input style={inp} value={f.flooringIssues} onChange={s("flooringIssues")} placeholder="e.g. Cracks, Holes"/></Field></Row2>
      <Row2><Field label="Windows condition"><select style={sel} value={f.windows} onChange={s("windows")}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Window issues"><input style={inp} value={f.windowIssues} onChange={s("windowIssues")} placeholder="e.g. Broken, Missing"/></Field></Row2>
      <Row3><Field label="Lock condition"><select style={sel} value={f.locks} onChange={s("locks")}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Electricity?"><select style={sel} value={f.electricity} onChange={s("electricity")}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Mobile condition"><input style={inp} value={f.mobile} onChange={s("mobile")} placeholder="N/A or condition"/></Field></Row3>
      <Field label="Comments"><textarea style={{...inp,minHeight:50,resize:"vertical"}} value={f.comments} onChange={s("comments")}/></Field>
      <Field label={`Photos (${f.photos.length}/3)`}><div style={{display:"flex",gap:10,flexWrap:"wrap",marginTop:4}}>{f.photos.map((ph,i)=><div key={i} style={{position:"relative"}}><a href={ph.data} target="_blank" rel="noreferrer"><img src={ph.data} alt={ph.name} style={{width:72,height:72,objectFit:"cover",borderRadius:8,border:"1px solid #D1D5DB",display:"block",cursor:"pointer"}}/></a><button type="button" onClick={()=>setF(p=>({...p,photos:p.photos.filter((_,x)=>x!==i)}))} style={{position:"absolute",top:-6,right:-6,width:18,height:18,borderRadius:"50%",background:"#EF4444",color:"#fff",border:"none",fontSize:10,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button></div>)}{f.photos.length<3&&<label style={{width:72,height:72,borderRadius:8,border:"1.5px dashed #9CA3AF",background:"#F9FAFB",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:20,color:"#9CA3AF"}}>📷<span style={{fontSize:10,color:"#6B7280",marginTop:2}}>Add</span><input type="file" accept="image/*" capture="environment" multiple onChange={handlePhotos} style={{display:"none"}}/></label>}</div></Field>
    </Modal>
  );
}
function RepairForm({schools,initial,onSave,onClose}) {
  const emptyItem=()=>({ftype:"",otherType:"",qty:""});
  // Migrate pre-existing records saved before multi-item support (single ftype/otherType/qty, no items array).
  const withMigratedItems=rec=>rec?{...rec,items:(rec.items&&rec.items.length)?rec.items:[{ftype:rec.ftype||"",otherType:rec.otherType||"",qty:rec.qty||""}]}:null;
  const [f,setF]=useState(withMigratedItems(initial)||{schoolId:"",emis:"",district:"",items:[emptyItem()],repairType:"Minor",destination:"Warehouse",status:"Pending",dateCollected:"",allocated:"",completed:"",comments:""});
  const [touched,setTouched]=useState(false);
  const s=k=>e=>setF(p=>({...p,[k]:e.target.value}));
  const onSchoolChange=e=>{
    const id=e.target.value; const sc=schools.find(x=>x.id==id);
    setF(p=>({...p,schoolId:id,emis:sc?sc.emis:p.emis,district:sc?sc.district:p.district}));
  };
  const setItem=(i,field)=>e=>setF(p=>({...p,items:p.items.map((it,x)=>x===i?{...it,[field]:e.target.value}:it)}));
  const addItem=()=>setF(p=>({...p,items:[...p.items,emptyItem()]}));
  const removeItem=i=>setF(p=>({...p,items:p.items.filter((_,x)=>x!==i)}));
  const validate=d=>({
    schoolId:!d.schoolId?"School is required":"",
    items:(!d.items||!d.items.length||!d.items.some(it=>it.ftype&&Number(it.qty)>0))?"At least one furniture type with a quantity is required":"",
    dateCollected:!d.dateCollected?"Date collected from school is required":"",
  });
  const errors=touched?validate(f):{};
  const eS=k=>touched&&errors[k]?{...sel,borderColor:"#EF4444",background:"#FFF5F5"}:sel;
  const eI=k=>touched&&errors[k]?{...inp,borderColor:"#EF4444",background:"#FFF5F5"}:inp;
  const handleSave=()=>{setTouched(true);if(Object.values(validate(f)).some(Boolean))return;onSave(f);};
  return (
    <Modal title={initial?"Edit repair record":"Log repair"} onClose={onClose} onSave={handleSave} errors={errors}>
      <Row2>
        <Field label="School *"><select style={eS("schoolId")} value={f.schoolId} onChange={onSchoolChange}><option value="">Select</option>{schools.map(sc=><option key={sc.id} value={sc.id}>{sc.name}</option>)}</select></Field>
        <Field label="EMIS number"><input style={inp} value={f.emis} onChange={s("emis")}/></Field>
      </Row2>
      <Field label="District"><input style={inp} value={f.district} onChange={s("district")}/></Field>
      <div style={{borderTop:"1px solid #F3F4F6",margin:"1rem 0 0.75rem",paddingTop:"0.75rem"}}>
        <p style={{fontSize:12,fontWeight:600,color:"#374151",margin:"0 0 0.75rem",textTransform:"uppercase",letterSpacing:"0.05em"}}>Furniture types collected{touched&&errors.items?<span style={{color:"#EF4444",fontWeight:400,textTransform:"none"}}> — {errors.items}</span>:""}</p>
        {f.items.map((item,i)=>(
          <div key={i} style={{background:"#F9FAFB",borderRadius:8,padding:"0.75rem",marginBottom:"0.5rem",border:"0.5px solid #E5E7EB"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <p style={{fontSize:12,fontWeight:500,margin:0,color:"#6B7280"}}>Item {i+1}</p>
              {f.items.length>1&&<button type="button" onClick={()=>removeItem(i)} style={{fontSize:11,color:"#EF4444",background:"none",border:"none",cursor:"pointer"}}>Remove</button>}
            </div>
            <Row2>
              <Field label="DBE furniture type"><select style={sel} value={item.ftype} onChange={setItem(i,"ftype")}><option value="">Select DBE type...</option>{DBE_FURNITURE.map(v=><option key={v} value={v}>{v}</option>)}<option value="Other">Other</option></select></Field>
              <Field label="Quantity"><input style={inp} type="number" value={item.qty} onChange={setItem(i,"qty")}/></Field>
            </Row2>
            {item.ftype==="Other"&&<Field label="Specify item"><input style={inp} value={item.otherType} onChange={setItem(i,"otherType")} placeholder="e.g. Computer, Printer, Whiteboard"/></Field>}
          </div>
        ))}
        <button type="button" onClick={addItem} style={{fontSize:12,color:"#2563EB",background:"none",border:"0.5px solid #BFDBFE",borderRadius:8,padding:"5px 14px",cursor:"pointer"}}>+ Add another furniture type</button>
      </div>
      <Row2><Field label="Repair type"><select style={sel} value={f.repairType} onChange={s("repairType")}>{["Minor","Major"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Destination"><select style={sel} value={f.destination} onChange={s("destination")}>{["Warehouse","Labour Dept"].map(v=><option key={v}>{v}</option>)}</select></Field></Row2>
      <Field label="Status"><select style={{...sel,maxWidth:220}} value={f.status} onChange={s("status")}>{["Pending","In Progress","Completed"].map(v=><option key={v}>{v}</option>)}</select></Field>
      <Row3><Field label="Date collected from school *"><input style={eI("dateCollected")} type="date" value={f.dateCollected} onChange={s("dateCollected")}/></Field><Field label="Date allocated"><input style={inp} type="date" value={f.allocated} onChange={s("allocated")}/></Field><Field label="Date completed"><input style={inp} type="date" value={f.completed} onChange={s("completed")}/></Field></Row3>
      <Field label="Comments"><textarea style={{...inp,minHeight:50,resize:"vertical"}} value={f.comments} onChange={s("comments")} placeholder="e.g. Condition on collection, reason for repair"/></Field>
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
function DistributionForm({schools,initial,onSave,onClose}) {
  const emptyItem=()=>({ftype:"",otherType:"",qty:""});
  // Migrate pre-existing records saved before multi-item support (single desc/qty, no items array).
  const withMigratedItems=rec=>rec?{...rec,recipientType:rec.recipientType||"School",comments:rec.comments||"",items:(rec.items&&rec.items.length)?rec.items:[{ftype:rec.desc||"",otherType:"",qty:rec.qty||""}]}:null;
  const [f,setF]=useState(withMigratedItems(initial)||{recipientType:"School",schoolId:"",district:"",circuit:"",destination:"",source:"",purpose:"Delivery",items:[emptyItem()],official:"",position:"",receiver:"",role:"",date:"",ref:"",comments:"",proofName:"",proofData:"",sigOfficial:"",sigReceiver:""});
  const [touched,setTouched]=useState(false);
  const s=k=>e=>setF(p=>({...p,[k]:e.target.value}));
  const onRecipientTypeChange=e=>{const t=e.target.value;setF(p=>({...p,recipientType:t,schoolId:t==="School"?p.schoolId:"",district:t==="School"?"":p.district,circuit:t==="Circuit Office"?p.circuit:""}));};
  const setItem=(i,field)=>e=>setF(p=>({...p,items:p.items.map((it,x)=>x===i?{...it,[field]:e.target.value}:it)}));
  const addItem=()=>setF(p=>({...p,items:[...p.items,emptyItem()]}));
  const removeItem=i=>setF(p=>({...p,items:p.items.filter((_,x)=>x!==i)}));
  const validate=d=>({
    schoolId:d.recipientType==="School"&&!d.schoolId?"School is required":"",
    district:(d.recipientType==="District Office"||d.recipientType==="Circuit Office")&&!d.district?.trim()?"District is required":"",
    circuit:d.recipientType==="Circuit Office"&&!d.circuit?.trim()?"Circuit is required":"",
    items:(!d.items||!d.items.length||!d.items.some(it=>it.ftype&&Number(it.qty)>0))?"At least one furniture type with a quantity is required":"",
    official:!d.official?.trim()?"Official name is required":"",
    date:!d.date?"Date is required":"",
  });
  const errors=touched?validate(f):{};
  const eS=k=>touched&&errors[k]?{...sel,borderColor:"#EF4444",background:"#FFF5F5"}:sel;
  const eI=k=>touched&&errors[k]?{...inp,borderColor:"#EF4444",background:"#FFF5F5"}:inp;
  const handleSave=()=>{setTouched(true);if(Object.values(validate(f)).some(Boolean))return;onSave(f);};
  const handleProof=e=>{const file=e.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=()=>setF(p=>({...p,proofName:file.name,proofData:reader.result}));reader.readAsDataURL(file);};
  return (
    <Modal title={initial?"Edit distribution record":"Add distribution record"} onClose={onClose} onSave={handleSave} errors={errors}>
      <Row2><Field label="Recipient type"><select style={sel} value={f.recipientType} onChange={onRecipientTypeChange}>{["School","District Office","Circuit Office"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Purpose"><select style={sel} value={f.purpose} onChange={s("purpose")}>{["Delivery","Collection","Repair"].map(v=><option key={v}>{v}</option>)}</select></Field></Row2>
      {f.recipientType==="School" && <Field label="School *"><select style={eS("schoolId")} value={f.schoolId} onChange={s("schoolId")}><option value="">Select</option>{schools.map(sc=><option key={sc.id} value={sc.id}>{sc.name}</option>)}</select></Field>}
      {(f.recipientType==="District Office"||f.recipientType==="Circuit Office") && <Field label="District *"><input style={eI("district")} list="distribution-district-list" value={f.district} onChange={s("district")} placeholder="e.g. FRANCES BAARD"/><datalist id="distribution-district-list">{NC_DISTRICTS.map(d=><option key={d} value={d}/>)}</datalist></Field>}
      {f.recipientType==="Circuit Office" && <Field label="Circuit *"><input style={eI("circuit")} value={f.circuit} onChange={s("circuit")} placeholder="e.g. F8"/></Field>}
      <Row2><Field label="Destination"><input style={inp} value={f.destination} onChange={s("destination")} placeholder="e.g. District Office storeroom"/></Field><Field label="Source location"><input style={inp} value={f.source} onChange={s("source")}/></Field></Row2>
      {(f.recipientType==="District Office"||f.recipientType==="Circuit Office") && <p style={{fontSize:11,color:"#6B7280",margin:"-6px 0 10px"}}>Delivered to the {f.recipientType.toLowerCase()} for onward distribution to schools — not a direct school delivery.</p>}
      <div style={{borderTop:"1px solid #F3F4F6",margin:"1rem 0 0.75rem",paddingTop:"0.75rem"}}>
        <p style={{fontSize:12,fontWeight:600,color:"#374151",margin:"0 0 0.75rem",textTransform:"uppercase",letterSpacing:"0.05em"}}>Furniture / items{touched&&errors.items?<span style={{color:"#EF4444",fontWeight:400,textTransform:"none"}}> — {errors.items}</span>:""}</p>
        {f.items.map((item,i)=>(
          <div key={i} style={{background:"#F9FAFB",borderRadius:8,padding:"0.75rem",marginBottom:"0.5rem",border:"0.5px solid #E5E7EB"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <p style={{fontSize:12,fontWeight:500,margin:0,color:"#6B7280"}}>Item {i+1}</p>
              {f.items.length>1&&<button type="button" onClick={()=>removeItem(i)} style={{fontSize:11,color:"#EF4444",background:"none",border:"none",cursor:"pointer"}}>Remove</button>}
            </div>
            <Row2>
              <Field label="DBE furniture type"><select style={sel} value={item.ftype} onChange={setItem(i,"ftype")}><option value="">Select...</option>{DBE_FURNITURE.map(v=><option key={v} value={v}>{v}</option>)}<option value="Other">Other</option></select></Field>
              <Field label="Quantity"><input style={inp} type="number" value={item.qty} onChange={setItem(i,"qty")}/></Field>
            </Row2>
            {item.ftype==="Other"&&<Field label="Specify item"><input style={inp} value={item.otherType} onChange={setItem(i,"otherType")} placeholder="e.g. Computer, Printer"/></Field>}
          </div>
        ))}
        <button type="button" onClick={addItem} style={{fontSize:12,color:"#2563EB",background:"none",border:"0.5px solid #BFDBFE",borderRadius:8,padding:"5px 14px",cursor:"pointer"}}>+ Add another furniture type</button>
      </div>
      <Row2><Field label="Official name *"><input style={eI("official")} value={f.official} onChange={s("official")}/></Field><Field label="Position"><input style={inp} value={f.position} onChange={s("position")}/></Field></Row2>
      <Row2><Field label="Receiving person"><input style={inp} value={f.receiver} onChange={s("receiver")}/></Field><Field label="Receiving role"><input style={inp} value={f.role} onChange={s("role")}/></Field></Row2>
      <Row2><Field label="Date *"><input style={eI("date")} type="date" value={f.date} onChange={s("date")}/></Field><Field label="Reference number"><input style={inp} value={f.ref} onChange={s("ref")}/></Field></Row2>
      <Field label="Proof of delivery"><input type="file" accept="application/pdf,image/*" onChange={handleProof} style={inp}/>{f.proofName&&<div style={{marginTop:6,fontSize:12,color:"#4B5563"}}>Selected: {f.proofName}</div>}</Field>
      <Field label="Comments"><textarea style={{...inp,minHeight:50,resize:"vertical"}} value={f.comments} onChange={s("comments")} placeholder="e.g. details on non-furniture items like donated shoes, stationery, blankets"/></Field>
      <div style={{borderTop:"1px solid #F3F4F6",margin:"1rem 0 0.75rem",paddingTop:"0.75rem"}}><p style={{fontSize:12,fontWeight:600,color:"#374151",margin:"0 0 0.75rem",textTransform:"uppercase",letterSpacing:"0.05em"}}>Signatures</p><Field label={`Dispatching official${f.official?" — "+f.official:""}`}><SignaturePad value={f.sigOfficial} onChange={v=>setF(p=>({...p,sigOfficial:v}))}/></Field><Field label={`Receiving person${f.receiver?" — "+f.receiver:""}`}><SignaturePad value={f.sigReceiver} onChange={v=>setF(p=>({...p,sigReceiver:v}))}/></Field></div>
    </Modal>
  );
}
function WarehouseForm({initial,onSave,onClose}) {
  const normInitial = initial ? {date:initial.date||"",supplier:initial.supplier||"",category:initial.category||"Furniture",ftype:initial.ftype||"",itemName:initial.itemName||"",spec:initial.spec||"",qty:initial.qty??"",condition:initial.condition||"Good",receivedBy:initial.receivedBy||"",ref:initial.ref||"",status:initial.status||"In Stock",comments:initial.comments||initial.notes||"",id:initial.id} : null;
  const [f,setF]=useState(normInitial||{date:"",supplier:"",category:"Furniture",ftype:"",itemName:"",spec:"",qty:"",condition:"Good",receivedBy:"",ref:"",status:"In Stock",comments:""});
  const [touched,setTouched]=useState(false);
  const s=k=>e=>setF(p=>({...p,[k]:e.target.value}));
  const validate=d=>({
    date:!d.date?"Date received is required":"",
    ftype:d.category==="Furniture"&&!d.ftype?"Furniture type is required":"",
    itemName:d.category==="Other / Donated Item"&&!d.itemName?.trim()?"Item description is required":"",
    qty:d.qty===""?"Quantity is required":"",
    receivedBy:!d.receivedBy?.trim()?"Received by is required":"",
  });
  const errors=touched?validate(f):{};
  const eS=k=>touched&&errors[k]?{...sel,borderColor:"#EF4444",background:"#FFF5F5"}:sel;
  const eI=k=>touched&&errors[k]?{...inp,borderColor:"#EF4444",background:"#FFF5F5"}:inp;
  const handleSave=()=>{setTouched(true);if(Object.values(validate(f)).some(Boolean))return;onSave(f);};
  return (
    <Modal title={initial?"Edit warehouse record":"Log warehouse delivery"} onClose={onClose} onSave={handleSave} errors={errors}>
      <Row2><Field label="Date received *"><input style={eI("date")} type="date" value={f.date} onChange={s("date")}/></Field><Field label="Supplier"><input style={inp} value={f.supplier} onChange={s("supplier")}/></Field></Row2>
      <Field label="Category"><select style={sel} value={f.category} onChange={s("category")}>{["Furniture","Other / Donated Item"].map(v=><option key={v}>{v}</option>)}</select></Field>
      {f.category==="Furniture"
        ? <Field label="DBE Furniture type *"><select style={eS("ftype")} value={f.ftype} onChange={s("ftype")}><option value="">Select...</option>{DBE_FURNITURE.map(v=><option key={v} value={v}>{v}</option>)}<option value="Other">Other</option></select></Field>
        : <Field label="Item description *"><input style={eI("itemName")} value={f.itemName} onChange={s("itemName")} placeholder="e.g. Donated school shoes, stationery, blankets"/></Field>}
      <Row3><Field label="Quantity *"><input style={eI("qty")} type="number" value={f.qty} onChange={s("qty")}/></Field><Field label="Condition"><select style={sel} value={f.condition} onChange={s("condition")}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Status"><select style={sel} value={f.status} onChange={s("status")}>{["In Stock","Reserved","Dispatched"].map(v=><option key={v}>{v}</option>)}</select></Field></Row3>
      <Row2><Field label="Received by *"><input style={eI("receivedBy")} value={f.receivedBy} onChange={s("receivedBy")}/></Field><Field label="Reference number"><input style={inp} value={f.ref} onChange={s("ref")}/></Field></Row2>
      <Field label="Comments"><textarea style={{...inp,minHeight:50,resize:"vertical"}} value={f.comments} onChange={s("comments")} placeholder="e.g. Donated by XYZ Foundation — hold at warehouse, deliver to Soweto Primary once transport is arranged"/></Field>
    </Modal>
  );
}
// ─────────────────────────────────────────────
// FURNITURE SUMMARY — per-school aggregate report
// ─────────────────────────────────────────────
function FurnitureSummaryPage({schools,classrooms,furniture}){
  const getSchoolId = f => { const cl = classrooms.find(c=>c.id==f.classroomId); return (cl && cl.schoolId!=null) ? cl.schoolId : f.schoolId; };
  const summary = useMemo(()=>schools.map(s=>{
    const rows = furniture.filter(f=>{const sid=getSchoolId(f);return sid!=null && sid.toString()===s.id.toString();});
    const available  = rows.reduce((a,f)=>a+Number(f.available||0),0);
    const damaged     = rows.reduce((a,f)=>a+Number(f.damaged||0),0);
    const repairable  = rows.reduce((a,f)=>a+Number(f.repairable||0),0);
    const shortage    = rows.reduce((a,f)=>a+Number(f.shortage||0),0);
    const good        = rows.filter(f=>f.condition==="Good").reduce((a,f)=>a+Number(f.available||0),0);
    const fair        = rows.filter(f=>f.condition==="Fair").reduce((a,f)=>a+Number(f.available||0),0);
    const poor        = rows.filter(f=>f.condition==="Poor").reduce((a,f)=>a+Number(f.available||0),0);
    const byCategory = {};
    rows.forEach(f=>{const k=f.category||"Uncategorised";byCategory[k]=(byCategory[k]||0)+Number(f.available||0);});
    const byType = {};
    rows.forEach(f=>{
      const key=(f.ftype==="Other"?f.otherType:f.ftype)||"Unspecified";
      if(!byType[key]) byType[key]={category:f.category||"—",available:0,damaged:0,repairable:0,shortage:0,condition:f.condition};
      byType[key].available+=Number(f.available||0);
      byType[key].damaged+=Number(f.damaged||0);
      byType[key].repairable+=Number(f.repairable||0);
      byType[key].shortage+=Number(f.shortage||0);
    });
    const typeRows = Object.entries(byType).map(([ftype,v])=>({ftype,...v})).sort((a,b)=>b.available-a.available);
    return {school:s,rows,available,damaged,repairable,shortage,total:available+damaged,good,fair,poor,byCategory,typeRows};
  }),[schools,furniture,classrooms]);
  const grandAvailable = summary.reduce((a,s)=>a+s.available,0);
  const grandDamaged   = summary.reduce((a,s)=>a+s.damaged,0);
  const grandRepairable= summary.reduce((a,s)=>a+s.repairable,0);
  const grandShortage  = summary.reduce((a,s)=>a+s.shortage,0);
  const schoolsWithData = summary.filter(s=>s.rows.length>0).length;
  const masterCols=["School","EMIS","District","Distinct Types","Available","Damaged","Repairable","Shortage","Good Condition","Fair Condition","Poor Condition"];
  const masterRows=summary.map(s=>[s.school.name,s.school.emis,s.school.district,s.typeRows.length,s.available,s.damaged,s.repairable,s.shortage,s.good,s.fair,s.poor]);
  return (
    <div>
      <SectionHeader title="Furniture Summary — Per School" extra={<ExportBtn label="CSV (all schools)" filename="furniture_summary_per_school.csv" cols={masterCols} rows={masterRows}/>}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12,marginBottom:"1.25rem"}}>
        <StatCard label="Schools with furniture data" value={schoolsWithData} sub={`of ${schools.length} schools`} color="#2563EB"/>
        <StatCard label="Total available"             value={grandAvailable} sub="Across all schools"          color="#059669"/>
        <StatCard label="Total damaged"                value={grandDamaged}   sub="Needs attention"             color="#DC2626"/>
        <StatCard label="Total repairable"             value={grandRepairable} sub="Can be salvaged"            color="#D97706"/>
        <StatCard label="Total shortage"               value={grandShortage}  sub="Additional units needed"     color="#DC2626"/>
      </div>
      {schools.length===0&&<Card><p style={{color:"#9CA3AF",textAlign:"center"}}>No schools registered yet.</p></Card>}
      <div style={{display:"grid",gap:"1rem"}}>
        {summary.map(s=>(
          <Card key={s.school.id}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12,flexWrap:"wrap",gap:8}}>
              <div>
                <p style={{fontWeight:600,fontSize:15,margin:"0 0 2px",color:"#111827"}}>{s.school.name}</p>
                <p style={{fontSize:12,color:"#6B7280",margin:0}}>EMIS: {s.school.emis||"—"} · {s.school.district||"—"}{s.school.circuit?` · Circuit: ${s.school.circuit}`:""}</p>
              </div>
              {s.rows.length>0&&<ExportBtn label="CSV" filename={`furniture_${(s.school.name||"school").replace(/[^a-z0-9]+/gi,"_")}.csv`} cols={["Category","Furniture type","Available","Damaged","Repairable","Shortage"]} rows={s.typeRows.map(t=>[t.category,t.ftype,t.available,t.damaged,t.repairable,t.shortage])}/>}
            </div>
            {s.rows.length===0?<p style={{fontSize:13,color:"#9CA3AF",margin:0}}>No furniture captured for this school yet.</p>:(
              <>
                <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,marginBottom:14}}>
                  {[["Available",s.available,"#059669"],["Damaged",s.damaged,"#DC2626"],["Repairable",s.repairable,"#D97706"],["Shortage",s.shortage,"#DC2626"],["Distinct types",s.typeRows.length,"#2563EB"]].map(([l,v,c])=>(
                    <div key={l} style={{background:"#F9FAFB",borderRadius:8,padding:"10px 14px"}}><p style={{fontSize:11,color:"#6B7280",margin:"0 0 4px"}}>{l}</p><p style={{fontSize:20,fontWeight:600,margin:0,color:c}}>{v}</p></div>
                  ))}
                </div>
                <DataTable cols={["Category","Furniture type","Available","Damaged","Repairable","Shortage"]} rows={s.typeRows}
                  renderRow={t=>[t.category,t.ftype,t.available,t.damaged>0?<span style={{color:"#DC2626",fontWeight:600}}>{t.damaged}</span>:t.damaged,t.repairable>0?<span style={{color:"#D97706",fontWeight:600}}>{t.repairable}</span>:t.repairable,t.shortage>0?<span style={{color:"#DC2626",fontWeight:600}}>{t.shortage}</span>:t.shortage]}/>
              </>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
// ─────────────────────────────────────────────
// SCHOOL CAPTURE — tabbed single-school form
// ─────────────────────────────────────────────
function SchoolCapturePage({schools,classrooms,furniture,conditions,repairs,onSaveAll,showToast,emisData}) {
  const [tab,setTab]=useState(0);
  const [selectedSchoolId,setSelectedSchoolId]=useState("");
  const [emisSearch,setEmisSearch]=useState("");
  const [emisMatch,setEmisMatch]=useState(null);
  const [newSchool,setNewSchool]=useState({name:"",emis:"",province:"NC",district:"",circuit:"",capacity:"",mobiles:"",mobileCap:"35",enrolment:"",teachers:"",risk:"Low"});
  // Search EMIS database and pre-fill school form
  const searchEmis = val => {
    setEmisSearch(val);
    setEmisMatch(null);
    if (!val.trim()) return;
    const q = val.trim().toLowerCase();
    const match = emisData.find(s =>
      s.emis === val.trim() ||
      s.name.toLowerCase().includes(q) ||
      s.emis.includes(val.trim())
    );
    setEmisMatch(match || null);
  };
  const applyEmisMatch = () => {
    if (!emisMatch) return;
    setNewSchool(p => ({...p,
      name: emisMatch.name,
      emis: emisMatch.emis,
      province: emisMatch.province || "NC",
      district: emisMatch.district || "",
      circuit: emisMatch.circuit || "",
    }));
    setEmisSearch("");
    setEmisMatch(null);
    showToast(`✓ Pre-filled from EMIS: ${emisMatch.name}`);
  };
  const [audit,setAudit]=useState({year:new Date().getFullYear(),date:new Date().toISOString().slice(0,10),risk:"Low",capWith:"",capWithout:"",overcapacity:"No",recommendations:"",comments:"",hallAvailable:"No",hallCondition:"Good",hallCapacity:"",hallUsage:"",hallFloor:"Good",hallRoof:"Good",hallElectricity:"Yes",hallToilets:"No",hallIssues:"",hallNotes:""});
  const emptyFurnItem=()=>({ftype:"",otherType:"",category:"Learner",available:"",damaged:"",repairable:"",shortage:"",condition:"Good"});
  const [clsRows,setClsRows]=useState([{room:"",type:"Classroom",grade:"",spec:"",learners:"",isMobile:"No",inUse:"Yes",comments:"",furnitureItems:[emptyFurnItem()]}]);
  const [condRow,setCondRow]=useState({flooring:"Good",flooringIssues:"",windows:"Good",windowIssues:"",locks:"Good",electricity:"Yes",mobile:"N/A",comments:"",photos:[]});
  const emptyMobileItem=()=>({mobileCount:"",condition:"Good",structuralIssues:"",electricityAvail:"Yes",ablutions:"Yes",recommendation:""});
  const [mobileRows,setMobileRows]=useState([emptyMobileItem()]);
  const [repairRows,setRepairRows]=useState([{furnitureId:"",ftype:"",repairType:"Minor",destination:"Warehouse",qty:"",status:"Pending",allocated:"",completed:""}]);
  const sa=k=>e=>setAudit(p=>({...p,[k]:e.target.value}));
  const sc=k=>e=>setNewSchool(p=>({...p,[k]:e.target.value}));
  const tabs=["1. School","2. Audit","3. Classrooms & Furniture","4. Mobile Assessment","5. Repairs"];
  const handleSaveAll=()=>{
    const schoolId=selectedSchoolId||uid();
    const school=selectedSchoolId?null:{...newSchool,id:schoolId};
    const auditRecord={...audit,schoolId,id:uid()};
    const roomRows=clsRows.filter(r=>r.room);
    const classroomRecords=roomRows.map(r=>({id:uid(),schoolId,room:r.room,type:r.type,grade:r.grade,spec:r.spec,learners:r.learners,isMobile:r.isMobile,inUse:r.inUse||"Yes",comments:r.inUse==="No"?(r.comments||""):""}));
    const furnitureRecords=roomRows.flatMap((r,i)=>(r.furnitureItems||[]).filter(it=>it.ftype).map(it=>({id:uid(),schoolId,classroomId:classroomRecords[i]?.id||"",ftype:it.ftype,otherType:it.otherType||"",category:it.category,available:it.available,damaged:it.damaged,repairable:it.repairable,shortage:it.shortage||"",condition:it.condition,spec:r.spec,auditDate:audit.date,photoName:"",photoData:""})));
    const condRecord=condRow.flooring?{...condRow,id:uid(),classroomId:classroomRecords[0]?.id||""}:null;
    const mobileAuditRecords=mobileRows.filter(r=>r.mobileCount).map(r=>({...r,id:uid(),schoolId,auditDate:audit.date,auditedBy:"PY Tshabangu"}));
    const repairRecords=repairRows.filter(r=>r.furnitureId&&r.qty).map(r=>({...r,id:uid()}));
    onSaveAll({school,audit:auditRecord,classrooms:classroomRecords,furniture:furnitureRecords,condition:condRecord,mobileAudit:mobileAuditRecords,repairs:repairRecords});
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
      <datalist id="dbe-furniture-datalist">{DBE_FURNITURE.map(v=><option key={v} value={v}/>)}<option value="Other"/></datalist>
      <div style={{background:"#fff",border:"0.5px solid #E0E7EF",borderRadius:"0 14px 14px 14px",padding:"1.5rem"}}>
        {tab===0&&<div>
          <h3 style={{fontSize:15,fontWeight:600,margin:"0 0 1rem"}}>School details</h3>
          {selectedSchoolId?<p style={{color:"#059669",fontSize:13}}>✓ Using existing school: <strong>{schools.find(s=>s.id==selectedSchoolId)?.name}</strong></p>:<>
            {/* EMIS database search to pre-fill */}
            <div style={{background:"linear-gradient(135deg,#EFF6FF,#DBEAFE)",border:"1px solid #BFDBFE",borderRadius:10,padding:"12px 14px",marginBottom:"1rem"}}>
              <p style={{fontSize:12,fontWeight:600,color:"#1E40AF",margin:"0 0 6px"}}>🔍 Search EMIS database to pre-fill</p>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <input style={{...inp,flex:1}} value={emisSearch} onChange={e=>searchEmis(e.target.value)} placeholder="Type school name or EMIS number..."/>
                {emisMatch&&<button type="button" onClick={applyEmisMatch} style={{padding:"7px 16px",borderRadius:8,border:"none",background:"#2563EB",color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>Use this →</button>}
              </div>
              {emisSearch && emisMatch && (
                <div style={{marginTop:8,background:"#fff",borderRadius:8,padding:"8px 12px",border:"1px solid #BFDBFE"}}>
                  <p style={{margin:"0 0 2px",fontSize:13,fontWeight:600,color:"#111827"}}>{emisMatch.name}</p>
                  <p style={{margin:0,fontSize:12,color:"#6B7280"}}>EMIS: {emisMatch.emis} · {emisMatch.district} · {emisMatch.circuit||"—"}</p>
                </div>
              )}
              {emisSearch && !emisMatch && <p style={{fontSize:12,color:"#9CA3AF",margin:"6px 0 0"}}>No match found — fill in manually below</p>}
              {!emisData.length && <p style={{fontSize:12,color:"#9CA3AF",margin:"6px 0 0"}}>Upload EMIS dataset in the EMIS Database page to enable search</p>}
            </div>
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
                <Field label="Type"><select style={sel} value={row.type} onChange={e=>setClsRows(p=>p.map((r,x)=>x===i?{...r,type:e.target.value}:r))}>{["Classroom","Lab","Office","Storage","Science Laboratory","Library","Hospitality Room","Computer Lab","Tuck Shop","Consumer Room"].map(v=><option key={v}>{v}</option>)}</select></Field>
                <Field label="Grade"><input style={inp} value={row.grade} onChange={e=>setClsRows(p=>p.map((r,x)=>x===i?{...r,grade:e.target.value}:r))}/></Field>
              </Row3>
              <Row3>
                <Field label="Learners"><input style={inp} type="number" value={row.learners} onChange={e=>setClsRows(p=>p.map((r,x)=>x===i?{...r,learners:e.target.value}:r))}/></Field>
                <Field label="Spec (e.g. 4E1)"><input style={inp} value={row.spec} onChange={e=>setClsRows(p=>p.map((r,x)=>x===i?{...r,spec:e.target.value}:r))}/></Field>
                <Field label="Is mobile?"><select style={sel} value={row.isMobile} onChange={e=>setClsRows(p=>p.map((r,x)=>x===i?{...r,isMobile:e.target.value}:r))}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field>
              </Row3>
              <Row2>
                <Field label="In use?"><select style={sel} value={row.inUse||"Yes"} onChange={e=>setClsRows(p=>p.map((r,x)=>x===i?{...r,inUse:e.target.value}:r))}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field>
                {(row.inUse||"Yes")==="No"&&<Field label="Comments (reason not in use)"><input style={inp} value={row.comments||""} onChange={e=>setClsRows(p=>p.map((r,x)=>x===i?{...r,comments:e.target.value}:r))} placeholder="e.g. Roof damage, being used for storage, awaiting repairs"/></Field>}
              </Row2>
              <div style={{borderTop:"1px solid #E5E7EB",margin:"0.75rem 0",paddingTop:"0.75rem"}}>
                <p style={{fontSize:11,fontWeight:600,color:"#6B7280",margin:"0 0 0.5rem",textTransform:"uppercase",letterSpacing:"0.05em"}}>Furniture in this room</p>
                {(row.furnitureItems||[]).map((item,j)=>(
                  <div key={j} style={{background:"#fff",borderRadius:8,padding:"0.75rem",marginBottom:"0.5rem",border:"0.5px solid #E5E7EB"}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                      <p style={{fontSize:12,fontWeight:500,margin:0,color:"#6B7280"}}>Furniture type {j+1}</p>
                      {row.furnitureItems.length>1&&<button onClick={()=>setClsRows(p=>p.map((r,x)=>x===i?{...r,furnitureItems:r.furnitureItems.filter((_,y)=>y!==j)}:r))} style={{fontSize:11,color:"#EF4444",background:"none",border:"none",cursor:"pointer"}}>Remove</button>}
                    </div>
                    <Row3>
                      <Field label="Category"><select style={sel} value={item.category} onChange={e=>setClsRows(p=>p.map((r,x)=>x===i?{...r,furnitureItems:r.furnitureItems.map((it,y)=>y===j?{...it,category:e.target.value}:it)}:r))}>{["Learner","Teacher","Admin","Specialised","Principal","Deputy Principal"].map(v=><option key={v}>{v}</option>)}</select></Field>
                      <Field label="DBE Furniture type"><input style={inp} list="dbe-furniture-datalist" value={item.ftype} onChange={e=>setClsRows(p=>p.map((r,x)=>x===i?{...r,furnitureItems:r.furnitureItems.map((it,y)=>y===j?{...it,ftype:e.target.value}:it)}:r))} placeholder="Type to search DBE furniture types..."/></Field>
                      <Field label="Available"><input style={inp} type="number" value={item.available} onChange={e=>setClsRows(p=>p.map((r,x)=>x===i?{...r,furnitureItems:r.furnitureItems.map((it,y)=>y===j?{...it,available:e.target.value}:it)}:r))}/></Field>
                    </Row3>
                    {item.ftype==="Other"&&<Field label="Specify furniture type"><input style={inp} value={item.otherType||""} onChange={e=>setClsRows(p=>p.map((r,x)=>x===i?{...r,furnitureItems:r.furnitureItems.map((it,y)=>y===j?{...it,otherType:e.target.value}:it)}:r))} placeholder="e.g. Computer, Printer, Whiteboard"/></Field>}
                    <Row3>
                      <Field label="Damaged"><input style={inp} type="number" value={item.damaged} onChange={e=>setClsRows(p=>p.map((r,x)=>x===i?{...r,furnitureItems:r.furnitureItems.map((it,y)=>y===j?{...it,damaged:e.target.value}:it)}:r))}/></Field>
                      <Field label="Repairable"><input style={inp} type="number" value={item.repairable} onChange={e=>setClsRows(p=>p.map((r,x)=>x===i?{...r,furnitureItems:r.furnitureItems.map((it,y)=>y===j?{...it,repairable:e.target.value}:it)}:r))}/></Field>
                      <Field label="Condition"><select style={sel} value={item.condition} onChange={e=>setClsRows(p=>p.map((r,x)=>x===i?{...r,furnitureItems:r.furnitureItems.map((it,y)=>y===j?{...it,condition:e.target.value}:it)}:r))}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field>
                    </Row3>
                    <Field label="Shortage (additional units needed for this classroom)"><input style={inp} type="number" value={item.shortage||""} onChange={e=>setClsRows(p=>p.map((r,x)=>x===i?{...r,furnitureItems:r.furnitureItems.map((it,y)=>y===j?{...it,shortage:e.target.value}:it)}:r))} placeholder="e.g. 5"/></Field>
                  </div>
                ))}
                <button onClick={()=>setClsRows(p=>p.map((r,x)=>x===i?{...r,furnitureItems:[...(r.furnitureItems||[]),emptyFurnItem()]}:r))} style={{fontSize:12,color:"#2563EB",background:"none",border:"0.5px solid #BFDBFE",borderRadius:8,padding:"5px 14px",cursor:"pointer"}}>+ Add another furniture type</button>
              </div>
            </div>
          ))}
          <button onClick={()=>setClsRows(p=>[...p,{room:"",type:"Classroom",grade:"",spec:"",learners:"",isMobile:"No",inUse:"Yes",comments:"",furnitureItems:[emptyFurnItem()]}])} style={{fontSize:13,color:"#2563EB",background:"none",border:"0.5px solid #BFDBFE",borderRadius:8,padding:"6px 16px",cursor:"pointer"}}>+ Add another room</button>
        </div>}
        {tab===3&&<div>
          <h3 style={{fontSize:15,fontWeight:600,margin:"0 0 1rem"}}>Condition assessment</h3>
          <Row2><Field label="Flooring"><select style={sel} value={condRow.flooring} onChange={e=>setCondRow(p=>({...p,flooring:e.target.value}))}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Flooring issues"><input style={inp} value={condRow.flooringIssues} onChange={e=>setCondRow(p=>({...p,flooringIssues:e.target.value}))}/></Field></Row2>
          <Row2><Field label="Windows"><select style={sel} value={condRow.windows} onChange={e=>setCondRow(p=>({...p,windows:e.target.value}))}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Window issues"><input style={inp} value={condRow.windowIssues} onChange={e=>setCondRow(p=>({...p,windowIssues:e.target.value}))}/></Field></Row2>
          <Row3><Field label="Locks"><select style={sel} value={condRow.locks} onChange={e=>setCondRow(p=>({...p,locks:e.target.value}))}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Electricity"><select style={sel} value={condRow.electricity} onChange={e=>setCondRow(p=>({...p,electricity:e.target.value}))}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Mobile condition"><input style={inp} value={condRow.mobile} onChange={e=>setCondRow(p=>({...p,mobile:e.target.value}))}/></Field></Row3>
          <Field label="Comments"><textarea style={{...inp,minHeight:50,resize:"vertical"}} value={condRow.comments} onChange={e=>setCondRow(p=>({...p,comments:e.target.value}))}/></Field>
          <div style={{borderTop:"1px solid #E5E7EB",margin:"1.25rem 0 1rem",paddingTop:"1rem"}}>
            <p style={{fontSize:11,fontWeight:600,color:"#6B7280",margin:"0 0 0.5rem",textTransform:"uppercase",letterSpacing:"0.05em"}}>Mobile classrooms</p>
            {mobileRows.map((row,i)=>(
              <div key={i} style={{background:"#F9FAFB",borderRadius:10,padding:"1rem",marginBottom:"0.75rem",border:"0.5px solid #E5E7EB"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><p style={{fontWeight:500,fontSize:13,margin:0,color:"#374151"}}>Mobile classroom {i+1}</p>{mobileRows.length>1&&<button onClick={()=>setMobileRows(p=>p.filter((_,x)=>x!==i))} style={{fontSize:11,color:"#EF4444",background:"none",border:"none",cursor:"pointer"}}>Remove</button>}</div>
                <Row3>
                  <Field label="Number of mobiles"><input style={inp} type="number" value={row.mobileCount} onChange={e=>setMobileRows(p=>p.map((r,x)=>x===i?{...r,mobileCount:e.target.value}:r))}/></Field>
                  <Field label="Overall condition"><select style={sel} value={row.condition} onChange={e=>setMobileRows(p=>p.map((r,x)=>x===i?{...r,condition:e.target.value}:r))}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select></Field>
                  <Field label="Electricity?"><select style={sel} value={row.electricityAvail} onChange={e=>setMobileRows(p=>p.map((r,x)=>x===i?{...r,electricityAvail:e.target.value}:r))}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field>
                </Row3>
                <Row3>
                  <Field label="Ablutions?"><select style={sel} value={row.ablutions} onChange={e=>setMobileRows(p=>p.map((r,x)=>x===i?{...r,ablutions:e.target.value}:r))}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field>
                  <Field label="Structural issues"><input style={inp} value={row.structuralIssues} onChange={e=>setMobileRows(p=>p.map((r,x)=>x===i?{...r,structuralIssues:e.target.value}:r))} placeholder="e.g. Roof leaks, floor damage"/></Field>
                  <Field label="Recommendation"><input style={inp} value={row.recommendation} onChange={e=>setMobileRows(p=>p.map((r,x)=>x===i?{...r,recommendation:e.target.value}:r))} placeholder="e.g. Repair, Replace, Monitor"/></Field>
                </Row3>
              </div>
            ))}
            <button onClick={()=>setMobileRows(p=>[...p,emptyMobileItem()])} style={{fontSize:12,color:"#2563EB",background:"none",border:"0.5px solid #BFDBFE",borderRadius:8,padding:"5px 14px",cursor:"pointer"}}>+ Add another mobile classroom</button>
          </div>
        </div>}
        {tab===4&&<div>
          <h3 style={{fontSize:15,fontWeight:600,margin:"0 0 1rem"}}>Repairs</h3>
          {repairRows.map((row,i)=>(
            <div key={i} style={{background:"#F9FAFB",borderRadius:10,padding:"1rem",marginBottom:"0.75rem",border:"0.5px solid #E5E7EB"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><p style={{fontWeight:500,fontSize:13,margin:0}}>Repair {i+1}</p>{repairRows.length>1&&<button onClick={()=>setRepairRows(p=>p.filter((_,x)=>x!==i))} style={{fontSize:11,color:"#EF4444",background:"none",border:"none",cursor:"pointer"}}>Remove</button>}</div>
              <Field label="DBE Furniture type"><input style={inp} list="dbe-furniture-datalist" value={row.ftype} onChange={e=>setRepairRows(p=>p.map((r,x)=>x===i?{...r,ftype:e.target.value}:r))} placeholder="Type to search DBE furniture types..."/></Field>
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
function SchoolRequestForm({schools,onSave,onClose}){
  const [f,setF]=useState({refNumber:"",schoolId:"",district:"",category:"Furniture",requestType:REQUEST_TYPES_BY_CATEGORY["Furniture"][0],priority:"Medium",priorityBasis:"Need",dateReceived:"",govErpCaptured:"Yes",verified:"Pending",verificationDate:"",status:"Pending",dueDate:"",completedDate:"",assignedTo:"PY Tshabangu",proofOfDelivery:"No",closedWithDocs:"No",notes:""});
  const [touched,setTouched]=useState(false);
  const s=k=>e=>setF(p=>({...p,[k]:e.target.value}));
  const onCategoryChange=e=>{const cat=e.target.value;setF(p=>({...p,category:cat,requestType:REQUEST_TYPES_BY_CATEGORY[cat][0]}));};
  const onSchoolChange=e=>{const id=e.target.value;const sc=schools.find(x=>x.id==id);setF(p=>({...p,schoolId:id,district:sc?sc.district:p.district}));};
  const validate=d=>({
    schoolId:!d.schoolId?"School is required":"",
    dateReceived:!d.dateReceived?"Date received is required":"",
  });
  const errors=touched?validate(f):{};
  const eS=k=>touched&&errors[k]?{...sel,borderColor:"#EF4444",background:"#FFF5F5"}:sel;
  const eI=k=>touched&&errors[k]?{...inp,borderColor:"#EF4444",background:"#FFF5F5"}:inp;
  const handleSave=()=>{setTouched(true);if(Object.values(validate(f)).some(Boolean))return;onSave(f);};
  return (
    <Modal title="Log school furniture / infrastructure request" onClose={onClose} onSave={handleSave} errors={errors}>
      <Row2>
        <Field label="GovERP reference number"><input style={inp} value={f.refNumber} onChange={s("refNumber")} placeholder="e.g. GOVERP-2026-0412"/></Field>
        <Field label="School *"><select style={eS("schoolId")} value={f.schoolId} onChange={onSchoolChange}><option value="">Select</option>{schools.map(sc=><option key={sc.id} value={sc.id}>{sc.name}</option>)}</select></Field>
      </Row2>
      <Field label="District"><input style={inp} value={f.district} onChange={s("district")}/></Field>
      <Row2>
        <Field label="Category"><select style={sel} value={f.category} onChange={onCategoryChange}>{REQUEST_CATEGORIES.map(c=><option key={c}>{c}</option>)}</select></Field>
        <Field label="Request type"><select style={sel} value={f.requestType} onChange={s("requestType")}>{REQUEST_TYPES_BY_CATEGORY[f.category].map(v=><option key={v}>{v}</option>)}</select></Field>
      </Row2>
      <Row2>
        <Field label="Priority"><select style={sel} value={f.priority} onChange={s("priority")}>{["High","Medium","Low"].map(v=><option key={v}>{v}</option>)}</select></Field>
        <Field label="Priority basis"><select style={sel} value={f.priorityBasis} onChange={s("priorityBasis")}>{REQUEST_PRIORITY_BASIS.map(v=><option key={v}>{v}</option>)}</select></Field>
      </Row2>
      <Row3>
        <Field label="Date received *"><input style={eI("dateReceived")} type="date" value={f.dateReceived} onChange={s("dateReceived")}/></Field>
        <Field label="Captured on GovERP?"><select style={sel} value={f.govErpCaptured} onChange={s("govErpCaptured")}>{["Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field>
        <Field label="Verified?"><select style={sel} value={f.verified} onChange={s("verified")}>{["Pending","Yes","No"].map(v=><option key={v}>{v}</option>)}</select></Field>
      </Row3>
      <Row3>
        <Field label="Verification date"><input style={inp} type="date" value={f.verificationDate} onChange={s("verificationDate")}/></Field>
        <Field label="Status"><select style={sel} value={f.status} onChange={s("status")}>{["Pending","In Progress","Approved","Completed","Declined"].map(v=><option key={v}>{v}</option>)}</select></Field>
        <Field label="Assigned to"><input style={inp} value={f.assignedTo} onChange={s("assignedTo")}/></Field>
      </Row3>
      <Row3>
        <Field label="Due date (SLA)"><input style={inp} type="date" value={f.dueDate} onChange={s("dueDate")}/></Field>
        <Field label="Completed date"><input style={inp} type="date" value={f.completedDate} onChange={s("completedDate")}/></Field>
        <Field label="Proof of delivery obtained?"><select style={sel} value={f.proofOfDelivery} onChange={s("proofOfDelivery")}>{["No","Yes","N/A"].map(v=><option key={v}>{v}</option>)}</select></Field>
      </Row3>
      <Field label="Closed with supporting documentation?"><select style={{...sel,maxWidth:260}} value={f.closedWithDocs} onChange={s("closedWithDocs")}>{["No","Yes"].map(v=><option key={v}>{v}</option>)}</select></Field>
      <Field label="Notes"><textarea style={{...inp,minHeight:50,resize:"vertical"}} value={f.notes} onChange={s("notes")}/></Field>
    </Modal>
  );
}
function AdminTaskForm({onSave,onClose}){const [f,setF]=useState({type:"Payment Verification",ref:"",date:"",amount:"",supplier:"",status:"Pending",notes:""});const s=k=>e=>setF(p=>({...p,[k]:e.target.value}));return(<Modal title="Log admin task" onClose={onClose} onSave={()=>onSave(f)}><Row2><Field label="Task type"><select style={sel} value={f.type} onChange={s("type")}>{["Payment Verification","Stakeholder Enquiry","Filing / Scanning","Training","Correspondence","Other"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Reference number"><input style={inp} value={f.ref} onChange={s("ref")} placeholder="e.g. PAY-2026-001"/></Field></Row2><Row2><Field label="Date"><input style={inp} type="date" value={f.date} onChange={s("date")}/></Field><Field label="Status"><select style={sel} value={f.status} onChange={s("status")}>{["Pending","In Progress","Verified","Completed","Resolved"].map(v=><option key={v}>{v}</option>)}</select></Field></Row2><Row2><Field label="Amount (if payment)"><input style={inp} value={f.amount} onChange={s("amount")} placeholder="e.g. R 45,000"/></Field><Field label="Supplier / party"><input style={inp} value={f.supplier} onChange={s("supplier")}/></Field></Row2><Field label="Notes / evidence"><textarea style={{...inp,minHeight:50,resize:"vertical"}} value={f.notes} onChange={s("notes")}/></Field></Modal>);}
function TransferForm({schools,existingProjects,onSave,onClose}){
  const [f,setF]=useState({
    projectName:"",emisNumber:"",schoolId:"",district:"",
    projectBudget:"",finalCost:"",contractor:"",implementingAgent:"",
    completionDate:"",handoverDate:"",phase:"Practical Completion",
    checklist:emptyChecklist(),
    assets:emptyAssets(),
    onTime:"",handoverWithin30Days:"",defectsIdentified:"",defectsResolved:"",satisfactionRating:"",assetRegCompliant:"",
    principalName:"",principalSig:"",principalDate:"",
    districtOfficialName:"",districtOfficialSig:"",districtOfficialDate:"",
    infraDirName:"",infraDirSig:"",infraDirDate:"",
    contractorName:"",contractorSig:"",contractorDate:"",
    notes:"",
  });
  const [touched,setTouched]=useState(false);
  const s=k=>e=>setF(p=>({...p,[k]:e.target.value}));
  const onSchoolChange=e=>{
    const id=e.target.value; const sc=schools.find(x=>x.id==id);
    setF(p=>({...p,schoolId:id,emisNumber:sc?sc.emis:p.emisNumber,district:sc?sc.district:p.district}));
  };
  const setChecklistField=(key,field)=>e=>setF(p=>({...p,checklist:{...p.checklist,[key]:{...p.checklist[key],[field]:e.target.value}}}));
  const setAssetField=(key,field)=>e=>setF(p=>({...p,assets:{...p.assets,[key]:{...p.assets[key],[field]:e.target.value}}}));
  const validate=d=>({
    projectName:!d.projectName||!d.projectName.trim()?"Project name is required":"",
    schoolId:!d.schoolId?"School is required":"",
    completionDate:!d.completionDate?"Completion date is required":"",
  });
  const errors=touched?validate(f):{};
  const eS=k=>touched&&errors[k]?{...sel,borderColor:"#EF4444",background:"#FFF5F5"}:sel;
  const eI=k=>touched&&errors[k]?{...inp,borderColor:"#EF4444",background:"#FFF5F5"}:inp;
  const handleSave=()=>{setTouched(true);if(Object.values(validate(f)).some(Boolean))return;onSave(f);};
  const sectionHdr = txt => <div style={{borderTop:"1px solid #F3F4F6",margin:"1.25rem 0 0.75rem",paddingTop:"0.75rem"}}><p style={{fontSize:12,fontWeight:600,color:"#374151",margin:"0 0 0.75rem",textTransform:"uppercase",letterSpacing:"0.05em"}}>{txt}</p></div>;
  const miniInp={...inp,padding:"5px 8px",fontSize:12};
  const miniSel={...sel,padding:"5px 6px",fontSize:12};
  return (
    <Modal title="Infrastructure project transfer & handover" onClose={onClose} onSave={handleSave} errors={errors}>
      <Row2>
        <Field label="Project name *"><input style={eI("projectName")} list="transfer-project-list" value={f.projectName} onChange={s("projectName")} placeholder="e.g. Kimberley North Primary — New Admin Block"/><datalist id="transfer-project-list">{(existingProjects||[]).map(p=><option key={p} value={p}/>)}</datalist></Field>
        <Field label="School *"><select style={eS("schoolId")} value={f.schoolId} onChange={onSchoolChange}><option value="">Select</option>{schools.map(sc=><option key={sc.id} value={sc.id}>{sc.name}</option>)}</select></Field>
      </Row2>
      <Row2>
        <Field label="EMIS number"><input style={inp} value={f.emisNumber} onChange={s("emisNumber")}/></Field>
        <Field label="District"><input style={inp} value={f.district} onChange={s("district")}/></Field>
      </Row2>
      <Row2>
        <Field label="Project budget"><input style={inp} value={f.projectBudget} onChange={s("projectBudget")} placeholder="e.g. R 3,200,000"/></Field>
        <Field label="Final project cost"><input style={inp} value={f.finalCost} onChange={s("finalCost")} placeholder="e.g. R 3,150,000"/></Field>
      </Row2>
      <Row2>
        <Field label="Contractor"><input style={inp} value={f.contractor} onChange={s("contractor")}/></Field>
        <Field label="Implementing agent"><input style={inp} value={f.implementingAgent} onChange={s("implementingAgent")}/></Field>
      </Row2>
      <Row3>
        <Field label="Completion date *"><input style={eI("completionDate")} type="date" value={f.completionDate} onChange={s("completionDate")}/></Field>
        <Field label="Handover date"><input style={inp} type="date" value={f.handoverDate} onChange={s("handoverDate")}/></Field>
        <Field label="Current phase"><select style={sel} value={f.phase} onChange={s("phase")}>{TRANSFER_PHASES.map(p=><option key={p}>{p}</option>)}</select></Field>
      </Row3>

      {sectionHdr("School transfer checklist")}
      {TRANSFER_CHECKLIST.map(c=>(
        <div key={c.key} style={{display:"grid",gridTemplateColumns:"1.6fr 80px 1.3fr",gap:8,marginBottom:6,alignItems:"center"}}>
          <span style={{fontSize:12,color:"#374151"}}>{c.label}</span>
          <select style={miniSel} value={f.checklist[c.key].value} onChange={setChecklistField(c.key,"value")}><option value="">—</option><option>Yes</option><option>No</option><option>N/A</option></select>
          <input style={miniInp} placeholder="Remarks" value={f.checklist[c.key].remarks} onChange={setChecklistField(c.key,"remarks")}/>
        </div>
      ))}

      {sectionHdr("Asset transfer summary")}
      {TRANSFER_ASSET_CATEGORIES.map(c=>(
        <div key={c.key} style={{display:"grid",gridTemplateColumns:"1.6fr 90px 1fr",gap:8,marginBottom:6,alignItems:"center"}}>
          <span style={{fontSize:12,color:"#374151"}}>{c.label}</span>
          <input style={miniInp} type="number" placeholder="Qty" value={f.assets[c.key].qty} onChange={setAssetField(c.key,"qty")}/>
          <select style={miniSel} value={f.assets[c.key].condition} onChange={setAssetField(c.key,"condition")}>{["Good","Fair","Poor"].map(v=><option key={v}>{v}</option>)}</select>
        </div>
      ))}

      {sectionHdr("Key performance indicators")}
      <Row2>
        <Field label="Completed on time?"><select style={sel} value={f.onTime} onChange={s("onTime")}><option value="">—</option><option>Yes</option><option>No</option></select></Field>
        <Field label="Handed over within 30 days of completion?"><select style={sel} value={f.handoverWithin30Days} onChange={s("handoverWithin30Days")}><option value="">—</option><option>Yes</option><option>No</option></select></Field>
      </Row2>
      <Row2>
        <Field label="Defects identified"><input style={inp} type="number" value={f.defectsIdentified} onChange={s("defectsIdentified")}/></Field>
        <Field label="Defects resolved (within DLP)"><input style={inp} type="number" value={f.defectsResolved} onChange={s("defectsResolved")}/></Field>
      </Row2>
      <Row2>
        <Field label="School satisfaction rating (1–5)"><input style={inp} type="number" min="1" max="5" value={f.satisfactionRating} onChange={s("satisfactionRating")}/></Field>
        <Field label="Asset registration compliant?"><select style={sel} value={f.assetRegCompliant} onChange={s("assetRegCompliant")}><option value="">—</option><option>Yes</option><option>No</option></select></Field>
      </Row2>

      {sectionHdr("Acceptance certificate — signatories")}
      <Row2><Field label="Principal — name"><input style={inp} value={f.principalName} onChange={s("principalName")}/></Field><Field label="Date"><input style={inp} type="date" value={f.principalDate} onChange={s("principalDate")}/></Field></Row2>
      <Field label="Principal — signature"><SignaturePad value={f.principalSig} onChange={v=>setF(p=>({...p,principalSig:v}))}/></Field>

      <Row2><Field label="District official — name"><input style={inp} value={f.districtOfficialName} onChange={s("districtOfficialName")}/></Field><Field label="Date"><input style={inp} type="date" value={f.districtOfficialDate} onChange={s("districtOfficialDate")}/></Field></Row2>
      <Field label="District official — signature"><SignaturePad value={f.districtOfficialSig} onChange={v=>setF(p=>({...p,districtOfficialSig:v}))}/></Field>

      <Row2><Field label="Infrastructure Directorate — name"><input style={inp} value={f.infraDirName} onChange={s("infraDirName")}/></Field><Field label="Date"><input style={inp} type="date" value={f.infraDirDate} onChange={s("infraDirDate")}/></Field></Row2>
      <Field label="Infrastructure Directorate — signature"><SignaturePad value={f.infraDirSig} onChange={v=>setF(p=>({...p,infraDirSig:v}))}/></Field>

      <Row2><Field label="Implementing agent / contractor — name"><input style={inp} value={f.contractorName} onChange={s("contractorName")}/></Field><Field label="Date"><input style={inp} type="date" value={f.contractorDate} onChange={s("contractorDate")}/></Field></Row2>
      <Field label="Implementing agent / contractor — signature"><SignaturePad value={f.contractorSig} onChange={v=>setF(p=>({...p,contractorSig:v}))}/></Field>

      {sectionHdr("Notes")}
      <Field label="Additional notes"><textarea style={{...inp,minHeight:60,resize:"vertical"}} value={f.notes} onChange={s("notes")}/></Field>
    </Modal>
  );
}
// ─────────────────────────────────────────────
// EMIS PAGE (from v77)
// ─────────────────────────────────────────────
function EmisPage({onImport,onDataLoaded}){const [search,setSearch]=useState("");const [distFilter,setDistFilter]=useState("All");const [phaseFilter,setPhaseFilter]=useState("All");const [sectorFilter,setSectorFilter]=useState("All");const [selected,setSelected]=useState(null);const [uploadedData,setUploadedData]=useState([]);const [uploadMsg,setUploadMsg]=useState("");const allData=uploadedData.length>0?uploadedData:EMIS_SAMPLE;const districts=["All",...new Set(allData.map(s=>s.district))].sort();const handleUpload=e=>{const file=e.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=ev=>{const text=ev.target.result;const sep=text.indexOf("\t")>-1?"\t":text.indexOf(";")>-1?";":",";const lines=text.split(/\r?\n/).filter(Boolean);const hdrs=lines[0].split(sep).map(h=>h.trim().toLowerCase().replace(/['"]/g,""));const get=(row,...keys)=>{for(const k of keys){const i=hdrs.indexOf(k.toLowerCase());if(i>=0&&row[i]!==undefined)return row[i].toString().trim().replace(/^"|"$/g,"");}return "";};const phMap={primary:"Primary",secondary:"Secondary",combined:"Combined",intermediate:"Intermediate","special needs education":"Special Needs Education"};const parsed=lines.slice(1).map(line=>{const row=sep==="\t"?line.split("\t"):(line.match(/(".*?"|[^,]+)(?=,|$)/g)||line.split(","));const emis=get(row,"emiscode","emis code","emis","EmisCode");const name=get(row,"institution name","name","school name","Institution name");if(!emis&&!name)return null;const phRaw=get(row,"institution phase","phase");return{emis,name,district:get(row,"district"),phase:phMap[phRaw.toLowerCase()]||phRaw,type:get(row,"institution type","type"),sector:get(row,"sector","legal status").toLowerCase().includes("public")?"Public":"Independent",status:get(row,"practical status of the institution","status"),city:get(row,"city/town","city","town"),province:get(row,"province","PROVINCE")||"NC",lat:parseFloat(get(row,"latitude","lat"))||0,lng:parseFloat(get(row,"longitude","lng"))||0,email:get(row,"email"),emailAlt:get(row,"emailalt","email alt"),tel:get(row,"telephone1","tel1","telephone"),telCode:get(row,"telcode1","telcode"),circuit:get(row,"circuit"),landOwnership:get(row,"landownership","land ownership"),examCentre:get(row,"examcentre","exam centre")};}).filter(r=>{if(!r||(!r.emis&&!r.name))return false;const prov=(r.province||"").trim().toUpperCase();const provStripped=prov.replace(/[^A-Z]/g,"");return prov==="NC"||provStripped==="NC"||provStripped==="NORTHERNCAPE"||provStripped==="NORTHERN"||prov.startsWith("NC");});setUploadedData(parsed);if(onDataLoaded)onDataLoaded(parsed);setUploadMsg(`✓ Loaded ${parsed.length} NC schools from ${file.name}`);};reader.readAsText(file);};const filtered=useMemo(()=>allData.filter(s=>{const q=search.toLowerCase();return(!q||s.name.toLowerCase().includes(q)||s.emis.includes(q)||(s.city||"").toLowerCase().includes(q))&&(distFilter==="All"||s.district===distFilter)&&(phaseFilter==="All"||s.phase===phaseFilter)&&(sectorFilter==="All"||s.sector===sectorFilter);}),[search,distFilter,phaseFilter,sectorFilter,allData]);
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
    {label:"Furniture",desc:"All furniture items",icon:"🪑",file:"furniture.csv",cols:["School","Room","Category","Type","Available","Damaged","Repairable","Shortage","Condition"],rows:furniture.map(f=>{const cl=classrooms.find(c=>c.id==f.classroomId);const sc=schools.find(s=>s.id==cl?.schoolId)||schools.find(s=>s.id==f.schoolId);return[sc?.name||"",cl?.room||"",f.category,f.ftype,f.available,f.damaged,f.repairable,f.shortage||0,f.condition];})},
    {label:"Mobile Conditional Assessment",desc:"Infrastructure & mobile classroom assessments",icon:"🔍",file:"conditions.csv",cols:["School","Room","Flooring","Issues","Windows","Electricity","Locks"],rows:conditions.map(c=>{const cl=classrooms.find(r=>r.id==c.classroomId);const sc=schools.find(s=>s.id==cl?.schoolId);return[sc?.name||"",cl?.room||"",c.flooring,c.flooringIssues,c.windows,c.electricity,c.locks];})},
    {label:"Repairs",desc:"All repair jobs",icon:"🔧",file:"repairs.csv",cols:["School","EMIS","Furniture Types","Total Qty","Repair Type","Destination","Status","Date Collected","Allocated","Completed","Comments"],rows:repairs.map(r=>{
      let schoolName="",emis="",items=[];
      if (r.furnitureId) { const fu=furniture.find(f=>f.id==r.furnitureId);const cl=fu?classrooms.find(c=>c.id==fu.classroomId):null;const sc=cl?schools.find(s=>s.id==cl.schoolId):(fu?schools.find(s=>s.id==fu.schoolId):null);
        schoolName=sc?.name||"";emis=sc?.emis||"";items=[{ftype:fu?.ftype||r.ftype||"",qty:r.qty||0}];
      } else {
        const sc=schools.find(s=>s.id==r.schoolId); schoolName=sc?.name||""; emis=r.emis||sc?.emis||"";
        const rawItems=(r.items&&r.items.length)?r.items:[{ftype:r.ftype||"",otherType:r.otherType||"",qty:r.qty||0}];
        items=rawItems.filter(it=>it.ftype||it.qty).map(it=>({ftype:it.ftype==="Other"?(it.otherType||"Other"):(it.ftype||""),qty:it.qty||0}));
      }
      const itemsLabel=items.map(it=>`${it.ftype||"—"} × ${it.qty||0}`).join(", ")||"—";
      const totalQty=items.reduce((a,it)=>a+Number(it.qty||0),0);
      return[schoolName,emis,itemsLabel,totalQty,r.repairType,r.destination,r.status,r.dateCollected||"",r.allocated,r.completed||"",r.comments||""];
    })},
    {label:"Warehouse",desc:"Furniture deliveries & donated items",icon:"🏭",file:"warehouse.csv",cols:["Date","Supplier","Category","Item","Qty","Condition","Ref","Status","Comments"],rows:warehouse.map(w=>[w.date,w.supplier,w.category||"Furniture",w.category==="Other / Donated Item"?w.itemName:w.ftype,w.qty,w.condition,w.ref,w.status,w.comments||w.notes||""])},
    {label:"Storage",desc:"Storage room records",icon:"📦",file:"storage.csv",cols:["School","Room","Condition","Secure","Stored Type","Qty","Usable"],rows:storage.map(r=>{const sc=schools.find(s=>s.id==r.schoolId);return[sc?.name||"",r.room,r.condition,r.secure,r.storedType,r.qty,r.usable];})},
    {label:"Distribution",desc:"Delivery and collection",icon:"🚚",file:"distribution.csv",cols:["Recipient Type","Recipient","Purpose","Items","Total Qty","Destination","Official","Date","Ref","Comments","Official Signed","Receiver Signed"],rows:distribution.map(r=>{
      const recipientType=r.recipientType||"School";
      const recipient=recipientType==="District Office"?`${r.district||"—"} District Office`:recipientType==="Circuit Office"?`${r.circuit||"—"} Circuit Office${r.district?` (${r.district})`:""}`:(schools.find(s=>s.id==r.schoolId)?.name||"");
      const items=(r.items&&r.items.length?r.items:[{ftype:r.ftype||r.desc||"",otherType:"",qty:r.qty||0}]).filter(it=>it.ftype||it.qty);
      const itemsLabel=items.map(it=>`${it.ftype==="Other"?(it.otherType||"Other"):(it.ftype||"—")} × ${it.qty||0}`).join(", ")||"—";
      const totalQty=items.reduce((a,it)=>a+Number(it.qty||0),0);
      return[recipientType,recipient,r.purpose,itemsLabel,totalQty,r.destination,r.official,r.date,r.ref,r.comments||"",r.sigOfficial?"Yes":"No",r.sigReceiver?"Yes":"No"];
    })},
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
  const auditsByYear={};
  audits.forEach(a=>{ const y=a.year||"Unknown"; auditsByYear[y]=(auditsByYear[y]||0)+1; });
  const auditYears=Object.keys(auditsByYear).sort((a,b)=>b.toString().localeCompare(a.toString()));
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
      {/* Audits per year */}
      <Card style={{marginBottom:"1rem"}}>
        <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 1rem",color:"#111827"}}>Audits per year</h3>
        {auditYears.length===0?<p style={{fontSize:13,color:"#9CA3AF",textAlign:"center",margin:0}}>No audits captured yet.</p>:
          auditYears.map(y=><HorizBar key={y} label={y} value={auditsByYear[y]} max={Math.max(...Object.values(auditsByYear))} total={audits.length} color="#7C3AED"/>)}
      </Card>
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
function KpaDashboard({uploads,learnerData,mobileAudit,schoolRequests,adminTasks,schoolTransfers,setActive}){
  const kpas=[
    {id:"kpa1",icon:"🖥️",label:"KPA 1 — Data Uploads",weight:"30%",color:"#2563EB",done:uploads.filter(u=>u.status==="Completed").length,total:uploads.length},
    {id:"kpa2",icon:"📈",label:"KPA 2 — Learner Data",weight:"20%",color:"#7C3AED",done:learnerData.filter(u=>u.status==="Validated").length,total:learnerData.length},
    {id:"kpa3",icon:"🚌",label:"KPA 3 — Mobile Audit",weight:"20%",color:"#059669",done:mobileAudit.filter(u=>u.condition==="Good").length,total:mobileAudit.length},
    {id:"kpa4",icon:"🏗️",label:"KPA 4 — School Requests",weight:"15%",color:"#D97706",done:schoolRequests.filter(u=>u.status==="Completed").length,total:schoolRequests.length},
    {id:"kpa5",icon:"🗂️",label:"KPA 5 — Admin & Payments",weight:"15%",color:"#DC2626",done:adminTasks.filter(u=>["Verified","Completed","Resolved"].includes(u.status)).length,total:adminTasks.length},
    {id:"kpa6",icon:"🔄",label:"KPA 6 — School Transfers",weight:"—",color:"#0EA5E9",done:schoolTransfers.filter(u=>u.phase==="Final Transfer").length,total:schoolTransfers.length},
  ];
  return(
    <div>
      <div style={{background:"linear-gradient(135deg,#1e3a5f,#1e40af)",borderRadius:14,padding:"1.5rem",marginBottom:"1.5rem",color:"#fff"}}>
        <p style={{fontSize:12,color:"rgba(255,255,255,0.6)",margin:"0 0 4px",textTransform:"uppercase",letterSpacing:"0.08em"}}>Northern Cape Department of Education</p>
        <h2 style={{fontSize:20,fontWeight:700,margin:"0 0 4px"}}>EPMDS Performance Dashboard</h2>
        <p style={{fontSize:13,color:"rgba(255,255,255,0.7)",margin:"0 0 1rem"}}>PY Tshabangu · Senior Administration Officer · Physical Resources Planning · 2026/2027</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10}}>
          {[["Total Weight","100%"],["KPAs","6"],["Cycle","2026/2027"],["Supervisor","A Ralph"],["Own Rating","3 — Fully Effective"]].map(([l,v])=>(
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
  const [emisData,       setEmisData]       = useState([]);
  const [schools,        schoolsM]        = useSyncedCollection("schools",initSchools);
  const [audits,         auditsM]         = useSyncedCollection("audits",initAudits);
  const [classrooms,     classroomsM]     = useSyncedCollection("classrooms",initClassrooms);
  const [furniture,      furnitureM]      = useSyncedCollection("furniture",initFurniture);
  const [repairs,        repairsM]        = useSyncedCollection("repairs",initRepairs);
  const [storage,        storageM]        = useSyncedCollection("storage",initStorage);
  const [distribution,   distributionM]   = useSyncedCollection("distribution",initDistribution);
  const [conditions,     conditionsM]     = useSyncedCollection("conditions",initConditions);
  const [warehouse,      warehouseM]      = useSyncedCollection("warehouse",initWarehouse);
  const [uploads,        uploadsM]        = useSyncedCollection("uploads",initUploads);
  const [learnerData,    learnerDataM]    = useSyncedCollection("learnerData",initLearnerData);
  const [mobileAudit,    mobileAuditM]    = useSyncedCollection("mobileAudit",initMobileAudit);
  const [schoolRequests, schoolRequestsM] = useSyncedCollection("schoolRequests",initSchoolRequests);
  const [adminTasks,     adminTasksM]     = useSyncedCollection("adminTasks",initAdminTasks);
  const [schoolTransfers,schoolTransfersM]= useSyncedCollection("schoolTransfers",initSchoolTransfers);
  const [toast,          setToast]          = useState(null);
  const [transferProjectFilter, setTransferProjectFilter] = useState("All");
  const [editingSchool,  setEditingSchool]  = useState(null);
  const [editingDistribution, setEditingDistribution] = useState(null);
  const [editingRepair, setEditingRepair] = useState(null);
  const [editingWarehouse, setEditingWarehouse] = useState(null);
  const [editingClassroom, setEditingClassroom] = useState(null);
  const [editingFurniture, setEditingFurniture] = useState(null);
  const add = mutate => data => { mutate.addOne(data); setModal(null); };
  const showToast = msg => { setToast(msg); setTimeout(()=>setToast(null),3000); };
  const openAddSchool  = () => { setEditingSchool(null); setModal("school"); };
  const openEditSchool = school => { setEditingSchool(school); setModal("school"); };
  const openAddDistribution  = () => { setEditingDistribution(null); setModal("distribution"); };
  const openEditDistribution = d => { setEditingDistribution(d); setModal("distribution"); };
  const saveDistribution = data => {
    if (data.id != null) distributionM.updateOne(data.id, data);
    else distributionM.addOne(data);
    setModal(null);
    setEditingDistribution(null);
    showToast(`✓ Distribution record ${data.id != null ? "updated" : "added"}.`);
  };
  const deleteDistribution = d => {
    if (typeof window !== "undefined" && !window.confirm(`Delete this distribution record? This cannot be undone.`)) return;
    distributionM.deleteOne(d.id);
    showToast(`✓ Distribution record deleted.`);
  };
  const openAddRepair  = () => { setEditingRepair(null); setModal("repair"); };
  const openEditRepair = r => {
    if (r.furnitureId) {
      // Records created via the School Capture flow link to a tracked furniture record instead of
      // storing schoolId/items directly. Resolve that link into the standalone shape so it's editable
      // here, and explicitly clear furnitureId so the save doesn't leave a stale link behind.
      const fu = furniture.find(f=>f.id==r.furnitureId);
      const cl = fu ? classrooms.find(c=>c.id==fu.classroomId) : null;
      const sc = cl ? schools.find(s=>s.id==cl.schoolId) : (fu ? schools.find(s=>s.id==fu.schoolId) : null);
      setEditingRepair({
        id: r.id, furnitureId: "",
        schoolId: sc ? sc.id : "", emis: sc ? sc.emis : "", district: sc ? sc.district : "",
        items: [{ftype: fu?.ftype || r.ftype || "", otherType: "", qty: r.qty || ""}],
        repairType: r.repairType || "Minor", destination: r.destination || "Warehouse", status: r.status || "Pending",
        dateCollected: r.dateCollected || "", allocated: r.allocated || "", completed: r.completed || "",
        comments: r.comments || "",
      });
    } else {
      setEditingRepair(r);
    }
    setModal("repair");
  };
  const saveRepair = data => {
    if (data.id != null) repairsM.updateOne(data.id, data);
    else repairsM.addOne(data);
    setModal(null);
    setEditingRepair(null);
    showToast(`✓ Repair record ${data.id != null ? "updated" : "added"}.`);
  };
  const deleteRepair = r => {
    if (typeof window !== "undefined" && !window.confirm(`Delete this repair record? This cannot be undone.`)) return;
    repairsM.deleteOne(r.id);
    showToast(`✓ Repair record deleted.`);
  };
  const openAddWarehouse  = () => { setEditingWarehouse(null); setModal("warehouse"); };
  const openEditWarehouse = w => { setEditingWarehouse(w); setModal("warehouse"); };
  const saveWarehouse = data => {
    if (data.id != null) warehouseM.updateOne(data.id, data);
    else warehouseM.addOne(data);
    setModal(null);
    setEditingWarehouse(null);
    showToast(`✓ Warehouse record ${data.id != null ? "updated" : "added"}.`);
  };
  const deleteWarehouse = w => {
    if (typeof window !== "undefined" && !window.confirm(`Delete this warehouse record? This cannot be undone.`)) return;
    warehouseM.deleteOne(w.id);
    showToast(`✓ Warehouse record deleted.`);
  };
  const saveSchool = data => {
    if (data.id != null) schoolsM.updateOne(data.id, data);
    else schoolsM.addOne(data);
    setModal(null);
    setEditingSchool(null);
    showToast(`✓ "${data.name}" ${data.id != null ? "updated" : "added"}.`);
  };
  const sameId = (a,b) => a!=null && b!=null && a.toString()===b.toString();
  const deleteSchool = school => {
    if (typeof window !== "undefined" && !window.confirm(`Delete "${school.name}" and all its linked audits, classrooms, furniture, repairs, requests and other records? This cannot be undone.`)) return;
    const sid = school.id;
    const linkedClassroomIds = classrooms.filter(c=>sameId(c.schoolId,sid)).map(c=>c.id);
    const linkedFurnitureIds = furniture.filter(f=>linkedClassroomIds.some(cid=>sameId(cid,f.classroomId)) || sameId(f.schoolId,sid)).map(f=>f.id);
    // Delete dependent records first (deepest first) so nothing is orphaned, then the school itself.
    repairsM.deleteMany(repairs.filter(r=>linkedFurnitureIds.some(fid=>sameId(fid,r.furnitureId))||sameId(r.schoolId,sid)).map(r=>r.id));
    conditionsM.deleteMany(conditions.filter(c=>linkedClassroomIds.some(cid=>sameId(cid,c.classroomId))).map(c=>c.id));
    furnitureM.deleteMany(linkedFurnitureIds);
    classroomsM.deleteMany(linkedClassroomIds);
    auditsM.deleteMany(audits.filter(a=>sameId(a.schoolId,sid)).map(a=>a.id));
    storageM.deleteMany(storage.filter(s=>sameId(s.schoolId,sid)).map(s=>s.id));
    distributionM.deleteMany(distribution.filter(d=>sameId(d.schoolId,sid)).map(d=>d.id));
    mobileAuditM.deleteMany(mobileAudit.filter(m=>sameId(m.schoolId,sid)).map(m=>m.id));
    schoolRequestsM.deleteMany(schoolRequests.filter(r=>sameId(r.schoolId,sid)).map(r=>r.id));
    schoolTransfersM.deleteMany(schoolTransfers.filter(t=>sameId(t.schoolId,sid)).map(t=>t.id));
    schoolsM.deleteOne(sid);
    showToast(`✓ "${school.name}" and all linked records deleted.`);
  };
  const openAddClassroom  = () => { setEditingClassroom(null); setModal("classroom"); };
  const openEditClassroom = c => { setEditingClassroom(c); setModal("classroom"); };
  const saveClassroom = data => {
    if (Array.isArray(data)) {
      // Adding new classrooms: one record per room entered in the form.
      classroomsM.addMany(data);
      setModal(null);
      setEditingClassroom(null);
      showToast(`✓ ${data.length} classroom${data.length!==1?"s":""} added.`);
      return;
    }
    if (data.id != null) classroomsM.updateOne(data.id, data);
    else classroomsM.addOne(data);
    setModal(null);
    setEditingClassroom(null);
    showToast(`✓ Classroom ${data.id != null ? "updated" : "added"}.`);
  };
  const deleteClassroom = c => {
    if (typeof window !== "undefined" && !window.confirm(`Delete Room ${c.room} and all its linked furniture and condition records? This cannot be undone.`)) return;
    const cid = c.id;
    const linkedFurnitureIds = furniture.filter(f=>sameId(f.classroomId,cid)).map(f=>f.id);
    repairsM.deleteMany(repairs.filter(r=>linkedFurnitureIds.some(fid=>sameId(fid,r.furnitureId))).map(r=>r.id));
    conditionsM.deleteMany(conditions.filter(co=>sameId(co.classroomId,cid)).map(co=>co.id));
    furnitureM.deleteMany(linkedFurnitureIds);
    classroomsM.deleteOne(cid);
    showToast(`✓ Room ${c.room} and its linked records deleted.`);
  };
  const openAddFurniture  = () => { setEditingFurniture(null); setModal("furniture"); };
  const openEditFurniture = f => { setEditingFurniture(f); setModal("furniture"); };
  const saveFurniture = data => {
    if (Array.isArray(data)) {
      // Adding new furniture: one record per furniture type entered in the form.
      furnitureM.addMany(data);
      setModal(null);
      setEditingFurniture(null);
      showToast(`✓ ${data.length} furniture record${data.length!==1?"s":""} added.`);
      return;
    }
    if (data.id != null) furnitureM.updateOne(data.id, data);
    else furnitureM.addOne(data);
    setModal(null);
    setEditingFurniture(null);
    showToast(`✓ Furniture record ${data.id != null ? "updated" : "added"}.`);
  };
  const deleteFurniture = f => {
    if (typeof window !== "undefined" && !window.confirm(`Delete this furniture record? This cannot be undone.`)) return;
    repairsM.deleteMany(repairs.filter(r=>sameId(r.furnitureId,f.id)).map(r=>r.id));
    furnitureM.deleteOne(f.id);
    showToast(`✓ Furniture record deleted.`);
  };
  const restoreAll = data => {
    if(data.schools)      schoolsM.replaceAll(data.schools);
    if(data.audits)       auditsM.replaceAll(data.audits);
    if(data.classrooms)   classroomsM.replaceAll(data.classrooms);
    if(data.furniture)    furnitureM.replaceAll(data.furniture);
    if(data.conditions)   conditionsM.replaceAll(data.conditions);
    if(data.repairs)      repairsM.replaceAll(data.repairs);
    if(data.warehouse)    warehouseM.replaceAll(data.warehouse);
    if(data.storage)      storageM.replaceAll(data.storage);
    if(data.distribution) distributionM.replaceAll(data.distribution);
    showToast("✓ Backup restored successfully.");
  };
  const mergeAll = preview => {
    preview.forEach(({key,newRecs})=>{
      if(!newRecs||!newRecs.length) return;
      if(key==="schools")      schoolsM.addMany(newRecs);
      if(key==="audits")       auditsM.addMany(newRecs);
      if(key==="classrooms")   classroomsM.addMany(newRecs);
      if(key==="furniture")    furnitureM.addMany(newRecs);
      if(key==="conditions")   conditionsM.addMany(newRecs);
      if(key==="repairs")      repairsM.addMany(newRecs);
      if(key==="warehouse")    warehouseM.addMany(newRecs);
      if(key==="storage")      storageM.addMany(newRecs);
      if(key==="distribution") distributionM.addMany(newRecs);
    });
    showToast(`✓ Merged ${preview.reduce((s,r)=>s+r.added,0)} new records.`);
  };
  const importSchool = emis => {
    if(schools.find(s=>s.emis===emis.emis)){showToast(`"${emis.name}" already exists.`);return;}
    schoolsM.addOne({name:emis.name,emis:emis.emis,province:emis.province,district:emis.district,circuit:emis.circuit||"",capacity:"",mobiles:"",mobileCap:35,enrolment:"",teachers:"",risk:"Low"});
    showToast(`✓ "${emis.name}" imported.`);
    setActive("schools");
  };
  const saveCaptureAll = ({school,audit,classrooms:cls,furniture:fu,condition,mobileAudit:mob,repairs:reps})=>{
    if(school) schoolsM.addOne(school);
    if(audit)  auditsM.addOne(audit);
    if(cls?.length)  classroomsM.addMany(cls);
    if(fu?.length)   furnitureM.addMany(fu);
    if(condition)    conditionsM.addOne(condition);
    if(mob?.length)  mobileAuditM.addMany(mob);
    if(reps?.length) repairsM.addMany(reps);
  };
  const scName = id => schools.find(s=>s.id==id)?.name||"—";
  const logTransfer = (data) => {
    schoolTransfersM.addOne(data);
    setModal(null);
    showToast(`✓ Transfer/handover recorded — "${data.projectName}" (${scName(data.schoolId)}).`);
  };
  const renderPage = () => { switch(active){
    case "dashboard": return <Dashboard schools={schools} audits={audits} furniture={furniture} repairs={repairs} warehouse={warehouse}/>;
    case "emis":      return <EmisPage onImport={importSchool} onDataLoaded={setEmisData}/>;
    case "capture":   return <SchoolCapturePage schools={schools} classrooms={classrooms} furniture={furniture} conditions={conditions} repairs={repairs} onSaveAll={saveCaptureAll} showToast={showToast} emisData={emisData}/>;
    case "furnsummary": return <FurnitureSummaryPage schools={schools} classrooms={classrooms} furniture={furniture}/>;
    case "export":    return <ExportPage schools={schools} audits={audits} classrooms={classrooms} furniture={furniture} conditions={conditions} repairs={repairs} warehouse={warehouse} storage={storage} distribution={distribution} onRestore={restoreAll} onMerge={mergeAll}/>;
    case "schools": return (
      <div>
        <SectionHeader title="Audit Schools" onAdd={openAddSchool} extra={<ExportBtn label="CSV" filename="schools.csv" cols={["Name","EMIS","Province","District","Capacity","Enrolment","Teachers","Risk"]} rows={schools.map(s=>[s.name,s.emis,s.province,s.district,s.capacity,s.enrolment,s.teachers,s.risk])}/>}/>
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
                  <div style={{display:"flex",gap:6,marginTop:4}}>
                    <button onClick={()=>openEditSchool(s)} style={{fontSize:12,color:"#2563EB",background:"#EFF6FF",border:"0.5px solid #BFDBFE",borderRadius:6,padding:"3px 10px",cursor:"pointer"}}>Edit</button>
                    <button onClick={()=>deleteSchool(s)} style={{fontSize:12,color:"#DC2626",background:"#FEF2F2",border:"0.5px solid #FECACA",borderRadius:6,padding:"3px 10px",cursor:"pointer"}}>Delete</button>
                  </div>
                </div>
              </div>
            </Card>
          );})}
        </div>
      </div>
    );
    case "audits": {
      const auditSummary = (() => {
        const totals = {};
        audits.forEach(a=>{
          const key = `${a.schoolId}||${a.year}`;
          if (!totals[key]) totals[key] = {schoolId:a.schoolId, year:a.year, count:0, dates:[]};
          totals[key].count += 1;
          if (a.date) totals[key].dates.push(a.date);
        });
        return Object.values(totals).sort((a,b)=> scName(a.schoolId).localeCompare(scName(b.schoolId)) || (Number(b.year||0)-Number(a.year||0)));
      })();
      return (
      <div>
        <SectionHeader title="Audits" onAdd={()=>setModal("audit")} extra={<ExportBtn label="CSV" filename="audits.csv" cols={["School","Year","Date","Risk","Overcapacity","Hall Available","Hall Condition","Recommendations"]} rows={audits.map(a=>[scName(a.schoolId),a.year,a.date,a.risk,a.overcapacity,a.hallAvailable||"No",a.hallCondition||"",a.recommendations])}/>}/>
        <Card style={{marginBottom:"1.5rem"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}}>
            <h3 style={{fontSize:14,fontWeight:600,margin:0,color:"#111827"}}>Number of audits per year, by school</h3>
            <ExportBtn label="CSV" filename="audits_per_year_by_school.csv" cols={["School","Year","Number of Audits","Dates Captured"]} rows={auditSummary.map(r=>[scName(r.schoolId),r.year,r.count,r.dates.slice().sort().join(", ")])}/>
          </div>
          <DataTable cols={["School","Year","Number of Audits","Dates Captured"]} rows={auditSummary}
            renderRow={r=>[scName(r.schoolId),r.year,r.count,<span style={{fontSize:12,color:"#6B7280"}}>{r.dates.slice().sort().join(", ")||"—"}</span>]}/>
        </Card>
        <Card>
          <DataTable cols={["School","Year","Date","Risk","Overcapacity","Hall","Recommendations"]} rows={audits}
            renderRow={r=>[scName(r.schoolId),r.year,r.date,<Badge val={r.risk}/>,<Badge val={r.overcapacity}/>,r.hallAvailable==="Yes"?<Badge val={r.hallCondition}/>:<span style={{fontSize:11,color:"#9CA3AF"}}>No hall</span>,<span style={{color:"#6B7280",fontSize:12}}>{r.recommendations}</span>]}/>
        </Card>
      </div>
    );}
    case "classrooms": {
      const unassignedFurniture = furniture.filter(f=>!classrooms.find(c=>c.id==f.classroomId));
      const unassignedBySchool = {};
      unassignedFurniture.forEach(f=>{ const sid=f.schoolId; if(sid==null) return; (unassignedBySchool[sid]=unassignedBySchool[sid]||[]).push(f); });
      const combinedCols=["School","Room","Room Type","Grade","Learners","In Use","Comments","Category","Furniture Type","Available","Damaged","Repairable","Shortage","Condition"];
      const combinedRows=[];
      classrooms.forEach(c=>{
        const items=furniture.filter(f=>f.classroomId==c.id);
        if(!items.length) combinedRows.push([scName(c.schoolId),c.room,c.type,c.grade,c.learners,c.inUse||"Yes",c.comments||"","","","","","","",""]);
        else items.forEach(f=>combinedRows.push([scName(c.schoolId),c.room,c.type,c.grade,c.learners,c.inUse||"Yes",c.comments||"",f.category,f.ftype==="Other"?f.otherType:f.ftype,f.available,f.damaged,f.repairable,f.shortage||0,f.condition]));
      });
      unassignedFurniture.forEach(f=>combinedRows.push([scName(f.schoolId),"— Unassigned —","","","","","",f.category,f.ftype==="Other"?f.otherType:f.ftype,f.available,f.damaged,f.repairable,f.shortage||0,f.condition]));
      const notInUseCount = classrooms.filter(c=>c.inUse==="No").length;
      return (
      <div>
        <SectionHeader title="Classrooms & Furniture" onAdd={openAddClassroom}
          extra={<>
            <button onClick={openAddFurniture} style={{fontSize:13,color:"#2563EB",background:"none",border:"0.5px solid #BFDBFE",borderRadius:8,padding:"5px 14px",cursor:"pointer"}}>+ Add furniture</button>
            <ExportBtn label="CSV" filename="classrooms_and_furniture.csv" cols={combinedCols} rows={combinedRows}/>
          </>}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:12,marginBottom:"1rem"}}>
          <StatCard label="Rooms"           value={classrooms.length}                                        color="#7C3AED"/>
          <StatCard label="Not in use"      value={notInUseCount}                                            color="#DC2626"/>
          <StatCard label="Total available" value={furniture.reduce((a,f)=>a+Number(f.available||0),0)}      color="#2563EB"/>
          <StatCard label="Damaged"         value={furniture.reduce((a,f)=>a+Number(f.damaged||0),0)}        color="#DC2626"/>
          <StatCard label="Repairable"      value={furniture.reduce((a,f)=>a+Number(f.repairable||0),0)}     color="#D97706"/>
          <StatCard label="Shortage"        value={furniture.reduce((a,f)=>a+Number(f.shortage||0),0)}       color="#DC2626"/>
        </div>
        {classrooms.length===0&&<Card><p style={{color:"#9CA3AF",textAlign:"center"}}>No classrooms yet. Use + Add classroom to get started.</p></Card>}
        <div style={{display:"grid",gap:"1rem"}}>
          {classrooms.map(c=>{
            const items=furniture.filter(f=>f.classroomId==c.id);
            const avail=items.reduce((a,f)=>a+Number(f.available||0),0);
            const dmg=items.reduce((a,f)=>a+Number(f.damaged||0),0);
            const notInUse=c.inUse==="No";
            return (
              <Card key={c.id} style={notInUse?{borderColor:"#FECACA",background:"linear-gradient(145deg,#fff,#FFF5F5)"}:{}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10,flexWrap:"wrap",gap:8}}>
                  <div>
                    <p style={{fontWeight:600,fontSize:15,margin:"0 0 2px",color:"#111827"}}>{scName(c.schoolId)} — Room {c.room}{notInUse&&<span style={{marginLeft:8,fontSize:11,fontWeight:600,color:"#991B1B",background:"linear-gradient(135deg,#FEE2E2,#FECACA)",padding:"2px 10px",borderRadius:999,verticalAlign:"middle"}}>Not in use</span>}</p>
                    <p style={{fontSize:12,color:"#6B7280",margin:0}}>{c.type}{c.grade?` · Grade ${c.grade}`:""}{c.spec?` · ${c.spec}`:""}{c.learners?` · ${c.learners} learners`:""}{c.isMobile==="Yes"?" · Mobile":""}</p>
                    {notInUse&&c.comments&&<p style={{fontSize:12,color:"#991B1B",margin:"4px 0 0"}}>{c.comments}</p>}
                  </div>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    {items.length>0&&<span style={{fontSize:11,color:"#6B7280"}}>{avail} available{dmg>0?<span style={{color:"#DC2626"}}> · {dmg} damaged</span>:""}</span>}
                    <button onClick={()=>openEditClassroom(c)} style={{fontSize:12,color:"#2563EB",background:"#EFF6FF",border:"0.5px solid #BFDBFE",borderRadius:6,padding:"3px 10px",cursor:"pointer"}}>Edit</button>
                    <button onClick={()=>deleteClassroom(c)} style={{fontSize:12,color:"#DC2626",background:"#FEF2F2",border:"0.5px solid #FECACA",borderRadius:6,padding:"3px 10px",cursor:"pointer"}}>Delete</button>
                  </div>
                </div>
                {items.length===0?<p style={{fontSize:13,color:"#9CA3AF",margin:0}}>No furniture captured for this room yet.</p>:(
                  <DataTable cols={["Category","Furniture Type","Available","Damaged","Repairable","Shortage","Condition","Photo","Actions"]} rows={items}
                    renderRow={f=>[f.category,f.ftype==="Other"?f.otherType:f.ftype,f.available,f.damaged>0?<span style={{color:"#DC2626",fontWeight:600}}>{f.damaged}</span>:f.damaged,f.repairable>0?<span style={{color:"#D97706",fontWeight:600}}>{f.repairable}</span>:f.repairable,Number(f.shortage||0)>0?<span style={{color:"#DC2626",fontWeight:600}}>{f.shortage}</span>:(f.shortage||0),<Badge val={f.condition}/>,f.photoData?<a href={f.photoData} target="_blank" rel="noreferrer"><img src={f.photoData} alt="photo" style={{width:32,height:32,objectFit:"cover",borderRadius:4,border:"1px solid #E5E7EB",cursor:"pointer"}}/></a>:<span style={{color:"#D1D5DB",fontSize:11}}>—</span>,
                      <div style={{display:"flex",gap:6}}><button onClick={()=>openEditFurniture(f)} style={{fontSize:12,color:"#2563EB",background:"#EFF6FF",border:"0.5px solid #BFDBFE",borderRadius:6,padding:"3px 10px",cursor:"pointer"}}>Edit</button><button onClick={()=>deleteFurniture(f)} style={{fontSize:12,color:"#DC2626",background:"#FEF2F2",border:"0.5px solid #FECACA",borderRadius:6,padding:"3px 10px",cursor:"pointer"}}>Delete</button></div>
                    ]}/>
                )}
              </Card>
            );
          })}
        </div>
        {Object.keys(unassignedBySchool).length>0&&<div style={{marginTop:"1.5rem"}}>
          <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 0.75rem",color:"#374151"}}>Unassigned inventory <span style={{fontWeight:400,color:"#9CA3AF",fontSize:12}}>(not yet placed in a specific room — e.g. from transfers or warehouse dispatch)</span></h3>
          <div style={{display:"grid",gap:"1rem"}}>
            {Object.entries(unassignedBySchool).map(([sid,items])=>(
              <Card key={sid}>
                <p style={{fontWeight:600,fontSize:14,margin:"0 0 8px",color:"#111827"}}>{scName(sid)}</p>
                <DataTable cols={["Category","Furniture Type","Available","Damaged","Repairable","Shortage","Condition","Actions"]} rows={items}
                  renderRow={f=>[f.category,f.ftype==="Other"?f.otherType:f.ftype,f.available,f.damaged,f.repairable,f.shortage||0,<Badge val={f.condition}/>,
                    <div style={{display:"flex",gap:6}}><button onClick={()=>openEditFurniture(f)} style={{fontSize:12,color:"#2563EB",background:"#EFF6FF",border:"0.5px solid #BFDBFE",borderRadius:6,padding:"3px 10px",cursor:"pointer"}}>Edit</button><button onClick={()=>deleteFurniture(f)} style={{fontSize:12,color:"#DC2626",background:"#FEF2F2",border:"0.5px solid #FECACA",borderRadius:6,padding:"3px 10px",cursor:"pointer"}}>Delete</button></div>
                  ]}/>
              </Card>
            ))}
          </div>
        </div>}
      </div>
    );}
    case "conditions": return (
      <div>
        <SectionHeader title="Mobile Conditional Assessment" onAdd={()=>setModal("condition")} extra={<ExportBtn label="CSV" filename="conditions.csv" cols={["School","Room","Flooring","Issues","Windows","Electricity","Locks"]} rows={conditions.map(c=>{const cl=classrooms.find(r=>r.id==c.classroomId);return[scName(cl?.schoolId),cl?.room||"",c.flooring,c.flooringIssues,c.windows,c.electricity,c.locks];})}/>}/>
        <Card>
          <DataTable cols={["School","Room","Flooring","Issues","Windows","Electricity","Locks","Photos"]} rows={conditions}
            renderRow={c=>{const cl=classrooms.find(r=>r.id==c.classroomId);const photos=c.photos||[];return[scName(cl?.schoolId),cl?.room||"?",<Badge val={c.flooring}/>,c.flooringIssues||"—",<Badge val={c.windows}/>,<Badge val={c.electricity}/>,<Badge val={c.locks}/>,photos.length>0?<div style={{display:"flex",gap:4}}>{photos.map((ph,i)=><a key={i} href={ph.data} target="_blank" rel="noreferrer"><img src={ph.data} alt="" style={{width:36,height:36,objectFit:"cover",borderRadius:4,border:"1px solid #E5E7EB",cursor:"pointer"}}/></a>)}</div>:<span style={{color:"#D1D5DB",fontSize:11}}>—</span>];}}/>
        </Card>
      </div>
    );
    case "repairs": {
      // Repair records come from two sources: the standalone Repairs form (schoolId/emis + a list of
      // furniture-type items collected in one visit) or the School Capture flow (furnitureId linking
      // back to a single tracked furniture record). Resolve both into one common shape for display/export.
      const resolveRepair = r => {
        if (r.furnitureId) {
          const fu = furniture.find(f=>f.id==r.furnitureId);
          const cl = fu ? classrooms.find(c=>c.id==fu.classroomId) : null;
          const sc = cl ? schools.find(s=>s.id==cl.schoolId) : (fu ? schools.find(s=>s.id==fu.schoolId) : null);
          return { schoolName:sc?.name||"", emis:sc?.emis||"", items:[{ftype:fu?.ftype||r.ftype||"", qty:r.qty||0}] };
        }
        const sc = schools.find(s=>s.id==r.schoolId);
        const rawItems = (r.items&&r.items.length) ? r.items : [{ftype:r.ftype||"", otherType:r.otherType||"", qty:r.qty||0}];
        const items = rawItems.filter(it=>it.ftype||it.qty).map(it=>({ftype: it.ftype==="Other"?(it.otherType||"Other"):(it.ftype||""), qty:it.qty||0}));
        return { schoolName:sc?.name||"", emis:r.emis||sc?.emis||"", items };
      };
      const itemsLabel = c => c.items.map(it=>`${it.ftype||"—"} × ${it.qty||0}`).join(", ")||"—";
      const totalQty = c => c.items.reduce((a,it)=>a+Number(it.qty||0),0);
      const furnitureSummary = (() => {
        const totals = {};
        repairs.forEach(r=>{
          resolveRepair(r).items.forEach(it=>{
            const key = it.ftype||"—";
            if (!totals[key]) totals[key] = {ftype:key,records:0,qty:0};
            totals[key].records += 1;
            totals[key].qty += Number(it.qty||0);
          });
        });
        return Object.values(totals).sort((a,b)=>b.qty-a.qty);
      })();
      const grandTotalQty = furnitureSummary.reduce((a,f)=>a+f.qty,0);
      return (
      <div>
        <SectionHeader title="Repairs & refurbishment" onAdd={openAddRepair} extra={<ExportBtn label="CSV" filename="repairs.csv" cols={["School","EMIS","Furniture Types","Total Qty","Repair Type","Destination","Status","Date Collected","Allocated","Completed","Comments"]} rows={repairs.map(r=>{const c=resolveRepair(r);return[c.schoolName,c.emis,itemsLabel(c),totalQty(c),r.repairType,r.destination,r.status,r.dateCollected||"",r.allocated,r.completed||"",r.comments||""];})}/>}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:"1.5rem"}}>
          {["Completed","In Progress","Pending"].map(st=><StatCard key={st} label={st} value={repairs.filter(r=>r.status===st).length} color={st==="Completed"?"#059669":st==="In Progress"?"#2563EB":"#D97706"}/>)}
        </div>
        <Card style={{marginBottom:"1.5rem"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}}>
            <h3 style={{fontSize:14,fontWeight:600,margin:0,color:"#111827"}}>Summary by furniture type</h3>
            <div style={{display:"flex",gap:16,alignItems:"center"}}>
              <span style={{fontSize:12,color:"#6B7280"}}>{furnitureSummary.length} furniture type{furnitureSummary.length!==1?"s":""}</span>
              <span style={{fontSize:12,color:"#6B7280"}}>Total items: <strong style={{color:"#111827"}}>{grandTotalQty}</strong></span>
              <ExportBtn label="CSV" filename="repairs_summary_by_furniture_type.csv" cols={["Furniture Type","Records","Total Qty"]} rows={furnitureSummary.map(f=>[f.ftype,f.records,f.qty])}/>
            </div>
          </div>
          <DataTable cols={["Furniture Type","Records","Total Qty"]} rows={furnitureSummary} renderRow={f=>[f.ftype,f.records,f.qty]}/>
        </Card>
        <Card>
          <DataTable cols={["School","EMIS","Furniture Types","Total Qty","Repair Type","Destination","Status","Date Collected","Completed","Comments","Actions"]} rows={repairs}
            renderRow={r=>{const c=resolveRepair(r);return[
              c.schoolName?<span style={{fontWeight:500,color:"#1e3a5f"}}>{c.schoolName}</span>:<span style={{color:"#9CA3AF",fontSize:11}}>—</span>,
              <span style={{fontSize:12,color:"#6B7280"}}>{c.emis||"—"}</span>,
              <span style={{fontSize:12,color:"#374151"}}>{itemsLabel(c)}</span>,
              totalQty(c),r.repairType,r.destination,<Badge val={r.status}/>,r.dateCollected||"—",r.completed||"—",
              <span style={{fontSize:12,color:"#6B7280"}}>{r.comments||"—"}</span>,
              <div style={{display:"flex",gap:6}}><button onClick={()=>openEditRepair(r)} style={{fontSize:12,color:"#2563EB",background:"#EFF6FF",border:"0.5px solid #BFDBFE",borderRadius:6,padding:"3px 10px",cursor:"pointer"}}>Edit</button><button onClick={()=>deleteRepair(r)} style={{fontSize:12,color:"#DC2626",background:"#FEF2F2",border:"0.5px solid #FECACA",borderRadius:6,padding:"3px 10px",cursor:"pointer"}}>Delete</button></div>
            ];}}/>
        </Card>
      </div>
    );}
    case "warehouse": {
      const whItemName = w => w.category==="Other / Donated Item" ? (w.itemName||"Other item") : (w.ftype||"—");
      return (
      <div>
        <SectionHeader title="Warehouse — furniture & donated items" onAdd={openAddWarehouse} extra={<ExportBtn label="CSV" filename="warehouse.csv" cols={["Date","Supplier","Category","Item","Qty","Condition","Ref","Status","Comments"]} rows={warehouse.map(w=>[w.date,w.supplier,w.category||"Furniture",whItemName(w),w.qty,w.condition,w.ref,w.status,w.comments||w.notes||""])}/>}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:"1.5rem"}}>
          <StatCard label="In stock"   value={warehouse.filter(w=>w.status==="In Stock").reduce((a,w)=>a+Number(w.qty||0),0)}   color="#059669"/>
          <StatCard label="Reserved"   value={warehouse.filter(w=>w.status==="Reserved").reduce((a,w)=>a+Number(w.qty||0),0)}   color="#D97706"/>
          <StatCard label="Dispatched" value={warehouse.filter(w=>w.status==="Dispatched").reduce((a,w)=>a+Number(w.qty||0),0)} color="#2563EB"/>
        </div>
        <Card>
          <DataTable cols={["Date","Supplier","Category","Item","Qty","Condition","Received by","Ref","Status","Comments","Actions"]} rows={warehouse}
            renderRow={w=>[w.date,w.supplier,<span style={{fontSize:11,fontWeight:600,padding:"2px 8px",borderRadius:999,whiteSpace:"nowrap",background:w.category==="Other / Donated Item"?"#F5F3FF":"#EFF6FF",color:w.category==="Other / Donated Item"?"#5B21B6":"#1E40AF"}}>{w.category||"Furniture"}</span>,whItemName(w),w.qty,<Badge val={w.condition}/>,w.receivedBy,w.ref,<Badge val={w.status}/>,<span style={{fontSize:12,color:"#6B7280"}}>{w.comments||w.notes||""}</span>,
              <div style={{display:"flex",gap:6}}><button onClick={()=>openEditWarehouse(w)} style={{fontSize:12,color:"#2563EB",background:"#EFF6FF",border:"0.5px solid #BFDBFE",borderRadius:6,padding:"3px 10px",cursor:"pointer"}}>Edit</button><button onClick={()=>deleteWarehouse(w)} style={{fontSize:12,color:"#DC2626",background:"#FEF2F2",border:"0.5px solid #FECACA",borderRadius:6,padding:"3px 10px",cursor:"pointer"}}>Delete</button></div>
            ]}/>
        </Card>
      </div>
    );}
    case "storage": return (
      <div>
        <SectionHeader title="Storage" onAdd={()=>setModal("storage")} extra={<ExportBtn label="CSV" filename="storage.csv" cols={["School","Room","Condition","Secure","Stored Type","Qty","Usable"]} rows={storage.map(r=>[scName(r.schoolId),r.room,r.condition,r.secure,r.storedType,r.qty,r.usable])}/>}/>
        <Card>
          <DataTable cols={["School","Room","Condition","Secure","Stored items","Qty","Usable"]} rows={storage}
            renderRow={r=>[scName(r.schoolId),r.room,<Badge val={r.condition}/>,<Badge val={r.secure}/>,r.storedType,r.qty,<Badge val={r.usable}/>]}/>
        </Card>
      </div>
    );
    case "distribution": {
      const itemsLabel = r => (r.items&&r.items.length ? r.items : [{ftype:r.ftype||r.desc||"",otherType:"",qty:r.qty||0}])
        .filter(it=>it.ftype||it.qty).map(it=>`${it.ftype==="Other"?(it.otherType||"Other"):(it.ftype||"—")} × ${it.qty||0}`).join(", ") || "—";
      const totalQty = r => (r.items&&r.items.length ? r.items : [{qty:r.qty||0}]).reduce((a,it)=>a+Number(it.qty||0),0);
      const recipientLabel = r => {
        const t=r.recipientType||"School";
        if (t==="District Office") return `${r.district||"—"} District Office`;
        if (t==="Circuit Office") return `${r.circuit||"—"} Circuit Office${r.district?` (${r.district})`:""}`;
        return scName(r.schoolId);
      };
      return (
      <div>
        <SectionHeader title="Distribution" onAdd={openAddDistribution} extra={<ExportBtn label="CSV" filename="distribution.csv" cols={["Recipient Type","Recipient","Purpose","Items","Total Qty","Destination","Official","Date","Ref","Comments","Official Signed","Receiver Signed"]} rows={distribution.map(r=>[r.recipientType||"School",recipientLabel(r),r.purpose,itemsLabel(r),totalQty(r),r.destination,r.official,r.date,r.ref,r.comments||"",r.sigOfficial?"Yes":"No",r.sigReceiver?"Yes":"No"])}/>}/>
        <Card>
          <DataTable cols={["Recipient","Purpose","Items","Total Qty","Official","Date","Ref","Comments","Proof","Signatures","Actions"]} rows={distribution}
            renderRow={r=>{const sigs=[r.sigOfficial,r.sigReceiver].filter(Boolean);const t=r.recipientType||"School";return[
              <span>{recipientLabel(r)}{t!=="School"?<span style={{display:"block",fontSize:10,color:"#7C3AED",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.03em"}}>{t}</span>:""}</span>,
              r.purpose,<span style={{fontSize:12,color:"#374151"}}>{itemsLabel(r)}</span>,totalQty(r),r.official,r.date,r.ref,
              <span style={{fontSize:12,color:"#6B7280"}}>{r.comments||"—"}</span>,
              r.proofData?<a href={r.proofData} target="_blank" rel="noreferrer" style={{color:"#2563EB",textDecoration:"underline",fontSize:12}}>{r.proofName||"View proof"}</a>:<span style={{color:"#9CA3AF",fontSize:12}}>—</span>,
              sigs.length>0?<div style={{display:"flex",gap:4}}>{sigs.map((sig,i)=><a key={i} href={sig} target="_blank" rel="noreferrer"><img src={sig} alt="" style={{height:32,width:80,objectFit:"contain",border:"1px solid #E5E7EB",borderRadius:4,background:"#F9FAFB",cursor:"pointer"}}/></a>)}</div>:<span style={{color:"#9CA3AF",fontSize:12}}>—</span>,
              <div style={{display:"flex",gap:6}}><button onClick={()=>openEditDistribution(r)} style={{fontSize:12,color:"#2563EB",background:"#EFF6FF",border:"0.5px solid #BFDBFE",borderRadius:6,padding:"3px 10px",cursor:"pointer"}}>Edit</button><button onClick={()=>deleteDistribution(r)} style={{fontSize:12,color:"#DC2626",background:"#FEF2F2",border:"0.5px solid #FECACA",borderRadius:6,padding:"3px 10px",cursor:"pointer"}}>Delete</button></div>
            ];}}/>
        </Card>
      </div>
    );}
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
          <StatCard label="Avg. ratio" value={schools.reduce((a,s)=>a+Number(s.teachers||0),0)>0?`1:${Math.round(schools.reduce((a,s)=>a+Number(s.enrolment||0),0)/schools.reduce((a,s)=>a+Number(s.teachers||0),0))}`:"—"} color="#059669"/>
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
    case "kpa":  return <KpaDashboard uploads={uploads} learnerData={learnerData} mobileAudit={mobileAudit} schoolRequests={schoolRequests} adminTasks={adminTasks} schoolTransfers={schoolTransfers} setActive={setActive}/>;
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
    case "kpa4": {
      const total=schoolRequests.length;
      const pctOf=(num,den)=>den>0?Math.round((num/den)*100):0;
      const govErpCount=schoolRequests.filter(r=>r.govErpCaptured==="Yes").length;
      const verifiedCount=schoolRequests.filter(r=>r.verified==="Yes").length;
      const slaMetCount=schoolRequests.filter(r=>r.completedDate&&r.dueDate&&r.completedDate<=r.dueDate).length;
      const closedWithDocsCount=schoolRequests.filter(r=>r.closedWithDocs==="Yes").length;
      const furnitureCount=schoolRequests.filter(r=>r.category==="Furniture").length;
      const infrastructureCount=schoolRequests.filter(r=>r.category==="Infrastructure").length;
      const catTag=c=><span style={{fontSize:11,fontWeight:600,padding:"2px 8px",borderRadius:999,whiteSpace:"nowrap",background:c==="Furniture"?"#EFF6FF":"#F5F3FF",color:c==="Furniture"?"#1E40AF":"#5B21B6"}}>{c}</span>;
      const verifiedTag=v=>v==="Yes"?<span style={{color:"#059669",fontWeight:600,fontSize:12}}>✓ Yes</span>:v==="No"?<span style={{color:"#DC2626",fontWeight:600,fontSize:12}}>✗ No</span>:<span style={{color:"#9CA3AF",fontSize:12}}>Pending</span>;
      return (
      <div><SectionHeader title="KPA 4 — School Furniture & Infrastructure Requests" onAdd={()=>setModal("request")} extra={<ExportBtn label="CSV" filename="kpa4_requests.csv" cols={["Reference","School","District","Category","Type","Priority","Priority Basis","Date Received","GovERP Captured","Verified","Status","Due Date","Completed Date","SLA Met","Assigned To","Proof of Delivery","Closed w/ Docs","Notes"]} rows={schoolRequests.map(r=>[r.refNumber,scName(r.schoolId),r.district,r.category,r.requestType,r.priority,r.priorityBasis,r.dateReceived,r.govErpCaptured,r.verified,r.status,r.dueDate,r.completedDate,(r.completedDate&&r.dueDate&&r.completedDate<=r.dueDate)?"Yes":"—",r.assignedTo,r.proofOfDelivery,r.closedWithDocs,r.notes])}/>}/>
      <KpaNote weight="15%" target="Quarterly" description="Coordinate, assess, verify, approve, monitor and report on all school furniture and infrastructure requests submitted through District Offices — captured, verified and closed on GovERP, ensuring equitable resource allocation and compliance with departmental policies."/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:"1rem"}}>
        <StatCard label="Total requests" value={total} sub={`${furnitureCount} furniture · ${infrastructureCount} infrastructure`} color="#D97706"/>
        <StatCard label="Captured on GovERP" value={`${pctOf(govErpCount,total)}%`} color="#2563EB"/>
        <StatCard label="Verified" value={`${pctOf(verifiedCount,total)}%`} color="#059669"/>
        <StatCard label="Processed within SLA" value={`${pctOf(slaMetCount,total)}%`} color="#7C3AED"/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:"1.5rem"}}>
        <StatCard label="Completed" value={schoolRequests.filter(r=>r.status==="Completed").length} color="#059669"/>
        <StatCard label="In progress / approved" value={schoolRequests.filter(r=>["In Progress","Approved"].includes(r.status)).length} color="#2563EB"/>
        <StatCard label="Pending" value={schoolRequests.filter(r=>r.status==="Pending").length} color="#DC2626"/>
        <StatCard label="Closed with documentation" value={`${pctOf(closedWithDocsCount,total)}%`} color="#D97706"/>
      </div>
      <Card><DataTable cols={["Reference","School","District","Category / Type","Priority","Received","Due","Status","Verified","Notes"]} rows={schoolRequests} renderRow={r=>[
        <span style={{fontSize:12,color:"#6B7280"}}>{r.refNumber||"—"}</span>,
        scName(r.schoolId),
        r.district,
        <span>{catTag(r.category)} <span style={{fontSize:12,color:"#374151"}}>{r.requestType}</span></span>,
        <Badge val={r.priority}/>,
        r.dateReceived,
        r.dueDate,
        <Badge val={r.status}/>,
        verifiedTag(r.verified),
        <span style={{fontSize:12,color:"#6B7280"}}>{r.notes}</span>
      ]}/></Card></div>
    );}
    case "kpa5": return (
      <div><SectionHeader title="KPA 5 — Admin Duties & Payment Verification" onAdd={()=>setModal("admin")} extra={<ExportBtn label="CSV" filename="kpa5_admin.csv" cols={["Type","Reference","Date","Amount","Supplier","Status","Notes"]} rows={adminTasks.map(t=>[t.type,t.ref,t.date,t.amount,t.supplier,t.status,t.notes])}/>}/>
      <KpaNote weight="15%" target="Daily" description="Assist stakeholders, verify payments, assist with filing, copying and scanning."/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:"1.5rem"}}><StatCard label="Total tasks" value={adminTasks.length} color="#DC2626"/><StatCard label="Payment verifications" value={adminTasks.filter(t=>t.type==="Payment Verification").length} color="#2563EB"/><StatCard label="Completed" value={adminTasks.filter(t=>["Verified","Completed","Resolved"].includes(t.status)).length} color="#059669"/><StatCard label="Pending" value={adminTasks.filter(t=>t.status==="Pending").length} color="#D97706"/></div>
      <Card><DataTable cols={["Type","Reference","Date","Amount","Supplier / Party","Status","Notes"]} rows={adminTasks} renderRow={t=>[t.type,t.ref,t.date,t.amount||"—",t.supplier||"—",<Badge val={t.status}/>,<span style={{fontSize:12,color:"#6B7280"}}>{t.notes}</span>]}/></Card></div>
    );
    case "kpa6": {
      const projectOptions=["All",...new Set(schoolTransfers.map(t=>t.projectName).filter(Boolean))];
      const filteredTransfers=transferProjectFilter==="All"?schoolTransfers:schoolTransfers.filter(t=>(t.projectName||"—")===transferProjectFilter);
      const pctOf=(num,den)=>den>0?Math.round((num/den)*100):0;
      const onTimeCount=filteredTransfers.filter(t=>t.onTime==="Yes").length;
      const within30Count=filteredTransfers.filter(t=>t.handoverWithin30Days==="Yes").length;
      const defectsIdentified=filteredTransfers.reduce((a,t)=>a+Number(t.defectsIdentified||0),0);
      const defectsResolved=filteredTransfers.reduce((a,t)=>a+Number(t.defectsResolved||0),0);
      const ratings=filteredTransfers.map(t=>Number(t.satisfactionRating)).filter(n=>n>0);
      const avgSatisfaction=ratings.length?(ratings.reduce((a,b)=>a+b,0)/ratings.length).toFixed(1):"—";
      const assetRegCompliantCount=filteredTransfers.filter(t=>t.assetRegCompliant==="Yes").length;
      const finalTransferCount=filteredTransfers.filter(t=>t.phase==="Final Transfer").length;
      const checklistDoneCount = t => TRANSFER_CHECKLIST.filter(c=>t.checklist&&t.checklist[c.key]&&t.checklist[c.key].value==="Yes").length;
      const yesNoTag = v => v==="Yes"?<span style={{color:"#059669",fontWeight:600,fontSize:12}}>✓ Yes</span>:v==="No"?<span style={{color:"#DC2626",fontWeight:600,fontSize:12}}>✗ No</span>:<span style={{color:"#9CA3AF",fontSize:12}}>—</span>;
      return (
      <div><SectionHeader title="KPA 6 — School Transfers (Infrastructure Project Handover)" onAdd={()=>setModal("transfer")} extra={<ExportBtn label="CSV" filename="kpa6_transfers.csv" cols={["Project Name","EMIS","School","District","Budget","Final Cost","Contractor","Implementing Agent","Completion Date","Handover Date","Phase","Checklist Complete","On Time","Handover ≤30 Days","Defects Identified","Defects Resolved","Satisfaction Rating","Asset Reg. Compliant","Notes"]} rows={filteredTransfers.map(t=>[t.projectName,t.emisNumber,scName(t.schoolId),t.district,t.projectBudget,t.finalCost,t.contractor,t.implementingAgent,t.completionDate,t.handoverDate,t.phase,`${checklistDoneCount(t)}/${TRANSFER_CHECKLIST.length}`,t.onTime,t.handoverWithin30Days,t.defectsIdentified,t.defectsResolved,t.satisfactionRating,t.assetRegCompliant,t.notes])}/>}/>
      <KpaNote weight="—" target="Ongoing" description="Capture the formal handover of completed infrastructure projects (construction, classrooms, sanitation, water, electrical, fencing, furniture/equipment installs) from the contractor / implementing agent to the school and department — checklist, asset summary, KPIs and signed acceptance certificate."/>
      <Card style={{marginBottom:"1rem"}}>
        <label style={flbl}>Filter by project</label>
        <select style={{...sel,maxWidth:360}} value={transferProjectFilter} onChange={e=>setTransferProjectFilter(e.target.value)}>{projectOptions.map(p=><option key={p} value={p}>{p==="All"?"All projects":p}</option>)}</select>
      </Card>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:"1rem"}}>
        <StatCard label="Projects" value={filteredTransfers.length} sub={transferProjectFilter==="All"?"All projects":transferProjectFilter} color="#0EA5E9"/>
        <StatCard label="Finalised transfers" value={finalTransferCount} color="#059669"/>
        <StatCard label="Completed on time" value={`${pctOf(onTimeCount,filteredTransfers.length)}%`} color="#2563EB"/>
        <StatCard label="Handed over ≤30 days" value={`${pctOf(within30Count,filteredTransfers.length)}%`} color="#D97706"/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:"1.5rem"}}>
        <StatCard label="Defects identified" value={defectsIdentified} color="#DC2626"/>
        <StatCard label="Defects resolved" value={defectsResolved} color="#059669"/>
        <StatCard label="Avg. satisfaction rating" value={avgSatisfaction} sub="out of 5" color="#7C3AED"/>
        <StatCard label="Asset register compliant" value={`${pctOf(assetRegCompliantCount,filteredTransfers.length)}%`} color="#2563EB"/>
      </div>
      <Card><DataTable cols={["Project","School","District","Phase","Checklist","Completion","Handover","On Time","Contractor"]} rows={filteredTransfers} renderRow={t=>[
        <span style={{fontWeight:500}}>{t.projectName}</span>,
        scName(t.schoolId),
        t.district||"—",
        <Badge val={t.phase==="Final Transfer"?"Completed":t.phase==="Defects Rectification"?"In Progress":t.phase}/>,
        `${checklistDoneCount(t)}/${TRANSFER_CHECKLIST.length}`,
        t.completionDate||"—",
        t.handoverDate||"—",
        yesNoTag(t.onTime),
        t.contractor||"—"
      ]}/></Card></div>
    );}
    default: return null;
  }};
  return (
    <div style={{display:"flex",minHeight:"100vh",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",background:"#F3F6FB"}}>
      {toast&&<div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:"#111827",color:"#fff",padding:"10px 20px",borderRadius:10,fontSize:13,zIndex:200,whiteSpace:"nowrap",boxShadow:"0 4px 12px rgba(0,0,0,0.2)"}}>{toast}</div>}
      {modal==="school"       && <SchoolForm        initial={editingSchool} onClose={()=>{setModal(null);setEditingSchool(null);}} onSave={saveSchool}/>}
      {modal==="audit"        && <AuditForm         schools={schools}            onClose={()=>setModal(null)} onSave={add(auditsM)}/>}
      {modal==="classroom"    && <ClassroomForm     schools={schools} initial={editingClassroom} onClose={()=>{setModal(null);setEditingClassroom(null);}} onSave={saveClassroom}/>}
      {modal==="furniture"    && <FurnitureForm     classrooms={classrooms} schools={schools} initial={editingFurniture} onClose={()=>{setModal(null);setEditingFurniture(null);}} onSave={saveFurniture}/>}
      {modal==="condition"    && <ConditionForm     classrooms={classrooms} schools={schools} onClose={()=>setModal(null)} onSave={add(conditionsM)}/>}
      {modal==="repair"       && <RepairForm        schools={schools} initial={editingRepair} onClose={()=>{setModal(null);setEditingRepair(null);}} onSave={saveRepair}/>}
      {modal==="warehouse"    && <WarehouseForm     initial={editingWarehouse}  onClose={()=>{setModal(null);setEditingWarehouse(null);}} onSave={saveWarehouse}/>}
      {modal==="storage"      && <StorageForm       schools={schools}          onClose={()=>setModal(null)} onSave={add(storageM)}/>}
      {modal==="distribution" && <DistributionForm  schools={schools} initial={editingDistribution} onClose={()=>{setModal(null);setEditingDistribution(null);}} onSave={saveDistribution}/>}
      {modal==="upload"       && <UploadForm                                   onClose={()=>setModal(null)} onSave={add(uploadsM)}/>}
      {modal==="learner"      && <LearnerDataForm                              onClose={()=>setModal(null)} onSave={add(learnerDataM)}/>}
      {modal==="mobile"       && <MobileAuditForm   schools={schools}          onClose={()=>setModal(null)} onSave={add(mobileAuditM)}/>}
      {modal==="request"      && <SchoolRequestForm schools={schools}          onClose={()=>setModal(null)} onSave={add(schoolRequestsM)}/>}
      {modal==="admin"        && <AdminTaskForm                                onClose={()=>setModal(null)} onSave={add(adminTasksM)}/>}
      {modal==="transfer"     && <TransferForm    schools={schools} existingProjects={[...new Set(schoolTransfers.map(t=>t.projectName).filter(Boolean))]} onClose={()=>setModal(null)} onSave={logTransfer}/>}
      <aside style={{width:220,background:"linear-gradient(180deg,#1e3a5f,#1e40af)",padding:"1.5rem 0",flexShrink:0,overflowY:"auto"}}>
        <div style={{padding:"0 1.25rem 1.5rem",borderBottom:"0.5px solid rgba(255,255,255,0.1)",marginBottom:"1rem"}}>
          <p style={{fontWeight:700,fontSize:14,color:"#fff",margin:"0 0 2px"}}>SchoolAudit</p>
          <p style={{fontSize:11,color:"rgba(255,255,255,0.5)",margin:"0 0 6px"}}>Northern Cape DoE</p>
          <span style={{display:"inline-flex",alignItems:"center",gap:5,fontSize:10,color:firestoreDb?"#6EE7B7":"rgba(255,255,255,0.45)",background:firestoreDb?"rgba(16,185,129,0.15)":"rgba(255,255,255,0.08)",padding:"2px 8px",borderRadius:999}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:firestoreDb?"#10B981":"#9CA3AF"}}/>
            {firestoreDb?"Synced across devices":"Local only — see Export"}
          </span>
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
