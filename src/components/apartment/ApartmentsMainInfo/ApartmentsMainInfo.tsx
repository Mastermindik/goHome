import React from 'react';
import styles from './ApartmentsMainInfo.module.scss';
import { Rating } from '@mui/material';
import { IApartment } from '../../../models/IApartment';

type ApartmentsMainInfoProps = {
  apartment: IApartment | undefined
}

const ApartmentsMainInfo: React.FC<ApartmentsMainInfoProps> = ({ apartment }) => {
  return <>
    <div className={styles.apartment_header}>
      <h1>Ваш {apartment?.title}</h1>
      <Rating value={apartment ? apartment?.rating : 0} precision={0.1} readOnly />
    </div>
    <div className={styles.photo}>
      <img style={{ width: "100%" }} src={apartment?.imgUrl} alt="" />
    </div>
    <div className={styles.descr}>
      {apartment?.descr}
    </div>
  </>
};

export default ApartmentsMainInfo;
