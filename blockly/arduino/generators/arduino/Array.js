'use strict';

goog.provide('Blockly.Arduino.Array');

goog.require('Blockly.Arduino');

Blockly.Arduino['array_define_empty'] = function(block) {
    var arrayName = block.getFieldValue('ARRAY_NAME');
    var arraySize = block.getFieldValue('ARRAY_SIZE');
    var arrayType = Blockly.Arduino.getArduinoType_(
        Blockly.Types[block.getFieldValue('ARRAY_TYPE')]);
    Blockly.Arduino.addDeclaration(arrayName, arrayType+' '+arrayName+'['+arraySize+'];\n');
    return '';
};

Blockly.Arduino['array_define'] = function(block) {
    var arrayName = block.getFieldValue('ARRAY_NAME');
    var arraySize = block.getFieldValue('ARRAY_SIZE');
    var arrayType = Blockly.Arduino.getArduinoType_(
        Blockly.Types[block.getFieldValue('ARRAY_TYPE')]);
    var x = Blockly.Arduino.valueToCode(block, 'C0',
            Blockly.Arduino.ORDER_ATOMIC) || '0';
    var values = ' ' + x;
    for ( var i = 1 ; i < block.entryCount ; i ++ ) {
        x = Blockly.Arduino.valueToCode(block, 'C'+i,
                Blockly.Arduino.ORDER_ATOMIC) || '0';
        values += ', ' + x;
    }
    Blockly.Arduino.addDeclaration(arrayName, arrayType+' '+arrayName+'[] = {' + values + ' };\n');
    return '';
};

Blockly.Arduino['array_get'] = function(block) {
    var arrayName = block.getFieldValue('ARRAY_NAME');
    var argument0 = Blockly.Arduino.valueToCode(block, 'ARRAY_INDEX',
        Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
    var code = arrayName+'[ '+argument0+' ]';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['array_set'] = function(block) {
    var arrayName = block.getFieldValue('ARRAY_NAME');
    var argument0 = Blockly.Arduino.valueToCode(block, 'ARRAY_INDEX',
        Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
    var value = Blockly.Arduino.valueToCode(block, 'VALUE',
        Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
    var code = arrayName+'[ '+argument0+' ] = ' +value + ';\n';
    return code;
};
