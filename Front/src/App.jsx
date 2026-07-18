import { Routes, Route} from "react-router";
import { MainPage } from './pages/MainPage.jsx';
import { ChatPage } from './pages/ChatPage.jsx';
import { NotFOundPage } from "./pages/NotFoundPage.jsx";
import { UserLayout } from "./layouts/UserLayout.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import TablePage from './pages/TablePage.jsx'
import ProfilePage from "./pages/ProfilePage.jsx";
import ScanPage from './pages/ScanPage.jsx'
import './styles/index.scss'
import AdminLayout from "./layouts/AdminLayout.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import FinancePage from "./pages/FinancePage.jsx";
import QrPage from "./pages/QrPage.jsx";

function App() {
  return (
    <Routes>
      <Route element={ <UserLayout />} >
        <Route index element={<MainPage />} />
        <Route path='chat' element={<ChatPage />} />
        <Route path='profile' element={<ProfilePage />} />
        <Route path='scan' element={<ScanPage />} />
        <Route path='qr' element={<QrPage />} />
      </Route>
      <Route path="admin" element={<AdminLayout />} >
        <Route index element={<AdminPage />} />
        <Route path='table' element={<TablePage />} />
        <Route path='finance' element={<FinancePage />} />
        <Route path='scan' element={<ScanPage rol="admin" />} />
      </Route>
      <Route path='login' element={<LoginPage />} />
      <Route path='*' element={<NotFOundPage />} />
    </Routes>
  )
}

export default App
