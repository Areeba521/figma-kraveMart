import { useState } from 'react';
import { Button } from './ui/button';
import { ChevronLeft } from 'lucide-react';

type Screen = 'signup' | 'login' | 'otp' | 'home' | 'voice' | 'personalization';

interface OTPScreenProps {
  phoneNumber: string;
  onVerify: () => void;
  onNavigate: (screen: Screen) => void;
}

export function OTPScreen({ phoneNumber, onVerify, onNavigate }: OTPScreenProps) {
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace to focus previous input
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <button onClick={() => onNavigate('login')} className="p-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span>9:41</span>
        <div className="flex gap-1">
          <div className="w-4 h-4">📶</div>
          <div className="w-4 h-4">📶</div>
          <div className="w-4 h-4">🔋</div>
        </div>
      </div>

      <div className="flex-1 p-6">
        <h1 className="mb-2">Enter your OTP number</h1>
        <p className="text-gray-600 mb-8">
          We've sent the OTP number via sms to<br />
          {phoneNumber || '+92 33XXXXXXXX'}
        </p>

        {/* OTP Input */}
        <div className="flex gap-4 mb-12 justify-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-16 h-16 text-center border-2 border-gray-300 rounded-lg bg-gray-100"
            />
          ))}
        </div>

        <Button
          onClick={onVerify}
          className="w-full bg-white border-2 border-gray-300 text-black hover:bg-gray-50 rounded-full mb-4"
        >
          Continue
        </Button>

        <p className="text-center text-gray-600">
          Did not receive OTP?{' '}
          <button className="text-[#FFD700] hover:underline">
            Resend
          </button>
        </p>
      </div>
    </div>
  );
}