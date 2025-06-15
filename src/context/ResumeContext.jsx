import React, { createContext, useContext, useReducer, useEffect } from 'react';

const ResumeContext = createContext();

const defaultResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    websites: [],
    linkedin: '',
    github: '',
  },
  summary: '',
  workExperience: [],
  education: [],
  skills: [],
  achievements: [],
  awards: [],
  certifications: [],
  customSections: [],
};

const loadResumeData = () => {
  try {
    const saved = localStorage.getItem('resumeData');
    return saved ? { ...defaultResumeData, ...JSON.parse(saved) } : defaultResumeData;
  } catch {
    return defaultResumeData;
  }
};

const resumeReducer = (state, action) => {
  let newState;
  
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      newState = { ...state, personalInfo: { ...state.personalInfo, ...action.payload } };
      break;
    case 'UPDATE_SUMMARY':
      newState = { ...state, summary: action.payload };
      break;
    case 'ADD_WORK_EXPERIENCE':
      newState = { ...state, workExperience: [...state.workExperience, { ...action.payload, id: crypto.randomUUID() }] };
      break;
    case 'UPDATE_WORK_EXPERIENCE':
      newState = { ...state, workExperience: state.workExperience.map(exp => exp.id === action.payload.id ? { ...exp, ...action.payload.updates } : exp) };
      break;
    case 'REMOVE_WORK_EXPERIENCE':
      newState = { ...state, workExperience: state.workExperience.filter(exp => exp.id !== action.payload) };
      break;
    case 'ADD_EDUCATION':
      newState = { ...state, education: [...state.education, { ...action.payload, id: crypto.randomUUID() }] };
      break;
    case 'UPDATE_EDUCATION':
      newState = { ...state, education: state.education.map(edu => edu.id === action.payload.id ? { ...edu, ...action.payload.updates } : edu) };
      break;
    case 'REMOVE_EDUCATION':
      newState = { ...state, education: state.education.filter(edu => edu.id !== action.payload) };
      break;
    case 'ADD_SKILL':
      newState = { ...state, skills: [...state.skills, { ...action.payload, id: crypto.randomUUID() }] };
      break;
    case 'REMOVE_SKILL':
      newState = { ...state, skills: state.skills.filter(skill => skill.id !== action.payload) };
      break;
    case 'ADD_ACHIEVEMENT':
      newState = { ...state, achievements: [...state.achievements, { ...action.payload, id: crypto.randomUUID() }] };
      break;
    case 'UPDATE_ACHIEVEMENT':
      newState = { ...state, achievements: state.achievements.map(achievement => achievement.id === action.payload.id ? { ...achievement, ...action.payload.updates } : achievement) };
      break;
    case 'REMOVE_ACHIEVEMENT':
      newState = { ...state, achievements: state.achievements.filter(achievement => achievement.id !== action.payload) };
      break;
    case 'ADD_AWARD':
      newState = { ...state, awards: [...state.awards, { ...action.payload, id: crypto.randomUUID() }] };
      break;
    case 'UPDATE_AWARD':
      newState = { ...state, awards: state.awards.map(award => award.id === action.payload.id ? { ...award, ...action.payload.updates } : award) };
      break;
    case 'REMOVE_AWARD':
      newState = { ...state, awards: state.awards.filter(award => award.id !== action.payload) };
      break;
    case 'ADD_CERTIFICATION':
      newState = { ...state, certifications: [...state.certifications, { ...action.payload, id: crypto.randomUUID() }] };
      break;
    case 'UPDATE_CERTIFICATION':
      newState = { ...state, certifications: state.certifications.map(certification => certification.id === action.payload.id ? { ...certification, ...action.payload.updates } : certification) };
      break;
    case 'REMOVE_CERTIFICATION':
      newState = { ...state, certifications: state.certifications.filter(certification => certification.id !== action.payload) };
      break;
    case 'ADD_WEBSITE_LINK':
      newState = { ...state, personalInfo: { ...state.personalInfo, websites: [...state.personalInfo.websites, { ...action.payload, id: crypto.randomUUID() }] } };
      break;
    case 'UPDATE_WEBSITE_LINK':
      newState = { ...state, personalInfo: { ...state.personalInfo, websites: state.personalInfo.websites.map(website => website.id === action.payload.id ? { ...website, ...action.payload.updates } : website) } };
      break;
    case 'REMOVE_WEBSITE_LINK':
      newState = { ...state, personalInfo: { ...state.personalInfo, websites: state.personalInfo.websites.filter(website => website.id !== action.payload) } };
      break;
    case 'ADD_CUSTOM_SECTION':
      newState = { ...state, customSections: [...state.customSections, { ...action.payload, id: crypto.randomUUID(), order: state.customSections.length + 1 }] };
      break;
    case 'UPDATE_CUSTOM_SECTION':
      newState = { ...state, customSections: state.customSections.map(section => section.id === action.payload.id ? { ...section, ...action.payload.updates } : section) };
      break;
    case 'REMOVE_CUSTOM_SECTION':
      newState = { ...state, customSections: state.customSections.filter(section => section.id !== action.payload) };
      break;
    default:
      return state;
  }
  
  try {
    localStorage.setItem('resumeData', JSON.stringify(newState));
  } catch (error) {
    console.error('Failed to save resume data:', error);
  }
  
  return newState;
};

export const ResumeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(resumeReducer, null, loadResumeData);
  return <ResumeContext.Provider value={{ state, dispatch }}>{children}</ResumeContext.Provider>;
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) throw new Error('useResume must be used within a ResumeProvider');
  return context;
};