import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { hospitals } from '../data/mockData';

const QCATS = ['내과', '외과', '산부인과', '소아과', '정형외과', '치과', '안과', '이비인후과', '기타'];

export default function QnaWrite() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedHospitalId, setSelectedHospitalId] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (location.state?.hospitalId) {
      setSelectedHospitalId(location.state.hospitalId);
    }
    if (location.state?.category) {
      setSelectedCat(location.state.category);
    }
    if (location.state?.title) {
      setTitle(location.state.title);
    }
    if (location.state?.content) {
      setContent(location.state.content);
    }
  }, [location.state]);

  const handleSubmit = () => {
    if (!selectedHospitalId) return alert('병원을 선택해주세요.');
    if (!selectedCat) return alert('진료과목을 선택해주세요.');
    if (!title.trim()) return alert('제목을 입력해주세요.');
    if (!content.trim()) return alert('내용을 입력해주세요.');
    
    alert('질문이 등록되었습니다.');
    navigate('/qna');
  };

  return (
    <div style={{ paddingTop: '14px', maxWidth: '720px', margin: '0 auto' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#64748B', fontWeight: 600, fontSize: '14px', cursor: 'pointer', margin: '8px 0 16px' }} className="hover-text-blue" onClick={() => navigate(-1)}>
        <svg width="8" height="14" viewBox="0 0 11 19" fill="none"><path d="M9.5 1.5 2 9.5l7.5 8" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        취소
      </div>
      
      <div style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.6px' }}>질문 작성</div>
      <div style={{ fontSize: '14.5px', color: '#64748B', marginTop: '6px' }}>가까운 병원에 증상을 물어보세요</div>

      <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 2px 10px rgba(15,41,66,0.06)', padding: 'clamp(20px, 4vw, 30px)', marginTop: '24px' }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '14.5px', fontWeight: 700, marginBottom: '10px' }}>병원 선택 <span style={{ color: '#C0392B' }}>*</span></div>
          <select 
            value={selectedHospitalId} 
            onChange={e => setSelectedHospitalId(e.target.value)}
            style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '15px', fontFamily: 'inherit', color: '#334155', background: '#F8FAFC' }}
          >
            <option value="">질문을 남길 병원을 선택하세요</option>
            {hospitals.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '14.5px', fontWeight: 700, marginBottom: '10px' }}>진료과목 <span style={{ color: '#C0392B' }}>*</span></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {QCATS.map(c => {
              const active = selectedCat === c;
              return (
                <div 
                  key={c} 
                  onClick={() => setSelectedCat(c)} 
                  style={{ padding: '8px 16px', borderRadius: '999px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', border: `1px solid ${active ? '#1B5C9B' : '#E2E8F0'}`, background: active ? '#1B5C9B' : '#fff', color: active ? '#fff' : '#475569' }}
                >
                  {c}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '14.5px', fontWeight: 700, marginBottom: '10px' }}>제목 <span style={{ color: '#C0392B' }}>*</span></div>
          <input 
            value={title} 
            onChange={e => setTitle(e.target.value)}
            placeholder="증상이나 궁금한 점을 간략히 적어주세요" 
            style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '15px', fontFamily: 'inherit', color: '#334155' }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '14.5px', fontWeight: 700, marginBottom: '10px' }}>내용 <span style={{ color: '#C0392B' }}>*</span></div>
          <textarea 
            value={content} 
            onChange={e => setContent(e.target.value)}
            placeholder="상세한 증상, 발생 시기 등을 적어주시면 더 정확한 답변을 받을 수 있습니다." 
            style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '15px', fontFamily: 'inherit', color: '#334155', minHeight: '200px', resize: 'vertical' }}
          />
        </div>

        <div 
          onClick={handleSubmit} 
          className="hover-opacity" 
          style={{ width: '100%', background: '#1B5C9B', color: '#fff', fontSize: '16px', fontWeight: 800, padding: '18px', borderRadius: '14px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 4px 14px rgba(27,92,155,0.2)' }}
        >
          등록하기
        </div>
      </div>
      <div style={{ height: '40px' }}></div>
    </div>
  );
}
