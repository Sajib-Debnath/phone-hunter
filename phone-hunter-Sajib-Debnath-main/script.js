const toggleSpinner = (displayStyle) => {
    document.getElementById('spinner').style.display = displayStyle;
}



const toggleSearchResult = (displayStyle) => {
    document.getElementById('phones').style.display = displayStyle;
}



// const toggleSearchResult = displayStyle => {
//     document.getElementById('meals').style.display = displayStyle;
// }



const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchTxt = searchField.value;
    searchField.value = '';


    toggleSpinner('block')
    toggleSearchResult('none')
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchTxt}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data))
}





const displaySearchResult = (data) => {
    const phoneCards = document.getElementById('phone-cards');

    const errorMessage = document.getElementById('error-message');
    if (data.status === false) {
        errorMessage.innerText = 'please give a valid name'
        toggleSpinner('none')

    }
    else {

        errorMessage.innerText = '';

        phoneCards.textContent = '';

        const phones = data.data;
        phones.forEach(phone => {
            // console.log(phone);

            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card h-100 p-3 m-2">
                    <img src="${phone.image}" class="card-img-top w-25" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                    <p class="card-text">${phone.phone_name}</p>
                    </div>
    
                    <button class='w-50 btn btn-primary' onclick="phoneDetails('${phone.slug}')">phone details</button>
                </div>
            `
            phoneCards.appendChild(div)
        });

        toggleSpinner('none');
        toggleSearchResult('block')
    }


}




const phoneDetails = (slugName) => {
    url = `https://openapi.programming-hero.com/api/phone/${slugName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showPhoneDetails(data.data))
}




const showPhoneDetails = (phoneDetails) => {

    const phoneDetailsCard = document.getElementById('phone-details');
    phoneDetailsCard.textContent = "";
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="row my-3 g-0">
            <div class="col-md-4">
                <img src="${phoneDetails.image}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${phoneDetails.name}</h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><b>Storage : </b>${phoneDetails.mainFeatures.storage}</li>
                        <li class="list-group-item"><b>Display Size : </b> ${phoneDetails.mainFeatures.displaySize}</li>
                        <li class="list-group-item"><b>Chipset : </b>${phoneDetails.mainFeatures.chipSet}</li>
                    </ul>
                </div>
            </div>
        </div>
    `
    phoneDetailsCard.appendChild(div);

}

