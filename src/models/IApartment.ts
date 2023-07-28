import { IReview } from "./IReview"

export interface IApartment {
  id: string,
  title: string,
  imgUrl: string,
  descr: string,
  rating: number,
  price: number,
  location: {
    city: string
  },
  owner: {
    name: string,
    phone: string,
    email: string
  },
  reviews: IReview[]
}