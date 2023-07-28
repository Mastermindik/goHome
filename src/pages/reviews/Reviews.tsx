import { useOutletContext, useParams } from "react-router-dom";
import styles from "./Reviews.module.scss"
import { useCreateNewReviewMutation, useGetOneApartmentQuery } from "../../store/api/apatrments.endpoint";
import Review from "../../components/apartment/review/Review";
import { IContext } from "../../App";
import { useGetUserQuery } from "../../store/api/user.endpoint";
import { INewReviewBody } from "../../models/INewReview";
import NewReview from "../../components/reviews/newReview/NewReview";
import { useEffect, useState } from "react";
import { Alert, Skeleton } from "@mui/material";
import ReviewSkeleton from "../../components/reviews/reviewSkeleton/ReviewSkeleton";

type Params = {
  id: string;
}

function Reviews() {
  const { token } = useOutletContext<IContext>();
  const params = useParams<Params>();
  const { data: apartment } = useGetOneApartmentQuery(params.id ? params.id : "");
  const [createReview, resultCreateReview] = useCreateNewReviewMutation();
  const { data: user } = useGetUserQuery(token);
  const [isReviewSend, setIsReviewSend] = useState<boolean>(false);

  function addReview(body: INewReviewBody) {
    if (apartment) {
      createReview({ token, aptId: apartment?.id, body });
    }
  }

  useEffect(() => {
    if (resultCreateReview.isSuccess) {
      setIsReviewSend(true);
    }
  }, [resultCreateReview.isSuccess]);

  useEffect(() => {
    if (apartment && user?.name.length && apartment?.reviews.some(e => e.author === user?.name)) {
      setIsReviewSend(true);
    }
  }, [apartment, user]);

  return <section className={styles.reviews}>
    <div className="container">
      {apartment && user ?
        <h2>Please write your feedback</h2> :
        <Skeleton variant="text" width={"19rem"} sx={{ fontSize: "1.5rem", margin: "19.92px 0" }} />}
      {isReviewSend ? <Alert variant="standard" severity="success">
        Thank you for the feedback!
      </Alert> :
        <NewReview addReview={addReview} name={user?.name} apartment={apartment} token={token} />}
      <div className={styles.existing_reviews}>
        {apartment && user ?
          apartment?.reviews.map(review => <Review key={review.id} review={review} />) :
          Array.from(new Array(2)).map((_, index) => <ReviewSkeleton key={index} />)}
      </div>
    </div>
  </section>
}

export default Reviews;