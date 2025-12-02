import * as React from 'react'
import { cn } from '@/lib/utils'

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  showLabel?: boolean
  variant?: 'default' | 'success' | 'warning' | 'error'
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, showLabel = false, variant = 'default', ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    // Auto-determine variant based on percentage if not specified
    const autoVariant = percentage >= 100
      ? 'error'
      : percentage >= 80
        ? 'warning'
        : 'default'

    const finalVariant = variant === 'default' ? autoVariant : variant

    const variantStyles = {
      default: 'bg-blue-600',
      success: 'bg-green-600',
      warning: 'bg-yellow-500',
      error: 'bg-red-600',
    }

    return (
      <div className={cn('w-full', className)} ref={ref} {...props}>
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className={cn(
              'h-full transition-all duration-300 ease-in-out rounded-full',
              variantStyles[finalVariant]
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showLabel && (
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>{value} days</span>
            <span>{max} days threshold</span>
          </div>
        )}
      </div>
    )
  }
)
Progress.displayName = 'Progress'

export { Progress }
