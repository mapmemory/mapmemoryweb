"use client"

import React, { useState, ChangeEvent } from "react";

interface Media {
  id: number;
  file: File | null;
  preview: string | null;
}

const MediaUploader = () => {
  const [mediaFiles, setMediaFiles] = useState<Media[]>([{ id: 1, file: null, preview: null }]);

  const handleAddMedia = () => {
    if (mediaFiles.length < 3) {
      setMediaFiles([...mediaFiles, { id: mediaFiles.length + 1, file: null, preview: null }]);
    }
  };

  const handleRemoveMedia = (id: number) => {
    setMediaFiles(mediaFiles.filter((media) => media.id !== id));
  };

  const handleFileChange = (id: number, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    const preview = file ? URL.createObjectURL(file) : null;

    setMediaFiles((prev) =>
      prev.map((media) => (media.id === id ? { ...media, file, preview } : media))
    );
  };

  return (
    <div>
      <h3 className="mb-4">Upload Media Files</h3>
      <div className="flex flex-col gap-4">
        {mediaFiles.map((media) => (
          <div
            key={media.id}
            className="relative flex flex-col border border-gray-300 rounded-lg p-4 w-full max-w-md"
          >
            {/* File Input */}
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => handleFileChange(media.id, e)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />

            {/* Preview */}
            {media.preview && (
              <div className="mb-4">
                {media.file?.type.startsWith("image/") ? (
                  <img
                    src={media.preview}
                    alt="Preview"
                    className="w-full h-auto rounded-lg"
                  />
                ) : (
                  <video
                    src={media.preview}
                    controls
                    className="w-full h-auto rounded-lg"
                  />
                )}
              </div>
            )}

            {/* Placeholder */}
            {!media.preview && (
              <p className="text-gray-500 text-sm">Click to select an image or video</p>
            )}

            {/* Remove Button */}
            {mediaFiles.length > 1 && (
              <button
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                onClick={() => handleRemoveMedia(media.id)}
              >
                &minus;
              </button>
            )}
          </div>
        ))}

        {/* Add Another File Button */}
        {mediaFiles.length < 3 && (
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg self-start"
            onClick={handleAddMedia}
          >
            + Add another file
          </button>
        )}
      </div>
    </div>
  );
};

export default MediaUploader;
