'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface CTAButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  primary?: boolean
  secondary?: boolean
  outline?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const CTAButton: React.FC<CTAButtonProps> = ({
  children,
  onClick,
  href,
  primary = false,
  secondary = false,
  outline = false,
  size = 'md',
  className,
  disabled = false,
  icon,
  iconPosition = 'left'
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500 shadow-lg hover:shadow-xl",
    secondary: "bg-white text-primary-600 hover:bg-gray-50 focus:ring-primary-500 shadow-lg hover:shadow-xl",
    outline: "border-2 border-white text-white hover:bg-white hover:text-primary-600 focus:ring-white"
  }

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  }

  const variant = primary ? 'primary' : secondary ? 'secondary' : outline ? 'outline' : 'primary'

  const buttonClasses = clsx(
    baseClasses,
    variants[variant],
    sizes[size],
    className
  )

  const buttonContent = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </>
  )

  const MotionComponent = motion.button

  if (href) {
    return (
      <motion.a
        href={href}
        className={buttonClasses}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {buttonContent}
      </motion.a>
    )
  }

  return (
    <MotionComponent
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {buttonContent}
    </MotionComponent>
  )
}

export default CTAButton 