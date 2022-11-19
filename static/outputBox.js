/*
Explaination box requirements
Report when a node is being added and deleted
Mention the rotations that is taking place
Descriptions will be ongoing and should the user be able to scroll back

Template: you inserted___ should call on input()
you_deleted__ should call on the deleteInput() 
Performing a ___ rotation use animations to recognize
how rotations are called during redraw

We want it scroll using a scroll bar within the box.
resize font size within the explanation box (Want button on the right of the explanation box)
Want an initial message on dialog box

*/
var cont = document.getElementById("outputbox");
  
        function size(size) {
  
            // Set value of the parameter as fontSize
            cont.style.fontSize = size;
        }
  
        function changeSizeBySlider() {
            var slider = document.getElementById("slider");
  
            // Set slider value as fontSize
            cont.style.fontSize = slider.value;
        }



/*
var output = ["Hello !"],

initial =0;
individual =dialogs[initial].split('');
function createdialog(dialog){
    for(i=0; i< dialog.length; i++){
        (function(i){
            setTimeout(function(){
                $("#dialog").text($("#dialog").text() +dialog[i]);
                if(i==dialog.length -1){
                    $("#dialog").prepend('div id="arrow"><\div>');
                    Moustrap.bind('enter', function(){
                        if(dialogs[initial+1]){
                            $("#dialog").text('');
                            initial +=1;
                            individual = dialog[initial].split('');
                            createdialog(individual);
                        }
                    });
                }
            }, 50*i);
        }(i));
    }
}
createdialog(individual);
*/

function createInsertMes() {
    let insertMes = "you are performing an insertion. The tree will take your input " +
        document.getElementById("numInput").value + " as a key and " +
        "do a recursion.<br><br>As the function recursively searches through the tree, " +
        "it will compare the key of each node " +
        "to " + document.getElementById("numInput").value + " until it reaches a leaf position. " +
        "The function will then insert your node to that position."
    let insertCode = "AVL.insert(current_node, key, value)";
    return ["Current Action: Insertion", insertMes, insertCode];
}

function createDeleteMes() {
    let deleteMes = "you are performing a deletion. The tree will take your input " +
        document.getElementById("numDelete").value + " and search it in the tree." + " Depending on how many " +
        "child nodes that node has, it will perform different removal methods."
    let deleteCode = "AVL.remove(current_node, key)";
    return ["Current Action: Deletion", deleteMes, deleteCode];
}

function createRotationMes(rotation_actions, prev_mes) {
    if (rotation_actions.length === 0) {
        return prev_mes;
    }
    let rotationMes = "you are performing AVL rotation.<br><br>";
    for (let i = 0; i < rotation_actions.length; i++) {
        rotationMes += "The tree will perform a " + rotation_actions[i][0] + " rotation on node " +
            rotation_actions[i][1].getKey() + ".<br><br>";
    }
    let rotationCode = "AVL.rotation_adjustment(current_node). This function is usually part of the " +
        "insert() or remove() function.";
    return ["Current Action: Rotation", rotationMes, rotationCode];
}

function displayMessage(explanation_title, explanation_text, code_text) {
    document.getElementById("explanationTitle").innerHTML = explanation_title;
    document.getElementById("explanation").innerHTML = explanation_text;
    document.getElementById("code_display").innerHTML = code_text;
}