class Digger {
    level
    holesCount;
    board;
    board_transpose;
    boardSize;
    levels = [
        [
            [4, 6],
            [8,9],
            [10, 11]
        ],
        [
            [32, 45],
            [46, 49],
            [54, 59]
        ]
    ];
    rowColumn_MinCount = [
        [
            [2],
            [1],
            [1]
        ],
        [
            [4, 8],
            [3, 6],
            [1, 4]
        ]
    ];

    constructor(_level, _board, _boardSize) {
        this.level = _level
        this.board = _board;
        this.boardSize = _boardSize;
        let LevelSelector = _boardSize == 9 ? 1 : 0;
        this.holesCount = this.random(this.levels[LevelSelector][_level][1], this.levels[LevelSelector][_level][0])
        this.randomDig(this.holesCount)
    }

    random(max, min = 0) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    randomDig(howMany) {
        
        while (howMany > 0) {
            let row = this.random(this.boardSize - 1)
            let col = this.random(this.boardSize - 1)

            //row min checker
            let rowMinCount = this.board[row].filter(x => x > 0);
            let LevelSelector = this.boardSize == 9 ? 1 : 0;
            let min = this.rowColumn_MinCount[LevelSelector][this.level][0];
            while (rowMinCount.length == min) {
                //console.log("Maximum digs complete in row: ", row);
                row = this.random(this.boardSize - 1)
                rowMinCount = this.board[row].filter(x => x > 0);
            }
            //col min 

            if (this.board[row][col] != 0) {
                this.board[row][col] = 0;
                howMany--;
            }

        }
    }

    symmetricalDig(howMany) {
        this.board_transpose = transposeBoard(this.board, this.boardSize, 'positions')

        let row = this.random(this.boardSize - 1)
        let col = this.random(this.boardSize - 1)
        let row_t = this.board_transpose[row][col][0]
        let col_t = this.board_transpose[row][col][1]

        if (row == col) {
            row_t = (this.boardSize - 1) - row
            col_t = (this.boardSize - 1) - col
        }

        this.board[row][col] = 0;
        this.board[row_t][col_t] = 0;

        console.table(this.board);
    }


}