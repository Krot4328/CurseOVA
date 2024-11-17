'use client'

import { useEffect, useRef, useState } from 'react'

import clsx from 'clsx'
import Spinner from 'react-bootstrap/Spinner'

import { useAppSelector } from '@boilerplate/front-end/store'

import { isLoadingSelector } from '@boilerplate/front-end/store/selectors/is-loading'

interface ProgressProps {
  delay?: number
}

export const Progress: React.FC<ProgressProps> = ({ delay = 250 }) => {
  const timeoutDelay = useRef(delay)

  const isLoading = useAppSelector(isLoadingSelector)

  const [isAnimating, setIsAnimating] = useState(isLoading)

  useEffect(() => {
    if (!isLoading) {
      const timeout = setTimeout(() => {
        setIsAnimating(false)
      }, timeoutDelay.current)

      return (): void => {
        clearTimeout(timeout)
      }
    } else {
      setIsAnimating(true)
    }
  }, [isLoading])

  if (isAnimating) {
    return (
      <div className={clsx('fixed', 'top-1', 'right-1')}>
        <Spinner animation="border" variant="primary" />
      </div>
    )
  }

  return null
}
