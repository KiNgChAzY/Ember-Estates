const form = document.getElementById("contact-form");
const resultDiv = document.getElementById("result");

form.onsubmit = async function(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    resultDiv.className = "form-result";
    resultDiv.innerHTML = "Sending message...";

    
    const url = "https://api.web3forms.com/submit";
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: json
        });

        const result = await response.json();

        if (response.status === 200) {
            resultDiv.className = "form-result success";
            resultDiv.innerHTML = result.message;
            form.reset();
        } else {
            resultDiv.className = "form-result error";
            resultDiv.innerHTML = result.message;
        }
    } catch (error) {
        console.error(error);
        resultDiv.className = "form-result error";
        resultDiv.innerHTML = "Failed message. Please try again.";
    }
};