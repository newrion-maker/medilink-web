import { NavLink, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const navStyle = ({ isActive }) => ({
    fontSize: '15px', fontWeight: 700, cursor: 'pointer',
    color: isActive ? '#1B5C9B' : '#46556A', padding: '6px 2px',
    borderBottom: '2.5px solid ' + (isActive ? '#1B5C9B' : 'transparent'),
    whiteSpace: 'nowrap', transition: 'color .15s', textDecoration: 'none'
  });

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: '#fff', borderBottom: '1px solid #E8EDF2', boxShadow: '0 1px 0 rgba(0,0,0,0.02)' }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto', height: '66px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', padding: '0 clamp(16px,4vw,28px)' }}>
        <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '11px', cursor: 'pointer', minWidth: 0 }}>
          <img src="/uploads/icon.png" alt="우리닥터" style={{ flex: '0 0 auto', width: '42px', height: '42px', objectFit: 'contain', display: 'block' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', flex: '0 0 auto' }}>
            <div style={{ fontSize: '23px', fontWeight: 800, letterSpacing: '-0.5px', whiteSpace: 'nowrap', lineHeight: 1.05 }}>
              <span style={{ color: '#1B5C9B' }}>우리</span><span style={{ color: '#0F2942' }}>닥터</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 1.5c-3 0-5.5 2.4-5.5 5.4C2.5 10.8 8 14.5 8 14.5s5.5-3.7 5.5-7.6C13.5 3.9 11 1.5 8 1.5Z" stroke="#1B5C9B" strokeWidth="1.6"/><circle cx="8" cy="6.8" r="1.7" fill="#1B5C9B"/></svg>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#1B5C9B', letterSpacing: '0.2px' }}>남양주</span>
            </div>
          </div>
          <div className="ml-tagline" style={{ fontSize: '13.5px', color: '#8A98A8', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', borderLeft: '1px solid #E4E9EF', paddingLeft: '12px', marginLeft: '4px' }}>남양주 시민과 지역 병원을 연결합니다</div>
        </div>
        <nav className="ml-topnav" style={{ alignItems: 'center', gap: '24px' }}>
          <NavLink to="/" style={navStyle}>홈</NavLink>
          <NavLink to="/hospitals" style={navStyle}>병원찾기</NavLink>
          <NavLink to="/qna" style={navStyle}>의료 Q&amp;A</NavLink>
          <NavLink to="/events" style={navStyle}>이벤트</NavLink>
          <NavLink to="/health" style={navStyle}>건강정보</NavLink>
          <NavLink 
            to="/aichat" 
            style={({ isActive }) => ({
              fontSize: '14px',
              fontWeight: 800,
              cursor: 'pointer',
              background: '#1B5C9B',
              color: '#fff',
              padding: '7px 16px',
              borderRadius: '999px',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
              boxShadow: '0 3px 8px rgba(27,92,155,0.25)',
              opacity: isActive ? 0.9 : 1
            })}
          >
            AI 상담
          </NavLink>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: '0 0 auto' }}>
          <div onClick={() => navigate('/hospitals')} className="hover-bg-light" style={{ width: '42px', height: '42px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="10.5" cy="10.5" r="6.5" stroke="#334155" strokeWidth="2"/><path d="m16 16 4.5 4.5" stroke="#334155" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
          <div className="hover-bg-light" style={{ position: 'relative', width: '42px', height: '42px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" stroke="#334155" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.7 21a2 2 0 0 1-3.4 0" stroke="#334155" strokeWidth="1.9" strokeLinecap="round"/></svg>
            <div style={{ position: 'absolute', top: '9px', right: '10px', width: '7px', height: '7px', borderRadius: '50%', background: '#C0392B', border: '1.5px solid #fff' }}></div>
          </div>
          <div onClick={() => navigate('/mypage')} className="hover-bg-blue" style={{ marginLeft: '4px', width: '38px', height: '38px', borderRadius: '50%', background: '#1B5C9B', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 800, cursor: 'pointer' }}>다</div>
        </div>
      </div>
    </header>
  );
}
