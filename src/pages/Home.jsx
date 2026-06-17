// Backup of original Home.jsx to allow quick rollback if needed
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { hospitals, events, columns, qnaSeed } from '../data/mockData';
import { HospitalCard, QnaCard, EventCard, ColumnCard } from '../components/Cards';
import { catColorStrong, getHospitalBg } from '../utils/helpers';

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  
  const premiumIdSet = ['h1', 'h4', 'h6'];
  const premiumHospitals = hospitals.filter(h => premiumIdSet.includes(h.id));
  const [premIdx, setPremIdx] = useState(0);
  const [premPaused, setPremPaused] = useState(false);

  useEffect(() => {
    if (premPaused) return;
    const t = setInterval(() => {
      setPremIdx((prev) => (prev + 1) % Math.max(premiumHospitals.length, 1));
    }, 4500);
    return () => clearInterval(t);
  }, [premPaused, premiumHospitals.length]);

  const premHospital = premiumHospitals[premIdx % Math.max(premiumHospitals.length, 1)];
  const recommended = hospitals.slice(0, 4);
  const newlyOpened = hospitals.filter(h => !!h.openedAt).sort((a, b) => b.openedAt.localeCompare(a.openedAt));
  const popularQna = qnaSeed.filter(q => q.status === 'answered').slice(0, 3);
  const featuredEvent = events[3];
  const eventCards = [events[0], events[4], events[5], events[1]].filter(Boolean);
  const homeColumns = columns.slice(0, 3);

  const handleSearch = () => {
    if (search.trim()) {
      navigate('/hospitals', { state: { search } });
    }
  };

  const getHospitalName = (id) => hospitals.find(h => h.id === id)?.name || '';

  return (
    <div>
      {/* Hero */}
      <div className="hero-bg-container">
        <div className="hero-illustration"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content-box">
          {/* Hospital Registration Link */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '16px' }}>
            <div 
              onClick={() => navigate('/hospital/register')} 
              className="hover-opacity" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(8px)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, color: '#1B5C9B', cursor: 'pointer', border: '1px solid rgba(27,92,155,0.15)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
            >
              <span>우리 병원 정보 등록하기</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
          </div>

          {/* Heading */}
          <div className="hero-text-section">
            <div style={{ fontSize: 'clamp(26px,3.4vw,40px)', fontWeight: 800, lineHeight: 1.3, letterSpacing: '-1.2px' }}>
              남양주 <span style={{ color: '#1B5C9B' }}>안심 병원</span>들과 함께하는<br/>우리 가족 건강 관리
            </div>
            <div style={{ fontSize: 'clamp(14px,1.5vw,17px)', color: '#46637F', fontWeight: 600, marginTop: '14px' }}>남양주 지역 의료 커뮤니티 플랫폼</div>
          </div>

          {/* Large Search Bar */}
          <div className="hero-search-section">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: 'clamp(13px, 1.6vw, 15px)', fontWeight: 700, color: '#1E293B', paddingLeft: '4px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1B5C9B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <span>증상이나 병원 이름으로 검색하고, 우리닥터에게 물어보세요</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: '20px', padding: '6px 8px 6px 20px', boxShadow: '0 12px 36px rgba(27,92,155,0.16)', border: '1px solid #E2E8F0' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px', flexShrink: 0 }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} placeholder="예) 무릎이 시큰해요, 다산동 소아과" style={{ flex: 1, border: 'none', outline: 'none', fontSize: '15.5px', fontWeight: 500, fontFamily: 'inherit', background: 'transparent', color: '#1A1A2E', minWidth: 0 }} />
              <div onClick={handleSearch} className="hover-bg-blue" style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#1B5C9B', color: '#fff', fontSize: '15px', fontWeight: 700, padding: '12px 26px', borderRadius: '15px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(27,92,155,0.2)', flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <span>검색</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Categories */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '36px 0 16px' }}>
        <div style={{ fontSize: '19px', fontWeight: 800, letterSpacing: '-0.4px' }}>진료과목 빠른 선택</div>
        <div onClick={() => navigate('/hospitals')} className="hover-text-blue" style={{ fontSize: '14px', color: '#64748B', fontWeight: 600, cursor: 'pointer' }}>더보기 ›</div>
      </div>
      <div className="category-grid">
        {[
          { name: '내과', icon: <><path d="M9 5v6a5 5 0 0 0 10 0V5" stroke="#1B5C9B" strokeWidth="2" strokeLinecap="round"/><path d="M14 20.5v2a6 6 0 0 0 12 0v-2.5" stroke="#1B5C9B" strokeWidth="2" strokeLinecap="round"/><circle cx="26" cy="17" r="2.6" stroke="#1B5C9B" strokeWidth="2"/><path d="M9 5h0M19 5h0" stroke="#1B5C9B" strokeWidth="3" strokeLinecap="round"/></> },
          { name: '외과', icon: <><path d="M22 6 9 19l-3 7 7-3L26 9c1-1 1-2 0-3s-3-1-4 0Z" stroke="#1B5C9B" strokeWidth="2" strokeLinejoin="round"/><path d="m18 10 4 4" stroke="#1B5C9B" strokeWidth="2"/></> },
          { name: '산부인과', icon: <><circle cx="16" cy="12" r="6.5" stroke="#1B5C9B" strokeWidth="2"/><path d="M16 18.5V27M12 23h8" stroke="#1B5C9B" strokeWidth="2" strokeLinecap="round"/></> },
          { name: '소아과', icon: <><circle cx="16" cy="15" r="9" stroke="#1B5C9B" strokeWidth="2"/><circle cx="13" cy="14" r="1.1" fill="#1B5C9B"/><circle cx="19" cy="14" r="1.1" fill="#1B5C9B"/><path d="M13 19a4 3 0 0 0 6 0" stroke="#1B5C9B" strokeWidth="2" strokeLinecap="round"/></> },
          { name: '정형외과', icon: <><path d="M11 21 21 11" stroke="#1B5C9B" strokeWidth="2.4" strokeLinecap="round"/><path d="M11 21c-1 1-2.6 1-3.6 0s-1-2.6 0-3.6c-1-1-1-2.6 0-3.6s2.6-1 3.6 0M21 11c1-1 2.6-1 3.6 0s1 2.6 0 3.6c1 1 1 2.6 0 3.6s-2.6 1-3.6 0" stroke="#1B5C9B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></> },
          { name: '치과', icon: <><path d="M16 6c-4 0-8 1.6-8 6 0 5.5 2.5 14 4.2 14 1.5 0 1.3-6 3.8-6s2.3 6 3.8 6C25.5 26 24 17.5 24 12c0-4.4-4-6-8-6Z" stroke="#1B5C9B" strokeWidth="2" strokeLinejoin="round"/></> },
          { name: '안과', icon: <><path d="M4 16s5-7.5 12-7.5S28 16 28 16s-5 7.5-12 7.5S4 16 4 16Z" stroke="#1B5C9B" strokeWidth="2" strokeLinejoin="round"/><circle cx="16" cy="16" r="3.2" stroke="#1B5C9B" strokeWidth="2"/></> },
          { name: '전체', icon: <><rect x="7" y="7" width="7" height="7" rx="2" stroke="#1B5C9B" strokeWidth="2"/><rect x="18" y="7" width="7" height="7" rx="2" stroke="#1B5C9B" strokeWidth="2"/><rect x="7" y="18" width="7" height="7" rx="2" stroke="#1B5C9B" strokeWidth="2"/><rect x="18" y="18" width="7" height="7" rx="2" stroke="#1B5C9B" strokeWidth="2"/></> }
        ].map(cat => (
          <div key={cat.name} onClick={() => navigate('/hospitals', { state: { category: cat.name } })} className="hover-transform-shadow category-card">
            <svg viewBox="0 0 32 32" fill="none">{cat.icon}</svg>
            <span>{cat.name === '전체' ? '더보기' : cat.name}</span>
          </div>
        ))}
      </div>

      {/* Popular Q&A */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '42px 0 16px' }}>
        <div style={{ fontSize: '19px', fontWeight: 800, letterSpacing: '-0.4px' }}>인기 Q&amp;A</div>
        <div onClick={() => navigate('/qna')} className="hover-text-blue" style={{ fontSize: '14px', color: '#64748B', fontWeight: 600, cursor: 'pointer' }}>더보기 ›</div>
      </div>
      <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 2px 10px rgba(15,41,66,0.06)', overflow: 'hidden' }}>
        {popularQna.map(q => <QnaCard key={q.id} qna={q} hospitalName={getHospitalName(q.hospitalId)} />)}
      </div>

      {/* Recommended Hospitals */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '40px 0 16px' }}>
        <div style={{ fontSize: '19px', fontWeight: 800, letterSpacing: '-0.4px' }}>추천 병원</div>
        <div onClick={() => navigate('/hospitals')} className="hover-text-blue" style={{ fontSize: '14px', color: '#64748B', fontWeight: 600, cursor: 'pointer' }}>더보기 ›</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(228px, 1fr))', gap: '18px' }}>
        {recommended.map(h => <HospitalCard key={h.id} hospital={h} />)}
      </div>

      {/* Newly Opened Hospitals */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '44px 0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ fontSize: '19px', fontWeight: 800, letterSpacing: '-0.4px' }}>새로 문 연 병원</div>
          <span style={{ background: '#E8F6EE', color: '#1E8449', fontSize: '11px', fontWeight: 800, padding: '3px 9px', borderRadius: '6px' }}>NEW</span>
        </div>
        <div onClick={() => navigate('/hospitals', { state: { category: '신규개원' } })} className="hover-text-blue" style={{ fontSize: '14px', color: '#64748B', fontWeight: 600, cursor: 'pointer' }}>더보기 ›</div>
      </div>
      <div style={{ fontSize: '14px', color: '#64748B', marginTop: '-8px', marginBottom: '16px', lineHeight: 1.4 }}>
        우리 동네에 최근 개원한 병원이에요. 가장 먼저 만나보세요.
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(228px, 1fr))', gap: '18px' }}>
        {newlyOpened.map(h => <HospitalCard key={h.id} hospital={h} />)}
      </div>

      {/* Premium Hospitals Carousel */}
      {premHospital && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px', margin: '46px 0 16px' }}>
            <div style={{ fontSize: '19px', fontWeight: 800, letterSpacing: '-0.4px' }}>프리미엄 제휴 병원</div>
            <span style={{ background: 'linear-gradient(135deg,#F4C24B,#E0A82E)', color: '#0F2942', fontSize: '11px', fontWeight: 800, padding: '3px 9px', borderRadius: '6px' }}>프리미엄 제휴</span>
          </div>
          <div onMouseEnter={() => setPremPaused(true)} onMouseLeave={() => setPremPaused(false)} style={{ position: 'relative' }}>
            <div onClick={() => navigate(`/hospital/${premHospital.id}`)} className="hover-transform-shadow premium-banner">
              <div className="premium-banner-content" style={{ flex: '1 1 320px', minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#F4C24B', color: '#0F2942', fontSize: '11.5px', fontWeight: 800, padding: '4px 10px', borderRadius: '6px' }}>★ 프리미엄 제휴</span>
                  <span style={catColorStrong(premHospital.cats[0])}>{premHospital.cats.join(' · ')}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginTop: '14px' }}>
                  <span style={{ color: '#fff', fontSize: 'clamp(21px,2.4vw,27px)', fontWeight: 800, letterSpacing: '-0.6px' }}>{premHospital.name}</span>
                  <svg width="19" height="19" viewBox="0 0 16 16" fill="none" style={{ flex: '0 0 auto' }}><path d="M8 1.5 9.8 3l2.3-.2.6 2.2 2 1.2-1 2 .9 2.1-2 1.1-.7 2.2-2.2-.3L8 14.5 6.3 13l-2.3.2-.6-2.2-2-1.2 1-2-.9-2.1 2-1.1.7-2.2L8 1.5Z" fill="#F4C24B"/><path d="m5.8 8 1.6 1.6L10.4 6" stroke="#0F2942" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div style={{ color: '#CFE0F0', fontSize: '14px', lineHeight: 1.6, marginTop: '10px', maxWidth: '480px' }}>{premHospital.desc}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px', fontSize: '13px', color: '#9DB2C9', flexWrap: 'wrap' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}><svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M8 1.5c-3 0-5.5 2.4-5.5 5.4C2.5 10.8 8 14.5 8 14.5s5.5-3.7 5.5-7.6C13.5 3.9 11 1.5 8 1.5Z" stroke="#9DB2C9" strokeWidth="1.4"/><circle cx="8" cy="6.8" r="1.7" stroke="#9DB2C9" strokeWidth="1.4"/></svg>{premHospital.region}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}><svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3 2.5h2.5L7 6 5 7.3c.8 1.7 2 2.9 3.7 3.7L10 9l3.5 1.5V13a1.5 1.5 0 0 1-1.7 1.5C6.6 14 2 9.4 1.5 4.2A1.5 1.5 0 0 1 3 2.5Z" stroke="#9DB2C9" strokeWidth="1.4" strokeLinejoin="round"/></svg>{premHospital.phone}</span>
                </div>
              </div>
              <div className="premium-banner-img" style={{ background: getHospitalBg(premHospital.bgImage || premHospital.id) }}></div>
            </div>
            <div onClick={(e) => { e.stopPropagation(); setPremIdx(prev => (prev - 1 + premiumHospitals.length) % premiumHospitals.length); }} className="hover-opacity" style={{ position: 'absolute', left: '10px', top: 'calc(50% - 20px)', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.95)', boxShadow: '0 4px 14px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 3 }}>
              <svg width="10" height="16" viewBox="0 0 11 19" fill="none"><path d="M9.5 1.5 2 9.5l7.5 8" stroke="#0F2942" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div onClick={(e) => { e.stopPropagation(); setPremIdx(prev => (prev + 1) % premiumHospitals.length); }} className="hover-opacity" style={{ position: 'absolute', right: '10px', top: 'calc(50% - 20px)', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.95)', boxShadow: '0 4px 14px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 3 }}>
              <svg width="10" height="16" viewBox="0 0 11 19" fill="none"><path d="M1.5 1.5 9 9.5l-7.5 8" stroke="#0F2942" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '14px' }}>
              {premiumHospitals.map((_, i) => (
                <span key={i} onClick={() => setPremIdx(i)} style={{ width: i === premIdx ? '22px' : '7px', height: '7px', borderRadius: '999px', background: i === premIdx ? '#1B5C9B' : '#CBD5E1', transition: 'all .25s', cursor: 'pointer' }}></span>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Event Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '42px 0 16px' }}>
        <div style={{ fontSize: '19px', fontWeight: 800, letterSpacing: '-0.4px' }}>진행 중 이벤트</div>
        <div onClick={() => navigate('/events')} className="hover-text-blue" style={{ fontSize: '14px', color: '#64748B', fontWeight: 600, cursor: 'pointer' }}>더보기 ›</div>
      </div>
      {featuredEvent && (
        <div onClick={() => navigate(`/event/${featuredEvent.id}`)} className="hover-transform-shadow" style={{ display: 'flex', alignItems: 'center', gap: '24px', background: 'linear-gradient(120deg,#E7F1FC,#DCEBFB)', borderRadius: '18px', padding: 'clamp(20px,3vw,30px)', cursor: 'pointer', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 320px', minWidth: 0 }}>
            <div style={{ fontSize: 'clamp(19px,2.2vw,24px)', fontWeight: 800, letterSpacing: '-0.5px' }}>{featuredEvent.title}</div>
            <div style={{ fontSize: '14.5px', color: '#46637F', marginTop: '8px' }}>{featuredEvent.benefit}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
              <span style={{ background: '#1B5C9B', color: '#fff', fontSize: '12.5px', fontWeight: 700, padding: '5px 13px', borderRadius: '999px' }}>{getHospitalName(featuredEvent.hospitalId)}</span>
              <span style={{ fontSize: '13px', color: '#64748B' }}>{featuredEvent.period}</span>
              <span style={{ fontSize: '13.5px', color: '#C0392B', fontWeight: 800 }}>{featuredEvent.dday}</span>
            </div>
          </div>
          <div style={{ flexShrink: 0, width: '160px', height: '110px', borderRadius: '14px', background: getHospitalBg(featuredEvent.hospitalId) }}></div>
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '16px' }}>
        {eventCards.map(e => <EventCard key={e.id} event={e} hospitalName={getHospitalName(e.hospitalId)} />)}
      </div>

      {/* Health Columns */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '42px 0 16px' }}>
        <div style={{ fontSize: '19px', fontWeight: 800, letterSpacing: '-0.4px' }}>건강정보</div>
        <div onClick={() => navigate('/health')} className="hover-text-blue" style={{ fontSize: '14px', color: '#64748B', fontWeight: 600, cursor: 'pointer' }}>더보기 ›</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
        {homeColumns.map(c => <ColumnCard key={c.id} column={c} hospitalName={getHospitalName(c.hospitalId)} />)}
      </div>

      <div style={{ height: '40px' }}></div>
    </div>
  );
}
