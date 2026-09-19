import {
  SiVercel,
  SiStripe,
  SiTailwindcss,
  SiSpotify,
  SiClaude,
  SiGithub,
  SiNeon,
  SiLinear,
  SiFigma,
  SiSupabase,
  SiDocker,
  SiReact,
  SiPostgresql,
  SiNotion,
  SiPrisma,
  SiCloudflare,
} from "@icons-pack/react-simple-icons";

// Used by the marquee variant (logo-cloud-two).
export const logos = [
  { name: "Vercel", Icon: SiVercel },
  { name: "Stripe", Icon: SiStripe },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "Spotify", Icon: SiSpotify },
  { name: "Claude", Icon: SiClaude },
  { name: "GitHub", Icon: SiGithub },
  { name: "Neon", Icon: SiNeon },
  { name: "Linear", Icon: SiLinear },
];

// Used by the rotating grid (logo-cloud) — each row draws from its own pool.
export const topLogos = logos;

export const bottomLogos = [
  { name: "Figma", Icon: SiFigma },
  { name: "Supabase", Icon: SiSupabase },
  { name: "Docker", Icon: SiDocker },
  { name: "React", Icon: SiReact },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "Notion", Icon: SiNotion },
  { name: "Prisma", Icon: SiPrisma },
  { name: "Cloudflare", Icon: SiCloudflare },
];
