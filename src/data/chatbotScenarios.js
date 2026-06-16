export const chatbotScenarios = {
  "designTokens": {
    "primary": "#1B5C9B",
    "secondary": "#1E8449",
    "userBubbleBg": "#1B5C9B",
    "userBubbleText": "#FFFFFF",
    "botBubbleBg": "#EEF1F4",
    "botBubbleText": "#1A1A2E",
    "urgency": { "danger": "#F44336", "warn": "#FF9800", "safe": "#1E8449" },
    "bubbleRadius": "12px",
    "font": "Pretendard"
  },
  "disclaimer": "본 AI 상담은 의학적 확진·진단이 아닌 참고용 진료과 추천 서비스입니다. 정확한 진단과 치료는 반드시 의료기관에서 의사의 진료를 받으세요.",
  "emergencyKeywords": ["의식저하", "심한 흉통", "심하게 숨이 참", "호흡곤란", "대량 출혈", "신체 마비", "경련", "뇌졸중 의심", "시야 이상", "자살 암시"],
  "entryChips": [
    { "key": "abdomen", "emoji": "🤕", "label": "배가 아파요" },
    { "key": "head", "emoji": "🤯", "label": "머리가 아파요" },
    { "key": "skin", "emoji": "😣", "label": "피부에 뭐가 났어요" }
  ],
  "scenarios": {
    "abdomen": {
      "label": "배 / 복통 (급성 충수염 의심)",
      "firstUser": "어제 저녁부터 배가 아파요",
      "steps": [
        { "bot": [{ "k": "text", "v": "배의 어느 부위가 가장 불편하신가요? 배꼽을 중심으로 짚어주세요." }], "opt": { "type": "body" } },
        { "bot": [{ "k": "text", "v": "통증의 느낌은 어떤가요? (복수 선택 가능)" }], "opt": { "type": "chips", "chips": ["콕콕 찌르는", "쥐어짜는 듯한", "더부룩한", "지속적인"], "pick": "쥐어짜는 듯하고, 계속 아파요" } },
        { "bot": [{ "k": "text", "v": "통증 외에 동반되는 다른 증상이 있나요?" }], "opt": { "type": "chips", "chips": ["구토", "발열", "설사", "오한", "없음"], "pick": "열도 조금 나고 토할 것 같아요" } },
        { "bot": [{ "k": "loading" }], "opt": { "type": "auto", "delayMs": 1400 } },
        {
          "bot": [
            { "k": "urgency", "level": "warn", "title": "빠른 진료가 필요해요", "dept": "추천 진료과 · 외과, 소화기내과", "desc": "우하복부 통증에 발열·오심이 동반되는 경우 급성 충수염(맹장염) 등의 가능성이 있습니다. 빠른 확인을 권해요." },
            { "k": "text", "v": "남양주 내 관련 전문의가 있는 추천 병원이에요." },
            { "k": "hospitals", "list": [
              { "id": "h11", "name": "다산튼튼외과의원", "dept": "외과", "dist": "1.2km", "note": "답변 빠름" },
              { "id": "h8", "name": "오남속편한내과", "dept": "내과", "dist": "2.4km", "note": "소화기 전문" }
            ] }
          ],
          "opt": { "type": "actions" }
        }
      ],
      "soap": "[AI 사전 문진 요약]\n· 주증상: 우하복부 통증\n· 발현시기: 어제 저녁 (약 1일 전)\n· 동반증상: 발열, 구토(오심)\n· 특이사항: 누르면 통증 악화",
      "soapHospital": "h11",
      "soapCat": "외과",
      "soapTitle": "우하복부 통증과 발열, 진료가 필요할까요?"
    },
    "head": {
      "label": "머리 / 두통 (응급 — 뇌혈관 의심)",
      "firstUser": "머리가 깨질듯이 아파요. 살면서 처음 겪는 고통이에요",
      "steps": [
        { "bot": [{ "k": "text", "v": "머리 어느 쪽이 아프신가요? 갑자기 발생한 통증인가요?" }], "opt": { "type": "chips", "chips": ["갑자기 생겼어요", "한쪽 눈이 잘 안 보여요", "서서히 아팠어요"], "pick": "방금 갑자기 그랬고, 지금 한쪽 눈도 잘 안 보여요" } },
        { "bot": [{ "k": "emergency" }], "opt": { "type": "emergency" } }
      ],
      "emergencyMessage": "생애 최악의 두통이나 갑작스러운 시야 이상은 뇌혈관 질환의 신호일 수 있습니다. 지체 없이 119에 연락하거나 가까운 응급의료센터로 이동하세요."
    },
    "skin": {
      "label": "피부 / 트러블 (접촉성 피부염 의심)",
      "firstUser": "얼굴에 뭐가 났는데 너무 간지러워요",
      "steps": [
        { "bot": [{ "k": "text", "v": "언제부터 발진이 생겼나요? 최근 화장품을 바꾸거나 특정 음식을 드신 적이 있나요?" }], "opt": { "type": "chips", "chips": ["새 화장품을 썼어요", "음식을 바꿨어요", "잘 모르겠어요"], "pick": "어제 새 선크림 바르고 잤는데 아침에 빨갛게 올라왔어요" } },
        { "bot": [{ "k": "loading" }], "opt": { "type": "auto", "delayMs": 1400 } },
        {
          "bot": [
            { "k": "urgency", "level": "safe", "title": "일반 진료를 권해요", "dept": "추천 진료과 · 피부과", "desc": "새로운 제품 사용 후 발생한 발진과 가려움은 접촉성 피부염이나 알레르기 반응일 가능성이 높습니다." },
            { "k": "text", "v": "남양주 내 관련 전문의가 있는 추천 병원이에요." },
            { "k": "hospitals", "list": [
              { "id": "", "name": "다산초이스피부과", "dept": "피부과", "dist": "0.9km", "note": "답변속도 1위" },
              { "id": "", "name": "별내연세피부과", "dept": "피부과", "dist": "2.1km", "note": "알레르기 전문" }
            ] }
          ],
          "opt": { "type": "actions" }
        }
      ],
      "soap": "[AI 사전 문진 요약]\n· 주증상: 얼굴 발진, 가려움\n· 발현시기: 어제 밤 (새 선크림 사용 후)\n· 의심: 접촉성 피부염 / 알레르기 반응\n· 추천 진료과: 피부과",
      "soapHospital": "",
      "soapCat": "",
      "soapTitle": "새 선크림 후 얼굴 발진과 가려움이 있어요"
    }
  }
};
