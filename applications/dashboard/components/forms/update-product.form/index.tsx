'use client'

import { useCallback, useEffect } from 'react'

import { useParams, useRouter } from 'next/navigation'

import { useAppDispatch, useAppSelector } from '@boilerplate/dashboard/store'

import { v1Api } from '@boilerplate/dashboard/store/api/v1.api'
import { usePostFilePreloadMutation } from '@boilerplate/dashboard/store/queries/file.query'
import { useGetProductQuery } from '@boilerplate/dashboard/store/queries/product.query'
import { useGetTagsListQuery } from '@boilerplate/dashboard/store/queries/reference.query'
import { editProductSlice } from '@boilerplate/dashboard/store/slices/edit-product.slice'

interface UpdateProductFormProps { }

export const UpdateProductForm: React.FC<UpdateProductFormProps> = () => {
  const dispatch = useAppDispatch()

  const router = useRouter()
  const { productId } = useParams<Record<'productId', string>>()

  useGetProductQuery({ productId }, { refetchOnMountOrArgChange: true })

  useEffect(() => {
    if (productId) {
      dispatch(v1Api.util.invalidateTags([{ type: 'Product', id: productId }]))
    }
  }, [productId])

  const { data: productData } = useGetProductQuery({ productId })

  useEffect(() => {
    if (productData) {
      dispatch(editProductSlice.actions.setTitle(productData.title))
      dispatch(editProductSlice.actions.setPrice(productData.price?.value || 0))
      dispatch(editProductSlice.actions.setDescription(productData.description))

      const firstTagId = productData.tags?.[length - 1]?.id || ''

      dispatch(editProductSlice.actions.setTagId(firstTagId))

      const firstFileId = productData.images?.[length - 1]?.id || null

      dispatch(editProductSlice.actions.setFileId(firstFileId))
    }
  }, [productData, dispatch])

  const { data: tagsListData = {} } = useGetTagsListQuery()
  const tagsGroups = tagsListData.result || []

  const [postFilePreload] = usePostFilePreloadMutation()

  const title = useAppSelector(editProductSlice.selectors.title)
  const handleTitleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    dispatch(editProductSlice.actions.setTitle(event.target.value))
  }, [])

  const price = useAppSelector(editProductSlice.selectors.price)
  const handlePriceChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    dispatch(editProductSlice.actions.setPrice(parseFloat(event.target.value)))
  }, [])

  const description = useAppSelector(editProductSlice.selectors.description)
  const handleDescriptionChange = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>((event) => {
    dispatch(editProductSlice.actions.setDescription(event.target.value))
  }, [])

  const tagId = useAppSelector(editProductSlice.selectors.tagId)
  const handleChangeTagId = useCallback<React.ChangeEventHandler<HTMLSelectElement>>((event) => {
    dispatch(editProductSlice.actions.setTagId(event.target.value))
  }, [])

  const fileId = useAppSelector(editProductSlice.selectors.fileId)
  const handleFileChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    async (event) => {
      const selectedFile = event.target.files?.[0] || null

      if (!selectedFile) {
        return
      }

      const { data } = await postFilePreload(selectedFile)

      if (data?.id) {
        dispatch(editProductSlice.actions.setFileId(data.id))
      }
    },
    [postFilePreload],
  )

  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    async (event) => {
      event.preventDefault()

      const { editProductStart } = await import('@boilerplate/dashboard/store/sagas/edit-product.saga')

      dispatch(editProductStart({ productId }))
    },
    [dispatch, productId, title, price, description, tagId, fileId],
  )

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
            type="button"
            onClick={() => {
              router.push('/products')
            }}
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
