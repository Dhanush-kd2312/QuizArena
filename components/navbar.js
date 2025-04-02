'use client';
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [active, setActive] = useState("");
  const [hovered, setHovered] = useState("");

  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        {["home", "about", "contact", "chat", "login"].map((item) => (
          <li key={item} style={styles.li}>
            <Link 
              href={`/${item}`} 
              style={{
                ...styles.link,
                color: active === item ? 'darkgreen' : hovered === item ? 'gold' : 'white',
              }}
              onClick={() => setActive(item)}
              onMouseEnter={() => setHovered(item)}
              onMouseLeave={() => setHovered("")}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
              <span 
                style={{
                  ...styles.underlineEffect,
                  width: hovered === item ? "50%" : "0%",
                }}
              ></span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#222',
    padding: '15px',
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'right',
  },
  ul: {
    display: 'flex',
    alignItems: 'center',
    listStyle: 'none',
    margin: 0,
    padding: '0 20px',
  },
  li: {
    margin: '0 30px',
    position: 'relative',
  },
  link: {
    textDecoration: 'none',
    fontSize: '25px',
    fontWeight: 'bold',
    position: 'relative',
    transition: 'color 0.3s ease',
    display: 'inline-block',
    paddingBottom: '5px',
  },
  underlineEffect: {
    display: 'block',
    position: 'absolute',
    height: '3px',
    backgroundColor: 'gold',
    bottom: '-2px',
    left: '0',
    transition: 'width 0.4s ease-in-out 0.2s',
  },
};

export default Navbar;

