/* eslint-disable prettier/prettier */
import { type PayloadAction, type WithSlice, createSlice } from '@reduxjs/toolkit'
import _omit from 'lodash/omit'

import { createSliceKey } from '@boilerplate/core/builders/slice-key.builder'

import { reducer } from '@boilerplate/front-end/store'

import { postCart } from '@boilerplate/front-end/store/queries/cart.query'

interface CartsListState {
  id: string | null
}

const slice = createSlice({
  name: createSliceKey('cart-card-list'),
  initialState: (): CartsListState => ({
    id: localStorage.getItem('cartId') || null,
  }),
  selectors: {
    id: (state) => state.id,
  },
  reducers: {
    setId(state, action: PayloadAction<string>) {
      localStorage.setItem('cartId', action.payload)

      state.id = action.payload
    },
  },
  extraReducers(builder) {
    builder.addMatcher(postCart.matchFulfilled, (state, action) => {
      localStorage.setItem('cartId', action.payload.cartId)

      state.id = action.payload.cartId
    })
  },
})

const withSlice = reducer.inject(slice)

export const cartSlice = {
  /**
   
Omit reducer and reducerPath for prevent any other connections of it to store*/ ..._omit(slice, [
  'reducer',
  'reducerPath',
]),
  selectSlice: withSlice.selector(slice.selectSlice),
  selectors: {
    id: withSlice.selector(slice.selectors.id),
  },
}

declare module '@boilerplate/front-end/store' {
  export interface LazyLoadedSlices extends WithSlice<typeof slice> { }
}
