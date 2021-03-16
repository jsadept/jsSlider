const defaultSliderConfig = {
	arrows: true,
	activeIndex: 1,
	centered: true,
	direction: 'horizontal',
	dots: false,
	infinity: false,
	speed: 3000, // loop auto moving timing ms
	duration: 0.3, // transition-duration: time s
	timingFunction: 'ease-out', // transition-timing-function: ease|ease-in|ease-out|ease-in-out|linear|step-start|step-end|steps|cubic-bezier
	spaceBetween: 20,
	slideId: 0,
	slidesPerView: 4,
	slidesPerScroll: 4,
	isMoving: false,

	get slider() {
		return document.querySelector('.a-slider');
	},
	get slidesContainer() {
		return document.querySelector('.a-slider__slides');
	},
	get slidesWrapper() {
		return document.querySelector('.a-slider__slides-wrapper');
	},
	get slides() {
		return document.querySelectorAll('.a-slide');
	},
	get nextBtn() {
		return document.querySelector('.a-slider__arrow_next');
	},
	get prevBtn() {
		return document.querySelector('.a-slider__arrow_prev');
	},
	// firstClone: slides[0].cloneNode(true),
	// lastClone: slides[slides.length - 1].cloneNode(true),
};

class Slider {
	constructor(props) {
		// Combining default configuration with user configuration data
		Object.assign(this, props.defaultConfig, props);

		this._init();
	}

	_init() {
		this._cloneSlides();
		this._createSlider();
		this.gotoSlide(this.slidesPerScroll, false);
		this._createSliderButtons();
	}

	_initSliderSelectors() {}

	_createSliderDots() {}

	_createSliderButtons() {
		this.nextBtn.addEventListener('click', this.nextSlide.bind(this));
		this.prevBtn.addEventListener('click', this.previousSlide.bind(this));

		this.slidesContainer.addEventListener('transitionend', () => {
			const cloneIndex = this._hasCloneNodes();
			if (cloneIndex) {
				this.gotoSlide(cloneIndex, false);
				this.isMoving = false;
			} else {
				this.isMoving = false;
			}
		});
	}

	_createInfinityArrays() {}

	_createSlider() {
		const spaceBetween = this.spaceBetween / 2;
		const widthOfWrapper = this.slidesWrapper.offsetWidth;
		const heightOfWrapper = this.slidesWrapper.offsetHeight;
		const slideWidth = widthOfWrapper / this.slidesPerView - this.spaceBetween;
		const slideHeight = heightOfWrapper / this.slidesPerView - this.spaceBetween;
		console.log('here');
		// set slides css settings
		this.updatedSlides.forEach((current) => {
			current.style.width = `${slideWidth}px`;
			current.style.margin = `0 ${spaceBetween}px`;
		});

		// set global properties
		this.sliderMoveWidth = (slideWidth + this.spaceBetween) * this.slidesPerScroll;
		this.sliderMoveHeight = (slideHeight + this.spaceBetween) * this.slidesPerScroll;
	}

	_render() {}

	_cloneSlides() {
		// nodeList this.slides to array slides
		const slides = [...this.slides];
		const firstClone = [];
		const lastClone = [];
		for (let i = 0; i < this.slides.length; i++) {
			if (i < this.slidesPerScroll ? true : false) {
				const currentSlide = this.slides[i];
				const currentSlideClone = currentSlide.cloneNode(true);
				currentSlideClone.dataset.originalIndex = i + this.slidesPerScroll;
				firstClone.push(currentSlideClone);
			} else if (i >= slides.length - this.slidesPerScroll ? true : false) {
				const currentSlide = this.slides[i];
				const currentSlideClone = currentSlide.cloneNode(true);
				currentSlideClone.dataset.originalIndex = i + this.slidesPerScroll;
				lastClone.push(currentSlideClone);
			}
		}
		lastClone.reverse();

		firstClone.forEach((curr) => this.slidesContainer.append(curr));
		lastClone.forEach((curr, i) => this.slidesContainer.prepend(curr));

		// set global properties
		this.updatedSlides = document.querySelectorAll('.a-slide');
	}

	_hasCloneNodes() {
		for (let i = this.activeIndex; i < this.activeIndex + this.slidesPerScroll; i++) {
			if (this.updatedSlides[i].dataset.originalIndex) {
				return this.updatedSlides[i].dataset.originalIndex;
			}
		}
		return false;
	}

	start() {}

	stop() {}

	nextSlide() {}

	previousSlide() {}

	gotoSlide(index) {}
}

class SliderVertical extends Slider {
	constructor(props) {
		super(props);
		this.slidesPerView = 1;
		this.slider.classList.add('slider_vertical');
	}

	start() {}

	stop() {}

	nextSlide() {}

	previousSlide() {}

	gotoSlide(index) {}
}

class SliderHorizontal extends Slider {
	constructor(props) {
		super(props);
	}

	start() {
		this.timerLoop = setInterval(() => {
			this.nextSlide();
		}, this.speed);
	}

	stop() {
		clearInterval(this.timerLoop);
	}

	nextSlide() {
		if (!this.isMoving) {
			this.isMoving = true;
			this.gotoSlide(this.activeIndex + this.slidesPerScroll, true);
			return true;
		}
		return false;
	}

	previousSlide() {
		if (!this.isMoving) {
			this.isMoving = true;
			this.gotoSlide(this.activeIndex - this.slidesPerScroll, true);
			return true;
		}
		return false;
	}

	gotoSlide(index, transition) {
		const i = Number(index);
		const slideWidth = this.sliderMoveWidth;
		const moveWidth = slideWidth * i;

		this.activeIndex = i;

		if (transition) this.slidesContainer.style.transition = `${this.duration}s ${this.timingFunction}`;
		else this.slidesContainer.style.transition = 'none';

		this.slidesContainer.style.transform = `translateX(${-moveWidth}px)`;
	}
}

function createSlider(config, defaultConfig) {
	if (defaultConfig) config.defaultConfig = defaultConfig;
	else {
		config.defaultConfig = defaultSliderConfig;
	}

	if (config.direction === 'vertical') {
		return new SliderVertical(config);
	}
	return new SliderHorizontal(config);
}

// tests
const slider1 = createSlider({
	centered: true,
	infinity: false,
	direction: 'horizontal',
	arrows: true,
	loop: true,
	slidesPerView: 1,
	slidesPerScroll: 1,
	spaceBetween: 20,
});
