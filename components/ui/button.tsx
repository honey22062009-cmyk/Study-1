import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'destructive'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm": variant === 'default',
            "border border-zinc-200 bg-white hover:bg-zinc-50": variant === 'outline',
            "hover:bg-zinc-100": variant === 'ghost',
            "bg-zinc-100 text-zinc-900 hover:bg-zinc-200": variant === 'secondary',
            "bg-red-600 text-white hover:bg-red-700": variant === 'destructive',
          },
          {
            "h-10 px-5 py-2": size === 'default',
            "h-8 px-3 text-xs": size === 'sm',
            "h-12 px-8 text-base": size === 'lg',
            "h-10 w-10": size === 'icon',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
