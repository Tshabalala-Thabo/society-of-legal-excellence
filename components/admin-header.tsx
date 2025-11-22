'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminHeaderProps {
    onMenuClick: () => void;
    user: any;
}

export default function AdminHeader({ onMenuClick, user }: AdminHeaderProps) {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/login');
    };

    return (
        <header className="h-[72px] bg-background border-b border-border px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center">
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden mr-2"
                    onClick={onMenuClick}
                >
                    <Menu className="h-6 w-6" />
                </Button>

                {/* Mobile Logo */}
                <div className="md:hidden flex items-center">
                    <Image
                        src="/sle_logo.png"
                        alt="SLE Logo"
                        width={32}
                        height={32}
                        className="mr-2"
                    />
                    <span className="font-bold text-lg text-foreground">SLE Admin</span>
                </div>

                <h2 className="text-xl font-semibold text-foreground hidden md:block">Admin Portal</h2>
            </div>

            {/* Desktop View: User Info + Logout */}
            <div className="hidden md:flex items-center space-x-4">
                <span className="text-sm text-foreground">{user?.name || user?.email || 'User'}</span>
                <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="text-[#757575] hover:text-[#2a2a2a]"
                >
                    Logout
                </Button>
            </div>
        </header>
    );
}
