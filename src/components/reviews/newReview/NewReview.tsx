import { Tooltip, Rating, TextField, Button, Skeleton } from "@mui/material";
import styles from "./NewReview.module.scss"
import { useState } from "react";
import { INewReviewBody } from "../../../models/INewReview";
import { IApartment } from "../../../models/IApartment";

type NewReviewProps = {
  addReview: Function,
  name?: string,
  apartment?: IApartment,
  token: string | null
}

const NewReview: React.FC<NewReviewProps> = ({ addReview, name, apartment, token }) => {
  const [feedback, setFeedback] = useState<string>("");
  const [rating, setRating] = useState<number | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  function checkReview() {
    if (rating) {
      const body: INewReviewBody = {
        content: feedback,
        author: name,
        rating: rating
      }
      addReview(body);
    } else {
      setOpen(true);
    }
  }

  return <div className={styles.create_review}>
    <Tooltip title="Please choose rating" placement="right" open={open} >
      {name && apartment ?
        <Rating value={rating} onChange={(_, value) => setRating(value)} /> :
        <Skeleton variant="rounded" width={"7.3rem"} height={"1.5rem"} />}
    </Tooltip>
    {name && apartment ?
      <TextField multiline minRows={4}
        fullWidth
        margin="normal"
        label="Create feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)} /> :
      <Skeleton variant="rounded" height={"7.8rem"} sx={{ margin: "1rem 0 .5rem" }} />}
    {name ?
      <Button color="warning" variant="contained"
        onClick={checkReview}
        disabled={token?.length ? false : true} >{token?.length ? "Send feedback" : "Register to send feedback"}</Button> :
      <Skeleton variant="rounded" width={"9.7rem"} height={"2.28rem"} />}
  </div>
}

export default NewReview;