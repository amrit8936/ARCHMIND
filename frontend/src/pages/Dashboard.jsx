import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getDesignsApi } from '../api/designApi';
import DesignCard from '../components/DesignCard';
import { Plus, Brain, Search, LayoutGrid, Sparkles } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const { data } = await getDesignsApi();
        setDesigns(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDesigns();
  }, []);

  const filtered = designs.filter(
    (d) =>
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.requirement?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    setDesigns((prev) => prev.filter((d) => d._id !== id));
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">
            Welcome back, <span className="gradient-text">{user?.name}</span> 👋
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            {designs.length === 0
              ? 'No designs yet — create your first architecture!'
              : `${designs.length} architecture design${designs.length !== 1 ? 's' : ''} saved`}
          </p>
        </div>
        <Link
          to="/generate"
          id="dashboard-new-design"
          className="btn-primary flex items-center gap-2 self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          New Design
        </Link>
      </div>

      {/* Search bar */}
      {designs.length > 0 && (
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            id="dashboard-search"
            type="text"
            placeholder="Search designs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-24">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
            <span className="text-gray-400 text-sm">Loading designs...</span>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!loading && designs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-up">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20 border border-cyan-500/30 flex items-center justify-center mb-6 animate-pulse-glow">
            <Brain className="w-10 h-10 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-100 mb-2">No designs yet</h2>
          <p className="text-gray-400 text-sm mb-8 max-w-sm">
            Describe your product idea and let AI generate a complete system architecture for you.
          </p>
          <Link to="/generate" className="btn-primary flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Generate First Design
          </Link>
        </div>
      )}

      {/* Designs grid */}
      {!loading && filtered.length > 0 && (
        <>
          <div className="flex items-center gap-2 mb-4 text-gray-500 text-sm">
            <LayoutGrid className="w-4 h-4" />
            {filtered.length} design{filtered.length !== 1 ? 's' : ''}
            {search && ` matching "${search}"`}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((design) => (
              <DesignCard key={design._id} design={design} onDelete={handleDelete} />
            ))}
          </div>
        </>
      )}

      {/* No search results */}
      {!loading && designs.length > 0 && filtered.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <Search className="w-8 h-8 mx-auto mb-3 opacity-40" />
          <p>No designs matching "{search}"</p>
        </div>
      )}
    </div>
  );
}
