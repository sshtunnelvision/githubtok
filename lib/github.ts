import { Repository } from '@/types/github';

interface GitHubApiResponse {
  items: Array<{
    id: number;
    name: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    owner: {
      login: string;
      avatar_url: string;
    };
    html_url: string;
    created_at: string;
  }>;
}

export class GitHubError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'GitHubError';
  }
}

export async function getTrendingRepositories(): Promise<Repository[]> {
  try {
    const response = await fetch(
      'https://api.github.com/search/repositories?' +
      new URLSearchParams({
        q: 'stars:>1000',
        sort: 'stars',
        order: 'desc',
        per_page: '100'
      }),
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          ...(process.env.GITHUB_TOKEN && {
            'Authorization': `token ${process.env.GITHUB_TOKEN}`
          })
        }
      }
    );

    if (!response.ok) {
      throw new GitHubError(
        'GitHub API request failed',
        response.status,
        await response.json().catch(() => null)
      );
    }

    const data = await response.json() as GitHubApiResponse;
    
    return data.items.map((item) => ({
      id: item.id.toString(),
      name: item.name,
      description: item.description || '',
      stars: item.stargazers_count,
      forks: item.forks_count,
      language: item.language || '',
      owner: {
        login: item.owner.login,
        avatar_url: item.owner.avatar_url,
      },
      html_url: item.html_url,
      created_at: item.created_at,
    }));
  } catch (error) {
    if (error instanceof GitHubError) {
      throw error;
    }
    throw new GitHubError(
      'Failed to fetch repositories',
      500,
      error instanceof Error ? error.message : error
    );
  }
} 