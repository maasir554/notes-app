// ------------------ For populating : --------------------

introPop = JSON.stringify([{heading:"Introduction",desc:"Hello, welcome to this note-saving app. this is a CRUD project, built using vanilla JS. you can Create, Read, Update, Delete and Search your notes here. Click on the  New note button on top-right to create a new note. "},{heading:"Search for something",desc:"On the top Search Bar, type anything which is contained inside the saved notes, it will filter out the desired notes.\nThe search algorithm is pretty simple, just checks if the input is a substring or not."},{heading:"So, where are my notes being saved?",desc:"the notes will be saved in your browser's Local Storage. so, you can reload any number of times. the saved notes won't go anywhere!"},{heading:"Editing the notes",desc:"click on the edit button, and note will open inside the top box. you can edit the heading, as well as the description. play around with it!"},{heading:"Delete a note",desc:"once you click the delete button, the note gets deleted forever. you need to be very careful. "}])
function populateInicial(){
    if (localStorage.getItem("notes") == null || localStorage.getItem("notes") == '[]'){
         localStorage.setItem("notes",introPop)
    }
}

populateInicial()

//----------------------------------------------------------
const allNotesContainer = document.getElementById("all-notes-container") 
let saveNotesBtn = document.getElementById("save-notes-btn")

function showAllNotes(){
    let data_notes = localStorage.getItem("notes")
    
    if (data_notes != null){
        allNotesContainer.innerHTML = ""
        let all_notes = JSON.parse(data_notes)
        all_notes.forEach( (e,index) => {
            allNotesContainer.innerHTML +=        
            `
            <div class="note" onmouseover="showItemMenu(this)" onmouseout="hideItemMenu(this)">
                    <h2>${e.heading}</h2>
                    <p>${e.desc}</p>
                    <span class="item-menu" >
                        <button class="item-menu-btn edit-item-btn" onclick = "editNote(${index})">
                            <span class="material-symbols-outlined">
                                edit_note
                            </span>
                        </button>
                        <button class="item-menu-btn delete-item-btn" onclick="deleteNote(${index}); showAllNotes()">
                            <span class="material-symbols-outlined">
                                delete
                            </span>
                        </button>
                    </span>
    
            </div>
            `
            
            
        })
    }
}

showAllNotes()


//----------------- for creating new note ----------------------------------

const createNoteBox = document.getElementById("create-note-box")

const showCreationBox = ()=>{
    createNoteBox.style.display = "block"
}
const hideCreationBox = ()=>{
    createNoteBox.style.display = "none"
}
 
function saveNote(e){ // saves new note in our local storage, after it, the showAllNotes function will be called, check HTML.
   
    let creatorBox = e.srcElement.parentElement;
    let data_notes = localStorage.getItem("notes")
    let note_heading = creatorBox.children[0].value
    let note_description = creatorBox.children[1].value
    current_note_object = {
        heading : note_heading,
        desc: note_description
    }
    if (saveNotesBtn.innerText != "Update"){
        if (note_heading !='' || note_description!='' ){
            if (data_notes == null){
               let  all_notes = [current_note_object]
                localStorage.setItem("notes",JSON.stringify(all_notes))
            }else{
                let all_notes = JSON.parse(data_notes)
                all_notes.push(current_note_object)
                localStorage.setItem("notes",JSON.stringify(all_notes))
            }
        }

    }else{
        let all_notes = JSON.parse(data_notes);
        let idx = createNoteBox.getAttribute("editNoteIndex");
        // all_notes.push(current_note_object)
        // all_notes.splice(idx,1)
        if (note_heading !='' || note_description!='' ){
            all_notes[idx] = current_note_object
        }
        localStorage.setItem("notes",JSON.stringify(all_notes))
        saveNotesBtn.innerHTML = "Save"
    }
    
    
}

deleteNote = (index) => {
    // This function only deletes note item from OBJECT, and not from the HTML,
    // html will be handeled by showAllNotes, which is called in the button...
    let data_notes = localStorage.getItem("notes");
    let all_notes = JSON.parse(data_notes);
    all_notes.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(all_notes))
    //The following is to avoid unnecessary bugs: 
    let createNoteBox = document.getElementById("create-note-box")
    createNoteBox.children[0].value = ""
    createNoteBox.children[1].value = ""
}
clearCreationBox = (e) => {
    createNoteBox.children[0].value = ""
    createNoteBox.children[1].value = ""
    saveNotesBtn.innerHTML = "Save"
    
}

//For the search box :

searchBox  = document.getElementById("top-search-bar")
searchBox.addEventListener("input",()=>{
    let userInput = searchBox.value.toLowerCase() ;
    let noteBoxes_HTMLCollection = document.getElementsByClassName("note")
    let noteBoxes_Array = Array.from(noteBoxes_HTMLCollection)
    noteBoxes_Array.forEach(e => {
        let note_text = e.getElementsByTagName("p")[0].innerText.toLowerCase()
        let note_heading = e.getElementsByTagName("h2")[0].innerText.toLowerCase()
        if (note_text.includes(userInput) || note_heading.includes(userInput)){
            e.style.display = "flex"
        }else{
            e.style.display = "none"
        }

    })
})

//For the Edit Note :-

editNote = (idx) => {
    //You can not pass object in this type of functions, so use index instead...
    saveNotesBtn.innerHTML = "Update"
    let data_notes = localStorage.getItem("notes");
    let all_notes = JSON.parse(data_notes);
    current_note = all_notes[idx]
    let createNoteBox = document.getElementById("create-note-box")
    createNoteBox.style.display = "block"
    if (current_note.heading !=="" && current_note.desc !== ""){
        createNoteBox.children[0].value = current_note.heading
        createNoteBox.children[1].value = current_note.desc
    }
    localStorage.setItem("notes",JSON.stringify(all_notes))
    createNoteBox.setAttribute("editNoteIndex",idx)
    
}

// for showinf item-menu
const showItemMenu = (hoveredElement) => {
    let itemMenu = hoveredElement.children[2]
    itemMenu.style.opacity="1"
}
const hideItemMenu = (hoveredElement) => {
    let itemMenu = hoveredElement.children[2]
    itemMenu.style.opacity="0"
}