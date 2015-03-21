/*jslint
  nomen: true, indent: 2
*/

/*globals
  $, document, Addition, Subtraction, Multiplication, Division, runAllUnitTests
*/

$(document).ready(function () {
  'use strict';

  var oSkill, nLevel;

  function renderWorksheet() {
    if (oSkill.canDoHorizontal()) {

      $('#worksheet').html($('#layout3x10').html());

      /*jslint unparam: true */
      $('#worksheet td').each(function (idx, el) {
        oSkill.renderNextHorizontalProblem(el);
      });
    } else {
      $('#worksheet').html($('#layout4x5').html());

      /*jslint unparam: true */
      $('#worksheet td').each(function (idx, el) {
        oSkill.renderNextVerticalProblem(el);
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
    var i, oLevel;

    switch ($('#skill option').filter(':selected').val()) {
    case 'addition':
      oSkill = new Addition();
      break;
    case 'subtraction':
      oSkill = new Subtraction();
      break;
    case 'multiplication':
      oSkill = new Multiplication();
      break;
    case 'division':
      oSkill = new Division();
      break;
    }

    oLevel = $('#level');
    oLevel.html('');
    i = 1;
    while (oSkill.setLevel(i)) {
      oLevel.append('<option value="' + i + '">' + oSkill.getLevelDescription() + '</option>');
      i += 1;
    }
    oLevel.val(1).change();
  });

  $('#level').change(function () {

    nLevel = +($('#level option').filter(':selected').val());

    oSkill.setLevel(nLevel);
    renderWorksheet();
  });

  $('#configbutton').hide();
  $('#skill').val('addition').change();
});
