import { type BaseQueryFn, type FetchBaseQueryError, type FetchBaseQueryMeta } from '@reduxjs/toolkit/query'
import axios, { AxiosError } from 'axios'
import _get from 'lodash/get'

import {
  type HttpClientRequest,
  type HttpListServerResponse,
  type HttpSearch,
  type HttpServerResponse,
} from '@boilerplate/core/interfaces/http'
import { jwtStore } from '@boilerplate/core/stores/jwt.store'

export type AxiosBaseQuery = BaseQueryFn<
  HttpClientRequest<string, unknown, HttpSearch>,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
>

const BASE_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: typeof window === 'undefined' ? 'http://back-end.work/api/v1' : '/api/v1',
}

export const instance = axios.create(BASE_CONFIG)

instance.interceptors.request.use(
  (requestConfig) => {
    if (requestConfig.headers.Authorization) {
      return requestConfig
    }

    const token = jwtStore.get()

    if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`
    }

    return requestConfig
  },
  (error) => error,
)

export function createAxiosBaseQuery() {
  return async <Url extends string, Data, Search extends HttpSearch>({
    params = {},
    search,
    ...args
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  }: HttpClientRequest<Url, Data, Search>) => {
    try {
      let url = args.url

      for (const paramKey in params) {
        const value = (params as Record<string, string>)[paramKey]

        url = url.replace(`:${paramKey}?`, value).replace(`:${paramKey}`, value) as typeof args.url
      }

      url = url.replaceAll(/\/undefined/g, '') as typeof args.url

      const result = await instance<HttpServerResponse<unknown> | HttpListServerResponse<unknown>>({
        ...args,
        params: search,
        url,
      })

      if (result instanceof AxiosError) {
        throw result
      }

      return {
        data: result.data.result,
        meta: {
          total: _get(result, 'data.total', undefined),
        },
      }
    } catch (axiosError) {
      const err = axiosError as AxiosError<HttpServerResponse<unknown>>

      return {
        error: err.response?.data?.message || err.response?.data.error || err.message,
      }
    }
  }
}
