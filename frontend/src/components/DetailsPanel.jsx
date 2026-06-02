import { useState } from 'react';
import { Server, Database, Zap, BarChart3, Globe, Code2 } from 'lucide-react';

const TABS = [
  { id: 'overview', label: 'Overview', icon: Globe },
  { id: 'services', label: 'Services', icon: Server },
  { id: 'database', label: 'Database', icon: Database },
  { id: 'apis', label: 'APIs', icon: Zap },
  { id: 'scalability', label: 'Scalability', icon: BarChart3 },
];

const methodColors = {
  GET: 'badge-emerald',
  POST: 'badge-cyan',
  PUT: 'badge-amber',
  DELETE: 'badge-rose',
  PATCH: 'badge-violet',
};

const impactColors = {
  High: 'badge-rose',
  Medium: 'badge-amber',
  Low: 'badge-emerald',
};

export default function DetailsPanel({ design }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex flex-col h-full">
      {/* Tab Bar */}
      <div className="flex gap-1 p-3 border-b border-slate-700/50 flex-wrap">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            id={`tab-${id}`}
            onClick={() => setActiveTab(id)}
            className={activeTab === id ? 'tab-btn-active' : 'tab-btn-inactive'}
          >
            <span className="flex items-center gap-1.5">
              <Icon className="w-3.5 h-3.5" />
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="animate-fade-up">
            <div className="glass-card p-5 mb-4">
              <h3 className="text-lg font-bold gradient-text mb-3">{design.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{design.overview}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Services', value: design.services?.length || 0, color: 'text-cyan-400' },
                { label: 'API Endpoints', value: design.apis?.length || 0, color: 'text-violet-400' },
                { label: 'DB Tables', value: design.database?.schema?.length || 0, color: 'text-emerald-400' },
                { label: 'Scale Strategies', value: design.scalability?.length || 0, color: 'text-amber-400' },
              ].map(({ label, value, color }) => (
                <div key={label} className="glass-card p-4 text-center">
                  <div className={`text-2xl font-bold ${color} mb-1`}>{value}</div>
                  <div className="text-xs text-gray-500">{label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SERVICES */}
        {activeTab === 'services' && (
          <div className="space-y-3 animate-fade-up">
            {design.services?.map((svc, i) => (
              <div key={i} className="glass-card p-4 hover-glow border border-slate-700/50 transition-all duration-300">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <h4 className="font-semibold text-gray-100 text-sm">{svc.name}</h4>
                  </div>
                  <span className="badge-violet text-[10px]">{svc.type || 'service'}</span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed mb-2">{svc.description}</p>
                {svc.technology && (
                  <div className="flex items-center gap-1.5">
                    <Code2 className="w-3 h-3 text-gray-500" />
                    <span className="text-xs text-gray-500 font-mono">{svc.technology}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* DATABASE */}
        {activeTab === 'database' && (
          <div className="space-y-4 animate-fade-up">
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-1">
                <Database className="w-4 h-4 text-violet-400" />
                <span className="font-semibold text-gray-100 text-sm">Database Strategy</span>
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                <span className="badge-violet">{design.database?.type}</span>
                <span className="badge-cyan">{design.database?.technology}</span>
              </div>
            </div>
            {design.database?.schema?.map((tbl, i) => (
              <div key={i} className="glass-card p-4 hover-glow border border-slate-700/50 transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-violet-400" />
                  <h4 className="font-semibold text-violet-300 text-sm font-mono">{tbl.table}</h4>
                </div>
                {tbl.description && (
                  <p className="text-gray-400 text-xs mb-3">{tbl.description}</p>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {tbl.fields?.map((field, j) => (
                    <span key={j} className="text-[10px] bg-slate-700/50 text-gray-300 px-2 py-0.5 rounded font-mono border border-slate-600/30">
                      {field}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* APIS */}
        {activeTab === 'apis' && (
          <div className="space-y-2 animate-fade-up">
            {design.apis?.map((api, i) => (
              <div key={i} className="glass-card px-4 py-3 flex items-start gap-3 hover-glow border border-slate-700/50 transition-all duration-300">
                <span className={`badge ${methodColors[api.method] || 'badge-cyan'} flex-shrink-0 font-mono text-[10px] mt-0.5`}>
                  {api.method}
                </span>
                <div className="flex-1 min-w-0">
                  <code className="text-cyan-300 text-xs font-mono block truncate">{api.endpoint}</code>
                  <p className="text-gray-400 text-xs mt-0.5">{api.description}</p>
                </div>
                {api.auth && (
                  <span className="badge-amber text-[10px] flex-shrink-0">🔒 Auth</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* SCALABILITY */}
        {activeTab === 'scalability' && (
          <div className="space-y-3 animate-fade-up">
            {design.scalability?.map((item, i) => (
              <div key={i} className="glass-card p-4 hover-glow border border-slate-700/50 transition-all duration-300">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <h4 className="font-semibold text-gray-100 text-sm">{item.strategy}</h4>
                  </div>
                  {item.impact && (
                    <span className={`badge ${impactColors[item.impact] || 'badge-amber'} text-[10px]`}>
                      {item.impact} Impact
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
