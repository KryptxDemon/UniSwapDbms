import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GoogleIcon } from '@/components/ui/google-icon';
import backpackIcon from '@/assets/icons/backpack-icon.png';
import { auth, googleProvider } from '@/lib/firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  sendEmailVerification,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { useToast } from '@/components/ui/use-toast';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Debug Firebase initialization
      if (!auth) {
        console.error('Firebase auth is not initialized');
        toast({
          variant: "destructive",
          title: "Initialization Error",
          description: "Authentication service is not initialized. Please try again."
        });
        return;
      }

      // Check if Firebase is properly configured
      if (!import.meta.env.VITE_FIREBASE_API_KEY) {
        console.error('Firebase API key is missing');
        toast({
          variant: "destructive",
          title: "Configuration Error",
          description: "Firebase is not properly configured. Please set up Firebase first."
        });
        return;
      }

      // Attempt to sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user) {
        throw new Error("No user data received");
      }

      // Send verification email if not verified
      if (!user.emailVerified) {
        await sendEmailVerification(user);
        toast({
          title: "Verification Required",
          description: "Please check your email to verify your account. Check your spam folder if you don't see it.",
        });
        return;
      }

      // Only proceed if email is verified
      if (user.emailVerified) {
        // Get persistent profile data if exists
        const persistentData = JSON.parse(localStorage.getItem('persistentProfile') || '{}');
        
        // Save user info to localStorage, preserving existing data
        const userData = {
          id: user.uid,
          email: user.email,
          name: persistentData.name || user.displayName || email.split('@')[0],
          studentId: persistentData.studentId || '', // Preserve student ID
          phoneNumber: persistentData.phoneNumber || '',
          phoneNumbers: persistentData.phoneNumbers || { primary: '', secondary: '' },
          avatar: persistentData.avatar || '👤',
          role: 'student',
          uid: user.uid,
          emailVerified: true
        };
        
        localStorage.setItem('user', JSON.stringify(userData));

        toast({
          title: "Success!",
          description: "Successfully signed in",
        });

        navigate('/');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle specific Firebase auth errors
      let errorMessage = "Failed to sign in. Please check your credentials.";
      
      switch (error.code) {
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = "Invalid email or password. Please check your credentials or sign up if you don't have an account.";
          break;
        case 'auth/invalid-email':
          errorMessage = "Please enter a valid email address.";
          break;
        case 'auth/user-disabled':
          errorMessage = "This account has been disabled. Please contact support.";
          break;
        case 'auth/too-many-requests':
          errorMessage = "Account temporarily locked due to too many failed attempts. Please wait for a few minutes or reset your password.";
          // Add password reset option
          toast({
            title: "Account Temporarily Locked",
            description: "You can:",
            action: (
              <div className="mt-2 space-y-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate('/signup')}
                >
                  Sign up with a different email
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    // Use Google sign in as an alternative
                    const googleBtn = document.querySelector('[data-google-signin]') as HTMLButtonElement;
                    if (googleBtn) googleBtn.click();
                  }}
                >
                  Try Google Sign In
                </Button>
              </div>
            ),
          });
          break;
      }

      toast({
        variant: "destructive",
        title: "Login Failed",
        description: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="card-pixel w-full max-w-md">
        <div className="text-center mb-8">
          <div className="float-animation mx-auto mb-4 w-20 h-20">
            <img 
              src={backpackIcon} 
              alt="UniSwap Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back!</h1>
          <p className="text-muted-foreground">Sign in to continue swapping</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-cute pl-10"
                placeholder="your.email@university.edu"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-cute pl-10"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <Button type="submit" className="btn-primary w-full" disabled={isLoading}>
            <LogIn size={18} className="mr-2" />
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="mt-2 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link to="/signup" className="text-primary hover:underline">
              Sign up here
            </Link>
          </div>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

          <Button
          type="button"
          variant="outline"
          className="w-full bg-white hover:bg-gray-50 text-black border border-gray-300 hover:border-gray-400"
          disabled={isLoading}
          data-google-signin
          onClick={async () => {
            try {
              setIsLoading(true);
              
              // Check if Firebase is properly configured
              if (!import.meta.env.VITE_FIREBASE_API_KEY) {
                toast({
                  variant: "destructive",
                  title: "Configuration Error",
                  description: "Firebase is not properly configured. Please set up Firebase first."
                });
                return;
              }
              
              // Attempt Firebase Google Sign In
              const result = await signInWithPopup(auth, googleProvider);
              
              if (!result.user) {
                throw new Error("No user data received from Google");
              }
              
              const user = result.user;

              // Send verification email if not verified
              if (!user.emailVerified) {
                await sendEmailVerification(user);
                toast({
                  title: "Verification Email Sent",
                  description: "Please check your email to verify your account. Check your spam folder if you don't see it.",
                });
                return;
              }
              
              // Only proceed if email is verified
              if (user.emailVerified) {
                // Get persistent profile data if exists
                const persistentData = JSON.parse(localStorage.getItem('persistentProfile') || '{}');
                
                // Save user info to localStorage, preserving existing data
                const userData = {
                  id: user.uid,
                  email: user.email,
                  name: persistentData.name || user.displayName || 'Student User',
                  studentId: persistentData.studentId || '', // Preserve student ID
                  phoneNumber: persistentData.phoneNumber || '',
                  phoneNumbers: persistentData.phoneNumbers || { primary: '', secondary: '' },
                  avatar: persistentData.avatar || user.photoURL || '👤',
                  role: 'student',
                  uid: user.uid,
                  emailVerified: true
                };
                
                localStorage.setItem('user', JSON.stringify(userData));

                toast({
                  title: "Success!",
                  description: "Successfully signed in with Google",
                });

                navigate('/');
              } else {
                toast({
                  title: "Email Verification Required",
                  description: "Please verify your email before signing in. Check your inbox for the verification link.",
                });
              }
            } catch (error: any) {
              console.error('Google Sign In Error:', error);
              
              // Handle specific Firebase errors
              let errorMessage = "Failed to sign in with Google";
              
              if (error.code === 'auth/popup-blocked') {
                errorMessage = "Popup was blocked. Please allow popups for this site.";
              } else if (error.code === 'auth/cancelled-popup-request') {
                errorMessage = "Sign in was cancelled.";
              } else if (error.code === 'auth/unauthorized-domain') {
                errorMessage = "This domain is not authorized for Google Sign In. Please add it to Firebase Console.";
              }
              
              toast({
                variant: "destructive",
                title: "Error signing in",
                description: errorMessage
              });
            } finally {
              setIsLoading(false);
            }
          }}
        >
          <GoogleIcon />
          {isLoading ? "Signing in..." : "Sign in with Google"}
        </Button>        <div className="mt-6 text-center">
          <p className="text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};