import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { hospitals } from '../data/mockData';
import { HospitalCard } from '../components/Cards';

const HCATS = ['전체', '신규개원', '내과', '외과', '산부인과', '소아과', '정형외과', '치과', '안과', '이비인후과', '피부과', '성형외과'];

export default function Hospitals() {
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('전체');

  useEffect(() => {
    if (location.state?.search) {
      setSearch(location.state.search);
    }
    if (location.state?.category) {
      setCategory(location.state.category);
    }
  }, [location.state]);

  const getCategoryFromQuery = (query) => {
    const q = query.replace(/\s+/g, '');
    if (/무릎|시큰|어깨|관절|통증|도수|척추|허리|뼈|정형/.test(q)) return '정형외과';
    if (/내과|감기|내시경|소화|기침|간|배가|속이/.test(q)) return '내과';
    if (/소아|아이|영유아|예방접종/.test(q)) return '소아과';
    if (/임신|여성|산부인과|자궁/.test(q)) return '산부인과';
    if (/치과|이빨|임플란트|충치|스케일링/.test(q)) return '치과';
    if (/눈|안과|시력|라식|라섹|백내장|눈곱/.test(q)) return '안과';
    if (/귀|코|목|이비인후|비염|중이염|코걸이/.test(q)) return '이비인후과';
    if (/피부|아토피|여드름|점|무좀|색소|기미/.test(q)) return '피부과';
    if (/성형|쌍꺼풀|필러|보톡스|리프팅|쁘띠/.test(q)) return '성형외과';
    return null;
  };

  const filteredHospitals = hospitals.filter(h => {
    const matchesCategory = category === '전체' 
      ? true 
      : category === '신규개원' 
        ? !!h.openedAt 
        : h.cats.includes(category);
        
    const mappedCat = getCategoryFromQuery(search);
    const matchesSearch = !search 
      || h.name.includes(search) 
      || h.desc.includes(search)
      || h.cats.some(cat => cat.includes(search))
      || (mappedCat && h.cats.includes(mappedCat));
      
    return matchesCategory && matchesSearch;
  });
  
  // Sort: if '신규개원' is selected, sort by opening date descending. Otherwise sort alphabetically.
  if (category === '신규개원') {
    filteredHospitals.sort((a, b) => b.openedAt.localeCompare(a.openedAt));
  } else {
    filteredHospitals.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
  }

  return (
    <div style={{ paddingTop: '14px' }}>
      <div style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.6px' }}>병원 찾기</div>
      <div style={{ fontSize: '14.5px', color: '#64748B', marginTop: '6px' }}>남양주 지역 병원을 진료과목별로 찾아보세요</div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '13px', padding: '13px 16px', marginTop: '20px', maxWidth: '520px' }}>
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="6.5" stroke="#94A3B8" strokeWidth="2"/><path d="m14 14 4 4" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/></svg>
        <input 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          placeholder="병원명을 검색하세요" 
          style={{ flex: 1, border: 'none', outline: 'none', fontSize: '14.5px', fontFamily: 'inherit', background: 'transparent', color: '#1A1A2E' }} 
        />
      </div>
      
      <div className="ml-scroll" style={{ display: 'flex', gap: '9px', overflowX: 'auto', padding: '18px 0 6px' }}>
        {HCATS.map(c => {
          const active = category === c;
          return (
            <div 
              key={c} 
              onClick={() => setCategory(c)} 
              style={{ flexShrink: 0, padding: '9px 16px', borderRadius: '999px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', border: `1px solid ${active ? '#1B5C9B' : '#E2E8F0'}`, background: active ? '#1B5C9B' : '#FFFFFF', color: active ? '#FFFFFF' : '#475569' }}
            >
              {c}
            </div>
          );
        })}
      </div>
      
      <div style={{ fontSize: '13.5px', color: '#64748B', fontWeight: 600, margin: '8px 0 16px' }}>
        총 <span style={{ color: '#1B5C9B', fontWeight: 800 }}>{filteredHospitals.length}</span>개 병원
      </div>
      
      <div className="ml-hosgrid">
        {filteredHospitals.map(h => <HospitalCard key={h.id} hospital={h} />)}
      </div>
      
      <div style={{ height: '40px' }}></div>
    </div>
  );
}
