let last_id;

function init() {
    let contacts_list = JSON.parse(localStorage.getItem('wumi_contacts'));

    if (!contacts_list) {
        $.getJSON('startup/init_data.json', function(contact_json) {
            console.log("json loaded: ", contact_json);
            contacts_list = contact_json;
            saveDataToLocalStorage(contacts_list);
        });
    }

    displayAllContacts(contacts_list);
}

function saveDataToLocalStorage(contact_list) {
    localStorage.setItem('wumi_contacts', JSON.stringify(contact_list));
}

function displayAllContacts(contacts_list) {
    if (contacts_list) {
        contacts_list.forEach(contact => {
            $('#contacts_ul')
                .append('<li class="list-group-item"><a href="src/pages/details.html?id='+contact.id+'">'
                            +contact.firstName+" "+contact.lastName+
                        '</a></li>');
            last_id = contact.id;
        });
    } else {
        console.log("Contact list is empty");
    }
}

function getRequestParam(name){
    if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
       return decodeURIComponent(name[1]);
 }

 function findContactById(id) {
    let contacts_list = JSON.parse(localStorage.getItem('wumi_contacts'));
    let current_contact;
    if(contacts_list) {
        contacts_list.forEach(contact => {
            if(contact.id == id) {
                current_contact = contact;
                return;
            }
        });
    } else {
        console.log("Contacts is empty");
    }

    return current_contact;
 }

 function displaySingleContact(contact) {
    $('#detail_div').append('<h5 class="card-title">'+contact.firstName+" "+contact.lastName+
        '</h5><h6 class="card-subtitle mb-2 text-muted">'+contact.emailAddress+
        '</h6><h6 class="card-subtitle mb-2 text-muted">'+contact.phoneNumber+'</h6><a href="update.html?id='+contact.id+
        '" class="card-link">Edit</a><a href="#" class="card-link">Delete</a>'
    );
 }