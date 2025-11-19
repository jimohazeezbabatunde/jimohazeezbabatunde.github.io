document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contact-form');
  var status = document.getElementById('contact-status');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = new FormData(form);
    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    }).then(function (response) {
      if (response.ok) {
        status.textContent = 'Message sent — thank you!';
        status.style.color = '#8fd19e';
        form.reset();
      } else {
        response.json().then(function (data) {
          status.textContent = data.error || 'Error sending message.';
          status.style.color = '#f28b82';
        }).catch(function () {
          status.textContent = 'Error sending message.';
          status.style.color = '#f28b82';
        });
      }
    }).catch(function () {
      status.textContent = 'Network error — please try again.';
      status.style.color = '#f28b82';
    });
  });
});