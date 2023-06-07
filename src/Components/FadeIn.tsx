import { ReactNode } from "react";

const FadeIn = ({
  children,
  className,
  delay = 4.5,
  duration = 0.5,
  element = "div",
  ...props
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  [prop: string]: any;
  element?: string;
}) => {
  const TagName = `${element}` as keyof JSX.IntrinsicElements;

  return (
    <TagName
      {...props}
      className={`${className} animate-[fadeIn_${duration}s_ease-in-out_${delay}s_forwards] opacity-0`}
    >
      {children}
    </TagName>
  );
};

export default FadeIn;
