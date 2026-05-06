export interface Activity {
  id: number;
  category: 'Seminarie' | 'Innovatie' | 'POP' | 'Internationalisering' | 'Extra' | 'Seminar' | 'Innovation' | 'Internationalization';
  title: string;
  subtitle: string;
  date: string;
  description: string;
  tags: string[];
  image: string;
}

export const activitiesData: Record<string, Activity[]> = {
  nl: [
    {
      id: 1,
      category: 'Seminarie',
      title: 'Seminarie Gluo',
      subtitle: 'Multi-Cloud Environments',
      date: '04/03/2025',
      description: 'Inzicht in multi cloud omgevingen en hoe bedrijven workload verspreiden over verschillende platformen.',
      tags: ['Multi-Cloud', 'Architectuur', 'Strategie'],
      image: 'https://tse2.mm.bing.net/th/id/OIP.25DSxiC6SDinPCsUkEXazwHaEJ?rs=1&pid=ImgDetMain&o=7&rm=3'
      
    },
    {
      id: 2,
      category: 'Seminarie',
      title: 'Seminarie Toreon',
      subtitle: 'Ethical Hacking Intro',
      date: '11/03/2025',
      description: 'Introductie tot ethisch hacken en hoe kwetsbaarheden opgespoord en gerapporteerd worden.',
      tags: ['Cybersecurity', 'Kwetsbaarheid', 'Hacking'],
      image: 'https://images.pexels.com/photos/5380643/pexels-photo-5380643.jpeg'
    },
    {
      id: 3,
      category: 'Seminarie',
      title: 'Seminarie Infofarm',
      subtitle: 'CI/CD on AWS',
      date: '18/03/2025',
      description: 'Praktische implementatie van CI/CD voor het hosten van webapps op AWS.',
      tags: ['DevOps', 'AWS', 'Automatisering'],
      image: 'https://tse4.mm.bing.net/th/id/OIP.Eynr5wEkZAcreeoy1-zH4wHaD5?rs=1&pid=ImgDetMain&o=7&rm=3'
    },
    {
      id: 4,
      category: 'Seminarie',
      title: 'Seminarie Politie',
      subtitle: 'Forensisch Onderzoek',
      date: '01/04/2025',
      description: 'Uitleg over forensisch onderzoek dat de CCU (computer crime unit) doet binnen het FGP.',
      tags: ['Forensics', 'Wetshandhaving', 'Onderzoek'],
      image: 'https://media.istockphoto.com/id/910651416/photo/handcuffs-and-judge-mallet-on-laptop-keyboard.jpg?s=1024x1024&w=is&k=20&c=9dn6jCtIWJz6UwDzFOK9PfCvEJ_5jNnybKahI4BdcMI='
    },
    {
      id: 5,
      category: 'Seminarie',
      title: 'Seminarie Cegeka',
      subtitle: 'Azure Virtual Networking',
      date: '22/04/2025',
      description: 'Uitleg Azure virtual networking en hoe deze beveiligd worden.',
      tags: ['Azure', 'Netwerken', 'Beveiliging'],
      image: 'https://learn.microsoft.com/en-us/azure/well-architected/service-guides/_images/v-net.png'
    },
    {
      id: 6,
      category: 'Seminarie',
      title: 'Seminarie Brightest',
      subtitle: 'Operationeel Pentesting',
      date: '05/11/2025',
      description: 'Uitleg over pentesting binnen professionele, operationele omgevingen.',
      tags: ['Pentesting', 'Kwaliteit', 'Operaties'],
      image: 'https://www.shutterstock.com/image-photo/cyber-security-system-protecting-digital-260nw-2709772207.jpg'
    },
    {
      id: 7,
      category: 'Seminarie',
      title: 'Seminarie Secwise',
      subtitle: 'Identity Management (IAM)',
      date: '12/11/2025',
      description: 'Uitleg over IAM en het belang van identitymanagement.',
      tags: ['IAM', 'Azure AD', 'Zero Trust'],
      image: 'https://www.shutterstock.com/image-photo/iam-identity-access-management-business-260nw-2423145003.jpg'
    },
    {
      id: 8,
      category: 'Seminarie',
      title: 'Seminarie Equans',
      subtitle: 'OT Pentesting',
      date: '26/11/2025',
      description: 'Uitleg over pentesting binnen Operational Technology, uitdagingen en een CTF.',
      tags: ['OT', 'SCADA', 'Infrastructuur'],
      image: 'https://www.shutterstock.com/image-photo/caucasian-male-process-engineer-using-260nw-2665353287.jpg'
    },
    {
      id: 9,
      category: 'Innovatie',
      title: 'Secure SD-WANs',
      subtitle: 'Fortinet Implementatie',
      date: '02/10/2025',
      description: 'Technische sessie rondom het opzetten en beveiligen van SD-WAN binnen de fortinet omgeving.',
      tags: ['SD-WAN', 'Fortinet', 'NGFW'],
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 10,
      category: 'Innovatie',
      title: 'Security Crisismanagement',
      subtitle: 'CSIRT Simulatie',
      date: '09/10/2025',
      description: 'Technische sessie rondom crisismanagement binnen een IT-incident in een fictief bedrijf.',
      tags: ['Crisis Mgmt', 'Ransomware', 'CSIRT'],
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 11,
      category: 'Innovatie',
      title: 'Cybersecurity Challenge Belgium',
      subtitle: 'Nationale CTF Kwalificaties',
      date: '27/02/2026',
      description: 'Nationale CTF waarbij verschillende aspecten van het pentesten (Reverse engineering, web hacking, cryptography, …) aan bod komen',
      tags: ['CTF', 'Web Hacking', 'Crypto'],
      image: 'https://ccb.belgium.be/sites/default/files/styles/facebook_share/public/2026-03/adobestock_1907459447.jpeg?itok=7vyt3kmR'
    },
    {
      id: 12,
      category: 'POP',
      title: 'Projectweek 2TIN',
      subtitle: 'Professionele Vaardigheden',
      date: '10/02/2025',
      description: 'Een week lang sessies over I-talent, het researchproject en professionele groei.',
      tags: ['Soft Skills', 'Onderzoek', 'Planning'],
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 13,
      category: 'POP',
      title: 'Brein aan het werk!',
      subtitle: 'Digitale Verbinding',
      date: '11/02/2025',
      description: 'Hoe omgaan met 24/7 verbonden zijn met de digitale wereld.',
      tags: ['Mindfulness', 'Focus', 'Efficiëntie'],
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 14,
      category: 'POP',
      title: 'POPping',
      subtitle: 'Teamdynamiek',
      date: '25/02/2025',
      description: 'Inzicht krijgen in de vaardigheden van zowel jezelf als je teamgenoten.',
      tags: ['Persoonlijkheid', 'Feedback', 'Sterktes'],
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 15,
      category: 'POP',
      title: 'Mijn Team en Ik',
      subtitle: 'Lencioni Framework',
      date: '16/10/2025',
      description: 'Verschillende teambuildingsactiviteiten, huis van Lencioni teamanalyse.',
      tags: ['Teamwerk', 'Lencioni', 'Vertrouwen'],
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 16,
      category: 'Internationalisering',
      title: 'Bus-IT Week Cardiff',
      subtitle: 'Mobiele Tech Mobiele Gezondheidszorg',
      date: '06/04/2025',
      description: 'Uitwerking van een PoC rondom (digitale) gezondheidszorg met een internationale studentengroep.',
      tags: ['Cardiff', 'Engels', 'PoC'],
      image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 18,
      category: 'Extra',
      title: 'Seminarie Gluo (Extra)',
      subtitle: 'DevSecOps Integratie',
      date: '03/12/2025',
      description: 'Praktische uitleg over CI/CD en DevSecOps integratie met GitLab.',
      tags: ['GitLab', 'CI/CD', 'Security'],
      image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 19,
      category: 'Extra',
      title: 'Seminarie Cegeka (Extra)',
      subtitle: 'Datacenter Infrastructuur',
      date: '10/12/2025',
      description: 'Bezoek datacenter Cegeka, Datacenter Hasselt.',
      tags: ['Datacenter', 'HW', 'Hoge Beschikbaarheid'],
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJGuT2qvfcepuyYo-MrODMIVbtq6LxY3SwiA&s'
    },
    {
      id: 20,
      category: 'Extra',
      title: 'Seminarie Politie (Extra)',
      subtitle: 'Geavanceerde Forensics',
      date: '17/12/2025',
      description: 'Praktische uitleg over het werk van de CCU en automotive forensics.',
      tags: ['Forensics', 'Automotive', 'Geavanceerd'],
      image: 'https://www.politie.be/5998/sites/5998/files/styles/container_width_desktop_2x/public/media/image/2022-03/Ecofin_DSI_00002125-027%20copy.jpg.webp?itok=7OUm2Ig5'
    },
    {
      id: 21,
      category: 'Extra',
      title: 'Studentencommissie',
      subtitle: 'Onderwijsvertegenwoordiging',
      date: 'Sinds 2023',
      description: 'Vertegenwoordiging medestudenten binnen de opleiding.',
      tags: ['Engagement', 'Vertegenwoordiging', 'PXL'],
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 22,
      category: 'Extra',
      title: 'Infoavond Hoger Onderwijs',
      subtitle: 'Community Coaching',
      date: '27/02/2026',
      description: 'Uitleg aan zesdejaars studenten van Hasp-O Centrum over de opleiding.',
      tags: ['Spreken in het openbaar', 'Coaching', 'Mentorschap'],
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 23,
      category: 'Extra',
      title: 'Cybersecurity Café Limburg',
      subtitle: 'Expert Netwerk',
      date: '14/10/2025',
      description: 'PXL vertegenwoordigd en deelgenomen aan expertlezingen op het CCL.',
      tags: ['Netwerken', 'Experts', 'Genk'],
      image: 'https://focusophasseltspecials.wordpress.com/wp-content/uploads/2024/03/pxl-cyber-security-community-2.jpg'
    }
    ,
    {
      id: 24,
      category: 'Extra',
      title: 'Bsides Limburg 2025',
      subtitle: 'Expert Netwerk',
      date: '14/03/2025',
      description: 'PXL vertegenwoordigd en deelgenomen aan expertlezingen op Bsides Limburg.',
      tags: ['Netwerken', 'Experts', 'Corda'],
      image: 'https://focusophasseltspecials.wordpress.com/wp-content/uploads/2024/03/pxl-cyber-security-community-2.jpg'
    }
    ,
    {
      id: 25,
      category: 'Extra',
      title: 'Bsides Limburg 2026',
      subtitle: 'Expert Netwerk',
      date: '13/03/2026',
      description: 'PXL vertegenwoordigd en deelgenomen aan expertlezingen op Bsides Limburg..',
      tags: ['Netwerken', 'Experts', 'Corda'],
      image: 'https://focusophasseltspecials.wordpress.com/wp-content/uploads/2024/03/pxl-cyber-security-community-2.jpg'
    }
  ],
  en: [
    {
      id: 1,
      category: 'Seminar',
      title: 'Seminar Gluo',
      subtitle: 'Multi-Cloud Environments',
      date: '04/03/2025',
      description: 'Insight into multi cloud environments and how companies distribute workload across different platforms.',
      tags: ['Multi-Cloud', 'Architecture', 'Strategy'],
      image: 'https://tse2.mm.bing.net/th/id/OIP.25DSxiC6SDinPCsUkEXazwHaEJ?rs=1&pid=ImgDetMain&o=7&rm=3'
      
    },
    {
      id: 2,
      category: 'Seminar',
      title: 'Seminar Toreon',
      subtitle: 'Ethical Hacking Intro',
      date: '11/03/2025',
      description: 'Introduction to ethical hacking and how vulnerabilities are tracked and reported.',
      tags: ['Cybersecurity', 'Vulnerability', 'Hacking'],
      image: 'https://images.pexels.com/photos/5380643/pexels-photo-5380643.jpeg'
    },
    {
      id: 3,
      category: 'Seminar',
      title: 'Seminar Infofarm',
      subtitle: 'CI/CD on AWS',
      date: '18/03/2025',
      description: 'Practical implementation of CI/CD for hosting webapps on AWS.',
      tags: ['DevOps', 'AWS', 'Automation'],
      image: 'https://tse4.mm.bing.net/th/id/OIP.Eynr5wEkZAcreeoy1-zH4wHaD5?rs=1&pid=ImgDetMain&o=7&rm=3'
    },
    {
      id: 4,
      category: 'Seminar',
      title: 'Seminar Police',
      subtitle: 'Forensic Investigation',
      date: '01/04/2025',
      description: 'Explanation about forensic investigation that the CCU (computer crime unit) does within the FGP.',
      tags: ['Forensics', 'Law Enforcement', 'Investigation'],
      image: 'https://media.istockphoto.com/id/910651416/photo/handcuffs-and-judge-mallet-on-laptop-keyboard.jpg?s=1024x1024&w=is&k=20&c=9dn6jCtIWJz6UwDzFOK9PfCvEJ_5jNnybKahI4BdcMI='
    },
    {
      id: 5,
      category: 'Seminar',
      title: 'Seminar Cegeka',
      subtitle: 'Azure Virtual Networking',
      date: '22/04/2025',
      description: 'Explanation Azure virtual networking and how they are secured.',
      tags: ['Azure', 'Networking', 'Security'],
      image: 'https://learn.microsoft.com/en-us/azure/well-architected/service-guides/_images/v-net.png'
    },
    {
      id: 6,
      category: 'Seminar',
      title: 'Seminar Brightest',
      subtitle: 'Operational Pentesting',
      date: '05/11/2025',
      description: 'Explanation about pentesting within professional, operational environments.',
      tags: ['Pentesting', 'Quality', 'Operations'],
      image: 'https://www.shutterstock.com/image-photo/cyber-security-system-protecting-digital-260nw-2709772207.jpg'
    },
    {
      id: 7,
      category: 'Seminar',
      title: 'Seminar Secwise',
      subtitle: 'Identity Management (IAM)',
      date: '12/11/2025',
      description: 'Explanation about IAM and the importance of identity management.',
      tags: ['IAM', 'Azure AD', 'Zero Trust'],
      image: 'https://www.shutterstock.com/image-photo/iam-identity-access-management-business-260nw-2423145003.jpg'
    },
    {
      id: 8,
      category: 'Seminar',
      title: 'Seminar Equans',
      subtitle: 'OT Pentesting',
      date: '26/11/2025',
      description: 'Explanation about pentesting within Operational Technology, challenges and a CTF.',
      tags: ['OT', 'SCADA', 'Infrastructure'],
      image: 'https://www.shutterstock.com/image-photo/caucasian-male-process-engineer-using-260nw-2665353287.jpg'
    },
    {
      id: 9,
      category: 'Innovation',
      title: 'Secure SD-WANs',
      subtitle: 'Fortinet Implementation',
      date: '02/10/2025',
      description: 'Technical session around setting up and securing SD-WAN within the Fortinet environment.',
      tags: ['SD-WAN', 'Fortinet', 'NGFW'],
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 10,
      category: 'Innovation',
      title: 'Security Crisis Management',
      subtitle: 'CSIRT Simulation',
      date: '09/10/2025',
      description: 'Technical session around crisis management within an IT incident in a fictitious company.',
      tags: ['Crisis Mgmt', 'Ransomware', 'CSIRT'],
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 11,
      category: 'Innovation',
      title: 'Cybersecurity Challenge Belgium',
      subtitle: 'National CTF Qualifiers',
      date: '27/02/2026',
      description: 'National CTF where various aspects of pentesting (Reverse engineering, web hacking, cryptography, ...) are discussed',
      tags: ['CTF', 'Web Hacking', 'Crypto'],
      image: 'https://ccb.belgium.be/sites/default/files/styles/facebook_share/public/2026-03/adobestock_1907459447.jpeg?itok=7vyt3kmR'
    },
    {
      id: 12,
      category: 'POP',
      title: 'Project Week 2TIN',
      subtitle: 'Professional Skills',
      date: '10/02/2025',
      description: 'A week long sessions about I-talent, the research project and professional growth.',
      tags: ['Soft Skills', 'Research', 'Planning'],
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 13,
      category: 'POP',
      title: 'Brain at work!',
      subtitle: 'Digital Connection',
      date: '11/02/2025',
      description: 'How to deal with being connected 24/7 with the digital world.',
      tags: ['Mindfulness', 'Focus', 'Efficiency'],
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 14,
      category: 'POP',
      title: 'POPping',
      subtitle: 'Team Dynamics',
      date: '25/02/2025',
      description: 'Gain insight into the skills of both yourself and your teammates.',
      tags: ['Personality', 'Feedback', 'Strengths'],
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 15,
      category: 'POP',
      title: 'My Team and I',
      subtitle: 'Lencioni Framework',
      date: '16/10/2025',
      description: 'Various teambuilding activities, Lencioni house team analysis.',
      tags: ['Teamwork', 'Lencioni', 'Trust'],
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 16,
      category: 'Internationalization',
      title: 'Bus-IT Week Cardiff',
      subtitle: 'Mobile Tech Mobile Healthcare',
      date: '06/04/2025',
      description: 'Development of a PoC around (digital) healthcare with an international student group.',
      tags: ['Cardiff', 'English', 'PoC'],
      image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 18,
      category: 'Extra',
      title: 'Seminar Gluo (Extra)',
      subtitle: 'DevSecOps Integration',
      date: '03/12/2025',
      description: 'Practical explanation about CI/CD and DevSecOps integration with GitLab.',
      tags: ['GitLab', 'CI/CD', 'Security'],
      image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 19,
      category: 'Extra',
      title: 'Seminar Cegeka (Extra)',
      subtitle: 'Datacenter Infrastructure',
      date: '10/12/2025',
      description: 'Visit datacenter Cegeka, Datacenter Hasselt.',
      tags: ['Datacenter', 'HW', 'High Availability'],
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJGuT2qvfcepuyYo-MrODMIVbtq6LxY3SwiA&s'
    },
    {
      id: 20,
      category: 'Extra',
      title: 'Seminar Police (Extra)',
      subtitle: 'Advanced Forensics',
      date: '17/12/2025',
      description: 'Practical explanation about the work of the CCU and automotive forensics.',
      tags: ['Forensics', 'Automotive', 'Advanced'],
      image: 'https://www.politie.be/5998/sites/5998/files/styles/container_width_desktop_2x/public/media/image/2022-03/Ecofin_DSI_00002125-027%20copy.jpg.webp?itok=7OUm2Ig5'
    },
    {
      id: 21,
      category: 'Extra',
      title: 'Student Commission',
      subtitle: 'Education Representation',
      date: 'Since 2023',
      description: 'Representation of fellow students within the program.',
      tags: ['Engagement', 'Representation', 'PXL'],
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 22,
      category: 'Extra',
      title: 'Higher Education Info Evening',
      subtitle: 'Community Coaching',
      date: '27/02/2026',
      description: 'Explanation to sixth-year students of Hasp-O Centrum about the program.',
      tags: ['Public Speaking', 'Coaching', 'Mentorship'],
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 23,
      category: 'Extra',
      title: 'Cybersecurity Café Limburg',
      subtitle: 'Expert Network',
      date: '14/10/2025',
      description: 'Represented PXL and participated in expert lectures at the CCL.',
      tags: ['Networking', 'Experts', 'Genk'],
      image: 'https://focusophasseltspecials.wordpress.com/wp-content/uploads/2024/03/pxl-cyber-security-community-2.jpg'
    }
    ,
    {
      id: 24,
      category: 'Extra',
      title: 'Bsides Limburg 2025',
      subtitle: 'Expert Network',
      date: '14/03/2025',
      description: 'Represented PXL and participated in expert lectures at Bsides Limburg.',
      tags: ['Networking', 'Experts', 'Corda'],
      image: 'https://focusophasseltspecials.wordpress.com/wp-content/uploads/2024/03/pxl-cyber-security-community-2.jpg'
    }
    ,
    {
      id: 25,
      category: 'Extra',
      title: 'Bsides Limburg 2026',
      subtitle: 'Expert Network',
      date: '13/03/2026',
      description: 'Represented PXL and participated in expert lectures at Bsides Limburg..',
      tags: ['Networking', 'Experts', 'Corda'],
      image: 'https://focusophasseltspecials.wordpress.com/wp-content/uploads/2024/03/pxl-cyber-security-community-2.jpg'
    }
  ]
};
