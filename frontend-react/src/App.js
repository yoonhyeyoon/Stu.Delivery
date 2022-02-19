import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import OAuth2RedirectHandler from "./components/main/oauth2/OAuth2RedirectHandler";
import Login from "./routes/account/Login";
import Signup from "./routes/account/Signup";
import Main from "./routes/main/Main";
import Lounge from "./routes/study/Lounge";
import MyPage from "./components/mypage/Mypage";
import Info from "./routes/study/Info";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setHeader } from "./utils/api";
import { isLoad, loadUser } from "./redux/user";
import Index from "./components/welcome/Index";
import GlobalStyles from "./common/styles/GlobalStyles";
import StudyList from "./components/studylist/StudyList";
import VideoRoomComponent from "./components/webrtc/VideoRoomComponent";
import "./global.color.css";
import ResponsiveAppBar from "./components/main/Header/MuiHeader";
import CreateStudy from "./components/mypage/study/CreateStudy";
import WebrtcStudy from "./components/webrtcstudy/VideoRoomComponent";
import MyStudyList from "./components/main/mystudy/MyStudyList";

const theme = createTheme({
  typography: {
    fontFamily: ["EliceDigitalBaeum_Bold"].join(","),
  },
});

function App() {
  const [isLogin, setIsLogin] = useState(false);

  const dispatch = useDispatch();

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
          localStorage.setItem("profile_img", res.data.profile_img);
        })
        .catch((err) => console.log(err.request.data));
    };
    fetchUserInfo();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <GlobalStyles />
        <div className="content">
          <Router>
            <ResponsiveAppBar />
            <Routes>
              <Route path="/" element={<Index />}></Route>
              <Route path="/studylist" element={<StudyList />}></Route>
              <Route path="/create" element={<CreateStudy />}></Route>
              <Route
                path="/main"
                element={<Main isLogin={isLogin} />}
              ></Route>{" "}
              :<Route path="/signup" element={<Signup />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/mystudy" element={<MyStudyList />}></Route>
              <Route
                path="/oauth2/redirect"
                element={<OAuth2RedirectHandler />}
              ></Route>
              <Route
                path="study/:id/webrtc/"
                element={<VideoRoomComponent />}
              ></Route>
              <Route path="/study/:id" element={<Lounge />}></Route>
              <Route path="/study/:id/info" element={<Info />}></Route>
              <Route path="/mypage/*" element={<MyPage />}></Route>
              <Route
                path="study/:id/webrtcstudy/"
                element={<WebrtcStudy />}
              ></Route>
            </Routes>
          </Router>
        </div>
        {/* <Footer /> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
