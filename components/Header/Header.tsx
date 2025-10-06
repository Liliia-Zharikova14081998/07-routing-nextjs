import css from "./Header.module.css";
import Link from "next/link";
import TagsMenu from "../TagsMenu/TagsMenu";


export function Header() { 
  return (
    <header className={css.header}>
      <p className={css.logo}>
    NoteHub
  </p>
  <nav aria-label="Main Navigation">
    <ul className={css.navigation}>
      <li>
        <Link className={css.headerLink} href="/">Home</Link>
      </li>
      <li>
        <TagsMenu/>
      </li>
    </ul>
  </nav>
    </header>
    );
}