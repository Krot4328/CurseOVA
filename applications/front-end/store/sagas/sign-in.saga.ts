import { type useRouter } from 'next/navigation'

import { type PayloadAction, createAction } from '@reduxjs/toolkit'
import logger from 'loglevel'
import { type SagaIterator } from 'redux-saga'
import { call, getContext, put, select, takeLatest } from 'redux-saga/effects'

import { createSagaActionType } from '@boilerplate/core/builders/saga-action-type.builder'
import { type HttpClientResponse } from '@boilerplate/core/interfaces/http'
import { jwtStore } from '@boilerplate/core/stores/jwt.store'

import { type MyProfileDto } from '@boilerplate/types/auth/dto/responses/profile'
import { type PutTokenResultDto } from '@boilerplate/types/auth/dto/responses/token'

import { saga } from '@boilerplate/front-end/store'

import { postCart } from '@boilerplate/front-end/store/queries/cart.query'
import { getProfile } from '@boilerplate/front-end/store/queries/profile.query'
import { login } from '@boilerplate/front-end/store/queries/token.query'
import { authSlice } from '@boilerplate/front-end/store/slices/auth.slice'
import { profileSlice } from '@boilerplate/front-end/store/slices/profile.slice'

interface SignInStartActionPayload {}

export const signInStart = createAction<SignInStartActionPayload>(createSagaActionType('sign-in-start'))

function* handler(action: PayloadAction<SignInStartActionPayload>): SagaIterator<void> {
  try {
    const router: ReturnType<typeof useRouter> = yield getContext('router')

    const email: ReturnType<typeof authSlice.selectors.email> = yield select(authSlice.selectors.email)
    const password: ReturnType<typeof authSlice.selectors.password> = yield select(authSlice.selectors.password)

    const putTokenRequest = yield put(login.initiate({ email, password }))

    const putTokenResponse: HttpClientResponse<PutTokenResultDto> = yield call(() => putTokenRequest)

    yield call(router.push, '/')

    jwtStore.set(putTokenResponse.data.token)

    const getProfileRequest = yield put(getProfile.initiate(undefined, { forceRefetch: true }))

    const getProfileResponse: HttpClientResponse<MyProfileDto> = yield call(() => getProfileRequest)

    yield put(profileSlice.actions.init(getProfileResponse.data))

    const postOrderRequest = yield put(postCart.initiate({ authorized: true }))

    yield call(() => postOrderRequest)
  } catch (error) {
    jwtStore.clear()

    logger.error(error)
  }
}

saga.run(function* () {
  yield takeLatest(signInStart, handler)
})
