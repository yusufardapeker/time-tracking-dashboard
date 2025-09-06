const resultItems = document.querySelectorAll(".result-item");

const resultTitle = document.querySelectorAll(".result-values-title");
const resultCurrent = document.querySelectorAll(".result-current");
const resultPrevious = document.querySelectorAll(".result-previous");

const buttons = document.querySelectorAll("button");

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

	resultItems.forEach((item, index) => {
		const currentItem = data[index];

		resultTitle[index].textContent = currentItem.title;
		resultCurrent[index].innerText = `${currentItem.timeframes[timeframe].current}hrs`;
		resultPrevious[
			index
		].innerText = `${prevTimeWord} - ${currentItem.timeframes[timeframe].previous}hrs`;
	});
};

const switchTimeframes = (e) => {
	const selectedButton = e.target;
	const selectedTimeframe = selectedButton.dataset.timeframe;

	buttons.forEach((button) => button.classList.remove("active"));
	selectedButton.classList.add("active");

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

buttons.forEach((button) => {
	button.addEventListener("click", switchTimeframes);
});

displayData("weekly", "Last Week");
