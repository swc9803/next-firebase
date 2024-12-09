"use client";

import { useState, useEffect } from "react";
import styles from "../app/page.module.scss";
import ClassSelector from "./ClassSelector";
import StudentForm from "./StudentForm";
import { fetchStudents } from "../app/api/fetchStudents";
import { deleteDoc, doc } from "firebase/firestore";
import fireStore from "../app/firebase/firestore";

export default function StudentList({ initialData }) {
	const [selectedClass, setSelectedClass] = useState("1반");
	const [data, setData] = useState(initialData);
	const [loading, setLoading] = useState(false);
	const [editStudent, setEditStudent] = useState(null); // 수정 중인 학생

	const loadData = async (newClass) => {
		setLoading(true);
		setSelectedClass(newClass);
		const students = await fetchStudents(newClass);
		setData(students);
		setLoading(false);
	};

	const handleDelete = async (id) => {
		try {
			const studentDocRef = doc(fireStore, "학교", "1학년", selectedClass, id);
			await deleteDoc(studentDocRef);
			setData((prevData) => prevData.filter((student) => student.id !== id));
		} catch (error) {
			console.error(`삭제 실패: ${error}`);
		}
	};

	const handleEdit = (student) => {
		setEditStudent(student);
	};

	return (
		<div className={styles.container}>
			<ClassSelector onSelect={loadData} />
			<h2 className={styles.title}>{selectedClass} 학생 목록</h2>
			{loading ? (
				<p className={styles.loading}>Loading...</p>
			) : (
				<ul className={styles.list}>
					{data.map((student) => (
						<li key={student.id} className={styles.item}>
							{student.name} ({student.age}세)
							<button onClick={() => handleEdit(student)} className={styles.editButton}>
								수정
							</button>
							<button onClick={() => handleDelete(student.id)} className={styles.deleteButton}>
								삭제
							</button>
						</li>
					))}
				</ul>
			)}
			<StudentForm
				selectedClass={selectedClass}
				editStudent={editStudent}
				onUpdate={() => loadData(selectedClass)}
				onEditComplete={() => setEditStudent(null)} // 수정 완료 시 초기화
			/>
		</div>
	);
}
