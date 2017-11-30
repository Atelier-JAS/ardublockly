'use strict';

goog.provide('Blockly.Arduino.LiquidCrystal');

goog.require('Blockly.Arduino');

Blockly.Arduino['lcd_init'] = function(block) {
    var pinType = Blockly.Arduino.PinTypes.LCD;
    var lcdName = block.getFieldValue('LCD_NAME');
    var numberOfPins = block.getFieldValue('LCD_NUMBER_OF_PINS');
    var hasRW = block.getFieldValue('LCD_RW');
    var lcdRows = Blockly.Arduino.valueToCode(block, 'LCD_ROWS',
        Blockly.Arduino.ORDER_ATOMIC) || '2';
    var lcdCols = Blockly.Arduino.valueToCode(block, 'LCD_COLS',
        Blockly.Arduino.ORDER_ATOMIC) || '16';
    var pins = [block.getFieldValue('RS')];
    if ( hasRW == 'yes')
        pins.push(block.getFieldValue('RW'));
    pins.push(block.getFieldValue('EN'));
    if (numberOfPins === '8') {
      pins.push(block.getFieldValue('D0'));
      pins.push(block.getFieldValue('D1'));
      pins.push(block.getFieldValue('D2'));
      pins.push(block.getFieldValue('D3'));
    }
    pins.push(block.getFieldValue('D4'));
    pins.push(block.getFieldValue('D5'));
    pins.push(block.getFieldValue('D6'));
    pins.push(block.getFieldValue('D7'));
  
    var pinArray = 'int ' + lcdName + '_pins [' + pins.length +'] = {';
    var globalCode = 'LiquidCrystal ' + lcdName + '( ';
    for (var i = 0; i < pins.length; i++) {
      Blockly.Arduino.reservePin(block, pins[i], pinType, 'LCD');
      pinArray += pins[i] + ', ';
      globalCode += pins[i] + ', ';
    }
    pinArray = pinArray.slice(0, -2) + '};';
    globalCode = globalCode.slice(0, -2) + ');';
  
    //stepper is a variable containing the used pins
    Blockly.Arduino.addVariable(lcdName+'_pins',
        pinArray, true);
  
    Blockly.Arduino.addInclude('lcd', '#include <LiquidCrystal.h>');
  
    Blockly.Arduino.addDeclaration(lcdName, globalCode);
  
    var setupCode = lcdName + '.begin(' + lcdCols + ', ' + lcdRows + ');';
    Blockly.Arduino.addSetup(lcdName, setupCode, true);
    return '';
  };
  
Blockly.Arduino['lcd_print'] = function(block) {
    var instanceName = block.getFieldValue('LCD_NAME');
    var x = Blockly.Arduino.valueToCode(block, 'LCD_X',
        Blockly.Arduino.ORDER_ATOMIC) || '0';
    var y = Blockly.Arduino.valueToCode(block, 'LCD_Y',
        Blockly.Arduino.ORDER_ATOMIC) || '0';
    var data = Blockly.Arduino.valueToCode(block, 'LCD_DATA',
        Blockly.Arduino.ORDER_ATOMIC) || '';
    var code = instanceName + '.setCursor(' + x + ', ' + y + ');\n';
    code += instanceName + '.print(' + data + ');\n';
    return code;
  };
