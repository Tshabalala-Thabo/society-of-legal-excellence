export interface Blog {
    _id: string;
    title: string;
    slug: string;
    content: string;
    author: string;
    coverImage?: string;
    published: boolean;
    publishedAt?: Date;
    createdBy: string;
    editedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface BlogFormData {
    title: string;
    content: string;
    author: string;
    coverImage?: string;
    published: boolean;
}

export interface CreateBlogInput {
    title: string;
    content: string;
    author: string;
    coverImage?: string;
    published: boolean;
}

export interface UpdateBlogInput extends Partial<CreateBlogInput> {
    _id: string;
}
