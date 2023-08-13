import React from 'react';
import styles from './ReviewsList.module.scss';
import { Rating, Skeleton } from '@mui/material';
import { IReview } from '../../../models/IReview';
import Review from '../review/Review';
import { IApartment } from '../../../models/IApartment';
import { Link } from 'react-router-dom';

type ReviewsListProps = {
  apartment: IApartment | undefined,
  isLoading?: boolean
}

const ReviewsList: React.FC<ReviewsListProps> = ({ apartment, isLoading }) => {
  return <>
    {isLoading ? <Skeleton variant="rectangular" height={"22.25rem"} sx={{minWidth: "18.28rem"}} /> :
    <div className={styles.reviews_list}>
    <div className={styles.reviews__title}>
      <h3>Сумарний рейтинг</h3>
      <div className={styles.summ_rating}>
        <p>{apartment?.reviews.length} відгуків</p>
        {apartment?.rating ? <Rating defaultValue={apartment?.rating} precision={0.1} readOnly /> : ""}
      </div>
    </div>
    {(apartment?.reviews ? apartment?.reviews.slice(0, 2) : []).map((review: IReview) => <Review review={review} key={review.id} />)}
    <Link to={`/apartment/${apartment?.id}/reviews`} className={styles.read_more}>
      {apartment?.reviews.length ? "Читати ще / Залишити відгук" : "Залишити відгук"}
    </Link>
  </div>}
  </>
};

export default ReviewsList;
