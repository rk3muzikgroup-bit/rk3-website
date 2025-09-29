import Link from "next/link";

interface DocsLinkProps {
  file: string; // path to PDF in /public/docs
  label: string; // button text
}

export default function DocsLink({ file, label }: DocsLinkProps) {
  return (
    <Link
      href={file}
      target="_blank"
      className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg shadow-md transition"
    >
      {label}
    </Link>
  );
}
