import { type useRouter } from 'next/navigation'

import { type PayloadAction, createAction } from '@reduxjs/toolkit'
import logger from 'loglevel'
import { type SagaIterator } from 'redux-saga'
import { call, getContext, put, select, takeLatest } from 'redux-saga/effects'

import { createSagaActionType } from '@boilerplate/core/builders/saga-action-type.builder'
import { type HttpClientResponse } from '@boilerplate/core/interfaces/http'

import { type PatchProductResultDto } from '@boilerplate/types/products/dto/responses/products'
import { CurrencyType } from '@boilerplate/types/reference/interfaces/currency'

import { saga } from '@boilerplate/dashboard/store'

import { patchProduct } from '@boilerplate/dashboard/store/queries/product.query'
import { editProductSlice } from '@boilerplate/dashboard/store/slices/edit-product.slice'

import { notification } from '@boilerplate/dashboard/utils/notification'

interface EditProductStartActionPayload {
  productId: string
}

export const editProductStart = createAction<EditProductStartActionPayload>(createSagaActionType('edit-product-start'))

function* handler(action: PayloadAction<EditProductStartActionPayload>): SagaIterator<void> {
  try {
    const router: ReturnType<typeof useRouter> = yield getContext('router')

    const { productId } = action.payload

    const title: ReturnType<typeof editProductSlice.selectors.title> = yield select(editProductSlice.selectors.title)
    const price: ReturnType<typeof editProductSlice.selectors.price> = yield select(editProductSlice.selectors.price)
    const description: ReturnType<typeof editProductSlice.selectors.description> = yield select(
      editProductSlice.selectors.description,
    )
    const tagId: ReturnType<typeof editProductSlice.selectors.tagId> = yield select(editProductSlice.selectors.tagId)
    const fileId: ReturnType<typeof editProductSlice.selectors.fileId> = yield select(editProductSlice.selectors.fileId)

    const imagesIds: string[] = []

    if (fileId) {
      imagesIds.push(fileId)
    }

    const tagsIds: string[] = []

    if (tagId) {
      tagsIds.push(tagId)
    }

    const patchProductRequest = yield put(
      patchProduct.initiate({
        productId,
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

    const patchProductResponse: HttpClientResponse<PatchProductResultDto> = yield call(() => patchProductRequest)

    if (!patchProductResponse?.data?.isSuccess) {
      notification.error('Щось пішло не так!')

      return
    }

    yield call(notification.success, 'Продукт оновлено!')

    yield call(router.push, '/products')
  } catch (error) {
    logger.error(error)
  }
}

saga.run(function* () {
  yield takeLatest(editProductStart, handler)
})
