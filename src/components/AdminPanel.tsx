/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  X, Plus, DollarSign, Check, Edit, FileCode, PlayCircle, Loader2, Undo, 
  Trash2, MailOpen, Mail, Clock, Calendar, Briefcase, Database, RefreshCw, Eye 
} from "lucide-react";
import { Project, ContactMessage } from "../types";
import { 
  getProjects, saveProject, deleteProject, resetPortfolioToDefaults,
  getMessages, toggleMessageRead, deleteMessage 
} from "../data/portfolioData";

interface AdminPanelProps {
  onClose: () => void;
  onProjectsUpdate: (updated: Project[]) => void;
}

export default function AdminPanel({ onClose, onProjectsUpdate }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<"projects" | "inbox" | "schema">("projects");
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [messagesList, setMessagesList] = useState<ContactMessage[]>([]);
  
  // Create / Edit projects state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  
  // Status feedback states
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Load datasets on startup
  useEffect(() => {
    setProjectsList(getProjects());
    setMessagesList(getMessages());
  }, []);

  const refreshDatasets = () => {
    setProjectsList(getProjects());
    setMessagesList(getMessages());
  };

  // Poll messages periodically to simulate network updates
  useEffect(() => {
    const timer = setInterval(() => {
      setMessagesList(getMessages());
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Form State for edit / create
  const [formFields, setFormFields] = useState({
    id: "",
    title: "",
    category: "CGI & VFX",
    description: "",
    youtubeUrl: "",
    thumbnail: "",
    featured: false,
    role: "",
    tools: "",
    client: "",
    year: "",
    duration: ""
  });

  const categories = [
    "CGI & VFX",
    "Motion Design",
    "VJ Loops & 3D Art",
    "Commercials"
  ];

  const handleEditClick = (proj: Project) => {
    setEditingProject(proj);
    setIsAddingNew(false);
    setFormFields({
      id: proj.id,
      title: proj.title,
      category: proj.category,
      description: proj.description,
      youtubeUrl: proj.youtubeUrl,
      thumbnail: proj.thumbnail,
      featured: proj.featured,
      role: proj.role,
      tools: proj.tools.join(", "),
      client: proj.client,
      year: proj.year,
      duration: proj.duration || ""
    });
    setFeedbackMsg("");
  };

  const handleAddNewClick = () => {
    setIsAddingNew(true);
    setEditingProject(null);
    setFormFields({
      id: `proj-${Date.now()}`,
      title: "",
      category: "CGI & VFX",
      description: "",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      featured: false,
      role: "Director & CGI Artist",
      tools: "Cinema 4D, After Effects",
      client: "Aesthetic Core Label",
      year: "2026",
      duration: "1:00"
    });
    setFeedbackMsg("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormFields(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormFields(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFields.title.trim()) {
      setFeedbackMsg("⚠️ Error: Please specify a project title.");
      return;
    }
    if (!formFields.description.trim()) {
      setFeedbackMsg("⚠️ Error: Description is required.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const parsedTools = formFields.tools
        .split(",")
        .map(t => t.trim())
        .filter(t => t.length > 0);

      const saved: Project = {
        id: formFields.id,
        title: formFields.title,
        category: formFields.category,
        description: formFields.description,
        youtubeUrl: formFields.youtubeUrl,
        thumbnail: formFields.thumbnail,
        featured: formFields.featured,
        role: formFields.role || "Designer",
        tools: parsedTools,
        client: formFields.client || "Personal Concept",
        year: formFields.year || "2026",
        duration: formFields.duration || "1:00"
      };

      const updatedList = saveProject(saved);
      setProjectsList(updatedList);
      onProjectsUpdate(updatedList);

      setEditingProject(null);
      setIsAddingNew(false);
      setFeedbackMsg("✅ Database modified successfully. Cache flushed.");
      setLoading(false);
    }, 600);
  };

  const handleDeleteClick = (id: string) => {
    if (window.confirm("Are you sure you want to delete this project? This flushes it from the mock Sanity layer.")) {
      const updatedList = deleteProject(id);
      setProjectsList(updatedList);
      onProjectsUpdate(updatedList);
      setFeedbackMsg("🗑️ Project deleted successfully.");
      if (editingProject?.id === id) {
        setEditingProject(null);
      }
    }
  };

  const handleRestoreDefaults = () => {
    if (window.confirm("This resets the simulation to the initial default high-end projects list. Proceed?")) {
      const updatedList = resetPortfolioToDefaults();
      setProjectsList(updatedList);
      onProjectsUpdate(updatedList);
      setFeedbackMsg("🔄 Restored factory default portfolio.");
    }
  };

  const handleToggleRead = (id: string) => {
    const updated = toggleMessageRead(id);
    setMessagesList(updated);
  };

  const handleDeleteMessage = (id: string) => {
    if (window.confirm("Erase this client request from node history?")) {
      const updated = deleteMessage(id);
      setMessagesList(updated);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-sm">
      {/* Click Outside Close */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Main Panel Content Box */}
      <div className="relative w-full max-w-4xl h-full bg-[#090909] border-l border-neutral-900 flex flex-col z-10 shadow-2xl overflow-hidden animate-slide-in">
        
        {/* Core Admin Header */}
        <div className="p-6 border-b border-neutral-900 bg-[#0b0b0b] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-none bg-[#E50000]/10 border border-[#E50000]/20 text-[#E50000]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-black text-lg tracking-wider text-white">FR VISUALS // SANITY STUDIO</h2>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500 leading-none">
                Local Schema Simulation Engine v1.4.1
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-none border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Workspace Category Tabs */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-neutral-950 bg-[#070707] text-xs font-mono">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-2 border-b-2 tracking-widest uppercase transition-all focus:outline-none cursor-pointer ${
              activeTab === "projects"
                ? "border-[#E50000] text-[#E50000] font-medium"
                : "border-transparent text-neutral-500 hover:text-neutral-300"
            }`}
          >
            📂 PORTFOLIO CMS ({projectsList.length})
          </button>
          
          <button
            onClick={() => setActiveTab("inbox")}
            className={`px-4 py-2 border-b-2 tracking-widest uppercase transition-all relative focus:outline-none cursor-pointer ${
              activeTab === "inbox"
                ? "border-[#E50000] text-[#E50000] font-medium"
                : "border-transparent text-neutral-500 hover:text-neutral-300"
            }`}
          >
            📥 CLIENT INBOX ({messagesList.filter(m => !m.read).length} NEW)
            {messagesList.filter(m => !m.read).length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-none bg-[#E50000] text-[8px] text-black font-bold">
                NEW
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("schema")}
            className={`px-4 py-2 border-b-2 tracking-widest uppercase transition-all focus:outline-none cursor-pointer ${
              activeTab === "schema"
                ? "border-[#E50000] text-white font-medium"
                : "border-transparent text-neutral-600 hover:text-neutral-400"
            }`}
          >
            ⚙️ SCHEMATIC OVERVIEW
          </button>
        </div>

        {/* Panel Main Scrolling Contents */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {feedbackMsg && (
            <div className="p-4 rounded-none bg-[#E50000]/5 text-[#E50000] border border-[#E50000]/10 font-mono text-xs flex justify-between items-center transition-all animate-pulse">
              <span>{feedbackMsg}</span>
              <button onClick={() => setFeedbackMsg("")} className="text-neutral-500 hover:text-white">✕</button>
            </div>
          )}

          {/* TAB 1: PORTFOLIO DATA MANAGER */}
          {activeTab === "projects" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Side: Element items list */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                    — REGISTERED PORTFOLIO PIECES
                  </h3>
                  <button
                    onClick={handleAddNewClick}
                    className="flex items-center gap-1.5 p-1 px-2.5 rounded-none bg-[#E50000] text-black font-display font-extrabold text-[9px] tracking-widest uppercase hover:bg-white transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3 stroke-[3]" /> NEW PIECE
                  </button>
                </div>

                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                  {projectsList.map((p) => {
                    const isSelected = editingProject?.id === p.id;
                    return (
                      <div
                        key={p.id}
                        className={`p-3 rounded-none border transition-all flex items-center justify-between group ${
                          isSelected
                            ? "border-[#E50000] bg-[#E50000]/5 text-white"
                            : "border-neutral-900 bg-neutral-950/60 hover:border-neutral-800"
                        }`}
                      >
                        <button
                          onClick={() => handleEditClick(p)}
                          className="flex items-center gap-3 text-left flex-1 min-w-0"
                        >
                          <img
                            src={p.thumbnail}
                            alt=""
                            referrerPolicy="no-referrer"
                            className="w-10 h-8 rounded-none object-cover shrink-0 bg-neutral-900"
                          />
                          <div className="min-w-0">
                            <h4 className="font-display font-semibold text-xs truncate uppercase text-neutral-200 group-hover:text-white">
                              {p.title.split(" // ")[0]}
                            </h4>
                            <p className="font-mono text-[8px] text-neutral-500 uppercase tracking-wider block">
                              {p.category} • {p.year}
                            </p>
                          </div>
                        </button>

                        <div className="flex items-center gap-1 pt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEditClick(p)}
                            className="p-1 px-1.5 rounded-none bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
                            title="Edit Project"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(p.id)}
                            className="p-1 px-1.5 rounded-none bg-neutral-900 hover:bg-red-500/15 text-neutral-400 hover:text-red-400 cursor-pointer"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-neutral-900">
                  <button
                    onClick={handleRestoreDefaults}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-none bg-neutral-950 border border-neutral-900 hover:border-neutral-800 text-neutral-500 hover:text-neutral-300 font-mono text-[10px] uppercase tracking-widest cursor-pointer/10"
                  >
                    <Undo className="w-3.5 h-3.5" />
                    RESTORE DEFAULT DATA TEMPLATE
                  </button>
                </div>
              </div>

              {/* Right Side: Detailed Edit / Add panel */}
              <div className="lg:col-span-7 bg-neutral-950/60 rounded-none border border-neutral-900 p-5 space-y-4">
                {editingProject || isAddingNew ? (
                  <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-sans">
                    <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#E50000]">
                        {isAddingNew ? "🛠️ GENERATING PORTFOLIO PIECE" : `🛠️ EDITING: ${editingProject?.id}`}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProject(null);
                          setIsAddingNew(false);
                        }}
                        className="text-neutral-500 hover:text-neutral-300 font-mono text-[10px]"
                      >
                        CLOSE FORM
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400">PROJECT TITLE</label>
                      <input
                        type="text"
                        name="title"
                        value={formFields.title}
                        onChange={handleInputChange}
                        placeholder="E.g., METROPOLIS // Animated VFX Reel"
                        className="w-full px-3 py-2 bg-neutral-900 rounded-none border border-neutral-850 text-white focus:outline-none focus:border-[#E50000]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400">CATEGORY</label>
                        <select
                          name="category"
                          value={formFields.category}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-neutral-900 rounded-none border border-neutral-850 text-neutral-300 focus:outline-none"
                        >
                          {categories.map((c, idx) => (
                            <option key={idx} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400">YEAR</label>
                        <input
                          type="text"
                          name="year"
                          value={formFields.year}
                          onChange={handleInputChange}
                          placeholder="2026"
                          className="w-full px-3 py-2 bg-neutral-900 rounded-none border border-neutral-850 text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400">DESCRIPTION (MARKDOWN COMPATIBLE)</label>
                      <textarea
                        name="description"
                        value={formFields.description}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Explain the project layout, technical parameters, compositing, etc."
                        className="w-full px-3 py-2 bg-neutral-900 rounded-none border border-neutral-850 text-white focus:outline-none focus:border-[#E50000]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400">YOUTUBE STREAM URL</label>
                      <input
                        type="text"
                        name="youtubeUrl"
                        value={formFields.youtubeUrl}
                        onChange={handleInputChange}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="w-full px-3 py-2 bg-neutral-900 rounded-none border border-neutral-850 text-white focus:outline-none focus:border-[#E50000]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400">BACKDROP COVER THUMBNAIL URL</label>
                      <input
                        type="text"
                        name="thumbnail"
                        value={formFields.thumbnail}
                        onChange={handleInputChange}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-3 py-2 bg-neutral-900 rounded-none border border-neutral-850 text-white focus:outline-none focus:border-[#E50000]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400">ARTIST ROLE</label>
                        <input
                          type="text"
                          name="role"
                          value={formFields.role}
                          onChange={handleInputChange}
                          placeholder="CGI Director"
                          className="w-full px-3 py-2 bg-[#0d0d0d] rounded-none border border-neutral-850 text-white focus:outline-none focus:border-[#E50000]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400">CLIENT NAME</label>
                        <input
                          type="text"
                          name="client"
                          value={formFields.client}
                          onChange={handleInputChange}
                          placeholder="Aether Records"
                          className="w-full px-3 py-2 bg-[#0d0d0d] rounded-none border border-neutral-850 text-white focus:outline-none focus:border-[#E50000]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400">TOOLS (COMMA-SEPARATED)</label>
                        <input
                          type="text"
                          name="tools"
                          value={formFields.tools}
                          onChange={handleInputChange}
                          placeholder="Houdini, Redshift, Nuke"
                          className="w-full px-3 py-2 bg-[#0d0d0d] rounded-none border border-neutral-850 text-white focus:outline-none focus:border-[#E50000]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400">DURATION SPEC</label>
                        <input
                          type="text"
                          name="duration"
                          value={formFields.duration}
                          onChange={handleInputChange}
                          placeholder="1:15"
                          className="w-full px-3 py-2 bg-[#0d0d0d] rounded-none border border-neutral-850 text-white focus:outline-none focus:border-[#E50000]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 py-1 bg-neutral-950 p-2.5 rounded-none border border-neutral-900">
                      <input
                        type="checkbox"
                        id="featured"
                        name="featured"
                        checked={formFields.featured}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#E50000] rounded-none border-neutral-800 bg-neutral-900 focus:ring-0 focus:outline-none cursor-pointer"
                      />
                      <label htmlFor="featured" className="font-mono text-[9px] uppercase tracking-widest text-neutral-300 cursor-pointer">
                        FLAG PROJECT AS FEATURED STAR
                      </label>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-white text-black font-display font-black text-[10px] tracking-widest uppercase hover:bg-[#E50000] hover:text-black rounded-none transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            INDEXING METRICS IN DB...
                          </>
                        ) : (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            SAVE & SYNC TO GRAPH
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                ) : (
                  <div className="min-h-[300px] flex flex-col items-center justify-center text-center space-y-4">
                    <Database className="w-10 h-10 text-neutral-700 animate-bounce" />
                    <div className="space-y-1">
                      <h4 className="font-display font-semibold text-[#f5f5f5] text-xs uppercase">
                        Sanity Studio Idle State
                      </h4>
                      <p className="text-neutral-500 max-w-xs text-[10px] font-sans leading-relaxed tracking-wider mx-auto uppercase">
                        Select an existing creative piece from the left index column for modification, or trigger 'New Piece' to publish a fresh video block.
                      </p>
                    </div>
                  </div>
                )}

              </div>

            </div>
          )}

          {/* TAB 2: RECEIVED WORK briefs */}
          {activeTab === "inbox" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                <h3 className="font-mono text-[10px] tracking-widest text-[#E50000] uppercase flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#E50000]" /> — ACTIVE PROJECT REQUEST NODES
                </h3>
                <span className="font-mono text-[9px] text-neutral-500 uppercase">
                  BUFFER CAPACITY: 128 INBOX MEMORIES
                </span>
              </div>

              {messagesList.length === 0 ? (
                <div className="py-24 text-center border border-dashed border-neutral-900 rounded-none space-y-4">
                  <Mail className="w-12 h-12 text-neutral-800 mx-auto animate-pulse" />
                  <p className="font-mono text-[10px] text-neutral-500 tracking-widest uppercase">
                    NO WORK INQUIRIES REGISTERED ON NETWORK BUFFER
                  </p>
                  <p className="text-neutral-600 text-xs text-sans max-w-xs mx-auto font-light leading-relaxed tracking-wide">
                    Fill out and submit the Contact Brief form on the index home view to see new messages register here in real-time.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {messagesList.map((m) => (
                    <div
                      key={m.id}
                      className={`p-5 rounded-none border transition-all space-y-4 flex flex-col justify-between ${
                        m.read
                          ? "bg-neutral-950/40 border-neutral-950 opacity-80"
                          : "bg-neutral-950 border-[#E50000]/20 shadow-[0_0_15px_rgba(229,0,0,0.02)]"
                      }`}
                    >
                      <div className="space-y-3">
                        {/* Header Details */}
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-mono text-[8px] px-2 py-0.5 rounded-none bg-[#E50000]/10 border border-[#E50000]/20 text-[#E50000] tracking-widest uppercase inline-block mb-1.5">
                              {m.projectType}
                            </span>
                            <h4 className="font-display font-bold text-sm text-neutral-100 uppercase">
                              {m.name}
                            </h4>
                            <a
                              href={`mailto:${m.email}`}
                              className="font-mono text-[9px] text-neutral-500 hover:text-[#E50000] hover:underline block truncate"
                            >
                              📧 {m.email}
                            </a>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => handleToggleRead(m.id)}
                              className={`p-1.5 rounded-none transition-all cursor-pointer ${
                                m.read
                                  ? "bg-neutral-905 hover:bg-neutral-850 text-neutral-400 hover:text-white"
                                  : "bg-[#E50000]/20 hover:bg-[#E50000]/30 border border-[#E50000]/30 text-[#E50000]"
                              }`}
                              title={m.read ? "Mark as Unread" : "Mark as Read"}
                            >
                              {m.read ? <MailOpen className="w-3.5 h-3.5" /> : <Mail className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              onClick={() => handleDeleteMessage(m.id)}
                              className="p-1.5 rounded-none bg-neutral-900 hover:bg-red-500/10 text-neutral-400 hover:text-red-400 cursor-pointer"
                              title="Delete inquiry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Middle: Content brief message */}
                        <p className="bg-[#0c0c0c] p-3 rounded-none font-sans text-xs text-neutral-400 font-light leading-relaxed tracking-wide min-h-[70px]">
                          {m.message}
                        </p>
                      </div>

                      {/* Footer Details */}
                      <div className="flex justify-between items-center pt-3 border-t border-neutral-900/60 font-mono text-[9px] text-neutral-500 uppercase">
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3.5 h-3.5 text-[#E50000]" /> BUDGET: {m.budget}
                        </span>
                        <span>
                          ⏱️ {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SCHEMA SPECIFICATION */}
          {activeTab === "schema" && (
            <div className="bg-neutral-950 p-6 rounded-none border border-neutral-900 space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
                <span className="font-mono text-[10px] tracking-widest text-[#E50000] uppercase flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-[#E50000]" /> SANITY SCHEMATIC DOCUMENT IDENTIFIER
                </span>
                <span className="text-neutral-500 font-mono text-[9px] uppercase">
                  TYPE: SANITY.DOCUMENT
                </span>
              </div>

              <div className="space-y-4">
                <p className="font-sans text-xs text-neutral-400 font-light leading-relaxed tracking-wider">
                  The client has configured standard Sanity CMS schemas for rendering fluid collections. Real-time REST fields map exactly to the local TypeScript client types:
                </p>

                <pre className="p-4 bg-[#050505] rounded-none border border-neutral-900 text-[#E50000] font-mono text-[10px] overflow-x-auto leading-relaxed whitespace-pre-wrap">
{`export default defineType({
  name: "project",
  title: "VFX & Motion Design Projects",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "category", type: "string" }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "youtubeUrl", type: "url" }),
    defineField({ name: "thumbnail", type: "url" }),
    defineField({ name: "featured", type: "boolean" }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "tools", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "client", type: "string" }),
    defineField({ name: "year", type: "string" }),
    defineField({ name: "duration", type: "string" })
  ]
})`}
                </pre>
              </div>

              <div className="p-4 bg-[#E50000]/5 text-[#E50000] rounded-none border border-[#E50000]/10 font-mono text-[9px] uppercase leading-relaxed">
                ✨ MOCK CONNECTIVITY NOTES: REST capabilities are fully simulated inside client-side buffer stacks. Saving elements instantly re-maps DOM nodes. Perfect for deployment design audits.
              </div>
            </div>
          )}

        </div>

        {/* Studio Footer details */}
        <div className="p-4 bg-[#070707] border-t border-neutral-900 flex justify-between items-center text-[9px] text-[#A3A3A3] font-mono uppercase">
          <span>BUFFERS SECURED // DIRECT_IO CHANNEL OK</span>
          <span className="text-[#E50000] animate-pulse">● CMS BROADCAST STREAMING LIVE</span>
        </div>

      </div>
    </div>
  );
}
