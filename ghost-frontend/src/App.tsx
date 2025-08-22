import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Marketplace from "./pages/Marketplace";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route → redirect to dashboard if logged in, signin if not */}
        <Route path="/" element={<Navigate to="/signin" replace />} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Marketplace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
