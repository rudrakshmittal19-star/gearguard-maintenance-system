import { useState } from 'react';
import { Mail, Smartphone, ArrowRight } from 'lucide-react';

interface LoginPageProps {
  onSubmit: (email: string, phone: string) => void;
}

export function LoginPage({ onSubmit }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({ email: '', phone: '' });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = { email: '', phone: '' };
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!phone) {
      newErrors.phone = 'Mobile phone is required';
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (newErrors.email || newErrors.phone) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit(email, phone);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-md bg-gradient-to-r from-sky-500 to-indigo-600 flex items-center justify-center text-white font-semibold">GG</div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">GearGuard</h1>
              <p className="text-sm text-gray-500">Maintenance Management System</p>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">Welcome back</h2>
            <p className="text-gray-600">Enter your email and mobile to receive a secure OTP</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors({ ...errors, email: '' });
                  }}
                  className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.email ? 'border-rose-300' : 'border-gray-200'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent bg-white text-gray-800 placeholder-gray-400`}
                    placeholder="you@company.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Phone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Smartphone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setErrors({ ...errors, phone: '' });
                  }}
                  className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.phone ? 'border-rose-300' : 'border-gray-200'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent bg-white text-gray-800 placeholder-gray-400`}
                    placeholder="+91 98765 43210"
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-sky-600 text-white py-3 rounded-lg font-medium hover:bg-sky-700 transition flex items-center justify-center gap-2 shadow"
            >
              Continue
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              We'll send verification codes to your email and phone
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Secure enterprise authentication • Protected by encryption
        </p>
      </div>
    </div>
  );
}
