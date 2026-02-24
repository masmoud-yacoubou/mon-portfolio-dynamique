/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";

interface HomeClientProps {
  projects: any[];
  skills: any[];
  experiences: any[];
  activeLocale: string;
  dict: any;
}

// Animations optimisées (plus fluides sur mobile)
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  }
};
import { Github, Linkedin, MessageCircle } from "lucide-react";

const socialLinks = [
  { 
    name: 'Github', 
    href: 'https://github.com/masmoud-yacoubou', 
    icon: <Github size={20} /> 
  },
  { 
    name: 'LinkedIn', 
    href: 'https://www.linkedin.com/in/masmoud-yacoubou', // Lien corrigé ici
    icon: <Linkedin size={20} /> 
  },
  { 
    name: 'Whatsapp', 
    href: 'https://wa.me/22969724172', // Format international sans le '+' ni le '01' inutile
    icon: <MessageCircle size={20} /> 
  },
];

export default function HomeClient({ projects, skills, experiences, activeLocale, dict }: HomeClientProps) {
  const isEn = activeLocale === 'en';

  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] text-black dark:text-white font-poppins selection:bg-blue-600 selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center px-6 py-20 lg:py-0 lg:px-20">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 z-10 order-2 lg:order-1 text-center lg:text-left"
          >
            <motion.div variants={fadeInUp} className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <span className="w-8 h-[2px] bg-blue-600 hidden sm:block"></span>
              <span className="text-blue-600 font-bold tracking-[0.2em] uppercase text-[10px]">
                {dict?.hero?.status || "Available"} 
              </span>
            </motion.div>

            <motion.h1 
              variants={fadeInUp} 
              className="font-montserrat text-4xl sm:text-6xl lg:text-7xl font-black uppercase leading-[1.1] mb-6 tracking-tighter"
            >
              {dict?.hero?.title}
            </motion.h1>

            <motion.p 
              variants={fadeInUp} 
              className="text-sm sm:text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed font-medium"
            >
              {dict?.hero?.subtitle}
            </motion.p>

            <motion.div variants={fadeInUp}>
              <a href="#works" className="group relative inline-flex items-center gap-4 bg-blue-600 text-white px-8 py-4 font-montserrat font-bold uppercase tracking-widest text-[10px] overflow-hidden transition-all active:scale-95">
                <span className="relative z-10">{dict?.hero?.cta}</span>
                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative z-10 text-lg group-hover:rotate-45 transition-transform">→</span>
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="lg:col-span-5 relative flex justify-center order-1 lg:order-2"
          >
            <div className="relative group scale-90 sm:scale-100">
              {/* Cercles décoratifs (masqués sur très petits écrans pour alléger) */}
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute -inset-6 border-t border-blue-600/30 rounded-full hidden sm:block" />
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -inset-3 border-l border-blue-600/20 rounded-full hidden sm:block" />

              <div className="w-56 h-56 sm:w-80 sm:h-80 lg:w-[380px] lg:h-[380px] rounded-full overflow-hidden border-[8px] sm:border-[12px] border-slate-50 dark:border-zinc-900 shadow-2xl relative z-10">
                <Image 
                  src="/photo.png" 
                  alt="Profile" 
                  fill
                  className="object-cover scale-105 group-hover:scale-110 transition-transform duration-1000"
                  priority
                />
              </div>

              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 bg-white dark:bg-zinc-800 p-3 sm:p-4 shadow-xl border border-blue-600/10 z-20"
              >
                <div className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-blue-600">{dict?.hero?.badge}</div>
                <div className="text-[10px] sm:text-xs font-bold">BENIN</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="works" className="py-20 px-6 lg:px-20 max-w-7xl mx-auto border-t border-slate-100 dark:border-zinc-900">
        <div className="flex flex-col mb-12 sm:mb-16">
          <div className="flex justify-between items-end">
            <h2 className="font-montserrat text-3xl sm:text-5xl font-black uppercase tracking-tighter italic">
              {dict?.nav?.works}
            </h2>
            <span className="text-blue-600 font-bold text-xs tracking-widest hidden sm:block">
              [{projects?.length || 0}] {dict?.projects?.count_label}
            </span>
          </div>
          <p className="text-slate-400 text-[10px] sm:text-xs font-bold mt-4 uppercase tracking-widest">
            {dict?.sections?.projects_subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {projects?.map((project, index) => (
            <motion.div 
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-col h-full group"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-sm">
                {project.image && (
                  <Image
                    src={urlFor(project.image).url()}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>
              
              <div className="py-6 sm:py-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-blue-600 font-black text-sm italic">0{index + 1}.</span>
                  <div className="h-[1px] flex-1 bg-slate-100 dark:bg-zinc-800"></div>
                </div>

                <h3 className="font-montserrat text-lg sm:text-2xl font-black uppercase mb-3 tracking-tight group-hover:text-blue-600 transition-colors">
                  {isEn ? project.title_en : project.title}
                </h3>
                
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {isEn ? project.description_en : project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies?.slice(0, 3).map((tech: string) => (
                    <span key={tech} className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest border border-slate-200 dark:border-zinc-800 px-2 sm:px-3 py-1">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-4">
                  {project.link ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 hover:gap-4 transition-all">
                      {dict?.projects?.view_project || "View"}
                      <span>→</span>
                    </a>
                  ) : (
                    <span className="text-[9px] font-bold uppercase opacity-30 italic">
                      {dict?.projects?.confidential}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section id="skills" className="py-20 px-6 lg:px-20 bg-black text-white relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-4">
            <h2 className="font-montserrat text-3xl sm:text-4xl font-black uppercase tracking-tighter mb-6">
              {dict?.nav?.skills} <span className="text-blue-600 italic block sm:inline">{dict?.sections?.skills_title_accent}</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-md">
              {dict?.sections?.skills_subtitle}
            </p>
          </div>
          
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 sm:gap-y-10">
            {skills?.map((skill) => (
              <div key={skill._id} className="group">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    {skill.icon && (
                      <div className="relative w-5 h-5 grayscale brightness-200 opacity-70 group-hover:opacity-100 transition-opacity">
                        <Image src={urlFor(skill.icon).url()} alt={skill.name} fill className="object-contain" />
                      </div>
                    )}
                    <span className="font-montserrat text-sm font-black uppercase tracking-tight italic group-hover:text-blue-600 transition-colors">
                      {skill.name}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-blue-600 font-bold">{skill.level}%</span>
                </div>
                <div className="h-[2px] w-full bg-white/10 overflow-hidden">
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: (skill.level || 0) / 100 }}
                    transition={{ duration: 1, ease: "circOut" }}
                    style={{ originX: 0 }}
                    className="h-full bg-blue-600" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- EXPERIENCE SECTION --- */}
      <section id="experience" className="py-20 px-6 lg:px-20 max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-16">
          <h2 className="font-montserrat text-3xl sm:text-4xl font-black uppercase tracking-tighter italic">
            {dict?.nav?.experience} <span className="text-blue-600 italic">. {dict?.sections?.exp_title_accent}</span>
          </h2>
          <p className="text-slate-400 text-[10px] font-bold mt-4 uppercase tracking-widest">
            {dict?.sections?.exp_subtitle}
          </p>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-zinc-900">
          {experiences?.map((exp) => (
            <div 
              key={exp._id} 
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 group"
            >
              <div className="md:col-span-2 text-[10px] font-black text-blue-600 uppercase tracking-widest">
                {exp.startDate?.split('-')[0]} — {exp.endDate ? exp.endDate.split('-')[0] : 'PRES'}
              </div>
              <div className="md:col-span-4">
                <h3 className="font-montserrat text-lg sm:text-xl font-black uppercase leading-tight tracking-tighter mb-1 group-hover:text-blue-600 transition-colors">
                  {isEn ? exp.role_en : exp.role}
                </h3>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{exp.company}</span>
              </div>
              <div className="md:col-span-6 text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                {isEn ? exp.description_en : exp.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER SECTION --- */}
<footer id="contact" className="relative pt-32 pb-16 px-6 border-t border-slate-100 dark:border-zinc-900 bg-white dark:bg-[#050505] overflow-hidden">
  {/* Background Decor - Un subtil rappel de ta marque */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-[0.03] dark:opacity-[0.02] flex items-center justify-center">
    <span className="text-[20vw] font-black uppercase tracking-tighter leading-none select-none">
      Contact
    </span>
  </div>

  <div className="max-w-7xl mx-auto relative z-10">
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center mb-24"
    >
      <h2 className="font-montserrat text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
        {dict?.contact?.title} <span className="text-blue-600">.</span>
      </h2>
      
      <p className="text-slate-500 dark:text-zinc-500 text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em] mb-12 max-w-md mx-auto">
        {dict?.contact?.copy}
      </p>

      {/* Bouton Mail Magnétique */}
      <motion.a 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href="mailto:maxdomyacoubou@gmail.com" 
        className="group relative inline-flex flex-col items-center"
      >
        <div className="px-12 py-6 bg-blue-600 text-white font-montserrat font-black uppercase text-xs tracking-[0.3em] overflow-hidden shadow-2xl shadow-blue-600/20">
          <span className="relative z-10 flex items-center gap-3">
            {dict?.contact?.button}
            <span className="text-xl group-hover:translate-x-2 transition-transform duration-300">→</span>
          </span>
          <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </div>
      </motion.a>
    </motion.div>

    {/* Footer Bottom Bar */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-16 border-t border-slate-100 dark:border-zinc-900">
      
      {/* 1. Branding & Localisation */}
<div className="flex flex-col items-center md:items-start gap-2 group/brand">
  <div className="font-montserrat font-black text-2xl tracking-tighter uppercase dark:text-white mb-1 flex items-center">
    M
    <span className="relative flex h-2 w-2 mx-0.5 mt-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
    </span>
    Y
  </div>
  
  <div className="overflow-hidden">
    <motion.span 
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-[9px] sm:text-[10px] font-bold text-slate-400 dark:text-zinc-600 uppercase tracking-[0.2em] leading-relaxed block"
    >
      {dict?.contact?.footer_sub} <br />
      <span className="text-slate-300 dark:text-zinc-800 group-hover/brand:text-blue-600 transition-colors duration-500">
        &copy; 2026 — TOUS DROITS RÉSERVÉS
      </span>
    </motion.span>
  </div>
</div>

      {/* 2. Social Links */}
<div className="flex justify-center items-center gap-4 sm:gap-8">
  {socialLinks.map((social) => (
    <a 
      key={social.name}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.name}
      className="relative group p-4 text-slate-400 hover:text-blue-600 transition-all duration-500"
    >
      {/* Cercle d'arrière-plan animé */}
      <div className="absolute inset-0 scale-0 group-hover:scale-100 bg-blue-50 dark:bg-blue-600/10 rounded-full transition-transform duration-500 ease-out" />
      
      {/* L'icône avec un léger rebond au survol */}
      <div className="relative z-10 transform group-hover:-translate-y-1.5 transition-transform duration-300 ease-in-out">
        {social.icon}
      </div>

      {/* Label invisible qui apparaît au survol */}
      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[7px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-blue-600 whitespace-nowrap">
        {social.name}
      </span>
    </a>
  ))}
</div>

      {/* 3. Status & Time */}
      <div className="flex flex-col items-center md:items-end gap-3">
        <div className="text-blue-600 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest bg-blue-50 dark:bg-blue-600/5 px-4 py-2 rounded-full border border-blue-600/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          {dict?.contact?.availability}
        </div>
        <div className="text-[10px] font-bold text-slate-400 dark:text-zinc-600 uppercase tracking-widest">
          COTONOU, BJ — {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

    </div>
  </div>
</footer>
    </main>
  );
}