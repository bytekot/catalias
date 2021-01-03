export class Base {
    constructor() {
        this.destination = 'app-container';
    }

    render() {
        document.getElementById(this.destination).insertAdjacentHTML('beforeend', this.template.join(''));
    }

    addListener(elementId, eventName, listener) {
        document.getElementById(elementId).addEventListener(eventName, this[listener].bind(this), false);
    }

    setText(elementId, text) {
        document.getElementById(elementId).textContent = text;
    }

    addClass(elementId, className) {
        document.getElementById(elementId).classList.add(className);
    }

    removeClass(elementId, className) {
        document.getElementById(elementId).classList.remove(className);
    }

    getFieldValue(elementId) {
        return document.getElementById(elementId).getAttribute('value');
    }

    destroy() {
        let element = document.getElementById(this.elementId);
        element.parentNode.removeChild(element);
    }
}
