/** @format */

import { useFeedbackItemsContext } from "../../lib/hooks";
import FeedbackForm from "../feedback/FeedbackForm";
import Logo from "../Logo";
import PageHeading from "../PageHeading";
import Pattern from "../Pattern";

function Header() {
	const { handleAddToList } = useFeedbackItemsContext();
	return (
		<header>
			<Pattern />
			<Logo />
			<PageHeading />
			<FeedbackForm onAddToList={handleAddToList} />
		</header>
	);
}

export default Header;
