import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useCallback, useMemo } from 'react';
import { Server, Database, Globe, MessageSquare, MemoryStick, Monitor } from 'lucide-react';

const nodeTypeIcons = {
  service: Server,
  database: Database,
  gateway: Globe,
  queue: MessageSquare,
  cache: MemoryStick,
  client: Monitor,
};

const nodeTypeColors = {
  service: { bg: 'from-cyan-500/20 to-cyan-600/10', border: 'border-cyan-500/40', icon: 'text-cyan-400', dot: 'bg-cyan-400' },
  database: { bg: 'from-violet-500/20 to-violet-600/10', border: 'border-violet-500/40', icon: 'text-violet-400', dot: 'bg-violet-400' },
  gateway: { bg: 'from-amber-500/20 to-amber-600/10', border: 'border-amber-500/40', icon: 'text-amber-400', dot: 'bg-amber-400' },
  queue: { bg: 'from-rose-500/20 to-rose-600/10', border: 'border-rose-500/40', icon: 'text-rose-400', dot: 'bg-rose-400' },
  cache: { bg: 'from-emerald-500/20 to-emerald-600/10', border: 'border-emerald-500/40', icon: 'text-emerald-400', dot: 'bg-emerald-400' },
  client: { bg: 'from-sky-500/20 to-sky-600/10', border: 'border-sky-500/40', icon: 'text-sky-400', dot: 'bg-sky-400' },
};

const CustomNode = ({ data }) => {
  const type = data.nodeType || 'service';
  const colors = nodeTypeColors[type] || nodeTypeColors.service;
  const Icon = nodeTypeIcons[type] || Server;

  return (
    <div className={`bg-gradient-to-br ${colors.bg} border ${colors.border} rounded-xl p-3 min-w-[140px] max-w-[180px] shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer group`}>
      <div className="flex items-start gap-2">
        <div className={`mt-0.5 w-6 h-6 rounded-lg bg-slate-900/50 flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-3.5 h-3.5 ${colors.icon}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <div className={`w-1.5 h-1.5 rounded-full ${colors.dot} flex-shrink-0`} />
            <p className="text-gray-100 text-xs font-semibold leading-tight truncate">{data.label}</p>
          </div>
          {data.technology && (
            <p className="text-gray-500 text-[10px] truncate">{data.technology}</p>
          )}
          {data.description && (
            <p className="text-gray-400 text-[10px] mt-1 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity line-clamp-2">
              {data.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const defaultEdgeOptions = {
  style: { stroke: 'rgba(100,116,139,0.6)', strokeWidth: 2 },
  markerEnd: { type: MarkerType.ArrowClosed, color: 'rgba(100,116,139,0.8)' },
};

export default function DiagramCanvas({ nodes: initialNodes, edges: initialEdges, onSave, readOnly = false }) {
  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges || []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  const handleSave = () => {
    if (onSave) onSave(nodes, edges);
  };

  return (
    <div className="relative w-full h-full">
      {!readOnly && onSave && (
        <div className="absolute top-3 right-3 z-10">
          <button
            id="save-diagram-btn"
            onClick={handleSave}
            className="btn-primary text-xs px-4 py-2"
          >
            Save Layout
          </button>
        </div>
      )}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={readOnly ? undefined : onNodesChange}
        onEdgesChange={readOnly ? undefined : onEdgesChange}
        onConnect={readOnly ? undefined : onConnect}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.3}
        maxZoom={2}
        deleteKeyCode={readOnly ? null : 'Delete'}
      >
        <Background color="rgba(34,211,238,0.05)" gap={24} size={1} />
        <Controls className="bottom-4 right-4" />
        <MiniMap
          nodeColor={(n) => {
            const type = n.data?.nodeType || 'service';
            const dotColors = { service: '#22d3ee', database: '#a78bfa', gateway: '#fbbf24', queue: '#fb7185', cache: '#34d399', client: '#38bdf8' };
            return dotColors[type] || '#22d3ee';
          }}
          maskColor="rgba(2,6,23,0.7)"
        />
      </ReactFlow>
    </div>
  );
}
