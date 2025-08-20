import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/signIn";
import Dashboard from "./pages/dashboard";
import { useAuth } from "./hooks/useAuth";

function App() {
    const {user} = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                {user ? (
                    <Route path="/*" element={<Dashboard />} />
                ) : (
                    <Route path="/*" element={<SignIn />} />
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default App;