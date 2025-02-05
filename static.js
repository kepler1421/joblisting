const jobList = document.querySelector('#job-list');
const searchInput = document.querySelector('#search-input');

let jobData = []; // Store fetched job data globally

// Fetch and display job data
fetch('./data.json')
    .then(res => res.json())
    .then(data => {
        jobData = data; // Store the fetched data
        displayJobs(jobData); // Initial rendering
        console.log(data)
    })
    .catch(error => console.error('Error fetching job data:', error));

// Function to display job listings
function displayJobs(jobs) {
    jobList.innerHTML = ''; // Clear previous results

    jobs.forEach(job => {
        const listItem = document.createElement('li');
        listItem.classList.add('job-item');

         let labels = '';
        if(job.new) labels += `<span class="badgeNew">New!</span>`;
        if(job.featured) labels += `<span class="badgeFeatured">Featured</span>`;


        // Job details
        listItem.innerHTML = `
        <div class="job-header">

           <div class="header">
           <div class="img">
            <img src="${job.logo}">
            </div>

            <div class="job-meta">
                <p class="company">${job.company} ${labels}</p>
                <h3 class="position">${job.position}</h3>
                <span>${job.postedAt}</span>
                <span>${job.contract}</span>
                <span>${job.location}</span>
            </div>
           
         </div>

            <div class="tags">
                ${[...job.languages, ...job.tools].map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
        `;

        jobList.appendChild(listItem);
    });
}

// Filter jobs based on search input
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();

    const filteredJobs = jobData.filter(job =>
        job.position.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.languages.some(lang => lang.toLowerCase().includes(query)) ||
        job.tools.some(tool => tool.toLowerCase().includes(query))
    );

    displayJobs(filteredJobs);
});