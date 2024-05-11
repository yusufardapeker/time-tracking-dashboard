const resultItems = document.querySelectorAll(".result-item");

const resultTitle = document.querySelectorAll(".result-values-title");
const resultCurrentValue = document.querySelectorAll(".result-current-number");
const resultPrevious = document.querySelectorAll(".result-previous");

const buttons = document.querySelectorAll("button");

async function displayData() {
	const res = await fetch("./data.json");
	const data = await res.json();

	resultItems.forEach((item, index) => {
		resultTitle[index].textContent = data[index].title;
		resultCurrentValue[index].innerText = `${data[index].timeframes.weekly.current}hrs`;
		resultPrevious[index].innerText = `Last Week - ${data[index].timeframes.weekly.previous}hrs`;
	});

	buttons.forEach((button, index, array) =>
		button.addEventListener("click", (e) => {
			array.forEach((buttonElement) => {
				buttonElement.classList.remove("active");
			});

			switch (e.target.name) {
				case "daily":
					e.target.classList.add("active");

					resultItems.forEach((item, index) => {
						resultCurrentValue[index].innerText = `${data[index].timeframes.daily.current}hrs`;
						resultPrevious[index].innerText = `Yesterday - ${data[index].timeframes.daily.previous}hrs`;
					});

					break;

				case "monthly":
					e.target.classList.add("active");

					resultItems.forEach((item, index) => {
						resultCurrentValue[index].innerText = `${data[index].timeframes.monthly.current}hrs`;
						resultPrevious[index].innerText = `Last Month - ${data[index].timeframes.monthly.previous}hrs`;
					});

					break;

				default:
					e.target.classList.add("active");

					resultItems.forEach((item, index) => {
						resultCurrentValue[index].innerText = `${data[index].timeframes.weekly.current}hrs`;
						resultPrevious[index].innerText = `Last Week - ${data[index].timeframes.weekly.previous}hrs`;
					});

					break;
			}
		})
	);
}

displayData();
