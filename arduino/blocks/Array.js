
'use strict';

goog.provide('Blockly.Blocks.Array');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

Blockly.Blocks.Array.HUE = 150;

Blockly.Blocks['array_define_empty'] = {
    init: function() {
        this.setHelpUrl('');
        this.setColour(Blockly.Blocks.Array.HUE);
        this.appendDummyInput()
            .appendField('Tableau')
            .appendField(
                new Blockly.FieldInstance('Array',
                                          'MyArray',
                                          true, true, false),
                'ARRAY_NAME')
                .appendField('de')
                .appendField(new Blockly.FieldNumber('SIZE'), 'ARRAY_SIZE')
                .appendField(new Blockly.FieldDropdown(
                                    Blockly.Types.getValidTypeArray()),
                                'ARRAY_TYPE');
    }
};

Blockly.Blocks['array_define'] = {
    entryCount: 1,
    init: function() {
        this.setHelpUrl('');
        this.setColour(Blockly.Blocks.Array.HUE);
        this.appendDummyInput()
            .appendField('Tableau')
            .appendField(
                new Blockly.FieldInstance('Array',
                                          'MyArray',
                                          true, true, false),
                'ARRAY_NAME');
        this.appendDummyInput()
                .appendField('de')
                .appendField(new Blockly.FieldNumber('SIZE', function(text) {
                    var input = parseInt ( text );
                    this.sourceBlock_.updateShape_(input);
                }), 'ARRAY_SIZE')
                .appendField(new Blockly.FieldDropdown(
                                    Blockly.Types.getValidTypeArray()),
                                'ARRAY_TYPE')
                .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('C0')
            .setCheck(Blockly.Types.NUMBER.checkList)
            .appendField('[0]')
            .setAlign(Blockly.ALIGN_RIGHT);
    },
    updateShape_: function(newEntryCount) {
        if ( this.entryCount > newEntryCount ) {
            // remove unnecessary entries
            // add necessary entries
            for ( var i = newEntryCount ; i < this.entryCount ; i ++ ) {
                this.removeInput('C'+i);
            }
        }
        if ( newEntryCount > this.entryCount ) {
            // add necessary entries
            for ( var i = this.entryCount ; i < newEntryCount ; i ++ ) {
                this.appendValueInput('C'+i).appendField('['+i+']')
                    .setAlign(Blockly.ALIGN_RIGHT);
            }
        }
        this.entryCount = newEntryCount;
    }
};

Blockly.Blocks['array_get'] = {
    init: function() {
        this.setHelpUrl('');
        this.setColour(Blockly.Blocks.Array.HUE);
        this.appendDummyInput()
            .appendField(
                new Blockly.FieldInstance('Array',
                    'MyArray',
                    false, true, false),
                'ARRAY_NAME')
            .appendField("[");
        this.appendValueInput("ARRAY_INDEX")
            .setCheck("Number");
        this.appendDummyInput()
            .appendField("]");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(Blockly.Blocks.Array.HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
  };

  Blockly.Blocks['array_set'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("fixer")
            .appendField(
                new Blockly.FieldInstance('Array',
                    'MyArray',
                    false, true, false),
                'ARRAY_NAME')
            .appendField("[");
        this.appendValueInput("ARRAY_INDEX")
            .setCheck("Number");
        this.appendDummyInput()
            .appendField("]")
            .appendField("à");
        this.appendValueInput("VALUE")
            .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.Array.HUE);
        this.setTooltip("");
        this.setHelpUrl("");
      }
    };