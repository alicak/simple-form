document.getElementById('form').addEventListener("submit", submitForm);

async function submitForm(event) {
  event.preventDefault();

  var submitButton = document.getElementById('submit');
  submitButton.setAttribute('disabled', 'true');
  submitButton.textContent = 'Submitting...';

  removeError();

  var emailInput = document.getElementById('email');
  var email = emailInput.value.toString();

  var checkbox = document.getElementById('contact_me');

  var valid = true;

  if (checkbox.checked) {
    valid = false;
  } else if (email.length == 0) {
    valid = false;
  } else if (email.length > 100) {
    valid = false;
  } else if (!validateEmail(email)) {
    valid = false;
  }

  if (!valid) {
    emailInput.classList.add("red");

    var errorTextElement = document.createElement('div');

    errorTextElement.setAttribute("id", "error");

    errorTextElement.classList.add("small");
    errorTextElement.classList.add("red");

    errorTextElement.textContent = 'The email is not valid.';

    document.getElementById('email-container').appendChild(errorTextElement);

    submitButton.removeAttribute('disabled');
    submitButton.textContent = 'Let me know!';
    return;
  }

  const urlToPost = '???';

  var requestBody = { email: email.toLowerCase() };

  const response = await fetch(urlToPost, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  emailInput.value = ''

  // remove the form element
  document.getElementById('form').remove();

  // create a new element
  var textElement = document.createElement('div');
  textElement.classList.add("thank-you");
  textElement.textContent = 'Thank you! I will inform you about the launch.';
  
  // place the new element
  document.getElementById('form-container').appendChild(textElement);
}

function resetColor(element) {
  element.classList.remove("red");
  removeError();
}

function removeError() {
  var error = document.getElementById('error');

  if (error != null) {
    error.remove();
  }
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
