import { IReview } from "../../../models/IReview"
import styles from "./Review.module.scss"
import author from "../../../assets/img/author.svg"

type Props = {
  review: IReview
}

const Review: React.FC<Props> = ({ review }) => {
  return <div className={styles.review}>
    <div className={styles.author}>
      <div className={styles.photo}>
        <img src={author} alt="" />
      </div>
        <div className={styles.name}>{review.author}</div>
    </div>
    <div className={styles.content}>{review.content}</div>
  </div>
}

export default Review