function Main(isLogin) {
  const onLogout = () => {
    localStorage.removeItem("JWT");
    // App 으로 이동 (새로고침)
    document.location.href = "/";
  };

  return (
    <div>
      {isLogin ? (
        <button type="button" onClick={onLogout}>
          로그아웃
        </button>
      ) : (
        <div>
          <button>회원가입</button>
          <button>로그인</button>
        </div>
      )}
    </div>
  );
}
export default Main;
