import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateDesignApi } from '../api/designApi';
import LoadingScreen from '../components/LoadingScreen';
import { Brain, ArrowRight, Lightbulb, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const examplePrompts = [
  { label: 'Ride-sharing App', prompt: 'Build a ride-sharing platform like Uber with real-time tracking, driver matching, payments, and surge pricing.' },
  { label: 'Video Streaming', prompt: 'Design a video streaming platform like Netflix with CDN delivery, recommendations, adaptive bitrate, and user profiles.' },
  { label: 'Chat Application', prompt: 'Build a real-time messaging app like WhatsApp with end-to-end encryption, group chats, media sharing, and status updates.' },
  { label: 'E-commerce Platform', prompt: 'Design an e-commerce platform like Amazon with product catalog, inventory, payments, search, and order tracking.' },
  { label: 'Social Network', prompt: 'Build a social media platform like Twitter with feeds, follow system, real-time notifications, and trending topics.' },
  { label: 'Food Delivery App', prompt: 'Design a food delivery platform like DoorDash with restaurant discovery, order management, driver tracking, and reviews.' },
];

export default function Generator() {
  const [requirement, setRequirement] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (requirement.trim().length < 10) {
      toast.error('Please provide a more detailed description (min 10 chars)');
      return;
    }
    setLoading(true);
    try {
      const { data } = await generateDesignApi(requirement.trim());
      toast.success('Architecture generated! 🎉');
      navigate(`/design/${data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Generation failed. Check your connection.');
      setLoading(false);
    }
  };

  const applyExample = (prompt) => {
    setRequirement(prompt);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {loading && <LoadingScreen />}

      <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20 border border-cyan-500/30 mb-5 animate-pulse-glow">
            <Brain className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-100 mb-3">
            Describe Your <span className="gradient-text">System</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Tell us what you want to build and AI will generate the complete architecture — services, databases, APIs, and more.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleGenerate} className="mb-10 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="glass-card p-6 border border-slate-700/50 hover-glow transition-all duration-300">
            <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Product Requirement
            </label>
            <textarea
              id="requirement-input"
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
              placeholder='e.g. "Build a ride-sharing platform like Uber with real-time GPS tracking, driver matching, payment processing, surge pricing, and both iOS and Android support." '
              rows={7}
              className="input-field resize-none text-base leading-relaxed mb-4 font-normal"
              required
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">{requirement.length} characters</span>
              <button
                id="generate-btn"
                type="submit"
                disabled={loading || requirement.trim().length < 10}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Brain className="w-4 h-4" />
                Generate Architecture
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>

        {/* Tips */}
        <div className="glass-card p-4 border border-amber-500/20 bg-amber-500/5 mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex gap-3">
            <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-400 text-sm font-medium mb-1">Tips for better results</p>
              <ul className="text-gray-400 text-xs space-y-1">
                <li>• Mention the scale (users, requests per second)</li>
                <li>• Include key features (real-time, payments, search, etc.)</li>
                <li>• Specify platform (mobile, web, API-first)</li>
                <li>• Add constraints (budget, compliance, latency requirements)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Example Prompts */}
        <div className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-cyan-400" />
            Example Prompts
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {examplePrompts.map(({ label, prompt }) => (
              <button
                key={label}
                id={`example-${label.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => applyExample(prompt)}
                className="glass-card p-4 text-left hover-glow border border-slate-700/50 transition-all duration-300 hover:translate-y-[-2px] group"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span className="text-gray-200 text-sm font-medium group-hover:text-cyan-300 transition-colors">{label}</span>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{prompt}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
