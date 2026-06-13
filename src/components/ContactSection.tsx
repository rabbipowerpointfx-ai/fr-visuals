/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Mail, User, DollarSign, MessageSquare, Send, CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle } from "lucide-react";
import { addMessage } from "../data/portfolioData";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "CGI & VFX Simulation",
    budget: "$5,000 — $10,000",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [ticketId, setTicketId] = useState("");

  const projectTypes = [
    "CGI & VFX Simulation",
    "Motion Graphics Spot",
    "4K Concert/VJ Loops",
    "Interactive Unreal Engine Dev",
    "Other Creative Commission"
  ];

  const budgets = [
    "Under $3,000",
    "$3,000 — $5,000",
    "$5,000 — $10,000",
    "$10,000 — $20,000",
    "$20,000+"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Minimal form validation
    if (!formData.name.trim()) {
      setErrorMsg("Please provide your full identity or project company name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMsg("Please provide a valid transit email address.");
      return;
    }
    if (formData.message.trim().length < 10) {
      setErrorMsg("Inquiry description must be at least 10 characters long.");
      return;
    }

    setLoading(true);

    // Simulate standard server/database network transit delayed at 1.4 seconds
    setTimeout(() => {
      try {
        const results = addMessage({
          name: formData.name,
          email: formData.email,
          projectType: formData.projectType,
          budget: formData.budget,
          message: formData.message
        });

        const generatedTicket = `FRV-${Math.floor(100000 + Math.random() * 900000)}`;
        setTicketId(generatedTicket);
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          projectType: "CGI & VFX Simulation",
          budget: "$5,000 — $10,000",
          message: ""
        });
      } catch (err) {
        setErrorMsg("Communication sync failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 1400);
  };

  return (
    <section id="contact" className="py-24 bg-[#050505] relative px-6 sm:px-12">
      {/* Background radial spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#E50000]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2.5 font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase">
            <span className="w-2 h-[1px] bg-[#E50000]"></span>
            <span>SECURE ENCRYPTED CHANNEL // INBOX NODE</span>
            <span className="w-2 h-[1px] bg-[#E50000]"></span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
            INQUIRE <span className="italic font-serif font-light text-[#E50000]">// PROJECT BRIEF</span>
          </h2>
          <p className="text-neutral-400 max-w-lg mx-auto font-sans font-light text-xs sm:text-sm tracking-wide leading-relaxed">
            Ready to deploy cutting-edge computer graphics on your next campaign or launch? Submit your metrics below. Response turns around within 24 hours.
          </p>
        </div>

        {/* Success Feedback card */}
        {success ? (
          <div className="bg-[#0b0b0b] rounded-none border border-[#E50000]/25 p-8 text-center space-y-6 glow-red max-w-2xl mx-auto">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
            <div className="space-y-2">
              <h3 className="font-display font-semibold text-xl text-white uppercase tracking-wider">
                TRANSMISSION ACQUIRED
              </h3>
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest leading-relaxed">
                TICKET NO: <span className="text-[#E50000] font-bold">{ticketId}</span>
              </p>
              <p className="text-neutral-400 text-xs font-sans font-light leading-relaxed max-w-sm mx-auto">
                Your creative specs have been logged. Fazle Rabbi's terminal has received the query. A project brief overview will be dispatched shortly.
              </p>
            </div>
            
            <div className="pt-4 border-t border-neutral-900/60 max-w-xs mx-auto">
              <button
                onClick={() => setSuccess(false)}
                className="w-full py-2.5 rounded-none bg-neutral-900 border border-neutral-800 hover:border-[#E50000] text-xs font-mono text-neutral-300 hover:text-white transition-all cursor-pointer focus:outline-none"
              >
                SUBMIT ANOTHER BRIEF
              </button>
            </div>
          </div>
        ) : (
          /* Glassmorphic Contact Interactive Form */
          <form
            onSubmit={handleFormSubmit}
            className="max-w-2xl mx-auto bg-[#0a0a0a]/80 backdrop-blur-md p-6 sm:p-10 rounded-none border border-neutral-900 space-y-6 shadow-2xl"
          >
            {errorMsg && (
              <div className="flex items-center gap-3 p-4 rounded-none bg-red-500/10 border border-red-500/25 text-red-400 text-xs">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span className="font-mono tracking-wide uppercase">{errorMsg}</span>
              </div>
            )}

            {/* Row 1: Name and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Field: Full Name */}
              <div className="space-y-2">
                <label className="block font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400">
                  01. COMPANY OR INDIVIDUAL NAME <span className="text-[#E50000] font-bold">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-[#E50000]">
                    <User className="w-3.5 h-3.5 transition-colors" />
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="E.g., Warner Bros. Creative"
                    className="w-full pl-10 pr-4 py-3 bg-[#060606] border border-neutral-800 rounded-none focus:border-[#E50000] focus:outline-none transition-all placeholder-neutral-600 text-sm font-sans tracking-wide text-white"
                  />
                </div>
              </div>

              {/* Field: Email */}
              <div className="space-y-2">
                <label className="block font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400">
                  02. SECURE EMAIL ADDRESS <span className="text-[#E50000] font-bold">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                    <Mail className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="E.g., contact@studio.com"
                    className="w-full pl-10 pr-4 py-3 bg-[#060606] border border-neutral-800 rounded-none focus:border-[#E50000] focus:outline-none transition-all placeholder-neutral-600 text-sm font-sans tracking-wide text-white"
                  />
                </div>
              </div>

            </div>

            {/* Row 2: Project Type and Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Field: Project Category */}
              <div className="space-y-2">
                <label className="block font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400">
                  03. CORE PROJECT FOCUS
                </label>
                <div className="relative">
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-3 bg-[#060606] border border-neutral-800 rounded-none focus:border-[#E50000] focus:outline-none transition-all text-sm font-sans tracking-wide text-neutral-300 cursor-pointer"
                  >
                    {projectTypes.map((type, idx) => (
                      <option key={idx} value={type} className="bg-neutral-950 text-white">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Field: Budget Estimate */}
              <div className="space-y-2">
                <label className="block font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400">
                  04. TARGET BUDGET ALLOCATION
                </label>
                <div className="relative">
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-3 bg-[#060606] border border-neutral-800 rounded-none focus:border-[#E50000] focus:outline-none transition-all text-sm font-sans tracking-wide text-neutral-300 cursor-pointer"
                  >
                    {budgets.map((budget, idx) => (
                      <option key={idx} value={budget} className="bg-neutral-950 text-white">
                        {budget}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

            </div>

            {/* Row 3: Description area */}
            <div className="space-y-2">
              <label className="block font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400">
                05. INQUIRY SPECS & TIMELINE REQUIREMENTS <span className="text-[#E50000] font-bold">*</span>
              </label>
              <div className="relative">
                <span className="absolute top-3.5 left-3.5 pointer-events-none text-neutral-500">
                  <MessageSquare className="w-3.5 h-3.5" />
                </span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Outline the creative goals, number of outputs, required software integrations, and target deadline..."
                  className="w-full pl-10 pr-4 py-3 bg-[#060606] border border-neutral-800 rounded-none focus:border-[#E50000] focus:outline-none transition-all placeholder-neutral-600 text-sm font-sans tracking-wide text-white"
                />
              </div>
            </div>

            {/* Bottom Form Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-neutral-900/60">
              <div className="flex items-center gap-1.5 font-mono text-[9px] text-neutral-500 uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E50000]" />
                SSL NODIFIED DEPLOYMENT // SECURE GATEWAY
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3.5 rounded-none bg-[#E50000] font-display font-extrabold text-xs text-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2 relative shadow-lg hover:shadow-[#E50000]/25 cursor-pointer disabled:bg-neutral-800 disabled:text-neutral-500"
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-black/35 border-t-black animate-spin"></span>
                    SYNCING SPECS...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    SUBMIT INQUIRY
                  </>
                )}
              </button>
            </div>
          </form>
        )}

      </div>
    </section>
  );
}
