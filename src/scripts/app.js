let contacts_list;
let last_id;

function init() {
    contacts_list = JSON.parse(localStorage.getItem('wumi_contacts'));

    if (!contacts_list) {
        $.getJSON('startup/init_data.json', function(contact_json) {
            console.log("json loaded: ", contact_json);
            contacts_list = contact_json;
            saveDataToLocalStorage(contacts_list);
        });
    }

    displayAllContacts();
}

function saveDataToLocalStorage(contact_list) {
    localStorage.setItem('wumi_contacts', JSON.stringify(contact_list));
}

function displayAllContacts() {
    if (contacts_list) {
        contacts_list.forEach(contact => {
            $('#contacts_ul')
                .append('<li class="list-group-item"><a href="src/pages/details.html?id='+contact.id+'">'
                            +contact.firstName+" "+contact.lastName+
                        '</a></li>');
            last_id = contact.id;
        });
    } else {
        console.log("Contact list is empty")
    }
}