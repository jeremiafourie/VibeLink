# VibeLink

A dynamic community portal website built with Node.js, Express, and EJS.

## Overview

[TODO: To be Discussed]

## Technologies Used

- Node.js (v18+)
- Express.js (v4+)
- EJS (v3+)
- CSS
- Git & GitHub
- Nodemon
- Mongoose (Mongo DB for a database backend)
- UAZAPI (API for whatsapp integration)
- nodemailer (For email integration )


## Team Members and Roles

- Jeremia Fourie `577881`: Backend Developer
- Waldo Blom `578068`: Frontend Developer
- Itumeleng Monokoane `600271`: Documentation Manager
- Onalerona Lefoka `600453`: Data Manager

## Setup Instructions

1. Clone the repository: `git clone https://github.com/jeremiafourie/VibeLink.git`
2. Install dependencies: `npm install`
3. Run in development mode: `npm run dev`
4. In order for the MongoDB, whatsapp integration and email serveries to work the following .env file structure is recommend:
````
MONGO_URI= ... 
SESSION_SECRET= ...

# Uazapi Credentials for WhatsApp integration
UAZAPI_BASEURL=https://donna.uazapi.com
UAZAPI_KEY= ...

# SMTP for email
EMAIL_HOST= ...
EMAIL_PORT=465
EMAIL_USER= ...
EMAIL_PASS= ...

# admin contact info
ADMIN_Name= ...
ADMIN_PHONE= ...
ADMIN_EMAIL= ...
````

## Screenshots from the regular user perspective

### Home Page screenshots

![Home Page 1st section](/public/images/Website%20Screenshots/Home_page_1st_section.png?raw=true "Home Page 1st section")

![Home Page 2nd section](/public/images/Website%20Screenshots/Home_page_2nd_section.png?raw=true "Home Page 2nd section")

![Home Page 3rd section](/public/images/Website%20Screenshots/Home_page_3rd_section_and_footer.png?raw=true "Home Page 3rd section")

### Login pop-up screenshots (This only appears when the user clicks the login button on the nav bar)

![Login popup 1st section](/public/images/Website%20Screenshots/Login_btn_click.png?raw=true "Login popup 1st section")

![Login popup 2nd section](/public/images/Website%20Screenshots/Login_send_opt_click.png?raw=true "Login popup 2nd section")

### About Page screenshots

![About Page](/public/images/Website%20Screenshots/About_page.png?raw=true "About Page")

### Events Page screenshots

![Events page](/public/images/Website%20Screenshots/Events_page_all_events.png?raw=true "Events Page with all events")

![Events page with filter applied](/public/images/Website%20Screenshots/Events_page_with_filter_applied.png?raw=true "Events Page with filter applied")

### Contact Page screenshots

![Contact Page 1st section](/public/images/Website%20Screenshots/Contact_page_1st_section.png?raw=true "Contact Page 1st section")

![Contact Page 2nd section](/public/images/Website%20Screenshots/Contact_page_2nd_section.png?raw=true "Contact Page 2nd section")

### Thank you page (Appears after a contact form submission)
![Thank you page](/public/images/Website%20Screenshots/Thank_you_page.png?raw=true "Thank you page")


## Screenshots from the admin perspective

### Home Page screenshots (The only difference being the nav bar that changes)
![Admin home page](/public/images/Website%20Screenshots/Admin_Home_page.png?raw=true "Home Page 1st section")

### About Page screenshots

Stays the same as on the regular user page

### Events Page screenshots
![Admin events Page](/public/images/Website%20Screenshots/Admin_events.png?raw=true "Admin events Page")

#### Button create event click on events page
![Admin events Page btn add](/public/images/Website%20Screenshots/Admin_event_create_btn_click.png?raw=true "Admin events Page btn add")

#### Button delete event click on events page
![Admin events Page btn delete](/public/images/Website%20Screenshots/Admin_event_delete_btn_click.png?raw=true "Admin events Page btn delete")

#### Button update event click on events page
![Admin events Page btn update](/public/images/Website%20Screenshots/Admin_events_update_btn_click.png?raw=true "Admin events Page btn update")

### Users Page
![Admin users Page](/public/images/Website%20Screenshots/Admin_Users_page.png?raw=true "Admin events Page")

#### Button new user click on users page
![Admin users Page btn add](/public/images/Website%20Screenshots/Admin_Users_addUser_btn_click.png?raw=true "Admin users Page btn add")

#### Button delete user click on users page
![Admin users Page btn delete](/public/images/Website%20Screenshots/Admin_Users_delete_btn_click.png?raw=true "Admin users Page btn delete")

#### Button update user click on users page
![Admin users Page btn delete](/public/images/Website%20Screenshots/Admin_Users_update_btn_click.png?raw=true "Admin users Page btn update")

### Submissions Page (No filter applied)
![Admin submissions Page](/public/images/Website%20Screenshots/Admin_submissions_not_filtered.png?raw=true "Admin submissions Page")

### Submissions Page (Filter applied)
![Admin submissions Page](/public/images/Website%20Screenshots/Admin_Submissions_filtered.png?raw=true "Admin submissions Page")

## Reflection

[TODO: On Project Completion]
