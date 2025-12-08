"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
    ArrowLeftIcon,
    Upload,
    XIcon,
    ZoomInIcon,
    ZoomOutIcon,
} from "lucide-react";

import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import {
    Cropper,
    CropperCropArea,
    CropperDescription,
    CropperImage,
} from "@/components/ui/cropper";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";

// Define type for pixel crop area
type Area = { x: number; y: number; width: number; height: number };

// Helper function to create a cropped image blob
const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new window.Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => reject(error));
        image.setAttribute("crossOrigin", "anonymous");
        image.src = url;
    });

async function getCroppedImg(
    imageSrc: string,
    pixelCrop: Area,
    outputWidth: number = pixelCrop.width,
    outputHeight: number = pixelCrop.height
): Promise<Blob | null> {
    try {
        const image = await createImage(imageSrc);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            return null;
        }

        canvas.width = outputWidth;
        canvas.height = outputHeight;

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            outputWidth,
            outputHeight
        );

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob);
            }, "image/jpeg", 0.95);
        });
    } catch (error) {
        console.error("Error in getCroppedImg:", error);
        return null;
    }
}

interface BlogCoverImageUploadProps {
    onImageChange: (blob: Blob | null) => void;
    initialImageUrl?: string;
}

export default function BlogCoverImageUpload({
    onImageChange,
    initialImageUrl,
}: BlogCoverImageUploadProps) {
    const [
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
    ] = useFileUpload({
        accept: "image/*",
    });

    const previewUrl = files[0]?.preview || null;
    const fileId = files[0]?.id;

    const [finalImageUrl, setFinalImageUrl] = useState<string | null>(
        initialImageUrl || null
    );
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const previousFileIdRef = useRef<string | undefined | null>(null);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [zoom, setZoom] = useState(1);

    const handleCropChange = useCallback((pixels: Area | null) => {
        setCroppedAreaPixels(pixels);
    }, []);

    const handleApply = async () => {
        if (!previewUrl || !fileId || !croppedAreaPixels) {
            if (fileId) {
                removeFile(fileId);
                setCroppedAreaPixels(null);
            }
            return;
        }

        try {
            const croppedBlob = await getCroppedImg(
                previewUrl,
                croppedAreaPixels,
                1200, // Output width
                800 // Output height (3:2 ratio)
            );

            if (!croppedBlob) {
                throw new Error("Failed to generate cropped image blob.");
            }

            const newFinalUrl = URL.createObjectURL(croppedBlob);

            if (finalImageUrl && finalImageUrl.startsWith("blob:")) {
                URL.revokeObjectURL(finalImageUrl);
            }

            setFinalImageUrl(newFinalUrl);
            onImageChange(croppedBlob);
            setIsDialogOpen(false);
        } catch (error) {
            console.error("Error during apply:", error);
            setIsDialogOpen(false);
        }
    };

    const handleRemoveFinalImage = () => {
        if (finalImageUrl && finalImageUrl.startsWith("blob:")) {
            URL.revokeObjectURL(finalImageUrl);
        }
        setFinalImageUrl(null);
        onImageChange(null);
    };

    useEffect(() => {
        const currentFinalUrl = finalImageUrl;
        return () => {
            if (currentFinalUrl && currentFinalUrl.startsWith("blob:")) {
                URL.revokeObjectURL(currentFinalUrl);
            }
        };
    }, [finalImageUrl]);

    useEffect(() => {
        if (fileId && fileId !== previousFileIdRef.current) {
            setIsDialogOpen(true);
            setCroppedAreaPixels(null);
            setZoom(1);
        }
        previousFileIdRef.current = fileId;
    }, [fileId]);

    return (
        <div className="flex flex-col gap-4 max-w-2xl">
            {finalImageUrl ? (
                <div className="relative w-full aspect-[3/2] border border-border bg-muted overflow-hidden rounded-md">
                    <img
                        src={finalImageUrl}
                        alt="Cover preview"
                        className="w-full h-full object-contain"
                    />
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={handleRemoveFinalImage}
                        className="absolute top-2 right-2"
                    >
                        <XIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={openFileDialog}
                        className="absolute bottom-2 right-2"
                    >
                        Replace Image
                    </Button>
                </div>
            ) : (
                <button
                    type="button"
                    className="w-full aspect-[3/2] flex flex-col items-center justify-center border-2 border-dashed border-border bg-muted p-8 text-center transition-colors hover:bg-accent/50 data-[dragging=true]:bg-accent/50 rounded-md"
                    onClick={openFileDialog}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    data-dragging={isDragging || undefined}
                >
                    <div className="flex flex-col items-center gap-2">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                            Click to upload or drag and drop
                        </span>
                        <span className="text-xs text-muted-foreground">
                            Image will be cropped to 3:2 ratio • Max 4MB
                        </span>
                    </div>
                </button>
            )}

            <input
                {...getInputProps()}
                className="sr-only"
                aria-label="Upload cover image"
                tabIndex={-1}
            />

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="gap-0 p-0 sm:max-w-3xl *:[button]:hidden">
                    <DialogDescription className="sr-only">
                        Crop cover image dialog
                    </DialogDescription>
                    <DialogHeader className="contents space-y-0 text-left">
                        <DialogTitle className="flex items-center justify-between border-b p-4 text-base">
                            <div className="flex items-center gap-2">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="-my-1 opacity-60"
                                    onClick={() => setIsDialogOpen(false)}
                                    aria-label="Cancel"
                                >
                                    <ArrowLeftIcon aria-hidden="true" />
                                </Button>
                                <span>Crop Cover Image (3:2 ratio)</span>
                            </div>
                            <Button
                                className="-my-1"
                                onClick={handleApply}
                                disabled={!previewUrl}
                                autoFocus
                            >
                                Apply
                            </Button>
                        </DialogTitle>
                    </DialogHeader>
                    {previewUrl && (
                        <Cropper
                            className="h-96 sm:h-120"
                            image={previewUrl}
                            zoom={zoom}
                            onCropChange={handleCropChange}
                            onZoomChange={setZoom}
                        >
                            <CropperDescription />
                            <CropperImage />
                            <CropperCropArea />
                        </Cropper>
                    )}
                    <DialogFooter className="border-t px-4 py-6">
                        <div className="mx-auto flex w-full max-w-80 items-center gap-4">
                            <ZoomOutIcon
                                className="shrink-0 opacity-60"
                                size={16}
                                aria-hidden="true"
                            />
                            <Slider
                                defaultValue={[1]}
                                value={[zoom]}
                                min={1}
                                max={3}
                                step={0.1}
                                onValueChange={(value) => setZoom(value[0])}
                                aria-label="Zoom slider"
                            />
                            <ZoomInIcon
                                className="shrink-0 opacity-60"
                                size={16}
                                aria-hidden="true"
                            />
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
