function getStatus(element) {
    switch (element) {
        case "one":
            let status = document.getElementById("statusOne");
            let statusValue = status.options[status.selectedIndex].value;
            switch (statusValue) {
                case "activate":
                    document.getElementById(
                        "one"
                    ).innerHTML = `<span style="color:green;font-weight:bold">Activated</span>`;
                    break;
                case "deactivate":
                    document.getElementById(
                        "one"
                    ).innerHTML = `<span style="color:red;font-weight:bold;">Deacivated</span>`;
                    break;

            }

        case "two":
            {
                let status = document.getElementById("statusTwo");
                let statusValue = status.options[status.selectedIndex].value;
                switch (statusValue) {
                    case "activate":
                        document.getElementById(
                            "two"
                        ).innerHTML = `<span style="color:green;font-weight:bold">Activated</span>`;
                        break;
                    case "deactivate":
                        document.getElementById(
                            "two"
                        ).innerHTML = `<span style="color:red;font-weight:bold;">Deacivated</span>`;
                        break;

                }
            }
        case "three":
            {
                let status = document.getElementById("statusThree");
                let statusValue = status.options[status.selectedIndex].value;
                switch (statusValue) {
                    case "activate":
                        document.getElementById(
                            "three"
                        ).innerHTML = `<span style="color:green;font-weight:bold">Activated</span>`;
                        break;
                    case "deactivate":
                        document.getElementById(
                            "three"
                        ).innerHTML = `<span style="color:red;font-weight:bold;">Deacivated</span>`;
                        break;

                }
            }
        case "four":
            {
                let status = document.getElementById("statusFour");
                let statusValue = status.options[status.selectedIndex].value;
                switch (statusValue) {
                    case "activate":
                        document.getElementById(
                            "four"
                        ).innerHTML = `<span style="color:green;font-weight:bold">Activated</span>`;
                        break;
                    case "deactivate":
                        document.getElementById(
                            "four"
                        ).innerHTML = `<span style="color:red;font-weight:bold;">Deacivated</span>`;
                        break;

                }
            }
        case "five":
            {
                let status = document.getElementById("statusFive");
                let statusValue = status.options[status.selectedIndex].value;
                switch (statusValue) {
                    case "activate":
                        document.getElementById(
                            "five"
                        ).innerHTML = `<span style="color:green;font-weight:bold">Activated</span>`;
                        break;
                    case "deactivate":
                        document.getElementById(
                            "five"
                        ).innerHTML = `<span style="color:red;font-weight:bold;">Deacivated</span>`;
                        break;

                }
            }
        case "six":
            {
                let status = document.getElementById("statusSix");
                let statusValue = status.options[status.selectedIndex].value;
                switch (statusValue) {
                    case "activate":
                        document.getElementById(
                            "six"
                        ).innerHTML = `<span style="color:green;font-weight:bold">Activated</span>`;
                        break;
                    case "deactivate":
                        document.getElementById(
                            "six"
                        ).innerHTML = `<span style="color:red;font-weight:bold;">Deacivated</span>`;
                        break;

                }
            }
        case "seven":
            {
                let status = document.getElementById("statusSeven");
                let statusValue = status.options[status.selectedIndex].value;
                switch (statusValue) {
                    case "activate":
                        document.getElementById(
                            "seven"
                        ).innerHTML = `<span style="color:green;font-weight:bold">Activated</span>`;
                        break;
                    case "deactivate":
                        document.getElementById(
                            "seven"
                        ).innerHTML = `<span style="color:red;font-weight:bold;">Deacivated</span>`;
                        break;

                }
            }
        case "eight":
            {
                let status = document.getElementById("statusEight");
                let statusValue = status.options[status.selectedIndex].value;
                switch (statusValue) {
                    case "activate":
                        document.getElementById(
                            "eight"
                        ).innerHTML = `<span style="color:green;font-weight:bold">Activated</span>`;
                        break;
                    case "deactivate":
                        document.getElementById(
                            "eight"
                        ).innerHTML = `<span style="color:red;font-weight:bold;">Deacivated</span>`;
                        break;

                }
            }

    }

}

//modal
const modal = document.querySelector('.modal');
const modalBtn = document.querySelector('.modalBtn');
const closeBtn = document.querySelector('.closeBtn');

function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

function eventListener() {
    modalBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
}

eventListener();


//modal2
// const modal2 = document.getElementById('modal2');
// const modalBtn2 = document.getElementById('modalBtn2');
// const closeBtn2 = document.querySelector('.closeBtn2');

// function openModal2() {
//   modal2.style.display = 'block';
// }

// function closeModal2() {
//   modal2.style.display = 'none';
// }
// function eventListener2() {
//   modalBtn2.addEventListener('click', openModal2);
//   closeBtn2.addEventListener('click', closeModal2);
// }

// eventListener2();