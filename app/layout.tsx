import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'VectorVault — Cybersecurity Visualization Network',
	description: 'Visualize attack vectors, defense strategies and secure architectures.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}