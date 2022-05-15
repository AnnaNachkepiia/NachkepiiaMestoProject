export class Section {
    constructor({ renderer }, container) {
        // this._items = items;
        this._renderer = renderer;
        this._cardsContainer = container;
    }


    addItem(element) {
        this._cardsContainer.prepend(element);
    }

    renderItems = (items) => {
        items.forEach((item) => this._renderer(item));
    }
}