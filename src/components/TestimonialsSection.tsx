
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { QuoteIcon } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  image: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, role, image }) => (
  <Card className="bg-white dark:bg-gray-800 shadow-lg border-none h-full flex flex-col">
    <CardContent className="pt-6 flex-1 flex flex-col">
      <div className="mb-4 text-akin-purple">
        <QuoteIcon className="h-8 w-8 opacity-50" />
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-6 flex-1">
        "{quote}"
      </p>
      <div className="flex items-center">
        <Avatar className="h-12 w-12 mr-4">
          <AvatarImage src={image} alt={author} />
          <AvatarFallback>{author.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Talking to AkinAI feels like chatting with a friend who remembers everything. It's helped me organize my thoughts and keep track of projects in a way that feels natural.",
      author: "Sarah Johnson",
      role: "Product Designer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&auto=format&fit=crop"
    },
    {
      quote: "I use AkinAI every day for journaling, planning, and mood check-ins. It's become an essential part of my mental health routine.",
      author: "Michael Chen",
      role: "Software Engineer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop"
    },
    {
      quote: "As a teacher, AkinAI helps me create personalized learning experiences for my students. Its ability to understand different learning styles is remarkable.",
      author: "Elena Rodriguez",
      role: "Education Professional",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=250&auto=format&fit=crop"
    }
  ];

  return (
    <section id="testimonials" className="bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-akin-purple">What People Are Saying</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Early users are already discovering the unique benefits of AkinAI.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial 
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              image={testimonial.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
