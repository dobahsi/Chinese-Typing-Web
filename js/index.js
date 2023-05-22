const intext = document.getElementById('input-text')
const mainwin = document.getElementById('main-window')
const lines = document.getElementById('lines')
const wrong = document.getElementById('wrong')
const selpara = document.getElementById('select-para')
const buttimer = document.getElementById('button-timer')
const buttext = document.getElementById('button-text')
const buttool = document.getElementById('button-tool')
const buts = document.getElementsByClassName('buts')
const endscr = document.getElementById('end-screen')
const time = document.getElementById('time')
const rpm = document.getElementById('rpm')
const acc = document.getElementById('acc')


// how many text in one line
var  textnum = (window.getComputedStyle(lines).width.replace('px', '')/window.getComputedStyle(lines).fontSize.replace('px', '')).toFixed(0)

// paragraph to multi arrays
var textarry = []
var textlength, textrows, ps
function paradataToText(paradata) {
    lines.innerHTML = ''
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
paradataToText(paras['紙船印象'])

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
            if (intext.value.length !== ps.length){ps[intext.value.length].classList.add('onspot')}
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
                lines.scroll({
                    top: 45*(online-1),
                    behavior: 'smooth'
                })
                online++
            }else if (e.key === 'Backspace' && psfn.length<(online-1)*textnum){
                online-=1
                lines.scroll({
                    top: 45*(online-2),
                    behavior: 'smooth'
                })
            }
        }
    },10)
})

//buttons
function butclick(e) {
    if (e == 'timer') {
        buttimer.classList.add('button-selected')
        buttext.classList.remove('button-selected')
        buttool.classList.remove('button-selected')

        buts[0].innerHTML = '30'
        buts[1].innerHTML = '60'
        buts[2].innerHTML = '180'
        buts[3].innerHTML = '300'
    }else if (e == 'text') {
        buttext.classList.add('button-selected')
        buttimer.classList.remove('button-selected')
        buttool.classList.remove('button-selected')

        buts[0].innerHTML = '20'
        buts[1].innerHTML = '50'
        buts[2].innerHTML = '100'
        buts[3].innerHTML = '200'
    }else if (e == 'tool') {
        buttool.classList.add('button-selected')
        buttimer.classList.remove('button-selected')
        buttext.classList.remove('button-selected')

        buts[0].innerHTML = '99'
        buts[1].innerHTML = '99'
        buts[2].innerHTML = '999'
        buts[3].innerHTML = '999'
    }else{
        for (var i=1; i<5; i++) {
            if(e == 'but'+i){
                buts[i-1].classList.add('button-selected')
            }else{
                buts[i-1].classList.remove('button-selected')
            }
        }
    }

    selbuts = document.getElementsByClassName('button-selected')
    if (selbuts[1].id == 'button-text') {
        var slicepara = paras[selpara.value].slice(0, selbuts[2].innerHTML*1)
        paradataToText(slicepara)
    } else if (selbuts[1].id == 'button-timer' || selbuts[1].id == 'button-tool'){
        paradataToText(paras[selpara.value])
    }
}

//timer start
var correctnum = 0
var wrongnum = 0
var finaltext = []
var finaltextcheck = []
var timer, selbuts, totaltime
var running = 0

function timerstart() {
    console.log('start');
    if (running == 1) {intext.removeEventListener("keydown", timerstart())}

    selbuts = document.getElementsByClassName('button-selected')
    timer = 0
    if (selbuts[1].id == 'button-timer') {
        timer = totaltime = selbuts[2].innerHTML
        const countdown = setInterval(() => {
            timer--
            if (timer <= 0 || ps[ps.length-1].classList.contains('finished')) {
                totaltime = totaltime - timer
                endtyping()
                clearInterval(countdown)
            }
        }, 1000)

    } else if (selbuts[1].id == 'button-text' || selbuts[1].id == 'button-tool') {
        const countup = setInterval(() => {
            timer++
            if (ps[ps.length-1].classList.contains('finished')){
                endtyping()
                clearInterval(countup)
            }
        }, 1000)
    }
}

if (running == 0) {
    intext.addEventListener("keydown", timerstart())
    running = 1
}

//end typing
function endtyping() {
    for (var i=0; i<intext.value.length; i++){finaltextcheck.push(intext.value[i])}
    finaltextcheck.forEach(v => {if (chicheck.test(v)) {finaltext.push(v)}})
    console.log(finaltext.length);
    for (var t=0; t<finaltext.length; t++) {
        if (!ps[t]) {break}
        
        if (finaltext[t] !== ps[t].innerHTML){wrongnum++}
        else if (finaltext[t] == ps[t].innerHTML){correctnum++}
    }

    if (selbuts[1].id == 'button-text') {totaltime = timer}
    console.log(timer, finaltext, correctnum, wrongnum);
    endscr.classList.remove('displaynone')
    time.innerHTML = totaltime + 's'
    rpm.innerHTML = (correctnum/(totaltime/60)).toFixed(0)
    acc.innerHTML = (correctnum/(wrongnum+correctnum)*100).toFixed(0) + '%'
}

function restart() {
    endscr.classList.add('displaynone')
    intext.value = ''
    butclick('but1')
    online = 2
    ps[0].classList.add('onspot')
    psed = document.querySelectorAll('.onspot')
    psed.forEach(ed => {ed.classList.remove('onspot')})
    psed[0].classList.add('onspot')
    psfn = document.querySelectorAll('.finished')
    psfn.forEach(fn => {
        fn.classList.remove('finished')
        fn.classList.remove('wrong')
    })
    for (var i=0; i<ps.length; i++) {ps[i].classList.remove('finished')}
    psfn = document.querySelectorAll('.finished')
    timer = 0
    correctnum = 0
    wrongnum = 0
    finaltext = []
    finaltextcheck = []
    totaltime = 0
    running = 0
    intext.addEventListener("keydown", timerstart())
}