function shuffle() {
  let eggs = [
    {
      title: 'PHP 200',
      prize: '200'
    },
    {
      title: 'PHP 200',
      prize: '200'
    },
    {
      title: 'PHP 200',
      prize: '200'
    },
    {
      title: 'PHP 200',
      prize: '200'
    },
    {
      title: 'PHP 200',
      prize: '200'
    },
    {
      title: 'PHP 200',
      prize: '200'
    },
    {
      title: 'PHP 200',
      prize: '200'
    },
    {
      title: 'PHP 200',
      prize: '200'
    },
    {
      title: 'PHP 300',
      prize: '300'
    },
    {
      title: 'PHP 300',
      prize: '300'
    },
    {
      title: 'PHP 300',
      prize: '300'
    },
    {
      title: 'PHP 300',
      prize: '300'
    },
    {
      title: 'PHP 300',
      prize: '300'
    },
    {
      title: 'PHP 300',
      prize: '300'
    },
    {
      title: 'PHP 300',
      prize: '300'
    },
    {
      title: 'PHP 300',
      prize: '300'
    },
    {
      title: 'PHP 500',
      prize: '500'
    },
    {
      title: 'PHP 500',
      prize: '500'
    },
    {
      title: 'PHP 500',
      prize: '500'
    },
    {
      title: 'PHP 500',
      prize: '500'
    },
    {
      title: 'PHP 500',
      prize: '500'
    },
    {
      title: 'PHP 500',
      prize: '500'
    },
    {
      title: 'PHP 500',
      prize: '500'
    },
    {
      title: 'PHP 500',
      prize: '500'
    },
    {
      title: 'PHP 500',
      prize: '500'
    },
    {
      title: 'PHP 500',
      prize: '500'
    },
    {
      title: 'PHP 500 Shopee Voucher',
      prize: 'shopee-voucher'
    },
    {
      title: 'PHP 500 Shopee Voucher',
      prize: 'shopee-voucher'
    },
    {
      title: 'PHP 500 Shopee Voucher',
      prize: 'shopee-voucher'
    },
    {
      title: 'PHP 500 Shopee Voucher',
      prize: 'shopee-voucher'
    },
    {
      title: 'PHP 500 Lazada Voucher',
      prize: 'lazada-voucher'
    },
    {
      title: 'PHP 500 Lazada Voucher',
      prize: 'lazada-voucher'
    },
    {
      title: 'PHP 500 Lazada Voucher',
      prize: 'lazada-voucher'
    },
    {
      title: 'PHP 500 Lazada Voucher',
      prize: 'lazada-voucher'
    },
    {
      title: 'Shopee Item',
      prize: 'shopee-item-1'
    },
    {
      title: 'Shopee Item',
      prize: 'shopee-item-1'
    },
    {
      title: 'Shopee Item',
      prize: 'shopee-item-2'
    },
    {
      title: 'Shopee Item',
      prize: 'shopee-item-2'
    },
    {
      title: 'Shopee Item',
      prize: 'shopee-item-3'
    },
    {
      title: 'Shopee Item',
      prize: 'shopee-item-3'
    },
    {
      title: 'Bokya!',
      prize: 'bokya'
    },
    {
      title: 'Bokya!',
      prize: 'bokya'
    },
    {
      title: 'Try again!',
      prize: 'try-again'
    },
    {
      title: 'Try again!',
      prize: 'try-again'
    },
    {
      title: 'Nothing in here!',
      prize: 'nothing'
    },
    {
      title: 'Nothing in here!',
      prize: 'nothing'
    },
    {
      title: 'Gotcha!',
      prize: 'gotcha'
    },
    {
      title: 'Gotcha!',
      prize: 'gotcha'
    },
    {
      title: 'We are sorry!',
      prize: 'sorry'
    },
    {
      title: 'We are sorry!',
      prize: 'sorry'
    },
  ]

  return eggs.sort(() => Math.random() - 0.5);
}

function setEggs(shuffledEggs) {
  shuffledEggs.forEach((egg, index) => {
    document.getElementById('memory-game').insertAdjacentHTML(
      'beforeend',
      `<div class="memory-card" data-prize="${egg.prize}">
          <h3 class="front-face" style="text-align: center;">${egg.title}</h3> 
          <div class="back-face" style="text-align:center">
              <img src="img/egg-1.png" alt="Memory Card" style="width: 100%;">
              <h1>${index + 1}</h1>
          </div>
      </div>`
    );
  })
}

async function initializeEggs() {
  let shuffledEggs = await shuffle();
  await setEggs(shuffledEggs);

  const cards = document.querySelectorAll('.memory-card');

  await setTimeout(() => {
    cards.forEach((card) => {
      card.classList.add('flip')
    })
  }, 3000);

  await setTimeout(() => {
    cards.forEach((card) => {
      card.classList.remove('flip')
    })
  }, 4500);

  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;

  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }
  
    secondCard = this;
    
    checkForMatch();
  }

  function checkForMatch() {
    let isMatch = firstCard.dataset.prize === secondCard.dataset.prize;
    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;
    
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');

      resetBoard();
    }, 1500);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  cards.forEach(card => card.addEventListener('click', flipCard));
}
