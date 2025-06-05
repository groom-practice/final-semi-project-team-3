import React from "react";

type ModalProps = {
  children: React.ReactNode;
};

export default function Modal({ children }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-[800px] overflow-y-scroll">
        {children}
      </div>
    </div>
  );
}
