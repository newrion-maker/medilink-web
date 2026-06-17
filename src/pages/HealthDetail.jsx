import { useParams, useNavigate } from 'react-router-dom';
import { columns, hospitals } from '../data/mockData';
import { catColor, getColumnBg, getHospitalBg } from '../utils/helpers';

export default function HealthDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const column = columns.find(c => c.id === id);

  if (!column) {
    return <div style={{ padding: '60px', textAlign: 'center', color: '#64748B' }}>칼럼을 찾을 수 없습니다.</div>;
  }

  const hospital = hospitals.find(h => h.id === column.hospitalId);

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
      <div style={{ width: '100%', height: 'clamp(180px, 28vw, 260px)', borderRadius: '20px', background: getColumnBg(column.category, column.id), marginBottom: '24px', overflow: 'hidden' }}></div>

      <div style={{ background: '#fff', borderRadius: '20px', boxShadow: '0 2px 10px rgba(15,41,66,0.06)', overflow: 'hidden' }}>
        <div style={{ padding: 'clamp(22px, 4vw, 36px)' }}>
          <span style={catColor(column.category)}>{column.category}</span>
          <div style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.6px', lineHeight: 1.35, marginTop: '16px' }}>{column.title}</div>

          {/* 작성자 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '22px', padding: '16px', background: '#F8FAFC', borderRadius: '12px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: getHospitalBg(hospital?.bgImage || hospital?.id), flexShrink: 0 }}></div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 800 }}>{column.author} 원장</div>
              <div style={{ fontSize: '13px', color: '#64748B', marginTop: '3px' }}>{hospital?.name} · {column.date}</div>
            </div>
          </div>

          <div style={{ height: '1px', background: '#F1F5F9', margin: '28px 0' }}></div>

          <div style={{ fontSize: '15.5px', color: '#1E293B', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{column.body}</div>

          <div style={{ height: '1px', background: '#F1F5F9', margin: '28px 0' }}></div>

          {/* 병원 바로가기 */}
          <div
            onClick={() => navigate(`/hospital/${hospital?.id}`)}
            className="hover-transform-shadow"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: '#EAF2FB', borderRadius: '14px', cursor: 'pointer' }}
          >
            <div>
              <div style={{ fontSize: '13px', color: '#1B5C9B', fontWeight: 700 }}>칼럼 작성 병원</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#0F2942', marginTop: '4px' }}>{hospital?.name}</div>
            </div>
            <svg width="9" height="16" viewBox="0 0 11 19" fill="none"><path d="M1.5 1.5 9 9.5l-7.5 8" stroke="#1B5C9B" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </div>
      <div style={{ height: '40px' }}></div>
    </div>
  );
}
