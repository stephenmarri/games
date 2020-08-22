"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var View =
/*#__PURE__*/
function () {
  function View() {
    _classCallCheck(this, View);
  }

  _createClass(View, [{
    key: "createBoardHTML",
    value: function createBoardHTML(size) {
      this.changeGridCSS(size); //board

      var boardElement = document.querySelector('#board');
      var html = '';

      for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
          var id = String(i) + String(j);
          var setSize = parseInt(Math.sqrt(size));
          var set__row = (i + 1) % setSize == 0 ? "set__row" : "";
          var set__col = (j + 1) % setSize == 0 ? "set__col" : "";
          var item = "<div id='".concat(id, "' data-row='").concat(i, "' class=\"grid__item flex-col ").concat(set__row, " ").concat(set__col, "\">").concat(j + 1, "</div>");
          html += item;
        }
      }

      boardElement.innerHTML = html; //keypad

      var keypad = document.querySelector('#keypad');
      html = '';

      for (var _i = 0; _i < size; _i++) {
        html += "<span class=\"flex-col keypad__item\">".concat(_i + 1, "</span>");
      }

      html += "<span class=\"flex-col keypad__item\"><img src=\"../images/trash-o.svg\" alt=\"\"></span>";
      keypad.innerHTML = html;
    }
  }, {
    key: "printBoard",
    value: function printBoard(board) {
      var size = board.length;

      for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
          var element = document.getElementById("".concat(i).concat(j));
          element.textContent = board[i][j] > 0 ? board[i][j] : " ";
          var given = board[i][j] > 0 ? "given " : "emptyItem ";
          element.classList.add(given.replace(" ", ''));
        }
      }
    }
  }, {
    key: "changeGridCSS",
    value: function changeGridCSS(size) {
      var temp = "auto ".repeat(size);
      var boardElement = document.querySelector('#board');
      boardElement.style.gridTemplateColumns = temp;
      boardElement.style.gridTemplateRows = temp;
      boardElement.style.fontSize = size == 4 ? "2.25rem" : "1rem";
    }
  }, {
    key: "solverStartMenuOptionsToggler",
    value: function solverStartMenuOptionsToggler() {
      var except = ["solver", "solvermenu", "solverstop"];
      var allMenuItems = document.querySelectorAll('#dotMenu div');
      allMenuItems.forEach(function (item) {
        if (except.includes(item.id.toString().toLowerCase())) return;
        item.classList.toggle('solverDisable');
      });
    }
  }]);

  return View;
}();