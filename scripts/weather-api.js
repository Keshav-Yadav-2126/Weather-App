export async function apiCall(city) {
    let ApiKey = "df0161de902842808fc183752250701"
    let url = `https://api.weatherapi.com/v1/forecast.json?key=${ApiKey}&q=${city}`;
    const response = await fetch(url);
    const data = response.json();
    return data
}
 
// export default apiCall()