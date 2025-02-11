"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { StarIcon, GitForkIcon, ExternalLinkIcon } from "lucide-react";
import { Repository } from "@/types/github";
import Image from "next/image";

interface RepoCardProps {
  repo: Repository;
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
      <CardHeader className="space-y-1">
        <div className="flex items-center space-x-2">
          <div className="relative w-8 h-8">
            <Image
              src={repo.owner.avatar_url}
              alt={`${repo.owner.login}'s avatar`}
              fill
              className="rounded-full object-cover"
              sizes="32px"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold">{repo.name}</h2>
            <p className="text-sm text-gray-500">{repo.owner.login}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-700">{repo.description}</p>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <StarIcon className="w-4 h-4 text-yellow-500" />
            <span>{repo.stars.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <GitForkIcon className="w-4 h-4 text-gray-500" />
            <span>{repo.forks.toLocaleString()}</span>
          </div>
          {repo.language && (
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span>{repo.language}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-primary hover:underline"
        >
          <span>View on GitHub</span>
          <ExternalLinkIcon className="w-4 h-4" />
        </a>
      </CardFooter>
    </Card>
  );
}
