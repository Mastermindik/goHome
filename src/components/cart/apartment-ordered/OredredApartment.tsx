import style from "./OrderedApartment.module.scss"
import React from "react"
import { Link } from "react-router-dom"
import DeleteIcon from '@mui/icons-material/Delete';
import { CircularProgress, IconButton } from "@mui/material";
import { IMyOrders } from "../../../models/IMyOrders";
import { useDeleteOrderMutation } from "../../../store/api/order.endpoint";
import RateReviewIcon from '@mui/icons-material/RateReview';

type Props = {
  order: IMyOrders,
  token: string | null,
}

const OrderedApartment: React.FC<Props> = ({ order, token }) => {
  const [remove, removeResult] = useDeleteOrderMutation();

  return <div className={style.ordered_apartment}>
    <div className={style.photo}>
      <Link to={`/apartment/${order.apartment.id}`}>
        <img src={order.apartment.imgUrl} alt="" />
      </Link>
    </div>
    <div className={style.content}>
      <Link to={`/apartment/${order.apartment.id}`}>
        <p className={style.title}>{order.apartment.title}</p>
      </Link>
      <p className={style.location}>{order.apartment.location.city}</p>
      <p className={style.price}><b>UAH {order.apartment.price}</b> за ніч</p>
    </div>
    <div className={style.btn_group}>
      <Link to={`/apartment/${order.apartment.id}/reviews`}>
        <IconButton className={style.btn_remove} size="medium" color="secondary">
          <RateReviewIcon fontSize="large" color="secondary" />
        </IconButton>
      </Link>
      <IconButton color="error" size="medium" className={style.btn_remove} onClick={() => remove({ orderId: order.id, token })}>
        {removeResult.isLoading || removeResult.isSuccess ? <CircularProgress color="error" /> :
          <DeleteIcon fontSize="large" />}
      </IconButton>
    </div>
  </div >
}

export default OrderedApartment