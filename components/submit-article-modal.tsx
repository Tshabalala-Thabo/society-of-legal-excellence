"use client"

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Send, FileText } from "lucide-react";

interface SubmitArticleModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const SubmitArticleModal = ({ open, onOpenChange }: SubmitArticleModalProps) => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        authorName: "",
        email: "",
        articleTitle: "",
        articleContent: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/article-submissions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit article');
            }

            toast({
                title: "Article Submitted!",
                description:
                    "Thank you for your contribution. Our team will review your article and get back to you soon.",
            });

            setFormData({
                authorName: "",
                email: "",
                articleTitle: "",
                articleContent: "",
            });
            onOpenChange(false);
        } catch (error) {
            toast({
                title: "Submission Failed",
                description: error instanceof Error ? error.message : "An error occurred. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100vw-40px)] sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-sm">
                            <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <DialogTitle className="font-heading text-2xl text-foreground">
                            Submit Your Article
                        </DialogTitle>
                    </div>
                    <DialogDescription className="text-muted-foreground">
                        Share your legal insights with our community. Your article will be
                        reviewed by our editorial team and published on our blog.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5 mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="authorName" className="text-foreground font-medium">
                                Full Name
                            </Label>
                            <Input
                                id="authorName"
                                name="authorName"
                                placeholder="Your full name"
                                value={formData.authorName}
                                onChange={handleChange}
                                required
                                className="bg-card border-border focus:ring-primary"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-foreground font-medium">
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="your@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="bg-card border-border focus:ring-primary"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="articleTitle" className="text-foreground font-medium">
                            Article Title
                        </Label>
                        <Input
                            id="articleTitle"
                            name="articleTitle"
                            placeholder="Enter a compelling title for your article"
                            value={formData.articleTitle}
                            onChange={handleChange}
                            required
                            className="bg-card border-border focus:ring-primary"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="articleContent" className="text-foreground font-medium">
                            Article Content
                        </Label>
                        <Textarea
                            id="articleContent"
                            name="articleContent"
                            placeholder="Write your article here. Include your legal insights, analysis, and any relevant references..."
                            value={formData.articleContent}
                            onChange={handleChange}
                            required
                            rows={8}
                            className="bg-card border-border focus:ring-primary resize-none"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <Button
                        variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button variant="default" disabled={isSubmitting}>
                            {isSubmitting ? (
                                "Submitting..."
                            ) : (
                                <>
                                    <Send className="h-4 w-4" />
                                    Submit Article
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default SubmitArticleModal;
