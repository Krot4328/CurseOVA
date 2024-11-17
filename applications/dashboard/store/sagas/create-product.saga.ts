import { type PayloadAction, createAction } from '@reduxjs/toolkit'
import logger from 'loglevel'
import { type SagaIterator } from 'redux-saga'
import { call, put, select, takeLatest } from 'redux-saga/effects'

import { createSagaActionType } from '@boilerplate/core/builders/saga-action-type.builder'
import { type HttpClientResponse } from '@boilerplate/core/interfaces/http'

import { type PostProductResultDto } from '@boilerplate/types/products/dto/responses/products'

import { saga } from '@boilerplate/dashboard/store'

import { postProduct } from '@boilerplate/dashboard/store/queries/product.query'
import { postProductSlice } from '@boilerplate/dashboard/store/slices/create-product.slice'

interface CreateProductStartActionPayload {
  redirect: () => void
}

export const createProductStart = createAction<CreateProductStartActionPayload>(
  createSagaActionType('create-product-start'),
)

function* handler(action: PayloadAction<CreateProductStartActionPayload>): SagaIterator<void> {
  try {
    const title: ReturnType<typeof postProductSlice.selectors.title> = yield select(postProductSlice.selectors.title)
    const description: ReturnType<typeof postProductSlice.selectors.description> = yield select(
      postProductSlice.selectors.description,
    )
    const price: ReturnType<typeof postProductSlice.selectors.price> = yield select(postProductSlice.selectors.price)
    const tagsIds: ReturnType<typeof postProductSlice.selectors.tagsIds> = yield select(
      postProductSlice.selectors.tagsIds,
    )
    const imagesIds: ReturnType<typeof postProductSlice.selectors.imagesIds> = yield select(
      postProductSlice.selectors.imagesIds,
    )

    const postProductData = {
      title,
      description,
      price,
      tagsIds,
      imagesIds,
    }

    const postProductRequest = yield put(postProduct.initiate(postProductData))

    const postProductResponse: HttpClientResponse<PostProductResultDto> = yield call(() => postProductRequest)

    yield call(action.payload.redirect)
  } catch (error) {
    logger.error(error)
  }
}

saga.run(function* () {
  yield takeLatest(createProductStart, handler)
})
