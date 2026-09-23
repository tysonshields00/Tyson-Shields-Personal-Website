// src/components/layout/Footer.tsx
'use client';

import React from 'react';
import { SOCIAL_LINKS, CONTACT_CONFIG } from '@/data/socials';
import { NAV_ITEMS } from './Navigation';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Identity Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-md bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-white font-mono font-bold text-xs">
                TS
              </div>
              <span className="font-bold text-white text-base tracking-tight">
                Tyson Shields
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Business Analyst &amp; Systems Specialist in Employee Benefits.
              Focused on plan optimization, renewal financial modeling, carrier data integrity, and business automation.
            </p>
            <div className="font-mono text-[11px] text-slate-500">
              LOCATION: {CONTACT_CONFIG.location.formatted} // PRODUCER #21707104
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-slate-200 mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* External Networks */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-slate-200 mb-3">
              Connect &amp; Verify
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    target={link.isExternal ? '_blank' : undefined}
                    rel={link.isExternal ? 'noopener noreferrer' : undefined}
                    className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                  >
                    <span>{link.label}</span>
                    <span className="text-slate-600">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {currentYear} Tyson Shields. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>SYS_VERSION 2.0.0</span>
            <span>·</span>
            <span>NEXT_ARCH_MODULAR</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
