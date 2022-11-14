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


