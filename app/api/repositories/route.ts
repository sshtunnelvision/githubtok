import { getTrendingRepositories, GitHubError } from '@/lib/github';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const repositories = await getTrendingRepositories();
    return NextResponse.json(repositories);
  } catch (error) {
    if (error instanceof GitHubError) {
      return NextResponse.json(
        { error: error.message, details: error.details },
        { status: error.status }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 