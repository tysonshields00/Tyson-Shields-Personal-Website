// src/components/Certifications.tsx
'use client';

import React, { useState, useMemo } from 'react';
import {
  credentialsData,
  CREDENTIAL_CATEGORIES,
  Credential,
  CredentialCategory,
} from '../data/credentials';

export const Certifications: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract formal state licenses for primary display
  const formalLicenses = useMemo(
    () => credentialsData.filter((c) => c.category === 'Licenses'),
    []
  );

  // Professional coursework & tracks (excluding formal licenses from the bottom grid)
  const courseworkItems = useMemo(
    () => credentialsData.filter((c) => c.category !== 'Licenses'),
    []
  );

  // Filtered coursework based on tab and search query
  const filteredCoursework = useMemo(() => {
    return courseworkItems.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.issuer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [courseworkItems, selectedCategory, searchQuery]);

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="py-16 md:py-24 bg-slate-950 text-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-bold text-sky-400 uppercase tracking-widest">
            Verified Knowledge &amp; Regulatory Credentials
          </p>
          <h2
            id="certifications-heading"
            className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight"
          >
            Licensing &amp; Professional Qualifications
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            Formal state authorizations and continuing education across business analysis, 
            applied data science, systems engineering, and workflow optimization.
          </p>
        </div>

        {/* 1. Formal Licenses Section (High Visual Priority) */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              State &amp; Formal Authority
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formalLicenses.map((lic) => (
              <article
                key={lic.id}
                className="relative rounded-xl bg-slate-900/90 border border-emerald-500/30 p-6 sm:p-7 shadow-xl shadow-emerald-950/10 hover:border-emerald-500/50 transition-all duration-200"
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/70 border border-emerald-500/40 text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Active Regulatory License
                  </span>
                  {lic.expiryDate && (
                    <span className="text-xs text-slate-400 font-mono">
                      Expires: {lic.expiryDate}
                    </span>
                  )}
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
                  {lic.title}
                </h4>

                <p className="text-xs sm:text-sm text-slate-300 mb-4 font-medium">
                  Issuing Authority: <span className="text-white">{lic.issuer}</span>
                </p>

                {lic.description && (
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {lic.description}
                  </p>
                )}

                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block font-mono text-[10px] uppercase">
                      Credential ID
                    </span>
                    <span className="font-mono text-slate-200 font-bold tracking-wider">
                      {lic.credentialId}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-slate-400 text-[11px]">
                      Issued: {lic.issueDate}
                    </span>
                    {lic.verificationUrl && (
                      <a
                        href={lic.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 font-semibold underline-offset-4 hover:underline"
                        aria-label={`Verify ${lic.title} with ${lic.issuer}`}
                      >
                        Verify <span>↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* 2. Professional Track & Coursework Header & Filters */}
        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Curated Coursework &amp; Specializations
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Displaying {filteredCoursework.length} verified credentials
              </p>
            </div>

            {/* In-page search input */}
            <div className="w-full md:w-72">
              <label htmlFor="credential-search" className="sr-only">
                Filter credentials
              </label>
              <div className="relative">
                <input
                  id="credential-search"
                  type="text"
                  placeholder="Search topic or skill..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3.5 py-2 pl-9 text-xs rounded-lg bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                />
                <svg
                  className="w-4 h-4 text-slate-400 absolute left-3 top-2.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Interactive Category Filter Pills */}
          <div
            role="tablist"
            aria-label="Filter credentials by subject matter"
            className="flex flex-wrap items-center gap-2 mb-8"
          >
            {['All', ...CREDENTIAL_CATEGORIES.filter((c) => c !== 'Licenses')].map(
              (cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    aria-controls="coursework-grid"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-2 rounded-md text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                );
              }
            )}
          </div>

          {/* 3. Coursework Grid */}
          {filteredCoursework.length === 0 ? (
            <div className="text-center py-12 rounded-xl bg-slate-900/50 border border-slate-800">
              <p className="text-sm text-slate-400">
                No credentials matched &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-3 text-xs text-sky-400 font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div
              id="coursework-grid"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
            >
              {filteredCoursework.map((course) => {
                const isSpecialTrack = course.featured;
                return (
                  <div
                    key={course.id}
                    className={`flex flex-col justify-between p-5 rounded-xl border transition-all duration-200 ${
                      isSpecialTrack
                        ? 'bg-slate-900 border-sky-500/40 md:col-span-2 lg:col-span-3 shadow-lg shadow-sky-950/10'
                        : 'bg-slate-900/70 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            isSpecialTrack
                              ? 'bg-sky-950 text-sky-300 border border-sky-800'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {course.category}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {course.issueDate}
                        </span>
                      </div>

                      <h4
                        className={`font-bold text-white mb-2 leading-snug ${
                          isSpecialTrack ? 'text-base sm:text-lg' : 'text-sm'
                        }`}
                      >
                        {course.title}
                      </h4>

                      {course.description && (
                        <p className="text-xs text-slate-300 leading-relaxed mb-3">
                          {course.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 mt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                      <span>{course.issuer}</span>
                      <span className="text-slate-400 text-[10px]">Verified Record</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
