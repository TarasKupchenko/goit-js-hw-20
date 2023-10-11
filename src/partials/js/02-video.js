import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const vimeoPlayer = new Player(document.getElementById('vimeo-player'), {
});

const localStorageKey = 'videoplayer-current-time';

vimeoPlayer.on('timeupdate', throttle(async (data) => {
  const currentTime = data.seconds;
  localStorage.setItem(localStorageKey, currentTime.toString());
}, 1000)); 
const savedTime = localStorage.getItem(localStorageKey);

if (savedTime) {
  vimeoPlayer.setCurrentTime(parseFloat(savedTime));
}

