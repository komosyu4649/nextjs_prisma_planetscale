import React, { useEffect, useState } from 'react'

const Home = () => {
    const [bookTitle,setBookTitle] = useState("")
    const [bookAuthor,setBookAuthor] = useState("")
    const [bookGenre,setBookGenre] = useState("")
    const [APIResponse, setAPIResponse] = useState(null)

    useEffect(() => {
        console.log("title", bookTitle)
        console.log("author", bookAuthor)
        console.log("genre", bookGenre)
        console.log("APIResponse", APIResponse)
    },[bookTitle, bookAuthor, bookGenre,APIResponse])

    const readDB = async() => {
        try {
            const response = await fetch("/api/books", {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            })
            setAPIResponse(await response.json())
            if(response.status !== 200) {
                console.log("something went wrong")
            } else {
                console.log("form submit successfully !!")
            }
        }
        catch(error) {
            console.log("there was an error reading from the db", error)
        }
    }

    const hadnleSubmit = async(e) => {
        // console.log(e)
        e.preventDefault()
        const body = {bookTitle, bookAuthor, bookGenre}
        try{
            console.log(1)
            const response = await fetch("/api/books", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            // console.log(response.status)
            if(response.status !== 200) {
                console.log("something went wrong")
            } else {
                resetForm()
                readDB()
                console.log("form submit successfully !!")
            }
        } catch(error) {
            console.log(2)
            // console.log("there was an error something", error)
        }
    }

    const resetForm = () => {
        setBookTitle("")
        setBookAuthor("")
        setBookGenre("")
    }

    return (
        <div>
            <form onSubmit={(e) => hadnleSubmit(e)} method="POST">
                <div>
                    <label htmlFor="book-title">
                        book title
                    </label>
                    <div>
                        <input 
                            onChange={(e) => setBookTitle(e.target.value)}
                            type="text"
                            name="book-title"
                            id="book-title"
                            autoComplete="given-name"
                        >
                        </input>
                    </div>
                </div>
                <div>
                    <label htmlFor="book-author">
                        book author
                    </label>
                    <div>
                        <input 
                            onChange={(e) => setBookAuthor(e.target.value)}
                            type="text"
                            name="book-author"
                            id="book-author"
                            autoComplete="given-name"
                        >
                        </input>
                    </div>
                </div>
                <div>
                    <label htmlFor="book-genre">
                        book genre
                    </label>
                    <div>
                        <input 
                            onChange={(e) => setBookGenre(e.target.value)}
                            type="text"
                            name="book-genre"
                            id="book-genre"
                            autoComplete="given-name"
                        >
                        </input>
                    </div>
                </div>
                <button type="submit">
                    let's talk !
                </button>
            </form>
            <div>
                {APIResponse?.map((book) => (<li>{book.bookTitle}</li>))}
            </div>
        </div>
    )
}
 export default Home