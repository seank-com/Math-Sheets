/*jslint
  nomen: true, indent: 2
*/

/*globals
  $
*/

/*properties
  canDoHorizontal, getLevelDescription,
  renderNextHorizontalProblem, renderNextVerticalProblem,
  setLevel,

  floor, hasOwnProperty, html, length, pow, random, replace, substr
*/

function createMultiplicationManager() {
  'use strict';

  var _digits1 = 0,
    _digits2 = 0,
    _fractionalDigits = 0,
    _find = 0,
    _blankPosition = 0,
    _repeats = {},
    _wholePart1 = '',
    _fractionalPart1 = '',
    _wholePart2 = '',
    _fractionalPart2 = '',
    _wholePartSolution = '',
    _fractionPartSolution = '',
    _getNextProblem = function () {
      var happy = false,
        operand1 = '',
        operand2 = '',
        key = '',
        i = 0;

      while (!happy) {
        i = Math.pow(10, _digits1 - 1);
        operand1 = String(Math.floor(Math.random() * 9 * i) + i);
        i = Math.pow(10, _digits2 - 1);
        operand2 = String(Math.floor(Math.random() * 9 * i) + i);

        key = '(' + operand1 + ')(' + operand2 + ')';

        if (_repeats.hasOwnProperty(key)) {
          happy = false;
        } else {
          _repeats[key] = key;
          happy = true;

          _wholePart1 = operand1;
          _wholePart2 = operand2;

          if (_find === 2) {
            _blankPosition = Math.floor(Math.random() * 3) + 1;
            _wholePartSolution = +_wholePart1 * +_wholePart2;
          } else {
            _blankPosition = 3;
            _wholePartSolution = " ";
          }

          _fractionalPart1 = "&nbsp;";
          _fractionalPart2 = "&nbsp;";

          if (_fractionalDigits > 0) {
            _wholePart1 = operand1.substr(0, operand1.length - _fractionalDigits);
            _fractionalPart1 = '.' + operand1.substr(operand1.length - _fractionalDigits);
            _wholePart2 = operand2.substr(0, operand2.length - _fractionalDigits);
            _fractionalPart2 = '.' + operand2.substr(operand2.length - _fractionalDigits);
          }
        }
      }
    };

  return {
    setLevel: function (nLevel) {
      var digitsMin = 0,
        digitsMax = 0,
        findMax = 0;

      _repeats = {};

      for (_fractionalDigits = 0; _fractionalDigits <= 4; _fractionalDigits += 1) {
        if (_fractionalDigits === 0) {
          digitsMin = 1;
          digitsMax = 4;
        } else if (_fractionalDigits === 2) {
          digitsMin = 3;
          digitsMax = 5;
        } else {
          digitsMin = _fractionalDigits + 1;
          digitsMax = _fractionalDigits + 1;
        }

        for (_digits1 = digitsMin; _digits1 <= digitsMax; _digits1 += 1) {
          for (_digits2 = _fractionalDigits + 1; _digits2 <= _digits1; _digits2 += 1) {
            findMax = 1;
            if (_digits1 === 1) {
              findMax = 2;
            }

            for (_find = 1; _find <= findMax; _find += 1) {
              nLevel -= 1;
              if (nLevel === 0) {
                return true;
              }
            }
          }
        }
      }
      return false;
    },
    canDoHorizontal: function () {
      return (_digits1 === 1);
    },
    getLevelDescription: function () {
      var result = '';

      result = 'Multiplication of ' + _digits1 + ' digit numbers with ' + _digits2 + ' digit numbers';
      if (_fractionalDigits > 0) {
        result += ' (' + _fractionalDigits + ' behind the decimal)';
      }

      if (_find === 2) {
        result += ' with missing operands';
      }

      return result;
    },
    renderNextHorizontalProblem: function (element) {
      var operand1 = '',
        operand2 = '',
        answer = '',
        line = '';

      _getNextProblem();

      operand1 = _wholePart1;
      operand2 = _wholePart2;
      answer = _wholePartSolution;
      line = $('#blankline').html();

      switch (_blankPosition) {
      case 1:
        operand1 = line;
        break;
      case 2:
        operand2 = line;
        break;
      case 3:
        answer = line;
        break;
      }

      $(element).html($('#horizontalproblem').html()
        .replace('{{wpop1}}', operand1)
        .replace('{{wpop2}}', operand2)
        .replace('{{op}}', '&times;')
        .replace('{{wpans}}', answer));
    },
    renderNextVerticalProblem: function (element) {

      _getNextProblem();

      $(element).html($('#verticalproblem').html()
        .replace('{{wpop1}}', _wholePart1)
        .replace('{{fpop1}}', _fractionalPart1)
        .replace('{{op}}', '&times;')
        .replace('{{wpop2}}', _wholePart2)
        .replace('{{fpop2}}', _fractionalPart2)
        .replace('{{wpans}}', _wholePartSolution)
        .replace('{{fpans}}', _fractionPartSolution));
    }
  };
}
