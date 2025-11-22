import { connectDB } from '@/lib/mongodb';
import { Blog } from '@/lib/models/Blog';
import { Subscriber } from '@/lib/models/Subscriber';
import { Newsletter } from '@/lib/models/Newsletter';
import { AuditLog } from '@/lib/models/AuditLog';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/page-header';
import { FileText, Users, Mail, Plus, Send, Activity, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';

async function getDashboardStats() {
  await connectDB();

  const [totalBlogs, publishedBlogs, totalSubscribers, totalNewsletters, recentActivity] = await Promise.all([
    Blog.countDocuments(),
    Blog.countDocuments({ published: true }),
    Subscriber.countDocuments({ active: true }),
    Newsletter.countDocuments(),
    AuditLog.find().sort({ timestamp: -1 }).limit(5).lean(),
  ]);

  return {
    totalBlogs,
    publishedBlogs,
    totalSubscribers,
    totalNewsletters,
    recentActivity: JSON.parse(JSON.stringify(recentActivity)), // Serialize for Next.js
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
      icon: FileText,
    },
    {
      title: 'Subscribers',
      value: stats.totalSubscribers,
      description: 'Active subscribers',
      link: '/admin/subscribers',
      icon: Users,
    },
    {
      title: 'Newsletters',
      value: stats.totalNewsletters,
      description: 'Total sent',
      link: '/admin/newsletters',
      icon: Mail,
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
            className="bg-card shadow-md p-6 hover:shadow-lg transition border border-border group"
          >
            <div className="flex items-center">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center text-primary rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <card.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-foreground">{card.value}</span>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card shadow-md p-6 border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Button asChild variant="outline" className="w-full justify-start h-auto py-3 gap-3">
              <Link href="/admin/blogs/create">
                <div className="bg-primary/10 p-2 rounded-full text-primary">
                  <Plus className="h-4 w-4" />
                </div>
                Create New Blog Post
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start h-auto py-3 gap-3">
              <Link href="/admin/newsletters/create">
                <div className="bg-primary/10 p-2 rounded-full text-primary">
                  <Send className="h-4 w-4" />
                </div>
                Send Newsletter
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start h-auto py-3 gap-3">
              <Link href="/admin/subscribers">
                <div className="bg-primary/10 p-2 rounded-full text-primary">
                  <Users className="h-4 w-4" />
                </div>
                View Subscribers
              </Link>
            </Button>
          </div>
        </div>

        <div className="bg-card shadow-md p-6 border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
          {stats.recentActivity.length > 0 ? (
            <div className="space-y-4">
              {stats.recentActivity.map((log: any) => (
                <div key={log._id} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                  <div className={`mt-1 p-1.5 rounded-full ${log.status === 'failed' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'
                    }`}>
                    <Activity className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{log.actionDescription}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <span className="font-medium">{log.userEmail}</span>
                      <span>•</span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(log.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-muted-foreground text-sm flex flex-col items-center justify-center h-[200px] border-2 border-dashed border-muted rounded-lg">
              <p>No recent activity to display.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}