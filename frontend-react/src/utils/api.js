import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const ACCESS_TOKEN = "accessToken";

const login = (id, pwd) => {
  const emailRule =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  if (!emailRule.test(id)) {
    alert("이메일 형식의 아이디를 입력해주세요.");
  } else {
    console.log("로그인한다");
    axios({
      method: "post",
      url: "https://i6d201.p.ssafy.io/api/v1/auth/login",
      data: {
        email: id,
        password: pwd,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.data.accessToken) {
          // 로그인 성공시 쿠키에 jwt token 저장
          console.log("success!");
          setJwtToken(response.data.accessToken);
          localStorage.setItem("isLogin", true);
          window.location.href = "/mypage";
        }
      })
      .catch((e) => {
        alert("아이디 또는 비밀번호를 확인해주세요.");
        console.log("Error!");
      });
  }
};

const setJwtToken = (jwtToken) => {
  localStorage.setItem("JWT", jwtToken, { sameSite: "strict" });
  // cookies.set("jwt_token", jwtToken, { sameSite: "strict" });
};

// eslint-disable-next-line import/no-anonymous-default-export
export { login, setJwtToken, setHeader };

// export const fetchUserInfo = () => {
//   return axios({
//     method: "get",
//     url: "https://i6d201.p.ssafy.io/api/v1/users/me",
//     headers: setHeader(),
//   })
//     .then((res) => {
//       res.data
//     })
//     .catch((err) => console.log(err.request));

// api header
const setHeader = () => {
  const token = localStorage.getItem("JWT");
  const header = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  return header;
};
