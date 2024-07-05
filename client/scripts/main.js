"use strict";
(function () {
    function TeamNecessity() {
        let teamMemberInfo = [
            ["Captain Chucklehead", "Ability to turn any serious situation into a hilarious comedy routine.", "The Giggle Grenade – releases a burst of contagious laughter that echoes through the community."],
            ["Guffaw Gadgeteer", "Creates wacky inventions that induce uncontrollable laughter.", "The Snicker Snatcher – a device that steals frowns and replaces them with smiles."],
            ["Punmaster Flex", "Unleashes puns so groan-worthy that enemies are too busy facepalming to fight.", "The Pun-isher – a rapid-fire pun attack that leaves everyone in stitches."],
            ["Chuckling Chemist", "Mixes concoctions that produce hilariously unexpected side effects.", "The Belly Bubbler – a potion that makes everyone burst into spontaneous laughter."],
            ["Tickle Tactician", "Masters the art of strategic tickling to distract and disarm opponents.", "The Tickle Tango – a synchronized tickling routine that confuses adversaries."]
        ];
        let teamMemberPic = ["team_1", "team_2", "team_3", "team_4", "team_5", "team_6"];
        let mainContainer = $("#teamContainer");
        let infoModal = new bootstrap.Modal(document.getElementById("moreInfo"), {
            backdrop: 'static',
            keyboard: true
        });
        for (let i = 0; i < teamMemberInfo.length; i++) {
            let divContainer = document.createElement("div");
            divContainer.setAttribute("class", "col-md-5 mb-5");
            divContainer.setAttribute("style", "width:380px");
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
            mainContainer.append(divContainer);
            $(`#button_${i}`).on("click", function () {
                console.log("displaying the signature tactics");
                $("#signBody").html(`<b><i>Singnature Tactic:</i> <br> ${teamMemberInfo[i][2]}`);
                infoModal.show();
            });
        }
    }
    function LoadEvents() {
        let events;
        let extraEvents;
        let counter = 0;
        const MAX_EVENT_PER_ROW = 3;
        $.get("./data/events.json", function (data) {
            events = data.events;
            extraEvents = data.extraEvents;
            EventCardGenerator(events);
        });
        $("#loadEvents").on("click", () => {
            EventCardGenerator(extraEvents);
            $("#loadEvents").hide();
        });
        function EventCardGenerator(arrayOfEvents) {
            for (let i = 0; i < arrayOfEvents.length; i++) {
                if (counter === 0) {
                    $("table>tbody").append(`<tr>`);
                }
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
                $("table>tbody").append(eventCard);
                counter++;
                if (counter === MAX_EVENT_PER_ROW) {
                    $("table>tbody").append(`</tr>`);
                    counter = 0;
                }
            }
        }
    }
    function SearchBar() {
        console.log("Search Bar Working");
        let inputElement = $("#searchText");
        function Hide() {
            $("#results-box").hide();
        }
        function Show() {
            $("#results-box").show();
        }
        inputElement.on("mouseover", function () {
            Show();
        });
        inputElement.on("mouseleave", function () {
            Hide();
        });
        $("#results-box").on("mouseover", function () {
            Show();
        });
        $("#results-box>li").on("mouseover", function () {
            Show();
        });
        $("#results-box").on("mouseleave", function () {
            Hide();
        });
        inputElement.on("keyup", function () {
            console.log("Someone Started Typing, You better work fine.");
            $.get("./data/keywords.json", function (data) {
                let userInput = $("#searchText").val();
                let matching = data.keywords;
                let resultsArray = matching.filter((resultItem) => resultItem.keyword.toLowerCase().includes(userInput.toLowerCase()));
                console.log(resultsArray);
                ShowResult(resultsArray);
            });
            function ShowResult(arrayOfResults) {
                let resultContainer = $("#results-box");
                resultContainer.html("");
                if (arrayOfResults.length <= 0) {
                    resultContainer.html("No Search Found");
                    return;
                }
                arrayOfResults.forEach(result => {
                    resultContainer.append(`<li><a class = "searchItems" 
                                            href = "${result.Url}">${result.keyword}</a></li>`);
                });
            }
        });
    }
    function RegisterFormValidation() {
        console.log("Validation in Progress.");
        ValidateField("#firstName_register", /^[a-zA-Z]{2,30}$/, "Please enter valid first name");
        ValidateField("#lastName_register", /^[a-zA-Z]{2,30}$/, "Please enter valid last name");
        ValidateField("#email_register", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/, "Please enter valid email Address");
        ValidateField("#phone_register", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/, "Enter a valid Contact Number");
        ValidateField("#address_register", /^[0-9]+(\s[A-Za-z]+\.?(\s[A-Za-z]+\.?)?)?\s[A-Za-z]+(\s[A-Za-z]+)?(\s[0-9A-Za-z]+)?$/, "Please enter valid physical address");
    }
    function EditFormValidation() {
        console.log("Validation in Progress.");
        ValidateField("#firstName_update", /^[a-zA-Z]{2,30}$/, "Please enter valid first name");
        ValidateField("#lastName_update", /^[a-zA-Z]{2,30}$/, "Please enter valid last name");
        ValidateField("#email_update", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/, "Please enter valid email Address");
        ValidateField("#phone_update", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/, "Enter a valid Contact Number");
        ValidateField("#address_update", /^[0-9]+(\s[A-Za-z]+\.?(\s[A-Za-z]+\.?)?)?\s[A-Za-z]+(\s[A-Za-z]+)?(\s[0-9A-Za-z]+)?$/, "Please enter valid physical address");
    }
    function ContactFormValidation() {
        console.log("Validation in Progress.");
        ValidateField("#firstName", /^[a-zA-Z]{2,30}$/, "Please enter valid first name");
        ValidateField("#lastName", /^[a-zA-Z]{2,30}$/, "Please enter valid last name");
        ValidateField("#email", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/, "Please enter valid email Address");
        ValidateField("#phone", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/, "Enter a valid Contact Number");
        ValidateField("#address", /^[0-9]+(\s[A-Za-z]+\.?(\s[A-Za-z]+\.?)?)?\s[A-Za-z]+(\s[A-Za-z]+)?(\s[0-9A-Za-z]+)?$/, "Please enter valid physical address");
    }
    function GalleryPage() {
        let divRow = $("#rowDiv");
        $.get("./data/events_picture.json", function (data) {
            let eventsPic = data.events;
            for (const pic of eventsPic) {
                let newDiv = $("<div>");
                newDiv.addClass("col");
                newDiv.html(`<a class="gallery-item" href="${pic.imageSrc}">
                                        <img src="${pic.imageSrc}" class="img-fluid" alt="${pic.altText}">
                                   </a>`);
                divRow.append(newDiv);
            }
        });
    }
    function RegisterForm() {
        RegisterFormValidation();
        let newRegister = new bootstrap.Modal(document.getElementById("registerModal"), {
            backdrop: 'static',
            keyboard: true
        });
        newRegister.show();
    }
    function EditForm() {
        EditFormValidation();
        let newRegister = new bootstrap.Modal(document.getElementById("registerModal"), {
            backdrop: 'static',
            keyboard: true
        });
        newRegister.show();
    }
    function ValidateField(input_field_id, regular_expression, error_message) {
        let messageArea = $("#messageArea").hide();
        $(input_field_id).on("blur", function () {
            let inputFieldText = $(this).val();
            if (!regular_expression.test(inputFieldText)) {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message);
                messageArea.show();
            }
            else {
                messageArea.removeAttr("class").hide();
            }
        });
    }
    function LoginFormValidation() {
        ValidateField("#loginEmail", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid email address");
    }
    function displayLoginForm() {
        LoginFormValidation();
    }
    async function initMap() {
        let map;
        const position = { lat: 43.94373576253126, lng: -78.89703131534256 };
        const { Map } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
        map = new Map(document.getElementById("map"), {
            zoom: 15,
            center: position,
            mapId: "harmony_hub",
        });
        const marker = new AdvancedMarkerElement({
            map: map,
            position: position,
            title: "Harmony Hub",
        });
    }
    async function ShowStats() {
        let chart;
        const currentUrl = window.location.href;
        const url = new URL(currentUrl);
        let parameterValue;
        if (url.searchParams.get("yearIndex") === null) {
            parameterValue = 0;
        }
        else {
            parameterValue = parseInt(url.searchParams.get("yearIndex"));
        }
        let data;
        data = await getWebStats();
        let charContainer = document.querySelector('#visitorStats');
        chart = new Chart(charContainer, {
            type: 'line',
            data: {
                labels: data.months,
                datasets: [
                    {
                        label: `Harmony Hub\'s visitor statistics for ${data.years[parameterValue].year}`,
                        data: data.years[parameterValue].visitors,
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        fill: false,
                        borderWidth: 1
                    }
                ]
            },
            options: {
                animation: {
                    duration: 1000,
                    easing: 'linear',
                }
            }
        });
        async function getWebStats() {
            return new Promise((resolve, reject) => {
                $.get("./data/userStatistics.json", function (data) {
                    resolve(data);
                });
            });
        }
    }
    function DisplayPlanningPage() {
        console.log("Planning Page");
        $(".eventDetailButtons").on("click", function () {
            let eventInfoModal = new bootstrap.Modal(document.getElementById(`modal_${$(this).attr('id')}`), {});
            eventInfoModal.show();
        });
        let newEventModal = new bootstrap.Modal(document.getElementById("newEventModal"), {});
        newEventModal.show();
    }
    function AddFooters() {
        let body = document.body;
        let footerContainer = document.createElement("div");
        footerContainer.setAttribute("Class", "container");
        let footerElements = ["Policy", "Terms of Service", "Contact"];
        let footerElementsPages = ["privacy", "terms", "contact"];
        let readyFooterElements = "";
        for (let i = 0; i < footerElements.length; i++) {
            readyFooterElements += `<li class="nav-item"><a href="/${footerElementsPages[i]}" class="nav-link px-2 text-muted">${footerElements[i]}</a></li>`;
        }
        footerContainer.innerHTML = `
                  <footer class="py-3 my-4">
                    <ul class="nav justify-content-center border-bottom pb-3 mb-3">
                    ${readyFooterElements}                   
                    </ul>
                    <p class="text-center text-muted">&copy; 2024 Harmony Hub, CA</p>
                  </footer>`;
        body.appendChild(footerContainer);
    }
    function DisplayContactPage() {
        ContactFormValidation();
        let thanksModal = new bootstrap.Modal(document.getElementById('contactModal'), {
            backdrop: 'static',
            keyboard: false
        });
        thanksModal.show();
    }
    function PortfolioPage() {
        function newPortfolio() {
            let projectTitles = [
                "Fitness BootCamp",
                "Community CookBook Project",
                "Teach for Seniors Program"
            ];
            let projectDescriptions = [
                "Regular art and craft sessions for individuals of all ages. Activities include painting, pottery, and DIY crafts to foster creativity and provide a platform for artistic expression.",
                "Collaborative creation of a community cookbook featuring recipes contributed by residents. The project promotes cultural exchange through food and fosters a sense of community.",
                "Workshops and training sessions tailored for senior citizens to enhance their technological skills. Topics include using smartphones, social media, and online communication tools."
            ];
            let imageLocations = ["center_3.jpg", "center_5.jpg", "center_1.jpg"];
            let projectTable = $("#projectTable");
            projectTable.append('<tr id = "onClickLoad" >');
            for (let i = 0; i < projectTitles.length; i++) {
                let newRow = $("#onClickLoad");
                newRow.append(`<td id='${i}'>`);
                let newCell = $(`td#${i}`);
                let newDiv = document.createElement("div");
                newDiv.setAttribute("class", "card w-75 m-5");
                newDiv.innerHTML =
                    `<img src="/assests/images/${imageLocations[i]}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${projectTitles[i]}</h5>
                        <p class="card-text">${projectDescriptions[i]}</p>
                        <a href="#" class="btn btn-primary">Get More Details</a>
                    </div>`;
                newCell.append(newDiv);
            }
        }
        $("#loadPortfolio").on("click", function () {
            newPortfolio();
        });
    }
    function pageIdentifier() {
        SearchBar();
        let page_id = $("body")[0].getAttribute("id");
        switch (page_id) {
            case "home":
                initMap();
                break;
            case "blogs":
                console.log("Blogs Page is Active");
                break;
            case "contact":
                DisplayContactPage();
                break;
            case "events":
                LoadEvents();
                break;
            case "gallery":
                GalleryPage();
                break;
            case "login":
                displayLoginForm();
                break;
            case "portfolio":
                PortfolioPage();
                break;
            case "privacy":
                console.log("Privacy Page is Active");
                break;
            case "register":
                RegisterForm();
                break;
            case "services":
                console.log("Services Page is Active");
                break;
            case "team":
                TeamNecessity();
                break;
            case "terms":
                console.log("Terms and Conditions Page is Active");
                break;
            case "statistics":
                ShowStats();
                break;
            case "planning":
                DisplayPlanningPage();
                break;
            case "edit":
                EditForm();
                break;
            default:
                console.error("ERROR: callback does not exist" + router.ActiveLink);
                return new Function();
        }
    }
    function StartMethod() {
        AddFooters();
        pageIdentifier();
    }
    window.addEventListener("load", () => {
        StartMethod();
        console.log("Resources has Loaded");
    });
})();
//# sourceMappingURL=main.js.map