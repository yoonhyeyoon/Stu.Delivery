import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const login = (id, pwd) => {
  const emailRule =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  if (!emailRule.test(id)) {
    alert("이메일 형식의 아이디를 입력해주세요.");
  } else {
    axios({
      method: "post",
      url: "http://localhost:8080/api/v1/auth/login",
      data: {
        id: id,
        password: pwd,
      },
    })
      .then((response) => {
        if (response.data.jwtToken) {
          // 로그인 성공시 쿠키에 jwt token 저장
          setJwtToken(response.data.jwtToken);
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
  cookies.set("jwt_token", jwtToken, { sameSite: "strict" });
};
// eslint-disable-next-line import/no-anonymous-default-export
export { login, setJwtToken };
