import { AxiosRequestConfig } from 'axios'
declare module 'axios' {
  export interface AxiosInstance {
    <T = any>(config: IAxiosRequestConfig): Promise<T>
    <T = any>(url: string, config?: IAxiosRequestConfig): Promise<T>
    request<T = any>(config: IAxiosRequestConfig): Promise<T>
    get<T = any>(url: string, config?: IAxiosRequestConfig): Promise<T>
    delete<T = any>(url: string, config?: IAxiosRequestConfig): Promise<T>
    head<T = any>(url: string, config?: IAxiosRequestConfig): Promise<T>
    post<T = any>(url: string, data?: any, config?: IAxiosRequestConfig): Promise<T>
    put<T = any>(url: string, data?: any, config?: IAxiosRequestConfig): Promise<T>
    patch<T = any>(url: string, data?: any, config?: IAxiosRequestConfig): Promise<T>
  }
  export interface IAxiosRequestConfig extends AxiosRequestConfig {
    params?: {
      [proName: string]: any
      _loading?: 1
      _axios_response?: 1
      _hide_error?: 1
    }
  }
}
