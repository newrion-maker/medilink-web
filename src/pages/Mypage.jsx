import { useNavigate } from 'react-router-dom';

export default function Mypage() {
  const navigate = useNavigate();
  const comingSoon = () => alert('준비 중인 기능입니다');

  return (
    <div style={{ paddingTop: '14px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.6px' }}>마이페이지</div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: '#fff', borderRadius: '16px', padding: '24px', marginTop: '24px', boxShadow: '0 2px 10px rgba(15,41,66,0.06)' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#1B5C9B', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', fontWeight: 800 }}>다</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '20px', fontWeight: 800 }}>다산맘</div>
          <div style={{ fontSize: '14px', color: '#64748B', marginTop: '4px' }}>남양주 다산동</div>
        </div>
        <div onClick={comingSoon} style={{ padding: '8px 14px', background: '#F1F5F9', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>프로필 수정</div>
      </div>

      <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', marginTop: '16px', boxShadow: '0 2px 10px rgba(15,41,66,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ fontSize: '17px', fontWeight: 800 }}>우리 가족 건강 프로필</div>
          <div onClick={comingSoon} style={{ fontSize: '13px', color: '#1B5C9B', fontWeight: 700, cursor: 'pointer' }}>+ 추가하기</div>
        </div>
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
          <div style={{ flexShrink: 0, padding: '12px 16px', background: '#EAF2FB', border: '1px solid #D6E8F7', borderRadius: '12px', minWidth: '120px' }}>
            <div style={{ fontSize: '12px', color: '#1B5C9B', fontWeight: 700 }}>본인</div>
            <div style={{ fontSize: '15px', fontWeight: 800, marginTop: '4px' }}>다산맘</div>
          </div>
          <div style={{ flexShrink: 0, padding: '12px 16px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', minWidth: '120px' }}>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 700 }}>자녀</div>
            <div style={{ fontSize: '15px', fontWeight: 800, marginTop: '4px' }}>우진이 (5세)</div>
          </div>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '16px', padding: '12px 24px', marginTop: '16px', boxShadow: '0 2px 10px rgba(15,41,66,0.06)' }}>
        {[
          { label: '내가 작성한 Q&A', onClick: () => navigate('/qna') },
          { label: '단골 병원 관리', onClick: comingSoon },
          { label: '참여한 이벤트', onClick: comingSoon },
          { label: '고객 센터', onClick: comingSoon },
          { label: '설정', onClick: comingSoon }
        ].map((item, idx) => (
          <div key={idx} onClick={item.onClick} className="hover-bg-light" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: idx < 4 ? '1px solid #F1F5F9' : 'none', cursor: 'pointer' }}>
            <div style={{ fontSize: '15.5px', fontWeight: 600, color: '#334155' }}>{item.label}</div>
            <svg width="8" height="14" viewBox="0 0 11 19" fill="none"><path d="M1.5 1.5 9 9.5l-7.5 8" stroke="#94A3B8" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        ))}
      </div>
      
      <div style={{ height: '40px' }}></div>
    </div>
  );
}
