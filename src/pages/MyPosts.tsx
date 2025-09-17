import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package, Edit, Trash2, Eye, MessageCircle } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for user's posts
const mockUserItems = [
  {
    id: "1",
    name: "Physics Textbook",
    description: "University Physics 14th Edition - excellent condition",
    type: "swap",
    condition: "good",
    category: "textbooks",
    location: "Science Building",
    status: "available",
    createdAt: "2024-01-20T10:00:00Z",
    views: 24,
    messages: 3,
  },
  {
    id: "2",
    name: "Desk Lamp",
    description: "LED desk lamp with adjustable brightness",
    type: "donate",
    condition: "good",
    category: "furniture",
    location: "Dorm Room 204",
    status: "borrowed",
    createdAt: "2024-01-18T14:30:00Z",
    views: 12,
    messages: 1,
  },
];

const mockUserTuitions = [
  {
    id: "1",
    subject: "Calculus II",
    class: "MATH 102",
    salary: 30,
    daysPerWeek: 2,
    location: "Library Study Room",
    status: "available",
    createdAt: "2024-01-19T11:00:00Z",
    students: 2,
  },
];

export const MyPosts: React.FC = () => {
  const [activeTab, setActiveTab] = useState("items");
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "status-available";
      case "borrowed":
        return "status-borrowed";
      default:
        return "status-unavailable";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "donate":
        return "text-accent-foreground bg-accent";
      case "swap":
        return "text-secondary-foreground bg-secondary";
      case "exchange":
        return "text-primary-foreground bg-primary";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  return (
    <Layout user={user}>
      <div className="flex items-center gap-4 mb-6">
        <Link to="/profile" className="p-2 rounded-xl hover:bg-muted transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Posts</h1>
          <p className="text-muted-foreground font-medium">Manage your listings</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 max-w-md">
          <TabsTrigger value="items">
            Items ({mockUserItems.length})
          </TabsTrigger>
          <TabsTrigger value="tutoring">
            Tutoring ({mockUserTuitions.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="items" className="space-y-6">
          {mockUserItems.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-lg">
              <Package className="mx-auto mb-4 text-muted-foreground" size={48} />
              <p className="text-muted-foreground mb-6 text-lg">No items posted yet</p>
              <Link to="/post/item">
                <Button className="btn-primary">Post Your First Item</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {mockUserItems.map((item) => (
                <div key={item.id} className="card-pixel">
                  <div className="flex items-start gap-6">
                    <div className="w-24 h-24 rounded-xl bg-muted flex-shrink-0 flex items-center justify-center">
                      <span className="text-2xl">📦</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="font-semibold text-foreground text-lg">{item.name}</h3>
                        <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>

                      <p className="text-muted-foreground mb-4 line-clamp-2">{item.description}</p>

                      <div className="flex flex-wrap gap-3 mb-4">
                        <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getTypeColor(item.type)}`}>
                          {item.type}
                        </span>
                        <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-muted text-muted-foreground">
                          {item.condition}
                        </span>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <Eye size={16} />
                          <span>{item.views} views</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageCircle size={16} />
                          <span>{item.messages} messages</span>
                        </div>
                        <span>Posted {new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>

                      <div className="flex gap-3">
                        <Button className="btn-secondary" size="sm">
                          <Edit size={16} className="mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 size={16} className="mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="tutoring" className="space-y-6">
          {mockUserTuitions.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-lg">
              <span className="text-4xl mb-4 block">🎓</span>
              <p className="text-muted-foreground mb-6 text-lg">No tutoring offers yet</p>
              <Link to="/post/tuition">
                <Button className="btn-primary">Offer Tutoring</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {mockUserTuitions.map((tuition) => (
                <div key={tuition.id} className="card-pixel">
                  <div className="flex items-start gap-6">
                    <div className="w-20 h-20 rounded-xl bg-gradient-accent flex-shrink-0 flex items-center justify-center">
                      <span className="text-3xl">🎓</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground text-lg mb-1">{tuition.subject}</h3>
                          <p className="text-muted-foreground">Teaching {tuition.class}</p>
                        </div>
                        <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(tuition.status)}`}>
                          {tuition.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="text-muted-foreground">
                          <span className="font-medium">${tuition.salary}/hr</span>
                        </div>
                        <div className="text-muted-foreground">
                          <span>{tuition.daysPerWeek}x/week</span>
                        </div>
                        <div className="text-muted-foreground">
                          <span>{tuition.students} students interested</span>
                        </div>
                        <div className="text-muted-foreground">
                          <span>Posted {new Date(tuition.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button className="btn-secondary" size="sm">
                          <Edit size={16} className="mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 size={16} className="mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Layout>
  );
};