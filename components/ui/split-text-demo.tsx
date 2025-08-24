import { SplitText } from "@/components/ui/split-text"; 

const DemoSplitText = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center p-4">
      <SplitText
        text="This text splits and animates letter by letter when it comes into view using react-spring."
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-center max-w-2xl"
        delay={50}
        animationFrom={{ opacity: 0, transform: 'translate3d(0, 30px, 0)' }} 
        animationTo={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
        easing="easeOutCubic"
        threshold={0.3} 
        rootMargin="-100px"
      />
    </div>
  );
};

export { DemoSplitText };
