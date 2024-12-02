"use client";

import Link from "next/link";
import styles from "./Header.module.scss";
import { BurgerBtn } from "@/assets/svg/icon-burger-btn";
import { Search } from "@/assets/svg/icon-search.jsx";
import { useRef, useState } from "react";

import useSidebarStore from "@/store/sidebarStore";

const Header = () => {
	const { toggleSidebar } = useSidebarStore();

	const [showSearchBar, setShowSearchBar] = useState(false);
	const searchBarRef = useRef(null);
	const searchInputContainerRef = useRef(null);

	const tempSearchArray = ["search item 1", "search item 2", "search item 3", "search item 4", "search item 5", "search item 6", "search item 7"];

	const handleSearchFocus = () => {
		setShowSearchBar(true);
	};

	const handleSearchBlur = (event) => {
		if (
			searchBarRef.current &&
			event.relatedTarget &&
			!searchBarRef.current.contains(event.relatedTarget) &&
			!event.relatedTarget.closest(`.${styles.recommend}`) &&
			!event.relatedTarget.closest(`.${styles.search_input_container}`)
		) {
			setShowSearchBar(false);
		}
	};

	const handleClickOutside = (event) => {
		if (
			searchBarRef.current &&
			!searchBarRef.current.contains(event.target) &&
			!event.target.closest(`.${styles.recommend}`) &&
			!event.target.closest(`.${styles.search_input_container}`)
		) {
			setShowSearchBar(false);
		}
	};

	return (
		<>
			<div className={`${styles.search_focus_cover} ${showSearchBar ? styles.show : ""}`} onClick={handleClickOutside} />
			<header className={styles.container} onClick={handleClickOutside}>
				<div className={styles.logo_wrapper}>
					<button type="button" onClick={toggleSidebar} aria-label="open side bar">
						<BurgerBtn />
					</button>

					<Link className={styles.logo} href="/">
						RAW GAMES
					</Link>
				</div>
				<ul className={styles.search_auth_wrapper}>
					<li className={styles.search_input_container} ref={searchInputContainerRef}>
						<form>
							<div ref={searchBarRef} className={`${styles.search_input_wrapper} ${showSearchBar ? styles.expand : ""}`}>
								<Search />
								<input type="search" autoComplete="off" placeholder="검색" onFocus={handleSearchFocus} onBlur={handleSearchBlur} />
							</div>
							{showSearchBar && (
								<div className={styles.recommend}>
									<ul>
										{tempSearchArray.map((item, index) => (
											<li key={index}>
												<button onBlur={handleSearchBlur} type="button">
													{item}
												</button>
											</li>
										))}
									</ul>
								</div>
							)}
						</form>
					</li>
					<li>
						<Link href="/auth/sign-in">로그인</Link>
					</li>
					<li>
						<Link href="/auth/sign-up">회원가입</Link>
					</li>
				</ul>
			</header>
		</>
	);
};

export default Header;
