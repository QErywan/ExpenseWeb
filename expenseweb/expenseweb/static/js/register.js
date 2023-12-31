const usernameField = document.querySelector("#usernameField");
const feedbackArea = document.querySelector(".invalid-feedback");
const emailField = document.querySelector("#emailField");
const emailFeedBackArea = document.querySelector(".emailFeedbackArea");
// const usernameSuccessOutput = document.querySelector(".usernameSuccessOutput");

const showPasswordToggle = document.querySelector(".showPasswordToggle");
const passwordField = document.querySelector("#passwordField");

const submitBtn = document.querySelector(".submit-btn");


showPasswordToggle.addEventListener("click", (e) => {

    if (showPasswordToggle.textContent === "SHOW") {
        showPasswordToggle.textContent = "HIDE";
        passwordField.setAttribute("type", "text");
    } else {
        showPasswordToggle.textContent = "SHOW";
        passwordField.setAttribute("type", "password");
    }   
});


emailField.addEventListener("keyup", (e) => {
    
    const emailVal = e.target.value;
    console.log("emailVal", emailVal);

    emailField.classList.remove("is-invalid");
    emailFeedBackArea.style.display="none";

    if (emailVal.length > 0) {
        fetch("/authentication/validate-email", { 
            body: JSON.stringify({email: emailVal}),
            method: "POST",
        })
        .then((res) => res.json())
        .then(data=> {
            console.log("data", data);
            if(data.email_error) {
                submitBtn.setAttribute("disabled", "disabled");
                submitBtn.style.cursor="not-allowed";
                emailField.classList.add("is-invalid");
                emailFeedBackArea.style.display="block";
                emailFeedBackArea.innerHTML=`<p>${data.email_error}</p>`;
            } else {
                submitBtn.removeAttribute("disabled");
                submitBtn.style.cursor="pointer";
            }
        });
    }
})

usernameField.addEventListener("keyup", (e) => {

    const usernameVal = e.target.value;

    usernameField.classList.remove("is-invalid");
    feedbackArea.style.display="none";

    
    if (usernameVal.length > 0) {
        fetch("/authentication/validate-username", { 
            body: JSON.stringify({username: usernameVal}),
            method: "POST",
        })
        .then((res) => res.json())
        .then(data=> {
            console.log("data", data);
            if(data.username_error) {
                submitBtn.setAttribute("disabled", "disabled");
                submitBtn.style.cursor="not-allowed";
                usernameField.classList.add("is-invalid");
                feedbackArea.style.display="block";
                feedbackArea.innerHTML=`<p>${data.username_error}</p>`;
            } else {
                submitBtn.removeAttribute("disabled");
                submitBtn.style.cursor="pointer";
            }
        });
    }
    

})