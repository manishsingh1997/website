
export interface FormFieldState{
  name: string;
  email: string;
  message: string;
  product: string;
}
export interface InputErrors{
  email?: string;
  name?: string;
  comment?: string;
  global?: string;
  [key:string]: any;
  }
