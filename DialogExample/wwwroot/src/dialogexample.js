import { HappiestDialogService } from "./HappiestDialogService";
import { ready } from "./common";
class App {
    constructor() {
        this.modal = document.getElementById('happiest-dialog');
        this.service = new HappiestDialogService();
        this.modal.addEventListener('shown.bs.modal', () => {
            this.service.getHappiestComponent()
                .then((data) => {
                this.modal.getElementsByClassName("modal-body")[0].innerHTML = data;
            });
        });
    }
}
ready(() => new App());
