import Link from "next/link";

export default function Breadcrumb({ name }: { name: string[] }) {
  return (
    <nav className="text-sm mb-4">
      <Link href="/" className="text-blue-600 hover:underline">
        Home
      </Link>{" "}
      &rarr; <span className="capitalize">{name}</span>
    </nav>
  );
}
