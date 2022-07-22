new Splide('.splide', { type: 'loop', autoplay: true, interval: 3000 }).mount();

const menu = document.querySelector('.menu');
const menuToggle = document.querySelector('.menu-toggle');
const popup = document.querySelector('.popup');
const quiz = document.querySelector('.quiz');
const closeButton = document.querySelector('.close');
var notificationCount = 0;
var emailNotProcessing = true;

function menuExpand() {
    menu.classList.toggle("!h-auto");
    document.querySelector('.bar2').classList.toggle("opacity-0");
    document.querySelector('.bar1').classList.toggle("-rotate-45");
    document.querySelector('.bar1').classList.toggle("translate-y-px");
    document.querySelector('.bar3').classList.toggle("-translate-y-px");
    document.querySelector('.bar3').classList.toggle("rotate-45");
}

document.querySelectorAll('.inputs').forEach(e => {
    e.firstElementChild.addEventListener('change', () => {
        if (e.classList.contains("correct")) {
            e.classList.add("bg-green-500", "text-white");
        } else {
            e.classList.add("bg-red-500", "text-white");
        }
        setTimeout(() => {
            let first = e.parentElement.parentElement;
            first.classList.toggle("hidden");
            first.nextElementSibling.classList.toggle("hidden");
        }, 250);

    });
});

function pageReset() {
    document.querySelector(".page:first-of-type").classList.toggle("hidden");
    document.querySelector(".page:last-of-type").classList.toggle("hidden");
    document.querySelectorAll(".page label").forEach(label => {
        if (label.classList.contains("bg-green-500") && label.classList.contains("text-white")) {
            label.classList.remove("bg-green-500", "text-white");
        } else if (label.classList.contains("bg-red-500") && label.classList.contains("text-white")) {
            label.classList.remove("bg-red-500", "text-white");
        }
    });
}

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
    }, 2000);
});

function composeContactMail(formData) {
    let subject, body;
    subject = formData.has('name') ? "Website Form Submision by " + formData.get('name') : "New Form Submision";
    body = "<h2 style='text-align: center;'>Personal Data</h2><br>";
    body += formData.has('last-name') ? "<p><strong>Name :</strong> " + formData.get('name') + " " + formData.get('last-name') + "</p>" : "<p><strong>Name :</strong> " + formData.get('name') + " " + "</p>";
    body += formData.has('phone') ? "<p><strong>Mobile :</strong> " + formData.get('phone') + "</p>" : "";
    body += formData.has('email') ? "<p><strong>Email :</strong> " + formData.get('email') + "</p>" : "";
    body += formData.has('profession') ? "<p><strong>Profession :</strong> " + formData.get('profession') + "</p>" : "";
    body += formData.has('city') ? "<p><strong>City :</strong> " + formData.get('city') + "</p>" : "";
    body += formData.has('address') ? "<p><strong>Street address :</strong> " + formData.get('address') + "</p>" : "";
    body += formData.has('pincode') ? "<p><strong>Pincode :</strong> " + formData.get('pincode') + "</p>" : "";
    if (formData.has('business')) {
        body += "<h2 style='text-align: center;'>Quiz Data</h2><br>";
        body += formData.has('business') ? "<p><strong>What is the main business of LIC? :</strong> " + formData.get('business') + "</p>" : "";
        body += formData.has('situated') ? "<p><strong>Where is LIC situated? :</strong> " + formData.get('situated') + "</p>" : "";
        body += formData.has('formation') ? "<p><strong>What is the formation day of LIC? :</strong> " + formData.get('formation') + "</p>" : "";
        body += formData.has('stock-market') ? "<p><strong>Is LIC registered on stock market? :</strong> " + formData.get('stock-market') + "</p>" : "";
        body += formData.has('exam') ? "<p><strong>Is it necessary to pass exam to become a LIC agent? :</strong> " + formData.get('exam') + "</p>" : "";
    }
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
    // showNotification("Sending")
    fetch("https://api.saryuweb.com/email", {
        method: "POST",
        body: formData,
    }).then((response) => {
        response.json().then((data) => {
            if (response.status == 401) showNotification("Error occured. Try again.")
            else showNotification("Form Submitted")
        })
    }).catch((error) => {
        showNotification('Error occured. Try again.');
    })
}


function showNotification(text) {
    let newNode = document.createElement('div');
    newNode.id = "alert" + notificationCount;
    newNode.className = "p-3 px-4 flex items-center space-x-4 rounded-xl bg-green-500 transition-all duration-300 pointer-events-auto";
    notificationCount++;
    let childNode1 = document.createElement('p')
    childNode1.className = 'w-52 text-sm';
    childNode1.innerText = text;
    let childNode2 = document.createElement('i')
    childNode2.className = 'fa-solid fa-xmark cursor-pointer';
    newNode.appendChild(childNode1);
    newNode.appendChild(childNode2);

    let domAlert = document.querySelector("#alert");
    domAlert.appendChild(newNode);

    let opacityTimeOut = setTimeout(() => {
        newNode.classList.add("opacity-0")
    }, 4700);

    let removeTimeOut = setTimeout(() => {
        newNode.remove();
    }, 5000);

    childNode2.onclick = () => {
        clearTimeout(opacityTimeOut)
        clearTimeout(removeTimeOut)
        newNode.classList.add("opacity-0")
        setTimeout(() => {
            newNode.remove();
        }, 300);
    }
}