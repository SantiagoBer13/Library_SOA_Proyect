import request from "supertest";
import app from "../app.js";

async function createBook() {
  const newBook = {
    title: "The New Book",
    author: "Author Name",
    isbn: "1234567890123",
    published_year: 2022,
    available_copies: 5,
  };
  return await request(app).post("/books").send(newBook);
}

describe("Books API", () => {
  it("should fetch all books", async () => {
    const res = await request(app).get("/books");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should fetch a book by id", async () => {
    const { body } = await createBook();
    const id = body.id;
    const res = await request(app).get(`/books/${id}`);
    expect(res.body).toHaveProperty("id");
    expect(res.statusCode).toEqual(200);
  });

  it("doesnt should fetch a book by id", async () => {
    const bookId = 100;
    const res = await request(app).get(`/books/${bookId}`);
    expect(res.statusCode).toEqual(404);
  });

  it("should create a new book", async () => {
    const newBook = {
      title: "The New Book",
      author: "Author Name",
      isbn: "123456789012",
      published_year: 2022,
      available_copies: 5,
    };
    const res = await request(app).post("/books").send(newBook);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("title", newBook.title);
    expect(res.body).toHaveProperty("available_copies", newBook.available_copies);
  });

  it("should update an existing book", async () => {
    const { body } = await createBook();
    const id = body.id;
    const updatedBook = {
      title: "Updated Book Title",
      author: "Updated Author",
      isbn: "1234567890123",
      published_year: 2022,
      available_copies: 3,
    };
    const res = await request(app).put(`/books/${id}`).send(updatedBook);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe("Book updated successfully.");
  });

  it("should delete a book by id", async () => {
    const { body } = await createBook();
    const id = body.id;
    const res = await request(app).delete(`/books/${id}`);
    expect(res.statusCode).toEqual(204);
  });

  it("doesnt should delete a book by id not found", async () => {
    const id = 100;
    const res = await request(app).delete(`/books/${id}`);
    expect(res.body.message).toBe("Book not found.");
    expect(res.statusCode).toEqual(404);
  });
});
