import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { ArticleSubmission } from '@/lib/models/ArticleSubmission';

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();
        const { authorName, email, articleTitle, articleContent } = body;

        // Validate required fields
        if (!authorName || !email || !articleTitle || !articleContent) {
            return NextResponse.json(
                { error: 'All fields are required: authorName, email, articleTitle, articleContent' },
                { status: 400 }
            );
        }

        // Create the article submission
        const submission = await ArticleSubmission.create({
            authorName,
            email,
            articleTitle,
            articleContent,
        });

        return NextResponse.json(
            { message: 'Article submitted successfully', submission },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating article submission:', error);
        return NextResponse.json(
            { error: 'Failed to submit article' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const submissions = await ArticleSubmission.find().sort({ createdAt: -1 });

        return NextResponse.json(submissions);
    } catch (error) {
        console.error('Error fetching article submissions:', error);
        return NextResponse.json(
            { error: 'Failed to fetch submissions' },
            { status: 500 }
        );
    }
}
