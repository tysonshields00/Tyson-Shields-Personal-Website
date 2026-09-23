// src/components/layout/Navigation.tsx
'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', href: '/' },
  { label: 'Experience', href: '/career' },
  { label: 'Credentials', href: '/#certifications' },
  { label: 'Published Work', href: '/#articles' },
  { label: 'Competencies', href: '/skills' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export interface NavigationProps {
  currentPath?: string;
  className?: string;
  onItemClick?: () => void;
  orientation?: 'horizontal' | 'vertical';
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPath = '/',
  className,
  onItemClick,
  orientation = 'horizontal',
}) => {
  return (
    <nav
      aria-label="Main Navigation"
      className={cn(
        orientation === 'horizontal'
          ? 'hidden md:flex items-center gap-1 lg:gap-2'
          : 'flex flex-col gap-2',
        className
      )}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = currentPath === item.href;
        return (
          <a
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-colors duration-200',
              isActive
                ? 'text-cyan-300 bg-cyan-950/40 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
            )}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
};

export default Navigation;
