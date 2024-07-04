/** @format */

import { useContext, useEffect, useState } from "react";
import { FeedbackItemsContext } from "../contexts/FeedbackItemsContextProvider";
import { TFeedbackItem } from "./types";

export function useFeedbackItemsContext() {
	const context = useContext(FeedbackItemsContext);
	if (!context) {
		throw new Error(
			"useFeedbackItemsContext must be used within a FeedbackItemsContextProvider"
		);
	}
	return context;
}

export function useFeedbackItems() {
	const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const fetchFeedbackItems = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(
				"https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
			);

			if (!response.ok) {
				throw new Error();
			}

			const data = await response.json();
			setFeedbackItems(data.feedbacks);
		} catch (error) {
			setErrorMessage("Something went wrong!");
		}
		setIsLoading(false);
	};
	useEffect(() => {
		fetchFeedbackItems();

		// setIsLoading(true);

		// fetch(
		// 	"https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
		// )
		// 	.then((response) => {
		// 		if (!response.ok) {
		// 			throw new Error();
		// 		}
		// 		return response.json();
		// 	})
		// 	.then((data) => {
		// 		setFeedbackItems(data.feedbacks);
		// 		setIsLoading(false);
		// 	})
		// 	.catch(() => {
		// 		setErrorMessage("Something went wrong!");
		// 		setIsLoading(false);
		// 	});
	}, []);

	return {
		feedbackItems,
		isLoading,
		errorMessage,
		setFeedbackItems,
	};
}
