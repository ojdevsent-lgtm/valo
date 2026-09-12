import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Bot, ChevronDown, CircleHelp, Clock3, LayoutDashboard, MessageSquareText, MoreHorizontal, Plus, Search, Settings, Sparkles, Target, TrendingUp, Users, Zap } from 'lucide-react';
import './styles.css';

const seedLeads = [
  { id: 1, name: 'Olivia Carter', company: 'Northstar Studio', channel: 'Website', value: 2400, status: 'Hot', last: '12 min ago', intent: 'Ready to buy', avatar: 'OC' },
  { id: 2, name: 'Daniel Kim', company: 'Kite Labs', channel: 'WhatsApp', value: 1800, status: 'Warm', last: '38 min ago', intent: 'Comparing options', avatar: 'DK' },
  { id: 3, name: 'Maya Wilson', company: 'Willow & Co.', channel: 'Instagram', value: 950, status: 'New', last: '1 hr ago', intent: 'Asked for pricing', avatar: 'MW' },
  { id: 4, name: 'Noah Bennett', company: 'Arc Supply', channel: 'Website', value: 4200, status: 'Follow-up', last: '3 hrs ago', intent: 'Needs a nudge', avatar: 'NB' },
  { id: 5, name: 'Sophia Lee', company: 'Lumen Dental', channel: 'WhatsApp', value: 3100, status: 'Warm', last: 'Yesterday', intent: 'Decision maker engaged', avatar: 'SL' },
];

const nav = [
  ['Overview', LayoutDashboard], ['Leads', Target], ['Customers', Users], ['Conversations', MessageSquareText], ['Follow-ups', Clock3]
];

function App() {
  const [active, setActive] = useState('Overview');
  const [leads, setLeads] = useState(seedLeads);
  const [query, setQuery] = useState('');
  const [aiOpen, setAiOpen] = useState(false);

  const filtered = useMemo(() => leads.filter(l => `${l.name} ${l.company} ${l.channel}`.toLowerCase().includes(query.toLowerCase())), [leads, query]);
  const totalPipeline = leads.reduce((sum, l) => sum + l.value, 0);

  function addLead() {
    const next = { id: Date.now(), name: 'New lead', company: 'Unassigned company', channel: 'Manual', value: 0, status: 'New', last: 'Just now', intent: 'Needs qualification', avatar: 'NL' };
    setLeads([next, ...leads]);
  }

  return <div className="app">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Zap size={17} fill="currentColor" /></div><span>valo</span></div>
      <div className="workspace"><div className="workspace-avatar">A</div><div><strong>Acme Workspace</strong><span>Business workspace</span></div><ChevronDown size={15}/></div>
      <div className="nav-label">WORKSPACE</div>
      <nav>{nav.map(([label, Icon]) => <button key={label} className={active === label ? 'nav-item active' : 'nav-item'} onClick={() => setActive(label)}><Icon size={18}/><span>{label}</span>{label === 'Leads' && <b>{leads.length}</b>}</button>)}</nav>
      <div className="nav-label lower">MANAGE</div>
      <nav><button className="nav-item"><Bot size={18}/><span>AI automations</span><span className="new-pill">NEW</span></button><button className="nav-item"><Settings size={18}/><span>Settings</span></button></nav>
      <div className="sidebar-bottom"><div className="ai-card"><div className="ai-icon"><Sparkles size={16}/></div><div><strong>Valo AI</strong><p>Your sales copilot is active.</p></div></div><div className="user-row"><div className="user-avatar">Y</div><div><strong>Your account</strong><span>Free workspace</span></div><MoreHorizontal size={17}/></div></div>
    </aside>

    <main className="main">
      <header className="topbar"><div><span className="eyebrow">{active === 'Overview' ? 'MONDAY, SEPTEMBER 12' : 'WORKSPACE'}</span><h1>{active === 'Overview' ? 'Good evening.' : active}</h1></div><div className="top-actions"><button className="icon-btn"><CircleHelp size={18}/></button><button className="icon-btn"><Settings size={18}/></button><button className="primary" onClick={addLead}><Plus size={17}/> Add lead</button></div></header>

      {active === 'Overview' ? <>
        <section className="hero"><div><div className="hero-icon"><Sparkles size={18}/></div><div><h2>Your pipeline is moving.</h2><p>Valo found <strong>3 leads</strong> that need attention today.</p></div></div><button className="soft-btn" onClick={() => setAiOpen(true)}>Ask Valo AI <Sparkles size={15}/></button></section>
        <section className="stats">
          <Stat label="Pipeline value" value={`$${totalPipeline.toLocaleString()}`} change="+18.4%" icon={TrendingUp}/>
          <Stat label="Open leads" value={leads.length} change="+12 this week" icon={Target}/>
          <Stat label="Follow-ups due" value="7" change="3 high priority" icon={Clock3}/>
          <Stat label="AI actions" value="42" change="This month" icon={Sparkles}/>
        </section>
        <section className="content-grid">
          <div className="panel leads-panel"><div className="panel-head"><div><h3>Priority leads</h3><p>People most likely to convert next.</p></div><button className="link-btn" onClick={() => setActive('Leads')}>View all <span>→</span></button></div><div className="search"><Search size={16}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search leads..."/></div><div className="lead-list">{filtered.slice(0,5).map(lead => <Lead key={lead.id} lead={lead}/>)}</div></div>
          <div className="panel automation-panel"><div className="panel-head"><div><h3>AI automations</h3><p>Running quietly in the background.</p></div><button className="dots"><MoreHorizontal size={18}/></button></div><Automation icon={MessageSquareText} title="Lead qualification" text="New enquiries are being scored." status="Running"/><Automation icon={Clock3} title="Follow-up assistant" text="7 conversations need attention." status="7 due"/><Automation icon={Sparkles} title="Reply copilot" text="Drafts are ready for review." status="12 drafts"/></div>
        </section>
        <section className="bottom-grid"><div className="panel insight"><div className="insight-orb"><Sparkles size={20}/></div><div><span className="mini-label">VALO INSIGHT</span><h3>Your fastest channel is WhatsApp.</h3><p>Leads from WhatsApp are converting <strong>31% faster</strong> than your other channels this week.</p></div></div><div className="panel task"><div className="task-top"><span className="mini-label">NEXT BEST ACTION</span><span className="priority">HIGH</span></div><h3>Follow up with Olivia Carter</h3><p>She asked for a proposal 12 minutes ago.</p><button className="action-btn" onClick={() => setAiOpen(true)}>Generate reply <Sparkles size={15}/></button></div></section>
      </> : <div className="empty-page"><div className="empty-icon"><Sparkles size={22}/></div><h2>{active} is ready.</h2><p>This section is part of the Valo workspace. We're building the workflow around real customer actions, not empty screens.</p><button className="primary" onClick={() => setActive('Overview')}>Back to overview</button></div>}
    </main>
    {aiOpen && <div className="modal-backdrop" onClick={() => setAiOpen(false)}><div className="ai-modal" onClick={e => e.stopPropagation()}><div className="modal-head"><div className="ai-icon"><Sparkles size={17}/></div><div><strong>Valo AI</strong><span>Sales copilot</span></div><button className="close" onClick={() => setAiOpen(false)}>×</button></div><div className="ai-response"><span>Suggested action</span><h3>Send Olivia a concise proposal follow-up.</h3><p>“Hi Olivia — thanks for reaching out. I’ve prepared the proposal based on what you shared. I’d be happy to walk you through it and answer any questions. Would today at 4pm work?”</p></div><div className="modal-actions"><button className="soft-btn" onClick={() => setAiOpen(false)}>Edit draft</button><button className="primary" onClick={() => setAiOpen(false)}>Approve & send</button></div></div></div>}
  </div>
}

function Stat({label,value,change,icon:Icon}) { return <div className="stat"><div className="stat-top"><span>{label}</span><Icon size={17}/></div><strong>{value}</strong><small>{change}</small></div> }
function Lead({lead}) { return <div className="lead"><div className="avatar">{lead.avatar}</div><div className="lead-main"><div className="lead-name"><strong>{lead.name}</strong><span className={`status ${lead.status.toLowerCase().replace(' ','-')}`}>{lead.status}</span></div><span>{lead.company} · {lead.channel}</span></div><div className="lead-intent"><strong>${lead.value.toLocaleString()}</strong><span>{lead.intent}</span></div><span className="lead-time">{lead.last}</span><MoreHorizontal size={17} className="lead-more"/></div> }
function Automation({icon:Icon,title,text,status}) { return <div className="automation"><div className="automation-icon"><Icon size={17}/></div><div><strong>{title}</strong><span>{text}</span></div><em>{status}</em></div> }

createRoot(document.getElementById('root')).render(<App />);
