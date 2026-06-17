import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { hospitals, events, columns, qnaSeed } from '../data/mockData';
import { HospitalCard, QnaCard, EventCard, ColumnCard } from '../components/Cards';
import { catColorStrong, getHospitalBg } from '../utils/helpers';

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  
  // Premium Carousel Logic
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

  // Data subsets
  const recommended = hospitals.slice(0, 4);
  const newlyOpened = hospitals.filter(h => !!h.openedAt).sort((a, b) => b.openedAt.localeCompare(a.openedAt));
  const popularQna = qnaSeed.filter(q => q.status === 'answered').slice(0, 3);
  const featuredEvent = events[3]; // e4
  const eventCards = [events[0], events[4], events[5], events[1]].filter(Boolean);
  const homeColumns = columns.slice(0, 2);

  const handleSearch = () => {
    if (search.trim()) {
      navigate('/hospitals', { state: { search } });
    }
  };

  const getHospitalName = (id) => hospitals.find(h => h.id === id)?.name || '';

  return (
    <div style={{ background: '#FAFBFD', minHeight: '100vh', paddingBottom: '60px' }}>
      
      {/* 1. Hero Section */}
      <div className="hero-bg-container" style={{ background: '#F0F5FA', overflow: 'hidden', position: 'relative' }}>
        {/* Generated Premium Clinic Background illustration */}
        <div className="hero-illustration" style={{ background: `url('/uploads/ourdoctor_hero_bg.png') right bottom / cover no-repeat` }}></div>
        {/* Soft elegant vignette overlay */}
        <div className="hero-overlay" style={{ background: 'linear-gradient(to right, rgba(240,245,260,0.98) 0%, rgba(240,245,260,0.85) 45%, rgba(240,245,260,0.1) 85%)' }}></div>
        
        <div className="hero-content-box" style={{ minHeight: '560px', paddingBottom: '48px' }}>
          
          {/* Top Registration Badge Link */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '16px' }}>
            <div 
              onClick={() => navigate('/hospital/register')} 
              className="hover-opacity" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', padding: '7px 14px', borderRadius: '24px', fontSize: '12.5px', fontWeight: 700, color: '#1B5C9B', cursor: 'pointer', border: '1px solid rgba(27,92,155,0.15)', boxShadow: '0 4px 14px rgba(27,92,155,0.06)' }}
            >
              <span>우리 병원 정보 등록하기</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
          </div>

          {/* Left-Aligned Premium Copy & Call-To-Action */}
          <div className="hero-text-section" style={{ maxWidth: '540px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#1B5C9B', letterSpacing: '-0.3px', marginBottom: '8px' }}>안심 병원들과 함께하는</div>
              <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, lineHeight: 1.25, color: '#0F2942', margin: 0, letterSpacing: '-1.5px' }}>
                우리 가족<br />건강 관리
              </h1>
            </div>
            <p style={{ fontSize: '15px', color: '#4A5D70', fontWeight: 500, lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line' }}>
              우리닥터는 믿을 수 있는 병원 정보와{"\n"}
              AI 상담으로 가족의 건강을 함께 지켜드립니다.
            </p>
            
            {/* AI Consult Button */}
            <div style={{ marginTop: '8px' }}>
              <div 
                onClick={() => navigate('/aichat')}
                className="hover-bg-blue" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#1B5C9B', color: '#fff', fontSize: '15.5px', fontWeight: 700, padding: '14px 28px', borderRadius: '28px', cursor: 'pointer', boxShadow: '0 8px 20px rgba(27,92,155,0.25)', transition: 'transform 0.2s' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <span>AI 상담 시작하기</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </div>
            </div>
          </div>

          {/* Empty spacer to keep content at the bottom aligned */}
          <div></div>
        </div>
      </div>

      {/* 2. Floating AI Prompt Card */}
      <div style={{ maxWidth: '1080px', margin: '-32px auto 0', padding: '0 20px', position: 'relative', zIndex: 5 }}>
        <div 
          onClick={() => navigate('/aichat')}
          className="hover-transform-shadow"
          style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#ffffff', borderRadius: '24px', padding: '16px 24px', border: '1px solid #EAF0F6', boxShadow: '0 10px 30px rgba(27,92,155,0.06)', cursor: 'pointer' }}
        >
          {/* Cute Robot Icon Wrapper */}
          <div style={{ width: '48px', height: '48px', background: '#E5F1FE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2v2M6 8a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v7a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" stroke="#1B5C9B" strokeWidth="2" strokeLinejoin="round"/>
              <circle cx="10" cy="11" r="1.5" fill="#1B5C9B"/>
              <circle cx="14" cy="11" r="1.5" fill="#1B5C9B"/>
              <path d="M9 15c1 1 5 1 6 0" stroke="#1B5C9B" strokeWidth="2" strokeLinecap="round"/>
              <path d="M2 11h2M20 11h2" stroke="#1B5C9B" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{ flex: 1, fontSize: '15px', fontWeight: 700, color: '#475569' }}>
            어디가 아프신가요? <span style={{ color: '#1B5C9B' }}>AI에게 물어보세요.</span>
          </span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </div>

      {/* Main Container */}
      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* 3. 4 Main Core Cards (Grid) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px', margin: '48px 0' }}>
          
          {/* Card 1: 제휴병원 찾기 */}
          <div onClick={() => navigate('/hospitals')} className="hover-transform-shadow" style={{ background: '#fff', borderRadius: '24px', padding: '28px 24px', border: '1px solid #EDF2F7', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}>
            <div style={{ width: '80px', height: '80px', background: '#EFF6FF', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              {/* Premium 3D-like Hospital SVG */}
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <defs>
                  <linearGradient id="gradHosp" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="100%" stopColor="#2563EB" />
                  </linearGradient>
                </defs>
                <rect x="8" y="14" width="28" height="26" rx="4" fill="url(#gradHosp)" />
                <rect x="15" y="4" width="14" height="10" rx="3" fill="#93C5FD" opacity="0.8" />
                <rect x="18" y="28" width="8" height="12" rx="1" fill="#fff" />
                <path d="M22 6v6M19 9h6" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" />
                <rect x="12" y="18" width="5" height="5" rx="1" fill="#fff" opacity="0.6" />
                <rect x="27" y="18" width="5" height="5" rx="1" fill="#fff" opacity="0.6" />
              </svg>
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F2942', margin: '0 0 6px 0' }}>제휴병원 찾기</h3>
            <p style={{ fontSize: '13px', color: '#64748B', margin: 0, fontWeight: 500 }}>우리 지역 병원 찾기</p>
          </div>

          {/* Card 2: 진료예약 */}
          <div onClick={() => navigate('/hospitals', { state: { filter: 'reservation' } })} className="hover-transform-shadow" style={{ background: '#fff', borderRadius: '24px', padding: '28px 24px', border: '1px solid #EDF2F7', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}>
            <div style={{ width: '80px', height: '80px', background: '#ECFDF5', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              {/* Premium 3D-like Calendar SVG */}
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <defs>
                  <linearGradient id="gradCal" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#34D399" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
                <rect x="8" y="10" width="28" height="28" rx="5" fill="url(#gradCal)" />
                <rect x="8" y="10" width="28" height="8" rx="2" fill="#047857" />
                <circle cx="14" cy="6" r="2" fill="#A7F3D0" />
                <circle cx="30" cy="6" r="2" fill="#A7F3D0" />
                <path d="M15 24l5 5 10-10" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F2942', margin: '0 0 6px 0' }}>진료예약</h3>
            <p style={{ fontSize: '13px', color: '#64748B', margin: 0, fontWeight: 500 }}>편리한 진료 예약</p>
          </div>

          {/* Card 3: 건강정보 */}
          <div onClick={() => navigate('/health')} className="hover-transform-shadow" style={{ background: '#fff', borderRadius: '24px', padding: '28px 24px', border: '1px solid #EDF2F7', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}>
            <div style={{ width: '80px', height: '80px', background: '#FFFBEB', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              {/* Premium 3D-like Shield SVG */}
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <defs>
                  <linearGradient id="gradShield" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FBBF24" />
                    <stop offset="100%" stopColor="#D97706" />
                  </linearGradient>
                </defs>
                <path d="M22 4s14 4 14 14c0 10-9 18-14 22C17 38 8 30 8 18c0-10 14-14 14-14Z" fill="url(#gradShield)" />
                <path d="M22 13v18M13 22h18" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F2942', margin: '0 0 6px 0' }}>건강정보</h3>
            <p style={{ fontSize: '13px', color: '#64748B', margin: 0, fontWeight: 500 }}>질병·검진 정보 확인</p>
          </div>

          {/* Card 4: 나의 건강 */}
          <div onClick={() => navigate('/mypage')} className="hover-transform-shadow" style={{ background: '#fff', borderRadius: '24px', padding: '28px 24px', border: '1px solid #EDF2F7', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}>
            <div style={{ width: '80px', height: '80px', background: '#F5F3FF', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              {/* Premium 3D-like Heartbeat SVG */}
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <defs>
                  <linearGradient id="gradHeart" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#A78BFA" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
                </defs>
                <path d="M12 22.5c-4-4-5-9 0-13s9 0 10 4c1-4 6-8 10-4s4 9 0 13l-10 10-10-10Z" fill="url(#gradHeart)" />
                <path d="M14 22h4l2-4 3 7 2-5 3 2" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F2942', margin: '0 0 6px 0' }}>나의 건강</h3>
            <p style={{ fontSize: '13px', color: '#64748B', margin: 0, fontWeight: 500 }}>건강기록 관리</p>
          </div>
        </div>

        {/* 4. Middle Layout: Customize Premium Banner & Device Mockup */}
        <div style={{ background: 'linear-gradient(135deg, #E0F2FE 0%, #DBEAFE 100%)', borderRadius: '28px', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '30px', margin: '48px 0', flexWrap: 'wrap', overflow: 'hidden', position: 'relative' }}>
          
          {/* Banner Left Details */}
          <div style={{ flex: '1 1 380px', minWidth: 0, zIndex: 2 }}>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0F2942', margin: '0 0 12px 0', letterSpacing: '-0.8px' }}>우리 가족 맞춤 건강 관리</h2>
            <p style={{ fontSize: '14.5px', color: '#46637F', fontWeight: 500, lineHeight: 1.6, margin: '0 0 24px 0' }}>
              AI가 가족 구성원의 건강 상태를 분석하고<br />
              현재 건강 상태에 따른 맞춤형 건강 가이드를 매일 제공합니다.
            </p>
            <div 
              onClick={() => navigate('/aichat')}
              className="hover-opacity" 
              style={{ display: 'inline-flex', alignItems: 'center', background: '#ffffff', color: '#1B5C9B', fontSize: '13.5px', fontWeight: 700, padding: '10px 20px', borderRadius: '12px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(15,41,66,0.06)' }}
            >
              자세히 보기
            </div>
          </div>

          {/* Smartphone Mockup */}
          <div style={{ flexShrink: 0, width: '180px', height: '240px', background: '#1E293B', borderRadius: '28px 28px 0 0', border: '5px solid #0F172A', borderBottom: 'none', padding: '12px 10px 0 10px', display: 'flex', flexDirection: 'column', gap: '8px', overflow: 'hidden', position: 'relative', boxShadow: '0 12px 30px rgba(0,0,0,0.15)', transform: 'translateY(40px)', transition: 'transform 0.3s' }}>
            {/* Phone Speaker Notch */}
            <div style={{ width: '50px', height: '6px', background: '#0F172A', borderRadius: '3px', margin: '0 auto 8px' }}></div>
            
            {/* Phone Screen Mockup Content */}
            <div style={{ background: '#F8FAFC', flex: 1, borderRadius: '16px 16px 0 0', padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 700 }}>오늘의 건강 점수</div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                
                {/* Radial score circle */}
                <div style={{ width: '82px', height: '82px', borderRadius: '50%', border: '6px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTopColor: '#3B82F6', borderRightColor: '#3B82F6', borderLeftColor: '#3B82F6' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '18px', fontWeight: 900, color: '#1E3A8A' }}>85<span style={{ fontSize: '10px', fontWeight: 700 }}>점</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Quick Help Service Section */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '42px 0 16px' }}>
          <div style={{ fontSize: '19px', fontWeight: 800, color: '#0F2942', letterSpacing: '-0.4px' }}>빠른 도움 서비스</div>
          <div onClick={() => navigate('/hospitals')} className="hover-text-blue" style={{ fontSize: '14px', color: '#1B5C9B', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }}>
            <span>더보기</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        </div>

        {/* Quick Help Service Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', margin: '16px 0 48px' }}>
          
          {/* Item 1: 응급상황 */}
          <div onClick={() => alert('가장 가까운 응급실 및 긴급 도움 요청 기능으로 연결됩니다.')} className="hover-transform-shadow" style={{ background: '#FFF5F5', border: '1px solid #FFE3E3', borderRadius: '20px', padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <div style={{ width: '42px', height: '42px', background: '#FEE2E2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 900, color: '#EF4444' }}>SOS</span>
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#1E293B' }}>응급상황</div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>빠른 도움 요청</div>
          </div>

          {/* Item 2: 증상검색 */}
          <div onClick={() => navigate('/hospitals')} className="hover-transform-shadow" style={{ background: '#EFF6FF', border: '1px solid #DBEAFE', borderRadius: '20px', padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <div style={{ width: '42px', height: '42px', background: '#DBEAFE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#1E293B' }}>증상검색</div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>증상으로 병원 찾기</div>
          </div>

          {/* Item 3: 검진센터 */}
          <div onClick={() => navigate('/hospitals', { state: { search: '검진' } })} className="hover-transform-shadow" style={{ background: '#ECFDF5', border: '1px solid #D1FAE5', borderRadius: '20px', padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <div style={{ width: '42px', height: '42px', background: '#D1FAE5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#1E293B' }}>검진센터</div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>건강검진 예약</div>
          </div>

          {/* Item 4: 약국찾기 */}
          <div onClick={() => navigate('/hospitals', { state: { search: '약국' } })} className="hover-transform-shadow" style={{ background: '#F5F3FF', border: '1px solid #EDE9FE', borderRadius: '20px', padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <div style={{ width: '42px', height: '42px', background: '#EDE9FE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2.5" transform="rotate(45)"><rect x="2" y="9" width="20" height="6" rx="3"/><line x1="12" y1="9" x2="12" y2="15"/></svg>
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#1E293B' }}>약국찾기</div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>근처 약국 찾기</div>
          </div>

        </div>

        {/* 6. Newly Opened Hospitals */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '44px 0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ fontSize: '19px', fontWeight: 800, color: '#0F2942', letterSpacing: '-0.4px' }}>새로 문 연 병원</div>
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

        {/* 7. Popular Q&A */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '42px 0 16px' }}>
          <div style={{ fontSize: '19px', fontWeight: 800, color: '#0F2942', letterSpacing: '-0.4px' }}>인기 Q&amp;A</div>
          <div onClick={() => navigate('/qna')} className="hover-text-blue" style={{ fontSize: '14px', color: '#64748B', fontWeight: 600, cursor: 'pointer' }}>더보기 ›</div>
        </div>
        <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 2px 10px rgba(15,41,66,0.04)', overflow: 'hidden', border: '1px solid #EDF2F7' }}>
          {popularQna.map(q => <QnaCard key={q.id} qna={q} hospitalName={getHospitalName(q.hospitalId)} />)}
        </div>

        {/* 8. Recommended Hospitals */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '40px 0 16px' }}>
          <div style={{ fontSize: '19px', fontWeight: 800, color: '#0F2942', letterSpacing: '-0.4px' }}>추천 병원</div>
          <div onClick={() => navigate('/hospitals')} className="hover-text-blue" style={{ fontSize: '14px', color: '#64748B', fontWeight: 600, cursor: 'pointer' }}>더보기 ›</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(228px, 1fr))', gap: '18px' }}>
          {recommended.map(h => <HospitalCard key={h.id} hospital={h} />)}
        </div>

        {/* 9. Premium Hospitals Carousel */}
        {premHospital && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px', margin: '46px 0 16px' }}>
              <div style={{ fontSize: '19px', fontWeight: 800, color: '#0F2942', letterSpacing: '-0.4px' }}>프리미엄 제휴 병원</div>
              <span style={{ background: 'linear-gradient(135deg,#F4C24B,#E0A82E)', color: '#0F2942', fontSize: '11px', fontWeight: 800, padding: '3px 9px', borderRadius: '6px' }}>프리미엄 제휴</span>
            </div>
            <div onMouseEnter={() => setPremPaused(true)} onMouseLeave={() => setPremPaused(false)} style={{ position: 'relative' }}>
              <div onClick={() => navigate(`/hospital/${premHospital.id}`)} className="hover-transform-shadow premium-banner">
                <div style={{ flex: '1 1 320px', minWidth: 0 }}>
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

        {/* 10. Event Banner */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '42px 0 16px' }}>
          <div style={{ fontSize: '19px', fontWeight: 800, color: '#0F2942', letterSpacing: '-0.4px' }}>진행 중 이벤트</div>
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

        {/* 11. Health Columns */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '42px 0 16px' }}>
          <div style={{ fontSize: '19px', fontWeight: 800, color: '#0F2942', letterSpacing: '-0.4px' }}>건강정보</div>
          <div onClick={() => navigate('/health')} className="hover-text-blue" style={{ fontSize: '14px', color: '#64748B', fontWeight: 600, cursor: 'pointer' }}>더보기 ›</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
          {homeColumns.map(c => <ColumnCard key={c.id} column={c} hospitalName={getHospitalName(c.hospitalId)} />)}
        </div>

      </div>
    </div>
  );
}
