
const file = document.getElementById("fileField")
let pdfDoc = null;
let num = 1;
let totalPages = null;
let readerData = null;
let refId = null;
let docInfo = null;
let pageRendered = false;
let renderePages = false;
let allowObserverUpdates = false;
let renderingComplete = false;
const precisePage = document.getElementById("precisePage");
uniqueId = null;
const bmDropdown = document.getElementById("bookmarks");


const observer = new IntersectionObserver((entries)=>{
    if (!renderingComplete || !allowObserverUpdates) return;
    entries.forEach((entry)=>{
        console.log(true)
        if(entry.isIntersecting){
            let id = entry.target.id;
            num = parseInt(id.substring(6));
            document.getElementById("currentPage").textContent = num;
            precisePage.value = num;  
            setLastPage();
            updateDocInfo();
            deleteNotes();
            createNotes();
            bookmarkExistence(num);
        }
    })
    
   
},{
    root:null,
    threshold:0.8
})

function NoteDialogBox(){
    let noteContainer = document.getElementById("noteSection");
    let noteBut = document.getElementById("showNoteBut");


    if (noteContainer.classList.contains("hideNote")){

                noteBut.innerHTML = `<i class="fa-solid fa-note-sticky"></i>`
    }
    else{
            noteBut.innerHTML = `<i class="fa-regular fa-note-sticky"></i>`
    }
    noteContainer.classList.toggle("hideNote");
}

function bookmarkDropdown() {
    let bookmarkContainer = document.getElementById("bookmarkSection");
    let bookmarkDropdownBut = document.getElementById("bookmarkDropdown");

    if (bookmarkContainer.style.display === "block") {
        bookmarkContainer.style.display = "none";
        bookmarkDropdownBut.innerHTML = `<i class="fa-solid fa-caret-down"></i>`;
    } else {
        bookmarkContainer.style.display = "block";
        bookmarkDropdownBut.innerHTML = `<i class="fa-solid fa-caret-up"></i>`;
    }
}

function fullScreen(){
    const headerEle = document.getElementById("header");
    const bookmarkBut = document.getElementById("bookmarkSymbol");
    const bookmarkDropdown = document.getElementById("bookmarkDropdown");
    const noteBut = document.getElementById('showNoteBut');
    const pageContainer = document.getElementById("pageContainer");
    const canvasEles = document.querySelectorAll(".canvasElement");
    const fullScreenBut = document.getElementById("fullScreen");

    pageContainer.classList.toggle("fullScreen");
    headerEle.classList.toggle("hideOnFullScreen")
    bookmarkBut.classList.toggle("hideOnFullScreen")
    bookmarkDropdown.classList.toggle("hideOnFullScreen")
    noteBut.classList.toggle("hideOnFullScreen")

    canvasEles.forEach((element)=>{
        element.classList.toggle("fullScreenCanvas")
    })

    if(pageContainer.classList.contains("fullScreen")){
        fullScreenBut.innerHTML = `<i class="fa-solid fa-compress"></i>`
        fullScreenBut.style.top = "0vh";
        fullScreenBut.style.right = "0vw";
    }
    else{
        fullScreenBut.innerHTML = `<i class="fa-solid fa-expand"></i>`; 
        fullScreenBut.style.top = "10vh";
        fullScreenBut.style.right = "0vw";
    }

}




function bookmarkExistence(num){
    let bookmarkArr = docInfo.bookmarks;
    if(bookmarkArr.find((element)=>{
        return element == num;
    })){
        document.getElementById("bookmarkSymbol").innerHTML = `<i class="fa-solid fa-bookmark"></i>`
    }
    else{
        document.getElementById("bookmarkSymbol").innerHTML = `<i class="fa-regular fa-bookmark"></i>`
    }

}

function scrollPage(num){
    canvas = document.getElementById(`canvas${num}`);
    if(canvas) canvas.scrollIntoView({behavior:'auto'});
    deleteNotes();
    createNotes();      
}

function deletingBut(element){
    let ele_id = element.id;

    let index = parseInt(ele_id.substr(3));
    // console.log(index);
    noteArr = docInfo.noteArr;
    notes = noteArr[num-1];
    notes.splice(index, 1);
    noteArr[num-1] = notes;
    docInfo.noteArr = noteArr;
    updateDocInfo();
    deleteNotes();
    createNotes();
    // let index = parseInt(element.)
}

function deleteNotes(){
    let notesContainer = document.getElementById("notesContainer");
    notesContainer.replaceChildren();
}

function createNotes(){
    let noteArr = docInfo.noteArr;
    let noteContainer = document.getElementById('notesContainer');
    let noteText = document.getElementById("noteText");
    notes= noteArr[num-1];
    // console.log(notes);
    notes.forEach((element,index)=>{
        note = document.createElement("div");
        note.id = `note${index}`;
        note.classList.add("noteDiv");
        textLabel = document.createElement("span");
        textLabel.id = `label${index}`;
        textLabel.textContent = element;
        textLabel.classList.add("noteSpan");

        delBut = document.createElement("button");
        delBut.id = `del${index}`;
        delBut.classList.add("noteBut");
        delBut.textContent = "X";
        delBut.onclick = function(){
            deletingBut(this);
        };
    

        note.appendChild(textLabel);
        note.appendChild(delBut);

        noteContainer.appendChild(note);
        line = document.createElement("hr");
        line.classList.add("noteLine")
        noteContainer.appendChild(line);
    
    })
}

function addNote(){
    noteArr = docInfo.noteArr;
    let noteText = document.getElementById("noteText");
    noteTextStr = noteText.value;
    noteArr.forEach((element,index) => {
        if(index==num-1){
            element.push(noteTextStr)
        }
    });

    docInfo.noteArr = noteArr;
    updateDocInfo(); 
    deleteNotes();       
    createNotes();
}


function scrollBookmark(element){
    let ele = element.textContent;
    let num = parseInt(ele.substr(8));
    console.log(num);
    scrollPage(num);
}

function createBookmarks(){
    let bookmarks_arr = docInfo.bookmarks;
    let bookMarkContainer = document.getElementById("bookmarkContainer");
    bookmarks_arr.forEach((element,index)=>{
        bookmark = document.createElement("button");
        bookmark.id = `book${element}`;
        bookmark.classList.add('bookmarkButton');
        bookmark.textContent = `Page No. ${element}`;
        bookmark.onclick = function(){
            scrollBookmark(this);
        }
        bookMarkContainer.appendChild(bookmark);
    })
}

function deleteBookmarks(){
    let bookMarkContainer = document.getElementById("bookmarkContainer");
    bookMarkContainer.replaceChildren();
}

function addBookmark(){
    if(pageRendered){
    let bookmarks_arr = docInfo.bookmarks; 
    
        // console.log(bookmarks_arr);
    if(bookmarks_arr.indexOf(num)!=-1){
        // console.log("found");
        bookmarks_arr.splice(bookmarks_arr.indexOf(num), 1);
        document.getElementById("bookmarkSymbol").innerHTML = `<i class="fa-regular fa-bookmark"></i>`
    }
    else{
        // console.log("notFound");
        bookmarks_arr.push(num);
        document.getElementById("bookmarkSymbol").innerHTML = `<i class="fa-solid fa-bookmark"></i>`
    }
    // console.log(bookmarks_arr)
    docInfo.bookmarks = bookmarks_arr;
    // console.log(docInfo);
    updateDocInfo();
    deleteBookmarks();
    createBookmarks();
    }


}

function getDocs(){
    readerData = JSON.parse(localStorage.getItem("readerData")) || [];
    // console.log(readerData);
}

function setUId(){
    // console.log(readerData);
    // console.log(readerData.length);
    if(readerData.length){
        // console.log("data");
        let found = null;
        for(let i = 0; i<readerData.length; i++){
            if(readerData[i].uId == refId){
                docInfo = readerData[i];
                found = true;
                break;
            }
            else{
                found = false;
            }
        }
        if(!found){
                        // console.log(totalPages);

            let noteArr = []
            for(let i = 0 ; i<totalPages; i++){
                noteArr.push([])
            }
            docInfo = {
                    uId :refId,
                    lastPno : 1,
                    bookmarks: [],
                    noteArr: noteArr
                }
            // console.log(docInfo)
            readerData.push(docInfo);
            
            localStorage.setItem("readerData", JSON.stringify(readerData)) ;
            // console.log(readerData);
            // console.log(localStorage.getItem("readerData"));
        }
    }
    else{
            // console.log(totalPages);
            let noteArr = []
                for(let i = 0 ; i<totalPages; i++){
                    noteArr.push([])
                }
        docInfo = {
                    uId :refId,
                    lastPno : 1,
                    bookmarks: [], 
                    noteArr: noteArr
                  }
        readerData.push(docInfo);

        localStorage.setItem("readerData", JSON.stringify(readerData)) ;
        
        // console.log(readerData);
        // console.log(localStorage.getItem("readerData"));
    }
    // console.log(docInfo)
}

function setLastPage(){
    docInfo.lastPno = num;
}

function updateDocInfo(){

    if(renderingComplete){
    for(let i = 0; i<readerData.length; i++){
        if(readerData[i].uId==docInfo.uId){
            readerData[i] = docInfo;
        }
    }
    localStorage.setItem("readerData", JSON.stringify(readerData)) ;
    }
    
}

function renderPages(){
    let pageContainer = document.getElementById("pageContainer");
    pageContainer.replaceChildren();
    for(let i = 1; i<= totalPages; i++){
        let canvas = document.createElement("canvas");
        canvas.id = `canvas${i}`;
        observer.observe(canvas);
        renderPage(canvas, i);
        pageContainer.appendChild(canvas);
    }
    console.log(num)
    scrollPage(parseInt(docInfo.lastPno));
    console.log("comleted rendering")
}

function renderPage(canvas, pageNo){
    pdfDoc.getPage(pageNo).then((page)=>{
        viewport = page.getViewport({scale:1});
        // console.log(viewport);

        ctx = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.classList.add("canvasElement");

        
        renderCtx = {canvasContext: ctx, viewport:viewport};

        page.render(renderCtx).promise.then(()=>{
        })
    })
}

function prev(){
    if(num>1){
        num = num-1;
        scrollPage(num);
        // console.log(num);
        precisePage.value = num;
    }
    
}

function next(){
    if(num<totalPages)
    {
        num = num+1;
        scrollPage(num);
        // console.log(num);
        precisePage.value = num;
    }
    
}

precisePage.addEventListener("change",()=>{
    // console.log(precisePage.value);
    num = parseInt(precisePage.value);
    scrollPage(num);
})

file.addEventListener("change",()=>{
    // console.log(file);
    pageRendered = true;
    renderingComplete = false;
    observer.disconnect();
    console.log(observer);
    document.getElementById("docTitle").textContent = `File Name: "${file.files[0].name}"`
    url = URL.createObjectURL(file.files[0]);

    const pagePromise = pdfjsLib.getDocument(url).promise.then((doc)=>{
        // console.log(pdfDoc);
        getDocs();
        // console.log(readerData);
        // console.log(readerData.length);

        // num = 1;
        // console.log(docInfo);
        pdfDoc = doc;

        // console.log(pdfDoc);
        const {_pdfInfo} = pdfDoc;
        // console.log(_pdfInfo);
        const {fingerprint} = _pdfInfo;
        refId  = fingerprint;
        totalPages = doc.numPages; 
        document.getElementById("totalPages").textContent = `Total Pages: "${totalPages}"`;
        document.getElementById("totalPages1").textContent = totalPages;


        setUId();
        // console.log(docInfo);
        // console.log(docInfo.lastPno);


        deleteBookmarks();
        createBookmarks();
        precisePage.min = 1;
        precisePage.max = totalPages;
        num = docInfo.lastPno;
        // console.log(fingerprint);

        // console.log(totalPages);
        renderPages();
        renderingComplete = true;

        setTimeout(()=>{
            scrollPage(num);
            allowObserverUpdates = true;
        },200)

    });
})





