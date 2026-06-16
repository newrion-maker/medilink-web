import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { chatbotScenarios } from '../data/chatbotScenarios';

export default function AiChat() {
  const navigate = useNavigate();
  const [chatLog, setChatLog] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      type: 'text',
      content: '안녕하세요! 우리닥터 AI 상담사입니다. 오늘 어떤 증상으로 인해 불편함을 겪고 계신가요?'
    }
  ]);
  const [currentScenario, setCurrentScenario] = useState(null); // 'abdomen', 'head', 'skin'
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [isEmergency, setIsEmergency] = useState(false);

  const chatEndRef = useRef(null);

  // Scroll to bottom whenever log changes or typing starts/stops
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog, isTyping]);

  const handleStartScenario = (key) => {
    const scenario = chatbotScenarios.scenarios[key];
    if (!scenario) return;

    setCurrentScenario(key);
    // Add user's first message
    const userMsg = {
      id: `user-first-${Date.now()}`,
      sender: 'user',
      type: 'text',
      content: scenario.firstUser
    };

    setChatLog((prev) => [...prev, userMsg]);
    setCurrentStepIndex(0);
    triggerBotStep(key, 0);
  };

  const triggerBotStep = (scenarioKey, stepIndex) => {
    const scenario = chatbotScenarios.scenarios[scenarioKey];
    const step = scenario.steps[stepIndex];
    if (!step) return;

    setIsTyping(true);

    // If it's a loading/analysis step, we handle it as auto
    const isAuto = step.opt?.type === 'auto';
    const delay = isAuto ? (step.opt.delayMs || 1400) : 800;

    setTimeout(() => {
      setIsTyping(false);
      
      const newMessages = step.bot.map((msg, i) => ({
        id: `bot-${stepIndex}-${i}-${Date.now()}`,
        sender: 'bot',
        type: msg.k,
        content: msg.v || '',
        level: msg.level || '',
        title: msg.title || '',
        dept: msg.dept || '',
        desc: msg.desc || '',
        list: msg.list || []
      }));

      setChatLog((prev) => [...prev, ...newMessages]);

      // Handle emergency transition or auto transition
      if (step.opt?.type === 'emergency') {
        setIsEmergency(true);
        // Append emergency card to logs
        setChatLog((prev) => [
          ...prev,
          {
            id: `emergency-card-${Date.now()}`,
            sender: 'bot',
            type: 'emergency',
            content: scenario.emergencyMessage
          }
        ]);
      } else if (isAuto) {
        // Automatically go to next step
        const nextIdx = stepIndex + 1;
        setCurrentStepIndex(nextIdx);
        triggerBotStep(scenarioKey, nextIdx);
      }
    }, delay);
  };

  const handleNextStep = (userResponseText) => {
    if (!currentScenario) return;

    // Add user's bubble
    const userMsg = {
      id: `user-reply-${Date.now()}`,
      sender: 'user',
      type: 'text',
      content: userResponseText
    };

    setChatLog((prev) => [...prev, userMsg]);

    const nextIdx = currentStepIndex + 1;
    setCurrentStepIndex(nextIdx);
    triggerBotStep(currentScenario, nextIdx);
  };

  // Intercept if emergency keywords are chosen or specifically for headache option
  const handleSelectHeadacheChip = (chipLabel) => {
    if (chipLabel === '한쪽 눈이 잘 안 보여요' || chatbotScenarios.emergencyKeywords.some(k => chipLabel.includes(k))) {
      // Emergency Interrupt triggered!
      setIsTyping(true);
      
      // User bubble
      const userMsg = {
        id: `user-emergency-${Date.now()}`,
        sender: 'user',
        type: 'text',
        content: `방금 갑자기 그랬고, 지금 ${chipLabel}`
      };
      setChatLog((prev) => [...prev, userMsg]);

      setTimeout(() => {
        setIsTyping(false);
        setIsEmergency(true);
        const scenario = chatbotScenarios.scenarios.head;
        setChatLog((prev) => [
          ...prev,
          {
            id: `emergency-card-${Date.now()}`,
            sender: 'bot',
            type: 'emergency',
            content: scenario.emergencyMessage
          }
        ]);
        setCurrentStepIndex(1); // Set to final emergency step
      }, 1000);
    } else {
      // Normal flow
      handleNextStep(chipLabel);
    }
  };

  const handleRestart = () => {
    setChatLog([
      {
        id: 'welcome',
        sender: 'bot',
        type: 'text',
        content: '안녕하세요! 우리닥터 AI 상담사입니다. 오늘 어떤 증상으로 인해 불편함을 겪고 계신가요?'
      }
    ]);
    setCurrentScenario(null);
    setCurrentStepIndex(-1);
    setIsTyping(false);
    setIsEmergency(false);
  };

  const handleQnaIntegration = () => {
    if (!currentScenario) return;
    const scenario = chatbotScenarios.scenarios[currentScenario];
    
    // Redirect to write page with pre-filled SOAP info
    navigate('/qna/write', {
      state: {
        hospitalId: scenario.soapHospital || '',
        category: scenario.soapCat || '',
        title: scenario.soapTitle || '',
        content: scenario.soap || ''
      }
    });
  };

  // Render bottom input panel depending on current step
  const renderInteractionPanel = () => {
    if (isTyping) return null;

    if (currentStepIndex === -1) {
      // Entry chips
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
          <div style={{ fontSize: '13.5px', color: '#64748B', fontWeight: 600, textAlign: 'center' }}>
            아래 증상 중 하나를 선택하여 상담을 시작해 보세요.
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {chatbotScenarios.entryChips.map((chip) => (
              <button
                key={chip.key}
                onClick={() => handleStartScenario(chip.key)}
                style={{
                  padding: '12px 20px',
                  borderRadius: '999px',
                  border: '1.5px solid #E2E8F0',
                  background: '#fff',
                  color: '#334155',
                  fontWeight: 700,
                  fontSize: '14.5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                  transition: 'all 0.15s'
                }}
                className="hover-bg-light"
              >
                <span>{chip.emoji}</span>
                <span>{chip.label}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    const scenario = chatbotScenarios.scenarios[currentScenario];
    const currentStep = scenario?.steps[currentStepIndex];
    if (!currentStep) return null;

    const opt = currentStep.opt;

    if (opt.type === 'body') {
      // 3x3 abdominal layout
      const cells = [
        { id: 'lu', label: '좌상복부' }, { id: 'u', label: '상복부' }, { id: 'ru', label: '우상복부' },
        { id: 'l', label: '좌측복부' }, { id: 'c', label: '배꼽주변' }, { id: 'r', label: '우측복부' },
        { id: 'll', label: '좌하복부' }, { id: 'lo', label: '하복부' }, { id: 'rl', label: '우하복부', highlight: true }
      ];

      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '100%' }}>
          <div style={{ fontSize: '13.5px', color: '#64748B', fontWeight: 600 }}>불편한 부위를 선택해 주세요 (배꼽 기준)</div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            width: '100%',
            maxWidth: '300px',
            margin: '0 auto'
          }}>
            {cells.map((cell) => (
              <button
                key={cell.id}
                onClick={() => handleNextStep(`${cell.label} 부위가 아파요`)}
                style={{
                  height: '64px',
                  borderRadius: '12px',
                  border: cell.highlight ? '2px solid #1E8449' : '1px solid #E2E8F0',
                  background: cell.highlight ? '#EAF2FB' : '#fff',
                  color: cell.highlight ? '#1B5C9B' : '#475569',
                  fontWeight: 700,
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                  animation: cell.highlight ? 'pulse-border 1.5s infinite' : 'none'
                }}
              >
                {cell.label}
              </button>
            ))}
          </div>
          <style>{`
            @keyframes pulse-border {
              0% { box-shadow: 0 0 0 0 rgba(30, 132, 73, 0.4); }
              70% { box-shadow: 0 0 0 8px rgba(30, 132, 73, 0); }
              100% { box-shadow: 0 0 0 0 rgba(30, 132, 73, 0); }
            }
          `}</style>
        </div>
      );
    }

    if (opt.type === 'chips') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
            {opt.chips.map((chipLabel) => (
              <button
                key={chipLabel}
                onClick={() => {
                  if (currentScenario === 'head') {
                    handleSelectHeadacheChip(chipLabel);
                  } else {
                    handleNextStep(opt.pick || chipLabel);
                  }
                }}
                style={{
                  padding: '10px 18px',
                  borderRadius: '999px',
                  border: '1px solid #E2E8F0',
                  background: '#fff',
                  color: '#475569',
                  fontWeight: 700,
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                }}
              >
                {chipLabel}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (opt.type === 'actions') {
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', width: '100%' }}>
          <button
            onClick={() => alert('병원으로 전화를 연결합니다.')}
            style={{
              flex: '1 1 120px',
              padding: '14px',
              borderRadius: '12px',
              border: '1.5px solid #1B5C9B',
              background: '#fff',
              color: '#1B5C9B',
              fontWeight: 800,
              cursor: 'pointer',
              fontSize: '14.5px'
            }}
          >
            📞 전화하기
          </button>
          <button
            onClick={() => alert('길찾기 및 지도 화면으로 이동합니다.')}
            style={{
              flex: '1 1 120px',
              padding: '14px',
              borderRadius: '12px',
              border: '1.5px solid #1B5C9B',
              background: '#fff',
              color: '#1B5C9B',
              fontWeight: 800,
              cursor: 'pointer',
              fontSize: '14.5px'
            }}
          >
            📍 길찾기
          </button>
          <button
            onClick={handleQnaIntegration}
            style={{
              flex: '1 1 200px',
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              background: '#1B5C9B',
              color: '#fff',
              fontWeight: 800,
              cursor: 'pointer',
              fontSize: '14.5px',
              boxShadow: '0 4px 10px rgba(27,92,155,0.25)'
            }}
          >
            💬 Q&amp;A 자동 등록
          </button>
        </div>
      );
    }

    if (opt.type === 'emergency') {
      return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <a
            href="tel:119"
            style={{
              width: '100%',
              maxWidth: '320px',
              padding: '16px',
              borderRadius: '12px',
              border: 'none',
              background: '#F44336',
              color: '#fff',
              fontWeight: 800,
              textAlign: 'center',
              fontSize: '16px',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(244,67,54,0.3)',
              display: 'block'
            }}
          >
            📞 119 바로 전화걸기
          </a>
        </div>
      );
    }

    return null;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 'calc(100vh - 180px)', paddingTop: '10px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #E2E8F0', paddingBottom: '14px' }}>
        <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#1B5C9B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </div>
        <div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#0F2942' }}>우리닥터 AI 상담</div>
          <div style={{ fontSize: '13px', color: '#64748B', marginTop: '2px' }}>지역 전문의 가이드 기반 신속한 증상 진단</div>
        </div>
      </div>

      {/* Disclaimer banner */}
      <div style={{ background: '#FFF3CD', border: '1px solid #FFEBAA', color: '#856404', borderRadius: '12px', padding: '12px 16px', fontSize: '13px', lineHeight: '1.5', margin: '14px 0', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <span>{chatbotScenarios.disclaimer}</span>
      </div>

      {/* Chat messages area */}
      <div style={{ flex: 1, overflowY: 'auto', background: '#fff', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '20px', minHeight: '320px', maxHeight: '500px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {chatLog.map((log) => {
          if (log.sender === 'user') {
            return (
              <div key={log.id} style={{ alignSelf: 'flex-end', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', maxWidth: '80%' }}>
                <div style={{ background: '#1B5C9B', color: '#fff', padding: '12px 16px', borderRadius: '18px 18px 2px 18px', fontSize: '14.5px', fontWeight: 600, lineHeight: '1.5' }}>
                  {log.content}
                </div>
              </div>
            );
          }

          // Bot message styles
          if (log.type === 'text') {
            return (
              <div key={log.id} style={{ alignSelf: 'flex-start', display: 'flex', gap: '10px', maxWidth: '85%' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#EAF2FB', color: '#1B5C9B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800, flexShrink: 0 }}>AI</div>
                <div style={{ background: '#EEF1F4', color: '#1A1A2E', padding: '12px 16px', borderRadius: '18px 18px 18px 2px', fontSize: '14.5px', fontWeight: 500, lineHeight: '1.5' }}>
                  {log.content}
                </div>
              </div>
            );
          }

          if (log.type === 'urgency') {
            const colors = chatbotScenarios.designTokens.urgency;
            const cardColor = colors[log.level] || colors.safe;
            return (
              <div key={log.id} style={{ alignSelf: 'flex-start', width: '100%', maxWidth: '480px', border: `1.5px solid ${cardColor}`, borderRadius: '16px', background: `${cardColor}08`, overflow: 'hidden', margin: '6px 0 6px 40px' }}>
                <div style={{ background: cardColor, color: '#fff', padding: '12px 16px', fontWeight: 800, fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  {log.title}
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ color: cardColor, fontWeight: 700, fontSize: '14.5px' }}>{log.dept}</div>
                  <div style={{ fontSize: '13.5px', color: '#475569', marginTop: '8px', lineHeight: '1.5' }}>{log.desc}</div>
                </div>
              </div>
            );
          }

          if (log.type === 'hospitals') {
            return (
              <div key={log.id} style={{ alignSelf: 'flex-start', width: '100%', overflowX: 'auto', margin: '4px 0 4px 40px' }}>
                <div style={{ display: 'flex', gap: '12px', paddingBottom: '8px' }}>
                  {log.list.map((hosp, i) => (
                    <div key={i} style={{ flex: '0 0 220px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ background: '#EAF2FB', color: '#1B5C9B', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px' }}>{hosp.dept}</span>
                        <span style={{ fontSize: '12px', color: '#94A3B8' }}>{hosp.dist}</span>
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: 700, marginTop: '10px', color: '#1A1A2E' }}>{hosp.name}</div>
                      <div style={{ fontSize: '12.5px', color: '#1E8449', fontWeight: 600, marginTop: '6px' }}>{hosp.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          if (log.type === 'emergency') {
            return (
              <div key={log.id} style={{ width: '100%', background: '#FEF2F2', border: '1.5px solid #F44336', borderRadius: '16px', padding: '20px', marginTop: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#F44336', fontWeight: 800, fontSize: '17px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  긴급 응급 안내
                </div>
                <div style={{ fontSize: '14.5px', color: '#334155', marginTop: '12px', lineHeight: '1.6', fontWeight: 500 }}>
                  {log.content}
                </div>
              </div>
            );
          }

          return null;
        })}

        {isTyping && (
          <div style={{ alignSelf: 'flex-start', display: 'flex', gap: '10px' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#EAF2FB', color: '#1B5C9B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}>AI</div>
            <div style={{ background: '#EEF1F4', padding: '14px 18px', borderRadius: '18px 18px 18px 2px', display: 'flex', gap: '5px', alignItems: 'center', height: '40px' }}>
              <span className="dot" style={{ width: '6px', height: '6px', background: '#94A3B8', borderRadius: '50%', display: 'inline-block', animation: 'typing-dot 1s infinite 0.1s' }}></span>
              <span className="dot" style={{ width: '6px', height: '6px', background: '#94A3B8', borderRadius: '50%', display: 'inline-block', animation: 'typing-dot 1s infinite 0.2s' }}></span>
              <span className="dot" style={{ width: '6px', height: '6px', background: '#94A3B8', borderRadius: '50%', display: 'inline-block', animation: 'typing-dot 1s infinite 0.3s' }}></span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* CSS animations for typing dots */}
      <style>{`
        @keyframes typing-dot {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>

      {/* User Input & Interaction Area */}
      <div style={{ background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '16px', marginTop: '14px', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
        {renderInteractionPanel()}

        {/* Input Bar */}
        <div style={{ display: 'flex', gap: '10px', width: '100%', borderTop: '1px solid #E2E8F0', paddingTop: '12px', marginTop: '6px' }}>
          <input
            type="text"
            placeholder="상담 시나리오 칩을 눌러 상담을 진행해 주세요"
            readOnly
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              background: '#F1F5F9',
              color: '#94A3B8',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <button
            onClick={handleRestart}
            style={{
              padding: '12px 18px',
              borderRadius: '10px',
              border: '1px solid #CBD5E1',
              background: '#fff',
              color: '#475569',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '13.5px',
              whiteSpace: 'nowrap'
            }}
          >
            🔄 새 상담
          </button>
        </div>
      </div>
    </div>
  );
}
