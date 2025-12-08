import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/lib/models/Blog";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

// Fetch blog data
async function getBlog(slug: string) {
    try {
        await connectDB();
        const blog = await Blog.findOne({ slug, published: true });
        if (!blog) return null;
        return JSON.parse(JSON.stringify(blog));
    } catch (error) {
        console.error("Failed to fetch blog:", error);
        return null;
    }
}

// Generate Metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const blog = await getBlog(params.slug);
    if (!blog) {
        return {
            title: "Blog Not Found | Society of Legal Excellence",
        };
    }
    return {
        title: `${blog.title} | Society of Legal Excellence`,
        description: blog.content?.substring(0, 160).replace(/<[^>]*>/g, '') || "Read our latest legal insights.",
    };
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
    const blog = await getBlog(params.slug);

    if (!blog) {
        notFound();
    }

    const date = new Date(blog.publishedAt || blog.createdAt);

    return (
        <main className="flex flex-col min-h-screen bg-[#fafaf8]">
            <Navbar />

            <article className="flex-grow">
                {/* Hero Section */}
                <div className="relative flex flex-col md:flex-row justify-center md:justify-end items-center overflow-hidden h-[450px] w-full">
                    <div className="absolute inset-0 z-0">
                        {blog.coverImage ? (
                            <img
                                src={blog.coverImage}
                                alt={blog.title}
                                className="w-full h-full object-cover object-center"
                            />
                        ) : (
                            <Image
                                src="/marble-building-3.webp"
                                alt="Hero Background"
                                fill
                                className="object-cover object-top"
                                priority
                            />
                        )}
                        <div
                            className="absolute inset-0 z-10"
                            style={{
                                background:
                                    "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6))",
                            }}
                        ></div>
                    </div>

                    {/* Hero Content */}
                    <div className="container flex justify-center md:justify-end items-center mx-auto px-4 sm:px-6 py-4 h-full">
                        <div className="relative z-20 w-full sm:w-8/12 md:w-6/12 lg:w-5/12 flex flex-col justify-center h-full text-white">
                            <Link
                                href="/blog"
                                className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white transition-colors mb-6 w-fit"
                            >
                                <ArrowLeft size={16} className="mr-2" />
                                Back to Blog
                            </Link>

                            <span className="text-sm font-semibold tracking-wide text-white/90 mb-2">
                                {format(date, "d MMMM yyyy")}
                            </span>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-roboto leading-tight">
                                {blog.title}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="container mx-auto px-4 max-w-3xl py-12 md:py-16">
                    <div className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:text-[#2a2a2a] prose-p:text-[#2a2a2a] prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-none">
                        {/* Render content safely. If it's HTML, use dangerouslySetInnerHTML. 
                If plain text, just render children. 
                Assuming simple text or HTML for now. 
                If needed, we can use a markdown parser later.
            */}
                        {blog.content.split('\n').map((paragraph: string, index: number) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                        {/* 
              NOTE: If the content is actually HTML from a rich text editor, 
              we should use: <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              For now, simple paragraph splitting is safer until we know the data format.
            */}
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    );
}
