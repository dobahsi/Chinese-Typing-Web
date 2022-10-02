const intext = document.getElementById('input-text')
const mainwin = document.getElementById('main-window')
const lines = document.getElementById('lines')
const wrong = document.getElementById('wrong')
const seltime = document.getElementById('select-time')

// how many text in one line
var  textnum = (window.getComputedStyle(lines).width.replace('px', '')/window.getComputedStyle(lines).fontSize.replace('px', '')).toFixed(0)

// paragraph to multi arrays
var textarry = []
var textlength, textrows, ps
function paradataToText(paradata) {
    for (var i=0; i<paradata.length; i++){textarry.push(paradata.slice(i, i+1))}

    textlength = textarry.length
    textrows = Math.ceil(textarry.length/textnum)

    for (var r=0; r<textrows; r++) {
        var divtag = document.createElement('div')
        for (var c=0; c<textnum; c++) {
            var ptag = document.createElement('p')
            var ptext = document.createTextNode(textarry[0])
            ptag.appendChild(ptext)
            divtag.appendChild(ptag)
            textarry.splice(0,1)
            if (textarry[0] == undefined) {break}
        }
        divtag.setAttribute('id', `line${r}`)
        divtag.setAttribute('class', 'lineclass')
        lines.appendChild(divtag)
    }

    ps = document.getElementsByTagName('p')
}
paradataToText(紙船印象)

//textarea input words
var online = 2
var psed, psfn
ps[0].classList.add('onspot')
const chicheck = /^[\u4E00-\u9FA5,\u2027,\u3001-\u301f,\uff01-\uff1f,\u2500]+$/
intext.addEventListener('keydown', function(e){
    if (e.key === 'Enter'){e.preventDefault()}
    
    setTimeout(()=>{
        if (chicheck.test(intext.value)) {
            //finished
            psed = document.querySelectorAll('.onspot')
            psed.forEach(ed => {ed.classList.remove('onspot')})
            ps[intext.value.length].classList.add('onspot')
            psfn = document.querySelectorAll('.finished')
            psfn.forEach(fn => {
                fn.classList.remove('finished')
                fn.classList.remove('wrong')
            })
            for (var i=0; i<intext.value.length; i++) {ps[i].classList.add('finished')}
            psfn = document.querySelectorAll('.finished')

            //if wrong
            for (var t=0; t<intext.value.length; t++) {
                if (intext.value[t] !== ps[t].innerHTML){
                    ps[t].classList.add('wrong')
                    ps[t].classList.remove('fished')
                } else if (intext.value[t] == ps[t].innerHTML){
                    ps[t].classList.remove('wrong')
                    ps[t].classList.add('fished')
                }
            }

            //line scroll
            if (psfn.length>=online*textnum) {
                lines.scrollBy({
                    top: 45,
                    behavior: 'smooth'
                })
                online++
            }else if (e.key === 'Backspace' && psfn.length<(online-1)*textnum){
                lines.scrollBy({
                    top: -45,
                    behavior: 'smooth'
                })
                online-=1
            }
        }
    },10)
})


//timer select
var timer = seltime.value*5*1000
function setTimer() {
    console.log(seltime.value);
    timer = seltime.value*5*1000
}
// setTimer()

//timer start
var correctnum = 0
var wrongnum = 0
var finaltext = []
var finaltextcheck = []
intext.addEventListener("keydown", function() {
    console.log('start');
    
    setTimeout(() => {
        for (var i=0; i<intext.value.length; i++){finaltextcheck.push(intext.value[i])}
        finaltextcheck.forEach(v => {if (chicheck.test(v)) {finaltext.push(v)}})
        
        for (var t=0; t<finaltext.length; t++) {
            if (finaltext[t] !== ps[t].innerHTML){wrongnum++}
            else if (finaltext[t] == ps[t].innerHTML){correctnum++}
        }
        console.log(finaltext, correctnum, wrongnum);
        
    }, timer);
}, {once : true});


// //text compare
// function textcompare(instr){
//     var linenum = instr/textnum
//     for (var t=0; t<instr; t++){
//         for (var p=0; p<textarry.length; p++){
//             for (var i=0; i<t.length; i++){
//                 if (t[i] == textarry[p][i]){
//                     console.log('t')
//                 } else {
//                     console.log(t[i], paragraphdata.innerHTML[i])
//                     wrong.innerHTML += `${paragraphdata.innerHTML.slice(i,i+1)} `
//                 }
//             }
//         }
//     }
//     finished.innerHTML += paragraphdata.innerHTML.slice(0,i)
//     paragraphdata.innerHTML = paragraphdata.innerHTML.slice(i)
//     // paragraphdata.innerHTML.replace = ''
// }