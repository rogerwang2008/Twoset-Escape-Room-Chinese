function resizeFont() {
    let resizeElems = document.getElementsByClassName("fontResize");
    let size;
    for (const resizeElem of resizeElems) {
        size = window.getComputedStyle(resizeElem).fontSize;
        console.log(size);
        resizeElem.style.fontSize = (parseInt(size.replace("px", "")) / 1334 * this.width) + "px"
    }
}

resizeFont()
window.onresize = resizeFont