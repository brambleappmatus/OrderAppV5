import React from 'react';

interface ToastMessageProps {
  message: string;
  donation?: string;
  isRemoval?: boolean;
}

export default function ToastMessage({ message, donation, isRemoval }: ToastMessageProps) {
  return (
    <div>
      <div>{message}</div>
      {donation && (
        <div className={`text-sm mt-1 ${isRemoval ? 'text-red-500' : 'text-green-500'}`}>
          {isRemoval ? '-' : '+'}€{donation} {isRemoval ? 'lost from' : 'to'} shelter {isRemoval ? '💔' : '💝'}
        </div>
      )}
    </div>
  );
}