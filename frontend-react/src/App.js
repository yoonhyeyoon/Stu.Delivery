import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/main/Header/Header";
import Footer from "./components/main/Footer/Footer";
import Login from "./routes/account/Login";
import Signup from "./routes/account/Signup";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />

      <div className="main">
        <Router>
          <Routes>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </Router>
      </div>

      <Footer />
    </div>
  );
}

export default App;
