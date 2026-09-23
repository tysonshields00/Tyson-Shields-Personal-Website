// src/types/articles.ts

export type ArticleCategory =
  | 'Higher Education'
  | 'Campus Culture'
  | 'Athletics & Facilities'
  | 'Local Community'
  | 'Governance & Policy'
  | 'Workforce & Labor'
  | 'Technology & Learning';

export interface Article {
  id: string;
  title: string;
  publication: string;
  date: string;
  term: string;
  category: ArticleCategory;
  url: string;
  summary: string;
  featured?: boolean;
}
