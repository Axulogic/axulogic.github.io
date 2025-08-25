import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.github.com/orgs/Axulogic', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Axulogic-Website'
      },
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      if (response.status === 403) {
        return NextResponse.json(
          { error: 'Rate limit exceeded' },
          { status: 429 }
        );
      }
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Organization not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: `GitHub API error: ${response.status}` },
        { status: response.status }
      );
    }

    const orgData = await response.json();

    const publicReposCount = orgData.public_repos || 0;
    const membersCount = orgData.public_members_count || Math.max(publicReposCount, 3);
    const organizationsCount = Math.max(publicReposCount, 1);

    return NextResponse.json({
      organizations: organizationsCount,
      publicRepos: publicReposCount,
      followers: membersCount,
      success: true
    });

  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    
    return NextResponse.json({
      organizations: 3,
      publicRepos: 5,
      followers: 8,
      success: false,
      error: 'Failed to fetch data'
    });
  }
}
