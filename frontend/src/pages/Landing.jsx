import { Link } from 'react-router-dom';
import { Brain, Zap, Database, GitBranch, BarChart3, Edit3, ArrowRight, Cpu, Globe, MessageSquare, Star } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI Architecture Generation',
    desc: 'Describe your product and get a complete microservices architecture with services, databases, and APIs — instantly.',
    color: 'text-cyan-400',
    bg: 'from-cyan-500/20 to-cyan-600/5',
    border: 'border-cyan-500/30',
  },
  {
    icon: GitBranch,
    title: 'Interactive Diagrams',
    desc: 'Visualize your system as a live, draggable React Flow diagram with custom node types and animated connections.',
    color: 'text-violet-400',
    bg: 'from-violet-500/20 to-violet-600/5',
    border: 'border-violet-500/30',
  },
  {
    icon: Database,
    title: 'Database Schema Design',
    desc: 'Get complete DB schema with table structures, field types, and relationships for SQL and NoSQL systems.',
    color: 'text-emerald-400',
    bg: 'from-emerald-500/20 to-emerald-600/5',
    border: 'border-emerald-500/30',
  },
  {
    icon: Zap,
    title: 'API Endpoint Design',
    desc: 'Complete REST API definitions with methods, routes, auth requirements, and descriptions auto-generated.',
    color: 'text-amber-400',
    bg: 'from-amber-500/20 to-amber-600/5',
    border: 'border-amber-500/30',
  },
  {
    icon: BarChart3,
    title: 'Scalability Strategies',
    desc: 'Load balancing, caching layers, database sharding, and circuit breakers — all recommended and explained.',
    color: 'text-rose-400',
    bg: 'from-rose-500/20 to-rose-600/5',
    border: 'border-rose-500/30',
  },
  {
    icon: Edit3,
    title: 'Editable Architecture',
    desc: 'Drag nodes, add connections, and customize your architecture. Save your modified layout to the cloud.',
    color: 'text-sky-400',
    bg: 'from-sky-500/20 to-sky-600/5',
    border: 'border-sky-500/30',
  },
];

const exampleIdeas = ['Build Uber', 'Design Netflix', 'Create WhatsApp', 'Build Amazon'];

const steps = [
  { num: '01', title: 'Input Your Idea', desc: 'Describe your product in plain English — no tech jargon required.' },
  { num: '02', title: 'AI Generates Design', desc: 'GPT-4 creates a complete architecture in seconds with HLD, LLD, and more.' },
  { num: '03', title: 'Visualize & Edit', desc: 'Explore the interactive diagram and customize every component to your needs.' },
];

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background */}
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/8 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-cyan-500/5 to-transparent rounded-full" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-8 animate-fade-up">
            <Cpu className="w-3.5 h-3.5" />
            Powered by GPT-4 · System Design AI
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'both', opacity: 0 }}>
            Turn Ideas Into
            <br />
            <span className="gradient-text">System Architecture</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'both', opacity: 0 }}>
            Input your product requirements and AI generates a complete system design —
            microservices, databases, APIs, and scalability strategies — rendered as an interactive diagram.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 animate-fade-up" style={{ animationDelay: '0.3s', animationFillMode: 'both', opacity: 0 }}>
            <Link to="/signup" id="hero-get-started" className="btn-primary flex items-center gap-2 text-base px-8 py-4">
              Start Designing Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/login" className="btn-secondary text-base px-8 py-4">
              Sign In
            </Link>
          </div>

          {/* Example badges */}
          <div className="flex flex-wrap justify-center gap-2 animate-fade-up" style={{ animationDelay: '0.4s', animationFillMode: 'both', opacity: 0 }}>
            <span className="text-gray-500 text-sm self-center">Try:</span>
            {exampleIdeas.map((idea) => (
              <span key={idea} className="badge-cyan cursor-default text-xs">{idea}</span>
            ))}
          </div>
        </div>

        {/* Floating node preview */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 opacity-30 pointer-events-none">
          {[Globe, Cpu, Database, MessageSquare].map((Icon, i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center"
              style={{ animation: `float 6s ease-in-out ${i * 0.5}s infinite` }}
            >
              <Icon className="w-4 h-4 text-cyan-400/60" />
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Three simple steps from idea to production-ready architecture</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative text-center group">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
                )}
                <div className="text-5xl font-black gradient-text mb-4 opacity-30">{step.num}</div>
                <div className="glass-card p-6 hover-glow border border-slate-700/50 transition-all duration-300">
                  <h3 className="text-lg font-bold text-gray-100 mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/30 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">Everything You Need</h2>
            <p className="text-gray-400 text-lg">Complete system design in one place</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc, color, bg, border }, i) => (
              <div
                key={i}
                className={`glass-card p-6 border ${border} bg-gradient-to-br ${bg} hover-glow transition-all duration-300 hover:translate-y-[-4px] group`}
              >
                <div className={`w-10 h-10 rounded-xl bg-slate-900/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <h3 className="text-gray-100 font-semibold text-base mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-violet-500/5 to-cyan-500/5" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-100 mb-6">
            Ready to Design Your <span className="gradient-text">Next System?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Join developers using ArchMind to design, visualize, and ship better architectures faster.
          </p>
          <Link to="/signup" id="cta-get-started" className="btn-primary inline-flex items-center gap-2 text-base px-10 py-4">
            Get Started for Free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Brain className="w-4 h-4 text-cyan-400" />
          <span className="font-bold gradient-text text-sm">ArchMind</span>
        </div>
        <p className="text-gray-600 text-xs">AI System Design Generator · Built with GPT-4 + React Flow</p>
      </footer>
    </div>
  );
}
