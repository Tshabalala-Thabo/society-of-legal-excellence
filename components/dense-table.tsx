'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ReactNode } from "react";

export interface DenseTableColumn<T> {
    key: string;
    header: string;
    render?: (item: T) => ReactNode;
    className?: string;
}

export interface DenseTableAction<T> {
    render: (item: T) => ReactNode;
}

interface DenseTableProps<T> {
    data: T[];
    columns: DenseTableColumn<T>[];
    actions?: DenseTableAction<T>;
    getRowKey: (item: T) => string;
}

export default function DenseTable<T extends Record<string, any>>({
    data,
    columns,
    actions,
    getRowKey,
}: DenseTableProps<T>) {
    if (data.length === 0) {
        return (
            <div className="bg-card shadow-md p-8 text-center border border-border rounded-lg">
                <p className="text-muted-foreground">No data found.</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-md">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            {columns.map((column) => (
                                <TableHead key={column.key} className="h-9 py-2">
                                    {column.header}
                                </TableHead>
                            ))}
                            {actions && (
                                <TableHead className="h-9 py-2 text-right">Actions</TableHead>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={getRowKey(item)} className="hover:bg-muted/50">
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.key}
                                        className={`py-2 ${column.className || ''}`}
                                    >
                                        {column.render
                                            ? column.render(item)
                                            : item[column.key]}
                                    </TableCell>
                                ))}
                                {actions && (
                                    <TableCell className="py-2 text-right">
                                        {actions.render(item)}
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
