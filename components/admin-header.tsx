'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReusableModal } from '@/components/reusable-modal';

interface AdminHeaderProps {
    onMenuClick: () => void;
    user: any;
}

export default function AdminHeader({ onMenuClick, user }: AdminHeaderProps) {
    const router = useRouter();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/login');
        } finally {
            setIsLoggingOut(false);
            setShowLogoutModal(false);
        }
    };

    return (
        <>
            <header className="h-[72px] bg-background border-b border-border px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
                <div className="flex w-full items-center justify-between">
                    {/* Mobile Logo */}
                    <div className="flex items-center">
                        <div className="md:hidden flex items-center">
                            <Image
                                src="/logo.png"
                                alt="SLE Logo"
                                width={32}
                                height={32}
                                className="mr-2"
                            />
                            <span className="font-bold text-lg text-foreground">SLE ADMIN</span>
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden mr-2"
                        onClick={onMenuClick}
                    >
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>

                {/* Desktop View: User Info + Logout */}
                <div className="hidden md:flex items-center space-x-4">
                    <span className="text-sm text-foreground">{user?.name || user?.email || 'User'}</span>
                    <Button
                        variant="ghost"
                        onClick={() => setShowLogoutModal(true)}
                        className="text-[#757575] hover:text-[#2a2a2a]"
                    >
                        Logout
                    </Button>
                </div>
            </header>

            <ReusableModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                title="Confirm Logout"
                description="Are you sure you want to log out of the admin portal?"
                primaryAction={{
                    label: "Logout",
                    onClick: handleLogout,
                    variant: "destructive",
                    loading: isLoggingOut
                }}
                secondaryAction={{
                    label: "Cancel",
                    onClick: () => setShowLogoutModal(false)
                }}
            />
        </>
    );
}
