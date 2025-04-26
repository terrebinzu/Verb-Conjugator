// JavaScript Document
function generate() {
  const verb = document.getElementById("verbInput").value;　
  output = document.getElementById("output");

  // Example: basic hard-coded logic
  if (verb === "食べる") {
    output.innerHTML = `
      <p><strong>Plain:</strong> 食べる</p>
      <p><strong>Polite:</strong> 食べます</p>
      <p><strong>Negative:</strong> 食べない</p>
      <p><strong>Past:</strong> 食べた</p>
      <p><strong>Te-form:</strong> 食べて</p>
    `;
  } else {
    output.innerHTML = `<p>I don't know how to conjugate "${verb}" yet.</p>`;
  }
}
