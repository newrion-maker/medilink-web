import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  const comingSoon = () => alert('준비 중인 기능입니다');

  return (
    <footer style={{ width: '100%', background: '#0F2942', marginTop: 'auto' }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '48px clamp(16px,4vw,28px) 28px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        <div style={{ flex: '2 1 300px', minWidth: '240px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/uploads/icon.png" alt="우리닥터" style={{ width: '38px', height: '38px', objectFit: 'contain', display: 'block' }} />
            <div style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.6px', color: '#fff' }}>우리닥터</div>
          </div>
          <div style={{ fontSize: '14px', color: '#9DB2C9', lineHeight: 1.7, marginTop: '16px', maxWidth: '380px' }}>남양주 시민과 지역 병원을 잇는 우리 동네 의료 커뮤니티 플랫폼입니다. 증상을 물어보고, 동네 병원의 공식 답변으로 신뢰를 쌓으세요.</div>
          <div style={{ fontSize: '12.5px', color: '#637E9B', marginTop: '18px' }}>운영 · MetaQ (메타큐)</div>
        </div>
        <div style={{ flex: '1 1 140px', minWidth: '120px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff', letterSpacing: '0.3px' }}>바로가기</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', marginTop: '16px' }}>
            <div onClick={() => navigate('/hospitals')} style={{ fontSize: '13.5px', color: '#9DB2C9', cursor: 'pointer' }} className="hover-text-blue">병원 찾기</div>
            <div onClick={() => navigate('/qna')} style={{ fontSize: '13.5px', color: '#9DB2C9', cursor: 'pointer' }} className="hover-text-blue">의료 Q&amp;A</div>
            <div onClick={() => navigate('/events')} style={{ fontSize: '13.5px', color: '#9DB2C9', cursor: 'pointer' }} className="hover-text-blue">이벤트</div>
            <div onClick={() => navigate('/health')} style={{ fontSize: '13.5px', color: '#9DB2C9', cursor: 'pointer' }} className="hover-text-blue">건강정보</div>
          </div>
        </div>
        <div style={{ flex: '1 1 140px', minWidth: '120px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff', letterSpacing: '0.3px' }}>고객지원</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', marginTop: '16px' }}>
            <div onClick={comingSoon} style={{ fontSize: '13.5px', color: '#9DB2C9', cursor: 'pointer' }} className="hover-text-blue">공지사항</div>
            <div onClick={comingSoon} style={{ fontSize: '13.5px', color: '#9DB2C9', cursor: 'pointer' }} className="hover-text-blue">자주 묻는 질문</div>
            <div onClick={comingSoon} style={{ fontSize: '13.5px', color: '#9DB2C9', cursor: 'pointer' }} className="hover-text-blue">1:1 문의</div>
            <div onClick={comingSoon} style={{ fontSize: '13.5px', color: '#9DB2C9', cursor: 'pointer' }} className="hover-text-blue">병원 입점 문의</div>
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid #1E3B57' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '18px clamp(16px,4vw,28px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '12.5px', color: '#5E7892' }}>© 2025 MetaQ. All rights reserved.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div onClick={comingSoon} style={{ fontSize: '12.5px', color: '#9DB2C9', cursor: 'pointer' }} className="hover-text-blue">이용약관</div>
            <div onClick={comingSoon} style={{ fontSize: '12.5px', color: '#CFE0F0', fontWeight: 600, cursor: 'pointer' }} className="hover-text-blue">개인정보처리방침</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
