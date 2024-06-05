export function createUser(userData) {
    return new Promise(async (resolve) => {
      const response = await fetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: { 'content-type': 'application/json' },
      });

      const data = await response.json();
      resolve({ data });
    });
  }