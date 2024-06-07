export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/auth/login/', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}


// otp verify
export async function verifyOtp(otpData) {
  const response = await fetch('/auth/verify/', {
    method: 'POST',
    body: JSON.stringify(otpData),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  console.log(data);
  return { ok: response.ok, data };
}
