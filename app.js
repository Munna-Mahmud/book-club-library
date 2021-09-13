const searchBooks = () => {
    // Catch input data
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    inputField.value = "";
    document.getElementById('parent-container').innerHTML = '';
    document.getElementById('books-found').innerHTML = '';

    // input data validataion

    if (inputValue === '') {
        showError('d-none', true)
    } else {
        showError('d-none')
        const url = `https://openlibrary.org/search.json?q=${inputValue}`;
        spinner(true)
        fetch(url)
            .then(res => res.json())
            .then(element => 
                {dataShow(element)
                spinner(false)
            })
    }
}

//show error masages here

const showError = (style, status) => {
    const errorMassage = document.getElementById('error-massage');
    if (status === true) {
        errorMassage.classList.remove(style);
    } else {
        errorMassage.classList.add(style);
    }
}

// Ui updata Works

const dataShow = (getInfo) => {

    const datas = getInfo.docs;
    // Books number Count 
    const mesDiv = document.createElement('h4');
    mesDiv.classList.add('p-1');
    mesDiv.innerText = `${getInfo.numFound}: Books Found In your Search`;
    document.getElementById('books-found').appendChild(mesDiv);

    //create div for search  results

    const parentDiv = document.getElementById('parent-container');

    const defaultImg = status => {
        if (typeof status !== 'undefined') {
            return `https://covers.openlibrary.org/b/id/${status}-M.jpg`;
        } else {
            return `image/cover.png`;
        }
    }

    // Books Cards here 

    datas.forEach(info => {
        showError('d-none')
        const div = document.createElement('div');
        div.classList.add('col-md-6', 'my-5', 'col-sm-12', 'col-xl-3');
        // Conditions For Checking the Properties
        const authorName = !info.author_name ? "Author Name Is Not Given" : info.author_name[0]
        const publisherName = !info.publisher ? "Publisher Name Is Not Given" : info.publisher[0]

        div.innerHTML = `
            <div class="card" style="width: 18rem;">
                <div style="height: 350px">
                    <img style="height: 100%" src= "${defaultImg(info.cover_i)}" class="card-img-top p-2" alt="..." >
                </div>
                <div class="card-body">
                    <h5 class="card-title">Book Name : ${info.title}</h5>
                </div>
                <ul class="list-group list-group-flush">
                <li class="list-group-item">Author Name : <span class='text-primary'> ${authorName}</span></li>
                    <li class="list-group-item">Publisher By :<span class='text-primary'> ${publisherName}</span> </li>
                    <li class="list-group-item">First Publish Year : ${info.first_publish_year ? info.first_publish_year : "Not Found "}</li>
                </ul>
            </div>     
        `;
        parentDiv.appendChild(div)
    });
};

// growing spinner 

const spinner = (status) => {
    if (status) {
        document.getElementById('spinner').style.display = 'block';
    } else {
        document.getElementById('spinner').style.display = 'none';
    }
}
spinner(false)

       // The End 
      // Thank YOU 