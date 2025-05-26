const form = document.getElementById("feedback-form");
const feedbackList = document.getElementById("feedback-list");

let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

function renderFeedback() {
  feedbackList.innerHTML = "";
  feedbacks.forEach((fb, index) => {
    const div = document.createElement("div");
    div.className = "feedback-entry";
    div.innerHTML = `
      <p><strong>Name:</strong> ${fb.name}</p>
      <p><strong>Email:</strong> ${fb.email}</p>
      <p><strong>Message:</strong> ${fb.message}</p>
      <p><strong>Rating:</strong> ${fb.rating}</p>
      <button onclick="deleteFeedback(${index})">Delete</button>
    `;
    feedbackList.appendChild(div);
  });
}

function deleteFeedback(index) {
  feedbacks.splice(index, 1);
  localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
  renderFeedback();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const rating = document.getElementById("rating").value;

  if (name && email && message) {
    const feedback = { name, email, message, rating };
    feedbacks.push(feedback);
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
    renderFeedback();
    form.reset();
  }
});

renderFeedback(); // Load existing feedback on page load
