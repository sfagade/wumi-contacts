function init() {
    let contacts_list = JSON.parse(localStorage.getItem('wumi_contacts'));
    console.log("contacts: ", contacts_list)

    if (!contacts_list) {
        $.getJSON('startup/init_data.json', function(contact_json) {
            console.log("json loaded: ", contact_json);
            contacts_list = contact_json;
            saveDataToLocalStorage(contacts_list);
        });
    }
}

function saveDataToLocalStorage(contact_list) {
    localStorage.setItem('wumi_contacts', JSON.stringify(contact_list));
}