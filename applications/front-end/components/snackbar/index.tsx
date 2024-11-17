'use client'

import { SnackbarProvider, type SnackbarProviderProps } from 'notistack'

interface SnackbarProps extends SnackbarProviderProps {}

export const Snackbar: React.FC<SnackbarProps> = ({
  dense = true,
  anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'left',
  },
  ...props
}) => <SnackbarProvider {...props} anchorOrigin={anchorOrigin} dense={dense} />
