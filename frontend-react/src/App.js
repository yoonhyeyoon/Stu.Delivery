import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./components/main/Header/Header";
import Footer from "./components/main/Footer/Footer";
import OAuth2RedirectHandler from "./components/main/oauth2/OAuth2RedirectHandler";
import Login from "./routes/account/Login";
import Signup from "./routes/account/Signup";
import Main from "./routes/main/Main";
import Lounge from "./routes/study/Lounge";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("JWT");

    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <div className="App">
      <Header isLogin={isLogin} />

      <Router>
        <Routes>
          <Route path="/main" element={<Main />}></Route> :
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/oauth2/redirect"
            element={<OAuth2RedirectHandler />}
          ></Route>
          <Route path="/lounge" element={<Lounge />}></Route>
        </Routes>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
