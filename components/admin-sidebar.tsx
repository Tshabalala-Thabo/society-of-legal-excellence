'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReusableModal } from '@/components/reusable-modal';

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const navItems = [
        { href: '/admin', label: 'Dashboard' },
        { href: '/admin/blogs', label: 'Blogs' },
        { href: '/admin/newsletters', label: 'Newsletters' },
        { href: '/admin/subscribers', label: 'Subscribers' },
    ];

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/login');
            router.refresh();
        } finally {
            setIsLoggingOut(false);
            setShowLogoutModal(false);
        }
    };

    return (
        <>
            <aside
                className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#f5f5f3] border-r border-[#e8e8e6] 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}
            >
                <div className="h-[72px] flex items-center justify-between px-6 border-b border-[#e8e8e6]">
                    <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8">
                            <Image
                                src="/logo.png"
                                alt="SLE Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h1 className="text-xl font-bold text-[#2a2a2a]">SLE ADMIN</h1>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="md:hidden text-[#757575] hover:text-[#2a2a2a]"
                    >
                        <X size={24} />
                    </Button>
                </div>

                <nav className="flex-1 py-6 overflow-y-auto">
                    <ul className="space-y-0">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={() => onClose()} // Close sidebar on mobile when link clicked
                                        className={`block px-6 py-3 text-sm font-medium transition-colors ${isActive
                                            ? 'bg-[#f6ce54] text-[#2a2a2a]'
                                            : 'text-[#2a2a2a] hover:bg-[#efefeb]'
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Logout button - Visible on mobile only as per requirement to group options */}
                <div className="p-6 border-t border-[#e8e8e6] md:hidden">
                    <Button
                        variant="ghost"
                        onClick={() => setShowLogoutModal(true)}
                        className="w-full justify-start px-0 text-[#2a2a2a] hover:text-[#f6ce54] hover:bg-transparent"
                    >
                        Logout
                    </Button>
                </div>
            </aside>

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
