const selector = document.querySelector('.selector');
const slider = document.querySelector('.slider');
const background = document.querySelector('.background');

/* Stepper */
const stepper = document.querySelector('#stepper');

let isDragging = false;
let currentSelectorPosition = 0;

let steps = [5, 6, 7, 8, 9, 10, 11, 12];
let currentStep = 0;

stepper.innerHTML = `${steps[currentStep]}`;

/** Converts the given step to a percentage */
const convertStepToPercent = (stepIndex) => {
	/* Rests -1 to the list, do the list starts at 0. Pc things */
	const stepsLenght = steps.length - 1;

	/* Do a 3 rule, multiply the index of the gived step * 100 and divide it into stepsLenght */
	return (stepIndex * 100) / stepsLenght;
};

/**Converts the actual given position in pixels to percentage */
const convertPositionToPercent = (currentPos) => {
	/* Gets the width of the slider box */
	const lenght = slider.getBoundingClientRect().width;

	/* Do a 3 rule, multiply the current position in pixels * 100 and divide it into the lenght of the box */
	return (currentPos * 100) / lenght;
};

selector.addEventListener('mousedown', (event) => {
	isDragging = true;
});

window.addEventListener('mouseup', (event) => {
	if (isDragging) {
		isDragging = false;
	}
});

window.addEventListener('mousemove', (event) => {
	if (isDragging) {
		const movement = event.movementX;

		/* Saves the prev step necesary percentage to achive it */
		const prevStep = convertStepToPercent(currentStep - 1);

		/* Saves the next step necesary percentage to achive it */
		const nextStep = convertStepToPercent(currentStep + 1);

		/* Checks if the movement is to the right (1) or left (-1) */
		if (movement >= 1) {
			currentSelectorPosition += movement;
		} else if (movement <= -1) {
			currentSelectorPosition += movement;
		}

		/* Gets the current position to percentage */
		let pos = convertPositionToPercent(currentSelectorPosition);

		/* Limits the movement foward 0%, and below 100% */
		if (pos < 0) {
			pos = 0;
		} else if (pos >= 100) {
			pos = 100;
		}

		/* Checks if the position is enought to achive the next step or is below the before step */
		if (pos >= nextStep) {
			currentStep++;
			stepper.innerHTML = `${steps[currentStep]}`;
		} else if (pos <= prevStep) {
			currentStep--;
			stepper.innerHTML = `${steps[currentStep]}`;
		}

		/* Moves the line and modify the black background, cool code right? :) */
		selector.style.left = `${pos}%`;
		background.style.width = `${pos}%`;
	}
});
