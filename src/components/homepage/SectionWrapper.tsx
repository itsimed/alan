'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface SectionWrapperProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  className?: string
  containerClassName?: string
  titleClassName?: string
  subtitleClassName?: string
  id?: string
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  title,
  subtitle,
  className,
  containerClassName,
  titleClassName,
  subtitleClassName,
  id
}) => {
  return (
    <section id={id} className={clsx('py-16 md:py-20', className)}>
      <div className={clsx('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', containerClassName)}>
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            {title && (
              <h2 className={clsx(
                'text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4',
                titleClassName
              )}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={clsx(
                'text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto',
                subtitleClassName
              )}>
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}

export default SectionWrapper 