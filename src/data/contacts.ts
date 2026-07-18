import {
  MessageCircle,
  Mail,
  Github,
  Linkedin,
  Instagram,
  BarChart3,
  MapPin,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ContactId =
  | "whatsapp"
  | "email"
  | "github"
  | "linkedin"
  | "kaggle"
  | "instagram"
  | "location";

export interface ContactItem {
  id: ContactId;
  label: string;
  handle: string;
  href: string;
  icon: LucideIcon;
  gradient: string;
  copyable?: boolean;
  copyValue?: string;
  external?: boolean;
  primary?: boolean;
}

export const contactItems: ContactItem[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    handle: "+62 895-6403-11157",
    href: "https://wa.me/62895640311157",
    icon: MessageCircle,
    gradient: "from-emerald-500 to-teal-600",
    copyable: true,
    copyValue: "+62895640311157",
    external: true,
    primary: true,
  },
  {
    id: "email",
    label: "Email",
    handle: "luthfiabd.14@gmail.com",
    href: "mailto:luthfiabd.14@gmail.com",
    icon: Mail,
    gradient: "from-navy to-navy-deep",
    copyable: true,
    copyValue: "luthfiabd.14@gmail.com",
    primary: true,
  },
  {
    id: "github",
    label: "GitHub",
    handle: "MasterPandaa",
    href: "https://github.com/MasterPandaa",
    icon: Github,
    gradient: "from-zinc-700 to-zinc-900",
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "luthfiabdl",
    href: "https://www.linkedin.com/in/luthfiabdl/",
    icon: Linkedin,
    gradient: "from-sky-600 to-blue-700",
    external: true,
  },
  {
    id: "kaggle",
    label: "Kaggle",
    handle: "pandaa12",
    href: "https://www.kaggle.com/pandaa12",
    icon: BarChart3,
    gradient: "from-cyan-500 to-teal-600",
    external: true,
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@luthfiabdl_",
    href: "https://instagram.com/luthfiabdl_",
    icon: Instagram,
    gradient: "from-pink-500 via-rose-500 to-amber-500",
    external: true,
  },
];

export const locationContact = {
  icon: MapPin,
  labelId: "Lokasi",
  labelEn: "Location",
  value: "Sleman, Yogyakarta",
  countryId: "Indonesia",
  countryEn: "Indonesia",
  gradient: "from-amber-500 to-orange-600",
};
