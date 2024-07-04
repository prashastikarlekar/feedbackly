/** @format */

import Container from "./components/layout/Container";
import Footer from "./components/layout/Footer";
import HashtagList from "./components/hashtag/HashtagList";
import FeedbackItemsContextProvider from "./contexts/FeedbackItemsContextProvider";

function App() {
	return (
		<div className='app'>
			<Footer />

			<FeedbackItemsContextProvider>
				<Container />
				<HashtagList />
			</FeedbackItemsContextProvider>
		</div>
	);
}

export default App;
