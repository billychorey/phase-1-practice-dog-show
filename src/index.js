document.addEventListener('DOMContentLoaded', () => {
    const fetchUrl = '  http://localhost:3000/dogs';
    const nameInput = document.getElementById('name-input');
    const breedInput = document.getElementById('breed-input');
    const sexInput = document.getElementById('gender-input');
    const submitBtn = document.getElementById('form-submit');
    let dogName;
    let dogBreed;
    let dogSex;
    
    async function fetchDogs() {
        const response = await fetch(fetchUrl);
        const dogInfo = await response.json();

        console.log(dogInfo);
        dogInfo.forEach((dog) => {
            const tr = document.createElement('tr');
            const dogId = dog.id;
            const trId = dogId;
            tr.id = trId;

            dogName = dog.name;
            dogBreed = dog.breed;
            dogSex = dog.sex;
            const buttonId = dog.id;
            tr.innerHTML +=`
            <td id = ${dogName} class="name">${dogName}</td>
            <td id = ${dogBreed} class="breed">${dogBreed}</td>
            <td id = ${dogSex} class="sex">${dogSex}</td>
            <td><button id=button-${buttonId}>Edit</button></td>
            `
            const tableBody = document.getElementById('table-body');
            tableBody.appendChild(tr);
            const button = tr.querySelector(`#button-${buttonId}`);
            button.addEventListener('click',handleClick);
        }
    )}
    fetchDogs();

    function handleClick(e) {
        const row = e.target.parentElement.parentElement; 
        nameInput.setAttribute('data-id', row.id);
    
        nameInput.value = row.querySelector('.name').innerText;
        breedInput.value = row.querySelector('.breed').innerText;
        sexInput.value = row.querySelector('.sex').innerText;
    }

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const dogId = nameInput.getAttribute('data-id'); 
        updateDog(dogId);
    });

    function updateDog(dogId) {
        const dogToUpdate = {
            id: dogId,
            name: nameInput.value,
            breed: breedInput.value,
            sex: sexInput.value
        };

        fetch((`http://localhost:3000/dogs/${dogId}`), {
            method: 'PATCH',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(dogToUpdate)
            })
            .then(res => res.json())
            .then(updatedDog => {
              
                const tableRowID = nameInput.getAttribute('data-id');
                const tableRow = document.getElementById(tableRowID)
                tableRow.querySelector('.name').textContent = updatedDog.name;
                tableRow.querySelector('.breed').textContent = updatedDog.breed;
                tableRow.querySelector('.sex').textContent = updatedDog.sex;


                nameInput.value = '';
                breedInput.value = '';
                sexInput.value = '';
            })

        }
    }

)
        
       