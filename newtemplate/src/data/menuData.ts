export interface SubMenuItem {
  label: string;
  link: string;
}

export interface MenuItem {
  label: string;
  link?: string;
  subMenu?: SubMenuItem[];
}

export const menuData: MenuItem[] = [
  {
    label: "Home",
    subMenu: [
      { label: "Home One", link: "/" },
      { label: "Home Two", link: "/index-2" },
      { label: "Home Three", link: "/index-3" },
      { label: "Home Four", link: "/index-4" },
    ],
  },
  {
    label: "Pages",
    subMenu: [
      { label: "About Us", link: "/about" },
      { label: "Service", link: "/service" },
      { label: "Service Details", link: "/service-details" },
      { label: "Gallery", link: "/gallery" },
      { label: "Pricing", link: "/pricing" },
    ],
  },
  {
    label: "Room",
    subMenu: [
      { label: "Room", link: "/room" },
      { label: "Room Details", link: "/room-details" },
    ],
  },
  {
    label: "Blog",
    subMenu: [
      { label: "Blog", link: "/blog" },
      { label: "Blog Grid", link: "/blog-grid" },
      { label: "Blog Details", link: "/blog-details" },
    ],
  },
  {
    label: "Contact",
    link: "/contact",
  },
];
