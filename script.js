/* =========================================================
   CONTACT FORM - FORMSPREE
   ONE SUCCESSFUL SUBMISSION PER EMAIL
========================================================= */

const contactForm = document.getElementById("contactForm");
const sendButton = document.getElementById("sendButton");
const formStatus = document.getElementById("formStatus");

if (contactForm && sendButton && formStatus) {

    contactForm.addEventListener("submit", async function (event) {

        /* =========================================
           PREVENT NORMAL FORM SUBMISSION
        ========================================= */

        event.preventDefault();
        event.stopPropagation();


        /* =========================================
           GET EMAIL
        ========================================= */

        const emailInput = document.getElementById("email");

        const email = emailInput.value
            .trim()
            .toLowerCase();


        /* =========================================
           CHECK IF EMAIL WAS ALREADY USED
        ========================================= */

        const submittedEmails =
            JSON.parse(
                localStorage.getItem("submittedEmails") || "[]"
            );


        if (submittedEmails.includes(email)) {

            formStatus.textContent =
                "This email has already submitted a message.";

            formStatus.className = "error";

            return;
        }


        /* =========================================
           DISABLE BUTTON
        ========================================= */

        sendButton.disabled = true;

        sendButton.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Sending...
        `;


        /* =========================================
           CLEAR STATUS
        ========================================= */

        formStatus.textContent = "";
        formStatus.className = "";


        try {

            const response = await fetch(
                contactForm.action,
                {
                    method: "POST",

                    body: new FormData(contactForm),

                    headers: {
                        "Accept": "application/json"
                    }
                }
            );


            /* =========================================
               SUCCESS
            ========================================= */

            if (response.ok) {

                /*
                 * Save the email ONLY after
                 * Formspree successfully receives it.
                 */

                submittedEmails.push(email);

                localStorage.setItem(
                    "submittedEmails",
                    JSON.stringify(submittedEmails)
                );


                /*
                 * Clear form
                 */

                contactForm.reset();


                /*
                 * Show success message
                 */

                formStatus.textContent =
                    "Your message has been sent successfully!";

                formStatus.classList.add("success");


                /*
                 * Restore button
                 */

                sendButton.disabled = false;

                sendButton.innerHTML = `
                    <i class="fa-solid fa-paper-plane"></i>
                    Send Message
                `;


                /*
                 * Remove success message
                 * after 5 seconds
                 */

                setTimeout(() => {

                    formStatus.textContent = "";
                    formStatus.className = "";

                }, 5000);


                return;
            }


            /* =========================================
               FORMSPREE ERROR
            ========================================= */

            const data = await response
                .json()
                .catch(() => ({}));


            if (
                data.errors &&
                data.errors.length > 0
            ) {

                formStatus.textContent =
                    data.errors
                        .map(error => error.message)
                        .join(", ");

            } else {

                formStatus.textContent =
                    "Something went wrong. Please try again.";

            }


            formStatus.classList.add("error");

        }


        /* =========================================
           NETWORK ERROR
        ========================================= */

        catch (error) {

            console.error(
                "Contact Form Error:",
                error
            );

            formStatus.textContent =
                "Network error. Please check your connection and try again.";

            formStatus.classList.add("error");

        }


        /* =========================================
           RESTORE BUTTON
        ========================================= */

        finally {

            sendButton.disabled = false;

            sendButton.innerHTML = `
                <i class="fa-solid fa-paper-plane"></i>
                Send Message
            `;

        }

    });

}

const words = [
    "Software Developer",
    "Web Developer",
    "UI Designer",
    "Problem Solver"
];

let wordIndex = 0;
let letterIndex = 0;
let currentWord = "";
let isDeleting = false;

const typing = document.getElementById("typing");

function type() {

    currentWord = words[wordIndex];

    if (!isDeleting) {

        typing.textContent = currentWord.substring(0, letterIndex++);

        if (letterIndex > currentWord.length) {

            isDeleting = true;

            setTimeout(type, 1200);

            return;

        }

    } else {

        typing.textContent = currentWord.substring(0, letterIndex--);

        if (letterIndex === 0) {

            isDeleting = false;

            wordIndex = (wordIndex + 1) % words.length;

        }

    }

    setTimeout(type, isDeleting ? 50 : 120);
}

type();


const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", reveal);

function reveal(){

reveals.forEach(sec=>{

const top = sec.getBoundingClientRect().top;

if(top < window.innerHeight-100){

sec.classList.add("active");

}

});

}

reveal();

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {

    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");

});

document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");

    });

});

const text = new SplitType("#portfolioText", {
    types: "chars"
});

gsap.set("#portfolioIcon", {
    opacity: 0,
    scale: 0
});

const tl = gsap.timeline({
    defaults: {
        ease: "power3.out"
    }
});

tl.to({}, {
    duration: 2
})

.to("#portfolioIcon", {
    opacity: 1,
    scale: 1,
    duration: 0.5,
    ease: "back.out(2)"
}, "-=0.2")

.to(text.chars, {
    opacity: 0,
    x: -40,
    y: () => gsap.utils.random(-20,20),
    rotate: () => gsap.utils.random(-90,90),
    scale: 0,
    stagger: .03,
    duration: .6
}, "<")

.to(".logo", {
    x: -120,
    duration: .7,
    ease: "power2.inOut"
}, "-=0.2");