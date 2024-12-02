"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Error = () => {
	const router = useRouter();

	useEffect(() => {
		const timer = setTimeout(() => {
			router.push("/");
		}, 3000);

		return () => clearTimeout(timer);
	}, [router]);

	return (
		<div className="container">
			<p>Error</p>
			<p>3초 뒤 메인 페이지로 이동</p>
		</div>
	);
};

export default Error;
