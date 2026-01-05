
// This service simulates a smart AI for resume suggestions
// It uses keyword matching to find the most relevant professional bullet points

const JOB_DATABASE = [
    {
        titles: ["Software Engineer", "Software Developer", "Programmer", "Coder", "SDE"],
        keywords: ["javascript", "python", "java", "c++", "code", "programming", "software", "development", "feature", "bug"],
        bullets: [
            "• Designed and developed scalable software solutions using modern frameworks, improving system efficiency by 25%.",
            "• Collaborated with cross-functional teams to define, design, and ship new features.",
            "• Optimized legacy code to reduce page load times by 40% and improve overall user experience.",
            "• Implemented robust CI/CD pipelines to automate testing and deployment processes.",
            "• Mentored junior developers and conducted code reviews to ensure high code quality standards."
        ]
    },
    {
        titles: ["Frontend Developer", "UI Developer", "Web Developer", "React Developer"],
        keywords: ["frontend", "ui", "ux", "react", "vue", "angular", "css", "html", "javascript", "web", "interface"],
        bullets: [
            "• Built responsive and interactive user interfaces using React.js and Tailwind CSS, increasing user engagement by 30%.",
            "• Translated Figma designs into pixel-perfect, reusable code components.",
            "• Integrated RESTful APIs and optimized state management using Redux/Context API.",
            "• Ensured cross-browser compatibility and mobile responsiveness for a seamless user experience.",
            "• Improved web accessibility (WCAG 2.1) scores, making the application usable for a wider audience."
        ]
    },
    {
        titles: ["Backend Developer", "API Developer", "Node.js Developer", "Java Developer"],
        keywords: ["backend", "server", "database", "api", "sql", "nosql", "node", "java", "python", "microservices"],
        bullets: [
            "• Architected and maintained scalable backend services and APIs using Node.js and Express.",
            "• Designed and optimized database schemas (PostgreSQL/MongoDB) to handle high-volume data transactions.",
            "• Implemented secure authentication and authorization protocols (OAuth, JWT).",
            "• Migrated monolithic architecture to microservices, improving system reliability and scalability.",
            "• Optimized server-side performance, reducing API response times by 50%."
        ]
    },
    {
        titles: ["Full Stack Developer", "Full Stack Engineer"],
        keywords: ["full stack", "fullstack", "end-to-end", "frontend", "backend", "db"],
        bullets: [
            "• Developed end-to-end web applications, handling both client-side UI and server-side logic.",
            "• Managed the complete software development lifecycle from conception to deployment.",
            "• Integrated third-party services and APIs (Stripe, Twilio, Google Maps) to enhance application functionality.",
            "• Led the migration of legacy systems to modern tech stacks, improving maintainability.",
            "• troubleshoot and resolved critical production issues across the entire stack."
        ]
    },
    {
        titles: ["Product Manager", "PM", "Product Owner"],
        keywords: ["product", "roadmap", "agile", "scrum", "stakeholder", "strategy", "user"],
        bullets: [
            "• Defined product vision and strategy, aligning specific features with long-term business goals.",
            "• Led cross-functional teams (Engineering, Design, Marketing) to deliver products on time and within budget.",
            "• Conducted market research and user interviews to identify customer needs and pain points.",
            "• Prioritized the product backlog and managed sprint planning sessions using Agile methodologies.",
            "• Analyzed key performance metrics (KPIs) to drive data-informed product decisions."
        ]
    },
    {
        titles: ["Data Scientist", "Data Analyst", "Machine Learning Engineer"],
        keywords: ["data", "analysis", "machine learning", "ml", "ai", "python", "sql", "statistics", "modeling"],
        bullets: [
            "• Analyzed large datasets to extract actionable insights and drive business strategy.",
            "• Developed and deployed machine learning models to predict customer behavior with 85% accuracy.",
            "• Created interactive data visualizations and dashboards using Tableau/PowerBI for stakeholders.",
            "• Cleaned and preprocessed complex datasets to ensure data integrity and quality.",
            "• Automated data collection and reporting processes, saving 20 hours of manual work per week."
        ]
    },
    {
        titles: ["Marketing Manager", "Digital Marketer", "SEO Specialist"],
        keywords: ["marketing", "seo", "sem", "social media", "campaign", "brand", "content"],
        bullets: [
            "• Developed and executed comprehensive digital marketing strategies to increase brand awareness.",
            "• Managed multi-channel ad campaigns (Google Ads, Facebook, LinkedIn) with a monthly budget of $50k.",
            "• Optimized website content for SEO, resulting in a 40% increase in organic traffic.",
            "• Analyzed campaign performance using Google Analytics to optimize ROI and conversion rates.",
            "• Led the creation of engaging content for social media platforms, growing follower base by 200%."
        ]
    },
    {
        titles: ["Sales Representative", "Account Executive", "Business Development"],
        keywords: ["sales", "revenue", "client", "negotiation", "quota", "crm", "lead"],
        bullets: [
            "• Exceeded quarterly sales targets by 150% through strategic prospecting and relationship building.",
            "• Managed the full sales cycle from lead generation to deal closure for enterprise clients.",
            "• Conducted product demonstrations and presentations to C-level executives.",
            "• Maintained accurate sales pipeline and client records using Salesforce CRM.",
            "• Negotiated contracts and pricing agreements to maximize revenue and profitability."
        ]
    },
    {
        titles: ["Human Resources", "HR Manager", "Recruiter"],
        keywords: ["hr", "human resources", "recruiting", "talent", "employee", "onboarding"],
        bullets: [
            "• Managed end-to-end recruitment processes, reducing time-to-hire by 30%.",
            "• Implemented employee engagement initiatives that improved retention rates by 15%.",
            "• Administered benefits programs and ensured compliance with labor laws and company policies.",
            "• Facilitated new hire onboarding and training programs to ensure smooth integration.",
            "• Resolved employee relations issues and conducted performance management reviews."
        ]
    },
    {
        titles: ["Graphic Designer", "Visual Designer", "Creative Director"],
        keywords: ["design", "graphic", "creative", "branding", "logo", "adobe", "photoshop", "illustrator"],
        bullets: [
            "• Created visually compelling designs for print and digital media, adhering to brand guidelines.",
            "• Collaborated with marketing teams to produce engaging social media assets and ad creatives.",
            "• specialized in branding, logo design, and typography for diverse client portfolios.",
            "• Managed multiple design projects simultaneously, meeting tight deadlines without compromising quality.",
            "• Utilized Adobe Creative Suite (Photoshop, Illustrator, InDesign) to deliver high-quality visual assets."
        ]
    },
    {
        titles: ["Project Manager"],
        keywords: ["project", "timeline", "budget", "scope", "delivery", "risk", "coordination"],
        bullets: [
            "• Successfully managed complex projects with budgets exceeding $1M, ensuring on-time delivery.",
            "• Developed detailed project plans, timelines, and resource allocation schedules.",
            "• Identified potential risks and implemented mitigation strategies to minimize project impact.",
            "• Facilitated effective communication between stakeholders, team members, and clients.",
            "• Utilized project management tools (Jira, Asana, Trello) to track progress and enhance collaboration."
        ]
    },
    {
        titles: ["Customer Service Representative", "Support Specialist"],
        keywords: ["customer", "service", "support", "ticket", "client", "satisfaction"],
        bullets: [
            "• Resolved an average of 50+ customer inquiries daily with a 98% satisfaction rating.",
            "• Handled complex customer complaints with empathy and professionalism, ensuring positive resolutions.",
            "• Documented customer interactions and feedback to suggest product improvements.",
            "• Collaborated with technical teams to troubleshoot and resolve issues efficiently.",
            "• Trained new team members on product knowledge and customer service best practices."
        ]
    }
];

const DEFAULT_BULLETS = [
    "• Demonstrated strong problem-solving skills and attention to detail in daily tasks.",
    "• Collaborated effectively with team members to achieve project goals.",
    "• Adaptable to new technologies and fast-paced work environments.",
    "• Maintained a high standard of quality and productivity in all assignments."
];

export const getAISuggestions = async (jobTitle) => {
    // Simulate AI delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (!jobTitle) return [];

    const normalizedTitle = jobTitle.toLowerCase();

    // Find best match based on title matches first, then keyword matches
    let bestMatch = null;
    let maxScore = 0;

    JOB_DATABASE.forEach(job => {
        let score = 0;

        // Exact title match gets huge points
        if (job.titles.some(t => t.toLowerCase() === normalizedTitle)) {
            score += 100;
        }

        // Title contains input
        else if (job.titles.some(t => t.toLowerCase().includes(normalizedTitle) || normalizedTitle.includes(t.toLowerCase()))) {
            score += 50;
        }

        // Keyword matching
        const words = normalizedTitle.split(' ');
        words.forEach(word => {
            if (job.keywords.includes(word)) {
                score += 10;
            }
        });

        if (score > maxScore) {
            maxScore = score;
            bestMatch = job;
        }
    });

    if (bestMatch) {
        // Return 3 random bullets from the match to simulate "thinking" and variety
        const shuffled = [...bestMatch.bullets].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
    }

    return DEFAULT_BULLETS.slice(0, 3);
};
