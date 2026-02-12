import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Modal from './components/Modal';
import Toast from './components/Toast';
import Search from './components/Search';
import BackToTop from './components/BackToTop';
import Breadcrumbs from './components/Breadcrumbs';
import Chatbot from './components/Chatbot';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Verification from './pages/Verification';
import Services from './pages/Services';
import TrainingCenter from './pages/TrainingCenter';
import Contacts from './pages/Contacts';
import MediaCenter from './pages/MediaCenter';
import LegalActs from './pages/LegalActs';
import Proposals from './pages/Proposals';
import Structure from './pages/Structure';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ServiceRequest from './pages/ServiceRequest';
import FAQ from './pages/FAQ';
import Calculator from './pages/Calculator';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminApplications from './pages/admin/AdminApplications';
import AdminMessages from './pages/admin/AdminMessages';
import AdminNews from './pages/admin/AdminNews';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSettings from './pages/admin/AdminSettings';
import './index.css';

function MainLayout({ children }) {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  if (isAdminPage) {
    return children;
  }

  return (
    <div className="app">
      <Header />
      <Breadcrumbs />
      <main className="main-content">
        {children}
      </main>
      <Footer />
      <Modal />
      <Toast />
      <Search />
      <BackToTop />
      <Chatbot />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/verify" element={<Verification />} />
            <Route path="/services" element={<Services />} />
            <Route path="/training" element={<TrainingCenter />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/media" element={<MediaCenter />} />
            <Route path="/legal" element={<LegalActs />} />
            <Route path="/proposals" element={<Proposals />} />
            <Route path="/structure" element={<Structure />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/request" element={<ServiceRequest />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/calculator" element={<Calculator />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="applications" element={<AdminApplications />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="news" element={<AdminNews />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;


