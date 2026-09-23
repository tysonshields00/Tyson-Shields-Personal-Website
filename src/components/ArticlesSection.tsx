// src/components/ArticlesSection.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { ARTICLES_DATA } from '@/data/articles';
import { Article, ArticleCategory } from '@/types/articles';

interface ArticlesSectionProps {
  initialArticles?: Article[];
  showFilterBar?: boolean;
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({
  initialArticles = ARTICLES_DATA,
  showFilterBar = true,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const set = new Set<string>();
    initialArticles.forEach((a) => set.add(a.category));
    return ['All', ...Array.from(set)];
  }, [initialArticles]);

  const filteredArticles = useMemo(() => {
    return initialArticles.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All' || article.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [initialArticles, selectedCategory, searchQuery]);

  // JSON-LD structured data for Google Search Indexing
  const jsonLdSchema = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@graph': initialArticles.map((article) => ({
        '@type': 'OpinionNewsArticle',
        '@id': article.url,
        url: article.url,
        headline: article.title,
        description: article.summary,
        inLanguage: 'en-US',
        genre: 'Opinion Column',
        articleSection: article.category,
        author: {
          '@type': 'Person',
          name: 'Tyson Shields',
          url: 'https://tysonshields.com/',
        },
        publisher: {
          '@type': 'NewsMediaOrganization',
          name: 'The Daily Nebraskan',
          url: 'https://www.dailynebraskan.com/',
        },
        temporalCoverage: '2023-08/2023-12',
        isPartOf: {
          '@type': 'Periodical',
          name: 'The Daily Nebraskan',
          issn: '0894-9662',
        },
      })),
    };
  }, [initialArticles]);

  const getCategoryColor = (category: ArticleCategory) => {
    switch (category) {
      case 'Higher Education':
        return 'border-sky-500/30 bg-sky-500/10 text-sky-400';
      case 'Campus Culture':
        return 'border-amber-500/30 bg-amber-500/10 text-amber-400';
      case 'Athletics & Facilities':
        return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400';
      case 'Local Community':
        return 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400';
      case 'Governance & Policy':
        return 'border-rose-500/30 bg-rose-500/10 text-rose-400';
      case 'Workforce & Labor':
        return 'border-purple-500/30 bg-purple-500/10 text-purple-400';
      case 'Technology & Learning':
        return 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400';
      default:
        return 'border-slate-500/30 bg-slate-500/10 text-slate-300';
    }
  };

  return (
    <section
      id="published-work"
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
      aria-labelledby="published-work-title"
    >
      {/* Search Engine Crawling Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* Header Container */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-800/80 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs text-sky-400 uppercase tracking-widest mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            05 // PUBLISHED WORK &amp; EDITORIAL BYLINES
          </div>
          <h2
            id="published-work-title"
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
          >
            Editorial Journalism &amp;{' '}
            <span className="font-serif italic font-normal text-sky-300">
              Public Policy Analysis.
            </span>
          </h2>
          <p className="mt-3 text-base text-slate-400 max-w-2xl leading-relaxed">
            Investigative and analytical opinion columns authored for{' '}
            <span className="text-slate-200 font-medium">The Daily Nebraskan</span>{' '}
            during the Fall 2023 semester, examining collegiate governance, labor equity,
            athletics finance, and emerging learning technologies.
          </p>
        </div>

        {/* Publication Provenance Badge */}
        <div className="shrink-0 flex items-center gap-3 p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-md">
          <div className="h-10 w-10 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 font-serif font-bold text-lg">
            DN
          </div>
          <div>
            <div className="text-xs font-mono text-slate-400">PUBLICATION</div>
            <div className="text-sm font-semibold text-slate-200">The Daily Nebraskan</div>
            <div className="text-xs text-slate-500">Fall 2023 Editorial Board · Lincoln, NE</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls Bar */}
      {showFilterBar && (
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 p-4 rounded-xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-md">
          <div
            role="toolbar"
            aria-label="Filter articles by category"
            className="flex flex-wrap items-center gap-2"
          >
            {categories.map((category) => {
              const count =
                category === 'All'
                  ? initialArticles.length
                  : initialArticles.filter((a) => a.category === category).length;
              const isActive = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                    isActive
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/50 shadow-sm shadow-sky-500/20 font-semibold'
                      : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  {category}
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-sky-500/30 text-white'
                        : 'bg-slate-700/50 text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative min-w-[240px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search published columns..."
              aria-label="Search articles by title, summary, or category"
              className="w-full pl-9 pr-4 py-1.5 rounded-full text-xs bg-slate-950/80 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search query"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {/* Balanced Responsive Grid: 1 column mobile, 2 columns desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            className={`group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl border transition-all duration-300 backdrop-blur-md ${
              article.featured
                ? 'border-sky-500/40 bg-gradient-to-br from-sky-950/20 via-slate-900/80 to-slate-900/90 shadow-lg shadow-sky-950/30'
                : 'border-slate-800 bg-slate-900/60 hover:bg-slate-900/90 hover:border-slate-700 shadow-md'
            } hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/5`}
          >
            {/* Top Row: Meta Badges */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-mono font-medium border ${getCategoryColor(
                      article.category
                    )}`}
                  >
                    {article.category}
                  </span>
                  {article.featured && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-500/30 font-semibold">
                      ★ Highlight
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <time dateTime={article.date}>{article.date}</time>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-400">{article.term}</span>
                </div>
              </div>

              {/* Title with accessible link */}
              <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-sky-300 transition-colors leading-snug">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Read column "${article.title}" published in The Daily Nebraskan (opens in a new tab)`}
                  className="focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-sm"
                >
                  <span className="absolute inset-0 rounded-2xl" aria-hidden="true" />
                  {article.title}
                </a>
              </h3>

              {/* Summary */}
              <p className="mt-3 text-sm text-slate-300/90 leading-relaxed">
                {article.summary}
              </p>
            </div>

            {/* Bottom Row: Footer Provenance and Outbound Indicator */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="inline-flex items-center gap-1.5 text-slate-400">
                <svg
                  className="w-3.5 h-3.5 text-sky-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
                {article.publication}
              </span>

              <span className="inline-flex items-center gap-1 text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 font-semibold">
                Read Column
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Empty State when Search has no matches */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-slate-800 bg-slate-900/30">
          <p className="text-sm font-mono text-slate-400 mb-3">
            No opinion columns matched the query "{searchQuery}".
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="text-xs font-mono text-sky-400 hover:text-sky-300 underline underline-offset-4"
          >
            Reset Filters &amp; View All 7 Columns
          </button>
        </div>
      )}
    </section>
  );
};

export default ArticlesSection;
