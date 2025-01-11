$(document).ready(function(){
    $(window).scroll(function(){
        if(this.scrollY>20){
            $(".navbar").addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        if (this.scroll>500){
            $(".scroll-up-btn").addClass("show");

        }else{
            $(".scroll-up-btn").removeClass("show");
        }
    });
    // slide-up script
    $(".scroll-up-btn").click(function(){
        $('html').animate({scrollTop:0});
    });
    // typing animation script
    var typed = new Typed(".typing",{
        strings:['Problem Solver','Web Developer','Python Developer','Competitive Programmer','Software Developer'],
        typeSpeed:100,
        backSpeed:60,
        loop:true
    });
    var typed = new Typed(".typing-2",{
        strings:['Problem Solver','Web Developer','Python Developer','Competitive Programmer','Software Developer'],
        typeSpeed:100,
        backSpeed:60,
        loop:true
    });
    //toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass('active');
        $('.menu-btn i').toggleClass('active');
    });
    // owl carousel script
    $(".carousel").owlCarousel({
        margin:20,
        loop:true,
        outplayTimeOut:2000,
        autoplayHOverPause:true,
        responsive:{
            0:{
                items:1,
                nav:false
            },
            600:{
                items:2,
                nav:false
            },
            1000:{
                items:3,
                nav:false
            },
        }
    });
});

// Function to fetch and populate links from JSON
async function loadLinks() {
    try {
        // Fetch JSON data
        const response = await fetch('links.json'); // Ensure 'links.json' is in the same directory
        const data = await response.json();
        // Container to hold links
        const container = document.getElementById('links-container');
        // Define sections
        const sections = [
            { title: 'Socials', key: 'socials' },
            // { title: 'Achievements/Awards', key: 'achievements' },
            { title: 'Projects', key: 'projects' },
            // { title: 'Courses', key: 'courses' }
        ];
        // Iterate over sections and populate links
        sections.forEach(section => {
            const column = document.createElement('div');
            column.classList.add('column');
            // Add section title
            const sectionTitle = document.createElement('h3');
            sectionTitle.textContent = section.title;
            column.appendChild(sectionTitle);
            // Add links for the section
            const links = data[section.key];
            for (const [id, url] of Object.entries(links)) {
                const linkDiv = document.createElement('div');
                const link = document.createElement('a');
                link.href = url;
                link.id = id;
                link.target = '_blank'; // Open link in a new tab
                link.textContent = id.charAt(0).toUpperCase() + id.slice(1);
                link.classList.add('check-link')

                const button = document.createElement('button');
                button.textContent = 'Copy';
                button.onclick = () => copyLink(id);

                linkDiv.appendChild(link);
                linkDiv.appendChild(button);
                column.appendChild(linkDiv);
            }
            // Append column to the container
            container.appendChild(column);
        });
    } catch (error) {
        console.error('Error loading links:', error);
    }
}

function copyLink(id) {
    const link = document.getElementById(id).href;
    navigator.clipboard.writeText(link)
        .then(() => {
            alert('Link copied to clipboard: ' + link);
        })
        .catch(err => {
            console.error('Failed to copy link: ', err);
        });
}

document.getElementById('contact-form').addEventListener('submit', sendEmail);

function sendEmail(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const encodedSubject = encodeURIComponent(subject);
    const encodedMessage = encodeURIComponent(`${message} \n\n${name},\nOrganization Name: `);
    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=deepakkumar006007@gmail.com&su=${encodedSubject}&body=${encodedMessage}`;
    window.open(mailtoLink, '_blank');
}

fetch('achievements.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('achievements-container');

        data.achievements.forEach(achievement => {
            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <div class="box">
                    <div class="text">${achievement.title} (${achievement.rank}) on ${achievement.platform}</div>
                    <p>
                        ${achievement.description} 
                        <a href="${achievement.link}" target="_blank">
                            <i class="fas fa-external-link-alt link-icon"></i>
                        </a>
                    </p>
                </div>
            `;

            container.appendChild(card);
        });
    })
    .catch(error => console.error('Error loading achievements:', error));
loadLinks();
