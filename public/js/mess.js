document.addEventListener('DOMContentLoaded', () => {

    const container = document.getElementById("fd");
    const button = document.getElementById('button');
    const form = document.getElementById('fdform');

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function addNewP(data) {
        const newP = document.createElement("p");
        newP.innerHTML = `<b>${data.mail}</b> ${data.message}`;
        container.appendChild(newP);
    }
    function getData(event) {
        event.preventDefault(); 

        const mail = form.elements['email'].value;
        const message = form.elements['mess'].value;
        const data = { "mail": mail, "message": message };
        // console.log(data)
        if (!validateEmail(mail)) {
            customAlertHandler("Please enter a valid email address.");
            return;
        }

        if (!message.trim()) {
            customAlertHandler("Message cannot be empty.");
            return;
        }

        addNewP(data);
        form.reset();
    }

    function customAlertHandler(message) {
        confirm(message);
    }
    window.alert = async function(message) {
    const url = '/alert';
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("Response data:", data); 
        customAlertHandler(data.flag); 

    } catch (error) {
        console.error('Error:', error); 
    }
};


    form.addEventListener('submit', getData);
});