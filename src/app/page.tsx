import ShortenerForm from "@/components/ShortenerForm";

export default function Home() {
  return (
    <main className="w-full max-w-7xl mx-auto py-12 px-5 space-y-6">
      <div className="space-px-2 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">URL Shortener</h1>
        <p className="md:text-lg">Shorten your URL and share then easily</p>
      </div>
      <ShortenerForm></ShortenerForm>
    </main>
  );
}
