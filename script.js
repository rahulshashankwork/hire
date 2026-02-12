const form = document.getElementById('resume-form');
const output = document.getElementById('output');
const copyBtn = document.getElementById('copy-btn');
const printBtn = document.getElementById('print-btn');

const sampleData = {
  nameLine: 'Dhruvisha Patel MSc CS, CSPO',
  headline:
    'Product + AI + Strategy | Product Professional | Cloud & Digital Transformation | Delivering complex, enterprise-wide, cross-functional programs end to end | CSPO',
  location: 'Chicago, Illinois, United States',
  email: 'drpatel2518@gmail.com',
  contact: '224 310 8109',
  linkedin: 'www.linkedin.com/in/dhruvisha-patel-msc-cs-cspo-a0006492',
  topSkills: 'Technical Debt Management\nOpportunity Discovery\nArtificial Intelligence (AI)',
  languages: 'Gujarati (Native or Bilingual)\nEnglish (Full Professional)\nHindi (Professional Working)',
  certifications:
    'AI Applications for Growth\nGoogle Analytics Certification\nCertified Scrum Product Owner (CSPO)\nProfessional Certificate in Product Management',
  summary:
    'Senior Product Owner with 10+ years in product-focused analysis for B2B/B2B2C SaaS, app/web development, and data platforms. Expert in requirements elicitation, gap/feasibility analysis, cost-benefit analysis, business case development, and data mapping.\n\nLed $5M+ programs delivering $10M+ savings through cost reduction, automation, and efficiency gains; specialized in high-impact AI/ML use cases and multi-year AI roadmaps aiming towards revenue growth and cost savings.',
  experience:
    'Gallagher Bassett\nSenior Product Owner – Cloud Modernization, AI Strategy\nFebruary 2022 – Present (4 years)\nRolling Meadows, Illinois, United States\nLead cross-functional teams to rebuild legacy applications and improve user satisfaction.\nSpearheaded technical debt reduction and application performance optimization.\n\nBlue Cross Blue Shield Association\nSenior Product Owner – PEX – Data Integration\nSeptember 2021 – February 2022 (6 months)\nChicago, Illinois, United States\nOwned and prioritized product backlog aligned with strategic initiatives.\nDesigned executive dashboards to track real-time KPIs and support decisions.',
  education:
    'DePaul University | Master of Science (M.S.), Computer Science (2014 – 2016)\nCharotar University – Changa | Bachelor of Engineering (B.E.), Information Technology (2008 – 2012)',
};

function lines(value) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function bulletLines(value) {
  return lines(value).map((line) => `•\t${line}`);
}

function formatExperience(raw) {
  const blocks = raw
    .split(/\n\s*\n/g)
    .map((block) => block.trim())
    .filter(Boolean);

  const formattedBlocks = blocks.map((block) => {
    const sectionLines = lines(block);
    const [company = '', role = '', range = '', location = '', ...details] = sectionLines;
    const bullets = details.map((item) => `•\t${item}`).join('\n');
    return [company, role, range, location, bullets].filter(Boolean).join('\n');
  });

  return formattedBlocks.join('\n \n');
}

function formatEducation(raw) {
  return lines(raw)
    .map((entry) => {
      const [institution, degree] = entry.split('|').map((part) => (part || '').trim());
      if (!degree) {
        return institution;
      }
      return `${institution}\n${degree}`;
    })
    .join('\n');
}

function buildOutput(data) {
  return `${data.nameLine}\n${data.headline}\n${data.location}\n \nContact\n•\tEmail: ${data.email}\n•\tContact No- ${data.contact}\n•\tLinkedIn: ${data.linkedin}\n \nTop Skills\n${bulletLines(data.topSkills).join('\n')}\n \nLanguages\n${bulletLines(data.languages).join('\n')}\n \nCertifications\n${bulletLines(data.certifications).join('\n')}\n \nSummary\n${data.summary.trim()}\n \nExperience\n${formatExperience(data.experience)}\n \nEducation\n${formatEducation(data.education)}`;
}

function setFormValues(values) {
  Object.entries(values).forEach(([key, value]) => {
    const field = form.elements.namedItem(key);
    if (field) {
      field.value = value;
    }
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  output.textContent = buildOutput(data);
});

copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(output.textContent);
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.textContent = 'Copy Output';
    }, 1500);
  } catch {
    copyBtn.textContent = 'Copy failed';
    setTimeout(() => {
      copyBtn.textContent = 'Copy Output';
    }, 1500);
  }
});

printBtn.addEventListener('click', () => {
  window.print();
});

setFormValues(sampleData);
form.requestSubmit();
