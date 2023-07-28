import React from 'react';
import styles from './OwnerInfo.module.scss';
import { IApartment } from '../../../models/IApartment';

type OwnerInfoProps = {
  apartment: IApartment | undefined
}

const OwnerInfo: React.FC<OwnerInfoProps> = ({ apartment }) => {
  return <div className={styles.owner_info}>
    <h2>Інформація про власника:</h2>
    <p>Ім'я: {apartment?.owner?.name}</p>
    <p>Телефон: {apartment?.owner?.phone}</p>
    <p>e-mail: {apartment?.owner?.email}</p>
  </div>
};

export default OwnerInfo;
