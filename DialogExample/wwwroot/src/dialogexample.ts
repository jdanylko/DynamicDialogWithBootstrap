import { HappiestDialogService } from "./HappiestDialogService";
import { ready } from "./common";

class App {

    private modal: Element = document.getElementById('happiest-dialog');
    private service: HappiestDialogService = new HappiestDialogService();

    constructor() {
        this.modal.addEventListener('shown.bs.modal', () => {
            this.service.getHappiestComponent()
            .then((data) => {
                this.modal.getElementsByClassName("modal-body")[0].innerHTML = data;
            })
        })
    }
}

ready(() => new App())