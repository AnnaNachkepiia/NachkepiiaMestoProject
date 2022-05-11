export class Section {
    constructor({ items, renderer }, container) {
        this._items = items;
        this._renderer = renderer;
        this._cardsContainer = container;
    }


    addItem(element) {
        this._cardsContainer.prepend(element);
    }

    renderElements() {
        this._items.forEach((item) => {
            this._renderer(item);
        });
    }
}