window.addEventListener('load', () => {
    let emptyItems = document.querySelectorAll('.emptyItem')
    let keyPadItems = document.querySelectorAll('.keypad__item')

    emptyItems.forEach(x => x.addEventListener('click', emptyItemHandler))
    keyPadItems.forEach(x => x.addEventListener('click', keyPadHandler))

    function emptyItemHandler() {
        emptyItems.forEach( x => x.classList.remove('selected'))
        this.classList.add('selected')
    }

    function keyPadHandler(){
        let selection;
        if(selection = document.querySelector('.selected')){
            selection.textContent = this.textContent;
        }
    }
})