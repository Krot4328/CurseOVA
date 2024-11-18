'use client'

import logger from 'loglevel'
import { type SagaIterator } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'

import { saga } from '@boilerplate/front-end/store'

import { postCart } from '@boilerplate/front-end/store/queries/cart.query'
import { cartSlice } from '@boilerplate/front-end/store/slices/cart.slice'
import { profileSlice } from '@boilerplate/front-end/store/slices/profile.slice'

function* handler(): SagaIterator<void> {
  try {
    const id: ReturnType<typeof cartSlice.selectors.id> = yield select(cartSlice.selectors.id)

    if (id) {
      return
    }

    const isAuthorized: ReturnType<typeof profileSlice.selectors.isAuthorized> = yield select(
      profileSlice.selectors.isAuthorized,
    )

    const postCartRequest = yield put(postCart.initiate({ authorized: isAuthorized }))

    yield call(() => postCartRequest)
  } catch (error) {
    logger.error(error)
  }
}

saga.run(function* () {
  if (typeof window !== 'object') {
    return
  }

  try {
    yield call(handler)
  } catch (error) {
    logger.error(error)
  }
})
