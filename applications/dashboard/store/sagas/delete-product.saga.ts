import { type PayloadAction, createAction } from '@reduxjs/toolkit'
import logger from 'loglevel'
import { type SagaIterator } from 'redux-saga'
import { call, put, takeLatest } from 'redux-saga/effects'

import { createSagaActionType } from '@boilerplate/core/builders/saga-action-type.builder'
import { type HttpClientResponse } from '@boilerplate/core/interfaces/http'

import { type DeleteProductResultDto } from '@boilerplate/types/products/dto/responses/products'

import { saga } from '@boilerplate/dashboard/store'

import { deleteProduct } from '@boilerplate/dashboard/store/queries/products.query'
import { confirmDeletion } from '@boilerplate/dashboard/store/sagas/confirm-deletion.saga'

import { notification } from '@boilerplate/dashboard/utils/notification'

interface DeleteProductStartActionPayload {
  productId: string
}

export const deleteProductStart = createAction<DeleteProductStartActionPayload>(
  createSagaActionType('delete-wallets-start'),
)

function* handler(action: PayloadAction<DeleteProductStartActionPayload>): SagaIterator {
  try {
    const { productId } = action.payload

    const isConfirmed = yield call(confirmDeletion, {
      title: 'Confirm deletion',
      description: 'Product will be removed.',
    })

    if (!isConfirmed) {
      return
    }

    const deleteProductRequest = yield put(deleteProduct.initiate({ productId }))

    const deleteProductResponse: HttpClientResponse<DeleteProductResultDto> = yield call(() => deleteProductRequest)
    const {
      data: { isSuccess },
    } = deleteProductResponse

    if (!isSuccess) {
      notification.error("Something's wrong!")
    }

    notification.success('Product removed.')
  } catch (error) {
    logger.error(error)
  }
}

saga.run(function* () {
  yield takeLatest(deleteProductStart, handler)
})
