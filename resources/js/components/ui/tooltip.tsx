import { cn } from "@/lib/utils"
import { Tooltip as TooltipPrimitive } from "radix-ui"
import * as React from "react"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset || 8}
        className={cn(
          "z-50 w-fit max-w-[220px] origin-(--radix-tooltip-content-transform-origin) animate-in rounded-xl bg-shell-ink px-3 py-2.5 text-xs font-medium text-pretty text-paper shadow-[0_1px_2px_rgb(0_0_0/0.4),0_8px_24px_rgb(0_0_0/0.25)] fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-shell-ink fill-shell-ink" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
