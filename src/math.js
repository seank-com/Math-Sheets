/*jslint
  nomen: true, indent: 2
*/

/*globals
  $, document,

  createAdditionManager, createSubtractionManager,
  createMultiplicationManager, createDivisionManager,
  runAllUnitTests
*/

$(document).ready(function () {
  'use strict';

  var _skill = {},
    _level = 0;

  function renderWorksheet() {
    if (_skill.canDoHorizontal()) {

      $('#worksheet').html($('#layout3x10').html());

      /*jslint unparam: true */
      $('#worksheet td').each(function (idx, el) {
        _skill.renderNextHorizontalProblem(el);
      });
    } else {
      $('#worksheet').html($('#layout4x5').html());

      /*jslint unparam: true */
      $('#worksheet td').each(function (idx, el) {
        _skill.renderNextVerticalProblem(el);
      });
    }
  }

  $('#configdialog').dialog({
    autoOpen: false,
    modal: false,
    width: 480,
    buttons: {
// @ifdef DEBUG
      "Test": function () {
        runAllUnitTests();
      },
// @endif
      "Regenerate": function () {
        $('#level').change();
      }
    }
  });

  $('body').hover(function () {
    $('#configbutton').slideDown('fast');
  }, function () {
    $('#configbutton').hide();
  });

  /*jslint unparam: true */
  $('#configbutton').click(function (event) {
    $('#configdialog').dialog("open");
  });

  $('#skill').change(function () {
    var i = 1,
      level = $('#level');

    switch ($('#skill option').filter(':selected').val()) {
    case 'addition':
      _skill = createAdditionManager();
      break;
    case 'subtraction':
      _skill = createSubtractionManager();
      break;
    case 'multiplication':
      _skill = createMultiplicationManager();
      break;
    case 'division':
      _skill = createDivisionManager();
      break;
    }

    level.html('');
    while (_skill.setLevel(i)) {
      level.append('<option value="' + i + '">' + _skill.getLevelDescription() + '</option>');
      i += 1;
    }
    level.val(1).change();
  });

  $('#level').change(function () {

    _level = +($('#level option').filter(':selected').val());

    _skill.setLevel(_level);
    renderWorksheet();
  });

  $('#configbutton').hide();
  $('#skill').val('addition').change();
});
