export interface AboutMenuItem {
  id: "overview" | "awards" | "directors";
  number: string;
  title: string;
  description: string;
  iconName: "Building2" | "Trophy" | "Users";
  href: string;
}

export const ABOUT_NAV_HEADER = {
  title: "ABOUT EMPRISE",
  subtitle: "Explore our story, recognition and leadership.",
};

export const ABOUT_MENU_ITEMS: AboutMenuItem[] = [
  {
    id: "overview",
    number: "01",
    title: "Brief About Emprise",
    description: "Our journey, academic philosophy and institutional identity.",
    iconName: "Building2",
    href: "/about",
  },
  {
    id: "awards",
    number: "02",
    title: "Awards & Accolades",
    description: "Recognition that reflects Emprise's academic journey.",
    iconName: "Trophy",
    href: "/about/awards",
  },
  {
    id: "directors",
    number: "03",
    title: "Directors",
    description: "Meet the academic leadership behind Emprise.",
    iconName: "Users",
    href: "/about/directors",
  },
];
