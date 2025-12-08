'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/admin-sidebar';
import AdminHeader from '@/components/admin-header';

export default function AdminLayoutClient({
    children,
    user,
}: {
    children: React.ReactNode;
    user: any;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background flex">
            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <AdminSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="flex-1 md:ml-64 flex flex-col min-h-screen transition-all duration-300">
                <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} user={user} />
                <main className="flex-1 p-4 md:p-8 w-full mx-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
