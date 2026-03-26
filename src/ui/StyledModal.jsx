import { forwardRef } from "react";

export const StyledModal = forwardRef(({ children, className }, ref) => {
    return (
        <div ref={ref} className={`${className}`}>
            {children}
        </div>
    );
});
