'use client';

import { ReactNode } from 'react';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ReusableModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    children?: ReactNode;
    primaryAction?: {
        label: string;
        onClick: () => void;
        variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
        loading?: boolean;
        disabled?: boolean;
    };
    secondaryAction?: {
        label: string;
        onClick: () => void;
        disabled?: boolean;
    };
    footer?: ReactNode;
}

export function ReusableModal({
    isOpen,
    onClose,
    title,
    description,
    children,
    primaryAction,
    secondaryAction,
    footer,
}: ReusableModalProps) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="w-[90%] sm:w-full rounded-lg">
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    {description && (
                        <AlertDialogDescription>
                            {description}
                        </AlertDialogDescription>
                    )}
                </AlertDialogHeader>

                {children && (
                    <div className="py-2">
                        {children}
                    </div>
                )}

                <AlertDialogFooter>
                    {footer ? (
                        footer
                    ) : (
                        <>
                            {(secondaryAction || !primaryAction) && (
                                <AlertDialogCancel
                                    onClick={secondaryAction?.onClick || onClose}
                                    disabled={secondaryAction?.disabled || primaryAction?.loading}
                                >
                                    {secondaryAction?.label || "Cancel"}
                                </AlertDialogCancel>
                            )}

                            {primaryAction && (
                                <Button
                                    variant={primaryAction.variant || "default"}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        primaryAction.onClick();
                                    }}
                                    disabled={primaryAction.loading || primaryAction.disabled}
                                >
                                    {primaryAction.loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {primaryAction.label}
                                </Button>
                            )}
                        </>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
