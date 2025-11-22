"use client";

import { useCallback, useState } from "react";
import ReactCrop, { type Area } from "react-easy-crop";
import { cn } from "@/lib/utils";

interface CropperProps {
    image: string;
    zoom: number;
    onCropChange: (pixels: Area | null) => void;
    onZoomChange: (zoom: number) => void;
    className?: string;
    children?: React.ReactNode;
}

export function Cropper({
    image,
    zoom,
    onCropChange,
    onZoomChange,
    className,
    children,
}: CropperProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });

    const onCropComplete = useCallback(
        (_croppedArea: Area, croppedAreaPixels: Area) => {
            onCropChange(croppedAreaPixels);
        },
        [onCropChange]
    );

    return (
        <div className={cn("relative", className)}>
            <ReactCrop
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={3 / 2} // Fixed 3:2 aspect ratio
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={onZoomChange}
                objectFit="contain"
                classes={{
                    containerClassName: "!absolute !inset-0",
                    cropAreaClassName: "!border-primary",
                }}
            />
            {children}
        </div>
    );
}

export function CropperDescription() {
    return null; // Placeholder for accessibility description
}

export function CropperImage() {
    return null; // Image is handled by ReactCrop
}

export function CropperCropArea() {
    return null; // Crop area is handled by ReactCrop
}
