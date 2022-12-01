# wumi-contacts
Technical
    Requirements
        xamp server

    How to Run
        You will need to place the root folder with all its contents in the Site folder of xamp.
        You will also need to create a virtual-site for the project. All links in the application use absolute paths, and this might now work properly if you do not set up a virtual-site for the project first.

    How it works
        The application uses the browser’s local storage to store contact details. When you run the application, it will check if there are existing
        records in the browser’s local storage. If no record is found, it will load the data from the startup/init_data.json file and store it in the
        browser’s local storage. All subsequent requests for contact data will then be retrieved from the browser’s local storage.

Non-Technical
    Landing Page (index.html)
        This shows all the contacts in the application. All contacts on this page are clickable, and clicking on the contacts will take the user to the contact detail page.
        All other pages have direct links to this page, and this page has a few functionalities
            1. Displays all contacts in the application
            2. Provides search functionality where users can search for contacts by full-name
            3. A filter button to take users to a page where they can further filter the contact list
            4. Functionality to sort contacts list in ascending and descending order using the contact’s first name
            5. Button to take users to a page where they can create a new contact

    Detail Page
        This page shows a contact’s full information, i.e., Full name, email address, and phone number. It also provides likes to update the contact and a delete button to
        delete the contact
    Create Page
        This page provides a form for the user to create a new contact. All the fields in this form are required fields, and the form will not save unless they are filled.
    Update Page
        This page provides functionality for the user to update existing contact information. All the fields in this form are required fields, and the form will not save unless they are filled.

