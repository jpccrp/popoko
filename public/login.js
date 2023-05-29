document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (response.status === 200) {
      const { token } = await response.json();
      localStorage.setItem("token", token);
      window.location.href = "/dashboard"; // Redirect to the dashboard page
    } else {
      alert("Invalid email or password");
    }
  });