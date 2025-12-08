import { useCallback, useState } from "react";

export interface FileWithPreview extends File {
    id: string;
    preview: string;
}

interface UseFileUploadOptions {
    accept?: string;
    maxFiles?: number;
}

export function useFileUpload(options: UseFileUploadOptions = {}) {
    const { accept = "*", maxFiles = 1 } = options;
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const processFiles = useCallback(
        (fileList: FileList | null) => {
            if (!fileList) return;

            const newFiles: FileWithPreview[] = [];
            const filesArray = Array.from(fileList).slice(0, maxFiles);

            filesArray.forEach((file) => {
                const fileWithPreview = Object.assign(file, {
                    id: Math.random().toString(36).substring(7),
                    preview: URL.createObjectURL(file),
                });
                newFiles.push(fileWithPreview);
            });

            setFiles(newFiles);
        },
        [maxFiles]
    );

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);

            const { files: droppedFiles } = e.dataTransfer;
            processFiles(droppedFiles);
        },
        [processFiles]
    );

    const openFileDialog = useCallback(() => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = accept;
        input.multiple = maxFiles > 1;
        input.onchange = (e) => {
            const target = e.target as HTMLInputElement;
            processFiles(target.files);
        };
        input.click();
    }, [accept, maxFiles, processFiles]);

    const removeFile = useCallback((id: string) => {
        setFiles((prev) => {
            const file = prev.find((f) => f.id === id);
            if (file?.preview) {
                URL.revokeObjectURL(file.preview);
            }
            return prev.filter((f) => f.id !== id);
        });
    }, []);

    const getInputProps = useCallback(
        () => ({
            type: "file" as const,
            accept,
            multiple: maxFiles > 1,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                processFiles(e.target.files);
            },
        }),
        [accept, maxFiles, processFiles]
    );

    return [
        { files, isDragging },
        {
            handleDragEnter,
            handleDragLeave,
            handleDragOver,
            handleDrop,
            openFileDialog,
            removeFile,
            getInputProps,
        },
    ] as const;
}
