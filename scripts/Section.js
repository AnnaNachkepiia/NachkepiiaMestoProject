class Section {
    constructor({ data, renderer }, containerSelector) {
        this._items = data;
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
    }
    addItem(element) {
        this._containerSelector.append(element);
    }

    renderElements() {
        this._items.forEach(item => {
            this._renderer(item);
        });
    }
}