window.addEventListener('load', () => {
    initActions()
})

function initActions(){
    let emptyItems = document.querySelectorAll('.emptyItem')
    let keyPadItems = document.querySelectorAll('.keypad__item')
    let submitButton = document.querySelector('#header__submit')
    let body = document.querySelector('body')
    let selection;


    emptyItems.forEach(x => x.addEventListener('click', emptyItemHandler))
    keyPadItems.forEach(x => x.addEventListener('click', keyPadHandler))
    submitButton.addEventListener('click', submitHandler)
    body.addEventListener('keyup', keyUpHandler)

    function emptyItemHandler() {
        emptyItems.forEach(x => x.classList.remove('selected'))
        this.classList.add('selected')
    }

    function keyPadHandler() {
        if (selection = document.querySelector('.selected')) {
            selection.textContent = this.textContent;
            let x = selection.id[0];
            let y = selection.id[1];
            board.board[x][y] = this.textContent == "" ? 0 : parseInt(this.textContent)
        }
    }

    function submitHandler() {
        let validater = new Validate(board.board, boardSize)
        let isValid = validater.runTests();
        console.log("brother the board is :", isValid);
    }

    function keyUpHandler(event) {
        if (selection = document.querySelector('.selected')) {
            let k = event.keyCode;
            if (((k < 46 || k > 57) && (k < 96 || k > 105)) || k == 47) {
                //not a number        
            } else {
                selection.textContent = event.keyCode == 46 ? "" : event.key;
                let x = selection.id[0];
                let y = selection.id[1];
                board.board[x][y] = event.keyCode == 46 ? 0 : parseInt(event.key)
            }
        }

    }
}