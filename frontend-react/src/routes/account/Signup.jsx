import { useEffect, useState } from "react";
import styles from "./Signup.module.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const [nameMessage, setNameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const onEmailHandler = (event) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = event.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage("이메일 형식이 틀렸습니다.");
      setIsEmail(false);
    } else {
      setIsEmail(true);
    }
  };

  const onPasswordHandler = (event) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    const passwordCurrent = event.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 16자리 이하를 입력해주세요."
      );
      setIsPassword(false);
    } else {
      setIsPassword(true);
    }
  };

  const onConfirmPasswordHandler = (event) => {
    const confirmPasswordCurrent = event.target.value;
    setConfirmPassword(confirmPasswordCurrent);

    if (password === confirmPasswordCurrent) {
      setIsPasswordConfirm(true);
    } else {
      setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
      setIsPasswordConfirm(false);
    }
  };

  const onNicknameHandler = (event) => {
    const nicknameCurrent = event.target.value;
    setNickname(nicknameCurrent);

    if (event.target.value.length < 2 || event.target.value.length >= 6) {
      setNameMessage("2글자 이상 6글자 이하로 입력해주세요.");
      setIsName(false);
    } else {
      setIsName(true);
    }
  };

  const onSubmit = (event) => {
    return;
  };

  return (
    <div>
      <form onSubmit={onSubmit} className={styles.form}>
        <h1>회원가입</h1>
        <div>
          <input
            type="email"
            placeholder="아이디(이메일)을 입력해주세요"
            value={email}
            onChange={onEmailHandler}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={onPasswordHandler}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="비밀번호를 다시 한 번 입력해주세요."
            value={confirmPassword}
            onChange={onConfirmPasswordHandler}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="닉네임을 입력해주세요"
            value={nickname}
            onChange={onNicknameHandler}
          />
        </div>
        <div>
          <button type="submit">회원가입</button>
        </div>
      </form>
    </div>
  );
}
export default Signup;
