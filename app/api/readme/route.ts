import { NextResponse } from 'next/server';

async function fetchReadme(owner: string, repo: string) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3.html',
          ...(process.env.GITHUB_TOKEN && {
            'Authorization': `token ${process.env.GITHUB_TOKEN}`
          })
        }
      }
    );

    if (!response.ok) {
      throw new Error('README not found');
    }

    const html = await response.text();
    return html;
  } catch (error) {
    console.error('Error fetching README:', error);
    throw error;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const owner = searchParams.get('owner');
  const repo = searchParams.get('repo');

  if (!owner || !repo) {
    return NextResponse.json(
      { error: 'Owner and repo parameters are required' },
      { status: 400 }
    );
  }

  try {
    const readme = await fetchReadme(owner, repo);
    return new NextResponse(readme, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch README' },
      { status: 500 }
    );
  }
} 