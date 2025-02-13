"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InfoIcon } from "lucide-react";

export function AboutDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="fixed top-4 right-4 z-50 p-2 hover:opacity-80 transition-opacity bg-white rounded-md shadow-sm"
          aria-label="About GitHubTok"
        >
          <InfoIcon className="w-6 h-6 text-gray-700" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">About GitHubTok</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-base text-gray-700">
            A TikTok-style interface for discovering trending GitHub
            repositories.
          </p>
          <p className="text-sm text-gray-500">
            Brought to you by{" "}
            <a
              href="https://x.com/sshtunnelvision"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              @sshtunnelvision
            </a>
          </p>
          {/* <p className="text-sm text-gray-500">
            <a
              href="https://github.com/sshtunnelvision/githubtok"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              View source code here and don&apos;t forget to star!
            </a>
          </p> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
