    var form = document.getElementById("my-form");
  
    async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("my-form-status");
    var data = new FormData(event.target);
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
          'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        status.innerHTML = "Message envoyé avec succès!";
        form.reset()
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
          } else {
            status.innerHTML = "Oups ! Un problème est survenu lors de l'envoi de votre formulaire"
          }
        })
      }
    }).catch(error => {
      status.innerHTML = "Oups ! Un problème est survenu lors de l'envoi de votre formulaire"
    });
  }
  form.addEventListener("submit", handleSubmit)