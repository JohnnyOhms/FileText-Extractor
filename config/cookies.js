// document.cookie=("firstName=John; expires= Tue, Jan 1 2030 12:00:00 UTC; path=/");
// document.cookie=("lastName=Walker; expires= Tue, Jan 1 2030 12:00:00 UTC; path=/");
// console.log(document.cookie);

setCookies("email", "toluwalase@gmail.com", 365);
function setCookies(name, value, daysToLive) {
  const date = new Date();
  date.setTime(date.getTime() + daysToLive * 24 * 60 * 60 * 1000); //this is set to milliseconds
  let expires = "expires=" + date.toUTCString();
  console.log(document.cookie=`${name}=${value}; ${expires}; path=/";`);
}