import React from 'react';
import { Heart, Package, Calendar, StickyNote, Trash2, MessageCircle } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface WishlistItem {
  id: string;
  itemId: string;
  itemName: string;
  itemDescription: string;
  ownerName: string;
  location: string;
  type: string;
  condition: string;
  status: string;
  createdDate: string;
  notes: string;
}

export const Wishlist: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [wishlistItems, setWishlistItems] = React.useState<WishlistItem[]>([
    {
      id: '1',
      itemId: 'item-1',
      itemName: 'Gaming Laptop',
      itemDescription: 'Dell XPS 15 with RTX 3060. Perfect for CS students!',
      ownerName: 'Bob Smith',
      location: 'Computer Science Building',
      type: 'exchange',
      condition: 'good',
      status: 'available',
      createdDate: '2024-01-20T10:00:00Z',
      notes: 'Perfect for my programming projects! Need to check if it has enough RAM.',
    },
    {
      id: '2',
      itemId: 'item-2',
      itemName: 'Calculus Textbook',
      itemDescription: 'Stewart Calculus 8th Edition - barely used, great condition!',
      ownerName: 'Alice Johnson',
      location: 'Engineering Building',
      type: 'swap',
      condition: 'good',
      status: 'borrowed',
      createdDate: '2024-01-18T14:30:00Z',
      notes: 'Need this for next semester. Hope it becomes available soon.',
    },
  ]);
  const [editingNotes, setEditingNotes] = React.useState<string | null>(null);
  const [notesText, setNotesText] = React.useState('');

  const handleEditNotes = (item: WishlistItem) => {
    setEditingNotes(item.id);
    setNotesText(item.notes);
  };

  const handleSaveNotes = () => {
    if (editingNotes) {
      setWishlistItems(prev =>
        prev.map(item =>
          item.id === editingNotes ? { ...item, notes: notesText } : item
        )
      );
      setEditingNotes(null);
      setNotesText('');
    }
  };

  const handleRemoveFromWishlist = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'status-available';
      case 'borrowed':
        return 'status-borrowed';
      default:
        return 'status-unavailable';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'donate':
        return 'text-accent-foreground bg-accent';
      case 'swap':
        return 'text-secondary-foreground bg-secondary';
      case 'exchange':
        return 'text-primary-foreground bg-primary';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <Layout user={user}>
      <Header title="Wishlist" subtitle="Items you've saved" />
      
      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="mx-auto mb-4 text-muted-foreground" size={48} />
          <h3 className="text-xl font-semibold text-foreground mb-2">Your wishlist is empty</h3>
          <p className="text-muted-foreground mb-6">
            Start adding items you're interested in to see them here!
          </p>
          <div className="text-sm text-muted-foreground">
            <p>💡 Tip: Tap the heart icon on any item to add it to your wishlist</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {wishlistItems.map((item) => (
            <div key={item.id} className="card-pixel">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-xl bg-muted flex-shrink-0 flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground text-lg mb-1">{item.itemName}</h3>
                      <p className="text-muted-foreground">By {item.ownerName}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                      <button
                        onClick={() => handleRemoveFromWishlist(item.id)}
                        className="p-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-2">{item.itemDescription}</p>

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
                      <Calendar size={16} />
                      <span>Added {new Date(item.createdDate).toLocaleDateString()}</span>
                    </div>
                    <span>{item.location}</span>
                  </div>

                  {/* Notes Section */}
                  <div className="mb-4 p-3 bg-accent/10 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <StickyNote size={16} className="text-accent" />
                        <span className="font-medium text-sm">Notes</span>
                      </div>
                      <Button
                        onClick={() => handleEditNotes(item)}
                        className="btn-secondary text-xs px-3 py-1"
                      >
                        Edit
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.notes || 'No notes added yet...'}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button className="btn-secondary flex-1 max-w-32">
                      <MessageCircle size={16} className="mr-2" />
                      Message
                    </Button>
                    <Button 
                      className="btn-primary flex-1 max-w-32"
                      disabled={item.status !== 'available'}
                    >
                      Request
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Notes Dialog */}
      <Dialog open={editingNotes !== null} onOpenChange={() => setEditingNotes(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold pixel-font">
              📝 Edit Notes
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              className="input-cute min-h-[120px]"
              placeholder="Add your thoughts, questions, or reminders about this item..."
            />
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setEditingNotes(null)} variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSaveNotes} className="btn-primary flex-1">
              Save Notes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};