
'use strict';

goog.provide('Blockly.Blocks.Musique');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

Blockly.Blocks.Musique.HUE = 180;

Blockly.Blocks['melody'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Configurer instrument")
          .appendField(
              new Blockly.FieldInstance('Musical',
                                        'Instrument',
                                        true, true, false),
              'INST_NAME')
            .appendField("broche")
          .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.pwmPins), 'PIN')
          .appendField("Vitesse")
          .appendField(new Blockly.FieldNumber('250'), "BPM");
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

Blockly.Blocks['note'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([["do","NOTE_DO"], ["ré","NOTE_RE"], ["mi","NOTE_MI"], ["fa","NOTE_FA"], ["sol","NOTE_SOL"], ["la","NOTE_LA"], ["si","NOTE_SI"]]), "NOTE")
          .appendField(new Blockly.FieldDropdown([["aucun","MOD_NONE"], ["dièse","MOD_DIESE"], ["bémol","MOD_BEMOL"]]), "MODIFICATEUR")
          .appendField("octave")
          .appendField(new Blockly.FieldNumber('4'), "OCTAVE");
      this.setInputsInline(true);
      this.setOutput(true, "Note");
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['play_note'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("jouer");
      this.appendValueInput("NOTE")
          .setCheck("Note");
      this.appendDummyInput()
          .appendField("durée")
          .appendField(new Blockly.FieldDropdown([["ronde","DUREE_RONDE"], ["blanche","DUREE_BLANCHE"], ["noire","DUREE_NOIRE"], ["option","DUREE_CROCHE"], ["option","DUREE_2CROCHE"], ["option","DUREE_3CROCHE"]]), "DUREE")
          .appendField("pointée ?")
          .appendField(new Blockly.FieldCheckbox("TRUE"), "DOT")
          .appendField("sur")
          .appendField(
              new Blockly.FieldInstance('Musical',
                                        'Instrument',
                                        false, true, false),
              'INST_NAME');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    },
    onchange: function(event) {
      if (!this.workspace || event.type == Blockly.Events.MOVE ||
          event.type == Blockly.Events.UI) {
          return;  // Block deleted or irrelevant event
      }
      var instanceName = this.getFieldValue('INST_NAME')
      if (Blockly.Instances.isInstancePresent(instanceName, 'Musical', this)) {
        this.setWarningText(null);
      } else {
        // Set a warning to select a valid stepper config block
        this.setWarningText('instrument non configuré');
      }
    }
  };