import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getDesignByIdApi, updateDesignApi } from '../api/designApi';
import DiagramCanvas from '../components/DiagramCanvas';
import DetailsPanel from '../components/DetailsPanel';
import { Brain, ArrowLeft, Save, PanelRight, PanelRightClose, Download } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DesignView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);

  useEffect(() => {
    const fetchDesign = async () => {
      try {
        const { data } = await getDesignByIdApi(id);
        setDesign(data);
      } catch (err) {
        toast.error('Design not found');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchDesign();
  }, [id]);

  const handleSave = async (nodes, edges) => {
    setSaving(true);
    try {
      const { data } = await updateDesignApi(id, { nodes, edges, title: design.title });
      setDesign(data);
      toast.success('Layout saved!');
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleExport = () => {
    const exportData = {
      title: design.title,
      requirement: design.requirement,
      overview: design.overview,
      services: design.services,
      database: design.database,
      apis: design.apis,
      scalability: design.scalability,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${design.title.replace(/\s+/g, '-').toLowerCase()}-architecture.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Exported as JSON!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
          <span className="text-gray-400 text-sm">Loading architecture...</span>
        </div>
      </div>
    );
  }

  if (!design) return null;

  return (
    <div className="flex flex-col h-screen bg-slate-950 pt-16">
      {/* Top toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/60 bg-slate-900/80 backdrop-blur-sm z-10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            id="back-to-dashboard"
            className="w-8 h-8 rounded-lg text-gray-500 hover:text-gray-200 hover:bg-slate-700/50 flex items-center justify-center transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="w-px h-4 bg-slate-700" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center">
              <Brain className="w-3 h-3 text-white" />
            </div>
            <h1 className="font-semibold text-gray-100 text-sm truncate max-w-xs md:max-w-lg">
              {design.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="export-btn"
            onClick={handleExport}
            className="flex items-center gap-1.5 btn-ghost text-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export JSON</span>
          </button>
          <button
            id="toggle-panel-btn"
            onClick={() => setPanelOpen(!panelOpen)}
            className="flex items-center gap-1.5 btn-ghost text-xs"
          >
            {panelOpen ? <PanelRightClose className="w-3.5 h-3.5" /> : <PanelRight className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{panelOpen ? 'Hide' : 'Show'} Details</span>
          </button>
          {saving && (
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <div className="w-3 h-3 border border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
              Saving...
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Diagram Canvas */}
        <div className={`flex-1 transition-all duration-300 ${panelOpen ? 'md:w-[60%]' : 'w-full'}`}>
          <DiagramCanvas
            nodes={design.nodes || []}
            edges={design.edges || []}
            onSave={handleSave}
          />
        </div>

        {/* Details Panel */}
        {panelOpen && (
          <div className="w-full md:w-[40%] lg:w-[35%] border-l border-slate-800/60 bg-slate-900/60 backdrop-blur-sm overflow-hidden flex flex-col animate-slide-in">
            <DetailsPanel design={design} />
          </div>
        )}
      </div>
    </div>
  );
}
