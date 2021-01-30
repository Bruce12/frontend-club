declare module '*.vue' {
  import type { App, defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent> & {
    install(app: App): void
  }
  export default component
}

declare module '*.svg' {
  export const svg: any
}
interface IDictionary<T = any> {
  [index: string]: T
}
interface INumberDictionary<T> {
  [index: number]: T
}
declare module 'Ajax' {
  import { AxiosRequestConfig } from 'axios'
  export interface IResponseData<T = any> extends IResult<T> {}
  export interface IResponseRawData<T = any> extends IRawResult<T> {}
  export interface IData<T = any> {
    data: T
    status: number
    success: boolean
    msg?: string
    result_info?: IPage
  }
  interface IRawResult<T = any> {
    data: T
    status: number
    statusText: string
    headers: any
    config: AxiosRequestConfig
    request?: any
  }

  interface IResult<T = any> {
    code: number
    desc: string
    data: T
  }
}
