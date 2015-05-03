
  'use strict';

  require('../model/cardsmodel');
  require('../view/scoretext');
  require('../view/crossmark');
  require('../view/closedcard');
  require('../view/opencard');

  function Play() {}
  Play.prototype = {
    create: function() {

      this.cardsModel = new CardsModel();

      this.addUI();
      this.addListeners();
      this.nextCard();
    },

    update: function() {

    },

    addUI:function(){
      //repeating background
      this.game.add.tileSprite(0, 0, 800, 600, 'table');
      
      //some props
      this.game.add.image(420, -20, 'papers');
      this.game.add.image(43, 18, 'notes');
      this.game.add.image(290, 58, 'stackMark');

      //cross marks
      this.crossMark0 = new CrossMark(this.game, 90, 280, 0);
      this.crossMark1 = new CrossMark(this.game, 290, 280, 1);
      this.crossMark2 = new CrossMark(this.game, 490, 280, 2);

      //texts
      this.balanceText = new ScoreText(this.game, 150, 63, this.cardsModel.balance);      
      this.stakeText = new ScoreText(this.game, 140, 117, this.cardsModel.staked);      
      this.paidText = new ScoreText(this.game, 125, 171, this.cardsModel.paid); 
      this.cardsLeftText = new ScoreText(this.game, 305, 67, this.cardsModel.cardsLeft())

      //closed card
      this.closedCard = new ClosedCard(this.game, 315, 155);      
    },

    addListeners: function(){
      this.crossMark0.events.onInputDown.add(this.crossMarkListener, this);
      this.crossMark1.events.onInputDown.add(this.crossMarkListener, this);
      this.crossMark2.events.onInputDown.add(this.crossMarkListener, this);
    },

    nextCard:function(){
      
      //draw card
      this.currentCard = new OpenCard(this.game, 290, 98, this.cardsModel.popCard());
      
      //update fund info
      this.cardsLeftText.setText(this.cardsModel.cardsLeft());
      this.stakeText.setText(this.cardsModel.staked);
      this.balanceText.setText(this.cardsModel.balance);      

      //enable clicks for current card
      this.crossMark0.enable();
      this.crossMark1.enable();
      this.crossMark2.enable();
    },
    
    crossMarkListener: function(crossMark) {

      //disable clicks until next card
      this.crossMark0.disable();
      this.crossMark1.disable();
      this.crossMark2.disable();

      //get target stack
      var stackIndex = crossMark.index;

      //save to stack
      this.cardsModel.pushCardToStack(this.currentCard, stackIndex);
      
      //get y target position offset for stack
      var offsetY = this.cardsModel.numCardsInStack(stackIndex) * 30 + 50;

      //animate card  
      var tween = this.game.add
                    .tween(this.currentCard)
                    .to( { x:crossMark.x, y:crossMark.y + offsetY }, 400, Phaser.Easing.Quadratic.Out, true);

      tween.onComplete.addOnce(this.checkResult, this);
    },

    checkResult: function(){

      //process stacks
      this.cardsModel.processStacksAfterDraw();
      
      //update funds info
      this.balanceText.setText(this.cardsModel.balance);
      this.paidText.setText(this.cardsModel.paid);

      //proceed playing
      if (this.cardsModel.cardsLeft() > 0)
        this.nextCard();
      else
        this.game.state.start('gameover', false, false, this.cardsModel.balance);        
    }    
  };
  
  module.exports = Play;