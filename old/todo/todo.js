function newElement() // when button is clicked
{
    // to add text to an unordered list, it must go through the 'li' list element first.
    // text (input) -> li -> ul

    // access html "li" tags
    let li = document.createElement("li");
    // get input from input tag
    let inputValue = document.getElementById("myInput").value;
    // turn input into text
    let t = document.createTextNode(inputValue);
    // add input text to li in "li" tag
    li.appendChild(t);
    // add the input list to the unordered list 
    document.getElementById("myUL").appendChild(li);
} // end newElement()

// first method - access only the first 'ul' tag on the page.
// let list = document.querySelector('ul');
// For multiple: select 'All' selected ID's and loop through.
let list = document.querySelectorAll("#myUL, #done");

// add a click listener to each list:
for(i = 0; i < 2; i++) { // go through each list 
    list[i].addEventListener('click', function(ev) 
    {
        // if clicked on an 'li' element
        if (ev.target.tagName === 'LI')
        {
            // toggle the checked class in CSS
            ev.target.classList.toggle('checked');
        }
    }, false); // part of the event listener syntax
} // end list node for loop