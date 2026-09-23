// src/components/sections/CertificationsSection.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { credentialsData, CREDENTIAL_CATEGORIES } from '@/data/credentials';
import { CredentialCategory } from '@/types/credentials';
import { Badge, Card, CardHeader, CardTitle, CardDescription, CardFooter, SearchInput, Button } from '@/components/ui';

export const CertificationsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract formal state licenses for primary display
  const formalLicenses = useMemo(
    () => credentialsData.filter((c) => c.category === 'Licenses'),
    []
  );

  // Professional coursework & tracks (excluding formal licenses from the filtered list)
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
      className="py-16 md:py-24 border-b border-slate-800/80 bg-slate-950 text-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            03 // PROFESSIONAL CREDENTIALS &amp; LICENSES
          </div>
          <h2
            id="certifications-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
          >
            Verified Credentials &amp; Industry Standards.
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Statutory state licensing, ongoing compliance certifications, and specialized business,
            technology, and process optimization coursework.
          </p>
        </div>

        {/* 1. Formal State Licenses (High-Priority Cards) */}
        <div className="mb-14">
          <h3 className="text-sm font-mono text-cyan-300 uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            Formal Statutory &amp; Safety Licenses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formalLicenses.map((lic) => (
              <Card
                key={lic.id}
                hover
                glow
                className="border-cyan-500/30 bg-gradient-to-br from-cyan-950/20 via-slate-900/60 to-slate-900/80"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <Badge variant="cyan" size="md">
                    {lic.issuer}
                  </Badge>
                  {lic.credentialId && (
                    <span className="font-mono text-xs text-slate-400">
                      ID: <span className="text-slate-200">{lic.credentialId}</span>
                    </span>
                  )}
                </div>

                <CardHeader className="p-0 mb-3">
                  <CardTitle className="text-xl text-white font-bold leading-snug">
                    {lic.title}
                  </CardTitle>
                </CardHeader>

                <div className="grid grid-cols-2 gap-4 my-4 p-3 bg-slate-950/60 rounded-lg border border-slate-800 font-mono text-xs text-slate-400">
                  <div>
                    <span className="block text-slate-500 uppercase text-[10px]">Issued</span>
                    <span className="text-slate-200 font-medium">{lic.issueDate}</span>
                  </div>
                  {lic.expirationDate && (
                    <div>
                      <span className="block text-slate-500 uppercase text-[10px]">Expires</span>
                      <span className="text-emerald-400 font-medium">{lic.expirationDate}</span>
                    </div>
                  )}
                </div>

                {lic.skills && lic.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {lic.skills.map((skill) => (
                      <Badge key={skill} variant="default" size="sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}

                {lic.verificationUrl && (
                  <CardFooter className="p-0 pt-4 flex justify-end">
                    <Button
                      href={lic.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="terminal"
                      size="sm"
                    >
                      Verify License ↗
                    </Button>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* 2. Interactive Filtering Bar for Coursework */}
        <div className="border-t border-slate-800/80 pt-10 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-sm font-mono text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                Professional Tracks &amp; Specializations ({filteredCoursework.length})
              </h3>
            </div>

            {/* Search Bar */}
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery('')}
              placeholder="Search credentials or issuers..."
            />
          </div>

          {/* Category Filter Pills */}
          <div
            className="flex flex-wrap items-center gap-2 mb-8"
            role="tablist"
            aria-label="Filter credentials by category"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'All'}
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors border ${
                selectedCategory === 'All'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              All Tracks ({courseworkItems.length})
            </button>

            {CREDENTIAL_CATEGORIES.map((cat) => {
              const count = courseworkItems.filter((i) => i.category === cat.id).length;
              if (count === 0) return null;
              const isActive = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(cat.id as CredentialCategory)}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors border ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>

          {/* 3. Coursework Grid */}
          {filteredCoursework.length === 0 ? (
            <div className="text-center py-12 bg-slate-900/40 rounded-xl border border-slate-800 font-mono text-sm text-slate-400">
              No credentials found matching &quot;{searchQuery}&quot; in category &quot;{selectedCategory}&quot;.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCoursework.map((item) => (
                <Card key={item.id} hover className="p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-xs text-cyan-400">{item.issuer}</span>
                      <span className="font-mono text-xs text-slate-500">{item.issueDate}</span>
                    </div>

                    <CardTitle className="text-sm font-semibold text-slate-200 leading-snug mb-2">
                      {item.title}
                    </CardTitle>

                    {item.credentialId && (
                      <p className="font-mono text-[11px] text-slate-500 truncate mb-3">
                        ID: {item.credentialId}
                      </p>
                    )}
                  </div>

                  {item.skills && item.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-auto pt-3 border-t border-slate-800/60">
                      {item.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50"
                        >
                          {skill}
                        </span>
                      ))}
                      {item.skills.length > 3 && (
                        <span className="font-mono text-[10px] px-1.5 py-0.5 text-slate-500">
                          +{item.skills.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
