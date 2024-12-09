"use client"; // 클라이언트 컴포넌트

export default function Modal({ message, visible }) {
	if (!visible) return null;

	return <div>{message}</div>;
}
