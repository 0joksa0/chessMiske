const {Chess} = require(".chess.ts")
var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 1024,
    physics: {
        default: 'arcade',
        arcade: {
        gravity: { y: 0 },
        debug: false
    }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var table = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]]



var pawn

var check

function preload ()
{

}

function create ()
{
    // things with Chess
    const chess = new Chess()
    console.log(chess);
    console.log(chess.board());
    
    for (let i = 0; i < 8; i++) {
        for(let j = 0; j < 8 ; j++){
            if(table[i][j] == 0){
                if((i+j) % 2 == 0)
                    table[i][j] = this.add.sprite(64+j*128, 64+i*128, 'brown').setInteractive();
                else
                table[i][j] = this.add.sprite(64+j*128, 64+i*128, 'lbrown').setInteractive();
     
        }
        
        }
    }
    //var g1 = this.add.grid(315,315,512,512,64,64,0x057605).setAltFillStyle(0x016fce);
    pawn = this.add.sprite( 64, 64,'pawn').setScale(0.9).setInteractive()
    pawn.on('pointerdown', function (pointer) {
       // console.log(pawn)
        colorIt(pawn)
        for (let i = 0; i < 8; i++) {
            for(let j = 0; j < 8 ; j++){
                table[i][j].on('pointerup',function(pointer) {
                    if(canItMove(pawn, j, i)){
                        pawn.setPosition(table[i][j].x, table[i][j].y);
                        tableReset()
                        //console.log(table[i][j].x + table[i][j].y)
                        check = true;
                    }
                    else
                    check = false;
                }) 
               // console.log(check)
                if(check) 
                    return;   
            }
        }

    })
    //console.log(table)
}

function update ()
{
    // pawns.on('click',  (event) => {
    //     console.log("click")
    //     pawns.x = 200;
    // });

    
}
