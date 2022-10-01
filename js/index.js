const intext = document.getElementById('input-text')
const mainwin = document.getElementById('main-window')
const lines = document.getElementById('lines')
const wrong = document.getElementById('wrong')
var strv = '';

// how many text in one line
var  textnum = (window.getComputedStyle(lines).width.replace('px', '')/window.getComputedStyle(lines).fontSize.replace('px', '')).toFixed(0)

// paragraph to multi arrays
var textarry = []
var textlength
var ps = []
function paradataToText(paradata) {
    for (var i=0; i<paradata.length; i++){
        textarry.push(paradata.slice(i, i+1))
    }
    textlength = textarry.length

    var textrows = Math.ceil(textarry.length/textnum)
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
paradataToText(背影)

// function textarryShow(arry) {
//     for (var r=0; r<textrows; r++) {
//         var divtag = document.createElement('div')
//         for (var c=0; c<textnum; c++) {
            
//             var ptag = document.createElement('p')
//             var ptext = document.createTextNode(arry[0])
//             ptag.appendChild(ptext)
//             divtag.appendChild(ptag)
//             arry.splice(0,1)

//             if (arry[0] == undefined) {break}
//         }
//         divtag.setAttribute('id', `line${r}`)
//         lines.appendChild(divtag)
//     }
// }
// textarryShow(textarry)


// var tr = 3
// console.log(document.getElementById(`line${tr}`).children[2].innerHTML);
//textarea press enter
intext.addEventListener('keypress', function(e){
    if (e.key === 'Enter'){
        e.preventDefault();
        strv = intext.value
        lines.scrollBy({
            //scroll (alltextinputed/textnum).floor()lines
            top: window.getComputedStyle(lines).lineHeight.replace('px', ''),
            behavior: 'smooth'
        })
    }
    // setTimeout(()=>{console.log(intext.value, 't')},1)
    console.log(document.getElementsByClassName('onspot'));
    console.log(textlength);
    for (var i=0; i<textlength; i++) {
        console.log(i);
        if (ps[i].classList.contains('onspot')) {
            console.log(i);
            ps[i].classList.remove('onspot')
            ps[i+1].classList.add('onspot')
            break
        }
    }

})
ps[1].classList.add('onspot')

//text compare
function textcompare(instr){
    var linenum = instr/textnum
    for (var t=0; t<instr; t++){
        for (var p=0; p<textarry.length; p++){
            for (var i=0; i<t.length; i++){
                if (t[i] == textarry[p][i]){
                    console.log('t')
                } else {
                    console.log(t[i], paragraphdata.innerHTML[i])
                    wrong.innerHTML += `${paragraphdata.innerHTML.slice(i,i+1)} `
                }
            }
        }
    }
    finished.innerHTML += paragraphdata.innerHTML.slice(0,i)
    paragraphdata.innerHTML = paragraphdata.innerHTML.slice(i)
    // paragraphdata.innerHTML.replace = ''
    str1.value = ''

}

// console.log([...Array(10)])


// line1t.innerHTML = textarry[0].slice(0,2)
// line1f.innerHTML = textarry[0].slice(2)
// line2f.innerHTML = textarry[1]
// line3f.innerHTML = textarry[2]
// line4f.innerHTML = textarry[3]

// console.log(document.getElementsByTagName('div'));