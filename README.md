# GitHubTok 🚀

GitHubTok is a fun and interactive way to discover trending GitHub repositories. Inspired by popular social media apps, it lets you swipe through repositories to find interesting projects that match your interests.

## Features ✨

- Swipe through trending GitHub repositories (TikTok-style)
- View key repository information at a glance (stars, forks, language)
- Mobile-first responsive design
- Smooth animations and transitions
- Desktop and mobile navigation options
- Quick access to repository details

## Tech Stack 🛠️

- [Next.js 14](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- GitHub API - Data source

## Getting Started 🏁

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- GitHub API Token (optional, but recommended for higher rate limits)

### Environment Setup

1. Create a `.env.local` file in the root directory:

```env
# GitHub API Token (optional but recommended)
GITHUB_TOKEN=your_github_token_here
```

To get a GitHub token:

1. Go to GitHub Settings > Developer Settings > Personal Access Tokens
2. Generate a new token with `public_repo` scope
3. Copy the token to your `.env.local` file

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/githubtok.git
cd githubtok
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to start exploring!

## Usage 🎮

- **Mobile**:

  - Swipe right if you like a repository
  - Swipe left to skip
  - Swipe up to open in GitHub

- **Desktop**:
  - Use arrow keys for navigation
  - Click navigation buttons
  - Click repository links to open in GitHub

## Contributing 🤝

Contributions are welcome! Feel free to:

- Open issues for bugs or feature requests
- Submit pull requests
- Improve documentation

## License 📝

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments 🙏

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Powered by [GitHub API](https://docs.github.com/en/rest)
