"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Coffee, Copy, Check } from "lucide-react";

interface BankDetails {
    bank: string;
    accountHolder: string;
    accountNumber: string;
    accountType: string;
    branch: string;
    branchCode: string;
    electronicBranchCode: string;
    swiftAddress: string;
    email: string;
    npo: string;
    npc: string;
}

const bankDetails = {
    bank: "FNB",
    accountHolder: "Society of Legal Excellence",
    accountNumber: "1234567890",
    accountType: "Cheque",
    branch: "Sandton",
    branchCode: "250655",
    electronicBranchCode: "250655",
    swiftAddress: "FIRNZAJJ",
    email: "info@societyoflegalexcellence.org",
    npo: "123-456 NPO",
    npc: "2020/123456/08",
};

interface DonationDialogProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export default function DonationDialog({ isOpen, setIsOpen }: DonationDialogProps) {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const copyToClipboard = async (value: string, label: string) => {
        try {
            await navigator.clipboard.writeText(value);
            setCopiedField(label);
            setTimeout(() => setCopiedField(null), 2000);
        } catch (error) {
            console.error("Failed to copy: ", error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-[calc(100vw-40px)] sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                <DialogHeader className="">
                    <DialogTitle className="flex justify-center md:justify-start items-center gap-2 text-2xl">
                        <Coffee className="h-6 w-6 text-amber-600" />
                        Donation Information
                    </DialogTitle>
                    <DialogDescription className="text-center md:text-left">
                        Thank you for supporting the Society of Legal Excellence
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4 overflow-auto">
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg border-b pb-2">Banking Details</h3>

                        <div className="grid gap-3">
                            {[
                                { label: "Bank", value: bankDetails.bank },
                                { label: "Account Holder", value: bankDetails.accountHolder },
                                { label: "Account Number", value: bankDetails.accountNumber },
                                { label: "Account Type", value: bankDetails.accountType },
                                { label: "Branch", value: bankDetails.branch },
                                { label: "Branch Code", value: bankDetails.branchCode },
                                { label: "Branch Code (Electronic Payment)", value: bankDetails.electronicBranchCode },
                                { label: "SWIFT Address", value: bankDetails.swiftAddress },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-sm text-muted-foreground">{item.label}</span>
                                        <span className="font-mono font-medium">{item.value}</span>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => copyToClipboard(item.value, item.label)}
                                        className="shrink-0"
                                    >
                                        {copiedField === item.label ? (
                                            <Check className="h-4 w-4 text-green-600" />
                                        ) : (
                                            <Copy className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900">
                        <p className="text-sm text-center text-muted-foreground">
                            Your support helps us make a difference in the legal community. Thank you for your generosity!
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
