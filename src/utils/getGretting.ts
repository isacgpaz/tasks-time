export function getGreeting() {
  const today = new Date();
  const currentHour = today.getHours();

  if (currentHour < 12) {
    return "Bom dia";
  } else if (currentHour < 18) {
    return "Boa tarde";
  } else {
    return "Boa noite";
  }
}
