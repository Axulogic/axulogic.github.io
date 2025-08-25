import { cn } from "@/lib/utils";
interface AxulogicLogoProps extends React.HTMLAttributes<HTMLPreElement> {
  asciiIcon: string;
}
export function AxulogicLogo({
  className,
  asciiIcon,
  ...props
}: AxulogicLogoProps) {
  return (
    <pre
      className={cn("text-[3px] leading-[3px] text-primary origin-top-center", className)}
      {...props}
    >
      {asciiIcon}
    </pre>
  );
}
