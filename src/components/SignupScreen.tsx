import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';
import { useSettings } from '../contexts/SettingsContext';

type Screen = 'signup' | 'login' | 'otp' | 'home' | 'voice' | 'personalization' | 'onboarding';

interface SignupScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function SignupScreen({ onNavigate }: SignupScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setUserProfile } = useSettings();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only letters and spaces
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setName(value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPhone(value);
  };

  const handleSignup = () => {
    // Validate all mandatory fields
    if (!name.trim()) {
      toast.error('Name is required');
      return;
    }
    if (!email.trim()) {
      toast.error('Email is required');
      return;
    }
    if (!phone.trim()) {
      toast.error('Phone Number is required');
      return;
    }
    if (!password.trim()) {
      toast.error('Password is required');
      return;
    }
    if (!confirmPassword.trim()) {
      toast.error('Confirm Password is required');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    // Save user profile
    setUserProfile({ name, email, phone });
    toast.success('Account created successfully!');
    onNavigate('onboarding');
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
          onClick={() => onNavigate('login')}
          className="flex-1 pb-2"
        >
          Login
        </button>
        <button
          className="flex-1 pb-2 border-b-2 border-black"
        >
          Sign Up
        </button>
      </div>

      {/* Form */}
      <div className="w-full space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={name}
            onChange={handleNameChange}
            className="border-b-2 border-t-0 border-x-0 rounded-none border-[#FFD700] focus-visible:ring-0 focus-visible:border-[#FFD700] px-0"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-b-2 border-t-0 border-x-0 rounded-none border-[#FFD700] focus-visible:ring-0 focus-visible:border-[#FFD700] px-0"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
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

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border-b-2 border-t-0 border-x-0 rounded-none border-[#FFD700] focus-visible:ring-0 focus-visible:border-[#FFD700] px-0"
            required
          />
        </div>

        <Button 
          onClick={handleSignup}
          className="w-full bg-white border-2 border-gray-300 text-black hover:bg-gray-50 rounded-full mt-8"
        >
          Sign Up
        </Button>

        <p className="text-center text-gray-600">
          Already have an Account?{' '}
          <button
            onClick={() => onNavigate('login')}
            className="text-[#FFD700] hover:underline"
          >
            Login Here
          </button>
        </p>
      </div>
    </div>
  );
}