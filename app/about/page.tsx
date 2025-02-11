import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            About GitHubTok
          </h1>
          <p className="text-gray-600">Discover amazing GitHub repositories</p>
        </header>

        <div className="max-w-2xl mx-auto prose prose-gray">
          <h2>What is GitHubTok?</h2>
          <p>
            GitHubTok is a fun and interactive way to discover trending GitHub
            repositories. Inspired by popular social media apps, it lets you
            swipe through repositories to find interesting projects that match
            your interests.
          </p>

          <h2>How to Use</h2>
          <ul>
            <li>Swipe right if you like a repository</li>
            <li>Swipe left to skip</li>
            <li>Swipe up to open in GitHub</li>
            <li>
              On desktop, you can also use arrow keys or click navigation
              buttons
            </li>
          </ul>

          <h2>Features</h2>
          <ul>
            <li>Browse trending GitHub repositories</li>
            <li>View key repository information at a glance</li>
            <li>Quick access to repository details</li>
            <li>Mobile-friendly design</li>
            <li>Smooth animations and transitions</li>
          </ul>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800"
            >
              Start Exploring
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
