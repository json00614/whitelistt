let whitelist = [];

// ✅ Replace this with your actual GitHub raw URL
const rawWhitelistUrl = "https://raw.githubusercontent.com/json00614/whitelistt/refs/heads/main/eth_addresses.json";

// Load the whitelist from GitHub when the page loads
window.onload = () => {
  loadWhitelistFromGitHub(rawWhitelistUrl);
};

// Fetch and parse whitelist file
function loadWhitelistFromGitHub(url) {
  const status = document.getElementById("uploadStatus");
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.text();
    })
    .then(data => {
      if (url.endsWith(".json")) {
        const json = JSON.parse(data);
        whitelist = json.map(addr => addr.toLowerCase());
      } else if (url.endsWith(".csv")) {
        whitelist = data
          .split("\n")
          .map(line => line.trim().toLowerCase())
          .filter(line => line.length > 0);
      } else {
        throw new Error("Unsupported file type");
      }

      status.innerText = `✅ Whitelist loaded successfully (${whitelist.length} addresses).`;
      status.style.color = "#4CAF50";
    })
    .catch(error => {
      status.innerText = `❌ Failed to load whitelist: ${error.message}`;
      status.style.color = "#FF5252";
    });
}

// Check if address is whitelisted
function checkWhitelist() {
  const address = document.getElementById("walletInput").value.trim().toLowerCase();
  const result = document.getElementById("result");

  if (!address) {
    result.innerText = "⚠️ Please enter a wallet address.";
    result.style.color = "#ffc107";
    return;
  }

  const isWhitelisted = whitelist.includes(address);

  result.innerText = isWhitelisted
    ? "✅ You are whitelisted!"
    : "❌ This wallet is not on the whitelist.";
  result.style.color = isWhitelisted ? "#4CAF50" : "#FF5252";
}
