    const button = document.getElementById("button");
        const listContainer = document.getElementById("list");
        const BASEURL = "https://dummyjson.com";

        // Event listener
        window.addEventListener('DOMContentLoaded', handleClick);

        function handleClick() {
            getData(BASEURL)
            .then(data => {
                render(listContainer, data.products);
            })
            .catch(error => {
                console.error("Error during fetching or rendering:", error);
            });

        }

        // API function
        async function getData(url) {
            try {
                const response = await fetch(`${url}/products`);
                  
                return  await response.json();
            } catch (e) {
                console.error("Error occurred:", e);
            } finally {
                console.log("API called successfully");
            }
        }

        // Render function
        function render(container, data) {
            container.innerHTML = '';
            data.forEach(item => {
                const li = document.createElement("li");
                li.innerText = item.title;
                container.appendChild(li);
            });
        }















// //attach a event lissterner to button
// //create a fun to make api
// //create a func to render data inn ui
// const button = document.getElementById("button");
// const list = document.getElementById("list")
// const BASEURL = "https://dummyjson.com/"


//     button.addEventListener('click',handleClick);
//     function handleClick(){
//         //api call
//         getData(BASEURL).then(data=>render(list, data.products){
            
//             list.innerHTML = '';
//             data.forEach(element => {
//                 const list = document.createElement("li");
//                 list.innerText = element.title;
//                 list.appendChild(list)
//         })
//         }

//         )
//     }

// async function getData(url){
//     try{
//         const data = await fetch(`${url}/products`)
//         return data.json();
//     }
//     catch(e){
//         throw new Error("Error Occured")
//     }
//     finally{
//         console.log( "api called successfully")
//     }

//     }