// document.addEventListener("click", function (e) {
//   if (e.target && e.target.classList.contains("collapsible")) {
//     const content = e.target.nextElementSibling;
//     content.style.display = content.style.display === "none" ? "block" : "none";
//   }
// });
document.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("collapsible")) {
    const icon = e.target;
    const content = icon.nextElementSibling;

    // Toggle visibility
    if (content.style.display === "none" || !content.style.display) {
      content.style.display = "block";
      icon.innerHTML = icon.innerHTML.replace("▶️", "🔽");
    } else {
      content.style.display = "none";
      icon.innerHTML = icon.innerHTML.replace("🔽", "▶️");
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const navItems = document.querySelectorAll('.nav-item');
    const contentContainer = document.getElementById('content-container');
  
    // Toggle sidebar
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('sidebar-collapsed');
    });
  
    // Handle nav item clicks
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        // Remove active class from all items
        navItems.forEach(nav => nav.classList.remove('active'));
        
        // Add active class to clicked item
        this.classList.add('active');
        
        // Get the content type from data attribute
        const contentType = this.getAttribute('data-content');
        
        // Load the content
        loadContent(contentType);
      });
    });
  
    // Load content based on type
    function loadContent(contentType) {
      // Clear existing content with a fade-out effect
      contentContainer.style.opacity = 0;
      
      setTimeout(() => {
        // Different content based on selected nav item
        let content = '';
        
        switch(contentType) {
          case 'coding-resources':
            content = getCodingResourcesContent();
            break;
          case 'high-demand-skills':
            content = getHighDemandSkillsContent();
            break;
          case 'learning-roadmaps':
            content = getLearningRoadmapsContent();
            break;
          case 'free-tutorials':
            content = getFreeTutorialsContent();
            break;
          case 'practice-projects':
            content = getPracticeProjectsContent();
            break;
          default:
            content = getCodingResourcesContent();
        }
        
        // Update the content
        contentContainer.innerHTML = content;
        
        // Fade in the new content
        contentContainer.style.opacity = 1;
      }, 300);
    }
  
    // Content generator functions
    function getCodingResourcesContent() {
      return `
        <div class="content-section">
          <div class="content-header">
            <h1>Coding Resources</h1>
          </div>
          <ul class="resource-list">
            <li class="resource-item">
              <h3>W3Schools</h3>
              <p>Easy-to-understand tutorials and references for web development.</p>
              <a href="https://www.w3schools.com/" class="resource-link" target="_blank">Visit Resource</a>
            </li>
            <li class="resource-item">
              <h3>GeeksforGeeks</h3>
              <p>Easy-to-understand tutorials and references for web development.</p>
              <a href="https://www.geeksforgeeks.org/" class="resource-link" target="_blank">Visit Resource</a>
            </li>
            
            <li class="resource-item">
              <h3>freeCodeCamp</h3>
              <p>Free coding curriculum covering everything from HTML to JavaScript and beyond.</p>
              <a href="https://www.freecodecamp.org/" class="resource-link" target="_blank">Visit Resource</a>
            </li>
            <li class="resource-item">
              <h3>Codecademy</h3>
              <p>Free coding curriculum covering everything from HTML to JavaScript and beyond.</p>
              <a href="https://www.codecademy.com/" class="resource-link" target="_blank">Visit Resource</a>
            </li>
            <li class="resource-item">
              <h3>MDN Web Docs</h3>
              <p>Comprehensive documentation for HTML, CSS, and JavaScript with tutorials and references.</p>
              <a href="https://developer.mozilla.org/en-US/" class="resource-link" target="_blank">Visit Resource</a>
            </li>
            <li class="resource-item">
              <h3>JavaScript.info</h3>
              <p>In-depth explanations of JavaScript concepts from basics to advanced.</p>
              <a href="https://javascript.info/" class="resource-link" target="_blank">Visit Resource</a>
            </li>
            <li class="resource-item">
              <h3>CSS-Tricks</h3>
              <p>Articles, tutorials, and guides for CSS techniques and best practices.</p>
              <a href="https://css-tricks.com/" class="resource-link" target="_blank">Visit Resource</a>
            </li>
          </ul>
        </div>
      `;
    }
  
    function getHighDemandSkillsContent() {
      return `
        <div class="content-section">
          <div class="content-header">
            <h1>High Demand Skills</h1>
          </div>
          <div class="skill-card">
            <h3>Generative AI</h3>
            <div class="demand-rating">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
            <p>A cutting-edge field in AI focused on generating human-like content such as text, images, and audio. Widely used in chatbots, content creation, personalization, and productivity tools.</p>
          </div>
          <div class="skill-card">
            <h3>Artificial Intelligence and Machine Learning</h3>
            <div class="demand-rating">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
            <p>Powering intelligent systems that learn from data. Widely used in automation, predictions, and personalized user experiences.</p>
          </div>
          <div class="skill-card">
            <h3>Prompt Engineering</h3>
            <div class="demand-rating">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
            <p>A specialized skill in crafting effective inputs for AI models to generate accurate and relevant outputs. Crucial for maximizing the potential of large language models like ChatGPT.</p>
          </div>
          <div class="skill-card">
            <h3>Data Analytics</h3>
            <div class="demand-rating">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star-half-alt"></i>
            </div>
            <p>The science of analyzing raw data to uncover trends, patterns, and insights. Vital for business intelligence, decision-making, and performance optimization.</p>
          </div>
          <div class="skill-card">
            <h3>UI/UX Design</h3>
            <div class="demand-rating">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="far fa-star"></i>
            </div>
            <p>Focused on creating intuitive, user-friendly interfaces and experiences. Essential for building engaging digital products that users enjoy and understand.</p>
          </div>
          <div class="skill-card">
            <h3>Software & Web Development</h3>
            <div class="demand-rating">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star-half-alt"></i>
            </div>
            <p>The backbone of digital products, involving the creation of apps and websites. Encompasses both front-end design and back-end functionality.</p>
          </div>
          <div class="skill-card">
            <h3>Cloud Computing</h3>
            <div class="demand-rating">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star-half-alt"></i>
            </div>
            <p>Delivers computing services like storage, processing, and networking over the internet. Powers scalable, cost-effective solutions for businesses of all sizes.</p>
          </div>
          <div class="skill-card">
            <h3>Product Management</h3>
            <div class="demand-rating">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star-half-alt"></i>
              <i class="far fa-star"></i>
            </div>
            <p>Connecting users, business, and tech teams to build the right products. Essential for shaping digital tools that solve real-world problems.</p>
          </div>
          <div class="skill-card">
            <h3>Cybersecurity</h3>
            <div class="demand-rating">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star-half-alt"></i>
              <i class="far fa-star"></i>
            </div>
            <p>Protects systems, networks, and data from digital attacks. A critical field in ensuring the privacy, integrity, and availability of information in today’s connected world.</p>
          </div>
        </div>
      `;
    }
  
    function getLearningRoadmapsContent() {
      return `
        <div class="content-section">
          <div class="content-header">
            <h1>Learning Roadmaps</h1>
          </div>
    
          ${getRoadmap("Front-End Development Roadmap", [
            ["Learn HTML, CSS, and Basic JavaScript", "Start with the fundamentals of web development. Build static pages and understand how the web works."],
            ["Advanced JavaScript", "Dive deeper into JavaScript concepts like asynchronous programming, ES6+ features, and DOM manipulation."],
            ["Pick a Framework/Library", "Learn popular frameworks like React, Vue, or Angular. Understand component-based architecture."],
            ["State Management", "Learn state management solutions like Redux, Context API, or Vuex depending on your chosen framework."],
            ["Build Projects & Deploy", "Create real-world projects and deploy them using Vercel, Netlify, or GitHub Pages."]
          ])}
    
          ${getRoadmap("Back-End Development Roadmap", [
            ["Choose a Backend Language", "Select a language like Node.js, Python, Java, or PHP to specialize in."],
            ["Databases", "Learn SQL and NoSQL databases like PostgreSQL, MySQL, MongoDB, etc."],
            ["API Development", "Understand how to create RESTful APIs and possibly GraphQL."],
            ["Authentication & Security", "Learn about user authentication, authorization, and web security best practices."],
            ["Server Deployment", "Master deployment using cloud services like AWS, Google Cloud, or Heroku."]
          ])}
    
          ${getRoadmap("Machine Learning Roadmap", [
            ["Learn Python", "Master Python basics and libraries like NumPy, Pandas, and Matplotlib."],
            ["Statistics & Math Basics", "Understand probability, linear algebra, and calculus for ML foundations."],
            ["Data Preprocessing", "Clean and prepare datasets, handle missing values, and normalize data."],
            ["Build ML Models", "Use Scikit-learn to build and evaluate regression and classification models."],
            ["Deep Learning", "Learn TensorFlow or PyTorch for neural networks, CNNs, and RNNs."],
            ["Model Deployment", "Deploy models using Flask, Streamlit, or cloud platforms."]
          ])}
    
          ${getRoadmap("Generative AI Roadmap", [
            ["Understand ML & DL", "Master machine learning and deep learning fundamentals first."],
            ["Learn Transformers", "Understand attention mechanisms and the Transformer architecture."],
            ["Work with Pretrained Models", "Use Hugging Face Transformers, OpenAI API, or Stability AI models."],
            ["Fine-Tuning & Prompting", "Customize LLMs with fine-tuning and prompt engineering."],
            ["Build GenAI Apps", "Use LangChain, LlamaIndex, or Gradio for building AI-powered applications."],
            ["Ethics & Safety", "Understand responsible AI use, hallucinations, and content safety."]
          ])}
    
          ${getRoadmap("Cloud Computing Roadmap", [
            ["Understand Cloud Basics", "Learn about IaaS, PaaS, SaaS, and common services."],
            ["Choose a Platform", "Start with AWS, Azure, or GCP using free tiers."],
            ["Core Services", "Understand EC2, S3, IAM, Lambda, and database offerings."],
            ["Infrastructure as Code", "Learn tools like Terraform or CloudFormation."],
            ["Serverless & Containers", "Master serverless functions and Docker/Kubernetes."],
            ["Monitoring & Security", "Use CloudWatch, IAM, logging, and best practices."]
          ])}
    
          ${getRoadmap("Cybersecurity Roadmap", [
            ["Basics of Security", "Learn principles like CIA triad, firewalls, and antivirus."],
            ["Networking & Protocols", "Understand TCP/IP, DNS, HTTP/S, and packet sniffing."],
            ["System Security", "Harden OS, manage permissions, and monitor systems."],
            ["Web Security", "Learn OWASP Top 10, SQLi, XSS, CSRF, and secure coding."],
            ["Penetration Testing", "Use tools like Nmap, Metasploit, and Burp Suite."],
            ["Certifications & Career", "Explore CEH, CompTIA Security+, and career paths."]
          ])}
        </div>
      `;
    }
    
    function getRoadmap(title, steps) {
      const stepHtml = steps.map(([heading, desc]) => `
        <div class="roadmap-step">
          <h3>${heading}</h3>
          <p>${desc}</p>
        </div>
      `).join("");
    
      return `
        <div class="roadmap-category">
          <h2 class="collapsible">▶️ ${title}</h2>
          <div class="roadmap-content">${stepHtml}</div>
        </div>
      `;
    }
    
  
    function getFreeTutorialsContent() {
      return `
        <div class="content-section">
          <div class="content-header">
            <h1>Free Tutorials</h1>
          </div>
          <ul class="resource-list">
            <li class="resource-item">
              <h3>C Programming PlayList</h3>
              <p>Complete beginner's guide to learn C Programming scratch.</p>
              <a href="https://www.youtube.com/playlist?list=PLdo5W4Nhv31a8UcMN9-35ghv8qyFWD9_S" class="resource-link" target="_blank">Watch on YouTube</a>
            </li>
            <li class="resource-item">
              <h3>Python Programming Playlist</h3>
              <p>Introduction to Python with hands-on exercises.</p>
              <a href="https://www.youtube.com/playlist?list=PLsyeobzWxl7poL9JTVyndKe62ieoN-MZ3" class="resource-link" target="_blank">Watch on YouTube</a>
            </li>
            <li class="resource-item">
              <h3>Java and DSA</h3>
              <p>Learn how to create websites that work on any device and screen size.</p>
              <a href="https://www.youtube.com/watch?v=apGV9Kg7ics" class="resource-link" target="_blank">Watch on YouTube</a>
            </li>
            <li class="resource-item">
              <h3>HTML Tutorial</h3>
              <p>Complete beginner's guide to learning HTML and CSS from scratch.</p>
              <a href="https://www.youtube.com/watch?v=HcOc7P5BMi4" class="resource-link" target="_blank">Watch on YouTube</a>
            </li>
            <li class="resource-item">
              <h3>CSS Tutorial</h3>
              <p>Complete beginner's guide to learning HTML and CSS from scratch.</p>
              <a href="https://www.youtube.com/watch?v=ESnrn1kAD4E" class="resource-link" target="_blank">Watch on YouTube</a>
            </li>
            <li class="resource-item">
              <h3>JS PlayList</h3>
              <p>Complete beginner's guide to learning HTML and CSS from scratch.</p>
              <a href="https://www.youtube.com/playlist?list=PLGjplNEQ1it_oTvuLRNqXfz_v_0pq6unW" class="resource-link" target="_blank">Watch on YouTube</a>
            </li>
            <li class="resource-item">
              <h3>SQL Tutorial</h3>
              <p>Step-by-step guide to building your first React application.</p>
              <a href="https://www.youtube.com/watch?v=hlGoQC332VM" class="resource-link" target="_blank">Watch On Youtube</a>
            </li>
            <li class="resource-item">
              <h3>Git & GitHub Tutorial</h3>
              <p>Learn version control with Git and GitHub collaboration.</p>
              <a href="https://www.youtube.com/watch?v=apGV9Kg7ics" class="resource-link" target="_blank">Watch On Youtube</a>
            </li>
            <li class="resource-item">
              <h3>Spring Boot</h3>
              <p>Learn version control with Git and GitHub collaboration.</p>
              <a href="https://www.youtube.com/playlist?list=PLsyeobzWxl7qbKoSgR5ub6jolI8-ocxCF" target="_blank">Watch On Youtube</a>
            </li>
            
          </ul>
        </div>
      `;
    }
  
    function getPracticeProjectsContent() {
      return `
        <div class="content-section">
          <div class="content-header">
            <h1>Practice Coding</h1>
          </div>
          <ul class="resource-list">
            <li class="resource-item">
              <h3>Hackerrank</h3>
              <a href="https://www.hackerrank.com/auth/login" class="resource-link" target="_blank">Practice Now</a>
            </li>
            <li class="resource-item">
              <h3>LeetCode</h3>
              <a href="https://leetcode.com/" class="resource-link" target="_blank">Practice Now</a>
            </li>
            <li class="resource-item">
              <h3>CodeChef</h3>
              <a href="https://www.codechef.com/" class="resource-link" target="_blank">Practice Now</a>
            </li>
            <li class="resource-item">
              <h3>CodeForces</h3>
              <a href="https://codeforces.com/profile/login" class="resource-link" target="_blank">Practice Now</a>
            </li>
            <li class="resource-item">
              <h3>Spoj</h3>
              <a href="https://www.spoj.com/" class="resource-link" target="_blank">Practice Now</a>
            </li>
            <li class="resource-item">
              <h3>InterviewBit</h3>
              <a href="https://www.interviewbit.com/sign_in_modals" class="resource-link" target="_blank">Practice Now</a>
            </li>
          </ul>
        </div>
      `;
    }
  
    // Load default content
    loadContent('coding-resources');
  });