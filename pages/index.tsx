import { NextPage } from "next";
import Link from "next/link";
import React from "react";

/**
 * TODO: Add links for single player and two player
 */
export const Home: NextPage = () => {
	return (
		<>
			<h2>Connect 4</h2>
			<div>
				<Link href="/rooms">Multiplayer</Link>
				<br />
				<Link href="/rooms">Single Player</Link>
				<br />
				<Link href="/rooms">Two Player</Link>
			</div>
		</>
	);
};
export default Home;
