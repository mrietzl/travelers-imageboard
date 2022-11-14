# Life is a journey – a travelers image board

This project is an image board for a travel community where users can add their own experiences captures by a picture. They can upload it, set their username, a title and a describtion to the image. They can also view or even comment on other pictures.

<!-- enabled the link on heroku because of aws issues (picture uploads)
Check out the 👉 [image board for travelers](https://travelers-imageboard.herokuapp.com/) -->

The project was made at the [SPICED Academy](https://www.spiced-academy.com/de) within my Full Stack Web Development Bootcamp (Nov. '21 to Feb. '22)

---

## Features

-   upload files (images)
-   aws simple cloud storage (s3) is used to store the uploaded pictures
-   add a title, a username and a description to the images
-   error handeling for mandatory fields
-   feedback message shown for succefully uploaded images
-   view a board of all the images users have added to the board
-   open and close an overlay component which shows the full picture, title, description, username and date of uploading
-   comment on uploaded pictures
-   routing for revisiting image urls (browser history API)
-   individual branding with infographics, icons, favicon and color scheme
-   hover effects and filters
-   scrolling of components
-   loading more pictures from the data base (pagination)
-   linked elements within the footer to another project

---

## Technology

<a href="https://code.visualstudio.com/" > <img src="./assets/web-development-visual-studio-code.png" height="75px" /></a>
<a href="https://tc39.es/ecma262/" > <img src="./assets/web-development-js.png" height="75px" /></a>
<a href="https://nodejs.org/en/" > <img src="./assets/web-development-node-js.png" height="75px" /></a>
<a href="https://developer.mozilla.org/de/docs/Web/CSS" > <img src="./assets/web-development-css-3.png" height="75px" /></a>
<a href="https://developer.mozilla.org/en-US/docs/Glossary/HTML5" > <img src="./assets/web-development-html-5.png" height="75px" /></a>
<a href="https://www.postgresql.org/" > <img src="./assets/web-development-PostgreSQL.png" height="75px" /></a>
<a href="https://vuejs.org/" > <img src="./assets/web-development-vue-js.png" height="75px" /></a>
<a href="https://aws.amazon.com/de/" > <img src="./assets/web-development-aws.png" height="75px" /></a>
<a href="https://www.heroku.com/" > <img src="./assets/web-development-heroku.png" height="75px" /></a>

---

<!-- ## Design library -->

<!-- ## Preview -->

## Screens

### image board

The main screen shows the image board with the six latest uploads of images, followed by title, an extract of the description and the username of who has added the picture. If there are more images captured in the data base, the visitor can load them via the button below. The input fields on top allow to upload an individual travel experience. Username, title and image are madatory; the description is obligatory. The input fields have a error handeling in case one or more mandatory fields are not filled out. If the upload was successfully a short message pops up to thank for sharing the expierence on the image board.

The pictures on the image board are shown in black and white; by hovering, the cursor will appear with the logo and the picture changes to colors.

In the footer section, the user will find a link to another project I have done within the Spiced Bootcamp.

![image board screen](/public/images/imageboard.png)

### components

By clicking on a picture of the image board, an overlay will pop up. It shows all the details about the image (username, title, description, date of uploading). Additionally, there is a possibility to leave a comment below. A back button on top brings the user back to the image board screen; the overlay will disappear.

![components screen](/public/images/components.png)

---

**© 2022, Michèle Rietzl**

<!--

High Level Description:
This project is an image board where users can upload and describe own travel images or view and comment on pictures other people have added to the board.

Website:
https://travelers-imageboard.herokuapp.com/

Tags:
- aws
- aws-s3
- community
- components
- design
- fetch
- heroku
- history-api
- image
- imageboard
- file-upload
- travel
- travelling
- pagination
- postresql
- s3-bucket
- spicedacademy
- vue-js

-->
