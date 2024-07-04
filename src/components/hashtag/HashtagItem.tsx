/** @format */

type HashTagItemProps = {
	company: string;
	onSelectCompany: (company: string) => void;
};

function HashtagItem({ company, onSelectCompany }: HashTagItemProps) {
	return (
		<li key={company}>
			<button onClick={() => onSelectCompany(company)}>#{company}</button>
		</li>
	);
}

export default HashtagItem;
