import { type PayloadAction, type WithSlice, createSlice } from '@reduxjs/toolkit'
import _omit from 'lodash/omit'

import { createSliceKey } from '@boilerplate/core/builders/slice-key.builder'

import { reducer } from '@boilerplate/dashboard/store'

interface CreateProductState {
  title: string
  price: number
  description: string
  tackle: string
  file: File | null
}

const slice = createSlice({
  name: createSliceKey('create-product'),
  initialState: (): CreateProductState => ({
    title: '',
    price: 0,
    description: '',
    tackle: '',
    file: null,
  }),
  selectors: {
    title: (state) => state.title,
    price: (state) => state.price,
    description: (state) => state.description,
    tackle: (state) => state.tackle,
    file: (state) => state.file,
  },
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload
    },
    setPrice(state, action: PayloadAction<number>) {
      state.price = action.payload
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload
    },
    setTackle(state, action: PayloadAction<string>) {
      state.tackle = action.payload
    },
    setFile(state, action: PayloadAction<File | null>) {
      state.file = action.payload
    },
  },
})

const withSlice = reducer.inject(slice)

export const createProductSlice = {
  /**
   * Omit reducer and reducerPath for prevent any other connections of it to store
   */
  ..._omit(slice, ['reducer', 'reducerPath']),
  selectSlice: withSlice.selector(slice.selectSlice),
  selectors: {
    title: withSlice.selector(slice.selectors.title),
    price: withSlice.selector(slice.selectors.price),
    description: withSlice.selector(slice.selectors.description),
    tackle: withSlice.selector(slice.selectors.tackle),
    file: withSlice.selector(slice.selectors.file),
  },
}

declare module '@boilerplate/dashboard/store' {
  export interface LazyLoadedSlices extends WithSlice<typeof slice> { }
}
