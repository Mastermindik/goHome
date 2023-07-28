import { Collapse, Alert } from "@mui/material"
import LoginForm from "../../components/login/LoginForm/LoginForm"
import styles from "./Login.module.scss"
import { useEffect, useState } from "react";
import { Navigate, useOutletContext } from "react-router-dom";
import { useLoginUserMutation } from "../../store/api/user.endpoint";
import { ILogin } from "../../models/ILogin";
import { IContext } from "../../App";


function Login() {
  const [message, setMessage] = useState<string>("");
  const [login, resultLogin] = useLoginUserMutation();
  const { token, setToken } = useOutletContext<IContext>();

  useEffect(() => {
    if (resultLogin.isSuccess) {
      localStorage.setItem("token", resultLogin.data.token);
      setToken(resultLogin.data.token);
    }
  }, [resultLogin.isSuccess])

  useEffect(() => {
    if (resultLogin.isError && "data" in resultLogin.error) {
      setMessage(resultLogin.error.data.message);
    }
  }, [resultLogin.isError])

  function loginUser(body: ILogin): void {
    login(body)
  }

  return <section className={styles.login}>
    <Collapse className={styles.collapse} in={Boolean(message)} >
      <Alert severity="warning" variant="filled" >{message}</Alert>
    </Collapse>
    <LoginForm loginUser={loginUser} />
    {token?.length ? <Navigate to={"/"} /> : ""}
  </section>
}

export default Login