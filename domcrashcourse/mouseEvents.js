// var button = document.getElementById('button');
// var box = document.getElementById('box');

// button.addEventListener('click', runEvent);
// button.addEventListener('dblclick', runEvent);
// button.addEventListener('mousedown', runEvent);
// button.addEventListener('mouseup', runEvent);

// box.addEventListener('mouseenter', runEvent);
// box.addEventListener('mouseleave', runEvent);

// box.addEventListener('mouseover', runEvent);
// box.addEventListener('mouseout', runEvent);
// box.addEventListener('mousemove', runEvent);
var itemInput = document.querySelector('input[type="text"');
// var form = document.querySelector('form');
// itemInput.addEventListener('keydown', runEvent);

// itemInput.addEventListener('focus', runEvent);
// itemInput.addEventListener('blur', runEvent);

// itemInput.addEventListener('cut', runEvent);
// itemInput.addEventListener('paste', runEvent);
itemInput.addEventListener('input', runEvent);




function runEvent(e) {
    console.log('EVENT TYPE: ' + e.type);
    console.log(e.target.value);
    document.getElementById('output').innerHTML = '<h3>'+e.target.value+'</h3>';
    // output.innerHTML = '<h3>MouseX: ' + e.offsetX+' </h3><h3>MouseY: ' +
    //     e.offsetY+'</h3>';

    // document.body.style.backgroundColor = "rgb("+e.ofsetX+","+e.offsetY+", 40)";
}