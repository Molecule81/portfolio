const form = document.getElementById('contactForm');
const response = document.getElementById('response');
const submitBtn = form.querySelector('button');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  response.style.display = 'block';

  if (!name || !email || !message) {
    return showAlert('All fields are required', 'red');
  }

  if (name.length < 3) {
    return showAlert('Name must be at least 3 characters long', 'red');
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return showAlert('Please enter a valid email address', 'red');
  }

  try {
    submitBtn.disabled = true;
    showAlert('Sending...', '#0d37f0');

    const res = await fetch('https://portfolio-8nnt.onrender.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to send');

    showAlert('Message sent successfully!', 'green');
    form.reset();
  } catch (err) {
    console.error(err);
    showAlert('Failed to send message. Try again.', 'red');
  } finally {
    submitBtn.disabled = false;
    setTimeout(() => {
      response.style.display = 'none';
    }, 4000);
  }
});

function showAlert(msg, color) {
  response.innerText = msg;
  response.style.color = color;
  response.style.display = 'block';
}
