import { NextRequest, NextResponse } from 'next/server';
import { UTApi } from 'uploadthing/server';
import { optimizeBlogCoverImage } from '@/lib/image-optimizer';
import { getSession } from '@/lib/auth';

const utapi = new UTApi();

export async function POST(req: NextRequest) {
    try {
        // Check authentication
        const session = await getSession();
        if (!session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get the file from the request
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Optimize the image with sharp
        const optimizedBuffer = await optimizeBlogCoverImage(buffer);

        // Generate a unique filename with folder structure
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(7);
        const filename = `blog-covers/${timestamp}-${randomString}.webp`;

        // Create a new File from the optimized buffer with the folder path in the name
        const optimizedFile = new File(
            [new Uint8Array(optimizedBuffer)],
            filename,
            { type: 'image/webp' }
        );

        // Upload to UploadThing
        const uploadedFiles = await utapi.uploadFiles(optimizedFile);

        if (!uploadedFiles || uploadedFiles.error) {
            throw new Error(uploadedFiles.error?.message || 'Failed to upload file to UploadThing');
        }

        return NextResponse.json({
            url: uploadedFiles.data?.url,
            key: uploadedFiles.data?.key,
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json(
            { error: 'Failed to upload image' },
            { status: 500 }
        );
    }
}
