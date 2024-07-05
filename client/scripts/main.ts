// Name: Himanshu
// Student ID: 100898751
// File Name:  main.scripts
// Folder Name: Assignment-1
// Date Created: 24-01-24
// Description: This file will be used to add the dynamic functionality to the page.


// Telling the JS Compiler to be strict about the coding guidelines suggested by the ECMA Script 6
"use strict";



(function ()
{

    /**
     * ------------------------------------------------------> Team Page
     */
    function TeamNecessity()
    {
        /**
         * Creating some array which will contain the information of the team members !
         * Like their name, signature tacic etc
         */
        let teamMemberInfo:string[][] = [
            ["Captain Chucklehead", "Ability to turn any serious situation into a hilarious comedy routine.", "The Giggle Grenade – releases a burst of contagious laughter that echoes through the community."],
            ["Guffaw Gadgeteer", "Creates wacky inventions that induce uncontrollable laughter.", "The Snicker Snatcher – a device that steals frowns and replaces them with smiles."],
            ["Punmaster Flex", "Unleashes puns so groan-worthy that enemies are too busy facepalming to fight.", "The Pun-isher – a rapid-fire pun attack that leaves everyone in stitches."],
            ["Chuckling Chemist", "Mixes concoctions that produce hilariously unexpected side effects.", "The Belly Bubbler – a potion that makes everyone burst into spontaneous laughter."],
            ["Tickle Tactician", "Masters the art of strategic tickling to distract and disarm opponents.", "The Tickle Tango – a synchronized tickling routine that confuses adversaries."]
        ];

        /**
         * This Array stores the pic of team members
         * @type {string[]}
         */
        let teamMemberPic: string[] = ["team_1","team_2","team_3","team_4","team_5","team_6"];


            /**
             * Selecting the element inside which the team members will be displayed,
             */
            let mainContainer = $("#teamContainer");

            /**
             * Creating a modal which will be unique to all team cards
             */
            let infoModal = new bootstrap.Modal(document.getElementById("moreInfo") as HTMLElement, {
                backdrop: 'static',
                keyboard: true
            });

            /**
             Using the for loop to print all Team Members and also binding an event handler with them
             **/
            for (let i:number = 0; i < teamMemberInfo.length; i++)
            {
                /**
                 * Creating a Container which will hold the Cards.
                 */
                let divContainer = document.createElement("div");

                /**
                 * Setting Some attributes.
                 */
                divContainer.setAttribute("class", "col-md-5 mb-5");
                divContainer.setAttribute("style", "width:380px");

                /**
                 * Setting the inner html of the div Container for each of the card.
                 */
                divContainer.innerHTML =
                    `
                                    <div class="card" >
                                        <img src="/assests/images/${teamMemberPic[i]}.jpg" class="card-img-top" style="height: 200px; ">
                                        <div class="card-body">
                                            <h5 class="card-title">${teamMemberInfo[i][0]}</h5>
                                            <p class="card-text">${teamMemberInfo[i][1]}</p>
                                            <button class="btn btn-primary" id="button_${i}">More Details</button>
                                        </div>
                                    </div>
                                `;


                /**
                 * Appending the child at the end of the container
                 */
                mainContainer.append(divContainer);

                /**
                 * For Each element being appended as child to div
                 * binding an event hanlder which will trigger the show Modal event.
                 */
                $(`#button_${i}`).on("click", function()
                {
                    // Message.
                    console.log("displaying the signature tactics")

                    /**
                     * Setting the inner content of the "Modal Body".
                     */
                    $("#signBody").html(`<b><i>Singnature Tactic:</i> <br> ${teamMemberInfo[i][2]}`);

                    /**
                     * Show the Modal.
                     */
                    infoModal.show();
                });
            }
    }

    /**
     * ---------------------------------------------------------> Events Page
     */
    function LoadEvents()
    {
        /**
         * Definninig some variables!
         */
        let events;
        //Just a Type Notation
        let extraEvents : [{eventName: string,date: string, eventLocation:string, organizer:string
            ,Description:string, instructor:string, isFree: boolean}];
        let counter: number = 0;
        const MAX_EVENT_PER_ROW:Number = 3;

        /**
         * Using the jQuery .get() Shorthand Method to retrieve
         * data from the JSON File !
         */
        $.get("./data/events.json",function (data)
        {
            /**
             * Initializing the global variables with the two arrays of Events
             * retrieved from the JSON File !
             */
            events = data.events;
            extraEvents = data.extraEvents;

            /**
             * Once the Arrays of Events has been retrieved then we would use for loop to generate the
             * Card for Each of the event using the Information present in the event.
             * This will generate the initial 6 records or depending upon the size of events array in JSON
             */
            EventCardGenerator(events);
        });


        /**
         * =================================================================>
         * Binding an Event Listener to the Button !
         * On click it will generate the Extra or remaining cards in the
         * JSON File !
         */
        $("#loadEvents").on("click", ()=>
        {
            /**
             * Loads the events present in the extra Event's Array
             */
            EventCardGenerator(extraEvents);
            /**
             * Hide the load Event button
             */
            $("#loadEvents").hide();
        });


        /**
         * This Function read the array of Events and make a Card for each of the element
         * as well as print them inside the table in 3-cards per row design !
         * @param arrayOfEvents
         * Note: In TypeScript we have to specify all the type of stuuf
         */
        function EventCardGenerator(arrayOfEvents:[{eventName: string,date: string, eventLocation:string, organizer:string
            ,Description:string, instructor:string, isFree: boolean}])
        {
            for (let i:number = 0; i < arrayOfEvents.length; i++) {
                /**
                 * This line will create a new row to hold three Events card
                 */
                if (counter === 0) {
                    $("table>tbody").append(`<tr>`);
                }
                /**
                 * Populating the fields of the cards using the Json Objects !
                 * @type {string}
                 */
                let eventCard = `
                                    <td>
                                        <div class="card" style="width: 18rem; margin-right: 30px; margin-top: 10vh">
                                            <img class="card-img-top" src="/assests/images/center_1.jpg" alt="Card image cap">
                                            <div class="card-body">
                                                <h5 class="card-title">${arrayOfEvents[i].eventName}</h5>
                                                <p class="card-text">${arrayOfEvents[i].Description}</p>
                                            </div>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">Location : ${arrayOfEvents[i].eventLocation}</li>
                                                <li class="list-group-item">Date: ${arrayOfEvents[i].date}</li>
                                                <li class="list-group-item">Organizer : ${arrayOfEvents[i].organizer}</li>
                                                <li class="list-group-item">Price : ${arrayOfEvents[i].isFree ? "Free" : "$20.31"}</li>
                                            </ul>
                                            <div class="card-body">
                                                <a href="#" class="card-link">Card link</a>
                                                <a href="#" class="card-link">Another link</a>
                                            </div>
                                        </div>
                                    </td>`;

                /**
                 * Selecting the Events table !
                 */
                $("table>tbody").append(eventCard);

                /**
                 * Increment the Counter by 1
                 */
                counter++;

                /**
                 * Once three event have been processed then it will close the row
                 * and the above one will initiate a new row
                 */
                if (counter === MAX_EVENT_PER_ROW)
                {
                    $("table>tbody").append(`</tr>`);
                    counter = 0;
                }
            }
        }
    }


    /**
     * -------------------------------------------------------------> Search Bar
     */
    function SearchBar()
    {
        console.log("Search Bar Working");
        /**
         * Selecting the input element.
         */
        let inputElement : JQuery<HTMLElement> = $("#searchText");

        /**
         * Hide the result container
         */
        function Hide() {
            $("#results-box").hide();
        }

        /**
         * Shows the result container
         */
        function Show() {
            $("#results-box").show();
        }

        /**
         * Binding an event listener to the Search input field
         * on "Hover" over the input field "show" the result container
         */
        inputElement.on("mouseover", function () {
            Show();
        })

        /**
         * Binding an event listener to the Search input field
         * on "Hover" over the input field "Hide" the result container
         */
        inputElement.on("mouseleave", function () {
            Hide();
        })


        /**
         * Binding an event listener to the Result Container
         * on "hover" over the input field "show" the result container
         */
        $("#results-box").on("mouseover", function ()
        {
            Show();
        })

        /**
         * Also Selecting the immediate childs of the results box
         */
        $("#results-box>li").on("mouseover", function ()
        {
            Show();
        })

        /**
         * Binding an event listener to the Search input field
         * on "hover leave" over the input field "Hide" the result container
         */
        $("#results-box").on("mouseleave", function () {
            Hide();
        })


        /**
         * Binding the event handler to the Search Box (Input Element)
         * when the user start typing then this event is triggered
         */
        inputElement.on("keyup", function ()
        {
            /**
             * Function Execution Indicator !
             */
            console.log("Someone Started Typing, You better work fine.");

            /**
             * Using the shorthand method called .get()
             * method to make an Asynchronous request to json file !
             */
            $.get("./data/keywords.json", function (data:{keywords:{keyword:string,Url:string}[]})
            {
                // @ts-ignore
                /**
                 * Retrieving the user input !
                 */
                let userInput =  $("#searchText").val() as string;

                /**
                 * Storing the keywords array inside another variable !
                 */
                let matching: {keyword:string,Url:string}[] = data.keywords;

                /**
                 * Using the .filter() method to find the matching elements from the
                 * array and then storing the matching elements to the new array !
                 * called resultsArray
                 *
                 * Note: .filter() is called for each element of the array !
                 */

                let resultsArray: {keyword:string,Url:string}[] = matching.filter((resultItem : {keyword:string,Url:string}) => resultItem.keyword.toLowerCase().includes(userInput.toLowerCase()));

                /**
                 * Testing
                 */
                console.log(resultsArray);
                /**
                 * Display the results in the container  to the user !
                 */
                ShowResult(resultsArray);
            });


            /**
             * This method takes the
             * @param arrayOfResults
             * @returns {null}
             * @constructor
             */
            function ShowResult(arrayOfResults: {keyword:string,Url:string}[]): void
            {
                /**
                 * Selecting the element or container in which the result
                 * elements will be shown
                 */
                let resultContainer = $("#results-box");
                /**
                 * Clear the previous results
                 */
                resultContainer.html("");

                /**
                 * If no results are found then a text will be displayed
                 * and break!
                 */
                if (arrayOfResults.length <= 0) {
                    resultContainer.html("No Search Found");
                    return;
                }
                /**
                 * If something is present inside the array then
                 * iterate over the elements and make Anchor tag for each of the element
                 * with data attribute value set
                 */
                arrayOfResults.forEach(
                    result => {
                        resultContainer.append(`<li><a class = "searchItems" 
                                            href = "${result.Url}">${result.keyword}</a></li>`);
                    }
                )

            }
        });

    }

    /**
     * This function will validate the necessary fields of the register form
     */
    function RegisterFormValidation()
    {
        console.log("Validation in Progress.")
        ValidateField("#firstName_register",/^[a-zA-Z]{2,30}$/,
            "Please enter valid first name");
        ValidateField("#lastName_register",/^[a-zA-Z]{2,30}$/,
            "Please enter valid last name");
        ValidateField("#email_register",/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "Please enter valid email Address");
        ValidateField("#phone_register",
            /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
            "Enter a valid Contact Number")
        ValidateField("#address_register",
            /^[0-9]+(\s[A-Za-z]+\.?(\s[A-Za-z]+\.?)?)?\s[A-Za-z]+(\s[A-Za-z]+)?(\s[0-9A-Za-z]+)?$/,
            "Please enter valid physical address");
    }

    /**
     * This function will validate the necessary fields of the Edit Form
     */
    function EditFormValidation()
    {
        console.log("Validation in Progress.")
        ValidateField("#firstName_update",/^[a-zA-Z]{2,30}$/,
            "Please enter valid first name");
        ValidateField("#lastName_update",/^[a-zA-Z]{2,30}$/,
            "Please enter valid last name");
        ValidateField("#email_update",/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "Please enter valid email Address");
        ValidateField("#phone_update",
            /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
            "Enter a valid Contact Number")
        ValidateField("#address_update",
            /^[0-9]+(\s[A-Za-z]+\.?(\s[A-Za-z]+\.?)?)?\s[A-Za-z]+(\s[A-Za-z]+)?(\s[0-9A-Za-z]+)?$/,
            "Please enter valid physical address");
    }

    /**
     This function will validate the necessary fields of the Contact Form
     */
    function ContactFormValidation()
    {
        console.log("Validation in Progress.")
        ValidateField("#firstName",/^[a-zA-Z]{2,30}$/,
            "Please enter valid first name");
        ValidateField("#lastName",/^[a-zA-Z]{2,30}$/,
            "Please enter valid last name");
        ValidateField("#email",/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "Please enter valid email Address");
        ValidateField("#phone",
            /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
            "Enter a valid Contact Number")
        ValidateField("#address",
            /^[0-9]+(\s[A-Za-z]+\.?(\s[A-Za-z]+\.?)?)?\s[A-Za-z]+(\s[A-Za-z]+)?(\s[0-9A-Za-z]+)?$/,
            "Please enter valid physical address");
    }


    /**
     * This function Dynamically loads the picture from json file
     */
    function GalleryPage()
    {

        /**
         * Selecting the div row tag.
         */
        let divRow = $("#rowDiv");
        /**
         * Getting the picture data from the json file
         */
        $.get("./data/events_picture.json", function(data)
        {
            /**
             * Storing the events array inside the variable
             */
            let eventsPic = data.events;

            /**
             * Using the for loop to iterate over the image data
             */
            for (const pic of eventsPic)
            {
                /**
                 * Creating a new Div element for each picture
                 * using the Jquery
                 */
                let newDiv = $("<div>");

                /**
                 * Setting the attributes of the div class
                 */
                newDiv.addClass("col");

                /**
                 * Setting the html content of new div tag
                 */
                newDiv.html
                (`<a class="gallery-item" href="${pic.imageSrc}">
                                        <img src="${pic.imageSrc}" class="img-fluid" alt="${pic.altText}">
                                   </a>`
                )

                /**
                 * Appending the item at the end of the div row tag.
                 */
                divRow.append(newDiv);
            }
        });
    }

    /**
     * This function validates the user input.
     * and displays an modal on successful validation
     */
    function RegisterForm()
    {
        /**
         * Validation of the Register Form
         */
        RegisterFormValidation();

        /**
         * Associating the modal object with the existing one in the page for controlled behvaiour
         */
        let newRegister:bootstrap.Modal =  new bootstrap.Modal(document.getElementById("registerModal") as HTMLElement,
            {
                // This two options are changing the behavior of the modal.
                backdrop: 'static', // Won't close if we click outside of modal
                keyboard: true //  Escape key will not close the modal.
            });

        newRegister.show(); // Show the Modal

    }

    /**
     * This function validates the user input.
     * and displays an modal on successful validation
     */
    function EditForm()
    {
        /**
         * Validation of the Register Form
         */
       EditFormValidation();

        /**
         * Associating the existing modal with the boostrap one for controlled behaviour
         */
        let newRegister:bootstrap.Modal =  new bootstrap.Modal(document.getElementById("registerModal") as HTMLElement,
            {
                // This two options are changing the behavior of the modal.
                backdrop: 'static', // Won't close if we click outside of modal
                keyboard: true //  Escape key will not close the modal.
            });

        newRegister.show(); // Show the Modal.
    }

    /**
     * A Function Which will check whether the full name matches the Full name expression or not.
     * Accepts three arguments
     * Field ID
     * regular expression
     * error_message
     */
    function ValidateField(input_field_id: string, regular_expression : RegExp, error_message: string): void
    {
        /**
         * Selecting the Message Area Container !
         * @type {*|jQuery|HTMLElement}
         */
        let messageArea = $("#messageArea").hide();

        /**
         * When the Full name filed is left then this validation will occur immediately.
         * And using the named function to specifically refer the Name Field cause Named one has it own "this".
         * blur--> when we leave focus from the element
         */
        $(input_field_id).on("blur",function ()
        {
            /**
             * Since used jQuery ,so we have to use the .val() to get the value of the element.
             * @type {*|string|jQuery}
             */
            let inputFieldText = $(this).val();
            // this refers to the element on which or the element which triggered this
            // event.

            /**
             * if pattern does not match
             */
            if(!regular_expression.test(inputFieldText as string))
            {
                /**
                 * Trigger can force the specific event to occur
                 */
                $(this).trigger("focus").trigger("select"); // Appending the two triggers in jquery
                // (Dazy Change function)

                messageArea.addClass("alert alert-danger").text(error_message); // Appending again

                messageArea.show(); // Show the message to the user !
            }
            else
            {
                /**
                 * Do nothing !
                 */
                messageArea.removeAttr("class").hide(); // Remove class and hide the element.
            }
        });
    }

    /**
     * Form Validation (Login Form)
     */
    function LoginFormValidation()
    {
        ValidateField
        ("#loginEmail",
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "Please enter a valid email address");
    }

    /**
     * Displays the login Form
     */
    function displayLoginForm()
    {
            /**
             * Validate the user input
             * using the "Regular Expressions"
             */
            LoginFormValidation();

    }


    /**
     * Defining the CallBack function
     * For Google Map API
     * @FunctionType Async
     */
    async function initMap()
    {

        /**
         * Declaring the variable which will hold the object of the map class !
         */
        let map;
        /**
         * This is Position of Durham College
         * because I don't know Harmony Hub
         * @type {{lng: number, lat: number}}
         */
        const position: { lng: number; lat: number; } = { lat: 43.94373576253126, lng: -78.89703131534256 };


        /**
         * Using the Destructing Assignment Operator to Extract Specific Properties from the library
         * Like here I am Extracting two Class from the Imported Library !
         */
        const { Map } = await google.maps.importLibrary("maps")  as google.maps.MapsLibrary;
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

        /**
         * Creating the Object of Classes !
         */
        map = new Map(document.getElementById("map") as HTMLElement, {
            zoom: 15,
            center: position,
            mapId: "harmony_hub",
        });

        /**
         * Creating the Object and Associating the Object with the
         * Map Object and also specifying the location of the marker.
         */
        const marker = new AdvancedMarkerElement({
            map: map,
            position: position,
            title: "Harmony Hub",
        });
    }


    /**
     * This Method Provide Ultimate Functionality to the Statistics page
     * Enabling the users to navigate to different years of visitors data
     * Which is being extracted from the .json file using the Asynchronous Programming
     * and then dynamically changing the chart data on the user navigation
     *
     * @functionType Async
     */
    async function ShowStats()
    {
        /**
         * Defining the empty Chart
         */
        let chart: Chart;

        /**
         * Getting the current URL
         */
        const currentUrl = window.location.href;

        /**
         * Creating the Object of the URL Class
         */
        const url = new URL(currentUrl);


        let parameterValue:number;

        /**
         * Trying to retrieve the parameter value from the URL.
         */
        if(url.searchParams.get("yearIndex") === null)
        {
            parameterValue = 0; // if null then value will be set to 0
        }
        else
        {
            // Otherwise actual value will be set.
            parameterValue = parseInt(<string>url.searchParams.get("yearIndex"))
        }


        /**
         * Defining the data empty variable
         */
        let data: {months:string[],years:{year: number, visitors: number[]}[]};
        /**
         * Trying to populate the data using the async function
         */
        data = await getWebStats();

        /**
         * Selecting the Canvas Element inside which the Chart will be displayed
         * @type HTMLCanvasElement
         */
        let charContainer: HTMLCanvasElement = document.querySelector('#visitorStats') as HTMLCanvasElement
        /**
         * Creating the new instance of the Chart
         * @type Chart
         */
        chart = new Chart(
                charContainer,
                {
                    type: 'line',
                    data: {
                        labels: data.months,
                        datasets: [
                            {
                                label: `Harmony Hub\'s visitor statistics for ${data.years[parameterValue].year}`,
                                data: data.years[parameterValue].visitors,
                                backgroundColor : 'rgba(255,99,132,0.2)',
                                borderColor: 'rgba(255,99,132,1)',
                                fill: false,
                                borderWidth: 1
                            }
                        ]
                    },
                    options:
                    {
                        animation:
                        {
                                duration: 1000,
                                easing: 'linear',
                        }
                    }

                }
            );

        /**
         * Custom API for Accessing the JSON File
         * Which returns a "Promise Object which
         * takes an Asynchronous Function with two callbacks as an argument"
         * and also have some code inside it, based on the completion of
         * code the "resolve or reject is called."
         *
         * @functionType Async
         * @return Promise<{months: string[], years: {year: number, visitors: number[]}[]}>
         */
        async function getWebStats(): Promise <{months: string[], years: {year: number, visitors: number[]}[]}> // IMP (Define the return type)
        {
            /**
             * Return a Promise Object with "Jquery AJAX get shorthand inside it."
             */
            return new Promise((resolve, reject) =>
            {
                /**
                 * Jquery .get Method
                 */
                $.get("./data/userStatistics.json", function (data)
                {
                    resolve(data); // return the data
                });
            });
        }

    }


    /**
     * This method provide functionality to the "Planinning page"
     * Where the logged in user can see the upcoming events being fetched from .json file
     * and have the options of getting more detail about the event as well as
     * can mark the event which eventually put the copy of that event card inside the marked event table
     * which they can later remove.
     * At last, this function also add the user's proposed event to the events table
     * which after the verfication can be made "public for other"
     */
    function DisplayPlanningPage()
    {

        console.log("Planning Page"); //Message

        /**
         *  Creating the modal whose content will be changed Dynamically based on the button the user has clicked
         *  because each button is associated with the "unique" id and which will be used to reference the "unique" event handler block of code
         *  when that event occuur.
         */

        $(".eventDetailButtons").on("click", function()
        {
            let eventInfoModal : bootstrap.Modal = new bootstrap.Modal(document.getElementById(`modal_${$(this).attr('id')}`) as HTMLElement,
            {

            });

            eventInfoModal.show();
        })


        let newEventModal: bootstrap.Modal = new bootstrap.Modal(document.getElementById("newEventModal") as HTMLElement,
            {});

        newEventModal.show();
    }

    /**
     * This function add the footers at the end of  each page !
     */
    function AddFooters()
    {
        /**
         * Adding the Footer at the end of the page
         */

            // Selecting the body Object of the document Object
        let body = document.body;

        // Create a new element div which will contain the footer element !
        let footerContainer = document.createElement("div");

        // Setting the attributes of the container
        footerContainer.setAttribute("Class","container")


        // Declaring the array of footer elements names
        let footerElements = ["Policy","Terms of Service", "Contact"];
        // Also declaring an Array of addresses of the footer elements pages
        let footerElementsPages = ["privacy","terms","contact"];

        let readyFooterElements = ""; // This will store the ready footer links !

        // Using the for loop to print the footer elements !
        for (let i=0; i < footerElements.length; i++)
        {
            readyFooterElements += `<li class="nav-item"><a href="/${footerElementsPages[i]}" class="nav-link px-2 text-muted">${footerElements[i]}</a></li>`
        }

        // Setting the inner HTML of the div element
        footerContainer.innerHTML = `
                  <footer class="py-3 my-4">
                    <ul class="nav justify-content-center border-bottom pb-3 mb-3">
                    ${// Print the for loop generated elements here !
            readyFooterElements}                   
                    </ul>
                    <p class="text-center text-muted">&copy; 2024 Harmony Hub, CA</p>
                  </footer>`

        // Adding the new Element as the last child of the body element
        body.appendChild(footerContainer);

    }


    /**
     * ======================================================================> Contact Page
     * This method is related to Contact Page and execute when
     * the contact.ejs page is loaded !
     */
    function DisplayContactPage()
    {
        ContactFormValidation(); // Peform the necessary form validation

        /**
         * Asscoating the existing Modal in the page with the boostrap one for controlled behaviour.
         */
        let thanksModal = new bootstrap.Modal(document.getElementById('contactModal') as HTMLElement, {
            backdrop: 'static',
            keyboard: false
        });

        // Show the modal
        thanksModal.show();
    }
    /**
     * =======================================================================> Portfolio Page !
     * This method is specifically created for our portfolio page !
     //  */
    function PortfolioPage()
    {
        /**
         * This function add the new cards into the page.
         */
        function newPortfolio()
        {
            /**
             * Defining the array of Project titiles.
             */
            let projectTitles: string[] =
                [
                    "Fitness BootCamp",
                    "Community CookBook Project",
                    "Teach for Seniors Program"
                ];

            /**
             * Defining the array of Project Description
             */
            let projectDescriptions =
                [
                    "Regular art and craft sessions for individuals of all ages. Activities include painting, pottery, and DIY crafts to foster creativity and provide a platform for artistic expression.",
                    "Collaborative creation of a community cookbook featuring recipes contributed by residents. The project promotes cultural exchange through food and fosters a sense of community.",
                    "Workshops and training sessions tailored for senior citizens to enhance their technological skills. Topics include using smartphones, social media, and online communication tools."
                ];

            /**
             * Defining the images of the Project community center being involved in.
             */
            let imageLocations = ["center_3.jpg", "center_5.jpg", "center_1.jpg"];

            /**
             * Selecting the Element inside which the Project will be displayed as row-cell
             */
            let projectTable = $("#projectTable");

            /**
             * Creating an new Row.
             */
            projectTable.append('<tr id = "onClickLoad" >');

            /**
             * Using the for loop to populate the cards using the card info
             */
            for (let i = 0; i < projectTitles.length; i++) {


                let newRow: JQuery<HTMLElement> = $("#onClickLoad")
                /**
                 * Inserting the new cell in a row.
                 */

                newRow.append(`<td id='${i}'>`);

                let newCell: JQuery<HTMLElement> = $(`td#${i}`);

                // Creating a new div for the content cell
                let newDiv = document.createElement("div");
                newDiv.setAttribute("class", "card w-75 m-5");
                newDiv.innerHTML =
                    `<img src="/assests/images/${imageLocations[i]}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${projectTitles[i]}</h5>
                        <p class="card-text">${projectDescriptions[i]}</p>
                        <a href="#" class="btn btn-primary">Get More Details</a>
                    </div>`;

                // Appending the new div to the content cell
                newCell.append(newDiv);
            }
        }

        $("#loadPortfolio").on("click",function()
        {
            newPortfolio();
        })
    }

    /**
     * This page will identify which page the user is on
     * and execute the method related to that page !
     */
    function pageIdentifier(): any
    {

        /**
         * Implement the search bar functionality.
         */
        SearchBar();

        /**
         * Getting the page id from the Body tag
         */
        let page_id = $("body")[0].getAttribute("id");

        /**
         * This switch will implement the functionality needed
         * based on the activeLink of the website
         */
        switch(page_id)
        {
            case "home":  initMap();
            break;
            case "blogs": console.log("Blogs Page is Active");
            break;
            case "contact" :   DisplayContactPage();
            break;
            case "events" : LoadEvents();
            break;
            case "gallery":  GalleryPage();
            break;
            case "login" :  displayLoginForm();
            break;
            case "portfolio" : PortfolioPage();
            break;
            case "privacy" : console.log("Privacy Page is Active");
            break;
            case "register" : RegisterForm();
            break;
            case "services" : console.log("Services Page is Active");
            break;
            case "team" :  TeamNecessity();
            break;
            case "terms" : console.log("Terms and Conditions Page is Active");
            break;
            case "statistics":  ShowStats();
            break;
            case "planning": DisplayPlanningPage();
            break;
            case "edit": EditForm();
                break;
            default:
                console.error("ERROR: callback does not exist" + router.ActiveLink);
                return new Function();
        }
    }


    /**
     * This function is change the content of page as well as add some new components like
     * footer dynamically.
     */
    function StartMethod()
    {
        /**
         * Add Footers
         */
        AddFooters();

        /**
         * Provide the functionality according to the page
         */
        pageIdentifier();
    }

    /**
     This will write something in the console when the window has loaded all its resources !
     */
    window.addEventListener("load",()=>
    {
        /**
         * This function is executed for all the pages on the website
         * as it add nav and footer elements !
         */
        StartMethod();

        console.log("Resources has Loaded")
    })
})();
