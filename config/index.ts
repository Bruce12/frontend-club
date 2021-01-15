import baseConfig from './base.config'

export interface IConfig {
  baseApi: string
}

const config: IConfig = (baseConfig as any)[process.env.VUE_CONF_ENV as string]
export default config
