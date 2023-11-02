
const accessKey = "qrB3pu1PUB3vdO-3C-FrIhaHq0aQW_tU4BTte8jMTdo"; //copy from unsplash website

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMore = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages(){
    keyword = searchBox.value;
    //https://api.unsplash.com/search/photos?page=1&query=office&client_id=qrB3pu1PUB3vdO-3C-FrIhaHq0aQW_tU4BTte8jMTdo

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`; //per page 12 results

    const response = await fetch(url);
    const data = await response.json();
    //console.log(data);

    if(page === 1){
        searchResult.innerHTML = ""; //hide the previous result when we are entering the new keyword
    }

    const results = data.results;
    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small; //inside unsplash 
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html //inside the links and in that html key value
        imageLink.target = "-blank"  //this will open the link in new tab

        imageLink.appendChild(image); //img will be inside the a tag
        searchResult.appendChild(imageLink); //imageLink will be inside the div tag of searchResult id

    })
    
    showMore.style.display = "block";//change the style,make the 'show more' button to display after fetching the result
}

searchForm.addEventListener("submit",(e) =>{
    e.preventDefault();
    page = 1;
    searchImages();

})

showMore.addEventListener("click", ()=>{
    page++; //when we click on show more it will increase the page&display imgs of that page
    searchImages();
})