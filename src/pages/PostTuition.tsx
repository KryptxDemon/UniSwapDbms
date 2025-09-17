import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export const PostTuition: React.FC = () => {
  const [formData, setFormData] = useState({
    salary: '',
    daysPerWeek: '',
    class: '',
    subject: '',
    location: '',
    description: '',
  });
  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock tuition post creation
    console.log('Creating tuition post:', formData);
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
          <h1 className="text-3xl font-bold text-foreground">Offer Tutoring</h1>
          <p className="text-muted-foreground font-medium">Share your knowledge</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card-pixel">
          <div className="space-y-4">
            <div>
              <Label htmlFor="subject" className="text-sm font-medium">Subject *</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                className="input-cute mt-1"
                placeholder="e.g., Calculus I, Programming Fundamentals..."
                required
              />
            </div>

            <div>
              <Label htmlFor="class" className="text-sm font-medium">Class Code *</Label>
              <Input
                id="class"
                value={formData.class}
                onChange={(e) => handleChange('class', e.target.value)}
                className="input-cute mt-1"
                placeholder="e.g., MATH 101, CS 102..."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="salary" className="text-sm font-medium">Hourly Rate ($) *</Label>
                <Input
                  id="salary"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.salary}
                  onChange={(e) => handleChange('salary', e.target.value)}
                  className="input-cute mt-1"
                  placeholder="25.00"
                  required
                />
              </div>

              <div>
                <Label htmlFor="daysPerWeek" className="text-sm font-medium">Days per Week *</Label>
                <Input
                  id="daysPerWeek"
                  type="number"
                  min="1"
                  max="7"
                  value={formData.daysPerWeek}
                  onChange={(e) => handleChange('daysPerWeek', e.target.value)}
                  className="input-cute mt-1"
                  placeholder="2"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location" className="text-sm font-medium">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="input-cute mt-1"
                placeholder="e.g., Library Study Room, Online, Student Center..."
                required
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium">Description (Optional)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="input-cute mt-1 min-h-[100px]"
                placeholder="Describe your teaching experience, qualifications, teaching style..."
              />
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
            <GraduationCap size={18} className="mr-2" />
            Post Tutoring
          </Button>
        </div>
      </form>

      <div className="mt-6 p-4 rounded-xl bg-secondary/20">
        <h4 className="font-semibold text-foreground mb-2">💡 Tutoring Tips</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Set competitive but fair rates</li>
          <li>• Be clear about your availability</li>
          <li>• Highlight your qualifications</li>
          <li>• Specify preferred meeting locations</li>
          <li>• Respond to student inquiries quickly</li>
        </ul>
      </div>
    </Layout>
  );
};