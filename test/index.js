const baseURL = "http://127.0.0.1:3000"
async function postCategory(categoryName) {
    let response = await fetch(`${baseURL}/categories`,
        {
            method: "POST",
            body: JSON.stringify({
                categoryName
            }),
            headers: {
                "content-type": "application/json"
            }
        }
    )
    response = response.json()
    return response

}

async function postBook(name,
    author,
    description,
    discount,
    price,
    categoryIds,
    coverImage,
    images,
    videos) {
    let response = await fetch(`${baseURL}/books`,
        {
            method: "POST",
            body: JSON.stringify({
                name,
                author,
                description,
                discount,
                price,
                categoryIds,
                coverImage,
                images,
                videos
            }),
            headers: {
                "content-type": "application/json"
            }
        }
    )
    response = response.json()
    return response

}
async function deleteBook(id) {
    let response = await fetch(`${baseURL}/books`,
        {
            method: "DELETE",
            body: JSON.stringify({
                id
            }),
            headers: {
                "content-type": "application/json"
            }
        }
    )
    response = response.json()
    return response

}
async function postUser(firstName,
    lastName,
    password,
    email,
    phone) {
    let response = await fetch(`${baseURL}/user`,
        {
            method: "POST",
            body: JSON.stringify({
                firstName,
                lastName,
                password,
                email,
                phone
            }),
            headers: {
                "content-type": "application/json"
            }
        }
    )
    response = response.json()
    return response

}

async function postCart(userId, isLogedIn, bookId) {
    let response = await fetch(`${baseURL}/cart`,
        {
            method: "POST",
            body: JSON.stringify({
                userId, isLogedIn, bookId
            }),
            headers: {
                "content-type": "application/json"
            }
        }
    )
    response = response.json()
    return response

}
async function deleteCart(userId, isLogedIn, bookId) {
    let response = await fetch(`${baseURL}/cart`,
        {
            method: "DELETE",
            body: JSON.stringify({
                userId, isLogedIn, bookId
            }),
            headers: {
                "content-type": "application/json"
            }
        }
    )
    response = response.json()
    return response

}

async function postOrder(cartId) {
    let response = await fetch(`${baseURL}/orders`,
        {
            method: "POST",
            body: JSON.stringify({
                cartId
            }),
            headers: {
                "content-type": "application/json"
            }
        }
    )
    response = response.json()
    return response

}

async function init() {
    console.log(await postCategory("3year +"))
    console.log(await postCategory("5year +"))
    console.log(await postCategory("7year +"))
    // console.log(await postBook("Demo - 3",
    //     "Demo - 3",
    //     "Demo - 3 description",
    //     0,
    //     200,
    //     [3, 1],
    //     "abc.png",
    //     ["xyz.png", "efg.png", "demo.png"],
    //     ["demo.mp4"]
    // ))

    // console.log(await postUser(
    //     "Kahan",
    //     "Detroja",
    //     "kahan@9925",
    //     "kahan@gmail.com",
    //     "9904981905"
    // ))

    // console.log(await postCart(
    //     1, true, 4
    // ))
    // console.log(await postCart(
    //     1, true, 5
    // ))
    // console.log(await postCart(
    //     2, true, 5
    // ))
    // console.log(await deleteCart(
    //     1, true, 5
    // ))
    // console.log(await deleteCart(
    //     1, true, 1
    // ))
    // console.log(await deleteCart(
    //     1, true, 5
    // ))

    // console.log(await deleteBook(3))

    console.log(await postOrder(1))
}

init()