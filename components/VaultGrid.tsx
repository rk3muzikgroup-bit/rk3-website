return (
  <main className="mx-auto w-[min(1200px,92vw)] py-10 text-white">
    <h1 className="text-2xl font-semibold">{heading}</h1>
    {blurb && <p className="mt-2 text-white/80">{blurb}</p>}

    {items.length === 0 ? (
      <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
        <div className="text-lg font-medium">Opening November</div>
        <p className="mt-2 text-white/70">
          Curating world treasures and fine art. Catalogue links • culture • dates • provenance.
        </p>
      </div>
    ) : (
      <section className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <article key={it.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="relative overflow-hidden rounded-xl border border-white/10">
              <img src={it.image} alt={it.title} className="h-[260px] w-full object-cover" />
            </div>
            <h2 className="mt-4 text-lg font-semibold">{it.title}</h2>
            {it.subtitle && <div className="mt-1 text-sm text-white/80">{it.subtitle}</div>}
            {it.meta && <div className="mt-1 text-xs text-white/60">{it.meta}</div>}
            <div className="mt-4 flex flex-wrap gap-3">
              {it.href && (
                <a href={it.href} target="_blank" rel="noopener noreferrer"
                   className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs hover:bg-white/15">
                  Catalogue →
                </a>
              )}
              {it.credit && <span className="text-xs text-white/60">{it.credit}</span>}
            </div>
          </article>
        ))}
      </section>
    )}
  </main>
);
