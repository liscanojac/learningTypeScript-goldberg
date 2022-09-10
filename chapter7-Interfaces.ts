// Interfaces are preferred for their more readable error messages, speedier compiler performance, and better interoperability with classes
// interfaces are speedier although are only for objects and classes

interface Poet {
  name: string;
}

interface Book {
  author?: string;
  pages: number;
}

const ok: Book = {
  author: "John Doe",
  pages: 140
};

const missing: Book = {
  pages: 321
}

// Readonly Properties 

interface Pages {
  readonly text: string;
}

type PagesType = {
  readonly text: string;
}

function showPages(pages: PagesType) {
  
  console.log(pages.text)
}

export {}