const certifications = [
  {
    id: 1,
    name: 'Python for Data Science',
    organization: 'Reliance Foundation',
    certificateFile: 'python_certificate.pdf'
  },
  {
    id: 2,
    name: 'Python 101 for Data Science',
    organization: 'IBM',
    certificateFile: 'IBM_PY0101EN_Certificate.pdf'
  },
  {
    id: 3,
    name: 'Data Analysis with Python',
    organization: 'IBM',
    certificateFile: 'IBM_DA0101EN_Certificate.pdf'
  },
  {
    id: 4,
    name: 'SQL and Relational Databases 101',
    organization: 'IBM',
    certificateFile: 'IBM_DB0101EN_Certificate.pdf'
  },
  {
    id: 5,
    name: 'Prompt Engineering for Everyone',
    organization: 'IBM',
    certificateFile: 'IBM_AI0117EN_Certificate.pdf'
  },
  {
    id: 6,
    name: 'Introduction to Cloud',
    organization: 'IBM',
    certificateFile: 'IBM_CC0101EN_Certificate.pdf'
  },
  {
    id: 7,
    name: 'Excel, Word & PowerPoint - with Honours',
    organization: 'Coursera',
    certificateFile: 'Coursera_36839D7M54YR.pdf'
  },
  {
    id: 8,
    name: 'Organize Tabular Data in MATLAB',
    organization: 'MathWorks',
    certificateFile: '44120001_Michael_Alden_Gomez_A.pdf'
  }
];

const profile = {
  name: 'Michael Alden Gomez A',
  email: 'alden.agnel06@gmail.com',
  phone: '+91 98401 28270',
  location: 'Chennai, India',
  linkedin: 'https://www.linkedin.com/in/alden-gomez-169864314',
  resumeFile: 'Michael_Alden_Resume.pdf',
  education: {
    institution: 'Sathyabama Institute of Science and Technology',
    degree: 'Bachelor of Technology - Information Technology',
    years: '2024 - 2028'
  },
  skills: {
    programming: ['Python', 'C Programming', 'SQL'],
    officeTools: ['Microsoft Excel', 'Microsoft Word', 'PowerPoint'],
    databases: ['SQL', 'Relational Databases'],
    other: ['Data Analysis', 'Cloud Fundamentals', 'MATLAB']
  },
  internship: {
    role: 'Data Analytics Intern',
    company: 'Codec Technologies Pvt. Ltd.',
    dates: '16 April 2026 - 16 May 2026',
    certificateFile: 'Internship_Certificate.pdf'
  },
  certifications
};

module.exports = profile;
