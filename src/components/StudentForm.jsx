"use client";

import { useState, useEffect } from "react";
import styles from "../app/page.module.scss";
import { addDoc, updateDoc, collection, doc } from "firebase/firestore";
import fireStore from "../app/firebase/firestore";

export default function StudentForm({ selectedClass, onUpdate, editStudent, onEditComplete }) {
	const [formData, setFormData] = useState({ name: "", age: "" });

	useEffect(() => {
		if (editStudent) {
			setFormData({
				name: editStudent.name,
				age: editStudent.age.toString(),
			});
		} else {
			setFormData({ name: "", age: "" });
		}
	}, [editStudent]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (editStudent) {
			// 수정 로직
			try {
				const studentDocRef = doc(fireStore, "학교", "1학년", selectedClass, editStudent.id);
				await updateDoc(studentDocRef, {
					name: formData.name,
					age: parseInt(formData.age, 10),
				});
				onEditComplete?.(); // 수정 완료 후 상태 초기화
				onUpdate?.();
			} catch (error) {
				console.error(`수정 실패: ${error}`);
			}
		} else {
			// 추가 로직
			try {
				const studentsCollectionRef = collection(fireStore, "학교", "1학년", selectedClass);
				await addDoc(studentsCollectionRef, {
					name: formData.name,
					age: parseInt(formData.age, 10),
				});
				setFormData({ name: "", age: "" });
				onUpdate?.();
			} catch (error) {
				console.error(`추가 실패: ${error}`);
			}
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<h2 className={styles.title}>{editStudent ? "학생 수정" : "학생 추가"}</h2>
			<div className={styles.field}>
				<label>이름:</label>
				<input type="text" name="name" value={formData.name} onChange={handleChange} className={styles.input} required />
			</div>
			<div className={styles.field}>
				<label>나이:</label>
				<input type="number" name="age" value={formData.age} onChange={handleChange} className={styles.input} required />
			</div>
			<button type="submit" className={styles.button}>
				{editStudent ? "수정 완료" : "추가"}
			</button>
		</form>
	);
}
