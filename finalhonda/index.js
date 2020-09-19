videoOne = document.getElementById('video-one');
videoTwo = document.getElementById('video-two');
seekSlider = document.getElementById('seek-slider');
initialPlayButton = document.getElementById('initial-play-button');
playButton = document.getElementById('play-button');
switchButton = document.getElementById('switch-button');
videoPlayerHolder = document.getElementById('video-player');

class VideoPlayer {
  constructor(){
    this.videoPlaying = false;
    this.videoOneShowing = true
    this.videoOne = videoOne;
    this.videoTwo = videoTwo;
  }
  playVideos(){
    this.videoOne.play()
    this.videoTwo.play()
    playButton.innerHTML = "pause"
    this.videoPlaying = true
  }
  pauseVideos(){
    this.videoOne.pause()
    this.videoTwo.pause()
    playButton.innerHTML = "play"
    this.videoPlaying = false
  }
  stopVideos(){
    this.videoOne.currentTime = 0
    this.videoTwo.currentTime = 0
    this.pauseVideos()
  }
  togglePlayPause(){
    this.videoPlaying ? this.pauseVideos() : this.playVideos()
  }
  switchToVideoTwo(){
    this.videoOne.style.opacity = 0;
    this.videoTwo.style.opacity = 1;
    this.videoOne.muted = true;
    this.videoTwo.muted = false;
    this.videoOneShowing = false
    this.syncVideos()
    switchButton.innerHTML = "Switch Back"
  }
  switchToVideoOne(){
    this.videoOne.style.opacity = 1
    this.videoOne.muted = false;
    this.videoTwo.muted = true;
    this.videoTwo.style.opacity = 0
    this.videoOneShowing = true
    switchButton.innerHTML = "Switch"
  }

  toggleSwitchVideos(){
    this.videoOneShowing ? this.switchToVideoTwo() : this.switchToVideoOne()
  }

  initializeSeekSlider(){
    videoTwo.addEventListener('timeupdate', () => {
      seekSlider.value = videoTwo.currentTime / videoTwo.duration * seekSlider.max
    })
    seekSlider.addEventListener('change', () => {
      videoTwo.currentTime = videoTwo.duration * seekSlider.value / seekSlider.max
      this.syncVideos()
    })
  }
  syncVideos(){
    this.videoOne.currentTime = this.videoTwo.currentTime
  }
}

initializeEventListeners = () => {
  document.addEventListener("keydown", function(event){
    if(event.key == "q" || event.code == "Space"){
      videoPlayer.switchToVideoTwo()
    }
  })
  document.addEventListener("keyup", function(event){
    if(event.key == "q" || event.code == "Space"){
      event.preventDefault();
      videoPlayer.switchToVideoOne()
    }
  })
}

initializePlayer = () => {
  makeVideoInvisible()
  videoPlayer = new VideoPlayer;
  videoPlayer.initializeSeekSlider();
  initializeEventListeners();

}

makeVideoInvisible = () => {
  videoPlayerHolder.setAttribute('style', 'opacity: 0; pointer-events: none;')
}
makeVideoVisible = () => {
  videoPlayerHolder.setAttribute('style', 'opacity: 1; pointer-events: all;')
  initialPlayButton.remove()
  clearInterval(checkForPlayInterval)

}

initialPlayButtonPlay = () => {
  initialPlayButton.innerHTML = "Loading ..."
  videoPlayer.playVideos()
  checkForPlayInterval = setInterval(() => {
    if(videoPlayer.videoOne.currentTime > 0.1 && videoPlayer.videoTwo.currentTime > 0.1){
      videoPlayer.stopVideos()
      makeVideoVisible()
    }
  }, 1);

}


window.onload = initializePlayer()
