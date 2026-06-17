export const hospitals = [
  { id:'h1', name:'다산연세내과의원', cats:['내과'], region:'다산동', address:'남양주시 다산중앙로 82', phone:'031-555-1234', website:'#', desc:'소화기 내시경과 만성질환 관리, 종합 건강검진을 전문으로 합니다.' },
  { id:'h2', name:'별내자연드림소아과', cats:['소아과'], region:'별내동', address:'남양주시 별내중앙로 25', phone:'031-555-2345', website:'#', desc:'영유아 검진과 예방접종, 소아 호흡기 질환을 진료합니다.' },
  { id:'h3', name:'평내튼튼정형외과', cats:['정형외과'], region:'평내동', address:'남양주시 경춘로 1542', phone:'031-555-3456', website:'#', desc:'관절·척추 통증과 도수치료, 스포츠 손상을 진료합니다.' },
  { id:'h4', name:'다산미소산부인과', cats:['산부인과'], region:'다산동', address:'남양주시 다산순환로 110', phone:'031-555-4567', website:'#', desc:'산전 관리부터 여성 건강검진까지 함께합니다.' },
  { id:'h5', name:'진접우리들치과', cats:['치과'], region:'진접읍', address:'남양주시 진접읍 봉현로 33', phone:'031-555-5678', website:'#', desc:'임플란트와 교정, 심미 보철을 전문으로 합니다.' },
  { id:'h6', name:'별내밝은안과', cats:['안과'], region:'별내동', address:'남양주시 별내3로 7', phone:'031-555-6789', website:'#', desc:'백내장·녹내장과 시력교정 수술을 진료합니다.' },
  { id:'h7', name:'화도연세이비인후과', cats:['이비인후과'], region:'화도읍', address:'남양주시 마석우로 210', phone:'031-555-7890', website:'#', desc:'비염·중이염과 코골이, 어지럼증을 진료합니다.', openedAt: '2026.05' },
  { id:'h8', name:'오남속편한내과', cats:['내과'], region:'오남읍', address:'남양주시 진건오남로 615', phone:'031-555-8901', website:'#', desc:'위·대장 내시경과 소화기 질환 중심 진료입니다.' },
  { id:'h9', name:'와부서울정형외과', cats:['정형외과'], region:'와부읍', address:'남양주시 덕소로 145', phone:'031-555-9012', website:'#', desc:'스포츠 손상 재활과 비수술 통증 치료를 합니다.', openedAt: '2026.06' },
  { id:'h10', name:'다산열린가정의학과', cats:['내과'], region:'다산동', address:'남양주시 다산지금로 70', phone:'031-555-0123', website:'#', desc:'만성질환 관리와 예방접종, 건강 상담을 합니다.' },
  { id:'h11', name:'다산튼튼외과의원', cats:['외과'], region:'다산동', address:'남양주시 다산중앙로 140', phone:'031-555-1357', website:'#', desc:'일반 외과 수술과 갑상선·유방, 항문 질환을 진료합니다.', openedAt: '2026.04' },
  { id:'h12', name:'다산맑은피부과의원', cats:['피부과'], region:'다산동', address:'남양주시 다산중앙로 115', phone:'031-555-2468', website:'#', desc:'여드름, 기미·잡티 색소치료 및 아토피 피부 질환을 진료합니다.' },
  { id:'h13', name:'별내미앤미성형외과의원', cats:['성형외과'], region:'별내동', address:'남양주시 별내중앙로 45', phone:'031-555-1358', website:'#', desc:'쌍꺼풀 수술, 쁘띠 성형(필러·보톡스) 및 안티에이징 리프팅을 진료합니다.' }
];

export const qnaSeed = [
  { id:'q1', hospitalId:'h2', category:'소아과', title:'아이가 밤마다 기침을 해요', content:'5살 아이인데 낮에는 괜찮다가 잠들면 기침을 심하게 합니다. 가습기를 틀어도 비슷한데 병원에 가야 할까요?', anonymous:false, status:'answered', answerCount:1, answerBy:'박소연', answerRole:'소아청소년과 전문의', answerDate:'2025.06.12', answerText:'야간 기침은 누운 자세에서 분비물이 기도를 자극해 심해질 수 있습니다. 습도를 50~60%로 유지하고 수분을 충분히 주세요. 다만 기침이 2주 이상 지속되거나 호흡이 거칠고 발열이 동반되면 모세기관지염·천식 가능성이 있어 진료가 필요합니다.', createdAt:'2025.06.12', mine:false },
  { id:'q2', hospitalId:'h3', category:'정형외과', title:'계단 오를 때 무릎이 시큰합니다', content:'평지를 걸을 땐 괜찮은데 계단을 오를 때 무릎 앞쪽이 시큰합니다. 운동을 더 해야 하는 건지 쉬어야 하는 건지 모르겠어요.', anonymous:false, status:'answered', answerCount:1, answerBy:'김정훈', answerRole:'정형외과 전문의', answerDate:'2025.06.11', answerText:'무릎 앞쪽 통증은 슬개대퇴 통증증후군일 가능성이 높습니다. 허벅지 앞 근육 강화 운동이 도움이 되며, 통증이 심할 땐 계단·등산은 잠시 피하는 것이 좋습니다. 부기나 잠김 증상이 있다면 연골 손상 확인을 위해 내원해 주세요.', createdAt:'2025.06.11', mine:false },
  { id:'q3', hospitalId:'h1', category:'내과', title:'건강검진에서 간수치가 높게 나왔어요', content:'회사 검진에서 AST/ALT가 정상보다 조금 높게 나왔습니다. 술은 거의 안 마시는데 왜 그런지, 재검사가 필요한지 궁금합니다.', anonymous:false, status:'waiting', answerCount:0, createdAt:'2025.06.13', mine:true },
  { id:'q4', hospitalId:'h4', category:'산부인과', title:'임신 8주인데 입덧이 너무 심해요', content:'물도 삼키기 힘들 만큼 입덧이 심합니다. 약을 먹어도 되는지, 언제쯤 나아지는지 알고 싶어요.', anonymous:true, status:'answered', answerCount:1, answerBy:'이수민', answerRole:'산부인과 전문의', answerDate:'2025.06.09', answerText:'임신 초기 입덧은 8~12주에 가장 심하고 이후 호전되는 경우가 많습니다. 소량씩 자주 드시고 공복을 피하세요. 물도 못 삼킬 정도이거나 체중이 줄면 임신오조로 수액·약물 치료가 필요하니 내원 바랍니다.', createdAt:'2025.06.09', mine:false },
  { id:'q5', hospitalId:'h5', category:'치과', title:'사랑니 꼭 빼야 하나요?', content:'아래쪽 사랑니가 비스듬히 났는데 아프지는 않습니다. 안 빼도 괜찮을까요, 아니면 미리 빼는 게 좋을까요?', anonymous:false, status:'waiting', answerCount:0, createdAt:'2025.06.13', mine:true },
  { id:'q6', hospitalId:'h6', category:'안과', title:'눈 충혈이 일주일째 계속돼요', content:'특별히 아프지는 않은데 한쪽 눈이 계속 빨갛습니다. 인공눈물을 넣어도 나아지지 않아요.', anonymous:false, status:'answered', answerCount:1, answerBy:'최현우', answerRole:'안과 전문의', answerDate:'2025.06.10', answerText:'일주일 이상 충혈이 지속되면 단순 피로보다 결막염이나 안구건조증을 의심합니다. 렌즈 착용을 줄이고 인공눈물을 사용해 보세요. 통증·시력저하·분비물이 동반되면 빠른 진료가 필요합니다.', createdAt:'2025.06.10', mine:false }
];

export const events = [
  { id:'e1', hospitalId:'h2', title:'영유아 검진 사전예약 오픈', period:'2025.06.01 ~ 06.30', benefit:'검진 후 영양제 증정', dday:'D-15', urgent:false, howto:'앱에서 신청 후 병원 방문 시 안내데스크에 예약 확인' },
  { id:'e2', hospitalId:'h3', title:'도수치료 첫 방문 30% 할인', period:'2025.06.01 ~ 06.20', benefit:'초진 도수치료 30% 할인', dday:'D-5', urgent:true, howto:'첫 내원 시 앱 화면 제시' },
  { id:'e3', hospitalId:'h5', title:'임플란트 무료 상담 주간', period:'2025.06.10 ~ 06.25', benefit:'CT 촬영비 무료', dday:'D-10', urgent:false, howto:'전화 또는 앱으로 상담 예약' },
  { id:'e4', hospitalId:'h1', title:'환절기 독감 예방접종 예약', period:'2025.06.01 ~ 06.18', benefit:'사전예약 시 5,000원 할인', dday:'D-3', urgent:true, howto:'앱에서 사전예약 후 방문 접종' },
  { id:'e5', hospitalId:'h6', title:'시력교정 라식·라섹 정밀검사 무료', period:'2025.06.05 ~ 06.30', benefit:'수술 전 정밀검사 비용 면제', dday:'D-15', urgent:false, howto:'앱에서 상담 예약 후 방문' },
  { id:'e6', hospitalId:'h8', title:'위·대장 내시경 패키지 할인', period:'2025.06.01 ~ 06.28', benefit:'수면 내시경 패키지 15% 할인', dday:'D-13', urgent:false, howto:'전화 또는 앱으로 검진 예약' }
];

export const columns = [
  { id:'c1', hospitalId:'h2', author:'박소연', category:'소아과', title:'환절기, 우리 아이 기침 언제 병원에 가야 할까요?', date:'2025.06.10', body:'환절기에는 일교차로 인해 아이들의 기침이 잦아집니다. 대부분은 단순 감기로 1~2주 내 호전되지만, 기침이 3주 이상 지속되거나 숨소리가 거칠고 발열이 동반된다면 모세기관지염이나 천식을 의심해야 합니다. 집에서는 실내 습도를 50~60%로 유지하고 따뜻한 수분을 충분히 보충해 주세요. 밤사이 기침으로 잠을 못 잘 정도라면 진료를 받아보시길 권합니다.' },
  { id:'c2', hospitalId:'h3', author:'김정훈', category:'정형외과', title:'무릎 통증, 운동해도 될 때 vs 쉬어야 할 때', date:'2025.06.08', body:'무릎 통증이 있다고 무조건 운동을 멈출 필요는 없습니다. 가벼운 뻐근함은 적절한 근력 운동으로 오히려 호전될 수 있습니다. 다만 무릎이 붓거나, 움직일 때 걸리는 느낌, 계단을 내려갈 때 힘이 빠지는 증상이 있다면 연골이나 인대 손상을 의심하고 운동을 멈춰야 합니다. 통증이 2주 이상 지속되면 정확한 진단을 받는 것이 좋습니다.' },
  { id:'c3', hospitalId:'h1', author:'이재호', category:'내과', title:'간수치(AST·ALT)가 높다는 건 무슨 의미일까요?', date:'2025.06.05', body:'건강검진에서 간수치가 높게 나오면 많은 분이 놀라십니다. AST와 ALT는 간세포가 손상될 때 혈액으로 흘러나오는 효소로, 음주뿐 아니라 지방간, 약물, 과로, 비만 등 다양한 원인으로 오를 수 있습니다. 가벼운 상승은 생활습관 교정으로 회복되는 경우가 많지만, 수치가 정상의 2배 이상이거나 지속적으로 오른다면 원인 확인을 위한 추가 검사가 필요합니다.' },
  { id:'c4', hospitalId:'h6', author:'최현우', category:'안과', title:'라식과 라섹, 나에게 맞는 시력교정은?', date:'2025.06.02', body:'라식과 라섹은 모두 각막을 교정해 시력을 개선하는 수술입니다. 라식은 회복이 빠르고 통증이 적은 반면 각막 절편을 만들기 때문에 충분한 각막 두께가 필요합니다. 라섹은 회복이 다소 느리지만 각막을 더 많이 보존할 수 있어 얇은 각막이나 활동량이 많은 분께 적합합니다. 정밀 검사로 각막 상태를 확인한 뒤 결정하는 것이 안전합니다.' }
];
