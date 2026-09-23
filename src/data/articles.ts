// src/data/articles.ts

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

export const ARTICLES_DATA: Article[] = [
  {
    id: 'colleges-should-teach-life-skills',
    title: 'Colleges Should Teach Life Skills',
    publication: 'The Daily Nebraskan',
    date: 'August 2023',
    term: 'Fall 2023',
    category: 'Higher Education',
    url: 'https://www.dailynebraskan.com/opinion/opinion-colleges-should-teach-life-skills/article_1c568ece-46cc-11ee-ba8a-3f6e6b45627f.html',
    summary:
      'Arguments for embedding practical personal finance, operational competencies, and everyday survival skills into undergraduate degree curricula.',
  },
  {
    id: 'greek-life-needs-to-unify',
    title: 'Greek Life Needs to Unify',
    publication: 'The Daily Nebraskan',
    date: 'September 2023',
    term: 'Fall 2023',
    category: 'Campus Culture',
    url: 'https://www.dailynebraskan.com/opinion/greek-life-unify/article_843429a2-573e-11ee-8b7f-ebe9bbebad24.html',
    summary:
      'Addressing factionalism between fraternity and sorority councils to build genuine cross-council accountability and community cohesion.',
  },
  {
    id: 'memorial-stadium-renovations-benefits',
    title: 'Memorial Stadium Renovations Offer Long Term Benefits',
    publication: 'The Daily Nebraskan',
    date: 'October 2023',
    term: 'Fall 2023',
    category: 'Athletics & Facilities',
    url: 'https://www.dailynebraskan.com/opinion/memorial-stadium-renovations-benefits/article_658b99bc-67c0-11ee-a23c-0360860d171a.html',
    summary:
      "Evaluating the long-range institutional, cultural, and economic payoffs of updating Nebraska's historic football stadium.",
  },
  {
    id: 'unl-students-explore-lincoln',
    title: 'UNL Students Need to Explore Lincoln',
    publication: 'The Daily Nebraskan',
    date: 'September 2023',
    term: 'Fall 2023',
    category: 'Local Community',
    url: 'https://www.dailynebraskan.com/opinion/unl-students-explore-lincoln/article_27d62f78-5ccc-11ee-b416-e34060c8b4e1.html',
    summary:
      "Encouraging students to venture beyond the campus perimeter and engage actively with Lincoln's broader cultural and local economy.",
  },
  {
    id: 'congress-needs-an-age-cap',
    title: 'Congress Needs an Age Cap',
    publication: 'The Daily Nebraskan',
    date: 'November 2023',
    term: 'Fall 2023',
    category: 'Governance & Policy',
    url: 'https://www.dailynebraskan.com/opinion/congress-age-cap/article_98307e54-7851-11ee-8785-3754db0c91df.html',
    summary:
      'Exploring generational divides in policy-making, cognitive continuity, and the case for statutory age limits on national legislators.',
  },
  {
    id: 'unpaid-internships-injustice',
    title: 'The Injustice of Unpaid Internships',
    publication: 'The Daily Nebraskan',
    date: 'November 2023',
    term: 'Fall 2023',
    category: 'Workforce & Labor',
    url: 'https://www.dailynebraskan.com/opinion/unpaid-internships/article_1df10538-84e4-11ee-9132-1b05445fb443.html',
    summary:
      'A critical critique of unpaid collegiate internships as socio-economic gatekeeping mechanisms that disadvantage working-class students.',
    featured: true,
  },
  {
    id: 'how-virtual-reality-can-benefit-students',
    title: 'How Virtual Reality Can Benefit Students',
    publication: 'The Daily Nebraskan',
    date: 'December 2023',
    term: 'Fall 2023',
    category: 'Technology & Learning',
    url: 'https://www.dailynebraskan.com/opinion/students-virtual-reality/article_82fb63b4-9228-11ee-84bb-533498bb400a.html',
    summary:
      'Analyzing experiential simulations and spatial computing applications inside collegiate learning spaces.',
  },
];
