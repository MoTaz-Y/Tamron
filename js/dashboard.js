let adminID = JSON.parse(sessionStorage.getItem("adminLogged")) || 0;
window.addEventListener("load", function () {
  function updateUserUI() {
    let htmlContent;
    htmlContent = `
          <li class="dropdown">
            <a href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <p class="user"><i class="fa-solid fa-user"></i></p>
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
              <li><a class="dropdown-item" href="../index.html" id="logout">Logout</a></li>
            </ul>
          </li>`;
    $("#login-register").html(htmlContent);
    $("#logout").on("click", function () {
      // Perform logout logic here (e.g., clearing session storage)
      sessionStorage.removeItem("adminLogged");
      // Redirect to the logout page
      window.location.href = "../index.html";
    });
  }
  updateUserUI();
  if (adminID !== 0) {
    let dashboardBtn = document.querySelectorAll(".dashBoardBtn button");
    let tables = document.querySelectorAll(".table> div");
    tables[0].style.display = "block";
    dashboardBtn[0].classList.add("btnFocus");
    for (let i = 0; i < dashboardBtn.length; i++) {
      dashboardBtn[i].addEventListener("click", function () {
        for (j = 0; j < tables.length; j++) {
          tables[j].style.display = "none";
        }
        for (j = 0; j < dashboardBtn.length; j++) {
          if (dashboardBtn[j].classList.contains("btnFocus")) {
            dashboardBtn[j].classList.remove("btnFocus");
          }
        }
        tables[i].style.display = "block";
        dashboardBtn[i].classList.add("btnFocus");
        localStorage.setItem(
          "activeTable",
          dashboardBtn[i].innerHTML.toLocaleLowerCase()
        );

        // if(i==0){
        // // let newPath=`./${localStorage.getItem('activeTable')}.js`
        // document.getElementById('path').src ='./users.js'
        // }
        // else if(i==1){
        // document.getElementById('path').src ='./seller.js'
        // }
        // else{
        // document.getElementById('path').src ='./products.js'

        // }
      });
    }
    var ctx = document.getElementById("salesChart").getContext("2d");
    var salesChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Sales",
            data: [50, 60, 45, 80, 60, 90, 100, 70, 80, 120, 110, 140],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgb(67, 68, 128)",
            borderWidth: 3,
            tension: 0.1,
            pointBackgroundColor: "rgb(67, 68, 128)",
            pointBorderColor: "#fff",
            pointBorderWidth: 1,
            pointRadius: 3,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 20,
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              color: "#141313",
              font: {
                size: 14,
              },
            },
          },
        },
      },
    });
  }
});

if (adminID == 0) {
  document.getElementsByTagName(
    "body"
  )[0].innerHTML = `<div class="alert alert-danger" role="alert">
  you are not allowed to see this page <a href="../index.html" class="alert-link">Home Page</a>please retutn home
</div>`;
}
