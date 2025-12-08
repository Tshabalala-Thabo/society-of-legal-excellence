import { AuditLog } from '@/lib/models/AuditLog';
import { SessionData } from '@/lib/auth';

interface CreateAuditLogParams {
    session: SessionData;
    action: string;
    resourceType: string;
    resourceId: string;
    description: string;
    status?: 'success' | 'failed' | 'pending' | 'partial';
    error?: string;
    changes?: any;
    metadata?: any;
}

export async function createAuditLog({
    session,
    action,
    resourceType,
    resourceId,
    description,
    status = 'success',
    error = undefined,
    changes = undefined,
    metadata = {},
}: CreateAuditLogParams) {
    if (!session.user) {
        console.warn('Attempted to create audit log without user session');
        return;
    }

    try {
        // @ts-ignore - createLog is a static method we added
        await AuditLog.createLog({
            userId: session.user.id,
            userEmail: session.user.email,
            action,
            actionDescription: description,
            resourceType,
            resourceId,
            status,
            errorMessage: error,
            changes,
            metadata,
        });
    } catch (err) {
        console.error('Error creating audit log:', err);
    }
}
