function pageload() {
    $('.shots').hide();
    $('#result').hide();
    $('#help').hide();
    $('.rpsls').hide();
}

function showHideShots() {
    if (document.getElementById('opponent').checked == true) {
        $('.shots').show();
        if(document.getElementById('rps').checked == true) {
            $('.rpsls').hide();
        } else {
            $('.rpsls').show();
        }
    } else {
        $('.shots').hide();
    }
    $('#result').hide();
}

function startOver() {
    document.getElementById('userinput').reset();
    showHideShots();
    $('#help').hide();
    $('#rules')[0].innerText = "Show Rules";
}

function help(){
    $('#help').toggle();
    console.log($('#rules')[0].innerText);
    if( $('#rules')[0].innerText == "Show Rules") {
        $('#rules')[0].innerText = "Hide Rules";
    } else {
        $('#rules')[0].innerText = "Show Rules";
    }
}

async function playGame () {
    $('#result').hide();
    let check = document.getElementById('opponent');
    let game = $('input[type=radio][name=game]:checked').val();
    let shot = $('input[type=radio][name=shot]:checked').val();
    let baseurl = window.location.href + 'app/';
    let url = baseurl + game + '/play/';
    if (check.checked == true) {
        url += shot;
    }
    let response = await fetch(url);
    let result = await response.json();
    console.log(result);

    document.getElementById('playerImage').src = "./img/" + result.player + ".jpg";
    if (check.checked == true) {
        document.getElementById('opponentImage').src = "./img/" + result.opponent + ".jpg";
        document.getElementById('gameResult').innerHTML = 
                    "Result: " + result.result + 
                    "<br> You Played: " + result.player +
                    "<br> Opponent Played: " + result.opponent ;
    } else {
        document.getElementById('gameResult').innerText = "Result: " + result.player;
    }
    $('#result').slideDown('fast');
}