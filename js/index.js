const intext = document.getElementById('input-text')
const mainwin = document.getElementById('main-window')
const lines = document.getElementById('lines')
const wrong = document.getElementById('wrong')

// how many text in one line
var  textnum = (window.getComputedStyle(lines).width.replace('px', '')/window.getComputedStyle(lines).fontSize.replace('px', '')).toFixed(0)

// paragraph to multi arrays
var textarry = []
var textarry, textlength, textrows, ps
var online = 2
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
paradataToText(背影)

//textarea press enter
const chicheck = /^[\u4E00-\u9FA5,\u2027,\u3001-\u301f,\uff01-\uff1f,\u2500]+$/
intext.addEventListener('keydown', function(e){
    if (e.key === 'Enter'){e.preventDefault()}
    
    setTimeout(()=>{
        if (chicheck.test(intext.value)) {
            var psed = document.querySelectorAll('.onspot')
            psed.forEach(ed => {ed.classList.remove('onspot')})
            ps[intext.value.length].classList.add('onspot')
            var psfn = document.querySelectorAll('.finished')
            psfn.forEach(fn => {
                fn.classList.remove('finished')
                fn.classList.remove('wrong')
            })
            for (var i=0; i<intext.value.length; i++) {ps[i].classList.add('finished')}
            psfn = document.querySelectorAll('.finished')

            for (var t=0; t<intext.value.length; t++) {
                if (intext.value[t] !== ps[t].innerHTML){
                    ps[t].classList.add('wrong')
                } else if (intext.value[t] == ps[t].innerHTML){
                    ps[t].classList.remove('wrong')
                }
            }

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
ps[0].classList.add('onspot')

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