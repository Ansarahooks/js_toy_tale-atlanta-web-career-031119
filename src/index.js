const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


document.addEventListener("DOMContentLoaded", function(){
  getToys("http://localhost:3000/toys")
})

function getToys(allToys){
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toys => toysIndex(toys))
}

function toysIndex(toys){
  console.log("are you working?")
  toys.forEach(toy => toyDivs(toy))
}

function toyDivs(toy){
  console.log("are you here?")

  const toyCollection = document.querySelector("#toy-collection")

  const div = document.createElement("div")
  div.className = "card"
  div.dataset.id = toy.id
  div.dataset.likes = toy.likes

  let h2 = document.createElement("h2")
  h2.innerText = toy.name

  let img = document.createElement("img")
  img.className = "toy-avatar"
  img.src = toy.image

  let p = document.createElement("p")
  p.innerText = `Likes: ${toy.likes}`
  p.dataset.likes = toy.likes

  let likeButton = document.createElement("button")
  likeButton.className = "like-btn"
  likeButton.innerText = "Like"
  likeButton.addEventListener("click", addLikeToDom)

  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(likeButton)
  toyCollection.appendChild(div)

}

function addLikeToDom(e){
  fetch(`http://localhost:3000/toys/${e.target.parentElement.dataset.id}`, {
    method: "PATCH",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": parseInt(e.target.parentElement.dataset.likes, 10) + 1
    })
  }).then(res => res.json())
    .then(likes => addLikeToPage(likes, e))
}

function addLikeToPage(likes, e){
  let p = e.target.parentElement.childNodes[2]
  p.innerText = `Likes: ${parseInt(p.dataset.likes, 10) + 1}`
}

// fetch("http://localhost:3000/toys", {
//   method: "POST",
//   headers:
//   {
//     "Content-Type": "application/json",
//     Accept: "application/json"
//   }
//   body:
//   {
//     "name":
//     "image":
//     "likes":
//   }
// }).then(res => res.json());
