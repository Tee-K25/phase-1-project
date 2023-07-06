## VOCAB DECODEd

VOCAB DECODEd is a vocabulary management and dictionary application. It provides a user-friendly interface for organizing books, searching for word definitions, and keeping track of vocabularies associated with each book.

### Features

- **Book Management**: Users can add books to their library by entering the book title. The added books are displayed under the "My Books" section.
- **Book Selection**: Clicking on a book title selects it and displays the selected book's title under the "The book's title" section.
- **Word Search**: Users can search for word definitions by entering a word in the search input field and clicking the "Submit" button.
- **Dictionary Integration**: The application utilizes the dictionary API to fetch word definitions and part of speech information.
- **Display of Word Information**: The retrieved word's definition and part of speech are displayed under the "The word" section.
- **Vocabulary List**: The app maintains a vocabulary list associated with each book, allowing users to track their learned vocabularies.
- **Vocabulary Addition**: When a word is searched, its definition is added to the vocabulary list for the currently selected book.
- **Interactive Vocabulary Search**: Clicking on a vocabulary in the list triggers another search for that word, displaying its definition.

### Usage

1. Adding Books:

   - Enter the title of a book in the "Book title" input field.
   - Click the "Submit" button to add the book to your library.
   - The added books will appear under the "My Books" section.

2. Selecting a Book:

   - Click on a book title from the "My Books" list.
   - The selected book's title will be displayed under the "The book's title" section.
   - The associated vocabulary list will be shown in the "Vocabularies" section.

3. Searching for Word Definitions:

   - Enter a word in the search input field.
   - Click the "Submit" button to search for the word's definition.
   - The definition and part of speech will be displayed under the "The word" section.
   - The word will be added to the vocabulary list of the selected book.

4. Interacting with Vocabularies:
   - Click on a vocabulary from the vocabulary list to search for its definition.
   - The definition and part of speech will be displayed under the "The word" section.

### Dependencies

- This application utilizes the `fetch` API to retrieve word definitions from the dictionary API.

### Credits

- The application integrates with the [dictionaryapi.dev](https://dictionaryapi.dev/) for word definitions and part of speech information.
