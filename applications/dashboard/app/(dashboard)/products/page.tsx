/* eslint-disable import/no-default-export */

import { type Metadata } from 'next'

import { WithProfile } from '@boilerplate/dashboard/store/with-profile'

import { TacklePage } from '@boilerplate/dashboard/components/product-list/index'

interface DashboardProductsPageProps { }

export const metadata: Metadata = {
  title: 'Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template',
  description: 'This is Next.js Dashboard for TailAdmin Dashboard Template',
}

export const DashboardProductsPage: React.FC<DashboardProductsPageProps> = () => (
  <WithProfile>
    <TacklePage />
  </WithProfile>
)

export default DashboardProductsPage
