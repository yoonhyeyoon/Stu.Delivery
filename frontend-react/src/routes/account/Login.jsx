import LoginForm from "../../components/main/LoginForm/LoginForm";
import SocialLogin from "../../components/main/LoginForm/SocialLogin";

const Login = (props) => {
  console.log(props);
  return (
    <>
      <LoginForm authenticated={props.authenticated} />
      <SocialLogin />
    </>
  );
};

export default Login;
