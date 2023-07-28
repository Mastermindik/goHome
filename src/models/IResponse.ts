export interface IResponse {
  message: string
  token: string,
  user: {
    name: string,
    email: string
  }
}