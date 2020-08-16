class Solver {
    board;
    originalBoard;

    boardSize;
    boxSize;

    boardRows;
    boardColumns;
    boardBoxes;

    questionsCount;
    solvedCount=0;
    isBoardSolved = false;

    emptiesObject = {};
    singlesObject = {};
    backTrackObject = {};

    constructor(_board) {
        this.board = _board;
        this.originalBoard = copyBoard(_board);

        this.boardSize = _board.length;
        this.boxSize = parseInt(Math.sqrt(this.boardSize))

        this.init3arrays()
        this.questionsCount = this.findQuestionsCount();
        this.solvedCount = 0;

        this.initEmptiesObject()
        this.singlesFinder()
    }

    initEmptiesObject() {
        let emptyObjectCounter = 0;
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {

                if (this.board[row][col] == 0) {

                    let boxNumber = getBoxNumber(row, col, this.boxSize);
                    this.emptiesObject[`${emptyObjectCounter}`] = {
                        row: row,
                        col: col,
                        box: boxNumber,
                        currentValue: 0,
                        possibleValues: [],
                        possibleIdx: null,
                        isSingle: null,
                        solved: false
                    }

                    emptyObjectCounter++;
                }
            }
        }

        if (emptyObjectCounter != this.questionsCount) {
            console.log("Error in intEmptiesObject: questionsCount and empty object count doesn't match");
        }
    }


    //################################ Singles Finder START

    // the below function is not being used and is replaced by singlesFinder
    createSinglesObject() {
        let singlesCounter = 0;

        for (let idx = 0; idx < Object.keys(this.emptiesObject).length; idx++) {

            let obj = this.emptiesObject[idx];
            let isSingleFilled = this.findSinglesFromObject(obj);
            if (isSingleFilled > 0) {
                this.singlesObject[singlesCounter] = obj;
                singlesCounter++
            }
        }

        // write values to board
        if (singlesCounter > 0) {
            this.solvedCount = singlesCounter;
            this.writeToBoard(this.singlesObject)
            view.printBoard(this.board)
        }

        // is board solved
        if (this.solvedCount == this.questionsCount) {
            this.isBoardSolved = true;
            console.log("Board Solved: createSinglesObject attempt 1");
        }else{
            this.singlesFinder()
        }

    }

    singlesFinder() {
        let valuesFilledCounter;

        do {
            valuesFilledCounter = 0;

            for (let idx in this.emptiesObject) {
                let obj = this.emptiesObject[idx]
                if (!obj.solved) {
                    let isSingleFilled = this.findSinglesFromObject(obj);
                    if (isSingleFilled > 0) {
                        this.singlesObject[valuesFilledCounter] = obj;
                        valuesFilledCounter++;
                    }
                }
            }


            // write values to board
            if (valuesFilledCounter > 0) {
                this.solvedCount += valuesFilledCounter;
                this.writeToBoard(this.singlesObject)
                view.printBoard(this.board)                
            }
        } while (valuesFilledCounter > 0);

        // is board solved
        if (this.solvedCount == this.questionsCount) {
            this.isBoardSolved = true;
            console.log("Board Solved: singlesFInder attempt 1");
            //validate the board
            let isSolutionValid = this.boardValidation()
            if(isSolutionValid) console.log('Solution board is a valid sudoku');
        }
    }

    findSinglesFromObject(obj) {
        let valueFilled = 0;
        let { row, col, box } = obj;
        let isSingle = this.checkIfSingle(row, col, box);
        if (isSingle > 0) {
            valueFilled = isSingle;

            obj.isSingle = true;
            obj.solved = true;
            obj.currentValue = isSingle;
            obj.possibleValues.push(isSingle)
            obj.possibleIdx = 0;
        }

        return valueFilled;
    }

    checkIfSingle(row, col, box) {
        let possible = Array.from({
            length: boardSize
        }, (val, idx) => idx + 1)
        let rowValues = [...new Set(this.boardRows[row])]
        let colValues = [...new Set(this.boardColumns[col])]
        let boxValues = [...new Set(this.boardBoxes[box])]
        let existigValues = [...new Set(rowValues.concat(colValues).concat(boxValues))]
        removeInArrayValue(existigValues, 0);

        for (let item of existigValues) removeInArrayValue(possible, item);

        return possible.length == 1 ? possible[0] : 0;
    }

    //################################ Singles Finder END

    writeToBoard(_obj) {
        let objLen = Object.keys(_obj).length;
        for (let i = 0; i < objLen; i++) {
            let obj = _obj[i];
            this.board[obj.row][obj.col] = obj.currentValue;
        }
        this.init3arrays()
    }


    init3arrays() {
        this.boardRows = this.board;
        this.boardColumns = generateColumnArray(this.board)
        this.boardBoxes = generateBoxArray(this.board, this.boardSize)
    }

    findQuestionsCount() {
        return parseInt(Math.pow(this.boardSize, 2)) - this.board.reduce((a, b) => a + (b.filter(x => x > 0).length), 0)
    }

    boardValidation(){
        let resultValidator = new Validate(this.board,this.boardSize);
        return resultValidator.runTests()
    }

}