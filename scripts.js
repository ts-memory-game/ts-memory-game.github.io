function shuffle() {
  let eggs = [
    {
      title: 'PHP 100',
      prize: '100'
    },
    {
      title: 'PHP 100',
      prize: '100'
    },
    {
      title: 'PHP 100',
      prize: '100'
    },
    {
      title: 'PHP 100',
      prize: '100'
    },
    {
      title: 'PHP 100',
      prize: '100'
    },
    {
      title: 'PHP 100',
      prize: '100'
    },
    {
      title: 'PHP 100',
      prize: '100'
    },
    {
      title: 'PHP 100',
      prize: '100'
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
      title: 'PHP 250',
      prize: '250'
    },
    {
      title: 'PHP 250',
      prize: '250'
    },
    {
      title: 'PHP 250',
      prize: '250'
    },
    {
      title: 'PHP 250',
      prize: '250'
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
      title: 'PHP 300 Shopee Voucher',
      prize: 'voucher'
    },
    {
      title: 'PHP 300 Shopee Voucher',
      prize: 'voucher'
    },
    {
      title: 'PHP 300 Shopee Voucher',
      prize: 'voucher'
    },
    {
      title: 'PHP 300 Shopee Voucher',
      prize: 'voucher'
    },
    {
      title: 'Egg Mug',
      prize: 'egg-mug'
    },
    {
      title: 'Egg Mug',
      prize: 'egg-mug'
    },
    {
      title: 'LED Clock',
      prize: 'clock'
    },
    {
      title: 'LED Clock',
      prize: 'clock'
    },
    {
      title: 'Ear- phones',
      prize: 'earphones'
    },
    {
      title: 'Ear- phones',
      prize: 'earphones'
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
      title: 'This one is empty!',
      prize: 'This one is empty'
    },
    {
      title: 'This one is empty!',
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
          <div class="back-face" style="text-align:center;">
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
    setTimeout(() => {
      firstCard.classList.add('match');
      secondCard.classList.add('match');

      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);

      resetBoard();
    }, 3000)
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

async function reflipCards() {
  const cards = document.querySelectorAll('.memory-card');

  cards.forEach((card) => {
    card.classList.add('flip')
  })

  await setTimeout(() => {
    cards.forEach((card) => {
      card.classList.remove('flip')
    })
  }, 1500);
}
