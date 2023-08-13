import React from 'react';
import styles from './OwnerInfo.module.scss';
import { IApartment } from '../../../models/IApartment';
import { Skeleton } from '@mui/material';

type OwnerInfoProps = {
  apartment: IApartment | undefined,
  isLoading: boolean
}

const OwnerInfo: React.FC<OwnerInfoProps> = ({ apartment, isLoading }) => {
  return <>
    {isLoading ? <Skeleton variant="rectangular" height={"9.5rem"} style={{ marginBottom: "1rem" }} /> : 
    <div className={styles.owner_info}>
    <h2>Інформація про власника:</h2>
    <p>Ім'я: {apartment?.owner?.name}</p>
    <p>Телефон: {apartment?.owner?.phone}</p>
    <p>e-mail: {apartment?.owner?.email}</p>
  </div>}
  </>
};

export default OwnerInfo;
