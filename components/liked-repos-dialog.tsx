"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HeartIcon, ExternalLinkIcon, TrashIcon } from "lucide-react";
import { Repository } from "@/types/github";

interface LikedReposDialogProps {
  likedRepos: Repository[];
  onRemove: (repoId: string) => void;
}

export function LikedReposDialog({
  likedRepos,
  onRemove,
}: LikedReposDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="p-3 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors flex items-center space-x-2"
          aria-label="View saved repositories"
        >
          <HeartIcon className="w-5 h-5" />
          <span className="text-sm font-medium">{likedRepos.length} saved</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">Liked Repositories</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {likedRepos.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No liked repositories yet. Swipe right on repositories you like!
            </p>
          ) : (
            likedRepos.map((repo) => (
              <div
                key={repo.id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium truncate">{repo.name}</h3>
                  <p className="text-sm text-gray-500 truncate">
                    {repo.owner.login}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4 shrink-0">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-600 hover:text-gray-900"
                    aria-label="Open in GitHub"
                  >
                    <ExternalLinkIcon className="w-5 h-5" />
                  </a>
                  <button
                    onClick={() => onRemove(repo.id)}
                    className="p-2 text-gray-600 hover:text-red-500"
                    aria-label="Remove from liked repositories"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
