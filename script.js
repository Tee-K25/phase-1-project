document.addEventListener("DOMContentLoaded", () => {
  let submitForm = document.querySelector("#search_form");

  //cannot submit if library is empty
  submitForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let wordSearched = e.target.search_tab.value;

    let word = wordSearched;

    wordSearch(word);

    function wordSearch(word) {
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((response) => response.json())
        .then((data) => {
          let dataBase = data[0];
          let propMeanings = dataBase.meanings;
          let myFirstObj = propMeanings[0];
          //part of speech
          let mainPartOfSpeech = myFirstObj.partOfSpeech;
          let definitionsArray = myFirstObj.definitions;
          let myDefinition = definitionsArray[0];
          //definition
          let mainDefinition = myDefinition.definition;

          //update DOM with results
          let partOfSpeechDom = document.querySelector("#part_of_speech");
          partOfSpeechDom.textContent = mainPartOfSpeech;
          let meaningDom = document.querySelector("#word_meaning");
          meaningDom.textContent = mainDefinition;
        });
    }
    //update the card's titles accordingly
    let searchOutputTitle = document.querySelector("#search_output_heading");
    let searchOutputBookTitle = document.querySelector(".book_title");
    let title = searchOutputBookTitle.textContent;
    searchOutputTitle.textContent = `'${word}' in ${title}`;

    //function to populate vocabulary list
    let bookVocabularies = {};
    function vocabularyList() {
      let vocabArray = [];
      vocabArray.push(word);

      let currentBookTitle = document.querySelector(".book_title").textContent;

      if (!bookVocabularies[currentBookTitle]) {
        bookVocabularies[currentBookTitle] = [];
      }

      vocabArray.forEach((vocab) => {
        bookVocabularies[currentBookTitle].push(vocab);
        let liVocab = document.createElement("li");
        liVocab.textContent = vocab;
        liVocab.addEventListener("click", (e) => {
          let thyWord = e.target.title.value;
          wordSearch(thyWord);
        });
        let ulVocab = document.querySelector("#vocabulary_list");
        ulVocab.appendChild(liVocab);
      });
    }

    vocabularyList();
    //attaching vocab to book
  });
  //function to add new input
  let newInputBtn = document.querySelector("#new_input_btn");
  newInputBtn.addEventListener("click", (e) => {
    e.preventDefault();
    //first create a form
    let newInputForm = document.createElement("form");

    newInputForm.innerHTML = `<label id='title_label' for ='title'>Book title</label>
    <input id ='title' type ='text'/>
    <input id = 'submit_book_title' type = 'submit'/>`;
    //append form to div
    let inputDiv = document.querySelector("#input_form");
    newInputBtn.disabled = true;
    inputDiv.appendChild(newInputForm);
    //add the book to Library
    newInputForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let bookTitle = e.target.title.value;
      let libraryArray = [];
      libraryArray.push(bookTitle);
      libraryArray.forEach((book) => {
        let libraryUl = document.querySelector("#my_books");
        let liBookTitles = document.createElement("li");
        liBookTitles.textContent = book;

        //add event listener to books
        liBookTitles.addEventListener("click", () => {
          let titleHeader = document.querySelector(".book_title");
          titleHeader.textContent = bookTitle;

          let ulVocab = document.querySelector("#vocabulary_list");
          ulVocab.innerHTML = "";

          if (bookVocabularies[bookTitle]) {
            bookVocabularies[bookTitle].forEach((vocab) => {
              let liVocab = document.createElement("li");
              liVocab.textContent = vocab;
              liVocab.addEventListener("click", (e) => {
                let thyWord = e.target.title.value;
                wordSearch(thyWord);
              });
              ulVocab.appendChild(liVocab);
            });
          }
        });

        libraryUl.appendChild(liBookTitles);
        newInputForm.innerHTML = "";
        newInputBtn.disabled = false;
      });
    });
  });
});
//function to get word
