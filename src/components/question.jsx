import { useState } from 'react';

export default function FAQAccordion() {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqData = [
    {
      question: "What is your design process?",
      answer: "My design process typically involves four key phases: research, design, prototype, and test. In the research phase, I gather insights about the user and their needs. In the design phase, I create wireframes and visual designs that meet those needs. In the prototype phase, I create interactive models of the design for testing. In the test phase, I collect feedback from users to refine the design."
    },
    {
      question: "What tools and software do you use for UX design?",
      answer: "My design process typically involves four key phases: research, design, prototype, and test. In the research phase, I gather insights about the user and their needs. In the design phase, I create wireframes and visual designs that meet those needs. In the prototype phase, I create interactive models of the design for testing. In the test phase, I collect feedback from users to refine the design."
    },
    {
      question: "What is your design process?",
      answer: "My design process typically involves four key phases: research, design, prototype, and test. In the research phase, I gather insights about the user and their needs. In the design phase, I create wireframes and visual designs that meet those needs. In the prototype phase, I create interactive models of the design for testing. In the test phase, I collect feedback from users to refine the design."
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center md:p-8 p-5">
      <div className="w-full max-w-5xl">
        <div className="">
          <div className="flex flex-col gap-12 text-white">
            <div className="text-center md:text-5xl text-3xl ">
              <p>Common Queries Answered</p>
            </div>
            
            <div className="flex flex-col gap-9">
              {faqData.map((faq, index) => (
                <div key={index} className="flex flex-col gap-3">
                  <div 
                    className="flex justify-between items-start text-xl cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => toggleItem(index)}
                  >
                    <p>{faq.question}</p>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      height="24px" 
                      viewBox="0 -960 960 960" 
                      width="24px" 
                      fill="#FFFFFF"
                      className={`flex-shrink-0 ml-4 transition-transform duration-300 ${openItems[index] ? 'rotate-180' : ''}`}
                    >
                      <path d="M480-200 240-440l56-56 184 183 184-183 56 56-240 240Zm0-240L240-680l56-56 184 183 184-183 56 56-240 240Z" />
                    </svg>
                  </div>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openItems[index] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-[17px] text-gray-300 pt-2">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}