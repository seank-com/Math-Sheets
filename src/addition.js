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

function createAdditionManager() {
  'use strict';

  var _digits = 0,
    _fractionalDigits = 0,
    _carry = 0,
    _find = 0,
    _blankPosition = 0,
    _repeats = {},
    _wholePart1 = '',
    _fractionalPart1 = '',
    _wholePart2 = '',
    _fractionalPart2 = '',
    _wholePartSolution = '',
    _fractionPartSolution = '',
    _noCarry = function (operand1, operand2) {
      var i;

      for (i = operand1.length - 1; i >= 0; i -= 1) {
        if ((+operand1[i]) + (+operand2[i]) > 9) {
          return false;
        }
      }
      return true;
    },
    _someCarry = function (operand1, operand2) {
      var i;

      for (i = operand1.length - 1; i >= 0; i -= 1) {
        if ((+operand1[i]) + (+operand2[i]) > 9) {
          return true;
        }
      }
      return false;
    },
    _allCarry = function (operand1, operand2) {
      var i;

      for (i = operand1.length - 1; i >= 0; i -= 1) {
        if ((+operand1[i]) + (+operand2[i]) < 10) {
          return false;
        }
      }
      return true;
    },
    _getNextProblem = function () {
      var happy = false,
        operand1 = '',
        operand2 = '',
        key = '',
        i = 0;

      while (!happy) {
        i = Math.pow(10, _digits - 1);
        operand1 = String(Math.floor(Math.random() * 9 * i) + i);
        operand2 = String(Math.floor(Math.random() * 9 * i) + i);

        key = '(' + operand1 + ')(' + operand2 + ')';

        if (_repeats.hasOwnProperty(key)) {
          happy = false;
        } else {
          _repeats[key] = key;
          happy = true;
        }

        if (happy) {
          _wholePart1 = operand1;
          _wholePart2 = operand2;

          switch (_carry) {
          case 1: // No Carry
            happy = _noCarry(operand1, operand2);
            break;
          case 2: // Somce Carry
            if (_digits === 1) {
              happy = true;
            } else {
              happy = _someCarry(operand1, operand2);
            }
            break;
          case 3: // All Carry
            happy = _allCarry(operand1, operand2);
            break;
          }
        }

        if (happy) {
          if (_find === 2) {
            _blankPosition = Math.floor(Math.random() * 3) + 1;
            _wholePartSolution = (+_wholePart1) + (+_wholePart2);
            _fractionPartSolution = '&nbsp;';
          } else {
            _blankPosition = 3;
            _wholePartSolution = '&nbsp;';
            _fractionPartSolution = '&nbsp;';
          }

          _fractionalPart1 = '&nbsp;';
          _fractionalPart2 = '&nbsp;';

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
    setLevel: function (level) {
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

        for (_digits = digitsMin; _digits <= digitsMax; _digits += 1) {
          findMax = 1;
          if (_digits === 1) {
            findMax = 2;
          }

          for (_find = 1; _find <= findMax; _find += 1) {
            for (_carry = 1; _carry <= 3; _carry += 1) {
              level -= 1;
              if (level === 0) {
                return true;
              }
            }
          }
        }
      }
      return false;
    },
    canDoHorizontal: function () {
      return (_digits === 1);
    },
    getLevelDescription: function () {
      var result = 'Addition with ' + _digits + ' digit';

      if (_digits > 1) {
        result += 's ';
      } else {
        result += ' ';
      }

      if (_fractionalDigits > 0) {
        result += '(' + _fractionalDigits + ' behind the decimal) ';
      }

      if (_digits === 1) {
        switch (_carry) {
        case 1:
          result += 'no 2 digit results ';
          break;
        case 2:
          result += 'some 2 digit results ';
          break;
        case 3:
          result += 'all 2 digit results ';
          break;
        }
      } else {
        switch (_carry) {
        case 1:
          result += 'no carrying ';
          break;
        case 2:
          result += 'some carrying ';
          break;
        case 3:
          result += 'lots of carrying ';
          break;
        }
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
        .replace('{{op}}', '+')
        .replace('{{wpans}}', answer));
    },
    renderNextVerticalProblem: function (element) {
      _getNextProblem();

      $(element).html($('#verticalproblem').html()
        .replace('{{wpop1}}', _wholePart1)
        .replace('{{fpop1}}', _fractionalPart1)
        .replace('{{op}}', '+')
        .replace('{{wpop2}}', _wholePart2)
        .replace('{{fpop2}}', _fractionalPart2)
        .replace('{{wpans}}', _wholePartSolution)
        .replace('{{fpans}}', _fractionPartSolution));
    }
  };
}
