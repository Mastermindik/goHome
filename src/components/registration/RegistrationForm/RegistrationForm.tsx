import React, { useState } from 'react';
import styles from './RegistrationForm.module.scss';
import { TextField, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { IRegister } from '../../../models/IRegister';
import { VisibilityOff, Visibility } from '@mui/icons-material';

type RegistrationFormProps = {
  registerUser: (body: IRegister) => void
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ registerUser }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const paternEmail = /^\w+@[A-z]+\.(\w|\.)+$/;

  function checkName(): void {
    name.length ? setNameError(false) : setNameError(true);
  }
  function checkEmail(): void {
    paternEmail.test(email) ? setEmailError(false) : setEmailError(true);
  }
  function checkPassword(): void {
    password.length > 6 ? setPasswordError(false) : setPasswordError(true);
  }
  function checkPasswordConfirm(): void {
    password === passwordConfirm ? setPasswordConfirmError(false) : setPasswordConfirmError(true);
  }

  function checkForm(): void {
    if (name.length && paternEmail.test(email) && password.length > 6 && password === passwordConfirm) {
      const body = { name, email, password };
      console.log(body);
      registerUser(body);
    } else {
      checkName();
      checkEmail();
      checkPassword();
      checkPasswordConfirm();
    }
  }

  return <div className={styles.registration_form} >
    <p className={styles.registration_name}>Логін</p>
    <TextField label="Name" type='text' color="warning" size='small'
      required
      error={nameError}
      helperText={nameError ? "This field is required" : " "}
      value={name}
      onChange={(e) => setName(e.target.value)}
      onBlur={checkName} />
    <TextField label="Email" type='email' color="warning" size='small'
      required
      error={emailError}
      helperText={emailError ? "Email must be a valid and includes'@'" : " "}
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      onBlur={checkEmail} />
    <FormControl variant='outlined' required color='warning' error={passwordError}>
      <InputLabel size='small'>Password</InputLabel>
      <OutlinedInput
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={() => setShowPassword((show) => !show)}
              edge="end" >
              {showPassword ? <VisibilityOff color={passwordError ? "error" : "inherit"} /> : <Visibility color={passwordError ? "error" : "inherit"} />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
        size='small'
        onChange={(e) => setPassword(e.target.value)}
        onBlur={checkPassword}
      />
      <FormHelperText>{passwordError ? "The password must contain more than 6 characters" : " "}</FormHelperText>
    </FormControl>
    <FormControl variant='outlined' required color='warning' error={passwordConfirmError}>
      <InputLabel size='small' >Confirm password</InputLabel>
      <OutlinedInput
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={() => setShowPassword((show) => !show)}
              edge="end" >
              {showPassword ? <VisibilityOff color={passwordConfirmError ? "error" : "inherit"} /> : <Visibility color={passwordConfirmError ? "error" : "inherit"} />}
            </IconButton>
          </InputAdornment>
        }
        label="Confirm password"
        size='small'
        onChange={(e) => setPasswordConfirm(e.target.value)}
        onBlur={checkPasswordConfirm}
      />
      <FormHelperText error >{passwordConfirmError ? "Passwords don`t match - check it out" : " "}</FormHelperText>
    </FormControl>
    <Button variant='contained' color='warning' className={styles.btn} onClick={checkForm}>Реєстрація</Button>
  </div>
};

export default RegistrationForm;
