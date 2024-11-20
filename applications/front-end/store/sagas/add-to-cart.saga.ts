import { type PayloadAction, createAction } from '@reduxjs/toolkit'
import logger from 'loglevel'
import { type SagaIterator } from 'redux-saga'
import { call, put, select, takeLatest } from 'redux-saga/effects'

import { createSagaActionType } from '@boilerplate/core/builders/saga-action-type.builder'
import { type HttpClientResponse } from '@boilerplate/core/interfaces/http'

import { type PatchCartResultDto } from '@boilerplate/types/carts/dto/responses/carts'

import { saga } from '@boilerplate/front-end/store'

import { patchCart, postCart } from '@boilerplate/front-end/store/queries/cart.query'
import { cartSlice } from '@boilerplate/front-end/store/slices/cart.slice'
import { profileSlice } from '@boilerplate/front-end/store/slices/profile.slice'

import { notification } from '@boilerplate/front-end/utils/notification'

interface AddToCartActionPayload {
  productId: string
  quantity: number
}

export const addToCartStart = createAction<AddToCartActionPayload>(createSagaActionType('add-to-cart-start'))

function* handler(action: PayloadAction<AddToCartActionPayload>): SagaIterator<void> {
  try {
    const { productId, quantity } = action.payload
    let cartId: ReturnType<typeof cartSlice.selectors.id> = yield select(cartSlice.selectors.id)
    const authorized: ReturnType<typeof profileSlice.selectors.isAuthorized> = yield select(
      profileSlice.selectors.isAuthorized,
    )

    if (!cartId) {
      const postCartRequest = yield put(postCart.initiate({ authorized }))

      yield call(() => postCartRequest)

      cartId = (yield select(cartSlice.selectors.id)) as string
    }

    const patchCartRequest = yield put(patchCart.initiate({ cartId, productId, quantity, authorized }))

    const patchCartResponse: HttpClientResponse<PatchCartResultDto> = yield call(() => patchCartRequest)

    if (!patchCartResponse?.data?.isSuccess) {
      yield call(notification.error, 'Щось пішло не так')

      return
    }
  } catch (error) {
    logger.error(error)
  }
}

saga.run(function* () {
  yield takeLatest(addToCartStart, handler)
})
