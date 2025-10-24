import type { ComponentType } from 'react'

export type { ILogin, IVerifyOtp, ISendOtp } from './auth.types'



export interface IResponse<T> {
  statusCode: number
  success: boolean
  message: string
  data: T
}
export interface ISidebarItem {
  title: string,
  url: string,
  items: {
    title: string,
    url: string,

    component: ComponentType
  }[]
}


export type TRole ="SUPER_ADMIN" | "AGENT"| "USER"|"ADMIN"