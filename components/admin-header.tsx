'use client';

import { useRouter } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminHeaderProps {
    onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/login');
        router.refresh();
    };

    return (
        <header className="h-[72px] bg-[#fafaf8] border-b border-[#e8e8e6] px-4 md:px-8 flex items-center justify-end sticky top-0 z-10">
            {/* Mobile View: SLE Admin Text + Burger */}
            <div className="w-full justify-between flex items-center gap-4 md:hidden">
                <span className="text-lg font-bold text-[#2a2a2a]">SLE Admin</span>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onMenuClick}
                    className="text-[#2a2a2a] hover:text-[#f6ce54]"
                >
                    <Menu size={24} />
                </Button>
            </div>

            {/* Desktop View: User Info + Logout */}
            <div className="hidden md:flex items-center space-x-4">
                <span className="text-sm text-[#2a2a2a]">Admin User</span>
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
