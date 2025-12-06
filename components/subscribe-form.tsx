'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ReusableModal } from '@/components/reusable-modal';

export default function SubscribeForm() {
    const [email, setEmail] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSubscribeRange = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Please enter a valid email address.',
            });
            return;
        }
        setIsModalOpen(true);
    };

    const confirmSubscription = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/subscribers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                toast({
                    title: 'Success!',
                    description: data.message,
                });
                setEmail('');
                setIsModalOpen(false);
            } else if (res.status === 409) {
                toast({
                    title: 'Already Subscribed',
                    description: data.message,
                    variant: 'default', // Or maybe a warning color if available, but default is fine
                });
                setIsModalOpen(false);
            } else {
                throw new Error(data.message || 'Something went wrong');
            }
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.message || 'Failed to subscribe. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubscribeRange} className="mt-4 w-full max-w-md flex items-center rounded-md border border-gray-300 overflow-hidden focus-within:border-black focus-within:ring-2 focus-within:ring-black transition-all">
                <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="outline"
                    className="border-0 rounded-none text-black px-3 sm:px-4 py-2 hover:bg-black hover:text-white text-sm sm:text-base whitespace-nowrap"
                >
                    Subscribe
                </Button>
            </form>

            <ReusableModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Confirm Subscription"
                description={`Are you sure you want to subscribe with ${email}? You will receive updates and news from us.`}
                primaryAction={{
                    label: "Yes, Subscribe",
                    onClick: confirmSubscription,
                    loading: isLoading,
                }}
                secondaryAction={{
                    label: "Cancel",
                    onClick: () => setIsModalOpen(false),
                    disabled: isLoading,
                }}
            />
        </>
    );
}
