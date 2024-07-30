let columns = ["A", "B", "C", "D", "E", "F", "G", "H"];
let rows = ["1", "2", "3", "4", "5", "6", "7", "8"];
let pieceSpace;
let moveSpaces = [];
let currentTurn;
let check;
let checkKingId;
let kingCheckSpaces = [];
let checkmate = false;

function Move(id){

    if (checkmate == true){
        return;
    }

    if (pieceSpace != undefined){
        if (check == true && pieceSpace.split(" ")[1] == "King"){
            let kingPiece = document.getElementById(pieceSpace);
            kingPiece.style.background = "Red";
        }
        else {
            let removeSpace = document.getElementById(pieceSpace);
            removeSpace.style.background = "White";
        }
    }

    if (moveSpaces.length != 0){
        for (index in moveSpaces){
            let removeSpace = document.getElementById(moveSpaces[index]);
            removeSpace.style.background = "White";
        }
        for (spaceIndex in moveSpaces){
            if (id == moveSpaces[spaceIndex]){

                let moveSpaceLoc = moveSpaces[spaceIndex].split(" ")[0];
                let pieceSpaceLoc = pieceSpace.split(" ")[0];

                let removeMoveSpace = document.getElementById(moveSpaces[spaceIndex]);
                removeMoveSpace.style.background = "White";
                let removePieceSpace = document.getElementById(pieceSpace);
                removePieceSpace.style.background = "White";

                let moveSpacePiece = document.getElementById(moveSpaces[spaceIndex]);
                moveSpacePiece.innerHTML = document.getElementById(pieceSpace).innerHTML;
                let moveSpaceId = document.getElementById(moveSpaces[spaceIndex]);
                moveSpaceId.id = ""+ moveSpaceLoc +" "+ pieceSpace.split(" ")[1] +" "+ pieceSpace.split(" ")[2] +"";

                let pieceSpacePiece = document.getElementById(pieceSpace);
                pieceSpacePiece.innerHTML = "";
                let pieceSpaceId = document.getElementById(pieceSpace);
                pieceSpaceId.id = ""+ pieceSpaceLoc +" Empty None";

                let newPieceSpaceId = pieceSpaceId.id;
                let newMoveSpaceId = moveSpaceId.id;
                let pieceColour = pieceSpace.split(" ")[2];

                if (pieceColour == "Black"){
                    currentTurn = "White";
                }
            
                if (pieceColour == "White"){
                    currentTurn = "Black";
                }

                if (check == true){
                    check = false;
                }

                KingCheckCheck();

                if (check == true){

                    if (pieceColour == checkKingId.split(" ")[2] || (pieceColour != checkKingId.split(" ")[2] && pieceSpace.split(" ")[1] == "King")){

                        moveSpaces[spaceIndex] = newPieceSpaceId;
                        pieceSpace = newMoveSpaceId;

                        let moveSpaceLoc = moveSpaces[spaceIndex].split(" ")[0];
                        let pieceSpaceLoc = pieceSpace.split(" ")[0];

                        let removeMoveSpace = document.getElementById(moveSpaces[spaceIndex]);
                        removeMoveSpace.style.background = "White";
                        let removePieceSpace = document.getElementById(pieceSpace);
                        removePieceSpace.style.background = "White";

                        let moveSpacePiece = document.getElementById(moveSpaces[spaceIndex]);
                        moveSpacePiece.innerHTML = document.getElementById(pieceSpace).innerHTML;
                        let moveSpaceId = document.getElementById(moveSpaces[spaceIndex]);
                        moveSpaceId.id = ""+ moveSpaceLoc +" "+ pieceSpace.split(" ")[1] +" "+ pieceSpace.split(" ")[2] +"";

                        if (id.split(" ")[1] == "Empty"){
                            let pieceSpacePiece = document.getElementById(pieceSpace);
                            pieceSpacePiece.innerHTML = "";
                            let pieceSpaceId = document.getElementById(pieceSpace);
                            pieceSpaceId.id = ""+ pieceSpaceLoc +" Empty None";
                        }

                        if (id.split(" ")[1] != "Empty"){
                            let pieceSpacePiece = document.getElementById(pieceSpace);
                            pieceSpacePiece.innerHTML = "<img src= "+ id.split(" ")[1] +""+ id.split(" ")[2] +".png>";
                            let pieceSpaceId = document.getElementById(pieceSpace);
                            pieceSpaceId.id = id;
                        }

                        check = false;

                        KingCheckCheck();

                        if (check == true){
                            let checkSpace = document.getElementById(checkKingId);
                            checkSpace.style.background = "Red";
                        }

                        currentTurn = pieceColour;

                    }
                    else {

                        let checkSpace = document.getElementById(checkKingId);
                        checkSpace.style.background = "Red";

                        KingCheckMate();

                    }
                }

                if (checkKingId != undefined && check == false){

                    let kingSpace = document.getElementById(checkKingId);

                    if (kingSpace != null){
                        kingSpace.style.background = "White";
                    }

                }

                let currentTurnSignal = document.getElementById("Current Turn");
                currentTurnSignal.innerHTML = ""+ currentTurn +"'s Turn ";

                moveSpaces = [];
                pieceSpace = undefined;

                return;
            }
        }

        moveSpaces = [];
        pieceSpace = undefined;

    }

    let details = id.split(" ");
    let loc = details[0];
    let piece = details[1];
    let colour = details[2];
    let locL = loc.split("")[0];
    let locN = loc.split("")[1];

    if ((piece != "Empty" && currentTurn == undefined) || (piece != "Empty" && colour == currentTurn)){
        if (piece == "Pawn"){
            Pawn(id, locL, locN, colour);
        }
        else if (piece == "Rook"){
            Rook(id, locL, locN, colour);
        }
        else if (piece == "Bishop"){
            Bishop(id, locL, locN, colour);
        }
        else if (piece == "Knight"){
            Knight(id, locL, locN, colour);
        }
        else if (piece == "Queen"){
            Queen(id, locL, locN, colour);
        }
        else if (piece == "King"){
            King(id, locL, locN, colour);
        }
    }
}

function Pawn(id, locL, locN, colour){

    let moveIds = [];
    let moveLocN;
    let moveLocL;

    let opColour;
    let moveDirection;
    let changeLoc;

    if (colour == "Black"){
        opColour = "White";
        moveDirection = -1;
        changeLoc = 1;
    }

    if (colour == "White"){
        opColour = "Black";
        moveDirection = 1;
        changeLoc = 8;
    }

    if (locN == changeLoc){

        let changeList = ["Queen", "Bishop", "Knight", "Rook"];

        for (changeIndex in changeList){

            let changeBool = confirm("Change Pawn into "+ changeList[changeIndex] + "?");

            if (changeBool == true){

                let changePawn = document.getElementById(id);

                changePawn.innerHTML = "<img src= "+ changeList[changeIndex] +""+ colour +".png>"

                changePawn.id = ""+ id.split(" ")[0] + " " + changeList[changeIndex] + " " + id.split(" ")[2] + "";

                return;

            }
        }

        alert("Fine. I'll Choose For You Then.");

        let queen = "Queen";

        let changePawn = document.getElementById(id);

        changePawn.innerHTML = "<img src= "+ queen +""+ colour +".png>"

        changePawn.id = ""+ id.split(" ")[0] + " " + queen + " " + id.split(" ")[2] + "";

        return;
    }

    let moveAmount = 1;

    let pawnMoves = [0, 1, -1];

    if ((locN == "7" && colour == "Black") || (locN == "2" && colour == "White")){
        pawnMoves.push(0);
    }

    for (let move = 0; move < pawnMoves.length; move++){
        if (pawnMoves.length == 4){
            if (move == 3 && (moveIds.length > 0 && moveIds[0].split(" ")[1] == "Empty")){
                moveAmount = 2;
            }
        }
        moveLocN = rows[(rows.indexOf(locN) + (moveAmount * moveDirection))];
        moveLocL = columns[(columns.indexOf(locL) + pawnMoves[move])];
        if (moveLocL != undefined && moveLocN != undefined){
            let moveLoc = moveLocL.concat(moveLocN);
            let moveId = document.querySelector('[id^="'+ moveLoc +'"]').id;
            if (moveId.split(" ")[2] != colour){
                if (moveId.split(" ")[2] == "None" && (move == 0 || move == 3)){
                    moveIds.push(moveId);
                    let pieceLoc = document.getElementById(id);
                    pieceLoc.style.background = "Blue";
                    let moveSpace = document.getElementById(moveId);
                    moveSpace.style.background = "Grey";
                }
                else if (moveId.split(" ")[2] == opColour && (move == 1 || move == 2)){
                    moveIds.push(moveId);
                    let pieceLoc = document.getElementById(id);
                    pieceLoc.style.background = "Blue";
                    let moveSpace = document.getElementById(moveId);
                    moveSpace.style.background = "Red";
                }
            }
        }
    }

    moveSpaces = moveIds;
    pieceSpace = id;

}

function Rook(id, locL, locN, colour){

    let moveIds = [];
    let moveLocN;
    let moveLocL;

    let opColour;

    if (colour == "Black"){
        opColour = "White";
    }

    if (colour == "White"){
        opColour = "Black";
    }

    let rookMoves = [-1, 1, -1, 1];

    for (let move = 0; move < rookMoves.length; move++){

        let moveAmount = 1;

        let rowMove = rookMoves[move];
        let columnMove = 0;

        if (move == 2 || move == 3){
            rowMove = 0;
            columnMove = rookMoves[move];
        }

        while (moveAmount != 0){
            moveLocN = rows[(rows.indexOf(locN) + (moveAmount * rowMove))];
            moveLocL = columns[(columns.indexOf(locL) + (moveAmount * columnMove))];
            if (moveLocL != undefined && moveLocN != undefined){
                let moveLoc = moveLocL.concat(moveLocN);
                let moveId = document.querySelector('[id^="'+ moveLoc +'"]').id;
                if (moveId.split(" ")[2] != colour){
                    if (moveId.split(" ")[2] == "None"){
                        moveIds.push(moveId);
                        let pieceLoc = document.getElementById(id);
                        pieceLoc.style.background = "Blue";
                        let moveSpace = document.getElementById(moveId);
                        moveSpace.style.background = "Grey";
                        moveAmount++;
                    }
                    else if (moveId.split(" ")[2] == opColour){
                        moveIds.push(moveId);
                        let pieceLoc = document.getElementById(id);
                        pieceLoc.style.background = "Blue";
                        let moveSpace = document.getElementById(moveId);
                        moveSpace.style.background = "Red";
                        moveAmount = 0;
                    }
                }
                else {
                    moveAmount = 0;
                }
            }
            else {
                moveAmount = 0;
            }
        }
    }

    moveSpaces = moveIds;
    pieceSpace = id;

}

function Bishop(id, locL, locN, colour){

    let moveIds = [];
    let moveLocN;
    let moveLocL;

    let opColour;

    if (colour == "Black"){
        opColour = "White";
    }

    if (colour == "White"){
        opColour = "Black";
    }

    let bishopMoves = [1, -1, 1, -1];

    for (let move = 0; move < bishopMoves.length; move++){

        let moveAmount = 1;
        let rowMove = 1;
        let columnMove = bishopMoves[move];

        if (move == 2 || move == 3){
            rowMove = -1;
        }

        while (moveAmount != 0){
            moveLocN = rows[(rows.indexOf(locN) + (moveAmount * rowMove))];
            moveLocL = columns[(columns.indexOf(locL) + (moveAmount * columnMove))];
            if (moveLocL != undefined && moveLocN != undefined){
                let moveLoc = moveLocL.concat(moveLocN);
                let moveId = document.querySelector('[id^="'+ moveLoc +'"]').id;
                if (moveId.split(" ")[2] != colour){
                    if (moveId.split(" ")[2] == "None"){
                        moveIds.push(moveId);
                        let pieceLoc = document.getElementById(id);
                        pieceLoc.style.background = "Blue";
                        let moveSpace = document.getElementById(moveId);
                        moveSpace.style.background = "Grey";
                        moveAmount++;
                    }
                    else if (moveId.split(" ")[2] == opColour){
                        moveIds.push(moveId);
                        let pieceLoc = document.getElementById(id);
                        pieceLoc.style.background = "Blue";
                        let moveSpace = document.getElementById(moveId);
                        moveSpace.style.background = "Red";
                        moveAmount = 0;
                    }
                }
                else {
                    moveAmount = 0;
                }
            }
            else {
                moveAmount = 0;
            }
        }
    }

    moveSpaces = moveIds;
    pieceSpace = id;

}

function Knight(id, locL, locN, colour){

    let moveIds = [];
    let moveLocN;
    let moveLocL;

    let opColour;

    if (colour == "Black"){
        opColour = "White";
    }

    if (colour == "White"){
        opColour = "Black";
    }

    let knightMoves = [2, -2, 2, -2];
    let knightMovesEnd = [1, -1];

    for (let move = 0; move < knightMoves.length; move++){
        for (let moveEnd = 0; moveEnd < knightMovesEnd.length; moveEnd++){

            let moveN = knightMoves[move];
            let moveL = knightMovesEnd[moveEnd];

            if (move == 2 || move == 3){
                moveN = knightMovesEnd[moveEnd];
                moveL = knightMoves[move];
            }

            moveLocN = rows[(rows.indexOf(locN) + moveN)];
            moveLocL = columns[(columns.indexOf(locL) + moveL)];
            if (moveLocL != undefined && moveLocN != undefined){
                let moveLoc = moveLocL.concat(moveLocN);
                let moveId = document.querySelector('[id^="'+ moveLoc +'"]').id;
                if (moveId.split(" ")[2] != colour){
                    if (moveId.split(" ")[2] == "None"){
                        moveIds.push(moveId);
                        let pieceLoc = document.getElementById(id);
                        pieceLoc.style.background = "Blue";
                        let moveSpace = document.getElementById(moveId);
                        moveSpace.style.background = "Grey";
                    }
                    else if (moveId.split(" ")[2] == opColour){
                        moveIds.push(moveId);
                        let pieceLoc = document.getElementById(id);
                        pieceLoc.style.background = "Blue";
                        let moveSpace = document.getElementById(moveId);
                        moveSpace.style.background = "Red";
                    }
                }
            }
        }
    }

    moveSpaces = moveIds;
    pieceSpace = id;

}

function Queen(id, locL, locN, colour){

    let moveIds = [];
    let moveLocN;
    let moveLocL;

    let opColour;

    if (colour == "Black"){
        opColour = "White";
    }

    if (colour == "White"){
        opColour = "Black";
    }

    let queenMoves = [1, -1, 1, -1, 1, -1, 1, -1];

    for (let move = 0; move < queenMoves.length; move++){

        let moveAmount = 1;

        let rowMove = queenMoves[move];
        let columnMove = 0;

        if (move == 2 || move == 3){
            rowMove = 0;
            columnMove = queenMoves[move];
        }
        if (move == 4 || move == 5){
            rowMove = 1;
            columnMove = queenMoves[move];
        }
        if (move == 6 || move == 7){
            rowMove = -1;
            columnMove = queenMoves[move];
        }

        while (moveAmount != 0){
            moveLocN = rows[(rows.indexOf(locN) + (moveAmount * rowMove))];
            moveLocL = columns[(columns.indexOf(locL) + (moveAmount * columnMove))];
            if (moveLocL != undefined && moveLocN != undefined){
                let moveLoc = moveLocL.concat(moveLocN);
                let moveId = document.querySelector('[id^="'+ moveLoc +'"]').id;
                if (moveId.split(" ")[2] != colour){
                    if (moveId.split(" ")[2] == "None"){
                        moveIds.push(moveId);
                        let pieceLoc = document.getElementById(id);
                        pieceLoc.style.background = "Blue";
                        let moveSpace = document.getElementById(moveId);
                        moveSpace.style.background = "Grey";
                        moveAmount++;
                    }
                    else if (moveId.split(" ")[2] == opColour){
                        moveIds.push(moveId);
                        let pieceLoc = document.getElementById(id);
                        pieceLoc.style.background = "Blue";
                        let moveSpace = document.getElementById(moveId);
                        moveSpace.style.background = "Red";
                        moveAmount = 0;
                    }
                }
                else {
                    moveAmount = 0;
                }
            }
            else {
                moveAmount = 0;
            }
        }
    }

    moveSpaces = moveIds;
    pieceSpace = id;

}

function King(id, locL, locN, colour){

    let moveIds = [];
    let moveLocN;
    let moveLocL;

    let opColour;

    if (colour == "Black"){
        opColour = "White";
    }

    if (colour == "White"){
        opColour = "Black";
    }

    let kingMoves = [1, -1, 1, -1, 1, -1, 1, -1];

    for (let move = 0; move < kingMoves.length; move++){

        let moveAmount = 1;
        let rowMove = kingMoves[move];
        let columnMove = 0;

        if (move == 2 || move == 3){
            rowMove = 0;
            columnMove = kingMoves[move];
        }
        if (move == 4 || move == 5){
            rowMove = 1;
            columnMove = kingMoves[move];
        }
        if (move == 6 || move == 7){
            rowMove = -1;
            columnMove = kingMoves[move];
        }

        moveLocN = rows[(rows.indexOf(locN) + (moveAmount * rowMove))];
        moveLocL = columns[(columns.indexOf(locL) + (moveAmount * columnMove))];
        if (moveLocL != undefined && moveLocN != undefined){
            let moveLoc = moveLocL.concat(moveLocN);
            let moveId = document.querySelector('[id^="'+ moveLoc +'"]').id;
            if (moveId.split(" ")[2] != colour){
                if (moveId.split(" ")[2] == "None"){
                    moveIds.push(moveId);
                    if (checkmate != true){
                        let pieceLoc = document.getElementById(id);
                        pieceLoc.style.background = "Blue";
                        let moveSpace = document.getElementById(moveId);
                        moveSpace.style.background = "Grey";
                    }
                }
                else if (moveId.split(" ")[2] == opColour){
                    moveIds.push(moveId);
                    if (checkmate != true){
                        let pieceLoc = document.getElementById(id);
                        pieceLoc.style.background = "Blue";
                        let moveSpace = document.getElementById(moveId);
                        moveSpace.style.background = "Red";
                    }
                }
            }
        }
    }

    moveSpaces = moveIds;
    pieceSpace = id;

}

function KingCheckCheck(moveList, changeColour){

    let kingIds = document.querySelectorAll('[id*="King"]');

    let kingId1 = kingIds[0].id;

    let kingId2 = kingIds[1].id;

    let kingList = [kingId1, kingId2];

    if (checkKingId != undefined){

        for (kingListIndex in kingList){

            if (kingList[kingListIndex] == checkKingId){
                
                if (kingListIndex == 0){

                    break;

                }
                else if (kingListIndex == 1){

                    kingList[0] = kingList[kingListIndex];

                    kingList[1] = kingId1;

                }
            }
        }
    }

    checkSpaces = [];

    if (check == true){
        kingList = [];
        kingList.push(moveList);
    }

    let colour;
    let opColour;

    for (kingIndex in kingList){

        if (check == true){

            if (changeColour != undefined){
                colour = changeColour;
            }
            else {
                colour = checkKingId.split(" ")[2];

                if (kingList[kingIndex].split(" ")[2] == colour){
                    return;
                }
            }

            if (colour == "Black"){
                opColour = "White";
            }

            if (colour == "White"){
                opColour = "Black";
            }

        }

        if (kingList[kingIndex].split(" ")[2] == "Black"){
            colour = "Black";
            opColour = "White";
        }

        if (kingList[kingIndex].split(" ")[2] == "White"){
            colour = "White";
            opColour = "Black";
        }

        let kingLoc = kingList[kingIndex].split(" ")[0];
        let kingLocL = kingLoc.split("")[0];
        let kingLocN = kingLoc.split("")[1];

        let pawnMoves = [0, 1, -1];

        checkSpaces = [];

        for (pawnIndex in pawnMoves){

            let checkDirection;

            if (colour == "Black"){
                checkDirection = -1;
            }

            if (colour == "White"){
                checkDirection = 1;
            }

            checkSpaces = [];

            let checkLocN = rows[(rows.indexOf(kingLocN) + checkDirection)];
            let checkLocL = columns[(columns.indexOf(kingLocL) + pawnMoves[pawnIndex])];

            if (checkLocL != undefined && checkLocN != undefined){

                let checkLoc = checkLocL.concat(checkLocN);
                let checkId = document.querySelector('[id^="'+ checkLoc +'"]').id;

                checkSpaces.push(checkId);

                if (checkId.split(" ")[1] == "Pawn" && checkId.split(" ")[2] == opColour && ((pawnIndex == 0 && kingList[kingIndex].split(" ")[1] == "Empty") || (pawnIndex != 0 && kingList[kingIndex].split(" ")[1] != "Empty"))){

                    if (check == true){
                        return;
                    }

                    kingCheckSpaces = checkSpaces;
                    check = true;
                    checkKingId = kingList[kingIndex];
                    return;
                }
            }
        }

        let rookqueenMoves = [1, -1, 1, -1];

        checkSpaces = [];

        for (rookqueenIndex in rookqueenMoves){

            let moveAmount = 1;

            let rowMove = rookqueenMoves[rookqueenIndex];
            let columnMove = 0;

            if (rookqueenIndex == 2 || rookqueenIndex == 3){
                rowMove = 0;
                columnMove = rookqueenMoves[rookqueenIndex];
            }

            checkSpaces = [];

            while (moveAmount != 0){

                let checkLocN = rows[(rows.indexOf(kingLocN) + (moveAmount * rowMove))];
                let checkLocL = columns[(columns.indexOf(kingLocL) + (moveAmount * columnMove))];

                if (checkLocL != undefined && checkLocN != undefined){

                    let checkLoc = checkLocL.concat(checkLocN);
                    let checkId = document.querySelector('[id^="'+ checkLoc +'"]').id;

                    checkSpaces.push(checkId);

                    if (checkId.split(" ")[2] != colour){

                        if ((checkId.split(" ")[1] == "Rook") || (checkId.split(" ")[1] == "Queen") || (checkId.split(" ")[1] == "Empty")){

                            if ((checkId.split(" ")[1] == "Rook" && checkId.split(" ")[2] == opColour) || (checkId.split(" ")[1] == "Queen" && checkId.split(" ")[2] == opColour)){

                                if (check == true){
                                    return;
                                }

                                kingCheckSpaces = checkSpaces;
                                check = true;
                                checkKingId = kingList[kingIndex];
                                return;
                            }

                            moveAmount = moveAmount + 1;

                        }
                        else {
                            moveAmount = 0;
                        }
                    }
                    else {
                        moveAmount = 0;
                    }
                }
                else {
                    moveAmount = 0;
                }
            }
        }

        let bishopqueenMoves = [1, -1, 1, -1];

        checkSpaces = [];

        for (bishopqueenIndex in bishopqueenMoves){

            let moveAmount = 1;
            let rowMove = 1;
            let columnMove = bishopqueenMoves[bishopqueenIndex];

            if (bishopqueenIndex == 2 || bishopqueenIndex == 3){
                rowMove = -1;
            }

            checkSpaces = [];

            while (moveAmount != 0){

                let checkLocN = rows[(rows.indexOf(kingLocN) + (moveAmount * rowMove))];
                let checkLocL = columns[(columns.indexOf(kingLocL) + (moveAmount * columnMove))];

                if (checkLocL != undefined && checkLocN != undefined){

                    let checkLoc = checkLocL.concat(checkLocN);
                    let checkId = document.querySelector('[id^="'+ checkLoc +'"]').id;

                    checkSpaces.push(checkId);

                    if (checkId.split(" ")[2] != colour){

                        if ((checkId.split(" ")[1] == "Bishop") || (checkId.split(" ")[1] == "Queen") || (checkId.split(" ")[1] == "Empty")){

                            if ((checkId.split(" ")[1] == "Bishop" && checkId.split(" ")[2] == opColour) || (checkId.split(" ")[1] == "Queen" && checkId.split(" ")[2] == opColour)){

                                if (check == true){
                                    return;
                                }

                                kingCheckSpaces = checkSpaces;
                                check = true;
                                checkKingId = kingList[kingIndex];
                                return;
                            }

                            moveAmount = moveAmount + 1;

                        }
                        else {
                            moveAmount = 0;
                        }
                    }
                    else {
                        moveAmount = 0;
                    }
                }
                else {
                    moveAmount = 0;
                }
            }
        }

        let knightMoves = [2, -2, 2, -2];
        let knightMovesEnd = [1, -1];

        checkSpaces = [];

        for (knightMovesIndex in knightMoves){
            for (knightMovesEndIndex in knightMovesEnd){

                let checkN = knightMoves[knightMovesIndex];
                let checkL = knightMovesEnd[knightMovesEndIndex];

                if (knightMovesIndex == 2 || knightMovesIndex == 3){
                    checkN = knightMovesEnd[knightMovesEndIndex];
                    checkL = knightMoves[knightMovesIndex];
                }

                checkSpaces = [];

                let checkLocN = rows[(rows.indexOf(kingLocN) + checkN)];
                let checkLocL = columns[(columns.indexOf(kingLocL) + checkL)];

                if (checkLocL != undefined && checkLocN != undefined){

                    let checkLoc = checkLocL.concat(checkLocN);
                    let checkId = document.querySelector('[id^="'+ checkLoc +'"]').id;

                    checkSpaces.push(checkId);

                    if (checkId.split(" ")[1] == "Knight" && checkId.split(" ")[2] == opColour){

                        if (check == true){
                            return;
                        }

                        kingCheckSpaces = checkSpaces;
                        check = true;
                        checkKingId = kingList[kingIndex];
                        return;
                    }

                }
            }
        }

        let kingMoves = [1, -1, 1, -1, 1, -1, 1, -1];

        for (kingMovesIndex in kingMoves){

            let moveAmount = 1;
            let rowMove = kingMoves[kingMovesIndex];
            let columnMove = 0;

            if (kingMovesIndex == 2 || kingMovesIndex == 3){
                rowMove = 0;
                columnMove = kingMoves[kingMovesIndex];
            }
            if (kingMovesIndex == 4 || kingMovesIndex == 5){
                rowMove = 1;
                columnMove = kingMoves[kingMovesIndex];
            }
            if (kingMovesIndex == 6 || kingMovesIndex == 7){
                rowMove = -1;
                columnMove = kingMoves[kingMovesIndex];
            }

            let checkLocN = rows[(rows.indexOf(kingLocN) + (moveAmount * rowMove))];
            let checkLocL = columns[(columns.indexOf(kingLocL) + (moveAmount * columnMove))];

            if (checkLocL != undefined && checkLocN != undefined){

                let checkLoc = checkLocL.concat(checkLocN);
                let checkId = document.querySelector('[id^="'+ checkLoc +'"]').id;

                if (checkId.split(" ")[1] == "King" && checkId.split(" ")[2] == opColour && checkId != checkKingId){

                    if (check == true){
                        return;
                    }

                    kingCheckSpaces = checkSpaces;
                    check = true;
                    checkKingId = kingList[kingIndex];
                    return;

                }
            }
        }

        if (check == true){
            checkmate = false;
            return;
        }

    }
}

function KingCheckMate(){

    if (check == true){

        let kingLoc = checkKingId.split(" ")[0];
        let kingLocL = kingLoc.split("")[0];
        let kingLocN = kingLoc.split("")[1];
        let kingColour = checkKingId.split(" ")[2];

        checkmate = true;

        King(checkKingId, kingLocL, kingLocN, kingColour);

        let kingMoveSpaces = moveSpaces;

        for (moveSpaceIndex in kingMoveSpaces){

            KingCheckCheck(kingMoveSpaces[moveSpaceIndex]);

            if (checkmate == false){
                return;
            }

            kingMoveSpaces.splice(moveSpaceIndex, 1);
            checkmate = true;

        }

        if (checkmate == true){

            let checkColour;

            if (kingColour == "Black"){
                checkColour = "White";
            }

            if (kingColour == "White"){
                checkColour = "Black";
            }

            for (kingCheckSpaceIndex in kingCheckSpaces){

                KingCheckCheck(kingCheckSpaces[kingCheckSpaceIndex], checkColour);

                if (checkmate == true){
                    checkmate = false;
                    return;
                }
    
                kingMoveSpaces.splice(moveSpaceIndex, 1);
                checkmate = true;

            }

            if (checkmate == true){

                let checkmateText = document.getElementById("Current Turn");
                checkmateText.innerHTML = "Checkmate! "+ checkColour +" Wins!";

                exit();

            }
        }
    }
}