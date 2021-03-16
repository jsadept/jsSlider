const defaultSliderConfig = {
	arrows: true,
	activeIndex: 1,
	centered: true,
	direction: 'horizontal',
	dots: false,
	infinity: false,
	speed: 3000,
	spaceBetween: 20,
	slideId: 0,
	slidesPerView: 4,
	slidesPerScroll: 4,

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
		return document.getElementById('a-slider__arrow_next');
	},
	get prevBtn() {
		return document.getElementById('a-slider__arrow_prev');
	},
	// firstClone: slides[0].cloneNode(true),
	// lastClone: slides[slides.length - 1].cloneNode(true),
};

class Slider {
	constructor(props) {
		// Combining default configuration with user configuration data
		Object.assign(this, props.defaultConfig, props);

		this._cloneSlides();
	}

	_init() {}

	_initSliderSelectors() {}

	_createSliderDots() {}

	_createSliderButtons() {}

	_createInfinityArrays() {}

	_createSlider() {}

	_render() {}

	_cloneSlides() {
		// nodeList this.slides to array slides
		const slides = [...this.slides];

		// clone first slidesPerScroll items
		const firstClone = slides
			.filter((current, index) => (index < this.slidesPerScroll ? true : false))
			.map((current) => current.cloneNode(true));

		// clone last slidesPerScroll items
		const lastClone = slides
			.filter((current, index) => (index >= slides.length - this.slidesPerScroll ? true : false))
			.map((current) => current.cloneNode(true));

		// reverse lastClone array for correct DOM output
		lastClone.reverse();

		firstClone.forEach((curr) => this.slidesContainer.append(curr));
		lastClone.forEach((curr, i) => this.slidesContainer.prepend(curr));
	}

	reRender() {}

	start() {}

	stop() {}

	nextSlide() {}

	previousSlide() {}

	gotoSlide(index) {}

	destroy() {}
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

	destroy() {}
}

class SliderHorizontal extends Slider {
	constructor(props) {
		super(props);
	}

	start() {}

	stop() {}

	nextSlide() {}

	previousSlide() {}

	gotoSlide(index) {}

	destroy() {}
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
	slidesPerView: 4,
	slidesPerScroll: 4,
	spaceBetween: 20,
	speed: 2000,
});
