'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaArrowRight, FaArrowUpRightFromSquare, FaChevronLeft, FaChevronRight, FaCode, FaXmark } from 'react-icons/fa6';
import { skillsImage } from '@/utils/skill-image';
import { projectsData } from '@/utils/data/projects-data';

function ProjectModal({ project, onClose }) {
  const [imageIndex, setImageIndex] = useState(0);
  const images = project.images?.length ? project.images : ['/projects/real-estate-ai.svg'];

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') setImageIndex((index) => (index + 1) % images.length);
      if (event.key === 'ArrowLeft') setImageIndex((index) => (index - 1 + images.length) % images.length);
    };
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [images.length, onClose]);

  return (
    <div className="project-modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-5" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section role="dialog" aria-modal="true" aria-labelledby="project-modal-title" className="project-modal relative max-h-[96vh] w-full max-w-6xl overflow-y-auto rounded-[1.5rem] border border-white/10 bg-[#0e1328] shadow-2xl shadow-black/60 sm:rounded-[2rem]">
        <button type="button" onClick={onClose} aria-label="Close project details" className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-[#10152c]/75 text-white backdrop-blur-xl transition duration-300 hover:rotate-90 hover:border-white/50 hover:bg-violet-600"><FaXmark /></button>

        <div className="project-gallery relative flex min-h-[17rem] items-center justify-center overflow-hidden sm:min-h-[26rem] lg:min-h-[34rem]">
          <div className="project-gallery-glow project-gallery-glow-one" />
          <div className="project-gallery-glow project-gallery-glow-two" />

          <a href={images[imageIndex]} target="_blank" rel="noreferrer">
            <Image key={images[imageIndex]} src={images[imageIndex]} alt={`${project.name} preview ${imageIndex + 1}`} fill priority className="project-gallery-image object-contain p-4 sm:p-8 lg:p-10" sizes="(max-width: 1024px) 100vw, 1100px" />
          </a>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#0e1328]/30" />
          <div className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-[#0e1328]/55 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-md sm:bottom-6 sm:left-6">Project preview <span className="ml-2 text-[#b5f5e8]">{String(imageIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span></div>
          {images.length > 1 && <>
            <button type="button" onClick={() => setImageIndex((imageIndex - 1 + images.length) % images.length)} aria-label="Previous image" className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-[#111629]/60 text-white backdrop-blur transition hover:scale-105 hover:bg-violet-600 sm:left-6 sm:h-12 sm:w-12"><FaChevronLeft /></button>
            <button type="button" onClick={() => setImageIndex((imageIndex + 1) % images.length)} aria-label="Next image" className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-[#111629]/60 text-white backdrop-blur transition hover:scale-105 hover:bg-violet-600 sm:right-6 sm:h-12 sm:w-12"><FaChevronRight /></button>
            <div className="absolute bottom-4 left-1/2 flex max-w-[55%] -translate-x-1/2 gap-1.5 overflow-x-auto rounded-full border border-white/10 bg-[#0e1328]/60 p-1.5 backdrop-blur-md sm:bottom-6">{images.map((image, index) => <button key={`${image}-${index}`} type="button" aria-label={`Show image ${index + 1}`} aria-pressed={index === imageIndex} onClick={() => setImageIndex(index)} className={`h-1.5 shrink-0 rounded-full transition-all ${index === imageIndex ? 'w-7 bg-[#68f4d1]' : 'w-1.5 bg-white/60 hover:bg-white'}`} />)}</div>
          </>}
        </div>

        <div className="grid gap-7 px-5 pb-7 pt-6 sm:px-8 sm:pb-9 lg:grid-cols-[1fr_17rem] lg:gap-12 lg:px-12 lg:pb-12 lg:pt-9">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-3"><span className="rounded-full border border-[#7cf5d3]/20 bg-[#7cf5d3]/[0.08] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#91f8dc]">{project.type}</span><span className="text-xs text-slate-500">Selected project · {String(project.id).padStart(2, '0')}</span></div>
            <h2 id="project-modal-title" className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">{project.name}</h2>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">{project.description}</p>
            <h3 className="mb-3 mt-7 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">Built with</h3>
            <div className="flex flex-wrap gap-2">{project.tools.map((tool) => {
              const icon = skillsImage(tool);
              return <span key={tool} className="inline-flex items-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.035] px-3 py-2 text-xs text-slate-200 sm:text-sm">{icon ? <Image src={icon} alt="" width={20} height={20} className="h-5 w-5 object-contain" /> : <FaCode aria-hidden="true" className="text-[#65eac8]" />}{tool}</span>;
            })}</div>
          </div>
          <aside className="flex flex-col gap-3 lg:pt-1">
            <div className="rounded-2xl border border-white/[0.09] bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-5"><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">My role</p><p className="mt-2 text-lg font-semibold text-white">{project.role}</p></div>
            <div className="rounded-2xl border border-white/[0.09] bg-white/[0.025] p-5"><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Project type</p><p className="mt-2 text-sm leading-6 text-slate-200">{project.type}</p></div>
            {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:-translate-y-0.5 hover:shadow-violet-900/40">Explore live project <FaArrowUpRightFromSquare className="text-xs" /></a>}
            {project.code && <a href={project.code} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.025] px-4 py-3 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/[0.07]">View source code <FaArrowUpRightFromSquare className="text-xs" /></a>}
          </aside>
        </div>
      </section>
    </div>
  );
}

function ProjectCard({ project, index, onSelect }) {
  const isFeatured = index === 0;
  const image = project.images?.[0] || '/projects/real-estate-ai.svg';

  return (
    <button type="button" data-motion="rise" style={{ '--motion-delay': `${index * 100}ms` }} onClick={onSelect} aria-label={`View details for ${project.name}`} className={`project-card group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71f3d0] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0d1224] ${isFeatured ? 'project-card-featured sm:col-span-2 xl:col-span-3' : ''}`}>
      <div className="project-card-shell">
        <div className="project-art relative flex items-center justify-center overflow-hidden">
          <div className="project-art-orb project-art-orb-a" />
          <div className="project-art-orb project-art-orb-b" />
          <span className="project-art-grid" />
          <Image src={image} alt={`${project.name} project artwork`} fill className="project-art-image object-contain p-4 sm:p-5" sizes={isFeatured ? '(max-width: 640px) 100vw, 66vw' : '(max-width: 640px) 100vw, 33vw'} />
          <span className="project-art-number">{String(index + 1).padStart(2, '0')}</span>
          <span className="project-art-open" aria-hidden="true"><FaArrowRight /></span>
        </div>
        <div className="project-card-copy">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="project-type-pill">{project.type}</span>
            <span className="project-card-role">{project.role}</span>
          </div>
          <h3 className="project-card-title">{project.name}</h3>
          <p className="project-card-description">{project.description}</p>
          <div className="mt-auto flex items-end justify-between gap-4 pt-5">
            <div className="flex flex-wrap gap-2">{project.tools.slice(0, isFeatured ? 5 : 3).map((tool) => <span key={tool} className="project-tool-chip">{tool}</span>)}{project.tools.length > (isFeatured ? 5 : 3) && <span className="project-tool-chip">+{project.tools.length - (isFeatured ? 5 : 3)}</span>}</div>
            <span className="project-details-link">Explore <FaArrowRight aria-hidden="true" /></span>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="projects-section relative z-10 my-24 scroll-mt-20 lg:my-36">
      <div className="projects-heading relative mb-7 overflow-hidden rounded-[2rem] px-6 py-8 sm:mb-9 sm:px-10 sm:py-10 lg:px-14 lg:py-12" data-motion="rise">
        <div className="projects-heading-orb" />
        <div className="relative flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#79f3d1]"><span className="h-px w-7 bg-[#79f3d1]" />Selected work / 2022 - 2025</p><h2 className="max-w-3xl text-4xl font-bold leading-[1.04] tracking-[-0.045em] text-white sm:text-5xl lg:text-7xl">A few things<br className="hidden sm:block" /> I&apos;ve <span className="projects-heading-highlight">brought to life.</span></h2><p className="mt-5 max-w-xl text-sm leading-7 text-slate-300/75 sm:text-base">Digital products, ambitious ideas, and visual identities crafted with care from first sketch to final detail.</p></div>
          <div className="projects-count"><span>{String(projectsData.length).padStart(2, '0')}</span><span className="projects-count-caption">Selected<br />projects</span></div>
        </div>
        <div className="projects-heading-foot"><span>Scroll to explore</span><span className="projects-heading-line" /><span>01 — {String(projectsData.length).padStart(2, '0')}</span></div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
        {projectsData.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onSelect={() => setSelectedProject(project)} />)}
      </div>
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
}
