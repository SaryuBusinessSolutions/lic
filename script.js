new Splide( '.splide' ).mount();

const menu = document.querySelector('.menu');
const menuToggle = document.querySelector('.menu-toggle');
const popup = document.querySelector('.popup');
const quiz = document.querySelector('.quiz');
const closeButton = document.querySelector('.close');
const next = document.querySelector('.next');
const pageOne = document.querySelector('.pageone');
const pageTwo = document.querySelector('.pagetwo');


function menuExpand() {
    menu.classList.toggle("!h-auto");
    document.querySelector('.bar2').classList.toggle("opacity-0");
    document.querySelector('.bar1').classList.toggle("-rotate-45");
    document.querySelector('.bar1').classList.toggle("translate-y-px");
    document.querySelector('.bar3').classList.toggle("-translate-y-px");
    document.querySelector('.bar3').classList.toggle("rotate-45");
}

next.addEventListener('click', () => {
    pageOne.classList.toggle('hidden');
    pageTwo.classList.toggle('hidden');
});

function popupDisplay() {
    popup.classList.toggle('hidden');
    popup.classList.toggle('flex');
}
menuToggle.addEventListener('click', menuExpand);
quiz.addEventListener('click', popupDisplay);
closeButton.addEventListener('click', popupDisplay);
window.addEventListener('click', (e) => {
    if (e.target == popup) { popupDisplay() };
});

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        popupDisplay();
    }, 5000);
});

function composeContactMail(formData) {
    let subject, body;
    subject = formData.has('first-name') ? "Website Form Submision by " + formData.get('first-name') : "New Form Submision";
    body = "<h2 style='text-align: center;'>Personal Data</h2><br>";
    body += formData.has('first-name') ? "<p><strong>Name :</strong> " + formData.get('first-name') + " " + formData.get('last-name') + "</p>" : "";
    body += formData.has('phone') ? "<p><strong>Mobile :</strong> " + formData.get('phone') + "</p>" : "";
    body += formData.has('email') ? "<p><strong>Email :</strong> " + formData.get('email') + "</p>" : "";
    body += formData.has('profession') ? "<p><strong>Profession :</strong> " + formData.get('profession') + "</p>" : "";
    body += formData.has('city') ? "<p><strong>City :</strong> " + formData.get('city') + "</p>" : "";
    body += formData.has('address') ? "<p><strong>Street address :</strong> " + formData.get('address') + "</p>" : "";
    body += "<h2 style='text-align: center;'>Quiz Data</h2><br>";
    body += formData.has('business') ? "<p><strong>What is the main business of LIC? :</strong> " + formData.get('business') + "</p>" : "";
    body += formData.has('situated') ? "<p><strong>Where is LIC situated? :</strong> " + formData.get('situated') + "</p>" : "";
    body += formData.has('formation') ? "<p><strong>What is the formation day of LIC? :</strong> " + formData.get('formation') + "</p>" : "";
    body += formData.has('stock-market') ? "<p><strong>Is LIC registered on stock market? :</strong> " + formData.get('stock-market') + "</p>" : "";
    body += formData.has('exam') ? "<p><strong>Is it necessary to pass exam to become a LIC agent? :</strong> " + formData.get('exam') + "</p>" : "";
    return {
        subject,
        body
    };
}

function submitForm(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let {
        subject,
        body
    } = composeContactMail(formData);
    formData.append("subject", subject);
    formData.append("body", body);
    event.target.reset();
    alert("sending")
    fetch("https://api.saryuweb.com/email", {
        method: "POST",
        body: formData,
    }).then((response) => {
        response.json().then((data) => {
            if (response.status == 401) alert("error")
            else alert("submitted")
        })
    }).catch((error) => {
        alert('error');
    })
}