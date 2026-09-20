/**
 * Official Homepage Student & Parent Reviews / Testimonials Dataset
 * Source of truth for Homepage Testimonials Redesign
 */

export interface HomepageReviewItem {
  id: string;
  category: "JEE" | "NEET";
  categoryLabel: "JEE STUDENT" | "NEET STUDENT";
  studentName: string;
  institution: string;
  image: string;
  paragraphs: string[];
}

export const HOMEPAGE_REVIEWS: {
  jee: HomepageReviewItem[];
  neet: HomepageReviewItem[];
} = {
  jee: [
    {
      id: "jee-rev-01",
      category: "JEE",
      categoryLabel: "JEE STUDENT",
      studentName: "ATUL DAGUR",
      institution: "IIT-BOMBAY",
      image: "/images/students/real-photo-atul-dagur.jpg",
      paragraphs: [
        "At Emprise Academy, Mathura, preparation is not limited to classroom teaching. Our structured academic system continuously connects learning, practice, testing, analysis, revision, mentoring, and parent feedback to ensure that every student progresses in the right direction.",
        "My experience at Emprise Academy has been much better than I ever expected. The regular classes, Director’s teaching style, personal attention, quality test papers, and excellent doubt-solving support helped me throughout my IIT-JEE journey.",
        "Today, I have finally reached IIT Bombay, and I truly believe Emprise played a major role in my success.",
        "Thank you, Emprise Academy! I must say—Emprise is the best IIT-JEE coaching institute in Mathura.",
      ],
    },
    {
      id: "jee-rev-02",
      category: "JEE",
      categoryLabel: "JEE STUDENT",
      studentName: "GOVIND GUPTA",
      institution: "IIT-BOMBAY",
      image: "/images/students/real-photo-govind-gupta.jpg",
      paragraphs: [
        "I joined Emprise Academy after Class 12 for a one-year IIT-JEE course. The way they completed the entire IIT-JEE syllabus on time and with great effectiveness was truly impressive.",
        "The faculty support, study material, and doubt-solving system at Emprise are among the best. The personal guidance and consistent support helped me stay focused throughout my preparation.",
        "Emprise has been a life-changing experience for me. I am truly grateful to Emprise Academy!",
      ],
    },
    {
      id: "jee-rev-03",
      category: "JEE",
      categoryLabel: "JEE STUDENT",
      studentName: "UTKARSH PANDEY",
      institution: "IIT-DHANBAD",
      image: "/images/students/real-photo-utkarsh-pandey.jpg",
      paragraphs: [
        "I joined Emprise Academy through its Foundation Programme, and the study environment here is completely different. I could study for 4–5 hours in the library with great focus and discipline.",
        "The faculty support, personal attention, and constant motivation from both Directors Sir made Emprise truly different from other coachings.",
        "Emprise has played a big role in my IIT-JEE journey, and I am truly grateful!",
      ],
    },
    {
      id: "jee-rev-04",
      category: "JEE",
      categoryLabel: "JEE STUDENT",
      studentName: "VISHAL",
      institution: "IIT-GUWAHATI",
      image: "/images/students/vishal.jpg",
      paragraphs: [
        "Emprise Academy is the best coaching for IIT-JEE in Mathura and the region. The faculty is excellent, and the study material, DPPs, and test paper series are really well designed.",
        "I compared my experience with friends studying in Delhi, and they also appreciated the quality and structured system at Emprise.",
        "I must say, Emprise is truly the best choice for IIT-JEE preparation!",
      ],
    },
    {
      id: "jee-rev-05",
      category: "JEE",
      categoryLabel: "JEE STUDENT",
      studentName: "SHARVAN",
      institution: "IIT-KANPUR",
      image: "/images/students/real-photo-sharvan.jpg",
      paragraphs: [
        "I really loved the study environment, disciplined atmosphere, and strong student-teacher bonding at Emprise Academy. The faculty and both Directors Sir are extremely supportive and always guide students whenever we feel demotivated or nervous.",
        "Their vast experience in the engineering field and personal guidance helped me a lot throughout my journey.",
        "I am truly grateful to Emprise Academy for always supporting and believing in me.",
      ],
    },
    {
      id: "jee-rev-06",
      category: "JEE",
      categoryLabel: "JEE STUDENT",
      studentName: "UMESH YADAV",
      institution: "IIT-DELHI",
      image: "/images/students/real-photo-umesh-yadav.jpg",
      paragraphs: [
        "I joined Emprise Academy through the Foundation Course, and my journey from Emprise to IIT Delhi has been truly amazing. The faculty and both Directors Sir supported and guided me throughout my preparation.",
        "I would like to give the credit for this journey to my parents and Emprise Academy. I am truly grateful to them for helping me achieve my dream.",
      ],
    },
  ],
  neet: [
    {
      id: "neet-rev-01",
      category: "NEET",
      categoryLabel: "NEET STUDENT",
      studentName: "TANISHA",
      institution: "AIIMS-RAEBARELI",
      image: "/images/students/real-photo-tanisha.jpg",
      paragraphs: [
        "Emprise Academy supported me throughout my journey from Emprise to AIIMS Rae Bareli. The faculty and Directors truly work hard for every student until they achieve their dream college.",
        "For NEET preparation, Emprise is the No. 1 choice for aspirants because they genuinely care about students and their success.",
        "Thank you, Emprise, for helping me achieve my dream of becoming a doctor!",
      ],
    },
    {
      id: "neet-rev-02",
      category: "NEET",
      categoryLabel: "NEET STUDENT",
      studentName: "AAYAN",
      institution: "AIIMS-GORAKHPUR",
      image: "/images/students/real-photo-aayan.jpg",
      paragraphs: [
        "I really loved Emprise Academy’s regular test series. The tests followed a regular pattern, were well-structured, and often slightly tougher than the NEET level, which helped me prepare better for the actual exam.",
        "That extra practice and challenge gave me a clear advantage in NEET. Today, I am pursuing my MBBS at AIIMS Gorakhpur.",
        "Thank you, Emprise, for being an important part of my journey!",
      ],
    },
    {
      id: "neet-rev-03",
      category: "NEET",
      categoryLabel: "NEET STUDENT",
      studentName: "SHOBHIT",
      institution: "AIIMS-JODHPUR",
      image: "/images/students/real-photo-shobhit.jpg",
      paragraphs: [
        "I joined Emprise Academy through the Foundation Course for my NEET preparation. It prepared me strongly from the foundation level, which helped me perform exceptionally well in NEET and reach AIIMS Jodhpur.",
        "The faculty and doubt-solving sessions at Emprise are excellent and played a major role in my success.",
        "Thank you, Emprise Academy!",
      ],
    },
    {
      id: "neet-rev-04",
      category: "NEET",
      categoryLabel: "NEET STUDENT",
      studentName: "SRISHTI SARASWAT",
      institution: "GMC-ETAH",
      image: "/images/students/srishti-saraswat.jpg",
      paragraphs: [
        "Emprise Academy is the best choice for NEET aspirants. After joining Emprise, I experienced its well-structured study material, supportive faculty, caring Directors, and regular test system.",
        "The guidance and support here make NEET preparation much more organized and effective.",
        "I am truly glad I chose Emprise Academy!",
      ],
    },
    {
      id: "neet-rev-05",
      category: "NEET",
      categoryLabel: "NEET STUDENT",
      studentName: "CHAMP PRATAP",
      institution: "GMC-SAHARANPUR",
      image: "/images/students/real-photo-champ-pratap.jpg",
      paragraphs: [
        "My experience at Emprise Academy has been amazing. The study environment, supportive faculty, regular test series, and excellent study material gave me everything I needed for NEET preparation.",
        "Both Directors Sir are very caring, approachable, and motivating, which makes Emprise different from other coachings.",
        "I would definitely recommend Emprise to every NEET aspirant.",
      ],
    },
    {
      id: "neet-rev-06",
      category: "NEET",
      categoryLabel: "NEET STUDENT",
      studentName: "ASHISH KUMAR",
      institution: "AIR-59 IN AIIMS",
      image: "/images/students/real-photo-ashish-kumar.jpg",
      paragraphs: [
        "What I liked most about Emprise is its student-focused approach. The teachers explain concepts clearly, doubts are solved regularly, and the test system keeps us exam-ready.",
        "The support and personal care from the Directors make the entire preparation journey much better.",
        "Thank you, Emprise, for making my NEET journey easier and more effective!",
      ],
    },
  ],
};
