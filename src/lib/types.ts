/** @format */

export type TFeedbackItem = {
	id?: number;
	upvoteCount: number;
	badgeLetter: string;
	company: string;
	text: string;
	daysAgo: number;
};
export type ContainerProps = {
	feedbackItems: TFeedbackItem[];
	isLoading: boolean;
	errorMessage: string;
	handleAddToList: (text: string) => void;
};

export type FeedbackListProps = {
	feedbackItems: TFeedbackItem[];
	isLoading: boolean;
	errorMessage: string;
};
