document.addEventListener("DOMContentLoaded", () => {
    feather.replace(); // Replace feather icons
  
    document.getElementById("logout").addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("token");
      window.location.href = "/";
    });
  
    // Add event listeners for punch actions and other menu items here
  });