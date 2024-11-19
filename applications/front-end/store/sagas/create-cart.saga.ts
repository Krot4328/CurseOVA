/* eslint-disable prettier/prettier */
import { type useRouter } from 'next/navigation'

import { createAction } from '@reduxjs/toolkit'
import logger from 'loglevel'
import { type SagaIterator } from 'redux-saga'
import { call, getContext, put, select, takeLatest } from 'redux-saga/effects'

import { createSagaActionType } from '@boilerplate/core/builders/saga-action-type.builder'
import { type HttpClientResponse } from '@boilerplate/core/interfaces/http'

import { type PatchCartUserDataResultDto } from '@boilerplate/types/carts/dto/responses/carts'

import { saga } from '@boilerplate/front-end/store'

import { patchCartUserData, postCart } from '@boilerplate/front-end/store/queries/cart.query'
import { cartSlice } from '@boilerplate/front-end/store/slices/cart.slice'
import { profileSlice } from '@boilerplate/front-end/store/slices/profile.slice'

import { notification } from '@boilerplate/front-end/utils/notification'

interface UpdateUserDataActionPayload { }

export const updateCartUserDataStart = createAction<UpdateUserDataActionPayload>(
  createSagaActionType('update-user-data-start'),
)

function* handler(): SagaIterator<void> {
  try {
    const router: ReturnType<typeof useRouter> = yield getContext('router')

    const id: ReturnType<typeof cartSlice.selectors.id> = yield select(cartSlice.selectors.id)

    const isAuthorized: ReturnType<typeof profileSlice.selectors.isAuthorized> = yield select(
      profileSlice.selectors.isAuthorized,
    )

    if (!id) {
      return
    }

    // eslint-disable-next-line prettier/prettier
    const firstName: ReturnType<typeof cartSlice.selectors.firstName> = yield select(cartSlice.selectors.firstName)
    const lastName: ReturnType<typeof cartSlice.selectors.lastName> = yield select(cartSlice.selectors.lastName)
    const email: ReturnType<typeof cartSlice.selectors.email> = yield select(cartSlice.selectors.email)
    const phone: ReturnType<typeof cartSlice.selectors.phone> = yield select(cartSlice.selectors.phone)
    const city: ReturnType<typeof cartSlice.selectors.city> = yield select(cartSlice.selectors.city)
    const department: ReturnType<typeof cartSlice.selectors.department> = yield select(cartSlice.selectors.department)

    const updateUserDataRequest = yield put(
      patchCartUserData.initiate({ cartId: id, firstName, lastName, email, phone, city, department, authorized: isAuthorized }),
    )

    const updateUserDataResponse: HttpClientResponse<PatchCartUserDataResultDto> = yield call(
      () => updateUserDataRequest,
    )

    if (!updateUserDataResponse?.data?.isSuccess) {
      yield call(notification.error, 'Щось пішло не так')

      return
    }

    yield put(cartSlice.actions.clearId())

    const newCartId = yield put(postCart.initiate({ authorized: isAuthorized }))

    yield put(cartSlice.actions.setId(newCartId))

    yield call(notification.success, 'Замовлення прийнято')

    yield call(router.push, '/')
  } catch (error) {
    logger.error(error)
  }
}

saga.run(function* () {
  yield takeLatest(updateCartUserDataStart, handler)
})
