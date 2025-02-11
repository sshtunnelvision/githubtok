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

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function getTrendingRepositories(): Promise<Repository[]> {
  try {
    // Get a mix of different time periods and languages
    const queries = [
      'stars:>1000 created:>2024-01-01',
      'stars:>5000 created:>2023-01-01',
      'stars:>10000 language:typescript',
      'stars:>10000 language:python',
      'stars:>10000 language:javascript',
      'stars:>10000 language:rust',
      'stars:>10000 language:go',
    ];

    const randomQuery = queries[Math.floor(Math.random() * queries.length)];

    const response = await fetch(
      'https://api.github.com/search/repositories?' +
      new URLSearchParams({
        q: randomQuery,
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
    
    // Shuffle the repositories before returning
    return shuffleArray(data.items).map((item) => ({
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