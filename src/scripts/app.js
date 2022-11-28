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
                            +contact.fullName+
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
    $('#detail_div').append('<h5 class="card-title">'+contact.fullName+
        '</h5><h6 class="card-subtitle mb-2 text-muted">'+contact.emailAddress+
        '</h6><h6 class="card-subtitle mb-2 text-muted">'+contact.phoneNumber+
        '</h6><a href="update.html?id='+contact.id+
        '" class="card-link">Edit</a><a href="delete.html?id='+contact.id+
        '" class="card-link">Delete</a>'
    );
 }

function newContactFormSubmit() {
    let new_contact = new Object();
    let contacts_list = JSON.parse(localStorage.getItem('wumi_contacts'));

    new_contact.firstName = $('#first_name').val();
    new_contact.lastName = $('#last_name').val();
    new_contact.phoneNumber = $('#phone_number').val();
    new_contact.emailAddress = $('#email_address').val();
    new_contact.fullName = new_contact.firstName+" "+new_contact.lastName;
    new_contact.id = contacts_list.length + 1;

    contacts_list.push(new_contact);
    saveDataToLocalStorage(contacts_list);
    resetContactForm();
    displaySuccessMessage('New Contact Created Successfully');
}

function resetContactForm() {
    $('#first_name').val('');
    $('#last_name').val('');
    $('#phone_number').val('');
    $('#email_address').val('');
}

function initUpdateForm(contact) {
    if(contact) {
        $('#first_name').val(contact.firstName);
        $('#last_name').val(contact.lastName);
        $('#phone_number').val(contact.phoneNumber);
        $('#email_address').val(contact.emailAddress);
        $('#contact_id').val(contact.id);
    }
}

function deleteContact(id) {
    let contacts_list = JSON.parse(localStorage.getItem('wumi_contacts'));

    if(id && contacts_list) {
        let filtered = contacts_list.filter(contact => {
            return contact.id != id;
         });

        localStorage.removeItem('wumi_contacts');
        saveDataToLocalStorage(filtered);
        return true;
    }
    return false;
}

function updateContact() {
    const id = $('#contact_id').val();
    deleteContact(id);

    let contact = new Object();
    let contacts_list = JSON.parse(localStorage.getItem('wumi_contacts'));

    contact.firstName = $('#first_name').val();
    contact.lastName = $('#last_name').val();
    contact.phoneNumber = $('#phone_number').val();
    contact.emailAddress = $('#email_address').val();
    new_contact.fullName = contact.firstName+" "+contact.lastName;
    contact.id = Number(id);

    contacts_list.push(contact);
    saveDataToLocalStorage(contacts_list);
    displaySuccessMessage('Contact Updated Successfully');
    window.location = "details.html?id="+id;
}

function displaySuccessMessage(message) {
    $('#msg_div').html(message);
    $('#msg_div').addClass('alert alert-success');
    $('#msg_div').animate({opacity: 0}, 4000);
}