
'use strict';

goog.provide('Blockly.Blocks.LiquidCrystal');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

Blockly.Blocks.LiquidCrystal.HUE = 180;

Blockly.Blocks['lcd_init'] = {
    init: function() {
        var pindropdownOptions = [['4', '4'],
                            ['8', '8']];
        var pindropdown = new Blockly.FieldDropdown(pindropdownOptions, function(option) {
            var input = (option == '8');
            this.sourceBlock_.updateShapeData_(input);
        });
        var rwdropdownOptions = [['yes', 'yes'],
                            ['no', 'no']];
        var rwdropdown = new Blockly.FieldDropdown(rwdropdownOptions, function(option) {
            var input = (option == 'yes');
            this.sourceBlock_.updateShapeRW_(input);
        });
        this.setHelpUrl('http://arduino.cc/en/Reference/LiquidCrystal');
        this.setColour(Blockly.Blocks.LiquidCrystal.HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.ARD_LCD_SETUP)
            .appendField(
                new Blockly.FieldInstance('Lcd',
                                          'MyLCD',
                                          true, true, false),
                'LCD_NAME');
        this.appendDummyInput('PINS_DROPDOWN')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.ARD_LCD_DATACOUNT)
            .appendField(pindropdown, "LCD_NUMBER_OF_PINS");
        this.appendDummyInput('RW_DROPDOWN')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.ARD_LCD_HASRW)
            .appendField(rwdropdown, "LCD_RW");
        this.appendValueInput('LCD_ROWS')
            .setCheck(Blockly.Types.NUMBER.checkList)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.ARD_LCD_ROWS);
        this.appendValueInput('LCD_COLS')
            .setCheck(Blockly.Types.NUMBER.checkList)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.ARD_LCD_COLS);
        this.appendDummyInput('PINS')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('RS')
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'RS')
            .appendField('EN')
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'EN');
        this.appendDummyInput('PINS4to7')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('D4')
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'D4')
            .appendField('D5')
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'D5')
            .appendField('D6')
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'D6')
            .appendField('D7')
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'D7');
        this.setTooltip(Blockly.Msg.ARD_LCD_SETUP_HINT);
    },
    updateShapeRW_: function(hasRW) {
      var extraPinsExist = this.getFieldValue('RW');
      if (hasRW) {
        if (!extraPinsExist) {
           this.getInput("PINS")
              .appendField('RW','PINRW')
              .appendField(new Blockly.FieldDropdown(
                  Blockly.Arduino.Boards.selected.digitalPins), 'RW');
        }
      } else {
        if (extraPinsExist) {
          this.getInput("PINS").removeField("PINRW");
          this.getInput("PINS").removeField("RW");
        }
      }
    },
    updateShapeData_: function(fullData) {
        var extraPinsExist = this.getFieldValue('D0');
        if (fullData) {
            if (!extraPinsExist) {
                this.appendDummyInput('PINS0to3')
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField('D0')
                    .appendField(new Blockly.FieldDropdown(
                        Blockly.Arduino.Boards.selected.digitalPins), 'D0')
                    .appendField('D1')
                    .appendField(new Blockly.FieldDropdown(
                        Blockly.Arduino.Boards.selected.digitalPins), 'D1')
                    .appendField('D2')
                    .appendField(new Blockly.FieldDropdown(
                        Blockly.Arduino.Boards.selected.digitalPins), 'D2')
                    .appendField('D3')
                    .appendField(new Blockly.FieldDropdown(
                        Blockly.Arduino.Boards.selected.digitalPins), 'D3');
            }
        } else {
            if (extraPinsExist) {
                this.removeInput('PINS0to3');
            }
        }
    },
    /**
     * Parse XML to restore the number of pins available.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function(xmlElement) {
      this.updateShapeData_(xmlElement.getAttribute('number_of_pins') == '8');
      this.updateShapeRW_(xmlElement.getAttribute('has_rw') == 'yes');
    },
    /**
     * Create XML to represent number of pins selection.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function() {
      var container = document.createElement('mutation');
      var input = this.getFieldValue('LCD_NUMBER_OF_PINS');
      container.setAttribute("number_of_pins", input);
      input = this.getFieldValue('LCD_RW');
      container.setAttribute("has_rw", input);
      return container;
    },
    /**
     * Updates the content of the the pin related fields.
     * @this Blockly.Block
     */
    updateFields: function() {
        Blockly.Boards.refreshBlockFieldDropdown( this, 'RS', 'digitalPins');
        Blockly.Boards.refreshBlockFieldDropdown( this, 'EN', 'digitalPins');
        Blockly.Boards.refreshBlockFieldDropdown( this, 'D4', 'digitalPins');
        Blockly.Boards.refreshBlockFieldDropdown( this, 'D5', 'digitalPins');
        Blockly.Boards.refreshBlockFieldDropdown( this, 'D6', 'digitalPins');
        Blockly.Boards.refreshBlockFieldDropdown( this, 'D7', 'digitalPins');
        if (this.getFieldValue('RW'))
            Blockly.Boards.refreshBlockFieldDropdown( this, 'RW', 'digitalPins');
        if (this.getFieldValue('D0'))
        {
            Blockly.Boards.refreshBlockFieldDropdown( this, 'D0', 'digitalPins');
            Blockly.Boards.refreshBlockFieldDropdown( this, 'D1', 'digitalPins');
            Blockly.Boards.refreshBlockFieldDropdown( this, 'D2', 'digitalPins');
            Blockly.Boards.refreshBlockFieldDropdown( this, 'D3', 'digitalPins');
        }
    }
};

Blockly.Blocks['lcd_print'] = {
    /**
     * Block for for the stepper 'step()' function.
     * @this Blockly.Block
     */
    init: function() {
      this.setHelpUrl('http://arduino.cc/en/Reference/LiquidCrystal');
      this.setColour(Blockly.Blocks.LiquidCrystal.HUE);
      this.appendDummyInput()
          .appendField('LCD')
          .appendField(
              new Blockly.FieldInstance('Lcd',
                                        'MyLCD',
                                        false, true, false),
              'LCD_NAME');
        this.appendDummyInput().appendField(Blockly.Msg.ARD_LCD_PRINT);
        this.appendValueInput('LCD_DATA');
        this.appendDummyInput().appendField(Blockly.Msg.ARD_LCD_AT+' x=');
        this.appendValueInput('LCD_X')
            .setCheck(Blockly.Types.NUMBER.checkList);
        this.appendDummyInput().appendField(', y=');
        this.appendValueInput('LCD_Y')
            .setCheck(Blockly.Types.NUMBER.checkList);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.ARD_LCD_PRINT_HINT);
        this.setInputsInline(true);
    },
    /**
     * Called whenever anything on the workspace changes.
     * It checks/warns if the selected stepper instance has a config block.
     * @this Blockly.Block
     */
    onchange: function(event) {
      if (!this.workspace || event.type == Blockly.Events.MOVE ||
          event.type == Blockly.Events.UI) {
          return;  // Block deleted or irrelevant event
      }
      var instanceName = this.getFieldValue('LCD_NAME')
      if (Blockly.Instances.isInstancePresent(instanceName, 'Lcd', this)) {
        this.setWarningText(null);
      } else {
        // Set a warning to select a valid stepper config block
        this.setWarningText(Blockly.Msg.ARD_LCD_PRINT_NOINST);
      }
    }
};
