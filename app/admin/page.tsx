import { connectDB } from '@/lib/mongodb';
import { Blog } from '@/lib/models/Blog';
import { Subscriber } from '@/lib/models/Subscriber';
import { Newsletter } from '@/lib/models/Newsletter';
import Link from 'next/link';

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to the SLE Admin Portal</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.link}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex items-center">
              <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl`}>
                {card.value}
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{card.title}</h3>
                <p className="text-sm text-gray-600">{card.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/admin/blogs/create"
              className="block w-full text-left px-4 py-3 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition"
            >
              ✏️ Create New Blog Post
            </Link>
            <Link
              href="/admin/newsletters/create"
              className="block w-full text-left px-4 py-3 bg-purple-50 text-purple-700 rounded-md hover:bg-purple-100 transition"
            >
              📧 Send Newsletter
            </Link>
            <Link
              href="/admin/subscribers"
              className="block w-full text-left px-4 py-3 bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition"
            >
              👥 View Subscribers
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="text-gray-600 text-sm">
            <p>No recent activity to display.</p>
          </div>
        </div>
      </div>
    </div>
  );
}