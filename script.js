const resultItemsEl = document.querySelectorAll(".result-item");

const resultTitleEl = document.querySelectorAll(".result-values-title");
const resultCurrentEl = document.querySelectorAll(".result-current");
const resultPreviousEl = document.querySelectorAll(".result-previous");

const timeframeButtons = document.querySelectorAll("button[data-timeframe]");

let data = null;

const getData = async () => {
	if (!data) {
		const res = await fetch("./data.json");
		data = await res.json();
	}

	return data;
};

const displayData = async (timeframe, prevTimeWord) => {
	const data = await getData();

	resultItemsEl.forEach((_, index) => {
		const resultItem = data[index];
		const resultItemTimeframe = resultItem.timeframes[timeframe];

		resultTitleEl[index].textContent = resultItem.title;
		resultCurrentEl[index].textContent = `${resultItemTimeframe.current}hrs`;
		resultPreviousEl[index].textContent = `${prevTimeWord} - ${resultItemTimeframe.previous}hrs`;
	});
};

const styleActiveButton = (selectedButton) => {
	timeframeButtons.forEach((button) => button.classList.remove("active"));
	selectedButton.classList.add("active");
};

const switchTimeframes = (e) => {
	const selectedButton = e.target;
	const selectedTimeframe = selectedButton.dataset.timeframe;

	styleActiveButton(selectedButton);

	switch (selectedTimeframe) {
		case "daily":
			displayData("daily", "Yesterday");
			break;

		case "weekly":
			displayData("weekly", "Last Week");
			break;

		case "monthly":
			displayData("monthly", "Last Month");
			break;

		default:
			displayData("weekly", "Last Week");
			break;
	}
};

timeframeButtons.forEach((button) => {
	button.addEventListener("click", switchTimeframes);
});
