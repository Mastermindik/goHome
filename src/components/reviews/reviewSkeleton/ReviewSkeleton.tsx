import styles from "./ReviewSkeleton.module.scss"
import { Skeleton } from "@mui/material"

const ReviewSkeleton = () => {
  return <div className={styles.review}>
    <div className={styles.author}>
      <div className={styles.photo}>
        <Skeleton variant="circular" width={34} height={34} />
      </div>
      <Skeleton variant="text" width={70} />
    </div>
    <Skeleton variant="text" sx={{ marginTop: ".5rem" }} />
    <Skeleton variant="text" width={"60%"} />
  </div>
}

export default ReviewSkeleton