// @ifdef DEBUG

/*jslint
nomen: true, indent: 2
*/

/*globals
$, setTimeout, console

*/

function runAllUnitTests() {
  'use strict';

  var _testCounter = 0,
    _testNextPage = function () {
      var level = $('#level'),
        count = $('#level option').length,
        current = +level.val();

      current += 1;
      console.log(current);

      if (current <= count) {
        level.val(current).change();
        return true;
      }
      return false;
    },
    _testPage = function () {
      _testCounter += 1;
      console.log(_testCounter);
      if (_testCounter < 25) {
        $('#level').change();
        return true;
      }
      return false;
    },
    _testAllDivisionPages = function () {
      if (_testNextPage()) {
        setTimeout(_testAllDivisionPages, 100);
      } else {
        console.log('testing Complete');
      }
    },
    _testManyDivisionPages = function () {
      if (_testPage()) {
        setTimeout(_testManyDivisionPages, 100);
      } else {
        console.log('testing All Division Pages');
        setTimeout(_testAllDivisionPages, 100);
      }
    },
    _testAllMultiplicationPages = function () {
      if (_testNextPage()) {
        setTimeout(_testAllMultiplicationPages, 100);
      } else {
        _testCounter = 0;
        $('#skill').val('division').change();
        console.log('testing Many Division Pages');
        setTimeout(_testManyDivisionPages, 100);
      }
    },
    _testManyMultiplicationPages = function () {
      if (_testPage()) {
        setTimeout(_testManyMultiplicationPages, 100);
      } else {
        console.log('testing All Multiplication Pages');
        setTimeout(_testAllMultiplicationPages, 100);
      }
    },
    _testAllSubtractionPages = function () {
      if (_testNextPage()) {
        setTimeout(_testAllSubtractionPages, 100);
      } else {
        _testCounter = 0;
        $('#skill').val('multiplication').change();
        console.log('testing Many Multiplication Pages');
        setTimeout(_testManyMultiplicationPages, 100);
      }
    },
    _testManySubtractionPages = function () {
      if (_testPage()) {
        setTimeout(_testManySubtractionPages, 100);
      } else {
        console.log('testing All Subtraction Pages');
        setTimeout(_testAllSubtractionPages, 100);
      }
    },
    _testAllAdditionPages = function () {
      if (_testNextPage()) {
        setTimeout(_testAllAdditionPages, 100);
      } else {
        _testCounter = 0;
        $('#skill').val('subtraction').change();
        console.log('testing Many Subtraction Pages');
        setTimeout(_testManySubtractionPages, 100);
      }
    },
    _testManyAdditionPages = function () {
      if (_testPage()) {
        setTimeout(_testManyAdditionPages, 100);
      } else {
        console.log('testing All Addition Pages');
        setTimeout(_testAllAdditionPages, 100);
      }
    };

  $('#skill').val('addition').change();
  console.log('testing Many Addition Pages');
  setTimeout(_testManyAdditionPages, 100);
}

// @endif
