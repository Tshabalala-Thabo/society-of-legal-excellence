import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/lib/models/Blog";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | Society of Legal Excellence",
    description: "Read our latest articles, huge insights, and legal updates.",
};

async function getBlogs() {
    try {
        await connectDB();
        // Fetch only published blogs, sorted by newest first
        const title = await Blog.find({ published: true }).sort({ createdAt: -1 });
        // Serialize to plain objects to avoid Next.js serialization warnings with Mongoose documents
        return JSON.parse(JSON.stringify(title));
    } catch (error) {
        console.error("Failed to fetch blogs:", error);
        return [];
    }
}

export default async function BlogPage() {
    const blogs = await getBlogs();

    return (
        <main className="flex flex-col min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <div className="relative flex flex-col md:flex-row justify-center md:justify-end items-center overflow-hidden h-[450px] w-full">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/marble-building-3.webp"
                        alt="Hero Background"
                        fill
                        className="object-cover object-top"
                        priority
                    />
                    <div
                        className="absolute inset-0 z-10"
                        style={{
                            background:
                                "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.4))",
                        }}
                    ></div>
                </div>

                {/* Hero Content */}
                <div className="container flex justify-center md:justify-end items-center mx-auto px-4 sm:px-6 py-4">
                    <div className="relative z-20 w-full sm:w-8/12 md:w-6/12 lg:w-5/12 flex flex-col h-full text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-8 font-roboto">
                            Insights Shaping the
                            <br />
                            <span className="text-primary">Future of Law</span>
                        </h1>
                        <p className="text-sm sm:text-base mb-4">
                            Expert perspectives, updates, and stories from the legal community
                        </p>
                    </div>
                </div>
            </div>

            <section className="flex-grow container mx-auto px-4 py-12 lg:py-16">

                {blogs.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground text-lg">No posts found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-8">
                        {blogs.map((blog: any) => {
                            const date = new Date(blog.publishedAt || blog.createdAt);
                            const day = format(date, "dd");
                            const month = format(date, "MMM");

                            return (
                                <Link
                                    href={`/blog/${blog.slug}`}
                                    key={blog._id}
                                    className="relative flex flex-col bg-[#F5F5F3] hover:bg-[#ebebeb] transition-colors group h-full overflow-hidden"
                                >
                                    {/* Cover Image */}
                                    {blog.coverImage && (
                                        <div className="relative w-full aspect-[3/2] overflow-hidden">
                                            {/* Using regular img tag to avoid domain configuration issues for arbitrary URLs */}
                                            <img
                                                src={blog.coverImage}
                                                alt={blog.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    )}

                                    <div className="flex flex-col p-5 flex-grow">
                                        {/* Content */}
                                        <div className="flex flex-col gap-3 w-full">
                                            <span className="text-sm text-muted-foreground font-semibold tracking-wide">
                                                {format(date, "d MMMM yyyy")}
                                            </span>
                                            <h3 className="text-xl font-bold text-[#2a2a2a] group-hover:text-primary transition-colors leading-tight line-clamp-2">
                                                {blog.title}
                                            </h3>
                                            <div className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                                                {blog.content?.replace(/<[^>]*>/g, '').substring(0, 120)}...
                                            </div>
                                            <div className="mt-auto pt-4 text-primary font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                                Read More &rarr;
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </section>

            <Footer />
        </main>
    );
}
