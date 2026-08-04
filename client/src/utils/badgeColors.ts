/**
 * Creative & Vibrant Liquid Glass Badge Color Utilities
 * Returns tech-tailored glassmorphism badge styles with subtle neon glows.
 */

export function getBadgeStyle(tech: string): string {
  if (!tech) return 'bg-blue-500/15 text-blue-600 dark:text-blue-300 border-blue-400/30';
  const name = tech.toLowerCase().trim();

  // React / Next.js / Frontend Frameworks
  if (name.includes('react') || name.includes('redux') || name.includes('next') || name.includes('vite')) {
    return 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-400/40 shadow-[0_0_10px_rgba(6,182,212,0.18)]';
  }
  // Node.js / Express / Backend
  if (name.includes('node') || name.includes('express') || name.includes('rest') || name.includes('backend') || name.includes('api')) {
    return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-400/40 shadow-[0_0_10px_rgba(16,185,129,0.18)]';
  }
  // Databases (MongoDB, SQL, Postgres, Redis)
  if (name.includes('mongo') || name.includes('data') || name.includes('sql') || name.includes('postgres') || name.includes('redis')) {
    return 'bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-400/40 shadow-[0_0_10px_rgba(20,184,166,0.18)]';
  }
  // AWS / Cloud Platforms
  if (name.includes('aws') || name.includes('cloud') || name.includes('azure') || name.includes('gcp') || name.includes('server')) {
    return 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-400/40 shadow-[0_0_10px_rgba(245,158,11,0.18)]';
  }
  // Docker / Linux / DevOps / Bash
  if (name.includes('docker') || name.includes('kube') || name.includes('linux') || name.includes('bash') || name.includes('shell') || name.includes('cicd')) {
    return 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-400/40 shadow-[0_0_10px_rgba(14,165,233,0.18)]';
  }
  // Python / Automation / Scripts
  if (name.includes('python') || name.includes('auto') || name.includes('script') || name.includes('cron')) {
    return 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-400/40 shadow-[0_0_10px_rgba(59,130,246,0.18)]';
  }
  // Security / VAPT / OWASP
  if (name.includes('security') || name.includes('vapt') || name.includes('owasp') || name.includes('lock') || name.includes('ip') || name.includes('principle')) {
    return 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-400/40 shadow-[0_0_10px_rgba(244,63,94,0.18)]';
  }
  // Networking / Cisco / VLAN / OSPF
  if (name.includes('cisco') || name.includes('vlan') || name.includes('ospf') || name.includes('net') || name.includes('packet')) {
    return 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-400/40 shadow-[0_0_10px_rgba(168,85,247,0.18)]';
  }
  // Languages (JavaScript, TypeScript, Java, C++)
  if (name.includes('js') || name.includes('javascript') || name.includes('ts') || name.includes('typescript') || name.includes('java')) {
    return 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-400/40 shadow-[0_0_10px_rgba(99,102,241,0.18)]';
  }
  // Styling & UI (Tailwind, CSS, HTML, UI)
  if (name.includes('tailwind') || name.includes('css') || name.includes('html') || name.includes('style') || name.includes('ui')) {
    return 'bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-400/40 shadow-[0_0_10px_rgba(139,92,246,0.18)]';
  }

  // Deterministic Hash Fallback for any custom tag
  const fallbackStyles = [
    'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-400/40',
    'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-400/40',
    'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-400/40',
    'bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-400/40',
    'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-400/40',
    'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-400/40',
    'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-400/40',
    'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-400/40'
  ];

  let hash = 0;
  for (let i = 0; i < tech.length; i++) {
    hash = tech.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % fallbackStyles.length;
  return fallbackStyles[index];
}
