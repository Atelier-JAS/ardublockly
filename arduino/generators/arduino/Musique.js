'use strict';

goog.provide('Blockly.Arduino.Musique');

goog.require('Blockly.Arduino');

Blockly.Arduino['melody'] = function(block) {
    var pinType = Blockly.Arduino.PinTypes.MUSIQUE;
    var instName = block.getFieldValue('INST_NAME');
    var dropdown_pin = block.getFieldValue('PIN');
    var number_bpm = block.getFieldValue('BPM');
    // TODO: Assemble JavaScript into code variable.
    var pinArray = 'int ' + instName + '_data [] = {'+dropdown_pin+', '+number_bpm+'};';
    Blockly.Arduino.addDeclaration(instName, pinArray);
    Blockly.Arduino.reservePin(block, dropdown_pin, pinType, 'MUSIQUE');
    Blockly.Arduino.addSetup(instName, 'pinMode('+dropdown_pin+',OUTPUT);\n', true);
    var code = '';
    return code;
  };

Blockly.Arduino['note'] = function(block) {
    var dropdown_note = block.getFieldValue('NOTE');
    var dropdown_modificateur = block.getFieldValue('MODIFICATEUR');
    var number_octave = block.getFieldValue('OCTAVE');
    // TODO: Assemble JavaScript into code variable.
    var freq = 0;
    switch (dropdown_note) {
      case "NOTE_DO": freq = 264; break;
      case "NOTE_RE": freq = 297; break;
      case "NOTE_MI": freq = 330; break;
      case "NOTE_FA": freq = 352; break;
      case "NOTE_SOL": freq = 396; break;
      case "NOTE_LA": freq = 440; break;
      case "NOTE_SI": freq = 466; break;
    }
    for ( var i = 5 ; i <= number_octave ; i ++ )
      freq *= 2;
    for ( var i = 3 ; i >= number_octave ; i ++ )
      freq /= 2;
    var code = freq;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_NONE];
  };
  Blockly.Arduino['note2'] = function(block) {
      var value_note = Blockly.Arduino.valueToCode(block, 'NOTE', Blockly.Arduino.ORDER_ATOMIC);
      var number_octave = block.getFieldValue('OCTAVE');
      // TODO: Assemble JavaScript into code variable.
      var freq = value_note;
      for ( var i = 5 ; i <= number_octave ; i ++ )
        freq *= 2;
      for ( var i = 3 ; i >= number_octave ; i ++ )
        freq /= 2;
      var code = freq;
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.Arduino.ORDER_NONE];
    };
    Blockly.Arduino['note3'] = function(block) {
      var value_note = Blockly.Arduino.valueToCode(block, 'NOTE', Blockly.Arduino.ORDER_ATOMIC);
      var value_octave = Blockly.Arduino.valueToCode(block, 'OCTAVE', Blockly.Arduino.ORDER_ATOMIC);
      // TODO: Assemble JavaScript into code variable.
      var code = '( ' + value_note + ' * Math.Pow ( 2, ' + value_octave + ' - 4 ) )';
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.Arduino.ORDER_NONE];
    };
Blockly.Arduino['play_note'] = function(block) {
    var instName = block.getFieldValue('INST_NAME');
    var value_note = Blockly.Arduino.valueToCode(block, 'NOTE', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_duree = block.getFieldValue('DUREE');
    var checkbox_dot = block.getFieldValue('DOT') == 'TRUE';
    var duree = 0.0;
    switch (dropdown_duree) {
    case "DUREE_RONDE": duree = 4.0; break;
    case "DUREE_BLANCHE": duree = 2.0; break;
    case "DUREE_NOIRE": duree = 1.0; break;
    case "DUREE_CROCHE": duree = 0.5; break;
    case "DUREE_2CROCHE": duree = 0.25; break;
    case "DUREE_3CROCHE": duree = 0.125; break;
    }
    if ( checkbox_dot ) duree *= 1.5;
    var code = 'tone(' + instName + '_data [0],'+value_note+');\n' +
      'delay((int) ('+duree+'*' + instName + '_data [1]);\n' +
      'noTone(' + instName + '_data [0]);\n';
    return code;
  };
  Blockly.Arduino['notebase_do'] = function(block) {
    var dropdown_mod = block.getFieldValue('MODIFIER');
    // TODO: Assemble JavaScript into code variable.
    var code = '264';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_NONE];
  };
  Blockly.Arduino['notebase_re'] = function(block) {
    var dropdown_mod = block.getFieldValue('MODIFIER');
    // TODO: Assemble JavaScript into code variable.
    var code = '297';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_NONE];
  };
  Blockly.Arduino['notebase_mi'] = function(block) {
    var dropdown_mod = block.getFieldValue('MODIFIER');
    // TODO: Assemble JavaScript into code variable.
    var code = '330';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_NONE];
  };
  Blockly.Arduino['notebase_fa'] = function(block) {
    var dropdown_mod = block.getFieldValue('MODIFIER');
    // TODO: Assemble JavaScript into code variable.
    var code = '352';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_NONE];
  };
  Blockly.Arduino['notebase_sol'] = function(block) {
    var dropdown_mod = block.getFieldValue('MODIFIER');
    // TODO: Assemble JavaScript into code variable.
    var code = '396';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_NONE];
  };
  Blockly.Arduino['notebase_la'] = function(block) {
    var dropdown_mod = block.getFieldValue('MODIFIER');
    // TODO: Assemble JavaScript into code variable.
    var code = '440';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_NONE];
  };
  Blockly.Arduino['notebase_si'] = function(block) {
    var dropdown_mod = block.getFieldValue('MODIFIER');
    // TODO: Assemble JavaScript into code variable.
    var code = '466';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_NONE];
  };