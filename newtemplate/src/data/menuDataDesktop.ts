export interface MegaHomeItem {
  title: string;
  link: string;
  image: string;
}

export interface SubMenuItem {
  label: string;
  link: string;
}

export interface DesktopMenuItem {
  label: string;
  type: "mega" | "submenu" | "link";
  link?: string;
  megaItems?: MegaHomeItem[];
  subMenu?: SubMenuItem[];
}

export const desktopMenuData: DesktopMenuItem[] = [
  {
    label: "Home",
    type: "mega",
    megaItems: [
      {
        title: "Home One",
        link: "/",
        image: "/assets/images/thumbs/home-img1.png",
      },
      {
        title: "Home Two",
        link: "/index-2",
        image: "/assets/images/thumbs/home-img2.png",
      },
      {
        title: "Home Three",
        link: "/index-3",
        image: "/assets/images/thumbs/home-img3.png",
      },
      {
        title: "Home Four",
        link: "/index-4",
        image: "/assets/images/thumbs/home-img4.png",
      },
    ],
  },
  {
    label: "Pages",
    type: "submenu",
    subMenu: [
      { label: "About Us", link: "/about" },
      { label: "Service", link: "/service" },
      { label: "Service Details", link: "/service-details" },
      { label: "Our Animations", link: "/animations" },
      { label: "Offers", link: "/offers" },
      { label: "Gallery", link: "/gallery" },
      { label: "Pricing", link: "/pricing" },
      { label: "Testimonial", link: "/testimonial" },
      { label: "Book An Appointment", link: "/appointment" },
    ],
  },
  {
    label: "Room",
    type: "submenu",
    subMenu: [
      { label: "Room", link: "/room" },
      { label: "Room Details", link: "/room-details" },
    ],
  },
  {
    label: "Destination",
    type: "submenu",
    subMenu: [
      { label: "Destination", link: "/destination" },
      { label: "Destination Details", link: "/destination-details" },
    ],
  },
  {
    label: "Blog",
    type: "submenu",
    subMenu: [
      { label: "Blog", link: "/blog" },
      { label: "Blog Grid", link: "/blog-grid" },
      { label: "Blog Details", link: "/blog-details" },
    ],
  },
  {
    label: "Contact",
    type: "link",
    link: "/contact",
  },
];
