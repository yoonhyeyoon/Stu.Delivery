import { useEffect, useState } from "react";
import styles from "./Signup.module.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };
  const onNicknameHandler = (event) => {
    setNickname(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    if (password !== confirmPassword) {
      return alert("비밀번호가 일치하지 않습니다.");
    }
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
