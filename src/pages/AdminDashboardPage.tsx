import React, { useState, useEffect } from 'react';
import { PageId, Lead, BlogPost, ServiceItem, ServiceCategory } from '../types';
import { getStoredLeads, updateLeadStatus, deleteLead, saveLead, MOCK_ANALYTICS } from '../data/leadStore';
import { INITIAL_BLOG_POSTS } from '../data/blogData';
import { getStoredServices, saveService, updateService, deleteService } from '../data/servicesStore';
import { KaiPrakritiEmblem } from '../components/KaiPrakritiEmblem';
import {
  BarChart3,
  Users,
  TrendingUp,
  Database,
  Search,
  Download,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  LogOut,
  BookOpen,
  Eye,
  ThumbsUp,
  X,
  DollarSign,
  CheckCircle2,
  Briefcase,
  Layers,
  Sparkles
} from 'lucide-react';

interface AdminDashboardPageProps {
  theme?: string;
  mode?: string;
  onLogout: () => void;
  onNavigate: (page: PageId, extraParam?: string) => void;
}

type AdminTab = 'analytics' | 'leads' | 'services' | 'blogs';

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  onLogout,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('analytics');

  // Leads State
  const [leads, setLeads] = useState<Lead[]>(getStoredLeads);
  const [leadFilterStatus, setLeadFilterStatus] = useState<string>('all');
  const [leadSearch, setLeadSearch] = useState<string>('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);

  // New Lead form state
  const [newLeadData, setNewLeadData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    companyType: 'corporate',
    serviceId: 'ghg-accounting',
    estimatedBudget: 'Under Evaluation',
    targetDeadline: 'Q4 2026',
    message: '',
  });

  // Services State (Add / Edit / Delete)
  const [services, setServices] = useState<ServiceItem[]>(getStoredServices);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceFormData, setServiceFormData] = useState({
    title: '',
    shortDesc: '',
    fullDesc: '',
    standard: 'GHG Protocol & ISO 14064',
    standardCode: 'ISO 14064-1',
    category: 'direct' as ServiceCategory,
    deliverables: 'Activity data collection template, Traceable calculation workbook, Audit defense dossier',
    keyMetric: 'Complete 15-category Scope 3 coverage',
    whySeparateNote: 'Kai Prakriti calculates the footprint. An independent accredited auditor verifies it.',
  });

  // Blogs State (Add / Edit / Delete)
  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    try {
      const stored = localStorage.getItem('kai_prakriti_blogs_v2');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return INITIAL_BLOG_POSTS;
  });

  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogFormData, setBlogFormData] = useState({
    title: '',
    slug: '',
    category: 'BRSR & SEBI',
    excerpt: '',
    content: '',
    author: 'Sushant Gangwar',
    authorRole: 'Head of ESG Advisory & Growth',
    readTime: '6 min read',
    tags: 'SEBI, BRSR, Assurance',
    mediumUrl: '',
    linkedinUrl: '',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
  });

  // Event Listeners for real-time local updates
  useEffect(() => {
    const handleLeadUpdate = (e: any) => {
      if (e.detail) setLeads(e.detail);
      else setLeads(getStoredLeads());
    };
    const handleServiceUpdate = (e: any) => {
      if (e.detail) setServices(e.detail);
      else setServices(getStoredServices());
    };

    window.addEventListener('kai_prakriti_leads_updated', handleLeadUpdate);
    window.addEventListener('kai_prakriti_services_updated', handleServiceUpdate);

    return () => {
      window.removeEventListener('kai_prakriti_leads_updated', handleLeadUpdate);
      window.removeEventListener('kai_prakriti_services_updated', handleServiceUpdate);
    };
  }, []);

  // Save blogs to local storage and sync
  const persistBlogs = (updated: BlogPost[]) => {
    setBlogs(updated);
    try {
      localStorage.setItem('kai_prakriti_blogs_v2', JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('kai_prakriti_blogs_updated', { detail: updated }));
    } catch (e) {}
  };

  // -------------------------------------------------------------
  // LEADS ACTIONS
  // -------------------------------------------------------------
  const handleStatusChange = (leadId: string, status: Lead['status']) => {
    const updated = updateLeadStatus(leadId, status, `Status changed to ${status.toUpperCase()} on ${new Date().toLocaleDateString()}`);
    setLeads(updated);
  };

  const handleDeleteLead = (id: string) => {
    if (window.confirm('Are you sure you want to remove this enterprise lead record?')) {
      const updated = deleteLead(id);
      setLeads(updated);
      if (selectedLead?.id === id) setSelectedLead(null);
    }
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadData.name || !newLeadData.email || !newLeadData.company) return;

    saveLead({
      name: newLeadData.name,
      company: newLeadData.company,
      email: newLeadData.email,
      phone: newLeadData.phone || '+91 Not Provided',
      companyType: newLeadData.companyType,
      serviceId: newLeadData.serviceId,
      status: 'new',
      estimatedBudget: newLeadData.estimatedBudget,
      targetDeadline: newLeadData.targetDeadline,
      message: newLeadData.message || 'Manually entered via Admin Dashboard',
      notes: ['Created by administrator'],
      source: 'Admin Manual Entry',
    });

    setLeads(getStoredLeads());
    setIsAddLeadOpen(false);
    setNewLeadData({
      name: '',
      company: '',
      email: '',
      phone: '',
      companyType: 'corporate',
      serviceId: 'ghg-accounting',
      estimatedBudget: 'Under Evaluation',
      targetDeadline: 'Q4 2026',
      message: '',
    });
  };

  const handleExportCSV = () => {
    const headers = ['Lead ID', 'Name', 'Company', 'Email', 'Phone', 'Company Type', 'Service ID', 'Status', 'Budget', 'Target Deadline', 'Created At'];
    const rows = leads.map(l => [
      l.id,
      `"${l.name}"`,
      `"${l.company}"`,
      l.email,
      l.phone,
      l.companyType,
      l.serviceId,
      l.status,
      `"${l.estimatedBudget || ''}"`,
      `"${l.targetDeadline || ''}"`,
      l.createdAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `kai_prakriti_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // -------------------------------------------------------------
  // SERVICES ACTIONS (ADD / EDIT / DELETE)
  // -------------------------------------------------------------
  const handleOpenAddService = () => {
    setEditingServiceId(null);
    setServiceFormData({
      title: '',
      shortDesc: '',
      fullDesc: '',
      standard: 'GHG Protocol & ISO 14064',
      standardCode: 'ISO 14064-1',
      category: 'direct',
      deliverables: 'Activity data collection template, Traceable calculation workbook, Audit defense dossier',
      keyMetric: '100% Primary Data Led',
      whySeparateNote: 'Kai Prakriti calculates the footprint. An independent accredited auditor verifies it.',
    });
    setIsServiceModalOpen(true);
  };

  const handleOpenEditService = (service: ServiceItem) => {
    setEditingServiceId(service.id);
    setServiceFormData({
      title: service.title,
      shortDesc: service.shortDesc,
      fullDesc: service.fullDesc,
      standard: service.standard,
      standardCode: service.standardCode,
      category: service.category,
      deliverables: service.deliverables.join(', '),
      keyMetric: service.keyMetric || '100% Primary Data Led',
      whySeparateNote: service.whySeparateNote || '',
    });
    setIsServiceModalOpen(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceFormData.title || !serviceFormData.shortDesc) return;

    const deliverablesArray = serviceFormData.deliverables.split(',').map(d => d.trim()).filter(Boolean);

    if (editingServiceId) {
      // Edit existing
      const updated = updateService(editingServiceId, {
        title: serviceFormData.title,
        shortDesc: serviceFormData.shortDesc,
        fullDesc: serviceFormData.fullDesc || serviceFormData.shortDesc,
        standard: serviceFormData.standard,
        standardCode: serviceFormData.standardCode,
        category: serviceFormData.category,
        deliverables: deliverablesArray,
        keyMetric: serviceFormData.keyMetric,
        whySeparateNote: serviceFormData.whySeparateNote,
      });
      setServices(updated);
    } else {
      // Add new
      const updated = saveService({
        title: serviceFormData.title,
        shortDesc: serviceFormData.shortDesc,
        fullDesc: serviceFormData.fullDesc || serviceFormData.shortDesc,
        standard: serviceFormData.standard,
        standardCode: serviceFormData.standardCode,
        category: serviceFormData.category,
        deliverables: deliverablesArray,
        keyMetric: serviceFormData.keyMetric,
        whySeparateNote: serviceFormData.whySeparateNote,
      });
      setServices(updated);
    }
    setIsServiceModalOpen(false);
  };

  const handleDeleteServiceItem = (id: string) => {
    if (window.confirm('Delete this service practice from the public catalogue?')) {
      const updated = deleteService(id);
      setServices(updated);
    }
  };

  // -------------------------------------------------------------
  // BLOG ACTIONS (ADD / EDIT / DELETE)
  // -------------------------------------------------------------
  const handleOpenAddBlog = () => {
    setEditingBlogId(null);
    setBlogFormData({
      title: '',
      slug: '',
      category: 'BRSR & SEBI',
      excerpt: '',
      content: '',
      author: 'Sushant Gangwar',
      authorRole: 'Head of ESG Advisory & Growth',
      readTime: '6 min read',
      tags: 'SEBI, BRSR, Assurance',
      mediumUrl: '',
      linkedinUrl: '',
      coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    });
    setIsBlogModalOpen(true);
  };

  const handleOpenEditBlog = (b: BlogPost) => {
    setEditingBlogId(b.id);
    setBlogFormData({
      title: b.title,
      slug: b.slug,
      category: b.category,
      excerpt: b.excerpt,
      content: b.content,
      author: b.author,
      authorRole: b.authorRole,
      readTime: b.readTime,
      tags: b.tags.join(', '),
      mediumUrl: b.mediumUrl || '',
      linkedinUrl: b.linkedinUrl || '',
      coverImage: b.coverImage || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    });
    setIsBlogModalOpen(true);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogFormData.title || !blogFormData.content) return;

    const slug = blogFormData.slug || blogFormData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const tagsArray = blogFormData.tags.split(',').map(t => t.trim()).filter(Boolean);

    if (editingBlogId) {
      // Update existing post
      const updated = blogs.map(b => (b.id === editingBlogId ? {
        ...b,
        title: blogFormData.title,
        slug: slug,
        excerpt: blogFormData.excerpt || blogFormData.content.slice(0, 160) + '...',
        content: blogFormData.content,
        author: blogFormData.author,
        authorRole: blogFormData.authorRole,
        readTime: blogFormData.readTime,
        category: blogFormData.category,
        tags: tagsArray.length > 0 ? tagsArray : ['Regulatory', 'ESG'],
        mediumUrl: blogFormData.mediumUrl || 'https://medium.com/@kaiprakriti',
        linkedinUrl: blogFormData.linkedinUrl || 'https://www.linkedin.com/company/kai-prakriti',
        coverImage: blogFormData.coverImage,
      } : b));
      persistBlogs(updated);
    } else {
      // Add new post
      const newPost: BlogPost = {
        id: `post-${Date.now()}`,
        title: blogFormData.title,
        slug: slug,
        excerpt: blogFormData.excerpt || blogFormData.content.slice(0, 160) + '...',
        content: blogFormData.content,
        author: blogFormData.author,
        authorRole: blogFormData.authorRole,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: blogFormData.readTime,
        category: blogFormData.category,
        tags: tagsArray.length > 0 ? tagsArray : ['Regulatory', 'ESG'],
        mediumUrl: blogFormData.mediumUrl || 'https://medium.com/@kaiprakriti',
        linkedinUrl: blogFormData.linkedinUrl || 'https://www.linkedin.com/company/kai-prakriti',
        coverImage: blogFormData.coverImage,
        views: 1,
        likes: 0,
      };
      persistBlogs([newPost, ...blogs]);
    }
    setIsBlogModalOpen(false);
  };

  const handleDeleteBlog = (id: string) => {
    if (window.confirm('Delete this regulatory article? This will remove it from the public Insights page.')) {
      const updated = blogs.filter(b => b.id !== id);
      persistBlogs(updated);
    }
  };

  // Filtered leads
  const filteredLeads = leads.filter(lead => {
    const matchesStatus = leadFilterStatus === 'all' || lead.status === leadFilterStatus;
    const matchesSearch =
      lead.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
      lead.company.toLowerCase().includes(leadSearch.toLowerCase()) ||
      lead.email.toLowerCase().includes(leadSearch.toLowerCase()) ||
      lead.serviceId.toLowerCase().includes(leadSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#264143] py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        {/* =========================================================
            HEADER & RESPONSIVE NAVIGATION BAR (Borderless Logo)
            ========================================================= */}
        <header className="p-4 sm:p-6 rounded-3xl border border-[#E7E3DC] bg-white shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Brand & User Identity - Borderless larger emblem */}
          <div className="flex items-center space-x-3 sm:space-x-3.5">
            <div className="shrink-0">
              <div className="sm:hidden">
                <KaiPrakritiEmblem size={40} theme="relax" circularBorder={true} />
              </div>
              <div className="hidden sm:block">
                <KaiPrakritiEmblem size={50} theme="relax" circularBorder={true} />
              </div>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <h1 className="font-serif text-base sm:text-xl font-bold tracking-tight text-[#264143]">
                  Kai Prakriti Management Portal
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-[#3E6B48]/10 text-[#3E6B48] border border-[#3E6B48]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3E6B48] animate-pulse" />
                  <span>Sovereign Storage Active</span>
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#264143]/70 mt-0.5">
                Admin: <strong className="text-[#264143] font-semibold">Sushant Gangwar</strong> • operations@kaiprakriti.com
              </p>
            </div>
          </div>

          {/* 4 Tab Switchers (Analytics, Leads, Services, Blogs) */}
          <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3 w-full md:w-auto">
            <div className="flex items-center p-1 rounded-xl border border-[#E7E3DC] bg-[#FBF9F5] text-xs font-medium w-full sm:w-auto overflow-x-auto scrollbar-none">
              <button
                type="button"
                onClick={() => setActiveTab('analytics')}
                className={`flex-1 sm:flex-initial px-3 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'analytics'
                    ? 'bg-[#D96846] text-white font-semibold shadow-xs'
                    : 'text-[#264143] hover:text-[#D96846] hover:bg-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Analytics</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('leads')}
                className={`flex-1 sm:flex-initial px-3 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'leads'
                    ? 'bg-[#D96846] text-white font-semibold shadow-xs'
                    : 'text-[#264143] hover:text-[#D96846] hover:bg-white'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>Leads ({leads.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('services')}
                className={`flex-1 sm:flex-initial px-3 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'services'
                    ? 'bg-[#D96846] text-white font-semibold shadow-xs'
                    : 'text-[#264143] hover:text-[#D96846] hover:bg-white'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Services ({services.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('blogs')}
                className={`flex-1 sm:flex-initial px-3 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'blogs'
                    ? 'bg-[#D96846] text-white font-semibold shadow-xs'
                    : 'text-[#264143] hover:text-[#D96846] hover:bg-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Insights ({blogs.length})</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="p-2 sm:p-2.5 rounded-xl border border-[#E7E3DC] bg-white hover:bg-red-50 hover:text-red-700 hover:border-red-200 text-[#264143] text-xs font-medium flex items-center gap-1.5 transition-colors shrink-0"
              title="Sign out of Admin Dashboard"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </header>

        {/* =========================================================
            TAB 1: ANALYTICS & GROWTH
            ========================================================= */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Live Real-Time Banner */}
            <div className="p-4 sm:p-5 rounded-3xl border border-[#3E6B48]/30 bg-gradient-to-r from-[#3E6B48]/10 via-[#FAF8F5] to-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <span className="relative flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3E6B48] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#3E6B48]"></span>
                </span>
                <div>
                  <div className="text-sm font-bold text-[#264143]">
                    {MOCK_ANALYTICS.activeNow} Active Decision-Makers Browsing Kai Prakriti
                  </div>
                  <p className="text-xs text-[#264143]/70 mt-0.5">
                    GA4 Stream: G-KP82910XZ • Startup Launch & Organic Traffic Monitoring
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-medium text-[#264143] bg-white px-3.5 py-1.5 rounded-xl border border-[#E7E3DC] w-fit">
                <span>Inquiry Conversion: <strong className="text-[#D96846] font-bold">{MOCK_ANALYTICS.conversionRate}%</strong></span>
                <span className="text-slate-300">|</span>
                <span>Avg Engagement: <strong className="text-[#3E6B48] font-bold">{MOCK_ANALYTICS.avgSessionDuration}</strong></span>
              </div>
            </div>

            {/* 4 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              
              <div className="p-5 sm:p-6 rounded-3xl border border-[#E7E3DC] bg-white shadow-xs space-y-2 hover:border-[#D96846] transition-colors">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#264143]/60">
                  <span>Total Pageviews</span>
                  <TrendingUp className="w-4 h-4 text-[#D96846]" />
                </div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#264143]">
                  {MOCK_ANALYTICS.pageviews.toLocaleString()}
                </div>
                <div className="text-xs font-semibold text-[#3E6B48] flex items-center gap-1">
                  <span>+18.4%</span>
                  <span className="text-[#264143]/50 font-normal">organic search & LinkedIn</span>
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-3xl border border-[#E7E3DC] bg-white shadow-xs space-y-2 hover:border-[#D96846] transition-colors">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#264143]/60">
                  <span>Unique Visitors</span>
                  <Users className="w-4 h-4 text-[#3E6B48]" />
                </div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#264143]">
                  {MOCK_ANALYTICS.uniqueVisitors.toLocaleString()}
                </div>
                <div className="text-xs font-semibold text-[#3E6B48] flex items-center gap-1">
                  <span>+14.2%</span>
                  <span className="text-[#264143]/50 font-normal">enterprise interest</span>
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-3xl border border-[#E7E3DC] bg-white shadow-xs space-y-2 hover:border-[#D96846] transition-colors">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#264143]/60">
                  <span>Active Services</span>
                  <Briefcase className="w-4 h-4 text-[#D96846]" />
                </div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#264143]">
                  {services.length} Practices
                </div>
                <div className="text-xs font-semibold text-[#3E6B48] flex items-center gap-1">
                  <span>3 featured</span>
                  <span className="text-[#264143]/50 font-normal">on homepage</span>
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-3xl border border-[#E7E3DC] bg-white shadow-xs space-y-2 hover:border-[#D96846] transition-colors">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#264143]/60">
                  <span>Total Leads Ingested</span>
                  <Database className="w-4 h-4 text-[#264143]" />
                </div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#264143]">
                  {leads.length} Entities
                </div>
                <div className="text-xs font-semibold text-[#3E6B48] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>CRM synchronized</span>
                </div>
              </div>

            </div>

            {/* Channels & Top Regulatory Pages */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Traffic Channels */}
              <div className="lg:col-span-6 p-5 sm:p-6 rounded-3xl border border-[#E7E3DC] bg-white shadow-xs space-y-4">
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#264143]">
                    Traffic Acquisition Channels
                  </h3>
                  <p className="text-xs text-[#264143]/70 mt-0.5">
                    How enterprise ESG directors and manufacturing leaders find Kai Prakriti:
                  </p>
                </div>

                <div className="space-y-3.5 pt-1">
                  {MOCK_ANALYTICS.topChannels.map((channel, idx) => (
                    <div key={channel.channel} className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-[#264143]">{channel.channel}</span>
                        <span className="font-semibold text-[#264143]">
                          {channel.visitors.toLocaleString()} <span className="text-[#264143]/50 font-normal">({channel.share}%)</span>
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#FBF9F5] border border-[#E7E3DC] overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            idx % 2 === 0 ? 'bg-[#D96846]' : 'bg-[#3E6B48]'
                          }`}
                          style={{ width: `${channel.share}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Pages */}
              <div className="lg:col-span-6 p-5 sm:p-6 rounded-3xl border border-[#E7E3DC] bg-white shadow-xs space-y-4">
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#264143]">
                    Top Engaged Regulatory Articles
                  </h3>
                  <p className="text-xs text-[#264143]/70 mt-0.5">
                    Pages with highest reading time and direct consultation requests:
                  </p>
                </div>

                <div className="divide-y divide-[#E7E3DC]">
                  {MOCK_ANALYTICS.topPages.map((page) => (
                    <div key={page.path} className="py-2.5 flex items-center justify-between text-xs gap-3">
                      <div className="font-mono text-[#264143] truncate font-medium">
                        {page.path}
                      </div>
                      <div className="flex items-center space-x-2 shrink-0">
                        <strong className="text-[#264143]">{page.views.toLocaleString()} views</strong>
                        <span className="text-[11px] font-semibold text-[#3E6B48] bg-[#3E6B48]/10 px-1.5 py-0.5 rounded">
                          {page.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* =========================================================
            TAB 2: LEADS CRM
            ========================================================= */}
        {activeTab === 'leads' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Toolbar: Search, Filters, Export, Add Lead */}
            <div className="p-4 sm:p-5 rounded-3xl border border-[#E7E3DC] bg-white shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* Search Field */}
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search entity, name, email..."
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E7E3DC] bg-[#FBF9F5] text-xs text-[#264143] placeholder-slate-400 focus:outline-none focus:border-[#D96846] focus:bg-white transition-colors"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleExportCSV}
                    className="px-3.5 py-2.5 rounded-xl border border-[#E7E3DC] hover:bg-[#FBF9F5] text-xs font-semibold text-[#264143] flex items-center gap-1.5 transition-colors"
                    title="Export verified leads to CSV"
                  >
                    <Download className="w-4 h-4 text-slate-500" />
                    <span>Export CSV</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsAddLeadOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-[#D96846] hover:bg-[#C45737] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Lead</span>
                  </button>
                </div>

              </div>

              {/* Status Filter Chips */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
                <span className="text-[#264143]/60 font-medium whitespace-nowrap text-xs">Status:</span>
                {['all', 'new', 'contacted', 'scoping', 'proposal', 'won'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setLeadFilterStatus(st)}
                    className={`px-3 py-1 rounded-lg uppercase text-[11px] font-semibold transition-all whitespace-nowrap ${
                      leadFilterStatus === st
                        ? 'bg-[#264143] text-white shadow-xs'
                        : 'border border-[#E7E3DC] text-[#264143] bg-white hover:bg-[#FBF9F5]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block rounded-3xl border border-[#E7E3DC] overflow-hidden bg-white shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#E7E3DC] bg-[#FBF9F5] text-[11px] uppercase tracking-wider font-semibold text-[#264143]/70">
                      <th className="py-3.5 px-4">Entity & Contact</th>
                      <th className="py-3.5 px-4">Lead Source</th>
                      <th className="py-3.5 px-4">Requested Practice</th>
                      <th className="py-3.5 px-4">Pipeline Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7E3DC] text-xs">
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-[#264143]/50">
                          No corporate leads match the query.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-[#FBF9F5]/70 transition-colors">
                          <td className="py-4 px-4">
                            <div className="font-serif font-bold text-sm text-[#264143]">
                              {lead.company}
                            </div>
                            <div className="text-[#264143] font-medium">{lead.name}</div>
                            <div className="text-[11px] text-[#264143]/60 font-mono">
                              {lead.email} • {lead.phone}
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <span className="px-2.5 py-1 rounded-md text-[11px] font-medium border border-[#E7E3DC] bg-[#FBF9F5] text-[#264143] inline-block">
                              {lead.source || 'Website Consultation'}
                            </span>
                          </td>

                          <td className="py-4 px-4">
                            <span className="font-semibold text-[#D96846] block">
                              {lead.serviceId}
                            </span>
                            <span className="text-[11px] text-[#264143]/60">
                              {lead.estimatedBudget || 'Under Evaluation'}
                            </span>
                          </td>

                          <td className="py-4 px-4">
                            <select
                              value={lead.status}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border cursor-pointer ${
                                lead.status === 'won'
                                  ? 'bg-[#3E6B48]/10 text-[#3E6B48] border-[#3E6B48]/40'
                                  : lead.status === 'proposal'
                                  ? 'bg-purple-50 text-purple-700 border-purple-300'
                                  : lead.status === 'scoping'
                                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                                  : lead.status === 'contacted'
                                  ? 'bg-amber-50 text-amber-700 border-amber-300'
                                  : 'bg-[#D96846]/10 text-[#D96846] border-[#D96846]/30'
                              }`}
                            >
                              <option value="new">NEW INQUIRY</option>
                              <option value="contacted">CONTACTED</option>
                              <option value="scoping">IN SCOPING</option>
                              <option value="proposal">PROPOSAL SENT</option>
                              <option value="won">WON (CONTRACTED)</option>
                              <option value="lost">LOST</option>
                            </select>
                          </td>

                          <td className="py-4 px-4 text-right space-x-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedLead(lead)}
                              className="p-1.5 rounded-lg border border-[#E7E3DC] hover:bg-[#FBF9F5] text-[#264143]"
                              title="Inspect Full Lead Dossier"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards View */}
            <div className="block md:hidden space-y-3.5">
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-4 rounded-3xl border border-[#E7E3DC] bg-white shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-serif font-bold text-base text-[#264143]">
                        {lead.company}
                      </h4>
                      <div className="text-xs font-medium text-[#264143]/80 mt-0.5">
                        {lead.name} • {lead.email}
                      </div>
                    </div>

                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                      className="px-2 py-1 rounded-md text-[11px] font-semibold border bg-white text-[#264143]"
                    >
                      <option value="new">NEW</option>
                      <option value="contacted">CONTACTED</option>
                      <option value="scoping">SCOPING</option>
                      <option value="proposal">PROPOSAL</option>
                      <option value="won">WON</option>
                      <option value="lost">LOST</option>
                    </select>
                  </div>

                  <div className="text-xs font-semibold text-[#D96846]">
                    Practice: {lead.serviceId}
                  </div>

                  <div className="pt-2 border-t border-[#E7E3DC] flex items-center justify-between text-xs">
                    <span className="text-[#264143]/60">{lead.source}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="px-2.5 py-1 rounded-lg border border-[#E7E3DC] font-semibold text-[#264143]"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="p-1 rounded-lg text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Lead Modal */}
            {selectedLead && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                <div className="w-full max-w-lg rounded-3xl border border-[#E7E3DC] p-6 sm:p-8 bg-white shadow-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E7E3DC]">
                    <div>
                      <span className="text-xs font-semibold text-[#D96846] uppercase tracking-wider block">
                        Lead Dossier #{selectedLead.id}
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-[#264143]">
                        {selectedLead.company}
                      </h3>
                    </div>
                    <button onClick={() => setSelectedLead(null)} className="p-1.5 rounded-full hover:bg-slate-100">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-[#FBF9F5] border border-[#E7E3DC]">
                      <div>
                        <span className="text-[#264143]/60 block">Contact:</span>
                        <strong className="text-[#264143]">{selectedLead.name}</strong>
                      </div>
                      <div>
                        <span className="text-[#264143]/60 block">Email:</span>
                        <strong className="text-[#264143]">{selectedLead.email}</strong>
                      </div>
                      <div>
                        <span className="text-[#264143]/60 block">Phone:</span>
                        <strong className="text-[#264143]">{selectedLead.phone}</strong>
                      </div>
                      <div>
                        <span className="text-[#264143]/60 block">Practice:</span>
                        <strong className="text-[#D96846]">{selectedLead.serviceId}</strong>
                      </div>
                    </div>

                    <div>
                      <span className="font-semibold text-[#264143] block mb-1">Requirement Notes:</span>
                      <div className="p-3 rounded-xl bg-slate-50 border border-[#E7E3DC] text-[#264143] leading-relaxed">
                        {selectedLead.message}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E7E3DC] flex justify-end">
                    <button
                      onClick={() => setSelectedLead(null)}
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#264143] text-white"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Add Lead Modal */}
            {isAddLeadOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                <div className="w-full max-w-lg rounded-3xl border border-[#E7E3DC] p-6 sm:p-8 bg-white shadow-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E7E3DC]">
                    <h3 className="font-serif text-xl font-bold text-[#264143]">
                      Add New Lead Entry
                    </h3>
                    <button onClick={() => setIsAddLeadOpen(false)} className="p-1 rounded-full hover:bg-slate-100">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold mb-1">Company Name *</label>
                        <input
                          type="text"
                          required
                          value={newLeadData.company}
                          onChange={(e) => setNewLeadData({ ...newLeadData, company: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#E7E3DC] bg-[#FBF9F5]"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Contact Name *</label>
                        <input
                          type="text"
                          required
                          value={newLeadData.name}
                          onChange={(e) => setNewLeadData({ ...newLeadData, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#E7E3DC] bg-[#FBF9F5]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold mb-1">Email *</label>
                        <input
                          type="email"
                          required
                          value={newLeadData.email}
                          onChange={(e) => setNewLeadData({ ...newLeadData, email: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#E7E3DC] bg-[#FBF9F5]"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Phone</label>
                        <input
                          type="text"
                          value={newLeadData.phone}
                          onChange={(e) => setNewLeadData({ ...newLeadData, phone: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#E7E3DC] bg-[#FBF9F5]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Notes / Context</label>
                      <textarea
                        rows={2}
                        value={newLeadData.message}
                        onChange={(e) => setNewLeadData({ ...newLeadData, message: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#E7E3DC] bg-[#FBF9F5]"
                      />
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsAddLeadOpen(false)}
                        className="px-4 py-2 rounded-xl border border-[#E7E3DC]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-[#D96846] text-white font-semibold"
                      >
                        Save Lead
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

        {/* =========================================================
            TAB 3: SERVICES MANAGEMENT (ADD / EDIT / DELETE)
            ========================================================= */}
        {activeTab === 'services' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            <div className="p-5 sm:p-6 rounded-3xl border border-[#E7E3DC] bg-white shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#264143]">
                  Service Practice Management
                </h3>
                <p className="text-xs text-[#264143]/70 mt-0.5">
                  Manage the services catalogue. The public website displays 3–4 featured practices; the full catalogue unlocks after consultation/login.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAddService}
                className="px-4 py-2.5 rounded-xl bg-[#D96846] hover:bg-[#C45737] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Service</span>
              </button>
            </div>

            {/* Services Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="p-5 sm:p-6 rounded-3xl border border-[#E7E3DC] bg-white shadow-xs flex flex-col justify-between space-y-4 hover:border-[#D96846] transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold text-[#3E6B48] bg-[#3E6B48]/10 border border-[#3E6B48]/30">
                        {service.standardCode || service.standard}
                      </span>
                      <span className="text-[#264143]/50 font-mono text-[11px]">
                        #{service.number || index + 1}
                      </span>
                    </div>

                    <h4 className="font-serif text-base font-bold text-[#264143]">
                      {service.title}
                    </h4>

                    <p className="text-xs text-[#264143]/75 leading-relaxed line-clamp-3">
                      {service.shortDesc}
                    </p>

                    {service.deliverables && service.deliverables.length > 0 && (
                      <div className="pt-1">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#264143]/50 block mb-1">
                          Key Deliverable
                        </span>
                        <div className="text-xs font-medium text-[#264143] line-clamp-1">
                          • {service.deliverables[0]}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#E7E3DC] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleOpenEditService(service)}
                      className="px-3 py-1.5 rounded-lg border border-[#E7E3DC] text-xs font-semibold text-[#264143] hover:bg-[#FBF9F5] flex items-center gap-1"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-slate-500" />
                      <span>Edit Practice</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteServiceItem(service.id)}
                      className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center gap-1"
                      title="Delete Service"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add / Edit Service Modal */}
            {isServiceModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#E7E3DC] p-6 sm:p-8 bg-white shadow-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E7E3DC]">
                    <h3 className="font-serif text-xl font-bold text-[#264143]">
                      {editingServiceId ? 'Edit Advisory Practice' : 'Add New Advisory Practice'}
                    </h3>
                    <button onClick={() => setIsServiceModalOpen(false)} className="p-1.5 rounded-full hover:bg-slate-100">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveService} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-semibold mb-1">Service Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Scope 1, 2, and 3 GHG Carbon Accounting"
                        value={serviceFormData.title}
                        onChange={(e) => setServiceFormData({ ...serviceFormData, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E3DC] bg-[#FBF9F5] font-serif font-bold text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold mb-1">Standard / Regulatory Framework</label>
                        <input
                          type="text"
                          placeholder="GHG Protocol & ISO 14064"
                          value={serviceFormData.standard}
                          onChange={(e) => setServiceFormData({ ...serviceFormData, standard: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#E7E3DC] bg-[#FBF9F5]"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Standard Code Badge</label>
                        <input
                          type="text"
                          placeholder="ISO 14064-1:2018"
                          value={serviceFormData.standardCode}
                          onChange={(e) => setServiceFormData({ ...serviceFormData, standardCode: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#E7E3DC] bg-[#FBF9F5]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Short Description (1-2 sentences) *</label>
                      <textarea
                        rows={2}
                        required
                        placeholder="Executive synopsis shown on cards..."
                        value={serviceFormData.shortDesc}
                        onChange={(e) => setServiceFormData({ ...serviceFormData, shortDesc: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#E7E3DC] bg-[#FBF9F5]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Full Detailed Methodology</label>
                      <textarea
                        rows={4}
                        placeholder="Complete scope of engineering, primary activity boundaries, calculation workbooks..."
                        value={serviceFormData.fullDesc}
                        onChange={(e) => setServiceFormData({ ...serviceFormData, fullDesc: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#E7E3DC] bg-[#FBF9F5]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Key Deliverables (comma separated)</label>
                      <input
                        type="text"
                        placeholder="Activity data templates, Traceable formula workbook, Audit defense dossier"
                        value={serviceFormData.deliverables}
                        onChange={(e) => setServiceFormData({ ...serviceFormData, deliverables: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#E7E3DC] bg-[#FBF9F5]"
                      />
                    </div>

                    <div className="pt-2 flex justify-end gap-2.5">
                      <button
                        type="button"
                        onClick={() => setIsServiceModalOpen(false)}
                        className="px-4 py-2 rounded-xl border border-[#E7E3DC]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-[#D96846] text-white font-semibold"
                      >
                        {editingServiceId ? 'Save Changes' : 'Create Practice'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

        {/* =========================================================
            TAB 4: BLOG & INSIGHTS MANAGER (ADD / EDIT / DELETE)
            ========================================================= */}
        {activeTab === 'blogs' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            <div className="p-5 sm:p-6 rounded-3xl border border-[#E7E3DC] bg-white shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#264143]">
                  Insights & Regulatory Articles
                </h3>
                <p className="text-xs text-[#264143]/70 mt-0.5">
                  Published articles appear immediately on the public website and link to Medium & LinkedIn.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAddBlog}
                className="px-4 py-2.5 rounded-xl bg-[#D96846] hover:bg-[#C45737] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Article</span>
              </button>
            </div>

            {/* Blogs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogs.map((b) => (
                <div
                  key={b.id}
                  className="p-5 sm:p-6 rounded-3xl border border-[#E7E3DC] bg-white shadow-xs flex flex-col justify-between space-y-4 hover:border-[#D96846] transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold text-[#3E6B48] bg-[#3E6B48]/10 border border-[#3E6B48]/30">
                        {b.category}
                      </span>
                      <span className="text-[#264143]/50">{b.date} • {b.readTime}</span>
                    </div>

                    <h4 className="font-serif text-base font-bold text-[#264143] line-clamp-2">
                      {b.title}
                    </h4>

                    <p className="text-xs text-[#264143]/70 line-clamp-2 leading-relaxed">
                      {b.excerpt}
                    </p>

                    <div className="flex items-center space-x-4 text-[11px] text-[#264143]/60 pt-1">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-slate-400" /> {b.views} views
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="w-3.5 h-3.5 text-slate-400" /> {b.likes} likes
                      </span>
                      <span>By {b.author}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E7E3DC] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEditBlog(b)}
                        className="px-3 py-1.5 rounded-lg border border-[#E7E3DC] text-xs font-semibold text-[#264143] flex items-center gap-1 hover:bg-[#FBF9F5]"
                      >
                        <Edit2 className="w-3 h-3 text-slate-500" />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onNavigate('blog', b.slug)}
                        className="px-3 py-1.5 rounded-lg border border-[#E7E3DC] text-xs font-semibold text-[#264143] flex items-center gap-1 hover:bg-[#FBF9F5]"
                      >
                        <span>View Live</span>
                        <ExternalLink className="w-3 h-3 text-slate-500" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteBlog(b.id)}
                      className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center gap-1"
                      title="Delete Article"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add / Edit Blog Modal */}
            {isBlogModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#E7E3DC] p-6 sm:p-8 bg-white shadow-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E7E3DC]">
                    <h3 className="font-serif text-xl font-bold text-[#264143]">
                      {editingBlogId ? 'Edit Regulatory Article' : 'Author New Regulatory Article'}
                    </h3>
                    <button onClick={() => setIsBlogModalOpen(false)} className="p-1.5 rounded-full hover:bg-slate-100">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveBlog} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-semibold mb-1">Headline *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Scope 3 Category 1 Decarbonization for Indian Suppliers"
                        value={blogFormData.title}
                        onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E3DC] bg-[#FBF9F5] font-serif font-bold text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold mb-1">Category</label>
                        <select
                          value={blogFormData.category}
                          onChange={(e) => setBlogFormData({ ...blogFormData, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#E7E3DC] bg-[#FBF9F5]"
                        >
                          <option value="BRSR & SEBI">BRSR & SEBI</option>
                          <option value="EU CBAM">EU CBAM</option>
                          <option value="Scope 1-3 GHG">Scope 1-3 GHG</option>
                          <option value="MSME ZED">MSME ZED</option>
                          <option value="ISO Standards">ISO Standards</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold mb-1">Read Time</label>
                        <input
                          type="text"
                          value={blogFormData.readTime}
                          onChange={(e) => setBlogFormData({ ...blogFormData, readTime: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#E7E3DC] bg-[#FBF9F5]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold mb-1">Author</label>
                        <input
                          type="text"
                          value={blogFormData.author}
                          onChange={(e) => setBlogFormData({ ...blogFormData, author: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#E7E3DC] bg-[#FBF9F5]"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold mb-1">Medium URL</label>
                        <input
                          type="url"
                          placeholder="https://medium.com/@kaiprakriti/..."
                          value={blogFormData.mediumUrl}
                          onChange={(e) => setBlogFormData({ ...blogFormData, mediumUrl: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#E7E3DC] bg-[#FBF9F5]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Summary / Excerpt</label>
                      <textarea
                        rows={2}
                        value={blogFormData.excerpt}
                        onChange={(e) => setBlogFormData({ ...blogFormData, excerpt: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#E7E3DC] bg-[#FBF9F5]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Full Article Content (Markdown supported)</label>
                      <textarea
                        rows={7}
                        required
                        value={blogFormData.content}
                        onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#E7E3DC] bg-[#FBF9F5]"
                      />
                    </div>

                    <div className="pt-2 flex justify-end gap-2.5">
                      <button
                        type="button"
                        onClick={() => setIsBlogModalOpen(false)}
                        className="px-4 py-2 rounded-xl border border-[#E7E3DC]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-[#D96846] text-white font-semibold"
                      >
                        {editingBlogId ? 'Save Changes' : 'Publish Article'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
