const intext = document.getElementById('input-text')
const mainwin = document.getElementById('main-window')
const finished = document.getElementById('finished')
const paragraph = document.getElementById('paragraph')
const paradata = document.getElementById('paragraphdata')
const wrong = document.getElementById('wrong')
var strv = '';


// str1.addEventListener('keypress', function(e){
//     if (e.key === 'Enter'){
//         e.preventDefault();
//         strv = str1.value
//         textcompare(strv);
//     }
// })

// function textcompare(t){
//     for (var i=0; i<t.length; i++){
//         if (t[i] == paragraphdata.innerHTML[i]){
//             console.log('t')
//         } else {
//             console.log(t[i], paragraphdata.innerHTML[i])
//             wrong.innerHTML += `${paragraphdata.innerHTML.slice(i,i+1)} `
//         }
//     }
//     console.log(i-paragraphdata.innerHTML.length)
//     finished.innerHTML += paragraphdata.innerHTML.slice(0,i)
//     paragraphdata.innerHTML = paragraphdata.innerHTML.slice(i)
//     // paragraphdata.innerHTML.replace = ''
//     str1.value = ''

// }

// console.log([...Array(10)])
var  textnum = window.getComputedStyle(mainwin).width.replace('px', '')/window.getComputedStyle(paragraph).fontSize.replace('px', '')
var textarry = []
console.log(textnum)
// console.log(背影.slice(0,textnum))
console.log(背影.length)

function paradataToText(para) {
    for (var i=0; i<para.length/textnum; i++){
        textarry.push(para.slice(i*textnum, (i+1)*textnum))    
    }
    console.log(textarry);
}

paradataToText(背影)

