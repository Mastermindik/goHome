export interface INewOrder {
  body: {
    date: string,
    apartmentId: string | undefined
  },
  token: string | null
}