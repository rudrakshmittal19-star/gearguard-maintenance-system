import { useState, useRef, useEffect } from 'react';
import { Mail, Smartphone, CheckCircle, ArrowLeft } from 'lucide-react';

interface VerificationPageProps {
  email: string;
  phone: string;
  onVerify: () => void;
  onBack: () => void;
}

export function VerificationPage({ email, phone, onVerify, onBack }: VerificationPageProps) {
  const [emailCode, setEmailCode] = useState(['', '', '', '', '', '']);
  const [phoneCode, setPhoneCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  
  const emailInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const phoneInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Mock verification codes (for demo purposes)
  const MOCK_EMAIL_CODE = '123456';
  const MOCK_PHONE_CODE = '654321';

  const handleCodeChange = (
    value: string,
    index: number,
    type: 'email' | 'phone'
  ) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newCode = type === 'email' ? [...emailCode] : [...phoneCode];
    newCode[index] = value;

    if (type === 'email') {
      setEmailCode(newCode);
      if (value && index < 5) {
        emailInputRefs.current[index + 1]?.focus();
      }
    } else {
      setPhoneCode(newCode);
      if (value && index < 5) {
        phoneInputRefs.current[index + 1]?.focus();
      }
    }

    setError('');
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    index: number,
    type: 'email' | 'phone'
  ) => {
    if (e.key === 'Backspace' && index > 0) {
      const code = type === 'email' ? emailCode : phoneCode;
      if (!code[index]) {
        const refs = type === 'email' ? emailInputRefs : phoneInputRefs;
        refs.current[index - 1]?.focus();
      }
    }
  };

  const handleVerify = () => {
    const enteredEmailCode = emailCode.join('');
    const enteredPhoneCode = phoneCode.join('');

    if (enteredEmailCode.length !== 6 || enteredPhoneCode.length !== 6) {
      setError('Please enter both 6-digit verification codes');
      return;
    }

    // Mock verification
    if (enteredEmailCode === MOCK_EMAIL_CODE && enteredPhoneCode === MOCK_PHONE_CODE) {
      setEmailVerified(true);
      setPhoneVerified(true);
      setTimeout(() => {
        onVerify();
      }, 1000);
    } else {
      setError('Invalid verification codes. Try: Email: 123456, Phone: 654321');
    }
  };

  const maskEmail = (email: string) => {
    const [name, domain] = email.split('@');
    return `${name.charAt(0)}***@${domain}`;
  };

  const maskPhone = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    return `***-***-${digits.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to login
        </button>

        {/* Verification Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Identity</h2>
            <p className="text-gray-600">
              We've sent verification codes to your registered email and phone
            </p>
          </div>

          {/* Email Verification */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Mail className={`h-5 w-5 ${emailVerified ? 'text-green-600' : 'text-blue-600'}`} />
              <div>
                <p className="font-medium text-gray-900">Email Verification</p>
                <p className="text-sm text-gray-600">Code sent to {maskEmail(email)}</p>
              </div>
            </div>
            <div className="flex gap-2 justify-center">
              {emailCode.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (emailInputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(e.target.value, index, 'email')}
                  onKeyDown={(e) => handleKeyDown(e, index, 'email')}
                  className={`w-12 h-12 text-center border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    emailVerified
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 hover:border-blue-400'
                  }`}
                  disabled={emailVerified}
                />
              ))}
            </div>
            {emailVerified && (
              <p className="text-sm text-green-600 text-center mt-2 flex items-center justify-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Email verified
              </p>
            )}
          </div>

          {/* Phone Verification */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Smartphone className={`h-5 w-5 ${phoneVerified ? 'text-green-600' : 'text-blue-600'}`} />
              <div>
                <p className="font-medium text-gray-900">Phone Verification</p>
                <p className="text-sm text-gray-600">Code sent to {maskPhone(phone)}</p>
              </div>
            </div>
            <div className="flex gap-2 justify-center">
              {phoneCode.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (phoneInputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(e.target.value, index, 'phone')}
                  onKeyDown={(e) => handleKeyDown(e, index, 'phone')}
                  className={`w-12 h-12 text-center border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    phoneVerified
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 hover:border-blue-400'
                  }`}
                  disabled={phoneVerified}
                />
              ))}
            </div>
            {phoneVerified && (
              <p className="text-sm text-green-600 text-center mt-2 flex items-center justify-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Phone verified
              </p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Demo Info */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 font-medium mb-1">Demo Mode</p>
            <p className="text-sm text-blue-700">
              Email Code: <span className="font-mono font-semibold">123456</span> | 
              Phone Code: <span className="font-mono font-semibold">654321</span>
            </p>
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={emailVerified && phoneVerified}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-green-600 disabled:cursor-not-allowed transition-colors shadow-lg shadow-blue-600/30"
          >
            {emailVerified && phoneVerified ? 'Verified! Redirecting...' : 'Verify & Continue'}
          </button>

          {/* Resend Links */}
          <div className="flex justify-center gap-6 mt-6 text-sm">
            <button className="text-blue-600 hover:text-blue-700">
              Resend email code
            </button>
            <button className="text-blue-600 hover:text-blue-700">
              Resend phone code
            </button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            🔒 Your data is encrypted and secure. We'll never share your personal information.
          </p>
        </div>
      </div>
    </div>
  );
}
