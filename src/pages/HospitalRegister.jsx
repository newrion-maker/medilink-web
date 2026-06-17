import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { hospitals, saveHospitalToStore } from '../data/mockData';

export default function HospitalRegister() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('editId');

  const [formData, setFormData] = useState({
    name: '',
    director: '',
    phone: '',
    category: '',
    address: '',
    website: '',
    desc: '',
    bgImage: ''
  });
  const [previewImage, setPreviewImage] = useState('');

  // Pre-populate form when in edit mode
  useEffect(() => {
    if (editId) {
      const existing = hospitals.find(h => h.id === editId);
      if (existing) {
        setFormData({
          name: existing.name || '',
          director: existing.director || '대표원장', // fallback if empty
          phone: existing.phone || '',
          category: existing.cats?.[0] || '',
          address: existing.address || '',
          website: existing.website === '#' ? '' : existing.website,
          desc: existing.desc || '',
          bgImage: existing.bgImage || ''
        });
        if (existing.bgImage) {
          setPreviewImage(existing.bgImage);
        }
      }
    }
  }, [editId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData(prev => ({ ...prev, bgImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.director || !formData.phone || !formData.category || !formData.address) {
      alert('필수 입력 항목(*)을 모두 입력해주세요.');
      return;
    }

    // Extract region from address (first or second block)
    const addrParts = formData.address.split(' ');
    let region = '남양주';
    for (const part of addrParts) {
      if (part.endsWith('동') || part.endsWith('읍') || part.endsWith('면')) {
        region = part;
        break;
      }
    }

    const newHospital = {
      id: editId ? editId : 'h_' + Date.now(),
      name: formData.name,
      cats: [formData.category],
      region: region,
      address: formData.address,
      phone: formData.phone,
      website: formData.website || '#',
      desc: formData.desc || `${formData.name}입니다.`,
      bgImage: formData.bgImage || '',
      openedAt: editId ? (hospitals.find(h => h.id === editId)?.openedAt || '2026.06') : new Date().toISOString().substring(0, 7).replace('-', '.') // preserve opening date
    };

    saveHospitalToStore(newHospital);
    alert(editId ? '병원 정보 수정이 완료되었습니다!' : '병원 정보 등록이 완료되었습니다!');
    navigate(editId ? `/hospital/${editId}` : '/');
  };

  return (
    <div style={{ background: '#F4F7FA', minHeight: '100vh', padding: '60px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Top Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', background: '#E2E8F0', borderRadius: '16px', marginBottom: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#1B5C9B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F2942', margin: '0 0 8px 0', letterSpacing: '-0.6px' }}>
          {editId ? '병원 정보 수정' : '병원 정보 등록'}
        </h1>
        <p style={{ fontSize: '14px', color: '#64748B', fontWeight: 500, margin: 0, lineHeight: 1.5 }}>
          {editId ? '등록된 병원 정보를 수정할 수 있습니다.' : '우리닥터와 함께할 병원 정보를 입력해주세요.'}<br />
          {editId ? '수정을 마친 뒤 완료 버튼을 눌러주세요.' : '한 번에 입력하면 끝, 3분이면 충분해요.'}
        </p>
      </div>

      {/* Main Card Form */}
      <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: '24px', padding: '36px', width: '100%', maxWidth: '640px', boxShadow: '0 10px 30px rgba(15,41,66,0.05)', border: '1px solid #E2E8F0' }}>
        
        {/* Row 1 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
              병원명 <span style={{ color: '#E11D48' }}>*</span>
            </label>
            <input 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="예) 다산연세내과의원" 
              required
              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '14.5px', fontWeight: 500, outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
              대표원장명 <span style={{ color: '#E11D48' }}>*</span>
            </label>
            <input 
              name="director" 
              value={formData.director} 
              onChange={handleChange} 
              placeholder="예) 홍길동" 
              required
              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '14.5px', fontWeight: 500, outline: 'none' }}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
              전화번호 <span style={{ color: '#E11D48' }}>*</span>
            </label>
            <input 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              placeholder="예) 031-555-1234" 
              required
              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '14.5px', fontWeight: 500, outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
              진료과목 <span style={{ color: '#E11D48' }}>*</span>
            </label>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              required
              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '14.5px', fontWeight: 500, outline: 'none', background: '#fff' }}
            >
              <option value="">선택하세요</option>
              <option value="내과">내과</option>
              <option value="외과">외과</option>
              <option value="산부인과">산부인과</option>
              <option value="소아과">소아과</option>
              <option value="정형외과">정형외과</option>
              <option value="치과">치과</option>
              <option value="안과">안과</option>
              <option value="이비인후과">이비인후과</option>
              <option value="피부과">피부과</option>
              <option value="성형외과">성형외과</option>
            </select>
          </div>
        </div>

        {/* Row 3 */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
            주소 (동네) <span style={{ color: '#E11D48' }}>*</span>
          </label>
          <input 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
            placeholder="예) 남양주시 다산중앙로 82" 
            required
            style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '14.5px', fontWeight: 500, outline: 'none' }}
          />
        </div>

        {/* Row 4 */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
            병원 홈페이지 URL
          </label>
          <input 
            name="website" 
            value={formData.website} 
            onChange={handleChange} 
            placeholder="예) https://hospital.co.kr (선택)" 
            style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '14.5px', fontWeight: 500, outline: 'none' }}
          />
        </div>

        {/* Row 5 */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
            간단 소개글
          </label>
          <textarea 
            name="desc" 
            value={formData.desc} 
            onChange={handleChange} 
            placeholder="예) 소화기 내시경과 만성질환 관리를 전문으로 합니다. (선택)" 
            rows="3"
            style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '14.5px', fontWeight: 500, outline: 'none', resize: 'none', fontFamily: 'inherit' }}
          />
        </div>

        {/* Image upload preview */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
            대표 사진
          </label>
          <div style={{ position: 'relative', border: '2px dashed #CBD5E1', borderRadius: '16px', background: '#F8FAFC', cursor: 'pointer', height: '160px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
              style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', zIndex: 2 }}
            />
            {previewImage ? (
              <img src={previewImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ textAlign: 'center', color: '#64748B', pointerEvents: 'none' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '8px' }}>
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>클릭해서 병원 대표 사진을 올려주세요</div>
                <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>JPG, PNG - 권장 1200×800</div>
              </div>
            )}
          </div>
        </div>

        {/* Info Banner */}
        <div style={{ display: 'flex', gap: '10px', background: '#E0F2FE', color: '#0369A1', padding: '12px 16px', borderRadius: '12px', fontSize: '12.5px', fontWeight: 600, lineHeight: 1.4, marginBottom: '24px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <span>사업자등록 등 서류 인증은 등록 후 담당자가 도와드려요. 지금은 기본 정보만 입력하면 됩니다.</span>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="hover-bg-blue" 
          style={{ width: '100%', border: 'none', background: '#1B5C9B', color: '#fff', fontSize: '16px', fontWeight: 700, padding: '16px', borderRadius: '14px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(27,92,155,0.2)', transition: 'background 0.2s' }}
        >
          {editId ? '수정 완료' : '등록하기'}
        </button>
      </form>

      {/* Back to Home Link */}
      <div 
        onClick={() => navigate('/')} 
        style={{ marginTop: '24px', fontSize: '14px', color: '#64748B', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
      >
        <span>← 우리닥터 홈으로</span>
      </div>
    </div>
  );
}
