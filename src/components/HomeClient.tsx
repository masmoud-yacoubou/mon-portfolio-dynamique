// src/components/HomeClient.tsx
// =============================================================================
// COMPOSANT CLIENT - Page d'accueil Portfolio
// Direction : Premium épuré — moins d'uppercase, responsive first
// =============================================================================

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Github, Linkedin, MessageCircle } from "lucide-react";
import type { Project, Skill, Experience } from "@prisma/client";
import ContactForm from "@/components/ContactForm";

// =============================================================================
// TYPES
// =============================================================================

interface Dictionary {
  hero?:     Record<string, string>;
  nav?:      Record<string, string>;
  sections?: Record<string, string>;
  projects?: Record<string, string>;
  contact?:  Record<string, string>;
}

interface HomeClientProps {
  projects:     Project[];
  skills:       Skill[];
  experiences:  Experience[];
  activeLocale: string;
  dict:         Dictionary;
}

// =============================================================================
// ANIMATIONS
// =============================================================================

const fadeInUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

// =============================================================================
// DONNÉES STATIQUES
// =============================================================================

const socialLinks = [
  { name: "Github",    href: "https://github.com/masmoud-yacoubou",          icon: <Github        size={18} /> },
  { name: "LinkedIn",  href: "https://www.linkedin.com/in/masmoud-yacoubou", icon: <Linkedin      size={18} /> },
  { name: "Whatsapp",  href: "https://wa.me/22969724172",                    icon: <MessageCircle size={18} /> },
];

// =============================================================================
// COMPOSANT PRINCIPAL
// =============================================================================

export default function HomeClient({
  projects,
  skills,
  experiences,
  activeLocale,
  dict,
}: HomeClientProps) {
  const isEn = activeLocale === "en";

  return (
    <main className="min-h-screen bg-white dark:bg-[#080808] text-black dark:text-white selection:bg-blue-600 selection:text-white">

      {/* ================================================================== */}
      {/* HERO                                                                */}
      {/* ================================================================== */}
      <section className="relative min-h-screen flex items-center px-5 sm:px-8 lg:px-16 pt-24 pb-16">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Texte */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1"
          >
            {/* Statut */}
            <motion.div variants={fadeInUp} className="flex items-center gap-2.5 mb-8">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
              </span>
              <span className="text-xs font-semibold text-blue-600 tracking-wide">
                {dict?.hero?.status}
              </span>
            </motion.div>

            {/* Titre */}
            <motion.h1
              variants={fadeInUp}
              className="font-montserrat text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-[1.05] tracking-tighter mb-6"
            >
              {dict?.hero?.title}
            </motion.h1>

            {/* Séparateur */}
            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6">
              <div className="h-px w-8 bg-blue-600 flex-shrink-0" />
              <span className="text-xs font-medium text-slate-400 dark:text-zinc-500 tracking-wide">
                {dict?.nav?.about ?? "Full-Stack Developer"}
              </span>
            </motion.div>

            {/* Sous-titre */}
            <motion.p
              variants={fadeInUp}
              className="text-sm sm:text-base text-slate-500 dark:text-zinc-400 max-w-lg mb-10 leading-relaxed"
            >
              {dict?.hero?.subtitle}
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4">
              <a
                href="#works"
                className="group relative inline-flex items-center gap-3 bg-blue-600 text-white px-7 py-3.5 text-xs font-bold tracking-wide overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out" />
                <span className="relative z-10">{dict?.hero?.cta}</span>
                <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300 text-sm">→</span>
              </a>
              <a
                href="#contact"
                className="text-xs font-semibold text-slate-400 dark:text-zinc-500 hover:text-blue-600 transition-colors border-b border-transparent hover:border-blue-600 pb-px"
              >
                {dict?.nav?.contact}
              </a>
            </motion.div>
          </motion.div>

          {/* Photo ronde */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative group">
              {/* Cercles rotatifs */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-5 border border-blue-600/20 rounded-full hidden sm:block"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2.5 border border-blue-600/10 rounded-full hidden sm:block"
              />

              {/* Photo */}
              <div className="w-52 h-52 sm:w-72 sm:h-72 lg:w-[340px] lg:h-[340px] rounded-full overflow-hidden border-[6px] sm:border-[10px] border-white dark:border-zinc-900 shadow-2xl relative z-10">
                <Image
                  src="/photo.png"
                  alt="Masmoud Yacoubou"
                  fill
                  className="object-cover scale-105 group-hover:scale-110 transition-transform duration-1000"
                  priority
                />
              </div>

              {/* Badge flottant */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 px-4 py-2.5 shadow-lg z-20"
              >
                <p className="text-[10px] font-bold text-blue-600 mb-0.5 tracking-wide">
                  {dict?.hero?.badge}
                </p>
                <p className="text-xs font-black">Cotonou, BJ</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <span className="text-[9px] font-medium text-slate-300 dark:text-zinc-700 tracking-widest uppercase">scroll</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-7 bg-gradient-to-b from-blue-600/60 to-transparent"
          />
        </motion.div>
      </section>

      {/* ================================================================== */}
      {/* PROJETS                                                             */}
      {/* ================================================================== */}
      <section id="works" className="py-24 sm:py-32 px-5 sm:px-8 lg:px-16 border-t border-slate-100 dark:border-zinc-900">
        <div className="max-w-6xl mx-auto">

          {/* En-tête */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
            <div>
              <p className="text-xs font-semibold text-blue-600 tracking-wide mb-3">
                {dict?.projects?.count_label}
              </p>
              <h2 className="font-montserrat text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none">
                {dict?.nav?.works}
              </h2>
            </div>
            <span className="font-montserrat text-6xl sm:text-8xl font-black text-slate-50 dark:text-zinc-900 leading-none select-none self-end">
              {(projects?.length ?? 0).toString().padStart(2, "0")}
            </span>
          </div>

          {/* Grille */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
            {projects?.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                {/* Image */}
                <Link href={`/${activeLocale}/project/${project.slug}`}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-50 dark:bg-zinc-900 mb-5">
                    <div className="absolute top-3 left-3 z-10 text-[10px] font-bold text-white/60 bg-black/30 backdrop-blur-sm px-2 py-0.5">
                      {(index + 1).toString().padStart(2, "0")}
                    </div>

                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-montserrat text-5xl font-black text-slate-200 dark:text-zinc-800 uppercase">
                          {project.title.charAt(0)}
                        </span>
                      </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-white text-black text-[10px] font-bold tracking-wide px-5 py-2.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        {dict?.projects?.view_project} →
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Infos */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {project.technologies?.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] text-slate-400 dark:text-zinc-600 border border-slate-200 dark:border-zinc-800 px-2 py-0.5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-montserrat text-lg sm:text-xl font-black uppercase tracking-tight group-hover:text-blue-600 transition-colors duration-300 truncate">
                      {isEn && project.title_en ? project.title_en : project.title}
                    </h3>
                  </div>

                  <Link
                    href={`/${activeLocale}/project/${project.slug}`}
                    className="flex-shrink-0 w-9 h-9 border border-slate-200 dark:border-zinc-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-300"
                  >
                    <span className="text-sm">↗</span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SKILLS                                                              */}
      {/* ================================================================== */}
      <section id="skills" className="py-24 sm:py-32 px-5 sm:px-8 lg:px-16 bg-[#080808] text-white">
        <div className="max-w-6xl mx-auto">

          {/* En-tête */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 pb-10 border-b border-white/5">
            <div>
              <p className="text-xs font-semibold text-blue-600 tracking-wide mb-3">
                {dict?.nav?.skills}
              </p>
              <h2 className="font-montserrat text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none">
                {dict?.sections?.skills_title_accent}
              </h2>
            </div>
            <p className="text-sm text-zinc-500 max-w-xs leading-relaxed lg:text-right">
              {dict?.sections?.skills_subtitle}
            </p>
          </div>

          {/* Grille */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]">
            {skills?.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04, duration: 0.5 }}
                className="group bg-[#080808] p-6 sm:p-8 hover:bg-white/[0.03] transition-colors duration-300"
              >
                {/* Nom + niveau */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5">
                    {skill.iconUrl && (
                      <div className="relative w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity flex-shrink-0">
                        <Image src={skill.iconUrl} alt={skill.name} fill className="object-contain" />
                      </div>
                    )}
                    <span className="text-sm font-semibold group-hover:text-blue-400 transition-colors">
                      {skill.name}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-blue-600 font-bold">
                    {skill.level}%
                  </span>
                </div>

                {/* Segments */}
                <div className="flex gap-1">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.04 + i * 0.03, duration: 0.25 }}
                      style={{ originY: 1 }}
                      className={`h-0.5 flex-1 ${
                        i < Math.round(skill.level / 10)
                          ? "bg-blue-600"
                          : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

{/* ================================================================== */}
{/* EXPÉRIENCES                                                         */}
{/* ================================================================== */}
<section id="experience" className="py-24 sm:py-32 px-5 sm:px-8 lg:px-16 border-t border-slate-100 dark:border-zinc-900">
  <div className="max-w-6xl mx-auto">

    {/* En-tête */}
    <div className="mb-16">
      <p className="text-xs font-semibold text-blue-600 tracking-wide mb-3">
        {dict?.nav?.experience}
      </p>
      <h2 className="font-montserrat text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none mb-3">
        {dict?.sections?.exp_title_accent}
      </h2>
      <p className="text-sm text-slate-400 dark:text-zinc-600">
        {dict?.sections?.exp_subtitle}
      </p>
    </div>

    {/* Timeline */}
    <div className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-100 dark:bg-zinc-900 hidden md:block" />

      <div className="divide-y divide-slate-100 dark:divide-zinc-900">
        {experiences?.map((exp, index) => {

          // ---- Formatage des dates ----
          const startYear  = new Date(exp.startDate).getFullYear();
          const startMonth = new Date(exp.startDate).toLocaleDateString(
            isEn ? "en-US" : "fr-FR",
            { month: "short" }
          );
          const endYear  = exp.endDate ? new Date(exp.endDate).getFullYear()  : null;
          const endMonth = exp.endDate
            ? new Date(exp.endDate).toLocaleDateString(
                isEn ? "en-US" : "fr-FR",
                { month: "short" }
              )
            : null;

          const periodStart = `${startMonth} ${startYear}`;
          const periodEnd   = endYear
            ? `${endMonth} ${endYear}`
            : (isEn ? "Present" : "Présent");

          // Durée approximative
          const endDate    = exp.endDate ? new Date(exp.endDate) : new Date();
          const startDate  = new Date(exp.startDate);
          const months     = (endDate.getFullYear() - startDate.getFullYear()) * 12
                           + (endDate.getMonth() - startDate.getMonth());
          const years      = Math.floor(months / 12);
          const remMonths  = months % 12;

          const duration = years > 0
            ? `${years} an${years > 1 ? "s" : ""}${remMonths > 0 ? ` ${remMonths} mois` : ""}`
            : `${months} mois`;

          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
              className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-10 md:pl-10 relative"
            >
              {/* Point timeline */}
              <div className="absolute left-[-3.5px] top-12 w-2 h-2 bg-white dark:bg-[#080808] border-2 border-blue-600 hidden md:block group-hover:bg-blue-600 transition-colors duration-300 rounded-full" />

              {/* Période */}
              <div className="md:col-span-3">
                <div className="inline-flex flex-col gap-1">
                  <span className="text-xs font-bold text-blue-600">
                    {periodStart}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-zinc-600">
                    → {periodEnd}
                  </span>
                  <span className="text-[10px] font-medium text-slate-300 dark:text-zinc-700 mt-1 border border-slate-100 dark:border-zinc-800 px-2 py-0.5 w-fit">
                    {duration}
                  </span>
                </div>
              </div>

              {/* Rôle + Entreprise + Description */}
              <div className="md:col-span-9 space-y-3">

                {/* Rôle */}
                <h3 className="font-montserrat text-lg sm:text-xl font-black uppercase tracking-tight group-hover:text-blue-600 transition-colors duration-300">
                  {isEn && exp.role_en ? exp.role_en : exp.role}
                </h3>

                {/* Entreprise */}
                <div className="flex items-center gap-2">
                  <div className="w-3 h-px bg-blue-600 flex-shrink-0" />
                  <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wide">
                    {exp.company}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed pt-1 border-t border-slate-50 dark:border-zinc-900">
                  {isEn && exp.description_en ? exp.description_en : exp.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </div>
</section>

      {/* ================================================================== */}
      {/* FOOTER / CONTACT                                                    */}
      {/* ================================================================== */}
      <footer id="contact" className="py-24 sm:py-32 px-5 sm:px-8 lg:px-16 bg-[#080808] text-white">
        <div className="max-w-6xl mx-auto">

          {/* Titre */}
          <div className="mb-16">
            <p className="text-xs font-semibold text-blue-600 tracking-wide mb-4">
              {dict?.nav?.contact}
            </p>
            <h2 className="font-montserrat text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
              {dict?.contact?.title}<span className="text-blue-600">.</span>
            </h2>
            <p className="text-sm text-zinc-500 max-w-md leading-relaxed">
              {dict?.contact?.copy}
            </p>
          </div>

          {/* Formulaire + Infos */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">

            {/* Formulaire */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* Infos */}
            <div className="lg:col-span-5 space-y-8">

              <div>
                <p className="text-[10px] font-semibold text-zinc-600 tracking-widest uppercase mb-2">
                  Email
                </p>
                <a
                  href="mailto:maxdomyacoubou@gmail.com"
                  className="text-base font-bold text-white hover:text-blue-400 transition-colors duration-300 break-all"
                >
                  maxdomyacoubou@gmail.com
                </a>
              </div>

              <div>
                <p className="text-[10px] font-semibold text-zinc-600 tracking-widest uppercase mb-2">
                  {isEn ? "Location" : "Localisation"}
                </p>
                <p className="text-base font-bold">Cotonou, Bénin 🇧🇯</p>
              </div>

              <div>
                <p className="text-[10px] font-semibold text-zinc-600 tracking-widest uppercase mb-2">
                  {isEn ? "Availability" : "Disponibilité"}
                </p>
                <div className="inline-flex items-center gap-2.5 text-xs font-semibold text-blue-400 border border-blue-600/20 px-4 py-2">
                  <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-600" />
                  </span>
                  {dict?.contact?.availability}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-semibold text-zinc-600 tracking-widest uppercase mb-3">
                  {isEn ? "Social" : "Réseaux"}
                </p>
                <div className="flex gap-2.5">
                  {socialLinks.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="w-9 h-9 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:border-blue-600 hover:text-blue-400 transition-all duration-300"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 border-t border-white/5">
            <div className="font-montserrat font-black text-base tracking-tighter uppercase flex items-center gap-1">
              M
              <span className="relative flex h-1.5 w-1.5 mx-0.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-600" />
              </span>
              Y
            </div>
            <p className="text-[10px] text-zinc-700 tracking-wide">
              {dict?.contact?.footer_sub} — © {new Date().getFullYear()}
            </p>
            <p className="text-[10px] text-zinc-700 tracking-wide">
              Cotonou — {new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>

        </div>
      </footer>
    </main>
  );
}