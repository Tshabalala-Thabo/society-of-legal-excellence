import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function NotFound() {
    return (
        <main className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow flex flex-col items-center justify-center text-center px-4 py-20 bg-[#fafaf8]">
                <h1 className="text-9xl font-bold text-primary/10 select-none font-roboto leading-none">404</h1>
                <div className="absolute flex flex-col items-center">
                    <h2 className="text-3xl font-bold mb-2 text-[#2a2a2a] font-roboto">Page Not Found</h2>
                    <p className="text-muted-foreground max-w-md mb-8 px-4 text-center">
                        Oops! The page you are looking for might have been removed or temporarily unavailable.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                        Return Home
                    </Link>
                </div>
            </div>
            <Footer />
        </main>
    )
}
