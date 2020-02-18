app.get ('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
})
/**I initialize a new instance of socket.io by passing the http object*/

let word = ['p', 'a','n','p','a','n']
let revealed = new Array(word.length).fill('_')  /* to fill the array with many"---"  that correspond the number ot letters in the word */
let lives = 8 /**to define how many times that the player can make guesses */

io.on('connection', function(socket){ /**the server will receive a connection event */
    
    socket.emit('connectS', {data: true})
    socket.on('connectC',function(data){ /**i am listening to the socket */
        console.log(`received location request: ${data.location}`)
        socket.emit('gameStart', {revealed}) /** to see all of the exchanges between the client and the server  */
                                             /**"revealed" is to say we will start the game and this is the word */       
    })
    socket.on('letter', function(data){  /**the server is listening to the letter that the player will send it */
        console.log(`receivebd letter: ${data.letter}`)
        if(word.indexOf(data.letter) === -1) { /**if thre letter is not exist in the word , then put -1 until the 8 odds are over */
            lives -= 1
            /**if lives = 0: loose */
        }else{
            for(let i = 0; i < word.length; i++) {
                if(word[i] === data.letter) { /**if the letter that the player sent us is equel to one ot the letter in the word , then put it in the revealed */
                    revealed[i] = data.letter
                }
            }
        }
        socket.emit('letterGuess', {revealed})
    })
})