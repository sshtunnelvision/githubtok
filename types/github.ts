export interface Repository {
  id: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
  created_at: string;
} 