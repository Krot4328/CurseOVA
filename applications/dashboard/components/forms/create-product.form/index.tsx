'use client'

import { createProductSlice } from "@boilerplate/dashboard/store/slices/create-product.slice"
import { useAppDispatch, useAppSelector } from "@boilerplate/dashboard/store"
import { lazy, useCallback, Suspense } from "react"
import { Tackle } from "@boilerplate/types/products/interfaces/products"

interface CreateProductFormProps { }

const BaseCreateProductForm = lazy(() => import('@boilerplate/dashboard/components/forms/create-product.form/form'))

export const CreateProductForm: React.FC<CreateProductFormProps> = () => {
  const dispatch = useAppDispatch()

  const title = useAppSelector(createProductSlice.selectors.title)
  const handleTitleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    dispatch(createProductSlice.actions.setTitle(event.target.value))
  }, [])

  const price = useAppSelector(createProductSlice.selectors.price)
  const handlePriceChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    dispatch(createProductSlice.actions.setPrice(parseFloat(event.target.value)))
  }, [])

  const description = useAppSelector(createProductSlice.selectors.description)
  const handleDescriptionChange = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>((event) => {
    dispatch(createProductSlice.actions.setDescription(event.target.value))
  }, [])

  const tackle = useAppSelector(createProductSlice.selectors.tackle)
  const handleChangeTackle = useCallback<React.ChangeEventHandler<HTMLSelectElement>>((event) => {
    dispatch(createProductSlice.actions.setTackle(event.target.value))
  }, [])

  const handleFileChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    const selectedFile = event.target.files?.[0] || null;
    dispatch(createProductSlice.actions.setFile(selectedFile));
  }, []);

  const content = (
    <>
      <div>
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          Назва продукту
        </label>
        <input
          type="text"
          placeholder="Введіть назву продукту"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          Тип снасті
        </label>
        <select
          value={tackle}
          onChange={handleChangeTackle}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        >
          {Object.values(Tackle).map((tackleValue) => (
            <option key={tackleValue} value={tackleValue}>
              {tackleValue}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          Ціна продукту
        </label>
        <input
          type="text"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          value={price}
          onChange={handlePriceChange}
        />
      </div>
      <div>
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          Опис продукту
        </label>
        <textarea
          rows={6}
          placeholder="Введіть опис продукту"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>
      </div>
      <div>
        <label className="mb-3 block text-sm font-medium text-white dark:text-white">
          Завантажити файл
        </label>
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
    </>
  )

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <Suspense fallback={(
        <form className="flex flex-col gap-5.5 p-6.5">
          {content}
        </form>
      )}>
        <BaseCreateProductForm className="flex flex-col gap-5.5 p-6.5">
          {content}
        </BaseCreateProductForm>
      </Suspense>
    </div>
  )
}