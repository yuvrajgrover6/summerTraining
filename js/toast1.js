const Toast = {
    init() {
        this.hideTimeout = null;
        this.el = document.createElement("div");
        this.el.className = "toast";
        document.getElementById("toastHere1").appendChild(this.el);
        console.log("toast init");
    },

    show(message1, message2, state) {
        clearTimeout(this.hideTimeout);
        this.el.innerHTML = `${message1}<br>${message2}`;
        this.el.className = "toast toast-visible";

        if (state) {
            this.el.classList.add(`toast-${state}`);
        }
        this.hideTimeout = setTimeout(() => {
            this.el.classList.remove("toast-visible");
        }, 3000);
    },
};

document.addEventListener("DOMContentLoaded", () => Toast.init());