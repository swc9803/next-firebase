"use client";

import { useState } from "react";
import styles from "../app/page.module.scss";

export default function ClassSelector({ onSelect }) {
	const [selectedClass, setSelectedClass] = useState("1반");

	const handleClassChange = (e) => {
		const newClass = e.target.value;
		setSelectedClass(newClass);
		onSelect?.(newClass);
	};

	return (
		<div className={styles.container}>
			<label className={styles.label}>
				반 선택:
				<select value={selectedClass} onChange={handleClassChange} className={styles.select}>
					<option value="1반">1반</option>
					<option value="2반">2반</option>
					<option value="3반">3반</option>
					<option value="4반">4반</option>
					<option value="5반">5반</option>
				</select>
			</label>
		</div>
	);
}
