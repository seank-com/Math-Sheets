/*jslint
  nomen: true, indent: 2
*/

/*globals
  $
*/

/*properties
  canDoHorizontal, getLevelDescription, getNextProblem, hasOwnProperty,
  renderNextHorizontalProblem, renderNextVerticalProblem, setLevel,

  _nBlankPosition, _nDigits1, _nDigits2, _nFind, _nFractionalDigits, _oRepeats,
  _sFractionalPart1, _sFractionalPart2, _sFractionPartSolution,
  _sWholePart1, _sWholePart2, _sWholePartSolution,

  floor, html, length, pow, random, replace, substr
*/

function Multiplication() {
  'use strict';

  this._nDigits1 = 0;
  this._nDigits2 = 0;
  this._nFractionalDigits = 0;
  this._nFind = 0;
  this._nBlankPosition = 0;

  this._oRepeats = {};

  this._sWholePart1 = '';
  this._sFractionalPart1 = '';
  this._sWholePart2 = '';
  this._sFractionalPart2 = '';
  this._sWholePartSolution = '';
  this._sFractionPartSolution = '';

  this.getNextProblem = function () {
    var fHappy, sOperand1, sOperand2, sKey, i;

    fHappy = false;
    while (!fHappy) {
      i = Math.pow(10, this._nDigits1 - 1);
      sOperand1 = String(Math.floor(Math.random() * 9 * i) + i);
      i = Math.pow(10, this._nDigits2 - 1);
      sOperand2 = String(Math.floor(Math.random() * 9 * i) + i);

      sKey = '(' + sOperand1 + ')(' + sOperand2 + ')';

      if (this._oRepeats.hasOwnProperty(sKey)) {
        fHappy = false;
      } else {
        this._oRepeats[sKey] = sKey;
        fHappy = true;

        this._sWholePart1 = sOperand1;
        this._sWholePart2 = sOperand2;

        if (this._nFind === 2) {
          this._nBlankPosition = Math.floor(Math.random() * 3) + 1;
          this._sWholePartSolution = +this._sWholePart1 * +this._sWholePart2;
        } else {
          this._nBlankPosition = 3;
          this._sWholePartSolution = " ";
        }

        this._sFractionalPart1 = "&nbsp;";
        this._sFractionalPart2 = "&nbsp;";

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
    var nDigitsMin, nDigitsMax, nFindMax;

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

      for (this._nDigits1 = nDigitsMin; this._nDigits1 <= nDigitsMax; this._nDigits1 += 1) {
        for (this._nDigits2 = this._nFractionalDigits + 1; this._nDigits2 <= this._nDigits1; this._nDigits2 += 1) {
          nFindMax = 1;
          if (this._nDigits1 === 1) {
            nFindMax = 2;
          }

          for (this._nFind = 1; this._nFind <= nFindMax; this._nFind += 1) {
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
    return (this._nDigits1 === 1);
  };

  this.getLevelDescription = function () {
    var sResult;

    sResult = 'Multiplication of ' + this._nDigits1 + ' digit numbers with ' + this._nDigits2 + ' digit numbers';
    if (this._nFractionalDigits > 0) {
      sResult += ' (' + this._nFractionalDigits + ' behind the decimal)';
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
      .replace('{{op}}', '&times;')
      .replace('{{wpans}}', sAnswer));
  };

  this.renderNextVerticalProblem = function (oElement) {

    this.getNextProblem();

    $(oElement).html($('#verticalproblem').html()
      .replace('{{wpop1}}', this._sWholePart1)
      .replace('{{fpop1}}', this._sFractionalPart1)
      .replace('{{op}}', '&times;')
      .replace('{{wpop2}}', this._sWholePart2)
      .replace('{{fpop2}}', this._sFractionalPart2)
      .replace('{{wpans}}', this._sWholePartSolution)
      .replace('{{fpans}}', this._sFractionPartSolution));
  };
}
