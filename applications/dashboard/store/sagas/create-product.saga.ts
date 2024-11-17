import { type useRouter } from 'next/navigation'

import { createAction } from '@reduxjs/toolkit'
import logger from 'loglevel'
import { type SagaIterator } from 'redux-saga'
import { call, getContext, put, select, takeLatest } from 'redux-saga/effects'

import { createSagaActionType } from '@boilerplate/core/builders/saga-action-type.builder'
import { type HttpClientResponse } from '@boilerplate/core/interfaces/http'

import { type PostProductResultDto } from '@boilerplate/types/products/dto/responses/products'
import { CurrencyType } from '@boilerplate/types/reference/interfaces/currency'

import { saga } from '@boilerplate/dashboard/store'

import { postProduct } from '@boilerplate/dashboard/store/queries/product.query'
import { postProductSlice } from '@boilerplate/dashboard/store/slices/create-product.slice'

import { notification } from '@boilerplate/dashboard/utils/notification'

interface CreateProductStartActionPayload {}

export const createProductStart = createAction<CreateProductStartActionPayload>(
  createSagaActionType('create-product-start'),
)

function* handler(): SagaIterator<void> {
  try {
    const router: ReturnType<typeof useRouter> = yield getContext('router')

    const title: ReturnType<typeof postProductSlice.selectors.title> = yield select(postProductSlice.selectors.title)
    const price: ReturnType<typeof postProductSlice.selectors.price> = yield select(postProductSlice.selectors.price)
    const description: ReturnType<typeof postProductSlice.selectors.description> = yield select(
      postProductSlice.selectors.description,
    )
    const tagId: ReturnType<typeof postProductSlice.selectors.tagId> = yield select(postProductSlice.selectors.tagId)
    const fileId: ReturnType<typeof postProductSlice.selectors.fileId> = yield select(postProductSlice.selectors.fileId)

    const imagesIds: string[] = []

    if (fileId) {
      imagesIds.push(fileId)
    }

    const tagsIds: string[] = []

    if (tagId) {
      tagsIds.push(tagId)
    }

    const postProductRequest = yield put(
      postProduct.initiate({
        title,
        price: {
          value: price,
          currency: CurrencyType.UAH,
        },
        description,
        tagsIds,
        imagesIds,
      }),
    )

    const postProductResponse: HttpClientResponse<PostProductResultDto> = yield call(() => postProductRequest)

    if (!postProductResponse?.data?.isSuccess) {
      yield call(notification.error, 'Щось пішло не так')

      return
    }

    yield call(notification.success, 'Продукт успішно созданий')

    yield call(router.push, '/products')
  } catch (error) {
    logger.error(error)
  }
}

saga.run(function* () {
  yield takeLatest(createProductStart, handler)
})
