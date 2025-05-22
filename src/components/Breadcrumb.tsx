import Link from "next/link";

export default function Breadcrumb({ segments }: { segments: string[] }) {
  return (
    <nav className="text-sm text-gray-600">
      {segments.map((seg, i) => (
        <span key={i}>
          {i > 0 && " → "}
          {i === segments.length - 1 ? (
            <span className="capitalize">{seg}</span>
          ) : (
            <Link href="/" className="hover:underline">
              {seg}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
