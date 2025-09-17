import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Package } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const PostItem: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    condition: '',
    category: '',
    location: '',
    images: '',
  });
  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock post creation
    console.log('Creating item post:', formData);
    navigate('/');
  };

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <Layout user={user}>
      <div className="flex items-center gap-4 mb-6">
        <Link to="/post" className="p-2 rounded-xl hover:bg-muted transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Post an Item</h1>
          <p className="text-muted-foreground font-medium">Share something amazing</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card-pixel">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium">Item Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="input-cute mt-1"
                placeholder="e.g., Calculus Textbook, Gaming Laptop..."
                required
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="input-cute mt-1 min-h-[100px]"
                placeholder="Describe your item in detail..."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Type *</Label>
                <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
                  <SelectTrigger className="input-cute mt-1">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="donate">Donate (Free)</SelectItem>
                    <SelectItem value="swap">Swap (Trade)</SelectItem>
                    <SelectItem value="exchange">Exchange (Sell)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Condition *</Label>
                <Select value={formData.condition} onValueChange={(value) => handleChange('condition', value)}>
                  <SelectTrigger className="input-cute mt-1">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                  <SelectTrigger className="input-cute mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="textbooks">Textbooks</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="supplies">Supplies</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location" className="text-sm font-medium">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="input-cute mt-1"
                  placeholder="e.g., Engineering Building"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="images" className="text-sm font-medium">Image URLs (Optional)</Label>
              <div className="mt-1">
                <Input
                  id="images"
                  value={formData.images}
                  onChange={(e) => handleChange('images', e.target.value)}
                  className="input-cute"
                  placeholder="Comma-separated image URLs"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Separate multiple URLs with commas
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Link to="/post" className="flex-1">
            <Button type="button" variant="outline" className="w-full">
              Cancel
            </Button>
          </Link>
          <Button type="submit" className="btn-primary flex-1">
            <Package size={18} className="mr-2" />
            Post Item
          </Button>
        </div>
      </form>

      <div className="mt-6 p-4 rounded-xl bg-accent/20">
        <h4 className="font-semibold text-foreground mb-2">📝 Posting Guidelines</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Be honest about the condition</li>
          <li>• Include clear, well-lit photos</li>
          <li>• Write detailed descriptions</li>
          <li>• Respond to inquiries promptly</li>
          <li>• Follow university policies</li>
        </ul>
      </div>
    </Layout>
  );
};