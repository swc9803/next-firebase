import styles from "./page.module.scss";
import StudentList from "@/components/StudentList";
import { fetchStudents } from "./api/fetchStudents";

// 글쓰기, 해당 페이지로 이동
export default async function Home() {
	const initialData = await fetchStudents("1반");

	return (
		<main className={styles.main}>
			<h1 className={styles.title}>Firestore</h1>
			<StudentList initialData={initialData} />
		</main>
	);
}
