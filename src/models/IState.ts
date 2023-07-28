import { IApartment } from './IApartment';
export interface IState {
  data: IApartment[],
  isLoading: boolean,
  error: string | undefined
}