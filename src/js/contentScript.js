import "../css/contentStyles.css";


class TranslationPopup {
    constructor(selection) {
        this.selection = selection;

        if (this.selection.selectedText) {

            this.popup = this.createPopup();

            this.fetchTranslation(this.selection.selectedText);

            this.setCoordinates();

            this.registerDestroy();
        }
    }

    show() {
        this.popup.classList.add('shown');
    }

    hide() {
        this.popup.classList.remove('shown');
    }

    createPopup() {
        var popup = document.createElement("div");   
        popup.classList.add("translationPopup");
        popup.innerHTML = "";

        // do somethin with it
        const body = document.getElementsByTagName('body')[0];
        body.appendChild(popup);

        return popup;
    }

    setCoordinates() {
        let oRange = document.getSelection().getRangeAt(0); //get the text range
        let oRect = oRange.getBoundingClientRect();

        let bodyRect = document.body.getBoundingClientRect();

        this.popup.style["top"] =  (oRect.top - bodyRect.top - 160) +'px';
        this.popup.style["left"] = (oRect.left - bodyRect.left)+'px';

    }

    registerDestroy() {
        document.onmousedown = (e) => {
            this.popup.parentNode.removeChild(this.popup);
            delete this;
        }
    }

    pushData(translation) {
        this.translation = translation;
        this.popup.innerText = translation;

        this.show(); // move it
    }

    fetchTranslation(word) {
         chrome.runtime.sendMessage(
             {contentScriptQuery: "queryWord", word: word},
             (response) => {
                 for (let result of response.results) {
                     let translation = result.lexicalEntries[0].
                         entries[0].senses[0].definitions[0];

                     // deal with it later
                     this.pushData(translation);
                 }
         });
    }
}


class Selection {
    constructor() {
        this.selectedText = this.getSelectionText();
        this.anchor = window.getSelection().anchorNode.parentNode;
    }

    getSelectionText() {
        var text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text;
        }
        return text;
    }
}


document.onmouseup = function(e) {

    let selection = new Selection();
    let popup = new TranslationPopup(selection);

}





