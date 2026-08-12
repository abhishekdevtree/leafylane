
document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("click", () => {
        document.querySelectorAll(".faq-item").forEach(el => {
            if (el !== item) el.classList.remove("active");
        });
        item.classList.toggle("active");
    });
});




document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("myVideo");
  const playBtn = document.getElementById("playBtn");
  function toggleVideo() {
    if (video.paused) {
      video.play();
      playBtn.style.display = "none";
    } else {
      video.pause();
      playBtn.style.display = "flex";
    }
  }
  if(playBtn) {
    playBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleVideo();
    });
  }
  
  if(video) {
    video.addEventListener("click", toggleVideo);
    video.addEventListener("ended", () => {
      playBtn.style.display = "flex";
    });
  }
  
});
