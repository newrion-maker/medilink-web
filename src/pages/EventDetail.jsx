import { useParams, useNavigate } from 'react-router-dom';
import { events, hospitals } from '../data/mockData';
import { ddayStyle, getHospitalBg } from '../utils/helpers';

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find(e => e.id === id);

  if (!event) {
    return <div style={{ padding: '60px', textAlign: 'center', color: '#64748B' }}>이벤트를 찾을 수 없습니다.</div>;
  }

  const hospital = hospitals.find(h => h.id === event.hospitalId);

  return (
    <div style={{ paddingTop: '14px', maxWidth: '720px', margin: '0 auto' }}>
      <div
        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#64748B', fontWeight: 600, fontSize: '14px', cursor: 'pointer', margin: '8px 0 24px' }}
        className="hover-text-blue"
        onClick={() => navigate(-1)}
      >
        <svg width="8" height="14" viewBox="0 0 11 19" fill="none"><path d="M9.5 1.5 2 9.5l7.5 8" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        목록으로
      </div>

      {/* 썸네일 */}
      <div style={{ width: '100%', height: 'clamp(180px, 30vw, 280px)', borderRadius: '20px', background: getHospitalBg(event.hospitalId), position: 'relative', overflow: 'hidden', marginBottom: '24px' }}>
        <span style={{ position: 'absolute', top: '16px', left: '16px', ...ddayStyle(event.urgent) }}>{event.dday}</span>
      </div>

      {/* 본문 */}
      <div style={{ background: '#fff', borderRadius: '20px', boxShadow: '0 2px 10px rgba(15,41,66,0.06)', overflow: 'hidden' }}>
        <div style={{ padding: 'clamp(22px, 4vw, 32px)' }}>
          <div style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.5px', lineHeight: 1.4 }}>{event.title}</div>
          <div style={{ fontSize: '14.5px', color: '#1B5C9B', fontWeight: 700, marginTop: '10px' }}>{hospital?.name}</div>
          <div style={{ fontSize: '13.5px', color: '#94A3B8', marginTop: '6px' }}>{event.period}</div>

          <div style={{ height: '1px', background: '#F1F5F9', margin: '24px 0' }}></div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0, width: '38px', height: '38px', borderRadius: '10px', background: '#EAF2FB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2Z" stroke="#1B5C9B" strokeWidth="1.8" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <div style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 600 }}>혜택</div>
                <div style={{ fontSize: '15.5px', fontWeight: 700, color: '#1E293B', marginTop: '4px' }}>{event.benefit}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0, width: '38px', height: '38px', borderRadius: '10px', background: '#E3F5EA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 11l3 3 5-5" stroke="#1E8449" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="9" stroke="#1E8449" strokeWidth="1.8"/></svg>
              </div>
              <div>
                <div style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 600 }}>참여 방법</div>
                <div style={{ fontSize: '15px', color: '#1E293B', marginTop: '4px', lineHeight: 1.6 }}>{event.howto}</div>
              </div>
            </div>

            {hospital && (
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: '38px', height: '38px', borderRadius: '10px', background: '#FEF9E7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 2.5h2.5L7 6 5 7.3c.8 1.7 2 2.9 3.7 3.7L10 9l3.5 1.5V13a1.5 1.5 0 0 1-1.7 1.5C6.6 14 2 9.4 1.5 4.2A1.5 1.5 0 0 1 3 2.5Z" stroke="#B5730F" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 600 }}>병원 연락처</div>
                  <div style={{ fontSize: '15.5px', fontWeight: 700, color: '#1E293B', marginTop: '4px' }}>{hospital.phone}</div>
                  <div style={{ fontSize: '13px', color: '#64748B', marginTop: '3px' }}>{hospital.address}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 예약하기 버튼 */}
        <div style={{ padding: '0 clamp(22px, 4vw, 32px) clamp(22px, 4vw, 32px)' }}>
          <div
            onClick={() => alert('예약 기능은 준비 중입니다.')}
            className="hover-bg-blue"
            style={{ background: '#1B5C9B', color: '#fff', fontSize: '16px', fontWeight: 800, padding: '18px', borderRadius: '14px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 4px 14px rgba(27,92,155,0.22)' }}
          >
            지금 예약하기
          </div>
        </div>
      </div>
      <div style={{ height: '40px' }}></div>
    </div>
  );
}
