import LoginForm from "../../components/main/LoginForm/LoginForm";

const Login = (props) => {
  console.log(props);
  return (
    <>
      <LoginForm authenticated={props.authenticated} />
    </>
  );
};

export default Login;
