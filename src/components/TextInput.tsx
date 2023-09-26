import { TInputAttributes } from "@/type/ui";
import clsx from "clsx";
import React, { FC, forwardRef } from "react";

// interface ITextInput extends TInputAttributes {
// }

const TextInput = forwardRef<HTMLInputElement, TInputAttributes>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="text"
        ref={ref}
        className={clsx("shared-input", className)}
        {...props}
      />
    );
  }
);

TextInput.displayName = 'TextInput'

export default TextInput;
