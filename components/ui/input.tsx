import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-auto w-full rounded-none border border-[#e8e8e6] bg-[#fafaf8] px-4 py-3 text-base text-[#2a2a2a] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#757575] focus-visible:outline-none focus-visible:border-[#f6ce54] focus-visible:border-2 focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#f5f5f3] md:text-sm transition-colors",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
