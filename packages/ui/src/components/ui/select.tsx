import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// 통일된 Select 트리거 스타일
const selectTriggerVariants = cva(
  [
    "flex items-center justify-between gap-3 rounded-xl border transition-all duration-200",
    "font-medium outline-none disabled:cursor-not-allowed disabled:opacity-50",
    "shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-1",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:transition-transform",
    "data-[state=open]:[&_svg]:rotate-180",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-gray-200 bg-white text-gray-900",
          "hover:border-gray-300 hover:bg-gray-50",
          "focus-visible:border-primary-500 focus-visible:ring-primary-200",
          "data-[placeholder]:text-gray-500",
        ],
        primary: [
          "border-primary-200 bg-primary-50 text-primary-900",
          "hover:border-primary-300 hover:bg-primary-100",
          "focus-visible:border-primary-500 focus-visible:ring-primary-200",
          "data-[placeholder]:text-primary-600",
        ],
        success: [
          "border-success-200 bg-success-50 text-success-900",
          "hover:border-success-300 hover:bg-success-100",
          "focus-visible:border-success-500 focus-visible:ring-success-200",
          "data-[placeholder]:text-success-600",
        ],
        warning: [
          "border-warning-200 bg-warning-50 text-warning-900",
          "hover:border-warning-300 hover:bg-warning-100",
          "focus-visible:border-warning-500 focus-visible:ring-warning-200",
          "data-[placeholder]:text-warning-600",
        ],
        danger: [
          "border-danger-200 bg-danger-50 text-danger-900",
          "hover:border-danger-300 hover:bg-danger-100",
          "focus-visible:border-danger-500 focus-visible:ring-danger-200",
          "data-[placeholder]:text-danger-600",
        ],
      },
      size: {
        sm: "h-8 px-3 py-1.5 text-xs gap-2 [&_svg]:h-3 [&_svg]:w-3",
        md: "h-10 px-4 py-2.5 text-sm gap-3 [&_svg]:h-4 [&_svg]:w-4",
        lg: "h-12 px-5 py-3 text-base gap-3 [&_svg]:h-4 [&_svg]:w-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// Select Content 스타일
const selectContentVariants = cva([
  "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-xl border shadow-lg",
  "bg-white data-[state=open]:animate-in data-[state=closed]:animate-out",
  "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
  "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
  "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
]);

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root {...props} />;
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group {...props} />;
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value {...props} />;
}

interface SelectTriggerProps
  extends React.ComponentProps<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> {}

function SelectTrigger({
  className,
  variant,
  size,
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      className={cn(selectTriggerVariants({ variant, size }), className)}
      {...props}
    >
      <div className="flex items-center gap-2 flex-1 min-w-0">{children}</div>
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          selectContentVariants(),
          "border-gray-200",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      className={cn(
        "py-2 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wide bg-gray-50 border-b border-gray-100",
        className
      )}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        [
          "relative flex w-full cursor-pointer items-center rounded-lg py-2.5 px-3 pr-8",
          "text-sm outline-none transition-colors",
          "hover:bg-primary-50 hover:text-primary-900",
          "focus:bg-primary-100 focus:text-primary-900",
          "data-[state=checked]:bg-primary-100 data-[state=checked]:text-primary-900",
          "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        ],
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex items-center gap-2">
        {children}
      </SelectPrimitive.ItemText>
      <span className="absolute right-3 flex h-4 w-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="h-4 w-4 text-primary-600" />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      className={cn("my-1 h-px bg-gray-200", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      className={cn(
        "flex cursor-default items-center justify-center py-1 text-gray-500",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="h-4 w-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      className={cn(
        "flex cursor-default items-center justify-center py-1 text-gray-500",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="h-4 w-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  type SelectTriggerProps,
};
