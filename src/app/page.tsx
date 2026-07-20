import Features from "@/components/homePage/Features";
import Hero from "@/components/homePage/Hero";
import HowItWorks from "@/components/homePage/HowItWorks";
import PopularStudyPlans from "@/components/homePage/PopularStudyPlans";
import Statistics from "@/components/homePage/Statistics";
import StudentTestimonials from "@/components/homePage/StudentTestimonials";


export default function Home() {
  return (
   <>
   <Hero/>
   <Features/>
   <HowItWorks/>
   <PopularStudyPlans/>
   <Statistics/>
   <StudentTestimonials/>
   </>
  );
}
