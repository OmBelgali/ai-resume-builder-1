import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:py-28 text-center">
      <h1 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#2b2118]">
        Build a Resume That Gets Read.
      </h1>
      <p className="mt-4 text-[#6e6256] text-sm sm:text-base max-w-xl mx-auto">
        Create a clear, professional resume with a live preview. No clutter — just structure.
      </p>
      <div className="mt-10">
        <Link
          href="/builder"
          className="inline-flex items-center justify-center rounded-lg bg-[#8b0000] px-6 py-3 text-sm font-medium text-[#f7f6f3] hover:bg-[#8b0000]/90 transition"
        >
          Start Building
        </Link>
      </div>
    </div>
  );
}
