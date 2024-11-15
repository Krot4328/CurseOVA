import { createAction } from '@reduxjs/toolkit'
import logger from 'loglevel'
import { type SagaIterator } from 'redux-saga'
import { call, getContext, put, takeLatest } from 'redux-saga/effects'

import { createSagaActionType } from '@boilerplate/core/builders/saga-action-type.builder'
import { type HttpClientResponse } from '@boilerplate/core/interfaces/http'
import { jwtStore } from '@boilerplate/core/stores/jwt.store'

import { type DeleteTokenResultDto } from '@boilerplate/types/auth/dto/responses/token'

import { saga } from '@boilerplate/front-end/store'

import { logout } from '@boilerplate/front-end/store/queries/token.query'
import { profileSlice } from '@boilerplate/front-end/store/slices/profile.slice'
import { useRouter } from 'next/navigation'

interface SignOutStartActionPayload { }

export const signOutStart = createAction<SignOutStartActionPayload>(createSagaActionType('sign-out-start'))

function* handler(): SagaIterator<void> {
  try {
    const router: ReturnType<typeof useRouter> = yield getContext('router')

    const deleteTokenRequest = yield put(logout.initiate())

    const deleteTokenResponse: HttpClientResponse<DeleteTokenResultDto> = yield call(() => deleteTokenRequest)

    if (!deleteTokenResponse.data.isSuccess) {
      throw new Error('Failure logout')
    }

    jwtStore.clear()

    yield put(profileSlice.actions.init(null))

    yield call(router.push, '/')
  } catch (error) {
    logger.error(error)
  }
}


saga.run(function* () {
  yield takeLatest(signOutStart, handler)
})
