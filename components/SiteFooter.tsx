// components/SiteFooter.tsx
export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto w-[min(1200px,92vw)] py-6 text-sm text-white/60">
        © {new Date().getFullYear()} RK3 Music Group · All rights reserved.
      </div>
    </footer>
  );
}
