import axios from "axios";

const ACCESS_TOKEN = "accessToken";

const login = (id, pwd) => {
  const emailRule =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  if (!emailRule.test(id)) {
    alert("이메일 형식의 아이디를 입력해주세요.");
  } else if (pwd === "") {
    alert("비밀번호를 입력해주세요.");
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
        if (response.data.accessToken) {
          // 로그인 성공시 쿠키에 jwt token 저장
          console.log("success!");
          setJwtToken(response.data.accessToken);
          localStorage.setItem("isLogin", true);
          localStorage.setItem("is_oauth2_login", false); // 소셜 로그인 여부는 false
          localStorage.setItem("is_authenticated", false); // 비밀번호 확인을 할때 인증받았는지 여부는 false - 일반 로그인 전용 필드
          window.location.href = "/";
        }
      })
      .catch((e) => {
        alert("아이디 또는 비밀번호를 확인해주세요.");
        console.log(e.response);
      });
  }
};

const setJwtToken = (jwtToken) => {
  localStorage.setItem("JWT", jwtToken, { sameSite: "strict" });
};

// eslint-disable-next-line import/no-anonymous-default-export
export { login, setJwtToken };

// api header 가져다 쓰기
export const setHeader = () => {
  const token = localStorage.getItem("JWT");
  const header = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  return header;
};

// 스터디 멤버인지 확인
export function is_member_check(study, user) {
  const memberCheck = (member) => {
    return member.id === user.id;
  };
  if (study.members && user) {
    if (study.members.find(memberCheck)) {
      return true;
    }
  }
}
