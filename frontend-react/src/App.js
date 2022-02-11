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
import Info from "./routes/study/Info";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setHeader } from "./utils/api";
import { isLoad, loadUser } from "./redux/user";
import Index from "./components/welcome/Index";
import GlobalStyles from "./common/styles/GlobalStyles";
import StudyList from "./components/studylist/StudyList";
import VideoRoomComponent from "./components/webrtc/VideoRoomComponent";
import MyStudy from "./components/mypage/study/MyStudy";
import ResponsiveAppBar from "./components/main/Header/MuiHeader";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const dispatch = useDispatch();

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

  useEffect(() => {
    const fetchUserInfo = async () => {
      await axios({
        method: "get",
        url: "https://i6d201.p.ssafy.io/api/v1/users/me",
        headers: setHeader(),
      })
        .then((res) => {
          // localStorage.setItem("user", res.data.id);
          // action 발생
          dispatch(loadUser(res.data));
          dispatch(isLoad(true));
        })
        .catch((err) => console.log(err.request.data));
    };
    fetchUserInfo();
  }, []);

  return (
    <div className="App">
      <GlobalStyles />
      <div className="content">
        <Router>
          {/* <Header authenticated={authenticated} isLogin={isLogin} /> */}
          <ResponsiveAppBar />
          <Routes>
            <Route path="/" element={<Index />}></Route>
            <Route path="/studylist" element={<StudyList />}></Route>
            <Route path="/create" element={<MyStudy />}></Route>
            <Route path="/main" element={<Main isLogin={isLogin} />}></Route> :
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route
              path="/oauth2/redirect"
              element={<OAuth2RedirectHandler />}
            ></Route>
            {/* <Route path="/studylive" element={<StudyLive />}></Route> */}
            <Route path="/webrtc" element={<VideoRoomComponent />}></Route>
            <Route path="/study" element={<Lounge />}></Route>
            <Route path="/study/info" element={<Info />}></Route>
            <Route path="/mypage/*" element={<MyPage />}></Route>
          </Routes>
        </Router>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
