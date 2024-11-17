import { type PayloadAction, type WithSlice, createSlice } from '@reduxjs/toolkit'
import _omit from 'lodash/omit'

import { createSliceKey } from '@boilerplate/core/builders/slice-key.builder'

import { reducer } from '@boilerplate/dashboard/store'

interface PostProductState {
  title: string
  description: string
  price: number
  tagsIds: string[]
  imagesIds: string[]
}

const slice = createSlice({
  name: createSliceKey('post-product'),
  initialState: (): PostProductState => ({
    title: '',
    description: '',
    price: 0,
    tagsIds: [],
    imagesIds: [],
  }),
  selectors: {
    title: (state) => state.title,
    description: (state) => state.description,
    price: (state) => state.price,
    tagsIds: (state) => state.tagsIds,
    imagesIds: (state) => state.imagesIds,
  },
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload
    },
    setPrice(state, action: PayloadAction<number>) {
      state.price = action.payload
    },
    setTagsIds(state, action: PayloadAction<string[]>) {
      state.tagsIds = action.payload
    },
    setImagesIds(state, action: PayloadAction<string[]>) {
      state.imagesIds = action.payload
    },
  },
})

const withSlice = reducer.inject(slice)

export const postProductSlice = {
  /**
   * Omit reducer and reducerPath to prevent any other connections of it to the store
   */
  ..._omit(slice, ['reducer', 'reducerPath']),
  selectSlice: withSlice.selector(slice.selectSlice),
  selectors: {
    title: withSlice.selector(slice.selectors.title),
    description: withSlice.selector(slice.selectors.description),
    price: withSlice.selector(slice.selectors.price),
    tagsIds: withSlice.selector(slice.selectors.tagsIds),
    imagesIds: withSlice.selector(slice.selectors.imagesIds),
  },
}

declare module '@boilerplate/dashboard/store' {
  export interface LazyLoadedSlices extends WithSlice<typeof slice> { }
}
