import { useParams, useNavigate } from 'react-router-dom';
import { qnaSeed, hospitals } from '../data/mockData';
import { catColor, catColorStrong, getHospitalBg } from '../utils/helpers';

export default function QnaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const qna = qnaSeed.find(q => q.id === id);

  if (!qna) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>질문을 찾을 수 없습니다.</div>;
  }

  const hospital = hospitals.find(h => h.id === qna.hospitalId);
  const answered = qna.status === 'answered';

  return (
    <div style={{ paddingTop: '8px' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#64748B', fontWeight: 600, fontSize: '14px', cursor: 'pointer', margin: '22px 0 16px' }} className="hover-text-blue" onClick={() => navigate(-1)}>
        <svg width="8" height="14" viewBox="0 0 11 19" fill="none"><path d="M9.5 1.5 2 9.5l7.5 8" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        목록으로
      </div>

      <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 2px 10px rgba(15,41,66,0.06)', overflow: 'hidden' }}>
        <div style={{ padding: 'clamp(20px, 4vw, 30px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={catColor(qna.category)}>{qna.category}</span>
            <span style={{ fontSize: '13.5px', color: '#94A3B8' }}>{qna.createdAt}</span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.4px', marginTop: '16px', lineHeight: 1.4 }}>{qna.title}</div>
          <div style={{ fontSize: '15.5px', color: '#334155', lineHeight: 1.7, marginTop: '20px', whiteSpace: 'pre-wrap' }}>{qna.content}</div>
        </div>
        
        {answered ? (
          <div style={{ background: '#F8FAFC', padding: 'clamp(20px, 4vw, 30px)', borderTop: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: hospital ? getHospitalBg(hospital.id) : '#1B5C9B', flexShrink: 0 }}></div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16.5px', fontWeight: 800 }}>{hospital?.name}</span>
                  <span style={{ fontSize: '12px', background: '#D5F5E3', color: '#1E8449', padding: '3px 8px', borderRadius: '6px', fontWeight: 700 }}>공식답변</span>
                </div>
                <div style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>{qna.answeredAt}</div>
              </div>
            </div>
            <div style={{ fontSize: '15px', color: '#1E293B', lineHeight: 1.7, marginTop: '20px', whiteSpace: 'pre-wrap', background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              {qna.answer}
            </div>
          </div>
        ) : (
          <div style={{ background: '#F8FAFC', padding: 'clamp(20px, 4vw, 30px)', borderTop: '1px solid #E2E8F0', textAlign: 'center' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ margin: '0 auto' }}><path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.2L2 22l4.8-1.4c1.6.9 3.3 1.4 5.2 1.4Z" stroke="#CBD5E1" strokeWidth="1.5" strokeLinejoin="round"/><path d="M8 12h.01M12 12h.01M16 12h.01" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round"/></svg>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#64748B', marginTop: '16px' }}>아직 병원 답변이 등록되지 않았습니다.</div>
            <div style={{ fontSize: '14px', color: '#94A3B8', marginTop: '6px' }}>전문의가 질문을 확인하고 답변을 작성 중입니다.</div>
          </div>
        )}
      </div>
      <div style={{ height: '40px' }}></div>
    </div>
  );
}
