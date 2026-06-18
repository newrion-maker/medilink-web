import { useNavigate } from 'react-router-dom';
import { catColor, catColorStrong, getHospitalBg, getColumnBg, badgeStyle, ddayStyle } from '../utils/helpers';

export function HospitalCard({ hospital }) {
  const navigate = useNavigate();
  const catText = hospital.cats.join(' · ');
  const isNew = !!hospital.openedAt;
  
  return (
    <div 
      onClick={() => navigate(`/hospital/${hospital.id}`)} 
      style={{ 
        background: '#fff', 
        borderRadius: '16px', 
        overflow: 'hidden', 
        boxShadow: '0 2px 10px rgba(15,41,66,0.06)', 
        cursor: 'pointer', 
        transition: 'all .15s',
        border: isNew ? '1.5px solid #E8F6EE' : '1px solid transparent'
      }} 
      className="hover-transform-shadow"
    >
      <div style={{ position: 'relative', height: '130px', background: getHospitalBg(hospital.bgImage || hospital.id) }}>
        <span style={{ position: 'absolute', top: '12px', left: '12px', ...catColorStrong(hospital.cats[0]) }}>{catText}</span>
        {isNew && (
          <span style={{ 
            position: 'absolute', 
            top: '12px', 
            right: '12px', 
            background: '#1E8449', 
            color: '#fff', 
            padding: '4px 9px', 
            borderRadius: '999px', 
            fontSize: '11px', 
            fontWeight: 800,
            boxShadow: '0 2px 5px rgba(0,0,0,0.15)'
          }}>
            NEW
          </span>
        )}
      </div>
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '-0.3px' }}>{hospital.name}</div>
        
        {isNew && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#1E8449', fontWeight: 700 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>{hospital.openedAt} 개원</span>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B' }}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M8 1.5c-3 0-5.5 2.4-5.5 5.4C2.5 10.8 8 14.5 8 14.5s5.5-3.7 5.5-7.6C13.5 3.9 11 1.5 8 1.5Z" stroke="#94A3B8" strokeWidth="1.4"/><circle cx="8" cy="6.8" r="1.7" stroke="#94A3B8" strokeWidth="1.4"/></svg>
          <span>{hospital.region}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B' }}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3 2.5h2.5L7 6 5 7.3c.8 1.7 2 2.9 3.7 3.7L10 9l3.5 1.5V13a1.5 1.5 0 0 1-1.7 1.5C6.6 14 2 9.4 1.5 4.2A1.5 1.5 0 0 1 3 2.5Z" stroke="#94A3B8" strokeWidth="1.4" strokeLinejoin="round"/></svg>
          <span>{hospital.phone}</span>
        </div>
      </div>
    </div>
  );
}

export function QnaCard({ qna, hospitalName }) {
  const navigate = useNavigate();
  const answered = qna.status === 'answered';
  const statusLabel = answered ? '답변완료' : '답변대기';

  return (
    <div onClick={() => navigate(`/qna/${qna.id}`)} className="hover-bg-light" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 20px', borderBottom: '1px solid #F1F5F9', cursor: 'pointer', flexWrap: 'wrap' }}>
      <div style={{ flex: '0 0 auto', width: '38px', height: '38px', borderRadius: '11px', background: '#EAF2FB', color: '#1B5C9B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px', fontWeight: 800 }}>Q</div>
      <div style={{ flex: '1 1 320px', minWidth: 0 }}>
        <div style={{ fontSize: '15.5px', fontWeight: 700, letterSpacing: '-0.2px' }}>{qna.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '7px' }}>
          <span style={{ fontSize: '12.5px', color: '#94A3B8' }}>{hospitalName}</span>
          <span style={catColor(qna.category)}>{qna.category}</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flex: '0 0 auto' }}>
        <span style={badgeStyle(answered)}>{statusLabel}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#94A3B8', lineHeight: 1 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}><path d="M21 11.5a8 8 0 0 1-11.5 7.2L4 20l1.3-4.5A8 8 0 1 1 21 11.5Z" stroke="#94A3B8" strokeWidth="1.8" strokeLinejoin="round"/></svg>
          <span style={{ lineHeight: 1 }}>{qna.answerCount || 0}</span>
        </div>
        <span style={{ fontSize: '13px', color: '#B6C2CF', lineHeight: 1, display: 'inline-flex', alignItems: 'center' }}>{qna.createdAt}</span>
      </div>
    </div>
  );
}

export function EventCard({ event, hospitalName }) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/event/${event.id}`)} style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(15,41,66,0.06)', cursor: 'pointer', transition: 'all .15s' }} className="hover-transform-shadow">
      <div style={{ position: 'relative', height: '150px', background: getHospitalBg(event.hospitalId) }}>
        <span style={{ position: 'absolute', top: '12px', left: '12px', ...ddayStyle(event.urgent) }}>{event.dday}</span>
      </div>
      <div style={{ padding: '15px 16px' }}>
        <div style={{ fontSize: '15.5px', fontWeight: 700, lineHeight: 1.4, letterSpacing: '-0.2px' }}>{event.title}</div>
        <div style={{ fontSize: '13px', color: '#1B5C9B', fontWeight: 600, marginTop: '7px' }}>{hospitalName}</div>
        <div style={{ fontSize: '12.5px', color: '#94A3B8', marginTop: '8px' }}>{event.period}</div>
      </div>
    </div>
  );
}

export function ColumnCard({ column, hospitalName }) {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate(`/health/${column.id}`)} 
      style={{ 
        background: '#fff', 
        borderRadius: '16px', 
        overflow: 'hidden', 
        boxShadow: '0 2px 10px rgba(15,41,66,0.06)', 
        cursor: 'pointer', 
        transition: 'all .15s',
        display: 'flex',
        flexDirection: 'column'
      }} 
      className="hover-transform-shadow"
    >
      <div style={{ width: '100%', height: '180px', background: getColumnBg(column.category, column.id) }}></div>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        <div>
          <span style={catColor(column.category)}>{column.category}</span>
        </div>
        <div style={{ fontSize: '17px', fontWeight: 800, lineHeight: 1.4, color: '#1A1A2E', letterSpacing: '-0.3px', minHeight: '48px' }}>
          {column.title}
        </div>
        <div style={{ fontSize: '13px', color: '#94A3B8', marginTop: 'auto', fontWeight: 500 }}>
          {hospitalName} · {column.author} 원장 · {column.date}
        </div>
      </div>
    </div>
  );
}
