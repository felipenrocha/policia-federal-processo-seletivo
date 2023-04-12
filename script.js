
// constantes usado para a cifra
const ALFABETO = "abcdefghijklmnopqrstuvxyz";
const consonantES = "bcdfghjklmnpqrstvxz";
const VOGAIS = "aeiou";



// Espera documento web estar pronto para começar a 
// realizar operações:
document.addEventListener("DOMContentLoaded", function(e) {
    // ao clicar no botão é chamada a função encode
    document.getElementById('cipher-button').onclick = function() { generateText() };
});



function generateText(){
    var div = document.getElementById("cipher-box");
    message = document.getElementById('message').value;
    if (message.length > 30){
        // 
        div.innerHTML = "<p>Mensagem muito grande!</p>";
    }
    else if(message.length < 1){
        div.innerHTML = "<p>Mensagem muito pequena!</p>";

    }
    else if(message.toLowerCase() != message){
        div.innerHTML = "<p>Mensagem deve ter somente letras minusculas!</p>";

    }
    else{

    cipher = encode(message);
    div.innerHTML = "<p>Mensagem Cifrada: " + 
    "<span style='font-weight: bold;'>" + 
    cipher  + 
    "</span></p>";

    }




}

function encode(message){
    // pegando o valor do input
    cipher = '';
    for (let i = 0; i < message.length; i++) {
        // letra para codificar
        letter = message[i].toLowerCase();
        // str.includes(char1)
        if(VOGAIS.includes(letter)){
            // caso onde a letra é uma vogal, somente adicione à mensagem
            cipher += letter;
        }
        else
        {   // caso onde a letra é uma consonante


            // pegamos a vogal mais proxima
            let closestVowel = getClosestVowel(letter);
            //pegamos a proxima consonante
            let nextconsonant = getNextconsonant(letter);
            
            // concatenamos com a string
            cipher+= (letter + closestVowel + nextconsonant)
           
        }
        
    }
    return cipher;
};


function getClosestVowel(consonant){
    // funcao que retorna a vogal mais proxima da consonante 
    const consonantIndex = ALFABETO.indexOf(consonant);
    // vamos achar o index das duas vogais mais proximas e compara-las para saber qual utilizar
    // busca para o inicio do alfabeto
    let firstVowelIndex = consonantIndex - 1;

    // enquanto a letra atual for diferente de uma vogal e for maior ou igual a 0
    while(!VOGAIS.includes(ALFABETO[firstVowelIndex]) && (firstVowelIndex >= 0))
    {
        // loop vai rodar enquanto ALFABETO[firstVowelIndex] != vogal

        firstVowelIndex--;

    }
    // busca para o fim do alfabeto
    let secondVowelIndex = consonantIndex + 1;

    // enquanto a letra atual for diferente de uma vogal e for menor que 26
    while(!VOGAIS.includes(ALFABETO[secondVowelIndex]) && (secondVowelIndex < 26)){
        secondVowelIndex++;
    }
    if (secondVowelIndex >= 26){
        // error treatment when the letter is z -> second vowel = 26, and 26-25 = 1 which is smaller thant the 25-20 we want;
        return ALFABETO[firstVowelIndex];
    }
    if(firstVowelIndex < 0){
        return ALFABETO[secondVowelIndex];
    }


    if(Math.abs(firstVowelIndex - consonantIndex) <= Math.abs(secondVowelIndex - consonantIndex)){
        // caso onde a distancia da primeira vogal é menor ou igual a segunda
        console.log(consonant);
        console.log(firstVowelIndex);

        return ALFABETO[firstVowelIndex];
    }
    else{   
        // caso onde a distancia para segunda vogal é menor que a primeira
        return ALFABETO[secondVowelIndex];
    }
}

function getNextconsonant(consonant){
    // caso onde é a ultima consonante retorne ela mesmo
    if (consonant == 'z'){
        return 'z'
    }
    // pegamos o index da consonante e retornamos a seguinte baseada na nossa constante de consonantes
    const index = consonantES.indexOf(consonant);
    // retornamos a proxima
    return consonantES[index+1]


}