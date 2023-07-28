export interface INewReview {
  body: INewReviewBody,
  aptId: string,
  token: string | null
}

export interface INewReviewBody {
  author?: string,
  content: string,
  rating: number
}