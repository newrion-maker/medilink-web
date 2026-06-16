import { useState } from 'react';
import { events, hospitals } from '../data/mockData';
import { EventCard } from '../components/Cards';

const ECATS = ['전체', '피부/비만', '치아교정', '시력교정', '건강검진', '기타'];

export default function Events() {
  const [category, setCategory] = useState('전체');

  const filteredEvents = events.filter(e => category === '전체' || e.category === category);
  const getHospitalName = (id) => hospitals.find(h => h.id === id)?.name || '';

  return (
    <div style={{ paddingTop: '14px' }}>
      <div style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.6px' }}>진행 중 이벤트</div>
      <div style={{ fontSize: '14.5px', color: '#64748B', marginTop: '6px' }}>남양주 병원들의 특별한 혜택을 만나보세요</div>
      
      <div className="ml-scroll" style={{ display: 'flex', gap: '9px', overflowX: 'auto', padding: '24px 0 6px' }}>
        {ECATS.map(c => {
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
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '16px' }}>
        {filteredEvents.map(e => <EventCard key={e.id} event={e} hospitalName={getHospitalName(e.hospitalId)} />)}
      </div>
      
      {filteredEvents.length === 0 && (
        <div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748B' }}>해당 카테고리의 이벤트가 없습니다.</div>
      )}
      <div style={{ height: '40px' }}></div>
    </div>
  );
}
