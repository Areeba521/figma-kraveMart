import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Check } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type Screen = 'signup' | 'login' | 'otp' | 'home' | 'voice' | 'personalization';

interface LoginScreenProps {
  onNavigate: (screen: Screen) => void;
  onLogin: (phone: string) => void;
}

export function LoginScreen({ onNavigate, onLogin }: LoginScreenProps) {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    // Validate mandatory fields
    if (!emailOrPhone.trim()) {
      toast.error('Email or Phone Number is required');
      return;
    }
    if (!password.trim()) {
      toast.error('Password is required');
      return;
    }
    onLogin(emailOrPhone);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6 max-w-md mx-auto">
      {/* Logo Header */}
      <div className="w-full bg-[#FFD700] rounded-lg p-6 mb-8 relative">
        <div className="absolute top-0 left-0 w-16 h-16 bg-white rounded-br-full"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-white rounded-tl-full"></div>
        <div className="text-center py-4">
          <h1 className="text-black italic" style={{ fontSize: '2.5rem', fontFamily: 'Arial Black, sans-serif' }}>
            <span style={{ fontStyle: 'italic' }}>Krave</span>
          </h1>
          <p className="text-black tracking-wider">Mart</p>
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="flex gap-0 mb-8 w-full border-b-2 border-gray-200">
        <button
          className="flex-1 pb-2 border-b-2 border-black"
        >
          Login
        </button>
        <button
          onClick={() => onNavigate('signup')}
          className="flex-1 pb-2"
        >
          Sign Up
        </button>
      </div>

      {/* Form */}
      <div className="w-full space-y-6">
        <div className="space-y-2">
          <Label htmlFor="emailOrPhone">Email or Phone Number *</Label>
          <Input
            id="emailOrPhone"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            className="border-b-2 border-t-0 border-x-0 rounded-none border-[#FFD700] focus-visible:ring-0 focus-visible:border-[#FFD700] px-0"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password *</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-b-2 border-t-0 border-x-0 rounded-none border-[#FFD700] focus-visible:ring-0 focus-visible:border-[#FFD700] px-0"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setRememberMe(!rememberMe)}
              className={`w-6 h-6 rounded border-2 border-gray-300 flex items-center justify-center ${rememberMe ? 'bg-[#FFD700]' : 'bg-white'}`}
            >
              {rememberMe && <Check className="w-4 h-4" />}
            </button>
            <span className="text-gray-600">Remember Me</span>
          </div>
          <button className="text-[#FFD700] hover:underline">
            Forgot Password?
          </button>
        </div>

        <Button 
          onClick={handleLogin}
          className="w-full bg-white border-2 border-gray-300 text-black hover:bg-gray-50 rounded-full mt-8"
        >
          Login
        </Button>

        <p className="text-center text-gray-600">
          Don't have an Account?{' '}
          <button
            onClick={() => onNavigate('signup')}
            className="text-[#FFD700] hover:underline"
          >
            Register Here
          </button>
        </p>
      </div>
    </div>
  );
}