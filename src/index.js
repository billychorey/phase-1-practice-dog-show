document.addEventListener('DOMContentLoaded', () => {
    const fetchUrl = 'http://localhost:3000/dogs';
    const table = document.getElementById('table');
    const form = document.getElementById('dog-form');
    const name = document.getElementById('name-input');
    const breed = document.getElementById('breed-input');
    const gender = document.getElementById('gender-input');
    const formSubmit = document.getElementById('form-submit');

    let selectedDogId = null; // Store the ID of the selected dog

    fetch(fetchUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            data.forEach(item => {
                let dogRow = document.createElement('tr');
                dogRow.dataset.dogId = item.id; // Struggle bus with getting the id, so make it a data attribute

                let dogName = document.createElement('td');
                dogName.textContent = item.name;
                let dogBreed = document.createElement('td');
                dogBreed.textContent = item.breed;
                let dogGender = document.createElement('td');
                dogGender.textContent = item.sex;
                let buttonTd = document.createElement('td');
                let button = document.createElement('button');
                button.textContent = 'Edit';

                dogRow.appendChild(dogName);
                dogRow.appendChild(dogBreed);
                dogRow.appendChild(dogGender);
                dogRow.appendChild(buttonTd);
                buttonTd.appendChild(button);

                table.appendChild(dogRow);

                button.addEventListener('click', () => {
                    displayDogInfo(item);
                });

                function displayDogInfo(dog) {
                    name.value = dog.name;
                    breed.value = dog.breed;
                    gender.value = dog.sex;
                    selectedDogId = dog.id; // Store the selected dog's ID
                }
            });

            formSubmit.addEventListener('click', handleSubmit);

            function handleSubmit(e) {
                e.preventDefault();

                if (selectedDogId) {
                    const updatedDog = {
                        name: name.value,
                        breed: breed.value,
                        sex: gender.value
                    };

                    fetch(`${fetchUrl}/${selectedDogId}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json"
                        },
                        body: JSON.stringify(updatedDog)
                    })
                    .then(res => res.json())
                    .then(updatedDog => {
                        console.log('Updated Dog:', updatedDog);

                        // Update the table row with the new data
                        const tableRow = table.querySelector(`tr[data-dog-id="${selectedDogId}"]`);
                        if (tableRow) {
                            tableRow.querySelector('td:nth-child(1)').textContent = updatedDog.name;
                            tableRow.querySelector('td:nth-child(2)').textContent = updatedDog.breed;
                            tableRow.querySelector('td:nth-child(3)').textContent = updatedDog.sex;
                        }
                    })
                    .catch(error => {
                        console.error("Error updating dog:", error);
                    });
                }
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
