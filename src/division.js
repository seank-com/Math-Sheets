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

  floor, hasOwnProperty, html, pow, random, replace
*/

function createDivisionManager() {
  'use strict';

  var _digitsQuotient = 0,
    _digitsDivisor = 0,
    _remainderSetting = 0,
    _find = 0,
    _blankPosition = 0,
    _repeats = {},
    _quotient = '',
    _divisor = '',
    _dividend = '',
    _remainder = '',
    _getNextProblem = function () {
      var happy = false,
        key = '',
        i = 0;

      while (!happy) {
        i = Math.pow(10, _digitsQuotient - 1);
        _quotient = String(Math.floor(Math.random() * 9 * i) + i);
        i = Math.pow(10, _digitsDivisor - 1);
        _divisor = String(Math.floor(Math.random() * 9 * i) + i);

        if (_remainderSetting === 2) {
          _remainder = String(Math.floor(Math.random() * (+_divisor - 1) + 1));
        } else {
          _remainder = '0';
        }

        _dividend = String(((+_quotient) * (+_divisor)) + (+_remainder));

        key = '(' + _quotient + ')(' + _divisor + ')';

        if (_repeats.hasOwnProperty(key)) {
          happy = false;
        } else {
          _repeats[key] = key;
          happy = true;

          if (_find === 2) {
            _blankPosition = Math.floor(Math.random() * 3) + 1;
          } else {
            _blankPosition = 3;
          }
        }
      }
    };

  return {
    setLevel: function (nLevel) {
      var findMax = 0,
        remainderMax = 0;

      _repeats = {};

      for (_digitsQuotient = 1; _digitsQuotient <= 3; _digitsQuotient += 1) {
        for (_digitsDivisor = 1; _digitsDivisor <= 2; _digitsDivisor += 1) {
          findMax = 1;
          if (_digitsQuotient === 1 && _digitsDivisor === 1) {
            findMax = 2;
          }

          for (_find = 1; _find <= findMax; _find += 1) {
            remainderMax = 2;
            if (_digitsQuotient === 1 && _digitsDivisor === 1) {
              remainderMax = 1;
            }

            for (_remainderSetting = 1; _remainderSetting <= remainderMax; _remainderSetting += 1) {
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
      return (_digitsQuotient === 1 && _digitsDivisor === 1);
    },
    getLevelDescription: function () {
      var result = '';

      result = 'Division with ' + _digitsQuotient + ' digit quotients and ' + _digitsDivisor + ' digit divisors';
      if (_remainderSetting === 2) {
        result += ' with remainders';
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

      operand1 = _dividend;
      operand2 = _divisor;
      answer = _quotient;
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
        .replace('{{op}}', '&divide;')
        .replace('{{wpans}}', answer));
    },
    renderNextVerticalProblem: function (element) {

      _getNextProblem();

      $(element).html($('#longdivisionproblem').html()
        .replace('{{divisor}}', _divisor)
        .replace('{{dividend}}', _dividend));
    }
  };
}
