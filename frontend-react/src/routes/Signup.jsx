import { useEffect, useState } from "react";

function Signup() {
  return (
    <div>
      <h1>회원가입</h1>
      <input type="text" placeholder="아이디(이메일)을 입력해주세요" />
      <input type="text" placeholder="비밀번호를 입력해주세요" />
      <input type="text" placeholder="비밀번호를 다시 한 번 입력해주세요." />
      <input type="text" placeholder="닉네임을 입력해주세요" />
      <button>회원가입</button>
    </div>
  );
}
export default Signup;
