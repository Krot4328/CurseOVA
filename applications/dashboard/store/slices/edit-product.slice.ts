import { type PayloadAction, type WithSlice, createSlice } from '@reduxjs/toolkit'
import _omit from 'lodash/omit'

import { createSliceKey } from '@boilerplate/core/builders/slice-key.builder'

import { reducer } from '@boilerplate/dashboard/store'

interface UpdateProductState {
  productId: string
  title: string
  description: string
  price: number
  tagId: string | null
  fileId: string | null
}

const slice = createSlice({
  name: createSliceKey('update-product'),
  initialState: (): UpdateProductState => ({
    productId: '',
    title: '',
    description: '',
    price: 0,
    tagId: '',
    fileId: null,
  }),
  selectors: {
    productId: (state) => state.productId,
    title: (state) => state.title,
    description: (state) => state.description,
    price: (state) => state.price,
    tagId: (state) => state.tagId,
    fileId: (state) => state.fileId,
  },
  reducers: {
    setProductId(state, action: PayloadAction<string>) {
      state.productId = action.payload
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload
    },
    setPrice(state, action: PayloadAction<number>) {
      state.price = action.payload
    },
    setTagId(state, action: PayloadAction<string>) {
      state.tagId = action.payload
    },
    setFileId(state, action: PayloadAction<string | null>) {
      state.fileId = action.payload
    },
  },
})

const withSlice = reducer.inject(slice)

export const editProductSlice = {
  /**
   * Omit reducer and reducerPath for prevent any other connections of it to store
   */
  ..._omit(slice, ['reducer', 'reducerPath']),
  selectSlice: withSlice.selector(slice.selectSlice),
  selectors: {
    productId: withSlice.selector(slice.selectors.productId),
    title: withSlice.selector(slice.selectors.title),
    description: withSlice.selector(slice.selectors.description),
    price: withSlice.selector(slice.selectors.price),
    tagId: withSlice.selector(slice.selectors.tagId),
    fileId: withSlice.selector(slice.selectors.fileId),
  },
}

declare module '@boilerplate/dashboard/store' {
  export interface LazyLoadedSlices extends WithSlice<typeof slice> { }
}
