import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package, Clock, CheckCircle, XCircle, MessageCircle } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for borrow history
const mockBorrowHistory = [
  {
    id: "1",
    itemName: "Chemistry Lab Manual",
    ownerName: "Sarah Wilson",
    type: "borrowed",
    borrowDate: "2024-01-15T10:00:00Z",
    returnDate: "2024-01-22T10:00:00Z",
    status: "returned",
    location: "Chemistry Building",
    condition: "good",
  },
  {
    id: "2",
    itemName: "Scientific Calculator",
    ownerName: "Mike Johnson",
    type: "borrowed",
    borrowDate: "2024-01-20T14:00:00Z",
    returnDate: null,
    status: "active",
    location: "Math Building",
    condition: "excellent",
  },
  {
    id: "3",
    itemName: "Programming Textbook",
    ownerName: "Alex Chen",
    type: "requested",
    requestDate: "2024-01-25T09:00:00Z",
    status: "pending",
    location: "CS Building",
    condition: "good",
  },
];

const mockLentHistory = [
  {
    id: "1",
    itemName: "Physics Textbook",
    borrowerName: "Emma Davis",
    type: "lent",
    lentDate: "2024-01-18T11:00:00Z",
    returnDate: null,
    status: "active",
    location: "Science Building",
    condition: "good",
  },
  {
    id: "2",
    itemName: "Desk Lamp",
    borrowerName: "Tom Brown",
    type: "lent",
    lentDate: "2024-01-10T15:00:00Z",
    returnDate: "2024-01-17T15:00:00Z",
    status: "returned",
    location: "Dorm Building",
    condition: "fair",
  },
];

export const BorrowHistory: React.FC = () => {
  const [activeTab, setActiveTab] = useState("borrowed");
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "returned":
        return <CheckCircle className="text-green-500" size={20} />;
      case "active":
        return <Clock className="text-blue-500" size={20} />;
      case "pending":
        return <Clock className="text-yellow-500" size={20} />;
      case "cancelled":
        return <XCircle className="text-red-500" size={20} />;
      default:
        return <Clock className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "returned":
        return "text-green-700 bg-green-100";
      case "active":
        return "text-blue-700 bg-blue-100";
      case "pending":
        return "text-yellow-700 bg-yellow-100";
      case "cancelled":
        return "text-red-700 bg-red-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  return (
    <Layout user={user}>
      <div className="flex items-center gap-4 mb-6">
        <Link to="/profile" className="p-2 rounded-xl hover:bg-muted transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Borrow History</h1>
          <p className="text-muted-foreground font-medium">Track your exchanges</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 max-w-md">
          <TabsTrigger value="borrowed">
            Borrowed ({mockBorrowHistory.length})
          </TabsTrigger>
          <TabsTrigger value="lent">
            Lent ({mockLentHistory.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="borrowed" className="space-y-6">
          {mockBorrowHistory.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-lg">
              <Package className="mx-auto mb-4 text-muted-foreground" size={48} />
              <p className="text-muted-foreground mb-6 text-lg">No borrow history yet</p>
              <Link to="/">
                <Button className="btn-primary">Browse Items</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {mockBorrowHistory.map((item) => (
                <div key={item.id} className="card-pixel">
                  <div className="flex items-start gap-6">
                    <div className="w-24 h-24 rounded-xl bg-muted flex-shrink-0 flex items-center justify-center">
                      <span className="text-2xl">📚</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground text-lg mb-1">{item.itemName}</h3>
                          <p className="text-muted-foreground">From {item.ownerName}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(item.status)}
                          <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">
                            {item.type === 'requested' ? 'Requested:' : 'Borrowed:'} 
                          </span>
                          <span className="ml-1">
                            {new Date(item.borrowDate || item.requestDate).toLocaleDateString()}
                          </span>
                        </div>
                        {item.returnDate && (
                          <div>
                            <span className="font-medium">Returned:</span>
                            <span className="ml-1">{new Date(item.returnDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        <div>
                          <span className="font-medium">Location:</span>
                          <span className="ml-1">{item.location}</span>
                        </div>
                        <div>
                          <span className="font-medium">Condition:</span>
                          <span className="ml-1 capitalize">{item.condition}</span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button className="btn-secondary" size="sm">
                          <MessageCircle size={16} className="mr-2" />
                          Message Owner
                        </Button>
                        {item.status === 'active' && (
                          <Button className="btn-primary" size="sm">
                            Mark as Returned
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="lent" className="space-y-6">
          {mockLentHistory.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-lg">
              <Package className="mx-auto mb-4 text-muted-foreground" size={48} />
              <p className="text-muted-foreground mb-6 text-lg">No lending history yet</p>
              <Link to="/post">
                <Button className="btn-primary">Post an Item</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {mockLentHistory.map((item) => (
                <div key={item.id} className="card-pixel">
                  <div className="flex items-start gap-6">
                    <div className="w-24 h-24 rounded-xl bg-muted flex-shrink-0 flex items-center justify-center">
                      <span className="text-2xl">📦</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground text-lg mb-1">{item.itemName}</h3>
                          <p className="text-muted-foreground">To {item.borrowerName}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(item.status)}
                          <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">Lent:</span>
                          <span className="ml-1">{new Date(item.lentDate).toLocaleDateString()}</span>
                        </div>
                        {item.returnDate && (
                          <div>
                            <span className="font-medium">Returned:</span>
                            <span className="ml-1">{new Date(item.returnDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        <div>
                          <span className="font-medium">Location:</span>
                          <span className="ml-1">{item.location}</span>
                        </div>
                        <div>
                          <span className="font-medium">Condition:</span>
                          <span className="ml-1 capitalize">{item.condition}</span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button className="btn-secondary" size="sm">
                          <MessageCircle size={16} className="mr-2" />
                          Message Borrower
                        </Button>
                        {item.status === 'active' && (
                          <Button className="btn-primary" size="sm">
                            Mark as Returned
                          </Button>
                        )}
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