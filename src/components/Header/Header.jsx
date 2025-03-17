import React, { useState } from 'react';
import { navItems } from '../../data/content';
import styles from '../../styles/Navbar.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.nav}>
      <nav className={styles.navContainer}>
        <div className={styles.navFlex}>
          <div className={styles.logo}>Chitral Adventure</div>
          
          {/* Desktop Navigation */}
          <div className={styles.desktopNav}>
            {navItems.map((item) => (
              <div key={item.id} className={styles.navItem}>
                <button className={styles.navLink}>
                  {item.title}
                </button>
                {item.submenu && (
                  <div className={styles.submenu}>
                    {item.submenu.map((subItem) => (
                      <a
                        key={subItem.id}
                        href={subItem.link}
                        className={styles.submenuItem}
                      >
                        {subItem.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Empty div for spacing in desktop view */}
          <div className="hidden md:block md:w-1/4"></div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={styles.mobileMenuButton}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`${styles.mobileNav} ${isOpen ? styles.mobileNavOpen : styles.mobileNavHidden}`}>
          {navItems.map((item) => (
            <div key={item.id} className={styles.mobileNavItem}>
              <button className={styles.mobileNavLink}>
                {item.title}
              </button>
              {item.submenu && (
                <div className={styles.mobileSubmenu}>
                  {item.submenu.map((subItem) => (
                    <a
                      key={subItem.id}
                      href={subItem.link}
                      className={styles.mobileSubmenuItem}
                    >
                      {subItem.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
