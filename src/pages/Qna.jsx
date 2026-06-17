import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { qnaSeed, hospitals } from '../data/mockData';
import { QnaCard } from '../components/Cards';

const QCATS = ['전체', '내과', '외과', '산부인과', '소아과', '정형외과', '치과', '안과', '이비인후과', '기타'];

export default function Qna() {
  const location = useLocation();
  const navigate = useNavigate();
  const [category, setCategory] = useState('전체');
  const [filterHospitalId, setFilterHospitalId] = useState(null);

  useEffect(() => {
    if (location.state?.hospitalId) {
      setFilterHospitalId(location.state.hospitalId);
    }
  }, [location.state]);

  const filteredQna = qnaSeed.filter(q => 
    (category === '전체' || q.category === category) &&
    (!filterHospitalId || q.hospitalId === filterHospitalId)
  );
  
  // Sort by date descending (mock data has simple dates, we'll just reverse)
  filteredQna.reverse();

  const getHospitalName = (id) => hospitals.find(h => h.id === id)?.name || '';

  return (
    <div style={{ paddingTop: '14px', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.6px' }}>의료 Q&amp;A</div>
          <div style={{ fontSize: '14.5px', color: '#64748B', marginTop: '6px' }}>이웃들의 질문과 동네 전문의의 생생한 답변</div>
        </div>
        <div 
          onClick={() => navigate('/qna/write', { state: { hospitalId: filterHospitalId } })} 
          className="hover-transform-shadow" 
          style={{ background: '#1B5C9B', color: '#fff', borderRadius: '12px', padding: '12px 22px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', flexShrink: 0, boxShadow: '0 4px 12px rgba(27,92,155,0.2)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>
          <span style={{ fontSize: '14.5px', fontWeight: 800 }}>질문하기</span>
        </div>
      </div>
      
      {filterHospitalId && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#EAF2FB', color: '#1B5C9B', padding: '8px 14px', borderRadius: '8px', fontSize: '14px', fontWeight: 700, marginTop: '16px' }}>
          {getHospitalName(filterHospitalId)} 지정 질문
          <div onClick={() => setFilterHospitalId(null)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', background: '#1B5C9B', color: '#fff', borderRadius: '50%', fontSize: '12px' }}>✕</div>
        </div>
      )}
      
      <div className="ml-scroll" style={{ display: 'flex', gap: '9px', overflowX: 'auto', padding: '18px 0 6px' }}>
        {QCATS.map(c => {
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
      
      <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 2px 10px rgba(15,41,66,0.06)', overflow: 'hidden', marginTop: '16px' }}>
        {filteredQna.length > 0 ? (
          filteredQna.map(q => <QnaCard key={q.id} qna={q} hospitalName={getHospitalName(q.hospitalId)} />)
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>해당 조건의 Q&amp;A가 없습니다.</div>
        )}
      </div>
      
      <div style={{ height: '40px' }}></div>
    </div>
  );
}
