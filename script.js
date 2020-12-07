const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-conatiner');
const notification = document.getElementById('notifiation-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['migara','bryan','sandro','munaj','roshan','sahasra','manjula sir','kapila sir','aadhil','akash','sanduni','aadhya','sahassrika','azmi','seneka','salma','azeeza','afra'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//Show hidden word - join() convert array into a string
function displayWords(){
    wordEl.innerHTML = `
        ${selectedWord.split('').map(letter => `<span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
        </span>`).join('')}
    `;

    const innerWord = wordEl.innerText.replace(/\n/g,'');

    if(innerWord === selectedWord){
        finalMessage.innerText = 'Congratulations! You won! 😀';
        popup.style.display = 'flex'
    }
}

//Upadte wring letters
function updateWrongLetterEl(){
    //Display Wrong letters
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    figureParts.forEach((part,index) =>{
        const errors = wrongLetters.length;

        if(index < errors){
            part.style.display = 'block';
        }else{
            part.style.display = 'none';
        }
    });

    //Check if lost
    if(wrongLetters.length === figureParts.length){
         finalMessage.innerText = `Unfortunately you lost. 😌`;
         popup.style.display = 'flex';
    }
}

//Show notificcation
function showNotification(){
    notification.classList.add('show');

    setTimeout(() =>{
        notification.classList.remove('show')
    },2000)
}

//keydown letter press
wordEl.addEventListener('keyup',e =>{
    if(e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key;

        //if the letter matches the selected word
        if(selectedWord.includes(letter)){
            //if not already letter is there
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWords()
            }else{
                showNotification()
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);

                updateWrongLetterEl();
            }else{
                showNotification()
            }
        }
    }
})

//Restart game and play again
playAgainBtn.addEventListener('click',() =>{
    //Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWords();

    updateWrongLetterEl();

    popup.style.display = 'none';
})

displayWords();