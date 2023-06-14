import { ReactNode } from "react";

export const FadeIn = ({
    children,
    className,
    delay = "6.5s",
    duration = "0.5s",
    ...props
}: {
    children: ReactNode;
    className?: string;
    delay?: string;
    duration?: string;
    [prop: string]: any;
}) => {
    return (
        <div
            {...props}
            className={`${className} animate-[fadeIn_${duration}_ease-in-out_${delay}_forwards] opacity-0`}
        >
            {children}
        </div>
    );
};

