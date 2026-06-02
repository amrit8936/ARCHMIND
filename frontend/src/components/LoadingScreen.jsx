import { Brain, Cpu, Zap } from 'lucide-react';

const steps = [
  'Analyzing requirements...',
  'Designing microservices...',
  'Planning database schema...',
  'Generating API endpoints...',
  'Building scalability strategies...',
  'Rendering diagram...',
];

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-sm">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-md mx-auto px-8 text-center">
        {/* Animated icon */}
        <div className="relative">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20 border border-cyan-500/30 flex items-center justify-center animate-pulse-glow">
            <Brain className="w-12 h-12 text-cyan-400" />
          </div>
          {/* Orbiting dots */}
          <div className="absolute inset-0 animate-spin-slow">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-glow-cyan" />
          </div>
          <div className="absolute inset-0 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '5s' }}>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-violet-400 rounded-full" />
          </div>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-2xl font-bold gradient-text mb-2">Generating Architecture</h2>
          <p className="text-gray-400 text-sm">AI is designing your complete system architecture...</p>
        </div>

        {/* Animated steps */}
        <div className="w-full space-y-2">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-left opacity-0"
              style={{ animation: `fadeUp 0.4s ease-out ${i * 0.4 + 0.2}s forwards` }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 flex-shrink-0" />
              <span className="text-gray-400 text-sm">{step}</span>
            </div>
          ))}
        </div>

        {/* Loading dots */}
        <div className="flex gap-2 mt-2">
          <div className="loading-dot" />
          <div className="loading-dot" />
          <div className="loading-dot" />
        </div>

        {/* Stats */}
        <div className="flex gap-6 text-center">
          {[
            { icon: Cpu, label: 'Services', value: '8+' },
            { icon: Zap, label: 'API Endpoints', value: '12+' },
            { icon: Brain, label: 'Patterns', value: '6+' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <Icon className="w-4 h-4 text-cyan-400/60" />
              <span className="text-lg font-bold text-cyan-400">{value}</span>
              <span className="text-xs text-gray-500">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
