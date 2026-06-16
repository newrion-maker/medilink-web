import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { columns, hospitals } from '../data/mockData';
import { ColumnCard } from '../components/Cards';

const HCATS = ['전체', '소아건강', '관절/척추', '만성질환', '눈건강', '치아건강'];
const catMapping = {
  '전체': '전체',
  '소아건강': '소아과',
  '관절/척추': '정형외과',
  '만성질환': '내과',
  '눈건강': '안과',
  '치아건강': '치과'
};

export default function Health() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('전체');

  const mappedCat = catMapping[category] || '전체';
  const filteredColumns = columns.filter(c => mappedCat === '전체' || c.category === mappedCat);
  const getHospitalName = (id) => hospitals.find(h => h.id === id)?.name || '';

  return (
    <div style={{ paddingTop: '8px' }}>
      <div 
        onClick={() => navigate(-1)} 
        style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '6px', 
          color: '#64748B', 
          fontWeight: 600, 
          fontSize: '14px', 
          cursor: 'pointer', 
          margin: '22px 0 16px' 
        }} 
        className="hover-text-blue"
      >
        <svg width="8" height="14" viewBox="0 0 11 19" fill="none"><path d="M9.5 1.5 2 9.5l7.5 8" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        뒤로
      </div>

      <div style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.6px' }}>건강정보</div>
      <div style={{ fontSize: '14.5px', color: '#64748B', marginTop: '6px' }}>병원 의료진이 직접 전하는 건강 칼럼</div>
      
      <div className="ml-scroll" style={{ display: 'flex', gap: '9px', overflowX: 'auto', padding: '24px 0 6px' }}>
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
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px', marginTop: '16px' }}>
        {filteredColumns.map(c => <ColumnCard key={c.id} column={c} hospitalName={getHospitalName(c.hospitalId)} />)}
      </div>
      
      {filteredColumns.length === 0 && (
        <div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748B' }}>해당 카테고리의 칼럼이 없습니다.</div>
      )}
      <div style={{ height: '40px' }}></div>
    </div>
  );
}
