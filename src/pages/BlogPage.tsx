import React, { useState, useEffect } from 'react';
import { PageId, BlogPost } from '../types';
import { INITIAL_BLOG_POSTS } from '../data/blogData';
import { Search, ExternalLink, ArrowLeft, ArrowRight, ThumbsUp, Share2, BookOpen, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { SocialMediaSection } from '../components/SocialMediaSection';

interface BlogPageProps {
  theme?: string;
  mode?: string;
  onNavigate: (page: PageId) => void;
  targetPostSlug?: string;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  onNavigate,
  targetPostSlug,
}) => {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    try {
      const stored = localStorage.getItem('kai_prakriti_blogs_v2');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return INITIAL_BLOG_POSTS;
  });

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingPost, setReadingPost] = useState<BlogPost | null>(() => {
    if (targetPostSlug) {
      return INITIAL_BLOG_POSTS.find(p => p.slug === targetPostSlug) || null;
    }
    return null;
  });

  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleBlogsUpdate = (e: any) => {
      if (e.detail) {
        setPosts(e.detail);
      }
    };
    window.addEventListener('kai_prakriti_blogs_updated', handleBlogsUpdate);
    return () => {
      window.removeEventListener('kai_prakriti_blogs_updated', handleBlogsUpdate);
    };
  }, []);

  useEffect(() => {
    if (targetPostSlug) {
      const found = posts.find(p => p.slug === targetPostSlug);
      if (found) setReadingPost(found);
    }
  }, [targetPostSlug, posts]);

  const categories = ['All', 'BRSR & SEBI', 'EU CBAM', 'Scope 1-3 GHG', 'MSME ZED'];

  const filteredPosts = posts.filter(post => {
    const matchesCat = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedPosts[id]) return;
    setLikedPosts(prev => ({ ...prev, [id]: true }));
    const updated = posts.map(p => (p.id === id ? { ...p, likes: p.likes + 1 } : p));
    setPosts(updated);
    try {
      localStorage.setItem('kai_prakriti_blogs_v2', JSON.stringify(updated));
    } catch (err) {}
  };

  return (
    <div className="bg-[#FAF8F5] text-[#264143] min-h-screen">
      
      {/* 1. If currently reading an article: Full View */}
      {readingPost ? (
        <article className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
          
          <button
            onClick={() => setReadingPost(null)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#264143] hover:text-[#D96846] transition-colors p-2 rounded-xl bg-white border border-[#E7E3DC]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all insights</span>
          </button>

          <header className="space-y-4 pt-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full font-semibold bg-[#3E6B48]/10 text-[#3E6B48] border border-[#3E6B48]/20">
                {readingPost.category}
              </span>
              <span className="text-[#264143]/50">•</span>
              <span className="text-[#264143]/70">{readingPost.readTime}</span>
              <span className="text-[#264143]/50">•</span>
              <span className="text-[#264143]/70">{readingPost.date}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#264143] leading-tight">
              {readingPost.title}
            </h1>

            <div className="flex items-center justify-between pt-4 border-t border-[#E7E3DC]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#3E6B48]/15 text-[#3E6B48] flex items-center justify-center font-bold text-sm">
                  {readingPost.author.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#264143]">{readingPost.author}</div>
                  <div className="text-[11px] text-[#264143]/60">{readingPost.authorRole}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleLike(readingPost.id, e)}
                  className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    likedPosts[readingPost.id]
                      ? 'bg-[#D96846]/10 text-[#D96846] border-[#D96846]/30'
                      : 'border-[#E7E3DC] text-[#264143] hover:bg-white'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{readingPost.likes}</span>
                </button>
              </div>
            </div>
          </header>

          <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-[#E7E3DC] shadow-xs space-y-5 sm:space-y-6 text-sm text-[#264143] leading-relaxed">
            <p className="font-serif text-base italic text-[#264143]/85 border-l-4 border-[#D96846] pl-4 py-1">
              {readingPost.excerpt}
            </p>

            <div className="prose max-w-none text-[#264143]/90 space-y-4 whitespace-pre-line text-xs sm:text-base leading-relaxed">
              {readingPost.content}
            </div>

            {readingPost.tags && (
              <div className="pt-6 border-t border-[#E7E3DC] flex flex-wrap gap-2">
                {readingPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg text-xs bg-[#FAF8F5] text-[#264143]/80 border border-[#E7E3DC]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#3E6B48]/10 via-[#FAF8F5] to-white border border-[#E7E3DC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-base text-[#264143]">
                Discuss your reporting obligations with our authors
              </h4>
              <p className="text-xs text-[#264143]/70">
                Book a 30-minute scoping discussion or email <strong className="text-[#264143]">contact@kaiprakriti.com</strong>
              </p>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#D96846] hover:bg-[#C45737] text-white text-xs font-semibold flex items-center justify-center gap-2 shrink-0 shadow-xs"
            >
              <span>Schedule Scoping</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </article>
      ) : (
        /* 2. Main Blog Catalogue View */
        <div className="py-10 sm:py-14 space-y-8 sm:space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <header className="max-w-3xl space-y-2.5 sm:space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#3E6B48] uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-[#E7E3DC]">
              <span className="w-2 h-2 rounded-full bg-[#D96846]" />
              <span>Thought Leadership & Regulatory Intelligence</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-5xl font-bold tracking-tight text-[#264143]">
              Regulatory analysis for Indian industry and exporters.
            </h1>

            <p className="text-xs sm:text-base text-[#264143]/75 leading-relaxed">
              Deep dives into SEBI BRSR Core, EU CBAM carbon tariffs, Scope 3 calculation methodologies, and statutory environmental audit standards.
            </p>
          </header>

          {/* Controls: Categories + Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#E7E3DC] pb-4 sm:pb-6">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none w-full md:w-auto pb-1 text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-[#D96846] text-white shadow-xs'
                      : 'bg-white text-[#264143] border border-[#E7E3DC] hover:border-[#D96846]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#E7E3DC] bg-white text-xs text-[#264143] placeholder-slate-400 focus:outline-none focus:border-[#D96846]"
              />
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setReadingPost(post)}
                className="group cursor-pointer rounded-3xl border border-[#E7E3DC] bg-white p-6 shadow-xs hover:border-[#D96846] hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded-full font-semibold text-[#3E6B48] bg-[#3E6B48]/10 border border-[#3E6B48]/20">
                      {post.category}
                    </span>
                    <span className="text-[#264143]/50">{post.readTime}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#264143] group-hover:text-[#D96846] transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#264143]/75 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E7E3DC] flex items-center justify-between text-xs">
                  <span className="font-medium text-[#264143]/70">By {post.author}</span>
                  <div className="flex items-center gap-1 font-semibold text-[#D96846]">
                    <span>Read article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Social Media Cross-post / Medium Strip */}
          <SocialMediaSection />

        </div>
      )}

    </div>
  );
};
