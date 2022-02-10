import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./components/main/Header/Header";
import Footer from "./components/main/Footer/Footer";
import OAuth2RedirectHandler from "./components/main/oauth2/OAuth2RedirectHandler";
import Login from "./routes/account/Login";
import Signup from "./routes/account/Signup";
import Main from "./routes/main/Main";
import Lounge from "./routes/study/Lounge";
import MyPage from "./components/mypage/Mypage";
import Welcome from "./components/welcome/Welcome";
import Index from "./components/welcome/Index";
import GlobalStyles from "./common/styles/GlobalStyles";
import StudyList from "./components/studylist/StudyList";
import VideoRoomComponent from "./components/webrtc/VideoRoomComponent";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("JWT");
    const oauth = localStorage.getItem("accessToken");

    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

    if (oauth) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });

  return (
    <div className="App">
      <GlobalStyles />
      <Router>
        <Header authenticated={authenticated} isLogin={isLogin} />
        <Routes>
          <Route path="/" element={<Index />}></Route>
          <Route path="/studylist" element={<StudyList />}></Route>
          <Route path="/main" element={<Main isLogin={isLogin} />}></Route> :
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/oauth2/redirect"
            element={<OAuth2RedirectHandler />}
          ></Route>
          {/* <Route path="/studylive" element={<StudyLive />}></Route> */}
          <Route path="/webrtc" element={<VideoRoomComponent />}></Route>
          <Route path="/lounge" element={<Lounge />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
        </Routes>
      </Router>

      {/* <Footer /> */}
    </div>
  );
}

export default App;
