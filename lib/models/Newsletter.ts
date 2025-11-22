import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  content: { type: String, required: true },
  sentAt: { type: Date },
  recipientCount: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ['draft', 'sent'], 
    default: 'draft' 
  },
}, { timestamps: true });

export const Newsletter = mongoose.models.Newsletter || mongoose.model('Newsletter', newsletterSchema);