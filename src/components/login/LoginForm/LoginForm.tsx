import React, { useState } from 'react';
import styles from './LoginForm.module.scss';
import { Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { ILogin } from '../../../models/ILogin';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

type LoginFormProps = {
  loginUser: (body: ILogin) => void
}

const LoginForm: React.FC<LoginFormProps> = ({ loginUser }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const paternEmail = /^\w+@[A-z]+\.(\w|\.)+$/

  function checkEmail(): void {
    paternEmail.test(email) ? setEmailError(false) : setEmailError(true);
  }
  function checkPassword(): void {
    password.length > 6 ? setPasswordError(false) : setPasswordError(true);
  }

  function checkForm() {
    if (paternEmail.test(email) && password.length > 6) {
      const body = { email, password }
      loginUser(body);
    } else {
      checkEmail();
      checkPassword();
    }
  }

  return <div className={styles.login_form}>
    <p className={styles.login_name}>Логін</p>
    <TextField label="Email" type='email' color="warning" size='small'
      required
      error={emailError}
      helperText={emailError ? "This field is required" : " "}
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      onBlur={checkEmail} />
    <FormControl variant='outlined' required color='warning'>
      <InputLabel size='small' color={passwordError ? "error" : "warning"}>Password</InputLabel>
      <OutlinedInput
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={() => setShowPassword((show) => !show)}
              edge="end" >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
        size='small'
        onChange={(e) => setPassword(e.target.value)}
        onBlur={checkPassword}
        error={passwordError}
      />
      <FormHelperText error >{passwordError ? "The password must contain more than 6 characters" : " "}</FormHelperText>
    </FormControl>
    <Button variant='contained' color='warning' className={styles.btn} onClick={checkForm} >Вхід</Button>
  </div>
};

export default LoginForm;
