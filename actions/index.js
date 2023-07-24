let content; // Khai báo biến content bên ngoài cùng để sử dụng nhiều nơi
let totalVideoWatched = {}; //Tổng video đã xem --
let totalWatchTime = {}; //Tông thời gian xem video
let totalComment = {}; // tổng số comment --
let totalLike = {}; // -----------------------
let totalShare = {}; //
let totalFollower = "";
let totalFollwing = "";
let username = "";
// Khai báo chỉ số của trang
indexPage = 0;
// Element
let choosefile = document.getElementById("choose-file");
let buttonnext = document.getElementById("button-next");
let buttonnext1 = document.getElementById("button-next1");
let datashowblock1 = document.getElementById("showdata-block1");
let datashowblock = document.getElementById("showdata-block");
let jsonObject;
// Xử lý chọn input
document.getElementById("apply").addEventListener("change", function (event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      content = e.target.result; // Gán giá trị nội dung vào biến content
      jsonObject = JSON.parse(content);
      //   username
      username = jsonObject.Profile["Profile Information"]["userName"];
      //   Tổng số video xem
      totalVideoWatched =
        jsonObject.Activity["Video Browsing History"]["VideoList"].length;
      // số người đang fl mình
      totalFollower = jsonObject.Activity["Follower List"]["FansList"].length;
      // số người mình đang fl
      totalFollwing = jsonObject.Activity["Following List"]["Following"].length;
      //   Tổng like
      totalLike = jsonObject.Activity["Like List"]["ItemFavoriteList"].length;
      //   Tổng Chia sẻ
      totalShare =
        jsonObject.Activity["Share History"]["ShareHistoryList"].length;
      // Tổng cmt
      totalComment = jsonObject.Comment["Comments"]["CommentsList"].length;
      console.log(jsonObject);
      // =====================================
    };
    choosefile.style.display = "none";
    showdata.style.display = "flex";
    // Xử lý khi nhấn nút đi thôi nào
    buttonnext1.addEventListener("click", () => {
      datashowblock1.style.display = "none";
      datashowblock.style.display = "flex";
      document.getElementById("username").innerHTML =
        "Xin chào, " +
        username +
        '! <img src="./resources/images/hello.png" alt="" class="showdata-pic" />';
      switch (indexPage) {
        case 0:
          changeData(
            "Đến ngày hôm nay bạn đã xem,",
            totalVideoWatched,
            "videos",
            "Xem gì thấy ghê dị?"
          );
          break;
      }
      console.log(indexPage);
    });
    // Xử lý khi nhấn nút tiếp nào
    buttonnext.addEventListener("click", () => {
      if (indexPage < 6) {
        if (indexPage == 0) {
          showdata.classList.remove("rtl");
          void showdata.offsetWidth; // Trigger reflow (tạo repaint và reflow)
          showdata.classList.add("ltr");
        }
        if (indexPage == 1) {
          showdata.classList.remove("ltr");
          void showdata.offsetWidth; // Trigger reflow (tạo repaint và reflow)
          showdata.classList.add("rtl");
        }
        if (indexPage == 2) {
          showdata.classList.remove("rtl");
          void showdata.offsetWidth; // Trigger reflow (tạo repaint và reflow)
          showdata.classList.add("ltr");
        }
        if (indexPage == 3) {
          showdata.classList.remove("ltr");
          void showdata.offsetWidth; // Trigger reflow (tạo repaint và reflow)
          showdata.classList.add("rtl");
        }
        if (indexPage == 4) {
          showdata.classList.remove("rtl");
          void showdata.offsetWidth; // Trigger reflow (tạo repaint và reflow)
          showdata.classList.add("ltr");
        }
        if (indexPage == 5) {
          showdata.classList.remove("ltr");
          void showdata.offsetWidth; // Trigger reflow (tạo repaint và reflow)
          showdata.classList.add("rtl");
        }
      }
      indexPage++;
      console.log(indexPage);
      switch (indexPage) {
        case 0:
          changeData(
            "Đến ngày hôm nay bạn đã xem được,",
            totalVideoWatched,
            "videos",
            "Xem gì thấy ghê dị?"
          );
          break;

        case 1:
          changeData(
            "Tổng số lần bạn thích video trên Tiktok theo dữ liệu là,",
            totalLike,
            "liked",
            "Like gì like dữ thần dị hong biết!"
          );
          break;
        case 2:
          changeData(
            "Số lần bạn chia sẻ video trên Tiktok là,",
            totalShare,
            "shared",
            "Quá là share!"
          );
          break;
        case 3:
          changeData(
            "Số người theo dõi bạn trên Tiktok là,",
            totalFollower,
            "follower",
            "Nổi tiếng dữ!"
          );
          break;
        case 4:
          changeData(
            "Số người bạn đang theo dõi trên Tiktok là,",
            totalFollwing,
            "following",
            "Oh my god!"
          );
          break;
        case 5:
          const weekdaysCount = {};
          jsonObject.Activity["Video Browsing History"]["VideoList"].forEach(
            (item) => {
              const date = new Date(item.Date);
              const weekday = date.getDay();
              weekdaysCount[weekday] = (weekdaysCount[weekday] || 0) + 1;
            }
          );

          let mostFrequentWeekday = 0;
          let maxCount = 0;

          for (const weekday in weekdaysCount) {
            if (weekdaysCount[weekday] > maxCount) {
              maxCount = weekdaysCount[weekday];
              mostFrequentWeekday = weekday;
            }
          }

          const daysOfWeek = [
            "Chủ nhật",
            "Thứ 2",
            "Thứ 3",
            "Thứ 4",
            "Thứ 5",
            "Thứ 6",
            "Thứ 7",
          ];
          changeData(
            "Trong tuần bạn xem video trên Tiktok nhiều nhất là vào,",
            daysOfWeek[mostFrequentWeekday],
            "hầng tuần",
            "Quá là xem luôn!"
          );
          break;
        case 6:
          changeData(
            "Dữ liệu của bạn",
            "Đã Hết Rồi!",
            "",
            "Cảm ơn bạn đã sử dụng!"
          );
          buttonnext.style.display = "none";
      }
    });

    reader.readAsText(file);
  }
});
// Hàm thay đổi data
function changeData(header, data, des, cmt) {
  document.getElementById("data").innerHTML = data.toLocaleString("en-US");
  document.getElementById("des").innerHTML = des;
  document.getElementById("header").innerHTML = header;
  document.getElementById("cmt").innerHTML = cmt;
}
// Chuyển đổi ngày giờ
function formatDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);
  const hours = dateTime.getHours().toString().padStart(2, "0");
  const minutes = dateTime.getMinutes().toString().padStart(2, "0");
  const seconds = dateTime.getSeconds().toString().padStart(2, "0");
  const day = dateTime.getDate();
  const month = dateTime.getMonth() + 1;
  const year = dateTime.getFullYear();

  return `${hours}:${minutes}:${seconds} ngày ${day}/${month}/${year}`;
}
document.getElementById("start").addEventListener("click", () => {
  document.getElementById("home").style.display = "none";
  document.getElementById("choose-file").style.display = "flex";
});
