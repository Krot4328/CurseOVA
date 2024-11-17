'use client'

import { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from '@boilerplate/dashboard/store'

import { postProductSlice } from '@boilerplate/dashboard/store/slices/create-product.slice'

import { usePostFilePreloadMutation } from '@/store/queries/file.query'
import { useGetTagsListQuery } from '@/store/queries/reference.query'

interface CreateProductFormProps {}

export const CreateProductForm: React.FC<CreateProductFormProps> = () => {
  const dispatch = useAppDispatch()

  const { data: tagsListData = {} } = useGetTagsListQuery()
  const tagsGroups = tagsListData.result || []

  const [postFilePreload] = usePostFilePreloadMutation()

  const title = useAppSelector(postProductSlice.selectors.title)
  const handleTitleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    dispatch(postProductSlice.actions.setTitle(event.target.value))
  }, [])

  const price = useAppSelector(postProductSlice.selectors.price)
  const handlePriceChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    dispatch(postProductSlice.actions.setPrice(parseFloat(event.target.value)))
  }, [])

  const description = useAppSelector(postProductSlice.selectors.description)
  const handleDescriptionChange = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>((event) => {
    dispatch(postProductSlice.actions.setDescription(event.target.value))
  }, [])

  const tagId = useAppSelector(postProductSlice.selectors.tagId)
  const handleChangeTagId = useCallback<React.ChangeEventHandler<HTMLSelectElement>>((event) => {
    dispatch(postProductSlice.actions.setTagId(event.target.value))
  }, [])

  const handleFileChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(async (event) => {
    const selectedFile = event.target.files?.[0] || null

    if (!selectedFile) {
      return
    }

    const { data } = await postFilePreload(selectedFile)

    if (data?.id) {
      dispatch(postProductSlice.actions.setFileId(data.id))
    }
  }, [])

  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(async (event) => {
    event.preventDefault()

    const { createProductStart } = await import('@boilerplate/dashboard/store/sagas/create-product.saga')

    dispatch(createProductStart({}))
  }, [])

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <form className="flex flex-col gap-5.5 p-6.5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="product-title" className="mb-3 block text-sm font-medium text-black dark:text-white">
            Назва продукту
          </label>
          <input
            id="product-title"
            type="text"
            placeholder="Введіть назву продукту"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="product-tag" className="mb-3 block text-sm font-medium text-black dark:text-white">
            Тип снасті
          </label>
          <select
            id="product-tag"
            value={tagId ?? ''}
            onChange={handleChangeTagId}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          >
            {tagsGroups.map(({ id: tagGroupId, title: tagGroupTitle, tags }) => (
              <optgroup key={tagGroupId} label={tagGroupTitle}>
                {tags.map(({ id: _tagId, title: tagTitle }) => (
                  <option key={_tagId} value={_tagId}>
                    {tagTitle}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="product-price" className="mb-3 block text-sm font-medium text-black dark:text-white">
            Ціна продукту
          </label>
          <input
            id="product-price"
            type="text"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            value={price}
            onChange={handlePriceChange}
          />
        </div>
        <div>
          <label htmlFor="product-description" className="mb-3 block text-sm font-medium text-black dark:text-white">
            Опис продукту
          </label>
          <textarea
            id="product-description"
            rows={6}
            placeholder="Введіть опис продукту"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>
        <div>
          <input
            type="file"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex justify-end gap-4.5">
          <button
            className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            type="submit"
          >
            Скасувати
          </button>
          <button
            className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
            type="submit"
          >
            Зберегти
          </button>
        </div>
      </form>
    </div>
  )
}
