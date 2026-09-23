// src/components/SocialLinks.tsx
'use client';

import React, { useState } from 'react';
import { SOCIAL_LINKS, CONTACT_CONFIG } from '@/data/socials';
import { SocialLink } from '@/types/socials';

interface SocialLinksProps {
  variant?: 'pills' | 'icons' | 'cards';
  className?: string;
  showEmailCopy?: boolean;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  variant = 'pills',
  className = '',
  showEmailCopy = true,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(CONTACT_CONFIG.email).then(() => {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      });
    } else {
      window.location.href = `mailto:${CONTACT_CONFIG.email}`;
    }
  };

  const renderIcon = (icon: SocialLink['icon']) => {
    switch (icon) {
      case 'github':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
        );
      case 'linkedin':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        );
      case 'instagram':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        );
      case 'mail':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'globe':
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        );
    }
  };

  // Compact icon-only variant (ideal for headers/footers)
  if (variant === 'icons') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target={link.isExternal ? '_blank' : undefined}
            rel={link.rel}
            aria-label={`${link.label}: ${link.handle}`}
            className="p-2 rounded-lg text-slate-400 hover:text-sky-400 hover:bg-slate-800/60 border border-transparent hover:border-slate-700/60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            {renderIcon(link.icon)}
          </a>
        ))}
      </div>
    );
  }

  // Cards layout (ideal for dedicated contact/about pages)
  if (variant === 'cards') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
        {SOCIAL_LINKS.map((link) => {
          const isEmail = link.platform === 'email';

          return (
            <div
              key={link.id}
              className="group relative flex flex-col justify-between p-5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900/80 hover:border-slate-700 transition-all duration-200 backdrop-blur-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    {renderIcon(link.icon)}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                    {link.category}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
                  {link.label}
                </h4>
                <p className="text-xs font-mono text-slate-400 mt-1">{link.handle}</p>
                {link.description && (
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {link.description}
                  </p>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                {isEmail && showEmailCopy ? (
                  <div className="flex items-center gap-2 w-full justify-between">
                    <a
                      href={link.href}
                      className="text-xs font-mono text-sky-400 hover:underline flex items-center gap-1"
                      aria-label="Send direct email"
                    >
                      Send Mail <span>↗</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label="Copy email address to clipboard"
                      className="text-xs font-mono px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    >
                      {copiedEmail ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                ) : (
                  <a
                    href={link.href}
                    target={link.isExternal ? '_blank' : undefined}
                    rel={link.rel}
                    aria-label={`Open ${link.label} (${link.handle}) in new tab`}
                    className="text-xs font-mono text-sky-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 w-full justify-between"
                  >
                    <span>Connect</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Default 'pills' variant (ideal for hero sections and bio intros)
  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {SOCIAL_LINKS.map((link) => {
        const isEmail = link.platform === 'email';

        if (isEmail && showEmailCopy) {
          return (
            <div key={link.id} className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/60 backdrop-blur-sm p-0.5">
              <a
                href={link.href}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-sky-300 transition-colors focus:outline-none focus:ring-1 focus:ring-sky-500 rounded-l-full"
                aria-label="Send direct email to tysonshields00@gmail.com"
              >
                {renderIcon(link.icon)}
                <span>Email</span>
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                title="Copy email to clipboard"
                aria-label="Copy email to clipboard"
                className="px-2.5 py-1 text-[11px] font-mono text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-full transition-colors border-l border-slate-700/50"
              >
                {copiedEmail ? '✓' : 'Copy'}
              </button>
            </div>
          );
        }

        return (
          <a
            key={link.id}
            href={link.href}
            target={link.isExternal ? '_blank' : undefined}
            rel={link.rel}
            aria-label={`${link.label}: ${link.handle} (opens in a new tab)`}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-700/80 bg-slate-900/60 text-xs font-mono text-slate-300 hover:text-sky-300 hover:border-sky-500/50 hover:bg-slate-800/80 transition-all duration-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            {renderIcon(link.icon)}
            <span>{link.label}</span>
            <span className="text-slate-500 text-[10px]">↗</span>
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
