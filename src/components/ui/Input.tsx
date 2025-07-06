import React from 'react'
import { clsx } from 'clsx'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  variant?: 'default' | 'filled'
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  variant = 'default',
  className,
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
  
  const baseClasses = 'block w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-1'
  
  const variantClasses = {
    default: 'border-neutral-300 bg-white text-neutral-900 placeholder-neutral-500 focus:border-primary-500 focus:ring-primary-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder-neutral-400',
    filled: 'border-transparent bg-neutral-100 text-neutral-900 placeholder-neutral-500 focus:bg-white focus:border-primary-500 focus:ring-primary-500 dark:bg-neutral-700 dark:text-neutral-100 dark:placeholder-neutral-400 dark:focus:bg-neutral-800',
  }
  
  const errorClasses = error ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''
  
  const inputClasses = clsx(
    baseClasses,
    variantClasses[variant],
    errorClasses,
    leftIcon && 'pl-10',
    rightIcon && 'pr-10',
    className
  )

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
            {leftIcon}
          </div>
        )}
        
        <input
          id={inputId}
          className={inputClasses}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
            {rightIcon}
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <p className={clsx(
          'mt-1 text-xs',
          error ? 'text-error-600 dark:text-error-400' : 'text-neutral-500 dark:text-neutral-400'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  )
}

export default Input 