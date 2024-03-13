//boxes completely empty in starting

//selected boxes and query button

let boxes=document.querySelectorAll(".box");  //use ALL to select all boxes 
// console.log("boxes",boxes);  - this is an array which contains 9 buttons in it or array in which each element is a box
//and see indices also corresp. to each box- 1st box has 0 index and so on- like in js and c++

//console.log(boxes[8]);     //accesing button whose index is 8 - it also points to that button using inspect

let resetBtn = document.querySelector("#reset-btn");

//AS THERE ARE 2 PLAYERS, so 1st need to track x ki turn h ya o ki turn h bcs alternate turns aayegi dono players ki - so game ko pta hona
//chahiye ki next kiski turn hai, so take var. for it - 'turn'

let turn0= true; //player0 - means if turn0= true, means 0 ki turn and if turn0=false, then it means X ki turn

//now to keep track of 8 winning patterns, we use array to store them- but we have seen 1d arrays till now - now see 2D ARRAYS -
//MEANS ARRAY OF ARRAYS 

//2d array example - not much used in js but here we use it
// let arr2  = [['mango','litchi'], ['potato', 'tomato'], ['jacket','skirt']];

// console.log(arr2[0]);
// console.log(arr2[1][0]);  //can check index ke andar further index

//now store winning patterns in 2d array - can use strings to store it but 2D array is better to store them 
//seen in note - index starts from 0 and store indexes of each pattern as 1 elem of 2d array- 8 elem/patterns in it
const winPatterns =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

//now we want each box par click karne par kuch kaam ho - so each box pr event listener create 
//use for each loop to access each box of boxes above write

boxes.forEach((box) => {
    box.addEventListener("click",() => {              //this means when event ='click' ho , then ye 2nd argum. vla arrow function run hoga
        //console.log("button was clicked");        //SO WE ARE TRACKING ALL BOXES KI VO KAB CLICK HO RAHE HAI
        
        // box.innerText ="Abcd"; -when click button , then this text is shown on button but we want to give X OR O acc. to value of turn0
        
        if (turn0){    //player O        //here this means if turn0 is true
            box.innerText ="O";
            turn0= false; // here we change bcs alternate turns must be there- nexttime there is turn of X next time
        }else{    //player X
            box.innerText ="X";
            turn0= true;
        }

        //problem is if EK HI BOX PE AGAIN CLICK KRDO JISME 'O' LIKHA H, VO AGAIN CLICK KRNE PR 'X' ME CHANGE HO GYA - BUT AESA NHI HONA
        //CHAHIYE KYUKI JO KR DIA VO FIX HONA CHAHIYE -SO JAISE HI AAPNE BUTTON KO 1 BAAR CLICK KR DIYA, THEN USS BUTTON KO DISABLE KR DO
        //jisse ki uss button ko dubara click na kar pao - means AB BUTTON DISABLE HO GYA MEANS AB USS PAR CLICK NHI HOGA.

        box.disabled=true;   //button diable means ab usse click nhi kr skte

        //disable krne se background color change ho raha hai - bcs ye depend krta h button ke bg color pr by default, so now give 
        //yellowish color as bg color to button - bcs abhi tk nhi diya tha - bg color dene ke baad ab disable krne pr color not change.

        //ALSO TO TRACK WINNER KAUN H- ISKA BHI TRACK  BUTTON CLICK KE SAATH HI DEKHNA HOGA- SO MADE NEW FUNCTION

        checkWinner();

    });
});

const checkWinner =() =>{        //arrow function make
         //logic is yha par ek ek winning pattern se check krenge 3 positions lenge acc to each winning pattern , agar teeno positions
         //par same value hai to jo value rakhi h inn teeno boxes pr vo hi player winner hai otherwise check for next winning pattern.

         for (let pattern of winPatterns){          //each elem. 'patten' in this 2d array is also a array -so 1d array printed

            //code - console.log(pattern);         //if run this above see for each box, this function is called, so for each box when 
                                                   //you click on it then all 8 patterns are printed inn console.

            //now we get positions or index extracted out of these patterns, means each 'pattern' is of size 3, so access them using indices
            
            //code - console.log(pattern[0], pattern[1], pattern[2]);

            //now hume inn indices pr rakhe values or button ki values ko nikalana hai , so indices are pattern[0],pattern[1], pattern[2]
            //and boxes is 2d array so - each value ko access krne ke liye write boxes[pattern[0]], bcs see above boxes array so
            //index deke can access that particular box - above also tried - see once AND ALSO
            // winpatterns me humne indices hi store kiye the jinke combo se player can win

            //code - console.log(boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]]);

            //see by hovering on code jha buttons - see it points out to that index in web page also

            //now we access innertext of these buttons - so jha VALUE HOGI X YA O , VHA TO VO VALUE PRINT HO JAYEGI AND JHA BUTTON
            //EMPTY PADA HOGA - VHA PR EMPTY PRINT(KUCH PRINT NHI HOGA).

            //code - console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);

            //so ye hi innertext aapko 3 values dengi uss button ki(it will be either X or O) dengi and inko hi compare krna h-means
            //if they are same- then winner hai ye hi value

            let pos1Val = boxes[pattern[0]].innerText;
            let pos2Val = boxes[pattern[1]].innerText;
            let pos3Val = boxes[pattern[2]].innerText;

            //so values check krne se phle see ki button me if koi bhi value nhi h - means vo empty h then vo position winning pattern
            //ho hi nahi sakti - means if koi ek bhi empty hua among pos1 , pos2, pos3 ki values me se , then vo winner nhi hoga.

            if (pos1Val!="" && pos2Val !="" && pos3Val !=""){
                
                //winner ki condition
                if (pos1Val=== pos2Val && pos2Val===pos3Val){   //so checked for all  8 winning patterns- jab bhi ye aa rha h, winner print 
                                                                //ho raha hai successfully
                    console.log("winner", pos1Val);          //winner will be pos1val only
                    showWinner(pos1Val);
                }
            }

            //now see how to print winner and other functionalities in html again, also add feature of 'new game' also

         }
}


//added 3 more variables now 
let newGameBtn =document.querySelector("#new-btn");
let msgContainer =document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

//make new function of showwinner and call krenge isse checkwinner me jab winner ki conditions satisfy
 
const showWinner =(winner) =>{                   //winner is the argument which is passed from above- so value pass hui hai parameter me
      msg.innerText= `Congratulations, winner is ${winner}`;
      msgContainer.classList.remove("hide");     //see removed hide class jo msg container me daali thi- so ab display hoga message bhi
                                                 // and new game ka option bhi
      disableBoxes();
}

//also one issue is if get ek winner and then aap continue kr rhe ho and winner change ho gaya, then ye to game continue ho raha hai
//jo nahi karna hai- so jaise hi ek winner mile - tabhi hi saare buttons or boxes ko disable kar do - so showWinner me call disable
//function - then ye saare boxes ko disable kar dega -bcs winner show karne ke baad vo change nhi hona chahiye.

const disableBoxes =() =>{
    for (let box of boxes){
        box.disabled =true;
    }
}

//so jaise hi winner aa jayega - USKE BAAD HUM KISI BHI BOX KO CLICK NAA KAR PPAYE AUR KOI VALUE 'O' YA 'X' KI USS PAR BHI NA AA PAYE.
//so jab aesa nhi hoga - then HUME NEW GAME BUTTON PR HI CLICK KARNA HOGA.

//make enableboxes function for reset game  - enable kar denge boxes ko and value reset kr denge each box ki to empty value
const enableBoxes =() =>{
    for (let box of boxes){
        box.disabled =false; 
        box.innerText ="";    
    }
}

const resetGame =() =>{
    turn0= true;  //starting condition hai ye
    enableBoxes(); 
    msgContainer.classList.add("hide");      //again added hide class jisse winner vli statement phir se starting me na dikhe 
}

//so make 2 event listeners - for new game and reset game button - DONO ME RESET GAME FUNCTION KO CALL KAR DENGE
newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click", resetGame);

//donpo cases me 'RESET GAME' AND 'NEW GAME' BUTTON ME DONO ME RESET KR DENGE GAME KO - POORA KHAL KAR DENGE GAME.