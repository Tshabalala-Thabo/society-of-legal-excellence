import { connectDB } from '@/lib/mongodb';
import { Blog } from '@/lib/models/Blog';
import { Subscriber } from '@/lib/models/Subscriber';
import { Newsletter } from '@/lib/models/Newsletter';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/page-header';

async function getDashboardStats() {
  await connectDB();

  const [totalBlogs, publishedBlogs, totalSubscribers, totalNewsletters] = await Promise.all([
    Blog.countDocuments(),
    Blog.countDocuments({ published: true }),
    Subscriber.countDocuments({ active: true }),
    Newsletter.countDocuments(),
  ]);

  return {
    totalBlogs,
    publishedBlogs,
    totalSubscribers,
    totalNewsletters,
  };
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const cards = [
    {
      title: 'Total Blogs',
      value: stats.totalBlogs,
      description: `${stats.publishedBlogs} published`,
      link: '/admin/blogs',
      color: 'bg-blue-500',
    },
    {
      title: 'Subscribers',
      value: stats.totalSubscribers,
      description: 'Active subscribers',
      link: '/admin/subscribers',
      color: 'bg-green-500',
    },
    {
      title: 'Newsletters',
      value: stats.totalNewsletters,
      description: 'Total sent',
      link: '/admin/newsletters',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome to the SLE Admin Portal"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.link}
            className="bg-card shadow-md p-6 hover:shadow-lg transition border border-border"
          >
            <div className="flex items-center">
              <div className={`${card.color} w-12 h-12 flex items-center justify-center text-white font-bold text-xl`}>
                {card.value}
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card shadow-md p-6 border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Button asChild variant="outline" className="w-full justify-start bg-blue-50 text-blue-700 hover:bg-blue-100 border-none h-auto py-3">
              <Link href="/admin/blogs/create">
                ✏️ Create New Blog Post
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start bg-purple-50 text-purple-700 hover:bg-purple-100 border-none h-auto py-3">
              <Link href="/admin/newsletters/create">
                📧 Send Newsletter
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start bg-green-50 text-green-700 hover:bg-green-100 border-none h-auto py-3">
              <Link href="/admin/subscribers">
                👥 View Subscribers
              </Link>
            </Button>
          </div>
        </div>

        <div className="bg-card shadow-md p-6 border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
          <div className="text-muted-foreground text-sm">
            <p>No recent activity to display.</p>
          </div>
        </div>
      </div>
    </div>
  );
}