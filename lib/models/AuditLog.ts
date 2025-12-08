import mongoose from 'mongoose';

/**
 * Audit Log Schema
 * Tracks all CRUD operations performed by admin users in the system
 * Used for compliance, debugging, and displaying activity history in the admin UI
 */
const auditLogSchema = new mongoose.Schema({
    /**
     * Timestamp when the action occurred
     * Used for sorting and filtering logs by date range
     * Indexed for performance on time-based queries
     */
    timestamp: {
        type: Date,
        required: true,
        default: Date.now,
        index: true
    },

    /**
     * ID of the user who performed the action
     * References the User collection
     * Indexed for querying all actions by a specific user
     */
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },

    /**
     * Email address of the user who performed the action
     * Stored for quick reference without needing to populate user data
     * Useful for displaying in UI and generating reports
     */
    userEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },

    /**
     * Type of action performed (e.g., CREATE, UPDATE, DELETE, SEND)
     * Standardized action verbs for consistency
     * Indexed for filtering logs by action type
     */
    action: {
        type: String,
        required: true,
        enum: [
            'CREATE', 'UPDATE', 'DELETE', 'VIEW',
            'PUBLISH', 'UNPUBLISH', 'SCHEDULE',
            'SEND', 'TEST_SEND', 'CANCEL_SEND',
            'SUSPEND', 'ACTIVATE', 'ROLE_CHANGE',
            'PASSWORD_RESET', 'IMPORT_BULK', 'EXPORT',
            'UPDATE_CONFIG', 'UPDATE_PERMISSIONS'
        ],
        index: true
    },

    /**
     * Human-readable description of the action
     * Displayed in UI trail logs and reports
     * Examples: "Published blog post 'Getting Started'", "Sent newsletter to 1,250 subscribers"
     * Should be concise and include key details like resource name/title
     */
    actionDescription: {
        type: String,
        required: true,
        trim: true
    },

    /**
     * Type of resource being acted upon (e.g., blog_post, newsletter, user)
     * Used to categorize and filter logs by resource type
     * Indexed for querying all actions on a specific resource type
     */
    resourceType: {
        type: String,
        required: true,
        enum: [
            'blog_post', 'newsletter', 'user', 'admin',
            'subscriber', 'category', 'tag', 'settings',
            'media', 'comment'
        ],
        index: true
    },

    /**
     * ID of the specific resource being acted upon
     * Can reference different collections based on resource_type
     * Indexed for querying all actions on a specific resource
     * Stored as String to accommodate different ID formats
     */
    resourceId: {
        type: String,
        required: true,
        index: true
    },

    /**
     * Status of the action execution
     * - success: Action completed successfully
     * - failed: Action failed to complete
     * - pending: Action is scheduled/queued (async operations)
     * - partial: Bulk operation with some failures
     * Used for filtering failed operations and monitoring system health
     */
    status: {
        type: String,
        required: true,
        enum: ['success', 'failed', 'pending', 'partial'],
        default: 'success',
        index: true
    },

    /**
     * Error message if action failed
     * Null for successful operations
     * Contains technical or user-friendly error details
     * Used for debugging and displaying error information in UI
     */
    errorMessage: {
        type: String,
        default: null,
        trim: true
    },

    /**
     * Object containing before/after values for UPDATE actions
     * Structure: { field_name: { before: value, after: value } }
     * Example: { title: { before: "Old", after: "New" }, status: { before: "draft", after: "published" } }
     * Null for non-update actions like CREATE or DELETE
     * Allows tracking of what specifically changed in an update
     */
    changes: {
        type: mongoose.Schema.Types.Mixed,
        default: null
    },

    /**
     * Additional contextual information about the action
     * Flexible object for storing action-specific data
     * Examples:
     * - { recipient_count: 1250, delivery_method: "immediate" } for newsletter sends
     * - { bulk_count: 500, filename: "subscribers.csv" } for imports
     * - { scheduled_time: "2025-11-25T09:00:00Z" } for scheduled actions
     */
    metadata: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },

    /**
     * Session identifier to group related actions
     * Optional field for tracking actions within the same user session
     * Useful for understanding action sequences and user workflows
     */
    sessionId: {
        type: String,
        default: null,
        trim: true
    }
}, {
    // Add createdAt and updatedAt timestamps automatically
    timestamps: true,

    // Collection name in MongoDB
    collection: 'audit_logs'
});

/**
 * Compound indexes for common query patterns
 */

// Query logs for a specific resource (e.g., all changes to a blog post)
auditLogSchema.index({ resourceType: 1, resourceId: 1, timestamp: -1 });

// Query logs by user within a time range
auditLogSchema.index({ userId: 1, timestamp: -1 });

// Query logs by action type and status (e.g., all failed DELETE operations)
auditLogSchema.index({ action: 1, status: 1, timestamp: -1 });

/**
 * Static method to create a new audit log entry
 * Simplifies log creation with default values
 */
auditLogSchema.statics.createLog = async function (logData) {
    try {
        const log = new this(logData);
        await log.save();
        return log;
    } catch (error) {
        console.error('Failed to create audit log:', error);
        // Don't throw - logging should never break the main operation
        return null;
    }
};

export const AuditLog = mongoose.models.AuditLog || mongoose.model('AuditLog', auditLogSchema);
