export default class TimeBox {
  constructor(id) {
    this.timeInput = document.getElementById(id);
    this.millisecond = 0;
    this.second = 0;
    this.minute = 0;
    this.timer = this.timer.bind(this);
    this.timeInput.value = `${timeFormatter(this.minute)} : ${timeFormatter(this.second)} : ${timeFormatter(this.millisecond)}`;
  }

  startTime() {
    this.interval = setInterval(this.timer, 100);
    console.log('start time: ' + this.interval);
  }

  timer() {
    this.millisecond = this.millisecond + 1;
    if (this.millisecond >= 100) {
      this.millisecond = 0;
      this.second++
    } else if (this.second >= 60) {
      this.second = 0;
      this.minute++;
    }
    this.timeInput.value = `${timeFormatter(this.minute)} : ${timeFormatter(this.second)} : ${timeFormatter(this.millisecond)}`;
  }

  stopTime() {
    console.log('stop time: ' + this.interval);
    window.clearInterval(this.interval);
  }
}

const timeFormatter = (time) => {
  if (time / 10 < 1) {
    return `0${time}`
  }
  return time;
};
