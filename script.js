/**
 * Eduardo Buffet de Churrasco - Interactive Scripts
 * Mobile Menu, FAQ Accordion, WhatsApp URL Generator & Scroll Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile navigation drawer toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
      const spans = mobileToggle.querySelectorAll('span');
      if (mobileNav.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking a link
    mobileNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // 3. Interactive FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const isActive = faqItem.classList.contains('active');

      // Close all other FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      // Toggle current item
      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });

  // 4. Dynamic WhatsApp URL Handler
  const basePhone = "5511972129597"; // Eduardo Buffet WhatsApp

  function createWaUrl(message) {
    return `https://wa.me/${basePhone}?text=${encodeURIComponent(message)}`;
  }

  // Set default WhatsApp link messages for specific CTAs
  const waCtas = document.querySelectorAll('[data-wa-type]');
  waCtas.forEach(cta => {
    cta.addEventListener('click', (e) => {
      const type = cta.getAttribute('data-wa-type');
      let text = "Olá Eduardo! Gostaria de solicitar um orçamento sem compromisso para o meu evento.";

      switch (type) {
        case 'hero':
          text = "Olá Eduardo! Vi a landing page e gostaria de solicitar um orçamento para o meu evento de churrasco.";
          break;
        case 'mao-de-obra':
          text = "Olá Eduardo! Gostaria de consultar a diária e condições do 'Pacote Mão de Obra Master' (assadores e garçons).";
          break;
        case 'tradicional':
          text = "Olá Eduardo! Tenho interesse no 'Buffet Churrasco Tradicional & Espetinhos'. Pode me enviar opções de valores?";
          break;
        case 'fogo-de-chao':
          text = "Olá Eduardo! Gostaria de um orçamento especial para o cardápio 'Experiência Premium - Fogo de Chão & Defumados'.";
          break;
        case 'duvida':
          text = "Olá Eduardo! Tenho algumas dúvidas sobre o atendimento na minha região e gostaria de conversar.";
          break;
      }

      window.open(createWaUrl(text), '_blank');
    });
  });

  // 5. Interactive Guest Calculator Logic
  const guestBtns = document.querySelectorAll('#calc-guests-group .calc-btn');
  const typeBtns = document.querySelectorAll('#calc-type-group .calc-btn');
  const resultHeading = document.getElementById('calc-result-heading');
  const resultDetail = document.getElementById('calc-result-detail');
  const calcWaBtn = document.getElementById('calc-wa-btn');

  let selectedGuests = "20-30";
  let selectedType = "Aniversário / Festa Privada";

  const calcMap = {
    "20-30": { meat: "~12kg a 15kg", staff: "1 Churrasqueiro + Staff" },
    "30-50": { meat: "~18kg a 25kg", staff: "1 Churrasqueiro Master + 1 Ajudante" },
    "50-80": { meat: "~30kg a 40kg", staff: "2 Churrasqueiros + 2 Garçons/Ajudantes" },
    "100+":  { meat: "+50kg de Carnes & Fogo de Chão", staff: "Equipe Completa de Assadores & Garçons" }
  };

  function updateCalculatorView() {
    if (!resultHeading || !resultDetail) return;
    const info = calcMap[selectedGuests] || calcMap["20-30"];
    resultHeading.textContent = `Festa para ${selectedGuests} pessoas (${selectedType})`;
    resultDetail.textContent = `🥩 ${info.meat} de Carnes Nobres • 🥗 Buffet completo em Rechauds Inox • 👨‍🍳 ${info.staff}`;
  }

  guestBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      guestBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedGuests = btn.getAttribute('data-guests');
      updateCalculatorView();
    });
  });

  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedType = btn.getAttribute('data-type');
      updateCalculatorView();
    });
  });

  if (calcWaBtn) {
    calcWaBtn.addEventListener('click', () => {
      const msg = `Olá Eduardo! Usei o simulador no site e gostaria de um orçamento para o meu evento: Festa para ${selectedGuests} pessoas (${selectedType}).`;
      window.open(createWaUrl(msg), '_blank');
    });
  }
});
