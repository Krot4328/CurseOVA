'use client'

import { Suspense, lazy, useCallback, useEffect, useState } from 'react'

import { Tackle } from '@boilerplate/types/products/interfaces/products'

import { useAppDispatch, useAppSelector } from '@boilerplate/dashboard/store'

import { postProductSlice } from '@boilerplate/dashboard/store/slices/create-product.slice'

interface CreateProductFormProps { }

const BaseCreateProductForm = lazy(() => import('@boilerplate/dashboard/components/forms/create-product.form/form'))

export const CreateProductForm: React.FC<CreateProductFormProps> = () => {
  const dispatch = useAppDispatch()

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

  const tags = useAppSelector(postProductSlice.selectors.tagsIds)
  const handleTagsChange = useCallback<React.ChangeEventHandler<HTMLSelectElement>>((event) => {
    dispatch(postProductSlice.actions.setTagsIds(event.target.value))
  }, [])

  // const handleFileChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
  //   const selectedFile = event.target.files?.[0] || null

  //   dispatch(postProductSlice.actions.setFile(selectedFile))
  // }, [])

  // Додайте локальний стан для тегів
  const [availableTags, setAvailableTags] = useState<string[]>([])

  // Завантаження тегів з API
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('/api/tags') // Замість '/api/tags' використовуйте ваш API-ендпоінт
        const data = await response.json()

        setAvailableTags(data)
      } catch (error) {
        console.error('Failed to fetch tags:', error)
      }
    }

    fetchTags()
  }, [])

  const content = (
    <>
      <div>
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">Назва продукту</label>
        <input
          type="text"
          placeholder="Введіть назву продукту"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">Тип снасті</label>
        <select
          value={tags}
          onChange={handleTagsChange}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        >
          <option value="" disabled>
            Оберіть тег
          </option>
          {availableTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">Ціна продукту</label>
        <input
          type="text"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          value={price}
          onChange={handlePriceChange}
        />
      </div>
      <div>
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">Опис продукту</label>
        <textarea
          rows={6}
          placeholder="Введіть опис продукту"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>
      </div>
      {/* <div>
        <input
          type="file"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          onChange={handleFileChange}
        />
      </div> */}
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
    </>
  )

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <Suspense fallback={<form className="flex flex-col gap-5.5 p-6.5">{content}</form>}>
        <BaseCreateProductForm className="flex flex-col gap-5.5 p-6.5">{content}</BaseCreateProductForm>
      </Suspense>
    </div>
  )
}
