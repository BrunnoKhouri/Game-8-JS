(function(){
    //Array que armazena o estado do jogo
    var pieces = [];
        answer = [];
   //Tela de inicio
   var StartScreen = document.querySelector('#StartScreen');
       StartScreen.addEventListener("click", startGame,false);
   var OverScreen = document.querySelector("#OverScreen");    

    //Função que inicializa os elementos do jogo
    function init(){
        //Varre os elementos 'btn' adicionando a imagem e inserindo os elementos no array
        for(var i = 1; i < 9; i++){
            var piece = document.querySelector("#n"+i);
            piece.style.background = "url('img/n"+ i +".png'"; 
            piece.addEventListener("click", movePiece,false);            
            pieces.push(piece);
        }
        //Completa o array com um espaço nulo e o copia para a resposta, depois renderiza o tabuleiro.
        pieces.push(null);

        render();
    }

    //Ajusta a exibição do tabuleiro em função do array pieces
    function render(){
        for(var i in pieces){
            var piece = pieces[i];
            if(piece){
                piece.style.left = (i%3) * 100 + 5 + "px";
                if(i<3){
                    piece.style.top = "5px";                    
                } else
                if(i<6){
                    piece.style.top = "105px";
                } else{
                    piece.style.top = "205px";
                }
            }
        }
    }

    //Valida o array
    function validGame(array){
        var inversions = 0;
        var len = array.length;
        for(var i = 0; i < len-1; i++){
            for(var j = i; j < len; j++){
                if(array[i] && array[j] & array[i].dataset.valeu > array[j].dataset.value){
                    inversions++;
                }
            }
        }
        return inversions % 2 === 0;
    }

    //Ordenação aleatoria do array
    function randomSort(oldArray){
        var newArray;
        do{
            var newArray = [];
            while(newArray.length < oldArray.length){
                var i = Math.floor(Math.random() * oldArray.length);
                if(newArray.indexOf(oldArray[i]) < 0){
                    newArray.push(oldArray[i]);
                }
            }
        }while(!validGame(newArray));

        return newArray;
    }

    //Função que inicia o jogo embaralhando o array e desabilitando a tela inicial
    function startGame(){
        pieces = randomSort(pieces);
        this.removeEventListener("click,",startGame,false);
        this.style.opacity ="0";
        this.style.zIndex = -1;
        render();
    }

    //Ajusta a posição da peça clicada dentro do array
    function movePiece(){
        var index = pieces.indexOf(this);

        //Confere se a peça não está na coluna da esquerda 
        if(index % 3 !== 0){
            //Move a peça para a esquerda, caso o espaço estaja vazio
            if(!pieces[index-1]){
                pieces[index-1] = this;
                pieces[index] = null;
            }
        }

        //Confere se a peça não está na coluna da esquerda
        if(index % 3 !== 2){
            //Move a peça para a direita, caso o espalo esteja vazio
            if(!pieces[index+1]){
                pieces[index+1] = this;
                pieces[index] = null;
            }
        }

        //Confere se a peça não está na coluna do topo
        if(index > 2){
            //Move a peça para o topo, caso o espaço esteja vazio
            if(!pieces[index-3]){
                pieces[index-3] = this;
                pieces[index] = null;
            }
        }

        //Confere se a peça não está na coluna do fundo
        if(index < 6){
            //Move a peça para baixo, caso o espaço estaja vazio
            if(!pieces[index+3]){
                pieces[index+3] = this;
                pieces[index] = null;
            }
        }

        render();

        //Verifica a condição de vitoria.
        if(chkWin()){
            gameOver();
        }

        function chkWin(){
            for(var i in pieces){
                var a = pieces[i];
                var b = answer[i];
                if(a !== b){
                    return false;
                }
            }
            return true;
        }

        function gameOver(){
            OverScreen.style.zIndex = "1";
            OverScreen.style.opacity = "1";
            setTimeout(function(){
                OverScreen.addEventListener("click", startGame, false);
            }, 500);
        }
    }
    init();
}());