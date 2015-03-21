/*jslint
  nomen: true, indent: 2
*/

/*globals
  $
*/

/*properties
  allBorrow, canDoHorizontal, getLevelDescription, getNextProblem, noBorrow,
  renderNextHorizontalProblem, renderNextVerticalProblem, setLevel, someBorrow,

  _nBlankPosition, _nBorrow, _nDigits, _nFind, _nFractionalDigits, _oRepeats,
  _sFractionalPart1, _sFractionalPart2, _sFractionPartSolution,
  _sWholePart1, _sWholePart2, _sWholePartSolution,

  floor, hasOwnProperty, html, length, pow, random, replace, substr
*/

function Subtraction() {
  'use strict';

  this._nDigits = 0;
  this._nFractionalDigits = 0;
  this._nBorrow = 0;
  this._nFind = 0;
  this._nBlankPosition = 0;

  this._oRepeats = {};

  this._sWholePart1 = '';
  this._sFractionalPart1 = '';
  this._sWholePart2 = '';
  this._sFractionalPart2 = '';
  this._sWholePartSolution = '';
  this._sFractionPartSolution = '';

  this.noBorrow = function (sOperand1, sOperand2) {
    var i;

    for (i = sOperand1.length - 1; i >= 0; i -= 1) {
      if ((+sOperand1[i]) < (+sOperand2[i])) {
        return false;
      }
    }
    return true;
  };

  this.someBorrow = function (sOperand1, sOperand2) {
    var i;

    for (i = sOperand1.length - 1; i > 0; i -= 1) {
      if ((+sOperand1[i]) < (+sOperand2[i])) {
        return true;
      }
    }
    return false;
  };

  this.allBorrow = function (sOperand1, sOperand2) {
    var i;

    // can't borrow from the most significant digit
    for (i = sOperand1.length - 1; i > 0; i -= i) {
      if ((+sOperand1[i]) >= (+sOperand2[i])) {
        return false;
      }
    }
    return true;
  };

  this.getNextProblem = function () {
    var fHappy, sOperand1, sOperand2, sKey, i;

    fHappy = false;
    while (!fHappy) {
      i = Math.pow(10, this._nDigits - 1);
      sOperand1 = String(Math.floor(Math.random() * 9 * i) + i);
      sOperand2 = String(Math.floor(Math.random() * 9 * i) + i);

      if ((+sOperand1) < (+sOperand2)) {
        i = sOperand1;
        sOperand1 = sOperand2;
        sOperand2 = i;
      }

      sKey = '(' + sOperand1 + ')(' + sOperand2 + ')';

      if (this._oRepeats.hasOwnProperty(sKey)) {
        fHappy = false;
      } else {
        this._oRepeats[sKey] = sKey;
        fHappy = true;
      }

      if (fHappy) {
        this._sWholePart1 = sOperand1;
        this._sWholePart2 = sOperand2;

        switch (this._nBorrow) {
        case 1: // No Borrowing
          fHappy = this.noBorrow(sOperand1, sOperand2);
          break;
        case 2: // Some Borrowing
          fHappy = this.someBorrow(sOperand1, sOperand2);
          break;
        case 3: // All Borrowing
          fHappy = this.allBorrow(sOperand1, sOperand2);
          break;
        }
      }

      if (fHappy) {
        if (this._nFind === 2) {
          this._nBlankPosition = Math.floor(Math.random() * 3) + 1;
          this._sWholePartSolution = this._sWholePart1 - this._sWholePart2;
        } else {
          this._nBlankPosition = 3;
          this._sWholePartSolution = '&nbsp;';
        }

        this._sFractionalPart1 = '&nbsp;';
        this._sFractionalPart2 = '&nbsp;';

        if (this._nFractionalDigits > 0) {
          this._sWholePart1 = sOperand1.substr(0, sOperand1.length - this._nFractionalDigits);
          this._sFractionalPart1 = '.' + sOperand1.substr(sOperand1.length - this._nFractionalDigits);
          this._sWholePart2 = sOperand2.substr(0, sOperand2.length - this._nFractionalDigits);
          this._sFractionalPart2 = '.' + sOperand2.substr(sOperand2.length - this._nFractionalDigits);
        }
      }
    }
  };

  this.setLevel = function (nLevel) {
    var nDigitsMin, nDigitsMax, nFindMax, nBorrowMax;

    this._oRepeats = {};

    for (this._nFractionalDigits = 0; this._nFractionalDigits <= 4; this._nFractionalDigits += 1) {
      if (this._nFractionalDigits === 0) {
        nDigitsMin = 1;
        nDigitsMax = 4;
      } else if (this._nFractionalDigits === 2) {
        nDigitsMin = 3;
        nDigitsMax = 5;
      } else {
        nDigitsMin = this._nFractionalDigits + 1;
        nDigitsMax = this._nFractionalDigits + 1;
      }

      for (this._nDigits = nDigitsMin; this._nDigits <= nDigitsMax; this._nDigits += 1) {
        nFindMax = 1;
        if (this._nDigits === 1) {
          nFindMax = 2;
        }

        for (this._nFind = 1; this._nFind <= nFindMax; this._nFind += 1) {
          nBorrowMax = 3;
          if (this._nDigits === 1) {
            nBorrowMax = 1;
          }
          if (this._nDigits === 2) {
            nBorrowMax = 2;
          }

          for (this._nBorrow = 1; this._nBorrow <= nBorrowMax; this._nBorrow += 1) {
            nLevel -= 1;
            if (nLevel === 0) {
              return true;
            }
          }
        }
      }
    }
    return false;
  };

  this.canDoHorizontal = function () {
    return (this._nDigits === 1);
  };

  this.getLevelDescription = function () {
    var sResult;

    sResult = 'Subtraction with ' + this._nDigits + ' digit';
    if (this._nDigits > 1) {
      sResult += 's';
    }

    if (this._nFractionalDigits > 0) {
      sResult += ' (' + this._nFractionalDigits + ' behind the decimal)';
    }

    switch (this._nBorrow) {
    case 1:
      sResult += ' no borrowing';
      break;
    case 2:
      sResult += ' some borrowing';
      break;
    case 3:
      sResult += ' lots of borrowing';
      break;
    }

    if (this._nFind === 2) {
      sResult += ' with missing operands';
    }
    return sResult;
  };

  this.renderNextHorizontalProblem = function (oElement) {
    var sOperand1, sOperand2, sAnswer, sLine;

    this.getNextProblem();

    sOperand1 = this._sWholePart1;
    sOperand2 = this._sWholePart2;
    sAnswer = this._sWholePartSolution;
    sLine = $('#blankline').html();

    switch (this._nBlankPosition) {
    case 1:
      sOperand1 = sLine;
      break;
    case 2:
      sOperand2 = sLine;
      break;
    case 3:
      sAnswer = sLine;
      break;
    }

    $(oElement).html($('#horizontalproblem').html()
      .replace('{{wpop1}}', sOperand1)
      .replace('{{wpop2}}', sOperand2)
      .replace('{{op}}', '&minus;')
      .replace('{{wpans}}', sAnswer));
  };

  this.renderNextVerticalProblem = function (oElement) {
    this.getNextProblem();

    $(oElement).html($('#verticalproblem').html()
      .replace('{{wpop1}}', this._sWholePart1)
      .replace('{{fpop1}}', this._sFractionalPart1)
      .replace('{{op}}', '&minus;')
      .replace('{{wpop2}}', this._sWholePart2)
      .replace('{{fpop2}}', this._sFractionalPart2)
      .replace('{{wpans}}', this._sWholePartSolution)
      .replace('{{fpans}}', this._sFractionPartSolution));
  };
}
