"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight, Github, Linkedin, MessageCircle } from "lucide-react";
import type { Experience, Project, Skill } from "@prisma/client";
import ContactForm from "@/components/ContactForm";

interface Dictionary {
  hero?: Record<string, string>;
  nav?: Record<string, string>;
  sections?: Record<string, string>;
  projects?: Record<string, string>;
  contact?: Record<string, string>;
}

interface HomeClientProps {
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  activeLocale: string;
  dict: Dictionary;
}

const easePremium = [0.16, 1, 0.3, 1] as const;

const revealUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, ease: easePremium },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.075, delayChildren: 0.08 },
  },
};

const socialLinks = [
  {
    name: "Github",
    href: "https://github.com/masmoud-yacoubou",
    icon: <Github size={16} />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/masmoud-yacoubou",
    icon: <Linkedin size={16} />,
  },
  {
    name: "Whatsapp",
    href: "https://wa.me/22969724172",
    icon: <MessageCircle size={16} />,
  },
];

function formatExperienceDuration(startDate: Date, endDate: Date | null, isEn: boolean) {
  const end = endDate ? new Date(endDate) : new Date();
  const start = new Date(startDate);
  const months = Math.max(
    1,
    (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
  );
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (isEn) {
    if (years > 0) {
      return `${years} yr${years > 1 ? "s" : ""}${remainingMonths > 0 ? ` ${remainingMonths} mo` : ""}`;
    }
    return `${months} mo`;
  }
  if (years > 0) {
    return `${years} an${years > 1 ? "s" : ""}${remainingMonths > 0 ? ` ${remainingMonths} mois` : ""}`;
  }
  return `${months} mois`;
}

function splitExperienceText(text: string) {
  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function HomeClient({
  projects,
  skills,
  experiences,
  activeLocale,
  dict,
}: HomeClientProps) {
  const isEn = activeLocale === "en";
  const selectedProjects = projects.slice(0, 4);
  const leadingSkills = skills.slice(0, 8);

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--color-light-bg)] text-[var(--color-light-text-primary)] selection:bg-[var(--color-accent)] selection:text-white dark:bg-[var(--color-night-bg)] dark:text-[var(--color-night-text-primary)]">

      {/* ─── HERO ─── */}
      <section className="relative px-4 pb-14 pt-20 sm:px-8 sm:pb-18 sm:pt-24 lg:px-14 lg:pb-24 lg:pt-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(circle_at_76%_40%,rgba(37,99,235,0.13),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.82),rgba(247,243,234,0))] dark:bg-[radial-gradient(circle_at_76%_40%,rgba(37,99,235,0.18),transparent_34%),linear-gradient(180deg,rgba(20,26,38,0.72),rgba(5,5,5,0))]" />
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_0.8fr] lg:gap-12">
          <motion.div variants={stagger} initial="hidden" animate="visible">

            {/* Badge statut */}
            <motion.div variants={revealUp} className="mb-6 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">
                {isEn ? "Available for new missions" : "Disponible pour de nouvelles missions"}
              </span>
            </motion.div>

            {/* Titre */}
            <motion.h1
              variants={revealUp}
              className="font-heading text-[2.6rem] font-black uppercase leading-[0.9] tracking-[-0.075em] text-[var(--color-light-text-primary)] dark:text-[var(--color-night-text-primary)] sm:text-[4rem] lg:text-[5rem]"
            >
              Full-stack
              <span className="block text-[var(--color-accent)] dark:text-blue-300">Developer</span>
            </motion.h1>

            <motion.div variants={revealUp} className="mt-6 h-px w-12 bg-[var(--color-accent)] dark:bg-blue-300" />

            {/* Description */}
            <motion.p
              variants={revealUp}
              className="mt-6 max-w-xl text-[15px] leading-7 text-[var(--color-light-text-secondary)] dark:text-[var(--color-night-text-secondary)] sm:text-base"
            >
              {isEn
                ? "I help clients and teams turn an idea into a working product — design, development, delivery."
                : "J'aide clients et équipes à transformer une idée en produit fonctionnel — conception, développement, livraison."}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={revealUp}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <a
                href="#works"
                className="group inline-flex items-center justify-center gap-3 rounded-[10px] bg-[var(--color-accent)] px-6 py-3.5 text-[11px] font-black uppercase tracking-[0.19em] text-white shadow-[0_18px_40px_-28px_rgba(37,99,235,0.9)] transition-colors duration-300 hover:bg-[var(--color-light-text-primary)] dark:hover:bg-blue-300 dark:hover:text-[var(--color-night-bg)]"
              >
                {isEn ? "Explore my work" : "Explorer mon travail"}
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#contact"
                className="premium-pill group inline-flex items-center justify-center gap-3 rounded-[10px] px-6 py-3.5 text-[11px] font-black uppercase tracking-[0.19em] text-[var(--color-light-text-primary)] transition-colors duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] dark:text-[var(--color-night-text-secondary)] dark:hover:border-blue-300 dark:hover:text-blue-300 premium-hover-blue"
              >
                {isEn ? "Get in touch" : "Prendre contact"}
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </motion.div>

          {/* Photo */}
          <motion.aside
            initial={{ opacity: 0, scale: 0.97, y: 22 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.78, ease: easePremium, delay: 0.1 }}
            className="relative mx-auto w-full max-w-[340px] lg:max-w-[420px] lg:justify-self-end"
          >
            <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/35 dark:border-blue-300/16 sm:h-[380px] sm:w-[380px]" />
            <div className="absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/25 dark:border-blue-300/10 sm:h-[320px] sm:w-[320px]" />

            <div className="relative mx-auto h-[260px] w-[260px] rounded-full border-[6px] border-[var(--color-light-surface)] bg-[var(--color-light-text-primary)] shadow-[0_32px_82px_-52px_rgba(37,99,235,0.75)] dark:border-[var(--color-night-border)] sm:h-[340px] sm:w-[340px] lg:h-[380px] lg:w-[380px]">
              <Image
                src="/photo.png"
                alt="Masmoud Yacoubou"
                fill
                className="rounded-full object-cover"
                priority
                quality={95}
                sizes="(max-width: 640px) 260px, (max-width: 1024px) 340px, 380px"
              />
            </div>

            {/* Badge localisation */}
            <div className="absolute -left-2 bottom-1/3 hidden rounded-[18px] border border-[var(--color-light-border)] bg-[var(--color-light-surface)]/90 p-3 shadow-[0_22px_56px_-38px_rgba(15,23,42,0.35)] dark:border-[var(--color-night-border)] dark:bg-[var(--color-night-surface)]/90 sm:block">
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)] dark:text-blue-300">
                {isEn ? "Based in" : "Basé à"}
              </div>
              <div className="mt-1.5 text-xs font-black uppercase leading-5 text-[var(--color-light-text-primary)] dark:text-[var(--color-night-text-primary)]">
                Cotonou,
                <br />
                Bénin
              </div>
            </div>

            {/* Badge disponibilité */}
            <div className="absolute -right-1 bottom-8 hidden rounded-[18px] border border-[var(--color-light-border)] bg-[var(--color-light-surface)]/90 p-3 shadow-[0_22px_56px_-38px_rgba(15,23,42,0.35)] dark:border-[var(--color-night-border)] dark:bg-[var(--color-night-surface)]/90 sm:block">
              <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                {isEn ? "Available" : "Disponible"}
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
              <div className="mt-1.5 text-xs font-black uppercase leading-5 text-[var(--color-light-text-primary)] dark:text-[var(--color-night-text-primary)]">
                {isEn ? "For new missions" : "Nouvelles missions"}
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section id="works" className="px-4 py-16 sm:px-8 sm:py-20 lg:px-14">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-9 flex flex-col gap-5 border-b border-[var(--color-light-border)] pb-7 dark:border-[var(--color-night-border)] lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <p className="mb-3 text-[11px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)] dark:text-blue-300">
                {isEn ? "Selected work / 04" : "Travaux sélectionnés / 04"}
              </p>
              <h2 className="font-heading text-4xl font-black uppercase tracking-[-0.06em] text-[var(--color-light-text-primary)] dark:text-[var(--color-night-text-primary)] sm:text-5xl">
                {dict?.nav?.works || (isEn ? "Projects" : "Projets")}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[var(--color-light-text-secondary)] dark:text-[var(--color-night-text-secondary)]">
              {isEn
                ? "A compact selection of products and platforms built with a product-first engineering approach."
                : "Une sélection compacte de produits et plateformes conçus avec une approche produit."}
            </p>
          </motion.div>

          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            {selectedProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.58, ease: easePremium, delay: index * 0.04 }}
                className="premium-card group overflow-hidden rounded-[24px] transition-all duration-300 hover:-translate-y-1"
              >
                <Link href={`/${activeLocale}/project/${project.slug}`} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-light-border)] dark:bg-[var(--color-night-surface)]">
                    <div className="absolute left-4 top-4 z-10 rounded-full bg-[var(--color-light-text-primary)]/90 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-white dark:bg-[var(--color-night-bg)]/90">
                      {(index + 1).toString().padStart(2, "0")}
                    </div>

                    {project.featured && (
                      <div className="absolute right-4 top-4 z-10 rounded-full border border-white/30 bg-white/85 px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-light-text-primary)] backdrop-blur dark:bg-[var(--color-night-bg)]/80 dark:text-[var(--color-night-text-primary)]">
                        {isEn ? "Featured" : "Sélection"}
                      </div>
                    )}

                    {project.videoUrl ? (
                      <video
                        suppressHydrationWarning
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
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-light-bg)] dark:bg-[var(--color-night-surface-soft)]">
                        <span className="font-heading text-6xl font-black uppercase tracking-[-0.08em] text-[var(--color-light-border)] dark:text-[var(--color-night-border)]">
                          {project.title.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.technologies?.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="premium-pill rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--color-light-text-secondary)] transition-colors group-hover:border-[var(--color-accent)]/30 group-hover:text-[var(--color-accent)] dark:text-[var(--color-night-text-secondary)] dark:group-hover:text-blue-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="font-heading text-xl font-black uppercase tracking-[-0.05em] text-[var(--color-light-text-primary)] transition-colors group-hover:text-[var(--color-accent)] dark:text-[var(--color-night-text-primary)] dark:group-hover:text-blue-300 sm:text-2xl">
                          {isEn && project.title_en ? project.title_en : project.title}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm leading-7 text-[var(--color-light-text-secondary)] dark:text-[var(--color-night-text-secondary)]">
                          {isEn && project.description_en ? project.description_en : project.description}
                        </p>
                      </div>

                      <span className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[var(--color-light-border)] text-[var(--color-light-text-secondary)] transition-all group-hover:border-[var(--color-accent)]/35 group-hover:text-[var(--color-accent)] dark:border-[var(--color-night-border)] dark:text-[var(--color-night-text-secondary)] dark:group-hover:text-blue-300">
                        <ArrowUpRight size={17} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: easePremium }}
            className="mt-8 flex justify-center"
          >
            <Link
              href={`/${activeLocale}/projects`}
              className="premium-pill group inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] text-[var(--color-light-text-primary)] transition-colors duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] dark:text-[var(--color-night-text-secondary)] dark:hover:border-blue-300 dark:hover:text-blue-300"
            >
              {isEn ? "Explore all projects" : "Explorer tous les projets"}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── SKILLS ─── */}
      <section id="skills" className="px-4 py-16 sm:px-8 sm:py-20 lg:px-14">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-9 flex flex-col gap-5 border-b border-[var(--color-light-border)] pb-7 dark:border-[var(--color-night-border)] lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <p className="mb-3 text-[11px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)] dark:text-blue-300">
                {isEn ? "My stack" : "Ma stack"}
              </p>
              <h2 className="font-heading text-4xl font-black uppercase tracking-[-0.06em] text-[var(--color-light-text-primary)] dark:text-[var(--color-night-text-primary)] sm:text-5xl">
                {isEn ? "Tools, not buzzwords." : "Des outils, pas des buzzwords."}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[var(--color-light-text-secondary)] dark:text-[var(--color-night-text-secondary)]">
              {isEn
                ? "A focused stack used to design, build and maintain complete digital products."
                : "Une stack ciblée pour concevoir, développer et maintenir des produits complets."}
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {leadingSkills.map((skill, index) => (
              <motion.article
                key={skill.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: easePremium, delay: index * 0.035 }}
                className="premium-card group rounded-[22px] p-5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--color-light-border)] bg-[var(--color-light-bg)] dark:border-[var(--color-night-border)] dark:bg-[var(--color-night-surface)]">
                      {skill.iconUrl ? (
                        <img src={skill.iconUrl} alt={skill.name} className="h-6 w-6 object-contain" />
                      ) : (
                        <span className="font-heading text-sm font-black uppercase text-[var(--color-accent)] dark:text-blue-300">
                          {skill.name.slice(0, 2)}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)] dark:text-blue-300">
                        {skill.category}
                      </p>
                      <h3 className="mt-1 text-base font-bold text-[var(--color-light-text-primary)] dark:text-[var(--color-night-text-primary)]">
                        {skill.name}
                      </h3>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--color-light-text-secondary)] dark:text-[var(--color-night-text-secondary)]">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-px overflow-hidden bg-[var(--color-light-border)] dark:bg-[var(--color-night-border)]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.75, ease: easePremium, delay: 0.1 + index * 0.035 }}
                    className="h-full bg-[var(--color-accent)] dark:bg-blue-300"
                  />
                </div>

                {/* Pourcentage seul, sans label */}
                <div className="mt-4 flex justify-end">
                  <span className="font-heading text-sm font-black tracking-[-0.04em] text-[var(--color-accent)] dark:text-blue-300">
                    {skill.level}%
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCE (Timeline) ─── */}
      <section id="experience" className="px-4 py-16 sm:px-8 sm:py-20 lg:px-14">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-12 flex flex-col gap-5 border-b border-[var(--color-light-border)] pb-7 dark:border-[var(--color-night-border)] lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <p className="mb-3 text-[11px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)] dark:text-blue-300">
                {dict?.nav?.experience || (isEn ? "Experience" : "Expérience")}
              </p>
              <h2 className="font-heading text-4xl font-black uppercase tracking-[-0.06em] text-[var(--color-light-text-primary)] dark:text-[var(--color-night-text-primary)] sm:text-5xl">
                {dict?.sections?.exp_title_accent || (isEn ? "Track record" : "Parcours")}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[var(--color-light-text-secondary)] dark:text-[var(--color-night-text-secondary)]">
              {dict?.sections?.exp_subtitle ||
                (isEn
                  ? "Every mission, a new piece of the puzzle."
                  : "Chaque mission, une nouvelle pièce du puzzle.")}
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-[7px] top-0 hidden h-full w-px bg-[var(--color-light-border)] dark:bg-[var(--color-night-border)] sm:block lg:left-[11px]" />

            <div className="space-y-0">
              {experiences.map((exp, index) => {
                const startMonth = new Date(exp.startDate).toLocaleDateString(
                  isEn ? "en-US" : "fr-FR",
                  { month: "short" }
                );
                const startYear = new Date(exp.startDate).getFullYear();
                const endYear = exp.endDate ? new Date(exp.endDate).getFullYear() : null;
                const endMonth = exp.endDate
                  ? new Date(exp.endDate).toLocaleDateString(isEn ? "en-US" : "fr-FR", { month: "short" })
                  : null;

                const periodStart = `${startMonth} ${startYear}`;
                const periodEnd = endYear ? `${endMonth} ${endYear}` : isEn ? "Present" : "Présent";
                const duration = formatExperienceDuration(exp.startDate, exp.endDate, isEn);

                const description = isEn && exp.description_en ? exp.description_en : exp.description;
                const lines = splitExperienceText(description);
                const intro = lines.find((line) => !line.startsWith("-")) ?? lines[0];
                const bullets = lines
                  .filter((line) => line.startsWith("-"))
                  .map((line) => line.replace(/^-+\s*/, ""));

                const isLast = index === experiences.length - 1;

                return (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55, ease: easePremium, delay: index * 0.06 }}
                    className={`relative flex gap-5 sm:gap-8 lg:gap-10 ${!isLast ? "pb-8 sm:pb-10" : ""}`}
                  >
                    {/* Dot timeline */}
                    <div className="relative hidden flex-shrink-0 sm:flex sm:flex-col sm:items-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, ease: easePremium, delay: index * 0.06 + 0.1 }}
                        className="relative z-10 mt-[3px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-light-bg)] dark:bg-[var(--color-night-bg)] lg:h-5 lg:w-5"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] dark:bg-blue-300 lg:h-2 lg:w-2" />
                      </motion.div>
                    </div>

                    {/* Card */}
                    <motion.article
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.22 }}
                      className="premium-card min-w-0 flex-1 rounded-[24px] p-5 sm:p-6"
                    >
                      {/* Header */}
                      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <h3 className="font-heading text-xl font-black uppercase tracking-[-0.05em] text-[var(--color-light-text-primary)] dark:text-[var(--color-night-text-primary)] sm:text-2xl">
                            {isEn && exp.role_en ? exp.role_en : exp.role}
                          </h3>
                          <p className="mt-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[var(--color-light-text-secondary)] dark:text-[var(--color-night-text-secondary)]">
                            {exp.company}
                          </p>
                        </div>

                        {/* Période + durée */}
                        <div className="flex flex-row items-center gap-2 sm:flex-col sm:items-end sm:gap-2">
                          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)] dark:text-blue-300">
                            {periodStart}
                          </p>
                          <span className="text-[var(--color-light-border)] dark:text-[var(--color-night-border)] sm:hidden">→</span>
                          <p className="text-[11px] font-semibold text-[var(--color-light-text-secondary)] dark:text-[var(--color-night-text-secondary)] sm:text-right">
                            {periodEnd}
                          </p>
                          <span className="premium-pill rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-[var(--color-light-text-secondary)] dark:text-[var(--color-night-text-secondary)]">
                            {duration}
                          </span>
                        </div>
                      </div>

                      <div className="h-px bg-[var(--color-light-border)] dark:bg-[var(--color-night-border)]" />

                      {/* Description */}
                      <div className="mt-5">
                        {intro && (
                          <p className="text-sm leading-7 text-[var(--color-light-text-secondary)] dark:text-[var(--color-night-text-secondary)]">
                            {intro.replace(/^-+\s*/, "")}
                          </p>
                        )}

                        {bullets.length > 0 ? (
                          <ul className="mt-4 grid gap-2.5">
                            {bullets.map((item) => (
                              <li key={item} className="flex gap-3 text-sm leading-7 text-[var(--color-light-text-secondary)] dark:text-[var(--color-night-text-secondary)]">
                                <span className="mt-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-accent)] dark:bg-blue-300" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          lines.length > 1 && (
                            <div className="mt-4 grid gap-3">
                              {lines.slice(1).map((paragraph) => (
                                <p key={paragraph} className="text-sm leading-7 text-[var(--color-light-text-secondary)] dark:text-[var(--color-night-text-secondary)]">
                                  {paragraph}
                                </p>
                              ))}
                            </div>
                          )
                        )}
                      </div>
                    </motion.article>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER / CONTACT ─── */}
      <footer
        id="contact"
        className="bg-[var(--color-night-bg)] px-4 pb-8 pt-16 text-[var(--color-night-text-primary)] sm:px-8 sm:pb-10 sm:pt-20 lg:px-14"
      >
        <section className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.62, ease: easePremium }}
            className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14"
          >
            <div>
              <p className="mb-3 text-[11px] font-black uppercase tracking-[0.22em] text-blue-300">
                {dict?.nav?.contact || (isEn ? "Contact" : "Contact")}
              </p>
              <h2 className="font-heading text-4xl font-black uppercase leading-[0.94] tracking-[-0.06em] text-[var(--color-night-text-primary)] sm:text-5xl">
                {isEn ? "Let's work together." : "Travaillons ensemble."}
              </h2>
              <p className="mt-5 max-w-lg text-sm leading-7 text-[var(--color-night-text-secondary)]">
                {dict?.contact?.copy ||
                  (isEn
                    ? "Got a project in mind? Write to me, let's talk."
                    : "Un projet en tête ? Écris-moi, on en parle.")}
              </p>

              <div className="mt-8 space-y-4 border-t border-[var(--color-night-border)] pt-6">
                <div>
                  <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-night-text-secondary)]">
                    Email
                  </p>
                  <a
                    href="mailto:maxdomyacoubou@gmail.com"
                    className="text-sm font-semibold text-[var(--color-night-text-primary)] transition-colors hover:text-blue-300"
                  >
                    maxdomyacoubou@gmail.com
                  </a>
                </div>

                <div>
                  <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-night-text-secondary)]">
                    {isEn ? "Location" : "Localisation"}
                  </p>
                  <p className="text-sm font-semibold text-[var(--color-night-text-primary)]">Cotonou, Bénin</p>
                </div>

                <div className="flex gap-3 pt-1">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-night-border)] text-[var(--color-night-text-secondary)] transition-all hover:border-blue-300 hover:text-blue-300"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="mb-6 border-b border-[var(--color-night-border)] pb-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-300">
                  {isEn ? "Contact me" : "Me contacter"}
                </p>
              </div>
              <ContactForm />
            </div>
          </motion.div>

          <div className="mt-12 flex flex-col gap-3 border-t border-[var(--color-night-border)] py-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-night-text-secondary)] sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="font-heading text-sm font-black tracking-[0.16em] text-[var(--color-night-text-primary)]">MY</span>
              <span>{dict?.contact?.footer_sub || "All rights reserved"} © {new Date().getFullYear()}</span>
            </div>
            <div>
              Cotonou •{" "}
              {new Date().toLocaleTimeString(isEn ? "en-US" : "fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </section>
      </footer>
    </main>
  );
}