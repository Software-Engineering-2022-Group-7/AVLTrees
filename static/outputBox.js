/*
Explaination box requirements
Report when a node is being added and deleted
Mention the rotations that is taking place

*/

function createInsertMes() {
    let insertMes = "You are performing an insertion. The tree will take your input " +
        document.getElementById("numInput").value + " as a key and " +
        "do a recursion.<br><br>As the function recursively searches through the tree, " +
        "it will compare the key of each node " +
        "to " + document.getElementById("numInput").value + " until it reaches a leaf position. " +
        "The function will then insert your node to that position."
    let insertCode = "AVL.insert(current_node, key, value)";
    return ["Current Action: Insertion", insertMes, insertCode];
}

function createDeleteMes(removal_actions) {
    let deleteMes = "You are performing a deletion. The tree will take your input " +
        document.getElementById("numDelete").value + " and search it in the tree.<br><br>"
    for (let i = 0; i < removal_actions.length; i++) {
        deleteMes += "The tree will " + removal_actions[i][0] + "with " + removal_actions[i][1] + ".<br><br>";
    }
    let deleteCode = "AVL.remove(current_node, key)";
    return ["Current Action: Deletion", deleteMes, deleteCode];
}

function createRotationMes(rotation_actions, prev_mes) {
    if (rotation_actions.length === 0) {
        return prev_mes;
    }
    let rotationMes = "You are performing AVL rotation.<br><br>";
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
