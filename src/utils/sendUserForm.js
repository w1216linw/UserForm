export const sendUserForm = async (user) => {

  const response = await fetch('https://frontend-take-home.fetchrewards.com/form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })

  const data = await response.json();
  return data;
}