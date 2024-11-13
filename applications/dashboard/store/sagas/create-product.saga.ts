import { type PayloadAction, createAction } from '@reduxjs/toolkit'
import logger from 'loglevel'
import { type SagaIterator } from 'redux-saga'
import { call, put, select, takeLatest } from 'redux-saga/effects'

import { createSagaActionType } from '@boilerplate/core/builders/saga-action-type.builder'
import { type HttpClientResponse } from '@boilerplate/core/interfaces/http'

import { type PostProductResultDto } from '@boilerplate/types/products/dto/responses/products'

import { saga } from '@boilerplate/dashboard/store'

import { create } from '@boilerplate/dashboard/store/queries/products.query'
import { createProductSlice } from '@boilerplate/dashboard/store/slices/create-product.slice'

interface CreateProductStartActionPayload {
  redirect: () => void
}

export const createProductStart = createAction<CreateProductStartActionPayload>(createSagaActionType('create-product-start'))

function* handler(action: PayloadAction<CreateProductStartActionPayload>): SagaIterator<void> {
  try {
    const title: ReturnType<typeof createProductSlice.selectors.title> = yield select(createProductSlice.selectors.title)
    const price: ReturnType<typeof createProductSlice.selectors.price> = yield select(createProductSlice.selectors.price)
    const description: ReturnType<typeof createProductSlice.selectors.description> = yield select(createProductSlice.selectors.description)
    const tackle: ReturnType<typeof createProductSlice.selectors.tackle> = yield select(createProductSlice.selectors.tackle)
    const file: ReturnType<typeof createProductSlice.selectors.file> = yield select(createProductSlice.selectors.file)

    if (!file) {
      throw new Error('Файл не вибрано!')
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('price', price.toString())
    formData.append('tackle', tackle)
    formData.append('file', file)

    console.log({ formData });

    const postProductRequest = yield put(create.initiate(formData))

    const postProductResponse: HttpClientResponse<PostProductResultDto> = yield call(() => postProductRequest)

    yield call(action.payload.redirect)
  } catch (error) {
    logger.error(error)
  }
}

saga.run(function* () {
  yield takeLatest(createProductStart, handler)
})