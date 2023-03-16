export function timeToSeconds(time: string) {
  const [minutes = "0", seconds = "0"] = time.split(":");

  const minutesInSeconds = Number(minutes) * 60;
  return minutesInSeconds + Number(seconds);
}
