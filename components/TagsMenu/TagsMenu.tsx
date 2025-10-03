"use client";
import css from "../TagsMenu/TagsMenu.module.css";
import Link from "next/link";
import { useState } from "react";
import { tags } from "../../lib/tags";

export default function TagsMenu() {
  
  const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
  };
  
  return (
    <div className={css.menuContainer}>
      <button onClick={toggleMenu} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink} onClick={toggleMenu}>
              {tag}
            </Link>
          </li>
          ))}
        </ul>
      )}
        </div>
  );
};
