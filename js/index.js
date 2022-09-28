const intext = document.getElementById('input-text')
const mainwin = document.getElementById('main-window')
const paragraph = document.getElementById('paragraph')
const line1t = document.getElementById('line1t')
const line1f = document.getElementById('line1f')
const line2t = document.getElementById('line2t')
const line2f = document.getElementById('line2f')
const line3t = document.getElementById('line3t')
const line3f = document.getElementById('line3f')
const line4t = document.getElementById('line4t')
const line4f = document.getElementById('line4f')
const wrong = document.getElementById('wrong')
var strv = '';


intext.addEventListener('keypress', function(e){
    if (e.key === 'Enter'){
        e.preventDefault();
        strv = intext.value
        console.log(strv);
        // textcompare(strv);
    }
})

function textcompare(t){
    var p=0
    while (p<textarry.length){
        for (var i=0; i<t.length; i++){
            if (t[i] == textarry[p][i]){
                console.log('t')
            } else {
                console.log(t[i], paragraphdata.innerHTML[i])
                wrong.innerHTML += `${paragraphdata.innerHTML.slice(i,i+1)} `
            }
        }
    }
    finished.innerHTML += paragraphdata.innerHTML.slice(0,i)
    paragraphdata.innerHTML = paragraphdata.innerHTML.slice(i)
    // paragraphdata.innerHTML.replace = ''
    str1.value = ''

}

// console.log([...Array(10)])
var  textnum = (window.getComputedStyle(paragraph).width.replace('px', '')/window.getComputedStyle(paragraph).fontSize.replace('px', '')).toFixed(0)
var textarry = []
console.log(textnum)
// console.log(背影.slice(0,textnum))
console.log(背影.length)

function paradataToText(para) {
    for (var i=0; i<para.length/textnum; i++){
        textarry.push(para.slice(i*textnum, (i+1)*textnum))    
    }
    console.log(textarry[0]);
}
paradataToText(背影)

line1t.innerHTML = textarry[0].slice(0,2)
line1f.innerHTML = textarry[0].slice(2)
line2f.innerHTML = textarry[1]
line3f.innerHTML = textarry[2]
line4f.innerHTML = textarry[3]



