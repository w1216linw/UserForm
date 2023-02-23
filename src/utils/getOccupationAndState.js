export const getOccupationsAndStates = async () => {
  try {
    const response = await fetch("https://frontend-take-home.fetchrewards.com/form");
    const data = await response.json();
    return data;
  } catch (err) {
    return err.message;
  }
}