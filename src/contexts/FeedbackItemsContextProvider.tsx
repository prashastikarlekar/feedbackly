/** @format */

import { useState, useMemo, createContext } from "react";
import { TFeedbackItem } from "../lib/types";
import { useFeedbackItems } from "../lib/hooks";

type FeedbackItemsContextProviderProps = {
	children: React.ReactNode;
};

type TFeedbackItemsContext = {
	feedbackItems: TFeedbackItem[];
	isLoading: boolean;
	errorMessage: string;
	companyList: string[];
	handleAddToList: (text: string) => void;
	filteredFeedbackItems: TFeedbackItem[];
	handleSelectedCompany: (company: string) => void;
};

export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(
	null
);

export default function FeedbackItemsContextProvider({
	children,
}: FeedbackItemsContextProviderProps) {
	const { feedbackItems, isLoading, errorMessage, setFeedbackItems } =
		useFeedbackItems();
	const [selectedCompany, setSelectedCompany] = useState("");

	const companyList = useMemo(
		() =>
			feedbackItems
				.map((item) => item.company)
				.filter((company, index, array) => {
					return array.indexOf(company) === index;
				}),
		[feedbackItems]
	);

	const handleAddToList = async (text: string) => {
		const companyName = text
			.split(" ")
			.find((word: string) => word.includes("#"))!
			.substring(1);
		const newItem: TFeedbackItem = {
			id: new Date().getTime(),
			upvoteCount: 0,
			text: text,
			daysAgo: 0,
			company: companyName,
			badgeLetter: companyName.charAt(0).toUpperCase(),
		};

		setFeedbackItems([...feedbackItems, newItem]);

		await fetch(
			"https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
			{
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newItem),
			}
		);
	};

	const filteredFeedbackItems = useMemo(
		() =>
			selectedCompany
				? feedbackItems.filter((item) => item.company === selectedCompany)
				: feedbackItems,
		[selectedCompany, feedbackItems]
	);

	const handleSelectedCompany = (company: string) => {
		setSelectedCompany(company);
	};

	return (
		<FeedbackItemsContext.Provider
			value={{
				feedbackItems,
				isLoading,
				errorMessage,
				companyList,
				handleAddToList,
				filteredFeedbackItems,
				handleSelectedCompany,
			}}>
			{children}
		</FeedbackItemsContext.Provider>
	);
}
