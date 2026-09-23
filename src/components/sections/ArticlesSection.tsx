// src/components/sections/ArticlesSection.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { ARTICLES_DATA } from '@/data/articles';
import { Article } from '@/types/articles';
import { Badge, Card, CardHeader, CardTitle, CardDescription, SearchInput, Button } from '@/components/ui';

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
        datePublished: article.publishedDate,
      })),
    };
  }, [initialArticles]);

  return (
    <section
      id="articles"
      aria-labelledby="articles-heading"
      className="py-16 md:py-24 border-b border-slate-800/80 bg-slate-950 text-slate-100 relative"
    >
      {/* Schema.org Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              04 // EDITORIAL &amp; INVESTIGATIVE OP-EDS
            </div>
            <h2
              id="articles-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
            >
              Published Work &amp; Columns.
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Opinion columns written for{' '}
              <a
                href="https://www.dailynebraskan.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline font-medium"
              >
                The Daily Nebraskan
              </a>{' '}
              during the Fall 2023 semester, covering campus dining infrastructure, public education policy,
              technology ethics, and university dynamics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              href="https://www.dailynebraskan.com/search/?f=html&q=%22Tyson+Shields%22"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="sm"
            >
              Author Archive ↗
            </Button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        {showFilterBar && (
          <div className="border-t border-slate-800/80 pt-8 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2" role="tablist">
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                const count =
                  category === 'All'
                    ? initialArticles.length
                    : initialArticles.filter((a) => a.category === category).length;

                return (
                  <button
                    key={category}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors border ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                        : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {category} ({count})
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery('')}
              placeholder="Search articles by title or topic..."
            />
          </div>
        )}

        {/* Article Cards Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-xl border border-slate-800 font-mono text-sm text-slate-400">
            No columns found matching your search criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <Card
                key={article.id}
                hover
                glow
                className="flex flex-col justify-between border-slate-800/80 bg-slate-900/60"
              >
                <div>
                  {/* Metadata Header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant="cyan" size="sm">
                      {article.category}
                    </Badge>
                    <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
                      <span>{article.formattedDate}</span>
                      <span>·</span>
                      <span>{article.readingTime}</span>
                    </div>
                  </div>

                  {/* Article Title */}
                  <CardHeader className="p-0 mb-3">
                    <CardTitle className="text-lg font-bold text-white leading-snug">
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-cyan-400 transition-colors"
                      >
                        {article.title}
                      </a>
                    </CardTitle>
                  </CardHeader>

                  {/* Summary */}
                  <CardDescription className="text-xs text-slate-300 leading-relaxed mb-4">
                    {article.summary}
                  </CardDescription>
                </div>

                {/* Card Footer / Action */}
                <div className="pt-4 border-t border-slate-800/60 mt-auto flex items-center justify-between">
                  <span className="font-mono text-[11px] text-slate-500 uppercase">
                    The Daily Nebraskan
                  </span>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Read Column
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticlesSection;
