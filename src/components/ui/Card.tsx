import React from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glass?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  onClick?: () => void
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  glass = false,
  padding = 'md',
  onClick,
  ...props
}) => {
  const baseClasses = 'rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800'
  
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  }
  
  const glassClasses = glass ? 'backdrop-blur-md bg-white/10 border-white/20 dark:bg-neutral-900/10 dark:border-neutral-700/20' : ''
  const hoverClasses = hover ? 'transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer' : ''
  
  const classes = clsx(
    baseClasses,
    paddingClasses[padding],
    glassClasses,
    hoverClasses,
    className
  )

  const Component = onClick ? motion.div : 'div'
  const motionProps = onClick ? {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    onClick,
  } : {}

  return (
    <Component className={classes} {...motionProps} {...props}>
      {children}
    </Component>
  )
}

export default Card 