/* eslint-disable import/no-default-export */

import { type Metadata } from 'next'

import { WithProfile } from '@boilerplate/dashboard/store/with-profile'

import { UpdateProductForm } from '@boilerplate/dashboard/components/forms/update-product.form'

interface DashboardCreateProductPageProps {}

export const metadata: Metadata = {
  title: 'Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template',
  description: 'This is Next.js Dashboard for TailAdmin Dashboard Template',
}

export const DashboardCreateProductPage: React.FC<DashboardCreateProductPageProps> = () => (
  <WithProfile>
    <UpdateProductForm />
  </WithProfile>
)

export default DashboardCreateProductPage
