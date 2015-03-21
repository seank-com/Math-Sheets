/*jslint
  nomen: true, indent: 2
*/

/*globals
  $
*/

/*properties
  canDoHorizontal, getLevelDescription, getNextProblem,
  renderNextHorizontalProblem, renderNextVerticalProblem, setLevel,

  _nBlankPosition, _nDigitsDivisor, _nDigitsQuotient, _nRemainder, _nFind,
  _oRepeats, _sDividend, _sDivisor, _sQuotient, _sRemainder,

  floor, hasOwnProperty, html, pow, random, replace
*/

function Division() {
  'use strict';

  this._nDigitsQuotient = 0;
  this._nDigitsDivisor = 0;
  this._nRemainder = 0;
  this._nFind = 0;
  this._nBlankPosition = 0;

  this._oRepeats = {};

  this._sQuotient = '';
  this._sDivisor = '';
  this._sDividend = '';
  this._sRemainder = '';

  this.getNextProblem = function () {
    var fHappy, sKey, i;

    fHappy = false;
    while (!fHappy) {
      i = Math.pow(10, this._nDigitsQuotient - 1);
      this._sQuotient = String(Math.floor(Math.random() * 9 * i) + i);
      i = Math.pow(10, this._nDigitsDivisor - 1);
      this._sDivisor = String(Math.floor(Math.random() * 9 * i) + i);

      if (this._nRemainder === 2) {
        this._sRemainder = String(Math.floor(Math.random() * (+this._sDivisor - 1) + 1));
      } else {
        this._sRemainder = '0';
      }

      this._sDividend = String(((+this._sQuotient) * (+this._sDivisor)) + (+this._sRemainder));

      sKey = '(' + this._sQuotient + ')(' + this._sDivisor + ')';

      if (this._oRepeats.hasOwnProperty(sKey)) {
        fHappy = false;
      } else {
        this._oRepeats[sKey] = sKey;
        fHappy = true;

        if (this._nFind === 2) {
          this._nBlankPosition = Math.floor(Math.random() * 3) + 1;
        } else {
          this._nBlankPosition = 3;
        }
      }
    }
  };

  this.setLevel = function (nLevel) {
    var nFindMax, nRemainderMax;

    this._oRepeats = {};

    for (this._nDigitsQuotient = 1; this._nDigitsQuotient <= 3; this._nDigitsQuotient += 1) {
      for (this._nDigitsDivisor = 1; this._nDigitsDivisor <= 2; this._nDigitsDivisor += 1) {
        nFindMax = 1;
        if (this._nDigitsQuotient === 1 && this._nDigitsDivisor === 1) {
          nFindMax = 2;
        }

        for (this._nFind = 1; this._nFind <= nFindMax; this._nFind += 1) {
          nRemainderMax = 2;
          if (this._nDigitsQuotient === 1 && this._nDigitsDivisor === 1) {
            nRemainderMax = 1;
          }

          for (this._nRemainder = 1; this._nRemainder <= nRemainderMax; this._nRemainder += 1) {
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
    return (this._nDigitsQuotient === 1 && this._nDigitsDivisor === 1);
  };

  this.getLevelDescription = function () {
    var sResult;

    sResult = 'Division with ' + this._nDigitsQuotient + ' digit quotients and ' + this._nDigitsDivisor + ' digit divisors';
    if (this._nRemainder === 2) {
      sResult += ' with remainders';
    }

    if (this._nFind === 2) {
      sResult += ' with missing operands';
    }

    return sResult;
  };

  this.renderNextHorizontalProblem = function (oElement) {
    var sOperand1, sOperand2, sAnswer, sLine;

    this.getNextProblem();

    sOperand1 = this._sDividend;
    sOperand2 = this._sDivisor;
    sAnswer = this._sQuotient;
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
      .replace('{{op}}', '&divide;')
      .replace('{{wpans}}', sAnswer));
  };

  this.renderNextVerticalProblem = function (oElement) {

    this.getNextProblem();

    $(oElement).html($('#longdivisionproblem').html()
      .replace('{{divisor}}', this._sDivisor)
      .replace('{{dividend}}', this._sDividend));
  };
}
