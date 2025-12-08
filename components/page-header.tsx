'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    action?: ReactNode;
    showBackButton?: boolean;
}

export default function PageHeader({ title, subtitle, action, showBackButton = false }: PageHeaderProps) {
    const router = useRouter();

    return (
        <div className="mb-8">
            {showBackButton && (
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">{title}</h1>
                    {subtitle && (
                        <p className="text-muted-foreground mt-2">{subtitle}</p>
                    )}
                </div>
                {action && (
                    <div className="flex-shrink-0">
                        {action}
                    </div>
                )}
            </div>
        </div>
    );
}
