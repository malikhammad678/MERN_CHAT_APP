export function extractTime(dataString) {
    const date = new Date(dataString);
    let hours = date.getHours();
    const minutes = padZero(date.getMinutes());
    const period = hours >= 12 ? 'PM' : 'AM';
  
    
    hours = hours % 12;
    hours = hours ? hours : 12;
  
    return `${hours}:${minutes} ${period}`;
  }
  
  function padZero(number) {
    return number.toString().padStart(2, "0");
  }
  