class specialHeader extends HTMLElement {
  connectedCallBack() {
    this.innerHTML = `      <header>
        <h1 class='justify-center-text'>My Schedule</h1>
      </header>`
  }
}

class specialFooter extends HTMLElement {
  connectedCallBack() {
    this.innerHTML = `<footer>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

    <p>&copy;
        <img src="/includes/images/rose_Logo_22.png" alt="Yfkes Logo" style="width: 70px;">

    </p>
</footer>`
  }
}

customElements.define('special-header', specialHeader)
customElements.define('special-footer', specialFooter)
