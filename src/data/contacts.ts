import { MapPin } from "lucide-react";
import {
  WhatsappIcon,
  GmailIcon,
  GithubIcon,
  LinkedinIcon,
  KaggleIcon,
  InstagramIcon,
} from "@/components/icons/social-icons";

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
  icon: React.ComponentType<any>;
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
    icon: WhatsappIcon,
    gradient: "from-emerald-700/85 via-teal-700/85 to-emerald-800/85",
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
    icon: GmailIcon,
    gradient: "from-rose-700/85 via-red-700/85 to-rose-800/85",
    copyable: true,
    copyValue: "luthfiabd.14@gmail.com",
    primary: true,
  },
  {
    id: "github",
    label: "GitHub",
    handle: "MasterPandaa",
    href: "https://github.com/MasterPandaa",
    icon: GithubIcon,
    gradient: "from-slate-800/90 via-zinc-800/90 to-zinc-900/90",
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "luthfiabdl",
    href: "https://www.linkedin.com/in/luthfiabdl/",
    icon: LinkedinIcon,
    gradient: "from-sky-700/85 via-blue-700/85 to-indigo-800/85",
    external: true,
  },
  {
    id: "kaggle",
    label: "Kaggle",
    handle: "pandaa12",
    href: "https://www.kaggle.com/pandaa12",
    icon: KaggleIcon,
    gradient: "from-teal-700/85 via-cyan-700/85 to-teal-800/85",
    external: true,
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@luthfiabdl_",
    href: "https://instagram.com/luthfiabdl_",
    icon: InstagramIcon,
    gradient: "from-purple-700/85 via-pink-700/85 to-rose-800/85",
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
  gradient: "from-amber-700/85 via-orange-700/85 to-amber-800/85",
};
