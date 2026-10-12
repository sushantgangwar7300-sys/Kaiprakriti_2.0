import React, { useState, useRef, useEffect } from 'react';
import { DesignThemeId, ThemeMode, ChatMessage } from '../types';
import { MessageSquare, X, Send, Sparkles, Bot, User, RefreshCw, ChevronDown, ExternalLink } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface GeminiChatbotProps {
  theme: DesignThemeId;
  mode: ThemeMode;
  onNavigateToService?: (serviceId: string) => void;
}

const KNOWLEDGE_RESPONSES: Record<string, string> = {
  brsr: `Under SEBI LODR Regulation 34(2)(f), the top 1,000 listed entities in India must disclose sustainability metrics across nine NGRBC principles. 

Key attributes requiring **reasonable assurance** include:
- Scope 1 & 2 GHG footprint (including intensity per rupee of turnover)
- Water consumption & intensity
- Energy consumption & renewable share
- Circular economy and hazardous waste handling
- Fair living wages and employee diversity

Kai Prakriti builds your auditable data foundation (Line 1). An independent third-party verifier must perform the assurance (Line 2) to eliminate self-audit conflicts.`,
  cbam: `Regulation (EU) 2023/956 entered its definitive enforcement phase in 2026 for European imports of steel, aluminium, cement, hydrogen, and fertilizers.

Key calculation rules for Indian exporters:
1. **Direct Emissions:** Actual stoichiometric carbon balance in smelting, blast furnaces, and casting.
2. **Precursor Materials:** Emissions embedded in pig iron, scrap, and ferroalloys.
3. **Verification:** Must be performed by an accredited EU verifier (DAkkS, RvA, or accredited European validation body). Using default penalty values can cost exporters up to €95/tCO2e.`,
  scope3: `Scope 3 covers 15 upstream and downstream value chain categories under the GHG Protocol.

For Indian industrial companies:
- **Category 1 (Purchased Goods):** Kai Prakriti uses a hybrid tier system (primary supplier surveys for top 80% carbon contributors + localized Indian process LCA factors) instead of inaccurate spend-based EEIO numbers.
- **Category 4 (Upstream Logistics):** Modeled with ton-kilometer route analysis across Indian Railways and diesel road freight.`,
  firewall: `Kai Prakriti's Zero Self-Audit Firewall means we strictly bill for direct technical calculation (Scope 1-3, LCA, BRSR workbooks). 

We **never** issue verification statements or audit opinions on our own calculations. When statutory rules require independent verification (ISO 14064-3 or BEE ACVA), we facilitate introductions to accredited bodies and disclose all commissions in writing.`,
};

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({ theme, mode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      role: 'assistant',
      content: 'Namaste! I am the Kai Prakriti ESG Advisor. Ask me anything about SEBI BRSR Core, EU CBAM embedded emissions, Scope 1-3 GHG accounting, or our two-line statutory independence model.',
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isDark = mode === 'dark' || theme === 'vibrant';

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      // Check if client-side or server Gemini API is configured
      const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (window as any).__GEMINI_KEY__;

      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        const systemInstruction = `You are the Kai Prakriti AI ESG & Statutory Compliance Advisor. Kai Prakriti (प्रकृति-सतत-विकासः) is an environmental advisory in India.
Key Principles:
1. "We measure it. Someone independent verifies it." Kai Prakriti does direct technical GHG accounting (Scope 1-3), SEBI BRSR, product LCA, and carbon PDDs.
2. Kai Prakriti NEVER audits its own work. Statutory verifications are facilitated through independent accredited bodies (BEE ACVA, ISO 14064-3, DAkkS/RvA for EU CBAM).
3. Be professional, concise, authoritative on Indian and European regulations (SEBI LODR 34(2)(f), Regulation (EU) 2023/956, GHG Protocol, MSME ZED).`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemInstruction}\n\nUser Question: ${query}` }],
            },
          ],
        });

        const reply = response.text || 'I apologize, I could not process your query at this moment.';
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            role: 'assistant',
            content: reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } else {
        // Fallback intelligent ESG knowledge engine
        await new Promise((res) => setTimeout(res, 800));
        let reply = '';
        const lower = query.toLowerCase();

        if (lower.includes('brsr') || lower.includes('sebi')) {
          reply = KNOWLEDGE_RESPONSES.brsr;
        } else if (lower.includes('cbam') || lower.includes('europe') || lower.includes('steel')) {
          reply = KNOWLEDGE_RESPONSES.cbam;
        } else if (lower.includes('scope 3') || lower.includes('supply chain') || lower.includes('value chain')) {
          reply = KNOWLEDGE_RESPONSES.scope3;
        } else if (lower.includes('verify') || lower.includes('firewall') || lower.includes('revenue') || lower.includes('audit')) {
          reply = KNOWLEDGE_RESPONSES.firewall;
        } else {
          reply = `Thank you for your question regarding **"${query}"**. 

Kai Prakriti provides direct quantitative modeling across Scope 1-3 emissions, SEBI BRSR Core preparation, and EU CBAM reporting. To give you an exact regulatory response tailored to your corporate boundary, our advisory team can review your installation specs.

Would you like to initiate a formal 30-minute scoping discussion or inspect our 11 governed services?`;
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            role: 'assistant',
            content: reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: 'We are currently synchronizing our regulatory knowledge base. Please feel free to request a direct scoping call via the Contact page.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickChips = [
    { label: 'SEBI BRSR Core Rules', query: 'What are the statutory requirements for SEBI BRSR Core in India?' },
    { label: 'EU CBAM 2026', query: 'How does EU CBAM affect Indian steel exporters in 2026?' },
    { label: 'Scope 3 Category 1', query: 'How do you calculate Scope 3 Category 1 emissions for suppliers?' },
    { label: 'Zero Self-Audit Firewall', query: 'Why does Kai Prakriti separate direct measurement from verification?' },
  ];

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50 select-none max-w-[calc(100%-24px)]">
      {/* Minimized Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2 sm:gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl shadow-emerald-600/40 transition-all hover:scale-105 active:scale-95"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
          <Bot className="w-4 h-4" />
          <span>ESG Copilot</span>
        </button>
      )}

      {/* Expanded Multi-Turn Chat Window */}
      {isOpen && (
        <div className="w-[calc(100vw-28px)] max-w-[400px] h-[480px] sm:h-[560px] max-h-[82vh] rounded-2xl sm:rounded-3xl border flex flex-col overflow-hidden shadow-2xl bg-white dark:bg-slate-900 border-black/10 dark:border-white/10 animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="p-4 border-b border-black/10 dark:border-white/10 bg-emerald-600 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-serif font-bold text-sm">
                KP
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm leading-none">
                  Kai Prakriti ESG Copilot
                </h3>
                <span className="text-[10px] font-mono text-emerald-100 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  <span>Gemini ESG Intelligence</span>
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() =>
                  setMessages([
                    {
                      id: 'msg-reset',
                      role: 'assistant',
                      content: 'Conversation reset. How may I assist your sustainability reporting today?',
                      timestamp: 'Just now',
                    },
                  ])
                }
                className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                title="Reset conversation"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                title="Minimize chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompt Chips */}
          <div className="p-2 border-b border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01] overflow-x-auto flex gap-1.5 scrollbar-none font-mono text-[10px]">
            {quickChips.map((chip) => (
              <button
                key={chip.label}
                onClick={() => handleSend(chip.query)}
                className="shrink-0 px-2.5 py-1 rounded-full border border-black/10 dark:border-white/10 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/30 transition-all text-left"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Messages Scroll Thread */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-sans">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center font-bold text-[10px] ${
                      isUser
                        ? 'bg-emerald-600 text-white'
                        : 'bg-black/5 dark:bg-white/10 text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  <div
                    className={`p-3 rounded-2xl max-w-[82%] space-y-1 ${
                      isUser
                        ? 'bg-emerald-600 text-white rounded-tr-none'
                        : 'bg-black/[0.03] dark:bg-white/[0.05] border border-black/5 dark:border-white/5 rounded-tl-none leading-relaxed'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                    <span className={`block text-[9px] font-mono ${isUser ? 'text-emerald-200' : 'opacity-50'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs font-mono opacity-70 p-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-spin" />
                <span>Formulating statutory response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 border-t border-black/10 dark:border-white/10 bg-white dark:bg-slate-900 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about BRSR, CBAM, Scope 1-3..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="flex-1 px-3.5 py-2 rounded-xl border bg-black/[0.02] dark:bg-white/5 border-black/10 dark:border-white/10 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
