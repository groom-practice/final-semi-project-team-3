"use client";

import { useState } from "react";

type ToggleButtonProps = {
  value?: boolean;
  onToggle?: (newValue: boolean) => void;
}

export default function ToggleButton({ value, onToggle }: ToggleButtonProps) {
  const [internalValue, setInternalValue] = useState(false);

  const isControlled = value !== undefined;
  const enabled = isControlled ? value : internalValue;

  const toggle = () => {
    const newValue = !enabled;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onToggle?.(newValue);
  };

  return (
    <button>
      
    </button>
  );
}