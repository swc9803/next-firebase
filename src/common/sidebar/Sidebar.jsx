"use client";

import Link from "next/link";
import useSidebarStore from "@/store/sidebarStore";
import { Board } from "@/assets/svg/icon-board.jsx";
import styles from "./Sidebar.module.scss";

const menus = [
	{ path: "/game", name: "인기 게임", query: "popular", icon: Board },
	{ path: "/game", name: "신규 게임", query: "new", icon: Board },
	{ path: "/", name: "게시판", icon: Board },
];

const SideBar = () => {
	const { sidebarOpen, toggleSidebar } = useSidebarStore();

	return (
		<>
			<div className={`${styles.push} ${sidebarOpen ? "" : styles.show}`}>
				<div className={`${styles.content_cover} ${sidebarOpen ? "" : styles.show}`} onClick={toggleSidebar}></div>
			</div>

			<aside className={`${styles.container} ${sidebarOpen ? "" : styles.show}`}>
				<div className={`${styles.wrapper} ${sidebarOpen ? styles.rotate : ""}`}>
					<ul>
						{menus.map((menu, index) => (
							<li key={index}>
								<Link href={{ pathname: menu.path, query: menu.query || {} }}>
									<menu.icon />
									{menu.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</aside>
		</>
	);
};

export default SideBar;
