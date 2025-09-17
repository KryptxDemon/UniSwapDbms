import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, UserPlus, Heart, Package, Users, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex flex-col">
      {/* Header */}
      <header className="p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <Package className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold text-purple-800 pixel-font">UniSwap</span>
          </div>
          <div className="flex gap-3">
            <Link to="/login">
              <Button className="btn-cute-outline px-6 py-2">
                <LogIn size={18} className="mr-2" />
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="btn-cute-primary px-6 py-2">
                <UserPlus size={18} className="mr-2" />
                Join Us
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-7xl font-black text-purple-900 pixel-font leading-tight">
                Uni<span className="text-pink-500">Swap</span>
              </h1>
              <p className="text-2xl font-bold text-purple-700 pixel-font">
                🎓 The Cutest Campus Exchange! 🎓
              </p>
              <p className="text-lg text-purple-600 font-medium max-w-lg mx-auto lg:mx-0">
                Share, swap, and discover amazing items with your fellow students. 
                From textbooks to tutoring - we've got you covered! ✨
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/signup">
                <Button className="btn-cute-primary text-lg px-8 py-4 w-full sm:w-auto">
                  <Sparkles size={20} className="mr-2" />
                  Start Swapping!
                </Button>
              </Link>
              <Link to="/login">
                <Button className="btn-cute-outline text-lg px-8 py-4 w-full sm:w-auto">
                  <LogIn size={20} className="mr-2" />
                  I Have Account
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex justify-center lg:justify-start gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-black text-pink-500 pixel-font">1000+</div>
                <div className="text-sm text-purple-600 font-medium">Happy Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-purple-500 pixel-font">500+</div>
                <div className="text-sm text-purple-600 font-medium">Items Shared</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-blue-500 pixel-font">50+</div>
                <div className="text-sm text-purple-600 font-medium">Tutors Available</div>
              </div>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="relative">
            <div className="relative z-10 bg-white rounded-3xl p-8 shadow-2xl border-4 border-purple-200">
              <div className="space-y-6">
                {/* Mock Item Card */}
                <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-4 border-2 border-purple-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-xl">📚</span>
                    </div>
                    <div>
                      <div className="font-bold text-purple-800 pixel-font">Calculus Textbook</div>
                      <div className="text-sm text-purple-600">Engineering Building</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-xs font-bold pixel-font">SWAP</span>
                    <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-bold pixel-font">GOOD</span>
                  </div>
                </div>

                {/* Mock Tuition Card */}
                <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-2xl p-4 border-2 border-blue-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-green-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-xl">🎓</span>
                    </div>
                    <div>
                      <div className="font-bold text-blue-800 pixel-font">Math Tutoring</div>
                      <div className="text-sm text-blue-600">$25/hour • 2x/week</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-xs font-bold pixel-font">AVAILABLE</span>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="flex justify-center gap-4 pt-4">
                  <div className="w-8 h-8 bg-pink-300 rounded-lg flex items-center justify-center animate-bounce">
                    <Heart size={16} className="text-pink-600" />
                  </div>
                  <div className="w-8 h-8 bg-purple-300 rounded-lg flex items-center justify-center animate-bounce" style={{ animationDelay: '0.2s' }}>
                    <Package size={16} className="text-purple-600" />
                  </div>
                  <div className="w-8 h-8 bg-blue-300 rounded-lg flex items-center justify-center animate-bounce" style={{ animationDelay: '0.4s' }}>
                    <Users size={16} className="text-blue-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-pink-300 rounded-full opacity-50 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-300 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 -right-8 w-16 h-16 bg-blue-300 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-purple-900 pixel-font mb-12">
            Why Students Love UniSwap? 💕
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-pink-200 hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="text-xl font-bold text-purple-800 pixel-font mb-2">Free & Easy</h3>
              <p className="text-purple-600">Share items for free or swap with other students. No complicated processes!</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200 hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-blue-800 pixel-font mb-2">Campus Community</h3>
              <p className="text-blue-600">Connect with fellow students and build lasting friendships through sharing!</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200 hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-bold text-green-800 pixel-font mb-2">Eco-Friendly</h3>
              <p className="text-green-600">Reduce waste by giving items a second life with other students!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-purple-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Package className="text-white" size={16} />
            </div>
            <span className="text-xl font-bold pixel-font">UniSwap</span>
          </div>
          <p className="text-purple-200 pixel-font">Made with 💜 for students, by students</p>
        </div>
      </footer>
    </div>
  );
};