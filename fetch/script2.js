const url = "https://dummyjson.com/users"

async function  getUsers(){
    try{
        const res = await fetch(url)
        if(!res.ok){
            throw new Error("Server Error")}
        const data = await res.json();
        console.log(data).users
        }
    catch(e){
        if(e.status   ==404  ) console.log("resource not found")
        console.log(e.message);
    }
}
// getUsers()

async function GPTfetchWithRetry(url, options = {}, retries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        // If server responds with error status (like 500), throw to retry
        throw new Error(`Server error: ${response.status}`);
      }

      // If successful, return the response
      return await response.json(); // or response.text(), etc. based on API
    } catch (error) {
      console.warn(`Attempt ${attempt} failed: ${error.message}`);

      if (attempt === retries) {
        // No more retries left, throw error
        throw error;
      }

      // Wait for some time before retrying
      await new Promise(res => setTimeout(res, delay));
    }
  }
}
// fetchWithRetry('https://api.example.com/data', {}, 3, 2000)
//   .then(data => console.log('Data received:', data))
//   .catch(error => console.error('Failed after retries:', error));

async function HumanfetchWithRetry(url,retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
       if (!response.ok) {
        // If server responds with error status (like 500), throw to retry
        throw new Error(`Server error: ${response.status}`);
      }
      const data = await res.json();
      console.log(data)
      break;
    } catch (error) {
      console.warn(`Attempt ${attempt} failed: ${error.message}`);

      if (attempt === retries-1) {
        // No more retries left, throw error
        console.log("attempts exhausted:" , error.message)
      }

      else{
            console.log("API call failed, retrying...", e.message)
            await new Promise((res)=>setTimeout((res,delay)));
      }
    }
  }
}



//Storing data
const cache = {}
async function getDatawithCache(url){
    try{

        if(cache[url]){
            console.log("from the cache",cache[url])
        }else{
        const res = await fetch(url)
        if(!res.ok){
            throw new Error("Error Occurred ")
        }
        const data = await res.json();
        cache[url] = data
        console.log(data)
    }
    }
    catch(e){
        console.log(e.message )
    }
}
// getDatawithCache(url);
// getDatawithCache(url); u cant observe that becoz both are async function

(async function(){
    await getDatawithCache(url);
    await getDatawithCache(url);
})()