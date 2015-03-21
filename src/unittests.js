// @ifdef DEBUG

/*jslint
nomen: true, indent: 2
*/

/*globals
$, setTimeout, console

*/

function runAllUnitTests() {
  'use strict';

  var nTestCounter;

  function testNextPage() {
    var
      oLevel = $('#level'),
      nCount = $('#level option').length,
      nCurrent = +oLevel.val();

    nCurrent += 1;
    console.log(nCurrent);

    if (nCurrent <= nCount) {
      oLevel.val(nCurrent).change();
      return true;
    }
    return false;
  }

  function testPage() {
    nTestCounter += 1;
    console.log(nTestCounter);
    if (nTestCounter < 25) {
      $('#level').change();
      return true;
    }
    return false;
  }

  function testAllDivisionPages() {
    if (testNextPage()) {
      setTimeout(testAllDivisionPages, 100);
    } else {
      console.log('testing Complete');
    }
  }

  function testManyDivisionPages() {
    if (testPage()) {
      setTimeout(testManyDivisionPages, 100);
    } else {
      console.log('testing All Division Pages');
      setTimeout(testAllDivisionPages, 100);
    }
  }

  function testAllMultiplicationPages() {
    if (testNextPage()) {
      setTimeout(testAllMultiplicationPages, 100);
    } else {
      nTestCounter = 0;
      $('#skill').val('division').change();
      console.log('testing Many Division Pages');
      setTimeout(testManyDivisionPages, 100);
    }
  }

  function testManyMultiplicationPages() {
    if (testPage()) {
      setTimeout(testManyMultiplicationPages, 100);
    } else {
      console.log('testing All Multiplication Pages');
      setTimeout(testAllMultiplicationPages, 100);
    }
  }

  function testAllSubtractionPages() {
    if (testNextPage()) {
      setTimeout(testAllSubtractionPages, 100);
    } else {
      nTestCounter = 0;
      $('#skill').val('multiplication').change();
      console.log('testing Many Multiplication Pages');
      setTimeout(testManyMultiplicationPages, 100);
    }
  }

  function testManySubtractionPages() {
    if (testPage()) {
      setTimeout(testManySubtractionPages, 100);
    } else {
      console.log('testing All Subtraction Pages');
      setTimeout(testAllSubtractionPages, 100);
    }
  }

  function testAllAdditionPages() {
    if (testNextPage()) {
      setTimeout(testAllAdditionPages, 100);
    } else {
      nTestCounter = 0;
      $('#skill').val('subtraction').change();
      console.log('testing Many Subtraction Pages');
      setTimeout(testManySubtractionPages, 100);
    }
  }

  function testManyAdditionPages() {
    if (testPage()) {
      setTimeout(testManyAdditionPages, 100);
    } else {
      console.log('testing All Addition Pages');
      setTimeout(testAllAdditionPages, 100);
    }
  }

  nTestCounter = 0;
  $('#skill').val('addition').change();
  console.log('testing Many Addition Pages');
  setTimeout(testManyAdditionPages, 100);
}

// @endif
