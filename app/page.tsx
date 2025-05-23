export default function HomePage() {
    return (
      <main className="min-h-screen flex items-center justify-center text-center p-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">Welcome to Shadowly</h1>
          <p className="text-lg text-gray-600">Start by visiting <a href="/player" className="text-blue-500 underline">/player</a> or paste a YouTube link there.</p>
        </div>
      </main>
    );
  }