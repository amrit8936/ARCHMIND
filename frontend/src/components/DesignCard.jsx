import { Link } from 'react-router-dom';
import { Clock, ChevronRight, Cpu, Database, Zap, Trash2 } from 'lucide-react';
import { deleteDesignApi } from '../api/designApi';
import toast from 'react-hot-toast';

const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

export default function DesignCard({ design, onDelete }) {
  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm('Delete this design?')) return;
    try {
      await deleteDesignApi(design._id);
      toast.success('Design deleted');
      onDelete(design._id);
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <Link
      to={`/design/${design._id}`}
      id={`design-card-${design._id}`}
      className="glass-card p-6 block hover-glow border border-slate-700/50 transition-all duration-300 hover:translate-y-[-2px] group relative"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-100 text-lg leading-tight truncate pr-8 group-hover:text-cyan-300 transition-colors">
            {design.title}
          </h3>
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            {timeAgo(design.createdAt)}
          </div>
        </div>
        <button
          onClick={handleDelete}
          id={`delete-design-${design._id}`}
          className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:text-rose-400 hover:bg-rose-500/10"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Overview snippet */}
      {design.overview && (
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
          {design.overview}
        </p>
      )}

      {/* Stats row */}
      <div className="flex items-center gap-4 mt-auto">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Cpu className="w-3.5 h-3.5 text-cyan-400/70" />
          <span>Architecture</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Database className="w-3.5 h-3.5 text-violet-400/70" />
          <span>DB Schema</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Zap className="w-3.5 h-3.5 text-emerald-400/70" />
          <span>APIs</span>
        </div>
        <div className="ml-auto">
          <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-200" />
        </div>
      </div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
}
