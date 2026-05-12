"use client";
import { FC, useEffect, useState } from "react";
import { menuData } from "@/data/menuData";
import { desktopMenuData } from "@/data/menuDataDesktop";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderTwo: FC = () => {
  const pathname = usePathname();
  const [searchActive, setSearchActive] = useState(false);
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
      <header
        className={`header tw-transition-all tw-z-99 header-transparent ${
          scroll ? "fixed-header" : ""
        }`}
      >
        <div className='container tw-container-1750-px'>
          <nav className='d-flex align-items-center justify-content-between position-relative'>
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
            {/* Menu Start  */}
            <div className='header-menu d-lg-block d-none'>
              {/* Nav menu Start */}
              <ul className='nav-menu d-lg-flex align-items-center tw-gap-8'>
                {desktopMenuData.map((item, index) => {
                  // ================= LINK ONLY =================
                  if (item.type === "link") {
                    return (
                      <li
                        key={index}
                        className={`nav-menu__item ${
                          pathname === item.link ? "activePage" : ""
                        } `}
                      >
                        <Link
                          href={item.link || "#"}
                          className='nav-menu__link tw-pe-5 text-white font-heading tw-py-11 fw-normal w-100'
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
            {/* Header Right start */}
            <div className='header-right d-flex tw-gap-28'>
              <div className='header-call d-flex align-items-center tw-gap-5 tw-me-6'>
                <div>
                  <span>
                    <Image
                      width={24}
                      height={24}
                      src='/assets/images/icons/cellphone.svg'
                      alt='cellphone'
                    />
                  </span>
                </div>
                <div>
                  <h6 className='text-white fw-normal tw-text-sm font-body tw-mb-2'>
                    Need any Help! call Us today
                  </h6>
                  <Link
                    className='text-white font-heading hover-text-main-600'
                    href='tell:+2871382023'
                  >
                    +(2) 871 382 023
                  </Link>
                </div>
              </div>
              <div className='header-button header-two-button'>
                <Link
                  className='tw-btn-hover-white bg-main-600 tw-py-5 tw-px-14 text-capitalize text-heading font-heading d-inline-flex align-items-center tw-gap-2 tw-rounded-lg'
                  href='/contact'
                >
                  Booking today{" "}
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

      <>
        <div
          className={
            searchActive ? "search_popup search-opened" : "search_popup"
          }
        >
          <div className='container'>
            <div className='row'>
              <div className='col-xxl-12'>
                <div className='search_wrapper'>
                  <div className='search_top d-flex justify-content-between align-items-center'>
                    <div className='search_logo'>
                      <Link href='/'>
                        <Image
                          width={202}
                          height={65}
                          src='/assets/images/logo/logo.png'
                          alt='Logo'
                        />
                      </Link>
                    </div>
                    <div
                      className='search_close'
                      onClick={() => setSearchActive(false)}
                    >
                      <button type='button' className='search_close_btn'>
                        <svg
                          width={18}
                          height={18}
                          viewBox='0 0 18 18'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M17 1L1 17'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                          <path
                            d='M1 1L17 17'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className='search_form'>
                    <form action='#'>
                      <div className='search_input'>
                        <input
                          className='search-input-field'
                          type='text'
                          placeholder='Type here to search...'
                        />
                        <span className='search-focus-border' />
                        <button type='submit'>
                          <svg
                            width={20}
                            height={20}
                            viewBox='0 0 20 20'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M9.55 18.1C14.272 18.1 18.1 14.272 18.1 9.55C18.1 4.82797 14.272 1 9.55 1C4.82797 1 1 4.82797 1 9.55C1 14.272 4.82797 18.1 9.55 18.1Z'
                              stroke='currentColor'
                              strokeWidth='1.5'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                            <path
                              d='M19.0002 19.0002L17.2002 17.2002'
                              stroke='currentColor'
                              strokeWidth='1.5'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            searchActive
              ? "search-popup-overlay search-popup-overlay-open"
              : "search-popup-overlay"
          }
        />
      </>
    </>
  );
};

export default HeaderTwo;
