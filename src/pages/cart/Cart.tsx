import styles from "./Cart.module.scss"
import OrderedApartment from "../../components/cart/apartment-ordered/OredredApartment";
import { Navigate, useOutletContext } from "react-router-dom";
import { useGetOrddersQuery } from "../../store/api/order.endpoint";
import { Button, Skeleton } from "@mui/material";
import { IContext } from "../../App";
import { useGetUserQuery, useLogoutUserMutation } from "../../store/api/user.endpoint";
// import { useGetUserQuery } from "../../store/api/user.endpoint";

function Cart() {
  const { token, setToken } = useOutletContext<IContext>();
  const { data: order = [], isLoading } = useGetOrddersQuery(token ? token : "");
  // const user = useGetUserQuery(token);

  const [logout, logoutResult] = useLogoutUserMutation();
  function logOut() {
    if (token) {
      logout(token);
      setToken("");
      localStorage.setItem("token", "");
    }
  }
  


  return <div className={`container ${styles.container}`}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
      {isLoading ? <Skeleton variant="text" sx={{ fontSize: '1.5rem', marginBottom: "20px" }} width={"9.5rem"} /> : <h2>Замовлення:</h2>}
      <Button variant="contained" color="error" onClick={logOut} >Вихід</Button>
    </div>
    <div className={styles.ordered}>
      {!isLoading ? order.map(el =>
        <OrderedApartment order={el}
          token={token}
          key={el.id} />) :
        Array.from(new Array(2)).map((_, i) =>
          <Skeleton variant="rectangular"
            width={"45.625rem"}
            height={"12.25rem"}
            key={i}
            sx={{ marginBottom: ".5rem" }} />)}
    </div>
    {!token?.length || !token ? <Navigate to={"/login"} /> : ""}
  </div>
}

export default Cart