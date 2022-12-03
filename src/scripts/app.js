let last_id;

function init() {
    let contacts_list = JSON.parse(localStorage.getItem('wumi_contacts'));

    if (!contacts_list) {
        $.getJSON('/startup/init_data.json', function(contact_json) {
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
                .append('<li class="list-group-item"><a href="/src/pages/details.html?id='+contact.id+'" class="text-decoration-none">'
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
    $('#detail_div').append('<h5 class="card-title pb-3">'+contact.fullName+'</h5>'+
        '<h6 class="card-subtitle mb-2 text-muted pb-3">'+contact.emailAddress+
            '<span class="float-end"><img src="/src/pages/images/new-post.png" atl="email" title="Click here to send email" width="22"/><span></h6>'+
        '<h6 class="card-subtitle mb-2 text-muted pb-3">'+contact.phoneNumber+'<span class="float-end">'+
            '<img src="/src/pages/images/ringer-volume.png" atl="call" title="Click here to call this number" class="mr-2" width="22"/>'+
            '<img src="/src/pages/images/new-post.png" atl="SMS" title="Click here to send SMS" width="22"/><span></h6>'+
        '<div class="pt-3"><a href="update.html?id='+contact.id+'" class="card-link text-decoration-none" title="Click to edit contact">'+
            '<img src="/src/pages/images/pencil.png" atl="edit" width="22"/></a>'+
        '<a href="delete.html?id='+contact.id+'" class="card-link text-decoration-none" title="Click to delete contact" id="delete_link">'+
            '<img src="/src/pages/images/delete-forever.png" atl="delete" width="22"/></a></div>'
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
    displaySuccessMessage('New Contact Created Successfully', 'alert alert-success');
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
    displaySuccessMessage('Contact Updated Successfully', 'alert alert-success');
    window.location = "details.html?id="+id;
}

function displaySuccessMessage(message, className) {
    $('#msg_div').html(message);
    $('#msg_div').addClass(className);
    //$('#msg_div').animate({opacity: 0}, 4000);
    $('#msg_div').fadeIn(function() {
        $(this).text(message)
      }).fadeOut(4000);
}

function nameSearchClicked() {
    let contact_name = $('#search_name').val();

    if(contact_name !== "" && contact_name.length > 0) {
        let contacts_list = JSON.parse(localStorage.getItem('wumi_contacts'));
        if (contacts_list) {
            let filtered = contacts_list.filter(contact => {
                return contact.fullName.toLowerCase().includes(contact_name.toLowerCase());
             });
             if(filtered && filtered.length > 0) {
                $('#contacts_ul').html(" ");
                displayAllContacts(filtered);
             } else {
                displaySuccessMessage('No contact found with name: '+contact_name, 'alert alert-danger');
             }
        } else {
            console.debug("Contact list is empty ");
        }
    } else {
        displaySuccessMessage('Contact name is empty');
    }
}

function filterContactList() {
    let search_name = $('#contact_name').val();
    let phone_number = $('#phone_number').val();
    let email_address = $('#email_address').val();

    if (search_name !== '' || phone_number !== '' || email_address !== '') {
        let contacts_list = JSON.parse(localStorage.getItem('wumi_contacts'));
        let filtered_list = [];

        if (search_name !== '') {
            filtered_list = contacts_list.filter(contact => {
                return contact.fullName.toLowerCase().includes(search_name.toLowerCase());
            });
        } else if (phone_number !== '') {
            filtered_list = contacts_list.filter(contact => {
                return contact.phoneNumber.includes(phone_number);
            });
        } else if (email_address !== '') {
            filtered_list = contacts_list.filter(contact => {
                return contact.emailAddress.toLowerCase().includes(email_address.toLowerCase());
            });
        }

        if (filtered_list.length > 0) {
            $('#contacts_ul').html(" ");
            displayAllContacts(filtered_list);
        }

    } else {
        displaySuccessMessage('No search criteria specified', 'alert alert-danger');
    }
}

function sortContactList(prop, asc) {
    let contacts_list = JSON.parse(localStorage.getItem('wumi_contacts'));

    contacts_list.sort(function(a, b) {
        if (asc) {
            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        } else {
            return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        }
    });
    $('#contacts_ul').html(" ");
    displayAllContacts(contacts_list);
}