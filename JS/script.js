document.addEventListener('DOMContentLoaded', function() {

    /* ==================================== */
    /* HOBBIES SECTION            */
    /* ==================================== */
    const hobbiesBox = document.getElementById('hobbiesBox');
    const hobbiesIntro = document.getElementById('hobbiesIntro');
    const hobbiesGallery = document.getElementById('hobbiesGallery');

    const hobbyImages = [
        'images/banh.jpg', // Kiểm tra lại: nếu là đá bóng thì nên là dabanh.jpg
        'images/choigame.jpg',
        'images/docsach.jpg',
        'images/nghenhac.jpg',
    ];
    const hobbyDataNames = [ // Dữ liệu cho nhãn hover
        'Đá bóng⚽', // Nội dung cho nhãn
        'Chơi game🎮️',
        'Đọc sách📖',
        'Nghe nhạc🎧',
    ];
    let currentHobbyImageIndex = 0; // Đổi tên biến để rõ ràng hơn
    let isShowingHobbyGallery = false; // Đổi tên biến để rõ ràng hơn

    function showHobbyImage(index) {
        hobbiesGallery.innerHTML = '';

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        const img = document.createElement('img');
        img.src = hobbyImages[index];
        img.alt = hobbyDataNames[index];
        img.style.opacity = 0;
        imageContainer.appendChild(img);

        const hoverLabel = document.createElement('div');
        hoverLabel.classList.add('hover-label');
        hoverLabel.textContent = hobbyDataNames[index];
        imageContainer.appendChild(hoverLabel);

        hobbiesGallery.appendChild(imageContainer);

        setTimeout(() => {
            img.style.opacity = 1;
        }, 10);
    }

    hobbiesBox.addEventListener('click', function() {
        if (!isShowingHobbyGallery) {
            hobbiesIntro.style.display = 'none';
            hobbiesGallery.style.display = 'flex';
            showHobbyImage(currentHobbyImageIndex);
            isShowingHobbyGallery = true;
        } else {
            currentHobbyImageIndex++;
            if (currentHobbyImageIndex < hobbyImages.length) {
                showHobbyImage(currentHobbyImageIndex);
            } else {
                currentHobbyImageIndex = 0;
                hobbiesGallery.style.display = 'none';
                hobbiesIntro.style.display = 'block';
                isShowingHobbyGallery = false;
            }
        }
    });

    /* ==================================== */
    /* SKILLS SECTION             */
    /* ==================================== */
    const skillsGrid = document.getElementById('skillsGrid');
    const skillsToggleButtons = document.querySelectorAll('.skills-btn');

    const allSkills = [
        { name: 'HTML5', icon: 'images/html5.png' },
        { name: 'CSS3', icon: 'images/css3.png' },
        { name: 'JavaScript', icon: 'images/JS.png' },
        { name: 'Python', icon: 'images/python.png' },
        { name: 'C++', icon: 'images/c++.jpg' },
    ];

    const allTools = [
        { name: 'VSCode', icon: 'images/vscode.jpg' },
        { name: 'VSStudio', icon: 'images/vsstudio.jpg' },
        { name: 'Github', icon: 'images/github.png' },
        { name: 'Canva', icon: 'images/canva.jpg' },
        { name: 'Photoshop', icon: 'images/ps.jpg' },
    ];

    function renderSkills(category) {
        skillsGrid.classList.add('fade-out');
        setTimeout(() => {
            skillsGrid.innerHTML = '';
            const data = category === 'skills' ? allSkills : allTools;

            data.forEach(skill => {
                const skillItem = document.createElement('div');
                skillItem.classList.add('skill-item');

                const img = document.createElement('img');
                img.src = skill.icon;
                img.alt = skill.name;
                skillItem.appendChild(img);

                const span = document.createElement('span');
                span.classList.add('skill-name');
                span.textContent = skill.name;
                skillItem.appendChild(span);

                skillsGrid.appendChild(skillItem);
            });

            skillsGrid.classList.remove('fade-out');
            skillsGrid.classList.add('fade-in');

            setTimeout(() => {
                skillsGrid.classList.remove('fade-in');
            }, 400);
        }, 300);
    }

    skillsToggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                skillsToggleButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                const category = this.dataset.category;
                renderSkills(category);
            }
        });
    });

    renderSkills('skills'); // Render mặc định

    /* ==================================== */
    /* CERTIFICATE MODAL LOGIC       */
    /* ==================================== */
    const viewCertificateButtons = document.querySelectorAll('.cert-btn');
    const certificateModal = document.getElementById('certificateModal');
    const closeButton = document.querySelector('.close-button');
    const modalCertificateImg = document.getElementById('modalCertificateImg');

    function openCertificateModal(certificateSrc) { // Đổi tên hàm để rõ ràng hơn
        modalCertificateImg.src = certificateSrc;
        certificateModal.style.display = 'block';
        certificateModal.classList.remove('hide');
        certificateModal.classList.add('show');
        document.body.classList.add('modal-open');
    }

    function closeCertificateModal() { // Đổi tên hàm để rõ ràng hơn
        certificateModal.classList.add('hide');
        certificateModal.classList.remove('show');
        certificateModal.addEventListener('animationend', function handler() {
            if (certificateModal.classList.contains('hide')) {
                certificateModal.classList.remove('show');
                certificateModal.style.display = 'none';
                modalCertificateImg.src = ''; 
            }
            document.body.classList.remove('modal-open');
            certificateModal.removeEventListener('animationend', handler);
        }, { once: true });
    }

    viewCertificateButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const certificateSrc = button.dataset.certificateSrc;
            if (certificateSrc) {
                openCertificateModal(certificateSrc);
            } else {
                console.warn('Không tìm thấy đường dẫn ảnh chứng chỉ cho nút này.');
            }
        });
    });

    closeButton.addEventListener('click', closeCertificateModal);

    certificateModal.addEventListener('click', (event) => {
        if (event.target === certificateModal) {
            closeCertificateModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && certificateModal.classList.contains('show')) {
            closeCertificateModal();
        }
    });

    /* ==================================== */
    /* PROJECT CAROUSEL LOGIC       */
    /* ==================================== */
    const projectItems = document.querySelectorAll('.project-item');
    const prevProjectButton = document.querySelector('.prev-project'); // Đổi tên biến
    const nextProjectButton = document.querySelector('.next-project'); // Đổi tên biến
    let currentProjectIndex = 0;

    function showProject(index, direction = 'initial') {
        projectItems.forEach((item, i) => {
            item.classList.remove('active', 'from-left', 'from-right', 'animate-in');
            // Remove fade-out classes to reset
            item.classList.remove('fade-out-left', 'fade-out-right');

            if (i !== index) {
                if (direction === 'next' && i === (index - 1 + projectItems.length) % projectItems.length) {
                    item.classList.add('fade-out-left');
                } else if (direction === 'prev' && i === (index + 1) % projectItems.length) {
                    item.classList.add('fade-out-right');
                }
            }
        });

        const currentProject = projectItems[index];
        currentProject.classList.add('active');

        if (direction === 'next') {
            currentProject.classList.add('from-right');
        } else if (direction === 'prev') {
            currentProject.classList.add('from-left');
        }

        setTimeout(() => {
            currentProject.classList.add('animate-in');
            currentProject.addEventListener('transitionend', function handler() {
                currentProject.classList.remove('from-left', 'from-right', 'animate-in');
                // Ensure fade-out classes are removed from the *previous* item
                projectItems.forEach(item => {
                    item.classList.remove('fade-out-left', 'fade-out-right');
                });
                currentProject.removeEventListener('transitionend', handler);
            }, { once: true });
        }, 50);
    }

    if (nextProjectButton && prevProjectButton && projectItems.length > 0) {
        nextProjectButton.addEventListener('click', () => {
            const activeItem = document.querySelector('.project-item.active');
            if (activeItem) {
                activeItem.classList.add('fade-out-left');
            }
            currentProjectIndex = (currentProjectIndex + 1) % projectItems.length;
            showProject(currentProjectIndex, 'next');
        });

        prevProjectButton.addEventListener('click', () => {
            const activeItem = document.querySelector('.project-item.active');
            if (activeItem) {
                activeItem.classList.add('fade-out-right');
            }
            currentProjectIndex = (currentProjectIndex - 1 + projectItems.length) % projectItems.length;
            showProject(currentProjectIndex, 'prev');
        });

        showProject(currentProjectIndex);
    }

    /* ==================================== */
    /* SMOOTH SCROLLING NAVIGATION    */
    /* ==================================== */

    // Hàm chung cho smooth scroll
    function setupSmoothScroll(buttonOrLinkSelector, targetId) {
        const elements = document.querySelectorAll(buttonOrLinkSelector);
        elements.forEach(element => {
            element.addEventListener('click', (event) => {
                const href = element.getAttribute('href') || element.dataset.targetId; // Lấy href hoặc data-target-id
                const actualTargetId = href.startsWith('#') ? href : `#${href}`; // Đảm bảo có '#'
                const targetSection = document.querySelector(actualTargetId);

                if (targetSection) {
                    event.preventDefault(); // Ngăn chặn hành vi mặc định
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Áp dụng smooth scroll cho thanh điều hướng chính
    // Giả sử thanh điều hướng có class 'main-navv'
    setupSmoothScroll('.main-navv a[href^="#"]');

    // Áp dụng smooth scroll cho các nút khác
    setupSmoothScroll('.scroll-to-skills-btn', '#skills');
    setupSmoothScroll('.scroll-to-projects', '#projects');
    setupSmoothScroll('.scroll-to-contact', '#contact');


    /* ==================================== */
    /* BACK-TO-TOP BUTTON           */
    /* ==================================== */
    const backToTopBtn = document.getElementById('backToTopBtn');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    const cvSections = document.querySelectorAll('.cv-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-on-scroll');
            } else {
                entry.target.classList.remove('show-on-scroll');
            }
        });
    }, {
        threshold: 0.3 // Chỉ kích hoạt khi 30% section xuất hiện
    });

    cvSections.forEach(section => {
        observer.observe(section);
    });
}); 

function animateTextByLetter() {
    const animatedTextElements = document.querySelectorAll('.animated-text');

    animatedTextElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = ''; // Xoá nội dung cũ

        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.animationDelay = `${index * 0.07}s`;
            element.appendChild(span);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    animateTextByLetter();
});

function animateHeroWhenVisible() {
    const heroTexts = document.querySelectorAll('.animated-text');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateTextByLetter();
            }
        });
    }, {
        threshold: 0.6
    });

    heroTexts.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
    animateHeroWhenVisible();
});

document.addEventListener('DOMContentLoaded', function () {
    const aboutImg = document.getElementById('mainAboutImg');
    const shadow = document.querySelector('.vertical-shadow');
    let isOriginal = true;

    aboutImg.addEventListener('click', () => {
        // Bắt đầu ẩn ảnh và bóng
        aboutImg.classList.add('fade-out');
        shadow.classList.add('fade-out');

        setTimeout(() => {
            // Đổi ảnh
            aboutImg.src = isOriginal ? 'images/tngia.JPG' : 'images/smith.JPG';
            isOriginal = !isOriginal;

            // Reset class fade-out
            aboutImg.classList.remove('fade-out');
            shadow.classList.remove('fade-out');

            // Bắt đầu hiện ra với hiệu ứng trượt
            aboutImg.classList.add('fade-in');
            shadow.classList.add('fade-in');

            // Sau hiệu ứng, xóa class để có thể lặp lại
            setTimeout(() => {
                aboutImg.classList.remove('fade-in');
                shadow.classList.remove('fade-in');
            }, 600); // Thời gian khớp với transition
        }, 200); // Đợi kết thúc fade-out
    });
});



document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    threshold: 0.3, // phần trăm phần tử xuất hiện trên màn hình để trigger
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      } else {
        entry.target.classList.remove('animate-in'); // Cho phép reset lại khi cuộn ra ngoài
      }
    });
  }, observerOptions);

  const targets = document.querySelectorAll('.skills-left, .skills-right, .cert-left, .cert-right, .project-left, .project-right');
  targets.forEach(el => observer.observe(el));
});

