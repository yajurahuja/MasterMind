pragma circom 2.0.0;

include "../../../node_modules/circomlib/circuits/comparators.circom";
include "../../../node_modules/circomlib/circuits/gates.circom";
include "../../../node_modules/circomlib/circuits/poseidon.circom";

//Match Template is used to check if a guess input peg and a solution input peg match
template Match()
{
    signal input input1;
    signal input input2;
    signal output match;

    component check_match = IsEqual();
    check_match.in[0] <== input1;
    check_match.in[1] <== input2;
    match <== check_match.out;
}
//Remove Match Template is used to find the matches which have been double counted and used to filter them out
//1) Filter out a red peg match (i.e. guess colour and solution color match but the position is different) if a black peg already exits
//2) Filter out a red peg match if an less indexed guess red peg match exists.
//TODO: 
template RemoveMatch()
{
    signal input input1;
    signal input input2;
    signal output match;
    component not = NOT();
    not.in <== input2;

    component and = AND();
    and.a <== input1;
    and.b <== not.out;
    match <== and.out;
}

template Present()
{
    signal input input1;
    signal input input2;
    signal output present;
    component check = IsZero();

    check.in <== input1 + input2;
    present <== (1 - check.out);
     
}


template VerifyCombination() {
    //game parameters
    

    //Solution Combination for the game
    signal input solCombination[4];
    //Guess Input for the turn
    signal input guessCombination[4];
    //Hint generated for the turn
    signal output hint[4];
    var pins = 4;

    //get black pegs: The following loop gets all the black pegs for the hint
    signal output blackpegs[4];

    component checkBlack[4];
    for(var i = 0; i < pins; i++)
    {
        checkBlack[i] = Match();
        checkBlack[i].input1 <== guessCombination[i]; //input 1
        checkBlack[i].input2 <== solCombination[i]; //input 2
        blackpegs[i] <== checkBlack[i].match; //output is true if input1 == input2
    }

    //get red pegs: We first need to get all the cross position matches (i,j) then filter out duplicate matches
    //This will keep track of all the cross matches
    component crossMatch[4][4];
    //This will keep track of only cross matches: removes the direct matches (i, i)
    component onlyCrossMatch[4][4];
    component singleCrossMatch[4][4];
    component alreadyPresent[4][4];
    //Get all the Cross Matches
    for(var i = 0; i < pins; i++){
        for(var j = 0; j < pins; j++){
            crossMatch[i][j] = Match();
            crossMatch[i][j].input1 <== guessCombination[i];
            crossMatch[i][j].input2 <== solCombination[j];
        }
    }

    //2D for blackpegs
    component blackpegs_[4][4];
    for(var i = 0; i < pins; i++){
        for(var j = 0; j < pins; j++){
            blackpegs_[i][j] = OR();
            blackpegs_[i][j].a <== blackpegs[i];
            blackpegs_[i][j].b <== blackpegs[j];
        }
    }

    //Remove any Cross Match which is a direct Match (same position/blackpeg) [Cross Match ^ (Not a Direct Match)]
    for(var i = 0; i < pins; i++){
        for(var j = 0; j < pins; j++){
            onlyCrossMatch[i][j] = RemoveMatch();
            onlyCrossMatch[i][j].input1 <== crossMatch[i][j].match;
            onlyCrossMatch[i][j].input2 <== blackpegs_[i][j].out;
        }
    }

    //Find already present cross Match 
    for(var i = 0; i < pins; i++){
        alreadyPresent[0][i] = Present();
        alreadyPresent[0][i].input1 <== 0;
        alreadyPresent[0][i].input2 <== 0;
    }

    for(var j = 0; j < pins; j++){
        for(var i = 0; i < pins - 1; i++){
            alreadyPresent[i+1][j] = Present();
            alreadyPresent[i+1][j].input1 <== alreadyPresent[i][j].present;
            alreadyPresent[i+1][j].input2 <== onlyCrossMatch[i][j].match;
        }
    }
    //Filter out duplicate matches
    for(var i = 0; i < pins; i++){
        for(var j = 0; j < pins; j++){
            singleCrossMatch[i][j] = RemoveMatch();
            singleCrossMatch[i][j].input1 <== onlyCrossMatch[i][j].match;
            if(i == 0)
                singleCrossMatch[i][j].input2 <== i;
            else
                singleCrossMatch[i][j].input2 <== alreadyPresent[i][j].present;
        }
    }

    //get red pegs'

    component redpegs[4][4];
    for(var i = 0; i < pins; i++){
        for(var j = 0; j < pins; j++){
            redpegs[i][j] = Present();
            if(j == 0)
                redpegs[i][j].input1 <== j;
            else
                redpegs[i][j].input1 <== redpegs[i][j-1].present;
            redpegs[i][j].input2 <== singleCrossMatch[i][j].match;
        }
    }
    
    for(var i = 0; i < pins; i++){
        hint[i] <== (blackpegs[i] * 2) + redpegs[i][3].present;
    }
    //hash the solution
    //log(hint[0]);
}


component main = VerifyCombination();

// INPUT = {
//      "solution": [ 1, 2, 3, 4],
//   "guess": [ 3, 0, 4, 2]
// };