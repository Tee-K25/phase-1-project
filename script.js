document.addEventListener("DOMContentLoaded", () => {
  let submitForm = document.querySelector("#search_form");

  //Submitting the word
  submitForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let wordSearched = e.target.search_tab.value;

    let word = wordSearched;

    wordSearch(word);
    //function to search word
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

    function vocabularyList() {
      let vocabArray = [];
      vocabArray.push(word);
      //can't search without a book specified
      let newInputAdded = searchOutputBookTitle.textContent;
      if (newInputAdded === "The book's title") {
        alert("Please add a book first");
      } else {
        let libraryList = document.querySelector(".my_books");
        let bookTItle = libraryList.textContent;
        if (newInputAdded === bookTItle) {
          vocabArray.forEach((vocab) => {
            let myVocabObject = {
              title: bookTItle,
              word: [vocab],
            };
            let liVocab = document.createElement("li");
            liVocab.textContent = vocab;
            let ulVocab = document.querySelector("#vocabulary_list");
            ulVocab.appendChild(liVocab);
            liVocab.addEventListener("click", () => {
              let searchOutputTitle = document.querySelector(
                "#search_output_heading"
              );
              searchOutputTitle.textContent = `'${myVocabObject.word}' in ${myVocabObject.title}`;
              searchOutputBookTitle.textContent = myVocabObject.title;
              let selectedWord = myVocabObject.word;
              wordSearch(selectedWord);
            });
          });
        }
      }
    }
    vocabularyList();
  });
  // add new input
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
        liBookTitles.className = "my_books";
        liBookTitles.textContent = bookTitle;

        //add event listener to books
        liBookTitles.addEventListener("click", (e) => {
          let ulOldVocab = document.querySelector("#vocabulary_list");
          let oldPartOfSpeechDom = document.querySelector("#part_of_speech");
          oldPartOfSpeechDom.textContent = "";
          let oldMeaningDom = document.querySelector("#word_meaning");
          oldMeaningDom.textContent = "";

          ulOldVocab.innerHTML = "";

          let clickedTag = e.target;
          let theActualBook = clickedTag.textContent;
          console.log(theActualBook);
          let searchOutputBookTitle = document.querySelector(".book_title");
          searchOutputBookTitle.textContent = theActualBook;
        });

        libraryUl.appendChild(liBookTitles);
        newInputForm.innerHTML = "";
        newInputBtn.disabled = false;
      });
    });
  });
});
//function to get word
