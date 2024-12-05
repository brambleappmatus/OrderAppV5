'use client';

import React, { useCallback, useState } from 'react';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { STORAGE_CONFIG } from '@/lib/config';

interface ImageUploadProps {
  onImageUpload: (file: File) => Promise<void>;
  onImageRemove: () => Promise<void>;
  imageUrl?: string | null;
  isUploading?: boolean;
}

const { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } = STORAGE_CONFIG;
type AcceptedFileType = typeof ACCEPTED_FILE_TYPES[number];

export default function ImageUpload({
  onImageUpload,
  onImageRemove,
  imageUrl,
  isUploading
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const validateFile = (file: File): boolean => {
    setError(null);

    if (!ACCEPTED_FILE_TYPES.includes(file.type as AcceptedFileType)) {
      setError('Please upload a JPG, PNG, or GIF file');
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('File size must be less than 5MB');
      return false;
    }

    return true;
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      await onImageUpload(file);
      setImageError(false);
    }
  }, [onImageUpload]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      await onImageUpload(file);
      setImageError(false);
    }
  };

  const handleRemove = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    await onImageRemove();
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="space-y-1">
      {imageUrl && !imageError && !isUploading ? (
        <div className="relative w-full h-24 bg-gray-50 dark:bg-zinc-800/50 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt="Preview"
            fill
            className="object-contain p-2"
            onError={handleImageError}
            unoptimized
          />
          <button
            onClick={handleRemove}
            className="absolute top-1 right-1 p-1 bg-red-100 dark:bg-red-900 rounded-full hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
            type="button"
          >
            <XMarkIcon className="w-3 h-3 text-red-600 dark:text-red-400" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border border-dashed rounded-lg p-2 transition-colors ${
            isDragging
              ? 'border-zinc-400 bg-zinc-50 dark:border-zinc-500 dark:bg-zinc-800/50'
              : 'border-zinc-300 dark:border-zinc-600 hover:border-zinc-400 dark:hover:border-zinc-500'
          }`}
        >
          <input
            type="file"
            onChange={handleFileSelect}
            accept={ACCEPTED_FILE_TYPES.join(',')}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />
          
          <div className="flex items-center justify-center gap-1.5 h-[52px]">
            <PhotoIcon className="w-4 h-4 text-zinc-400 dark:text-zinc-500 flex-shrink-0" />
            <div className="text-xs">
              {isUploading ? (
                <span className="text-zinc-600 dark:text-zinc-300">
                  Uploading...
                </span>
              ) : (
                <span className="text-zinc-600 dark:text-zinc-300">
                  Drop image or click • JPG, PNG, GIF (max 5MB)
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {error && (
        <p className="text-xs text-red-600 dark:text-red-400 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}