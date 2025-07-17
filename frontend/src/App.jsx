import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import Dashboard from "./pages/dashboard";
import Send from "./pages/send";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path='/Send' element={<Send />} />
      </Routes>
    </div>
  )
}

export default App