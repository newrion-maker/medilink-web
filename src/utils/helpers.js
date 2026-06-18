export const badgeStyle = (answered) => {
  const base = { 
    height: '24px',
    padding: '0 11px', 
    borderRadius: '7px', 
    fontSize: '12px', 
    fontWeight: 700, 
    whiteSpace: 'nowrap', 
    display: 'inline-flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    boxSizing: 'border-box'
  };
  return answered ? { ...base, background: '#D5F5E3', color: '#1E8449' } : { ...base, background: '#FEF9E7', color: '#9A7D0A' };
};

export const ddayStyle = (urgent) => {
  const base = { padding: '5px 12px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 800, display: 'inline-block' };
  return urgent ? { ...base, background: '#FDECEA', color: '#C0392B' } : { ...base, background: '#EAF2FB', color: '#1B5C9B' };
};

export const catColor = (cat) => {
  const map = {
    '내과': ['#EAF2FB', '#1B5C9B'], '가정의학과': ['#EAF2FB', '#1B5C9B'],
    '외과': ['#E3F5EA', '#1E8449'], '정형외과': ['#E3F5EA', '#1E8449'],
    '소아과': ['#E5F2FB', '#2E86C1'], '산부인과': ['#FBE9F0', '#C2477A'],
    '치과': ['#ECEAFB', '#5B4BC4'], '안과': ['#FCF1E2', '#B5730F'], '이비인후과': ['#E7F6F3', '#0E8074'],
    '피부과': ['#F5EEF8', '#7D3C98'], '성형외과': ['#FEF9E7', '#B7950B']
  };
  const c = map[cat] || ['#EAF2FB', '#1B5C9B'];
  return { background: c[0], color: c[1], padding: '4px 11px', borderRadius: '7px', fontSize: '12px', fontWeight: 700, display: 'inline-block', whiteSpace: 'nowrap' };
};

export const catColorStrong = (cat) => {
  const map = {
    '내과': '#1B5C9B', '가정의학과': '#1B5C9B', '외과': '#1E8449', '정형외과': '#1E8449',
    '소아과': '#2E86C1', '산부인과': '#C2477A', '치과': '#5B4BC4', '안과': '#B5730F', '이비인후과': '#0E8074',
    '피부과': '#7D3C98', '성형외과': '#B7950B'
  };
  const bg = map[cat] || '#1B5C9B';
  return { background: bg, color: '#fff', padding: '5px 12px', borderRadius: '7px', fontSize: '12px', fontWeight: 700, display: 'inline-block', whiteSpace: 'nowrap', boxShadow: '0 2px 6px rgba(15,41,66,0.28)' };
};

export const getHospitalBg = (id) => {
  if (id && (id.startsWith('/') || id.startsWith('http') || id.startsWith('data:'))) {
    return `#E6EDF4 url('${id}') center/cover no-repeat`;
  }
  const map = {
    'h1': '/uploads/hospital.png',       // 다산연세내과 → 내과(기존)
    'h2': '/uploads/hospital_ped.png',   // 별내자연드림소아과
    'h3': '/uploads/hospital_ortho.png', // 평내튼튼정형외과
    'h4': '/uploads/hospital_obgyn.png', // 다산미소산부인과
    'h5': '/uploads/hospital_dental.png',// 진접우리들치과
    'h6': '/uploads/hospital_eye.png',   // 별내밝은안과
    'h7': '/uploads/hospital_ent.png',   // 화도연세이비인후과 (이비인후과)
    'h8': '/uploads/hospital_internal.png', // 오남속편한내과
    'h9': '/uploads/hospital_ortho.png', // 와부서울정형외과
    'h10': '/uploads/hospital_fm.png',   // 다산열린가정의학과
    'h11': '/uploads/hospital_surgery.png', // 다산튼튼외과
    'h12': '/uploads/hospital.png',       // 다산맑은피부과 (기존 이미지 재활용)
    'h13': '/uploads/hospital_surgery.png', // 별내미앤미성형외과 (기존 이미지 재활용)
  };
  const img = map[id] || '/uploads/hospital.png';
  return `#E6EDF4 url('${img}') center/cover no-repeat`;
};

export const getColumnBg = (cat, id) => {
  const colImg = { '소아과': '/uploads/col_ped.jpeg', '정형외과': '/uploads/col_ortho.jpeg', '내과': '/uploads/col_internal.jpeg', '안과': '/uploads/col_eye.jpeg' };
  const ci = colImg[cat];
  if (ci) return `#E6EDF4 url('${ci}') center/cover no-repeat`;
  return `repeating-linear-gradient(135deg,#E6EDF4,#E6EDF4 9px,#EFF3F8 9px,#EFF3F8 18px)`;
};
