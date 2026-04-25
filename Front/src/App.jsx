import { Routes, Route} from "react-router";
import { MainPage } from './pages/MainPage.jsx';
import { ChatPage } from './pages/ChatPage.jsx';
import './styles/index.scss'
import { NotFOundPage } from "./pages/NotFoundPage.jsx";
import { UserLayout } from "./layouts/UserLayout.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { AdminPage } from "./pages/AdminPage.jsx";
import { ProfilePage } from "./pages/ProfilePage.jsx";

function App() {

  return (
    <Routes>
      <Route element={ <UserLayout />} >
        <Route index element={<MainPage />} />
        <Route path='chat' element={<ChatPage />} />
        <Route path='profile' element={<ProfilePage />} />
        
        <Route path='admin' element={<AdminPage />} />
      </Route>
      <Route path='login' element={<LoginPage />} />
      <Route path='*' element={<NotFOundPage />} />
    </Routes>
  )
}

export default App
