import { Link } from "react-router-dom"
import styles from "./Header.module.scss"
import logo from "../../assets/img/logo.svg"
import user from "../../assets/img/user.svg"

type HeaderProps = {
  token: string | null
}

const Header: React.FC<HeaderProps> = ({ token }) => {
  return <header className={styles.header}>
    <div className={`container ${styles.container}`}>
      <Link to={"/"} style={{ display: "flex" }} ><img src={logo} alt="" /></Link>
      {token?.length ? <Link to={"/cart"} className={styles.profile}>
        <p>профіль</p>
        <img src={user} alt="" />
      </Link> :
        <div>
          <Link to={"/login"}>Вхід</Link> / <Link to={"/signUp"}>Реєстрація</Link>
        </div>}
    </div>
  </header>
}

export default Header