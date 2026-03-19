// src/components/HomeClient.tsx
// =============================================================================
// COMPOSANT CLIENT - Page d'accueil Portfolio
// Direction : Studio / Agence — sophistiqué, détails fins
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
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

// =============================================================================
// DONNÉES STATIQUES
// =============================================================================

const socialLinks = [
  { name: "Github",   href: "https://github.com/masmoud-yacoubou",          icon: <Github        size={18} /> },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/masmoud-yacoubou", icon: <Linkedin      size={18} /> },
  { name: "Whatsapp", href: "https://wa.me/22969724172",                    icon: <MessageCircle size={18} /> },
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
    <main className="min-h-screen bg-white dark:bg-[#060606] text-black dark:text-white selection:bg-blue-600 selection:text-white">

      {/* ================================================================== */}
      {/* HERO                                                                */}
      {/* ================================================================== */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 lg:px-20 pt-28 pb-20">

        {/* Ligne décorative verticale gauche */}
        <div className="absolute left-6 lg:left-20 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-blue-600/20 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Texte */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 order-2 lg:order-1 text-center lg:text-left"
          >
            {/* Badge disponibilité */}
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-3 mb-10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
                {dict?.hero?.status}
              </span>
            </motion.div>

            {/* Titre principal */}
            <motion.h1
              variants={fadeInUp}
              className="font-montserrat text-5xl sm:text-7xl lg:text-[5.5rem] font-black uppercase leading-[1.0] tracking-tighter mb-8"
            >
              {dict?.hero?.title}
            </motion.h1>

            {/* Ligne séparatrice */}
            <motion.div variants={fadeInUp} className="flex items-center justify-center lg:justify-start gap-6 mb-8">
              <div className="h-[1px] w-12 bg-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-zinc-500">
                {dict?.nav?.about ?? "Full-Stack Developer"}
              </span>
            </motion.div>

            {/* Sous-titre */}
            <motion.p
              variants={fadeInUp}
              className="text-base text-slate-500 dark:text-zinc-400 max-w-md mx-auto lg:mx-0 mb-12 leading-relaxed font-medium"
            >
              {dict?.hero?.subtitle}
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeInUp} className="flex items-center justify-center lg:justify-start gap-6 flex-wrap">
              <a
                href="#works"
                className="group relative inline-flex items-center gap-4 bg-blue-600 text-white px-8 py-4 font-montserrat font-black uppercase tracking-widest text-[10px] overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10">{dict?.hero?.cta}</span>
                <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
              <a
                href="#contact"
                className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500 hover:text-blue-600 dark:hover:text-blue-500 transition-colors border-b border-transparent hover:border-blue-600 pb-0.5"
              >
                {dict?.nav?.contact}
              </a>
            </motion.div>
          </motion.div>

          {/* Photo — style rond */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="lg:col-span-5 order-1 lg:order-2 flex justify-center"
          >
            <div className="relative group scale-90 sm:scale-100">

              {/* Cercles décoratifs rotatifs */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-6 border-t border-blue-600/30 rounded-full hidden sm:block"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 border-l border-blue-600/20 rounded-full hidden sm:block"
              />

              {/* Photo ronde */}
              <div className="w-56 h-56 sm:w-80 sm:h-80 lg:w-[380px] lg:h-[380px] rounded-full overflow-hidden border-[8px] sm:border-[12px] border-slate-50 dark:border-zinc-900 shadow-2xl relative z-10">
                <Image
                  src="/photo.png"
                  alt="Masmoud Yacoubou"
                  fill
                  className="object-cover scale-105 group-hover:scale-110 transition-transform duration-1000"
                  priority
                />
              </div>

              {/* Badge localisation flottant */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 px-4 py-3 shadow-xl z-20"
              >
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-600 mb-0.5">
                  {dict?.hero?.badge}
                </div>
                <div className="text-[10px] font-black uppercase tracking-wider">Cotonou, BJ</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-300 dark:text-zinc-700">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-[1px] h-8 bg-gradient-to-b from-blue-600 to-transparent"
          />
        </motion.div>
      </section>

      {/* ================================================================== */}
      {/* PROJETS                                                             */}
      {/* ================================================================== */}
      <section id="works" className="py-32 px-6 lg:px-20 border-t border-slate-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto">

          {/* En-tête section */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-20">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
                — {dict?.projects?.count_label}
              </p>
              <h2 className="font-montserrat text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-none">
                {dict?.nav?.works}
              </h2>
            </div>
            <div className="font-montserrat text-[80px] sm:text-[100px] font-black text-slate-50 dark:text-zinc-900 leading-none select-none">
              {(projects?.length ?? 0).toString().padStart(2, "0")}
            </div>
          </div>

          {/* Grille projets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
            {projects?.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                {/* Image */}
                <Link href={`/${activeLocale}/project/${project.slug}`}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-50 dark:bg-zinc-900 mb-8">

                    {/* Numéro */}
                    <div className="absolute top-4 left-4 z-10 font-montserrat text-[10px] font-black text-white/70 bg-black/40 backdrop-blur-sm px-2 py-1">
                      {(index + 1).toString().padStart(2, "0")}
                    </div>

                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-montserrat text-6xl font-black text-slate-200 dark:text-zinc-800 uppercase">
                          {project.title.charAt(0)}
                        </span>
                      </div>
                    )}

                    {/* Overlay hover */}
                    <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-all duration-500" />

                    {/* Bouton centré au hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="bg-white dark:bg-black text-black dark:text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        {dict?.projects?.view_project} →
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Infos */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies?.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-[8px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-600 border border-slate-200 dark:border-zinc-800 px-2 py-1"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Titre */}
                    <h3 className="font-montserrat text-xl sm:text-2xl font-black uppercase tracking-tight group-hover:text-blue-600 transition-colors duration-300 truncate">
                      {isEn && project.title_en ? project.title_en : project.title}
                    </h3>
                  </div>

                  {/* Flèche */}
                  <Link
                    href={`/${activeLocale}/project/${project.slug}`}
                    className="flex-shrink-0 w-10 h-10 border border-slate-200 dark:border-zinc-800 flex items-center justify-center text-slate-400 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
                  >
                    <span className="text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform inline-block">↗</span>
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
      <section id="skills" className="py-32 px-6 lg:px-20 bg-[#060606] text-white">
        <div className="max-w-7xl mx-auto">

          {/* En-tête */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20 border-b border-white/5 pb-12">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
                — {dict?.nav?.skills}
              </p>
              <h2 className="font-montserrat text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-none">
                {dict?.sections?.skills_title_accent}
              </h2>
            </div>
            <p className="text-sm text-zinc-500 max-w-sm leading-relaxed font-medium lg:text-right">
              {dict?.sections?.skills_subtitle}
            </p>
          </div>

          {/* Grille skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {skills?.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="group bg-[#060606] p-8 hover:bg-white/[0.03] transition-colors duration-300"
              >
                {/* Header skill */}
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-3">
                    {skill.iconUrl && (
                      <div className="relative w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity">
                        <Image src={skill.iconUrl} alt={skill.name} fill className="object-contain" />
                      </div>
                    )}
                    <span className="font-montserrat text-sm font-black uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                      {skill.name}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-blue-600 font-bold tabular-nums">
                    {skill.level}%
                  </span>
                </div>

                {/* Barre de progression — segments animés */}
                <div className="flex gap-1">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 + i * 0.04, duration: 0.3 }}
                      style={{ originY: 1 }}
                      className={`h-1 flex-1 transition-colors duration-300 ${
                        i < Math.round(skill.level / 10)
                          ? "bg-blue-600 group-hover:bg-blue-500"
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
      <section id="experience" className="py-32 px-6 lg:px-20 border-t border-slate-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto">

          {/* En-tête */}
          <div className="mb-20">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
              — {dict?.nav?.experience}
            </p>
            <h2 className="font-montserrat text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-none">
              {dict?.sections?.exp_title_accent}
            </h2>
            <p className="text-slate-400 text-[10px] font-bold mt-4 uppercase tracking-[0.4em]">
              {dict?.sections?.exp_subtitle}
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Ligne verticale */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-slate-100 dark:bg-zinc-900 hidden md:block" />

            <div className="divide-y divide-slate-100 dark:divide-zinc-900">
              {experiences?.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-6 py-12 md:pl-12 relative"
                >
                  {/* Point timeline */}
                  <div className="absolute left-[-4px] top-14 w-2 h-2 bg-white dark:bg-[#060606] border-2 border-blue-600 hidden md:block group-hover:bg-blue-600 transition-colors duration-300" />

                  {/* Période */}
                  <div className="md:col-span-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
                      {new Date(exp.startDate).getFullYear()}
                    </span>
                    <div className="text-[10px] font-black text-slate-300 dark:text-zinc-700 uppercase tracking-widest">
                      — {exp.endDate
                          ? new Date(exp.endDate).getFullYear()
                          : (isEn ? "Present" : "Présent")}
                    </div>
                  </div>

                  {/* Rôle + Entreprise */}
                  <div className="md:col-span-4">
                    <h3 className="font-montserrat text-xl font-black uppercase tracking-tight mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {isEn && exp.role_en ? exp.role_en : exp.role}
                    </h3>
                    <div className="inline-flex items-center gap-2">
                      <div className="w-3 h-[1px] bg-blue-600" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500">
                        {exp.company}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-6 text-sm text-slate-500 dark:text-zinc-400 leading-relaxed font-medium">
                    {isEn && exp.description_en ? exp.description_en : exp.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* FOOTER / CONTACT                                                    */}
      {/* ================================================================== */}
      <footer id="contact" className="py-32 px-6 lg:px-20 bg-[#060606] text-white">
        <div className="max-w-7xl mx-auto">

          {/* Titre */}
          <div className="mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-6">
              — {dict?.nav?.contact}
            </p>
            <h2 className="font-montserrat text-6xl sm:text-8xl lg:text-[9rem] font-black uppercase tracking-tighter leading-[0.85]">
              {dict?.contact?.title}
              <span className="text-blue-600">.</span>
            </h2>
            <p className="text-zinc-500 text-sm font-medium max-w-md mt-8">
              {dict?.contact?.copy}
            </p>
          </div>

          {/* Grid : Formulaire + Infos */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">

            {/* Formulaire */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* Infos contact */}
            <div className="lg:col-span-5 space-y-10">

              {/* Email */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-3">
                  Email
                </p>
                <a
                  href="mailto:maxdomyacoubou@gmail.com"
                  className="text-lg font-black text-white hover:text-blue-400 transition-colors duration-300 break-all"
                >
                  maxdomyacoubou@gmail.com
                </a>
              </div>

              {/* Localisation */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-3">
                  {isEn ? "Location" : "Localisation"}
                </p>
                <p className="text-lg font-black">Cotonou, Bénin 🇧🇯</p>
              </div>

              {/* Disponibilité */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-3">
                  {isEn ? "Availability" : "Disponibilité"}
                </p>
                <div className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-blue-400 border border-blue-600/20 px-4 py-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
                  </span>
                  {dict?.contact?.availability}
                </div>
              </div>

              {/* Réseaux */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-4">
                  {isEn ? "Social" : "Réseaux"}
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="w-10 h-10 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:border-blue-600 hover:text-blue-400 transition-all duration-300"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
            <div className="font-montserrat font-black text-lg tracking-tighter uppercase flex items-center gap-1">
              M
              <span className="relative flex h-1.5 w-1.5 mx-0.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-600" />
              </span>
              Y
            </div>
            <p className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest">
              {dict?.contact?.footer_sub} — &copy; {new Date().getFullYear()}
            </p>
            <p className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest">
              Cotonou — {new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>

        </div>
      </footer>
    </main>
  );
}