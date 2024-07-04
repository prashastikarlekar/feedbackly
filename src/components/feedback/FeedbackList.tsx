/** @format */

import FeedbackItem from "./FeedbackItem";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { useFeedbackItemsContext } from "../../lib/hooks";

function FeedbackList() {
	const { isLoading, errorMessage, filteredFeedbackItems } =
		useFeedbackItemsContext();
	return (
		<ol className='feedback-list'>
			{isLoading && <Spinner />}
			{errorMessage && <ErrorMessage message={errorMessage} />}
			{filteredFeedbackItems?.map((item) => (
				<FeedbackItem key={item.id} feedbackItem={item} />
			))}
		</ol>
	);
}

export default FeedbackList;
