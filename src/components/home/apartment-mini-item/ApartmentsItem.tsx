import { IApartment } from "../../../models/IApartment"
import style from "./ApartmentsItem.module.scss"
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';

type Props = {
  apartment: IApartment;
}

const ApartmentsItem: React.FC<Props> = ({ apartment }) => {

  return (
    <Link to={`/apartment/${apartment.id}`}>
      <div className={style.apartments_item}>
        <img src={apartment.imgUrl} alt="" />
        <div className={style.wraper}>
          <p className={style.descr}>{apartment.descr}</p>
          <Rating readOnly value={apartment.rating} precision={0.1} emptyIcon={<StarBorderIcon style={{ opacity: 0.5 }} fontSize="inherit" color="warning" />} />
          <p className={style.price}>
            <b>UAH {apartment.price} </b>
            за ніч</p>
        </div>
      </div>
    </Link>
  )
}

export default ApartmentsItem