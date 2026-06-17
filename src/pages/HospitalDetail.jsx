import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { hospitals, qnaSeed } from '../data/mockData';
import { getHospitalBg, catColorStrong } from '../utils/helpers';
import { QnaCard } from '../components/Cards';

export default function HospitalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const hospital = hospitals.find(h => h.id === id);
  const [isFav, setIsFav] = useState(false); // In real app, this would be from context/user state

  if (!hospital) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>병원을 찾을 수 없습니다.</div>;
  }

  const hospitalQna = qnaSeed.filter(q => q.hospitalId === id).slice(0, 3);
  const favFill = isFav ? '#C0392B' : 'none';
  const favStroke = isFav ? '#C0392B' : '#94A3B8';

  const comingSoon = () => alert('병원 공식 홈페이지로 이동합니다');

  return (
    <div style={{ paddingTop: '8px' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#64748B', fontWeight: 600, fontSize: '14px', cursor: 'pointer', margin: '22px 0 2px' }} className="hover-text-blue" onClick={() => navigate(-1)}>
        <svg width="8" height="14" viewBox="0 0 11 19" fill="none"><path d="M9.5 1.5 2 9.5l7.5 8" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        뒤로
      </div>

      <div style={{ height: '220px', borderRadius: '18px', background: getHospitalBg(id), marginTop: '8px' }}></div>
      
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '22px' }}>
        {/* Main Content */}
        <div style={{ flex: '1 1 420px', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={catColorStrong(hospital.cats[0])}>{hospital.cats.join(' · ')}</span>
              <div style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.5px', marginTop: '10px' }}>{hospital.name}</div>
            </div>
            <div onClick={() => setIsFav(!isFav)} style={{ flex: '0 0 auto', width: '44px', height: '44px', borderRadius: '12px', background: '#fff', border: '1px solid #EDF1F6', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill={favFill}><path d="M12 20.5s-7.5-4.6-7.5-9.8A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 7.5 3.1c0 5.2-7.5 9.8-7.5 9.8Z" stroke={favStroke} strokeWidth="1.8" strokeLinejoin="round"/></svg>
            </div>
          </div>
          <div style={{ fontSize: '15px', color: '#475569', lineHeight: 1.65, marginTop: '16px' }}>{hospital.desc}</div>

          <div style={{ fontSize: '18px', fontWeight: 800, margin: '32px 0 14px' }}>이 병원 Q&amp;A</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
            {hospitalQna.length > 0 ? (
              hospitalQna.map(q => <QnaCard key={q.id} qna={q} hospitalName={hospital.name} />)
            ) : (
              <div style={{ fontSize: '14px', color: '#94A3B8' }}>등록된 Q&amp;A가 없습니다.</div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 2px 10px rgba(15,41,66,0.06)', padding: '20px' }}>
            <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '14px' }}>병원 정보</div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13.5px', color: '#334155', lineHeight: 1.5 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flex: '0 0 auto', marginTop: '1px' }}><path d="M8 1.5c-3 0-5.5 2.4-5.5 5.4C2.5 10.8 8 14.5 8 14.5s5.5-3.7 5.5-7.6C13.5 3.9 11 1.5 8 1.5Z" stroke="#1B5C9B" strokeWidth="1.5"/><circle cx="8" cy="6.8" r="1.9" stroke="#1B5C9B" strokeWidth="1.5"/></svg>
              <span>{hospital.address}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: '#334155', marginTop: '12px' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 2.5h2.5L7 6 5 7.3c.8 1.7 2 2.9 3.7 3.7L10 9l3.5 1.5V13a1.5 1.5 0 0 1-1.7 1.5C6.6 14 2 9.4 1.5 4.2A1.5 1.5 0 0 1 3 2.5Z" stroke="#1B5C9B" strokeWidth="1.5" strokeLinejoin="round"/></svg>
              <span>{hospital.phone}</span>
            </div>
            <div onClick={comingSoon} className="hover-bg-light" style={{ marginTop: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: '1.5px solid #1B5C9B', color: '#1B5C9B', borderRadius: '10px', padding: '12px', fontSize: '14.5px', fontWeight: 700, cursor: 'pointer' }}>
              병원 홈페이지
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M6 2h8v8M14 2 6.5 9.5M11 9.5V14H2V5h4.5" stroke="#1B5C9B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
          <div style={{ background: 'linear-gradient(135deg,#1B5C9B,#2E86C1)', borderRadius: '16px', padding: '20px', boxShadow: '0 8px 20px rgba(27,92,155,0.25)' }}>
            <div style={{ color: '#fff', fontSize: '15.5px', fontWeight: 700 }}>궁금한 점이 있으세요?</div>
            <div style={{ color: '#D6E8F7', fontSize: '13px', marginTop: '5px', lineHeight: 1.5 }}>증상을 남기면 병원이 공식 답변을 드려요</div>
            <div onClick={() => navigate('/qna/write', { state: { hospitalId: id } })} style={{ marginTop: '14px', background: '#fff', color: '#1B5C9B', borderRadius: '10px', padding: '12px', textAlign: 'center', fontSize: '15px', fontWeight: 800, cursor: 'pointer' }} className="hover-opacity">
              질문하기
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: '40px' }}></div>
    </div>
  );
}
