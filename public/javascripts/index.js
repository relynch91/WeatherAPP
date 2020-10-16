const axios = require('axios');
document.addEventListener('DOMContentLoaded', () => {
    
    let search = document.forms[0];
    console.log(search)
    
    search.addEventListener("submit", function(e){
        e.preventDefault();
        let address = search.querySelector('input[type="text"]').value;
        console.log(address);
        formSubmit(address);
    } )

    function formSubmit (address) {
        console.log(address)
    }
    
})
