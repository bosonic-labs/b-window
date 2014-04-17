(function () {
    var BWindowPrototype = Object.create(BDialog.prototype, {
            createdCallback: {
                enumerable: true,
                value: function () {
                    this._super.createdCallback.call(this);
                    this.closeButton = this.shadowRoot.querySelector('.b-window-header-close');
                    this.closeButtonListener = this.close.bind(this);
                    this.closeButton.addEventListener('click', this.closeButtonListener, false);
                }
            }
        });
    window.BWindow = document.registerElement('b-window', { prototype: BWindowPrototype });
    Object.defineProperty(BWindow.prototype, '_super', {
        enumerable: false,
        writable: false,
        configurable: false,
        value: BDialog.prototype
    });
    Object.defineProperty(BWindowPrototype, 'template', {
        get: function () {
            var fragment = document.createDocumentFragment();
            var div = fragment.appendChild(document.createElement('div'));
            div.innerHTML = ' <style> div.b-window-wrapper { display:block; width:auto; position:relative; } div.b-window-header { background: lightblue; position: relative; } span.b-window-header-close { position: absolute; top: 4px; right: 3px; } span.b-window-header-close:before { content: "X"; cursor: pointer; } </style> <div class="b-window-wrapper"> <div class="b-window-header"> <content select="h3">Default title</content> <span class="b-window-header-close"></span> </div> <div class="b-window-content"> <content></content> </div> </div> ';
            while (child = div.firstChild) {
                fragment.insertBefore(child, div);
            }
            fragment.removeChild(div);
            return { content: fragment };
        }
    });
}());