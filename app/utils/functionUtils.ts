export function debounce(func, wait, immediate) {
	if (!func) {
		return null;
	}
	let timeout;
	const newFunc = function():any {
		const context = this, args = arguments;
		const later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) {
            func.apply(context, args);
        }
	};
	const cancel = function() {
		clearTimeout(timeout);
	}
	
	return {
		newFunc,
		cancel
	}
};