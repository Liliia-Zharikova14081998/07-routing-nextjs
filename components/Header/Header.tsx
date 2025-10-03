import css from "./Header.module.css";
import Link from "next/link";
import TagsMenu from "../TagsMenu/TagsMenu";


export async function Header() { 
  return (
    <header className={css.header}>
      <Link className={css.headerLink} href="/" aria-label="Home">
    NoteHub
  </Link>
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