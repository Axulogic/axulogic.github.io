"use client";

import { useState, useEffect } from 'react';

interface GitHubStats {
  organizations: number;
  publicRepos: number;
  followers: number;
  isLoading: boolean;
  error: string | null;
}

let cachedStats: GitHubStats | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000;

export function useGitHubStats() {
  const [stats, setStats] = useState<GitHubStats>({
    organizations: 0,
    publicRepos: 0,
    followers: 0,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const now = Date.now();
        if (cachedStats && (now - cacheTimestamp) < CACHE_DURATION) {
          setStats(cachedStats);
          return;
        }

        setStats(prev => ({ ...prev, isLoading: true, error: null }));

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const response = await fetch('/api/github-stats', {
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch data');
        }

        const newStats = {
          organizations: data.organizations,
          publicRepos: data.publicRepos,
          followers: data.followers,
          isLoading: false,
          error: null
        };

        cachedStats = newStats;
        cacheTimestamp = now;

        setStats(newStats);

      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        
        const fallbackStats = {
          organizations: 3,
          publicRepos: 5,
          followers: 8,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch data'
        };

        cachedStats = fallbackStats;
        cacheTimestamp = Date.now();

        setStats(fallbackStats);
      }
    };

    if (typeof window !== 'undefined') {
      fetchGitHubStats();
    } else {
      setStats({
        organizations: 3,
        publicRepos: 5,
        followers: 8,
        isLoading: false,
        error: null
      });
    }
  }, []);

  return stats;
}