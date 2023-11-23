const form = document.querySelector('[data-form]');
const input = document.querySelector('[data-input]')
const container1 = document.querySelector('.container1');
const container2 = document.querySelector('.container2');
const definitions = document.querySelector('.definitions')
const synonyms = document.querySelector('.synonyms')
const antonyms = document.querySelector('.antonyms')
const url = `https://api.dictionaryapi.dev/api/v2/entries/en/`;


form.addEventListener('submit', e => {
    e.preventDefault();
    container2.style.display = 'block';
    container1.style.display = 'none';
    const val = input.value;
    console.log(val);
    url = url + `${val}`;
    (async function doStuff() {
        const data = await fetch(url);
        console.log(data);
        const res = await data.json();
        console.log(res)
        const heading = document.querySelector('[data-word]')
        heading.innerText = res[0]["word"];
        const listofdefinitions = res[0]["meanings"][0]["definitions"];
        const listofsynonyms = res[0]["meanings"][0]["synonyms"];
        const listofantonyms = res[0]["meanings"][0]["antonyms"];
        console.log(listofdefinitions);
        console.log(listofsynonyms)
        console.log(listofantonyms)


        // adding definitions
        listofdefinitions.forEach(ele => {
            const element1 = document.createElement('div')
            element1.innerText = ele["definition"]
            element1.classList.add('defin');
            definitions.appendChild(element1);
        });

        // adding synonyms
        if (listofsynonyms.length != 0) {
            synonyms.innerText = "Synonyms"
            listofsynonyms.forEach(ele => {

                const element1 = document.createElement('div')
                element1.innerText = ele
                element1.classList.add('syn');
                synonyms.appendChild(element1);          
            });
        }

        // adding antonyms
        if (listofantonyms.length != 0) {
            antonyms.innerText = "Antonyms";
            listofantonyms.forEach(ele => {
                const element1 = document.createElement('div')
                element1.innerText = ele
                element1.classList.add('anto');
                antonyms.appendChild(element1);
            });
        }
    })()
    // doStuff();
});


