function getHalloweenDate() {
  const now = new Date();
  const year = now.getFullYear();
  let halloween = new Date(year, 9, 31); // October 31st

  if (now > halloween) {
    halloween = new Date(year + 1, 9, 31);
  }

  return halloween;
}

function updateCountdown() {
  const target = getHalloweenDate();
  const now = new Date();
  const diffMs = target - now;

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);

  const el = document.getElementById("countdown-timer");
  if (el) {
    el.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);
