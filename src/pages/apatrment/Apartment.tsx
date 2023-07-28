import style from "./Apartment.module.scss"
import { Navigate, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert, Button, Skeleton, Snackbar } from "@mui/material";
import { useGetOneApartmentQuery } from "../../store/api/apatrments.endpoint";
import { useAddOrderMutation, useDeleteOrderMutation, useGetOrddersQuery } from "../../store/api/order.endpoint";
import ApartmentsMainInfo from "../../components/apartment/ApartmentsMainInfo/ApartmentsMainInfo";
import OwnerInfo from "../../components/apartment/OwnerInfo/OwnerInfo";
import ReviewsList from "../../components/apartment/ReviewsList/ReviewsList";
import SkeletonApartmentsMainInfo from "../../components/apartment/SkeletonApartmentsMainInfo";
import { IContext } from "../../App";

type Params = {
  id: string;
}

function Apartment() {
  const { token } = useOutletContext<IContext>();
  const params = useParams<Params>();

  const apartment = useGetOneApartmentQuery(params.id ? params.id : "");
  const orders = useGetOrddersQuery(token);
  const [addOrder, resultAddOrder] = useAddOrderMutation();
  const [deleteOrder, resultDeleteOrder] = useDeleteOrderMutation();
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openRemove, setOpenRemove] = useState<boolean>(false);
  const [isRedirect, setIseRedirect] = useState<boolean>(false);

  function toOrder() {
    if (!token || !token.length) {
      setIseRedirect(true);
    } else {
      const data = {
        body: {
          date: new Date().toString(),
          apartmentId: apartment.data?.id
        },
        token: token
      }
      addOrder(data);
    }
  }

  function removeOrder() {
    deleteOrder({ orderId: orders.data?.filter(e => e.apartment.id === params.id)[0].id, token })/* .then(() => setOpen(true)) */;
  }

  useEffect(() => {
    setOpenAdd(resultDeleteOrder.isSuccess)
    setOpenRemove(false)
  }, [resultDeleteOrder.isSuccess])

  useEffect(() => {
    setOpenRemove(resultAddOrder.isSuccess)
    setOpenAdd(false)
  }, [resultAddOrder.isSuccess])

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    openAdd ? setOpenAdd(false) : setOpenRemove(false);
  };


  return <section className={style.apartment}>
    <div className={`container ${style.container}`}>
      <div className={style.left}>
        {apartment.isLoading ? <SkeletonApartmentsMainInfo /> : <ApartmentsMainInfo apartment={apartment.currentData} />}
        {apartment.isLoading ? <Skeleton variant="rectangular" height={"2rem"} width={"10rem"} style={{ margin: "0 auto" }} /> :
          orders.currentData?.some(e => e.apartment.id === params.id) ?
            <Button
              variant="contained"
              color="error"
              className={style.btn_order}
              onClick={removeOrder}
            >{resultDeleteOrder.isLoading || orders.isFetching ? "Loading..." : "Зняти бронь"}</Button> :
            <Button
              variant="contained"
              color="warning"
              className={style.btn_order}
              onClick={toOrder}
            >{resultAddOrder.isLoading || orders.isFetching ? "Loading..." : "Забронювати"}</Button>}
      </div>
      <div className={style.right}>
        {apartment.isLoading ? <Skeleton variant="rectangular" height={"9.5rem"} style={{ marginBottom: "1rem" }} /> :
          <OwnerInfo apartment={apartment.currentData} />}
        {apartment.isLoading ? <Skeleton variant="rectangular" height={"22.25rem"} /> :
          <ReviewsList apartment={apartment.currentData} />}
      </div>
    </div>
    <Snackbar open={openAdd} autoHideDuration={6000} onClose={handleClose} >
      <Alert severity="success" onClose={handleClose}>{resultDeleteOrder.data?.message}</Alert>
    </Snackbar>
    <Snackbar open={openRemove} autoHideDuration={6000} onClose={handleClose} >
      <Alert severity="success" onClose={handleClose}>Замовлення успішне</Alert>
    </Snackbar>
    {isRedirect ? <Navigate to={"/login"} /> : ""}
  </section>
}

export default Apartment
