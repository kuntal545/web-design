document.getElementById('contact-form').addEventListener('submit', function(e) {
   e.preventDefault();
   const name = document.getElementById('name').value;
   const email = document.getElementById('email').value;
   const message = document.getElementById('message').value;

   // Simulate sending the form (you can replace this with actual form submission logic)
   document.getElementById('message-status').textContent = 'Message sent successfully!';
   
   // Clear the form
   document.getElementById('contact-form').reset();
});