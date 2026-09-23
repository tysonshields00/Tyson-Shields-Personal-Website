// src/types/credentials.ts

export type CredentialCategory =
  | 'Licenses'
  | 'Business Analysis'
  | 'Data Analytics'
  | 'Python & Systems'
  | 'SEO & Marketing';

export interface Credential {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  category: CredentialCategory;
  featured?: boolean;
  verificationUrl?: string;
  description?: string;
}
