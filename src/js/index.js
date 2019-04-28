import Vue from 'vue';


const vm = new Vue({
  el: '#app',
  data: {
    hautGauche : false,
    hautDroite : false,
    basGauche : false,
    basDroite : false,
    sequence: [],
    tmp_sequence : [],
    squareMapping: ['hautGauche', 'hautDroite', 'basGauche', 'basDroite'],
    count : 0
  }, 
  methods : {
    addNewEltSequence() {
      this.sequence.push(this.squareMapping[Math.floor(Math.random() * 4)]);
      this.tmp_sequence = this.sequence.slice();
    },
    allGrey(){
      this.hautGauche = false;
      this.hautDroite = false;
      this.basGauche = false;
      this.basDroite = false;
    },
    newGame() {
      this.sequence = [];
      this.nextTurn();
      this.count = 0;
    },
    playSequence(instruction){
      this[instruction] = true;
      setTimeout(() => {
        vm.allGrey(); 
        vm.tmp_sequence.shift();
        if (vm.tmp_sequence[0]) {
          setTimeout(() => {
            vm.playSequence(vm.tmp_sequence[0]);
          }, 400);
        }else {
          vm.tmp_sequence = vm.sequence.slice(); 
        }
      }, 500);
      
    },
    nextTurn() {
      this.addNewEltSequence();
      this.allGrey();
      this.playSequence(this.tmp_sequence[0]);
    },
    selectSquare(instruction){
      if (instruction === this.tmp_sequence[0]) {
        this[instruction] = true;
        setTimeout(() => {
          vm.allGrey(); 
          vm.tmp_sequence.shift();  
          if (!vm.tmp_sequence[0]) {
            vm.count++;
            setTimeout(() => {
              vm.nextTurn(); 
            }, 400);
          }     
        }, 400);
      }else {
        if (vm.tmp_sequence[0]) {
          alert('Perdu');
          vm.newGame();
        }
      }
    }
  }
});