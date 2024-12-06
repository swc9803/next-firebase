"use client";

import { useState } from "react";
import { getDocs, collection, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import fireStore from "./firebase/firestore";
import styles from "./page.module.scss";

export default function Home() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		age: "",
	});
	const [editData, setEditData] = useState(null); // 수정 중인 데이터
	const [selectedClass, setSelectedClass] = useState("1반");
	const [modal, setModal] = useState({ visible: false, message: "" });

	// 데이터 로드
	const fetchData = async () => {
		try {
			setLoading(true);
			// getDocs는 전체 문서, doc는 특정 문서
			const querySnapshot = await getDocs(collection(fireStore, "학교", "1학년", selectedClass));
			const students = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setData(students);
		} catch (error) {
			console.error(`데이터 로드 실패 ${error}`);
			showModal("데이터 로드 실패");
		} finally {
			setLoading(false);
		}
	};

	// 데이터 추가
	const submitForm = async (e) => {
		e.preventDefault();
		// 데이터 수정 시
		if (editData) {
			updateData();
		} else {
			try {
				const studentsCollectionRef = collection(fireStore, "학교", "1학년", selectedClass);
				await addDoc(studentsCollectionRef, {
					name: formData.name,
					age: parseInt(formData.age, 10),
				});
				showModal("데이터 추가 성공");
				setFormData({ name: "", age: "" });
				fetchData();
			} catch (error) {
				console.error(`추가 실패 ${error}`);
				showModal("데이터 추가 실패");
			}
		}
	};

	// 데이터 수정
	const updateData = async () => {
		try {
			const studentDocRef = doc(fireStore, "학교", "1학년", selectedClass, editData.id);
			await updateDoc(studentDocRef, {
				name: formData.name,
				age: parseInt(formData.age, 10),
			});
			showModal("데이터 수정 성공");
			setFormData({ name: "", age: "" });
			setEditData(null); // 수정 상태 초기화
			fetchData();
		} catch (error) {
			console.error(`수정 실패 ${error}`);
			showModal("데이터 수정 실패");
		}
	};

	// 데이터 제거
	const deleteData = async (id) => {
		try {
			const studentDocRef = doc(fireStore, "학교", "1학년", selectedClass, id);
			await deleteDoc(studentDocRef);
			showModal("데이터 제거 성공");
			fetchData();
		} catch (error) {
			console.error(`데이터 제거 실패 ${error}`);
			showModal("데이터 제거 실패");
		}
	};

	// 데이터 편집
	const editStudent = (student) => {
		setEditData(student); // 수정 중인 데이터 설정
		setFormData({ name: student.name, age: student.age.toString() }); // 양식에 값 로드
	};

	// input 입력 시
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// 반 선택 시
	const handleClassChange = (e) => {
		setSelectedClass(e.target.value);
		setData([]);
	};

	// 모달
	const showModal = (message) => {
		setModal({ visible: true, message });
		setTimeout(() => {
			setModal({ visible: false, message });
		}, 3000);
	};

	return (
		<main className={styles.main}>
			<h1>Firestore</h1>

			<div className={styles.class_selector}>
				<label>
					반 선택:
					<select value={selectedClass} onChange={handleClassChange}>
						<option value="1반">1반</option>
						<option value="2반">2반</option>
						<option value="3반">3반</option>
						<option value="4반">4반</option>
						<option value="5반">5반</option>
					</select>
				</label>
			</div>

			<button onClick={fetchData} disabled={loading} className={styles.button}>
				{loading ? "Loading..." : "Fetch Data"}
			</button>

			{data.length > 0 ? (
				<div className={styles.data_container}>
					<h2>{selectedClass} 학생 목록</h2>
					<ul>
						{data.map((student) => (
							<li key={student.id}>
								이름: {student.name}, 나이: {student.age}
								<button onClick={() => editStudent(student)} className={styles.edit_button}>
									수정
								</button>
								<button onClick={() => deleteData(student.id)} className={styles.delete_button}>
									제거
								</button>
							</li>
						))}
					</ul>
				</div>
			) : (
				<p>No data</p>
			)}

			<form onSubmit={submitForm} className={styles.form}>
				<h2>{editData ? "학생 수정" : `${selectedClass} 학생 추가`}</h2>
				<div>
					<label>
						이름:
						<input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
					</label>
				</div>
				<div>
					<label>
						나이:
						<input type="number" name="age" value={formData.age} onChange={handleInputChange} required />
					</label>
				</div>
				<button type="submit" className={styles.submit_button}>
					{editData ? "수정 저장" : "학생 추가"}
				</button>
			</form>

			<div className={`${styles.modal} ${modal.visible ? styles.visible : ""}`}>{modal.message}</div>
		</main>
	);
}
