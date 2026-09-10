import { cn } from "@/lib/utils"
import * as React from "react"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-lg border border-transparent bg-muted px-3 py-2 text-sm shadow-none transition-[color,background-color,border-color] outline-none placeholder:text-muted-foreground hover:bg-[color-mix(in_srgb,var(--foreground)_8%,var(--muted))] focus-visible:border-border focus-visible:bg-popover focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
