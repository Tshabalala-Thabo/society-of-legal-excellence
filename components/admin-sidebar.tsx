'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { X } from 'lucide-react';

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
    const pathname = usePathname();
    const router = useRouter();

    const navItems = [
        { href: '/admin', label: 'Dashboard' },
        { href: '/admin/blogs', label: 'Blogs' },
        { href: '/admin/newsletters', label: 'Newsletters' },
        { href: '/admin/subscribers', label: 'Subscribers' },
    ];

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/login');
        router.refresh();
    };

    return (
        <aside
            className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#f5f5f3] border-r border-[#e8e8e6] 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}
        >
            <div className="h-[72px] flex items-center justify-between px-6 border-b border-[#e8e8e6]">
                <h1 className="text-xl font-bold text-[#2a2a2a]">SLE Admin</h1>
                <button
                    onClick={onClose}
                    className="md:hidden text-[#757575] hover:text-[#2a2a2a]"
                >
                    <X size={24} />
                </button>
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
                <button
                    onClick={handleLogout}
                    className="w-full text-left px-0 py-2 text-sm font-medium text-[#2a2a2a] hover:text-[#f6ce54] transition-colors"
                >
                    Logout
                </button>
            </div>
        </aside>
    );
}
