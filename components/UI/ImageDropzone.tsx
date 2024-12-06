import React, { useCallback, useState } from 'react';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface ImageDropzoneProps {
  onFileSelect: (file: File) => void;
  previewUrl?: string;
  isUploading?: boolean;
  onRemove?: () => void;
  maxSize?: number; // in MB
}

const FALLBACK_IMAGE_URL = 'https://github.com/brambleappmatus/images/blob/main/placeholder.png?raw=true';

export default function ImageDropzone({
  onFileSelect,
  previewUrl,
  isUploading,
  onRemove,
  maxSize = 5
}: ImageDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const validateFile = (file: File): boolean => {
    setError(null);
    
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a JPG, PNG, or GIF file');
      return false;
    }

    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return false;
    }

    return true;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const { files } = e.dataTransfer;
    if (files && files[0] && validateFile(files[0])) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect, maxSize]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      onFileSelect(file);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove();
      setImageError(false);
    }
  };

  const showUploadArea = !previewUrl || imageError;

  return (
    <div className="space-y-2">
      {previewUrl && !imageError && (
        <div className="relative w-full aspect-square max-w-xs mx-auto">
          <Image
            src={previewUrl}
            alt="Preview"
            fill
            className="object-cover rounded-lg"
            onError={handleImageError}
          />
          {onRemove && (
            <button
              onClick={handleRemove}
              className="absolute -top-2 -right-2 p-1 bg-red-100 dark:bg-red-900 rounded-full hover:bg-red-200 dark:hover:bg-red-800 transition-colors z-10"
              type="button"
            >
              <XMarkIcon className="w-4 h-4 text-red-600 dark:text-red-400" />
            </button>
          )}
        </div>
      )}

      {showUploadArea && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragging
              ? 'border-zinc-400 bg-zinc-50 dark:border-zinc-500 dark:bg-zinc-800/50'
              : 'border-zinc-300 dark:border-zinc-600 hover:border-zinc-400 dark:hover:border-zinc-500'
          }`}
        >
          <input
            type="file"
            onChange={handleChange}
            accept="image/jpeg,image/png,image/gif"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="space-y-2">
            <PhotoIcon className="w-10 h-10 mx-auto text-zinc-400 dark:text-zinc-500" />
            <div className="text-sm">
              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                Drop an image here or click to upload
              </span>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1">
                Supported formats: JPG, PNG, GIF. Max size: {maxSize}MB
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 text-center">
          {error}
        </p>
      )}

      {isUploading && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center">
          Uploading image...
        </p>
      )}
    </div>
  );
}