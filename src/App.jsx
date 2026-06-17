import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import TabBar from './components/TabBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Hospitals from './pages/Hospitals';
import HospitalDetail from './pages/HospitalDetail';
import HospitalRegister from './pages/HospitalRegister';
import Qna from './pages/Qna';
import QnaDetail from './pages/QnaDetail';
import QnaWrite from './pages/QnaWrite';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Mypage from './pages/Mypage';
import Health from './pages/Health';
import HealthDetail from './pages/HealthDetail';
import AiChat from './pages/AiChat';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="ml-footpad" style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 'calc(100vh - 66px)' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', width: '100%', padding: '0 clamp(16px,4vw,28px)', flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hospitals" element={<Hospitals />} />
            <Route path="/hospital/register" element={<HospitalRegister />} />
            <Route path="/hospital/:id" element={<HospitalDetail />} />
            <Route path="/qna" element={<Qna />} />
            <Route path="/qna/write" element={<QnaWrite />} />
            <Route path="/qna/:id" element={<QnaDetail />} />
            <Route path="/events" element={<Events />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/health" element={<Health />} />
            <Route path="/health/:id" element={<HealthDetail />} />
            <Route path="/aichat" element={<AiChat />} />
          </Routes>
        </div>
        <Footer />
      </div>
      <TabBar />
    </BrowserRouter>
  );
}

export default App;
