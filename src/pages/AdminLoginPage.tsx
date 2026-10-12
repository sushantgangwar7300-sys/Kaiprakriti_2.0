import React, { useState } from 'react';
import { PageId } from '../types';
import { KaiPrakritiEmblem } from '../components/KaiPrakritiEmblem';
import { Lock, Mail, ArrowRight, Eye, EyeOff, KeyRound } from 'lucide-react';

interface AdminLoginPageProps {
  theme?: string;
  mode?: string;
  onLoginSuccess: () => void;
  onNavigate: (page: PageId) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onLoginSuccess,
  onNavigate,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both administrator email and password.');
      return;
    }

    if (password.length >= 6) {
      setError('');
      onLoginSuccess();
    } else {
      setError('Password must be at least 6 characters.');
    }
  };

  const handleDemoFill = () => {
    setEmail('admin@kaiprakriti.com');
    setPassword('prakriti2026');
    setError('');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-10 sm:py-16 px-3.5 sm:px-6 bg-[#FAF8F5]">
      <div className="w-full max-w-md p-5 sm:p-10 rounded-2xl sm:rounded-3xl border border-[#E7E3DC] bg-white shadow-sm space-y-5 sm:space-y-6">
        
        {/* Header Branding - Borderless larger emblem */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <KaiPrakritiEmblem size={56} theme="relax" circularBorder={true} />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold tracking-tight text-[#264143]">
              Executive Admin Portal
            </h1>
            <p className="text-xs text-[#264143]/70 mt-1">
              Lead generation CRM, Services Catalogue & Blog Manager
            </p>
          </div>
        </div>

        {/* Demo Fast-Fill Pill */}
        <div className="p-3 rounded-2xl bg-[#3E6B48]/10 border border-[#3E6B48]/20 flex flex-col xs:flex-row xs:items-center justify-between gap-1.5 text-xs">
          <div className="flex items-center gap-1.5 text-[#3E6B48] font-medium">
            <KeyRound className="w-3.5 h-3.5 shrink-0" />
            <span>Authorized: Sushant Gangwar</span>
          </div>
          <button
            type="button"
            onClick={handleDemoFill}
            className="text-[11px] font-semibold text-[#D96846] hover:underline self-end xs:self-auto"
          >
            Auto-fill credentials
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs text-center font-medium">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-semibold text-[#264143]">
              Administrator Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                placeholder="operations@kaiprakriti.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF8F5] border border-[#E7E3DC] rounded-xl text-[#264143] placeholder-slate-400 focus:outline-none focus:border-[#D96846] focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-[#264143]">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-[#264143]/60 hover:text-[#264143] flex items-center gap-1"
              >
                {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                <span>{showPassword ? 'Hide' : 'Show'}</span>
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF8F5] border border-[#E7E3DC] rounded-xl text-[#264143] placeholder-slate-400 focus:outline-none focus:border-[#D96846] focus:bg-white transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl text-xs font-semibold transition-all bg-[#D96846] hover:bg-[#C45737] text-white shadow-xs flex items-center justify-center gap-2"
          >
            <span>Enter Management Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="text-xs text-[#264143]/60 hover:text-[#264143] font-medium"
          >
            ← Back to public website
          </button>
        </div>

      </div>
    </div>
  );
};
