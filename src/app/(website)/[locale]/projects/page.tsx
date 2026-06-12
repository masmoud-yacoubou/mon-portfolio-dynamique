import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import prisma from "@/lib/prisma";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { isValidLocale } from "@/lib/site";

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  await getDictionary(locale);

  const projects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
  });

  const isEn = locale === "en";

  return (
    <main className="min-h-screen bg-[#f7f3ea] px-4 pb-16 pt-32 text-slate-950 dark:bg-[#09090b] dark:text-white sm:px-8 lg:px-14">
      <section className="mx-auto max-w-6xl">
        <div className="mb-10 border-b border-slate-300/70 pb-8 dark:border-white/10">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.24em] text-blue-600 dark:text-blue-300">
            {isEn ? "All projects" : "Tous les projets"} /{" "}
            {projects.length.toString().padStart(2, "0")}
          </p>

          <h1 className="max-w-4xl font-montserrat text-5xl font-black uppercase leading-[0.95] tracking-[-0.065em] sm:text-7xl">
            {isEn ? "Project archive." : "Archive projets."}
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {isEn
              ? "A complete archive of products, platforms and digital experiences I have designed or engineered."
              : "Une archive complète des produits, plateformes et expériences digitales que j’ai conçus ou développés."}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={`/${locale}/project/${project.slug}`}
              className="group overflow-hidden rounded-[22px] border border-slate-300/70 bg-white/45 transition-all duration-500 hover:-translate-y-1 hover:border-blue-500/35 hover:bg-white dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-300/35"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-200 dark:bg-white/[0.04]">
                <div className="absolute left-3 top-3 z-10 rounded-full bg-slate-950/90 px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.2em] text-white">
                  {(index + 1).toString().padStart(2, "0")}
                </div>

                {project.featured && (
                  <div className="absolute right-3 top-3 z-10 rounded-full border border-white/30 bg-white/85 px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.18em] text-slate-950 backdrop-blur dark:bg-slate-950/80 dark:text-white">
                    {isEn ? "Featured" : "Sélection"}
                  </div>
                )}

                {project.videoUrl ? (
                  <video
                    src={project.videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : project.imageUrl ? (
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    quality={90}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#eee6d8] dark:bg-[#111113]">
                    <span className="font-montserrat text-6xl font-black uppercase tracking-[-0.08em] text-slate-300 dark:text-zinc-700">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.01),rgba(15,23,42,0.18))] opacity-75 transition-opacity duration-500 group-hover:opacity-50" />
              </div>

              <div className="p-5">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">
                    {project.featured ? (isEn ? "Featured" : "Sélection") : "Project"}
                  </span>

                  <ArrowUpRight
                    size={16}
                    className="text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-300"
                  />
                </div>

                <h2 className="font-montserrat text-xl font-black uppercase tracking-[-0.04em] transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-300">
                  {isEn && project.title_en ? project.title_en : project.title}
                </h2>

                <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {isEn && project.description_en
                    ? project.description_en
                    : project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-slate-300/80 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:border-white/10 dark:text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}