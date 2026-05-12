"use client";
import { FC, useEffect, useState } from "react";
import { menuData } from "@/data/menuData";
import { desktopMenuData } from "@/data/menuDataDesktop";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderThree: FC = () => {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [scroll, setScroll] = useState<boolean>(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset < 150) {
        setScroll(false);
      } else if (window.pageYOffset > 150) {
        setScroll(true);
      }
      return () => (window.onscroll = null);
    };
  }, []);

  const handleToggle = (index: number) => {
    if (!isMobile) return;

    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <div className='overlay'></div>
      <div
        className={`side-overlay ${active ? "active_side-overlay" : ""}`}
      ></div>
      <div className='header-top-three header-transparent d-none d-md-block'>
        <div className='container tw-container-1680-px'>
          <div className='header-top-three-wrapper d-flex justify-content-between'>
            <div className='d-flex tw-gap-10 align-items-center'>
              <div className='d-flex align-items-end tw-gap-1'>
                <span className='text-white d-inline-block lh-1 tw-text-lg'>
                  <i className='ph-bold ph-envelope' />
                </span>
                <Link
                  className='text-white font-heading tw-text-315 fw-normal'
                  href='mailto:support@example.com'
                >
                  support@example.com
                </Link>
              </div>
              <div className='d-flex align-items-end tw-gap-1'>
                <span className='text-white d-inline-block lh-1 tw-text-lg'>
                  <i className='ph-bold ph-phone' />
                </span>
                <Link
                  className='text-white font-heading tw-text-315 fw-normal'
                  href='#'
                >
                  support@example.com
                </Link>
              </div>
            </div>
            <div>
              <div className='d-flex align-items-end tw-gap-1'>
                <span className='text-white d-inline-block lh-1 tw-text-lg'>
                  <i className='ph-bold ph-map-pin' />
                </span>
                <p className='text-white mb-0 font-heading tw-text-315 fw-normal'>
                  123 Main Street, Springfield, USA
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <header
        className={`header header-three tw-transition-all tw-z-99 header-transparent ${
          scroll ? "fixed-header" : ""
        }`}
      >
        <div className='container tw-container-1680-px'>
          <nav className='d-flex align-items-center justify-content-between position-relative'>
            {/* Menu Start  */}
            <div className='header-menu d-lg-block d-none'>
              {/* Nav menu Start */}
              <ul className='nav-menu d-lg-flex align-items-center tw-gap-8'>
                {desktopMenuData.map((item, index) => {
                  // ================= LINK ONLY =================
                  if (item.type === "link") {
                    return (
                      <li key={index} className='nav-menu__item'>
                        <Link
                          href={item.link || "#"}
                          className='nav-menu__link text-white font-heading tw-py-11 fw-normal w-100'
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  }

                  // ================= MEGA MENU =================
                  if (item.type === "mega") {
                    return (
                      <li key={index} className='nav-menu__item has-submenu '>
                        <Link
                          href='#'
                          className='nav-menu__link tw-pe-5 text-white font-heading tw-py-11 fw-normal w-100'
                        >
                          {item.label}
                        </Link>

                        <div className='mega-menu tw-p-6 tw-rounded-lg scroll-sm nav-submenu position-absolute start-0 top-100 tw-w-max bg-white tw-rounded-md tw-duration-200 tw-z-99'>
                          <div className='row g-4 row-cols-1 row-cols-lg-3 row-cols-xl-4'>
                            {item.megaItems?.map((home, i) => (
                              <div key={i} className='col'>
                                <div className='mega-menu-item group-item'>
                                  <div className='position-relative border border-neutral-200 tw-rounded-lg overflow-hidden'>
                                    <Link href={home.link} className='d-block'>
                                      <Image
                                        src={home.image}
                                        width={1440}
                                        height={2100}
                                        alt='Home Page Image'
                                        className='tw-h-320-px w-100 object-fit-cover object-top'
                                      />
                                    </Link>

                                    <div className='d-lg-flex d-none'>
                                      <div className='mega-menu-item__overlay position-absolute top-0 tw-start-0 w-100 h-100 d-flex justify-content-center align-items-center tw-invisible opacity-0 group-hover-item-visible group-hover-item-opacity-1 tw-scale-08 group-hover-item-scale-1 tw-rounded-lg pointer-event-none'></div>
                                      <div className='mega-menu-item__buttons position-absolute top-0 tw-start-0 w-100 h-100 d-flex justify-content-center align-items-center flex-column tw-gap-4 tw-invisible opacity-0 group-hover-item-visible group-hover-item-opacity-1'>
                                        <Link
                                          className='tw-btn-hover-white bg-main-600 tw-py-4 tw-px-8 text-capitalize text-heading font-heading d-inline-flex align-items-center tw-gap-2 tw-rounded-lg'
                                          href={home.link}
                                        >
                                          Live Preview
                                          <span className='d-inline-block lh-1 tw-text-lg'>
                                            <i className='ph ph-arrow-up-right' />
                                          </span>
                                        </Link>
                                      </div>
                                    </div>
                                  </div>

                                  <div className='tw-mt-4 text-center'>
                                    <Link
                                      href={home.link}
                                      className='text-heading hover-text-main-600 fw-semibold tw-text-md text-capitalize line-clamp-1'
                                    >
                                      {home.title}
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </li>
                    );
                  }

                  // ================= SUB MENU =================
                  return (
                    <li
                      key={index}
                      className='nav-menu__item has-submenu position-relative'
                    >
                      <Link
                        href='#'
                        className='nav-menu__link tw-pe-5 text-white font-heading tw-py-11 fw-normal w-100'
                      >
                        {item.label}
                      </Link>

                      <ul className='nav-submenu scroll-sm position-absolute start-0 top-100 tw-w-max bg-white tw-rounded-md overflow-hidden tw-p-2 tw-duration-200 tw-z-99'>
                        {item.subMenu?.map((sub, i) => (
                          <li
                            key={i}
                            className={`nav-submenu__item d-block tw-rounded tw-duration-200 position-relative ${
                              pathname === sub.link ? "activePage" : ""
                            }`}
                          >
                            <Link
                              href={sub.link}
                              className='nav-submenu__link hover-bg-neutral-200 text-heading font-heading fw-normal w-100 d-block tw-py-2 tw-px-305 tw-rounded'
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                })}
              </ul>
              {/* Nav menu End  */}
            </div>
            {/* Menu End  */}
            {/* Logo Start */}
            <div className='logo'>
              <Link href='/' className='link'>
                <Image
                  width={202}
                  height={65}
                  src='/assets/images/logo/logo.png'
                  alt='Logo'
                  className='max-w-200-px'
                />
              </Link>
            </div>
            {/* Logo End  */}
            {/* Header Right start */}
            <div className='header-right d-flex tw-gap-28'>
              <div className='header-button'>
                <Link
                  className='tw-btn-hover-yellow bg-white tw-py-5 tw-px-7 text-uppercase text-heading font-heading d-inline-flex align-items-center tw-gap-2 tw-rounded-lg'
                  href='/contact'
                >
                  EXPLORE MORE{" "}
                  <span className='d-inline-block lh-1 tw-text-lg'>
                    <i className='ph ph-arrow-up-right' />
                  </span>
                </Link>
              </div>
              <button
                onClick={() => setActive(true)}
                type='button'
                className='toggle-mobileMenu leading-none d-lg-none text-white tw-text-9'
              >
                <i className='ph ph-list' />
              </button>
            </div>
            {/* Header Right End  */}
          </nav>
        </div>
      </header>

      {/* MobileMenu */}
      <div
        className={`mobile-menu d-lg-none d-block scroll-sm position-fixed bg-white tw-w-300-px tw-h-screen overflow-y-auto tw-p-6 tw-z-999 tw--translate-x-full tw-pb-68 ${
          active ? "active_mobile_menu" : "de_active_mobile_menu"
        }`}
      >
        <button
          onClick={() => setActive(false)}
          type='button'
          className='close-button position-absolute tw-end-0 top-0 tw-me-2 tw-mt-2 tw-w-605 tw-h-605 rounded-circle d-flex justify-content-center align-items-center text-neutral-900 bg-neutral-200 hover-bg-neutral-900 hover-text-white'
        >
          <i className='ph ph-x'></i>
        </button>

        <div className='mobile-menu__inner'>
          <Link href='/' className='mobile-menu__logo'>
            <Image
              width={202}
              height={65}
              src='/assets/images/logo/logo.png'
              alt='Logo'
            />
          </Link>

          <div className='mobile-menu__menu'>
            <ul className='nav-menu d-lg-flex align-items-center nav-menu--mobile d-block tw-mt-8'>
              {menuData.map((item, index) => (
                <li
                  key={index}
                  className={`nav-menu__item ${
                    item.subMenu ? "has-submenu position-relative" : ""
                  } ${activeIndex === index ? "active" : ""}`}
                  onClick={() => handleToggle(index)}
                >
                  <Link
                    href={item.link ?? "#"}
                    className='nav-menu__link tw-pe-5 text-white font-heading tw-py-11 fw-normal w-100'
                  >
                    {item.label}
                  </Link>

                  {item.subMenu && (
                    <ul
                      className={`nav-submenu scroll-sm position-absolute start-0 top-100 tw-w-max bg-white tw-rounded-md overflow-hidden tw-p-2 tw-duration-200 tw-z-99 ${
                        activeIndex === index && isMobile
                          ? "active_submenu"
                          : "de_active_submenu"
                      }`}
                    >
                      {item.subMenu.map((sub, subIndex) => (
                        <li
                          key={subIndex}
                          className='nav-submenu__item d-block tw-rounded tw-duration-200 position-relative'
                        >
                          <Link
                            href={sub.link}
                            className='nav-submenu__link hover-bg-neutral-200 text-heading font-heading fw-normal w-100 d-block tw-py-2 tw-px-305 tw-rounded'
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderThree;
