import { GitHub, Instagram, LinkedIn, Mail } from "@/components/icons";

export const email = "contact@viincnt.com";

export const projects = [
  { id: "rustynail", name: "RustyNail", href: "https://github.com/viincnt/RustyNail" },
  { id: "singularity", name: "Singularity", href: "https://github.com/viincnt/Singularity" },
  { id: "deepslate", name: "Deepslate Studios", href: "https://deepslate.ch" },
] as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/viincnt", Icon: GitHub },
  { label: "Instagram", href: "https://www.instagram.com/https_viincent", Icon: Instagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/viincnt", Icon: LinkedIn },
  { label: "Email", href: `mailto:${email}`, Icon: Mail },
] as const;
