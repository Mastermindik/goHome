import { useEffect, useState } from "react";
import RegistrationForm from "../../components/registration/RegistrationForm/RegistrationForm"
import styles from "./Registration.module.scss"
import { Alert, Collapse } from "@mui/material";
import { Navigate, useOutletContext } from "react-router-dom";
import { useRegisterUserMutation } from "../../store/api/user.endpoint";
import { IRegister } from "../../models/IRegister";
import { IContext } from "../../App";


function Registration() {
  const [message, setMessage] = useState<string>("");
  const [register, registerResulr] = useRegisterUserMutation();
  const { token, setToken } = useOutletContext<IContext>();

  useEffect(() => {
    if (registerResulr.isSuccess) {
      localStorage.setItem("token", registerResulr.data.token);
      setToken(registerResulr.data.token);
    }
  }, [registerResulr.isSuccess])

  useEffect(() => {
    if (registerResulr.isError && "data" in registerResulr.error) {
      setMessage(registerResulr.error.data.message);
    }
  }, [registerResulr.isError])

  function registerUser(body: IRegister): void {
    register(body);
  }

  return <div className={styles.registration}>
    <Collapse className={styles.collapse} in={Boolean(message)} >
      <Alert severity="warning" variant="filled" >{message}</Alert>
    </Collapse>
    <RegistrationForm registerUser={registerUser} />
    <div className={styles.bg_overlay}></div>
    {token?.length ? <Navigate to={"/"} /> : ""}
  </div>
}

export default Registration