const fs = require('fs');
const path = require('path');
const file = path.join(process.cwd(), 'schools.csv');
const text = fs.readFileSync(file, 'utf8');
const sep = text.indexOf('\t') > -1 ? '\t' : text.indexOf(';') > -1 ? ';' : ',';
const lines = text.split(/\r?\n/).filter(Boolean);
const normalizeHeader = h => h.toLowerCase().trim().replace(/['"]/g, '').replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
const headersRaw = lines[0].split(sep).map(normalizeHeader);
const get = (row, ...keys) => {
  for (const k of keys) {
    if (row[k] !== undefined && row[k] !== '') return row[k].toString().trim().replace(/^"|"$/g, '');
  }
  return '';
};
const phaseMap = { primary:'Primary', secondary:'Secondary', combined:'Combined', intermediate:'Intermediate', 'special needs education':'Special Needs Education' };
const isNC = prov => {
  if (!prov) return false;
  const normalized = prov.toString().trim().toUpperCase().replace(/[^A-Z]/g, '');
  return normalized === 'NC' || normalized === 'NORTHERNCAPE' || normalized === 'NORTHERN';
};
const parsed = lines.slice(1).map(line => {
  const row = line.split(sep).map(cell => cell.toString().trim().replace(/^"|"$/g, ''));
  const rawRow = Object.fromEntries(headersRaw.map((h, i) => [h, row[i] || '']));
  const emisRaw = get(rawRow, 'emiscode', 'emis_code', 'emis');
  const nameRaw = get(rawRow, 'institution_name', 'name', 'school_name');
  if (!emisRaw && !nameRaw) return null;
  const phaseRaw = get(rawRow, 'institution_phase', 'phase');
  return {
    ...rawRow,
    emis: emisRaw,
    name: nameRaw,
    district: get(rawRow, 'district'),
    phase: phaseMap[phaseRaw.toLowerCase()] || phaseRaw,
    type: get(rawRow, 'institution_type', 'type'),
    sector: get(rawRow, 'sector', 'legal_status').toLowerCase().includes('public') ? 'Public' : 'Independent',
    status: get(rawRow, 'practical_status_of_the_institution', 'status'),
    city: get(rawRow, 'city_town', 'city', 'town'),
    province: rawRow.province || 'NC',
    lat: parseFloat(get(rawRow, 'latitude', 'lat')) || 0,
    lng: parseFloat(get(rawRow, 'longitude', 'lng')) || 0,
    email: get(rawRow, 'email'),
    emailAlt: get(rawRow, 'emailalt', 'email_alt'),
    tel: get(rawRow, 'telephone1', 'tel1', 'telephone'),
    telCode: get(rawRow, 'telcode1', 'telcode'),
    circuit: get(rawRow, 'circuit'),
    landOwnership: get(rawRow, 'landownership', 'land_ownership'),
    examCentre: get(rawRow, 'examcentre', 'exam_centre'),
  };
}).filter(r => {
  if (!r || (!r.emis && !r.name)) return false;
  return isNC(r.province);
});
const total = lines.length - 1;
const passed = parsed.length;
const first = parsed.slice(0, 3);
console.log('separator:', JSON.stringify(sep));
console.log('total rows:', total);
console.log('nc rows:', passed);
console.log('first parsed records:', JSON.stringify(first, null, 2));
