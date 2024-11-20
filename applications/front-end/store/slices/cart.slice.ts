import { type PayloadAction, type WithSlice, createSlice } from '@reduxjs/toolkit'
import _omit from 'lodash/omit'

import { createSliceKey } from '@boilerplate/core/builders/slice-key.builder'

import { reducer } from '@boilerplate/front-end/store'

import { postCart } from '@boilerplate/front-end/store/queries/cart.query'

interface CartsListState {
  id: string | null
  firstName: string
  lastName: string
  phone: string
  email: string
  city: string
  department: string
}

const slice = createSlice({
  name: createSliceKey('cart-card-list'),
  initialState: (): CartsListState => ({
    id: localStorage.getItem('cartId') ?? null,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    department: '',
  }),
  selectors: {
    id: (state) => state.id,
    firstName: (state) => state.firstName,
    lastName: (state) => state.lastName,
    email: (state) => state.email,
    phone: (state) => state.phone,
    city: (state) => state.city,
    department: (state) => state.department,
  },
  reducers: {
    setId(state, action: PayloadAction<string>) {
      localStorage.setItem('cartId', action.payload)

      state.id = action.payload
    },
    clearId(state) {
      localStorage.removeItem('cartId')
      state.id = null
    },
    setFirstName(state, action: PayloadAction<string>) {
      state.firstName = action.payload
    },
    setLastName(state, action: PayloadAction<string>) {
      state.lastName = action.payload
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload
    },
    setPhone(state, action: PayloadAction<string>) {
      state.phone = action.payload
    },
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload
    },
    setDepartment(state, action: PayloadAction<string>) {
      state.department = action.payload
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
  /** Omit reducer and reducerPath for prevent any other connections of it to store*/
  ..._omit(slice, ['reducer', 'reducerPath']),
  selectSlice: withSlice.selector(slice.selectSlice),
  selectors: {
    id: withSlice.selector(slice.selectors.id),
    firstName: withSlice.selector(slice.selectors.firstName),
    lastName: withSlice.selector(slice.selectors.lastName),
    email: withSlice.selector(slice.selectors.email),
    phone: withSlice.selector(slice.selectors.phone),
    city: withSlice.selector(slice.selectors.city),
    department: withSlice.selector(slice.selectors.department),
  },
}

declare module '@boilerplate/front-end/store' {
  export interface LazyLoadedSlices extends WithSlice<typeof slice> {}
}
