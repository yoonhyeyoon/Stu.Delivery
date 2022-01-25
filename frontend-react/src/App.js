import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./components/main/Header/Header";
import Footer from "./components/main/Footer/Footer";
import Login from "./routes/account/Login";
import Signup from "./routes/account/Signup";
import Main from "./routes/main/Main";
import Lounge from "./routes/study/Lounge";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("JWT");

    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  });

  return (
    <div className="App">
      <Header />

      <Router>
        <Routes>
          <Route path="/main" element={<Main isLogin={isLogin} />}></Route> :
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/lounge" element={<Lounge />}></Route>
        </Routes>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
