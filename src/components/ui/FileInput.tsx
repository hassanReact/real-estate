import React, { useState } from "react";
import { CloudUpload } from "lucide-react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  onSelect?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const FileInput = React.forwardRef<HTMLInputElement, IProps>(
  ({ onChange, onSelect, className, error, ...props }, ref) => {
    const [fileName, setFileName] = useState("");

    function fileChangedHandler(e: React.ChangeEvent<HTMLInputElement>) {
      const file = e.target.files?.[0];
      setFileName(file?.name || "");
      onChange && onChange(e);
      onSelect && onSelect(e);
    }

    return (
      <div className={`relative bg-background rounded-lg p-2 ${className}`}>
        <label
          htmlFor="fileInput"
          className="outline-dashed outline-1 outline-slate-500 flex items-center justify-center flex-col p-8 w-full rounded-lg cursor-pointer"
        >
          <CloudUpload className="text-gray-500 w-10 h-10" />
          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF
          </p>
          <input
            id="fileInput"
            type="file"
            ref={ref}
            className="hidden"
            onChange={(e) => fileChangedHandler(e)}
            {...props}
          />
        </label>
        {fileName && (
          <p className="mt-2 text-sm text-gray-700">
            Selected File: <span className="font-semibold">{fileName}</span>
          </p>
        )}
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

FileInput.displayName = "FileInput";

export default FileInput;
