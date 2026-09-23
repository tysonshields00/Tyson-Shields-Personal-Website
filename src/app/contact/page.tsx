// src/app/contact/page.tsx
'use client';

import React, { useState } from 'react';
import { SOCIAL_LINKS, CONTACT_CONFIG } from '@/data/socials';
import { Badge, Card, CardHeader, CardTitle, CardDescription, Button } from '@/components/ui';

export default function ContactPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopy = (text: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      });
    }
  };

  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <Badge variant="cyan" size="md" className="mb-3">
          TELEMETRY RELAY // DIRECT COMMS
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Contact &amp; Relays
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          Open for strategic business analyst inquiries, employee benefits consulting discussions, and technical collaborations.
        </p>
      </div>

      {/* Main Direct Email Relay Card */}
      <Card hover glow className="border-cyan-500/40 bg-gradient-to-b from-slate-900/80 to-slate-950 p-8 mb-8 text-center">
        <CardHeader className="p-0 mb-4 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <CardTitle className="text-2xl text-white font-mono">{CONTACT_CONFIG.email}</CardTitle>
          <CardDescription className="text-slate-400 text-xs font-mono mt-1">
            PRIMARY DISPATCH // DIRECT INBOX
          </CardDescription>
        </CardHeader>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          <Button
            href={`mailto:${CONTACT_CONFIG.email}`}
            variant="primary"
            size="md"
          >
            Launch Email Client
          </Button>

          <Button
            onClick={() => handleCopy(CONTACT_CONFIG.email)}
            variant="secondary"
            size="md"
          >
            {copiedEmail ? '✓ Copied to Clipboard' : 'Copy Email Address'}
          </Button>
        </div>
      </Card>

      {/* External Verified Profiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {SOCIAL_LINKS.filter((l) => l.platform !== 'email').map((link) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="font-mono text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                {link.platform}
              </div>
              <div className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                {link.label}
              </div>
            </div>
            <div className="font-mono text-xs text-slate-400 mt-4 flex items-center justify-between">
              <span>{link.username}</span>
              <span className="text-slate-600 group-hover:text-cyan-400">↗</span>
            </div>
          </a>
        ))}
      </div>

      {/* Location / Producer Verification */}
      <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 font-mono text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-slate-500">OPERATIONAL BASE:</span>{' '}
          <span className="text-slate-200">{CONTACT_CONFIG.location.formatted}</span>
        </div>
        <div>
          <span className="text-slate-500">NE PRODUCER:</span>{' '}
          <span className="text-cyan-400 font-semibold">#21707104</span>
        </div>
      </div>
    </div>
  );
}
