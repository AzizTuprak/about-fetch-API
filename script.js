let url = 'https://randomuser.me/api/?inc=gender,name,email,nat,location,picture';
let promiseCall = [];
for (let i = 0; i < 6; i++) {
    // Create and store promises in promiseCall array
    promiseCall[i] = new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch(url)
                .then((response) => response.json())
                .then((jsonData) => {
                    resolve(jsonData); // Resolve the promise with jsonData
                })
                .catch((error) => {
                    reject(error); // Reject the promise if there's an error
                });
        }, 100 * i);
    });
}
Promise.all(promiseCall)
    .then((myResults) => {
        let parentDiv = document.querySelector(".persons");
        myResults.forEach((myResult) => {
            let childDiv = document.createElement("div");
            let name = document.createElement("h3");
            name.textContent = `${myResult.results[0].name.first}  ${myResult.results[0].name.last}`;
            childDiv.appendChild(name);
            let image = document.createElement("img");
            image.src = `${myResult.results[0].picture.large}`;
            childDiv.appendChild(image);
            let mail = document.createElement("p");
            mail.textContent = `${myResult.results[0].email}`;
            childDiv.appendChild(mail);
            let country = document.createElement("p");
            country.textContent = `${myResult.results[0].location.country}`;
            childDiv.appendChild(country);
            parentDiv.appendChild(childDiv);
        });
    })
    .catch((error) => {
        console.log(error);
    });