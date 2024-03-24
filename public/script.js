document.getElementById('signup-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
  
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });
      
      const data = await response.json();
      document.getElementById('message').textContent = data.message;
    } catch (error) {
      console.error('Error:', error);
    }
  });
  
  document.getElementById('signin-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;
  
    try {
      const response = await fetch('/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      document.getElementById('message').textContent = data.message;
    } catch (error) {
      console.error('Error:', error);
    }
  });
  