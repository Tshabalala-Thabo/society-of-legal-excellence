import sharp from 'sharp';

export async function optimizeImage(
    buffer: Buffer,
    maxWidth: number = 1920,
    maxHeight: number = 1080
): Promise<Buffer> {
    try {
        return await sharp(buffer)
            .resize(maxWidth, maxHeight, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .webp({ quality: 75 })
            .toBuffer();
    } catch (error) {
        console.error('Error optimizing image:', error);
        throw new Error('Failed to optimize image');
    }
}

export async function optimizeBlogCoverImage(buffer: Buffer): Promise<Buffer> {
    // For blog covers, we already have 1200x800 from cropping
    // Just convert to WebP and optimize
    return await sharp(buffer)
        .webp({ quality: 80 })
        .toBuffer();
}
