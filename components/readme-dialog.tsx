"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Repository } from "@/types/github";

interface ReadmeDialogProps {
  repo: Repository;
}

export function ReadmeDialog({ repo }: ReadmeDialogProps) {
  const [readmeContent, setReadmeContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReadme = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/readme?owner=${repo.owner.login}&repo=${repo.name}`
      );
      if (!response.ok) {
        throw new Error("Failed to load README");
      }
      let html = await response.text();

      // Transform relative image URLs to absolute GitHub URLs
      html = html.replace(
        /src="(?!http|\/\/|data:)(.*?)"/g,
        `src="https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/main/$1"`
      );

      setReadmeContent(html);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load README");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) {
          fetchReadme();
        }
      }}
    >
      <DialogTrigger asChild>
        <button className="hidden" aria-label="View README">
          View README
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl h-[80vh] flex flex-col overflow-hidden pt-8">
        <DialogHeader className="sr-only">
          <DialogTitle>{repo.name} README</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="prose prose-sm md:prose-base max-w-none dark:prose-invert px-6">
            <h1 className="text-xl font-semibold mb-6">{repo.name} README</h1>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
              </div>
            ) : error ? (
              <div className="text-red-500 py-4">{error}</div>
            ) : (
              <div
                dangerouslySetInnerHTML={{ __html: readmeContent }}
                className="[&>*:first-child]:mt-0 [&_img]:rounded-lg [&_img]:my-4 [&_img]:max-w-full [&_img]:h-auto 
                [&_pre]:overflow-x-auto [&_pre]:p-4 [&_pre]:bg-gray-50/50 [&_pre]:rounded-lg [&_code]:text-sm 
                [&_h1]:text-2xl [&_h1]:mt-8 [&_h1]:mb-6 [&_h2]:text-xl [&_h2]:mt-8 [&_h2]:mb-4 
                [&_h3]:text-lg [&_h3]:mt-6 [&_h3]:mb-4 [&_p]:text-base [&_p]:my-4 
                [&_li]:text-base [&_ul]:my-4 [&_ol]:my-4 
                [&_a]:text-primary [&_a]:no-underline hover:[&_a]:underline 
                [&_table]:w-full [&_td]:p-2 [&_th]:p-2 [&_tr]:border-b [&_tr]:border-gray-200 
                [&_pre]:whitespace-pre-wrap [&_code]:whitespace-pre-wrap [&_*]:break-words
                [&_p:has(>img)]:flex [&_p:has(>img)]:flex-col [&_p:has(>img)]:items-center [&_p:has(>img)]:gap-4
                [&_p:has(>a>img)]:flex [&_p:has(>a>img)]:flex-col [&_p:has(>a>img)]:items-center [&_p:has(>a>img)]:gap-4
                [&_p:has(>img+a)]:flex [&_p:has(>img+a)]:flex-col [&_p:has(>img+a)]:items-center [&_p:has(>img+a)]:gap-4
                [&_p:has(>a)]:flex [&_p:has(>a)]:flex-wrap [&_p:has(>a)]:gap-2 [&_p:has(>a)]:items-center
                [&_table]:overflow-x-auto [&_table]:block [&_table]:w-full [&_table]:max-w-full
                [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_pre]:block
                [&_img]:object-contain [&_img]:w-full"
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
