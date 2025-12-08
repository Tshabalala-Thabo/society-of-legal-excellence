import mongoose from 'mongoose';

const articleSubmissionSchema = new mongoose.Schema({
    authorName: { type: String, required: true },
    email: { type: String, required: true },
    articleTitle: { type: String, required: true },
    articleContent: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'approved', 'rejected'],
        default: 'pending'
    },
}, { timestamps: true });

export const ArticleSubmission = mongoose.models.ArticleSubmission || mongoose.model('ArticleSubmission', articleSubmissionSchema);
