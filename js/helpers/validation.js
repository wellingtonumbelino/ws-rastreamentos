export function validateTrackingCode(code = "") {
  const regex = /^[A-Z]{2}\d{5}[A-Z]{2}\d{1}$/;
  return regex.test(code);
}