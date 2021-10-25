import { NextPage } from "next";
import Head from "next/head";

export const Chat: NextPage = () => (
	<>
		<Head>
			<title>Chat</title>
		</Head>
		<span id="chat"></span>
		<input type="text" name="" id="message" />
	</>
);

export default Chat;
