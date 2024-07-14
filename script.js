const resultItems = document.querySelectorAll(".result-item");

const resultTitle = document.querySelectorAll(".result-values-title");
const resultCurrentValue = document.querySelectorAll(".result-current-number");
const resultPrevious = document.querySelectorAll(".result-previous");

const buttons = document.querySelectorAll("button");

async function displayData() {
	const res = await fetch("./data.json");
	const data = await res.json();

	const renderInUI = (timeframe, prevWord) => {
		resultItems.forEach((item, index) => {
			resultTitle[index].textContent = data[index].title;
			resultCurrentValue[index].innerText = `${data[index].timeframes[timeframe].current}hrs`;
			resultPrevious[
				index
			].innerText = `${prevWord} - ${data[index].timeframes[timeframe].previous}hrs`;
		});
	};

	renderInUI("weekly", "Last Week");

	buttons.forEach((button, index, array) =>
		button.addEventListener("click", (e) => {
			array.forEach((buttonElement) => {
				buttonElement.classList.remove("active");
			});

			switch (e.target.name) {
				case "daily":
					e.target.classList.add("active");

					renderInUI("daily", "Yesterday");

					break;

				case "monthly":
					e.target.classList.add("active");

					renderInUI("monthly", "Last Month");

					break;

				default:
					e.target.classList.add("active");

					renderInUI("weekly", "Last Week");

					break;
			}
		})
	);
}

displayData();
