/** @format */

import { useState } from "react";
import { MAX_CHARACTERS } from "../../lib/constants";

type FeedbackFormProps = {
	onAddToList: (text: string) => void;
};

function FeedbackForm({ onAddToList }: FeedbackFormProps) {
	const [text, setText] = useState("");
	const charCount = MAX_CHARACTERS - text.length;
	const [showValidIndicator, setShowValidIndicator] = useState(false);
	const [showInvalidIndicator, setShowInvalidIndicator] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newText = e.target.value;
		if (newText.length > MAX_CHARACTERS) return;

		setText(newText);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (text.includes("#") && text.length >= 5) {
			setShowValidIndicator(true);
			setTimeout(() => {
				setShowValidIndicator(false);
			}, 2000);
		} else {
			setShowInvalidIndicator(true);
			setTimeout(() => {
				setShowInvalidIndicator(false);
			}, 2000);
			return;
		}
		onAddToList(text);
		setText("");
	};

	return (
		<form
			onSubmit={handleSubmit}
			className={`form ${showValidIndicator ? "form--valid" : ""} ${
				showInvalidIndicator ? "form--invalid" : ""
			}`}>
			<textarea
				id='feedback-textarea'
				value={text}
				onChange={handleChange}
				placeholder=''
				spellCheck={false}
			/>
			<label htmlFor='feedback-textarea'>
				Enter your feedback here, remember to #hashtag the company
			</label>
			<div>
				<p className='u-italic'>{charCount}</p>
				<button>
					<span>Submit</span>
				</button>
			</div>
		</form>
	);
}

export default FeedbackForm;
