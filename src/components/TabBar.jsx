import { NavLink } from 'react-router-dom';

export default function TabBar() {
  const tabStyle = ({ isActive }) => ({
    flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
    cursor: 'pointer', color: isActive ? '#1B5C9B' : '#9AA5B1', fontSize: '11.5px', fontWeight: 600, textDecoration: 'none'
  });

  return (
    <nav className="ml-tabbar" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40, background: '#fff', borderTop: '1px solid #E8EDF2', boxShadow: '0 -2px 14px rgba(15,41,66,0.05)' }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto', display: 'flex', padding: '9px 0 11px', position: 'relative' }}>
        <NavLink to="/" style={tabStyle}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3.5 10.5 12 3.5l8.5 7M5.5 9.2V20h13V9.2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>홈</span>
        </NavLink>
        <NavLink to="/hospitals" style={tabStyle}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.9"/><path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"/></svg>
          <span>병원찾기</span>
        </NavLink>
        
        {/* Center FAB AI Chat Button */}
        <NavLink to="/aichat" style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
          cursor: 'pointer', textDecoration: 'none', position: 'relative'
        }}>
          <div style={{
            width: '50px', height: '50px', borderRadius: '50%', background: '#1B5C9B',
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(27,92,155,0.3)', border: '3px solid #fff',
            position: 'absolute', top: '-22px', zIndex: 50
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#1B5C9B', marginTop: '28px' }}>AI 상담</span>
        </NavLink>

        <NavLink to="/qna" style={tabStyle}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 11.5a8 8 0 0 1-11.5 7.2L4 20l1.3-4.5A8 8 0 1 1 21 11.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 11h6M9 8h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
          <span>Q&amp;A</span>
        </NavLink>
        <NavLink to="/mypage" style={tabStyle}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8"/><path d="M5 20c0-3.3 3.1-5.5 7-5.5s7 2.2 7 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          <span>마이페이지</span>
        </NavLink>
      </div>
    </nav>
  );
}
