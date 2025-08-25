import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Marketplace from "./pages/Marketplace";
import GameDetails from "./dynamic-pages/GameDetails";
import Profile from "./pages/Profile";
import Guide from "./pages/Guide";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import News from "./pages/News";
import Store from "./pages/Store";
import FAQ from "./pages/FAQ";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route → redirect to dashboard if logged in, signin if not */}
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/news" element={<News />} />
        <Route path="/store" element={<Store />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/dashboard" element={<Marketplace />} />
        <Route path="/game/:id" element={<GameDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
