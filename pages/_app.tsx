import type { AppProps } from "next/app";
import Script from "next/script";
import "../styles/global.css";

export const App = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Script src="https://www.gstatic.com/firebasejs/8.6.3/firebase-analytics.js" />
			<Component {...pageProps} />
		</>
	);
};
export default App;
