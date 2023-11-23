$(document).ready(function () {
    const form = $('[data-form]');
    const input = $('[data-input]');
    const container1 = $('.container1');
    const container2 = $('.container2');
    const definitions = $('.definitions');
    const synonyms = $('.synonyms');
    const antonyms = $('.antonyms');
    let url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
  
    form.on('submit', function (e) {
      e.preventDefault();
      container2.show();
      container1.hide();
      const val = input.val();
      console.log(val);
      url = url + val;
  
      (async function doStuff() {
        const data = await fetch(url);
        console.log(data);
        const res = await data.json();
        console.log(res);
        const heading = $('[data-word]');
        heading.text(res[0].word);
  
        const listofdefinitions = res[0].meanings[0].definitions;
        const listofsynonyms = res[0].meanings[0].synonyms;
        const listofantonyms = res[0].meanings[0].antonyms;
        console.log(listofdefinitions);
        console.log(listofsynonyms);
        console.log(listofantonyms);
  
        // adding definitions
        listofdefinitions.forEach(ele => {
          const element1 = $('<div></div>');
          element1.text(ele.definition);
          element1.addClass('defin');
          definitions.append(element1);
        });
  
        // adding synonyms
        if (listofsynonyms.length !== 0) {
          synonyms.text('Synonyms');
          listofsynonyms.forEach(ele => {
            const element1 = $('<div></div>');
            element1.text(ele);
            element1.addClass('syn');
            synonyms.append(element1);
          });
        }
  
        // adding antonyms
        if (listofantonyms.length !== 0) {
          antonyms.text('Antonyms');
          listofantonyms.forEach(ele => {
            const element1 = $('<div></div>');
            element1.text(ele);
            element1.addClass('anto');
            antonyms.append(element1);
          });
        }
      })();
    });
  });
  