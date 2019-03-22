

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