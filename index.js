class Countdown {
  constructor(inputDate, inputTime, display) {
    this.inputDate = inputDate;
    this.inputTime = inputTime;
    this.display = display;
    this.interval;
  };

  getValuesInput() {
    const valueDate = this.inputDate.value
    const valueTime = this.inputTime.value

    if (!valueDate) return this.renderTime(true);

    this.calculateDate(`${valueDate} ${valueTime}`);
  };

  calculateDate(dateFuture) {
    clearInterval(this.interval);
    const futureDate = new Date(dateFuture);

    this.interval = setInterval(() => {

      const differenceInMilisecunds =
        (futureDate.getTime() > new Date().getTime()) ?
          futureDate.getTime() - new Date().getTime() :
          new Date().getTime() - futureDate.getTime();

      const years =
        Math.floor(differenceInMilisecunds / (1000 * 60 * 60 * 24 * 30 * 12));
      const month =
        Math.floor(differenceInMilisecunds % (1000 * 60 * 60 * 24 * 30 * 12) / (1000 * 60 * 60 * 24 * 30));
      const days = 
        Math.floor(differenceInMilisecunds % (1000 * 60 * 60 * 24 * 30) / (1000 * 60 * 60 * 24 ));
      const hours =
        Math.floor(differenceInMilisecunds % (1000 * 60 * 60 * 24 ) / (1000 * 60 * 60));
      const minutes =
        Math.floor(differenceInMilisecunds % (1000 * 60 * 60 ) / (1000 * 60));
      const seconds =
        Math.floor(differenceInMilisecunds % (1000 * 60) / (1000));

      this.renderTime(
        null,
        years,
        month,
        days,
        hours,
        minutes,
        seconds
      );
    }, 1000);
  };

  renderTime(
    error,
    years,
    month,
    days,
    hours,
    minutes, 
    seconds
  ) {

    if (error) {
      clearInterval(this.interval);

      return this.display.innerHTML = 
        '<p class="result_error_display"> Choose a Date before submitting ! </p>';
    };

    years = ('00' + years).slice(-2);
    month = ('00' + month).slice(-2);
    days = ('00' + days).slice(-2);
    hours = ('00' + hours).slice(-2);
    minutes = ('00' + minutes).slice(-2);
    seconds = ('00' + seconds).slice(-2);

    if (years > 0) {
      this.display.innerHTML = `
        <p class="result_display"> ${years} <spam> y </spam> </p>
        <p class="result_display"> ${month} <spam> m </spam> </p>
        <p class="result_display"> ${days} <spam> d </spam> </p>
        <p class="result_display"> ${hours} <spam> h </spam> </p>
        <p class="result_display"> ${minutes} <spam> m </spam> </p>
        <p class="result_display"> ${seconds}  <spam> s </spam> </p>
      `;
    } else if (month > 0) {
      this.display.innerHTML = `
        <p class="result_display"> ${month} <spam> m </spam> </p>
        <p class="result_display"> ${days} <spam> d </spam> </p>
        <p class="result_display"> ${hours} <spam> h </spam> </p>
        <p class="result_display"> ${minutes} <spam> m </spam> </p>
        <p class="result_display"> ${seconds}  <spam> s </spam> </p>
      `;
    } else {
      this.display.innerHTML = `
        <p class="result_display"> ${days} <spam> d </spam> </p>
        <p class="result_display"> ${hours} <spam> h </spam> </p>
        <p class="result_display"> ${minutes} <spam> m </spam> </p>
        <p class="result_display"> ${seconds}  <spam> s </spam> </p>
      `;
    };
  };
};
